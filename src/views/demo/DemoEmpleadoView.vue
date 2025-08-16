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

          <!-- Filtros -->
          <div class="glass-container rounded-xl shadow-lg p-4 backdrop-blur-sm border border-white/30">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select class="px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm">
                <option>Todos los servicios</option>
                <option>Yoga</option>
                <option>Coaching</option>
                <option>Nutrición</option>
                <option>Meditación</option>
              </select>
              <select class="px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm">
                <option>Todas las modalidades</option>
                <option>Presencial</option>
                <option>Online</option>
              </select>
              <input type="date" class="px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm">
              <Button variant="primary">Filtrar</Button>
            </div>
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
                <div class="flex items-center mb-4 text-sm text-gray-600">
                  <MapPin class="h-4 w-4 mr-1" />
                  <span>Sala de bienestar - Planta 2</span>
                </div>
                <div class="flex items-center mb-4 text-sm text-gray-600">
                  <User class="h-4 w-4 mr-1" />
                  <span>Elena Vásquez - Instructora certificada</span>
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
                <div class="flex items-center mb-4 text-sm text-gray-600">
                  <Globe class="h-4 w-4 mr-1" />
                  <span>Sesión online - Zoom</span>
                </div>
                <div class="flex items-center mb-4 text-sm text-gray-600">
                  <User class="h-4 w-4 mr-1" />
                  <span>Miguel Torres - Coach certificado</span>
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
                <div class="flex items-center mb-4 text-sm text-gray-600">
                  <Globe class="h-4 w-4 mr-1" />
                  <span>Sesión online - Google Meet</span>
                </div>
                <div class="flex items-center mb-4 text-sm text-gray-600">
                  <User class="h-4 w-4 mr-1" />
                  <span>Laura Sánchez - Nutricionista clínica</span>
                </div>
                <button class="w-full glass-button-primary text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
                  Reservar Plaza
                </button>
              </div>
            </div>

            <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <img src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Meditación" class="w-full h-48 object-cover" />
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Meditación de Pausa Activa</h3>
                <p class="text-gray-600 mb-4">Sesión corta de meditación para recargar energías a mitad del día.</p>
                <div class="flex items-center justify-between mb-4">
                  <span class="text-sm text-gray-500">Viernes, 2:00 PM</span>
                  <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">3/12 plazas</span>
                </div>
                <div class="flex items-center mb-4 text-sm text-gray-600">
                  <MapPin class="h-4 w-4 mr-1" />
                  <span>Sala de relajación</span>
                </div>
                <div class="flex items-center mb-4 text-sm text-gray-600">
                  <User class="h-4 w-4 mr-1" />
                  <span>Elena Vásquez - Especialista mindfulness</span>
                </div>
                <button class="w-full glass-button-primary text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
                  Reservar Plaza
                </button>
              </div>
            </div>

            <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <img src="https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Entrenamiento" class="w-full h-48 object-cover" />
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Entrenamiento Funcional</h3>
                <p class="text-gray-600 mb-4">Rutina de ejercicios funcionales para fortalecer el cuerpo.</p>
                <div class="flex items-center justify-between mb-4">
                  <span class="text-sm text-gray-500">Lunes, 6:30 PM</span>
                  <span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">18/20 plazas</span>
                </div>
                <div class="flex items-center mb-4 text-sm text-gray-600">
                  <MapPin class="h-4 w-4 mr-1" />
                  <span>Gimnasio corporativo</span>
                </div>
                <div class="flex items-center mb-4 text-sm text-gray-600">
                  <User class="h-4 w-4 mr-1" />
                  <span>Carlos Fitness - Entrenador personal</span>
                </div>
                <button class="w-full glass-button-primary text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
                  Reservar Plaza
                </button>
              </div>
            </div>

            <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <img src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Psicoterapia" class="w-full h-48 object-cover" />
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Apoyo Psicológico Individual</h3>
                <p class="text-gray-600 mb-4">Sesión individual de apoyo psicológico para bienestar emocional.</p>
                <div class="flex items-center justify-between mb-4">
                  <span class="text-sm text-gray-500">Martes, 4:00 PM</span>
                  <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">1/1 plaza</span>
                </div>
                <div class="flex items-center mb-4 text-sm text-gray-600">
                  <Globe class="h-4 w-4 mr-1" />
                  <span>Sesión privada online</span>
                </div>
                <div class="flex items-center mb-4 text-sm text-gray-600">
                  <User class="h-4 w-4 mr-1" />
                  <span>Dra. Patricia Mendoza - Psicóloga clínica</span>
                </div>
                <button class="w-full glass-button-primary text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
                  Solicitar Cita
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Coaching Personal View -->
        <div v-if="activeView === 'coaching'" class="space-y-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Coaching Personal</h1>
            <p class="text-gray-600">Reserva sesiones one-to-one con nuestros coaches especializados</p>
          </div>

          <!-- Estadísticas de coaching -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <MessageCircle class="h-6 w-6 text-blue-600" />
              </div>
              <h3 class="text-2xl font-bold text-blue-600 mb-1">4</h3>
              <p class="text-gray-600 text-sm">Sesiones Completadas</p>
            </div>
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div class="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Calendar class="h-6 w-6 text-green-600" />
              </div>
              <h3 class="text-2xl font-bold text-green-600 mb-1">2</h3>
              <p class="text-gray-600 text-sm">Próximas Sesiones</p>
            </div>
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div class="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Star class="h-6 w-6 text-yellow-600" />
              </div>
              <h3 class="text-2xl font-bold text-yellow-600 mb-1">4.5</h3>
              <p class="text-gray-600 text-sm">Calificación Promedio</p>
            </div>
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div class="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Trophy class="h-6 w-6 text-purple-600" />
              </div>
              <h3 class="text-2xl font-bold text-purple-600 mb-1">270</h3>
              <p class="text-gray-600 text-sm">Puntos Ganados</p>
            </div>
          </div>

          <!-- Mis Sesiones Programadas -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6 flex items-center">
              <Calendar class="h-5 w-5 mr-2 text-primary" />
              Mis Próximas Sesiones
            </h2>
            <div class="space-y-4">
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300">
                <div class="flex items-start justify-between">
                  <div class="flex items-start space-x-4">
                    <img 
                      src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100" 
                      alt="Elena Vásquez"
                      class="w-16 h-16 rounded-xl object-cover"
                    />
                    <div class="flex-1">
                      <h3 class="text-lg font-semibold text-gray-900">Sesión de Gestión del Estrés</h3>
                      <p class="text-sm text-gray-600 mb-2">con Elena Vásquez - Coach de Vida y Bienestar</p>
                      <div class="flex items-center space-x-4 text-sm text-gray-500">
                        <span class="flex items-center">
                          <Clock class="h-4 w-4 mr-1" />
                          Lunes 22 Ene, 16:00 - 17:00
                        </span>
                        <span class="flex items-center">
                          <Globe class="h-4 w-4 mr-1" />
                          Online
                        </span>
                        <span class="flex items-center">
                          <Star class="h-4 w-4 mr-1 text-yellow-500" />
                          100 puntos
                        </span>
                      </div>
                      <p class="text-sm text-gray-700 mt-2">
                        <strong>Enfoque:</strong> Técnicas para manejar la presión de deadlines
                      </p>
                    </div>
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="bg-green-100/80 text-green-800 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-green-200/50">
                      Confirmada
                    </span>
                    <button class="glass-button-outline text-blue-700 bg-white/60 hover:bg-blue-50/80 px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-blue-300/50 text-xs">
                      Unirse a reunión
                    </button>
                  </div>
                </div>
              </div>

              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300">
                <div class="flex items-start justify-between">
                  <div class="flex items-start space-x-4">
                    <img 
                      src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100" 
                      alt="Miguel Torres"
                      class="w-16 h-16 rounded-xl object-cover"
                    />
                    <div class="flex-1">
                      <h3 class="text-lg font-semibold text-gray-900">Desarrollo de Liderazgo Personal</h3>
                      <p class="text-sm text-gray-600 mb-2">con Miguel Torres - Coach Ejecutivo y Liderazgo</p>
                      <div class="flex items-center space-x-4 text-sm text-gray-500">
                        <span class="flex items-center">
                          <Clock class="h-4 w-4 mr-1" />
                          Viernes 25 Ene, 15:00 - 16:00
                        </span>
                        <span class="flex items-center">
                          <MapPin class="h-4 w-4 mr-1" />
                          Presencial
                        </span>
                        <span class="flex items-center">
                          <Star class="h-4 w-4 mr-1 text-yellow-500" />
                          120 puntos
                        </span>
                      </div>
                      <p class="text-sm text-gray-700 mt-2">
                        <strong>Enfoque:</strong> Mejorar habilidades de comunicación con el equipo
                      </p>
                    </div>
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="bg-green-100/80 text-green-800 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-green-200/50">
                      Confirmada
                    </span>
                    <button class="glass-button-outline text-gray-700 bg-white/60 hover:bg-gray-50/80 px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50 text-xs">
                      Ver ubicación
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Coaches Disponibles -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold flex items-center">
                <Users class="h-5 w-5 mr-2 text-primary" />
                Coaches Disponibles
              </h2>
              <div class="flex gap-2">
                <select class="px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm text-sm">
                  <option value="">Todas las especialidades</option>
                  <option value="vida">Vida y Bienestar</option>
                  <option value="ejecutivo">Ejecutivo y Liderazgo</option>
                  <option value="nutricional">Nutricional</option>
                  <option value="carrera">Desarrollo de Carrera</option>
                  <option value="mindfulness">Mindfulness</option>
                  <option value="productividad">Productividad</option>
                </select>
                <select class="px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm text-sm">
                  <option value="">Cualquier modalidad</option>
                  <option value="online">Online</option>
                  <option value="presencial">Presencial</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Coach 1 -->
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300">
                <div class="flex items-start space-x-4">
                  <img 
                    src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100" 
                    alt="Elena Vásquez"
                    class="w-20 h-20 rounded-xl object-cover"
                  />
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900">Elena Vásquez</h3>
                    <p class="text-sm text-primary font-medium mb-2">Coach de Vida y Bienestar</p>
                    <div class="flex items-center mb-2">
                      <div class="flex items-center mr-4">
                        <Star class="h-4 w-4 text-yellow-500 fill-current" />
                        <span class="text-sm text-gray-600 ml-1">4.9 (127 reseñas)</span>
                      </div>
                      <span class="text-sm text-gray-600">8 años exp.</span>
                    </div>
                    <div class="flex flex-wrap gap-1 mb-3">
                      <span class="bg-blue-100/80 text-blue-800 px-2 py-1 rounded-full text-xs backdrop-blur-sm border border-blue-200/50">Gestión del estrés</span>
                      <span class="bg-green-100/80 text-green-800 px-2 py-1 rounded-full text-xs backdrop-blur-sm border border-green-200/50">Equilibrio vida-trabajo</span>
                    </div>
                    <p class="text-sm text-gray-700 mb-3">Especialista en equilibrio vida-trabajo y gestión del estrés.</p>
                    <div class="flex items-center justify-between">
                      <div class="text-sm">
                        <span class="text-gray-500">Duración:</span>
                        <span class="font-medium text-gray-900 ml-1">60 min</span>
                      </div>
                      <button class="glass-button-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30 text-sm">
                        Reservar Sesión
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Coach 2 -->
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300">
                <div class="flex items-start space-x-4">
                  <img 
                    src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100" 
                    alt="Miguel Torres"
                    class="w-20 h-20 rounded-xl object-cover"
                  />
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900">Miguel Torres</h3>
                    <p class="text-sm text-primary font-medium mb-2">Coach Ejecutivo y Liderazgo</p>
                    <div class="flex items-center mb-2">
                      <div class="flex items-center mr-4">
                        <Star class="h-4 w-4 text-yellow-500 fill-current" />
                        <span class="text-sm text-gray-600 ml-1">4.8 (89 reseñas)</span>
                      </div>
                      <span class="text-sm text-gray-600">12 años exp.</span>
                    </div>
                    <div class="flex flex-wrap gap-1 mb-3">
                      <span class="bg-purple-100/80 text-purple-800 px-2 py-1 rounded-full text-xs backdrop-blur-sm border border-purple-200/50">Liderazgo</span>
                      <span class="bg-blue-100/80 text-blue-800 px-2 py-1 rounded-full text-xs backdrop-blur-sm border border-blue-200/50">Comunicación</span>
                    </div>
                    <p class="text-sm text-gray-700 mb-3">Experto en desarrollo de liderazgo y comunicación efectiva.</p>
                    <div class="flex items-center justify-between">
                      <div class="text-sm">
                        <span class="text-gray-500">Duración:</span>
                        <span class="font-medium text-gray-900 ml-1">60 min</span>
                      </div>
                      <button class="glass-button-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30 text-sm">
                        Reservar Sesión
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Coach 3 -->
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300">
                <div class="flex items-start space-x-4">
                  <img 
                    src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=100" 
                    alt="Laura Sánchez"
                    class="w-20 h-20 rounded-xl object-cover"
                  />
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900">Laura Sánchez</h3>
                    <p class="text-sm text-primary font-medium mb-2">Coach Nutricional y Wellness</p>
                    <div class="flex items-center mb-2">
                      <div class="flex items-center mr-4">
                        <Star class="h-4 w-4 text-yellow-500 fill-current" />
                        <span class="text-sm text-gray-600 ml-1">4.7 (64 reseñas)</span>
                      </div>
                      <span class="text-sm text-gray-600">6 años exp.</span>
                    </div>
                    <div class="flex flex-wrap gap-1 mb-3">
                      <span class="bg-green-100/80 text-green-800 px-2 py-1 rounded-full text-xs backdrop-blur-sm border border-green-200/50">Nutrición</span>
                      <span class="bg-yellow-100/80 text-yellow-800 px-2 py-1 rounded-full text-xs backdrop-blur-sm border border-yellow-200/50">Hábitos saludables</span>
                    </div>
                    <p class="text-sm text-gray-700 mb-3">Nutricionista especializada en hábitos saludables y bienestar integral.</p>
                    <div class="flex items-center justify-between">
                      <div class="text-sm">
                        <span class="text-gray-500">Duración:</span>
                        <span class="font-medium text-gray-900 ml-1">45 min</span>
                      </div>
                      <button class="glass-button-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30 text-sm">
                        Reservar Sesión
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Coach 4 -->
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300">
                <div class="flex items-start space-x-4">
                  <img 
                    src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100" 
                    alt="Roberto Mendoza"
                    class="w-20 h-20 rounded-xl object-cover"
                  />
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900">Roberto Mendoza</h3>
                    <p class="text-sm text-primary font-medium mb-2">Coach de Carrera y Desarrollo</p>
                    <div class="flex items-center mb-2">
                      <div class="flex items-center mr-4">
                        <Star class="h-4 w-4 text-yellow-500 fill-current" />
                        <span class="text-sm text-gray-600 ml-1">4.9 (156 reseñas)</span>
                      </div>
                      <span class="text-sm text-gray-600">10 años exp.</span>
                    </div>
                    <div class="flex flex-wrap gap-1 mb-3">
                      <span class="bg-indigo-100/80 text-indigo-800 px-2 py-1 rounded-full text-xs backdrop-blur-sm border border-indigo-200/50">Desarrollo de carrera</span>
                      <span class="bg-purple-100/80 text-purple-800 px-2 py-1 rounded-full text-xs backdrop-blur-sm border border-purple-200/50">Planificación estratégica</span>
                    </div>
                    <p class="text-sm text-gray-700 mb-3">Especialista en desarrollo de carrera y transiciones profesionales.</p>
                    <div class="flex items-center justify-between">
                      <div class="text-sm">
                        <span class="text-gray-500">Duración:</span>
                        <span class="font-medium text-gray-900 ml-1">60 min</span>
                      </div>
                      <button class="glass-button-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30 text-sm">
                        Reservar Sesión
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Coach 5 -->
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300">
                <div class="flex items-start space-x-4">
                  <img 
                    src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=100" 
                    alt="Carmen Vega"
                    class="w-20 h-20 rounded-xl object-cover"
                  />
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900">Carmen Vega</h3>
                    <p class="text-sm text-primary font-medium mb-2">Coach de Mindfulness y Emocional</p>
                    <div class="flex items-center mb-2">
                      <div class="flex items-center mr-4">
                        <Star class="h-4 w-4 text-yellow-500 fill-current" />
                        <span class="text-sm text-gray-600 ml-1">4.8 (73 reseñas)</span>
                      </div>
                      <span class="text-sm text-gray-600">7 años exp.</span>
                    </div>
                    <div class="flex flex-wrap gap-1 mb-3">
                      <span class="bg-pink-100/80 text-pink-800 px-2 py-1 rounded-full text-xs backdrop-blur-sm border border-pink-200/50">Inteligencia emocional</span>
                      <span class="bg-purple-100/80 text-purple-800 px-2 py-1 rounded-full text-xs backdrop-blur-sm border border-purple-200/50">Mindfulness</span>
                    </div>
                    <p class="text-sm text-gray-700 mb-3">Psicóloga especializada en inteligencia emocional y mindfulness.</p>
                    <div class="flex items-center justify-between">
                      <div class="text-sm">
                        <span class="text-gray-500">Duración:</span>
                        <span class="font-medium text-gray-900 ml-1">50 min</span>
                      </div>
                      <button class="glass-button-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30 text-sm">
                        Reservar Sesión
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Coach 6 -->
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300">
                <div class="flex items-start space-x-4">
                  <img 
                    src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=100" 
                    alt="Andrés Morales"
                    class="w-20 h-20 rounded-xl object-cover"
                  />
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900">Andrés Morales</h3>
                    <p class="text-sm text-primary font-medium mb-2">Coach de Productividad y Organización</p>
                    <div class="flex items-center mb-2">
                      <div class="flex items-center mr-4">
                        <Star class="h-4 w-4 text-yellow-500 fill-current" />
                        <span class="text-sm text-gray-600 ml-1">4.6 (42 reseñas)</span>
                      </div>
                      <span class="text-sm text-gray-600">5 años exp.</span>
                    </div>
                    <div class="flex flex-wrap gap-1 mb-3">
                      <span class="bg-orange-100/80 text-orange-800 px-2 py-1 rounded-full text-xs backdrop-blur-sm border border-orange-200/50">Gestión del tiempo</span>
                      <span class="bg-red-100/80 text-red-800 px-2 py-1 rounded-full text-xs backdrop-blur-sm border border-red-200/50">Productividad</span>
                    </div>
                    <p class="text-sm text-gray-700 mb-3">Experto en optimización del tiempo y técnicas de productividad.</p>
                    <div class="flex items-center justify-between">
                      <div class="text-sm">
                        <span class="text-gray-500">Duración:</span>
                        <span class="font-medium text-gray-900 ml-1">45 min</span>
                      </div>
                      <button class="glass-button-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30 text-sm">
                        Reservar Sesión
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Historial de Sesiones -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6 flex items-center">
              <History class="h-5 w-5 mr-2 text-primary" />
              Historial de Sesiones
            </h2>
            <div class="space-y-4">
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <div class="flex items-start justify-between">
                  <div class="flex items-start space-x-4">
                    <img 
                      src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=100" 
                      alt="Laura Sánchez"
                      class="w-12 h-12 rounded-lg object-cover"
                    />
                    <div class="flex-1">
                      <h3 class="text-lg font-semibold text-gray-900">Consulta Nutricional Personalizada</h3>
                      <p class="text-sm text-gray-600 mb-1">con Laura Sánchez - Coach Nutricional</p>
                      <div class="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <span>10 Enero 2025, 12:00</span>
                        <span class="flex items-center">
                          <Globe class="h-3 w-3 mr-1" />
                          Online
                        </span>
                        <span>45 min</span>
                      </div>
                      <p class="text-sm text-gray-700">"Excelente sesión, muy personalizada y útil"</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="flex items-center mb-2">
                      <Star class="h-4 w-4 text-yellow-500 fill-current" />
                      <Star class="h-4 w-4 text-yellow-500 fill-current" />
                      <Star class="h-4 w-4 text-yellow-500 fill-current" />
                      <Star class="h-4 w-4 text-yellow-500 fill-current" />
                      <Star class="h-4 w-4 text-yellow-500 fill-current" />
                    </div>
                    <span class="bg-blue-100/80 text-blue-800 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-blue-200/50">
                      +80 puntos
                    </span>
                  </div>
                </div>
              </div>

              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <div class="flex items-start justify-between">
                  <div class="flex items-start space-x-4">
                    <img 
                      src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=100" 
                      alt="Carmen Vega"
                      class="w-12 h-12 rounded-lg object-cover"
                    />
                    <div class="flex-1">
                      <h3 class="text-lg font-semibold text-gray-900">Sesión de Mindfulness y Gestión Emocional</h3>
                      <p class="text-sm text-gray-600 mb-1">con Carmen Vega - Coach de Mindfulness</p>
                      <div class="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <span>5 Enero 2025, 14:00</span>
                        <span class="flex items-center">
                          <MapPin class="h-3 w-3 mr-1" />
                          Presencial
                        </span>
                        <span>50 min</span>
                      </div>
                      <p class="text-sm text-gray-700">"Muy relajante, aprendí técnicas que uso diariamente"</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="flex items-center mb-2">
                      <Star class="h-4 w-4 text-yellow-500 fill-current" />
                      <Star class="h-4 w-4 text-yellow-500 fill-current" />
                      <Star class="h-4 w-4 text-yellow-500 fill-current" />
                      <Star class="h-4 w-4 text-yellow-500 fill-current" />
                      <Star class="h-4 w-4 text-gray-300" />
                    </div>
                    <span class="bg-blue-100/80 text-blue-800 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-blue-200/50">
                      +90 puntos
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Beneficios del Coaching Personal -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6 flex items-center">
              <Heart class="h-5 w-5 mr-2 text-red-500" />
              ¿Por qué elegir Coaching Personal?
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="text-center">
                <div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Target class="h-6 w-6 text-blue-600" />
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">Atención Personalizada</h3>
                <p class="text-sm text-gray-600">Sesiones 100% enfocadas en tus necesidades específicas</p>
              </div>
              <div class="text-center">
                <div class="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <TrendingUp class="h-6 w-6 text-green-600" />
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">Resultados Medibles</h3>
                <p class="text-sm text-gray-600">Seguimiento de progreso y objetivos claros</p>
              </div>
              <div class="text-center">
                <div class="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Clock class="h-6 w-6 text-purple-600" />
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">Flexibilidad Total</h3>
                <p class="text-sm text-gray-600">Horarios que se adaptan a tu agenda laboral</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Cursos y Talleres View -->
        <div v-if="activeView === 'cursos'" class="space-y-8">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Cursos y Talleres</h1>
              <p class="text-gray-600 mt-1">Desarrolla nuevas habilidades técnicas y blandas con nuestros cursos especializados.</p>
            </div>
            <div class="flex items-center space-x-4">
              <select class="px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm">
                <option>Todas las categorías</option>
                <option>Habilidades Técnicas</option>
                <option>Habilidades Blandas</option>
                <option>Bienestar Personal</option>
              </select>
              <select class="px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm">
                <option>Todos los niveles</option>
                <option>Básico</option>
                <option>Intermedio</option>
                <option>Avanzado</option>
              </select>
            </div>
          </div>

          <!-- Mis Cursos Activos -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6 flex items-center">
              <BookOpen class="h-5 w-5 mr-2 text-primary" />
              Mis Cursos Activos
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20">
                <img src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Comunicación" class="w-full h-32 object-cover" />
                <div class="p-4">
                  <div class="flex items-center justify-between mb-2">
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">Taller</span>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Confirmado</span>
                  </div>
                  <h3 class="text-lg font-bold text-gray-900 mb-2">Taller de Comunicación Asertiva</h3>
                  <p class="text-sm text-gray-600 mb-3">Mejora tus habilidades de comunicación para relaciones laborales más efectivas.</p>
                  <div class="space-y-2 text-sm text-gray-600">
                    <div class="flex items-center">
                      <Calendar class="h-4 w-4 mr-2" />
                      <span>25 de enero, 9:00-17:00</span>
                    </div>
                    <div class="flex items-center">
                      <LocationIcon class="h-4 w-4 mr-2" />
                      <span>Sala de formación - Planta 3</span>
                    </div>
                    <div class="flex items-center">
                      <User class="h-4 w-4 mr-2" />
                      <span>Lic. Carmen Vega</span>
                    </div>
                  </div>
                  <div class="mt-4 pt-4 border-t border-gray-200">
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-gray-500">Comienza en 5 días</span>
                      <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">+100 puntos</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20">
                <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Liderazgo" class="w-full h-32 object-cover" />
                <div class="p-4">
                  <div class="flex items-center justify-between mb-2">
                    <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">Curso</span>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Confirmado</span>
                  </div>
                  <h3 class="text-lg font-bold text-gray-900 mb-2">Liderazgo Digital en la Era Moderna</h3>
                  <p class="text-sm text-gray-600 mb-3">Desarrolla habilidades de liderazgo adaptadas al entorno digital actual.</p>
                  <div class="space-y-2 text-sm text-gray-600">
                    <div class="flex items-center">
                      <Calendar class="h-4 w-4 mr-2" />
                      <span>Inicia 1 feb - Mar y Jue, 17:00-19:00</span>
                    </div>
                    <div class="flex items-center">
                      <Monitor class="h-4 w-4 mr-2" />
                      <span>Modalidad online - Zoom</span>
                    </div>
                    <div class="flex items-center">
                      <User class="h-4 w-4 mr-2" />
                      <span>Dr. Roberto Mendoza</span>
                    </div>
                  </div>
                  <div class="mt-4 pt-4 border-t border-gray-200">
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-gray-500">Comienza en 12 días</span>
                      <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">+200 puntos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Cursos Disponibles -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6 flex items-center">
              <GraduationCap class="h-5 w-5 mr-2 text-primary" />
              Cursos y Talleres Disponibles
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Curso de React/Vue -->
              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <img src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Desarrollo Web" class="w-full h-48 object-cover" />
                <div class="p-6">
                  <div class="flex items-center justify-between mb-3">
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">Curso Técnico</span>
                    <span class="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">Intermedio</span>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Desarrollo Web con React y Vue.js</h3>
                  <p class="text-gray-600 mb-4">Aprende los frameworks más populares para desarrollo frontend moderno.</p>
                  
                  <div class="space-y-2 text-sm text-gray-600 mb-4">
                    <div class="flex items-center">
                      <Clock class="h-4 w-4 mr-2" />
                      <span>8 semanas • 40 horas totales</span>
                    </div>
                    <div class="flex items-center">
                      <Calendar class="h-4 w-4 mr-2" />
                      <span>Inicia 10 feb • Lun y Mié, 18:00-20:00</span>
                    </div>
                    <div class="flex items-center">
                      <Monitor class="h-4 w-4 mr-2" />
                      <span>Modalidad híbrida</span>
                    </div>
                    <div class="flex items-center">
                      <Users class="h-4 w-4 mr-2" />
                      <span>12/15 plazas ocupadas</span>
                    </div>
                  </div>

                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                      <DollarSign class="h-4 w-4 mr-1 text-green-600" />
                      <span class="text-sm text-green-600 font-semibold">€50 (desc. empleado)</span>
                      <span class="text-xs text-gray-500 line-through ml-2">€450</span>
                    </div>
                    <div class="flex items-center">
                      <Award class="h-4 w-4 mr-1 text-yellow-600" />
                      <span class="text-xs text-yellow-600">+300 puntos</span>
                    </div>
                  </div>

                  <button class="w-full glass-button-primary text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
                    Inscribirse al Curso
                  </button>
                </div>
              </div>

              <!-- Taller Gestión del Tiempo -->
              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Productividad" class="w-full h-48 object-cover" />
                <div class="p-6">
                  <div class="flex items-center justify-between mb-3">
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Taller</span>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Básico</span>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Gestión del Tiempo y Productividad</h3>
                  <p class="text-gray-600 mb-4">Técnicas probadas para optimizar tu tiempo y aumentar tu productividad diaria.</p>
                  
                  <div class="space-y-2 text-sm text-gray-600 mb-4">
                    <div class="flex items-center">
                      <Clock class="h-4 w-4 mr-2" />
                      <span>2 días • 12 horas totales</span>
                    </div>
                    <div class="flex items-center">
                      <Calendar class="h-4 w-4 mr-2" />
                      <span>15-16 feb • Sáb y Dom, 9:00-15:00</span>
                    </div>
                    <div class="flex items-center">
                      <Monitor class="h-4 w-4 mr-2" />
                      <span>Modalidad online</span>
                    </div>
                    <div class="flex items-center">
                      <Users class="h-4 w-4 mr-2" />
                      <span>22/30 plazas ocupadas</span>
                    </div>
                  </div>

                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                      <span class="text-sm text-green-600 font-semibold">GRATUITO</span>
                      <span class="text-xs text-gray-500 line-through ml-2">€200</span>
                    </div>
                    <div class="flex items-center">
                      <Award class="h-4 w-4 mr-1 text-yellow-600" />
                      <span class="text-xs text-yellow-600">+150 puntos</span>
                    </div>
                  </div>

                  <button class="w-full glass-button-primary text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
                    Inscribirse al Taller
                  </button>
                </div>
              </div>

              <!-- Curso Python -->
              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <img src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Python" class="w-full h-48 object-cover" />
                <div class="p-6">
                  <div class="flex items-center justify-between mb-3">
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">Curso Técnico</span>
                    <span class="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">Intermedio</span>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Análisis de Datos con Python</h3>
                  <p class="text-gray-600 mb-4">Aprende a analizar datos y crear visualizaciones usando Python y sus librerías.</p>
                  
                  <div class="space-y-2 text-sm text-gray-600 mb-4">
                    <div class="flex items-center">
                      <Clock class="h-4 w-4 mr-2" />
                      <span>10 semanas • 50 horas totales</span>
                    </div>
                    <div class="flex items-center">
                      <Calendar class="h-4 w-4 mr-2" />
                      <span>Inicia 1 mar • Mar y Vie, 19:00-21:00</span>
                    </div>
                    <div class="flex items-center">
                      <Monitor class="h-4 w-4 mr-2" />
                      <span>Modalidad online</span>
                    </div>
                    <div class="flex items-center">
                      <Users class="h-4 w-4 mr-2" />
                      <span>5/20 plazas ocupadas</span>
                    </div>
                  </div>

                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                      <DollarSign class="h-4 w-4 mr-1 text-green-600" />
                      <span class="text-sm text-green-600 font-semibold">€75 (desc. empleado)</span>
                      <span class="text-xs text-gray-500 line-through ml-2">€550</span>
                    </div>
                    <div class="flex items-center">
                      <Award class="h-4 w-4 mr-1 text-yellow-600" />
                      <span class="text-xs text-yellow-600">+400 puntos</span>
                    </div>
                  </div>

                  <div class="mb-4">
                    <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Próximamente</span>
                  </div>

                  <button class="w-full glass-button-secondary text-gray-800 py-3 px-4 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm border border-gray-300/50">
                    Lista de Espera
                  </button>
                </div>
              </div>

              <!-- Taller Presentaciones -->
              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Presentaciones" class="w-full h-48 object-cover" />
                <div class="p-6">
                  <div class="flex items-center justify-between mb-3">
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Taller</span>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Básico</span>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Presentaciones Impactantes</h3>
                  <p class="text-gray-600 mb-4">Crea presentaciones que cautiven a tu audiencia y comuniquen ideas efectivamente.</p>
                  
                  <div class="space-y-2 text-sm text-gray-600 mb-4">
                    <div class="flex items-center">
                      <Clock class="h-4 w-4 mr-2" />
                      <span>1 día • 6 horas totales</span>
                    </div>
                    <div class="flex items-center">
                      <Calendar class="h-4 w-4 mr-2" />
                      <span>8 de febrero • Sáb, 10:00-16:00</span>
                    </div>
                    <div class="flex items-center">
                      <LocationIcon class="h-4 w-4 mr-2" />
                      <span>Auditorio principal</span>
                    </div>
                    <div class="flex items-center">
                      <Users class="h-4 w-4 mr-2" />
                      <span>11/18 plazas ocupadas</span>
                    </div>
                  </div>

                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                      <span class="text-sm text-green-600 font-semibold">GRATUITO</span>
                      <span class="text-xs text-gray-500 line-through ml-2">€120</span>
                    </div>
                    <div class="flex items-center">
                      <Award class="h-4 w-4 mr-1 text-yellow-600" />
                      <span class="text-xs text-yellow-600">+80 puntos</span>
                    </div>
                  </div>

                  <button class="w-full glass-button-primary text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
                    Inscribirse al Taller
                  </button>
                </div>
              </div>

              <!-- Curso Ciberseguridad -->
              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <img src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Ciberseguridad" class="w-full h-48 object-cover" />
                <div class="p-6">
                  <div class="flex items-center justify-between mb-3">
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">Curso Técnico</span>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Básico</span>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Ciberseguridad para Profesionales</h3>
                  <p class="text-gray-600 mb-4">Protege tu información y la de tu empresa con conocimientos esenciales de ciberseguridad.</p>
                  
                  <div class="space-y-2 text-sm text-gray-600 mb-4">
                    <div class="flex items-center">
                      <Clock class="h-4 w-4 mr-2" />
                      <span>4 semanas • 20 horas totales</span>
                    </div>
                    <div class="flex items-center">
                      <Calendar class="h-4 w-4 mr-2" />
                      <span>Inicia 30 ene • Mié y Vie, 18:30-20:30</span>
                    </div>
                    <div class="flex items-center">
                      <Monitor class="h-4 w-4 mr-2" />
                      <span>Modalidad híbrida</span>
                    </div>
                    <div class="flex items-center">
                      <Users class="h-4 w-4 mr-2" />
                      <span>18/25 plazas ocupadas</span>
                    </div>
                  </div>

                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                      <DollarSign class="h-4 w-4 mr-1 text-green-600" />
                      <span class="text-sm text-green-600 font-semibold">€25 (desc. empleado)</span>
                      <span class="text-xs text-gray-500 line-through ml-2">€350</span>
                    </div>
                    <div class="flex items-center">
                      <Award class="h-4 w-4 mr-1 text-yellow-600" />
                      <span class="text-xs text-yellow-600">+250 puntos</span>
                    </div>
                  </div>

                  <button class="w-full glass-button-primary text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
                    Inscribirse al Curso
                  </button>
                </div>
              </div>

              <!-- Excel Avanzado -->
              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <img src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Excel" class="w-full h-48 object-cover" />
                <div class="p-6">
                  <div class="flex items-center justify-between mb-3">
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">Curso Técnico</span>
                    <span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">Avanzado</span>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Excel Avanzado para Análisis de Datos</h3>
                  <p class="text-gray-600 mb-4">Domina Excel para análisis de datos, automatización y creación de dashboards profesionales.</p>
                  
                  <div class="space-y-2 text-sm text-gray-600 mb-4">
                    <div class="flex items-center">
                      <Clock class="h-4 w-4 mr-2" />
                      <span>5 semanas • 25 horas totales</span>
                    </div>
                    <div class="flex items-center">
                      <Calendar class="h-4 w-4 mr-2" />
                      <span>Inicia 20 feb • Jue, 19:00-21:00</span>
                    </div>
                    <div class="flex items-center">
                      <Monitor class="h-4 w-4 mr-2" />
                      <span>Modalidad online</span>
                    </div>
                    <div class="flex items-center">
                      <Users class="h-4 w-4 mr-2" />
                      <span>6/22 plazas ocupadas</span>
                    </div>
                  </div>

                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                      <DollarSign class="h-4 w-4 mr-1 text-green-600" />
                      <span class="text-sm text-green-600 font-semibold">€30 (desc. empleado)</span>
                      <span class="text-xs text-gray-500 line-through ml-2">€280</span>
                    </div>
                    <div class="flex items-center">
                      <Award class="h-4 w-4 mr-1 text-yellow-600" />
                      <span class="text-xs text-yellow-600">+180 puntos</span>
                    </div>
                  </div>

                  <button class="w-full glass-button-primary text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
                    Inscribirse al Curso
                  </button>
                </div>
              </div>

              <!-- Taller Trabajo en Equipo -->
              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <img src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Trabajo en equipo" class="w-full h-48 object-cover" />
                <div class="p-6">
                  <div class="flex items-center justify-between mb-3">
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Taller</span>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Básico</span>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Trabajo en Equipo y Colaboración</h3>
                  <p class="text-gray-600 mb-4">Fortalece tus habilidades de trabajo en equipo y colaboración efectiva.</p>
                  
                  <div class="space-y-2 text-sm text-gray-600 mb-4">
                    <div class="flex items-center">
                      <Clock class="h-4 w-4 mr-2" />
                      <span>1 día • 7 horas totales</span>
                    </div>
                    <div class="flex items-center">
                      <Calendar class="h-4 w-4 mr-2" />
                      <span>22 de febrero • Sáb, 9:00-16:00</span>
                    </div>
                    <div class="flex items-center">
                      <LocationIcon class="h-4 w-4 mr-2" />
                      <span>Sala de dinámicas - Planta 1</span>
                    </div>
                    <div class="flex items-center">
                      <Users class="h-4 w-4 mr-2" />
                      <span>16/24 plazas ocupadas</span>
                    </div>
                  </div>

                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                      <span class="text-sm text-green-600 font-semibold">GRATUITO</span>
                      <span class="text-xs text-gray-500 line-through ml-2">€130</span>
                    </div>
                    <div class="flex items-center">
                      <Award class="h-4 w-4 mr-1 text-yellow-600" />
                      <span class="text-xs text-yellow-600">+90 puntos</span>
                    </div>
                  </div>

                  <button class="w-full glass-button-primary text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
                    Inscribirse al Taller
                  </button>
                </div>
              </div>

              <!-- Taller Mindfulness -->
              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <img src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Mindfulness" class="w-full h-48 object-cover" />
                <div class="p-6">
                  <div class="flex items-center justify-between mb-3">
                    <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">Taller Bienestar</span>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Básico</span>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Mindfulness y Gestión del Estrés</h3>
                  <p class="text-gray-600 mb-4">Técnicas de mindfulness aplicadas al entorno laboral para reducir estrés y mejorar el bienestar.</p>
                  
                  <div class="space-y-2 text-sm text-gray-600 mb-4">
                    <div class="flex items-center">
                      <Clock class="h-4 w-4 mr-2" />
                      <span>1 día • 5 horas totales</span>
                    </div>
                    <div class="flex items-center">
                      <Calendar class="h-4 w-4 mr-2" />
                      <span>12 de febrero • Mié, 14:00-19:00</span>
                    </div>
                    <div class="flex items-center">
                      <LocationIcon class="h-4 w-4 mr-2" />
                      <span>Sala de relajación</span>
                    </div>
                    <div class="flex items-center">
                      <Users class="h-4 w-4 mr-2" />
                      <span>9/16 plazas ocupadas</span>
                    </div>
                  </div>

                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                      <span class="text-sm text-green-600 font-semibold">GRATUITO</span>
                      <span class="text-xs text-gray-500 line-through ml-2">€100</span>
                    </div>
                    <div class="flex items-center">
                      <Award class="h-4 w-4 mr-1 text-yellow-600" />
                      <span class="text-xs text-yellow-600">+75 puntos</span>
                    </div>
                  </div>

                  <button class="w-full glass-button-primary text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
                    Inscribirse al Taller
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Mis Cursos Completados -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6 flex items-center">
              <CheckSquare class="h-5 w-5 mr-2 text-green-600" />
              Cursos Completados
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20">
                <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Project Management" class="w-full h-32 object-cover" />
                <div class="p-4">
                  <div class="flex items-center justify-between mb-2">
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">Curso</span>
                    <div class="flex items-center">
                      <CheckCircle class="h-4 w-4 text-green-500 mr-1" />
                      <span class="text-xs text-green-600 font-medium">Completado</span>
                    </div>
                  </div>
                  <h3 class="text-lg font-bold text-gray-900 mb-2">Fundamentos de Project Management</h3>
                  <p class="text-sm text-gray-600 mb-3">Completado el 15 de diciembre de 2024</p>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <Star class="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span class="text-sm text-gray-600">4.8/5.0</span>
                    </div>
                    <div class="flex items-center">
                      <Award class="h-4 w-4 text-yellow-600 mr-1" />
                      <span class="text-xs text-yellow-600">+220 puntos</span>
                    </div>
                  </div>
                  <div class="mt-3 pt-3 border-t border-gray-200">
                    <button class="w-full glass-button-outline text-primary bg-white/60 hover:bg-blue-50/80 py-2 px-4 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm border border-blue-300/50">
                      Ver Certificado
                    </button>
                  </div>
                </div>
              </div>

              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20">
                <img src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Creatividad" class="w-full h-32 object-cover" />
                <div class="p-4">
                  <div class="flex items-center justify-between mb-2">
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Taller</span>
                    <div class="flex items-center">
                      <CheckCircle class="h-4 w-4 text-green-500 mr-1" />
                      <span class="text-xs text-green-600 font-medium">Completado</span>
                    </div>
                  </div>
                  <h3 class="text-lg font-bold text-gray-900 mb-2">Creatividad e Innovación</h3>
                  <p class="text-sm text-gray-600 mb-3">Completado el 8 de diciembre de 2024</p>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <Star class="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span class="text-sm text-gray-600">4.9/5.0</span>
                    </div>
                    <div class="flex items-center">
                      <Award class="h-4 w-4 text-yellow-600 mr-1" />
                      <span class="text-xs text-yellow-600">+120 puntos</span>
                    </div>
                  </div>
                  <div class="mt-3 pt-3 border-t border-gray-200">
                    <span class="text-xs text-gray-500">Sin certificado • Taller práctico</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Estadísticas de Formación -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6 flex items-center">
              <Target class="h-5 w-5 mr-2 text-primary" />
              Mi Progreso en Formación
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div class="text-center">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <GraduationCap class="h-8 w-8 text-white" />
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-1">4</h3>
                <p class="text-sm text-gray-600">Cursos Completados</p>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award class="h-8 w-8 text-white" />
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-1">3</h3>
                <p class="text-sm text-gray-600">Certificados Obtenidos</p>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock class="h-8 w-8 text-white" />
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-1">67</h3>
                <p class="text-sm text-gray-600">Horas de Formación</p>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star class="h-8 w-8 text-white" />
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-1">4.85</h3>
                <p class="text-sm text-gray-600">Calificación Promedio</p>
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
                  <p class="text-xs text-gray-500 mt-1">Elena Vásquez • Sala de bienestar</p>
                </div>
                <div class="text-right">
                  <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Confirmada</span>
                  <p class="text-xs text-gray-500 mt-1">+50 puntos</p>
                </div>
              </div>
              <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div>
                  <h3 class="font-semibold text-gray-900">Coaching: Gestión del Tiempo</h3>
                  <p class="text-sm text-gray-600">Miércoles, 5:00 PM - Online</p>
                  <p class="text-xs text-gray-500 mt-1">Miguel Torres • Zoom</p>
                </div>
                <div class="text-right">
                  <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Confirmada</span>
                  <p class="text-xs text-gray-500 mt-1">+40 puntos</p>
                </div>
              </div>
              <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div>
                  <h3 class="font-semibold text-gray-900">Nutrición: Snacks Saludables</h3>
                  <p class="text-sm text-gray-600">Jueves, 12:30 PM - Online</p>
                  <p class="text-xs text-gray-500 mt-1">Laura Sánchez • Google Meet</p>
                </div>
                <div class="text-right">
                  <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Confirmada</span>
                  <p class="text-xs text-gray-500 mt-1">+30 puntos</p>
                </div>
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
                  <p class="text-xs text-gray-500 mt-1">Elena Vásquez • Presencial</p>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">Completada</span>
                  <div class="flex items-center">
                    <Star class="h-4 w-4 text-yellow-400 fill-current" />
                    <span class="text-sm text-gray-600 ml-1">5.0</span>
                  </div>
                </div>
              </div>
              <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div>
                  <h3 class="font-semibold text-gray-900">Meditación Anti-Estrés</h3>
                  <p class="text-sm text-gray-600">12 de enero, 1:00 PM</p>
                  <p class="text-xs text-gray-500 mt-1">Elena Vásquez • Online</p>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">Completada</span>
                  <div class="flex items-center">
                    <Star class="h-4 w-4 text-yellow-400 fill-current" />
                    <span class="text-sm text-gray-600 ml-1">4.8</span>
                  </div>
                </div>
              </div>
              <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div>
                  <h3 class="font-semibold text-gray-900">Coaching: Liderazgo Personal</h3>
                  <p class="text-sm text-gray-600">8 de enero, 4:30 PM</p>
                  <p class="text-xs text-gray-500 mt-1">Miguel Torres • Online</p>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">Completada</span>
                  <div class="flex items-center">
                    <Star class="h-4 w-4 text-yellow-400 fill-current" />
                    <span class="text-sm text-gray-600 ml-1">4.9</span>
                  </div>
                </div>
              </div>
              <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div>
                  <h3 class="font-semibold text-gray-900">Nutrición: Desayunos Energéticos</h3>
                  <p class="text-sm text-gray-600">5 de enero, 9:00 AM</p>
                  <p class="text-xs text-gray-500 mt-1">Laura Sánchez • Presencial</p>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">Completada</span>
                  <div class="flex items-center">
                    <Star class="h-4 w-4 text-yellow-400 fill-current" />
                    <span class="text-sm text-gray-600 ml-1">4.7</span>
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

          <!-- Encuestas Pendientes -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-4">Encuestas Pendientes</h2>
            <div class="space-y-4">
              <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div>
                  <h2 class="text-lg font-bold text-gray-800">Evaluación de Clima Laboral Q1 2025</h2>
                  <p class="text-sm text-gray-600 mt-1">Encuesta trimestral para evaluar el ambiente de trabajo y bienestar.</p>
                  <p class="text-xs text-gray-500 mt-2">Fecha límite: 30 de enero de 2025 • 8 preguntas</p>
                </div>
                <button class="glass-button-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 backdrop-blur-sm border border-blue-500/30">
                  Completar Encuesta
                </button>
              </div>
            </div>
          </div>

          <!-- Encuestas Completadas -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-4">Encuestas Completadas</h2>
            <div class="space-y-4">
              <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div>
                  <h2 class="text-lg font-bold text-gray-800">Satisfacción con Servicios de Coaching</h2>
                  <p class="text-sm text-gray-600 mt-1">Evaluación específica sobre las sesiones de coaching.</p>
                  <p class="text-xs text-gray-500 mt-2">Completada el 15 de diciembre • 6 preguntas</p>
                </div>
                <div class="text-right">
                  <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Completada</span>
                  <p class="text-xs text-gray-500 mt-1">+25 puntos ganados</p>
                </div>
              </div>
              <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div>
                  <h2 class="text-lg font-bold text-gray-800">Feedback Actividades Noviembre</h2>
                  <p class="text-sm text-gray-600 mt-1">Opiniones sobre las actividades de bienestar del mes.</p>
                  <p class="text-xs text-gray-500 mt-2">Completada el 28 de noviembre • 5 preguntas</p>
                </div>
                <div class="text-right">
                  <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Completada</span>
                  <p class="text-xs text-gray-500 mt-1">+20 puntos ganados</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Desafíos View -->
        <div v-if="activeView === 'desafios'" class="space-y-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Desafíos de Bienestar</h1>
            <p class="text-gray-600 mt-1">Participa en nuestros desafíos, gana puntos y mejora tu bienestar.</p>
          </div>

          <!-- Mis Desafíos Activos -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-4">Mis Desafíos Activos</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20">
                <img src="https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Caminar" class="w-full h-32 object-cover" />
                <div class="p-4">
                  <h3 class="text-lg font-bold text-gray-900 mb-2">Camina 10,000 pasos diarios</h3>
                  <p class="text-sm text-gray-600 mb-3">Progreso: 3/7 días completados</p>
                  <div class="mb-3">
                    <div class="flex justify-between text-sm mb-1">
                      <span>Progreso</span>
                      <span>43%</span>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2">
                      <div class="bg-primary rounded-full h-2" style="width: 43%"></div>
                    </div>
                  </div>
                  <div class="flex items-center justify-between mb-3">
                    <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">150 puntos</span>
                    <span class="text-xs text-gray-500">Termina en 4 días</span>
                  </div>
                  <button class="w-full glass-button-secondary text-gray-800 py-2 px-4 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm border border-gray-300/50">
                    Registrar Progreso
                  </button>
                </div>
              </div>

              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20">
                <img src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Meditación" class="w-full h-32 object-cover" />
                <div class="p-4">
                  <h3 class="text-lg font-bold text-gray-900 mb-2">Meditación de 5 minutos</h3>
                  <p class="text-sm text-gray-600 mb-3">Progreso: 1/14 días completados</p>
                  <div class="mb-3">
                    <div class="flex justify-between text-sm mb-1">
                      <span>Progreso</span>
                      <span>7%</span>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2">
                      <div class="bg-primary rounded-full h-2" style="width: 7%"></div>
                    </div>
                  </div>
                  <div class="flex items-center justify-between mb-3">
                    <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">100 puntos</span>
                    <span class="text-xs text-gray-500">Termina en 13 días</span>
                  </div>
                  <button class="w-full glass-button-secondary text-gray-800 py-2 px-4 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm border border-gray-300/50">
                    Meditar Hoy
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Desafíos Disponibles -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-4">Desafíos Disponibles</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <img src="https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Hidratación" class="w-full h-48 object-cover" />
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Hidratación saludable</h3>
                <p class="text-gray-600 mb-4">Bebe al menos 8 vasos de agua al día durante 10 días consecutivos.</p>
                <div class="flex items-center justify-between mb-4">
                  <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Activo</span>
                  <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">75 puntos</span>
                </div>
                <button class="w-full glass-button-primary text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
                  Unirse al Desafío
                </button>
              </div>
            </div>

            <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <img src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Descanso digital" class="w-full h-48 object-cover" />
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Descanso Digital</h3>
                <p class="text-gray-600 mb-4">Desconéctate de dispositivos 1 hora antes de dormir durante una semana.</p>
                <div class="flex items-center justify-between mb-4">
                  <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Activo</span>
                  <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">120 puntos</span>
                </div>
                <button class="w-full glass-button-primary text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
                  Unirse al Desafío
                </button>
              </div>
            </div>

            <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Alimentación" class="w-full h-48 object-cover" />
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Alimentación Consciente</h3>
                <p class="text-gray-600 mb-4">Practica la alimentación consciente durante las comidas principales.</p>
                <div class="flex items-center justify-between mb-4">
                  <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Activo</span>
                  <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">200 puntos</span>
                </div>
                <button class="w-full glass-button-primary text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
                  Unirse al Desafío
                </button>
              </div>
            </div>

            <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <img src="https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Ejercicio" class="w-full h-48 object-cover" />
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">30 Minutos de Ejercicio</h3>
                <p class="text-gray-600 mb-4">Realiza 30 minutos de ejercicio diario durante 2 semanas.</p>
                <div class="flex items-center justify-between mb-4">
                  <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Activo</span>
                  <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">180 puntos</span>
                </div>
                <button class="w-full glass-button-primary text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30">
                  Unirse al Desafío
                </button>
              </div>
            </div>
          </div>
          </div>

          <!-- Desafíos Completados -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-4">Desafíos Completados</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20">
                <img src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Descanso digital" class="w-full h-32 object-cover" />
                <div class="p-4">
                  <h3 class="text-lg font-bold text-gray-900 mb-2">Descanso Digital</h3>
                  <p class="text-sm text-gray-600 mb-3">Completado el 22 de diciembre</p>
                  <div class="flex items-center justify-between">
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">+120 puntos</span>
                    <div class="flex items-center">
                      <CheckCircle class="h-4 w-4 text-green-500 mr-1" />
                      <span class="text-xs text-green-600 font-medium">Completado</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20">
                <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Alimentación" class="w-full h-32 object-cover" />
                <div class="p-4">
                  <h3 class="text-lg font-bold text-gray-900 mb-2">Alimentación Consciente</h3>
                  <p class="text-sm text-gray-600 mb-3">Completado el 20 de diciembre</p>
                  <div class="flex items-center justify-between">
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">+200 puntos</span>
                    <div class="flex items-center">
                      <CheckCircle class="h-4 w-4 text-green-500 mr-1" />
                      <span class="text-xs text-green-600 font-medium">Completado</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20">
                <img src="https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Ejercicio" class="w-full h-32 object-cover" />
                <div class="p-4">
                  <h3 class="text-lg font-bold text-gray-900 mb-2">Rutina de Estiramientos</h3>
                  <p class="text-sm text-gray-600 mb-3">Completado el 15 de diciembre</p>
                  <div class="flex items-center justify-between">
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">+80 puntos</span>
                    <div class="flex items-center">
                      <CheckCircle class="h-4 w-4 text-green-500 mr-1" />
                      <span class="text-xs text-green-600 font-medium">Completado</span>
                    </div>
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
import { useRouter } from 'vue-router';
import { 
  ActivitySquare, 
  ArrowLeft, 
  LayoutDashboard, 
  Calendar, 
  CalendarCheck, 
  ClipboardList, 
  Trophy,
  GraduationCap,
  MessageCircle,
  Activity,
  Brain,
  Droplets,
  Star,
  MapPin,
  Globe,
  User,
  CheckCircle,
  Clock,
  Users,
  Award,
  BookOpen,
  Monitor,
  MapPin as LocationIcon,
  DollarSign,
  Target,
  CheckSquare
} from 'lucide-vue-next';
import Button from '../../components/common/Button.vue';

const router = useRouter();
const activeView = ref('dashboard');

const empleadoNavLinks = [
</script>