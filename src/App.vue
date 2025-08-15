<template>
  <router-view />
  <Toast />
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { useAdminStore } from './stores/admin.js';
import Toast from 'primevue/toast';

const authStore = useAuthStore();
const adminStore = useAdminStore();

authStore.tryInitializeAuth().catch((error) => {
  console.error('Error al inicializar la autenticación:', error);
});

onMounted(async () => {
  await adminStore.init();
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>