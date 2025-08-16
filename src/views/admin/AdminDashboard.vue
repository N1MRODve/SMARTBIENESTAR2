<template>
  <div class="space-y-8">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard Administrador</h1>
      <p class="text-gray-600">Vista general de tu empresa y actividad de bienestar</p>
    </header>
    
    <!-- Estadísticas Principales -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Empleados -->
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div class="flex items-center justify-center mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center">
            <Users class="h-8 w-8 text-white" />
          </div>
        </div>
        <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.totalEmpleados }}</h3>
        <p class="text-gray-700 font-medium">Total Empleados</p>
        <div class="flex items-center justify-center mt-2">
          <TrendingUp class="h-4 w-4 text-green-500 mr-1" />
          <span class="text-xs text-green-600">{{ stats.participacionPorcentaje }}% participación</span>
        </div>
      </div>

      <!-- Sesiones Esta Semana -->
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div class="flex items-center justify-center mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center">
            <Calendar class="h-8 w-8 text-white" />
          </div>
        </div>
        <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.sesionesEstaSemana }}</h3>
        <p class="text-gray-700 font-medium">Sesiones Esta Semana</p>
        <div class="flex items-center justify-center mt-2">
          <Calendar class="h-4 w-4 text-blue-500 mr-1" />
          <span class="text-xs text-blue-600">+2 vs semana anterior</span>
        </div>
      </div>

      <!-- Encuestas Activas -->
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div class="flex items-center justify-center mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center">
            <ClipboardList class="h-8 w-8 text-white" />
          </div>
        </div>
        <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.encuestasActivas }}</h3>
        <p class="text-gray-700 font-medium">Encuestas Activas</p>
        <div class="flex items-center justify-center mt-2">
          <ClipboardList class="h-4 w-4 text-purple-500 mr-1" />
          <span class="text-xs text-purple-600">{{ surveyResponseRate }}% respuestas</span>
        </div>
      </div>

      <!-- Satisfacción General -->
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div class="flex items-center justify-center mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center">
            <Star class="h-8 w-8 text-white" />
          </div>
        </div>
        <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.satisfaccionGeneral }}</h3>
        <p class="text-gray-700 font-medium">Satisfacción General</p>
        <div class="flex items-center justify-center mt-2">
          <TrendingUp class="h-4 w-4 text-yellow-500 mr-1" />
          <span class="text-xs text-yellow-600">+0.3 vs mes anterior</span>
        </div>
      </div>
    </div>

    <!-- Alertas Críticas -->
    <div v-if="alertasCriticas.length > 0" class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
      <h2 class="text-xl font-semibold mb-6 flex items-center">
        <Bell class="h-5 w-5 mr-2 text-orange-500" />
        Centro de Alertas
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="alerta in alertasCriticas.slice(0, 2)" 
          :key="alerta.id"
          :class="[
            'p-4 rounded-lg backdrop-blur-sm border',
            alerta.nivel_criticidad === 'critico' ? 'bg-red-50/60 border-red-200/50' : 'bg-yellow-50/60 border-yellow-200/50'
          ]"
        >
          <div class="flex items-center space-x-3 mb-2">
            <AlertTriangle :class="[
              'h-5 w-5',
              alerta.nivel_criticidad === 'critico' ? 'text-red-500' : 'text-yellow-500'
            ]" />
            <h3 class="font-semibold text-gray-900">{{ alerta.titulo }}</h3>
          </div>
          <p class="text-sm text-gray-700 mb-2">{{ alerta.descripcion }}</p>
          <button 
            :class="[
              'w-full px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm',
              alerta.nivel_criticidad === 'critico' 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-yellow-600 text-white hover:bg-yellow-700'
            ]"
            @click="revisarAlerta(alerta.id)"
          >
            {{ alerta.nivel_criticidad === 'critico' ? 'Revisar Inmediatamente' : 'Analizar Situación' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Grid Principal -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Participación por Departamento -->
      <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Participación por Departamento</h2>
        
        <div v-if="departamentos.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
          <BarChart3 class="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p class="font-medium mb-2">Aún no tenemos datos</p>
          <p class="text-sm text-gray-500">No hay datos de participación por departamento</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            v-for="dept in departamentos" 
            :key="dept.departamento"
            class="text-center p-4 rounded-xl backdrop-blur-sm border"
            :class="getDepartmentCardClass(dept.participacion_porcentaje)"
          >
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                 :class="getDepartmentIconClass(dept.participacion_porcentaje)">
              <component :is="getDepartmentIcon(dept.departamento)" class="h-6 w-6 text-white" />
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">{{ dept.departamento }}</h4>
            <p class="text-2xl font-bold mb-1" :class="getDepartmentTextClass(dept.participacion_porcentaje)">
              {{ Math.round(dept.participacion_porcentaje) }}%
            </p>
            <p class="text-xs text-gray-500">{{ dept.total_empleados }} empleados</p>
            <div class="bg-gray-200 rounded-full h-1 mt-2">
              <div 
                class="rounded-full h-1" 
                :class="getDepartmentBarClass(dept.participacion_porcentaje)"
                :style="{ width: `${dept.participacion_porcentaje}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actividad Reciente -->
      <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
        <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Clock class="h-5 w-5 mr-2 text-primary" />
          Actividad Reciente
        </h2>
        
        <div v-if="actividadReciente.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
          <Clock class="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p class="font-medium mb-2">Aún no tenemos datos</p>
          <p class="text-sm text-gray-500">No hay actividad reciente registrada</p>
        </div>

        <div v-else class="space-y-4">
          <div 
            v-for="actividad in actividadReciente" 
            :key="actividad.fecha_actividad"
            class="flex items-center space-x-4"
          >
            <div :class="[
              'w-10 h-10 rounded-xl flex items-center justify-center',
              getActivityIconClass(actividad.tipo_actividad)
            ]">
              <component :is="actividad.icono" class="h-5 w-5 text-white" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">{{ actividad.descripcion }}</p>
              <p class="text-xs text-gray-500">{{ formatTimeAgo(actividad.fecha_actividad) }}{{ actividad.puntos_otorgados ? ` • +${actividad.puntos_otorgados} puntos` : '' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Próximas Sesiones y Servicios Populares -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Próximas Sesiones -->
      <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900 flex items-center">
            <Calendar class="h-5 w-5 mr-2 text-primary" />
            Próximas Sesiones
          </h2>
          <router-link 
            to="/admin/horarios" 
            class="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
          >
            Ver calendario →
          </router-link>
        </div>

        <div v-if="proximasSesiones.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
          <Calendar class="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p class="font-medium mb-2">Aún no tenemos datos</p>
          <p class="text-sm text-gray-500 mb-4">No hay sesiones programadas próximamente</p>
          <router-link to="/admin/horarios">
            <button class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium">
              Programar Sesión
            </button>
          </router-link>
        </div>

        <div v-else class="space-y-4">
          <div 
            v-for="sesion in proximasSesiones" 
            :key="sesion.sesion_id"
            class="glass-card p-4 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <div class="flex items-center justify-between mb-2">
              <p class="font-semibold text-gray-900">{{ sesion.titulo }}</p>
              <span :class="[
                'text-xs px-2 py-1 rounded-full',
                getOccupancyClass(sesion.reservas_confirmadas, sesion.capacidad_maxima)
              ]">
                {{ sesion.reservas_confirmadas }}/{{ sesion.capacidad_maxima }} plazas
              </span>
            </div>
            <p class="text-sm text-gray-600 mt-1">{{ formatDateTime(sesion.fecha_inicio) }}</p>
            <p class="text-xs text-gray-500">{{ sesion.colaborador_nombre }} • {{ sesion.modalidad === 'online' ? 'Online' : sesion.ubicacion }}</p>
          </div>
        </div>
      </div>

      <!-- Servicios Más Populares -->
      <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
        <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Star class="h-5 w-5 mr-2 text-yellow-500" />
          Servicios Más Populares
        </h2>
        
        <div v-if="serviciosPopulares.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
          <Star class="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p class="font-medium mb-2">Aún no tenemos datos</p>
          <p class="text-sm text-gray-500">No hay datos de servicios populares</p>
        </div>

        <div v-else class="space-y-4">
          <div 
            v-for="(servicio, index) in serviciosPopulares" 
            :key="servicio.servicio_tipo"
            class="flex items-center justify-between p-3 rounded-lg backdrop-blur-sm border"
            :class="getServiceCardClass(index)"
          >
            <div class="flex items-center space-x-3">
              <component :is="servicio.icono" :class="[
                'h-5 w-5',
                getServiceIconColor(index)
              ]" />
              <div>
                <p class="font-semibold text-gray-900">{{ servicio.servicio_nombre }}</p>
                <p class="text-xs text-gray-600">{{ servicio.total_participaciones }} participaciones</p>
              </div>
            </div>
            <div class="text-right">
              <p :class="['text-sm font-bold', getServiceTextColor(index)]">
                {{ Math.round(servicio.satisfaccion_promedio * 20) }}%
              </p>
              <p class="text-xs text-gray-500">satisfacción</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empleados Destacados y Estado de Encuestas -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Top Performers -->
      <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
        <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Trophy class="h-5 w-5 mr-2 text-yellow-500" />
          Empleados Destacados
        </h2>
        
        <div v-if="topPerformers.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
          <Trophy class="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p class="font-medium mb-2">Aún no tenemos datos</p>
          <p class="text-sm text-gray-500">No hay datos de empleados destacados</p>
        </div>

        <div v-else class="space-y-4">
          <div 
            v-for="(empleado, index) in topPerformers" 
            :key="empleado.usuario_id"
            class="flex items-center space-x-4 p-3 rounded-lg backdrop-blur-sm border"
            :class="getPerformerCardClass(index)"
          >
            <div :class="[
              'w-10 h-10 rounded-xl flex items-center justify-center',
              getPerformerIconClass(index)
            ]">
              <span class="text-white font-bold text-sm">{{ index + 1 }}</span>
            </div>
            <div class="flex-1">
              <p class="font-semibold text-gray-900">{{ empleado.nombre_completo }}</p>
              <p class="text-sm text-gray-600">{{ empleado.puntos_totales }} puntos • Nivel {{ empleado.nivel_actual }}</p>
            </div>
            <div class="text-right">
              <p :class="['text-xs font-medium', getPerformerTextColor(index)]">
                {{ empleado.racha_dias > 0 ? `Racha ${empleado.racha_dias} días` : 'Líder equipo' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Estado de Encuestas -->
      <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Estado de Encuestas</h2>
          <router-link 
            to="/admin/encuestas" 
            class="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
          >
            Gestionar →
          </router-link>
        </div>
        
        <div v-if="encuestasActivas.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
          <ClipboardList class="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p class="font-medium mb-2">Aún no tenemos datos</p>
          <p class="text-sm text-gray-500 mb-4">No hay encuestas activas</p>
          <router-link to="/admin/encuestas/crear">
            <button class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium">
              Crear Encuesta
            </button>
          </router-link>
        </div>

        <div v-else class="space-y-3">
          <div 
            v-for="encuesta in encuestasActivas" 
            :key="encuesta.encuesta_id"
            class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20"
          >
            <div class="flex items-center justify-between mb-2">
              <h4 class="font-semibold text-gray-900">{{ encuesta.titulo }}</h4>
              <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Activa</span>
            </div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-gray-600">Respuestas</span>
              <span class="text-sm font-bold text-primary">{{ encuesta.respuestas_recibidas }}/{{ encuesta.total_invitados }}</span>
            </div>
            <div class="bg-gray-200 rounded-full h-2">
              <div 
                class="bg-primary rounded-full h-2 transition-all duration-300"
                :style="{ width: `${encuesta.porcentaje_respuesta}%` }"
              ></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              {{ encuesta.dias_restantes !== null ? `Termina en ${encuesta.dias_restantes} días` : 'Sin fecha límite' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Panel de Acciones Rápidas -->
    <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
      <h2 class="text-xl font-semibold mb-6 flex items-center">
        <Zap class="h-5 w-5 mr-2 text-primary" />
        Acciones Rápidas
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <router-link to="/admin/encuestas/crear">
          <button class="w-full glass-button-primary text-white flex flex-col items-center p-6 h-auto rounded-xl hover:bg-primary/90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
            <ClipboardList class="h-8 w-8 mb-3" />
            <span class="text-sm font-medium">Crear Encuesta</span>
            <span class="text-xs text-blue-200 mt-1">Feedback rápido</span>
          </button>
        </router-link>
        
        <router-link to="/admin/empleados">
          <button class="w-full glass-button-outline text-gray-700 bg-white/60 hover:bg-gray-50/80 flex flex-col items-center p-6 h-auto rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50">
            <UserPlus class="h-8 w-8 mb-3" />
            <span class="text-sm font-medium">Invitar Empleado</span>
            <span class="text-xs text-gray-500 mt-1">Expandir equipo</span>
          </button>
        </router-link>
        
        <button 
          @click="crearDesafio"
          class="w-full glass-button-outline text-gray-700 bg-white/60 hover:bg-gray-50/80 flex flex-col items-center p-6 h-auto rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50"
        >
          <Trophy class="h-8 w-8 mb-3" />
          <span class="text-sm font-medium">Crear Desafío</span>
          <span class="text-xs text-gray-500 mt-1">Motivar equipos</span>
        </button>
        
        <router-link to="/admin/analitica">
          <button class="w-full glass-button-outline text-gray-700 bg-white/60 hover:bg-gray-50/80 flex flex-col items-center p-6 h-auto rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50">
            <Brain class="h-8 w-8 mb-3" />
            <span class="text-sm font-medium">Ver Alertas</span>
            <span class="text-xs text-gray-500 mt-1">Prevenir problemas</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Users, 
  Calendar, 
  ClipboardList, 
  Star, 
  TrendingUp,
  Bell, 
  Clock, 
  Trophy, 
  Zap,
  UserPlus,
  Brain,
  AlertTriangle,
  BarChart3,
  Activity,
  MessageCircle,
  Apple,
  Heart,
  Code,
  DollarSign
} from 'lucide-vue-next'
import { useAdminStore } from '@/stores/admin'
import { useAuthStore } from '@/stores/auth.store'

const router = useRouter()
const adminStore = useAdminStore()
const authStore = useAuthStore()

// Estado reactivo con datos dummy
const stats = ref({
  totalEmpleados: 45,
  participacionPorcentaje: 78,
  sesionesEstaSemana: 12,
  encuestasActivas: 2,
  satisfaccionGeneral: 4.2
})

const proximasSesiones = ref([
  {
    sesion_id: 1,
    titulo: 'Yoga Matutino',
    fecha_inicio: '2025-01-22T08:00:00',
    colaborador_nombre: 'Elena Vásquez',
    modalidad: 'presencial',
    ubicacion: 'Sala Zen',
    reservas_confirmadas: 12,
    capacidad_maxima: 15
  },
  {
    sesion_id: 2,
    titulo: 'Meditación Mindfulness',
    fecha_inicio: '2025-01-22T12:30:00',
    colaborador_nombre: 'Miguel Torres',
    modalidad: 'online',
    ubicacion: 'Zoom',
    reservas_confirmadas: 8,
    capacidad_maxima: 20
  },
  {
    sesion_id: 3,
    titulo: 'Coaching de Productividad',
    fecha_inicio: '2025-01-23T16:00:00',
    colaborador_nombre: 'Carlos Ruiz',
    modalidad: 'online',
    ubicacion: 'Google Meet',
    reservas_confirmadas: 6,
    capacidad_maxima: 10
  }
])

const serviciosPopulares = ref([
  {
    servicio_tipo: 'yoga',
    servicio_nombre: 'Yoga',
    total_participaciones: 156,
    satisfaccion_promedio: 4.8,
    icono: Activity
  },
  {
    servicio_tipo: 'coaching',
    servicio_nombre: 'Coaching',
    total_participaciones: 89,
    satisfaccion_promedio: 4.6,
    icono: MessageCircle
  },
  {
    servicio_tipo: 'nutricion',
    servicio_nombre: 'Nutrición',
    total_participaciones: 67,
    satisfaccion_promedio: 4.4,
    icono: Apple
  },
  {
    servicio_tipo: 'meditacion',
    servicio_nombre: 'Meditación',
    total_participaciones: 45,
    satisfaccion_promedio: 4.7,
    icono: Heart
  }
])

const topPerformers = ref([
  {
    usuario_id: 1,
    nombre_completo: 'Ana García',
    puntos_totales: 1250,
    nivel_actual: 3,
    racha_dias: 14
  },
  {
    usuario_id: 2,
    nombre_completo: 'Luis Martínez',
    puntos_totales: 980,
    nivel_actual: 2,
    racha_dias: 7
  },
  {
    usuario_id: 3,
    nombre_completo: 'Sofia Rodríguez',
    puntos_totales: 875,
    nivel_actual: 2,
    racha_dias: 12
  }
])

const encuestasActivas = ref([
  {
    encuesta_id: 1,
    titulo: 'Clima Laboral Q1',
    respuestas_recibidas: 32,
    total_invitados: 45,
    porcentaje_respuesta: 71,
    dias_restantes: 5
  },
  {
    encuesta_id: 2,
    titulo: 'Feedback Actividades',
    respuestas_recibidas: 18,
    total_invitados: 30,
    porcentaje_respuesta: 60,
    dias_restantes: null
  }
])

const departamentos = ref([
  {
    departamento: 'Desarrollo',
    total_empleados: 15,
    participacion_porcentaje: 85
  },
  {
    departamento: 'Marketing',
    total_empleados: 12,
    participacion_porcentaje: 92
  },
  {
    departamento: 'Ventas',
    total_empleados: 10,
    participacion_porcentaje: 70
  },
  {
    departamento: 'RRHH',
    total_empleados: 8,
    participacion_porcentaje: 95
  }
])

const actividadReciente = ref([
  {
    fecha_actividad: '2025-01-20T14:30:00',
    descripcion: 'Ana García completó sesión de Yoga Matutino',
    tipo_actividad: 'reserva',
    puntos_otorgados: 50,
    icono: Activity
  },
  {
    fecha_actividad: '2025-01-20T11:15:00',
    descripcion: 'Luis Martínez se inscribió en desafío "10,000 pasos"',
    tipo_actividad: 'desafio',
    puntos_otorgados: null,
    icono: Trophy
  },
  {
    fecha_actividad: '2025-01-20T09:45:00',
    descripcion: 'Sofia Rodríguez completó encuesta de satisfacción',
    tipo_actividad: 'encuesta',
    puntos_otorgados: 25,
    icono: ClipboardList
  },
  {
    fecha_actividad: '2025-01-19T16:20:00',
    descripcion: 'Carlos Mendoza reservó sesión de Coaching',
    tipo_actividad: 'reserva',
    puntos_otorgados: null,
    icono: MessageCircle
  },
  {
    fecha_actividad: '2025-01-19T13:10:00',
    descripcion: 'María Fernández alcanzó 1000 puntos de bienestar',
    tipo_actividad: 'logro',
    puntos_otorgados: 100,
    icono: Star
  }
])

const alertasCriticas = ref([
  {
    id: 1,
    titulo: 'Baja Participación en Desarrollo',
    descripcion: 'El departamento de Desarrollo tiene solo 70% de participación',
    nivel_criticidad: 'medio'
  },
  {
    id: 2,
    titulo: 'Encuesta con Pocas Respuestas',
    descripcion: 'La encuesta de clima laboral necesita más participación',
    nivel_criticidad: 'bajo'
  }
])

// Computed
const surveyResponseRate = computed(() => {
  if (encuestasActivas.value.length === 0) return 0
  const totalRespuestas = encuestasActivas.value.reduce((acc, enc) => acc + enc.respuestas_recibidas, 0)
  const totalInvitados = encuestasActivas.value.reduce((acc, enc) => acc + enc.total_invitados, 0)
  return totalInvitados > 0 ? Math.round((totalRespuestas / totalInvitados) * 100) : 0
})

// Métodos de utilidad
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

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return 'Hace unos minutos'
  if (diffInHours < 24) return `Hace ${diffInHours} horas`
  if (diffInHours < 48) return 'Ayer'
  return `Hace ${Math.floor(diffInHours / 24)} días`
}

// Métodos de estilo
const getDepartmentIcon = (departamento) => {
  const iconMap = {
    'Desarrollo': Code,
    'Marketing': TrendingUp,
    'Ventas': DollarSign,
    'RRHH': Users,
    'Sin departamento': Users
  }
  return iconMap[departamento] || Users
}

const getDepartmentCardClass = (participacion) => {
  if (participacion >= 90) return 'bg-blue-50/60 border-blue-200/50'
  if (participacion >= 80) return 'bg-green-50/60 border-green-200/50'
  if (participacion >= 70) return 'bg-yellow-50/60 border-yellow-200/50'
  return 'bg-red-50/60 border-red-200/50'
}

const getDepartmentIconClass = (participacion) => {
  if (participacion >= 90) return 'bg-blue-500'
  if (participacion >= 80) return 'bg-green-500'
  if (participacion >= 70) return 'bg-yellow-500'
  return 'bg-red-500'
}

const getDepartmentTextClass = (participacion) => {
  if (participacion >= 90) return 'text-blue-600'
  if (participacion >= 80) return 'text-green-600'
  if (participacion >= 70) return 'text-yellow-600'
  return 'text-red-600'
}

const getDepartmentBarClass = (participacion) => {
  if (participacion >= 90) return 'bg-blue-500'
  if (participacion >= 80) return 'bg-green-500'
  if (participacion >= 70) return 'bg-yellow-500'
  return 'bg-red-500'
}

const getActivityIconClass = (tipo) => {
  const classMap = {
    'reserva': 'bg-green-500',
    'desafio': 'bg-yellow-500',
    'encuesta': 'bg-blue-500',
    'logro': 'bg-purple-500',
    'sistema': 'bg-gray-500'
  }
  return classMap[tipo] || 'bg-gray-500'
}

const getOccupancyClass = (reservas, capacidad) => {
  const porcentaje = (reservas / capacidad) * 100
  if (porcentaje >= 90) return 'bg-red-100 text-red-800'
  if (porcentaje >= 70) return 'bg-yellow-100 text-yellow-800'
  return 'bg-green-100 text-green-800'
}

const getServiceCardClass = (index) => {
  const classes = [
    'bg-purple-50/60 border-purple-200/50',
    'bg-green-50/60 border-green-200/50',
    'bg-blue-50/60 border-blue-200/50',
    'bg-yellow-50/60 border-yellow-200/50'
  ]
  return classes[index] || 'bg-gray-50/60 border-gray-200/50'
}

const getServiceIconColor = (index) => {
  const colors = ['text-purple-600', 'text-green-600', 'text-blue-600', 'text-yellow-600']
  return colors[index] || 'text-gray-600'
}

const getServiceTextColor = (index) => {
  const colors = ['text-purple-600', 'text-green-600', 'text-blue-600', 'text-yellow-600']
  return colors[index] || 'text-gray-600'
}

const getPerformerCardClass = (index) => {
  const classes = [
    'bg-yellow-50/60 border-yellow-200/50',
    'bg-gray-50/60 border-gray-200/50',
    'bg-orange-50/60 border-orange-200/50'
  ]
  return classes[index] || 'bg-gray-50/60 border-gray-200/50'
}

const getPerformerIconClass = (index) => {
  const classes = [
    'bg-gradient-to-br from-yellow-400 to-yellow-600',
    'bg-gradient-to-br from-gray-400 to-gray-600',
    'bg-gradient-to-br from-orange-400 to-orange-600'
  ]
  return classes[index] || 'bg-gradient-to-br from-gray-400 to-gray-600'
}

const getPerformerTextColor = (index) => {
  const colors = ['text-yellow-600', 'text-gray-600', 'text-orange-600']
  return colors[index] || 'text-gray-600'
}

// Acciones
const revisarAlerta = (alertaId) => {
  router.push(`/admin/analitica?alerta=${alertaId}`)
}

const crearDesafio = () => {
  router.push('/admin/desafios/crear')
}

// Lifecycle
onMounted(() => {
  console.log('Dashboard de administrador cargado')
})
</script>