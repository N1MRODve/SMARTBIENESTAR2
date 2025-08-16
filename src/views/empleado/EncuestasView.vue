<template>
  <div class="p-6 md:p-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Mis Encuestas</h1>
      <p class="text-gray-600 mt-1">Tu opinión es importante. Completa las encuestas pendientes.</p>
    </header>

    <!-- Estadísticas de Encuestas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-primary mb-2">{{ stats.pendientes }}</h3>
        <p class="text-gray-700 font-medium">Pendientes</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-green-600 mb-2">{{ stats.completadas }}</h3>
        <p class="text-gray-700 font-medium">Completadas</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-yellow-600 mb-2">{{ stats.puntosTotales }}</h3>
        <p class="text-gray-700 font-medium">Puntos Ganados</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-4">
      <div v-for="n in 3" :key="n" class="glass-card rounded-xl shadow-lg p-6 animate-pulse backdrop-blur-sm border border-white/20">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <div class="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
            <div class="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div class="h-3 bg-gray-300 rounded w-1/3"></div>
          </div>
          <div class="h-10 bg-gray-300 rounded w-32"></div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="misEncuestas.length === 0" class="glass-card rounded-xl shadow-lg p-12 text-center backdrop-blur-sm border border-white/20">
      <ClipboardList class="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">Aún no tenemos datos</h3>
      <p class="text-gray-500">No tienes encuestas disponibles en este momento.</p>
    </div>

    <!-- Lista de Encuestas -->
    <div v-else class="space-y-4">
      <div 
        v-for="participacion in misEncuestas" 
        :key="participacion.id" 
        class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mr-3">
                <ClipboardList class="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 class="text-lg font-bold text-gray-800">{{ participacion.encuesta?.titulo || 'Encuesta sin título' }}</h2>
                <span :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  getEncuestaStatusClass(participacion.estado)
                ]">
                  {{ getEncuestaStatusText(participacion.estado) }}
                </span>
              </div>
            </div>
            
            <p class="text-sm text-gray-600 mb-3">{{ participacion.encuesta?.descripcion || 'Sin descripción' }}</p>
            
            <div class="flex items-center justify-between text-xs text-gray-500">
              <span>Fecha límite: {{ formatDate(participacion.encuesta?.fecha_fin) }}</span>
              <span v-if="participacion.fecha_completado">
                Completada: {{ formatDate(participacion.fecha_completado) }}
              </span>
            </div>
          </div>
          
          <div class="ml-6">
            <button 
              v-if="participacion.estado === 'pendiente'" 
              class="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors"
              @click="completarEncuesta(participacion)"
            >
              Completar Encuesta
            </button>
            <div v-else class="text-center">
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <CheckCircle class="h-6 w-6 text-green-600" />
              </div>
              <span class="text-sm font-semibold text-green-600">Completada</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { ClipboardList, CheckCircle } from 'lucide-vue-next'

const router = useRouter()
const toast = useToast()

// Estado reactivo
const loading = ref(false)

// Estadísticas
const stats = ref({
  pendientes: 2,
  completadas: 5,
  puntosTotales: 250
})

// Datos de ejemplo (dummy data)
const misEncuestas = ref([
  {
    id: 1,
    estado: 'pendiente',
    fecha_invitacion: '2025-01-15T10:00:00',
    fecha_completado: null,
    encuesta: {
      id: 'enc-1',
      titulo: 'Evaluación de Clima Laboral Q1',
      descripcion: 'Ayúdanos a mejorar el ambiente de trabajo compartiendo tu experiencia',
      fecha_fin: '2025-01-30T23:59:59'
    }
  },
  {
    id: 2,
    estado: 'pendiente',
    fecha_invitacion: '2025-01-18T09:00:00',
    fecha_completado: null,
    encuesta: {
      id: 'enc-2',
      titulo: 'Feedback Actividades de Bienestar',
      descripcion: 'Comparte tu experiencia con nuestras actividades de bienestar',
      fecha_fin: null
    }
  },
  {
    id: 3,
    estado: 'completada',
    fecha_invitacion: '2025-01-05T10:00:00',
    fecha_completado: '2025-01-08T14:30:00',
    encuesta: {
      id: 'enc-3',
      titulo: 'Satisfacción General Diciembre',
      descripcion: 'Evaluación mensual de satisfacción laboral',
      fecha_fin: '2025-01-15T23:59:59'
    }
  }
])

// Métodos
const formatDate = (dateString) => {
  if (!dateString) return 'Sin fecha límite'
  return new Date(dateString).toLocaleDateString('es-ES', { 
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const getEncuestaStatusClass = (estado) => {
  const classMap = {
    pendiente: 'bg-yellow-100 text-yellow-800',
    completada: 'bg-green-100 text-green-800',
    parcial: 'bg-blue-100 text-blue-800'
  }
  return classMap[estado] || 'bg-gray-100 text-gray-800'
}

const getEncuestaStatusText = (estado) => {
  const textMap = {
    pendiente: 'Pendiente',
    completada: 'Completada',
    parcial: 'Parcial'
  }
  return textMap[estado] || estado
}

const completarEncuesta = (participacion) => {
  toast.add({
    severity: 'info',
    summary: 'Próximamente',
    detail: 'La funcionalidad de completar encuestas se implementará pronto',
    life: 3000
  })
}
</script>