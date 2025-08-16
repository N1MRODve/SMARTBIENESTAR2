<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-3xl font-bold text-gray-900">Coaching Personal</h1>
      <p class="text-gray-600 mt-1">Sesiones personalizadas para tu desarrollo profesional y personal.</p>
    </header>

    <!-- Demo content for coaching -->
    <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30 text-center">
      <MessageCircle class="h-16 w-16 text-primary mx-auto mb-4" />
      <h2 class="text-xl font-semibold text-gray-900 mb-2">Vista Demo - Coaching</h2>
      <p class="text-gray-600">Esta es la vista de coaching personal en modo demo.</p>
      <p class="text-sm text-gray-500 mt-2">En la aplicación real, aquí verías sesiones de coaching disponibles y programadas.</p>
    </div>
  </div>
</template>

<script setup>
import { MessageCircle } from 'lucide-vue-next';
</script>