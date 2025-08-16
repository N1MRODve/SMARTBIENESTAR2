<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-3xl font-bold text-gray-900">Mis Reservas</h1>
      <p class="text-gray-600 mt-1">Aquí puedes ver el historial de todas tus actividades.</p>
    </header>

    <!-- Demo content for reservations -->
    <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30 text-center">
      <CalendarCheck class="h-16 w-16 text-primary mx-auto mb-4" />
      <h2 class="text-xl font-semibold text-gray-900 mb-2">Vista Demo - Mis Reservas</h2>
      <p class="text-gray-600">Esta es la vista de reservas en modo demo.</p>
      <p class="text-sm text-gray-500 mt-2">En la aplicación real, aquí verías todas tus reservas activas e historial.</p>
    </div>
  </div>
</template>

<script setup>
import { CalendarCheck } from 'lucide-vue-next';
</script>