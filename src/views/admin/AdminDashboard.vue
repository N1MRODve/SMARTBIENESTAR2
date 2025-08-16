<template>
  <AdminLayout>
    <section class="p-8 max-w-7xl mx-auto">
      <!-- Encabezado -->
      <header class="mb-10">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard Administrador</h1>
        <p class="text-gray-600 text-base mb-6">
          Vista general de tu empresa y actividad de bienestar
        </p>
      </header>

      <!-- Stats Grid -->
      <div class="mb-8">
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div v-for="i in 4" :key="i" class="glass-card rounded-xl shadow-lg p-6 animate-pulse h-32 flex flex-col justify-center">
            <div class="h-6 bg-gray-300 rounded w-2/3 mb-4"></div>
            <div class="h-10 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <h3 class="text-3xl font-bold text-primary mb-2">{{ stats.total_empleados || 0 }}</h3>
            <p class="text-gray-700 font-medium">Empleados Activos</p>
            <p class="text-xs text-gray-500 mt-1">{{ stats.participacion_porcentaje || 0 }}% participación</p>
          </div>
          <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <h3 class="text-3xl font-bold text-primary mb-2">{{ stats.sesiones_esta_semana || 0 }}</h3>
            <p class="text-gray-700 font-medium">Sesiones Esta Semana</p>
            <p class="text-xs text-gray-500 mt-1">+2 vs semana anterior</p>
          </div>
          <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <h3 class="text-3xl font-bold text-primary mb-2">{{ stats.encuestas_activas || 0 }}</h3>
            <p class="text-gray-700 font-medium">Encuestas Activas</p>
            <p class="text-xs text-gray-500 mt-1">{{ surveyResponseRate }}% respuestas</p>
          </div>
          <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <h3 class="text-3xl font-bold text-primary mb-2">{{ stats.satisfaccion_general || 0 }}</h3>
            <p class="text-gray-700 font-medium">Satisfacción General</p>
            <p class="text-xs text-gray-500 mt-1">+0.3 vs mes anterior</p>
          </div>
        </div>
      </div>

      <!-- Alertas y Notificaciones Importantes -->
      <div v-if="alertasCriticas.length > 0" class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30 mb-8">
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
            <Button 
              :variant="alerta.nivel_criticidad === 'critico' ? 'primary' : 'outline'" 
              :class="alerta.nivel_criticidad === 'critico' ? 'w-full text-sm bg-red-600 hover:bg-red-700' : 'w-full text-sm'"
              @click="revisarAlerta(alerta.id)"
            >
              {{ alerta.nivel_criticidad === 'critico' ? 'Revisar Inmediatamente' : 'Analizar Situación' }}
            </Button>
          </div>
        </div>
      </div>

      <!-- Participación por Departamento -->
      <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30 mb-8">
        <h2 class="text-xl font-semibold mb-6">Participación por Departamento</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Actividad Reciente -->
        <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
          <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Clock class="h-5 w-5 mr-2 text-primary" />
            Actividad Reciente
          </h2>
          <div v-if="loadingActivity" class="space-y-4">
            <div v-for="i in 5" :key="i" class="flex items-center space-x-4 animate-pulse">
              <div class="w-10 h-10 bg-gray-300 rounded-xl"></div>
              <div class="flex-1">
                <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div class="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
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

        <!-- Próximas Sesiones -->
        <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
          <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Calendar class="h-5 w-5 mr-2 text-primary" />
            Próximas Sesiones
          </h2>
          <div v-if="loadingSessions" class="space-y-4">
            <div v-for="i in 4" :key="i" class="glass-card p-4 rounded-xl animate-pulse">
              <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div class="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
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
          <div class="mt-4 pt-4 border-t border-white/20">
            <Button variant="outline" class="w-full text-sm" @click="$router.push('/admin/horarios')">
              Ver Calendario Completo
            </Button>
          </div>
        </div>
      </div>

      <!-- Servicios Más Populares y Tendencias -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Servicios Populares -->
        <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
          <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Star class="h-5 w-5 mr-2 text-yellow-500" />
            Servicios Más Populares
          </h2>
          <div v-if="loadingServices" class="space-y-4">
            <div v-for="i in 4" :key="i" class="flex items-center justify-between p-3 animate-pulse">
              <div class="flex items-center space-x-3">
                <div class="w-5 h-5 bg-gray-300 rounded"></div>
                <div class="h-4 bg-gray-300 rounded w-20"></div>
              </div>
              <div class="h-4 bg-gray-300 rounded w-12"></div>
            </div>
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

        <!-- Tendencias de Bienestar -->
        <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
          <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <TrendingUp class="h-5 w-5 mr-2 text-primary" />
            Tendencias de Bienestar
          </h2>
          <div v-if="loadingTrends" class="space-y-4">
            <div v-for="i in 4" :key="i" class="p-4 animate-pulse">
              <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div class="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
          <div v-else class="space-y-4">
            <div 
              v-for="tendencia in tendenciasBienestar" 
              :key="tendencia.metrica"
              :class="[
                'p-4 rounded-lg backdrop-blur-sm border',
                getTrendCardClass(tendencia.tendencia)
              ]"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-900">{{ tendencia.metrica }}</span>
                <div class="flex items-center space-x-1">
                  <component :is="getTrendIcon(tendencia.tendencia)" :class="[
                    'h-4 w-4',
                    getTrendIconColor(tendencia.tendencia)
                  ]" />
                  <span :class="['text-sm font-bold', getTrendTextColor(tendencia.tendencia)]">
                    {{ tendencia.cambio_porcentaje > 0 ? '+' : '' }}{{ tendencia.cambio_porcentaje }}%
                  </span>
                </div>
              </div>
              <p class="text-xs text-gray-600">{{ tendencia.periodo }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Empleados Destacados y Desafíos Activos -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Top Performers -->
        <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
          <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Trophy class="h-5 w-5 mr-2 text-yellow-500" />
            Empleados Destacados
          </h2>
          <div v-if="loadingPerformers" class="space-y-4">
            <div v-for="i in 3" :key="i" class="flex items-center space-x-4 p-3 animate-pulse">
              <div class="w-10 h-10 bg-gray-300 rounded-xl"></div>
              <div class="flex-1">
                <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div class="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
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

        <!-- Desafíos de Equipo Activos -->
        <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
          <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Users class="h-5 w-5 mr-2 text-primary" />
            Desafíos de Equipo
          </h2>
          <div v-if="loadingChallenges" class="space-y-4">
            <div v-for="i in 2" :key="i" class="glass-card p-4 rounded-xl animate-pulse">
              <div class="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
              <div class="h-2 bg-gray-300 rounded mb-2"></div>
              <div class="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
          <div v-else class="space-y-4">
            <div 
              v-for="desafio in desafiosActivos" 
              :key="desafio.desafio_id"
              class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20"
            >
              <div class="flex items-center justify-between mb-3">
                <div>
                  <h4 class="font-semibold text-gray-900">{{ desafio.titulo }}</h4>
                  <p class="text-sm text-gray-600">{{ desafio.descripcion }}</p>
                </div>
                <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  {{ Math.round(desafio.progreso_porcentaje) }}%
                </span>
              </div>
              <div class="bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  class="bg-gradient-to-r from-primary to-secondary rounded-full h-2 transition-all duration-300"
                  :style="{ width: `${desafio.progreso_porcentaje}%` }"
                ></div>
              </div>
              <p class="text-xs text-gray-500">
                {{ desafio.participantes_count }} participantes • {{ getDaysRemaining(desafio.fecha_fin) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Estado de Encuestas y Feedback -->
      <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30 mb-8">
        <h2 class="text-xl font-semibold mb-6">Estado de Encuestas y Feedback</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Encuestas Activas -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Encuestas Activas</h3>
            <div v-if="loadingSurveys" class="space-y-3">
              <div v-for="i in 2" :key="i" class="glass-card p-4 rounded-xl animate-pulse">
                <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div class="h-2 bg-gray-300 rounded mb-2"></div>
                <div class="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
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

          <!-- Últimos Resultados -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Últimos Resultados</h3>
            <div class="space-y-3">
              <div class="p-4 bg-green-50/60 rounded-lg backdrop-blur-sm border border-green-200/50">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-900">Satisfacción General</span>
                  <span class="text-lg font-bold text-green-600">{{ stats.satisfaccion_general || 0 }}/5</span>
                </div>
                <p class="text-xs text-gray-600">Última encuesta</p>
                <div class="flex items-center mt-1">
                  <TrendingUp class="h-3 w-3 text-green-500 mr-1" />
                  <span class="text-xs text-green-600">+0.3 vs anterior</span>
                </div>
              </div>
              
              <div class="p-4 bg-blue-50/60 rounded-lg backdrop-blur-sm border border-blue-200/50">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-900">NPS Score</span>
                  <span class="text-lg font-bold text-blue-600">{{ stats.nps_score || 0 }}</span>
                </div>
                <p class="text-xs text-gray-600">Net Promoter Score</p>
                <div class="flex items-center mt-1">
                  <TrendingUp class="h-3 w-3 text-blue-500 mr-1" />
                  <span class="text-xs text-blue-600">+8 vs anterior</span>
                </div>
              </div>
              
              <div class="p-4 bg-purple-50/60 rounded-lg backdrop-blur-sm border border-purple-200/50">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-900">Recomendación</span>
                  <span class="text-lg font-bold text-purple-600">{{ stats.recomendacion_porcentaje || 0 }}%</span>
                </div>
                <p class="text-xs text-gray-600">Recomendarían la empresa</p>
                <div class="flex items-center mt-1">
                  <TrendingUp class="h-3 w-3 text-purple-500 mr-1" />
                  <span class="text-xs text-purple-600">+12% vs anterior</span>
                </div>
              </div>
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
          <Button 
            variant="primary" 
            class="flex flex-col items-center p-6 h-auto" 
            @click="$router.push('/admin/encuestas/crear')"
          >
            <ClipboardList class="h-8 w-8 mb-3" />
            <span class="text-sm font-medium">Crear Encuesta</span>
            <span class="text-xs text-blue-200 mt-1">Feedback rápido</span>
          </Button>
          
          <Button 
            variant="outline" 
            class="flex flex-col items-center p-6 h-auto" 
            @click="$router.push('/admin/empleados')"
          >
            <UserPlus class="h-8 w-8 mb-3" />
            <span class="text-sm font-medium">Invitar Empleado</span>
            <span class="text-xs text-gray-500 mt-1">Expandir equipo</span>
          </Button>
          
          <Button 
            variant="outline" 
            class="flex flex-col items-center p-6 h-auto" 
            @click="crearDesafio"
          >
            <Trophy class="h-8 w-8 mb-3" />
            <span class="text-sm font-medium">Crear Desafío</span>
            <span class="text-xs text-gray-500 mt-1">Motivar equipos</span>
          </Button>
          
          <Button 
            variant="outline" 
            class="flex flex-col items-center p-6 h-auto" 
            @click="$router.push('/admin/analitica')"
          >
            <Brain class="h-8 w-8 mb-3" />
            <span class="text-sm font-medium">Ver Alertas</span>
            <span class="text-xs text-gray-500 mt-1">Prevenir problemas</span>
          </Button>
        </div>
      </div>
    </section>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { 
  Bell, 
  Clock, 
  Calendar, 
  Star, 
  TrendingUp, 
  Trophy, 
  Users, 
  Zap,
  ClipboardList,
  UserPlus,
  Brain,
  AlertTriangle,
  Activity,
  MessageCircle,
  Apple,
  Heart,
  Code,
  DollarSign
} from 'lucide-vue-next'
import { useAdminStore } from '@/stores/admin'
import { useAuthStore } from '@/stores/auth.store'
import { supabase } from '@/services/supabase'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Button from '@/components/common/Button.vue'

const router = useRouter()
const toast = useToast()
const adminStore = useAdminStore()
const authStore = useAuthStore()

// Estado reactivo
const loading = ref(true)
const loadingActivity = ref(true)
const loadingSessions = ref(true)
const loadingServices = ref(true)
const loadingTrends = ref(true)
const loadingPerformers = ref(true)
const loadingChallenges = ref(true)
const loadingSurveys = ref(true)

const stats = ref({})
const actividadReciente = ref([])
const proximasSesiones = ref([])
const serviciosPopulares = ref([])
const tendenciasBienestar = ref([])
const topPerformers = ref([])
const desafiosActivos = ref([])
const encuestasActivas = ref([])
const departamentos = ref([])
const alertasCriticas = ref([])

// Computed
const surveyResponseRate = computed(() => {
  if (encuestasActivas.value.length === 0) return 0
  const totalRespuestas = encuestasActivas.value.reduce((acc, enc) => acc + enc.respuestas_recibidas, 0)
  const totalInvitados = encuestasActivas.value.reduce((acc, enc) => acc + enc.total_invitados, 0)
  return totalInvitados > 0 ? Math.round((totalRespuestas / totalInvitados) * 100) : 0
})

// Métodos de carga de datos
const loadDashboardStats = async () => {
  try {
    const { data, error } = await supabase
      .rpc('get_admin_dashboard_complete_stats', { empresa_id_param: authStore.user.empresa_id })
    
    if (error) throw error
    if (data && data.length > 0) {
      stats.value = data[0]
    }
  } catch (error) {
    console.error('Error loading dashboard stats:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudieron cargar las estadísticas',
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

const loadRecentActivity = async () => {
  try {
    const { data, error } = await supabase
      .rpc('get_recent_activity_detailed', { 
        empresa_id_param: authStore.user.empresa_id,
        limit_param: 5
      })
    
    if (error) throw error
    actividadReciente.value = data || []
  } catch (error) {
    console.error('Error loading recent activity:', error)
  } finally {
    loadingActivity.value = false
  }
}

const loadUpcomingSessions = async () => {
  try {
    const { data, error } = await supabase
      .rpc('get_upcoming_sessions_with_occupancy', { empresa_id_param: authStore.user.empresa_id })
    
    if (error) throw error
    proximasSesiones.value = data || []
  } catch (error) {
    console.error('Error loading upcoming sessions:', error)
  } finally {
    loadingSessions.value = false
  }
}

const loadPopularServices = async () => {
  try {
    const { data, error } = await supabase
      .rpc('get_popular_services_stats', { empresa_id_param: authStore.user.empresa_id })
    
    if (error) throw error
    serviciosPopulares.value = data || []
  } catch (error) {
    console.error('Error loading popular services:', error)
  } finally {
    loadingServices.value = false
  }
}

const loadWellnessTrends = async () => {
  try {
    const { data, error } = await supabase
      .rpc('get_wellness_trends', { empresa_id_param: authStore.user.empresa_id })
    
    if (error) throw error
    tendenciasBienestar.value = data || []
  } catch (error) {
    console.error('Error loading wellness trends:', error)
  } finally {
    loadingTrends.value = false
  }
}

const loadTopPerformers = async () => {
  try {
    const { data, error } = await supabase
      .rpc('get_top_performers', { 
        empresa_id_param: authStore.user.empresa_id,
        limit_param: 3
      })
    
    if (error) throw error
    topPerformers.value = data || []
  } catch (error) {
    console.error('Error loading top performers:', error)
  } finally {
    loadingPerformers.value = false
  }
}

const loadActiveChallenges = async () => {
  try {
    const { data, error } = await supabase
      .rpc('get_active_team_challenges', { empresa_id_param: authStore.user.empresa_id })
    
    if (error) throw error
    desafiosActivos.value = data || []
  } catch (error) {
    console.error('Error loading active challenges:', error)
  } finally {
    loadingChallenges.value = false
  }
}

const loadSurveyStatus = async () => {
  try {
    const { data, error } = await supabase
      .rpc('get_survey_status', { empresa_id_param: authStore.user.empresa_id })
    
    if (error) throw error
    encuestasActivas.value = data || []
  } catch (error) {
    console.error('Error loading survey status:', error)
  } finally {
    loadingSurveys.value = false
  }
}

const loadDepartmentParticipation = async () => {
  try {
    const { data, error } = await supabase
      .rpc('get_department_participation', { empresa_id_param: authStore.user.empresa_id })
    
    if (error) throw error
    departamentos.value = data || []
  } catch (error) {
    console.error('Error loading department participation:', error)
  }
}

const loadActiveAlerts = async () => {
  try {
    const { data, error } = await supabase
      .rpc('get_active_alerts', { empresa_id_param: authStore.user.empresa_id })
    
    if (error) throw error
    alertasCriticas.value = data || []
  } catch (error) {
    console.error('Error loading active alerts:', error)
  }
}

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

const getDaysRemaining = (dateString) => {
  if (!dateString) return 'Sin fecha límite'
  const date = new Date(dateString)
  const now = new Date()
  const diffInDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24))
  
  if (diffInDays < 0) return 'Finalizado'
  if (diffInDays === 0) return 'Termina hoy'
  if (diffInDays === 1) return 'Termina mañana'
  return `${diffInDays} días restantes`
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
    'reserva': 'bg-green-100',
    'desafio': 'bg-yellow-100',
    'puntos': 'bg-blue-100',
    'sistema': 'bg-purple-100'
  }
  return classMap[tipo] || 'bg-gray-100'
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

const getTrendCardClass = (tendencia) => {
  return tendencia === 'positiva' ? 'bg-green-50/60 border-green-200/50' : 'bg-blue-50/60 border-blue-200/50'
}

const getTrendIcon = (tendencia) => {
  return tendencia === 'positiva' ? TrendingUp : TrendingUp
}

const getTrendIconColor = (tendencia) => {
  return tendencia === 'positiva' ? 'text-green-500' : 'text-blue-500'
}

const getTrendTextColor = (tendencia) => {
  return tendencia === 'positiva' ? 'text-green-600' : 'text-blue-600'
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

// Cargar todos los datos
const loadAllData = async () => {
  if (!authStore.user?.empresa_id) {
    console.error('No empresa_id found')
    return
  }

  try {
    await Promise.all([
      loadDashboardStats(),
      loadRecentActivity(),
      loadUpcomingSessions(),
      loadPopularServices(),
      loadWellnessTrends(),
      loadTopPerformers(),
      loadActiveChallenges(),
      loadSurveyStatus(),
      loadDepartmentParticipation(),
      loadActiveAlerts()
    ])
  } catch (error) {
    console.error('Error loading dashboard data:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error al cargar los datos del dashboard',
      life: 5000
    })
  }
}

onMounted(() => {
  if (authStore.user?.empresa_id) {
    loadAllData()
  } else {
    console.warn('No empresa_id available for dashboard')
    loading.value = false
  }
})
</script>