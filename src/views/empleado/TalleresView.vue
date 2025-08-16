<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-3xl font-bold text-gray-900">Talleres y Eventos</h1>
      <p class="text-gray-600 mt-1">Participa en talleres grupales y eventos especiales de bienestar.</p>
    </header>

    <!-- Estadísticas de Talleres -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-primary mb-2">{{ stats.talleresAsistidos }}</h3>
        <p class="text-gray-700 font-medium">Talleres Asistidos</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-green-600 mb-2">{{ stats.certificados }}</h3>
        <p class="text-gray-700 font-medium">Certificados</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-yellow-600 mb-2">{{ stats.horasFormacion }}</h3>
        <p class="text-gray-700 font-medium">Horas de Formación</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-purple-600 mb-2">{{ stats.puntosTalleres }}</h3>
        <p class="text-gray-700 font-medium">Puntos Ganados</p>
      </div>
    </div>

    <!-- Filtros -->
    <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
          <select v-model="filtroCategoria" class="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
            <option value="">Todas las categorías</option>
            <option value="liderazgo">Liderazgo</option>
            <option value="comunicacion">Comunicación</option>
            <option value="productividad">Productividad</option>
            <option value="bienestar">Bienestar</option>
            <option value="tecnologia">Tecnología</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Modalidad</label>
          <select v-model="filtroModalidad" class="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
            <option value="">Todas</option>
            <option value="presencial">Presencial</option>
            <option value="online">Online</option>
            <option value="hibrido">Híbrido</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
          <select v-model="filtroEstado" class="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
            <option value="">Todos</option>
            <option value="disponible">Disponibles</option>
            <option value="inscrito">Inscritos</option>
            <option value="completado">Completados</option>
          </select>
        </div>
        
        <div class="flex items-end">
          <button @click="limpiarFiltros" class="w-full glass-button-outline text-gray-700 bg-white/60 hover:bg-gray-50/80 px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50">
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>

    <!-- Lista de Talleres -->
    <div v-if="talleresFiltrados.length === 0" class="glass-card rounded-xl shadow-lg p-12 text-center backdrop-blur-sm border border-white/20">
      <GraduationCap class="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">Aún no tenemos datos</h3>
      <p class="text-gray-500">No hay talleres disponibles que coincidan con tus filtros.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="taller in talleresFiltrados" 
        :key="taller.id"
        class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        <!-- Header del taller -->
        <div class="relative h-40 bg-gradient-to-br from-purple-400/20 to-blue-500/20">
          <div class="absolute inset-0 flex items-center justify-center">
            <component :is="getTallerIcon(taller.categoria)" class="h-16 w-16 text-primary" />
          </div>
          <div class="absolute top-3 right-3">
            <span :class="[
              'px-3 py-1 rounded-full text-xs font-medium',
              getTallerStatusClass(taller.estado)
            ]">
              {{ getTallerStatusText(taller.estado) }}
            </span>
          </div>
          <div class="absolute bottom-3 left-3">
            <span :class="[
              'px-2 py-1 rounded-full text-xs font-medium',
              getModalidadClass(taller.modalidad)
            ]">
              {{ taller.modalidad }}
            </span>
          </div>
        </div>
        
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-900 mb-2">{{ taller.titulo }}</h3>
          <p class="text-gray-700 mb-4 line-clamp-3">{{ taller.descripcion }}</p>
          
          <div class="space-y-2 mb-4">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Fecha:</span>
              <span class="font-medium text-gray-900">{{ formatDate(taller.fechaInicio) }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Duración:</span>
              <span class="font-medium text-gray-900">{{ taller.duracion }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Participantes:</span>
              <span class="font-medium text-gray-900">{{ taller.participantesActuales }}/{{ taller.capacidadMaxima }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Puntos:</span>
              <span class="font-medium text-yellow-600">+{{ taller.puntos }}</span>
            </div>
          </div>
          
          <!-- Barra de ocupación -->
          <div class="mb-4">
            <div class="bg-gray-200 rounded-full h-2">
              <div 
                :class="[
                  'rounded-full h-2 transition-all duration-300',
                  getOccupancyColor(taller.participantesActuales, taller.capacidadMaxima)
                ]"
                :style="{ width: `${(taller.participantesActuales / taller.capacidadMaxima) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
        
        <!-- Botón de acción -->
        <div class="px-6 py-4 bg-gray-50/50 border-t border-gray-200/50">
          <button 
            v-if="taller.estado === 'disponible'"
            @click="inscribirseTaller(taller)"
            :disabled="taller.participantesActuales >= taller.capacidadMaxima"
            class="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ taller.participantesActuales >= taller.capacidadMaxima ? 'Completo' : 'Inscribirse' }}
          </button>
          
          <button 
            v-else-if="taller.estado === 'inscrito'"
            @click="verDetallesTaller(taller)"
            class="w-full glass-button-outline text-primary bg-white/60 hover:bg-blue-50/80 px-4 py-3 rounded-lg transition-all duration-300 font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-blue-300/50"
          >
            Ver Detalles
          </button>
          
          <div v-else class="text-center py-2">
            <span class="text-sm text-gray-500">Taller completado</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { 
  GraduationCap, 
  Users, 
  Calendar, 
  Clock, 
  MapPin, 
  Globe,
  BookOpen,
  Lightbulb,
  Briefcase,
  Heart,
  Monitor
} from 'lucide-vue-next'

const router = useRouter()
const toast = useToast()

// Estado reactivo
const filtroCategoria = ref('')
const filtroModalidad = ref('')
const filtroEstado = ref('')

// Estadísticas
const stats = ref({
  talleresAsistidos: 12,
  certificados: 5,
  horasFormacion: 48,
  puntosTalleres: 680
})

// Talleres disponibles
const talleres = ref([
  {
    id: 1,
    titulo: 'Liderazgo Transformacional',
    descripcion: 'Desarrolla habilidades de liderazgo que inspiren y motiven a tu equipo hacia el éxito.',
    categoria: 'liderazgo',
    modalidad: 'presencial',
    fechaInicio: '2025-01-28T09:00:00',
    duracion: '4 horas',
    capacidadMaxima: 20,
    participantesActuales: 15,
    puntos: 120,
    estado: 'disponible'
  },
  {
    id: 2,
    titulo: 'Comunicación Asertiva',
    descripcion: 'Mejora tus habilidades de comunicación para relaciones laborales más efectivas.',
    categoria: 'comunicacion',
    modalidad: 'online',
    fechaInicio: '2025-01-30T14:00:00',
    duracion: '3 horas',
    capacidadMaxima: 25,
    participantesActuales: 18,
    puntos: 100,
    estado: 'disponible'
  },
  {
    id: 3,
    titulo: 'Gestión del Tiempo y Productividad',
    descripcion: 'Técnicas avanzadas para optimizar tu tiempo y aumentar tu productividad diaria.',
    categoria: 'productividad',
    modalidad: 'hibrido',
    fechaInicio: '2025-02-05T10:00:00',
    duracion: '6 horas',
    capacidadMaxima: 15,
    participantesActuales: 8,
    puntos: 150,
    estado: 'disponible'
  },
  {
    id: 4,
    titulo: 'Mindfulness en el Trabajo',
    descripcion: 'Aprende técnicas de mindfulness para reducir el estrés y mejorar tu bienestar laboral.',
    categoria: 'bienestar',
    modalidad: 'presencial',
    fechaInicio: '2025-01-25T16:00:00',
    duracion: '2 horas',
    capacidadMaxima: 12,
    participantesActuales: 12,
    puntos: 80,
    estado: 'inscrito'
  },
  {
    id: 5,
    titulo: 'Innovación y Creatividad',
    descripcion: 'Desarrolla tu pensamiento creativo y habilidades de innovación para resolver problemas.',
    categoria: 'tecnologia',
    modalidad: 'online',
    fechaInicio: '2025-01-20T11:00:00',
    duracion: '3 horas',
    capacidadMaxima: 30,
    participantesActuales: 30,
    puntos: 110,
    estado: 'completado'
  }
])

// Computed
const talleresFiltrados = computed(() => {
  let resultado = talleres.value
  
  if (filtroCategoria.value) {
    resultado = resultado.filter(t => t.categoria === filtroCategoria.value)
  }
  
  if (filtroModalidad.value) {
    resultado = resultado.filter(t => t.modalidad === filtroModalidad.value)
  }
  
  if (filtroEstado.value) {
    resultado = resultado.filter(t => t.estado === filtroEstado.value)
  }
  
  return resultado
})

// Métodos
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
    completado: 'bg-gray-100 text-gray-800',
    cancelado: 'bg-red-100 text-red-800'
  }
  return classMap[estado] || 'bg-gray-100 text-gray-800'
}

