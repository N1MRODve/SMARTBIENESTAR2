import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

// Se crea una única instancia del cliente de Supabase y se exporta.
// Esto evita la advertencia de "Multiple GoTrueClient instances".
export const supabase = createClient(supabaseUrl, supabaseKey)

export const authenticateUser = async (email, password) => {
  try {
    console.log('🔐 Iniciando autenticación para:', email);
    
    // Paso 1: Verificar si el usuario existe en nuestra tabla usuarios
    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .eq('activo', true)
      .maybeSingle();

    console.log('👤 Usuario encontrado:', userData);
    console.log('❌ Error usuario:', userError);

    if (userError) {
      console.error('Error consultando usuario:', userError);
      throw new Error('Error al verificar usuario en la base de datos');
    }
    
    if (!userData) {
      throw new Error('Usuario no encontrado o inactivo');
    }

    // Paso 2: Intentar autenticación con Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    console.log('🔑 Resultado autenticación:', authData);
    console.log('❌ Error autenticación:', authError);

    if (authError) {
      console.error('Error de autenticación:', authError);
      
      // Si el usuario no existe en Auth pero sí en nuestra tabla, crearlo
      if (authError.message?.includes('Invalid login credentials') || 
          authError.message?.includes('Email not confirmed')) {
        
        console.log('🔧 Usuario existe en tabla pero no en Auth, intentando crear...');
        
        // Para demo/desarrollo, crear usuario en Auth
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: undefined,
            data: {
              nombre: userData.nombre,
              apellido: userData.apellido,
              tipo_usuario: userData.tipo_usuario
            }
          }
        });

        if (signUpError) {
          console.error('Error creando usuario en Auth:', signUpError);
          throw new Error('Credenciales incorrectas');
        }

        // Actualizar el ID en nuestra tabla usuarios
        if (signUpData.user) {
          await supabase
            .from('usuarios')
            .update({ id: signUpData.user.id })
            .eq('email', email);
        }

        return {
          user: {
            ...signUpData.user,
            ...userData,
            id: signUpData.user.id
          },
          session: signUpData.session
        };
      }
      
      throw new Error('Credenciales incorrectas');
    }

    if (!authData.user) {
      throw new Error('No se pudo autenticar el usuario');
    }

    // Paso 3: Combinar datos de Auth con datos de nuestra tabla
    const userComplete = {
      ...authData.user,
      ...userData,
      id: authData.user.id // Asegurar que usamos el ID de Auth
    };

    console.log('✅ Usuario autenticado exitosamente:', userComplete);

    return {
      user: userComplete,
      session: authData.session
    };

  } catch (error) {
    console.error('🚨 Error en autenticación:', error);
    throw error;
  }
};

export const getRoleRedirectPath = (userRole) => {
  const redirectMap = {
    'superadmin': '/superadmin/dashboard',
    'administrador': '/admin/dashboard',
    'empleado': '/empleado/dashboard',
    'colaborador': '/colaborador/dashboard'
  };
  
  return redirectMap[userRole] || '/';
};

export const getCurrentSessionWithRedirect = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) return { user: null, redirectPath: '/login' };

    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .select('tipo_usuario, empresa_id, nombre, apellido')
      .eq('id', session.user.id)
      .maybeSingle();

    if (userError || !userData) {
      await supabase.auth.signOut();
      return { user: null, redirectPath: '/login' };
    }

    let redirectPath = '/';
    switch (userData.tipo_usuario) {
      case 'superadmin':
        redirectPath = '/superadmin/dashboard';
        break;
      case 'administrador':
        redirectPath = '/admin/dashboard';
        break;
      case 'empleado':
        redirectPath = '/empleado/dashboard';
        break;
      case 'colaborador':
        redirectPath = '/colaborador/dashboard';
        break;
      default:
        await supabase.auth.signOut();
        return { user: null, redirectPath: '/login' };
    }

    return {
      user: {
        ...session.user,
        ...userData
      },
      redirectPath
    };
  } catch (error) {
    console.error('Error al verificar sesión:', error);
    return { user: null, redirectPath: '/login' };
  }
};

export const logout = async () => {
  try {
    await supabase.auth.signOut();
    return { success: true };
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};