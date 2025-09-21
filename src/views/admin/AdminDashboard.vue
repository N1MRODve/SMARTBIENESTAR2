<template>
  <div v-if="loading" class="flex justify-center items-center h-screen">
    <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
  </div>
  <div v-else-if="error" class="text-center p-8">
    <p class="text-red-500">Error al cargar el dashboard: {{ error }}</p>
  </div>
  <div v-else-if="estadisticas" class="space-y-8">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard Administrador</h1>
      <p class="text-gray-600">Vista general de tu empresa y actividad de bienestar</p>
    </header>

    <!-- Acciones Rápidas -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Acciones Rápidas</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <!-- Invitar Empleados -->
        <router-link :to="{ name: 'admin-empleados' }" class="bg-slate-100 hover:bg-slate-200 p-4 rounded-xl shadow hover:shadow-lg transition-all duration-200 flex flex-col items-center justify-center gap-2 text-slate-700 font-medium">
          <UserPlus class="w-8 h-8 text-indigo-500" />
          <span>Invitar Empleados</span>
        </router-link>
        <!-- Crear Encuestas -->
        <router-link :to="{ name: 'admin-encuestas' }" class="bg-slate-100 hover:bg-slate-200 p-4 rounded-xl shadow hover:shadow-lg transition-all duration-200 flex flex-col items-center justify-center gap-2 text-slate-700 font-medium">
          <ClipboardPlus class="w-8 h-8 text-teal-500" />
          <span>Crear Encuestas</span>
        </router-link>
        <!-- Análisis de Uso -->
        <router-link :to="{ name: 'admin-estadisticas' }" class="bg-slate-100 hover:bg-slate-200 p-4 rounded-xl shadow hover:shadow-lg transition-all duration-200 flex flex-col items-center justify-center gap-2 text-slate-700 font-medium">
          <BarChart3 class="w-8 h-8 text-amber-500" />
          <span>Análisis de Uso</span>
        </router-link>
        <!-- Perfil de Empresa -->
        <router-link :to="{ name: 'admin-empresa-perfil' }" class="bg-slate-100 hover:bg-slate-200 p-4 rounded-xl shadow hover:shadow-lg transition-all duration-200 flex flex-col items-center justify-center gap-2 text-slate-700 font-medium">
          <Building class="w-8 h-8 text-rose-500" />
          <span>Perfil de Empresa</span>
        </router-link>
      </div>
    </div>
    
    <!-- Mensaje de Error -->
    <div v-if="error" class="text-center p-4 bg-red-100 text-red-700 rounded-lg">
      <p>Error al cargar el dashboard: {{ error }}</p>
    </div>

    <!-- Estadísticas Principales -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Empleados -->
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <div class="flex items-center justify-center mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center">
            <Users class="h-8 w-8 text-white" />
          </div>
        </div>
        <div v-if="loading" class="h-10 bg-gray-200 rounded animate-pulse w-24 mx-auto mb-2"></div>
        <h3 v-else class="text-4xl font-bold text-primary mb-2">{{ estadisticas.total_empleados }}</h3>
        <p class="text-gray-700 font-medium">Total Empleados</p>
        <p v-if="!loading && estadisticas.total_empleados === 0" class="text-xs text-gray-500 mt-1">Aún no has invitado a ningún empleado.</p>
      </div>

      <!-- Total de Reservas (Adaptado de Sesiones) -->
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <div class="flex items-center justify-center mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center">
            <Calendar class="h-8 w-8 text-white" />
          </div>
        </div>
        <div v-if="loading" class="h-10 bg-gray-200 rounded animate-pulse w-24 mx-auto mb-2"></div>
        <h3 v-else class="text-4xl font-bold text-primary mb-2">{{ estadisticas.total_reservas || 0 }}</h3>
        <p class="text-gray-700 font-medium">Total de Reservas</p>
        <p v-if="!loading && (estadisticas.total_reservas || 0) === 0" class="text-xs text-gray-500 mt-1">Tus empleados aún no han hecho reservas.</p>
      </div>

      <!-- Desafíos Completados (Adaptado de Encuestas) -->
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <div class="flex items-center justify-center mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center">
            <Trophy class="h-8 w-8 text-white" />
          </div>
        </div>
        <div v-if="loading" class="h-10 bg-gray-200 rounded animate-pulse w-24 mx-auto mb-2"></div>
        <h3 v-else class="text-4xl font-bold text-primary mb-2">{{ estadisticas.total_desafios_completados || 0 }}</h3>
        <p class="text-gray-700 font-medium">Desafíos Completados</p>
        <p v-if="!loading && (estadisticas.total_desafios_completados || 0) === 0" class="text-xs text-gray-500 mt-1">Anima a tus empleados a completar desafíos.</p>
      </div>

      <!-- Tasa de Participación -->
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <div class="flex items-center justify-center mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center">
            <TrendingUp class="h-8 w-8 text-white" />
          </div>
        </div>
        <div v-if="loading" class="h-10 bg-gray-200 rounded animate-pulse w-24 mx-auto mb-2"></div>
        <h3 v-else class="text-4xl font-bold text-primary mb-2">{{ estadisticas.tasa_participacion_general }}<span class="text-2xl">%</span></h3>
        <p class="text-gray-700 font-medium">Tasa de Participación</p>
      </div>
    </div>

    <!-- Alertas Críticas -->
    <div v-if="estadisticas.alertas_criticas?.length > 0" class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
      <h2 class="text-xl font-semibold mb-6 flex items-center">
        <Bell class="h-5 w-5 mr-2 text-orange-500" />
        Centro de Alertas
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="alerta in estadisticas.alertas_criticas.slice(0, 2)" 
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
        
        <div v-if="!estadisticas.participacion_por_departamento || estadisticas.participacion_por_departamento.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
          <BarChart3 class="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p class="font-medium mb-2">Aún no tenemos datos</p>
          <p class="text-sm text-gray-500">No hay datos de participación por departamento</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            v-for="dept in estadisticas.participacion_por_departamento" 
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
        
        <div v-if="!estadisticas.actividad_reciente || estadisticas.actividad_reciente.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
          <Clock class="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p class="font-medium mb-2">Aún no tenemos datos</p>
          <p class="text-sm text-gray-500">No hay actividad reciente registrada</p>
        </div>

        <div v-else class="space-y-4">
          <div 
            v-for="actividad in estadisticas.actividad_reciente" 
            :key="actividad.fecha_actividad"
            class="flex items-center space-x-4"
          >
            <div :class="[
              'w-10 h-10 rounded-xl flex items-center justify-center',
              getActivityIconClass(actividad.tipo_actividad)
            ]">
              <component :is="getActivityIcon(actividad.tipo_actividad)" class="h-5 w-5 text-white" />
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

        <div v-if="!estadisticas.proximas_sesiones || estadisticas.proximas_sesiones.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
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
            v-for="sesion in estadisticas.proximas_sesiones" 
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
        
        <div v-if="!estadisticas.servicios_populares || estadisticas.servicios_populares.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
          <Star class="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p class="font-medium mb-2">Aún no tenemos datos</p>
          <p class="text-sm text-gray-500">No hay datos de servicios populares</p>
        </div>

        <div v-else class="space-y-4">
          <div 
            v-for="(servicio, index) in estadisticas.servicios_populares" 
            :key="servicio.servicio_tipo"
            class="flex items-center justify-between p-3 rounded-lg backdrop-blur-sm border"
            :class="getServiceCardClass(index)"
          >
            <div class="flex items-center space-x-3">
              <component :is="getActivityIcon(servicio.servicio_tipo)" :class="[
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
        
        <div v-if="!estadisticas.top_performers || estadisticas.top_performers.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
          <Trophy class="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p class="font-medium mb-2">Aún no tenemos datos</p>
          <p class="text-sm text-gray-500">No hay datos de empleados destacados</p>
        </div>

        <div v-else class="space-y-4">
          <div 
            v-for="(empleado, index) in estadisticas.top_performers" 
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
        
        <div v-if="!estadisticas.encuestas_activas || estadisticas.encuestas_activas.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
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
            v-for="encuesta in estadisticas.encuestas_activas" 
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
import { ref, computed, onMounted, watchEffect } from 'vue'
import { supabase } from '@/services/supabase'
import { useAuthStore } from '@/stores/auth.store'
import { useToast } from 'primevue/usetoast'
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
  DollarSign,
  ClipboardPlus,
  Building
} from 'lucide-vue-next'

