<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-semibold">Panel del Empleado</h1>
    <p class="text-gray-600">Bienvenido, {{ userName }}</p>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div class="p-4 rounded border bg-white shadow-sm">
        <h2 class="font-medium mb-2">Resumen</h2>
        <p class="text-sm text-gray-500">Tus estadísticas e información general aparecerán aquí.</p>
      </div>
      <div class="p-4 rounded border bg-white shadow-sm">
        <h2 class="font-medium mb-2">Próximas Sesiones</h2>
        <p class="text-sm text-gray-500">Lista de sesiones asignadas (pendiente de implementación).</p>
      </div>
      <div class="p-4 rounded border bg-white shadow-sm">
        <h2 class="font-medium mb-2">Encuestas</h2>
        <p class="text-sm text-gray-500">Encuestas pendientes y completadas.</p>
      </div>
    </div>

    <div class="p-4 rounded border bg-white shadow-sm">
      <h2 class="font-medium mb-2">Acciones rápidas</h2>
      <ul class="list-disc ml-5 text-sm text-gray-600 space-y-1">
        <li>Actualizar perfil</li>
        <li>Ver historial de participación</li>
        <li>Contactar soporte</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth.store.js';

const authStore = useAuthStore();
const userName = computed(() => authStore.user?.nombre || authStore.user?.name || 'Empleado');
</script>
