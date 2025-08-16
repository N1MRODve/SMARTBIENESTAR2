<template>
  <div class="p-6 md:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Botón de regreso -->
      <button 
        @click="$router.back()"
        class="flex items-center text-primary hover:text-primary-dark mb-6 transition-colors"
      >
        <ArrowLeft class="h-4 w-4 mr-2" />
        Volver a talleres
      </button>

      <div v-if="!taller" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p class="text-gray-600">Cargando detalles del taller...</p>
      </div>

      <div v-else class="glass-container rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/30">
        <!-- Header -->
        <div class="relative h-64 bg-gradient-to-br from-purple-400/20 to-blue-500/20">
          <div class="absolute inset-0 flex items-center justify-center">
            <component :is="getTallerIcon(taller.categoria)" class="h-24 w-24 text-primary" />
          </div>
          <div class="absolute top-4 right-4">
            <span :class="[
              'px-3 py-1 rounded-full text-sm font-medium',
              getTallerStatusClass(taller.estado)
            ]">
              {{ getTallerStatusText(taller.estado) }}
            </span>
          </div>
          <div class="absolute bottom-4 left-4">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ taller.titulo }}</h1>
            <p class="text-gray-700">{{ taller.facilitador }}</p>
          </div>
        </div>

        <!-- Contenido -->
        <div class="p-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Información principal -->
            <div class="lg:col-span-2">
              <div class="mb-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-3">Descripción del Taller</h2>
                <p class="text-gray-700 leading-relaxed">{{ taller.descripcionCompleta }}</p>
              </div>

              <div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Objetivos de Aprendizaje</h3>
                <ul class="space-y-2">
                  <li 
                    v-for="objetivo in taller.objetivos" 
                    :key="objetivo"
                    class="flex items-start"
                  >
                    <CheckCircle class="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span class="text-gray-700">{{ objetivo }}</span>
                  </li>
                </ul>
              </div>

              <div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Agenda del Taller</h3>
                <div class="space-y-3">
                  <div 
                    v-for="(modulo, index) in taller.agenda" 
                    :key="index"
                    class="flex items-start"
                  >
                    <span class="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
                      {{ index + 1 }}
                    </span>
                    <div>
                      <h4 class="font-medium text-gray-900">{{ modulo.titulo }}</h4>
                      <p class="text-sm text-gray-600">{{ modulo.descripcion }}</p>
                      <span class="text-xs text-gray-500">{{ modulo.duracion }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar con información adicional -->
            <div class="lg:col-span-1">
              <div class="glass-card rounded-xl p-6 backdrop-blur-sm border border-white/20 sticky top-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Información del Taller</h3>
                
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Fecha:</span>
                    <span class="text-sm font-medium text-gray-900">{{ formatDate(taller.fechaInicio) }}</span>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Duración:</span>
                    <span class="text-sm font-medium text-gray-900">{{ taller.duracion }}</span>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Modalidad:</span>
                    <span class="text-sm font-medium text-gray-900">{{ taller.modalidad }}</span>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Participantes:</span>
                    <span class="text-sm font-medium text-gray-900">{{ taller.participantesActuales }}/{{ taller.capacidadMaxima }}</span>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Puntos:</span>
                    <span class="text-sm font-medium text-yellow-600">+{{ taller.puntos }}</span>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Certificado:</span>
                    <span class="text-sm font-medium text-gray-900">{{ taller.certificado ? 'Sí' : 'No' }}</span>
                  </div>
                </div>

                <!-- Barra de progreso -->
                <div class="mt-6">
                  <div class="flex items-center justify-between text-sm mb-1">
                    <span class="text-gray-700">Ocupación</span>
                    <span class="text-gray-500">{{ taller.participantesActuales }}/{{ taller.capacidadMaxima }}</span>
                  </div>
                  <div class="bg-gray-200 rounded-full h-2">
                    <div 
                      :class="[
                        'h-2 rounded-full transition-all duration-300',
                        getOccupancyColor(taller.participantesActuales, taller.capacidadMaxima)
                      ]"
                      :style="{ width: `${(taller.participantesActuales / taller.capacidadMaxima) * 100}%` }"
                    ></div>
                  </div>
                </div>

                <!-- Botón de acción -->
                <div class="mt-6">
                  <button 
                    v-if="taller.estado === 'disponible'"
                    @click="inscribirseTaller"
                    :disabled="taller.participantesActuales >= taller.capacidadMaxima"
                    class="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {{ taller.participantesActuales >= taller.capacidadMaxima ? 'Taller Completo' : 'Inscribirse al Taller' }}
                  </button>
                  
                  <div v-else-if="taller.estado === 'inscrito'" class="text-center">
                    <CheckCircle class="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p class="text-sm text-green-600 font-medium">Ya estás inscrito</p>
                  </div>
                  
                  <div v-else class="text-center">
                    <CheckCircle class="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <p class="text-sm text-blue-600 font-medium">Taller completado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { 
  ArrowLeft, 
  CheckCircle,
  Users,
  BookOpen,
  Briefcase,
  Heart,
  Monitor
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const toast = useToast()