const authStore = useAuthStore()
const toast = useToast()

const isLoading = ref(true)
const dashboardData = ref({ /* ... tu estructura de datos ... */ })

const cargarDashboardData = async (empresaId) => {
  // ... (la lógica para cargar los datos del dashboard que ya tienes) ...
  // Esta función ahora recibe 'empresaId' como argumento.
  console.log(`Cargando datos del dashboard para la empresa: ${empresaId}`);
  // ... el resto de tu lógica con Promise.all, etc.
};

// --- ESTA ES LA CORRECCIÓN CRÍTICA ---
watchEffect(() => {
  // Si el usuario ya no está autenticado (porque acaba de cerrar sesión),
  // no hacemos nada. Simplemente esperamos a que el router nos redirija.
  if (!authStore.isAuthenticated) {
    isLoading.value = false; // Opcional: detener la carga visualmente.
    return;
  }

  // Si el store todavía está en su proceso de carga inicial, esperamos.
  if (authStore.loading) {
    return;
  }

  const empresaId = authStore.empresaId;

  if (empresaId) {
    // ¡Éxito! Cargar los datos.
    cargarDashboardData(empresaId);
  } else {
    // Ahora este error solo se mostrará si el usuario ESTÁ autenticado
    // pero por alguna razón no tiene un empresaId asociado.
    console.error("Error crítico: Usuario autenticado sin empresa_id.");
    toast.add({ severity: 'error', summary: 'Error de Cuenta', detail: 'Tu cuenta no está asociada a ninguna empresa.', life: 5000 });
    isLoading.value = false;
  }
});

