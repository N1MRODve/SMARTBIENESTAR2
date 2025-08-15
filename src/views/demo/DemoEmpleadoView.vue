<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <!-- Demo Header -->
    <nav class="glass-container backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-2">
            <ActivitySquare class="h-8 w-8 text-primary" />
            <span class="text-xl font-bold text-gray-900">
              SMART<span class="text-primary">Bienestar</span>
            </span>
            <span class="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium ml-2">
              DEMO EMPLEADO
            </span>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">Ana Martínez - Desarrolladora Frontend</span>
            <Button @click="salirDemo" variant="outline">
              <ArrowLeft class="h-4 w-4 mr-2" />
              Salir Demo
            </Button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Sidebar Demo -->
    <div class="flex">
      <aside class="fixed inset-y-0 left-0 w-64 glass-sidebar backdrop-blur-xl border-r border-white/20 text-white pt-16 z-40">
        <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <button
            v-for="link in empleadoNavLinks"
            :key="link.id"
            @click="activeView = link.id"
            :class="[
              'flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group w-full text-left',
              activeView === link.id
                ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30'
                : 'text-white/90 hover:bg-white/15 hover:text-white hover:shadow-md hover:backdrop-blur-sm'
            ]"
          >
            <component :is="link.icon" class="h-5 w-5 mr-3 transition-transform duration-200 group-hover:scale-110" />
            <span class="font-medium">{{ link.text }}</span>
          </button>
        </nav>
        
        <!-- User info -->
        <div class="p-4 border-t border-white/20 bg-white/5 backdrop-blur-sm">
          <div class="flex items-center space-x-3 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
            <div class="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <span class="text-sm font-medium text-white">AM</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-white truncate">Ana Martínez</p>
              <p class="text-xs text-white/60 truncate">ana.martinez@innovatech.com</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="ml-64 flex-1 p-6">
        <!-- Dashboard View -->
        <div v-if="activeView === 'dashboard'" class="space-y-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">¡Bienvenida, Ana!</h1>
            <p class="text-gray-600">Aquí tienes un resumen de tus actividades de bienestar</p>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 class="text-4xl font-bold text-primary mb-2">1,250</h3>
              <p class="text-gray-700 font-medium">Puntos de Bienestar</p>
            </div>
            <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 class="text-4xl font-bold text-primary mb-2">8</h3>
              <p class="text-gray-700 font-medium">Desafíos Completados</p>
            </div>
            <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 class="text-4xl font-bold text-primary mb-2">3</h3>
              <p class="text-gray-700 font-medium">Próximas Sesiones</p>
            </div>
          </div>

          <!-- Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Próximas Sesiones -->
            <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Calendar class="h-5 w-5 mr-2 text-primary" />
                Próximas Sesiones
              </h2>
              <div class="space-y-4">
                <div class="glass-card p-4 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <p class="font-semibold text-gray-900">Yoga Matutino para Principiantes</p>
                  <p class="text-sm text-gray-600 mt-1">Mañana, 8:00 AM - Elena Vásquez</p>
                </div>
                <div class="glass-card p-4 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <p class="font-semibold text-gray-900">Coaching: Gestión del Tiempo</p>
                  <p class="text-sm text-gray-600 mt-1">Miércoles, 5:00 PM - Miguel Torres</p>
                </div>
                <div class="glass-card p-4 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <p class="font-semibold text-gray-900">Nutrición: Snacks Saludables</p>
                  <p class="text-sm text-gray-600 mt-1">Jueves, 12:30 PM - Laura Sánchez</p>
                </div>
              </div>
            </div>

            <!-- Encuestas Pendientes -->
            <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <ClipboardList class="h-5 w-5 mr-2 text-primary" />
                Encuestas Pendientes
              </h2>
              <div class="space-y-4">
                <div class="glass-card p-4 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex justify-between items-center">
                  <div>
                    <p class="font-semibold text-gray-900">Evaluación de Clima Laboral Q1 2025</p>
                    <p class="text-sm text-gray-600 mt-1">Fecha límite: 30 de enero</p>
                  </div>
                  <button class="glass-button-primary text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
                    Completar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Desafíos Activos -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Trophy class="h-5 w-5 mr-2 text-primary" />
              Desafíos Activos
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="glass-card rounded-xl p-6 text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Activity class="h-8 w-8 text-white" />
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Camina 10,000 pasos</h3>
                <p class="text-sm text-gray-600 mb-4">Progreso: 3/7 días</p>
                <span class="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-medium">
                  150 puntos
                </span>
              </div>
              <div class="glass-card rounded-xl p-6 text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Brain class="h-8 w-8 text-white" />
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Meditación 5 min</h3>
                <p class="text-sm text-gray-600 mb-4">Progreso: 1/14 días</p>
                <span class="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-medium">
                  100 puntos
                </span>
              </div>
              <div class="glass-card rounded-xl p-6 text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Droplets class="h-8 w-8 text-white" />
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Hidratación saludable</h3>
                <p class="text-sm text-gray-600 mb-4">Progreso: 5/10 días</p>
                <span class="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-medium">
                  75 puntos
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Actividades View -->
        <div v-if="activeView === 'actividades'" class="space-y-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Actividades Disponibles</h1>
            <p class="text-gray-600 mt-1">Explora las próximas actividades y reserva tu plaza.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <img src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Yoga" class="w-full h-48 object-cover" />
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Yoga Matutino para Principiantes</h3>
                <p class="text-gray-600 mb-4">Sesión de yoga suave para comenzar el día con energía positiva.</p>
                <div class="flex items-center justify-between mb-4">
                  <span class="text-sm text-gray-500">Mañana, 8:00 AM</span>
                  <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">5/15 plazas</span>
                </div>
                <button class="w-full glass-button-primary text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
                  Reservar Plaza
                </button>
              </div>
            </div>

            <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Coaching" class="w-full h-48 object-cover" />
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Coaching: Gestión del Tiempo</h3>
                <p class="text-gray-600 mb-4">Aprende técnicas efectivas para optimizar tu tiempo y productividad.</p>
                <div class="flex items-center justify-between mb-4">
                  <span class="text-sm text-gray-500">Miércoles, 5:00 PM</span>
                  <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">12/20 plazas</span>
                </div>
                <button class="w-full glass-button-primary text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
                  Reservar Plaza
                </button>
              </div>
            </div>

            <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Nutrición" class="w-full h-48 object-cover" />
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Nutrición: Snacks Saludables</h3>
                <p class="text-gray-600 mb-4">Descubre opciones de snacks nutritivos para mantener energía durante el trabajo.</p>
                <div class="flex items-center justify-between mb-4">
                  <span class="text-sm text-gray-500">Jueves, 12:30 PM</span>
                  <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">8/25 plazas</span>
                </div>
                <button class="w-full glass-button-primary text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
                  Reservar Plaza
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Mis Reservas View -->
        <div v-if="activeView === 'reservas'" class="space-y-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Mis Reservas</h1>
            <p class="text-gray-600 mt-1">Aquí puedes ver el historial de todas tus actividades.</p>
          </div>

          <!-- Reservas Activas -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-4">Reservas Activas</h2>
            <div class="space-y-4">
              <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div>
                  <h3 class="font-semibold text-gray-900">Yoga Matutino para Principiantes</h3>
                  <p class="text-sm text-gray-600">Mañana, 8:00 AM - Presencial</p>
                </div>
                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Confirmada</span>
              </div>
              <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div>
                  <h3 class="font-semibold text-gray-900">Coaching: Gestión del Tiempo</h3>
                  <p class="text-sm text-gray-600">Miércoles, 5:00 PM - Online</p>
                </div>
                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Confirmada</span>
              </div>
            </div>
          </div>

          <!-- Historial -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-4">Historial de Reservas</h2>
            <div class="space-y-4">
              <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div>
                  <h3 class="font-semibold text-gray-900">Yoga de Relajación</h3>
                  <p class="text-sm text-gray-600">10 de enero, 5:00 PM</p>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">Completada</span>
                  <div class="flex items-center">
                    <Star class="h-4 w-4 text-yellow-400 fill-current" />
                    <span class="text-sm text-gray-600 ml-1">5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Encuestas View -->
        <div v-if="activeView === 'encuestas'" class="space-y-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Mis Encuestas</h1>
            <p class="text-gray-600 mt-1">Tu opinión es importante. Completa las encuestas pendientes.</p>
          </div>

          <div class="space-y-4">
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 flex items-center justify-between">
              <div>
                <h2 class="text-lg font-bold text-gray-800">Evaluación de Clima Laboral Q1 2025</h2>
                <p class="text-sm text-gray-600 mt-1">Encuesta trimestral para evaluar el ambiente de trabajo y bienestar.</p>
                <p class="text-xs text-gray-500 mt-2">Fecha límite: 30 de enero de 2025</p>
              </div>
              <button class="glass-button-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 backdrop-blur-sm border border-blue-500/30">
                Completar Encuesta
              </button>
            </div>
          </div>
        </div>

        <!-- Desafíos View -->
        <div v-if="activeView === 'desafios'" class="space-y-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Desafíos de Bienestar</h1>
            <p class="text-gray-600 mt-1">Participa en nuestros desafíos, gana puntos y mejora tu bienestar.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <img src="https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Caminar" class="w-full h-48 object-cover" />
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Camina 10,000 pasos diarios</h3>
                <p class="text-gray-600 mb-4">Mantén un estilo de vida activo durante una semana completa.</p>
                <div class="flex items-center justify-between mb-4">
                  <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Activo</span>
                  <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">150 puntos</span>
                </div>
                <div class="mb-4">
                  <div class="flex justify-between text-sm mb-1">
                    <span>Progreso</span>
                    <span>3/7 días</span>
                  </div>
                  <div class="bg-gray-200 rounded-full h-2">
                    <div class="bg-primary rounded-full h-2" style="width: 43%"></div>
                  </div>
                </div>
                <button class="w-full glass-button-secondary text-gray-800 py-2 px-4 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm border border-gray-300/50">
                  Continuar Desafío
                </button>
              </div>
            </div>

            <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <img src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Meditación" class="w-full h-48 object-cover" />
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Meditación de 5 minutos</h3>
                <p class="text-gray-600 mb-4">Dedica 5 minutos diarios a la meditación durante 2 semanas.</p>
                <div class="flex items-center justify-between mb-4">
                  <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Activo</span>
                  <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">100 puntos</span>
                </div>
                <button class="w-full glass-button-primary text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
                  Unirse al Desafío
                </button>
              </div>
            </div>

            <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <img src="https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Hidratación" class="w-full h-48 object-cover" />
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Hidratación saludable</h3>
                <p class="text-gray-600 mb-4">Bebe al menos 8 vasos de agua al día durante 10 días consecutivos.</p>
                <div class="flex items-center justify-between mb-4">
                  <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Activo</span>
                  <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">75 puntos</span>
                </div>
                <div class="mb-4">
                  <div class="flex justify-between text-sm mb-1">
                    <span>Progreso</span>
                    <span>5/10 días</span>
                  </div>
                  <div class="bg-gray-200 rounded-full h-2">
                    <div class="bg-primary rounded-full h-2" style="width: 50%"></div>
                  </div>
                </div>
                <button class="w-full glass-button-secondary text-gray-800 py-2 px-4 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm border border-gray-300/50">
                  Continuar Desafío
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { 
  ActivitySquare, 
  ArrowLeft, 
  LayoutDashboard, 
  Calendar, 
  CalendarCheck, 
  ClipboardList, 
  Trophy,
  Activity,
  Brain,
  Droplets,
  Star
} from 'lucide-vue-next';
import Button from '../../components/common/Button.vue';

const router = useRouter();
const activeView = ref('dashboard');

const empleadoNavLinks = [
  { id: 'dashboard', text: 'Dashboard', icon: LayoutDashboard },
  { id: 'actividades', text: 'Actividades', icon: Calendar },
  { id: 'reservas', text: 'Mis Reservas', icon: CalendarCheck },
  { id: 'encuestas', text: 'Encuestas', icon: ClipboardList },
  { id: 'desafios', text: 'Desafíos', icon: Trophy }
];

function salirDemo() {
  router.push('/');
}
</script>