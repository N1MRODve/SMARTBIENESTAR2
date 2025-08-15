<template>
  <div class="p-6 md:p-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Actividades Disponibles</h1>
      <p class="text-gray-600 mt-1">Explora las próximas actividades y reserva tu plaza.</p>
    </header>

    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SkeletonCard v-for="n in 6" :key="n" />
    </div>

    <div v-else-if="actividadesDisponibles.length === 0" class="bg-white p-8 rounded-lg shadow-sm text-center">
      <Calendar class="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No hay actividades disponibles</h3>
      <p class="text-gray-500">No se encontraron actividades programadas en este momento.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ActividadCard 
        v-for="actividad in actividadesDisponibles" 
        :key="actividad.id" 
        :actividad="actividad" 
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { Calendar } from 'lucide-vue-next'
import { useEmpleadoStore } from '@/stores/empleado.store'
import ActividadCard from '@/components/empleado/ActividadCard.vue'
import SkeletonCard from '@/components/common/SkeletonCard.vue'

const empleadoStore = useEmpleadoStore()

const actividadesDisponibles = computed(() => empleadoStore.actividadesDisponibles)
const isLoading = computed(() => empleadoStore.loading.actividades)

onMounted(() => {
  empleadoStore.loadActividadesDisponibles()
})
</script>