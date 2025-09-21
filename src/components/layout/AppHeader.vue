<template>
  <header class="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm sticky top-0 z-20">
    <div class="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center">
        <button
          class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          @click="$emit('toggle-sidebar')"
        >
          <Menu class="h-6 w-6" />
        </button>
        
        <!-- Breadcrumb o título de página -->
        <div class="hidden lg:block ml-4">
          <h1 class="text-lg font-semibold text-gray-900">
            {{ getPageTitle() }}
          </h1>
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <!-- Información del usuario -->
        <div class="hidden md:flex items-center space-x-3">
          <div class="text-right">
            <p class="text-sm font-medium text-gray-900">
              {{ authStore.user?.nombre }} {{ authStore.user?.apellido }}
            </p>
            <p class="text-xs text-gray-500">
              {{ getRoleDisplayName(authStore.user?.tipo_usuario) }}
            </p>
          </div>
          <div class="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
            <span class="text-xs font-bold text-white">
              {{ authStore.user?.nombre?.[0] }}{{ authStore.user?.apellido?.[0] }}
            </span>
          </div>
        </div>
        
        <!-- Botón de logout -->
        <Button
          variant="outline"
          size="sm"
          @click="handleLogout"
        >
          <LogOut class="h-4 w-4 mr-2" />
          Cerrar Sesión
        </Button>

        <!-- Este podría ser tu botón en un menú desplegable -->
        <button 
          @click="handleLogout" 
          class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { Menu, LogOut } from 'lucide-vue-next';
import { useAuthStore } from '../../stores/auth.store';
import Button from '../common/Button.vue';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

defineEmits(['toggle-sidebar']);

const handleLogout = async () => {
  console.log('Cerrando sesión...');
  try {
    await authStore.logout();
    router.push('/login');
    toast.add({
      severity: 'success',
      summary: '¡Hasta pronto!',
      detail: 'Has cerrado sesión correctamente',
      life: 3000
    });
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo cerrar sesión',
      life: 5000
    });
  }
};

const getPageTitle = () => {
  const titles = {
    '/admin/dashboard': 'Dashboard',
    '/admin/empleados': 'Gestión de Empleados',
    '/admin/encuestas': 'Gestión de Encuestas',
    '/admin/servicios': 'Servicios Contratados',
    '/admin/analitica': 'Analítica Predictiva',
    '/admin/horarios': 'Gestión de Horarios'
  };
  return titles[route.path] || 'Panel de Administración';
};

const getRoleDisplayName = (role) => {
  const roleNames = {
    empleado: 'Empleado',
    administrador: 'Administrador',
    superadmin: 'Super Admin',
    colaborador: 'Colaborador'
  };
  return roleNames[role] || 'Usuario';
};
</script>