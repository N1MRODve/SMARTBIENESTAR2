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
            <span class="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium ml-2">
              DEMO ADMINISTRADOR
            </span>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">María González - Administradora</span>
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
            v-for="link in adminNavLinks"
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
              <span class="text-sm font-medium text-white">MG</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-white truncate">María González</p>
              <p class="text-xs text-white/60 truncate">maria.gonzalez@innovatech.com</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="ml-64 flex-1 p-6">
        <!-- Dashboard View -->
        <div v-if="activeView === 'dashboard'" class="space-y-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Dashboard Administrador</h1>
            <p class="text-gray-600 mt-1">Vista general de tu empresa y actividad de bienestar</p>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 class="text-3xl font-bold text-primary mb-2">25</h3>
              <p class="text-gray-700 font-medium">Empleados Activos</p>
              <p class="text-xs text-gray-500 mt-1">87% participación</p>
            </div>
            <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 class="text-3xl font-bold text-primary mb-2">8</h3>
              <p class="text-gray-700 font-medium">Sesiones Esta Semana</p>
              <p class="text-xs text-gray-500 mt-1">+2 vs semana anterior</p>
            </div>
            <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 class="text-3xl font-bold text-primary mb-2">2</h3>
              <p class="text-gray-700 font-medium">Encuestas Activas</p>
              <p class="text-xs text-gray-500 mt-1">78% respuestas</p>
            </div>
            <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 class="text-3xl font-bold text-primary mb-2">4.6</h3>
              <p class="text-gray-700 font-medium">Satisfacción General</p>
              <p class="text-xs text-gray-500 mt-1">+0.3 vs mes anterior</p>
            </div>
          </div>

          <!-- Alertas y Notificaciones Importantes -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6 flex items-center">
              <Bell class="h-5 w-5 mr-2 text-orange-500" />
              Centro de Alertas
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Alerta Crítica -->
              <div class="p-4 bg-red-50/60 rounded-lg backdrop-blur-sm border border-red-200/50">
                <div class="flex items-center space-x-3 mb-2">
                  <AlertTriangle class="h-5 w-5 text-red-500" />
                  <h3 class="font-semibold text-gray-900">Alerta Crítica</h3>
                </div>
                <p class="text-sm text-gray-700 mb-2">
                  Equipo de Ventas muestra signos de burnout. Participación bajó 35% en 2 semanas.
                </p>
                <Button variant="primary" class="w-full text-sm bg-red-600 hover:bg-red-700">
                  Revisar Inmediatamente
                </Button>
              </div>

              <!-- Oportunidad -->
              <div class="p-4 bg-green-50/60 rounded-lg backdrop-blur-sm border border-green-200/50">
                <div class="flex items-center space-x-3 mb-2">
                  <TrendingUp class="h-5 w-5 text-green-500" />
                  <h3 class="font-semibold text-gray-900">Oportunidad</h3>
                </div>
                <p class="text-sm text-gray-700 mb-2">
                  Equipo Desarrollo muestra excelente progreso. Considera replicar su modelo.
                </p>
                <Button variant="outline" class="w-full text-sm">
                  Analizar Estrategia
                </Button>
              </div>
            </div>
          </div>

          <!-- Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Actividad Reciente -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Clock class="h-5 w-5 mr-2 text-primary" />
                Actividad Reciente
              </h2>
              <div class="space-y-4">
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <UserCheck class="h-5 w-5 text-green-600" />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">Ana Martínez completó "Yoga Avanzado"</p>
                    <p class="text-xs text-gray-500">Hace 2 horas • +50 puntos</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Users class="h-5 w-5 text-blue-600" />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">Equipo Marketing ganó desafío colaborativo</p>
                    <p class="text-xs text-gray-500">Hace 5 horas • Desayuno premium</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <ClipboardList class="h-5 w-5 text-purple-600" />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">Nueva encuesta "Clima Laboral Q1" enviada</p>
                    <p class="text-xs text-gray-500">Ayer • 18 respuestas recibidas</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Trophy class="h-5 w-5 text-yellow-600" />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">Luis Fernández alcanzó nivel "Maestro"</p>
                    <p class="text-xs text-gray-500">Hace 2 días • 2,500+ puntos</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <AlertTriangle class="h-5 w-5 text-red-600" />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">Alerta: Baja participación en Ventas</p>
                    <p class="text-xs text-gray-500">Hace 3 días • Requiere atención</p>
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
              <div class="space-y-4">
                <div class="glass-card p-4 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <div class="flex items-center justify-between mb-2">
                    <p class="font-semibold text-gray-900">Yoga Matutino</p>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">12/15 plazas</span>
                  </div>
                  <p class="text-sm text-gray-600 mt-1">Mañana, 8:00 AM</p>
                  <p class="text-xs text-gray-500">Elena Vásquez • Sala Yoga</p>
                </div>
                <div class="glass-card p-4 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <div class="flex items-center justify-between mb-2">
                    <p class="font-semibold text-gray-900">Coaching Grupal</p>
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">6/8 plazas</span>
                  </div>
                  <p class="text-sm text-gray-600 mt-1">Miércoles, 5:00 PM</p>
                  <p class="text-xs text-gray-500">Miguel Torres • Online</p>
                </div>
                <div class="glass-card p-4 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <div class="flex items-center justify-between mb-2">
                    <p class="font-semibold text-gray-900">Taller Mindfulness</p>
                    <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">20/20 plazas</span>
                  </div>
                  <p class="text-sm text-gray-600 mt-1">Viernes, 2:00 PM</p>
                  <p class="text-xs text-gray-500">Dr. Patricia Ruiz • Sala Principal</p>
                </div>
                <div class="glass-card p-4 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <div class="flex items-center justify-between mb-2">
                    <p class="font-semibold text-gray-900">Consulta Nutricional</p>
                    <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Individual</span>
                  </div>
                  <p class="text-sm text-gray-600 mt-1">Lunes, 11:00 AM</p>
                  <p class="text-xs text-gray-500">Lic. Roberto Vega • Consultorio</p>
                </div>
              </div>
              <div class="mt-4 pt-4 border-t border-white/20">
                <Button variant="outline" class="w-full text-sm" @click="activeView = 'estadisticas'">
                  Ver Calendario Completo
                </Button>
              </div>
            </div>
          </div>

          <!-- Participación por Departamento -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Participación por Departamento</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div class="text-center p-4 bg-blue-50/60 rounded-xl backdrop-blur-sm border border-blue-200/50">
                <div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Code class="h-6 w-6 text-white" />
                </div>
                <h4 class="font-semibold text-gray-900 mb-1">Desarrollo</h4>
                <p class="text-2xl font-bold text-blue-600 mb-1">95%</p>
                <p class="text-xs text-gray-500">8 empleados</p>
                <div class="bg-gray-200 rounded-full h-1 mt-2">
                  <div class="bg-blue-500 rounded-full h-1" style="width: 95%"></div>
                </div>
              </div>
              
              <div class="text-center p-4 bg-green-50/60 rounded-xl backdrop-blur-sm border border-green-200/50">
                <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <TrendingUp class="h-6 w-6 text-white" />
                </div>
                <h4 class="font-semibold text-gray-900 mb-1">Marketing</h4>
                <p class="text-2xl font-bold text-green-600 mb-1">88%</p>
                <p class="text-xs text-gray-500">6 empleados</p>
                <div class="bg-gray-200 rounded-full h-1 mt-2">
                  <div class="bg-green-500 rounded-full h-1" style="width: 88%"></div>
                </div>
              </div>
              
              <div class="text-center p-4 bg-yellow-50/60 rounded-xl backdrop-blur-sm border border-yellow-200/50">
                <div class="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <DollarSign class="h-6 w-6 text-white" />
                </div>
                <h4 class="font-semibold text-gray-900 mb-1">Ventas</h4>
                <p class="text-2xl font-bold text-yellow-600 mb-1">65%</p>
                <p class="text-xs text-gray-500">10 empleados</p>
                <div class="bg-gray-200 rounded-full h-1 mt-2">
                  <div class="bg-yellow-500 rounded-full h-1" style="width: 65%"></div>
                </div>
              </div>
              
              <div class="text-center p-4 bg-purple-50/60 rounded-xl backdrop-blur-sm border border-purple-200/50">
                <div class="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users class="h-6 w-6 text-white" />
                </div>
                <h4 class="font-semibold text-gray-900 mb-1">RRHH</h4>
                <p class="text-2xl font-bold text-purple-600 mb-1">82%</p>
                <p class="text-xs text-gray-500">4 empleados</p>
                <div class="bg-gray-200 rounded-full h-1 mt-2">
                  <div class="bg-purple-500 rounded-full h-1" style="width: 82%"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Servicios Más Populares y Tendencias -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Servicios Populares -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Star class="h-5 w-5 mr-2 text-yellow-500" />
                Servicios Más Populares
              </h2>
              <div class="space-y-4">
                <div class="flex items-center justify-between p-3 bg-purple-50/60 rounded-lg backdrop-blur-sm border border-purple-200/50">
                  <div class="flex items-center space-x-3">
                    <Brain class="h-5 w-5 text-purple-600" />
                    <div>
                      <p class="font-semibold text-gray-900">Meditación</p>
                      <p class="text-xs text-gray-600">203 participaciones</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-bold text-purple-600">94%</p>
                    <p class="text-xs text-gray-500">satisfacción</p>
                  </div>
                </div>
                
                <div class="flex items-center justify-between p-3 bg-green-50/60 rounded-lg backdrop-blur-sm border border-green-200/50">
                  <div class="flex items-center space-x-3">
                    <ActivitySquare class="h-5 w-5 text-green-600" />
                    <div>
                      <p class="font-semibold text-gray-900">Yoga</p>
                      <p class="text-xs text-gray-600">156 participaciones</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-bold text-green-600">91%</p>
                    <p class="text-xs text-gray-500">satisfacción</p>
                  </div>
                </div>
                
                <div class="flex items-center justify-between p-3 bg-blue-50/60 rounded-lg backdrop-blur-sm border border-blue-200/50">
                  <div class="flex items-center space-x-3">
                    <MessageCircle class="h-5 w-5 text-blue-600" />
                    <div>
                      <p class="font-semibold text-gray-900">Coaching</p>
                      <p class="text-xs text-gray-600">48 sesiones</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-bold text-blue-600">96%</p>
                    <p class="text-xs text-gray-500">satisfacción</p>
                  </div>
                </div>
                
                <div class="flex items-center justify-between p-3 bg-yellow-50/60 rounded-lg backdrop-blur-sm border border-yellow-200/50">
                  <div class="flex items-center space-x-3">
                    <Apple class="h-5 w-5 text-yellow-600" />
                    <div>
                      <p class="font-semibold text-gray-900">Nutrición</p>
                      <p class="text-xs text-gray-600">72 consultas</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-bold text-yellow-600">89%</p>
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
              <div class="space-y-4">
                <div class="p-4 bg-green-50/60 rounded-lg backdrop-blur-sm border border-green-200/50">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-semibold text-gray-900">Participación General</span>
                    <div class="flex items-center space-x-1">
                      <TrendingUp class="h-4 w-4 text-green-500" />
                      <span class="text-sm font-bold text-green-600">+23%</span>
                    </div>
                  </div>
                  <p class="text-xs text-gray-600">vs mes anterior</p>
                </div>
                
                <div class="p-4 bg-blue-50/60 rounded-lg backdrop-blur-sm border border-blue-200/50">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-semibold text-gray-900">Nuevos Usuarios</span>
                    <div class="flex items-center space-x-1">
                      <TrendingUp class="h-4 w-4 text-blue-500" />
                      <span class="text-sm font-bold text-blue-600">+18%</span>
                    </div>
                  </div>
                  <p class="text-xs text-gray-600">vs mes anterior</p>
                </div>
                
                <div class="p-4 bg-purple-50/60 rounded-lg backdrop-blur-sm border border-purple-200/50">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-semibold text-gray-900">Tiempo Promedio</span>
                    <div class="flex items-center space-x-1">
                      <TrendingUp class="h-4 w-4 text-purple-500" />
                      <span class="text-sm font-bold text-purple-600">+12%</span>
                    </div>
                  </div>
                  <p class="text-xs text-gray-600">45 min/sesión promedio</p>
                </div>
                
                <div class="p-4 bg-yellow-50/60 rounded-lg backdrop-blur-sm border border-yellow-200/50">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-semibold text-gray-900">Retención Mensual</span>
                    <div class="flex items-center space-x-1">
                      <TrendingUp class="h-4 w-4 text-yellow-500" />
                      <span class="text-sm font-bold text-yellow-600">+8%</span>
                    </div>
                  </div>
                  <p class="text-xs text-gray-600">Empleados que repiten</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Empleados Destacados y Desafíos Activos -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Top Performers -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Trophy class="h-5 w-5 mr-2 text-yellow-500" />
                Empleados Destacados
              </h2>
              <div class="space-y-4">
                <div class="flex items-center space-x-4 p-3 bg-yellow-50/60 rounded-lg backdrop-blur-sm border border-yellow-200/50">
                  <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
                    <span class="text-white font-bold text-sm">1</span>
                  </div>
                  <div class="flex-1">
                    <p class="font-semibold text-gray-900">Ana Martínez</p>
                    <p class="text-sm text-gray-600">2,840 puntos • Nivel 5</p>
                  </div>
                  <div class="text-right">
                    <p class="text-xs text-yellow-600 font-medium">Racha 30 días</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4 p-3 bg-gray-50/60 rounded-lg backdrop-blur-sm border border-gray-200/50">
                  <div class="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl flex items-center justify-center">
                    <span class="text-white font-bold text-sm">2</span>
                  </div>
                  <div class="flex-1">
                    <p class="font-semibold text-gray-900">Luis Fernández</p>
                    <p class="text-sm text-gray-600">2,650 puntos • Nivel 5</p>
                  </div>
                  <div class="text-right">
                    <p class="text-xs text-gray-600 font-medium">Líder equipo</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4 p-3 bg-orange-50/60 rounded-lg backdrop-blur-sm border border-orange-200/50">
                  <div class="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
                    <span class="text-white font-bold text-sm">3</span>
                  </div>
                  <div class="flex-1">
                    <p class="font-semibold text-gray-900">Sofía López</p>
                    <p class="text-sm text-gray-600">2,420 puntos • Nivel 4</p>
                  </div>
                  <div class="text-right">
                    <p class="text-xs text-orange-600 font-medium">Embajadora</p>
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
              <div class="space-y-4">
                <!-- Desafío Meditación -->
                <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20">
                  <div class="flex items-center justify-between mb-3">
                    <div>
                      <h4 class="font-semibold text-gray-900">Batalla de Meditación</h4>
                      <p class="text-sm text-gray-600">Primer depto. en 50 sesiones</p>
                    </div>
                    <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Activo</span>
                  </div>
                  <div class="space-y-2">
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-gray-700">🥇 Desarrollo</span>
                      <span class="font-bold text-blue-600">42/50</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-gray-700">🥈 Marketing</span>
                      <span class="font-bold text-green-600">39/50</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-gray-700">🥉 Ventas</span>
                      <span class="font-bold text-yellow-600">33/50</span>
                    </div>
                  </div>
                </div>
                
                <!-- Desafío Pasos -->
                <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20">
                  <div class="flex items-center justify-between mb-3">
                    <div>
                      <h4 class="font-semibold text-gray-900">Maratón Corporativo</h4>
                      <p class="text-sm text-gray-600">1M pasos como empresa</p>
                    </div>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">84.7%</span>
                  </div>
                  <div class="bg-gray-200 rounded-full h-2 mb-2">
                    <div class="bg-gradient-to-r from-primary to-secondary rounded-full h-2" style="width: 84.7%"></div>
                  </div>
                  <p class="text-xs text-gray-500">847,392 / 1,000,000 pasos • 8 días restantes</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Estado de Encuestas y Feedback -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Estado de Encuestas y Feedback</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Encuestas Activas -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Encuestas Activas</h3>
                <div class="space-y-3">
                  <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20">
                    <div class="flex items-center justify-between mb-2">
                      <h4 class="font-semibold text-gray-900">Clima Laboral Q1</h4>
                      <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Activa</span>
                    </div>
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm text-gray-600">Respuestas</span>
                      <span class="text-sm font-bold text-primary">18/25</span>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2">
                      <div class="bg-primary rounded-full h-2" style="width: 72%"></div>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Termina en 5 días</p>
                  </div>
                  
                  <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20">
                    <div class="flex items-center justify-between mb-2">
                      <h4 class="font-semibold text-gray-900">Feedback Servicios</h4>
                      <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Activa</span>
                    </div>
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm text-gray-600">Respuestas</span>
                      <span class="text-sm font-bold text-primary">22/25</span>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2">
                      <div class="bg-primary rounded-full h-2" style="width: 88%"></div>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Termina en 12 días</p>
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
                      <span class="text-lg font-bold text-green-600">4.6/5</span>
                    </div>
                    <p class="text-xs text-gray-600">Encuesta diciembre 2024</p>
                    <div class="flex items-center mt-1">
                      <TrendingUp class="h-3 w-3 text-green-500 mr-1" />
                      <span class="text-xs text-green-600">+0.3 vs anterior</span>
                    </div>
                  </div>
                  
                  <div class="p-4 bg-blue-50/60 rounded-lg backdrop-blur-sm border border-blue-200/50">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm font-semibold text-gray-900">NPS Score</span>
                      <span class="text-lg font-bold text-blue-600">72</span>
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
                      <span class="text-lg font-bold text-purple-600">89%</span>
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

          <!-- Próximas Acciones -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Target class="h-5 w-5 mr-2 text-primary" />
              Próximas Acciones
            </h2>
            <div class="space-y-4">
              <div class="p-4 bg-red-50/60 rounded-lg backdrop-blur-sm border border-red-200/50">
                <div class="flex items-center space-x-3 mb-2">
                  <div class="w-6 h-6 bg-red-500 rounded-lg flex items-center justify-center">
                    <span class="text-white text-xs font-bold">!</span>
                  </div>
                  <span class="text-sm font-semibold text-gray-900">Urgente</span>
                </div>
                <p class="text-sm text-gray-700 mb-2">Reunión con equipo Ventas</p>
                <p class="text-xs text-gray-500">Abordar signos de burnout detectados</p>
              </div>
              
              <div class="p-4 bg-yellow-50/60 rounded-lg backdrop-blur-sm border border-yellow-200/50">
                <div class="flex items-center space-x-3 mb-2">
                  <Calendar class="h-4 w-4 text-yellow-600" />
                  <span class="text-sm font-semibold text-gray-900">Esta Semana</span>
                </div>
                <p class="text-sm text-gray-700 mb-2">Revisar resultados encuesta clima</p>
                <p class="text-xs text-gray-500">Analizar feedback y planificar mejoras</p>
              </div>
              
              <div class="p-4 bg-blue-50/60 rounded-lg backdrop-blur-sm border border-blue-200/50">
                <div class="flex items-center space-x-3 mb-2">
                  <Plus class="h-4 w-4 text-blue-600" />
                  <span class="text-sm font-semibold text-gray-900">Próximo Mes</span>
                </div>
                <p class="text-sm text-gray-700 mb-2">Lanzar programa mindfulness</p>
                <p class="text-xs text-gray-500">Para equipos de alto estrés</p>
              </div>
              
              <div class="p-4 bg-green-50/60 rounded-lg backdrop-blur-sm border border-green-200/50">
                <div class="flex items-center space-x-3 mb-2">
                  <Award class="h-4 w-4 text-green-600" />
                  <span class="text-sm font-semibold text-gray-900">Q2 2025</span>
                </div>
                <p class="text-sm text-gray-700 mb-2">Reconocer top performers</p>
                <p class="text-xs text-gray-500">Evento de reconocimiento trimestral</p>
              </div>
            </div>
          </div>

          <!-- Resumen de Servicios Contratados -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Estado de Servicios Contratados</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div class="text-center p-4 bg-green-50/60 rounded-xl backdrop-blur-sm border border-green-200/50">
                <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <ActivitySquare class="h-6 w-6 text-white" />
                </div>
                <h4 class="font-semibold text-gray-900 mb-1">Yoga</h4>
                <p class="text-sm text-green-600 font-medium mb-1">Muy Popular</p>
                <p class="text-xs text-gray-500">156 participaciones</p>
                <div class="bg-gray-200 rounded-full h-1 mt-2">
                  <div class="bg-green-500 rounded-full h-1" style="width: 95%"></div>
                </div>
              </div>
              
              <div class="text-center p-4 bg-purple-50/60 rounded-xl backdrop-blur-sm border border-purple-200/50">
                <div class="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Brain class="h-6 w-6 text-white" />
                </div>
                <h4 class="font-semibold text-gray-900 mb-1">Meditación</h4>
                <p class="text-sm text-purple-600 font-medium mb-1">Excelente</p>
                <p class="text-xs text-gray-500">203 participaciones</p>
                <div class="bg-gray-200 rounded-full h-1 mt-2">
                  <div class="bg-purple-500 rounded-full h-1" style="width: 98%"></div>
                </div>
              </div>
              
              <div class="text-center p-4 bg-blue-50/60 rounded-xl backdrop-blur-sm border border-blue-200/50">
                <div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <MessageCircle class="h-6 w-6 text-white" />
                </div>
                <h4 class="font-semibold text-gray-900 mb-1">Coaching</h4>
                <p class="text-sm text-blue-600 font-medium mb-1">Alta Demanda</p>
                <p class="text-xs text-gray-500">48 sesiones</p>
                <div class="bg-gray-200 rounded-full h-1 mt-2">
                  <div class="bg-blue-500 rounded-full h-1" style="width: 85%"></div>
                </div>
              </div>
              
              <div class="text-center p-4 bg-yellow-50/60 rounded-xl backdrop-blur-sm border border-yellow-200/50">
                <div class="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Apple class="h-6 w-6 text-white" />
                </div>
                <h4 class="font-semibold text-gray-900 mb-1">Nutrición</h4>
                <p class="text-sm text-yellow-600 font-medium mb-1">Creciendo</p>
                <p class="text-xs text-gray-500">72 consultas</p>
                <div class="bg-gray-200 rounded-full h-1 mt-2">
                  <div class="bg-yellow-500 rounded-full h-1" style="width: 72%"></div>
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
              <Button variant="primary" class="flex flex-col items-center p-6 h-auto" @click="activeView = 'encuestas'">
                <ClipboardList class="h-8 w-8 mb-3" />
                <span class="text-sm font-medium">Crear Encuesta</span>
                <span class="text-xs text-blue-200 mt-1">Feedback rápido</span>
              </Button>
              
              <Button variant="outline" class="flex flex-col items-center p-6 h-auto" @click="activeView = 'empleados'">
                <UserPlus class="h-8 w-8 mb-3" />
                <span class="text-sm font-medium">Invitar Empleado</span>
                <span class="text-xs text-gray-500 mt-1">Expandir equipo</span>
              </Button>
              
              <Button variant="outline" class="flex flex-col items-center p-6 h-auto" @click="activeView = 'gamificacion'">
                <Trophy class="h-8 w-8 mb-3" />
                <span class="text-sm font-medium">Crear Desafío</span>
                <span class="text-xs text-gray-500 mt-1">Motivar equipos</span>
              </Button>
              
              <Button variant="outline" class="flex flex-col items-center p-6 h-auto" @click="activeView = 'analitica'">
                <Brain class="h-8 w-8 mb-3" />
                <span class="text-sm font-medium">Ver Alertas</span>
                <span class="text-xs text-gray-500 mt-1">Prevenir problemas</span>
              </Button>
            </div>
          </div>

          <!-- Resumen Semanal -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6 flex items-center">
              <Calendar class="h-5 w-5 mr-2 text-primary" />
              Resumen de la Semana
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Logros de la Semana -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Logros Destacados</h3>
                <div class="space-y-3">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Trophy class="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">Equipo Marketing</p>
                      <p class="text-xs text-gray-500">Ganó desafío yoga grupal</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Star class="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">Ana Martínez</p>
                      <p class="text-xs text-gray-500">Completó "Mes sin Estrés"</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CheckCircle class="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">156 logros</p>
                      <p class="text-xs text-gray-500">Desbloqueados esta semana</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Métricas Clave -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Métricas Clave</h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Asistencia promedio</span>
                    <span class="text-sm font-bold text-green-600">92%</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Tiempo por sesión</span>
                    <span class="text-sm font-bold text-blue-600">45 min</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Nuevas reservas</span>
                    <span class="text-sm font-bold text-purple-600">34</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Cancelaciones</span>
                    <span class="text-sm font-bold text-yellow-600">3</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Puntos otorgados</span>
                    <span class="text-sm font-bold text-primary">2,840</span>
                  </div>
                </div>
              </div>

              <!-- Próximos Eventos -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Próximos Eventos</h3>
                <div class="space-y-3">
                  <div class="flex items-center space-x-3">
                    <div class="text-center">
                      <div class="text-sm font-bold text-primary">15</div>
                      <div class="text-xs text-gray-500">ENE</div>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">Yoga Matutino</p>
                      <p class="text-xs text-gray-500">8:00 AM • 12/15 plazas</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-3">
                    <div class="text-center">
                      <div class="text-sm font-bold text-primary">17</div>
                      <div class="text-xs text-gray-500">ENE</div>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">Taller Mindfulness</p>
                      <p class="text-xs text-gray-500">2:00 PM • Completo</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-3">
                    <div class="text-center">
                      <div class="text-sm font-bold text-primary">20</div>
                      <div class="text-xs text-gray-500">ENE</div>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">Coaching Grupal</p>
                      <p class="text-xs text-gray-500">5:00 PM • 6/8 plazas</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-3">
                    <div class="text-center">
                      <div class="text-sm font-bold text-primary">22</div>
                      <div class="text-xs text-gray-500">ENE</div>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">Evento Bienestar</p>
                      <p class="text-xs text-gray-500">Todo el día • Planificando</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empleados View -->
        <div v-if="activeView === 'empleados'" class="space-y-8">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Gestión de Empleados</h1>
              <p class="text-gray-600 mt-1">Administra los empleados de InnovaTech Solutions</p>
            </div>
            <div class="flex gap-2">
              <Button variant="primary">
                <UserPlus class="h-4 w-4 mr-2" />
                Invitar Empleado
              </Button>
              <Button variant="secondary">
                <Plus class="h-4 w-4 mr-2" />
                Añadir Empleado
              </Button>
            </div>
          </div>

          <!-- Estadísticas de empleados -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <h3 class="text-2xl font-bold text-primary mb-2">72%</h3>
              <p class="text-gray-600">Participación Promedio</p>
            </div>
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <h3 class="text-2xl font-bold text-green-600 mb-2">4.3</h3>
              <p class="text-gray-600">Satisfacción Promedio</p>
            </div>
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <h3 class="text-2xl font-bold text-yellow-600 mb-2">1,150</h3>
              <p class="text-gray-600">Puntos Promedio</p>
            </div>
          </div>

          <!-- Tabla de empleados -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <div class="mb-4">
              <input 
                type="text" 
                placeholder="Buscar empleados..." 
                class="w-full px-4 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20">
              <table class="min-w-full">
                <thead class="bg-white/50 backdrop-blur-sm">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Empleado</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Departamento</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Puntos</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Última Actividad</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Estado</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/20">
                  <tr class="hover:bg-white/30 transition-colors duration-200">
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <div class="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                          <span class="text-primary font-medium">AM</span>
                        </div>
                        <div>
                          <p class="font-medium text-gray-900">Ana Martínez</p>
                          <p class="text-sm text-gray-600">ana.martinez@innovatech.com</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-gray-700">Tecnología</td>
                    <td class="px-6 py-4">
                      <span class="text-lg font-bold text-primary">1,250</span>
                    </td>
                    <td class="px-6 py-4">
                      <span class="text-sm text-gray-600">Hace 2 horas</span>
                      <p class="text-xs text-gray-500">Yoga Matutino</p>
                    </td>
                    <td class="px-6 py-4">
                      <span class="bg-green-100/80 text-green-800 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border border-green-200/50">
                        Muy Activo
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <Button variant="outline" class="text-xs px-3 py-1">Ver Perfil</Button>
                    </td>
                  </tr>
                  <tr class="hover:bg-white/30 transition-colors duration-200">
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <div class="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                          <span class="text-primary font-medium">LF</span>
                        </div>
                        <div>
                          <p class="font-medium text-gray-900">Luis Fernández</p>
                          <p class="text-sm text-gray-600">luis.fernandez@innovatech.com</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-gray-700">Producto</td>
                    <td class="px-6 py-4">
                      <span class="text-lg font-bold text-primary">980</span>
                    </td>
                    <td class="px-6 py-4">
                      <span class="text-sm text-gray-600">Hace 1 día</span>
                      <p class="text-xs text-gray-500">Desafío completado</p>
                    </td>
                    <td class="px-6 py-4">
                      <span class="bg-yellow-100/80 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border border-yellow-200/50">
                        Activo
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <Button variant="outline" class="text-xs px-3 py-1">Ver Perfil</Button>
                    </td>
                  </tr>
                  <tr class="hover:bg-white/30 transition-colors duration-200">
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <div class="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                          <span class="text-primary font-medium">SL</span>
                        </div>
                        <div>
                          <p class="font-medium text-gray-900">Sofía López</p>
                          <p class="text-sm text-gray-600">sofia.lopez@innovatech.com</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-gray-700">Diseño</td>
                    <td class="px-6 py-4">
                      <span class="text-lg font-bold text-primary">1,450</span>
                    </td>
                    <td class="px-6 py-4">
                      <span class="text-sm text-gray-600">Hace 6 horas</span>
                      <p class="text-xs text-gray-500">Calificó sesión 5★</p>
                    </td>
                    <td class="px-6 py-4">
                      <span class="bg-green-100/80 text-green-800 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border border-green-200/50">
                        Muy Activo
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <Button variant="outline" class="text-xs px-3 py-1">Ver Perfil</Button>
                    </td>
                  </tr>
                  <tr class="hover:bg-white/30 transition-colors duration-200">
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <div class="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                          <span class="text-primary font-medium">DR</span>
                        </div>
                        <div>
                          <p class="font-medium text-gray-900">David Ruiz</p>
                          <p class="text-sm text-gray-600">david.ruiz@innovatech.com</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-gray-700">Marketing</td>
                    <td class="px-6 py-4">
                      <span class="text-lg font-bold text-primary">750</span>
                    </td>
                    <td class="px-6 py-4">
                      <span class="text-sm text-gray-600">Hace 3 días</span>
                      <p class="text-xs text-gray-500">Coaching sesión</p>
                    </td>
                    <td class="px-6 py-4">
                      <span class="bg-yellow-100/80 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border border-yellow-200/50">
                        Activo
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <Button variant="outline" class="text-xs px-3 py-1">Ver Perfil</Button>
                    </td>
                  </tr>
                  <tr class="hover:bg-white/30 transition-colors duration-200">
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <div class="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                          <span class="text-primary font-medium">CG</span>
                        </div>
                        <div>
                          <p class="font-medium text-gray-900">Carmen García</p>
                          <p class="text-sm text-gray-600">carmen.garcia@innovatech.com</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-gray-700">Recursos Humanos</td>
                    <td class="px-6 py-4">
                      <span class="text-lg font-bold text-primary">1,100</span>
                    </td>
                    <td class="px-6 py-4">
                      <span class="text-sm text-gray-600">Hace 1 día</span>
                      <p class="text-xs text-gray-500">Meditación</p>
                    </td>
                    <td class="px-6 py-4">
                      <span class="bg-green-100/80 text-green-800 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border border-green-200/50">
                        Muy Activo
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <Button variant="outline" class="text-xs px-3 py-1">Ver Perfil</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Desarrollo y Carrera View -->
        <div v-if="activeView === 'desarrollo'" class="space-y-8">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Desarrollo y Rutas de Carrera</h1>
              <p class="text-gray-600 mt-1">Gestiona el crecimiento profesional de tus empleados</p>
            </div>
            <div class="flex gap-2">
              <Button variant="primary">
                <Plus class="h-4 w-4 mr-2" />
                Nueva Ruta de Carrera
              </Button>
              <Button variant="secondary">
                <FileText class="h-4 w-4 mr-2" />
                Plantillas de Desarrollo
              </Button>
            </div>
          </div>

          <!-- Métricas de Desarrollo -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <h3 class="text-2xl font-bold text-primary mb-2">18</h3>
              <p class="text-gray-600">Empleados con Ruta Activa</p>
              <p class="text-xs text-gray-500 mt-1">72% del total</p>
            </div>
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <h3 class="text-2xl font-bold text-green-600 mb-2">89%</h3>
              <p class="text-gray-600">Tasa de Retención</p>
              <p class="text-xs text-gray-500 mt-1">+12% vs año anterior</p>
            </div>
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <h3 class="text-2xl font-bold text-yellow-600 mb-2">6</h3>
              <p class="text-gray-600">Promociones Internas</p>
              <p class="text-xs text-gray-500 mt-1">Este trimestre</p>
            </div>
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <h3 class="text-2xl font-bold text-purple-600 mb-2">4.6</h3>
              <p class="text-gray-600">Satisfacción Desarrollo</p>
              <p class="text-xs text-gray-500 mt-1">Promedio empleados</p>
            </div>
          </div>

          <!-- Rutas de Carrera Activas -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Rutas de Carrera Activas</h2>
            <div class="space-y-6">
              <!-- Ana Martínez - Desarrolladora a Tech Lead -->
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center space-x-4">
                    <div class="h-12 w-12 bg-primary/20 rounded-xl flex items-center justify-center">
                      <span class="text-primary font-medium">AM</span>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">Ana Martínez</h3>
                      <p class="text-sm text-gray-600">Desarrolladora Frontend → Tech Lead</p>
                      <div class="flex items-center mt-1">
                        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">En progreso</span>
                        <span class="text-xs text-gray-500">Iniciado hace 3 meses</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" class="text-sm">
                    Ver Detalles
                  </Button>
                </div>
                
                <!-- Progreso de Habilidades -->
                <div class="mb-4">
                  <h4 class="text-sm font-semibold text-gray-700 mb-3">Progreso de Habilidades</h4>
                  <div class="space-y-3">
                    <div>
                      <div class="flex items-center justify-between mb-1">
                        <span class="text-sm text-gray-600">Liderazgo de Equipos</span>
                        <span class="text-sm font-medium text-gray-900">75%</span>
                      </div>
                      <div class="bg-gray-200 rounded-full h-2">
                        <div class="bg-primary rounded-full h-2 transition-all duration-300" style="width: 75%"></div>
                      </div>
                    </div>
                    <div>
                      <div class="flex items-center justify-between mb-1">
                        <span class="text-sm text-gray-600">Gestión de Proyectos</span>
                        <span class="text-sm font-medium text-gray-900">60%</span>
                      </div>
                      <div class="bg-gray-200 rounded-full h-2">
                        <div class="bg-yellow-500 rounded-full h-2 transition-all duration-300" style="width: 60%"></div>
                      </div>
                    </div>
                    <div>
                      <div class="flex items-center justify-between mb-1">
                        <span class="text-sm text-gray-600">Comunicación Estratégica</span>
                        <span class="text-sm font-medium text-gray-900">90%</span>
                      </div>
                      <div class="bg-gray-200 rounded-full h-2">
                        <div class="bg-green-500 rounded-full h-2 transition-all duration-300" style="width: 90%"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Recursos Asignados -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="bg-blue-50/60 p-3 rounded-lg backdrop-blur-sm border border-blue-200/50">
                    <div class="flex items-center mb-2">
                      <BookOpen class="h-4 w-4 text-blue-600 mr-2" />
                      <span class="text-sm font-medium text-gray-900">Cursos</span>
                    </div>
                    <p class="text-xs text-gray-600">Liderazgo Transformacional</p>
                    <p class="text-xs text-blue-600">Completado ✓</p>
                  </div>
                  <div class="bg-purple-50/60 p-3 rounded-lg backdrop-blur-sm border border-purple-200/50">
                    <div class="flex items-center mb-2">
                      <MessageCircle class="h-4 w-4 text-purple-600 mr-2" />
                      <span class="text-sm font-medium text-gray-900">Coaching</span>
                    </div>
                    <p class="text-xs text-gray-600">Sesiones mensuales</p>
                    <p class="text-xs text-purple-600">4/6 completadas</p>
                  </div>
                  <div class="bg-green-50/60 p-3 rounded-lg backdrop-blur-sm border border-green-200/50">
                    <div class="flex items-center mb-2">
                      <Users class="h-4 w-4 text-green-600 mr-2" />
                      <span class="text-sm font-medium text-gray-900">Mentoría</span>
                    </div>
                    <p class="text-xs text-gray-600">Mentor asignado</p>
                    <p class="text-xs text-green-600">Activa</p>
                  </div>
                </div>
              </div>

              <!-- Luis Fernández - Product Manager a Director -->
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center space-x-4">
                    <div class="h-12 w-12 bg-primary/20 rounded-xl flex items-center justify-center">
                      <span class="text-primary font-medium">LF</span>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">Luis Fernández</h3>
                      <p class="text-sm text-gray-600">Product Manager → Director de Producto</p>
                      <div class="flex items-center mt-1">
                        <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mr-2">Planificando</span>
                        <span class="text-xs text-gray-500">Iniciará próximo mes</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" class="text-sm">
                    Configurar Plan
                  </Button>
                </div>
                
                <!-- Habilidades Objetivo -->
                <div class="mb-4">
                  <h4 class="text-sm font-semibold text-gray-700 mb-3">Habilidades Objetivo</h4>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full text-center">Visión Estratégica</span>
                    <span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full text-center">Gestión de P&L</span>
                    <span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full text-center">Liderazgo Senior</span>
                    <span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full text-center">Negociación</span>
                  </div>
                </div>

                <!-- Plan de Desarrollo Propuesto -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="bg-orange-50/60 p-3 rounded-lg backdrop-blur-sm border border-orange-200/50">
                    <div class="flex items-center mb-2">
                      <BookOpen class="h-4 w-4 text-orange-600 mr-2" />
                      <span class="text-sm font-medium text-gray-900">Cursos Sugeridos</span>
                    </div>
                    <p class="text-xs text-gray-600">MBA Ejecutivo</p>
                    <p class="text-xs text-orange-600">Pendiente aprobación</p>
                  </div>
                  <div class="bg-blue-50/60 p-3 rounded-lg backdrop-blur-sm border border-blue-200/50">
                    <div class="flex items-center mb-2">
                      <MessageCircle class="h-4 w-4 text-blue-600 mr-2" />
                      <span class="text-sm font-medium text-gray-900">Coaching</span>
                    </div>
                    <p class="text-xs text-gray-600">Executive Coaching</p>
                    <p class="text-xs text-blue-600">6 meses</p>
                  </div>
                  <div class="bg-purple-50/60 p-3 rounded-lg backdrop-blur-sm border border-purple-200/50">
                    <div class="flex items-center mb-2">
                      <Users class="h-4 w-4 text-purple-600 mr-2" />
                      <span class="text-sm font-medium text-gray-900">Mentoría</span>
                    </div>
                    <p class="text-xs text-gray-600">Director actual</p>
                    <p class="text-xs text-purple-600">Por asignar</p>
                  </div>
                </div>
              </div>

              <!-- Sofía López - Diseñadora a Design Lead -->
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center space-x-4">
                    <div class="h-12 w-12 bg-primary/20 rounded-xl flex items-center justify-center">
                      <span class="text-primary font-medium">SL</span>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">Sofía López</h3>
                      <p class="text-sm text-gray-600">Diseñadora UX/UI → Design Lead</p>
                      <div class="flex items-center mt-1">
                        <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2">Avanzando</span>
                        <span class="text-xs text-gray-500">85% completado</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="primary" class="text-sm">
                    Revisar Progreso
                  </Button>
                </div>
                
                <!-- Progreso de Habilidades -->
                <div class="mb-4">
                  <h4 class="text-sm font-semibold text-gray-700 mb-3">Progreso de Habilidades</h4>
                  <div class="space-y-3">
                    <div>
                      <div class="flex items-center justify-between mb-1">
                        <span class="text-sm text-gray-600">Liderazgo Creativo</span>
                        <span class="text-sm font-medium text-gray-900">95%</span>
                      </div>
                      <div class="bg-gray-200 rounded-full h-2">
                        <div class="bg-green-500 rounded-full h-2 transition-all duration-300" style="width: 95%"></div>
                      </div>
                    </div>
                    <div>
                      <div class="flex items-center justify-between mb-1">
                        <span class="text-sm text-gray-600">Gestión de Equipos</span>
                        <span class="text-sm font-medium text-gray-900">80%</span>
                      </div>
                      <div class="bg-gray-200 rounded-full h-2">
                        <div class="bg-primary rounded-full h-2 transition-all duration-300" style="width: 80%"></div>
                      </div>
                    </div>
                    <div>
                      <div class="flex items-center justify-between mb-1">
                        <span class="text-sm text-gray-600">Design Systems</span>
                        <span class="text-sm font-medium text-gray-900">70%</span>
                      </div>
                      <div class="bg-gray-200 rounded-full h-2">
                        <div class="bg-yellow-500 rounded-full h-2 transition-all duration-300" style="width: 70%"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Recursos Completados y Pendientes -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="bg-green-50/60 p-3 rounded-lg backdrop-blur-sm border border-green-200/50">
                    <div class="flex items-center mb-2">
                      <CheckCircle class="h-4 w-4 text-green-600 mr-2" />
                      <span class="text-sm font-medium text-gray-900">Completado</span>
                    </div>
                    <p class="text-xs text-gray-600">Curso Liderazgo Creativo</p>
                    <p class="text-xs text-green-600">Certificado obtenido</p>
                  </div>
                  <div class="bg-blue-50/60 p-3 rounded-lg backdrop-blur-sm border border-blue-200/50">
                    <div class="flex items-center mb-2">
                      <Clock class="h-4 w-4 text-blue-600 mr-2" />
                      <span class="text-sm font-medium text-gray-900">En Progreso</span>
                    </div>
                    <p class="text-xs text-gray-600">Coaching Ejecutivo</p>
                    <p class="text-xs text-blue-600">Sesión 4/8</p>
                  </div>
                  <div class="bg-yellow-50/60 p-3 rounded-lg backdrop-blur-sm border border-yellow-200/50">
                    <div class="flex items-center mb-2">
                      <Calendar class="h-4 w-4 text-yellow-600 mr-2" />
                      <span class="text-sm font-medium text-gray-900">Próximo</span>
                    </div>
                    <p class="text-xs text-gray-600">Taller Design Systems</p>
                    <p class="text-xs text-yellow-600">Próxima semana</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Plantillas de Desarrollo -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Plantillas de Rutas de Carrera</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Plantilla Tech Lead -->
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300">
                <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Code class="h-6 w-6 text-blue-600" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Desarrollador → Tech Lead</h3>
                <p class="text-sm text-gray-600 mb-4">Ruta de 6-9 meses para desarrolladores senior</p>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center text-xs text-gray-600">
                    <CheckCircle class="h-3 w-3 text-green-500 mr-2" />
                    <span>Liderazgo Técnico</span>
                  </div>
                  <div class="flex items-center text-xs text-gray-600">
                    <CheckCircle class="h-3 w-3 text-green-500 mr-2" />
                    <span>Arquitectura de Software</span>
                  </div>
                  <div class="flex items-center text-xs text-gray-600">
                    <CheckCircle class="h-3 w-3 text-green-500 mr-2" />
                    <span>Gestión de Equipos</span>
                  </div>
                </div>
                <Button variant="outline" class="w-full text-sm">
                  Usar Plantilla
                </Button>
              </div>

              <!-- Plantilla Manager -->
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300">
                <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Users class="h-6 w-6 text-purple-600" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Especialista → Manager</h3>
                <p class="text-sm text-gray-600 mb-4">Transición a roles de gestión y liderazgo</p>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center text-xs text-gray-600">
                    <CheckCircle class="h-3 w-3 text-green-500 mr-2" />
                    <span>Liderazgo de Personas</span>
                  </div>
                  <div class="flex items-center text-xs text-gray-600">
                    <CheckCircle class="h-3 w-3 text-green-500 mr-2" />
                    <span>Gestión de Performance</span>
                  </div>
                  <div class="flex items-center text-xs text-gray-600">
                    <CheckCircle class="h-3 w-3 text-green-500 mr-2" />
                    <span>Comunicación Estratégica</span>
                  </div>
                </div>
                <Button variant="outline" class="w-full text-sm">
                  Usar Plantilla
                </Button>
              </div>

              <!-- Plantilla Senior Specialist -->
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300">
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Award class="h-6 w-6 text-green-600" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Junior → Senior Specialist</h3>
                <p class="text-sm text-gray-600 mb-4">Desarrollo de expertise técnica avanzada</p>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center text-xs text-gray-600">
                    <CheckCircle class="h-3 w-3 text-green-500 mr-2" />
                    <span>Expertise Técnica</span>
                  </div>
                  <div class="flex items-center text-xs text-gray-600">
                    <CheckCircle class="h-3 w-3 text-green-500 mr-2" />
                    <span>Mentoría Junior</span>
                  </div>
                  <div class="flex items-center text-xs text-gray-600">
                    <CheckCircle class="h-3 w-3 text-green-500 mr-2" />
                    <span>Innovación y R&D</span>
                  </div>
                </div>
                <Button variant="outline" class="w-full text-sm">
                  Usar Plantilla
                </Button>
              </div>
            </div>
          </div>

          <!-- Análisis de ROI del Desarrollo -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">ROI del Desarrollo Profesional</h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Métricas de Impacto -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Impacto en la Empresa</h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-green-50/60 rounded-lg backdrop-blur-sm border border-green-200/50">
                    <div class="flex items-center">
                      <TrendingUp class="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p class="text-sm font-semibold text-gray-900">Retención de Talento</p>
                        <p class="text-xs text-gray-600">Empleados con ruta de carrera</p>
                      </div>
                    </div>
                    <span class="text-lg font-bold text-green-600">+23%</span>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-blue-50/60 rounded-lg backdrop-blur-sm border border-blue-200/50">
                    <div class="flex items-center">
                      <Star class="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <p class="text-sm font-semibold text-gray-900">Satisfacción Laboral</p>
                        <p class="text-xs text-gray-600">Promedio empleados en desarrollo</p>
                      </div>
                    </div>
                    <span class="text-lg font-bold text-blue-600">4.7/5</span>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-purple-50/60 rounded-lg backdrop-blur-sm border border-purple-200/50">
                    <div class="flex items-center">
                      <Zap class="h-5 w-5 text-purple-600 mr-3" />
                      <div>
                        <p class="text-sm font-semibold text-gray-900">Productividad</p>
                        <p class="text-xs text-gray-600">Empleados en programas de desarrollo</p>
                      </div>
                    </div>
                    <span class="text-lg font-bold text-purple-600">+18%</span>
                  </div>
                </div>
              </div>

              <!-- Inversión vs Retorno -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Inversión vs Retorno</h3>
                <div class="space-y-4">
                  <div class="p-4 bg-gray-50/60 rounded-lg backdrop-blur-sm border border-gray-200/50">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm font-semibold text-gray-900">Inversión Total</span>
                      <span class="text-lg font-bold text-gray-900">€45,000</span>
                    </div>
                    <p class="text-xs text-gray-600">Cursos, coaching y recursos de desarrollo</p>
                  </div>
                  
                  <div class="p-4 bg-green-50/60 rounded-lg backdrop-blur-sm border border-green-200/50">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm font-semibold text-gray-900">Ahorro en Contratación</span>
                      <span class="text-lg font-bold text-green-600">€120,000</span>
                    </div>
                    <p class="text-xs text-gray-600">6 promociones internas vs contratación externa</p>
                  </div>
                  
                  <div class="p-4 bg-blue-50/60 rounded-lg backdrop-blur-sm border border-blue-200/50">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm font-semibold text-gray-900">ROI Total</span>
                      <span class="text-lg font-bold text-blue-600">267%</span>
                    </div>
                    <p class="text-xs text-gray-600">Retorno sobre inversión en desarrollo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Próximas Acciones Recomendadas -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Acciones Recomendadas</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <h3 class="text-lg font-medium text-gray-900">Empleados Listos para Promoción</h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-3 bg-green-50/60 rounded-lg backdrop-blur-sm border border-green-200/50">
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <UserCheck class="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-gray-900">Sofía López</p>
                        <p class="text-xs text-gray-600">Lista para Design Lead</p>
                      </div>
                    </div>
                    <Button variant="primary" class="text-xs px-3 py-1">
                      Revisar
                    </Button>
                  </div>
                  
                  <div class="flex items-center justify-between p-3 bg-yellow-50/60 rounded-lg backdrop-blur-sm border border-yellow-200/50">
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <UserCheck class="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-gray-900">Carmen García</p>
                        <p class="text-xs text-gray-600">Candidata a HR Manager</p>
                      </div>
                    </div>
                    <Button variant="outline" class="text-xs px-3 py-1">
                      Evaluar
                    </Button>
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <h3 class="text-lg font-medium text-gray-900">Empleados en Riesgo</h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-3 bg-red-50/60 rounded-lg backdrop-blur-sm border border-red-200/50">
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <AlertTriangle class="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-gray-900">David Ruiz</p>
                        <p class="text-xs text-gray-600">Sin ruta de carrera definida</p>
                      </div>
                    </div>
                    <Button variant="primary" class="text-xs px-3 py-1">
                      Crear Plan
                    </Button>
                  </div>
                  
                  <div class="flex items-center justify-between p-3 bg-orange-50/60 rounded-lg backdrop-blur-sm border border-orange-200/50">
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Clock class="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-gray-900">Roberto Díaz</p>
                        <p class="text-xs text-gray-600">Plan estancado hace 2 meses</p>
                      </div>
                    </div>
                    <Button variant="outline" class="text-xs px-3 py-1">
                      Revisar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Gamificación y Reconocimiento View -->
        <div v-if="activeView === 'gamificacion'" class="space-y-8">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Gamificación y Reconocimiento</h1>
              <p class="text-gray-600 mt-1">Fomenta una cultura de bienestar positiva y colaborativa</p>
            </div>
            <div class="flex gap-2">
              <Button variant="primary">
                <Plus class="h-4 w-4 mr-2" />
                Crear Desafío de Equipo
              </Button>
              <Button variant="secondary">
                <Award class="h-4 w-4 mr-2" />
                Gestionar Recompensas
              </Button>
            </div>
          </div>

          <!-- Métricas de Engagement -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <h3 class="text-2xl font-bold text-primary mb-2">94%</h3>
              <p class="text-gray-600">Participación Activa</p>
              <p class="text-xs text-gray-500 mt-1">+15% este mes</p>
            </div>
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <h3 class="text-2xl font-bold text-yellow-600 mb-2">156</h3>
              <p class="text-gray-600">Logros Desbloqueados</p>
              <p class="text-xs text-gray-500 mt-1">Esta semana</p>
            </div>
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <h3 class="text-2xl font-bold text-green-600 mb-2">8</h3>
              <p class="text-gray-600">Desafíos de Equipo</p>
              <p class="text-xs text-gray-500 mt-1">Activos</p>
            </div>
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <h3 class="text-2xl font-bold text-purple-600 mb-2">4.8</h3>
              <p class="text-gray-600">Satisfacción Sistema</p>
              <p class="text-xs text-gray-500 mt-1">Promedio empleados</p>
            </div>
          </div>

          <!-- Muro de Reconocimiento -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-gray-900 flex items-center">
                <Sparkles class="h-5 w-5 mr-2 text-yellow-500" />
                Muro de Reconocimiento
              </h2>
              <Button variant="outline" class="text-sm">
                <Plus class="h-4 w-4 mr-2" />
                Crear Reconocimiento
              </Button>
            </div>
            
            <div class="space-y-4">
              <!-- Reconocimiento Destacado -->
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-yellow-300/30 bg-gradient-to-r from-yellow-50/60 to-orange-50/60">
                <div class="flex items-start space-x-4">
                  <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                    <Trophy class="h-8 w-8 text-white" />
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-2">
                      <h3 class="text-lg font-bold text-gray-900">¡Logro Épico Desbloqueado!</h3>
                      <span class="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-bold">ÉPICO</span>
                    </div>
                    <p class="text-gray-700 mb-2">
                      <strong>Ana Martínez</strong> completó el desafío "Mes sin Estrés" - 30 días consecutivos de actividades de bienestar
                    </p>
                    <div class="flex items-center space-x-4 text-sm text-gray-600">
                      <span class="flex items-center">
                        <Star class="h-4 w-4 text-yellow-500 mr-1" />
                        +500 puntos
                      </span>
                      <span class="flex items-center">
                        <Heart class="h-4 w-4 text-red-500 mr-1" />
                        23 reacciones
                      </span>
                      <span>Hace 2 horas</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Reconocimientos Recientes -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20">
                  <div class="flex items-center space-x-3 mb-3">
                    <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <CheckCircle class="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900">Sofía López</h4>
                      <p class="text-sm text-gray-600">Completó "Desafío Hidratación"</p>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-500">Hace 4 horas</span>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">+100 puntos</span>
                  </div>
                </div>

                <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20">
                  <div class="flex items-center space-x-3 mb-3">
                    <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Users class="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900">Equipo Desarrollo</h4>
                      <p class="text-sm text-gray-600">Ganó desafío "Yoga en Equipo"</p>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-500">Ayer</span>
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Desayuno equipo</span>
                  </div>
                </div>

                <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20">
                  <div class="flex items-center space-x-3 mb-3">
                    <div class="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Star class="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900">Luis Fernández</h4>
                      <p class="text-sm text-gray-600">Alcanzó nivel "Maestro del Bienestar"</p>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-500">Hace 2 días</span>
                    <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Nivel 5</span>
                  </div>
                </div>

                <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20">
                  <div class="flex items-center space-x-3 mb-3">
                    <div class="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Award class="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900">Carmen García</h4>
                      <p class="text-sm text-gray-600">Certificado en "Mindfulness Avanzado"</p>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-500">Hace 3 días</span>
                    <span class="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Certificado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Desafíos de Equipo Activos -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-gray-900 flex items-center">
                <Users class="h-5 w-5 mr-2 text-primary" />
                Desafíos de Equipo
              </h2>
              <Button variant="primary" class="text-sm">
                <Plus class="h-4 w-4 mr-2" />
                Crear Desafío
              </Button>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Desafío Meditación por Departamentos -->
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">Batalla de Meditación</h3>
                    <p class="text-sm text-gray-600">Primer departamento en 50 sesiones gana</p>
                  </div>
                  <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Activo</span>
                </div>
                
                <div class="space-y-3 mb-4">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                      <div class="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span class="text-white text-xs font-bold">1</span>
                      </div>
                      <span class="text-sm font-medium text-gray-900">Desarrollo</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <div class="bg-gray-200 rounded-full h-2 w-24">
                        <div class="bg-blue-500 rounded-full h-2" style="width: 84%"></div>
                      </div>
                      <span class="text-sm font-bold text-blue-600">42/50</span>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                      <div class="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center">
                        <span class="text-white text-xs font-bold">2</span>
                      </div>
                      <span class="text-sm font-medium text-gray-900">Marketing</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <div class="bg-gray-200 rounded-full h-2 w-24">
                        <div class="bg-green-500 rounded-full h-2" style="width: 78%"></div>
                      </div>
                      <span class="text-sm font-bold text-green-600">39/50</span>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                      <div class="w-6 h-6 bg-yellow-500 rounded-lg flex items-center justify-center">
                        <span class="text-white text-xs font-bold">3</span>
                      </div>
                      <span class="text-sm font-medium text-gray-900">Ventas</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <div class="bg-gray-200 rounded-full h-2 w-24">
                        <div class="bg-yellow-500 rounded-full h-2" style="width: 66%"></div>
                      </div>
                      <span class="text-sm font-bold text-yellow-600">33/50</span>
                    </div>
                  </div>
                </div>
                
                <div class="bg-yellow-50/60 p-3 rounded-lg backdrop-blur-sm border border-yellow-200/50">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-900">Premio:</span>
                    <span class="text-sm text-yellow-700 font-semibold">🥐 Desayuno Premium para el Equipo</span>
                  </div>
                  <p class="text-xs text-gray-600 mt-1">Termina en 12 días</p>
                </div>
              </div>

              <!-- Desafío Pasos Colaborativo -->
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">Maratón de Pasos Corporativo</h3>
                    <p class="text-sm text-gray-600">Meta: 1 millón de pasos como empresa</p>
                  </div>
                  <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Activo</span>
                </div>
                
                <div class="mb-4">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-gray-900">Progreso Total</span>
                    <span class="text-sm font-bold text-primary">847,392 / 1,000,000</span>
                  </div>
                  <div class="bg-gray-200 rounded-full h-3">
                    <div class="bg-gradient-to-r from-primary to-secondary rounded-full h-3 transition-all duration-500" style="width: 84.7%"></div>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">84.7% completado • 152,608 pasos restantes</p>
                </div>
                
                <div class="bg-green-50/60 p-3 rounded-lg backdrop-blur-sm border border-green-200/50">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-900">Premio:</span>
                    <span class="text-sm text-green-700 font-semibold">🎉 Día Libre Extra para Todos</span>
                  </div>
                  <p class="text-xs text-gray-600 mt-1">Termina en 8 días</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Ranking de Equipos -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Ranking de Equipos por Bienestar</h2>
            <div class="space-y-4">
              <!-- Primer Lugar -->
              <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-yellow-300/30 bg-gradient-to-r from-yellow-50/60 to-yellow-100/60">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
                      <span class="text-white font-bold">1</span>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">Equipo Desarrollo</h3>
                      <p class="text-sm text-gray-600">8 miembros • 95% participación</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-2xl font-bold text-yellow-600">2,840</p>
                    <p class="text-xs text-gray-500">puntos este mes</p>
                  </div>
                </div>
              </div>

              <!-- Segundo Lugar -->
              <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-gray-300/30">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl flex items-center justify-center">
                      <span class="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">Equipo Marketing</h3>
                      <p class="text-sm text-gray-600">6 miembros • 88% participación</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-2xl font-bold text-gray-600">2,650</p>
                    <p class="text-xs text-gray-500">puntos este mes</p>
                  </div>
                </div>
              </div>

              <!-- Tercer Lugar -->
              <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-orange-300/30">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
                      <span class="text-white font-bold">3</span>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">Equipo Ventas</h3>
                      <p class="text-sm text-gray-600">10 miembros • 82% participación</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-2xl font-bold text-orange-600">2,420</p>
                    <p class="text-xs text-gray-500">puntos este mes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Catálogo de Recompensas Experienciales -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-gray-900 flex items-center">
                <Gift class="h-5 w-5 mr-2 text-primary" />
                Catálogo de Recompensas Experienciales
              </h2>
              <Button variant="outline" class="text-sm">
                <Plus class="h-4 w-4 mr-2" />
                Añadir Recompensa
              </Button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Recompensas de Tiempo -->
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300">
                <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Calendar class="h-6 w-6 text-blue-600" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Tiempo Libre</h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-2 bg-blue-50/60 rounded-lg">
                    <span class="text-sm text-gray-700">Día libre extra</span>
                    <span class="text-sm font-bold text-blue-600">1,500 pts</span>
                  </div>
                  <div class="flex items-center justify-between p-2 bg-blue-50/60 rounded-lg">
                    <span class="text-sm text-gray-700">Tarde libre viernes</span>
                    <span class="text-sm font-bold text-blue-600">800 pts</span>
                  </div>
                  <div class="flex items-center justify-between p-2 bg-blue-50/60 rounded-lg">
                    <span class="text-sm text-gray-700">Llegada tarde lunes</span>
                    <span class="text-sm font-bold text-blue-600">400 pts</span>
                  </div>
                </div>
              </div>

              <!-- Recompensas de Experiencias -->
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300">
                <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Star class="h-6 w-6 text-purple-600" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Experiencias VIP</h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-2 bg-purple-50/60 rounded-lg">
                    <span class="text-sm text-gray-700">Coaching con CEO</span>
                    <span class="text-sm font-bold text-purple-600">3,000 pts</span>
                  </div>
                  <div class="flex items-center justify-between p-2 bg-purple-50/60 rounded-lg">
                    <span class="text-sm text-gray-700">Almuerzo con directivos</span>
                    <span class="text-sm font-bold text-purple-600">2,000 pts</span>
                  </div>
                  <div class="flex items-center justify-between p-2 bg-purple-50/60 rounded-lg">
                    <span class="text-sm text-gray-700">Mentoría con líder</span>
                    <span class="text-sm font-bold text-purple-600">1,800 pts</span>
                  </div>
                </div>
              </div>

              <!-- Recompensas de Bienestar -->
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300">
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Heart class="h-6 w-6 text-green-600" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Bienestar Premium</h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-2 bg-green-50/60 rounded-lg">
                    <span class="text-sm text-gray-700">Masaje relajante</span>
                    <span class="text-sm font-bold text-green-600">1,200 pts</span>
                  </div>
                  <div class="flex items-center justify-between p-2 bg-green-50/60 rounded-lg">
                    <span class="text-sm text-gray-700">Sesión spa</span>
                    <span class="text-sm font-bold text-green-600">2,500 pts</span>
                  </div>
                  <div class="flex items-center justify-between p-2 bg-green-50/60 rounded-lg">
                    <span class="text-sm text-gray-700">Kit bienestar</span>
                    <span class="text-sm font-bold text-green-600">600 pts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sistema de Niveles y Logros -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Sistema de Niveles y Logros</h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Niveles de Bienestar -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Niveles de Bienestar</h3>
                <div class="space-y-4">
                  <div class="flex items-center space-x-4 p-4 bg-green-50/60 rounded-lg backdrop-blur-sm border border-green-200/50">
                    <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                      <span class="text-white font-bold text-sm">5</span>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-semibold text-gray-900">Maestro del Bienestar</h4>
                      <p class="text-sm text-gray-600">2,500+ puntos</p>
                      <div class="flex items-center mt-1">
                        <span class="text-xs text-green-600 font-medium">3 empleados</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-4 p-4 bg-blue-50/60 rounded-lg backdrop-blur-sm border border-blue-200/50">
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                      <span class="text-white font-bold text-sm">4</span>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-semibold text-gray-900">Experto en Bienestar</h4>
                      <p class="text-sm text-gray-600">1,500 - 2,499 puntos</p>
                      <div class="flex items-center mt-1">
                        <span class="text-xs text-blue-600 font-medium">7 empleados</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-4 p-4 bg-purple-50/60 rounded-lg backdrop-blur-sm border border-purple-200/50">
                    <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                      <span class="text-white font-bold text-sm">3</span>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-semibold text-gray-900">Entusiasta del Bienestar</h4>
                      <p class="text-sm text-gray-600">800 - 1,499 puntos</p>
                      <div class="flex items-center mt-1">
                        <span class="text-xs text-purple-600 font-medium">12 empleados</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Logros Especiales -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Logros Especiales</h3>
                <div class="grid grid-cols-2 gap-3">
                  <div class="text-center p-3 bg-yellow-50/60 rounded-lg backdrop-blur-sm border border-yellow-200/50">
                    <div class="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Trophy class="h-4 w-4 text-white" />
                    </div>
                    <p class="text-xs font-semibold text-gray-900">Racha Perfecta</p>
                    <p class="text-xs text-gray-600">30 días consecutivos</p>
                    <p class="text-xs text-yellow-600 font-medium">5 empleados</p>
                  </div>
                  
                  <div class="text-center p-3 bg-blue-50/60 rounded-lg backdrop-blur-sm border border-blue-200/50">
                    <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Users class="h-4 w-4 text-white" />
                    </div>
                    <p class="text-xs font-semibold text-gray-900">Líder de Equipo</p>
                    <p class="text-xs text-gray-600">Motivó a su equipo</p>
                    <p class="text-xs text-blue-600 font-medium">8 empleados</p>
                  </div>
                  
                  <div class="text-center p-3 bg-purple-50/60 rounded-lg backdrop-blur-sm border border-purple-200/50">
                    <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Brain class="h-4 w-4 text-white" />
                    </div>
                    <p class="text-xs font-semibold text-gray-900">Zen Master</p>
                    <p class="text-xs text-gray-600">50 sesiones meditación</p>
                    <p class="text-xs text-purple-600 font-medium">2 empleados</p>
                  </div>
                  
                  <div class="text-center p-3 bg-green-50/60 rounded-lg backdrop-blur-sm border border-green-200/50">
                    <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Heart class="h-4 w-4 text-white" />
                    </div>
                    <p class="text-xs font-semibold text-gray-900">Embajador</p>
                    <p class="text-xs text-gray-600">Invitó 5+ colegas</p>
                    <p class="text-xs text-green-600 font-medium">4 empleados</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Configuración de Gamificación -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Configuración del Sistema</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Configuración de Puntos -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Sistema de Puntos</h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-3 bg-gray-50/60 rounded-lg backdrop-blur-sm border border-gray-200/50">
                    <span class="text-sm text-gray-700">Asistir a sesión</span>
                    <div class="flex items-center space-x-2">
                      <input type="number" value="50" class="w-16 px-2 py-1 text-xs border border-gray-300 rounded" />
                      <span class="text-xs text-gray-500">puntos</span>
                    </div>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-gray-50/60 rounded-lg backdrop-blur-sm border border-gray-200/50">
                    <span class="text-sm text-gray-700">Completar desafío</span>
                    <div class="flex items-center space-x-2">
                      <input type="number" value="100" class="w-16 px-2 py-1 text-xs border border-gray-300 rounded" />
                      <span class="text-xs text-gray-500">puntos</span>
                    </div>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-gray-50/60 rounded-lg backdrop-blur-sm border border-gray-200/50">
                    <span class="text-sm text-gray-700">Completar encuesta</span>
                    <div class="flex items-center space-x-2">
                      <input type="number" value="25" class="w-16 px-2 py-1 text-xs border border-gray-300 rounded" />
                      <span class="text-xs text-gray-500">puntos</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Configuración de Reconocimientos -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Reconocimientos Automáticos</h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-3 bg-gray-50/60 rounded-lg backdrop-blur-sm border border-gray-200/50">
                    <div>
                      <span class="text-sm text-gray-700">Racha de 7 días</span>
                      <p class="text-xs text-gray-500">Publicar automáticamente</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked class="sr-only peer" />
                      <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-gray-50/60 rounded-lg backdrop-blur-sm border border-gray-200/50">
                    <div>
                      <span class="text-sm text-gray-700">Nuevo nivel alcanzado</span>
                      <p class="text-xs text-gray-500">Notificar a toda la empresa</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked class="sr-only peer" />
                      <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-gray-50/60 rounded-lg backdrop-blur-sm border border-gray-200/50">
                    <div>
                      <span class="text-sm text-gray-700">Desafío completado</span>
                      <p class="text-xs text-gray-500">Celebrar públicamente</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked class="sr-only peer" />
                      <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Análisis de Engagement -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Análisis de Engagement</h2>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Participación por Departamento -->
              <div class="lg:col-span-2">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Participación por Departamento</h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-700">Desarrollo</span>
                    <div class="flex items-center space-x-2">
                      <div class="bg-gray-200 rounded-full h-2 w-32">
                        <div class="bg-blue-500 rounded-full h-2" style="width: 95%"></div>
                      </div>
                      <span class="text-sm font-bold text-blue-600">95%</span>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-700">Marketing</span>
                    <div class="flex items-center space-x-2">
                      <div class="bg-gray-200 rounded-full h-2 w-32">
                        <div class="bg-green-500 rounded-full h-2" style="width: 88%"></div>
                      </div>
                      <span class="text-sm font-bold text-green-600">88%</span>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-700">Ventas</span>
                    <div class="flex items-center space-x-2">
                      <div class="bg-gray-200 rounded-full h-2 w-32">
                        <div class="bg-yellow-500 rounded-full h-2" style="width: 82%"></div>
                      </div>
                      <span class="text-sm font-bold text-yellow-600">82%</span>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-700">RRHH</span>
                    <div class="flex items-center space-x-2">
                      <div class="bg-gray-200 rounded-full h-2 w-32">
                        <div class="bg-purple-500 rounded-full h-2" style="width: 78%"></div>
                      </div>
                      <span class="text-sm font-bold text-purple-600">78%</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Top Performers -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Top Performers</h3>
                <div class="space-y-3">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                      <span class="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p class="text-sm font-semibold text-gray-900">Ana Martínez</p>
                      <p class="text-xs text-gray-600">2,840 puntos</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center">
                      <span class="text-white text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p class="text-sm font-semibold text-gray-900">Luis Fernández</p>
                      <p class="text-xs text-gray-600">2,650 puntos</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                      <span class="text-white text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p class="text-sm font-semibold text-gray-900">Sofía López</p>
                      <p class="text-xs text-gray-600">2,420 puntos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Analítica Predictiva View -->
        <div v-if="activeView === 'analitica'" class="space-y-8">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Analítica Predictiva de Bienestar</h1>
              <p class="text-gray-600 mt-1">Anticipa problemas y prevé riesgos de burnout antes de que ocurran</p>
            </div>
            <div class="flex gap-2">
              <Button variant="primary">
                <Settings class="h-4 w-4 mr-2" />
                Configurar Alertas
              </Button>
              <Button variant="secondary">
                <Download class="h-4 w-4 mr-2" />
                Exportar Reporte
              </Button>
            </div>
          </div>

          <!-- Alertas Críticas -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-red-300/30 bg-red-50/20">
            <div class="flex items-center mb-6">
              <AlertTriangle class="h-6 w-6 text-red-500 mr-3" />
              <h2 class="text-xl font-semibold text-gray-900">Alertas Críticas</h2>
              <span class="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-3">3 Activas</span>
            </div>
            
            <div class="space-y-4">
              <!-- Alerta Crítica - Equipo Ventas -->
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-red-300/30 bg-red-50/40">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                      <AlertTriangle class="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">Riesgo Alto de Burnout - Equipo Ventas</h3>
                      <p class="text-sm text-gray-600">Detectado hace 2 días</p>
                      <div class="flex items-center space-x-4 mt-2">
                        <span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Crítico</span>
                        <span class="text-xs text-gray-500">Confianza: 94%</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="primary" class="text-sm bg-red-600 hover:bg-red-700">
                    Intervenir Ahora
                  </Button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div class="bg-white/60 p-3 rounded-lg backdrop-blur-sm border border-red-200/50">
                    <div class="flex items-center mb-2">
                      <TrendingDown class="h-4 w-4 text-red-600 mr-2" />
                      <span class="text-sm font-medium text-gray-900">Participación</span>
                    </div>
                    <p class="text-lg font-bold text-red-600">-35%</p>
                    <p class="text-xs text-gray-600">Últimas 2 semanas</p>
                  </div>
                  <div class="bg-white/60 p-3 rounded-lg backdrop-blur-sm border border-red-200/50">
                    <div class="flex items-center mb-2">
                      <Frown class="h-4 w-4 text-red-600 mr-2" />
                      <span class="text-sm font-medium text-gray-900">Satisfacción</span>
                    </div>
                    <p class="text-lg font-bold text-red-600">2.1/5</p>
                    <p class="text-xs text-gray-600">Última encuesta</p>
                  </div>
                  <div class="bg-white/60 p-3 rounded-lg backdrop-blur-sm border border-red-200/50">
                    <div class="flex items-center mb-2">
                      <Clock class="h-4 w-4 text-red-600 mr-2" />
                      <span class="text-sm font-medium text-gray-900">Horas Extra</span>
                    </div>
                    <p class="text-lg font-bold text-red-600">+28%</p>
                    <p class="text-xs text-gray-600">Este mes</p>
                  </div>
                </div>
                
                <div class="bg-red-100/60 p-4 rounded-lg backdrop-blur-sm border border-red-200/50">
                  <h4 class="text-sm font-semibold text-gray-900 mb-2">Acciones Recomendadas:</h4>
                  <ul class="text-sm text-gray-700 space-y-1">
                    <li>• Reunión urgente con manager del equipo</li>
                    <li>• Sesiones de coaching grupal inmediatas</li>
                    <li>• Revisar carga de trabajo y redistribuir</li>
                    <li>• Implementar días de bienestar mental</li>
                  </ul>
                </div>
              </div>

              <!-- Alerta Moderada - David Ruiz -->
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-yellow-300/30 bg-yellow-50/40">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                      <AlertTriangle class="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">Riesgo Moderado - David Ruiz</h3>
                      <p class="text-sm text-gray-600">Patrón detectado hace 5 días</p>
                      <div class="flex items-center space-x-4 mt-2">
                        <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Moderado</span>
                        <span class="text-xs text-gray-500">Confianza: 78%</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" class="text-sm">
                    Revisar Caso
                  </Button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div class="bg-white/60 p-3 rounded-lg backdrop-blur-sm border border-yellow-200/50">
                    <div class="flex items-center mb-2">
                      <TrendingDown class="h-4 w-4 text-yellow-600 mr-2" />
                      <span class="text-sm font-medium text-gray-900">Actividad</span>
                    </div>
                    <p class="text-lg font-bold text-yellow-600">-22%</p>
                    <p class="text-xs text-gray-600">Últimas 3 semanas</p>
                  </div>
                  <div class="bg-white/60 p-3 rounded-lg backdrop-blur-sm border border-yellow-200/50">
                    <div class="flex items-center mb-2">
                      <Calendar class="h-4 w-4 text-yellow-600 mr-2" />
                      <span class="text-sm font-medium text-gray-900">Ausencias</span>
                    </div>
                    <p class="text-lg font-bold text-yellow-600">3</p>
                    <p class="text-xs text-gray-600">Sesiones canceladas</p>
                  </div>
                  <div class="bg-white/60 p-3 rounded-lg backdrop-blur-sm border border-yellow-200/50">
                    <div class="flex items-center mb-2">
                      <MessageCircle class="h-4 w-4 text-yellow-600 mr-2" />
                      <span class="text-sm font-medium text-gray-900">Feedback</span>
                    </div>
                    <p class="text-lg font-bold text-yellow-600">3.2/5</p>
                    <p class="text-xs text-gray-600">Última evaluación</p>
                  </div>
                </div>
                
                <div class="bg-yellow-100/60 p-4 rounded-lg backdrop-blur-sm border border-yellow-200/50">
                  <h4 class="text-sm font-semibold text-gray-900 mb-2">Acciones Sugeridas:</h4>
                  <ul class="text-sm text-gray-700 space-y-1">
                    <li>• Check-in personal con el empleado</li>
                    <li>• Ofrecer sesiones de coaching individual</li>
                    <li>• Revisar carga de trabajo actual</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Dashboard Predictivo -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Métricas Predictivas -->
            <div class="lg:col-span-2 glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold mb-6">Tendencias y Predicciones</h2>
              
              <!-- Gráfico de Tendencias -->
              <div class="mb-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Índice de Bienestar por Departamento</h3>
                <div class="space-y-4">
                  <!-- Desarrollo - Tendencia Positiva -->
                  <div class="p-4 bg-green-50/60 rounded-lg backdrop-blur-sm border border-green-200/50">
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <TrendingUp class="h-4 w-4 text-white" />
                        </div>
                        <span class="font-semibold text-gray-900">Desarrollo</span>
                      </div>
                      <span class="text-lg font-bold text-green-600">8.7/10</span>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2 mb-2">
                      <div class="bg-green-500 rounded-full h-2" style="width: 87%"></div>
                    </div>
                    <div class="flex items-center justify-between text-xs">
                      <span class="text-green-600 font-medium">↗ Tendencia positiva</span>
                      <span class="text-gray-500">Predicción: Estable</span>
                    </div>
                  </div>

                  <!-- Marketing - Tendencia Estable -->
                  <div class="p-4 bg-blue-50/60 rounded-lg backdrop-blur-sm border border-blue-200/50">
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Minus class="h-4 w-4 text-white" />
                        </div>
                        <span class="font-semibold text-gray-900">Marketing</span>
                      </div>
                      <span class="text-lg font-bold text-blue-600">7.2/10</span>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2 mb-2">
                      <div class="bg-blue-500 rounded-full h-2" style="width: 72%"></div>
                    </div>
                    <div class="flex items-center justify-between text-xs">
                      <span class="text-blue-600 font-medium">→ Tendencia estable</span>
                      <span class="text-gray-500">Predicción: Mantener</span>
                    </div>
                  </div>

                  <!-- Ventas - Tendencia Negativa -->
                  <div class="p-4 bg-red-50/60 rounded-lg backdrop-blur-sm border border-red-200/50">
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                          <TrendingDown class="h-4 w-4 text-white" />
                        </div>
                        <span class="font-semibold text-gray-900">Ventas</span>
                      </div>
                      <span class="text-lg font-bold text-red-600">5.8/10</span>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2 mb-2">
                      <div class="bg-red-500 rounded-full h-2" style="width: 58%"></div>
                    </div>
                    <div class="flex items-center justify-between text-xs">
                      <span class="text-red-600 font-medium">↘ Tendencia negativa</span>
                      <span class="text-gray-500">Predicción: Riesgo alto</span>
                    </div>
                  </div>

                  <!-- RRHH - Tendencia Positiva -->
                  <div class="p-4 bg-purple-50/60 rounded-lg backdrop-blur-sm border border-purple-200/50">
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                          <TrendingUp class="h-4 w-4 text-white" />
                        </div>
                        <span class="font-semibold text-gray-900">RRHH</span>
                      </div>
                      <span class="text-lg font-bold text-purple-600">7.9/10</span>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2 mb-2">
                      <div class="bg-purple-500 rounded-full h-2" style="width: 79%"></div>
                    </div>
                    <div class="flex items-center justify-between text-xs">
                      <span class="text-purple-600 font-medium">↗ Tendencia positiva</span>
                      <span class="text-gray-500">Predicción: Mejorando</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Panel de Alertas -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold mb-6">Centro de Alertas Inteligentes</h2>
              <div class="space-y-4">
                <!-- Alerta de Patrón -->
                <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-orange-300/30 bg-orange-50/40">
                  <div class="flex items-start space-x-4">
                    <div class="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                      <Brain class="h-5 w-5 text-white" />
                    </div>
                    <div class="flex-1">
                      <h4 class="font-semibold text-gray-900">Patrón de Estrés Detectado</h4>
                      <p class="text-sm text-gray-600 mb-2">
                        El departamento de Marketing muestra signos de fatiga. Participación en actividades de relajación aumentó 40% mientras que actividades físicas disminuyeron 25%.
                      </p>
                      <div class="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Detectado: Hace 1 día</span>
                        <span>Confianza: 82%</span>
                        <span class="bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Patrón</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Alerta de Engagement -->
                <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-blue-300/30 bg-blue-50/40">
                  <div class="flex items-start space-x-4">
                    <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                      <TrendingDown class="h-5 w-5 text-white" />
                    </div>
                    <div class="flex-1">
                      <h4 class="font-semibold text-gray-900">Disminución de Engagement</h4>
                      <p class="text-sm text-gray-600 mb-2">
                        3 empleados del equipo de RRHH han reducido su participación en un 30% en las últimas 2 semanas. Posible sobrecarga de trabajo.
                      </p>
                      <div class="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Detectado: Hace 3 días</span>
                        <span>Confianza: 71%</span>
                        <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Engagement</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Alerta Positiva -->
                <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-green-300/30 bg-green-50/40">
                  <div class="flex items-start space-x-4">
                    <div class="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                      <TrendingUp class="h-5 w-5 text-white" />
                    </div>
                    <div class="flex-1">
                      <h4 class="font-semibold text-gray-900">Mejora Significativa Detectada</h4>
                      <p class="text-sm text-gray-600 mb-2">
                        El equipo de Desarrollo muestra una mejora del 45% en bienestar general tras implementar las sesiones de yoga matutino.
                      </p>
                      <div class="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Detectado: Hace 1 hora</span>
                        <span>Confianza: 96%</span>
                        <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full">Positivo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Análisis de Factores de Riesgo -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Análisis de Factores de Riesgo</h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Factores de Riesgo Identificados -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Factores de Riesgo Principales</h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-red-50/60 rounded-lg backdrop-blur-sm border border-red-200/50">
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                        <Clock class="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-gray-900">Sobrecarga de Trabajo</p>
                        <p class="text-xs text-gray-600">Horas extra excesivas</p>
                      </div>
                    </div>
                    <span class="text-sm font-bold text-red-600">Alto</span>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-yellow-50/60 rounded-lg backdrop-blur-sm border border-yellow-200/50">
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                        <Users class="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-gray-900">Aislamiento Social</p>
                        <p class="text-xs text-gray-600">Baja participación grupal</p>
                      </div>
                    </div>
                    <span class="text-sm font-bold text-yellow-600">Medio</span>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-orange-50/60 rounded-lg backdrop-blur-sm border border-orange-200/50">
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                        <Frown class="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-gray-900">Feedback Negativo</p>
                        <p class="text-xs text-gray-600">Satisfacción decreciente</p>
                      </div>
                    </div>
                    <span class="text-sm font-bold text-orange-600">Medio</span>
                  </div>
                </div>
              </div>

              <!-- Factores Protectores -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Factores Protectores</h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-green-50/60 rounded-lg backdrop-blur-sm border border-green-200/50">
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <Heart class="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-gray-900">Participación Activa</p>
                        <p class="text-xs text-gray-600">Engagement alto</p>
                      </div>
                    </div>
                    <span class="text-sm font-bold text-green-600">Fuerte</span>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-blue-50/60 rounded-lg backdrop-blur-sm border border-blue-200/50">
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Users class="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-gray-900">Apoyo Social</p>
                        <p class="text-xs text-gray-600">Actividades grupales</p>
                      </div>
                    </div>
                    <span class="text-sm font-bold text-blue-600">Fuerte</span>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-purple-50/60 rounded-lg backdrop-blur-sm border border-purple-200/50">
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <TrendingUp class="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-gray-900">Desarrollo Personal</p>
                        <p class="text-xs text-gray-600">Rutas de carrera activas</p>
                      </div>
                    </div>
                    <span class="text-sm font-bold text-purple-600">Fuerte</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Predicciones y Recomendaciones -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Predicciones y Recomendaciones IA</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Predicciones -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Predicciones para los Próximos 30 Días</h3>
                <div class="space-y-4">
                  <div class="p-4 bg-red-50/60 rounded-lg backdrop-blur-sm border border-red-200/50">
                    <div class="flex items-center space-x-3 mb-2">
                      <AlertTriangle class="h-5 w-5 text-red-500" />
                      <h4 class="font-semibold text-gray-900">Riesgo de Burnout</h4>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">
                      El equipo de Ventas tiene un 78% de probabilidad de experimentar burnout si continúan las tendencias actuales.
                    </p>
                    <p class="text-xs text-red-600 font-medium">Acción requerida en 7 días</p>
                  </div>
                  
                  <div class="p-4 bg-yellow-50/60 rounded-lg backdrop-blur-sm border border-yellow-200/50">
                    <div class="flex items-center space-x-3 mb-2">
                      <TrendingDown class="h-5 w-5 text-yellow-500" />
                      <h4 class="font-semibold text-gray-900">Disminución de Participación</h4>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">
                      Se prevé una disminución del 15% en la participación general si no se implementan nuevas actividades.
                    </p>
                    <p class="text-xs text-yellow-600 font-medium">Monitorear de cerca</p>
                  </div>
                  
                  <div class="p-4 bg-green-50/60 rounded-lg backdrop-blur-sm border border-green-200/50">
                    <div class="flex items-center space-x-3 mb-2">
                      <TrendingUp class="h-5 w-5 text-green-500" />
                      <h4 class="font-semibold text-gray-900">Mejora Continua</h4>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">
                      El equipo de Desarrollo mantendrá su alto nivel de bienestar con 92% de probabilidad.
                    </p>
                    <p class="text-xs text-green-600 font-medium">Mantener estrategia actual</p>
                  </div>
                </div>
              </div>

              <!-- Recomendaciones IA -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Recomendaciones Inteligentes</h3>
                <div class="space-y-4">
                  <div class="p-4 bg-blue-50/60 rounded-lg backdrop-blur-sm border border-blue-200/50">
                    <div class="flex items-center space-x-3 mb-2">
                      <Lightbulb class="h-5 w-5 text-blue-500" />
                      <h4 class="font-semibold text-gray-900">Intervención Inmediata</h4>
                    </div>
                    <p class="text-sm text-gray-600 mb-3">
                      Implementar "Viernes de Bienestar" para el equipo de Ventas: sesiones de relajación obligatorias y reducción de reuniones.
                    </p>
                    <Button variant="primary" class="w-full text-sm">
                      Implementar Ahora
                    </Button>
                  </div>
                  
                  <div class="p-4 bg-purple-50/60 rounded-lg backdrop-blur-sm border border-purple-200/50">
                    <div class="flex items-center space-x-3 mb-2">
                      <Target class="h-5 w-5 text-purple-500" />
                      <h4 class="font-semibold text-gray-900">Optimización</h4>
                    </div>
                    <p class="text-sm text-gray-600 mb-3">
                      Crear desafío colaborativo entre Marketing y RRHH para aumentar la cohesión interdepartamental.
                    </p>
                    <Button variant="outline" class="w-full text-sm">
                      Crear Desafío
                    </Button>
                  </div>
                  
                  <div class="p-4 bg-green-50/60 rounded-lg backdrop-blur-sm border border-green-200/50">
                    <div class="flex items-center space-x-3 mb-2">
                      <Award class="h-5 w-5 text-green-500" />
                      <h4 class="font-semibold text-gray-900">Reconocimiento</h4>
                    </div>
                    <p class="text-sm text-gray-600 mb-3">
                      Destacar públicamente los logros del equipo de Desarrollo para motivar a otros departamentos.
                    </p>
                    <Button variant="outline" class="w-full text-sm">
                      Crear Reconocimiento
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Configuración de Algoritmos -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Configuración de Algoritmos Predictivos</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Sensibilidad de Alertas -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Sensibilidad de Alertas</h3>
                <div class="space-y-4">
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm text-gray-700">Alertas de Burnout</span>
                      <span class="text-sm font-medium text-gray-900">Alta</span>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2">
                      <div class="bg-red-500 rounded-full h-2" style="width: 80%"></div>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Detectar riesgos temprano</p>
                  </div>
                  
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm text-gray-700">Patrones de Engagement</span>
                      <span class="text-sm font-medium text-gray-900">Media</span>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2">
                      <div class="bg-yellow-500 rounded-full h-2" style="width: 60%"></div>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Balance entre precisión y ruido</p>
                  </div>
                  
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm text-gray-700">Tendencias Positivas</span>
                      <span class="text-sm font-medium text-gray-900">Media</span>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2">
                      <div class="bg-green-500 rounded-full h-2" style="width: 65%"></div>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Celebrar mejoras significativas</p>
                  </div>
                </div>
              </div>

              <!-- Frecuencia de Análisis -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Frecuencia de Análisis</h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-3 bg-gray-50/60 rounded-lg backdrop-blur-sm border border-gray-200/50">
                    <span class="text-sm text-gray-700">Análisis de patrones</span>
                    <select class="px-2 py-1 text-xs border border-gray-300 rounded">
                      <option>Diario</option>
                      <option selected>Cada 3 días</option>
                      <option>Semanal</option>
                    </select>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-gray-50/60 rounded-lg backdrop-blur-sm border border-gray-200/50">
                    <span class="text-sm text-gray-700">Reportes predictivos</span>
                    <select class="px-2 py-1 text-xs border border-gray-300 rounded">
                      <option selected>Semanal</option>
                      <option>Quincenal</option>
                      <option>Mensual</option>
                    </select>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-gray-50/60 rounded-lg backdrop-blur-sm border border-gray-200/50">
                    <span class="text-sm text-gray-700">Alertas críticas</span>
                    <select class="px-2 py-1 text-xs border border-gray-300 rounded">
                      <option selected>Inmediato</option>
                      <option>Cada hora</option>
                      <option>Diario</option>
                    </select>
                  </div>
                </div>
                
                <div class="mt-6 p-4 bg-blue-50/60 rounded-lg backdrop-blur-sm border border-blue-200/50">
                  <h4 class="text-sm font-semibold text-gray-900 mb-2">Próximo Análisis Completo</h4>
                  <p class="text-sm text-gray-600">Lunes, 20 de enero a las 9:00 AM</p>
                  <div class="flex items-center mt-2">
                    <Clock class="h-4 w-4 text-blue-500 mr-2" />
                    <span class="text-xs text-blue-600">Análisis automático programado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ROI y Métricas View -->
        <div v-if="activeView === 'roi'" class="space-y-8">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">ROI y Métricas Clave</h1>
              <p class="text-gray-600 mt-1">Justifica y optimiza tu inversión en bienestar empresarial</p>
            </div>
            <div class="flex gap-2">
              <Button variant="primary">
                <FileText class="h-4 w-4 mr-2" />
                Generar Reporte Ejecutivo
              </Button>
              <Button variant="secondary">
                <Download class="h-4 w-4 mr-2" />
                Exportar Datos
              </Button>
            </div>
          </div>

          <!-- ROI Principal -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6 flex items-center">
              <DollarSign class="h-5 w-5 mr-2 text-green-500" />
              Retorno de Inversión (ROI)
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div class="text-center p-6 bg-green-50/60 rounded-xl backdrop-blur-sm border border-green-200/50">
                <h3 class="text-3xl font-bold text-green-600 mb-2">€156,000</h3>
                <p class="text-gray-600 font-medium">Ahorro Total</p>
                <p class="text-xs text-gray-500 mt-1">Este año</p>
              </div>
              <div class="text-center p-6 bg-blue-50/60 rounded-xl backdrop-blur-sm border border-blue-200/50">
                <h3 class="text-3xl font-bold text-blue-600 mb-2">€48,000</h3>
                <p class="text-gray-600 font-medium">Inversión Total</p>
                <p class="text-xs text-gray-500 mt-1">Servicios + plataforma</p>
              </div>
              <div class="text-center p-6 bg-purple-50/60 rounded-xl backdrop-blur-sm border border-purple-200/50">
                <h3 class="text-3xl font-bold text-purple-600 mb-2">325%</h3>
                <p class="text-gray-600 font-medium">ROI Total</p>
                <p class="text-xs text-gray-500 mt-1">Retorno sobre inversión</p>
              </div>
              <div class="text-center p-6 bg-yellow-50/60 rounded-xl backdrop-blur-sm border border-yellow-200/50">
                <h3 class="text-3xl font-bold text-yellow-600 mb-2">€108,000</h3>
                <p class="text-gray-600 font-medium">Beneficio Neto</p>
                <p class="text-xs text-gray-500 mt-1">Ahorro - inversión</p>
              </div>
            </div>

            <!-- Desglose de Ahorros -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Desglose de Ahorros</h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-green-50/60 rounded-lg backdrop-blur-sm border border-green-200/50">
                    <div class="flex items-center space-x-3">
                      <UserCheck class="h-5 w-5 text-green-600" />
                      <div>
                        <p class="text-sm font-semibold text-gray-900">Reducción de Rotación</p>
                        <p class="text-xs text-gray-600">23% menos renuncias</p>
                      </div>
                    </div>
                    <span class="text-lg font-bold text-green-600">€89,000</span>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-blue-50/60 rounded-lg backdrop-blur-sm border border-blue-200/50">
                    <div class="flex items-center space-x-3">
                      <Heart class="h-5 w-5 text-blue-600" />
                      <div>
                        <p class="text-sm font-semibold text-gray-900">Reducción Bajas Médicas</p>
                        <p class="text-xs text-gray-600">18% menos días de baja</p>
                      </div>
                    </div>
                    <span class="text-lg font-bold text-blue-600">€34,000</span>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-purple-50/60 rounded-lg backdrop-blur-sm border border-purple-200/50">
                    <div class="flex items-center space-x-3">
                      <TrendingUp class="h-5 w-5 text-purple-600" />
                      <div>
                        <p class="text-sm font-semibold text-gray-900">Aumento Productividad</p>
                        <p class="text-xs text-gray-600">15% mejora general</p>
                      </div>
                    </div>
                    <span class="text-lg font-bold text-purple-600">€33,000</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Desglose de Inversión</h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-gray-50/60 rounded-lg backdrop-blur-sm border border-gray-200/50">
                    <div class="flex items-center space-x-3">
                      <ActivitySquare class="h-5 w-5 text-gray-600" />
                      <div>
                        <p class="text-sm font-semibold text-gray-900">Servicios de Bienestar</p>
                        <p class="text-xs text-gray-600">Yoga, coaching, nutrición</p>
                      </div>
                    </div>
                    <span class="text-lg font-bold text-gray-600">€32,000</span>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-gray-50/60 rounded-lg backdrop-blur-sm border border-gray-200/50">
                    <div class="flex items-center space-x-3">
                      <Monitor class="h-5 w-5 text-gray-600" />
                      <div>
                        <p class="text-sm font-semibold text-gray-900">Plataforma SMART</p>
                        <p class="text-xs text-gray-600">Licencia anual</p>
                      </div>
                    </div>
                    <span class="text-lg font-bold text-gray-600">€12,000</span>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-gray-50/60 rounded-lg backdrop-blur-sm border border-gray-200/50">
                    <div class="flex items-center space-x-3">
                      <Users class="h-5 w-5 text-gray-600" />
                      <div>
                        <p class="text-sm font-semibold text-gray-900">Gestión y Coordinación</p>
                        <p class="text-xs text-gray-600">Tiempo dedicado</p>
                      </div>
                    </div>
                    <span class="text-lg font-bold text-gray-600">€4,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Costo vs Participación -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Análisis Costo vs Participación</h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Gráfico de Eficiencia -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Eficiencia por Servicio</h3>
                <div class="space-y-4">
                  <div class="p-4 bg-green-50/60 rounded-lg backdrop-blur-sm border border-green-200/50">
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center space-x-3">
                        <ActivitySquare class="h-5 w-5 text-green-600" />
                        <span class="font-semibold text-gray-900">Yoga</span>
                      </div>
                      <span class="text-sm font-bold text-green-600">€12/participante</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-gray-600">156 participaciones</span>
                      <span class="text-green-600 font-medium">ROI: 420%</span>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2 mt-2">
                      <div class="bg-green-500 rounded-full h-2" style="width: 95%"></div>
                    </div>
                  </div>
                  
                  <div class="p-4 bg-blue-50/60 rounded-lg backdrop-blur-sm border border-blue-200/50">
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center space-x-3">
                        <MessageCircle class="h-5 w-5 text-blue-600" />
                        <span class="font-semibold text-gray-900">Coaching</span>
                      </div>
                      <span class="text-sm font-bold text-blue-600">€85/sesión</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-gray-600">48 sesiones</span>
                      <span class="text-blue-600 font-medium">ROI: 280%</span>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2 mt-2">
                      <div class="bg-blue-500 rounded-full h-2" style="width: 88%"></div>
                    </div>
                  </div>
                  
                  <div class="p-4 bg-purple-50/60 rounded-lg backdrop-blur-sm border border-purple-200/50">
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center space-x-3">
                        <Brain class="h-5 w-5 text-purple-600" />
                        <span class="font-semibold text-gray-900">Meditación</span>
                      </div>
                      <span class="text-sm font-bold text-purple-600">€8/participante</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-gray-600">203 participaciones</span>
                      <span class="text-purple-600 font-medium">ROI: 380%</span>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2 mt-2">
                      <div class="bg-purple-500 rounded-full h-2" style="width: 92%"></div>
                    </div>
                  </div>
                  
                  <div class="p-4 bg-yellow-50/60 rounded-lg backdrop-blur-sm border border-yellow-200/50">
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center space-x-3">
                        <Apple class="h-5 w-5 text-yellow-600" />
                        <span class="font-semibold text-gray-900">Nutrición</span>
                      </div>
                      <span class="text-sm font-bold text-yellow-600">€25/consulta</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-gray-600">72 consultas</span>
                      <span class="text-yellow-600 font-medium">ROI: 240%</span>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2 mt-2">
                      <div class="bg-yellow-500 rounded-full h-2" style="width: 78%"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Ranking de Servicios -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Servicios Más Populares</h3>
                <div class="space-y-3">
                  <div class="flex items-center space-x-4 p-3 bg-purple-50/60 rounded-lg backdrop-blur-sm border border-purple-200/50">
                    <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span class="text-white font-bold text-sm">1</span>
                    </div>
                    <div class="flex-1">
                      <p class="font-semibold text-gray-900">Meditación Mindfulness</p>
                      <p class="text-sm text-gray-600">203 participaciones</p>
                    </div>
                    <div class="text-right">
                      <p class="text-sm font-bold text-purple-600">94%</p>
                      <p class="text-xs text-gray-500">satisfacción</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-4 p-3 bg-green-50/60 rounded-lg backdrop-blur-sm border border-green-200/50">
                    <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <span class="text-white font-bold text-sm">2</span>
                    </div>
                    <div class="flex-1">
                      <p class="font-semibold text-gray-900">Yoga Matutino</p>
                      <p class="text-sm text-gray-600">156 participaciones</p>
                    </div>
                    <div class="text-right">
                      <p class="text-sm font-bold text-green-600">91%</p>
                      <p class="text-xs text-gray-500">satisfacción</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-4 p-3 bg-yellow-50/60 rounded-lg backdrop-blur-sm border border-yellow-200/50">
                    <div class="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <span class="text-white font-bold text-sm">3</span>
                    </div>
                    <div class="flex-1">
                      <p class="font-semibold text-gray-900">Nutrición Personalizada</p>
                      <p class="text-sm text-gray-600">72 consultas</p>
                    </div>
                    <div class="text-right">
                      <p class="text-sm font-bold text-yellow-600">89%</p>
                      <p class="text-xs text-gray-500">satisfacción</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-4 p-3 bg-blue-50/60 rounded-lg backdrop-blur-sm border border-blue-200/50">
                    <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span class="text-white font-bold text-sm">4</span>
                    </div>
                    <div class="flex-1">
                      <p class="font-semibold text-gray-900">Coaching Personal</p>
                      <p class="text-sm text-gray-600">48 sesiones</p>
                    </div>
                    <div class="text-right">
                      <p class="text-sm font-bold text-blue-600">96%</p>
                      <p class="text-xs text-gray-500">satisfacción</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Evolución del Bienestar -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Evolución del Bienestar Empresarial</h2>
            
            <!-- Métricas de Evolución -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div class="text-center p-6 bg-green-50/60 rounded-xl backdrop-blur-sm border border-green-200/50">
                <h3 class="text-2xl font-bold text-green-600 mb-2">7.8/10</h3>
                <p class="text-gray-600 font-medium">Bienestar Promedio</p>
                <div class="flex items-center justify-center mt-2">
                  <TrendingUp class="h-4 w-4 text-green-500 mr-1" />
                  <span class="text-sm text-green-600">+1.2 vs año anterior</span>
                </div>
              </div>
              <div class="text-center p-6 bg-blue-50/60 rounded-xl backdrop-blur-sm border border-blue-200/50">
                <h3 class="text-2xl font-bold text-blue-600 mb-2">87%</h3>
                <p class="text-gray-600 font-medium">Participación Activa</p>
                <div class="flex items-center justify-center mt-2">
                  <TrendingUp class="h-4 w-4 text-blue-500 mr-1" />
                  <span class="text-sm text-blue-600">+23% vs inicio</span>
                </div>
              </div>
              <div class="text-center p-6 bg-purple-50/60 rounded-xl backdrop-blur-sm border border-purple-200/50">
                <h3 class="text-2xl font-bold text-purple-600 mb-2">4.6/5</h3>
                <p class="text-gray-600 font-medium">Satisfacción NPS</p>
                <div class="flex items-center justify-center mt-2">
                  <TrendingUp class="h-4 w-4 text-purple-500 mr-1" />
                  <span class="text-sm text-purple-600">+0.8 vs trimestre anterior</span>
                </div>
              </div>
            </div>

            <!-- Timeline de Mejoras -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">Timeline de Mejoras</h3>
              <div class="space-y-4">
                <div class="flex items-center space-x-4">
                  <div class="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div class="flex-1 p-4 bg-green-50/60 rounded-lg backdrop-blur-sm border border-green-200/50">
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="font-semibold text-gray-900">Implementación Yoga Matutino</p>
                        <p class="text-sm text-gray-600">Octubre 2024</p>
                      </div>
                      <span class="text-sm text-green-600 font-medium">+15% bienestar general</span>
                    </div>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4">
                  <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div class="flex-1 p-4 bg-blue-50/60 rounded-lg backdrop-blur-sm border border-blue-200/50">
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="font-semibold text-gray-900">Lanzamiento Coaching Personal</p>
                        <p class="text-sm text-gray-600">Noviembre 2024</p>
                      </div>
                      <span class="text-sm text-blue-600 font-medium">+22% satisfacción laboral</span>
                    </div>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4">
                  <div class="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <div class="flex-1 p-4 bg-purple-50/60 rounded-lg backdrop-blur-sm border border-purple-200/50">
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="font-semibold text-gray-900">Sistema de Gamificación</p>
                        <p class="text-sm text-gray-600">Diciembre 2024</p>
                      </div>
                      <span class="text-sm text-purple-600 font-medium">+35% engagement</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Comparativa con Benchmarks -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Comparativa con Benchmarks del Sector</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Métricas vs Industria -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Tu Empresa vs Industria</h3>
                <div class="space-y-4">
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm text-gray-700">Participación en Bienestar</span>
                      <div class="flex items-center space-x-2">
                        <span class="text-sm font-bold text-primary">87%</span>
                        <span class="text-xs text-gray-500">vs 34% industria</span>
                      </div>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2">
                      <div class="bg-primary rounded-full h-2" style="width: 87%"></div>
                    </div>
                    <p class="text-xs text-green-600 mt-1">+153% sobre promedio industria</p>
                  </div>
                  
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm text-gray-700">Retención de Empleados</span>
                      <div class="flex items-center space-x-2">
                        <span class="text-sm font-bold text-green-600">89%</span>
                        <span class="text-xs text-gray-500">vs 72% industria</span>
                      </div>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2">
                      <div class="bg-green-500 rounded-full h-2" style="width: 89%"></div>
                    </div>
                    <p class="text-xs text-green-600 mt-1">+17% sobre promedio industria</p>
                  </div>
                  
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm text-gray-700">Días de Baja por Estrés</span>
                      <div class="flex items-center space-x-2">
                        <span class="text-sm font-bold text-green-600">2.1</span>
                        <span class="text-xs text-gray-500">vs 8.4 industria</span>
                      </div>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2">
                      <div class="bg-green-500 rounded-full h-2" style="width: 25%"></div>
                    </div>
                    <p class="text-xs text-green-600 mt-1">-75% bajo promedio industria</p>
                  </div>
                </div>
              </div>

              <!-- Posición Competitiva -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Posición Competitiva</h3>
                <div class="text-center mb-6">
                  <div class="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-white text-2xl font-bold">A+</span>
                  </div>
                  <h4 class="text-xl font-bold text-gray-900 mb-2">Líder en Bienestar</h4>
                  <p class="text-sm text-gray-600">Top 5% de empresas en tu sector</p>
                </div>
                
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-3 bg-green-50/60 rounded-lg backdrop-blur-sm border border-green-200/50">
                    <span class="text-sm text-gray-700">Ranking Nacional</span>
                    <span class="text-sm font-bold text-green-600">#12 de 2,400</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-blue-50/60 rounded-lg backdrop-blur-sm border border-blue-200/50">
                    <span class="text-sm text-gray-700">Sector Tecnología</span>
                    <span class="text-sm font-bold text-blue-600">#3 de 180</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-purple-50/60 rounded-lg backdrop-blur-sm border border-purple-200/50">
                    <span class="text-sm text-gray-700">Empresas 50-100 empleados</span>
                    <span class="text-sm font-bold text-purple-600">#1 de 45</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Proyecciones Futuras -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Proyecciones y Planificación</h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Proyecciones 2025 -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Proyecciones 2025</h3>
                <div class="space-y-4">
                  <div class="p-4 bg-green-50/60 rounded-lg backdrop-blur-sm border border-green-200/50">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm font-semibold text-gray-900">ROI Proyectado</span>
                      <span class="text-lg font-bold text-green-600">385%</span>
                    </div>
                    <p class="text-xs text-gray-600">Basado en tendencias actuales</p>
                    <div class="flex items-center mt-2">
                      <TrendingUp class="h-4 w-4 text-green-500 mr-1" />
                      <span class="text-xs text-green-600">+60% vs 2024</span>
                    </div>
                  </div>
                  
                  <div class="p-4 bg-blue-50/60 rounded-lg backdrop-blur-sm border border-blue-200/50">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm font-semibold text-gray-900">Ahorro Estimado</span>
                      <span class="text-lg font-bold text-blue-600">€198,000</span>
                    </div>
                    <p class="text-xs text-gray-600">Con expansión de servicios</p>
                    <div class="flex items-center mt-2">
                      <TrendingUp class="h-4 w-4 text-blue-500 mr-1" />
                      <span class="text-xs text-blue-600">+27% vs 2024</span>
                    </div>
                  </div>
                  
                  <div class="p-4 bg-purple-50/60 rounded-lg backdrop-blur-sm border border-purple-200/50">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm font-semibold text-gray-900">Participación Objetivo</span>
                      <span class="text-lg font-bold text-purple-600">95%</span>
                    </div>
                    <p class="text-xs text-gray-600">Meta para fin de año</p>
                    <div class="flex items-center mt-2">
                      <Target class="h-4 w-4 text-purple-500 mr-1" />
                      <span class="text-xs text-purple-600">+8% vs actual</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Recomendaciones de Inversión -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Recomendaciones de Inversión</h3>
                <div class="space-y-4">
                  <div class="p-4 bg-yellow-50/60 rounded-lg backdrop-blur-sm border border-yellow-200/50">
                    <div class="flex items-center space-x-3 mb-2">
                      <Lightbulb class="h-5 w-5 text-yellow-500" />
                      <h4 class="font-semibold text-gray-900">Expandir Coaching</h4>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">
                      Aumentar sesiones de coaching en 40% generaría un ROI adicional de €45,000
                    </p>
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-gray-500">Inversión: €15,000</span>
                      <span class="text-xs text-yellow-600 font-medium">ROI: 300%</span>
                    </div>
                  </div>
                  
                  <div class="p-4 bg-blue-50/60 rounded-lg backdrop-blur-sm border border-blue-200/50">
                    <div class="flex items-center space-x-3 mb-2">
                      <Brain class="h-5 w-5 text-blue-500" />
                      <h4 class="font-semibold text-gray-900">Programa Mindfulness</h4>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">
                      Implementar programa intensivo de mindfulness para equipos de alto estrés
                    </p>
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-gray-500">Inversión: €8,000</span>
                      <span class="text-xs text-blue-600 font-medium">ROI: 450%</span>
                    </div>
                  </div>
                  
                  <div class="p-4 bg-green-50/60 rounded-lg backdrop-blur-sm border border-green-200/50">
                    <div class="flex items-center space-x-3 mb-2">
                      <Heart class="h-5 w-5 text-green-500" />
                      <h4 class="font-semibold text-gray-900">Psicoterapia Preventiva</h4>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">
                      Sesiones preventivas de psicoterapia para equipos identificados en riesgo
                    </p>
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-gray-500">Inversión: €12,000</span>
                      <span class="text-xs text-green-600 font-medium">ROI: 380%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Reporte Ejecutivo -->
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Resumen Ejecutivo</h2>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Logros Clave -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Logros Clave 2024</h3>
                <div class="space-y-3">
                  <div class="flex items-center space-x-3">
                    <CheckCircle class="h-5 w-5 text-green-500" />
                    <span class="text-sm text-gray-700">ROI del 325% alcanzado</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <CheckCircle class="h-5 w-5 text-green-500" />
                    <span class="text-sm text-gray-700">87% participación activa</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <CheckCircle class="h-5 w-5 text-green-500" />
                    <span class="text-sm text-gray-700">23% reducción rotación</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <CheckCircle class="h-5 w-5 text-green-500" />
                    <span class="text-sm text-gray-700">Top 5% sector tecnología</span>
                  </div>
                </div>
              </div>

              <!-- Áreas de Mejora -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Áreas de Oportunidad</h3>
                <div class="space-y-3">
                  <div class="flex items-center space-x-3">
                    <AlertTriangle class="h-5 w-5 text-yellow-500" />
                    <span class="text-sm text-gray-700">Equipo Ventas en riesgo</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <Target class="h-5 w-5 text-blue-500" />
                    <span class="text-sm text-gray-700">Expandir coaching personal</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <TrendingUp class="h-5 w-5 text-purple-500" />
                    <span class="text-sm text-gray-700">Aumentar actividades grupales</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <Brain class="h-5 w-5 text-orange-500" />
                    <span class="text-sm text-gray-700">Implementar mindfulness</span>
                  </div>
                </div>
              </div>

              <!-- Próximos Pasos -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Próximos Pasos</h3>
                <div class="space-y-3">
                  <div class="p-3 bg-red-50/60 rounded-lg backdrop-blur-sm border border-red-200/50">
                    <div class="flex items-center space-x-2 mb-1">
                      <span class="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span class="text-sm font-semibold text-gray-900">Urgente</span>
                    </div>
                    <p class="text-xs text-gray-600">Intervenir equipo Ventas</p>
                  </div>
                  
                  <div class="p-3 bg-yellow-50/60 rounded-lg backdrop-blur-sm border border-yellow-200/50">
                    <div class="flex items-center space-x-2 mb-1">
                      <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      <span class="text-sm font-semibold text-gray-900">Esta Semana</span>
                    </div>
                    <p class="text-xs text-gray-600">Lanzar desafío colaborativo</p>
                  </div>
                  
                  <div class="p-3 bg-blue-50/60 rounded-lg backdrop-blur-sm border border-blue-200/50">
                    <div class="flex items-center space-x-2 mb-1">
                      <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span class="text-sm font-semibold text-gray-900">Este Mes</span>
                    </div>
                    <p class="text-xs text-gray-600">Expandir programa coaching</p>
                  </div>
                  
                  <div class="p-3 bg-green-50/60 rounded-lg backdrop-blur-sm border border-green-200/50">
                    <div class="flex items-center space-x-2 mb-1">
                      <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span class="text-sm font-semibold text-gray-900">Q2 2025</span>
                    </div>
                    <p class="text-xs text-gray-600">Implementar mindfulness</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Encuestas View -->
        <div v-if="activeView === 'encuestas'" class="space-y-8">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Gestión de Encuestas</h1>
              <p class="text-gray-600 mt-1">Crea y gestiona encuestas para tus empleados</p>
            </div>
            <div class="flex gap-2">
              <Button variant="primary">
                <Plus class="h-4 w-4 mr-2" />
                Nueva Encuesta
              </Button>
              <Button variant="secondary">
                <FileText class="h-4 w-4 mr-2" />
                Usar Plantilla
              </Button>
            </div>
          </div>

          <!-- Estadísticas de encuestas -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <h3 class="text-2xl font-bold text-primary mb-2">3</h3>
              <p class="text-gray-600">Total Encuestas</p>
            </div>
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <h3 class="text-2xl font-bold text-green-600 mb-2">1</h3>
              <p class="text-gray-600">Activas</p>
            </div>
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <h3 class="text-2xl font-bold text-yellow-600 mb-2">48%</h3>
              <p class="text-gray-600">Tasa Respuesta</p>
            </div>
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <h3 class="text-2xl font-bold text-purple-600 mb-2">4.2</h3>
              <p class="text-gray-600">Satisfacción Media</p>
            </div>
          </div>

          <!-- Lista de encuestas -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <div class="space-y-4">
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Evaluación de Clima Laboral Q1 2025</h3>
                  <p class="text-sm text-gray-600 mt-1">Encuesta trimestral para evaluar el ambiente de trabajo</p>
                  <div class="flex items-center space-x-4 mt-2">
                    <span class="text-xs text-gray-500">12/25 respuestas</span>
                    <span class="bg-green-100/80 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Activa</span>
                    <span class="text-xs text-gray-500">Termina en 15 días</span>
                  </div>
                </div>
                <div class="flex gap-2">
                  <Button variant="outline" class="text-xs px-3 py-1">Ver Resultados</Button>
                  <Button variant="primary" class="text-xs px-3 py-1">Enviar Recordatorio</Button>
                </div>
              </div>

              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Feedback Actividades de Bienestar</h3>
                  <p class="text-sm text-gray-600 mt-1">Opiniones sobre las actividades implementadas</p>
                  <div class="flex items-center space-x-4 mt-2">
                    <span class="text-xs text-gray-500">Borrador</span>
                    <span class="bg-yellow-100/80 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Borrador</span>
                    <span class="text-xs text-gray-500">7 preguntas preparadas</span>
                  </div>
                </div>
                <div class="flex gap-2">
                  <Button variant="outline" class="text-xs px-3 py-1">Editar</Button>
                  <Button variant="primary" class="text-xs px-3 py-1">Enviar</Button>
                </div>
              </div>

              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Satisfacción con Servicios de Coaching</h3>
                  <p class="text-sm text-gray-600 mt-1">Evaluación específica sobre las sesiones de coaching</p>
                  <div class="flex items-center space-x-4 mt-2">
                    <span class="text-xs text-gray-500">18/25 respuestas</span>
                    <span class="bg-gray-100/80 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">Finalizada</span>
                    <span class="text-xs text-gray-500">Finalizada hace 1 mes</span>
                  </div>
                </div>
                <div class="flex gap-2">
                  <Button variant="outline" class="text-xs px-3 py-1">Ver Resultados</Button>
                  <Button variant="secondary" class="text-xs px-3 py-1">Exportar</Button>
                </div>
              </div>

              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Evaluación de Servicios de Nutrición</h3>
                  <p class="text-sm text-gray-600 mt-1">Feedback sobre las sesiones nutricionales</p>
                  <div class="flex items-center space-x-4 mt-2">
                    <span class="text-xs text-gray-500">22/25 respuestas</span>
                    <span class="bg-gray-100/80 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">Finalizada</span>
                    <span class="text-xs text-gray-500">Finalizada hace 2 meses</span>
                  </div>
                </div>
                <div class="flex gap-2">
                  <Button variant="outline" class="text-xs px-3 py-1">Ver Resultados</Button>
                  <Button variant="secondary" class="text-xs px-3 py-1">Exportar</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Estadísticas View -->
        <div v-if="activeView === 'estadisticas'" class="space-y-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Estadísticas y Análisis</h1>
            <p class="text-gray-600 mt-1">Métricas detalladas del bienestar en tu empresa</p>
          </div>

          <!-- Métricas principales -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp class="h-8 w-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">72%</h3>
              <p class="text-gray-600">Participación Promedio</p>
              <p class="text-xs text-gray-500 mt-1">+15% vs mes anterior</p>
            </div>

            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star class="h-8 w-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">4.3</h3>
              <p class="text-gray-600">Satisfacción Promedio</p>
              <p class="text-xs text-gray-500 mt-1">+0.3 vs mes anterior</p>
            </div>

            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target class="h-8 w-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">156</h3>
              <p class="text-gray-600">Objetivos Completados</p>
              <p class="text-xs text-gray-500 mt-1">Este mes</p>
            </div>

            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar class="h-8 w-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">89</h3>
              <p class="text-gray-600">Sesiones Completadas</p>
              <p class="text-xs text-gray-500 mt-1">Este trimestre</p>
            </div>

            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart class="h-8 w-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">94%</h3>
              <p class="text-gray-600">Retención Empleados</p>
              <p class="text-xs text-gray-500 mt-1">+8% vs año anterior</p>
            </div>

            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap class="h-8 w-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">87%</h3>
              <p class="text-gray-600">Productividad</p>
              <p class="text-xs text-gray-500 mt-1">Índice de productividad</p>
            </div>
          </div>

          <!-- Ranking de empleados -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Top Empleados por Participación</h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 glass-card rounded-xl backdrop-blur-sm border border-white/20">
                <div class="flex items-center space-x-4">
                  <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span class="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">Sofía López</p>
                    <p class="text-sm text-gray-600">Diseñadora UX/UI</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-lg font-bold text-primary">1,450 pts</p>
                  <p class="text-sm text-gray-500">12 actividades</p>
                </div>
              </div>

              <div class="flex items-center justify-between p-4 glass-card rounded-xl backdrop-blur-sm border border-white/20">
                <div class="flex items-center space-x-4">
                  <div class="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                    <span class="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">Ana Martínez</p>
                    <p class="text-sm text-gray-600">Desarrolladora Frontend</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-lg font-bold text-primary">1,250 pts</p>
                  <p class="text-sm text-gray-500">8 actividades</p>
                </div>
              </div>

              <div class="flex items-center justify-between p-4 glass-card rounded-xl backdrop-blur-sm border border-white/20">
                <div class="flex items-center space-x-4">
                  <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span class="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">Carmen García</p>
                    <p class="text-sm text-gray-600">Recursos Humanos</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-lg font-bold text-primary">1,100 pts</p>
                  <p class="text-sm text-gray-500">9 actividades</p>
                </div>
              </div>

              <div class="flex items-center justify-between p-4 glass-card rounded-xl backdrop-blur-sm border border-white/20">
                <div class="flex items-center space-x-4">
                  <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span class="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">Luis Fernández</p>
                    <p class="text-sm text-gray-600">Product Manager</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-lg font-bold text-primary">980 pts</p>
                  <p class="text-sm text-gray-500">6 actividades</p>
                </div>
              </div>

              <div class="flex items-center justify-between p-4 glass-card rounded-xl backdrop-blur-sm border border-white/20">
                <div class="flex items-center space-x-4">
                  <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span class="text-white font-bold text-sm">5</span>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">David Ruiz</p>
                    <p class="text-sm text-gray-600">Marketing Manager</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-lg font-bold text-primary">750 pts</p>
                  <p class="text-sm text-gray-500">4 actividades</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Análisis por Departamento -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Análisis por Departamento</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20 text-center">
                <h