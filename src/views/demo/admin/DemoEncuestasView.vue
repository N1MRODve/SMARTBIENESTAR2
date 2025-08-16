<template>
  <div class="space-y-8">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Gestión de Encuestas</h1>
      <p class="text-gray-600 mb-4">Crea, gestiona y analiza las encuestas de tu empresa.</p>
      <div class="flex gap-2">
        <button 
          @click="crearEncuesta"
          class="glass-button-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30 flex items-center"
        >
          <Plus class="h-4 w-4 mr-2" />
          Crear Nueva Encuesta
        </button>
        <button class="glass-button-secondary text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200/80 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50 flex items-center">
          <FileText class="h-4 w-4 mr-2" />
          Crear desde Plantilla
        </button>
      </div>
    </header>

    <!-- Estadísticas de Encuestas -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-primary mb-2">{{ stats.totalEncuestas }}</h3>
        <p class="text-gray-700 font-medium">Total Encuestas</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-green-600 mb-2">{{ stats.encuestasActivas }}</h3>
        <p class="text-gray-700 font-medium">Activas</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-blue-600 mb-2">{{ stats.respuestasRecibidas }}</h3>
        <p class="text-gray-700 font-medium">Respuestas</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-yellow-600 mb-2">{{ stats.promedioParticipacion }}%</h3>
        <p class="text-gray-700 font-medium">Participación</p>
      </div>
    </div>

    <!-- Filtros -->
    <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          v-model="busqueda"
          type="text"
          class="w-full border border-white/30 rounded-xl px-4 py-3 bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
          placeholder="Buscar encuestas..."
        />
        <select v-model="filtroEstado" class="w-full px-3 py-3 border border-white/30 rounded-xl bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
          <option value="">Todos los estados</option>
          <option value="borrador">Borradores</option>
          <option value="activa">Activas</option>
          <option value="finalizada">Finalizadas</option>
        </select>
        <button @click="limpiarFiltros" class="glass-button-outline text-gray-700 bg-white/60 hover:bg-gray-50/80 px-4 py-3 rounded-xl transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50">
          Limpiar Filtros
        </button>
      </div>
    </div>

    <!-- Lista de Encuestas -->
    <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
      <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20">
        <table class="min-w-full">
          <thead class="bg-white/50 backdrop-blur-sm">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Encuesta</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Estado</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Respuestas</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fecha Límite</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/20">
            <tr v-for="encuesta in encuestasFiltradas" :key="encuesta.id" class="hover:bg-white/30 transition-colors duration-200">
              <td class="px-6 py-4">
                <div>
                  <p class="font-medium text-gray-900">{{ encuesta.titulo }}</p>
                  <p class="text-sm text-gray-600">{{ encuesta.descripcion }}</p>
                </div>
              </td>
              <td class="px-6 py-4">
                <span
                  :class="{
                    'bg-yellow-100/80 text-yellow-800 border border-yellow-200/50': encuesta.estado === 'borrador',
                    'bg-green-100/80 text-green-800 border border-green-200/50': encuesta.estado === 'activa',
                    'bg-gray-100/80 text-gray-800 border border-gray-200/50': encuesta.estado === 'finalizada'
                  }"
                  class="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
                >
                  {{ encuesta.estado }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <span class="font-medium text-gray-900">{{ encuesta.respuestas }}/{{ encuesta.invitados }}</span>
                  <span class="ml-2 text-xs text-gray-500">({{ Math.round((encuesta.respuestas / encuesta.invitados) * 100) }}%)</span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                {{ encuesta.fecha_fin ? formatDate(encuesta.fecha_fin) : 'Sin límite' }}
              </td>
              <td class="px-6 py-4">
                <div class="flex gap-2">
                  <button
                    v-if="encuesta.estado === 'finalizada'"
                    class="glass-button-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30 text-xs"
                    @click="verResultados(encuesta)"
                  >
                    Ver Resultados
                  </button>
                  <button
                    v-if="encuesta.estado === 'borrador'"
                    class="glass-button-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30 text-xs"
                    @click="enviarEncuesta(encuesta)"
                  >
                    Enviar
                  </button>
                  <button
                    class="glass-button-outline text-blue-700 bg-white/60 hover:bg-blue-50/80 px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-blue-300/50 text-xs"
                    @click="editarEncuesta(encuesta)"
                  >
                    Editar
                  </button>
                  <button
                    class="text-xs px-3 py-2 rounded-lg text-red-600 border border-red-300/50 hover:bg-red-50/80 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm"
                    @click="eliminarEncuesta(encuesta)"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de Resultados de Encuesta -->
    <div v-if="mostrarResultados" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 class="text-xl font-semibold text-gray-900">Resultados de Encuesta</h2>
            <p class="text-sm text-gray-600 mt-1">{{ encuestaSeleccionada?.titulo }}</p>
          </div>
          <button @click="cerrarResultados" class="text-gray-400 hover:text-gray-600">
            <X class="h-6 w-6" />
          </button>
        </div>

        <div class="p-6">
          <!-- Resumen de la encuesta -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="glass-card p-4 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
              <h3 class="text-2xl font-bold text-primary mb-1">{{ encuestaSeleccionada?.respuestas }}</h3>
              <p class="text-sm text-gray-600">Respuestas Recibidas</p>
            </div>
            <div class="glass-card p-4 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
              <h3 class="text-2xl font-bold text-green-600 mb-1">{{ Math.round((encuestaSeleccionada?.respuestas / encuestaSeleccionada?.invitados) * 100) }}%</h3>
              <p class="text-sm text-gray-600">Tasa de Respuesta</p>
            </div>
            <div class="glass-card p-4 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
              <h3 class="text-2xl font-bold text-blue-600 mb-1">{{ resultadosEncuesta.satisfaccion_promedio }}</h3>
              <p class="text-sm text-gray-600">Satisfacción Promedio</p>
            </div>
            <div class="glass-card p-4 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
              <h3 class="text-2xl font-bold text-yellow-600 mb-1">{{ resultadosEncuesta.tiempo_promedio }}</h3>
              <p class="text-sm text-gray-600">Tiempo Promedio</p>
            </div>
          </div>

          <!-- Resultados por pregunta -->
          <div class="space-y-8">
            <div v-for="(pregunta, index) in resultadosEncuesta.preguntas" :key="index" class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ pregunta.texto }}</h3>
              
              <!-- Pregunta de escala (1-5) -->
              <div v-if="pregunta.tipo === 'escala'" class="space-y-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-gray-600">Promedio:</span>
                  <span class="text-lg font-bold text-primary">{{ pregunta.promedio }}/5</span>
                </div>
                
                <div class="space-y-2">
                  <div v-for="opcion in pregunta.distribución" :key="opcion.valor" class="flex items-center">
                    <span class="w-12 text-sm text-gray-600">{{ opcion.valor }}</span>
                    <div class="flex-1 mx-3">
                      <div class="bg-gray-200 rounded-full h-4">
                        <div 
                          class="bg-primary rounded-full h-4 transition-all duration-500"
                          :style="{ width: `${opcion.porcentaje}%` }"
                        ></div>
                      </div>
                    </div>
                    <span class="w-16 text-sm text-gray-900 font-medium">{{ opcion.respuestas }} ({{ opcion.porcentaje }}%)</span>
                  </div>
                </div>
              </div>

              <!-- Pregunta de selección múltiple -->
              <div v-if="pregunta.tipo === 'seleccion'" class="space-y-3">
                <div v-for="opcion in pregunta.opciones" :key="opcion.texto" class="flex items-center">
                  <span class="flex-1 text-sm text-gray-700">{{ opcion.texto }}</span>
                  <div class="flex-1 mx-4">
                    <div class="bg-gray-200 rounded-full h-3">
                      <div 
                        :class="[
                          'rounded-full h-3 transition-all duration-500',
                          getColorByIndex(pregunta.opciones.indexOf(opcion))
                        ]"
                        :style="{ width: `${opcion.porcentaje}%` }"
                      ></div>
                    </div>
                  </div>
                  <span class="w-20 text-sm text-gray-900 font-medium text-right">{{ opcion.respuestas }} ({{ opcion.porcentaje }}%)</span>
                </div>
              </div>

              <!-- Pregunta abierta -->
              <div v-if="pregunta.tipo === 'abierta'" class="space-y-3">
                <p class="text-sm text-gray-600 mb-4">{{ pregunta.respuestas.length }} respuestas recibidas</p>
                <div class="max-h-64 overflow-y-auto space-y-3">
                  <div v-for="(respuesta, idx) in pregunta.respuestas" :key="idx" class="glass-card p-4 rounded-lg backdrop-blur-sm border border-white/20">
                    <p class="text-sm text-gray-700 italic">"{{ respuesta.texto }}"</p>
                    <p class="text-xs text-gray-500 mt-2">{{ respuesta.departamento }} • {{ formatDate(respuesta.fecha) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Análisis por departamento -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30 mt-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Análisis por Departamento</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div v-for="dept in resultadosEncuesta.por_departamento" :key="dept.nombre" class="text-center p-4 rounded-lg bg-gray-50/60 border border-gray-200/50">
                <h4 class="font-semibold text-gray-900 mb-2">{{ dept.nombre }}</h4>
                <p class="text-2xl font-bold text-primary mb-1">{{ dept.satisfaccion_promedio }}</p>
                <p class="text-xs text-gray-500">{{ dept.respuestas }} respuestas</p>
                <div class="mt-2">
                  <div class="bg-gray-200 rounded-full h-1">
                    <div 
                      class="bg-primary rounded-full h-1 transition-all duration-300"
                      :style="{ width: `${(dept.satisfaccion_promedio / 5) * 100}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Acciones -->
          <div class="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
            <button 
              @click="exportarResultados"
              class="glass-button-secondary text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200/80 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50 flex items-center"
            >
              <Download class="h-4 w-4 mr-2" />
              Exportar PDF
            </button>
            <button 
              @click="compartirResultados"
              class="glass-button-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30 flex items-center"
            >
              <Share class="h-4 w-4 mr-2" />
              Compartir Resultados
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
import { ClipboardList, Plus, FileText, X, Download, Share, BarChart3 } from 'lucide-vue-next'

const toast = useToast()

// Estado reactivo
const busqueda = ref('')
const filtroEstado = ref('')
const mostrarResultados = ref(false)
const encuestaSeleccionada = ref(null)

// Estadísticas
const stats = ref({
  totalEncuestas: 8,
  encuestasActivas: 2,
  respuestasRecibidas: 156,
  promedioParticipacion: 78
})

// Datos dummy de encuestas
const encuestas = ref([
  {
    id: 1,
    titulo: 'Evaluación de Clima Laboral Q1',
    descripcion: 'Encuesta trimestral para evaluar el ambiente de trabajo',
    estado: 'activa',
    respuestas: 32,
    invitados: 45,
    fecha_fin: '2025-01-30T23:59:59',
    fecha_creacion: '2025-01-15T10:00:00'
  },
  {
    id: 2,
    titulo: 'Feedback Actividades de Bienestar',
    descripcion: 'Evaluación de la satisfacción con las actividades ofrecidas',
    estado: 'activa',
    respuestas: 18,
    invitados: 30,
    fecha_fin: null,
    fecha_creacion: '2025-01-18T14:30:00'
  },
  {
    id: 3,
    titulo: 'Satisfacción General Diciembre',
    descripcion: 'Encuesta mensual de satisfacción laboral',
    estado: 'finalizada',
    respuestas: 42,
    invitados: 45,
    fecha_fin: '2025-01-15T23:59:59',
    fecha_creacion: '2025-01-05T09:00:00'
  },
  {
    id: 4,
    titulo: 'Evaluación de Liderazgo',
    descripcion: 'Feedback sobre el liderazgo en la organización',
    estado: 'borrador',
    respuestas: 0,
    invitados: 0,
    fecha_fin: '2025-02-15T23:59:59',
    fecha_creacion: '2025-01-20T11:15:00'
  },
  {
    id: 5,
    titulo: 'Evaluación de Servicios de Bienestar',
    descripcion: 'Análisis completo de la efectividad de nuestros servicios de bienestar corporativo',
    estado: 'finalizada',
    respuestas: 38,
    invitados: 42,
    fecha_fin: '2024-12-31T23:59:59',
    fecha_creacion: '2024-12-15T09:00:00'
  }
])

// Datos dummy de resultados de encuesta
const resultadosEncuesta = ref({
  satisfaccion_promedio: 4.2,
  tiempo_promedio: '6 min',
  preguntas: [
    {
      texto: '¿Qué tan satisfecho estás con el ambiente laboral general?',
      tipo: 'escala',
      promedio: 4.2,
      distribución: [
        { valor: 5, respuestas: 18, porcentaje: 47 },
        { valor: 4, respuestas: 12, porcentaje: 32 },
        { valor: 3, respuestas: 6, porcentaje: 16 },
        { valor: 2, respuestas: 2, porcentaje: 5 },
        { valor: 1, respuestas: 0, porcentaje: 0 }
      ]
    },
    {
      texto: '¿Cuáles son los servicios de bienestar que más valoras?',
      tipo: 'seleccion',
      opciones: [
        { texto: 'Sesiones de Yoga', respuestas: 28, porcentaje: 74 },
        { texto: 'Coaching Personal', respuestas: 22, porcentaje: 58 },
        { texto: 'Consultas Nutricionales', respuestas: 18, porcentaje: 47 },
        { texto: 'Meditación Mindfulness', respuestas: 15, porcentaje: 39 },
        { texto: 'Psicoterapia', respuestas: 12, porcentaje: 32 }
      ]
    },
    {
      texto: '¿Cómo podríamos mejorar nuestros servicios de bienestar?',
      tipo: 'abierta',
      respuestas: [
        {
          texto: 'Me gustaría que hubiera más horarios disponibles para las sesiones de yoga, especialmente en la tarde.',
          departamento: 'Desarrollo',
          fecha: '2024-12-28T14:30:00'
        },
        {
          texto: 'Sería genial tener sesiones de meditación más cortas durante el horario de almuerzo.',
          departamento: 'Marketing',
          fecha: '2024-12-29T11:15:00'
        },
        {
          texto: 'El coaching personal ha sido excelente, pero me gustaría tener acceso a más recursos online.',
          departamento: 'Ventas',
          fecha: '2024-12-30T16:45:00'
        },
        {
          texto: 'Creo que deberíamos incluir actividades físicas más dinámicas como entrenamientos HIIT.',
          departamento: 'RRHH',
          fecha: '2024-12-30T09:20:00'
        },
        {
          texto: 'Las consultas nutricionales son muy útiles. Sería bueno tener talleres grupales de cocina saludable.',
          departamento: 'Desarrollo',
          fecha: '2024-12-31T13:10:00'
        }
      ]
    },
    {
      texto: '¿Recomendarías nuestros servicios de bienestar a un amigo?',
      tipo: 'escala',
      promedio: 4.6,
      distribución: [
        { valor: 5, respuestas: 25, porcentaje: 66 },
        { valor: 4, respuestas: 10, porcentaje: 26 },
        { valor: 3, respuestas: 3, porcentaje: 8 },
        { valor: 2, respuestas: 0, porcentaje: 0 },
        { valor: 1, respuestas: 0, porcentaje: 0 }
      ]
    }
  ],
  por_departamento: [
    { nombre: 'Desarrollo', satisfaccion_promedio: 4.5, respuestas: 12 },
    { nombre: 'Marketing', satisfaccion_promedio: 4.2, respuestas: 8 },
    { nombre: 'Ventas', satisfaccion_promedio: 3.9, respuestas: 10 },
    { nombre: 'RRHH', satisfaccion_promedio: 4.7, respuestas: 8 }
  ]
})

// Computed
const encuestasFiltradas = computed(() => {
  let resultado = encuestas.value
  
  if (busqueda.value.trim()) {
    const term = busqueda.value.trim().toLowerCase()
    resultado = resultado.filter(e =>
      e.titulo.toLowerCase().includes(term) ||
      e.descripcion.toLowerCase().includes(term)
    )
  }
  
  if (filtroEstado.value) {
    resultado = resultado.filter(e => e.estado === filtroEstado.value)
  }
  
  return resultado
})

// Métodos
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

const crearEncuesta = () => {
  toast.add({
    severity: 'info',
    summary: 'Crear Encuesta',
    detail: 'Navegando al formulario de creación de encuestas...',
    life: 3000
  })
}

const enviarEncuesta = (encuesta) => {
  encuesta.estado = 'activa'
  encuesta.invitados = 45
  
  // Actualizar estadísticas
  stats.value.encuestasActivas++
  
  toast.add({
    severity: 'success',
    summary: 'Encuesta enviada',
    detail: 'La encuesta ha sido enviada a todos los empleados',
    life: 3000
  })
}

const editarEncuesta = (encuesta) => {
  toast.add({
    severity: 'info',
    summary: 'Editar Encuesta',
    detail: `Editando "${encuesta.titulo}"...`,
    life: 3000
  })
}

const eliminarEncuesta = (encuesta) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta encuesta?')) {
    const index = encuestas.value.findIndex(e => e.id === encuesta.id)
    if (index !== -1) {
      encuestas.value.splice(index, 1)
      
      // Actualizar estadísticas
      stats.value.totalEncuestas--
      if (encuesta.estado === 'activa') {
        stats.value.encuestasActivas--
      }
      
      toast.add({
        severity: 'success',
        summary: 'Encuesta eliminada',
        detail: 'La encuesta ha sido eliminada correctamente',
        life: 3000
      })
    }
  }
}

const verResultados = (encuesta) => {
  encuestaSeleccionada.value = encuesta
  mostrarResultados.value = true
}

const cerrarResultados = () => {
  mostrarResultados.value = false
  encuestaSeleccionada.value = null
}

const getColorByIndex = (index) => {
  const colors = [
    'bg-blue-500',
    'bg-green-500', 
    'bg-yellow-500',
    'bg-purple-500',
    'bg-red-500'
  ]
  return colors[index % colors.length]
}

const exportarResultados = () => {
  toast.add({
    severity: 'success',
    summary: 'Exportando resultados',
    detail: 'Generando reporte PDF con los resultados de la encuesta...',
    life: 3000
  })
}

const compartirResultados = () => {
  toast.add({
    severity: 'success',
    summary: 'Compartiendo resultados',
    detail: 'Enlace de resultados copiado al portapapeles',
    life: 3000
  })
}
</script>