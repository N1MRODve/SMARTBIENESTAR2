<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-3xl font-bold text-gray-900">Talleres y Eventos</h1>
      <p class="text-gray-600 mt-1">Participa en talleres grupales y eventos especiales de bienestar.</p>
    </header>

    <!-- Demo content for workshops -->
    <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30 text-center">
      <GraduationCap class="h-16 w-16 text-primary mx-auto mb-4" />
      <h2 class="text-xl font-semibold text-gray-900 mb-2">Vista Demo - Talleres</h2>
      <p class="text-gray-600">Esta es la vista de talleres y eventos en modo demo.</p>
      <p class="text-sm text-gray-500 mt-2">En la aplicación real, aquí verías talleres disponibles y tu historial de participación.</p>
    </div>
  </div>
</template>

<script setup>
import { GraduationCap } from 'lucide-vue-next';
</script>