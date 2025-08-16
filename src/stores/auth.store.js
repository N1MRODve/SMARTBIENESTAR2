import { defineStore } from 'pinia';
import { supabase } from '@/services/supabase'; // Importar la instancia única
import { useDemoStore } from './demoStore';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    session: null,
    loading: false,
    error: null,
    isInitialized: false // Nuevo estado para controlar la inicialización
  }),

  // Las funciones de negocio deben estar dentro del objeto 'actions'.
  actions: {
    async login(email, password) {
      this.loading = true;
      this.error = null;
      
      try {
        console.log('🔐 Iniciando login para:', email);
        
        // Verificar si es modo demo
        const demoStore = useDemoStore();
        if (demoStore.isDemoMode && email.includes('demo')) {
          console.log('🎭 Modo demo detectado');
          await new Promise(resolve => setTimeout(resolve, 1000));
          const user = await demoStore.loginDemo(email, password);
          this.user = user;
          this.session = { user };
          return user;
        }

        // Credenciales de prueba para desarrollo
        const testCredentials = {
          'admin@innovatech.com': { 
            password: 'admin123', 
            user: {
              id: 'test-admin-1',
              email: 'admin@innovatech.com',
              nombre: 'Admin',
              apellido: 'Demo',
              tipo_usuario: 'administrador',
              empresa_id: 'empresa-demo-1',
              activo: true
            }
          },
          'ana.martinez@innovatech.com': { 
            password: 'empleado123', 
            user: {
              id: 'test-empleado-1',
              email: 'ana.martinez@innovatech.com',
              nombre: 'Ana',
              apellido: 'Martínez',
              tipo_usuario: 'empleado',
              empresa_id: 'empresa-demo-1',
              activo: true
            }
          },
          'elena.vasquez@smartbienestar.com': { 
            password: 'colaborador123', 
            user: {
              id: 'test-colaborador-1',
              email: 'elena.vasquez@smartbienestar.com',
              nombre: 'Elena',
              apellido: 'Vásquez',
              tipo_usuario: 'colaborador',
              empresa_id: null,
              activo: true
            }
          }
        };

        // Verificar credenciales de prueba
        const testCredential = testCredentials[email];
        if (testCredential && testCredential.password === password) {
          console.log('🧪 Usando credenciales de prueba');
          await new Promise(resolve => setTimeout(resolve, 800));
          this.user = testCredential.user;
          this.session = { user: testCredential.user };
          return testCredential.user;
        }

        // Paso 1: Autenticar con Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (authError) {
          console.error('❌ Error de autenticación:', authError);
          throw new Error('Credenciales incorrectas');
        }

        if (!authData.user) {
          throw new Error('No se pudo autenticar el usuario');
        }

        console.log('✅ Autenticación exitosa, obteniendo perfil...');

        // Paso 2: Obtener perfil completo de la tabla usuarios
        const { data: userProfile, error: profileError } = await supabase
          .from('usuarios')
          .select(`
            *,
            empresas (
              id,
              nombre,
              dominio_email
            )
          `)
          .eq('id', authData.user.id)
          .eq('activo', true)
          .single();

        if (profileError || !userProfile) {
          console.error('❌ Error obteniendo perfil:', profileError);
          await supabase.auth.signOut();
          throw new Error('Usuario no encontrado o inactivo');
        }

        // Paso 3: Combinar datos de Auth con perfil completo
        const userComplete = {
          ...authData.user,
          ...userProfile,
          id: authData.user.id // Asegurar que usamos el ID de Auth
        };

        this.user = userComplete;
        this.session = authData.session;
        
        console.log('✅ Login exitoso con perfil completo:', userComplete);
        return userComplete;

      } catch (error) {
        console.error('🚨 Error en login:', error);
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.loading = true;
      try {
        await supabase.auth.signOut();
        this.user = null;
        this.session = null;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async tryInitializeAuth() {
      try {
        console.log('🔄 Inicializando autenticación...');
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          // Si hay una sesión, obtenemos el perfil completo de la tabla 'usuarios'
          const { data: profileData, error: profileError } = await supabase
            .from('usuarios')
            .select('*') // Incluye tipo_usuario, empresa_id, etc.
            .eq('id', session.user.id)
            .single()

          if (profileError) throw profileError
          
          this.user = profileData
          this.session = session
          
          console.log('✅ Auth inicializado con usuario:', profileData)
        } else {
          console.log('ℹ️ No hay sesión activa')
        }
      } catch (error) {
        console.error("🚨 Error al inicializar la sesión:", error)
        this.user = null
        this.session = null
        await supabase.auth.signOut()
      } finally {
        this.isInitialized = true
        console.log('✅ Inicialización completada')
      }
    },

    // Getter para verificar autenticación
    get isAuthenticated() {
      return !!this.user && !!this.session;
    },

    // Getter para obtener el rol del usuario
    get userRole() {
      return this.user?.tipo_usuario || null;
    }
  }
})