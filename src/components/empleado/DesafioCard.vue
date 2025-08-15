<script setup>
// 1. Definir la prop 'desafio'
defineProps({
  desafio: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <!-- Estructura de la tarjeta -->
  <div class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
    <div class="p-6 flex-grow">
      <!-- Título del desafío -->
      <h2 class="text-xl font-bold text-gray-800 mb-2">{{ desafio.titulo }}</h2>
      
      <!-- Descripción del desafío -->
      <p class="text-gray-600 mb-4 flex-grow">{{ desafio.descripcion }}</p>
      
      <!-- Recompensa en puntos -->
      <div class="mt-auto">
        <span class="inline-block bg-yellow-200 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">
          Gana {{ desafio.puntos }} Puntos
        </span>
      </div>
    </div>
    
    <!-- Botón de acción -->
    <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
      <button class="w-full bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary-dark transition-colors">
        ¡Unirme al Desafío!
      </button>
    </div>
  </div>
</template>