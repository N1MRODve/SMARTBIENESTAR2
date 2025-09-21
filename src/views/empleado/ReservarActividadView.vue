<template>
  <div class="p-6 md:p-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Próximas Sesiones</h1>
      <p class="text-gray-600 mt-1">Explora las próximas sesiones de bienestar y reserva tu plaza.</p>
    </header>

    <!-- Filtros -->
    <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Servicio</label>
          <select v-model="filtros.tipoServicio" @change="aplicarFiltros" class="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
            <option value="">Todos los servicios</option>
            <option value="yoga">Yoga</option>
            <option value="meditacion">Meditación</option>
            <option value="coaching">Coaching</option>
            <option value="nutricion">Nutrición</option>
            <option value="psicoterapia">Psicoterapia</option>
            <option value="entrenamiento">Entrenamiento</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Modalidad</label>
          <select v-model="filtros.modalidad" @change="aplicarFiltros" class="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
            <option value="">Todas</option>
            <option value="online">Online</option>
            <option value="presencial">Presencial</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
          <input 
            type="date" 
            v-model="filtros.fecha"
            @change="aplicarFiltros"
            class="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          >
        </div>
        
        <div class="flex items-end">
          <button @click="limpiarFiltros" class="w-full glass-button-outline text-gray-700 bg-white/60 hover:bg-gray-50/80 px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50">
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 3" :key="n" class="glass-card rounded-xl shadow-lg p-6 animate-pulse backdrop-blur-sm border border-white/20">
        <div class="h-32 bg-gray-300 rounded-lg mb-4"></div>
        <div class="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div class="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
        <div class="h-10 bg-gray-300 rounded w-full"></div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="paginatedActividades.length === 0" class="glass-card rounded-xl shadow-lg p-12 text-center backdrop-blur-sm border border-white/20">
      <Calendar class="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        {{ actividades.length === 0 ? 'No hay sesiones programadas' : 'No hay sesiones disponibles' }}
      </h3>
      <p class="text-gray-500 mb-4">
        {{ actividades.length === 0 
          ? 'Vuelve a consultar más tarde para ver nuevas sesiones.' 
          : 'No se encontraron sesiones que coincidan con tus filtros.'
        }}
      </p>
      <button @click="limpiarFiltros" class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium">
        {{ actividades.length === 0 ? 'Actualizar' : 'Ver Todas las Sesiones' }}
      </button>
    </div>

    <!-- Actividades Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="actividad in paginatedActividades" 
        :key="actividad.id" 
        class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        <!-- Header de la actividad -->
        <div class="relative h-40 bg-gradient-to-br from-primary/20 to-secondary/20">
          <div class="absolute inset-0 flex items-center justify-center">
            <component :is="getServiceIcon(actividad.tipo)" class="h-16 w-16 text-primary" />
          </div>
          <div class="absolute top-3 right-3">
            <span :class="[
              'px-3 py-1 rounded-full text-xs font-medium',
              getServiceTypeClass(actividad.tipo)
            ]">
              {{ actividad.tipo }}
            </span>
          </div>
          <div class="absolute bottom-3 left-3">
            <span :class="[
              'px-2 py-1 rounded-full text-xs font-medium',
              actividad.modalidad === 'online' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            ]">
              {{ actividad.modalidad === 'online' ? 'Online' : 'Presencial' }}
            </span>
          </div>
        </div>
        
        <div class="p-6">
          <!-- Título y colaborador -->
          <div class="mb-4">
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ actividad.titulo }}</h3>
            <div class="flex items-center mb-2">
              <User class="h-4 w-4 text-gray-500 mr-2" />
              <p class="text-sm text-gray-600">{{ actividad.colaborador }}</p>
            </div>
          </div>
          
          <!-- Fecha y hora -->
          <div class="flex items-center mb-3">
            <Calendar class="h-4 w-4 text-gray-500 mr-2" />
            <p class="text-sm text-gray-600 font-medium">{{ formatDateTime(actividad.fecha) }}</p>
          </div>
          
          <!-- Ubicación -->
          <div class="flex items-center mb-4">
            <component :is="actividad.modalidad === 'online' ? Globe : MapPin" class="h-4 w-4 text-gray-500 mr-2" />
            <p class="text-sm text-gray-600">
              {{ actividad.modalidad === 'online' ? 'Sesión Online' : actividad.ubicacion }}
            </p>
          </div>
          
          <!-- Descripción -->
          <p class="text-gray-700 mb-4 line-clamp-3">{{ actividad.descripcion }}</p>
          
          <!-- Información de plazas y puntos -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <Users class="h-4 w-4 text-gray-500 mr-1" />
              <span class="text-sm text-gray-600">
                {{ actividad.plazasOcupadas }}/{{ actividad.capacidad }} plazas
              </span>
            </div>
            <div class="flex items-center">
              <Star class="h-4 w-4 text-yellow-500 mr-1" />
              <span class="text-sm text-primary font-medium">
                +{{ actividad.puntos }} puntos
              </span>
            </div>
          </div>
          
          <!-- Barra de ocupación -->
          <div class="mb-6">
            <div class="bg-gray-200 rounded-full h-2">
              <div 
                :class="[
                  'rounded-full h-2 transition-all duration-300',
                  getOccupancyColor(actividad.plazasOcupadas, actividad.capacidad)
                ]"
                :style="{ width: `${(actividad.plazasOcupadas / actividad.capacidad) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
        
        <!-- Botón de acción -->
        <div class="px-6 py-4 bg-gray-50/50 border-t border-gray-200/50">
          <button 
            @click="handleReserva(actividad)"
            :disabled="reservandoId === actividad.id || (!actividad.usuario_reservado && actividad.plazasOcupadas >= actividad.capacidad)"
            :class="[
              'w-full font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
              actividad.usuario_reservado 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-primary text-white hover:bg-primary-dark'
            ]"
          >
            <span v-if="reservandoId === actividad.id">Procesando...</span>
            <span v-else-if="actividad.usuario_reservado">Cancelar Reserva</span>
            <span v-else-if="actividad.plazasOcupadas >= actividad.capacidad">Completo</span>
            <span v-else>Reservar Plaza</span>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useEmpleadoStore } from '@/stores/empleado.store'
