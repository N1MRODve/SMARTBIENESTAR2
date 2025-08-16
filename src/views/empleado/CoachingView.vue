<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-3xl font-bold text-gray-900">Coaching Personal</h1>
      <p class="text-gray-600 mt-1">Sesiones personalizadas para tu desarrollo profesional y personal.</p>
    </header>

    <!-- Estadísticas de Coaching -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div class="flex items-center justify-center mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center">
            <MessageCircle class="h-8 w-8 text-white" />
          </div>
        </div>
        <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.sesionesCompletadas }}</h3>
        <p class="text-gray-700 font-medium">Sesiones Completadas</p>
        <p class="text-xs text-gray-500 mt-1">Este año</p>
      </div>

      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div class="flex items-center justify-center mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center">
            <Target class="h-8 w-8 text-white" />
          </div>
        </div>
        <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.objetivosAlcanzados }}</h3>
        <p class="text-gray-700 font-medium">Objetivos Alcanzados</p>
        <p class="text-xs text-gray-500 mt-1">De {{ stats.objetivosTotales }} planteados</p>
      </div>

      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div class="flex items-center justify-center mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center">
            <TrendingUp class="h-8 w-8 text-white" />
          </div>
        </div>
        <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.progresoGeneral }}%</h3>
        <p class="text-gray-700 font-medium">Progreso General</p>
        <p class="text-xs text-gray-500 mt-1">Plan de desarrollo</p>
      </div>
    </div>

    <!-- Próximas Sesiones de Coaching -->
    <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-gray-900 flex items-center">
          <Calendar class="h-5 w-5 mr-2 text-primary" />
          Próximas Sesiones de Coaching
        </h2>
        <button 
          @click="programarSesion"
          class="glass-button-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30 flex items-center"
        >
          <Plus class="h-4 w-4 mr-2" />
          Programar Sesión
        </button>
      </div>

      <div v-if="proximasSesiones.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
        <MessageCircle class="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <p class="font-medium mb-2">Aún no tenemos datos</p>
        <p class="text-sm text-gray-500 mb-4">No tienes sesiones de coaching programadas</p>
        <button 
          @click="programarSesion"
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
              <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                <MessageCircle class="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">{{ sesion.titulo }}</h3>
                <p class="text-sm text-gray-600">{{ sesion.coach }}</p>
              </div>
            </div>
            <span :class="[
              'px-3 py-1 rounded-full text-xs font-medium',
              getStatusClass(sesion.estado)
            ]">
              {{ getStatusText(sesion.estado) }}
            </span>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="flex items-center">
              <Calendar class="h-4 w-4 text-gray-500 mr-2" />
              <span class="text-sm text-gray-600">{{ formatDateTime(sesion.fecha) }}</span>
            </div>
            <div class="flex items-center">
              <Clock class="h-4 w-4 text-gray-500 mr-2" />
              <span class="text-sm text-gray-600">{{ sesion.duracion }} minutos</span>
            </div>
          </div>

          <div class="flex gap-2">
            <button class="flex-1 glass-button-outline text-gray-700 bg-white/60 hover:bg-gray-50/80 px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50 text-sm">
              Ver Detalles
            </button>
            <button 
              v-if="sesion.estado === 'programada'"
              class="text-sm text-blue-600 border border-blue-300/50 hover:bg-blue-50/80 px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm"
            >
              Reprogramar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Plan de Desarrollo Personal -->
    <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
      <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Target class="h-5 w-5 mr-2 text-green-500" />
        Mi Plan de Desarrollo
      </h2>

      <div v-if="planDesarrollo.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
        <Target class="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <p class="font-medium mb-2">Aún no tenemos datos</p>
        <p class="text-sm text-gray-500">No tienes un plan de desarrollo activo</p>
      </div>

      <div v-else class="space-y-4">
        <div 
          v-for="objetivo in planDesarrollo" 
          :key="objetivo.id"
          class="glass-card p-6 rounded-xl shadow-md backdrop-blur-sm border border-white/20"
        >
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-semibold text-gray-900">{{ objetivo.titulo }}</h3>
            <span :class="[
              'px-2 py-1 rounded-full text-xs font-medium',
              objetivo.completado ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            ]">
              {{ objetivo.completado ? 'Completado' : 'En Progreso' }}
            </span>
          </div>
          
          <p class="text-sm text-gray-600 mb-4">{{ objetivo.descripcion }}</p>
          
          <div class="mb-3">
            <div class="flex items-center justify-between text-sm mb-1">
              <span class="text-gray-600">Progreso:</span>
              <span class="font-medium text-gray-900">{{ objetivo.progreso }}%</span>
            </div>
            <div class="bg-gray-200 rounded-full h-2">
              <div 
                class="bg-gradient-to-r from-primary to-secondary rounded-full h-2 transition-all duration-300"
                :style="{ width: `${objetivo.progreso}%` }"
              ></div>
            </div>
          </div>
          
          <p class="text-xs text-gray-500">
            Meta: {{ formatDate(objetivo.fechaMeta) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Coaches Disponibles -->
    <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
      <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Users class="h-5 w-5 mr-2 text-primary" />
        Coaches Disponibles
      </h2>

      <div v-if="coachesDisponibles.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
        <Users class="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <p class="font-medium mb-2">Aún no tenemos datos</p>
        <p class="text-sm text-gray-500">No hay coaches disponibles en este momento</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="coach in coachesDisponibles" 
          :key="coach.id"
          class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div class="p-6">
            <div class="flex items-center space-x-4 mb-4">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center">
                <span class="text-white font-bold text-lg">{{ coach.iniciales }}</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">{{ coach.nombre }}</h3>
                <p class="text-sm text-gray-600">{{ coach.especialidad }}</p>
              </div>
            </div>
            
            <p class="text-sm text-gray-700 mb-4">{{ coach.descripcion }}</p>
            
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <Star class="h-4 w-4 text-yellow-500 mr-1" />
                <span class="text-sm font-medium">{{ coach.calificacion }}</span>
              </div>
              <span class="text-xs text-gray-500">{{ coach.experiencia }} años exp.</span>
            </div>
            
            <button 
              @click="contactarCoach(coach)"
              class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              Solicitar Sesión
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
  MessageCircle, 
  Target, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Plus, 
  Users,
  Star
} from 'lucide-vue-next'

const toast = useToast()

// Estadísticas
const stats = ref({
  sesionesCompletadas: 8,
  objetivosAlcanzados: 5,
  objetivosTotales: 7,
  progresoGeneral: 78
})

// Próximas sesiones de coaching
const proximasSesiones = ref([
  {
    id: 1,
    titulo: 'Coaching de Liderazgo',
    coach: 'Carlos Ruiz',
    fecha: '2025-01-25T15:00:00',
    duracion: 60,
    estado: 'programada'
  },
  {
    id: 2,
    titulo: 'Gestión del Tiempo',
    coach: 'María González',
    fecha: '2025-01-28T10:00:00',
    duracion: 45,
    estado: 'confirmada'
  }
])

// Plan de desarrollo personal
const planDesarrollo = ref([
  {
    id: 1,
    titulo: 'Mejorar Comunicación Asertiva',
    descripcion: 'Desarrollar habilidades de comunicación efectiva en reuniones y presentaciones',
    progreso: 85,
    fechaMeta: '2025-02-28',
    completado: false
  },
  {
    id: 2,
    titulo: 'Liderazgo de Equipos',
    descripcion: 'Fortalecer capacidades de liderazgo y gestión de equipos multidisciplinarios',
    progreso: 60,
    fechaMeta: '2025-03-15',
    completado: false
  },
  {
    id: 3,
    titulo: 'Gestión del Estrés',
    descripcion: 'Técnicas para manejar la presión laboral y mantener el equilibrio',
    progreso: 100,
    fechaMeta: '2025-01-15',
    completado: true
  }
])

// Coaches disponibles
const coachesDisponibles = ref([
  {
    id: 1,
    nombre: 'Carlos Ruiz',
    especialidad: 'Liderazgo Ejecutivo',
    descripcion: 'Especialista en desarrollo de liderazgo y gestión de equipos de alto rendimiento.',
    calificacion: 4.9,
    experiencia: 12,
    iniciales: 'CR'
  },
  {
    id: 2,
    nombre: 'María González',
    especialidad: 'Productividad Personal',
    descripcion: 'Experta en técnicas de productividad, gestión del tiempo y organización personal.',
    calificacion: 4.8,
    experiencia: 8,
    iniciales: 'MG'
  },
  {
    id: 3,
    nombre: 'Roberto Silva',
    especialidad: 'Comunicación Efectiva',
    descripcion: 'Coach especializado en habilidades de comunicación y presentaciones públicas.',
    calificacion: 4.7,
    experiencia: 10,
    iniciales: 'RS'
  }
])

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

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const getStatusClass = (estado) => {
  const classMap = {
    programada: 'bg-blue-100 text-blue-800',
    confirmada: 'bg-green-100 text-green-800',
    completada: 'bg-gray-100 text-gray-800',
    cancelada: 'bg-red-100 text-red-800'
  }
  return classMap[estado] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (estado) => {
  const textMap = {
    programada: 'Programada',
    confirmada: 'Confirmada',
    completada: 'Completada',
    cancelada: 'Cancelada'
  }
  return textMap[estado] || estado
}

const programarSesion = () => {
  toast.add({
    severity: 'info',
    summary: 'Próximamente',
    detail: 'La funcionalidad de programar sesiones se implementará pronto',
    life: 3000
  })
}

const contactarCoach = (coach) => {
  toast.add({
    severity: 'success',
    summary: 'Solicitud enviada',
    detail: `Tu solicitud de sesión con ${coach.nombre} ha sido enviada`,
    life: 3000
  })
}
</script>