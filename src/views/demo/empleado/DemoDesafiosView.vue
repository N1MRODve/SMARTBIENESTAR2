<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-3xl font-bold text-gray-900">Desafíos de Bienestar</h1>
      <p class="text-gray-600 mt-1">Participa en nuestros desafíos, gana puntos y mejora tu bienestar.</p>
    </header>

    <!-- Demo content for challenges -->
    <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30 text-center">
      <Trophy class="h-16 w-16 text-primary mx-auto mb-4" />
      <h2 class="text-xl font-semibold text-gray-900 mb-2">Vista Demo - Desafíos</h2>
      <p class="text-gray-600">Esta es la vista de desafíos de bienestar en modo demo.</p>
      <p class="text-sm text-gray-500 mt-2">En la aplicación real, aquí verías desafíos activos y tu progreso.</p>
    </div>
  </div>
</template>

<script setup>
import { Trophy } from 'lucide-vue-next';
</script>