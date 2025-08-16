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
      <!-- Psicoterapia Online View -->
      <div v-if="activeView === 'psicoterapia'" class="space-y-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Psicoterapia Online</h1>
          <p class="text-gray-600">Apoyo psicológico profesional para tu bienestar emocional</p>
        </div>

        <!-- Chat de Crisis y Sesiones Rápidas -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Chat 24/7 -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-gray-900 flex items-center">
                <MessageCircle class="h-5 w-5 mr-2 text-green-500" />
                Chat Confidencial 24/7
              </h2>
              <div class="flex items-center">
                <div class="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span class="text-sm text-green-600 font-medium">Disponible</span>
              </div>
            </div>
            <p class="text-gray-600 mb-4">
              Conecta inmediatamente con un psicólogo de guardia para apoyo emocional urgente.
            </p>
            <div class="bg-green-50/80 rounded-lg p-4 mb-4 backdrop-blur-sm border border-green-200/50">
              <div class="flex items-center text-sm text-green-800">
                <Shield class="h-4 w-4 mr-2" />
                <span class="font-medium">100% Confidencial y Privado</span>
              </div>
              <p class="text-xs text-green-700 mt-1">
                Tiempo de respuesta: 2-5 minutos
              </p>
            </div>
            <Button class="w-full" variant="primary">
              <MessageCircle class="h-4 w-4 mr-2" />
              Iniciar Chat Ahora
            </Button>
          </div>

          <!-- Línea de Crisis -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-gray-900 flex items-center">
                <Phone class="h-5 w-5 mr-2 text-red-500" />
                Línea de Crisis
              </h2>
              <div class="flex items-center">
                <div class="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                <span class="text-sm text-red-600 font-medium">Emergencias</span>
              </div>
            </div>
            <p class="text-gray-600 mb-4">
              Para situaciones de crisis emocional que requieren atención inmediata.
            </p>
            <div class="bg-red-50/80 rounded-lg p-4 mb-4 backdrop-blur-sm border border-red-200/50">
              <div class="flex items-center text-sm text-red-800">
                <AlertTriangle class="h-4 w-4 mr-2" />
                <span class="font-medium">Atención Inmediata</span>
              </div>
              <p class="text-xs text-red-700 mt-1">
                Disponible 24/7 - Respuesta en menos de 1 minuto
              </p>
            </div>
            <Button class="w-full" variant="outline">
              <Phone class="h-4 w-4 mr-2" />
              Contactar Línea de Crisis
            </Button>
          </div>
        </div>

        <!-- Nuestros Psicoterapeutas -->
        <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
          <h2 class="text-xl font-semibold mb-6">Nuestros Psicoterapeutas</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Dra. Patricia Morales -->
            <div class="glass-card rounded-xl p-6 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div class="text-center mb-4">
                <div class="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-white text-xl font-bold">PM</span>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Dra. Patricia Morales</h3>
                <p class="text-sm text-gray-600">Psicóloga Clínica</p>
                <div class="flex items-center justify-center mt-2">
                  <Star class="h-4 w-4 text-yellow-400 fill-current" />
                  <Star class="h-4 w-4 text-yellow-400 fill-current" />
                  <Star class="h-4 w-4 text-yellow-400 fill-current" />
                  <Star class="h-4 w-4 text-yellow-400 fill-current" />
                  <Star class="h-4 w-4 text-yellow-400 fill-current" />
                  <span class="ml-2 text-sm text-gray-600">4.9 (127 reseñas)</span>
                </div>
              </div>
              <div class="space-y-3 mb-4">
                <div class="text-sm">
                  <p class="font-medium text-gray-900 mb-1">Especialidades:</p>
                  <div class="flex flex-wrap gap-1">
                    <span class="bg-pink-100/80 text-pink-800 px-2 py-1 rounded-full text-xs">Ansiedad</span>
                    <span class="bg-pink-100/80 text-pink-800 px-2 py-1 rounded-full text-xs">Depresión</span>
                    <span class="bg-pink-100/80 text-pink-800 px-2 py-1 rounded-full text-xs">Estrés Laboral</span>
                  </div>
                </div>
                <div class="text-sm">
                  <p class="font-medium text-gray-900">Experiencia:</p>
                  <p class="text-gray-600">12 años en psicología clínica</p>
                </div>
                <div class="text-sm">
                  <p class="font-medium text-gray-900">Disponibilidad:</p>
                  <p class="text-gray-600">Lun-Vie: 9:00-18:00</p>
                </div>
              </div>
              <div class="space-y-2">
                <Button class="w-full" variant="primary">
                  <Calendar class="h-4 w-4 mr-2" />
                  Reservar Sesión
                </Button>
                <Button class="w-full" variant="outline">
                  <MessageCircle class="h-4 w-4 mr-2" />
                  Chat Directo
                </Button>
              </div>
            </div>

            <!-- Dr. Carlos Mendoza -->
            <div class="glass-card rounded-xl p-6 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div class="text-center mb-4">
                <div class="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-white text-xl font-bold">CM</span>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Dr. Carlos Mendoza</h3>
                <p class="text-sm text-gray-600">Psicólogo Organizacional</p>
                <div class="flex items-center justify-center mt-2">
                  <Star class="h-4 w-4 text-yellow-400 fill-current" />
                  <Star class="h-4 w-4 text-yellow-400 fill-current" />
                  <Star class="h-4 w-4 text-yellow-400 fill-current" />
                  <Star class="h-4 w-4 text-yellow-400 fill-current" />
                  <Star class="h-4 w-4 text-yellow-400 fill-current" />
                  <span class="ml-2 text-sm text-gray-600">4.8 (89 reseñas)</span>
                </div>
              </div>
              <div class="space-y-3 mb-4">
                <div class="text-sm">
                  <p class="font-medium text-gray-900 mb-1">Especialidades:</p>
                  <div class="flex flex-wrap gap-1">
                    <span class="bg-blue-100/80 text-blue-800 px-2 py-1 rounded-full text-xs">Burnout</span>
                    <span class="bg-blue-100/80 text-blue-800 px-2 py-1 rounded-full text-xs">Estrés Laboral</span>
                    <span class="bg-blue-100/80 text-blue-800 px-2 py-1 rounded-full text-xs">Liderazgo</span>
                  </div>
                </div>
                <div class="text-sm">
                  <p class="font-medium text-gray-900">Experiencia:</p>
                  <p class="text-gray-600">15 años en psicología organizacional</p>
                </div>
                <div class="text-sm">
                  <p class="font-medium text-gray-900">Disponibilidad:</p>
                  <p class="text-gray-600">Lun-Vie: 10:00-19:00</p>
                </div>
              </div>
              <div class="space-y-2">
                <Button class="w-full" variant="primary">
                  <Calendar class="h-4 w-4 mr-2" />
                  Reservar Sesión
                </Button>
                <Button class="w-full" variant="outline">
                  <MessageCircle class="h-4 w-4 mr-2" />
                  Chat Directo
                </Button>
              </div>
            </div>

            <!-- Dra. Ana Sofía Ruiz -->
            <div class="glass-card rounded-xl p-6 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div class="text-center mb-4">
                <div class="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-white text-xl font-bold">AR</span>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Dra. Ana Sofía Ruiz</h3>
                <p class="text-sm text-gray-600">Psicóloga de Pareja y Familia</p>
                <div class="flex items-center justify-center mt-2">
                  <Star class="h-4 w-4 text-yellow-400 fill-current" />
                  <Star class="h-4 w-4 text-yellow-400 fill-current" />
                  <Star class="h-4 w-4 text-yellow-400 fill-current" />
                  <Star class="h-4 w-4 text-yellow-400 fill-current" />
                  <Star class="h-4 w-4 text-yellow-400 fill-current" />
                  <span class="ml-2 text-sm text-gray-600">4.9 (156 reseñas)</span>
                </div>
              </div>
              <div class="space-y-3 mb-4">
                <div class="text-sm">
                  <p class="font-medium text-gray-900 mb-1">Especialidades:</p>
                  <div class="flex flex-wrap gap-1">
                    <span class="bg-purple-100/80 text-purple-800 px-2 py-1 rounded-full text-xs">Equilibrio Vida-Trabajo</span>
                    <span class="bg-purple-100/80 text-purple-800 px-2 py-1 rounded-full text-xs">Autoestima</span>
                    <span class="bg-purple-100/80 text-purple-800 px-2 py-1 rounded-full text-xs">Relaciones</span>
                  </div>
                </div>
                <div class="text-sm">
                  <p class="font-medium text-gray-900">Experiencia:</p>
                  <p class="text-gray-600">10 años en terapia familiar</p>
                </div>
                <div class="text-sm">
                  <p class="font-medium text-gray-900">Disponibilidad:</p>
                  <p class="text-gray-600">Lun-Sáb: 8:00-20:00</p>
                </div>
              </div>
              <div class="space-y-2">
                <Button class="w-full" variant="primary">
                  <Calendar class="h-4 w-4 mr-2" />
                  Reservar Sesión
                </Button>
                <Button class="w-full" variant="outline">
                  <MessageCircle class="h-4 w-4 mr-2" />
                  Chat Directo
                </Button>
              </div>
            </div>
          </div>
        </div>

        <!-- Mis Sesiones de Psicoterapia -->
        <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
          <h2 class="text-xl font-semibold mb-6">Mis Sesiones de Psicoterapia</h2>
          
          <!-- Próximas Sesiones -->
          <div class="mb-8">
            <h3 class="text-lg font-medium text-gray-800 mb-4">Próximas Sesiones</h3>
            <div class="space-y-3">
              <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Heart class="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900">Sesión de Manejo de Ansiedad</h4>
                    <p class="text-sm text-gray-600">Dra. Patricia Morales</p>
                    <p class="text-xs text-gray-500">Mañana, 15:00 - 16:00</p>
                  </div>
                </div>
                <div class="flex gap-2">
                  <Button variant="outline" class="text-xs px-3 py-1">Reagendar</Button>
                  <Button variant="primary" class="text-xs px-3 py-1">Unirse</Button>
                </div>
              </div>

              <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Brain class="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900">Terapia de Burnout Laboral</h4>
                    <p class="text-sm text-gray-600">Dr. Carlos Mendoza</p>
                    <p class="text-xs text-gray-500">Viernes, 17:30 - 18:30</p>
                  </div>
                </div>
                <div class="flex gap-2">
                  <Button variant="outline" class="text-xs px-3 py-1">Reagendar</Button>
                  <Button variant="primary" class="text-xs px-3 py-1">Unirse</Button>
                </div>
              </div>
            </div>
          </div>

          <!-- Historial de Sesiones -->
          <div>
            <h3 class="text-lg font-medium text-gray-800 mb-4">Historial de Sesiones</h3>
            <div class="space-y-3">
              <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Heart class="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900">Sesión de Autoestima</h4>
                    <p class="text-sm text-gray-600">Dra. Ana Sofía Ruiz</p>
                    <p class="text-xs text-gray-500">Completada - 15 de Enero, 2025</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="flex items-center">
                    <Star class="h-4 w-4 text-yellow-400 fill-current" />
                    <Star class="h-4 w-4 text-yellow-400 fill-current" />
                    <Star class="h-4 w-4 text-yellow-400 fill-current" />
                    <Star class="h-4 w-4 text-yellow-400 fill-current" />
                    <Star class="h-4 w-4 text-yellow-400 fill-current" />
                  </div>
                  <span class="bg-green-100/80 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Completada</span>
                </div>
              </div>

              <div class="glass-card p-4 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Brain class="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900">Manejo de Estrés Laboral</h4>
                    <p class="text-sm text-gray-600">Dra. Patricia Morales</p>
                    <p class="text-xs text-gray-500">Completada - 8 de Enero, 2025</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="flex items-center">
                    <Star class="h-4 w-4 text-yellow-400 fill-current" />
                    <Star class="h-4 w-4 text-yellow-400 fill-current" />
                    <Star class="h-4 w-4 text-yellow-400 fill-current" />
                    <Star class="h-4 w-4 text-yellow-400 fill-current" />
                    <Star class="h-4 w-4 text-gray-300" />
                  </div>
                  <span class="bg-green-100/80 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Completada</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recursos de Autoayuda -->
        <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
          <h2 class="text-xl font-semibold mb-6">Recursos de Autoayuda</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Artículos -->
            <div class="glass-card rounded-xl p-6 backdrop-blur-sm border border-white/20 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen class="h-8 w-8 text-white" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Artículos</h3>
              <p class="text-gray-600 text-sm mb-4">Guías y consejos escritos por profesionales</p>
              <Button variant="outline" class="w-full">
                <BookOpen class="h-4 w-4 mr-2" />
                Ver Artículos
              </Button>
            </div>

            <!-- Meditaciones Guiadas -->
            <div class="glass-card rounded-xl p-6 backdrop-blur-sm border border-white/20 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain class="h-8 w-8 text-white" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Meditaciones</h3>
              <p class="text-gray-600 text-sm mb-4">Sesiones de mindfulness y relajación</p>
              <Button variant="outline" class="w-full">
                <Play class="h-4 w-4 mr-2" />
                Escuchar Ahora
              </Button>
            </div>

            <!-- Ejercicios de Respiración -->
            <div class="glass-card rounded-xl p-6 backdrop-blur-sm border border-white/20 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Wind class="h-8 w-8 text-white" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Respiración</h3>
              <p class="text-gray-600 text-sm mb-4">Técnicas de respiración para el estrés</p>
              <Button variant="outline" class="w-full">
                <Wind class="h-4 w-4 mr-2" />
                Practicar
              </Button>
            </div>
          </div>
        </div>
        <div v-if="activeView === 'psicoterapia'" class="space-y-8 max-w-7xl">
        <!-- Información Importante -->
        <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
          <h2 class="text-xl font-semibold mb-4 flex items-center">
            <Shield class="h-5 w-5 mr-2 text-blue-500" />
            Confidencialidad y Privacidad
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="space-y-3">
              <div class="flex items-start space-x-3">
                <Lock class="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 class="font-semibold text-gray-900">Privacidad Total</h4>
                  <p class="text-sm text-gray-600">Todas las sesiones son completamente confidenciales</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <Shield class="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 class="font-semibold text-gray-900">Datos Protegidos</h4>
                  <p class="text-sm text-gray-600">Cumplimos con todas las normativas de protección de datos</p>
                </div>
              </div>
            </div>
            <div class="space-y-3">
              <div class="flex items-start space-x-3">
                <UserCheck class="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <h4 class="font-semibold text-gray-900">Profesionales Certificados</h4>
                  <p class="text-sm text-gray-600">Todos nuestros terapeutas están colegiados</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <Clock class="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 class="font-semibold text-gray-900">Disponibilidad Extendida</h4>
                  <p class="text-sm text-gray-600">Chat 24/7 y sesiones en horarios flexibles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


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
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
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
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              </div>
              <div class="text-center">
                <div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
          <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30 bg-gradient-to-r from-green-50/50 to-blue-50/50">
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
  Phone,
  AlertTriangle,
  BookOpen,
  Play,
  Wind,
  Lock,
  Target,
  Star,
  CheckCircle,
  User,
  Clock,
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
  { id: 'psicoterapia', text: 'Psicoterapia Online', icon: Heart },
  { id: 'cursos', text: 'Cursos y Talleres', icon: GraduationCap },
  { id: 'coaching', text: 'Coaching Personal', icon: MessageCircle }
];

function salirDemo() {
  router.push('/');
}
</script>