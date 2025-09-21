<template>
  <div class="min-h-screen bg-background text-on-background">
    <!-- Navigation Header -->
    <nav class="bg-surface sticky top-0 z-50 shadow-sm border-b border-surface-container">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-2">
            <ActivitySquare class="h-8 w-8 text-primary" />
            <span class="text-xl font-bold text-on-surface">
              SMART<span class="text-primary">Bienestar</span>
            </span>
          </div>
          <button @click="irALogin" class="btn btn-primary">
            <LogIn class="h-4 w-4 mr-2" />
            Iniciar Sesión
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto text-center">
        <div class="bg-surface-container rounded-2xl p-8 md:p-12">
          <h1 class="text-5xl md:text-6xl font-bold text-on-surface-container mb-6 leading-tight">
            Bienestar Corporativo
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Inteligente
            </span>
          </h1>
          <p class="text-xl text-on-surface-variant mb-8 max-w-3xl mx-auto leading-relaxed">
            Transformamos el entorno laboral con soluciones de bienestar personalizadas, 
            mejorando la productividad y felicidad de tus empleados.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button @click="irALogin" class="btn btn-primary text-lg px-8 py-3">
              <Zap class="h-5 w-5 mr-2" />
              Comenzar Ahora
            </button>
            <button @click="irADemo" class="btn btn-outline text-lg px-8 py-3">
              <Play class="h-5 w-5 mr-2" />
              Ver Demo
            </button>
            <button @click="scrollToFeatures" class="btn btn-outline text-lg px-8 py-3">
              <ArrowDown class="h-5 w-5 mr-2" />
              Conocer Más
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-surface-container">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-on-surface mb-4">
            ¿Qué ofrecemos?
          </h2>
          <p class="text-xl text-on-surface-variant max-w-2xl mx-auto">
            Una plataforma integral para el bienestar de tus empleados con servicios especializados
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Yoga -->
          <BaseCard>
            <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Activity class="h-8 w-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-on-surface mb-4">Yoga</h3>
            <p class="text-on-surface-variant leading-relaxed">
              Clases de yoga para mejorar la flexibilidad, reducir el estrés y encontrar el equilibrio perfecto entre cuerpo y mente.
            </p>
          </BaseCard>

          <!-- Meditación -->
          <BaseCard>
            <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Brain class="h-8 w-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-on-surface mb-4">Meditación</h3>
            <p class="text-on-surface-variant leading-relaxed">
              Sesiones guiadas para fomentar la calma, mejorar la concentración y desarrollar mindfulness en el trabajo.
            </p>
          </BaseCard>

          <!-- Nutrición -->
          <BaseCard>
            <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Apple class="h-8 w-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-on-surface mb-4">Nutrición</h3>
            <p class="text-on-surface-variant leading-relaxed">
              Asesoramiento nutricional personalizado para una vida más saludable y mayor energía durante la jornada laboral.
            </p>
          </BaseCard>

          <!-- Coaching -->
          <BaseCard>
            <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <MessageCircle class="h-8 w-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-on-surface mb-4">Coaching</h3>
            <p class="text-on-surface-variant leading-relaxed">
              Sesiones de coaching para el desarrollo personal y profesional, potenciando el crecimiento de cada empleado.
            </p>
          </BaseCard>

          <!-- Psicoterapia -->
          <BaseCard>
            <div class="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Heart class="h-8 w-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-on-surface mb-4">Psicoterapia</h3>
            <p class="text-on-surface-variant leading-relaxed">
              Apoyo psicológico profesional para el bienestar emocional y mental de tus empleados.
            </p>
          </BaseCard>

          <!-- Entrenamiento -->
          <BaseCard>
            <div class="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Dumbbell class="h-8 w-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-on-surface mb-4">Entrenamiento</h3>
            <p class="text-on-surface-variant leading-relaxed">
              Programas de entrenamiento físico adaptados para mejorar la condición física y energía de tu equipo.
            </p>
          </BaseCard>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div class="max-w-7xl mx-auto">
        <div class="bg-surface rounded-2xl p-8 md:p-12 shadow-lg">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-on-surface mb-4">
              ¿Por qué elegir SMART Bienestar?
            </h2>
            <p class="text-xl text-on-surface-variant max-w-2xl mx-auto">
              Nuestra plataforma está diseñada para maximizar el impacto en el bienestar de tus empleados
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp class="h-6 w-6 text-primary" />
              </div>
              <h3 class="text-lg font-semibold text-on-surface mb-2">Productividad</h3>
              <p class="text-on-surface-variant text-sm">Empleados más felices son 31% más productivos</p>
            </div>

            <div class="text-center">
              <div class="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield class="h-6 w-6 text-secondary" />
              </div>
              <h3 class="text-lg font-semibold text-on-surface mb-2">Retención</h3>
              <p class="text-on-surface-variant text-sm">Reduce la rotación de personal hasta un 40%</p>
            </div>

            <div class="text-center">
              <div class="w-12 h-12 bg-tertiary-container rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star class="h-6 w-6 text-yellow-600" />
              </div>
              <h3 class="text-lg font-semibold text-on-surface mb-2">Satisfacción</h3>
              <p class="text-on-surface-variant text-sm">Mejora la satisfacción laboral significativamente</p>
            </div>

            <div class="text-center">
              <div class="w-12 h-12 bg-error-container rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart class="h-6 w-6 text-red-500" />
              </div>
              <h3 class="text-lg font-semibold text-on-surface mb-2">Bienestar</h3>
              <p class="text-on-surface-variant text-sm">Reduce el estrés y mejora la salud mental</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <div class="bg-primary-container rounded-2xl p-8 md:p-12">
          <h2 class="text-4xl font-bold text-on-primary-container mb-6">
            ¿Listo para transformar tu empresa?
          </h2>
          <p class="text-lg text-on-primary-container/80 mb-8 max-w-2xl mx-auto">
            Únete a las empresas que ya están mejorando el bienestar de sus empleados con SMART Bienestar
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button @click="irALogin" class="btn btn-primary text-lg px-8 py-3">
              <Rocket class="h-5 w-5 mr-2" />
              Acceder a mi Cuenta
            </button>
            <button @click="contactarVentas" class="btn btn-outline text-lg px-8 py-3">
              <Mail class="h-5 w-5 mr-2" />
              Contactar Ventas
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-surface-container border-t border-outline-variant py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <ActivitySquare class="h-8 w-8 text-primary" />
              <span class="text-xl font-bold text-on-surface-container">
                SMART<span class="text-primary">Bienestar</span>
              </span>
            </div>
            <p class="text-on-surface-variant mb-4 max-w-md">
              Plataforma líder en bienestar corporativo, diseñada para mejorar la calidad de vida 
              de los empleados y el rendimiento de las empresas.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-on-surface-variant/60 hover:text-primary transition-colors">
                <span class="sr-only">Facebook</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="text-on-surface-variant/60 hover:text-primary transition-colors">
                <span class="sr-only">Twitter</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" class="text-on-surface-variant/60 hover:text-primary transition-colors">
                <span class="sr-only">LinkedIn</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-on-surface-container mb-4">Servicios</h3>
            <ul class="space-y-2 text-on-surface-variant">
              <li>Yoga y Mindfulness</li>
              <li>Coaching Personal</li>
              <li>Nutrición Corporativa</li>
              <li>Entrenamiento Físico</li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-on-surface-container mb-4">Empresa</h3>
            <ul class="space-y-2 text-on-surface-variant">
              <li>Sobre Nosotros</li>
              <li>Nuestro Equipo</li>
              <li>Casos de Éxito</li>
              <li>Blog</li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-on-surface-container mb-4">Soporte</h3>
            <ul class="space-y-2 text-on-surface-variant">
              <li>Centro de Ayuda</li>
              <li>Contacto</li>
              <li>Términos de Servicio</li>
              <li>Política de Privacidad</li>
            </ul>
          </div>
        </div>

        <div class="border-t border-outline-variant mt-12 pt-8 text-center">
          <p class="text-on-surface-variant">
            © 2025 SMART Bienestar. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { 
  ActivitySquare, 
  LogIn, 
  Zap, 
  ArrowDown, 
  Play,
  Activity, 
  Brain, 
  Apple, 
  MessageCircle, 
  Heart, 
  Dumbbell,
  TrendingUp,
  Shield,
  Star,
  Rocket,
  Mail
} from 'lucide-vue-next';
import BaseCard from '@/views/BaseCard.vue';

const router = useRouter();

function irALogin() {
  router.push('/login');
}

function irADemo() {
  router.push('/demo');
}

function scrollToFeatures() {
  document.getElementById('features')?.scrollIntoView({ 
    behavior: 'smooth' 
  });
}

function contactarVentas() {
  // Implementar lógica de contacto
  window.open('mailto:ventas@smartbienestar.com', '_blank');
}
</script>