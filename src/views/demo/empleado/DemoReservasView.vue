<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-3xl font-bold text-gray-900">Mis Reservas</h1>
      <p class="text-gray-600 mt-1">Aquí puedes ver el historial de todas tus actividades.</p>
    </header>

    <!-- Filtros -->
    <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
          <select v-model="filtroEstado" class="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
            <option value="">Todas las reservas</option>
            <option value="confirmada">Confirmadas</option>
            <option value="completada">Completadas</option>
            <option value="cancelada">Canceladas</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Servicio</label>
          <select v-model="filtroServicio" class="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
            <option value="">Todos los servicios</option>
            <option value="yoga">Yoga</option>
            <option value="meditacion">Meditación</option>
            <option value="coaching">Coaching</option>
            <option value="nutricion">Nutrición</option>
          </select>
        </div>
        
        <div class="flex items-end">
          <button @click="limpiarFiltros" class="w-full glass-button-outline text-gray-700 bg-white/60 hover:bg-gray-50/80 px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50">
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>

    <!-- Lista de Reservas -->
    <div class="space-y-4">
      <div 
        v-for="reserva in reservasFiltradas" 
        :key="reserva.id" 
        class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-4">
              <div :class="[
                'w-12 h-12 rounded-xl flex items-center justify-center',
                getServiceIconClass(reserva.tipo)
              ]">
                <component :is="getServiceIcon(reserva.tipo)" class="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900">{{ reserva.titulo }}</h3>
                <p class="text-sm text-gray-600">{{ reserva.colaborador }}</p>
              </div>
            </div>
            
            <div class="text-right">
              <span :class="[
                'px-3 py-1 rounded-full text-xs font-medium mb-2 inline-block',
                getStatusClass(reserva.estado)
              ]">
                {{ getStatusText(reserva.estado) }}
              </span>
              
              <div v-if="reserva.estado === 'completada' && reserva.puntos" class="flex items-center justify-end">
                <Star class="h-4 w-4 text-yellow-500 mr-1" />
                <span class="text-sm text-primary font-medium">+{{ reserva.puntos }} puntos</span>
              </div>
            </div>
          </div>
          
          <!-- Información de la sesión -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="flex items-center">
              <Calendar class="h-4 w-4 text-gray-500 mr-2" />
              <span class="text-sm text-gray-600">{{ formatDateTime(reserva.fecha) }}</span>
            </div>
            <div class="flex items-center">
              <component :is="reserva.modalidad === 'online' ? Globe : MapPin" class="h-4 w-4 text-gray-500 mr-2" />
              <span class="text-sm text-gray-600">
                {{ reserva.modalidad === 'online' ? 'Sesión Online' : reserva.ubicacion }}
              </span>
            </div>
          </div>

          <!-- Calificación si existe -->
          <div v-if="reserva.calificacion" class="flex items-center mb-4">
            <span class="text-sm text-gray-600 mr-2">Tu calificación:</span>
            <div class="flex items-center">
              <Star
                v-for="i in 5"
                :key="i"
                :class="[
                  'h-4 w-4',
                  i <= reserva.calificacion ? 'text-yellow-400 fill-current' : 'text-gray-300'
                ]"
              />
            </div>
          </div>

          <!-- Comentario si existe -->
          <div v-if="reserva.comentario" class="mb-4 p-3 bg-gray-50/60 rounded-lg backdrop-blur-sm border border-gray-200/50">
            <p class="text-sm text-gray-700">{{ reserva.comentario }}</p>
          </div>
        </div>
        
        <!-- Acciones -->
        <div class="px-6 py-4 bg-gray-50/50 border-t border-gray-200/50 flex gap-2">
          <button 
            class="flex-1 glass-button-outline text-gray-700 bg-white/60 hover:bg-gray-50/80 px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50 text-sm"
            @click="verDetalles(reserva)"
          >
            Ver Detalles
          </button>
          
          <button 
            v-if="reserva.estado === 'confirmada' && new Date(reserva.fecha) > new Date()"
            class="text-sm text-red-600 border border-red-300/50 hover:bg-red-50/80 px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm"
            @click="cancelarReserva(reserva)"
          >
            Cancelar
          </button>
          
          <button 
            v-if="reserva.estado === 'completada' && !reserva.calificacion"
            class="glass-button-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30 text-sm"
            @click="calificarSesion(reserva)"
          >
            Calificar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'primevue/usetoast'
