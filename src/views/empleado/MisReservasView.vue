<template>
  <div class="p-6 md:p-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Mis Reservas</h1>
      <p class="text-gray-600 mt-1">Aquí puedes ver el historial de todas tus actividades.</p>
    </header>

    <!-- Filtros -->
    <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
          <select v-model="filtroEstado" @change="aplicarFiltros" class="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
            <option value="">Todas las reservas</option>
            <option value="confirmada">Confirmadas</option>
            <option value="completada">Completadas</option>
            <option value="cancelada">Canceladas</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Servicio</label>
          <select v-model="filtroServicio" @change="aplicarFiltros" class="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
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

    <!-- Loading State -->
    <div v-if="loading" class="space-y-4">
      <div v-for="n in 4" :key="n" class="glass-card rounded-xl shadow-lg p-6 animate-pulse backdrop-blur-sm border border-white/20">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <div class="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
            <div class="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
          <div class="h-8 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="reservasFiltradas.length === 0" class="glass-card rounded-xl shadow-lg p-12 text-center backdrop-blur-sm border border-white/20">
      <BookmarkCheck class="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        {{ reservas.length === 0 ? 'Aún no tenemos datos' : 'No se encontraron resultados' }}
      </h3>
      <p class="text-gray-500 mb-4">
        {{ reservas.length === 0 
          ? 'No tienes reservas registradas. ¡Anímate a apuntarte a una actividad!' 
          : 'Intenta ajustar los filtros de búsqueda.'
        }}
      </p>
      <router-link to="/empleado/reservar-actividad">
        <button class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium">
          Explorar Actividades
        </button>
      </router-link>
    </div>

    <!-- Lista de Reservas -->
    <div v-else class="space-y-4">
      <div 
        v-for="reserva in reservasPaginadas" 
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

    <!-- Paginación -->
    <div v-if="totalPages > 1" class="flex justify-center items-center space-x-4 mt-8">
      <button
        :disabled="currentPage === 1"
        @click="cambiarPagina(currentPage - 1)"
        class="glass-button-outline text-gray-700 bg-white/60 hover:bg-gray-50/80 px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50 disabled:opacity-50"
      >
        <ChevronLeft class="h-4 w-4" />
      </button>
      
      <span class="text-sm text-gray-600">
        Página {{ currentPage }} de {{ totalPages }}
      </span>
      
      <button
        :disabled="currentPage === totalPages"
        @click="cambiarPagina(currentPage + 1)"
        class="glass-button-outline text-gray-700 bg-white/60 hover:bg-gray-50/80 px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50 disabled:opacity-50"
      >
        <ChevronRight class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { 
  Calendar, 
  Users, 
  Star, 
  Globe, 
  MapPin,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Activity,
  Brain,
  Apple,
  MessageCircle,
  Heart,
  Dumbbell
} from 'lucide-vue-next'

const router = useRouter()
const toast = useToast()

// Estado reactivo
const loading = ref(false)
const filtroEstado = ref('')
const filtroServicio = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

// Datos de ejemplo (dummy data)
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

const reservasPaginadas = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return reservasFiltradas.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(reservasFiltradas.value.length / itemsPerPage)
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

const cancelarReserva = async (reserva) => {
  if (!confirm(`¿Estás seguro de que quieres cancelar la reserva para "${reserva.titulo}"?`)) {
    return
  }
  
  try {
    // Simular cancelación (aquí iría la lógica real)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Actualizar estado localmente
    reserva.estado = 'cancelada'
    reserva.comentario = 'Cancelada por el usuario'
    
    toast.add({
      severity: 'success',
      summary: 'Reserva cancelada',
      detail: 'Tu reserva ha sido cancelada exitosamente',
      life: 3000
    })
    
  } catch (error) {
    console.error('Error canceling reservation:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo cancelar la reserva',
      life: 3000
    })
  }
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
  router.push(`/empleado/reservas/${reserva.id}`)
}

const aplicarFiltros = () => {
  currentPage.value = 1
}

const limpiarFiltros = () => {
  filtroEstado.value = ''
  filtroServicio.value = ''
  currentPage.value = 1
}

const cambiarPagina = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>