import { 
  Calendar, 
  User, 
  Users, 
  Star, 
  Globe, 
  MapPin,
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
const empleadoStore = useEmpleadoStore()

// Estado reactivo local
const currentPage = ref(1)
const itemsPerPage = 12

// Filtros
const filtros = ref({
  tipoServicio: '',
  modalidad: '',
  fecha: ''
})

// Computed properties del store
const loading = computed(() => empleadoStore.loading.actividades)
const actividades = computed(() => empleadoStore.actividadesDisponibles)
const reservandoId = computed(() => empleadoStore.reservandoId)

const actividadesFiltradas = computed(() => {
  let resultado = actividades.value
  
  if (filtros.value.tipoServicio) {
    resultado = resultado.filter(a => a.tipo === filtros.value.tipoServicio)
  }
  
  if (filtros.value.modalidad) {
    resultado = resultado.filter(a => a.modalidad === filtros.value.modalidad)
  }
  
  if (filtros.value.fecha) {
    const fechaFiltro = new Date(filtros.value.fecha)
    resultado = resultado.filter(a => {
      const fechaActividad = new Date(a.fecha)
      return fechaActividad.toDateString() === fechaFiltro.toDateString()
    })
  }
  
  return resultado
})

const paginatedActividades = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return actividadesFiltradas.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(actividadesFiltradas.value.length / itemsPerPage)
})

// Métodos
const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  if (date.toDateString() === new Date().toDateString()) {
    return `Hoy, ${date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return `Mañana, ${date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`
  } else {
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }
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

const getServiceTypeClass = (tipo) => {
  const classMap = {
    yoga: 'bg-green-100 text-green-800',
    meditacion: 'bg-purple-100 text-purple-800',
    nutricion: 'bg-yellow-100 text-yellow-800',
    coaching: 'bg-blue-100 text-blue-800',
    psicoterapia: 'bg-pink-100 text-pink-800',
    entrenamiento: 'bg-red-100 text-red-800'
  }
  return classMap[tipo] || 'bg-gray-100 text-gray-800'
}

const getOccupancyColor = (ocupadas, total) => {
  const porcentaje = (ocupadas / total) * 100
  if (porcentaje >= 90) return 'bg-red-500'
  if (porcentaje >= 70) return 'bg-yellow-500'
  return 'bg-green-500'
}

const handleReserva = async (actividad) => {
  if (actividad.usuario_reservado) {
    // Cancelar reserva
    try {
      await empleadoStore.cancelarReserva(actividad.id);
      toast.success(`Tu reserva para "${actividad.titulo}" ha sido cancelada.`);
    } catch (error) {
      console.error('Error canceling reservation:', error);
      toast.error(error.message || 'No se pudo cancelar la reserva');
    }
  } else {
    // Crear reserva
    if (actividad.plazasOcupadas >= actividad.capacidad) {
      toast.warning('Esta actividad ya no tiene plazas disponibles', {
        timeout: 3000
      });
      return;
    }
    try {
      await empleadoStore.reservarActividad(actividad.id);
      toast.success(`¡Reserva confirmada para "${actividad.titulo}"!`);
    } catch (error) {
      console.error('Error making reservation:', error);
      toast.error(error.message || 'No se pudo realizar la reserva');
    }
  }
}

const aplicarFiltros = () => {
  currentPage.value = 1
}

const limpiarFiltros = () => {
  filtros.value = {
    tipoServicio: '',
    modalidad: '',
    fecha: ''
  }
  currentPage.value = 1
  empleadoStore.loadActividadesDisponibles();
}

const cambiarPagina = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  empleadoStore.loadActividadesDisponibles()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  overflow: hidden;
}
</style>