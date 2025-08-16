<template>
  <div class="p-6 md:p-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Actividades Disponibles</h1>
      <p class="text-gray-600 mt-1">Explora las próximas actividades y reserva tu plaza.</p>
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
          <Button @click="limpiarFiltros" variant="outline" class="w-full">
            Limpiar Filtros
          </Button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 6" :key="n" class="glass-card rounded-xl shadow-lg p-6 animate-pulse backdrop-blur-sm border border-white/20">
        <div class="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div class="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div class="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
        <div class="h-10 bg-gray-300 rounded w-full"></div>
      </div>
    </div>

    <div v-else-if="actividadesFiltradas.length === 0" class="glass-card rounded-xl shadow-lg p-12 text-center backdrop-blur-sm border border-white/20">
      <Calendar class="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No hay actividades disponibles</h3>
      <p class="text-gray-500 mb-4">No se encontraron actividades que coincidan con tus filtros.</p>
      <Button @click="limpiarFiltros" variant="primary">
        Ver Todas las Actividades
      </Button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="actividad in actividadesFiltradas" 
        :key="actividad.sesion_id" 
        class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        <div class="p-6">
          <!-- Header con tipo de servicio -->
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-gray-800">{{ actividad.titulo }}</h2>
            <span :class="[
              'px-3 py-1 rounded-full text-xs font-medium',
              getServiceTypeClass(actividad.servicio_tipo)
            ]">
              {{ actividad.servicio_tipo }}
            </span>
          </div>
          
          <!-- Fecha y hora -->
          <div class="flex items-center mb-3">
            <Calendar class="h-4 w-4 text-gray-500 mr-2" />
            <p class="text-sm text-gray-600 font-medium">{{ formatDateTime(actividad.fecha_inicio) }}</p>
          </div>
          
          <!-- Colaborador -->
          <div class="flex items-center mb-3">
            <User class="h-4 w-4 text-gray-500 mr-2" />
            <p class="text-sm text-gray-600">{{ actividad.colaborador_nombre }}</p>
          </div>
          
          <!-- Modalidad y ubicación -->
          <div class="flex items-center mb-4">
            <component :is="actividad.modalidad === 'online' ? Globe : MapPin" class="h-4 w-4 text-gray-500 mr-2" />
            <p class="text-sm text-gray-600">
              {{ actividad.modalidad === 'online' ? 'Sesión Online' : actividad.ubicacion }}
            </p>
          </div>
          
          <!-- Descripción -->
          <p class="text-gray-700 mb-4 line-clamp-3">{{ actividad.descripcion || 'Únete a esta sesión de bienestar y mejora tu calidad de vida.' }}</p>
          
          <!-- Información de plazas y puntos -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <Users class="h-4 w-4 text-gray-500 mr-1" />
              <span class="text-sm text-gray-600">
                {{ actividad.reservas_actuales }}/{{ actividad.capacidad_maxima }} plazas
              </span>
            </div>
            <div class="flex items-center">
              <Star class="h-4 w-4 text-yellow-500 mr-1" />
              <span class="text-sm text-primary font-medium">
                +{{ actividad.puntos_asistencia || 0 }} puntos
              </span>
            </div>
          </div>
          
          <!-- Barra de ocupación -->
          <div class="mb-4">
            <div class="bg-gray-200 rounded-full h-2">
              <div 
                :class="[
                  'rounded-full h-2 transition-all duration-300',
                  getOccupancyColor(actividad.reservas_actuales, actividad.capacidad_maxima)
                ]"
                :style="{ width: `${(actividad.reservas_actuales / actividad.capacidad_maxima) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
        
        <!-- Botón de acción -->
        <div class="px-6 py-4 bg-gray-50/50 border-t border-gray-200/50">
          <button 
            @click="reservarActividad(actividad)"
            :disabled="actividad.reservas_actuales >= actividad.capacidad_maxima || reservando"
            class="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ actividad.reservas_actuales >= actividad.capacidad_maxima ? 'Completo' : reservando ? 'Reservando...' : 'Reservar Plaza' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Paginación -->
    <div v-if="totalPages > 1" class="flex justify-center items-center space-x-4 mt-8">
      <Button
        variant="outline"
        :disabled="currentPage === 1"
        @click="cambiarPagina(currentPage - 1)"
      >
        <ChevronLeft class="h-4 w-4" />
      </Button>
      
      <span class="text-sm text-gray-600">
        Página {{ currentPage }} de {{ totalPages }}
      </span>
      
      <Button
        variant="outline"
        :disabled="currentPage === totalPages"
        @click="cambiarPagina(currentPage + 1)"
      >
        <ChevronRight class="h-4 w-4" />
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { 
  Calendar, 
  User, 
  Users, 
  Star, 
  Globe, 
  MapPin,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next'
import { useAuthStore } from '../../stores/auth.store'
import { supabase } from '../../services/supabase'
import Button from '../../components/common/Button.vue'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

// Estado reactivo
const loading = ref(true)
const reservando = ref(false)
const actividades = ref([])
const currentPage = ref(1)
const itemsPerPage = 12
const totalItems = ref(0)

// Filtros
const filtros = ref({
  tipoServicio: '',
  modalidad: '',
  fecha: ''
})

// Computed
const actividadesFiltradas = computed(() => {
  let resultado = actividades.value
  
  if (filtros.value.tipoServicio) {
    resultado = resultado.filter(a => a.servicio_tipo === filtros.value.tipoServicio)
  }
  
  if (filtros.value.modalidad) {
    resultado = resultado.filter(a => a.modalidad === filtros.value.modalidad)
  }
  
  if (filtros.value.fecha) {
    const fechaFiltro = new Date(filtros.value.fecha)
    resultado = resultado.filter(a => {
      const fechaActividad = new Date(a.fecha_inicio)
      return fechaActividad.toDateString() === fechaFiltro.toDateString()
    })
  }
  
  return resultado
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

const getServiceTypeClass = (tipo) => {
  const classes = {
    'yoga': 'bg-green-100 text-green-800',
    'meditacion': 'bg-purple-100 text-purple-800',
    'coaching': 'bg-blue-100 text-blue-800',
    'nutricion': 'bg-yellow-100 text-yellow-800',
    'psicoterapia': 'bg-pink-100 text-pink-800'
  }
  return classes[tipo] || 'bg-gray-100 text-gray-800'
}

const getOccupancyColor = (reservas, capacidad) => {
  const porcentaje = (reservas / capacidad) * 100
  if (porcentaje >= 90) return 'bg-red-500'
  if (porcentaje >= 70) return 'bg-yellow-500'
  return 'bg-green-500'
}

const cargarActividades = async () => {
  try {
    loading.value = true
    
    const { data, error } = await supabase
      .rpc('get_available_activities', { usuario_id_param: authStore.user.id })
    
    if (error) throw error
    
    actividades.value = data || []
    totalItems.value = data?.length || 0
    
  } catch (error) {
    console.error('Error loading activities:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudieron cargar las actividades',
      life: 5000
    })
  } finally {
    loading.value = false
  }
}

const reservarActividad = async (actividad) => {
  try {
    reservando.value = true
    
    const { error } = await supabase
      .from('reservas')
      .insert([{
        sesion_id: actividad.sesion_id,
        usuario_id: authStore.user.id,
        estado: 'confirmada'
      }])
    
    if (error) throw error
    
    toast.add({
      severity: 'success',
      summary: '¡Reserva confirmada!',
      detail: `Tu plaza para "${actividad.titulo}" ha sido reservada`,
      life: 3000
    })
    
    // Recargar actividades para actualizar disponibilidad
    await cargarActividades()
    
  } catch (error) {
    console.error('Error making reservation:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo realizar la reserva',
      life: 3000
    })
  } finally {
    reservando.value = false
  }
}

const aplicarFiltros = () => {
  currentPage.value = 1
  // Los filtros se aplican automáticamente via computed
}

const limpiarFiltros = () => {
  filtros.value = {
    tipoServicio: '',
    modalidad: '',
    fecha: ''
  }
  currentPage.value = 1
}

const cambiarPagina = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Lifecycle
onMounted(() => {
  if (authStore.user?.id) {
    cargarActividades()
  }
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
</template>