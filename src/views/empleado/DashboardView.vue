<template>
  <div class="p-6 md:p-8">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Mi Dashboard</h1>
      <p class="text-gray-600">Bienvenido a tu espacio personal de bienestar, {{ authStore.user?.nombre || 'Usuario' }}</p>
    </header>
    
    <!-- Sección de Estadísticas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Puntos de Bienestar -->
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div class="flex items-center justify-center mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center">
            <Star class="h-8 w-8 text-white" />
          </div>
        </div>
        <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.puntosBienestar }}</h3>
        <p class="text-gray-700 font-medium">Puntos de Bienestar</p>
        <div class="flex items-center justify-center mt-2">
          <TrendingUp class="h-4 w-4 text-green-500 mr-1" />
          <span class="text-xs text-green-600">+{{ stats.puntosSemana }} esta semana</span>
        </div>
      </div>

      <!-- Sesiones Asistidas -->
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div class="flex items-center justify-center mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center">
            <Calendar class="h-8 w-8 text-white" />
          </div>
        </div>
        <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.sesionesAsistidas }}</h3>
        <p class="text-gray-700 font-medium">Sesiones Asistidas</p>
        <div class="flex items-center justify-center mt-2">
          <Calendar class="h-4 w-4 text-blue-500 mr-1" />
          <span class="text-xs text-blue-600">Este mes</span>
        </div>
      </div>

      <!-- Desafíos Completados -->
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div class="flex items-center justify-center mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center">
            <Trophy class="h-8 w-8 text-white" />
          </div>
        </div>
        <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.desafiosCompletados }}</h3>
        <p class="text-gray-700 font-medium">Desafíos Completados</p>
        <div class="flex items-center justify-center mt-2">
          <Trophy class="h-4 w-4 text-yellow-500 mr-1" />
          <span class="text-xs text-yellow-600">Nivel {{ stats.nivelActual }}</span>
        </div>
      </div>
    </div>

    <!-- Próximas Sesiones -->
    <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30 mb-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-gray-900 flex items-center">
          <Calendar class="h-5 w-5 mr-2 text-primary" />
          Próximas Sesiones
        </h2>
        <router-link 
          to="/empleado/reservar-actividad" 
          class="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
        >
          Ver todas →
        </router-link>
      </div>

      <div v-if="proximasSesiones.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
        <Calendar class="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <p class="font-medium mb-2">Aún no tenemos datos</p>
        <p class="text-sm text-gray-500 mb-4">No tienes sesiones próximas programadas</p>
        <router-link to="/empleado/reservar-actividad">
          <button class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium">
            Explorar Actividades
          </button>
        </router-link>
      </div>

      <div v-else class="space-y-4">
        <div 
          v-for="sesion in proximasSesiones" 
          :key="sesion.id"
          class="glass-card p-6 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-4">
              <div :class="[
                'w-12 h-12 rounded-xl flex items-center justify-center',
                getServiceIconClass(sesion.tipo)
              ]">
                <component :is="getServiceIcon(sesion.tipo)" class="h-6 w-6 text-white" />
              </div>
              <div>
                <p class="font-semibold text-gray-900">{{ sesion.titulo }}</p>
                <p class="text-sm text-gray-600">{{ sesion.colaborador }}</p>
              </div>
            </div>
            <span :class="[
              'px-3 py-1 rounded-full text-xs font-medium',
              getStatusClass(sesion.estado)
            ]">
              {{ getStatusText(sesion.estado) }}
            </span>
          </div>
          
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4 text-sm text-gray-600">
              <div class="flex items-center">
                <Clock class="h-4 w-4 mr-1" />
                <span>{{ formatDateTime(sesion.fecha) }}</span>
              </div>
              <div class="flex items-center">
                <component :is="sesion.modalidad === 'online' ? Globe : MapPin" class="h-4 w-4 mr-1" />
                <span>{{ sesion.modalidad === 'online' ? 'Online' : sesion.ubicacion }}</span>
              </div>
            </div>
            <button class="text-primary hover:text-primary-dark text-sm font-medium transition-colors">
              Ver detalles
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Grid de Contenido Principal -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Encuestas Pendientes -->
      <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900 flex items-center">
            <ClipboardList class="h-5 w-5 mr-2 text-primary" />
            Encuestas Pendientes
          </h2>
          <router-link 
            to="/empleado/encuestas" 
            class="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
          >
            Ver todas →
          </router-link>
        </div>

        <div v-if="encuestasPendientes.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
          <ClipboardList class="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p class="font-medium mb-2">Aún no tenemos datos</p>
          <p class="text-sm text-gray-500">No tienes encuestas pendientes</p>
        </div>

        <div v-else class="space-y-4">
          <div 
            v-for="encuesta in encuestasPendientes" 
            :key="encuesta.id"
            class="glass-card p-6 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <div class="flex justify-between items-start mb-3">
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900 mb-2">{{ encuesta.titulo }}</h3>
                <p class="text-sm text-gray-600 mb-3">{{ encuesta.descripcion }}</p>
                <p class="text-xs text-gray-500">
                  {{ encuesta.diasRestantes !== null ? `Termina en ${encuesta.diasRestantes} días` : 'Sin fecha límite' }}
                </p>
              </div>
            </div>
            <button class="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium">
              Completar Encuesta
            </button>
          </div>
        </div>
      </div>

      <!-- Desafíos de Bienestar -->
      <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900 flex items-center">
            <Trophy class="h-5 w-5 mr-2 text-yellow-500" />
            Desafíos Activos
          </h2>
          <router-link 
            to="/empleado/desafios" 
            class="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
          >
            Ver todos →
          </router-link>
        </div>

        <div v-if="desafiosActivos.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
          <Trophy class="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p class="font-medium mb-2">Aún no tenemos datos</p>
          <p class="text-sm text-gray-500">No hay desafíos activos disponibles</p>
        </div>

        <div v-else class="space-y-4">
          <div 
            v-for="desafio in desafiosActivos" 
            :key="desafio.id"
            class="glass-card p-6 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
                  <Trophy class="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">{{ desafio.titulo }}</h3>
                  <p class="text-sm text-gray-600">{{ desafio.categoria }}</p>
                </div>
              </div>
              <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                {{ desafio.puntos }} puntos
              </span>
            </div>
            
            <p class="text-sm text-gray-700 mb-4">{{ desafio.descripcion }}</p>
            
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500">
                Termina: {{ formatearFecha(desafio.fecha_fin) }}
              </span>
              <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm">
                Participar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actividades Recomendadas -->
    <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-gray-900 flex items-center">
          <Heart class="h-5 w-5 mr-2 text-red-500" />
          Actividades Recomendadas
        </h2>
        <router-link 
          to="/empleado/reservar-actividad" 
          class="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
        >
          Ver todas →
        </router-link>
      </div>

      <div v-if="actividadesRecomendadas.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
        <Heart class="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <p class="font-medium mb-2">Aún no tenemos datos</p>
        <p class="text-sm text-gray-500">No hay actividades recomendadas disponibles</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="actividad in actividadesRecomendadas" 
          :key="actividad.id"
          class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div class="relative h-32 bg-gradient-to-br from-primary/20 to-secondary/20">
            <div class="absolute inset-0 flex items-center justify-center">
              <component :is="getServiceIcon(actividad.tipo)" class="h-12 w-12 text-primary" />
            </div>
            <div class="absolute top-2 right-2">
              <span :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                getServiceTypeClass(actividad.tipo)
              ]">
                {{ actividad.tipo }}
              </span>
            </div>
          </div>
          
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-2">{{ actividad.titulo }}</h3>
            <p class="text-sm text-gray-600 mb-3">{{ actividad.descripcion }}</p>
            
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center text-xs text-gray-500">
                <Clock class="h-3 w-3 mr-1" />
                <span>{{ formatDateTime(actividad.fecha) }}</span>
              </div>
              <div class="flex items-center text-xs text-gray-500">
                <Users class="h-3 w-3 mr-1" />
                <span>{{ actividad.plazasDisponibles }} plazas</span>
              </div>
            </div>
            
            <button class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm">
              Reservar Plaza
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Star, 
  Calendar, 
  Trophy, 
  TrendingUp, 
  ClipboardList, 
  Heart,
  Clock,
  Users,
  Globe,
  MapPin,
  Activity,
  Brain,
  Apple,
  MessageCircle,
  Dumbbell
} from 'lucide-vue-next'
import { useAuthStore } from '../../stores/auth.store'
import { useEmpleadoStore } from '../../stores/empleado.store'

