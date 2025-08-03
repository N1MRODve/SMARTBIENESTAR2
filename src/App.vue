<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <Toast />
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth.store';
import { useAdminStore } from './stores/admin.js';
import Toast from 'primevue/toast';

const authStore = useAuthStore();
const adminStore = useAdminStore();

onMounted(async () => {
  await authStore.tryInitializeAuth();
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