const estadisticas = ref({ /* valores por defecto */ })
const loading = ref(true)
const error = ref(null)

// Obtener ID de empresa del usuario autenticado
const empresaId = computed(() => authStore.empresaId)

// Lifecycle Hook para cargar datos
onMounted(async () => {
  if (!empresaId.value) {
    console.error("Error: empresa_id no encontrado en el store.")
    error.value = "No se pudo identificar la empresa del administrador."
    loading.value = false
    return
  }

  console.log(`🔍 Cargando datos para empresa ID: ${empresaId.value}`)

  try {
    const { data, error: rpcError } = await supabase.rpc('obtener_estadisticas_empresa', {
      id_empresa: empresaId.value
    })

    if (rpcError) throw rpcError

    // Procesar los datos
    if (data && data.length > 0) {
      estadisticas.value = data[0]
      console.log('✅ Estadísticas cargadas:', estadisticas.value)
    } else {
      throw new Error("No se recibieron datos de estadísticas.")
    }

  } catch (err) {
    error.value = err.message
    console.error("Error al obtener estadísticas:", err)
  } finally {
    loading.value = false
  }
})

// Computed
const surveyResponseRate = computed(() => {
  if (!estadisticas.value?.encuestas_activas || estadisticas.value.encuestas_activas.length === 0) return 0
  const totalRespuestas = estadisticas.value.encuestas_activas.reduce((acc, enc) => acc + enc.respuestas_recibidas, 0)
  const totalInvitados = estadisticas.value.encuestas_activas.reduce((acc, enc) => acc + enc.total_invitados, 0)
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

const getActivityIcon = (tipo) => {
  const iconMap = {
    'reserva': Activity,
    'desafio': Trophy,
    'encuesta': ClipboardList,
    'logro': Star,
    'coaching': MessageCircle,
    'nutricion': Apple,
    'yoga': Activity,
    'meditacion': Heart,
    'sistema': Brain
  }
  return iconMap[tipo] || Brain
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
</script>