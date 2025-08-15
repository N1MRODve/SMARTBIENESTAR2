<template>
  <div class="p-6 md:p-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Mis Encuestas</h1>
      <p class="text-gray-600 mt-1">Tu opinión es importante. Completa las encuestas pendientes.</p>
    </header>

    <div v-if="isLoading" class="space-y-4">
      <SkeletonListItem v-for="n in 3" :key="n" />
    </div>

    <div v-else class="space-y-4">
      <div v-if="misEncuestas.length === 0" class="bg-white p-8 rounded-lg shadow-sm text-center">
        <h3 class="text-lg font-medium text-gray-900 mb-2">No hay encuestas disponibles</h3>
        <p class="text-gray-500">No tienes encuestas pendientes en este momento.</p>
      </div>
      <div v-else v-for="participacion in misEncuestas" :key="participacion.id" class="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
        <div>
          <h2 class="text-lg font-bold text-gray-800">{{ participacion.encuesta?.titulo || 'Encuesta sin título' }}</h2>
          <p class="text-sm text-gray-600 mt-1">{{ participacion.encuesta?.descripcion || 'Sin descripción' }}</p>
          <p class="text-xs text-gray-500 mt-2">Fecha límite: {{ formatDate(participacion.encuesta?.fecha_fin) }}</p>
        </div>
        <button v-if="participacion.estado === 'pendiente'" class="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary-dark">
          Completar Encuesta
        </button>
        <span v-else class="text-sm font-semibold text-green-600">Completada</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useEmpleadoStore } from '@/stores/empleado.store'
import SkeletonListItem from '@/components/common/SkeletonListItem.vue'

const empleadoStore = useEmpleadoStore()

const misEncuestas = computed(() => empleadoStore.misEncuestas)
const isLoading = computed(() => empleadoStore.loading.encuestas)

onMounted(() => {
  empleadoStore.loadMisEncuestas()
})

const formatDate = (dateString) => {
  if (!dateString) return 'Sin fecha límite'
  return new Date(dateString).toLocaleDateString('es-ES', { dateStyle: 'long' })
}
</script>