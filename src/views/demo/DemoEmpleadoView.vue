<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex">
    <!-- Sidebar -->
    <TheSidebar 
      :open="sidebarOpen" 
      @update:open="sidebarOpen = $event" 
    />
    
    <!-- Main content area -->
    <div class="flex-1 flex flex-col min-h-screen lg:ml-64">
      <!-- Header -->
      <AppHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      
      <!-- Main content -->
      <main class="flex-1 p-6 md:p-8">
        <div class="max-w-7xl mx-auto space-y-8">
          <!-- Header -->
          <header class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Mi Dashboard</h1>
            <p class="text-gray-600">Bienvenido a tu espacio personal de bienestar, Ana</p>
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
              <h3 class="text-4xl font-bold text-primary mb-2">1250</h3>
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
              <h3 class="text-4xl font-bold text-primary mb-2">12</h3>
              <p class="text-gray-700 font-medium">Sesiones Asistidas</p>
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
              <h3 class="text-4xl font-bold text-primary mb-2">3</h3>
              <p class="text-gray-700 font-medium">Desafíos Completados</p>
              <div class="flex items-center justify-center mt-2">
                <Trophy class="h-4 w-4 text-yellow-500 mr-1" />
                <span class="text-xs text-yellow-600">Nivel 2</span>
              </div>
            </div>
          </div>

          <!-- Próximas Sesiones -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-gray-900 flex items-center">
                <Calendar class="h-5 w-5 mr-2 text-primary" />
                Próximas Sesiones
              </h2>
              <router-link 
                to="/empleado/reservar-actividad" 
                class="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
              >
                Ver todas →
              </router-link>
            </div>

            <div class="space-y-4">
              <div class="glass-card p-6 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600">
                      <Activity class="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900">Yoga Matutino</p>
                      <p class="text-sm text-gray-600">Elena Vásquez</p>
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
                      <span>Hoy, 08:00</span>
                    </div>
                    <div class="flex items-center">
                      <MapPin class="h-4 w-4 mr-1" />
                      <span>Sala Zen</span>
                    </div>
                  </div>
                  <button class="text-primary hover:text-primary-dark text-sm font-medium transition-colors">
                    Ver detalles
                  </button>
                </div>
              </div>

              <div class="glass-card p-6 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-400 to-purple-600">
                      <Brain class="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900">Meditación Mindfulness</p>
                      <p class="text-sm text-gray-600">Miguel Torres</p>
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
                      <span>Mañana, 12:30</span>
                    </div>
                    <div class="flex items-center">
                      <Globe class="h-4 w-4 mr-1" />
                      <span>Online</span>
                    </div>
                  </div>
                  <button class="text-primary hover:text-primary-dark text-sm font-medium transition-colors">
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Grid de Contenido Principal -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Encuestas Pendientes -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-semibold text-gray-900 flex items-center">
                  <ClipboardList class="h-5 w-5 mr-2 text-primary" />
                  Encuestas Pendientes
                </h2>
                <router-link 
                  to="/empleado/encuestas" 
                  class="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
                >
                  Ver todas →
                </router-link>
              </div>

              <div class="space-y-4">
                <div class="glass-card p-6 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <div class="flex justify-between items-start mb-3">
                    <div class="flex-1">
                      <h3 class="font-semibold text-gray-900 mb-2">Evaluación de Clima Laboral Q1</h3>
                      <p class="text-sm text-gray-600 mb-3">Ayúdanos a mejorar el ambiente de trabajo</p>
                      <p class="text-xs text-gray-500">Termina en 5 días</p>
                    </div>
                  </div>
                  <button class="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium">
                    Completar Encuesta
                  </button>
                </div>

                <div class="glass-card p-6 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <div class="flex justify-between items-start mb-3">
                    <div class="flex-1">
                      <h3 class="font-semibold text-gray-900 mb-2">Feedback Actividades de Bienestar</h3>
                      <p class="text-sm text-gray-600 mb-3">Comparte tu experiencia con nuestras actividades</p>
                      <p class="text-xs text-gray-500">Sin fecha límite</p>
                    </div>
                  </div>
                  <button class="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium">
                    Completar Encuesta
                  </button>
                </div>
              </div>
            </div>

            <!-- Desafíos de Bienestar -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-semibold text-gray-900 flex items-center">
                  <Trophy class="h-5 w-5 mr-2 text-yellow-500" />
                  Desafíos Activos
                </h2>
                <router-link 
                  to="/empleado/desafios" 
                  class="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
                >
                  Ver todos →
                </router-link>
              </div>

              <div class="space-y-4">
                <div class="glass-card p-6 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
                        <Trophy class="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 class="font-semibold text-gray-900">Camina 10,000 pasos diarios</h3>
                        <p class="text-sm text-gray-600">Actividad Física</p>
                      </div>
                    </div>
                    <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                      200 puntos
                    </span>
                  </div>
                  
                  <p class="text-sm text-gray-700 mb-4">Mantente activo durante 14 días consecutivos</p>
                  
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-500">
                      Termina: 15 Feb
                    </span>
                    <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm">
                      Participar
                    </button>
                  </div>
                </div>

                <div class="glass-card p-6 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
                        <Trophy class="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 class="font-semibold text-gray-900">Meditación Diaria</h3>
                        <p class="text-sm text-gray-600">Mindfulness</p>
                      </div>
                    </div>
                    <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                      150 puntos
                    </span>
                  </div>
                  
                  <p class="text-sm text-gray-700 mb-4">Medita 10 minutos cada día durante una semana</p>
                  
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-500">
                      Termina: 10 Feb
                    </span>
                    <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm">
                      Participar
                    </button>
                  </div>
                </div>
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
import { 
  Star, 
  Calendar, 
  Trophy, 
  TrendingUp, 
  ClipboardList,
  Clock,
  Globe,
  MapPin,
  Activity,
  Brain
} from 'lucide-vue-next';
import TheSidebar from '@/components/layout/TheSidebar.vue';
import AppHeader from '@/components/layout/AppHeader.vue';

const sidebarOpen = ref(false);
</script>