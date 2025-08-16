<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-3xl font-bold text-gray-900">Psicoterapia y Bienestar Mental</h1>
      <p class="text-gray-600 mt-1">Cuida tu salud mental con sesiones profesionales y confidenciales.</p>
    </header>

    <!-- Estadísticas de Bienestar Mental -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-primary mb-2">{{ stats.sesionesCompletadas }}</h3>
        <p class="text-gray-700 font-medium">Sesiones Completadas</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-green-600 mb-2">{{ stats.nivelBienestar }}</h3>
        <p class="text-gray-700 font-medium">Nivel de Bienestar</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-blue-600 mb-2">{{ stats.diasConsecutivos }}</h3>
        <p class="text-gray-700 font-medium">Días Consecutivos</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-purple-600 mb-2">{{ stats.herramientasAprendidas }}</h3>
        <p class="text-gray-700 font-medium">Herramientas Aprendidas</p>
      </div>
    </div>

    <!-- Acceso Rápido a Servicios -->
    <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
      <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Heart class="h-5 w-5 mr-2 text-red-500" />
        Servicios de Apoyo Mental
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Chat Anónimo -->
        <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageSquare class="h-8 w-8 text-white" />
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Chat Anónimo</h3>
          <p class="text-sm text-gray-600 mb-4">Conversa de forma completamente anónima con un profesional</p>
          <button 
            @click="iniciarChatAnonimo"
            class="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            Iniciar Chat
          </button>
        </div>

        <!-- Sesión Individual -->
        <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User class="h-8 w-8 text-white" />
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Sesión Individual</h3>
          <p class="text-sm text-gray-600 mb-4">Sesión personalizada uno a uno con un psicólogo</p>
          <button 
            @click="solicitarSesionIndividual"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Solicitar Sesión
          </button>
        </div>

        <!-- Recursos de Autoayuda -->
        <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen class="h-8 w-8 text-white" />
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Recursos</h3>
          <p class="text-sm text-gray-600 mb-4">Artículos, videos y herramientas de autoayuda</p>
          <button 
            @click="verRecursos"
            class="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors font-medium"
          >
            Explorar Recursos
          </button>
        </div>
      </div>
    </div>

    <!-- Próximas Sesiones -->
    <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-gray-900 flex items-center">
          <Calendar class="h-5 w-5 mr-2 text-primary" />
          Mis Próximas Sesiones
        </h2>
      </div>

      <div v-if="proximasSesiones.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
        <Calendar class="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <p class="font-medium mb-2">Aún no tenemos datos</p>
        <p class="text-sm text-gray-500 mb-4">No tienes sesiones de psicoterapia programadas</p>
        <button 
          @click="solicitarSesionIndividual"
          class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium"
        >
          Solicitar Primera Sesión
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
              <div class="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center">
                <Heart class="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">{{ sesion.titulo }}</h3>
                <p class="text-sm text-gray-600">{{ sesion.psicologo }}</p>
              </div>
            </div>
            <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              {{ sesion.modalidad }}
            </span>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="flex items-center">
              <Calendar class="h-4 w-4 text-gray-500 mr-2" />
              <span class="text-sm text-gray-600">{{ formatDateTime(sesion.fecha) }}</span>
            </div>
            <div class="flex items-center">
              <Shield class="h-4 w-4 text-gray-500 mr-2" />
              <span class="text-sm text-gray-600">{{ sesion.confidencial ? 'Confidencial' : 'Estándar' }}</span>
            </div>
          </div>

          <div class="flex gap-2">
            <button class="flex-1 glass-button-outline text-gray-700 bg-white/60 hover:bg-gray-50/80 px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50 text-sm">
              Ver Detalles
            </button>
            <button class="text-sm text-blue-600 border border-blue-300/50 hover:bg-blue-50/80 px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm">
              Reprogramar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Herramientas de Bienestar -->
    <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
      <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Lightbulb class="h-5 w-5 mr-2 text-yellow-500" />
        Herramientas de Bienestar Mental
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="herramienta in herramientasBienestar" 
          :key="herramienta.id"
          class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          <div class="flex items-center space-x-4 mb-4">
            <div :class="[
              'w-12 h-12 rounded-xl flex items-center justify-center',
              herramienta.colorClass
            ]">
              <component :is="herramienta.icono" class="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">{{ herramienta.titulo }}</h3>
              <p class="text-sm text-gray-600">{{ herramienta.categoria }}</p>
            </div>
          </div>
          
          <p class="text-sm text-gray-700 mb-4">{{ herramienta.descripcion }}</p>
          
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500">{{ herramienta.duracion }}</span>
            <button 
              @click="usarHerramienta(herramienta)"
              class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm"
            >
              {{ herramienta.accion }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { 
  Heart, 
  Calendar, 
  MessageSquare, 
  User, 
  BookOpen, 
  Shield,
  Lightbulb,
  Brain,
  Headphones,
  FileText,
  Video
} from 'lucide-vue-next'

const router = useRouter()
const toast = useToast()

// Estadísticas
const stats = ref({
  sesionesCompletadas: 6,
  nivelBienestar: 8.2,
  diasConsecutivos: 14,
  herramientasAprendidas: 12
})

// Próximas sesiones
const proximasSesiones = ref([
  {
    id: 1,
    titulo: 'Sesión de Seguimiento',
    psicologo: 'Dra. Sofia Mendez',
    fecha: '2025-01-26T16:00:00',
    modalidad: 'Online',
    confidencial: true
  },
  {
    id: 2,
    titulo: 'Terapia Cognitivo-Conductual',
    psicologo: 'Dr. Luis Herrera',
    fecha: '2025-01-30T14:00:00',
    modalidad: 'Presencial',
    confidencial: true
  }
])

// Herramientas de bienestar mental
const herramientasBienestar = ref([
  {
    id: 1,
    titulo: 'Meditación Guiada',
    categoria: 'Relajación',
    descripcion: 'Sesiones de meditación de 5-20 minutos para reducir el estrés',
    duracion: '5-20 min',
    accion: 'Meditar Ahora',
    icono: Brain,
    colorClass: 'bg-gradient-to-br from-purple-400 to-purple-600'
  },
  {
    id: 2,
    titulo: 'Ejercicios de Respiración',
    categoria: 'Técnicas',
    descripcion: 'Técnicas de respiración para manejo de ansiedad y estrés',
    duracion: '3-10 min',
    accion: 'Practicar',
    icono: Heart,
    colorClass: 'bg-gradient-to-br from-green-400 to-green-600'
  },
  {
    id: 3,
    titulo: 'Diario de Emociones',
    categoria: 'Autoconocimiento',
    descripcion: 'Registra y reflexiona sobre tus emociones diarias',
    duracion: '5-15 min',
    accion: 'Escribir',
    icono: FileText,
    colorClass: 'bg-gradient-to-br from-blue-400 to-blue-600'
  },
  {
    id: 4,
    titulo: 'Relajación Progresiva',
    categoria: 'Relajación',
    descripcion: 'Audio guías para relajación muscular progresiva',
    duracion: '10-30 min',
    accion: 'Escuchar',
    icono: Headphones,
    colorClass: 'bg-gradient-to-br from-indigo-400 to-indigo-600'
  },
  {
    id: 5,
    titulo: 'Videos Educativos',
    categoria: 'Educación',
    descripcion: 'Contenido educativo sobre salud mental y bienestar',
    duracion: '5-15 min',
    accion: 'Ver Videos',
    icono: Video,
    colorClass: 'bg-gradient-to-br from-red-400 to-red-600'
  },
  {
    id: 6,
    titulo: 'Técnicas de Mindfulness',
    categoria: 'Mindfulness',
    descripcion: 'Ejercicios de atención plena para el momento presente',
    duracion: '5-20 min',
    accion: 'Practicar',
    icono: Brain,
    colorClass: 'bg-gradient-to-br from-yellow-400 to-orange-500'
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

const iniciarChatAnonimo = () => {
  toast.add({
    severity: 'info',
    summary: 'Chat Anónimo',
    detail: 'Conectando con un profesional disponible...',
    life: 3000
  })
  
  // Simular conexión
  setTimeout(() => {
    toast.add({
      severity: 'success',
      summary: 'Conectado',
      detail: 'Ya puedes comenzar tu conversación anónima',
      life: 3000
    })
  }, 2000)
}

const solicitarSesionIndividual = () => {
  toast.add({
    severity: 'success',
    summary: 'Solicitud enviada',
    detail: 'Tu solicitud de sesión individual ha sido enviada. Te contactaremos pronto.',
    life: 3000
  })
}

const usarHerramienta = (herramienta) => {
  toast.add({
    severity: 'info',
    summary: `${herramienta.titulo}`,
    detail: `Iniciando ${herramienta.categoria.toLowerCase()}...`,
    life: 3000
  })
}

const verRecursos = () => {
  router.push('/empleado/psicoterapia/recursos')
}
</script>