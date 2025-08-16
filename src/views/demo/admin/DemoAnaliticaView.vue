<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-3xl font-bold text-gray-900">Analítica Predictiva</h1>
      <p class="text-gray-600 mt-1">Anticipa problemas y prevé riesgos de burnout antes de que ocurran.</p>
    </header>

    <!-- Demo content for analytics -->
    <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30 text-center">
      <BarChart3 class="h-16 w-16 text-primary mx-auto mb-4" />
      <h2 class="text-xl font-semibold text-gray-900 mb-2">Vista Demo - Analítica</h2>
      <p class="text-gray-600">Esta es la vista de analítica predictiva en modo demo.</p>
      <p class="text-sm text-gray-500 mt-2">En la aplicación real, aquí verías métricas avanzadas y alertas predictivas.</p>
    </div>
  </div>
</template>

<script setup>
import { BarChart3 } from 'lucide-vue-next';
</script>