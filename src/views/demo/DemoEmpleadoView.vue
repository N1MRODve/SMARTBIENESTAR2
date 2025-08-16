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
            <span class="text-sm text-gray-600">Ana Martínez - Desarrolladora</span>
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
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Mi Dashboard de Bienestar</h1>
            <p class="text-gray-600">¡Hola Ana! Aquí tienes tu resumen personal</p>
          </div>

          <!-- Estadísticas personales -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
              <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Trophy class="h-6 w-6 text-primary" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-1">1,250</h3>
              <p class="text-sm text-gray-600">Puntos de Bienestar</p>
            </div>

            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
              <div class="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Target class="h-6 w-6 text-green-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-1">3</h3>
              <p class="text-sm text-gray-600">Desafíos Completados</p>
            </div>

            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
              <div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Calendar class="h-6 w-6 text-blue-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-1">2</h3>
              <p class="text-sm text-gray-600">Próximas Sesiones</p>
            </div>

            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
              <div class="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Star class="h-6 w-6 text-purple-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-1">4.8</h3>
              <p class="text-sm text-gray-600">Calificación Promedio</p>
            </div>
          </div>

          <!-- Próximas actividades -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold mb-6 flex items-center">
                <Calendar class="h-5 w-5 mr-2 text-primary" />
                Mis Próximas Actividades
              </h2>
              <div class="space-y-4">
                <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-semibold text-gray-900">Yoga Matutino</h4>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Confirmada</span>
                  </div>
                  <p class="text-sm text-gray-600">Mañana, 8:00 AM - Online</p>
                  <p class="text-xs text-gray-500">Elena Vásquez • +50 puntos</p>
                </div>
                <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-semibold text-gray-900">Coaching Personal</h4>
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Confirmada</span>
                  </div>
                  <p class="text-sm text-gray-600">Viernes, 3:00 PM - Online</p>
                  <p class="text-xs text-gray-500">Miguel Torres • +100 puntos</p>
                </div>
              </div>
            </div>

            <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold mb-6 flex items-center">
                <Trophy class="h-5 w-5 mr-2 text-yellow-600" />
                Desafíos Activos
              </h2>
              <div class="space-y-4">
                <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20">
                  <h4 class="font-semibold text-gray-900 mb-2">Desafío de Hidratación</h4>
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-600">Progreso: 8/14 días</span>
                    <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">En progreso</span>
                  </div>
                  <div class="bg-gray-200 rounded-full h-2 mb-2">
                    <div class="bg-primary rounded-full h-2" style="width: 57%"></div>
                  </div>
                  <p class="text-xs text-gray-500">Termina en 6 días • +200 puntos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actividades View -->
        <div v-if="activeView === 'actividades'" class="space-y-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Actividades Disponibles</h1>
            <p class="text-gray-600 mt-1">Explora y reserva actividades de bienestar</p>
          </div>

          <!-- Filtros -->
          <div class="glass-container rounded-xl shadow-lg p-4 backdrop-blur-sm border border-white/30">
            <div class="flex flex-wrap gap-4">
              <select class="px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm">
                <option>Todos los tipos</option>
                <option>Yoga</option>
                <option>Meditación</option>
                <option>Nutrición</option>
                <option>Coaching</option>
              </select>
              <select class="px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm">
                <option>Todas las modalidades</option>
                <option>Online</option>
                <option>Presencial</option>
              </select>
              <input type="date" class="px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm">
            </div>
          </div>

          <!-- Grid de actividades -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <img src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Yoga" class="w-full h-48 object-cover">
              <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-lg font-semibold text-gray-900">Yoga Matutino</h3>
                  <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">5/15 plazas</span>
                </div>
                <p class="text-sm text-gray-600 mb-3">Sesión de yoga para comenzar el día con energía</p>
                <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Mañana, 8:00 AM</span>
                  <span>Online</span>
                </div>
                <Button class="w-full">Reservar Plaza</Button>
              </div>
            </div>

            <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <img src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Meditación" class="w-full h-48 object-cover">
              <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-lg font-semibold text-gray-900">Meditación Mindfulness</h3>
                  <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">8/12 plazas</span>
                </div>
                <p class="text-sm text-gray-600 mb-3">Técnicas de mindfulness para reducir el estrés</p>
                <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Miércoles, 6:00 PM</span>
                  <span>Presencial</span>
                </div>
                <Button class="w-full">Reservar Plaza</Button>
              </div>
            </div>

            <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <img src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Nutrición" class="w-full h-48 object-cover">
              <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-lg font-semibold text-gray-900">Taller de Nutrición</h3>
                  <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">3/20 plazas</span>
                </div>
                <p class="text-sm text-gray-600 mb-3">Aprende sobre alimentación saludable en el trabajo</p>
                <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Jueves, 12:30 PM</span>
                  <span>Híbrido</span>
                </div>
                <Button class="w-full">Reservar Plaza</Button>
              </div>
            </div>
          </div>
        </div>

        <!-- Mis Reservas View -->
        <div v-if="activeView === 'reservas'" class="space-y-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Mis Reservas</h1>
            <p class="text-gray-600 mt-1">Gestiona tus actividades reservadas</p>
          </div>

          <!-- Reservas activas -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Reservas Activas</h2>
            <div class="space-y-4">
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Activity class="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">Yoga Matutino</h3>
                    <p class="text-sm text-gray-600">Mañana, 8:00 AM - Online</p>
                    <p class="text-xs text-gray-500">Elena Vásquez</p>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Confirmada</span>
                  <Button variant="outline" class="text-xs px-3 py-1">Ver Detalles</Button>
                </div>
              </div>

              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <MessageCircle class="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">Coaching Personal</h3>
                    <p class="text-sm text-gray-600">Viernes, 3:00 PM - Online</p>
                    <p class="text-xs text-gray-500">Miguel Torres</p>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Confirmada</span>
                  <Button variant="outline" class="text-xs px-3 py-1">Ver Detalles</Button>
                </div>
              </div>
            </div>
          </div>

          <!-- Historial -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Historial de Actividades</h2>
            <div class="space-y-4">
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Brain class="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">Meditación Mindfulness</h3>
                    <p class="text-sm text-gray-600">Hace 3 días - Presencial</p>
                    <p class="text-xs text-gray-500">Carmen Vega</p>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="flex items-center">
                    <Star class="h-4 w-4 text-yellow-400 fill-current" />
                    <Star class="h-4 w-4 text-yellow-400 fill-current" />
                    <Star class="h-4 w-4 text-yellow-400 fill-current" />
                    <Star class="h-4 w-4 text-yellow-400 fill-current" />
                    <Star class="h-4 w-4 text-yellow-400 fill-current" />
                  </div>
                  <span class="text-xs text-gray-500">+75 pts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Encuestas View -->
        <div v-if="activeView === 'encuestas'" class="space-y-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Mis Encuestas</h1>
            <p class="text-gray-600 mt-1">Tu opinión es importante para nosotros</p>
          </div>

          <!-- Encuestas pendientes -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Encuestas Pendientes</h2>
            <div class="space-y-4">
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Evaluación de Clima Laboral Q1 2025</h3>
                  <p class="text-sm text-gray-600 mt-1">Ayúdanos a mejorar el ambiente de trabajo</p>
                  <p class="text-xs text-gray-500 mt-2">Termina en 15 días • 5 minutos aprox.</p>
                </div>
                <Button variant="primary">Completar Encuesta</Button>
              </div>
            </div>
          </div>

          <!-- Encuestas completadas -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Encuestas Completadas</h2>
            <div class="space-y-4">
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Satisfacción con Servicios de Coaching</h3>
                  <p class="text-sm text-gray-600 mt-1">Completada hace 1 mes</p>
                  <div class="flex items-center mt-2">
                    <CheckCircle class="h-4 w-4 text-green-500 mr-2" />
                    <span class="text-xs text-green-600">Completada • +50 puntos ganados</span>
                  </div>
                </div>
                <Button variant="outline">Ver Respuestas</Button>
              </div>
            </div>
          </div>
        </div>

        <!-- Desafíos View -->
        <div v-if="activeView === 'desafios'" class="space-y-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Desafíos de Bienestar</h1>
            <p class="text-gray-600 mt-1">Participa en desafíos y gana puntos</p>
          </div>

          <!-- Desafíos activos -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Desafíos Activos</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20">
                <img src="https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Hidratación" class="w-full h-32 object-cover">
                <div class="p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Desafío de Hidratación</h3>
                  <p class="text-sm text-gray-600 mb-4">Bebe 8 vasos de agua diarios durante 2 semanas</p>
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-xs text-gray-500">Progreso: 8/14 días</span>
                    <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">+200 pts</span>
                  </div>
                  <div class="bg-gray-200 rounded-full h-2 mb-4">
                    <div class="bg-primary rounded-full h-2" style="width: 57%"></div>
                  </div>
                  <Button class="w-full" variant="secondary">Registrar Progreso</Button>
                </div>
              </div>

              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20">
                <img src="https://images.pexels.com/photos/7432/pexels-photo-7432.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Pasos" class="w-full h-32 object-cover">
                <div class="p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">10,000 Pasos Diarios</h3>
                  <p class="text-sm text-gray-600 mb-4">Camina 10,000 pasos cada día durante un mes</p>
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-xs text-gray-500">Disponible</span>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">+500 pts</span>
                  </div>
                  <Button class="w-full">Unirse al Desafío</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Cursos y Talleres View -->
        <div v-if="activeView === 'cursos'" class="space-y-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Cursos y Talleres</h1>
            <p class="text-gray-600 mt-1">Desarrolla tus habilidades técnicas y blandas</p>
          </div>

          <!-- Estadísticas de formación -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <BookOpen class="h-6 w-6 text-blue-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-1">3</h3>
              <p class="text-sm text-gray-600">Cursos Completados</p>
            </div>

            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <div class="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Award class="h-6 w-6 text-yellow-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-1">2</h3>
              <p class="text-sm text-gray-600">Certificados Obtenidos</p>
            </div>

            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <div class="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Clock class="h-6 w-6 text-green-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-1">24</h3>
              <p class="text-sm text-gray-600">Horas de Formación</p>
            </div>

            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <div class="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Star class="h-6 w-6 text-purple-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-1">4.7</h3>
              <p class="text-sm text-gray-600">Calificación Promedio</p>
            </div>
          </div>

          <!-- Mis Cursos Activos -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Mis Cursos Activos</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20">
                <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Liderazgo" class="w-full h-32 object-cover">
                <div class="p-6">
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="text-lg font-semibold text-gray-900">Liderazgo Efectivo</h3>
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">En progreso</span>
                  </div>
                  <p class="text-sm text-gray-600 mb-3">Desarrolla habilidades de liderazgo</p>
                  <div class="bg-gray-200 rounded-full h-2 mb-3">
                    <div class="bg-primary rounded-full h-2" style="width: 60%"></div>
                  </div>
                  <div class="flex items-center justify-between text-xs text-gray-500">
                    <span>Progreso: 60%</span>
                    <span>3/5 módulos</span>
                  </div>
                </div>
              </div>

              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20">
                <img src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400" alt="JavaScript" class="w-full h-32 object-cover">
                <div class="p-6">
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="text-lg font-semibold text-gray-900">JavaScript Avanzado</h3>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">En progreso</span>
                  </div>
                  <p class="text-sm text-gray-600 mb-3">Conceptos avanzados de JavaScript</p>
                  <div class="bg-gray-200 rounded-full h-2 mb-3">
                    <div class="bg-primary rounded-full h-2" style="width: 80%"></div>
                  </div>
                  <div class="flex items-center justify-between text-xs text-gray-500">
                    <span>Progreso: 80%</span>
                    <span>4/5 módulos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Cursos Disponibles -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold">Cursos Disponibles</h2>
              <div class="flex gap-2">
                <select class="px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm text-sm">
                  <option>Todas las categorías</option>
                  <option>Habilidades Técnicas</option>
                  <option>Habilidades Blandas</option>
                  <option>Bienestar Personal</option>
                </select>
                <select class="px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm text-sm">
                  <option>Todos los niveles</option>
                  <option>Básico</option>
                  <option>Intermedio</option>
                  <option>Avanzado</option>
                </select>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Comunicación" class="w-full h-32 object-cover">
                <div class="p-6">
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="text-lg font-semibold text-gray-900">Comunicación Efectiva</h3>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Abierto</span>
                  </div>
                  <p class="text-sm text-gray-600 mb-3">Mejora tus habilidades de comunicación</p>
                  <div class="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>4 semanas • Online</span>
                    <span class="text-primary font-semibold">GRATIS</span>
                  </div>
                  <Button class="w-full">Inscribirse</Button>
                </div>
              </div>

              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <img src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400" alt="React" class="w-full h-32 object-cover">
                <div class="p-6">
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="text-lg font-semibold text-gray-900">React Intermedio</h3>
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Próximamente</span>
                  </div>
                  <p class="text-sm text-gray-600 mb-3">Hooks, Context API y patrones avanzados</p>
                  <div class="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>6 semanas • Online</span>
                    <span class="text-primary font-semibold">GRATIS</span>
                  </div>
                  <Button class="w-full" variant="outline">Lista de Espera</Button>
                </div>
              </div>

              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Gestión del Tiempo" class="w-full h-32 object-cover">
                <div class="p-6">
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="text-lg font-semibold text-gray-900">Gestión del Tiempo</h3>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Abierto</span>
                  </div>
                  <p class="text-sm text-gray-600 mb-3">Optimiza tu productividad personal</p>
                  <div class="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>3 semanas • Híbrido</span>
                    <span class="text-primary font-semibold">GRATIS</span>
                  </div>
                  <Button class="w-full">Inscribirse</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Coaching Personal View -->
        <div v-if="activeView === 'coaching'" class="space-y-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Coaching Personal</h1>
            <p class="text-gray-600 mt-1">Sesiones personalizadas one-to-one con coaches especializados</p>
          </div>

          <!-- Estadísticas de coaching -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle class="h-6 w-6 text-blue-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-1">4</h3>
              <p class="text-sm text-gray-600">Sesiones Completadas</p>
            </div>

            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <div class="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Calendar class="h-6 w-6 text-green-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-1">1</h3>
              <p class="text-sm text-gray-600">Próximas Sesiones</p>
            </div>

            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <div class="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Star class="h-6 w-6 text-yellow-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-1">4.8</h3>
              <p class="text-sm text-gray-600">Calificación Promedio</p>
            </div>

            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <div class="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Trophy class="h-6 w-6 text-purple-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-1">400</h3>
              <p class="text-sm text-gray-600">Puntos Ganados</p>
            </div>
          </div>

          <!-- Mis Próximas Sesiones -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Mis Próximas Sesiones</h2>
            <div class="space-y-4">
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Miguel Torres" class="w-12 h-12 rounded-full object-cover">
                    <div>
                      <h3 class="font-semibold text-gray-900">Sesión de Liderazgo</h3>
                      <p class="text-sm text-gray-600">Miguel Torres - Coach Ejecutivo</p>
                      <p class="text-xs text-gray-500">Viernes, 3:00 PM - 4:00 PM • Online</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2 block">Confirmada</span>
                    <p class="text-xs text-gray-500">+100 puntos</p>
                  </div>
                </div>
                <div class="mt-4 p-3 bg-blue-50/80 rounded-lg backdrop-blur-sm border border-blue-200/50">
                  <p class="text-sm text-blue-800"><strong>Enfoque:</strong> Desarrollo de habilidades de liderazgo en equipos remotos</p>
                  <p class="text-xs text-blue-600 mt-1">Enlace de reunión enviado por email</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Coaches Disponibles -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold">Coaches Disponibles</h2>
              <div class="flex gap-2">
                <select class="px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm text-sm">
                  <option>Todas las especialidades</option>
                  <option>Vida y Bienestar</option>
                  <option>Ejecutivo y Liderazgo</option>
                  <option>Nutricional y Wellness</option>
                  <option>Carrera y Desarrollo</option>
                  <option>Mindfulness y Emocional</option>
                  <option>Productividad</option>
                </select>
                <select class="px-3 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm text-sm">
                  <option>Cualquier modalidad</option>
                  <option>Online</option>
                  <option>Presencial</option>
                </select>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Elena Vásquez -->
              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="p-6">
                  <div class="flex items-center space-x-4 mb-4">
                    <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Elena Vásquez" class="w-16 h-16 rounded-full object-cover">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">Elena Vásquez</h3>
                      <p class="text-sm text-gray-600">Coach de Vida y Bienestar</p>
                      <div class="flex items-center mt-1">
                        <div class="flex items-center">
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        </div>
                        <span class="text-xs text-gray-500 ml-1">4.9 (127 reseñas)</span>
                      </div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-600 mb-4">Especialista en equilibrio vida-trabajo y bienestar integral. 8 años de experiencia.</p>
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Bienestar</span>
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Equilibrio</span>
                    <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Mindfulness</span>
                  </div>
                  <div class="text-xs text-gray-500 mb-4">
                    <p>• 45-60 min por sesión</p>
                    <p>• Online y Presencial</p>
                    <p>• Horarios flexibles</p>
                  </div>
                  <Button class="w-full">Reservar Sesión</Button>
                </div>
              </div>

              <!-- Miguel Torres -->
              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="p-6">
                  <div class="flex items-center space-x-4 mb-4">
                    <img src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Miguel Torres" class="w-16 h-16 rounded-full object-cover">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">Miguel Torres</h3>
                      <p class="text-sm text-gray-600">Coach Ejecutivo y Liderazgo</p>
                      <div class="flex items-center mt-1">
                        <div class="flex items-center">
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        </div>
                        <span class="text-xs text-gray-500 ml-1">4.8 (89 reseñas)</span>
                      </div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-600 mb-4">Experto en liderazgo ejecutivo y desarrollo de equipos. 12 años de experiencia.</p>
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Liderazgo</span>
                    <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Ejecutivo</span>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Equipos</span>
                  </div>
                  <div class="text-xs text-gray-500 mb-4">
                    <p>• 60 min por sesión</p>
                    <p>• Principalmente Online</p>
                    <p>• Horarios ejecutivos</p>
                  </div>
                  <Button class="w-full">Reservar Sesión</Button>
                </div>
              </div>

              <!-- Laura Sánchez -->
              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="p-6">
                  <div class="flex items-center space-x-4 mb-4">
                    <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Laura Sánchez" class="w-16 h-16 rounded-full object-cover">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">Laura Sánchez</h3>
                      <p class="text-sm text-gray-600">Coach Nutricional y Wellness</p>
                      <div class="flex items-center mt-1">
                        <div class="flex items-center">
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        </div>
                        <span class="text-xs text-gray-500 ml-1">4.9 (156 reseñas)</span>
                      </div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-600 mb-4">Nutricionista certificada especializada en bienestar corporativo. 10 años de experiencia.</p>
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Nutrición</span>
                    <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Wellness</span>
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Hábitos</span>
                  </div>
                  <div class="text-xs text-gray-500 mb-4">
                    <p>• 45 min por sesión</p>
                    <p>• Online y Presencial</p>
                    <p>• Planes personalizados</p>
                  </div>
                  <Button class="w-full">Reservar Sesión</Button>
                </div>
              </div>

              <!-- Roberto Mendoza -->
              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="p-6">
                  <div class="flex items-center space-x-4 mb-4">
                    <img src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Roberto Mendoza" class="w-16 h-16 rounded-full object-cover">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">Roberto Mendoza</h3>
                      <p class="text-sm text-gray-600">Coach de Carrera y Desarrollo</p>
                      <div class="flex items-center mt-1">
                        <div class="flex items-center">
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-gray-300" />
                        </div>
                        <span class="text-xs text-gray-500 ml-1">4.6 (73 reseñas)</span>
                      </div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-600 mb-4">Especialista en desarrollo profesional y planificación de carrera. 15 años de experiencia.</p>
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Carrera</span>
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Desarrollo</span>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Objetivos</span>
                  </div>
                  <div class="text-xs text-gray-500 mb-4">
                    <p>• 60 min por sesión</p>
                    <p>• Presencial preferido</p>
                    <p>• Planes a largo plazo</p>
                  </div>
                  <Button class="w-full">Reservar Sesión</Button>
                </div>
              </div>

              <!-- Carmen Vega -->
              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="p-6">
                  <div class="flex items-center space-x-4 mb-4">
                    <img src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Carmen Vega" class="w-16 h-16 rounded-full object-cover">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">Carmen Vega</h3>
                      <p class="text-sm text-gray-600">Coach de Mindfulness y Emocional</p>
                      <div class="flex items-center mt-1">
                        <div class="flex items-center">
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        </div>
                        <span class="text-xs text-gray-500 ml-1">5.0 (94 reseñas)</span>
                      </div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-600 mb-4">Experta en inteligencia emocional y técnicas de mindfulness. 9 años de experiencia.</p>
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Mindfulness</span>
                    <span class="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full">Emocional</span>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Estrés</span>
                  </div>
                  <div class="text-xs text-gray-500 mb-4">
                    <p>• 45 min por sesión</p>
                    <p>• Online y Presencial</p>
                    <p>• Técnicas de relajación</p>
                  </div>
                  <Button class="w-full">Reservar Sesión</Button>
                </div>
              </div>

              <!-- Andrés Morales -->
              <div class="glass-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="p-6">
                  <div class="flex items-center space-x-4 mb-4">
                    <img src="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Andrés Morales" class="w-16 h-16 rounded-full object-cover">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">Andrés Morales</h3>
                      <p class="text-sm text-gray-600">Coach de Productividad</p>
                      <div class="flex items-center mt-1">
                        <div class="flex items-center">
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-yellow-400 fill-current" />
                          <Star class="h-4 w-4 text-gray-300" />
                        </div>
                        <span class="text-xs text-gray-500 ml-1">4.7 (112 reseñas)</span>
                      </div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-600 mb-4">Especialista en productividad personal y organización del tiempo. 7 años de experiencia.</p>
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Productividad</span>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Organización</span>
                    <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Tiempo</span>
                  </div>
                  <div class="text-xs text-gray-500 mb-4">
                    <p>• 50 min por sesión</p>
                    <p>• Principalmente Online</p>
                    <p>• Metodologías ágiles</p>
                  </div>
                  <Button class="w-full">Reservar Sesión</Button>
                </div>
              </div>
            </div>
          </div>

          <!-- Historial de Sesiones -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">Historial de Sesiones</h2>
            <div class="space-y-4">
              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <img src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Carmen Vega" class="w-12 h-12 rounded-full object-cover">
                    <div>
                      <h3 class="font-semibold text-gray-900">Sesión de Mindfulness</h3>
                      <p class="text-sm text-gray-600">Carmen Vega - Coach Emocional</p>
                      <p class="text-xs text-gray-500">Hace 1 semana • 45 min • Online</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="flex items-center mb-1">
                      <Star class="h-4 w-4 text-yellow-400 fill-current" />
                      <Star class="h-4 w-4 text-yellow-400 fill-current" />
                      <Star class="h-4 w-4 text-yellow-400 fill-current" />
                      <Star class="h-4 w-4 text-yellow-400 fill-current" />
                      <Star class="h-4 w-4 text-yellow-400 fill-current" />
                    </div>
                    <p class="text-xs text-gray-500">+100 puntos ganados</p>
                  </div>
                </div>
                <div class="mt-3 p-3 bg-gray-50/80 rounded-lg backdrop-blur-sm">
                  <p class="text-sm text-gray-700">"Excelente sesión, me ayudó mucho con técnicas de respiración para manejar el estrés laboral."</p>
                </div>
              </div>

              <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <img src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Roberto Mendoza" class="w-12 h-12 rounded-full object-cover">
                    <div>
                      <h3 class="font-semibold text-gray-900">Planificación de Carrera</h3>
                      <p class="text-sm text-gray-600">Roberto Mendoza - Coach de Desarrollo</p>
                      <p class="text-xs text-gray-500">Hace 2 semanas • 60 min • Presencial</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="flex items-center mb-1">
                      <Star class="h-4 w-4 text-yellow-400 fill-current" />
                      <Star class="h-4 w-4 text-yellow-400 fill-current" />
                      <Star class="h-4 w-4 text-yellow-400 fill-current" />
                      <Star class="h-4 w-4 text-yellow-400 fill-current" />
                      <Star class="h-4 w-4 text-gray-300" />
                    </div>
                    <p class="text-xs text-gray-500">+100 puntos ganados</p>
                  </div>
                </div>
                <div class="mt-3 p-3 bg-gray-50/80 rounded-lg backdrop-blur-sm">
                  <p class="text-sm text-gray-700">"Me ayudó a definir mis objetivos profesionales y crear un plan de desarrollo claro."</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Beneficios del Coaching -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <h2 class="text-xl font-semibold mb-6">¿Por qué elegir Coaching Personal?</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="text-center">
                <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <User class="h-6 w-6 text-primary" />
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">Atención Personalizada</h3>
                <p class="text-sm text-gray-600">Sesiones adaptadas a tus necesidades específicas y objetivos personales</p>
              </div>
              <div class="text-center">
                <div class="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Target class="h-6 w-6 text-green-600" />
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">Resultados Medibles</h3>
                <p class="text-sm text-gray-600">Seguimiento de progreso con métricas claras y objetivos alcanzables</p>
              </div>
              <div class="text-center">
                <div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Clock class="h-6 w-6 text-blue-600" />
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">Flexibilidad Total</h3>
                <p class="text-sm text-gray-600">Horarios adaptados a tu agenda laboral, modalidad online o presencial</p>
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
  Apple,
  Heart,
  Dumbbell,
  Target,
  Star,
  CheckCircle,
  User,
  Clock,
  Target,
  Shield,
  BookOpen,
  Headphones,
  Phone
  Award
} from 'lucide-vue-next';
import Button from '../../components/common/Button.vue';

const router = useRouter();
const activeView = ref('dashboard');

const empleadoNavLinks = [
  { id: 'dashboard', text: 'Mi Dashboard', icon: LayoutDashboard },
  { id: 'actividades', text: 'Actividades', icon: Calendar },
  { id: 'reservas', text: 'Mis Reservas', icon: CalendarCheck },
  { id: 'encuestas', text: 'Encuestas', icon: ClipboardList },
  { id: 'desafios', text: 'Desafíos', icon: Trophy },
  { id: 'cursos', text: 'Cursos y Talleres', icon: GraduationCap },
  { id: 'coaching', text: 'Coaching Personal', icon: MessageCircle }
];

function salirDemo() {
  router.push('/');
}
</script>