const router = useRouter()
const authStore = useAuthStore()
const empleadoStore = useEmpleadoStore()

// Datos de ejemplo (dummy data) para mostrar la estructura
const stats = ref({
  puntosBienestar: 1250,
  puntosSemana: 85,
  sesionesAsistidas: 12,
  desafiosCompletados: 3,
  nivelActual: 2
})

const proximasSesiones = ref([
  {
    id: 1,
    titulo: 'Yoga Matutino',
    fecha: '2025-01-20T08:00:00',
    colaborador: 'Elena Vásquez',
    modalidad: 'presencial',
    ubicacion: 'Sala Zen',
    tipo: 'yoga',
    estado: 'confirmada'
  },
  {
    id: 2,
    titulo: 'Meditación Mindfulness',
    fecha: '2025-01-22T12:30:00',
    colaborador: 'Miguel Torres',
    modalidad: 'online',
    tipo: 'meditacion',
    estado: 'confirmada'
  },
  {
    id: 3,
    titulo: 'Coaching Personal',
    fecha: '2025-01-25T15:00:00',
    colaborador: 'Carlos Ruiz',
    modalidad: 'online',
    tipo: 'coaching',
    estado: 'pendiente'
  }
])

const encuestasPendientes = ref([
  {
    id: 1,
    titulo: 'Evaluación de Clima Laboral Q1',
    descripcion: 'Ayúdanos a mejorar el ambiente de trabajo',
    diasRestantes: 5
  },
  {
    id: 2,
    titulo: 'Feedback Actividades de Bienestar',
    descripcion: 'Comparte tu experiencia con nuestras actividades',
    diasRestantes: null
  }
])

