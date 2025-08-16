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
      
      <!-- Vista de calendario simplificada -->
      <div class="grid grid-cols-7 gap-2 mb-4">
        <div v-for="dia in diasSemana" :key="dia" class="text-center text-sm font-medium text-gray-700 p-2">
          {{ dia }}
        </div>
      </div>
      
      <div class="grid grid-cols-7 gap-2">
        <div 
          v-for="(dia, index) in diasDelMes" 
          :key="index"
          class="min-h-[100px] p-2 border border-gray-200 rounded-lg bg-white/50"
        >
          <div class="text-sm font-medium text-gray-900 mb-2">{{ dia.numero }}</div>
          <div class="space-y-1">
            <div
              v-for="sesion in obtenerSesionesDia(dia.fecha)"
              :key="sesion.id"
              @click="verDetallesSesion(sesion)"
              :class="[
                'p-1 rounded text-xs cursor-pointer transition-all hover:shadow-sm',
                getColorServicio(sesion.tipo)
              ]"
            >
              <div class="font-medium truncate">{{ sesion.titulo }}</div>
              <div class="text-xs opacity-75">{{ formatHora(sesion.fecha_inicio) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Próximas Sesiones -->
    <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
      <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Clock class="h-5 w-5 mr-2 text-primary" />
        Próximas Sesiones
      </h2>
      
      <div class="space-y-4">
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
            <button 
              @click="verReservas(sesion)"
              class="flex-1 glass-button-outline text-gray-700 bg-white/60 hover:bg-gray-50/80 px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50 text-sm"
            >
              Ver Reservas
            </button>
            <button 
              @click="editarSesion(sesion)"
              class="glass-button-outline text-blue-700 bg-white/60 hover:bg-blue-50/80 px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-blue-300/50 text-sm"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'primevue/usetoast'
import { 
  Plus, 
  Settings, 
  Download, 
  AlertTriangle, 
  BarChart3, 
  Brain,
  Calendar, 
  Clock, 
  Globe, 
  MapPin,
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

// Datos para el calendario
const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

const diasDelMes = computed(() => {
  const dias = []
  const hoy = new Date()
  const primerDia = new Date(hoy.getFullYear(), hoy.getMonth(), 1)
  const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0)
  
  for (let i = 1; i <= ultimoDia.getDate(); i++) {
    const fecha = new Date(hoy.getFullYear(), hoy.getMonth(), i)
    dias.push({
      numero: i,
      fecha: fecha.toDateString()
    })
  }
  
  return dias
})

// Sesiones dummy
const sesiones = ref([
  {
    id: 1,
    titulo: 'Yoga Matutino',
    fecha_inicio: '2025-01-22T08:00:00',
    tipo: 'yoga',
    colaborador: 'Elena Vásquez',
    modalidad: 'presencial',
    ubicacion: 'Sala Zen',
    reservas: 12,
    capacidad: 15
  },
  {
    id: 2,
    titulo: 'Coaching Grupal',
    fecha_inicio: '2025-01-22T16:00:00',
    tipo: 'coaching',
    colaborador: 'Carlos Ruiz',
    modalidad: 'online',
    ubicacion: 'Google Meet',
    reservas: 6,
    capacidad: 10
  },
  {
    id: 3,
    titulo: 'Nutrición Saludable',
    fecha_inicio: '2025-01-23T14:00:00',
    tipo: 'nutricion',
    colaborador: 'Dr. Ana López',
    modalidad: 'presencial',
    ubicacion: 'Sala de Conferencias',
    reservas: 18,
    capacidad: 25
  }
])

const proximasSesiones = computed(() => sesiones.value)

// Métodos
const obtenerSesionesDia = (fecha) => {
  return sesiones.value.filter(sesion => {
    const fechaSesion = new Date(sesion.fecha_inicio).toDateString()
    return fechaSesion === fecha
  })
}

const formatHora = (fecha) => {
  return new Date(fecha).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

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

const getColorServicio = (tipo) => {
  const colores = {
    yoga: 'bg-green-100 text-green-800 border border-green-200',
    meditacion: 'bg-purple-100 text-purple-800 border border-purple-200',
    nutricion: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    coaching: 'bg-blue-100 text-blue-800 border border-blue-200',
    psicoterapia: 'bg-pink-100 text-pink-800 border border-pink-200',
    entrenamiento: 'bg-red-100 text-red-800 border border-red-200'
  }
  return colores[tipo] || 'bg-gray-100 text-gray-800 border border-gray-200'
}

const getOccupancyClass = (reservas, capacidad) => {
  const porcentaje = (reservas / capacidad) * 100
  if (porcentaje >= 90) return 'bg-red-100 text-red-800'
  if (porcentaje >= 70) return 'bg-yellow-100 text-yellow-800'
  return 'bg-green-100 text-green-800'
}

const crearNuevaSesion = () => {
  toast.add({
    severity: 'success',
    summary: 'Nueva sesión',
    detail: 'Abriendo formulario para crear nueva sesión...',
    life: 3000
  })
}

const verDetallesSesion = (sesion) => {
  toast.add({
    severity: 'info',
    summary: 'Detalles de sesión',
    detail: `Mostrando detalles de "${sesion.titulo}"`,
    life: 3000
  })
}

const verReservas = (sesion) => {
  toast.add({
    severity: 'info',
    summary: 'Reservas de sesión',
    detail: `Mostrando ${sesion.reservas} reservas para "${sesion.titulo}"`,
    life: 3000
  })
}

const editarSesion = (sesion) => {
  toast.add({
    severity: 'info',
    summary: 'Editar sesión',
    detail: `Editando "${sesion.titulo}"...`,
    life: 3000
  })
}
</script>