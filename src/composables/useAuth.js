import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/auth.store';

export function useAuth() {
  const authStore = useAuthStore();
  
  const user = computed(() => authStore.user);
  const isAuthenticated = computed(() => !!authStore.user && !!authStore.session);
  const userRole = computed(() => authStore.user?.tipo_usuario);
  
  return {
    user,
    isAuthenticated,
    userRole,
    // Métodos de utilidad
    isAdmin: computed(() => userRole.value === 'administrador'),
    isEmployee: computed(() => userRole.value === 'empleado'),
    isCollaborator: computed(() => userRole.value === 'colaborador'),
    isSuperAdmin: computed(() => userRole.value === 'superadmin')
  };
}