import { 
  Calendar, 
  Users, 
  Star, 
  Globe, 
  MapPin,
  Activity,
  Brain,
  Apple,
  MessageCircle,
  Heart,
  Dumbbell
} from 'lucide-vue-next'

const toast = useToast()

// Estado reactivo
const filtroEstado = ref('')
const filtroServicio = ref('')

// Datos dummy de reservas
const reservas = ref([
  {
    id: 1,
    titulo: 'Yoga Matutino',
    fecha: '2025-01-18T08:00:00',
    colaborador: 'Elena Vásquez',
    modalidad: 'presencial',
    ubicacion: 'Sala Zen',
    tipo: 'yoga',
    estado: 'completada',
    calificacion: 5,
    comentario: 'Excelente sesión, muy relajante',
    puntos: 50
  },
  {
    id: 2,
    titulo: 'Coaching de Productividad',
    fecha: '2025-01-22T16:00:00',
    colaborador: 'Carlos Ruiz',
    modalidad: 'online',
    ubicacion: 'Google Meet',
    tipo: 'coaching',
    estado: 'confirmada',
    calificacion: null,
    comentario: null,
    puntos: null
  },
  {
    id: 3,
    titulo: 'Meditación Mindfulness',
    fecha: '2025-01-15T12:30:00',
    colaborador: 'Miguel Torres',
    modalidad: 'online',
    ubicacion: 'Zoom',
    tipo: 'meditacion',
    estado: 'completada',
    calificacion: null,
    comentario: null,
    puntos: 40
  },
  {
    id: 4,
    titulo: 'Nutrición Saludable',
    fecha: '2025-01-10T14:00:00',
    colaborador: 'Dr. Ana López',
    modalidad: 'presencial',
    ubicacion: 'Sala de Conferencias',
    tipo: 'nutricion',
    estado: 'cancelada',
    calificacion: null,
    comentario: 'Cancelada por enfermedad',
    puntos: null
  }
])

// Computed
const reservasFiltradas = computed(() => {
  let resultado = reservas.value
  
  if (filtroEstado.value) {
    resultado = resultado.filter(r => r.estado === filtroEstado.value)
  }
  
  if (filtroServicio.value) {
    resultado = resultado.filter(r => r.tipo === filtroServicio.value)
  }
  
  return resultado
})

// Métodos
const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
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

const getStatusClass = (estado) => {
  const classMap = {
    confirmada: 'bg-green-100 text-green-800',
    pendiente: 'bg-yellow-100 text-yellow-800',
    cancelada: 'bg-red-100 text-red-800',
    completada: 'bg-blue-100 text-blue-800'
  }
  return classMap[estado] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (estado) => {
  const textMap = {
    confirmada: 'Confirmada',
    pendiente: 'Pendiente',
    cancelada: 'Cancelada',
    completada: 'Completada'
  }
  return textMap[estado] || estado
}

const cancelarReserva = (reserva) => {
  if (!confirm(`¿Estás seguro de que quieres cancelar la reserva para "${reserva.titulo}"?`)) {
    return
  }
  
  reserva.estado = 'cancelada'
  reserva.comentario = 'Cancelada por el usuario'
  
  toast.add({
    severity: 'success',
    summary: 'Reserva cancelada',
    detail: 'Tu reserva ha sido cancelada exitosamente',
    life: 3000
  })
}

const calificarSesion = (reserva) => {
  toast.add({
    severity: 'info',
    summary: 'Próximamente',
    detail: 'La funcionalidad de calificación se implementará pronto',
    life: 3000
  })
}

const verDetalles = (reserva) => {
  toast.add({
    severity: 'info',
    summary: 'Ver detalles',
    detail: `Mostrando detalles de "${reserva.titulo}"`,
    life: 3000
  })
}

const limpiarFiltros = () => {
  filtroEstado.value = ''
  filtroServicio.value = ''
}
</script>