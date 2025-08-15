<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <!-- Navigation Header -->
    <nav class="glass-container backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-2">
            <ActivitySquare class="h-8 w-8 text-primary" />
            <span class="text-xl font-bold text-gray-900">
              SMART<span class="text-primary">Bienestar</span>
            </span>
          </div>
          <div class="flex items-center space-x-4">
            <Button @click="volverAHome" variant="outline">
              <ArrowLeft class="h-4 w-4 mr-2" />
              Volver
            </Button>
            <Button @click="irALogin" variant="primary">
              <LogIn class="h-4 w-4 mr-2" />
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto text-center">
        <div class="glass-container rounded-3xl p-12 backdrop-blur-xl border border-white/30 shadow-2xl">
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Explora la
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Demo Interactiva
            </span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Descubre cómo SMART Bienestar transforma el entorno laboral. 
            Elige tu perspectiva y explora todas las funcionalidades.
          </p>
        </div>
      </div>
    </section>

    <!-- Demo Selection Cards -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Demo Empleado -->
          <div class="glass-container rounded-3xl p-8 backdrop-blur-xl border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 group">
            <div class="text-center mb-8">
              <div class="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <User class="h-12 w-12 text-white" />
              </div>
              <h2 class="text-3xl font-bold text-gray-900 mb-4">Demo Empleado</h2>
              <p class="text-lg text-gray-600 leading-relaxed">
                Experimenta la plataforma desde la perspectiva de un empleado. 
                Reserva actividades, participa en desafíos y gestiona tu bienestar.
              </p>
            </div>

            <!-- Características del empleado -->
            <div class="space-y-4 mb-8">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar class="h-4 w-4 text-green-600" />
                </div>
                <span class="text-gray-700">Reservar actividades de bienestar</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Trophy class="h-4 w-4 text-blue-600" />
                </div>
                <span class="text-gray-700">Participar en desafíos de bienestar</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <ClipboardList class="h-4 w-4 text-purple-600" />
                </div>
                <span class="text-gray-700">Completar encuestas de satisfacción</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star class="h-4 w-4 text-yellow-600" />
                </div>
                <span class="text-gray-700">Ganar puntos y ver progreso</span>
              </div>
            </div>

            <!-- Credenciales demo -->
            <div class="bg-green-50/80 rounded-xl p-4 mb-6 backdrop-blur-sm border border-green-200/50">
              <h4 class="text-sm font-semibold text-green-800 mb-2">Credenciales Demo:</h4>
              <div class="text-sm text-green-700 space-y-1">
                <p><strong>Email:</strong> ana.martinez@innovatech.com</p>
                <p><strong>Contraseña:</strong> empleado123</p>
              </div>
            </div>

            <Button 
              @click="accederDemoEmpleado" 
              class="w-full text-lg py-4"
              variant="primary"
            >
              <Play class="h-5 w-5 mr-2" />
              Acceder como Empleado
            </Button>
          </div>

          <!-- Demo Administrador -->
          <div class="glass-container rounded-3xl p-8 backdrop-blur-xl border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 group">
            <div class="text-center mb-8">
              <div class="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield class="h-12 w-12 text-white" />
              </div>
              <h2 class="text-3xl font-bold text-gray-900 mb-4">Demo Administrador</h2>
              <p class="text-lg text-gray-600 leading-relaxed">
                Gestiona tu empresa desde el panel administrativo. 
                Crea encuestas, administra empleados y analiza métricas.
              </p>
            </div>

            <!-- Características del administrador -->
            <div class="space-y-4 mb-8">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 class="h-4 w-4 text-blue-600" />
                </div>
                <span class="text-gray-700">Dashboard con métricas empresariales</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users class="h-4 w-4 text-purple-600" />
                </div>
                <span class="text-gray-700">Gestionar empleados y perfiles</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText class="h-4 w-4 text-green-600" />
                </div>
                <span class="text-gray-700">Crear y gestionar encuestas</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <TrendingUp class="h-4 w-4 text-red-600" />
                </div>
                <span class="text-gray-700">Analizar participación y resultados</span>
              </div>
            </div>

            <!-- Credenciales demo -->
            <div class="bg-blue-50/80 rounded-xl p-4 mb-6 backdrop-blur-sm border border-blue-200/50">
              <h4 class="text-sm font-semibold text-blue-800 mb-2">Credenciales Demo:</h4>
              <div class="text-sm text-blue-700 space-y-1">
                <p><strong>Email:</strong> admin@innovatech.com</p>
                <p><strong>Contraseña:</strong> admin123</p>
              </div>
            </div>

            <Button 
              @click="accederDemoAdmin" 
              class="w-full text-lg py-4"
              variant="primary"
            >
              <Shield class="h-5 w-5 mr-2" />
              Acceder como Administrador
            </Button>
          </div>
        </div>

        <!-- Información adicional -->
        <div class="mt-16 text-center">
          <div class="glass-container rounded-2xl p-8 backdrop-blur-xl border border-white/30">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">¿Qué incluye la demo?</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div class="text-center">
                <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Database class="h-6 w-6 text-primary" />
                </div>
                <h4 class="font-semibold text-gray-900 mb-2">Datos Realistas</h4>
                <p class="text-sm text-gray-600">Empresas, empleados, sesiones y reservas con datos ficticios pero realistas</p>
              </div>
              <div class="text-center">
                <div class="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap class="h-6 w-6 text-secondary" />
                </div>
                <h4 class="font-semibold text-gray-900 mb-2">Funcionalidad Completa</h4>
                <p class="text-sm text-gray-600">Todas las características principales funcionando en tiempo real</p>
              </div>
              <div class="text-center">
                <div class="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Sparkles class="h-6 w-6 text-yellow-600" />
                </div>
                <h4 class="font-semibold text-gray-900 mb-2">Experiencia Premium</h4>
                <p class="text-sm text-gray-600">Diseño glassmorphic moderno con micro-animaciones</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="mt-16 text-center">
          <div class="glass-container rounded-2xl p-8 backdrop-blur-xl border border-white/30">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">¿Listo para implementar en tu empresa?</h3>
            <p class="text-gray-600 mb-6">Después de explorar la demo, contacta con nuestro equipo para una implementación personalizada</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <Button @click="contactarVentas" size="lg" class="text-lg px-8 py-4">
                <Mail class="h-5 w-5 mr-2" />
                Contactar Ventas
              </Button>
              <Button @click="irALogin" variant="outline" size="lg" class="text-lg px-8 py-4">
                <LogIn class="h-5 w-5 mr-2" />
                Acceso Clientes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { 
  ActivitySquare, 
  ArrowLeft,
  LogIn, 
  Play,
  User,
  Shield,
  Calendar,
  Trophy,
  ClipboardList,
  Star,
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  Database,
  Zap,
  Sparkles,
  Mail
} from 'lucide-vue-next';
import Button from '@/components/common/Button.vue';

const router = useRouter();

function volverAHome() {
  router.push('/');
}

function irALogin() {
  router.push('/login');
}

function accederDemoEmpleado() {
  // Activar modo demo y redirigir con credenciales pre-cargadas
  router.push({
    path: '/login',
    query: {
      demo: 'empleado',
      email: 'ana.martinez@innovatech.com',
      password: 'empleado123'
    }
  });
}

function accederDemoAdmin() {
  // Activar modo demo y redirigir con credenciales pre-cargadas
  router.push({
    path: '/login',
    query: {
      demo: 'admin',
      email: 'admin@innovatech.com',
      password: 'admin123'
    }
  });
}

function contactarVentas() {
  window.open('mailto:ventas@smartbienestar.com?subject=Interés en SMART Bienestar&body=Hola, me interesa conocer más sobre SMART Bienestar para mi empresa.', '_blank');
}
</script>

<style scoped>
/* Efectos adicionales para las tarjetas de demo */
.demo-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.demo-card:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Animación para los iconos */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.float-animation {
  animation: float 6s ease-in-out infinite;
}
</style>