// Talleres de ejemplo
const talleresEjemplo = {
  1: {
    id: 1,
    titulo: 'Liderazgo Transformacional',
    descripcionCompleta: 'Este taller intensivo te ayudará a desarrollar habilidades de liderazgo que inspiren y motiven a tu equipo hacia el éxito. Aprenderás técnicas de comunicación efectiva, gestión de conflictos y cómo crear una visión compartida que impulse el rendimiento del equipo.',
    categoria: 'liderazgo',
    modalidad: 'presencial',
    fechaInicio: '2025-01-28T09:00:00',
    duracion: '4 horas',
    capacidadMaxima: 20,
    participantesActuales: 15,
    puntos: 120,
    estado: 'disponible',
    facilitador: 'Carlos Ruiz',
    certificado: true,
    objetivos: [
      'Desarrollar un estilo de liderazgo auténtico y efectivo',
      'Aprender técnicas de motivación y engagement del equipo',
      'Dominar la comunicación asertiva y empática',
      'Crear estrategias para la gestión del cambio',
      'Implementar herramientas de feedback constructivo'
    ],
    agenda: [
      {
        titulo: 'Fundamentos del Liderazgo',
        descripcion: 'Conceptos básicos y estilos de liderazgo',
        duracion: '60 min'
      },
      {
        titulo: 'Comunicación Efectiva',
        descripcion: 'Técnicas de comunicación para líderes',
        duracion: '90 min'
      },
      {
        titulo: 'Gestión de Equipos',
        descripcion: 'Estrategias para liderar equipos de alto rendimiento',
        duracion: '90 min'
      }
    ]
  },
  2: {
    id: 2,
    titulo: 'Comunicación Asertiva',
    descripcionCompleta: 'Mejora tus habilidades de comunicación para relaciones laborales más efectivas y armoniosas. Este taller te enseñará técnicas de comunicación asertiva, escucha activa y resolución de conflictos.',
    categoria: 'comunicacion',
    modalidad: 'online',
    fechaInicio: '2025-01-30T14:00:00',
    duracion: '3 horas',
    capacidadMaxima: 25,
    participantesActuales: 18,
    puntos: 100,
    estado: 'disponible',
    facilitador: 'María González',
    certificado: true,
    objetivos: [
      'Dominar técnicas de comunicación asertiva',
      'Desarrollar habilidades de escucha activa',
      'Aprender a dar y recibir feedback constructivo',
      'Gestionar conflictos de manera efectiva'
    ],
    agenda: [
      {
        titulo: 'Principios de Comunicación Asertiva',
        descripcion: 'Bases teóricas y prácticas',
        duracion: '45 min'
      },
      {
        titulo: 'Técnicas de Escucha Activa',
        descripcion: 'Ejercicios prácticos de escucha',
        duracion: '60 min'
      },
      {
        titulo: 'Resolución de Conflictos',
        descripcion: 'Estrategias para manejar situaciones difíciles',
        duracion: '75 min'
      }
    ]
  }
}

// Estado reactivo
const taller = ref(null)

// Métodos
const cargarTaller = () => {
  const id = parseInt(route.params.id)
  taller.value = talleresEjemplo[id] || null
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getTallerIcon = (categoria) => {
  const iconMap = {
    liderazgo: Users,
    comunicacion: MessageCircle,
    productividad: Briefcase,
    bienestar: Heart,
    tecnologia: Monitor
  }
  return iconMap[categoria] || BookOpen
}

const getTallerStatusClass = (estado) => {
  const classMap = {
    disponible: 'bg-green-100 text-green-800',
    inscrito: 'bg-blue-100 text-blue-800',
    completado: 'bg-gray-100 text-gray-800'
  }
  return classMap[estado] || 'bg-gray-100 text-gray-800'
}

const getTallerStatusText = (estado) => {
  const textMap = {
    disponible: 'Disponible',
    inscrito: 'Inscrito',
    completado: 'Completado'
  }
  return textMap[estado] || estado
}

const getOccupancyColor = (actual, maximo) => {
  const porcentaje = (actual / maximo) * 100
  if (porcentaje >= 90) return 'bg-red-500'
  if (porcentaje >= 70) return 'bg-yellow-500'
  return 'bg-green-500'
}

const inscribirseTaller = () => {
  if (taller.value.participantesActuales >= taller.value.capacidadMaxima) {
    toast.add({
      severity: 'warn',
      summary: 'Taller completo',
      detail: 'Este taller ya no tiene plazas disponibles',
      life: 3000
    })
    return
  }
  
  taller.value.participantesActuales++
  taller.value.estado = 'inscrito'
  
  toast.add({
    severity: 'success',
    summary: '¡Inscripción exitosa!',
    detail: `Te has inscrito en "${taller.value.titulo}"`,
    life: 3000
  })
}

// Lifecycle
onMounted(() => {
  cargarTaller()
})
</script>