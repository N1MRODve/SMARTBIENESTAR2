<template>
  <EmpleadoLayout>
    <div class="p-6 md:p-8">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Reservar Actividad</h1>
        <p class="text-gray-600 mt-1">Explora las próximas actividades y reserva tu plaza.</p>
      </header>

      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SkeletonCard v-for="n in 6" :key="n" />
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ActividadCard 
          v-for="actividad in actividadesDisponibles" 
          :key="actividad.id" 
          :actividad="actividad" 
        />
      </div>
    </div>
  </EmpleadoLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useEmpleadoStore } from '@/stores/empleado.store'
import EmpleadoLayout from '@/layouts/EmpleadoLayout.vue'
import ActividadCard from '@/components/empleado/ActividadCard.vue'
import SkeletonCard from '@/components/common/SkeletonCard.vue'

const empleadoStore = useEmpleadoStore()

const actividadesDisponibles = computed(() => empleadoStore.actividadesDisponibles)
const isLoading = computed(() => empleadoStore.loading.actividades)

onMounted(() => {
  empleadoStore.loadActividadesDisponibles()
})
</script>