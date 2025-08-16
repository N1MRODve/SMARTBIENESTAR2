<template>
  <div class="max-w-7xl mx-auto space-y-8">
    <!-- Header -->
    <header class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Analítica Predictiva</h1>
          <p class="text-gray-600">Anticipa problemas y prevé riesgos de burnout antes de que ocurran</p>
        </div>
        <div class="flex gap-2">
          <button class="glass-button-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30 flex items-center">
            <Settings class="h-4 w-4 mr-2" />
            Configurar Alertas
          </button>
          <button class="glass-button-secondary text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200/80 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50 flex items-center">
            <Download class="h-4 w-4 mr-2" />
            Exportar Reporte
          </button>
        </div>
      </div>
    </header>

    <!-- Alertas Críticas -->
    <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
      <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <AlertTriangle class="h-5 w-5 mr-2 text-red-500" />
        Alertas Críticas
      </h2>
      
      <div v-if="alertasCriticas.length === 0" class="glass-card p-12 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
        <Shield class="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">Todo bajo control</h3>
        <p class="text-gray-500">No hay alertas críticas en este momento</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="alerta in alertasCriticas" 
          :key="alerta.id"
          :class="[
            'glass-card p-6 rounded-xl backdrop-blur-sm border',
            alerta.nivel === 'critico' ? 'border-red-200/50 bg-red-50/60' : 'border-yellow-200/50 bg-yellow-50/60'
          ]"
        >
          <div class="flex items-center space-x-3 mb-4">
            <AlertTriangle :class="[
              'h-6 w-6',
              alerta.nivel === 'critico' ? 'text-red-500' : 'text-yellow-500'
            ]" />
            <h3 class="font-semibold text-gray-900">{{ alerta.titulo }}</h3>
          </div>
          <p class="text-sm text-gray-700 mb-4">{{ alerta.descripcion }}</p>
          <button 
            :class="[
              'w-full px-4 py-2 rounded-lg transition-all duration-300 font-medium',
              alerta.nivel === 'critico' 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-yellow-600 text-white hover:bg-yellow-700'
            ]"
          >
            {{ alerta.nivel === 'critico' ? 'Revisar Inmediatamente' : 'Analizar' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Métricas de Bienestar -->
    <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
      <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <BarChart3 class="h-5 w-5 mr-2 text-primary" />
        Métricas de Bienestar
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="metrica in metricasBienestar" 
          :key="metrica.id"
          class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-900">{{ metrica.nombre }}</h3>
            <div class="flex items-center space-x-1">
              <component :is="getTrendIcon(metrica.tendencia)" :class="[
                'h-4 w-4',
                getTrendColor(metrica.tendencia)
              ]" />
              <span :class="['text-sm font-bold', getTrendColor(metrica.tendencia)]">
                {{ metrica.cambio > 0 ? '+' : '' }}{{ metrica.cambio }}%
              </span>
            </div>
          </div>
          
          <div class="mb-4">
            <div class="flex items-center justify-between text-sm mb-1">
              <span class="text-gray-600">Valor actual:</span>
              <span class="font-medium text-gray-900">{{ metrica.valor_actual }}</span>
            </div>
            <div class="bg-gray-200 rounded-full h-2">
              <div 
                :class="[
                  'rounded-full h-2 transition-all duration-300',
                  getMetricColor(metrica.valor_actual, metrica.valor_maximo)
                ]"
                :style="{ width: `${(metrica.valor_actual / metrica.valor_maximo) * 100}%` }"
              ></div>
            </div>
          </div>
          
          <p class="text-xs text-gray-500">{{ metrica.descripcion }}</p>
        </div>
      </div>
    </div>

    <!-- Predicciones y Recomendaciones -->
    <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
      <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Brain class="h-5 w-5 mr-2 text-purple-500" />
        Predicciones y Recomendaciones
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="prediccion in predicciones" 
          :key="prediccion.id"
          class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20"
        >
          <div class="flex items-center space-x-3 mb-4">
            <div :class="[
              'w-10 h-10 rounded-xl flex items-center justify-center',
              prediccion.tipo === 'riesgo' ? 'bg-red-500' : 'bg-blue-500'
            ]">
              <component :is="prediccion.icono" class="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">{{ prediccion.titulo }}</h3>
              <span :class="[
                'text-xs px-2 py-1 rounded-full',
                prediccion.tipo === 'riesgo' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
              ]">
                {{ prediccion.tipo === 'riesgo' ? 'Riesgo' : 'Oportunidad' }}
              </span>
            </div>
          </div>
          
          <p class="text-sm text-gray-700 mb-4">{{ prediccion.descripcion }}</p>
          
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500">Confianza: {{ prediccion.confianza }}%</span>
            <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm">
              Ver Detalles
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  Settings, 
  Download, 
  AlertTriangle, 
  Shield, 
  BarChart3, 
  Brain,
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  Heart
} from 'lucide-vue-next'

// Estado reactivo
const busqueda = ref('')
const filtroEstado = ref('')

// Datos dummy
const alertasCriticas = ref([
  {
    id: 1,
    titulo: 'Riesgo de Burnout Detectado',
    descripcion: 'El departamento de Desarrollo muestra signos de estrés elevado',
    nivel: 'critico'
  },
  {
    id: 2,
    titulo: 'Baja Participación en Actividades',
    descripcion: 'La participación en actividades de bienestar ha disminuido 15%',
    nivel: 'medio'
  }
])

const metricasBienestar = ref([
  {
    id: 1,
    nombre: 'Índice de Satisfacción',
    valor_actual: 4.2,
    valor_maximo: 5,
    cambio: 8,
    tendencia: 'positiva',
    descripcion: 'Satisfacción general de los empleados'
  },
  {
    id: 2,
    nombre: 'Nivel de Estrés',
    valor_actual: 2.8,
    valor_maximo: 5,
    cambio: -12,
    tendencia: 'positiva',
    descripcion: 'Nivel promedio de estrés reportado'
  },
  {
    id: 3,
    nombre: 'Participación Activa',
    valor_actual: 78,
    valor_maximo: 100,
    cambio: 5,
    tendencia: 'positiva',
    descripcion: 'Porcentaje de empleados participando'
  }
])

const predicciones = ref([
  {
    id: 1,
    titulo: 'Riesgo de Burnout en Desarrollo',
    descripcion: 'El equipo de desarrollo podría experimentar burnout en las próximas 2 semanas',
    tipo: 'riesgo',
    confianza: 85,
    icono: AlertTriangle
  },
  {
    id: 2,
    titulo: 'Oportunidad de Mejora en RRHH',
    descripcion: 'El departamento de RRHH muestra alta receptividad a nuevas actividades',
    tipo: 'oportunidad',
    confianza: 92,
    icono: TrendingUp
  }
])

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
  return iconMap[tipo] || Activity
}

const getTrendIcon = (tendencia) => {
  return tendencia === 'positiva' ? TrendingUp : TrendingDown
}

const getTrendColor = (tendencia) => {
  return tendencia === 'positiva' ? 'text-green-500' : 'text-red-500'
}

const getMetricColor = (actual, maximo) => {
  const porcentaje = (actual / maximo) * 100
  if (porcentaje >= 80) return 'bg-green-500'
  if (porcentaje >= 60) return 'bg-yellow-500'
  return 'bg-red-500'
}
</script>