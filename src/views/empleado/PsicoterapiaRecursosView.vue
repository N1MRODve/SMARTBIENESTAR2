<template>
  <div class="p-6 md:p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Botón de regreso -->
      <button 
        @click="$router.back()"
        class="flex items-center text-primary hover:text-primary-dark mb-6 transition-colors"
      >
        <ArrowLeft class="h-4 w-4 mr-2" />
        Volver a psicoterapia
      </button>

      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Recursos de Bienestar Mental</h1>
        <p class="text-gray-600 mt-1">Herramientas y contenido para tu crecimiento personal y bienestar mental.</p>
      </header>

      <!-- Categorías de Recursos -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <button 
          v-for="categoria in categorias" 
          :key="categoria.id"
          @click="categoriaActiva = categoria.id"
          :class="[
            'glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center',
            categoriaActiva === categoria.id ? 'ring-2 ring-primary bg-primary/5' : ''
          ]"
        >
          <div :class="[
            'w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3',
            categoria.colorClass
          ]">
            <component :is="categoria.icono" class="h-6 w-6 text-white" />
          </div>
          <h3 class="font-semibold text-gray-900">{{ categoria.nombre }}</h3>
          <p class="text-xs text-gray-500 mt-1">{{ categoria.cantidad }} recursos</p>
        </button>
      </div>

      <!-- Recursos por Categoría -->
      <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ categorias.find(c => c.id === categoriaActiva)?.nombre || 'Todos los Recursos' }}
        </h2>

        <div v-if="recursosFiltrados.length === 0" class="text-center py-12">
          <BookOpen class="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">Aún no tenemos datos</h3>
          <p class="text-gray-500">No hay recursos disponibles en esta categoría.</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="recurso in recursosFiltrados" 
            :key="recurso.id"
            class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div class="p-6">
              <div class="flex items-center space-x-3 mb-4">
                <div :class="[
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  recurso.colorClass
                ]">
                  <component :is="recurso.icono" class="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">{{ recurso.titulo }}</h3>
                  <span :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    getTipoRecursoClass(recurso.tipo)
                  ]">
                    {{ recurso.tipo }}
                  </span>
                </div>
              </div>
              
              <p class="text-sm text-gray-700 mb-4">{{ recurso.descripcion }}</p>
              
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs text-gray-500">{{ recurso.duracion }}</span>
                <div class="flex items-center">
                  <Star class="h-3 w-3 text-yellow-500 mr-1" />
                  <span class="text-xs text-gray-600">{{ recurso.calificacion }}</span>
                </div>
              </div>
              
              <button 
                @click="accederRecurso(recurso)"
                class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm"
              >
                {{ recurso.accion }}
              </button>
            </div>
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
  ArrowLeft, 
  BookOpen, 
  Star,
  Brain,
  Heart,
  FileText,
  Video,
  Headphones,
  MessageSquare
} from 'lucide-vue-next'

const router = useRouter()
const toast = useToast()

// Estado reactivo
const categoriaActiva = ref('meditacion')

// Categorías de recursos
const categorias = ref([
  {
    id: 'meditacion',
    nombre: 'Meditación',
    cantidad: 15,
    icono: Brain,
    colorClass: 'bg-gradient-to-br from-purple-400 to-purple-600'
  },
  {
    id: 'relajacion',
    nombre: 'Relajación',
    cantidad: 12,
    icono: Heart,
    colorClass: 'bg-gradient-to-br from-green-400 to-green-600'
  },
  {
    id: 'articulos',
    nombre: 'Artículos',
    cantidad: 25,
    icono: FileText,
    colorClass: 'bg-gradient-to-br from-blue-400 to-blue-600'
  },
  {
    id: 'videos',
    nombre: 'Videos',
    cantidad: 18,
    icono: Video,
    colorClass: 'bg-gradient-to-br from-red-400 to-red-600'
  }
])

// Recursos disponibles
const recursos = ref([
  // Meditación
  {
    id: 1,
    titulo: 'Meditación para Principiantes',
    descripcion: 'Introducción básica a la meditación mindfulness',
    categoria: 'meditacion',
    tipo: 'Audio',
    duracion: '10 min',
    calificacion: 4.8,
    accion: 'Escuchar',
    icono: Headphones,
    colorClass: 'bg-gradient-to-br from-purple-400 to-purple-600'
  },
  {
    id: 2,
    titulo: 'Respiración Consciente',
    descripcion: 'Técnicas de respiración para reducir la ansiedad',
    categoria: 'meditacion',
    tipo: 'Ejercicio',
    duracion: '5 min',
    calificacion: 4.9,
    accion: 'Practicar',
    icono: Heart,
    colorClass: 'bg-gradient-to-br from-green-400 to-green-600'
  },
  // Relajación
  {
    id: 3,
    titulo: 'Relajación Muscular Progresiva',
    descripcion: 'Técnica para liberar tensión física y mental',
    categoria: 'relajacion',
    tipo: 'Audio',
    duracion: '20 min',
    calificacion: 4.7,
    accion: 'Escuchar',
    icono: Headphones,
    colorClass: 'bg-gradient-to-br from-green-400 to-green-600'
  },
  // Artículos
  {
    id: 4,
    titulo: 'Gestión del Estrés Laboral',
    descripcion: 'Estrategias efectivas para manejar el estrés en el trabajo',
    categoria: 'articulos',
    tipo: 'Artículo',
    duracion: '8 min lectura',
    calificacion: 4.6,
    accion: 'Leer',
    icono: FileText,
    colorClass: 'bg-gradient-to-br from-blue-400 to-blue-600'
  },
  {
    id: 5,
    titulo: 'Equilibrio Vida-Trabajo',
    descripcion: 'Cómo mantener un balance saludable entre vida personal y laboral',
    categoria: 'articulos',
    tipo: 'Artículo',
    duracion: '12 min lectura',
    calificacion: 4.8,
    accion: 'Leer',
    icono: FileText,
    colorClass: 'bg-gradient-to-br from-blue-400 to-blue-600'
  },
  // Videos
  {
    id: 6,
    titulo: 'Técnicas de Mindfulness',
    descripcion: 'Video tutorial sobre práctica de mindfulness diario',
    categoria: 'videos',
    tipo: 'Video',
    duracion: '15 min',
    calificacion: 4.9,
    accion: 'Ver Video',
    icono: Video,
    colorClass: 'bg-gradient-to-br from-red-400 to-red-600'
  }
])

// Computed
const recursosFiltrados = computed(() => {
  if (categoriaActiva.value === 'todos') {
    return recursos.value
  }
  return recursos.value.filter(r => r.categoria === categoriaActiva.value)
})

// Métodos
const getTipoRecursoClass = (tipo) => {
  const classMap = {
    'Audio': 'bg-green-100 text-green-800',
    'Video': 'bg-red-100 text-red-800',
    'Artículo': 'bg-blue-100 text-blue-800',
    'Ejercicio': 'bg-purple-100 text-purple-800'
  }
  return classMap[tipo] || 'bg-gray-100 text-gray-800'
}

const accederRecurso = (recurso) => {
  toast.add({
    severity: 'success',
    summary: `${recurso.titulo}`,
    detail: `Accediendo a ${recurso.tipo.toLowerCase()}...`,
    life: 3000
  })
}
</script>