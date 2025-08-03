import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { supabase } from '../services/supabase';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    isInitialized: false,
    userRole: null,
    loading: true,
    error: null,
  }),
  getters: {
    empresaId: (state) => state.user?.id_empresa || null
  },
  actions: {
    async tryInitializeAuth() {
      if (this.isInitialized) return;
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: userData, error: userError } = await supabase
            .from('usuarios')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();

          if (userError) throw userError;

          this.user = { ...session.user, ...userData };
          this.isAuthenticated = true;
          this.userRole = userData.tipo_usuario; // Ajusta según tu modelo
        } else {
          this.user = null;
          this.isAuthenticated = false;
          this.userRole = null;
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        this.error = err.message || 'Error desconocido';
        await supabase.auth.signOut();
        this.user = null;
      } finally {
        this.isInitialized = true;
        this.loading = false;
      }
    },
    async login(email, password) {
      try {
        this.loading = true;
        this.error = null;

        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (authError) throw authError;
        if (!data?.user) throw new Error('No se pudo obtener el usuario');

        // Obtén los datos del usuario desde la tabla 'usuarios'
        const { data: userData, error: userError } = await supabase
          .from('usuarios')
          .select('*')
          .eq('id', data.user.id)
          .maybeSingle();

        if (userError) throw userError;
        if (!userData) throw new Error('Usuario no encontrado');

        this.user = { ...data.user, ...userData };
        this.isAuthenticated = true;
        this.userRole = userData.tipo_usuario; // Ajusta según tu modelo

        // Redirección según el tipo de usuario
        switch (userData.tipo_usuario) {
          case 'superadmin':
            return '/superadmin/dashboard';
          case 'administrador':
            return '/admin/dashboard';
          case 'empleado':
            return '/empleado/dashboard';
          case 'colaborador':
            return '/colaborador/dashboard';
          default:
            throw new Error('Tipo de usuario no válido');
        }
      } catch (err) {
        this.error = err.message || 'Error desconocido';
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async logout() {
      try {
        await supabase.auth.signOut();
        this.user = null;
        this.isAuthenticated = false;
        this.userRole = null;
      } catch (err) {
        console.error('Error logging out:', err);
        this.error = err.message || 'Error desconocido';
        throw err;
      }
    },
    hasRole(roles) {
      if (!this.userRole) return false;
      return Array.isArray(roles) 
        ? roles.includes(this.userRole)
        : this.userRole === roles;
    },
    async fetchUser() {
      try {
        this.loading = true;
        this.error = null;

        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: userData, error: userError } = await supabase
            .from('usuarios')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();

          if (userError) throw userError;

          this.user = { ...session.user, ...userData };
          this.isAuthenticated = true;
          this.userRole = userData.tipo_usuario; // Ajusta según tu modelo
        } else {
          this.user = null;
          this.isAuthenticated = false;
          this.userRole = null;
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        this.error = err.message || 'Error desconocido';
      } finally {
        this.loading = false;
      }
    }
  }
});