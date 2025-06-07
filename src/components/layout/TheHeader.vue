<template>
  <header class="sticky top-0 z-30 bg-white shadow-sm">
    <div class="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <button
        class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        @click="$emit('toggle-sidebar')"
      >
        <Menu class="h-6 w-6" />
      </button>

      <div class="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          @click="handleLogout"
        >
          <LogOut class="h-4 w-4 mr-2" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { Menu, LogOut } from 'lucide-vue-next';
import { useAuthStore } from '../../stores/auth.store';
import Button from '../common/Button.vue';

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

defineEmits(['toggle-sidebar']);

const handleLogout = async () => {
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
</script>