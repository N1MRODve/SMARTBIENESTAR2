<template>
  <div class="space-y-8">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Servicios Contratados</h1>
      <p class="text-gray-600">Gestiona los servicios de bienestar disponibles para tu empresa.</p>
    </header>

    <!-- Estadísticas de Servicios -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-primary mb-2">{{ stats.serviciosActivos }}</h3>
        <p class="text-gray-700 font-medium">Servicios Activos</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-green-600 mb-2">{{ stats.sesionesTotales }}</h3>
        <p class="text-gray-700 font-medium">Sesiones Este Mes</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-blue-600 mb-2">{{ stats.participacionPromedio }}%</h3>
        <p class="text-gray-700 font-medium">Participación</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-yellow-600 mb-2">{{ stats.satisfaccionPromedio }}</h3>
        <p class="text-gray-700 font-medium">Satisfacción</p>
      </div>
    </div>

    <!-- Servicios Contratados -->
    <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Servicios Disponibles</h2>
      
      <div v-if="serviciosContratados.length === 0" class="glass-card p-12 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
        <Briefcase class="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">Aún no tenemos datos</h3>
        <p class="text-gray-500">No hay servicios contratados para tu empresa.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="servicio in serviciosContratados" 
          :key="servicio.id"
          class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div class="relative h-40 bg-gradient-to-br from-primary/20 to-secondary/20">
            <div class="absolute inset-0 flex items-center justify-center">
              <component :is="getServiceIcon(servicio.tipo)" class="h-16 w-16 text-primary" />
            </div>
            <div class="absolute top-3 right-3">
              <span :class="[
                'px-3 py-1 rounded-full text-xs font-medium',
                servicio.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              ]">
                {{ servicio.activo ? 'Activo' : 'Inactivo' }}
              </span>
            </div>
          </div>
          
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ servicio.nombre }}</h3>
            <p class="text-gray-700 mb-4 line-clamp-3">{{ servicio.descripcion }}</p>
            
            <div class="space-y-2 mb-4">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Sesiones este mes:</span>
                <span class="font-medium text-gray-900">{{ servicio.sesiones_mes }}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Participación:</span>
                <span class="font-medium text-gray-900">{{ servicio.participacion }}%</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Satisfacción:</span>
                <div class="flex items-center">
                  <Star class="h-4 w-4 text-yellow-500 mr-1" />
                  <span class="font-medium text-gray-900">{{ servicio.satisfaccion }}/5</span>
                </div>
              </div>
            </div>
            
            <button class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors font-medium">
              Ver Detalles
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'primevue/usetoast'
import { 
  Briefcase, 
  Star,
  Activity,
  Brain,
  Apple,
  MessageCircle,
  Heart,
  Dumbbell
} from 'lucide-vue-next'

const toast = useToast()

// Estado reactivo
const busqueda = ref('')
const filtroEstado = ref('')

// Estadísticas
const stats = ref({
  serviciosActivos: 6,
  sesionesTotales: 48,
  participacionPromedio: 78,
  satisfaccionPromedio: 4.6
})

// Datos dummy de servicios
const serviciosContratados = ref([
  {
    id: 1,
    nombre: 'Yoga y Mindfulness',
    descripcion: 'Sesiones de yoga y meditación para mejorar el bienestar físico y mental',
    tipo: 'yoga',
    activo: true,
    sesiones_mes: 12,
    participacion: 85,
    satisfaccion: 4.8,
    fecha_inicio: '2024-01-01',
    fecha_fin: null
  },
  {
    id: 2,
    nombre: 'Coaching Personal',
    descripcion: 'Sesiones individuales de coaching para desarrollo profesional y personal',
    tipo: 'coaching',
    activo: true,
    sesiones_mes: 8,
    participacion: 70,
    satisfaccion: 4.6,
    fecha_inicio: '2024-03-15',
    fecha_fin: null
  },
  {
    id: 3,
    nombre: 'Asesoría Nutricional',
    descripcion: 'Consultas nutricionales para promover hábitos alimentarios saludables',
    tipo: 'nutricion',
    activo: true,
    sesiones_mes: 6,
    participacion: 65,
    satisfaccion: 4.4,
    fecha_inicio: '2024-02-01',
    fecha_fin: null
  },
  {
    id: 4,
    nombre: 'Psicoterapia',
    descripcion: 'Apoyo psicológico profesional para el bienestar emocional',
    tipo: 'psicoterapia',
    activo: true,
    sesiones_mes: 15,
    participacion: 45,
    satisfaccion: 4.9,
    fecha_inicio: '2024-01-15',
    fecha_fin: null
  },
  {
    id: 5,
    nombre: 'Entrenamiento Físico',
    descripcion: 'Programas de ejercicio y acondicionamiento físico',
    tipo: 'entrenamiento',
    activo: true,
    sesiones_mes: 10,
    participacion: 60,
    satisfaccion: 4.5,
    fecha_inicio: '2024-04-01',
    fecha_fin: null
  },
  {
    id: 6,
    nombre: 'Meditación Avanzada',
    descripcion: 'Técnicas avanzadas de meditación y relajación profunda',
    tipo: 'meditacion',
    activo: false,
    sesiones_mes: 0,
    participacion: 0,
    satisfaccion: 4.2,
    fecha_inicio: '2024-06-01',
    fecha_fin: '2024-12-31'
  }
])

// Computed
const serviciosFiltrados = computed(() => {
  let resultado = serviciosContratados.value
  
  if (busqueda.value.trim()) {
    const term = busqueda.value.trim().toLowerCase()
    resultado = resultado.filter(s =>
      s.nombre.toLowerCase().includes(term) ||
      s.descripcion.toLowerCase().includes(term)
    )
  }
  
  if (filtroEstado.value) {
    const esActivo = filtroEstado.value === 'activo'
    resultado = resultado.filter(s => s.activo === esActivo)
  }
  
  return resultado
})

// Métodos
const getServiceIcon = (tipo) => {
  const iconMap = {
    yoga: Activity,
    meditacion: Brain,
    nutricion: Apple,
    coaching: MessageCircle,
    psicoterapia: Heart,
    entrenamiento: Dumbbell
  }
  return iconMap[tipo] || Briefcase
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const limpiarFiltros = () => {
  busqueda.value = ''
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