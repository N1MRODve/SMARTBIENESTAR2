<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">Panel de Empleado</h1>
    <p class="text-gray-600">Bienvenido, {{ userName }}</p>
    <section class="mt-6 space-y-4">
      <div class="p-4 rounded border bg-white shadow-sm">
        <h2 class="font-medium mb-2">Resumen</h2>
        <p class="text-sm text-gray-500">Aquí podrás ver tus indicadores y tareas asignadas.</p>
      </div>
      <!-- Agrega más secciones específicas del empleado aquí -->
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth.store.js'

const authStore = useAuthStore()
const userName = computed(() => authStore.user?.name || 'Empleado')
</script>
