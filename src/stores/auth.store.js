import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { supabase } from '../services/supabase';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const loading = ref(true);
  const error = ref(null);

  const isAuthenticated = computed(() => !!user.value);
  const userRole = computed(() => user.value?.tipo_usuario);

  const initialize = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: userData, error: userError } = await supabase
          .from('usuarios')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();

        if (userError) throw userError;

        if (!userData) {
          await supabase.auth.signOut();
          user.value = null;
          return;
        }

        user.value = { ...session.user, ...userData };
      } else {
        user.value = null;
      }
    } catch (err) {
      console.error('Error initializing auth:', err);
      error.value = err.message || 'Error desconocido';
      await supabase.auth.signOut();
      user.value = null;
    } finally {
      loading.value = false;
    }
  };

  const login = async (email, password) => {
    try {
      loading.value = true;
      error.value = null;

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;
      if (!data?.user) throw new Error('No se pudo obtener el usuario');

      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle();

      if (userError) throw userError;
      if (!userData) throw new Error('Usuario no encontrado');

      user.value = { ...data.user, ...userData };

      // Return the redirect path based on user role
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
      error.value = err.message || 'Error desconocido';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      user.value = null;
    } catch (err) {
      console.error('Error logging out:', err);
      error.value = err.message || 'Error desconocido';
      throw err;
    }
  };

  const hasRole = (roles) => {
    if (!userRole.value) return false;
    return Array.isArray(roles) 
      ? roles.includes(userRole.value)
      : userRole.value === roles;
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    userRole,
    initialize,
    login,
    logout,
    hasRole
  };
});