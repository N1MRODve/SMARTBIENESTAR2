<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-3xl font-bold text-gray-900">Actividades Disponibles</h1>
      <p class="text-gray-600 mt-1">Explora las próximas actividades y reserva tu plaza.</p>
    </header>

    <!-- Demo content for activities -->
    <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30 text-center">
      <Calendar class="h-16 w-16 text-primary mx-auto mb-4" />
      <h2 class="text-xl font-semibold text-gray-900 mb-2">Vista Demo - Actividades</h2>
      <p class="text-gray-600">Esta es la vista de actividades disponibles en modo demo.</p>
      <p class="text-sm text-gray-500 mt-2">En la aplicación real, aquí verías todas las actividades disponibles para reservar.</p>
    </div>
  </div>
</template>

<script setup>
import { Calendar } from 'lucide-vue-next';
</script>