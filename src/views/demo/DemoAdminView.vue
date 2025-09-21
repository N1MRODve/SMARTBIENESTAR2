<template>
  <DemoLayout>
    <div class="space-y-8">
    <!-- Header -->
    <header class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard Administrador</h1>
          <p class="text-gray-600">Vista general de tu empresa y actividad de bienestar</p>
        </div>
        <div class="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium">
          🎭 Modo Demo
        </div>
      </div>
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
              <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.total_empleados }}</h3>
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
              <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.sesiones_proximas }}</h3>
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
              <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.encuestas_activas }}</h3>
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
              <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.satisfaccion_promedio }}</h3>
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
                    <p class="text-xs text-gray-500">Hace 2 horas • +50 puntos</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500">
                    <Trophy class="h-5 w-5 text-white" />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">Luis Martínez se inscribió en desafío "10,000 pasos"</p>
                    <p class="text-xs text-gray-500">Hace 3 horas</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500">
                    <ClipboardList class="h-5 w-5 text-white" />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">Sofia Rodríguez completó encuesta de satisfacción</p>
                    <p class="text-xs text-gray-500">Hace 5 horas • +25 puntos</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-green-500">
                    <MessageCircle class="h-5 w-5 text-white" />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">Carlos Mendoza reservó sesión de Coaching</p>
                    <p class="text-xs text-gray-500">Hace 1 día</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-500">
                    <Star class="h-5 w-5 text-white" />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">María Fernández alcanzó 1000 puntos de bienestar</p>
                    <p class="text-xs text-gray-500">Hace 2 días • +100 puntos</p>
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
                <span class="text-sm text-primary hover:text-primary-dark font-medium transition-colors cursor-pointer">
                  Ver calendario →
                </span>
              </div>

              <div class="space-y-4">
                <div class="glass-card p-4 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <div class="flex items-center justify-between mb-2">
                    <p class="font-semibold text-gray-900">Yoga Matutino</p>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      12/15 plazas
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 mt-1">Hoy, 08:00</p>
                  <p class="text-xs text-gray-500">Elena Vásquez • Sala Zen</p>
                </div>

                <div class="glass-card p-4 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <div class="flex items-center justify-between mb-2">
                    <p class="font-semibold text-gray-900">Coaching de Liderazgo</p>
                    <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      6/10 plazas
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 mt-1">Hoy, 16:00</p>
                  <p class="text-xs text-gray-500">Carlos Ruiz • Online</p>
                </div>

                <div class="glass-card p-4 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <div class="flex items-center justify-between mb-2">
                    <p class="font-semibold text-gray-900">Nutrición Saludable</p>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      18/25 plazas
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 mt-1">Mañana, 14:00</p>
                  <p class="text-xs text-gray-500">Dr. Ana López • Sala de Conferencias</p>
                </div>
              </div>
            </div>

            <!-- Servicios Más Populares -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Star class="h-5 w-5 mr-2 text-yellow-500" />
                Servicios Más Populares
              </h2>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between p-3 rounded-lg backdrop-blur-sm border bg-purple-50/60 border-purple-200/50">
                  <div class="flex items-center space-x-3">
                    <Activity class="h-5 w-5 text-purple-600" />
                    <div>
                      <p class="font-semibold text-gray-900">Yoga</p>
                      <p class="text-xs text-gray-600">156 participaciones</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-bold text-purple-600">96%</p>
                    <p class="text-xs text-gray-500">satisfacción</p>
                  </div>
                </div>

                <div class="flex items-center justify-between p-3 rounded-lg backdrop-blur-sm border bg-green-50/60 border-green-200/50">
                  <div class="flex items-center space-x-3">
                    <MessageCircle class="h-5 w-5 text-green-600" />
                    <div>
                      <p class="font-semibold text-gray-900">Coaching</p>
                      <p class="text-xs text-gray-600">89 participaciones</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-bold text-green-600">92%</p>
                    <p class="text-xs text-gray-500">satisfacción</p>
                  </div>
                </div>

                <div class="flex items-center justify-between p-3 rounded-lg backdrop-blur-sm border bg-blue-50/60 border-blue-200/50">
                  <div class="flex items-center space-x-3">
                    <Apple class="h-5 w-5 text-blue-600" />
                    <div>
                      <p class="font-semibold text-gray-900">Nutrición</p>
                      <p class="text-xs text-gray-600">67 participaciones</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-bold text-blue-600">88%</p>
                    <p class="text-xs text-gray-500">satisfacción</p>
                  </div>
                </div>

                <div class="flex items-center justify-between p-3 rounded-lg backdrop-blur-sm border bg-yellow-50/60 border-yellow-200/50">
                  <div class="flex items-center space-x-3">
                    <Heart class="h-5 w-5 text-yellow-600" />
                    <div>
                      <p class="font-semibold text-gray-900">Meditación</p>
                      <p class="text-xs text-gray-600">45 participaciones</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-bold text-yellow-600">94%</p>
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
              
              <div class="space-y-4">
                <div class="flex items-center space-x-4 p-3 rounded-lg backdrop-blur-sm border bg-yellow-50/60 border-yellow-200/50">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600">
                    <span class="text-white font-bold text-sm">1</span>
                  </div>
                  <div class="flex-1">
                    <p class="font-semibold text-gray-900">Ana García</p>
                    <p class="text-sm text-gray-600">1250 puntos • Nivel 3</p>
                  </div>
                  <div class="text-right">
                    <p class="text-xs font-medium text-yellow-600">Racha 14 días</p>
                  </div>
                </div>

                <div class="flex items-center space-x-4 p-3 rounded-lg backdrop-blur-sm border bg-gray-50/60 border-gray-200/50">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-gray-400 to-gray-600">
                    <span class="text-white font-bold text-sm">2</span>
                  </div>
                  <div class="flex-1">
                    <p class="font-semibold text-gray-900">Luis Martínez</p>
                    <p class="text-sm text-gray-600">980 puntos • Nivel 2</p>
                  </div>
                  <div class="text-right">
                    <p class="text-xs font-medium text-gray-600">Racha 7 días</p>
                  </div>
                </div>

                <div class="flex items-center space-x-4 p-3 rounded-lg backdrop-blur-sm border bg-orange-50/60 border-orange-200/50">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600">
                    <span class="text-white font-bold text-sm">3</span>
                  </div>
                  <div class="flex-1">
                    <p class="font-semibold text-gray-900">Sofia Rodríguez</p>
                    <p class="text-sm text-gray-600">875 puntos • Nivel 2</p>
                  </div>
                  <div class="text-right">
                    <p class="text-xs font-medium text-orange-600">Racha 12 días</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Estado de Encuestas -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-semibold text-gray-900">Estado de Encuestas</h2>
                <span class="text-sm text-primary hover:text-primary-dark font-medium transition-colors cursor-pointer">
                  Gestionar →
                </span>
              </div>
              
              <div class="space-y-3">
                <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-semibold text-gray-900">Clima Laboral Q1</h4>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Activa</span>
                  </div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-600">Respuestas</span>
                    <span class="text-sm font-bold text-primary">32/45</span>
                  </div>
                  <div class="bg-gray-200 rounded-full h-2">
                    <div class="bg-primary rounded-full h-2 transition-all duration-300" style="width: 71%"></div>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">Termina en 5 días</p>
                </div>

                <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-semibold text-gray-900">Feedback Actividades</h4>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Activa</span>
                  </div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-600">Respuestas</span>
                    <span class="text-sm font-bold text-primary">18/30</span>
                  </div>
                  <div class="bg-gray-200 rounded-full h-2">
                    <div class="bg-primary rounded-full h-2 transition-all duration-300" style="width: 60%"></div>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">Sin fecha límite</p>
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
              <button class="w-full glass-button-primary text-white flex flex-col items-center p-6 h-auto rounded-xl hover:bg-primary/90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
                <ClipboardList class="h-8 w-8 mb-3" />
                <span class="text-sm font-medium">Crear Encuesta</span>
                <span class="text-xs text-blue-200 mt-1">Feedback rápido</span>
              </button>
              
              <button class="w-full glass-button-outline text-gray-700 bg-white/60 hover:bg-gray-50/80 flex flex-col items-center p-6 h-auto rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50">
                <UserPlus class="h-8 w-8 mb-3" />
                <span class="text-sm font-medium">Invitar Empleado</span>
                <span class="text-xs text-gray-500 mt-1">Expandir equipo</span>
              </button>
              
              <button class="w-full glass-button-outline text-gray-700 bg-white/60 hover:bg-gray-50/80 flex flex-col items-center p-6 h-auto rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50">
                <Trophy class="h-8 w-8 mb-3" />
                <span class="text-sm font-medium">Crear Desafío</span>
                <span class="text-xs text-gray-500 mt-1">Motivar equipos</span>
              </button>
              
              <button class="w-full glass-button-outline text-gray-700 bg-white/60 hover:bg-gray-50/80 flex flex-col items-center p-6 h-auto rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50">
                <Brain class="h-8 w-8 mb-3" />
                <span class="text-sm font-medium">Ver Alertas</span>
                <span class="text-xs text-gray-500 mt-1">Prevenir problemas</span>
              </button>
            </div>
          </div>
    </div>
  </DemoLayout>
</template>

<script setup>
import { 
  ActivitySquare,
  ArrowLeft,
  LayoutDashboard,
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
  Activity,
  MessageCircle,
  Apple,
  Heart,
  Code,
  DollarSign,
  Briefcase,
  BarChart3
} from 'lucide-vue-next'
import { useDemoStore } from '@/stores/demoStore'
import DemoLayout from '@/layouts/DemoLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const demoStore = useDemoStore()

// Cargar datos de la demo
const stats = demoStore.adminDashboardStats

const volverADemo = () => {
  router.push('/demo')
}
</script>