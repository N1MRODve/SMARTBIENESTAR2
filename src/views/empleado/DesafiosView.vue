<template>
  <div class="p-6 md:p-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Desafíos de Bienestar</h1>
      <p class="text-gray-600 mt-1">Participa en nuestros desafíos, gana puntos y mejora tu bienestar.</p>
    </header>

    <!-- Estadísticas de Desafíos -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-yellow-600 mb-2">{{ stats.activos }}</h3>
        <p class="text-gray-700 font-medium">Desafíos Activos</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-green-600 mb-2">{{ stats.completados }}</h3>
        <p class="text-gray-700 font-medium">Completados</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-primary mb-2">{{ stats.puntosTotales }}</h3>
        <p class="text-gray-700 font-medium">Puntos Ganados</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-purple-600 mb-2">{{ stats.racha }}</h3>
        <p class="text-gray-700 font-medium">Racha Actual</p>
      </div>
    </div>

    <!-- Filtros -->
    <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
          <select v-model="filtroCategoria" class="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
            <option value="">Todas las categorías</option>
            <option value="actividad_fisica">Actividad Física</option>
            <option value="nutricion">Nutrición</option>
            <option value="meditacion">Meditación</option>
            <option value="social">Social</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
          <select v-model="filtroEstado" class="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
            <option value="">Todos los estados</option>
            <option value="activo">Activos</option>
            <option value="completado">Completados</option>
            <option value="finalizado">Finalizados</option>
          </select>
        </div>
        
        <div class="flex items-end">
          <button @click="limpiarFiltros" class="w-full glass-button-outline text-gray-700 bg-white/60 hover:bg-gray-50/80 px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50">
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 6" :key="n" class="glass-card rounded-xl shadow-lg p-6 animate-pulse backdrop-blur-sm border border-white/20">
        <div class="h-32 bg-gray-300 rounded-lg mb-4"></div>
        <div class="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div class="h-10 bg-gray-300 rounded w-full"></div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="desafiosFiltrados.length === 0" class="glass-card rounded-xl shadow-lg p-12 text-center backdrop-blur-sm border border-white/20">
      <Trophy class="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">Aún no tenemos datos</h3>
      <p class="text-gray-500">No hay desafíos disponibles en este momento.</p>
    </div>

    <!-- Desafíos Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="desafio in desafiosFiltrados" 
        :key="desafio.id" 
        class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        <!-- Header del desafío -->
        <div class="relative h-40 bg-gradient-to-br from-yellow-400/20 to-orange-500/20">
          <div class="absolute inset-0 flex items-center justify-center">
            <Trophy class="h-16 w-16 text-yellow-600" />
          </div>
          <div class="absolute top-3 right-3">
            <span :class="[
              'px-3 py-1 rounded-full text-xs font-medium',
              getDesafioStatusClass(desafio.estado)
            ]">
              {{ getDesafioStatusText(desafio.estado) }}
            </span>
          </div>
          <div class="absolute bottom-3 left-3">
            <span :class="[
              'px-2 py-1 rounded-full text-xs font-medium',
              getCategoriaClass(desafio.categoria)
            ]">
              {{ desafio.categoria }}
            </span>
          </div>
        </div>
        
        <div class="p-6">
          <!-- Título y descripción -->
          <h3 class="text-xl font-bold text-gray-900 mb-2">{{ desafio.titulo }}</h3>
          <p class="text-gray-700 mb-4 line-clamp-3">{{ desafio.descripcion }}</p>
          
          <!-- Información del desafío -->
          <div class="space-y-2 mb-4">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Duración:</span>
              <span class="font-medium text-gray-900">{{ desafio.duracion }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Recompensa:</span>
              <span class="font-medium text-yellow-600">{{ desafio.puntos }} puntos</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Participantes:</span>
              <span class="font-medium text-gray-900">{{ desafio.participantes }}</span>
            </div>
          </div>
          
          <!-- Progreso si está participando -->
          <div v-if="desafio.participando" class="mb-4">
            <div class="flex items-center justify-between text-sm mb-1">
              <span class="text-gray-600">Progreso:</span>
              <span class="font-medium text-gray-900">{{ desafio.progreso }}%</span>
            </div>
            <div class="bg-gray-200 rounded-full h-2">
              <div 
                class="bg-gradient-to-r from-primary to-secondary rounded-full h-2 transition-all duration-300"
                :style="{ width: `${desafio.progreso}%` }"
              ></div>
            </div>
          </div>
          
          <!-- Fecha límite -->
          <p class="text-xs text-gray-500 mb-4">
            Termina: {{ formatearFecha(desafio.fecha_fin) }}
          </p>
        </div>
        
        <!-- Botón de acción -->
        <div class="px-6 py-4 bg-gray-50/50 border-t border-gray-200/50">
          <button 
            v-if="!desafio.participando && desafio.estado === 'activo'"
            @click="participarDesafio(desafio)"
            class="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors"
          >
            ¡Unirme al Desafío!
          </button>
          
          <button 
            v-else-if="desafio.participando && desafio.estado === 'activo'"
            @click="verProgreso(desafio)"
            class="w-full glass-button-outline text-primary bg-white/60 hover:bg-blue-50/80 px-4 py-3 rounded-lg transition-all duration-300 font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-blue-300/50"
          >
            Ver Mi Progreso
          </button>
          
          <div v-else class="text-center py-2">
            <span class="text-sm text-gray-500">Desafío finalizado</span>
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
import { Trophy } from 'lucide-vue-next'

const router = useRouter()
const toast = useToast()

// Estado reactivo
const loading = ref(false)
const filtroCategoria = ref('')
const filtroEstado = ref('')

// Estadísticas
const stats = ref({
  activos: 2,
  completados: 3,
  puntosTotales: 450,
  racha: 7
})

// Datos de ejemplo (dummy data)
const desafios = ref([
  {
    id: 1,
    titulo: 'Camina 10,000 pasos diarios',
    descripcion: 'Mantente activo caminando al menos 10,000 pasos cada día durante 14 días consecutivos. Mejora tu salud cardiovascular y energía.',
    categoria: 'actividad_fisica',
    estado: 'activo',
    duracion: '14 días',
    puntos: 200,
    participantes: 45,
    fecha_fin: '2025-02-15T23:59:59',
    participando: true,
    progreso: 65
  },
  {
    id: 2,
    titulo: 'Meditación Diaria',
    descripcion: 'Dedica 10 minutos cada día a la meditación mindfulness. Reduce el estrés y mejora tu concentración en el trabajo.',
    categoria: 'meditacion',
    estado: 'activo',
    duracion: '7 días',
    puntos: 150,
    participantes: 32,
    fecha_fin: '2025-02-10T23:59:59',
    participando: false,
    progreso: 0
  },
  {
    id: 3,
    titulo: 'Alimentación Saludable',
    descripcion: 'Consume al menos 5 porciones de frutas y verduras diariamente durante una semana completa.',
    categoria: 'nutricion',
    estado: 'activo',
    duracion: '7 días',
    puntos: 120,
    participantes: 28,
    fecha_fin: '2025-02-08T23:59:59',
    participando: false,
    progreso: 0
  },
  {
    id: 4,
    titulo: 'Conexión Social',
    descripcion: 'Participa en al menos 3 actividades grupales durante el mes. Fortalece los lazos con tus compañeros.',
    categoria: 'social',
    estado: 'completado',
    duracion: '30 días',
    puntos: 300,
    participantes: 67,
    fecha_fin: '2025-01-31T23:59:59',
    participando: true,
    progreso: 100
  },
  {
    id: 5,
    titulo: 'Hidratación Consciente',
    descripcion: 'Bebe al menos 8 vasos de agua diariamente y registra tu consumo durante 10 días.',
    categoria: 'nutricion',
    estado: 'finalizado',
    duracion: '10 días',
    puntos: 100,
    participantes: 89,
    fecha_fin: '2025-01-20T23:59:59',
    participando: false,
    progreso: 0
  }
])

// Computed
const desafiosFiltrados = computed(() => {
  let resultado = desafios.value
  
  if (filtroCategoria.value) {
    resultado = resultado.filter(d => d.categoria === filtroCategoria.value)
  }
  
  if (filtroEstado.value) {
    resultado = resultado.filter(d => d.estado === filtroEstado.value)
  }
  
  return resultado
})

// Métodos
const formatearFecha = (fechaString) => {
  const fecha = new Date(fechaString)
  return fecha.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const getDesafioStatusClass = (estado) => {
  const classMap = {
    activo: 'bg-green-100 text-green-800',
    completado: 'bg-blue-100 text-blue-800',
    finalizado: 'bg-gray-100 text-gray-800'
  }
  return classMap[estado] || 'bg-gray-100 text-gray-800'
}

const getDesafioStatusText = (estado) => {
  const textMap = {
    activo: 'Activo',
    completado: 'Completado',
    finalizado: 'Finalizado'
  }
  return textMap[estado] || estado
}

const getCategoriaClass = (categoria) => {
  const classMap = {
    actividad_fisica: 'bg-red-100 text-red-800',
    nutricion: 'bg-yellow-100 text-yellow-800',
    meditacion: 'bg-purple-100 text-purple-800',
    social: 'bg-blue-100 text-blue-800'
  }
  return classMap[categoria] || 'bg-gray-100 text-gray-800'
}

const participarDesafio = (desafio) => {
  desafio.participando = true
  desafio.participantes++
  
  toast.add({
    severity: 'success',
    summary: '¡Te has unido al desafío!',
    detail: `Ahora participas en "${desafio.titulo}". ¡Comienza hoy mismo!`,
    life: 3000
  })
}

const verProgreso = (desafio) => {
  router.push(`/empleado/desafios/${desafio.id}`)
}

const limpiarFiltros = () => {
  filtroCategoria.value = ''
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