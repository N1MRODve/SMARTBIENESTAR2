<template>
  <AdminLayout>
    <section class="p-8 max-w-7xl mx-auto">
      <!-- Encabezado -->
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard Administrador</h1>
        <p class="text-gray-600 text-base mb-6">
          Visualiza el estado general de tu empresa y la actividad reciente de tus empleados.
        </p>
      </header>

      <!-- Fila de KPIs: ocupa todo el ancho -->
      <div class="mb-8">
        <div
          v-if="loading"
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          <div v-for="i in 4" :key="i" class="bg-gray-100 border rounded-lg shadow-md p-6 animate-pulse h-32 flex flex-col justify-center">
            <div class="h-6 bg-gray-300 rounded w-2/3 mb-4"></div>
            <div class="h-10 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          <StatsCard
            title="Total Empleados"
            :value="stats.total_empleados"
            description="Empleados registrados"
            kpi
          />
          <StatsCard
            title="Empleados Activos"
            :value="stats.empleados_activos"
            description="Actualmente activos"
            kpi
          />
          <StatsCard
            title="Sesiones Próximas"
            :value="stats.sesiones_proximas"
            description="En los próximos 7 días"
            kpi
          />
          <StatsCard
            title="Encuestas Activas"
            :value="stats.encuestas_activas"
            description="Encuestas en curso"
            kpi
          />
        </div>
      </div>

      <!-- Cuadrícula principal asimétrica -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Card de gráfico: ocupa 2 columnas en lg -->
        <div :class="['bg-white border border-gray-200 rounded-lg shadow-md p-6 h-full', 'lg:col-span-2']">
          <h2 class="text-lg font-semibold mb-4">Participación por Departamento</h2>
          <div v-if="loading" class="h-64 bg-gray-100 rounded animate-pulse"></div>
          <ChartCard v-else :chartData="departamentoChartData" class="h-full" />
        </div>
        <!-- Card de actividad reciente: ocupa 1 columna en lg -->
        <div :class="['bg-white border border-gray-200 rounded-lg shadow-md p-6 h-full', 'lg:col-span-1']">
          <h2 class="text-lg font-semibold mb-4">Actividad Reciente</h2>
          <div v-if="loading">
            <ul class="space-y-4">
              <li v-for="i in 5" :key="i" class="h-12 bg-gray-100 rounded animate-pulse"></li>
            </ul>
          </div>
          <ActividadReciente v-else :actividades="actividades" class="h-full" />
        </div>
      </div>
    </section>
  </AdminLayout>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAdminStore } from '@/stores/admin'
import { useAuthStore } from '@/stores/auth.store'
import AdminLayout from '@/layouts/AdminLayout.vue'
import StatsCard from '@/components/ui/StatsCard.vue'
import ChartCard from '@/components/admin/ChartCard.vue'
import ActividadReciente from '@/components/admin/ActividadReciente.vue'

const adminStore = useAdminStore()
const authStore = useAuthStore()
const stats = computed(() => adminStore.dashboardStats)
const actividades = computed(() => adminStore.actividadReciente)
const departamentos = computed(() => adminStore.estadisticasPorDepartamento)
const loading = computed(() => adminStore.loading)

const departamentoChartData = computed(() => ({
  labels: departamentos.value.map(d => d.nombre),
  datasets: [
    {
      label: 'Empleados',
      data: departamentos.value.map(d => d.total),
      backgroundColor: '#3b82f6'
    },
    {
      label: 'Activos (%)',
      data: departamentos.value.map(d => d.porcentaje_activos),
      backgroundColor: '#10b981'
    }
  ]
}))

onMounted(() => {
  if (authStore.user?.empresa_id) {
    adminStore.loadDashboardStats(authStore.user.empresa_id)
    adminStore.loadEmpleados(authStore.user.empresa_id)
    adminStore.loadActividadReciente(authStore.user.empresa_id, 10)
  }
})
</script>