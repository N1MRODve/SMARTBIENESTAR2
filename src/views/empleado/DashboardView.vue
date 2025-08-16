<template>
  <div class="p-6 md:p-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Mi Dashboard</h1>
      <p class="text-gray-600">Bienvenido a tu espacio personal de bienestar</p>
    </header>
    
    <div v-if="loading" class="animate-pulse">
      <!-- Skeleton para estadísticas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-gray-300 h-28 rounded-xl"></div>
        <div class="bg-gray-300 h-28 rounded-xl"></div>
        <div class="bg-gray-300 h-28 rounded-xl"></div>
      </div>
      <!-- Skeleton para contenido -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-gray-300 h-64 rounded-xl"></div>
        <div class="bg-gray-300 h-64 rounded-xl"></div>
      </div>
    </div>

    <div v-else>
      <!-- Sección de Estadísticas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.puntos_bienestar || 0 }}</h3>
          <p class="text-gray-700 font-medium">Puntos de Bienestar</p>
          <div class="flex items-center justify-center mt-2">
            <TrendingUp class="h-4 w-4 text-green-500 mr-1" />
            <span class="text-xs text-green-600">+{{ stats.puntos_semana || 0 }} esta semana</span>
          </div>
        </div>
        <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.desafios_completados || 0 }}</h3>
          <p class="text-gray-700 font-medium">Desafíos Completados</p>
          <div class="flex items-center justify-center mt-2">
            <Trophy class="h-4 w-4 text-yellow-500 mr-1" />
            <span class="text-xs text-yellow-600">Nivel {{ stats.nivel_actual || 1 }}</span>
          </div>
        </div>
        <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.proximas_sesiones || 0 }}</h3>
          <p class="text-gray-700 font-medium">Próximas Sesiones</p>
          <div class="flex items-center justify-center mt-2">
            <Calendar class="h-4 w-4 text-blue-500 mr-1" />
            <span class="text-xs text-blue-600">Esta semana</span>
          </div>
        </div>
      </div>

      <!-- Próximas Sesiones y Encuestas -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Calendar class="h-5 w-5 mr-2 text-primary" />
            Próximas Sesiones
          </h2>
          <div v-if="proximasSesiones.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
            <Calendar class="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p class="font-medium mb-2">No tienes sesiones próximas</p>
            <Button @click="$router.push('/empleado/reservar-actividad')" variant="primary" class="mt-4">
              Explorar Actividades
            </Button>
          </div>
          <ul v-else class="space-y-3">
            <li v-for="sesion in proximasSesiones" :key="sesion.reserva_id" class="glass-card p-4 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <div class="flex items-center justify-between mb-2">
                <p class="font-semibold text-gray-900">{{ sesion.titulo }}</p>
                <span :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  getStatusClass(sesion.estado)
                ]">
                  {{ getStatusText(sesion.estado) }}
                </span>
              </div>
              <p class="text-sm text-gray-600 mt-1">{{ formatDateTime(sesion.fecha_inicio) }}</p>
              <div class="flex items-center justify-between mt-2">
                <p class="text-xs text-gray-500">{{ sesion.colaborador_nombre }}</p>
                <p class="text-xs text-gray-500">{{ sesion.modalidad === 'online' ? 'Online' : sesion.ubicacion }}</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div>
          <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <ClipboardList class="h-5 w-5 mr-2 text-primary" />
            Encuestas Pendientes
          </h2>
          <div v-if="encuestasPendientes.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
            <ClipboardList class="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p class="font-medium">No tienes encuestas pendientes</p>
          </div>
          <ul v-else class="space-y-3">
            <li v-for="encuesta in encuestasPendientes" :key="encuesta.participacion_id" class="glass-card p-4 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex justify-between items-center">
              <div>
                <p class="font-semibold text-gray-900">{{ encuesta.titulo }}</p>
                <p class="text-sm text-gray-600 mt-1">{{ encuesta.descripcion }}</p>
                <p class="text-xs text-gray-500 mt-1">
                  {{ encuesta.dias_restantes !== null ? `Termina en ${encuesta.dias_restantes} días` : 'Sin fecha límite' }}
                </p>
              </div>
              <Button class="glass-button-primary text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
                Completar
              </Button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Módulo de Desafíos Activos -->
      <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Desafíos de Bienestar</h2>
          <router-link 
            to="/empleado/desafios" 
            class="text-sm text-primary hover:text-primary-dark font-medium"
          >
            Ver todos →
          </router-link>
        </div>

        <!-- Desafíos Activos -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <Trophy class="h-5 w-5 mr-2 text-yellow-500" />
            Desafíos Activos
          </h3>
          
          <div v-if="desafiosActivos.length === 0" class="text-center py-8 text-gray-500">
            <Target class="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p>No hay desafíos activos en este momento</p>
          </div>
          
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              v-for="desafio in desafiosActivos" 
              :key="desafio.id"
              class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div class="relative">
                <img 
                  :src="desafio.imagen || 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400'" 
                  :alt="desafio.titulo"
                  class="w-full h-32 object-cover"
                />
                <div class="absolute top-2 right-2">
                  <span class="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Activo
                  </span>
                </div>
              </div>
              
              <div class="p-4">
                <h4 class="font-semibold text-gray-900 mb-2">{{ desafio.titulo }}</h4>
                <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ desafio.descripcion }}</p>
                
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs text-gray-500">
                    {{ desafio.duracion || 'Duración flexible' }}
                  </span>
                  <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                    {{ desafio.puntos || 0 }} puntos
                  </span>
                </div>
                
                <button 
                  @click="apuntarseDesafio(desafio)"
                  class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors font-medium"
                >
                  Apuntarse
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Progreso Personal -->
      <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
        <h2 class="text-xl font-semibold mb-6 flex items-center">
          <BarChart3 class="h-5 w-5 mr-2 text-primary" />
          Mi Progreso Personal
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Nivel y Experiencia -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Nivel y Experiencia</h3>
            <div class="text-center mb-6">
              <div class="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white text-2xl font-bold">{{ stats.nivel_actual || 1 }}</span>
              </div>
              <h4 class="text-xl font-bold text-gray-900 mb-2">Nivel {{ stats.nivel_actual || 1 }}</h4>
              <p class="text-sm text-gray-600">{{ getNivelName(stats.nivel_actual || 1) }}</p>
            </div>
            
            <div class="space-y-3">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Progreso al siguiente nivel:</span>
                <span class="font-medium text-gray-900">{{ stats.puntos_nivel || 0 }}/{{ getNextLevelPoints(stats.nivel_actual || 1) }}</span>
              </div>
              <div class="bg-gray-200 rounded-full h-3">
                <div 
                  class="bg-gradient-to-r from-primary to-secondary rounded-full h-3 transition-all duration-300"
                  :style="{ width: `${getLevelProgress(stats.puntos_nivel || 0, getNextLevelPoints(stats.nivel_actual || 1))}%` }"
                ></div>
              </div>
              <p class="text-xs text-gray-500 text-center">
                {{ getNextLevelPoints(stats.nivel_actual || 1) - (stats.puntos_nivel || 0) }} puntos para el siguiente nivel
              </p>
            </div>
          </div>

          <!-- Logros Recientes -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Logros Recientes</h3>
            <div v-if="logrosRecientes.length === 0" class="text-center py-6 text-gray-500">
              <Award class="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p class="text-sm">Completa actividades para desbloquear logros</p>
            </div>
            <div v-else class="space-y-3">
              <div 
                v-for="logro in logrosRecientes" 
                :key="logro.id"
                class="flex items-center space-x-3 p-3 bg-yellow-50/60 rounded-lg backdrop-blur-sm border border-yellow-200/50"
              >
                <div class="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Award class="h-5 w-5 text-white" />
                </div>
                <div class="flex-1">
                  <p class="font-semibold text-gray-900">{{ logro.nombre }}</p>
                  <p class="text-xs text-gray-600">{{ logro.descripcion }}</p>
                </div>
                <span class="text-xs text-yellow-600 font-medium">+{{ logro.puntos_recompensa }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actividades Recomendadas -->
      <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Actividades Recomendadas</h2>
          <router-link 
            to="/empleado/reservar-actividad" 
            class="text-sm text-primary hover:text-primary-dark font-medium"
          >
            Ver todas →
          </router-link>
        </div>

        <div v-if="actividadesRecomendadas.length === 0" class="text-center py-8 text-gray-500">
          <Sparkles class="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p>No hay actividades disponibles en este momento</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="actividad in actividadesRecomendadas" 
            :key="actividad.sesion_id"
            class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div class="p-6">
              <div class="flex items-center justify-between mb-3">
                <h4 class="font-semibold text-gray-900">{{ actividad.titulo }}</h4>
                <span :class="[
                  'text-xs px-2 py-1 rounded-full font-medium',
                  getServiceTypeClass(actividad.servicio_tipo)
                ]">
                  {{ actividad.servicio_tipo }}
                </span>
              </div>
              
              <p class="text-sm text-gray-600 mb-3">{{ formatDateTime(actividad.fecha_inicio) }}</p>
              <p class="text-sm text-gray-500 mb-4">{{ actividad.colaborador_nombre }}</p>
              
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs text-gray-500">
                  {{ actividad.reservas_actuales }}/{{ actividad.capacidad_maxima }} plazas
                </span>
                <span class="text-xs text-primary font-medium">
                  +{{ actividad.puntos_asistencia || 0 }} puntos
                </span>
              </div>
              
              <button 
                @click="reservarActividad(actividad.sesion_id)"
                :disabled="actividad.reservas_actuales >= actividad.capacidad_maxima"
                class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ actividad.reservas_actuales >= actividad.capacidad_maxima ? 'Completo' : 'Reservar' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { 
  Calendar, 
  ClipboardList, 
  TrendingUp, 
  Trophy, 
  Target, 
  Sparkles, 
  Award,
  BarChart3
} from 'lucide-vue-next'
import { useAuthStore } from '../../stores/auth.store'
import { supabase } from '../../services/supabase'
import Button from '../../components/common/Button.vue'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

