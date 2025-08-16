<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-3xl font-bold text-gray-900">Actividades Disponibles</h1>
      <p class="text-gray-600 mt-1">Explora las próximas actividades y reserva tu plaza.</p>
    </header>

    <!-- Filtros -->
    <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Servicio</label>
          <select v-model="filtros.tipoServicio" class="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
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
          <select v-model="filtros.modalidad" class="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
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

    <!-- Actividades Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="actividad in actividadesFiltradas" 
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
            @click="reservarActividad(actividad)"
            :disabled="actividad.plazasOcupadas >= actividad.capacidad"
            class="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ actividad.plazasOcupadas >= actividad.capacidad ? 'Completo' : 'Reservar Plaza' }}
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
  User, 
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

// Filtros
const filtros = ref({
  tipoServicio: '',
  modalidad: '',
  fecha: ''
})

// Datos dummy de actividades
const actividades = ref([
  {
    id: 1,
    titulo: 'Yoga Matutino para Principiantes',
    descripcion: 'Sesión perfecta para comenzar tu día con energía positiva. Aprenderás posturas básicas y técnicas de respiración.',
    tipo: 'yoga',
    fecha: '2025-01-21T08:00:00',
    colaborador: 'Elena Vásquez',
    modalidad: 'presencial',
    ubicacion: 'Sala Zen - Piso 2',
    capacidad: 15,
    plazasOcupadas: 8,
    puntos: 50
  },
  {
    id: 2,
    titulo: 'Meditación Mindfulness',
    descripcion: 'Encuentra la calma interior con técnicas de meditación mindfulness. Ideal para reducir el estrés laboral.',
    tipo: 'meditacion',
    fecha: '2025-01-21T12:30:00',
    colaborador: 'Miguel Torres',
    modalidad: 'online',
    ubicacion: 'Zoom',
    capacidad: 20,
    plazasOcupadas: 12,
    puntos: 40
  },
  {
    id: 3,
    titulo: 'Coaching de Productividad',
    descripcion: 'Sesión personalizada para mejorar tu productividad y gestión del tiempo en el trabajo.',
    tipo: 'coaching',
    fecha: '2025-01-22T16:00:00',
    colaborador: 'Carlos Ruiz',
    modalidad: 'online',
    ubicacion: 'Google Meet',
    capacidad: 10,
    plazasOcupadas: 6,
    puntos: 60
  },
  {
    id: 4,
    titulo: 'Nutrición Saludable en la Oficina',
    descripcion: 'Aprende a mantener una alimentación balanceada durante tu jornada laboral.',
    tipo: 'nutricion',
    fecha: '2025-01-23T14:00:00',
    colaborador: 'Dr. Ana López',
    modalidad: 'presencial',
    ubicacion: 'Sala de Conferencias A',
    capacidad: 25,
    plazasOcupadas: 18,
    puntos: 45
  },
  {
    id: 5,
    titulo: 'Entrenamiento HIIT Express',
    descripcion: 'Rutina de ejercicios de alta intensidad en intervalos cortos. Perfecto para el descanso del almuerzo.',
    tipo: 'entrenamiento',
    fecha: '2025-01-24T13:00:00',
    colaborador: 'Roberto Fitness',
    modalidad: 'presencial',
    ubicacion: 'Gimnasio Corporativo',
    capacidad: 12,
    plazasOcupadas: 12,
    puntos: 70
  },
  {
    id: 6,
    titulo: 'Terapia de Relajación',
    descripcion: 'Sesión de relajación profunda para liberar tensiones y mejorar tu bienestar emocional.',
    tipo: 'psicoterapia',
    fecha: '2025-01-25T17:00:00',
    colaborador: 'Dra. Sofia Mendez',
    modalidad: 'online',
    ubicacion: 'Sesión Privada',
    capacidad: 1,
    plazasOcupadas: 0,
    puntos: 80
  }
])

// Computed
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

const reservarActividad = (actividad) => {
  if (actividad.plazasOcupadas >= actividad.capacidad) {
    toast.add({
      severity: 'warn',
      summary: 'Actividad completa',
      detail: 'Esta actividad ya no tiene plazas disponibles',
      life: 3000
    })
    return
  }
  
  actividad.plazasOcupadas++
  
  toast.add({
    severity: 'success',
    summary: '¡Reserva confirmada!',
    detail: `Tu plaza para "${actividad.titulo}" ha sido reservada`,
    life: 3000
  })
}

const limpiarFiltros = () => {
  filtros.value = {
    tipoServicio: '',
    modalidad: '',
    fecha: ''
  }
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>