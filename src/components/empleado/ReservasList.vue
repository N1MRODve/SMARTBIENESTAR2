<script setup>
import { computed } from 'vue'

// 1. Definir la prop 'reservas'
defineProps({
  reservas: {
    type: Array,
    required: true,
    default: () => []
  }
})

// Función para formatear la fecha y hora de forma legible
const formatDateTime = (dateString) => {
  if (!dateString) return 'Fecha no disponible'
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}

// Mapeo de clases de CSS para los badges de estado
const statusClasses = {
  confirmada: 'bg-green-100 text-green-800',
  cancelada: 'bg-red-100 text-red-800',
  pendiente: 'bg-yellow-100 text-yellow-800',
  completada: 'bg-blue-100 text-blue-800'
}

// Función para obtener la clase correcta según el estado
const getStatusClass = (status) => {
  return statusClasses[status.toLowerCase()] || 'bg-gray-100 text-gray-800'
}
</script>

<template>
  <div class="space-y-6">
    <!-- 2. Estado para cuando no hay reservas -->
    <div v-if="!reservas || reservas.length === 0" class="text-center py-12 px-6 bg-white rounded-lg shadow-md">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="mt-2 text-sm font-semibold text-gray-900">Aún no tienes ninguna reserva</h3>
      <p class="mt-1 text-sm text-gray-500">¡Anímate a apuntarte a una actividad!</p>
    </div>

    <!-- 3. Lista de tarjetas de reserva -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="reserva in reservas" 
        :key="reserva.id" 
        class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
      >
        <div class="p-6 flex-grow">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-lg font-bold text-gray-900">
              {{ reserva.sesion?.servicio?.nombre || 'Servicio no disponible' }}
            </h3>
            <span 
              :class="getStatusClass(reserva.estado)" 
              class="px-2 py-1 rounded-full text-xs font-semibold capitalize"
            >
              {{ reserva.estado }}
            </span>
          </div>
          <p class="text-sm text-gray-600 mb-4">
            {{ formatDateTime(reserva.sesion?.fecha_inicio) }}
          </p>
          <!-- La información del colaborador se puede añadir aquí cuando esté disponible en los datos -->
          <!-- 
          <p class="text-sm text-gray-500">
            Impartido por: <span class="font-medium">{{ reserva.sesion?.colaborador?.nombre || 'No asignado' }}</span>
          </p> 
          -->
        </div>
        <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-2">
          <button class="text-sm font-medium text-primary hover:text-primary-dark">
            Ver Detalles
          </button>
          <button v-if="reserva.estado.toLowerCase() === 'confirmada'" class="text-sm font-medium text-red-600 hover:text-red-800">
            Cancelar Reserva
          </button>
        </div>
      </div>
    </div>
  </div>
</template>