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

    <!-- Layout con Sidebar -->
    <div class="flex">
      <!-- Sidebar -->
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
      <main class="ml-64 flex-1 min-h-screen">
        <div class="p-8">
          <!-- Dashboard View -->
          <div v-if="activeView === 'dashboard'" class="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">Mi Dashboard</h1>
              <p class="text-gray-600">Bienvenida Ana, aquí tienes tu resumen de bienestar</p>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h3 class="text-4xl font-bold text-primary mb-2">1,250</h3>
                <p class="text-gray-700 font-medium">Puntos de Bienestar</p>
              </div>
              <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h3 class="text-4xl font-bold text-primary mb-2">3</h3>
                <p class="text-gray-700 font-medium">Desafíos Completados</p>
              </div>
              <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h3 class="text-4xl font-bold text-primary mb-2">2</h3>
                <p class="text-gray-700 font-medium">Próximas Sesiones</p>
              </div>
            </div>

            <!-- Content Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Próximas Sesiones -->
              <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
                <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Calendar class="h-5 w-5 mr-2 text-primary" />
                  Próximas Sesiones
                </h2>
                <div class="space-y-4">
                  <div class="glass-card p-4 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                    <p class="font-semibold text-gray-900">Yoga Matutino</p>
                    <p class="text-sm text-gray-600 mt-1">Mañana, 8:00 AM</p>
                    <p class="text-xs text-gray-500">Elena Vásquez</p>
                  </div>
                  <div class="glass-card p-4 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                    <p class="font-semibold text-gray-900">Coaching Personal</p>
                    <p class="text-sm text-gray-600 mt-1">Miércoles, 5:00 PM</p>
                    <p class="text-xs text-gray-500">Miguel Torres</p>
                  </div>
                </div>
              </div>

              <!-- Encuestas Pendientes -->
              <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
                <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <ClipboardList class="h-5 w-5 mr-2 text-primary" />
                  Encuestas Pendientes
                </h2>
                <div class="space-y-4">
                  <div class="glass-card p-4 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex justify-between items-center">
                    <div>
                      <p class="font-semibold text-gray-900">Clima Laboral Q1</p>
                      <p class="text-sm text-gray-600">Termina en 5 días</p>
                    </div>
                    <Button variant="primary" class="text-sm px-4 py-2">
                      Completar
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Desafíos Activos -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Trophy class="h-5 w-5 mr-2 text-yellow-500" />
                Desafíos de Bienestar
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img src="https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Desafío de pasos" class="w-full h-32 object-cover" />
                  <div class="p-4">
                    <h4 class="font-semibold text-gray-900 mb-2">Desafío 10,000 Pasos</h4>
                    <p class="text-sm text-gray-600 mb-3">Camina 10,000 pasos diarios durante 2 semanas</p>
                    <div class="flex items-center justify-between">
                      <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                        100 puntos
                      </span>
                      <Button variant="primary" class="text-xs px-3 py-1">
                        Unirse
                      </Button>
                    </div>
                  </div>
                </div>

                <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img src="https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Desafío hidratación" class="w-full h-32 object-cover" />
                  <div class="p-4">
                    <h4 class="font-semibold text-gray-900 mb-2">Hidratación Saludable</h4>
                    <p class="text-sm text-gray-600 mb-3">Bebe 8 vasos de agua diarios por una semana</p>
                    <div class="flex items-center justify-between">
                      <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                        50 puntos
                      </span>
                      <Button variant="primary" class="text-xs px-3 py-1">
                        Unirse
                      </Button>
                    </div>
                  </div>
                </div>

                <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Desafío meditación" class="w-full h-32 object-cover" />
                  <div class="p-4">
                    <h4 class="font-semibold text-gray-900 mb-2">Meditación Diaria</h4>
                    <p class="text-sm text-gray-600 mb-3">Medita 10 minutos cada día durante un mes</p>
                    <div class="flex items-center justify-between">
                      <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                        200 puntos
                      </span>
                      <Button variant="primary" class="text-xs px-3 py-1">
                        Unirse
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Actividades View -->
          <div v-if="activeView === 'actividades'" class="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">Actividades Disponibles</h1>
              <p class="text-gray-600">Explora y reserva las próximas actividades de bienestar</p>
            </div>

            <!-- Filtros -->
            <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select class="px-4 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option>Todos los servicios</option>
                  <option>Yoga</option>
                  <option>Meditación</option>
                  <option>Nutrición</option>
                  <option>Coaching</option>
                  <option>Psicoterapia</option>
                </select>
                <select class="px-4 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option>Todas las modalidades</option>
                  <option>Online</option>
                  <option>Presencial</option>
                </select>
                <input type="date" class="px-4 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                <Button variant="primary">Filtrar</Button>
              </div>
            </div>

            <!-- Grid de Actividades -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Yoga Matutino -->
              <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <img src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Yoga" class="w-full h-48 object-cover" />
                <div class="p-6">
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="text-lg font-bold text-gray-900">Yoga Matutino</h3>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">5/15 plazas</span>
                  </div>
                  <p class="text-sm text-gray-600 mb-3">Sesión de yoga para comenzar el día con energía positiva</p>
                  <div class="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar class="h-4 w-4 mr-1" />
                    <span>Mañana, 8:00 AM</span>
                    <span class="mx-2">•</span>
                    <Globe class="h-4 w-4 mr-1" />
                    <span>Online</span>
                  </div>
                  <p class="text-xs text-gray-500 mb-4">Instructora: Elena Vásquez</p>
                  <Button variant="primary" class="w-full">
                    Reservar Plaza
                  </Button>
                </div>
              </div>

              <!-- Coaching Personal -->
              <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <img src="https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Coaching" class="w-full h-48 object-cover" />
                <div class="p-6">
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="text-lg font-bold text-gray-900">Coaching Personal</h3>
                    <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">12/20 plazas</span>
                  </div>
                  <p class="text-sm text-gray-600 mb-3">Sesión de desarrollo personal y gestión del tiempo</p>
                  <div class="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar class="h-4 w-4 mr-1" />
                    <span>Miércoles, 5:00 PM</span>
                    <span class="mx-2">•</span>
                    <MapPin class="h-4 w-4 mr-1" />
                    <span>Sala 201</span>
                  </div>
                  <p class="text-xs text-gray-500 mb-4">Coach: Miguel Torres</p>
                  <Button variant="primary" class="w-full">
                    Reservar Plaza
                  </Button>
                </div>
              </div>

              <!-- Nutrición -->
              <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Nutrición" class="w-full h-48 object-cover" />
                <div class="p-6">
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="text-lg font-bold text-gray-900">Nutrición Saludable</h3>
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">8/25 plazas</span>
                  </div>
                  <p class="text-sm text-gray-600 mb-3">Taller sobre snacks saludables para la oficina</p>
                  <div class="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar class="h-4 w-4 mr-1" />
                    <span>Jueves, 12:30 PM</span>
                    <span class="mx-2">•</span>
                    <MapPin class="h-4 w-4 mr-1" />
                    <span>Cocina</span>
                  </div>
                  <p class="text-xs text-gray-500 mb-4">Nutricionista: Laura Sánchez</p>
                  <Button variant="primary" class="w-full">
                    Reservar Plaza
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <!-- Cursos y Talleres View -->
          <div v-if="activeView === 'cursos'" class="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">Cursos y Talleres</h1>
              <p class="text-gray-600">Desarrolla nuevas habilidades con nuestros cursos especializados</p>
            </div>

            <!-- Filtros de Cursos -->
            <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select class="px-4 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option>Todas las categorías</option>
                  <option>Desarrollo Personal</option>
                  <option>Habilidades Blandas</option>
                  <option>Bienestar Mental</option>
                  <option>Salud Física</option>
                  <option>Liderazgo</option>
                </select>
                <select class="px-4 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option>Todos los niveles</option>
                  <option>Principiante</option>
                  <option>Intermedio</option>
                  <option>Avanzado</option>
                </select>
                <select class="px-4 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option>Todas las duraciones</option>
                  <option>1-2 horas</option>
                  <option>Medio día</option>
                  <option>Día completo</option>
                  <option>Varios días</option>
                </select>
                <Button variant="primary">Filtrar</Button>
              </div>
            </div>

            <!-- Cursos Destacados -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold mb-6">Cursos Destacados</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Curso de Mindfulness -->
                <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Mindfulness" class="w-full h-48 object-cover" />
                  <div class="p-6">
                    <div class="flex items-center justify-between mb-2">
                      <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">Bienestar Mental</span>
                      <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">8/20 plazas</span>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Mindfulness en el Trabajo</h3>
                    <p class="text-sm text-gray-600 mb-3">Aprende técnicas de atención plena para mejorar tu concentración y reducir el estrés laboral</p>
                    <div class="space-y-2 mb-4">
                      <div class="flex items-center text-sm text-gray-500">
                        <Calendar class="h-4 w-4 mr-2" />
                        <span>Sábado 18 de enero, 9:00 AM - 1:00 PM</span>
                      </div>
                      <div class="flex items-center text-sm text-gray-500">
                        <Clock class="h-4 w-4 mr-2" />
                        <span>Duración: 4 horas</span>
                      </div>
                      <div class="flex items-center text-sm text-gray-500">
                        <User class="h-4 w-4 mr-2" />
                        <span>Instructor: Dr. Roberto Silva</span>
                      </div>
                    </div>
                    <Button variant="primary" class="w-full">
                      Inscribirse al Curso
                    </Button>
                  </div>
                </div>

                <!-- Taller de Comunicación -->
                <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Comunicación" class="w-full h-48 object-cover" />
                  <div class="p-6">
                    <div class="flex items-center justify-between mb-2">
                      <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">Habilidades Blandas</span>
                      <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">15/25 plazas</span>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Comunicación Efectiva</h3>
                    <p class="text-sm text-gray-600 mb-3">Mejora tus habilidades de comunicación interpersonal y presentaciones</p>
                    <div class="space-y-2 mb-4">
                      <div class="flex items-center text-sm text-gray-500">
                        <Calendar class="h-4 w-4 mr-2" />
                        <span>Viernes 24 de enero, 2:00 PM - 6:00 PM</span>
                      </div>
                      <div class="flex items-center text-sm text-gray-500">
                        <Clock class="h-4 w-4 mr-2" />
                        <span>Duración: 4 horas</span>
                      </div>
                      <div class="flex items-center text-sm text-gray-500">
                        <User class="h-4 w-4 mr-2" />
                        <span>Instructor: Lic. Carmen Vega</span>
                      </div>
                    </div>
                    <Button variant="primary" class="w-full">
                      Inscribirse al Taller
                    </Button>
                  </div>
                </div>

                <!-- Curso de Liderazgo -->
                <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Liderazgo" class="w-full h-48 object-cover" />
                  <div class="p-6">
                    <div class="flex items-center justify-between mb-2">
                      <span class="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">Liderazgo</span>
                      <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">5/15 plazas</span>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Liderazgo Transformacional</h3>
                    <p class="text-sm text-gray-600 mb-3">Desarrolla habilidades de liderazgo para inspirar y motivar equipos</p>
                    <div class="space-y-2 mb-4">
                      <div class="flex items-center text-sm text-gray-500">
                        <Calendar class="h-4 w-4 mr-2" />
                        <span>28-29 de enero, 9:00 AM - 5:00 PM</span>
                      </div>
                      <div class="flex items-center text-sm text-gray-500">
                        <Clock class="h-4 w-4 mr-2" />
                        <span>Duración: 2 días</span>
                      </div>
                      <div class="flex items-center text-sm text-gray-500">
                        <User class="h-4 w-4 mr-2" />
                        <span>Instructor: Mg. Fernando López</span>
                      </div>
                    </div>
                    <Button variant="primary" class="w-full">
                      Inscribirse al Curso
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mis Cursos Inscritos -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold mb-6">Mis Cursos Inscritos</h2>
              <div class="space-y-4">
                <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <BookOpen class="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-900">Gestión del Tiempo y Productividad</h4>
                        <p class="text-sm text-gray-600">Completado el 10 de enero</p>
                        <p class="text-xs text-gray-500">Instructor: Lic. María Fernández</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Completado</span>
                      <Button variant="outline" class="text-xs px-3 py-1">Ver Certificado</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Coaching Personal View -->
          <div v-if="activeView === 'coaching'" class="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">Coaching Personal</h1>
              <p class="text-gray-600">Desarrollo personal y profesional con coaches especializados</p>
            </div>

            <!-- Coaches Disponibles -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold mb-6">Nuestros Coaches</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Miguel Torres -->
                <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img src="https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Miguel Torres" class="w-full h-48 object-cover" />
                  <div class="p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Miguel Torres</h3>
                    <p class="text-sm text-primary font-medium mb-2">Coach Ejecutivo Certificado</p>
                    <p class="text-sm text-gray-600 mb-4">Especialista en liderazgo, gestión del tiempo y desarrollo de carrera</p>
                    <div class="flex items-center mb-4">
                      <div class="flex items-center mr-4">
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                      </div>
                      <span class="text-sm text-gray-600">4.9 (85 reseñas)</span>
                    </div>
                    <div class="space-y-2 mb-4">
                      <div class="flex items-center text-sm text-gray-600">
                        <Clock class="h-4 w-4 mr-2" />
                        <span>Disponible: Lun-Vie 9:00-17:00</span>
                      </div>
                      <div class="flex items-center text-sm text-gray-600">
                        <Globe class="h-4 w-4 mr-2" />
                        <span>Sesiones online y presenciales</span>
                      </div>
                    </div>
                    <Button variant="primary" class="w-full">
                      Agendar Sesión
                    </Button>
                  </div>
                </div>

                <!-- Lic. Carmen Vega -->
                <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img src="https://images.pexels.com/photos/5327647/pexels-photo-5327647.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Carmen Vega" class="w-full h-48 object-cover" />
                  <div class="p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Lic. Carmen Vega</h3>
                    <p class="text-sm text-primary font-medium mb-2">Coach de Vida y Carrera</p>
                    <p class="text-sm text-gray-600 mb-4">Especialista en equilibrio vida-trabajo y desarrollo personal</p>
                    <div class="flex items-center mb-4">
                      <div class="flex items-center mr-4">
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                      </div>
                      <span class="text-sm text-gray-600">4.8 (92 reseñas)</span>
                    </div>
                    <div class="space-y-2 mb-4">
                      <div class="flex items-center text-sm text-gray-600">
                        <Clock class="h-4 w-4 mr-2" />
                        <span>Disponible: Mar-Sáb 8:00-16:00</span>
                      </div>
                      <div class="flex items-center text-sm text-gray-600">
                        <Globe class="h-4 w-4 mr-2" />
                        <span>Sesiones online</span>
                      </div>
                    </div>
                    <Button variant="primary" class="w-full">
                      Agendar Sesión
                    </Button>
                  </div>
                </div>

                <!-- Mg. Fernando López -->
                <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img src="https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Fernando López" class="w-full h-48 object-cover" />
                  <div class="p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Mg. Fernando López</h3>
                    <p class="text-sm text-primary font-medium mb-2">Coach de Alto Rendimiento</p>
                    <p class="text-sm text-gray-600 mb-4">Especialista en productividad, metas y transformación de hábitos</p>
                    <div class="flex items-center mb-4">
                      <div class="flex items-center mr-4">
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                      </div>
                      <span class="text-sm text-gray-600">5.0 (67 reseñas)</span>
                    </div>
                    <div class="space-y-2 mb-4">
                      <div class="flex items-center text-sm text-gray-600">
                        <Clock class="h-4 w-4 mr-2" />
                        <span>Disponible: Lun-Jue 10:00-18:00</span>
                      </div>
                      <div class="flex items-center text-sm text-gray-600">
                        <MapPin class="h-4 w-4 mr-2" />
                        <span>Presencial y online</span>
                      </div>
                    </div>
                    <Button variant="primary" class="w-full">
                      Agendar Sesión
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mis Sesiones de Coaching -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold mb-6">Mis Sesiones de Coaching</h2>
              
              <!-- Próximas Sesiones -->
              <div class="mb-8">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Próximas Sesiones</h3>
                <div class="space-y-4">
                  <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <MessageCircle class="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 class="font-semibold text-gray-900">Sesión con Miguel Torres</h4>
                          <p class="text-sm text-gray-600">Miércoles, 15 de enero - 5:00 PM</p>
                          <p class="text-xs text-gray-500">Tema: Gestión del tiempo y prioridades</p>
                        </div>
                      </div>
                      <div class="flex items-center space-x-2">
                        <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Confirmada</span>
                        <Button variant="outline" class="text-xs px-3 py-1">Unirse</Button>
                      </div>
                    </div>
                  </div>

                  <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                          <MessageCircle class="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 class="font-semibold text-gray-900">Sesión con Lic. Carmen Vega</h4>
                          <p class="text-sm text-gray-600">Viernes, 17 de enero - 3:00 PM</p>
                          <p class="text-xs text-gray-500">Tema: Equilibrio vida-trabajo</p>
                        </div>
                      </div>
                      <div class="flex items-center space-x-2">
                        <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Pendiente</span>
                        <Button variant="outline" class="text-xs px-3 py-1">Confirmar</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Historial de Sesiones -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Historial de Sesiones</h3>
                <div class="space-y-4">
                  <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <MessageCircle class="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 class="font-semibold text-gray-900">Sesión con Miguel Torres</h4>
                          <p class="text-sm text-gray-600">8 de enero - Completada</p>
                          <p class="text-xs text-gray-500">Tema: Definición de objetivos profesionales</p>
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
                        <span class="text-sm text-gray-600">5.0</span>
                      </div>
                    </div>
                  </div>

                  <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                          <MessageCircle class="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 class="font-semibold text-gray-900">Sesión con Lic. Carmen Vega</h4>
                          <p class="text-sm text-gray-600">22 de diciembre - Completada</p>
                          <p class="text-xs text-gray-500">Tema: Manejo del estrés y ansiedad</p>
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
                        <span class="text-sm text-gray-600">4.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Beneficios del Coaching -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold mb-6">¿Por qué elegir Coaching Personal?</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="text-center">
                  <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp class="h-8 w-8 text-white" />
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Crecimiento Profesional</h3>
                  <p class="text-sm text-gray-600">Desarrolla habilidades clave para avanzar en tu carrera</p>
                </div>
                <div class="text-center">
                  <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target class="h-8 w-8 text-white" />
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Claridad de Objetivos</h3>
                  <p class="text-sm text-gray-600">Define y alcanza tus metas personales y profesionales</p>
                </div>
                <div class="text-center">
                  <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap class="h-8 w-8 text-white" />
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Mayor Confianza</h3>
                  <p class="text-sm text-gray-600">Aumenta tu autoestima y confianza en el entorno laboral</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Reservas View -->
          <div v-if="activeView === 'reservas'" class="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">Mis Reservas</h1>
              <p class="text-gray-600">Gestiona tus actividades reservadas</p>
            </div>

            <!-- Reservas Activas -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
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
                  <div class="flex items-center space-x-2">
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
                      <p class="text-sm text-gray-600">Miércoles, 5:00 PM - Sala 201</p>
                      <p class="text-xs text-gray-500">Miguel Torres</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Confirmada</span>
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
                      <p class="text-sm text-gray-600">Ayer, 6:00 PM - Completada</p>
                      <p class="text-xs text-gray-500">Dr. Roberto Silva</p>
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
                    <span class="text-sm text-gray-600">5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Encuestas View -->
          <div v-if="activeView === 'encuestas'" class="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">Mis Encuestas</h1>
              <p class="text-gray-600">Tu opinión es importante para mejorar nuestros servicios</p>
            </div>

            <!-- Encuestas Pendientes -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold mb-6">Encuestas Pendientes</h2>
              <div class="space-y-4">
                <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">Evaluación de Clima Laboral Q1 2025</h3>
                      <p class="text-sm text-gray-600 mt-1">Ayúdanos a entender cómo te sientes en el trabajo</p>
                      <p class="text-xs text-gray-500 mt-2">Tiempo estimado: 5-7 minutos • Termina en 5 días</p>
                    </div>
                    <Button variant="primary">
                      Completar Encuesta
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Encuestas Completadas -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold mb-6">Encuestas Completadas</h2>
              <div class="space-y-4">
                <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">Satisfacción con Servicios de Coaching</h3>
                      <p class="text-sm text-gray-600 mt-1">Completada el 15 de enero, 2025</p>
                      <div class="flex items-center mt-2">
                        <CheckCircle class="h-4 w-4 text-green-500 mr-2" />
                        <span class="text-sm text-green-600 font-medium">Completada</span>
                      </div>
                    </div>
                    <Button variant="outline">
                      Ver Resultados
                    </Button>
                  </div>
                </div>

                <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">Feedback Actividades de Bienestar</h3>
                      <p class="text-sm text-gray-600 mt-1">Completada el 8 de enero, 2025</p>
                      <div class="flex items-center mt-2">
                        <CheckCircle class="h-4 w-4 text-green-500 mr-2" />
                        <span class="text-sm text-green-600 font-medium">Completada</span>
                      </div>
                    </div>
                    <Button variant="outline">
                      Ver Resultados
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Desafíos View -->
          <div v-if="activeView === 'desafios'" class="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">Desafíos de Bienestar</h1>
              <p class="text-gray-600">Participa en desafíos, gana puntos y mejora tu bienestar</p>
            </div>

            <!-- Desafíos Activos -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold mb-6">Desafíos Activos</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img src="https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Desafío de pasos" class="w-full h-32 object-cover" />
                  <div class="p-4">
                    <h4 class="font-semibold text-gray-900 mb-2">Desafío 10,000 Pasos</h4>
                    <p class="text-sm text-gray-600 mb-3">Camina 10,000 pasos diarios durante 2 semanas</p>
                    <div class="flex items-center justify-between mb-3">
                      <span class="text-xs text-gray-500">Termina en 8 días</span>
                      <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                        100 puntos
                      </span>
                    </div>
                    <Button variant="primary" class="w-full">
                      Unirse al Desafío
                    </Button>
                  </div>
                </div>

                <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img src="https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Desafío hidratación" class="w-full h-32 object-cover" />
                  <div class="p-4">
                    <h4 class="font-semibold text-gray-900 mb-2">Hidratación Saludable</h4>
                    <p class="text-sm text-gray-600 mb-3">Bebe 8 vasos de agua diarios por una semana</p>
                    <div class="flex items-center justify-between mb-3">
                      <span class="text-xs text-gray-500">Termina en 3 días</span>
                      <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                        50 puntos
                      </span>
                    </div>
                    <Button variant="primary" class="w-full">
                      Unirse al Desafío
                    </Button>
                  </div>
                </div>

                <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Desafío meditación" class="w-full h-32 object-cover" />
                  <div class="p-4">
                    <h4 class="font-semibold text-gray-900 mb-2">Meditación Diaria</h4>
                    <p class="text-sm text-gray-600 mb-3">Medita 10 minutos cada día durante un mes</p>
                    <div class="flex items-center justify-between mb-3">
                      <span class="text-xs text-gray-500">Termina en 15 días</span>
                      <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                        200 puntos
                      </span>
                    </div>
                    <Button variant="primary" class="w-full">
                      Unirse al Desafío
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mis Desafíos en Progreso -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold mb-6">Mis Desafíos en Progreso</h2>
              <div class="space-y-4">
                <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
                  <div class="flex items-center justify-between mb-4">
                    <div>
                      <h3 class="font-semibold text-gray-900">Desafío 10,000 Pasos</h3>
                      <p class="text-sm text-gray-600">Día 5 de 14</p>
                    </div>
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">En progreso</span>
                  </div>
                  <div class="mb-4">
                    <div class="flex items-center justify-between text-sm mb-2">
                      <span class="text-gray-600">Progreso:</span>
                      <span class="font-medium">5/14 días</span>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2">
                      <div class="bg-primary rounded-full h-2 transition-all duration-300" style="width: 36%"></div>
                    </div>
                  </div>
                  <Button variant="primary" class="w-full">
                    Registrar Pasos de Hoy
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <!-- Psicoterapia View -->
          <div v-if="activeView === 'psicoterapia'" class="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">Psicoterapia Online</h1>
              <p class="text-gray-600">Apoyo psicológico profesional para tu bienestar emocional</p>
            </div>

            <!-- Servicios de Emergencia -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-red-300/30 bg-red-50/30">
                <div class="flex items-center mb-4">
                  <div class="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mr-4">
                    <MessageCircle class="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 class="text-xl font-semibold text-gray-900">Chat Confidencial 24/7</h2>
                    <p class="text-sm text-gray-600">Psicólogo de guardia disponible</p>
                  </div>
                </div>
                <p class="text-gray-700 mb-6">
                  Accede a apoyo psicológico inmediato cuando lo necesites. Nuestro equipo está disponible las 24 horas.
                </p>
                <Button variant="primary" class="w-full">
                  <MessageCircle class="h-4 w-4 mr-2" />
                  Iniciar Chat Ahora
                </Button>
              </div>

              <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-red-300/30 bg-red-50/30">
                <div class="flex items-center mb-4">
                  <div class="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mr-4">
                    <Phone class="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 class="text-xl font-semibold text-gray-900">Línea de Crisis</h2>
                    <p class="text-sm text-gray-600">Emergencias emocionales</p>
                  </div>
                </div>
                <p class="text-gray-700 mb-6">
                  Si estás pasando por una crisis emocional, nuestro equipo especializado está aquí para ayudarte.
                </p>
                <Button variant="primary" class="w-full bg-red-600 hover:bg-red-700">
                  <Phone class="h-4 w-4 mr-2" />
                  Llamar Línea de Crisis
                </Button>
              </div>
            </div>

            <!-- Psicoterapeutas Disponibles -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold mb-6">Nuestros Psicoterapeutas</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Dra. Patricia Morales -->
                <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Dra. Patricia Morales" class="w-full h-48 object-cover" />
                  <div class="p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Dra. Patricia Morales</h3>
                    <p class="text-sm text-primary font-medium mb-2">Psicóloga Clínica</p>
                    <p class="text-sm text-gray-600 mb-4">Especialista en ansiedad, depresión y manejo del estrés laboral</p>
                    <div class="flex items-center mb-4">
                      <div class="flex items-center mr-4">
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                      </div>
                      <span class="text-sm text-gray-600">4.9 (127 reseñas)</span>
                    </div>
                    <div class="space-y-2 mb-4">
                      <div class="flex items-center text-sm text-gray-600">
                        <Clock class="h-4 w-4 mr-2" />
                        <span>Disponible: Lun-Vie 9:00-18:00</span>
                      </div>
                      <div class="flex items-center text-sm text-gray-600">
                        <Globe class="h-4 w-4 mr-2" />
                        <span>Sesiones online</span>
                      </div>
                    </div>
                    <Button variant="primary" class="w-full">
                      Agendar Sesión
                    </Button>
                  </div>
                </div>

                <!-- Dr. Carlos Mendoza -->
                <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img src="https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Dr. Carlos Mendoza" class="w-full h-48 object-cover" />
                  <div class="p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Dr. Carlos Mendoza</h3>
                    <p class="text-sm text-primary font-medium mb-2">Psicólogo Organizacional</p>
                    <p class="text-sm text-gray-600 mb-4">Especialista en burnout, liderazgo y dinámicas de equipo</p>
                    <div class="flex items-center mb-4">
                      <div class="flex items-center mr-4">
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                      </div>
                      <span class="text-sm text-gray-600">4.8 (89 reseñas)</span>
                    </div>
                    <div class="space-y-2 mb-4">
                      <div class="flex items-center text-sm text-gray-600">
                        <Clock class="h-4 w-4 mr-2" />
                        <span>Disponible: Mar-Sáb 10:00-19:00</span>
                      </div>
                      <div class="flex items-center text-sm text-gray-600">
                        <Globe class="h-4 w-4 mr-2" />
                        <span>Sesiones online</span>
                      </div>
                    </div>
                    <Button variant="primary" class="w-full">
                      Agendar Sesión
                    </Button>
                  </div>
                </div>

                <!-- Dra. Ana Sofía Ruiz -->
                <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img src="https://images.pexels.com/photos/5327647/pexels-photo-5327647.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Dra. Ana Sofía Ruiz" class="w-full h-48 object-cover" />
                  <div class="p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Dra. Ana Sofía Ruiz</h3>
                    <p class="text-sm text-primary font-medium mb-2">Psicóloga Familiar</p>
                    <p class="text-sm text-gray-600 mb-4">Especialista en equilibrio vida-trabajo y autoestima</p>
                    <div class="flex items-center mb-4">
                      <div class="flex items-center mr-4">
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                        <Star class="h-4 w-4 text-yellow-400 fill-current" />
                      </div>
                      <span class="text-sm text-gray-600">4.9 (156 reseñas)</span>
                    </div>
                    <div class="space-y-2 mb-4">
                      <div class="flex items-center text-sm text-gray-600">
                        <Clock class="h-4 w-4 mr-2" />
                        <span>Disponible: Lun-Jue 8:00-16:00</span>
                      </div>
                      <div class="flex items-center text-sm text-gray-600">
                        <Globe class="h-4 w-4 mr-2" />
                        <span>Sesiones online</span>
                      </div>
                    </div>
                    <Button variant="primary" class="w-full">
                      Agendar Sesión
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mis Sesiones -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold mb-6">Mis Sesiones de Psicoterapia</h2>
              
              <!-- Próximas Sesiones -->
              <div class="mb-8">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Próximas Sesiones</h3>
                <div class="space-y-4">
                  <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                          <User class="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 class="font-semibold text-gray-900">Sesión con Dra. Patricia Morales</h4>
                          <p class="text-sm text-gray-600">Viernes, 15 de enero - 2:00 PM</p>
                          <p class="text-xs text-gray-500">Sesión de seguimiento - Manejo del estrés</p>
                        </div>
                      </div>
                      <div class="flex items-center space-x-2">
                        <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Confirmada</span>
                        <Button variant="outline" class="text-xs px-3 py-1">Unirse</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Historial de Sesiones -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Historial de Sesiones</h3>
                <div class="space-y-4">
                  <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <User class="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 class="font-semibold text-gray-900">Sesión con Dr. Carlos Mendoza</h4>
                          <p class="text-sm text-gray-600">8 de enero - Completada</p>
                          <p class="text-xs text-gray-500">Gestión del tiempo y productividad</p>
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
                        <span class="text-sm text-gray-600">5.0</span>
                      </div>
                    </div>
                  </div>

                  <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <User class="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 class="font-semibold text-gray-900">Sesión con Dra. Ana Sofía Ruiz</h4>
                          <p class="text-sm text-gray-600">20 de diciembre - Completada</p>
                          <p class="text-xs text-gray-500">Equilibrio vida-trabajo</p>
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
                        <span class="text-sm text-gray-600">4.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recursos de Autoayuda -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold mb-6">Recursos de Autoayuda</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Artículos -->
                <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300">
                  <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <BookOpen class="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Artículos Especializados</h3>
                  <p class="text-sm text-gray-600 mb-4">Biblioteca de artículos sobre bienestar mental y emocional</p>
                  <Button variant="outline" class="w-full">
                    Explorar Artículos
                  </Button>
                </div>

                <!-- Meditaciones -->
                <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300">
                  <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <Brain class="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Meditaciones Guiadas</h3>
                  <p class="text-sm text-gray-600 mb-4">Sesiones de meditación para reducir el estrés y la ansiedad</p>
                  <Button variant="outline" class="w-full">
                    Comenzar Meditación
                  </Button>
                </div>

                <!-- Ejercicios -->
                <div class="glass-card p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300">
                  <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <Heart class="h-6 w-6 text-green-600" />
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Ejercicios de Respiración</h3>
                  <p class="text-sm text-gray-600 mb-4">Técnicas de respiración para momentos de estrés</p>
                  <Button variant="outline" class="w-full">
                    Practicar Ahora
                  </Button>
                </div>
              </div>
            </div>

            <!-- Información de Privacidad -->
            <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
              <h2 class="text-xl font-semibold mb-6">Privacidad y Confidencialidad</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 class="text-lg font-medium text-gray-900 mb-4">Garantías de Confidencialidad</h3>
                  <ul class="space-y-3">
                    <li class="flex items-start">
                      <Shield class="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span class="text-sm text-gray-700">Todas las sesiones son completamente confidenciales</span>
                    </li>
                    <li class="flex items-start">
                      <Shield class="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span class="text-sm text-gray-700">Cumplimos con todas las normativas de protección de datos</span>
                    </li>
                    <li class="flex items-start">
                      <Shield class="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span class="text-sm text-gray-700">Tu empresa no tiene acceso a la información de tus sesiones</span>
                    </li>
                    <li class="flex items-start">
                      <Shield class="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span class="text-sm text-gray-700">Comunicación encriptada de extremo a extremo</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-900 mb-4">Certificaciones Profesionales</h3>
                  <ul class="space-y-3">
                    <li class="flex items-start">
                      <Award class="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span class="text-sm text-gray-700">Psicólogos colegiados y certificados</span>
                    </li>
                    <li class="flex items-start">
                      <Award class="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span class="text-sm text-gray-700">Especialización en psicología organizacional</span>
                    </li>
                    <li class="flex items-start">
                      <Award class="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span class="text-sm text-gray-700">Formación continua en terapias digitales</span>
                    </li>
                    <li class="flex items-start">
                      <Clock class="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span class="text-sm text-gray-700">Disponibilidad 24/7 para emergencias</span>
                    </li>
                  </ul>
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
  Heart,
  Users,
  Globe,
  MapPin,
  Star,
  CheckCircle,
  Activity,
  Brain,
  MessageCircle,
  User,
  Clock,
  BookOpen,
  Shield,
  Phone,
  Award,
  Target,
  TrendingUp,
  Zap
} from 'lucide-vue-next';
import Button from '../../components/common/Button.vue';

const router = useRouter();
const activeView = ref('dashboard');

const empleadoNavLinks = [
  { id: 'dashboard', text: 'Dashboard', icon: LayoutDashboard },
  { id: 'actividades', text: 'Actividades', icon: Calendar },
  { id: 'cursos', text: 'Cursos y Talleres', icon: BookOpen },
  { id: 'reservas', text: 'Mis Reservas', icon: CalendarCheck },
  { id: 'coaching', text: 'Coaching Personal', icon: MessageCircle },
  { id: 'encuestas', text: 'Encuestas', icon: ClipboardList },
  { id: 'desafios', text: 'Desafíos', icon: Trophy },
  { id: 'psicoterapia', text: 'Psicoterapia Online', icon: Heart }
];

function salirDemo() {
  router.push('/');
}
</script>