<template>
  <EmpleadoLayout>
    <div class="p-6 md:p-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Mi Dashboard</h1>
      
      <SkeletonDashboard v-if="isLoading" />

      <div v-else>
        <!-- Sección de Estadísticas -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 class="text-4xl font-bold text-primary">{{ stats.puntos_bienestar || 0 }}</h3>
            <p class="text-gray-600">Puntos de Bienestar</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 class="text-4xl font-bold text-primary">{{ stats.sesiones_asistidas || 0 }}</h3>
            <p class="text-gray-600">Sesiones Asistidas</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 class="text-4xl font-bold text-primary">{{ stats.desafios_completados || 0 }}</h3>
            <p class="text-gray-600">Desafíos Completados</p>
          </div>
        </div>

        <!-- Próximas Sesiones y Encuestas -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 class="text-xl font-bold mb-4">Próximas Sesiones</h2>
            <ul class="space-y-3">
              <li v-for="sesion in proximasSesiones" :key="sesion.id" class="bg-white p-4 rounded-lg shadow-sm">
                <p class="font-semibold">{{ sesion.titulo }}</p>
                <p class="text-sm text-gray-500">{{ formatDate(sesion.fecha) }}</p>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="text-xl font-bold mb-4">Encuestas Pendientes</h2>
            <ul class="space-y-3">
              <li v-for="encuesta in encuestasPendientes" :key="encuesta.id" class="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                <p class="font-semibold">{{ encuesta.titulo }}</p>
                <button class="text-sm text-primary font-medium">Completar</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </EmpleadoLayout>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useEmpleadoStore } from '@/stores/empleado.store'
import EmpleadoLayout from '@/layouts/EmpleadoLayout.vue'
import SkeletonDashboard from '@/components/common/SkeletonDashboard.vue'

const empleadoStore = useEmpleadoStore()

const stats = computed(() => empleadoStore.dashboardStats)
const proximasSesiones = computed(() => empleadoStore.proximasSesiones)
const encuestasPendientes = computed(() => empleadoStore.encuestasPendientes)
const isLoading = computed(() => empleadoStore.loading.dashboard)

onMounted(() => {
  empleadoStore.loadDashboardData()
})

const formatDate = (dateString) => new Date(dateString).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' });
</script>

<style scoped>
/* Estilos adicionales opcionales */
</style>