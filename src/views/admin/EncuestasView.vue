<template>
  <div class="space-y-8">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Gestión de Encuestas</h1>
      <p class="text-gray-600 mb-4">Crea, gestiona y analiza las encuestas de tu empresa.</p>
      <div class="flex gap-2">
        <!-- CORRECCIÓN: Usar el nombre de la ruta en lugar de la URL directa -->
        <router-link :to="{ name: 'admin-crear-encuesta' }">
          <button class="glass-button-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30 flex items-center">
            <Plus class="h-4 w-4 mr-2" />
            Crear Nueva Encuesta
          </button>
        </router-link>
        <button class="glass-button-secondary text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200/80 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50 flex items-center">
          <FileText class="h-4 w-4 mr-2" />
          Crear desde Plantilla
        </button>
      </div>
    </header>

    <!-- Estadísticas de Encuestas -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-primary mb-2">{{ stats.totalEncuestas }}</h3>
        <p class="text-gray-700 font-medium">Total Encuestas</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-green-600 mb-2">{{ stats.encuestasActivas }}</h3>
        <p class="text-gray-700 font-medium">Activas</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-blue-600 mb-2">{{ stats.respuestasRecibidas }}</h3>
        <p class="text-gray-700 font-medium">Respuestas</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-yellow-600 mb-2">{{ stats.promedioParticipacion }}%</h3>
        <p class="text-gray-700 font-medium">Participación</p>
      </div>
    </div>

    <!-- Filtros -->
    <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          v-model="busqueda"
          type="text"
          class="w-full border border-white/30 rounded-xl px-4 py-3 bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
          placeholder="Buscar encuestas..."
        />
        <select v-model="filtroEstado" class="w-full px-3 py-3 border border-white/30 rounded-xl bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
          <option value="">Todos los estados</option>
          <option value="borrador">Borradores</option>
          <option value="activa">Activas</option>
          <option value="finalizada">Finalizadas</option>
        </select>
        <button @click="limpiarFiltros" class="glass-button-outline text-gray-700 bg-white/60 hover:bg-gray-50/80 px-4 py-3 rounded-xl transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50">
          Limpiar Filtros
        </button>
      </div>
    </div>

    <!-- Lista de Encuestas -->
    <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
      <div v-if="encuestasFiltradas.length === 0" class="glass-card p-12 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
        <ClipboardList class="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">Aún no tenemos datos</h3>
        <p class="text-gray-500 mb-4">No hay encuestas creadas aún</p>
        <router-link to="/admin/encuestas/crear">
          <button class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium">
            Crear Primera Encuesta
          </button>
        </router-link>
      </div>

      <div v-else class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20">
        <table class="min-w-full">
          <thead class="bg-white/50 backdrop-blur-sm">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Encuesta</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Estado</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Respuestas</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fecha Límite</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/20">
            <tr v-for="encuesta in encuestasFiltradas" :key="encuesta.id" class="hover:bg-white/30 transition-colors duration-200">
              <td class="px-6 py-4">
                <div>
                  <p class="font-medium text-gray-900">{{ encuesta.titulo }}</p>
                  <p class="text-sm text-gray-600">{{ encuesta.descripcion }}</p>
                </div>
              </td>
              <td class="px-6 py-4">
                <span
                  :class="{
                    'bg-yellow-100/80 text-yellow-800 border border-yellow-200/50': encuesta.estado === 'borrador',
                    'bg-green-100/80 text-green-800 border border-green-200/50': encuesta.estado === 'activa',
                    'bg-gray-100/80 text-gray-800 border border-gray-200/50': encuesta.estado === 'finalizada'
                  }"
                  class="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
                >
                  {{ encuesta.estado }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <span class="font-medium text-gray-900">{{ encuesta.respuestas }}/{{ encuesta.invitados }}</span>
                  <span class="ml-2 text-xs text-gray-500">({{ Math.round((encuesta.respuestas / encuesta.invitados) * 100) }}%)</span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                {{ encuesta.fecha_fin ? formatDate(encuesta.fecha_fin) : 'Sin límite' }}
              </td>
              <td class="px-6 py-4">
                <div class="flex gap-2">
                  <button
                    v-if="encuesta.estado === 'borrador'"
                    class="glass-button-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30 text-xs"
                    @click="enviarEncuesta(encuesta.id)"
                  >
                    Enviar
                  </button>
                  <button
                    class="glass-button-outline text-blue-700 bg-white/60 hover:bg-blue-50/80 px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-blue-300/50 text-xs"
                    @click="editarEncuesta(encuesta)"
                  >
                    Editar
                  </button>
                  <button
                    class="text-xs px-3 py-2 rounded-lg text-red-600 border border-red-300/50 hover:bg-red-50/80 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm"
                    @click="eliminarEncuesta(encuesta.id)"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { ClipboardList, Plus, FileText } from 'lucide-vue-next'

const router = useRouter()
const toast = useToast()

// Estado reactivo
const busqueda = ref('')
const filtroEstado = ref('')

// Estadísticas
const stats = ref({
  totalEncuestas: 8,
  encuestasActivas: 2,
  respuestasRecibidas: 156,
  promedioParticipacion: 78
})

// Datos dummy de encuestas
const encuestas = ref([
  {
    id: 1,
    titulo: 'Evaluación de Clima Laboral Q1',
    descripcion: 'Encuesta trimestral para evaluar el ambiente de trabajo',
    estado: 'activa',
    respuestas: 32,
    invitados: 45,
    fecha_fin: '2025-01-30T23:59:59',
    fecha_creacion: '2025-01-15T10:00:00'
  },
  {
    id: 2,
    titulo: 'Feedback Actividades de Bienestar',
    descripcion: 'Evaluación de la satisfacción con las actividades ofrecidas',
    estado: 'activa',
    respuestas: 18,
    invitados: 30,
    fecha_fin: null,
    fecha_creacion: '2025-01-18T14:30:00'
  },
  {
    id: 3,
    titulo: 'Satisfacción General Diciembre',
    descripcion: 'Encuesta mensual de satisfacción laboral',
    estado: 'finalizada',
    respuestas: 42,
    invitados: 45,
    fecha_fin: '2025-01-15T23:59:59',
    fecha_creacion: '2025-01-05T09:00:00'
  },
  {
    id: 4,
    titulo: 'Evaluación de Liderazgo',
    descripcion: 'Feedback sobre el liderazgo en la organización',
    estado: 'borrador',
    respuestas: 0,
    invitados: 0,
    fecha_fin: '2025-02-15T23:59:59',
    fecha_creacion: '2025-01-20T11:15:00'
  }
])

// Computed
const encuestasFiltradas = computed(() => {
  let resultado = encuestas.value
  
  if (busqueda.value.trim()) {
    const term = busqueda.value.trim().toLowerCase()
    resultado = resultado.filter(e =>
      e.titulo.toLowerCase().includes(term) ||
      e.descripcion.toLowerCase().includes(term)
    )
  }
  
  if (filtroEstado.value) {
    resultado = resultado.filter(e => e.estado === filtroEstado.value)
  }
  
  return resultado
})

// Métodos
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const limpiarFiltros = () => {
  busqueda.value = ''
  filtroEstado.value = ''
}

const enviarEncuesta = (encuestaId) => {
  const encuesta = encuestas.value.find(e => e.id === encuestaId)
  if (encuesta) {
    encuesta.estado = 'activa'
    encuesta.invitados = 45
    toast.add({
      severity: 'success',
      summary: 'Encuesta enviada',
      detail: 'La encuesta ha sido enviada a todos los empleados',
      life: 3000
    })
  }
}

const editarEncuesta = (encuesta) => {
  // CORRECCIÓN: Navegar usando el nombre de la ruta y pasando el ID como parámetro
  router.push({ name: 'admin-editar-encuesta', params: { id: encuesta.id } })
}

const eliminarEncuesta = (encuestaId) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta encuesta?')) {
    const index = encuestas.value.findIndex(e => e.id === encuestaId)
    if (index !== -1) {
      encuestas.value.splice(index, 1)
      toast.add({
        severity: 'success',
        summary: 'Encuesta eliminada',
        detail: 'La encuesta ha sido eliminada correctamente',
        life: 3000
      })
    }
  }
}
</script>