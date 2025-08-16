<template>
  <EmpleadoLayout>
    <div class="space-y-8">
      <!-- Header -->
      <header class="mb-8">
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
          <span class="text-sm text-primary hover:text-primary-dark font-medium transition-colors cursor-pointer">
            Ver todas →
          </span>
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
            <span class="text-sm text-primary hover:text-primary-dark font-medium transition-colors cursor-pointer">
              Ver todas →
            </span>
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
            <span class="text-sm text-primary hover:text-primary-dark font-medium transition-colors cursor-pointer">
              Ver todos →
            </span>
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

      <!-- Actividades Recomendadas -->
      <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900 flex items-center">
            <Heart class="h-5 w-5 mr-2 text-red-500" />
            Actividades Recomendadas
          </h2>
          <span class="text-sm text-primary hover:text-primary-dark font-medium transition-colors cursor-pointer">
            Ver todas →
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </div>
</template>

<script setup>
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

const volverADemo = () => {
  router.push('/demo')
}
</script>