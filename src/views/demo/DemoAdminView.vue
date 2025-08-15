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
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
            <p class="text-gray-600">Vista general de InnovaTech Solutions</p>
          </div>

          <!-- KPIs -->
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-600">Total Empleados</h3>
                  <p class="text-3xl font-bold text-gray-900 mt-2">25</p>
                  <p class="text-sm text-gray-500 mt-1">Empleados registrados</p>
                </div>
                <div class="p-3 bg-primary/10 rounded-xl">
                  <Users class="h-7 w-7 text-primary" />
                </div>
              </div>
            </div>

            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-600">Empleados Activos</h3>
                  <p class="text-3xl font-bold text-gray-900 mt-2">18</p>
                  <p class="text-sm text-gray-500 mt-1">Actualmente activos</p>
                </div>
                <div class="p-3 bg-green-500/10 rounded-xl">
                  <UserCheck class="h-7 w-7 text-green-600" />
                </div>
              </div>
            </div>

            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-600">Sesiones Próximas</h3>
                  <p class="text-3xl font-bold text-gray-900 mt-2">8</p>
                  <p class="text-sm text-gray-500 mt-1">En los próximos 7 días</p>
                </div>
                <div class="p-3 bg-blue-500/10 rounded-xl">
                  <Calendar class="h-7 w-7 text-blue-600" />
                </div>
              </div>
            </div>

            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-600">Encuestas Activas</h3>
                  <p class="text-3xl font-bold text-gray-900 mt-2">2</p>
                  <p class="text-sm text-gray-500 mt-1">Encuestas en curso</p>
                </div>
                <div class="p-3 bg-purple-500/10 rounded-xl">
                  <ClipboardList class="h-7 w-7 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          <!-- Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Gráfico de participación -->
            <div class="lg:col-span-2 glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
              <h2 class="text-lg font-semibold mb-4">Participación por Departamento</h2>
              <div class="h-64 bg-white/50 rounded-xl flex items-center justify-center">
                <div class="text-center">
                  <BarChart3 class="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p class="text-gray-500">Gráfico de participación por departamento</p>
                  <div class="mt-4 space-y-2">
                    <div class="flex items-center justify-between text-sm">
                      <span>Tecnología:</span>
                      <span class="font-semibold">83% participación</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <span>Diseño:</span>
                      <span class="font-semibold">83% participación</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <span>Producto:</span>
                      <span class="font-semibold">50% participación</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actividad reciente -->
            <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
              <h2 class="text-lg font-semibold mb-4">Actividad Reciente</h2>
              <div class="space-y-4">
                <div class="text-sm">
                  <p class="font-medium text-gray-900">Ana se apuntó a Yoga Matutino</p>
                  <p class="text-gray-500 text-xs">Hace 2 horas</p>
                </div>
                <div class="text-sm">
                  <p class="font-medium text-gray-900">Luis completó desafío de pasos</p>
                  <p class="text-gray-500 text-xs">Hace 4 horas</p>
                </div>
                <div class="text-sm">
                  <p class="font-medium text-gray-900">Sofía calificó sesión con 5★</p>
                  <p class="text-gray-500 text-xs">Hace 6 horas</p>
                </div>
                <div class="text-sm">
                  <p class="font-medium text-gray-900">Nueva encuesta creada</p>
                  <p class="text-gray-500 text-xs">Ayer</p>
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

          <!-- Tabla de empleados -->
          <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
            <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20">
              <table class="min-w-full">
                <thead class="bg-white/50 backdrop-blur-sm">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Empleado</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Departamento</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Puntos</th>
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
            </div>

            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star class="h-8 w-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">4.3</h3>
              <p class="text-gray-600">Satisfacción Promedio</p>
            </div>

            <div class="glass-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target class="h-8 w-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">156</h3>
              <p class="text-gray-600">Objetivos Completados</p>
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
                    <p class="font-semibold text-gray-900">Luis Fernández</p>
                    <p class="text-sm text-gray-600">Product Manager</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-lg font-bold text-primary">980 pts</p>
                  <p class="text-sm text-gray-500">6 actividades</p>
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
  Users, 
  ClipboardList, 
  BarChart3,
  Calendar,
  UserCheck,
  UserPlus,
  Plus,
  FileText,
  TrendingUp,
  Star,
  Target
} from 'lucide-vue-next';
import Button from '../../components/common/Button.vue';

const router = useRouter();
const activeView = ref('dashboard');

const adminNavLinks = [
  { id: 'dashboard', text: 'Dashboard', icon: LayoutDashboard },
  { id: 'empleados', text: 'Empleados', icon: Users },
  { id: 'encuestas', text: 'Encuestas', icon: ClipboardList },
  { id: 'estadisticas', text: 'Estadísticas', icon: BarChart3 }
];

function salirDemo() {
  router.push('/');
}
</script>