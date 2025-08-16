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
          <Button @click="limpiarFiltros" variant="outline" class="w-full">
            Limpiar Filtros
          </Button>
        </div>
      </div>
    </div>

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

    <div v-else-if="reservasFiltradas.length === 0" class="glass-card rounded-xl shadow-lg p-12 text-center backdrop-blur-sm border border-white/20">
      <BookmarkCheck class="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        {{ reservas.length === 0 ? 'Aún no tienes reservas' : 'No se encontraron resultados' }}
      </h3>
      <p class="text-gray-500 mb-4">
        {{ reservas.length === 0 
          ? '¡Anímate a apuntarte a una actividad!' 
          : 'Intenta ajustar los filtros de búsqueda.'
        }}
      </p>
      <Button @click="$router.push('/empleado/reservar-actividad')" variant="primary">
        Explorar Actividades
      </Button>
    </div>

    <div v-else class="space-y-4">
      <div 
        v-for="reserva in reservasPaginadas" 
        :key="reserva.id" 
        class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ reserva.titulo }}</h3>
              <div class="flex items-center mb-2">
                <Calendar class="h-4 w-4 text-gray-500 mr-2" />
                <p class="text-sm text-gray-600">{{ formatDateTime(reserva.fecha_inicio) }}</p>
              </div>
              <div class="flex items-center">
                <User class="h-4 w-4 text-gray-500 mr-2" />
                <p class="text-sm text-gray-600">{{ reserva.colaborador_nombre }}</p>
              </div>
            </div>
            
            <div class="text-right">
              <span :class="[
                'px-3 py-1 rounded-full text-xs font-medium mb-2 inline-block',
                getStatusClass(reserva.estado)
              ]">
                {{ getStatusText(reserva.estado) }}
              </span>
              
              <div v-if="reserva.estado === 'completada' && reserva.puntos_otorgados" class="flex items-center justify-end">
                <Star class="h-4 w-4 text-yellow-500 mr-1" />
                <span class="text-sm text-primary font-medium">+{{ reserva.puntos_otorgados }} puntos</span>
              </div>
            </div>
          </div>
          
          <!-- Modalidad y ubicación -->
          <div class="flex items-center mb-4">
            <component :is="reserva.modalidad === 'online' ? Globe : MapPin" class="h-4 w-4 text-gray-500 mr-2" />
            <p class="text-sm text-gray-600">
              {{ reserva.modalidad === 'online' ? 'Sesión Online' : reserva.ubicacion }}
            </p>
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
          <Button 
            variant="outline" 
            class="flex-1 text-sm"
            @click="verDetalles(reserva)"
          >
            Ver Detalles
          </Button>
          
          <Button 
            v-if="reserva.estado === 'confirmada' && new Date(reserva.fecha_inicio) > new Date()"
            variant="outline" 
            class="text-sm text-red-600 border-red-300 hover:bg-red-50"
            @click="cancelarReserva(reserva)"
          >
            Cancelar
          </Button>
          
          <Button 
            v-if="reserva.estado === 'completada' && !reserva.calificacion"
            variant="primary" 
            class="text-sm"
            @click="calificarSesion(reserva)"
          >
            Calificar
          </Button>
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
  BookmarkCheck,
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
const reservas = ref([])
const filtroEstado = ref('')
const filtroServicio = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

// Computed
const reservasFiltradas = computed(() => {
  let resultado = reservas.value
  
  if (filtroEstado.value) {
    resultado = resultado.filter(r => r.estado === filtroEstado.value)
  }
  
  if (filtroServicio.value) {
    resultado = resultado.filter(r => r.servicio_tipo === filtroServicio.value)
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

const getStatusClass = (estado) => {
  const classes = {
    'confirmada': 'bg-green-100 text-green-800',
    'pendiente': 'bg-yellow-100 text-yellow-800',
    'cancelada': 'bg-red-100 text-red-800',
    'completada': 'bg-blue-100 text-blue-800'
  }
  return classes[estado] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (estado) => {
  const textos = {
    'confirmada': 'Confirmada',
    'pendiente': 'Pendiente',
    'cancelada': 'Cancelada',
    'completada': 'Completada'
  }
  return textos[estado] || estado
}

const cargarReservas = async () => {
  try {
    loading.value = true
    
    const { data, error } = await supabase
      .from('reservas')
      .select(`
        *,
        sesiones (
          titulo,
          fecha_inicio,
          fecha_fin,
          modalidad,
          ubicacion,
          colaborador:usuarios (
            nombre,
            apellido
          ),
          servicios (
            tipo,
            nombre
          )
        )
      `)
      .eq('usuario_id', authStore.user.id)
      .order('fecha_reserva', { ascending: false })
    
    if (error) throw error
    
    // Procesar datos para facilitar el acceso
    reservas.value = (data || []).map(reserva => ({
      ...reserva,
      titulo: reserva.sesiones?.titulo,
      fecha_inicio: reserva.sesiones?.fecha_inicio,
      fecha_fin: reserva.sesiones?.fecha_fin,
      modalidad: reserva.sesiones?.modalidad,
      ubicacion: reserva.sesiones?.ubicacion,
      colaborador_nombre: reserva.sesiones?.colaborador ? 
        `${reserva.sesiones.colaborador.nombre} ${reserva.sesiones.colaborador.apellido}` : 
        'Sin asignar',
      servicio_tipo: reserva.sesiones?.servicios?.tipo,
      servicio_nombre: reserva.sesiones?.servicios?.nombre
    }))
    
  } catch (error) {
    console.error('Error loading reservations:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudieron cargar las reservas',
      life: 5000
    })
  } finally {
    loading.value = false
  }
}

const cancelarReserva = async (reserva) => {
  if (!confirm(`¿Estás seguro de que quieres cancelar la reserva para "${reserva.titulo}"?`)) {
    return
  }
  
  try {
    const { error } = await supabase
      .from('reservas')
      .update({ 
        estado: 'cancelada',
        fecha_cancelacion: new Date().toISOString()
      })
      .eq('id', reserva.id)
    
    if (error) throw error
    
    toast.add({
      severity: 'success',
      summary: 'Reserva cancelada',
      detail: 'Tu reserva ha sido cancelada exitosamente',
      life: 3000
    })
    
    // Recargar reservas
    await cargarReservas()
    
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
  // Implementar modal de calificación
  console.log('Calificar sesión:', reserva.id)
  toast.add({
    severity: 'info',
    summary: 'Próximamente',
    detail: 'La funcionalidad de calificación se implementará pronto',
    life: 3000
  })
}

const verDetalles = (reserva) => {
  // Navegar a vista de detalles
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

// Lifecycle
onMounted(() => {
  if (authStore.user?.id) {
    cargarReservas()
  }
})
</script>
</template>