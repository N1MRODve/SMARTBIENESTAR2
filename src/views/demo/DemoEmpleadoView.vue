<template>
  <DemoLayout>
    <div v-if="!empleadoStore.loading.dashboard" class="space-y-8">
      <!-- Header -->
      <header id="dashboard" class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Mi Dashboard</h1>
            <p class="text-gray-600">Bienvenido a tu espacio personal de bienestar, Ana</p>
          </div>
          <div class="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-medium">
            🎭 Modo Demo
          </div>
        </div>
      </header>
      
      <!-- Sección de Estadísticas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Puntos de Bienestar -->
        <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="flex items-center justify-center mb-4">
            <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center">
              <Star class="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.puntos_bienestar || 0 }}</h3>
          <p class="text-gray-700 font-medium">Puntos de Bienestar</p>
          <div class="flex items-center justify-center mt-2">
            <TrendingUp class="h-4 w-4 text-green-500 mr-1" />
            <span class="text-xs text-green-600">+85 esta semana</span>
          </div>
        </div>

        <!-- Sesiones Asistidas -->
        <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="flex items-center justify-center mb-4">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center">
              <Calendar class="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.sesiones_asistidas || 0 }}</h3>
          <p class="text-gray-700 font-medium">Sesiones Completadas</p>
          <div class="flex items-center justify-center mt-2">
            <Calendar class="h-4 w-4 text-blue-500 mr-1" />
            <span class="text-xs text-blue-600">Este mes</span>
          </div>
        </div>

        <!-- Desafíos Completados -->
        <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="flex items-center justify-center mb-4">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center">
              <Trophy class="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.desafios_completados || 0 }}</h3>
          <p class="text-gray-700 font-medium">Desafíos Completados</p>
          <div class="flex items-center justify-center mt-2">
            <Trophy class="h-4 w-4 text-yellow-500 mr-1" />
            <span class="text-xs text-yellow-600">Nivel 2</span>
          </div>
        </div>
      </div>

      <!-- Próximas Sesiones -->
      <div id="proximas-sesiones" class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900 flex items-center">
            <Calendar class="h-5 w-5 mr-2 text-primary" />
            Próximas Sesiones
          </h2>
          <span class="text-sm text-primary hover:text-primary-dark font-medium transition-colors cursor-pointer">
            Ver todas →
          </span>
        </div>

        <div v-if="proximasSesiones.length > 0" class="space-y-4">
          <div v-for="sesion in proximasSesiones" :key="sesion.id" class="glass-card p-6 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600">
                  <Activity class="h-6 w-6 text-white" />
                </div>
                <div>
                  <p class="font-semibold text-gray-900">{{ sesion.titulo }}</p>
                  <p class="text-sm text-gray-600">{{ sesion.colaborador_nombre }}</p>
                </div>
              </div>
              <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                Confirmada
              </span>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4 text-sm text-gray-600">
                <div class="flex items-center">
                  <Clock class="h-4 w-4 mr-1" />
                  <span>{{ new Date(sesion.fecha_inicio).toLocaleString() }}</span>
                </div>
                <div class="flex items-center">
                  <MapPin class="h-4 w-4 mr-1" />
                  <span>{{ sesion.ubicacion || sesion.modalidad }}</span>
                </div>
              </div>
              <button class="text-primary hover:text-primary-dark text-sm font-medium transition-colors">
                Ver detalles
              </button>
            </div>
          </div>
        </div>
        <div v-else class="text-center text-gray-500 py-4">
          <p>No tienes próximas sesiones.</p>
        </div>
      </div>

      <!-- Grid de Contenido Principal -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Encuestas Pendientes -->
        <div id="encuestas" class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-gray-900 flex items-center">
              <ClipboardList class="h-5 w-5 mr-2 text-primary" />
              Encuestas Pendientes
            </h2>
            <span class="text-sm text-primary hover:text-primary-dark font-medium transition-colors cursor-pointer">
              Ver todas →
            </span>
          </div>

          <div v-if="encuestasPendientes.length > 0" class="space-y-4">
            <div v-for="encuesta in encuestasPendientes" :key="encuesta.id" class="glass-card p-6 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900 mb-2">{{ encuesta.titulo }}</h3>
                  <p class="text-sm text-gray-600 mb-3">{{ encuesta.descripcion }}</p>
                  <p class="text-xs text-gray-500">Termina en {{ new Date(encuesta.fecha_fin).toLocaleDateString() }}</p>
                </div>
              </div>
              <button class="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium">
                Completar Encuesta
              </button>
            </div>
          </div>
           <div v-else class="text-center text-gray-500 py-4">
            <p>No tienes encuestas pendientes. ¡Buen trabajo!</p>
          </div>
        </div>

        <!-- Desafíos de Bienestar -->
        <div id="desafios" class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-gray-900 flex items-center">
              <Trophy class="h-5 w-5 mr-2 text-yellow-500" />
              Desafíos Activos
            </h2>
            <span class="text-sm text-primary hover:text-primary-dark font-medium transition-colors cursor-pointer">
              Ver todos →
            </span>
          </div>

          <div v-if="desafios.length > 0" class="space-y-4">
            <div v-for="desafio in desafios" :key="desafio.id" class="glass-card p-6 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
                    <Trophy class="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">{{ desafio.titulo }}</h3>
                    <p class="text-sm text-gray-600">{{ desafio.categoria }}</p>
                  </div>
                </div>
                <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                  {{ desafio.puntos }} puntos
                </span>
              </div>
              
              <p class="text-sm text-gray-700 mb-4">{{ desafio.descripcion }}</p>
              
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500">
                  Termina: {{ new Date(desafio.fecha_fin).toLocaleDateString() }}
                </span>
                <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm">
                  Participar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actividades Recomendadas -->
      <div id="actividades" class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900 flex items-center">
            <Heart class="h-5 w-5 mr-2 text-red-500" />
            Actividades Recomendadas
          </h2>
          <span class="text-sm text-primary hover:text-primary-dark font-medium transition-colors cursor-pointer">
            Ver todas →
          </span>
        </div>

        <div v-if="actividadesDisponibles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div class="relative h-32 bg-gradient-to-br from-primary/20 to-secondary/20">
              <div class="absolute inset-0 flex items-center justify-center">
                <Activity class="h-12 w-12 text-primary" />
              </div>
              <div class="absolute top-2 right-2">
                <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  yoga
                </span>
              </div>
            </div>
            
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 mb-2">Yoga para Principiantes</h3>
              <p class="text-sm text-gray-600 mb-3">Sesión perfecta para comenzar tu práctica de yoga</p>
              
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center text-xs text-gray-500">
                  <Clock class="h-3 w-3 mr-1" />
                  <span>Hoy, 18:00</span>
                </div>
                <div class="flex items-center text-xs text-gray-500">
                  <Users class="h-3 w-3 mr-1" />
                  <span>8 plazas</span>
                </div>
              </div>
              
              <button class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm">
                Reservar Plaza
              </button>
            </div>
          </div>

          <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div class="relative h-32 bg-gradient-to-br from-primary/20 to-secondary/20">
              <div class="absolute inset-0 flex items-center justify-center">
                <Apple class="h-12 w-12 text-primary" />
              </div>
              <div class="absolute top-2 right-2">
                <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  nutricion
                </span>
              </div>
            </div>
            
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 mb-2">Nutrición Saludable</h3>
              <p class="text-sm text-gray-600 mb-3">Aprende a crear menús balanceados y nutritivos</p>
              
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center text-xs text-gray-500">
                  <Clock class="h-3 w-3 mr-1" />
                  <span>Mañana, 16:00</span>
                </div>
                <div class="flex items-center text-xs text-gray-500">
                  <Users class="h-3 w-3 mr-1" />
                  <span>12 plazas</span>
                </div>
              </div>
              
              <button class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm">
                Reservar Plaza
              </button>
            </div>
          </div>

          <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div class="relative h-32 bg-gradient-to-br from-primary/20 to-secondary/20">
              <div class="absolute inset-0 flex items-center justify-center">
                <Dumbbell class="h-12 w-12 text-primary" />
              </div>
              <div class="absolute top-2 right-2">
                <span class="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                  entrenamiento
                </span>
              </div>
            </div>
            
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 mb-2">Entrenamiento HIIT</h3>
              <p class="text-sm text-gray-600 mb-3">Ejercicios de alta intensidad para quemar calorías</p>
              
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center text-xs text-gray-500">
                  <Clock class="h-3 w-3 mr-1" />
                  <span>Jueves, 19:00</span>
                </div>
                <div class="flex items-center text-xs text-gray-500">
                  <Users class="h-3 w-3 mr-1" />
                  <span>5 plazas</span>
                </div>
              </div>
              
              <button class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm">
                Reservar Plaza
              </button>
            </div>
          </div>
        </div>
        <div v-else class="text-center text-gray-500 py-4">
          <p>No hay actividades recomendadas por el momento.</p>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center items-center h-64">
      <p>Cargando dashboard...</p>
    </div>
  </DemoLayout>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useEmpleadoStore } from '@/stores/empleado.store'
import { useAuthStore } from '@/stores/auth.store'
import DemoLayout from '@/layouts/DemoLayout.vue'
import { 
  ActivitySquare,
  ArrowLeft,
  LayoutDashboard,
  CalendarCheck,
  GraduationCap,
  Star, 
  Calendar, 
  Trophy, 
  TrendingUp, 
  ClipboardList,
  Heart,
  Clock,
  Users,
  Globe,
  MapPin,
  Activity,
  Brain,
  Apple,
  Dumbbell,
  MessageCircle
} from 'lucide-vue-next'
import { useRouter } from 'vue-router'
const router = useRouter()
const empleadoStore = useEmpleadoStore()
const authStore = useAuthStore()

const stats = computed(() => empleadoStore.dashboardStats)
const proximasSesiones = computed(() => empleadoStore.proximasSesiones)
const encuestasPendientes = computed(() => empleadoStore.encuestasPendientes)
const desafios = computed(() => empleadoStore.desafios)
const actividadesDisponibles = computed(() => empleadoStore.actividadesDisponibles)

const volverADemo = () => {
  router.push('/demo')
}

onMounted(() => {
  empleadoStore.loadDashboardData()
  empleadoStore.loadActividadesDisponibles()
})
</script>