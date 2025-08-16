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
              <h3 class="text-4xl font-bold text-primary mb-2">45</h3>
              <p class="text-gray-700 font-medium">Total Empleados</p>
              <div class="flex items-center justify-center mt-2">
                <TrendingUp class="h-4 w-4 text-green-500 mr-1" />
                <span class="text-xs text-green-600">78% participación</span>
              </div>
            </div>

            <!-- Sesiones Esta Semana -->
            <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div class="flex items-center justify-center mb-4">
                <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center">
                  <Calendar class="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 class="text-4xl font-bold text-primary mb-2">12</h3>
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
              <h3 class="text-4xl font-bold text-primary mb-2">2</h3>
              <p class="text-gray-700 font-medium">Encuestas Activas</p>
              <div class="flex items-center justify-center mt-2">
                <ClipboardList class="h-4 w-4 text-purple-500 mr-1" />
                <span class="text-xs text-purple-600">67% respuestas</span>
              </div>
            </div>

            <!-- Satisfacción General -->
            <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div class="flex items-center justify-center mb-4">
                <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center">
                  <Star class="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 class="text-4xl font-bold text-primary mb-2">4.2</h3>
              <p class="text-gray-700 font-medium">Satisfacción General</p>
              <div class="flex items-center justify-center mt-2">
                <TrendingUp class="h-4 w-4 text-yellow-500 mr-1" />
                <span class="text-xs text-yellow-600">+0.3 vs mes anterior</span>
              </div>
            </div>
          </div>

          <!-- Alertas Críticas -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6 flex items-center">
              <Bell class="h-5 w-5 mr-2 text-orange-500" />
              Centro de Alertas
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="p-4 rounded-lg backdrop-blur-sm border bg-yellow-50/60 border-yellow-200/50">
                <div class="flex items-center space-x-3 mb-2">
                  <AlertTriangle class="h-5 w-5 text-yellow-500" />
                  <h3 class="font-semibold text-gray-900">Baja Participación en Desarrollo</h3>
                </div>
                <p class="text-sm text-gray-700 mb-2">El departamento de Desarrollo tiene solo 70% de participación</p>
                <button class="w-full px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm bg-yellow-600 text-white hover:bg-yellow-700">
                  Analizar Situación
                </button>
              </div>
              
              <div class="p-4 rounded-lg backdrop-blur-sm border bg-yellow-50/60 border-yellow-200/50">
                <div class="flex items-center space-x-3 mb-2">
                  <AlertTriangle class="h-5 w-5 text-yellow-500" />
                  <h3 class="font-semibold text-gray-900">Encuesta con Pocas Respuestas</h3>
                </div>
                <p class="text-sm text-gray-700 mb-2">La encuesta de clima laboral necesita más participación</p>
                <button class="w-full px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm bg-yellow-600 text-white hover:bg-yellow-700">
                  Analizar Situación
                </button>
              </div>
            </div>
          </div>

          <!-- Grid Principal -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Participación por Departamento -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold text-gray-900 mb-6">Participación por Departamento</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="text-center p-4 rounded-xl backdrop-blur-sm border bg-green-50/60 border-green-200/50">
                  <div class="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 bg-green-500">
                    <Code class="h-6 w-6 text-white" />
                  </div>
                  <h4 class="font-semibold text-gray-900 mb-1">Desarrollo</h4>
                  <p class="text-2xl font-bold mb-1 text-green-600">85%</p>
                  <p class="text-xs text-gray-500">15 empleados</p>
                  <div class="bg-gray-200 rounded-full h-1 mt-2">
                    <div class="bg-green-500 rounded-full h-1" style="width: 85%"></div>
                  </div>
                </div>
                
                <div class="text-center p-4 rounded-xl backdrop-blur-sm border bg-blue-50/60 border-blue-200/50">
                  <div class="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 bg-blue-500">
                    <TrendingUp class="h-6 w-6 text-white" />
                  </div>
                  <h4 class="font-semibold text-gray-900 mb-1">Marketing</h4>
                  <p class="text-2xl font-bold mb-1 text-blue-600">92%</p>
                  <p class="text-xs text-gray-500">12 empleados</p>
                  <div class="bg-gray-200 rounded-full h-1 mt-2">
                    <div class="bg-blue-500 rounded-full h-1" style="width: 92%"></div>
                  </div>
                </div>
                
                <div class="text-center p-4 rounded-xl backdrop-blur-sm border bg-yellow-50/60 border-yellow-200/50">
                  <div class="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 bg-yellow-500">
                    <DollarSign class="h-6 w-6 text-white" />
                  </div>
                  <h4 class="font-semibold text-gray-900 mb-1">Ventas</h4>
                  <p class="text-2xl font-bold mb-1 text-yellow-600">70%</p>
                  <p class="text-xs text-gray-500">10 empleados</p>
                  <div class="bg-gray-200 rounded-full h-1 mt-2">
                    <div class="bg-yellow-500 rounded-full h-1" style="width: 70%"></div>
                  </div>
                </div>
                
                <div class="text-center p-4 rounded-xl backdrop-blur-sm border bg-blue-50/60 border-blue-200/50">
                  <div class="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 bg-blue-500">
                    <Users class="h-6 w-6 text-white" />
                  </div>
                  <h4 class="font-semibold text-gray-900 mb-1">RRHH</h4>
                  <p class="text-2xl font-bold mb-1 text-blue-600">95%</p>
                  <p class="text-xs text-gray-500">8 empleados</p>
                  <div class="bg-gray-200 rounded-full h-1 mt-2">
                    <div class="bg-blue-500 rounded-full h-1" style="width: 95%"></div>
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
              
              <div class="space-y-4">
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-green-500">
                    <Activity class="h-5 w-5 text-white" />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">Ana García completó sesión de Yoga Matutino</p>
                    <p class="text-xs text-gray-500">Hace 207 días • +50 puntos</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500">
                    <Trophy class="h-5 w-5 text-white" />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">Luis Martínez se inscribió en desafío "10,000 pasos"</p>
                    <p class="text-xs text-gray-500">Hace 207 días</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500">
                    <ClipboardList class="h-5 w-5 text-white" />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">Sofia Rodríguez completó encuesta de satisfacción</p>
                    <p class="text-xs text-gray-500">Hace 208 días • +25 puntos</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-green-500">
                    <MessageCircle class="h-5 w-5 text-white" />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">Carlos Mendoza reservó sesión de Coaching</p>
                    <p class="text-xs text-gray-500">Hace 208 días</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-500">
                    <Star class="h-5 w-5 text-white" />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">María Fernández alcanzó 1000 puntos de bienestar</p>
                    <p class="text-xs text-gray-500">Hace 209 días • +100 puntos</p>
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
  Users, 
  Calendar, 
  ClipboardList, 
  Star, 
  TrendingUp,
  Bell, 
  Clock, 
  Trophy,
  AlertTriangle,
  Activity,
  MessageCircle,
  Code,
  DollarSign
} from 'lucide-vue-next';
import TheSidebar from '@/components/layout/TheSidebar.vue';
import AppHeader from '@/components/layout/AppHeader.vue';

const sidebarOpen = ref(false);
</script>