const desafiosActivos = ref([
  {
    id: 1,
    titulo: 'Camina 10,000 pasos diarios',
    descripcion: 'Mantente activo durante 14 días consecutivos',
    categoria: 'Actividad Física',
    puntos: 200,
    fecha_fin: '2025-02-15T23:59:59'
  },
  {
    id: 2,
    titulo: 'Meditación Diaria',
    descripcion: 'Medita 10 minutos cada día durante una semana',
    categoria: 'Mindfulness',
    puntos: 150,
    fecha_fin: '2025-02-10T23:59:59'
  }
])

const actividadesRecomendadas = ref([
  {
    id: 1,
    titulo: 'Yoga para Principiantes',
    descripcion: 'Sesión perfecta para comenzar tu práctica de yoga',
    tipo: 'yoga',
    fecha: '2025-01-21T18:00:00',
    plazasDisponibles: 8
  },
  {
    id: 2,
    titulo: 'Nutrición Saludable',
    descripcion: 'Aprende a crear menús balanceados y nutritivos',
    tipo: 'nutricion',
    fecha: '2025-01-23T16:00:00',
    plazasDisponibles: 12
  },
  {
    id: 3,
    titulo: 'Entrenamiento HIIT',
    descripcion: 'Ejercicios de alta intensidad para quemar calorías',
    tipo: 'entrenamiento',
    fecha: '2025-01-24T19:00:00',
    plazasDisponibles: 5
  }
])

// Funciones de utilidad
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

const formatearFecha = (fechaString) => {
  const fecha = new Date(fechaString)
  return fecha.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
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

// Lifecycle
onMounted(() => {
  // Aquí se cargarían los datos reales cuando estén disponibles
  console.log('Dashboard del empleado cargado')
})
</script>