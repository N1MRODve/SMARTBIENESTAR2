<template>
  <AdminLayout>
    <section class="p-8 max-w-7xl mx-auto">
      <!-- Encabezado -->
      <header class="mb-10">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
        <p class="text-gray-600 text-base mb-6">
          Bienvenido, aquí puedes gestionar encuestas, empleados y visualizar la actividad de tu empresa.
        </p>
      </header>

      <!-- KPIs -->
      <div class="mb-8">
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div v-for="i in 4" :key="i" class="bg-gray-100 border rounded-lg shadow-md p-6 animate-pulse h-32 flex flex-col justify-center">
            <div class="h-6 bg-gray-300 rounded w-2/3 mb-4"></div>
            <div class="h-10 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatsCard
            title="Total Empleados"
            :value="stats.total_empleados ?? 0"
            icon="Users"
            trend="neutral"
            kpi
          />
          <StatsCard
            title="Empleados Activos"
            :value="stats.empleados_activos ?? 0"
            icon="UserCheck"
            trend="up"
            kpi
          />
          <StatsCard
            title="Sesiones Próximas"
            :value="stats.sesiones_proximas ?? 0"
            icon="Calendar"
            trend="neutral"
            kpi
          />
          <StatsCard
            title="Encuestas Activas"
            :value="stats.encuestas_activas ?? 0"
            icon="ClipboardList"
            trend="neutral"
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
          <ActividadReciente v-else :actividades="actividadReciente" class="h-full" />
        </div>
      </div>

      <!-- Ranking de empleados -->
      <div v-if="!loading" class="bg-white border border-gray-200 rounded-lg shadow-md p-6 mt-8">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">
          Resumen de Empleados
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="text-center p-4 bg-blue-50 rounded-lg">
            <div class="text-2xl font-bold text-blue-600">{{ stats.total_empleados ?? 0 }}</div>
            <div class="text-sm text-gray-600">Total Empleados</div>
          </div>
          <div class="text-center p-4 bg-green-50 rounded-lg">
            <div class="text-2xl font-bold text-green-600">{{ stats.empleados_activos ?? 0 }}</div>
            <div class="text-sm text-gray-600">Empleados Activos</div>
          </div>
        </div>
      </div>

      <!-- Card de acciones rápidas -->
      <div class="bg-white border border-gray-200 rounded-lg shadow-md p-6 mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold text-gray-900 mb-2">Acciones rápidas</h2>
          <p class="text-sm text-gray-500 mb-4">Accede rápidamente a las funciones más usadas.</p>
        </div>
        <div class="flex gap-3">
          <button
            class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
            @click="crearEncuesta"
          >
            Crear nueva encuesta
          </button>
          <button
            class="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-dark transition"
            @click="añadirEmpleado"
          >
            Añadir empleado
          </button>
        </div>
      </div>
    </section>
  </AdminLayout>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import { useAuthStore } from '@/stores/auth.store'
import StatsCard from '@/components/common/StatsCard.vue'
import DataTable from '@/components/common/DataTable.vue'
import ChartCard from '@/components/admin/ChartCard.vue'
import ActividadReciente from '@/components/admin/ActividadReciente.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = useRouter()
const adminStore = useAdminStore()
const authStore = useAuthStore()

const loading = computed(() => adminStore.loading)
const stats = computed(() => adminStore.dashboardStats)
const actividadReciente = computed(() => adminStore.actividadReciente)
const departamentos = computed(() => adminStore.estadisticasPorDepartamento)

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

function crearEncuesta() {
  router.push('/admin/encuestas/crear')
}

function añadirEmpleado() {
  router.push('/admin/empleados')
}

onMounted(async () => {
  console.log('AdminDashboard mounted, user:', authStore.user)
  
  if (authStore.user?.empresa_id) {
    console.log('Cargando datos del dashboard para empresa:', authStore.user.empresa_id)
    
    try {
      await Promise.all([
        adminStore.loadDashboardStats(authStore.user.empresa_id),
        adminStore.loadActividadReciente(authStore.user.empresa_id, 10),
        adminStore.loadEmpleados()
      ])
    } catch (error) {
      console.error('Error cargando datos del dashboard:', error)
    }
  } else {
    console.warn('No se encontró empresa_id en el usuario:', authStore.user)
  }
})
</script>