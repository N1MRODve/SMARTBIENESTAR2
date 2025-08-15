<script setup>
// 1. Definir la prop 'actividad'
defineProps({
  actividad: {
    type: Object,
    required: true
  }
})

// Función para formatear la fecha y hora de forma legible
const formatDateTime = (dateString) => {
  if (!dateString) return 'Fecha no disponible'
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}
</script>

<template>
  <!-- Estructura de la tarjeta con transición -->
  <div class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
    <div class="p-6 flex-grow">
      <!-- Título de la sesión -->
      <h2 class="text-xl font-bold text-gray-800 mb-2">{{ actividad.titulo }}</h2>
      
      <!-- Fecha y hora -->
      <p class="text-sm text-gray-500 mb-2 font-medium">{{ formatDateTime(actividad.fecha_inicio) }}</p>
      
      <!-- Nombre del colaborador -->
      <p class="text-sm text-gray-600 mb-4">
        Impartido por: <span class="font-semibold">{{ actividad.colaborador }}</span>
      </p>
      
      <!-- Descripción corta -->
      <p class="text-gray-700 flex-grow">{{ actividad.descripcion }}</p>
    </div>
    
    <!-- Botón de acción -->
    <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
      <button class="w-full bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary-dark transition-colors">
        Apuntarme
      </button>
    </div>
  </div>
</template>