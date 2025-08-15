<template>
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
          <div v-if="proximasSesiones.length === 0" class="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
            No tienes sesiones próximas
          </div>
          <ul v-else class="space-y-3">
            <li v-for="sesion in proximasSesiones" :key="sesion.id" class="bg-white p-4 rounded-lg shadow-sm">
              <p class="font-semibold">{{ sesion.sesiones?.titulo || 'Sesión sin título' }}</p>
              <p class="text-sm text-gray-500">{{ formatDate(sesion.sesiones?.fecha_inicio) }}</p>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-4">Encuestas Pendientes</h2>
          <div v-if="encuestasPendientes.length === 0" class="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
            No tienes encuestas pendientes
          </div>
          <ul v-else class="space-y-3">
            <li v-for="encuesta in encuestasPendientes" :key="encuesta.id" class="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
              <p class="font-semibold">{{ encuesta.encuesta?.titulo || 'Encuesta sin título' }}</p>
              <button class="text-sm text-primary font-medium">Completar</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useEmpleadoStore } from '@/stores/empleado.store'
import SkeletonDashboard from '@/components/common/SkeletonDashboard.vue'

const empleadoStore = useEmpleadoStore()

const stats = computed(() => empleadoStore.dashboardStats)
const proximasSesiones = computed(() => empleadoStore.proximasSesiones)
const encuestasPendientes = computed(() => empleadoStore.encuestasPendientes)
const isLoading = computed(() => empleadoStore.loading.dashboard)

onMounted(() => {
  empleadoStore.loadDashboardData()
})

const formatDate = (dateString) => {
  if (!dateString) return 'Fecha no disponible'
  return new Date(dateString).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' })
}
</script>