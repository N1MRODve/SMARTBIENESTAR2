<template>
  <div class="space-y-8">
    <!-- Header -->
    <header class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Gestión de Horarios</h1>
          <p class="text-gray-600">Administra sesiones, reservas y ocupación de clases</p>
        </div>
        <button 
          @click="crearNuevaSesion"
          class="glass-button-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30 flex items-center"
        >
          <Plus class="h-4 w-4 mr-2" />
          Nueva Sesión
        </button>
      </div>
    </header>

    <!-- Estadísticas de Horarios -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-primary mb-2">{{ stats.sesionesEstaSemana }}</h3>
        <p class="text-gray-700 font-medium">Sesiones Esta Semana</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-green-600 mb-2">{{ stats.ocupacionPromedio }}%</h3>
        <p class="text-gray-700 font-medium">Ocupación Promedio</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-blue-600 mb-2">{{ stats.colaboradoresActivos }}</h3>
        <p class="text-gray-700 font-medium">Colaboradores Activos</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-yellow-600 mb-2">{{ stats.reservasPendientes }}</h3>
        <p class="text-gray-700 font-medium">Reservas Pendientes</p>
      </div>
    </div>

    <!-- Calendario de Sesiones -->
    <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-gray-900">Calendario de Sesiones</h2>
        <div class="flex items-center space-x-4">
          <select v-model="filtroServicio" class="px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
            <option value="">Todos los servicios</option>
            <option value="yoga">Yoga</option>
            <option value="meditacion">Meditación</option>
            <option value="coaching">Coaching</option>
            <option value="nutricion">Nutrición</option>
          </select>
        </div>
      </div>
      
      <div class="glass-card p-12 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
        <Calendar class="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">Calendario Interactivo</h3>
        <p class="text-gray-500">Vista de calendario con sesiones programadas (próximamente)</p>
      </div>
    </div>

    <!-- Próximas Sesiones -->
    <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
      <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Clock class="h-5 w-5 mr-2 text-primary" />
        Próximas Sesiones
      </h2>
      
      <div v-if="proximasSesiones.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
        <Clock class="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <p class="font-medium mb-2">Aún no tenemos datos</p>
        <p class="text-sm text-gray-500 mb-4">No hay sesiones programadas próximamente</p>
        <button 
          @click="crearNuevaSesion"
          class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium"
        >
          Programar Primera Sesión
        </button>
      </div>

      <div v-else class="space-y-4">
        <div 
          v-for="sesion in proximasSesiones" 
          :key="sesion.id"
          class="glass-card p-6 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-4">
              <div :class="[
                'w-12 h-12 rounded-xl flex items-center justify-center',
                getServiceIconClass(sesion.tipo)
              ]">
                <component :is="getServiceIcon(sesion.tipo)" class="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">{{ sesion.titulo }}</h3>
                <p class="text-sm text-gray-600">{{ sesion.colaborador }}</p>
              </div>
            </div>
            <span :class="[
              'px-3 py-1 rounded-full text-xs font-medium',
              getOccupancyClass(sesion.reservas, sesion.capacidad)
            ]">
              {{ sesion.reservas }}/{{ sesion.capacidad }}
            </span>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="flex items-center">
              <Calendar class="h-4 w-4 text-gray-500 mr-2" />
              <span class="text-sm text-gray-600">{{ formatDateTime(sesion.fecha) }}</span>
            </div>
            <div class="flex items-center">
              <component :is="sesion.modalidad === 'online' ? Globe : MapPin" class="h-4 w-4 text-gray-500 mr-2" />
              <span class="text-sm text-gray-600">{{ sesion.modalidad === 'online' ? 'Online' : sesion.ubicacion }}</span>
            </div>
          </div>

          <div class="flex gap-2">
            <button class="flex-1 glass-button-outline text-gray-700 bg-white/60 hover:bg-gray-50/80 px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50 text-sm">
              Ver Reservas
            </button>
            <button class="glass-button-outline text-blue-700 bg-white/60 hover:bg-blue-50/80 px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-blue-300/50 text-sm">
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { 
  Plus, 
  Settings, 
  Download, 
  AlertTriangle, 
  Shield, 
  BarChart3, 
  Brain,
  Calendar, 
  Clock, 
  Globe, 
  MapPin,
  TrendingUp,
  TrendingDown,
  Activity,
  MessageCircle,
  Apple,
  Heart,
  Dumbbell
} from 'lucide-vue-next'

const toast = useToast()

// Estado reactivo
const filtroServicio = ref('')

// Estadísticas
const stats = ref({
  sesionesEstaSemana: 24,
  ocupacionPromedio: 78,
  colaboradoresActivos: 8,
  reservasPendientes: 12
})

