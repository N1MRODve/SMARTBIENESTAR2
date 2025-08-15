<template>
  <div class="p-6 md:p-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Mi Dashboard</h1>
      <p class="text-gray-600">Bienvenido a tu espacio personal de bienestar</p>
    </header>
    
    <SkeletonDashboard v-if="isLoading" />

    <div v-else>
      <!-- Sección de Estadísticas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.puntos_bienestar || 0 }}</h3>
          <p class="text-gray-700 font-medium">Puntos de Bienestar</p>
        </div>
        <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.desafios_completados || 0 }}</h3>
          <p class="text-gray-700 font-medium">Desafíos Completados</p>
        </div>
        <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h3 class="text-4xl font-bold text-primary mb-2">{{ proximasSesiones.length || 0 }}</h3>
          <p class="text-gray-700 font-medium">Próximas Sesiones</p>
        </div>
      </div>

      <!-- Próximas Sesiones y Encuestas -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Calendar class="h-5 w-5 mr-2 text-primary" />
            Próximas Sesiones
          </h2>
          <div v-if="proximasSesiones.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
            <Calendar class="h-12 w-12 text-gray-400 mx-auto mb-3" />
            No tienes sesiones próximas
          </div>
          <ul v-else class="space-y-3">
            <li v-for="sesion in proximasSesiones" :key="sesion.id" class="glass-card p-4 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <p class="font-semibold text-gray-900">{{ sesion.sesiones?.titulo || 'Sesión sin título' }}</p>
              <p class="text-sm text-gray-600 mt-1">{{ formatDate(sesion.sesiones?.fecha_inicio) }}</p>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <ClipboardList class="h-5 w-5 mr-2 text-primary" />
            Encuestas Pendientes
          </h2>
          <div v-if="encuestasPendientes.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
            <ClipboardList class="h-12 w-12 text-gray-400 mx-auto mb-3" />
            No tienes encuestas pendientes
          </div>
          <ul v-else class="space-y-3">
            <li v-for="encuesta in encuestasPendientes" :key="encuesta.id" class="glass-card p-4 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex justify-between items-center">
              <p class="font-semibold text-gray-900">{{ encuesta.encuesta?.titulo || 'Encuesta sin título' }}</p>
              <button class="glass-button-primary text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
                Completar
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Módulo de Desafíos -->
      <div class="mt-8">
        <DesafiosModule />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { Calendar, ClipboardList } from 'lucide-vue-next'
import { useEmpleadoStore } from '@/stores/empleado.store'
import SkeletonDashboard from '@/components/common/SkeletonDashboard.vue'
import DesafiosModule from '@/components/empleado/DesafiosModule.vue'

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