import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// --- PRUEBA DE FUEGO ---
// Este mensaje aparecerá en la consola del NAVEGADOR cuando se cargue la página.
console.log("Intentando inicializar Supabase...");
console.log("VITE_SUPABASE_URL:", supabaseUrl ? "CARGADA" : "NO CARGADA (undefined)");
console.log("VITE_SUPABASE_ANON_KEY:", supabaseAnonKey ? "CARGADA" : "NO CARGADA (undefined)");
// -----------------------

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("¡CRÍTICO! Las variables de entorno de Supabase no se cargaron. Revisa tu archivo .env y reinicia el servidor.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const authenticateUser = async (email, password) => {
  try {
    console.log('🔐 Iniciando autenticación para:', email);

    // Paso 1: Autenticar contra Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      console.error('Error de autenticación en Supabase Auth:', authError);
      // No intentar crear un usuario aquí por seguridad.
      // El flujo de registro debe ser explícito y separado.
      throw new Error('Credenciales incorrectas o el usuario no existe.');
    }

    if (!authData.user) {
      throw new Error('No se pudo autenticar el usuario');
    }

    console.log('🔑 Autenticación en Supabase Auth exitosa. ID:', authData.user.id);

    // Paso 2: Obtener el perfil del usuario de nuestra tabla `usuarios`
    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', authData.user.id)
      .eq('activo', true)
      .single();

    if (userError || !userData) {
      console.error('Error obteniendo perfil de usuario o está inactivo:', userError);
      // Forzar cierre de sesión si el perfil no se encuentra o está inactivo
      await supabase.auth.signOut();
      throw new Error('El perfil del usuario no se encontró o está inactivo.');
    }

    // Paso 3: Combinar datos de Auth con los datos de nuestro perfil
    const userComplete = {
      ...authData.user,
      ...userData,
      id: authData.user.id // Aseguramos que el ID de Auth prevalece
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