// Datos dummy
const alertasCriticas = ref([
  {
    id: 1,
    titulo: 'Sobrecarga en Yoga Matutino',
    descripcion: 'Las sesiones de yoga matutino están constantemente llenas',
    nivel: 'medio'
  }
])

const metricasBienestar = ref([
  {
    id: 1,
    nombre: 'Ocupación General',
    valor_actual: 78,
    valor_maximo: 100,
    cambio: 12,
    tendencia: 'positiva',
    descripcion: 'Porcentaje promedio de ocupación'
  },
  {
    id: 2,
    nombre: 'Satisfacción Sesiones',
    valor_actual: 4.6,
    valor_maximo: 5,
    cambio: 8,
    tendencia: 'positiva',
    descripcion: 'Calificación promedio de sesiones'
  },
  {
    id: 3,
    nombre: 'Cancelaciones',
    valor_actual: 5,
    valor_maximo: 20,
    cambio: -15,
    tendencia: 'positiva',
    descripcion: 'Porcentaje de cancelaciones'
  }
])

const predicciones = ref([
  {
    id: 1,
    titulo: 'Alta Demanda de Yoga',
    descripcion: 'Se prevé un aumento del 25% en la demanda de sesiones de yoga',
    tipo: 'oportunidad',
    confianza: 88,
    icono: TrendingUp
  },
  {
    id: 2,
    titulo: 'Posible Sobrecarga de Colaboradores',
    descripcion: 'Algunos colaboradores podrían estar sobrecargados la próxima semana',
    tipo: 'riesgo',
    confianza: 72,
    icono: AlertTriangle
  }
])

const proximasSesiones = ref([
  {
    id: 1,
    titulo: 'Yoga Matutino',
    colaborador: 'Elena Vásquez',
    fecha: '2025-01-22T08:00:00',
    modalidad: 'presencial',
    ubicacion: 'Sala Zen',
    tipo: 'yoga',
    reservas: 14,
    capacidad: 15
  },
  {
    id: 2,
    titulo: 'Coaching de Liderazgo',
    colaborador: 'Carlos Ruiz',
    fecha: '2025-01-22T16:00:00',
    modalidad: 'online',
    tipo: 'coaching',
    reservas: 6,
    capacidad: 10
  },
  {
    id: 3,
    titulo: 'Nutrición Saludable',
    colaborador: 'Dr. Ana López',
    fecha: '2025-01-23T14:00:00',
    modalidad: 'presencial',
    ubicacion: 'Sala de Conferencias',
    tipo: 'nutricion',
    reservas: 18,
    capacidad: 25
  }
])

// Métodos
const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const getServiceIcon = (tipo) => {
  const iconMap = {
    yoga: Activity,
    meditacion: Brain,
    nutricion: Apple,
    coaching: MessageCircle,
    psicoterapia: Heart,
    entrenamiento: Dumbbell
  }
  return iconMap[tipo] || Activity
}

const getServiceIconClass = (tipo) => {
  const classMap = {
    yoga: 'bg-gradient-to-br from-green-400 to-green-600',
    meditacion: 'bg-gradient-to-br from-purple-400 to-purple-600',
    nutricion: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    coaching: 'bg-gradient-to-br from-blue-400 to-blue-600',
    psicoterapia: 'bg-gradient-to-br from-pink-400 to-pink-600',
    entrenamiento: 'bg-gradient-to-br from-red-400 to-red-600'
  }
  return classMap[tipo] || 'bg-gradient-to-br from-gray-400 to-gray-600'
}

const getOccupancyClass = (reservas, capacidad) => {
  const porcentaje = (reservas / capacidad) * 100
  if (porcentaje >= 90) return 'bg-red-100 text-red-800'
  if (porcentaje >= 70) return 'bg-yellow-100 text-yellow-800'
  return 'bg-green-100 text-green-800'
}

const getTrendIcon = (tendencia) => {
  return tendencia === 'positiva' ? TrendingUp : TrendingDown
}

const getTrendColor = (tendencia) => {
  return tendencia === 'positiva' ? 'text-green-500' : 'text-red-500'
}

const getMetricColor = (actual, maximo) => {
  const porcentaje = (actual / maximo) * 100
  if (porcentaje >= 80) return 'bg-green-500'
  if (porcentaje >= 60) return 'bg-yellow-500'
  return 'bg-red-500'
}

const crearNuevaSesion = () => {
  toast.add({
    severity: 'info',
    summary: 'Próximamente',
    detail: 'La funcionalidad de crear sesiones se implementará pronto',
    life: 3000
  })
}
</script>