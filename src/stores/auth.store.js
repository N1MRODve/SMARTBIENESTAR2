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
      // Verificar si es modo demo
      const demoStore = useDemoStore();
      if (demoStore.isDemoMode) {
        this.loading = true;
        this.error = null;
        try {
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay de autenticación
          const user = await demoStore.loginDemo(email, password);
          this.user = user;
          this.session = { user }; // Simular sesión
          return user;
        } catch (error) {
          this.error = error.message;
          throw error;
        } finally {
          this.loading = false;
        }
      }

      this.loading = true;
      this.error = null;
      try {
        // Paso 1: Autenticar al usuario con Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (authError) throw authError;

        // Paso 2: Obtener el perfil completo del usuario de la tabla 'usuarios'
        const { data: profileData, error: profileError } = await supabase
          .from('usuarios')
          .select('*') // Seleccionar todas las columnas, incluyendo 'tipo_usuario'
          .eq('id', authData.user.id)
          .single(); // Esperamos un único resultado

        if (profileError) throw profileError;
        
        // Guardar el perfil completo (con el rol) en el estado
        this.user = profileData;
        this.session = authData.session;
        
        return profileData; // Devolver el perfil completo

      } catch (error) {
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
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          // Si hay una sesión, obtenemos el perfil completo de la tabla 'usuarios'
          const { data: profileData, error: profileError } = await supabase
            .from('usuarios')
            .select('*') // Incluye tipo_usuario, empresa_id, etc.
            .eq('id', session.user.id)
            .single()

          if (profileError) throw profileError
          
          // Guardamos tanto el perfil completo como la sesión
          this.user = profileData
          this.session = session
          
          console.log('Auth initialized with user:', profileData)
        }
      } catch (error) {
        console.error("Error al inicializar la sesión:", error)
        this.user = null
        this.session = null
        // Limpiar explícitamente cualquier dato de sesión inválido de Supabase
        await supabase.auth.signOut()
      } finally {
        // Marcamos la inicialización como completada, incluso si falla
        this.isInitialized = true
      }
    }
  }
})