const getTallerStatusText = (estado) => {
  const textMap = {
    disponible: 'Disponible',
    inscrito: 'Inscrito',
    completado: 'Completado',
    cancelado: 'Cancelado'
  }
  return textMap[estado] || estado
}

const getModalidadClass = (modalidad) => {
  const classMap = {
    presencial: 'bg-green-100 text-green-800',
    online: 'bg-blue-100 text-blue-800',
    hibrido: 'bg-purple-100 text-purple-800'
  }
  return classMap[modalidad] || 'bg-gray-100 text-gray-800'
}

const getOccupancyColor = (actual, maximo) => {
  const porcentaje = (actual / maximo) * 100
  if (porcentaje >= 90) return 'bg-red-500'
  if (porcentaje >= 70) return 'bg-yellow-500'
  return 'bg-green-500'
}

const inscribirseTaller = (taller) => {
  if (taller.participantesActuales >= taller.capacidadMaxima) {
    toast.add({
      severity: 'warn',
      summary: 'Taller completo',
      detail: 'Este taller ya no tiene plazas disponibles',
      life: 3000
    })
    return
  }
  
  taller.participantesActuales++
  taller.estado = 'inscrito'
  
  toast.add({
    severity: 'success',
    summary: '¡Inscripción exitosa!',
    detail: `Te has inscrito en "${taller.titulo}"`,
    life: 3000
  })
}

const verDetallesTaller = (taller) => {
  router.push(`/empleado/talleres/${taller.id}`)
}

const limpiarFiltros = () => {
  filtroCategoria.value = ''
  filtroModalidad.value = ''
  filtroEstado.value = ''
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