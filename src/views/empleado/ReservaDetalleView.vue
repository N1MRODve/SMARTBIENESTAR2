<template>
  <div class="p-6 md:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Botón de regreso -->
      <button 
        @click="$router.back()"
        class="flex items-center text-primary hover:text-primary-dark mb-6 transition-colors"
      >
        <ArrowLeft class="h-4 w-4 mr-2" />
        Volver a mis reservas
      </button>

      <div v-if="!reserva" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p class="text-gray-600">Cargando detalles de la reserva...</p>
      </div>

      <div v-else class="glass-container rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/30">
        <!-- Header -->
        <div class="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20">
          <div class="absolute inset-0 flex items-center justify-center">
            <component :is="getServiceIcon(reserva.tipo)" class="h-24 w-24 text-primary" />
          </div>
          <div class="absolute top-4 right-4">
            <span :class="[
              'px-3 py-1 rounded-full text-sm font-medium',
              getStatusClass(reserva.estado)
            ]">
              {{ getStatusText(reserva.estado) }}
            </span>
          </div>
          <div class="absolute bottom-4 left-4">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ reserva.titulo }}</h1>
            <p class="text-gray-700">{{ reserva.colaborador }}</p>
          </div>
        </div>

        <!-- Contenido -->
        <div class="p-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Información de la sesión -->
            <div>
              <h2 class="text-xl font-semibold text-gray-900 mb-4">Detalles de la Sesión</h2>
              <div class="space-y-4">
                <div class="flex items-center">
                  <Calendar class="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p class="font-medium text-gray-900">Fecha y Hora</p>
                    <p class="text-sm text-gray-600">{{ formatDateTime(reserva.fecha) }}</p>
                  </div>
                </div>
                
                <div class="flex items-center">
                  <component :is="reserva.modalidad === 'online' ? Globe : MapPin" class="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p class="font-medium text-gray-900">Modalidad</p>
                    <p class="text-sm text-gray-600">
                      {{ reserva.modalidad === 'online' ? 'Sesión Online' : reserva.ubicacion }}
                    </p>
                  </div>
                </div>
                
                <div class="flex items-center">
                  <Clock class="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p class="font-medium text-gray-900">Duración</p>
                    <p class="text-sm text-gray-600">{{ reserva.duracion }} minutos</p>
                  </div>
                </div>
                
                <div class="flex items-center">
                  <Star class="h-5 w-5 text-yellow-500 mr-3" />
                  <div>
                    <p class="font-medium text-gray-900">Puntos de Bienestar</p>
                    <p class="text-sm text-gray-600">+{{ reserva.puntos }} puntos</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Información de la reserva -->
            <div>
              <h2 class="text-xl font-semibold text-gray-900 mb-4">Mi Reserva</h2>
              <div class="space-y-4">
                <div class="flex items-center">
                  <BookmarkCheck class="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p class="font-medium text-gray-900">Fecha de Reserva</p>
                    <p class="text-sm text-gray-600">{{ formatDate(reserva.fechaReserva) }}</p>
                  </div>
                </div>
                
                <div class="flex items-center">
                  <Users class="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p class="font-medium text-gray-900">Tipo de Reserva</p>
                    <p class="text-sm text-gray-600">{{ reserva.tipoReserva }}</p>
                  </div>
                </div>
                
                <div v-if="reserva.calificacion" class="flex items-center">
                  <Star class="h-5 w-5 text-yellow-500 mr-3" />
                  <div>
                    <p class="font-medium text-gray-900">Tu Calificación</p>
                    <div class="flex items-center mt-1">
                      <Star
                        v-for="i in 5"
                        :key="i"
                        :class="[
                          'h-4 w-4',
                          i <= reserva.calificacion ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        ]"
                      />
                      <span class="ml-2 text-sm text-gray-600">{{ reserva.calificacion }}/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Descripción -->
          <div class="mt-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Descripción</h2>
            <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
              <p class="text-gray-700 leading-relaxed">{{ reserva.descripcion }}</p>
            </div>
          </div>

          <!-- Comentario si existe -->
          <div v-if="reserva.comentario" class="mt-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Tu Comentario</h2>
            <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
              <p class="text-gray-700 leading-relaxed">{{ reserva.comentario }}</p>
            </div>
          </div>

          <!-- Acciones -->
          <div class="mt-8 flex gap-4">
            <button 
              v-if="reserva.estado === 'confirmada' && new Date(reserva.fecha) > new Date()"
              @click="cancelarReserva"
              class="px-6 py-3 border border-red-300/50 text-red-600 rounded-lg hover:bg-red-50/80 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm"
            >
              Cancelar Reserva
            </button>
            
            <button 
              v-if="reserva.estado === 'completada' && !reserva.calificacion"
              @click="calificarSesion"
              class="glass-button-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30"
            >
              Calificar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { 
  ArrowLeft, 
  Calendar, 
  Globe, 
  MapPin, 
  Clock, 
  Star, 
  BookmarkCheck, 
  Users,
  Activity,
  Brain,
  Apple,
  MessageCircle,
  Heart,
  Dumbbell
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const toast = useToast()

// Estado reactivo
const reserva = ref(null)

// Datos de ejemplo basados en el ID
const reservasEjemplo = {
  1: {
    id: 1,
    titulo: 'Yoga Matutino',
    descripcion: 'Sesión perfecta para comenzar tu día con energía positiva. Aprenderás posturas básicas de yoga, técnicas de respiración y relajación que te ayudarán a mantener el equilibrio durante toda la jornada laboral.',
    fecha: '2025-01-18T08:00:00',
    colaborador: 'Elena Vásquez',
    modalidad: 'presencial',
    ubicacion: 'Sala Zen - Piso 2',
    tipo: 'yoga',
    estado: 'completada',
    calificacion: 5,
    comentario: 'Excelente sesión, muy relajante y energizante',
    puntos: 50,
    duracion: 60,
    fechaReserva: '2025-01-15T10:30:00',
    tipoReserva: 'Normal'
  },
  2: {
    id: 2,
    titulo: 'Coaching de Productividad',
    descripcion: 'Sesión personalizada para mejorar tu productividad y gestión del tiempo en el trabajo. Aprenderás técnicas avanzadas de organización y estrategias para optimizar tu rendimiento profesional.',
    fecha: '2025-01-22T16:00:00',
    colaborador: 'Carlos Ruiz',
    modalidad: 'online',
    ubicacion: 'Google Meet',
    tipo: 'coaching',
    estado: 'confirmada',
    calificacion: null,
    comentario: null,
    puntos: 60,
    duracion: 45,
    fechaReserva: '2025-01-20T14:15:00',
    tipoReserva: 'Normal'
  }
}

// Métodos
const cargarReserva = () => {
  const id = parseInt(route.params.id)
  reserva.value = reservasEjemplo[id] || null
}

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

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', { 
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

const cancelarReserva = () => {
  if (!confirm(`¿Estás seguro de que quieres cancelar la reserva para "${reserva.value.titulo}"?`)) {
    return
  }
  
  reserva.value.estado = 'cancelada'
  reserva.value.comentario = 'Cancelada por el usuario'
  
  toast.add({
    severity: 'success',
    summary: 'Reserva cancelada',
    detail: 'Tu reserva ha sido cancelada exitosamente',
    life: 3000
  })
  
  setTimeout(() => {
    router.push('/empleado/reservas')
  }, 1500)
}

const calificarSesion = () => {
  toast.add({
    severity: 'info',
    summary: 'Próximamente',
    detail: 'La funcionalidad de calificación se implementará pronto',
    life: 3000
  })
}

// Lifecycle
onMounted(() => {
  cargarReserva()
})
</script>