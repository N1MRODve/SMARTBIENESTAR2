<script setup>
import { onMounted, computed } from 'vue'
import { useEmpleadoStore } from '@/stores/empleado.store'
import EmpleadoLayout from '@/layouts/EmpleadoLayout.vue'
import SkeletonListItem from '@/components/common/SkeletonListItem.vue'

const empleadoStore = useEmpleadoStore()

const misEncuestas = computed(() => empleadoStore.misEncuestas)
const isLoading = computed(() => empleadoStore.loading.encuestas)

onMounted(() => {
  empleadoStore.loadMisEncuestas()
})

const formatDate = (dateString) => new Date(dateString).toLocaleDateString('es-ES', { dateStyle: 'long' });
</script>

<template>
  <EmpleadoLayout>
    <div class="p-6 md:p-8">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Mis Encuestas</h1>
        <p class="text-gray-600 mt-1">Tu opinión es importante. Completa las encuestas pendientes.</p>
      </header>

      <div v-if="isLoading" class="space-y-4">
        <SkeletonListItem v-for="n in 3" :key="n" />
      </div>

      <div v-else class="space-y-4">
        <div v-for="participacion in misEncuestas" :key="participacion.id" class="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
          <div>
            <h2 class="text-lg font-bold text-gray-800">{{ participacion.encuesta.titulo }}</h2>
            <p class="text-sm text-gray-600 mt-1">{{ participacion.encuesta.descripcion }}</p>
            <p class="text-xs text-gray-500 mt-2">Fecha límite: {{ formatDate(participacion.encuesta.fecha_fin) }}</p>
          </div>
          <button v-if="participacion.estado === 'Pendiente'" class="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary-dark">
            Completar Encuesta
          </button>
          <span v-else class="text-sm font-semibold text-green-600">Completada</span>
        </div>
      </div>
    </div>
  </EmpleadoLayout>
</template>