// Estado reactivo
const loading = ref(true)
const stats = ref({})
const proximasSesiones = ref([])
const encuestasPendientes = ref([])
const desafiosActivos = ref([])
const actividadesRecomendadas = ref([])
const logrosRecientes = ref([])

// Computed
const getNivelName = (nivel) => {
  const nombres = {
    1: 'Principiante',
    2: 'Explorador',
    3: 'Entusiasta',
    4: 'Experto',
    5: 'Maestro'
  }
  return nombres[nivel] || 'Principiante'
}

const getNextLevelPoints = (nivel) => {
  const puntos = {
    1: 500,
    2: 1000,
    3: 2000,
    4: 3500,
    5: 5000
  }
  return puntos[nivel + 1] || 5000
}

const getLevelProgress = (puntosActuales, puntosNecesarios) => {
  return Math.min(100, (puntosActuales / puntosNecesarios) * 100)
}

// Métodos de formato
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

const getStatusClass = (estado) => {
  const classes = {
    'confirmada': 'bg-green-100 text-green-800',
    'pendiente': 'bg-yellow-100 text-yellow-800',
    'cancelada': 'bg-red-100 text-red-800'
  }
  return classes[estado] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (estado) => {
  const textos = {
    'confirmada': 'Confirmada',
    'pendiente': 'Pendiente',
    'cancelada': 'Cancelada'
  }
  return textos[estado] || estado
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

// Cargar datos del dashboard
const loadDashboardData = async () => {
  try {
    loading.value = true
    
    // Cargar estadísticas del empleado
    const { data: statsData, error: statsError } = await supabase
      .rpc('get_employee_dashboard_stats', { usuario_id_param: authStore.user.id })
    
    if (statsError) throw statsError
    if (statsData && statsData.length > 0) {
      stats.value = statsData[0]
    }

    // Cargar próximas sesiones
    const { data: sesionesData, error: sesionesError } = await supabase
      .rpc('get_employee_upcoming_sessions', { usuario_id_param: authStore.user.id })
    
    if (sesionesError) throw sesionesError
    proximasSesiones.value = sesionesData || []

    // Cargar encuestas pendientes
    const { data: encuestasData, error: encuestasError } = await supabase
      .rpc('get_employee_pending_surveys', { usuario_id_param: authStore.user.id })
    
    if (encuestasError) throw encuestasError
    encuestasPendientes.value = encuestasData || []

    // Cargar desafíos activos
    const { data: desafiosData, error: desafiosError } = await supabase
      .from('desafios_bienestar')
      .select('*')
      .eq('estado', 'activo')
      .gte('fecha_fin', new Date().toISOString())
      .order('fecha_inicio', { ascending: false })
      .limit(4)
    
    if (desafiosError) throw desafiosError
    desafiosActivos.value = desafiosData || []

    // Cargar actividades recomendadas
    const { data: actividadesData, error: actividadesError } = await supabase
      .rpc('get_available_activities', { usuario_id_param: authStore.user.id })
    
    if (actividadesError) throw actividadesError
    actividadesRecomendadas.value = (actividadesData || []).slice(0, 6)

    // Cargar logros recientes
    const { data: logrosData, error: logrosError } = await supabase
      .from('logros')
      .select('*')
      .eq('activo', true)
      .order('fecha_creacion', { ascending: false })
      .limit(3)
    
    if (logrosError) throw logrosError
    logrosRecientes.value = logrosData || []

  } catch (error) {
    console.error('Error loading dashboard data:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudieron cargar los datos del dashboard',
      life: 5000
    })
  } finally {
    loading.value = false
  }
}

// Acciones
const apuntarseDesafio = async (desafio) => {
  try {
    const { error } = await supabase
      .from('participacion_desafios')
      .insert([{
        usuario_id: authStore.user.id,
        desafio_id: desafio.id,
        estado: 'activo'
      }])
    
    if (error) throw error
    
    toast.add({
      severity: 'success',
      summary: '¡Genial!',
      detail: `Te has apuntado al desafío "${desafio.titulo}"`,
      life: 3000
    })
    
    // Navegar a la vista de desafíos
    router.push(`/empleado/desafios/${desafio.id}`)
    
  } catch (error) {
    console.error('Error joining challenge:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo apuntar al desafío',
      life: 3000
    })
  }
}

const reservarActividad = async (sesionId) => {
  try {
    const { error } = await supabase
      .from('reservas')
      .insert([{
        sesion_id: sesionId,
        usuario_id: authStore.user.id,
        estado: 'confirmada'
      }])
    
    if (error) throw error
    
    toast.add({
      severity: 'success',
      summary: '¡Reserva confirmada!',
      detail: 'Tu plaza ha sido reservada exitosamente',
      life: 3000
    })
    
    // Recargar datos para actualizar la vista
    loadDashboardData()
    
  } catch (error) {
    console.error('Error making reservation:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo realizar la reserva',
      life: 3000
    })
  }
}

// Lifecycle
onMounted(() => {
  if (authStore.user?.id) {
    loadDashboardData()
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
</template>