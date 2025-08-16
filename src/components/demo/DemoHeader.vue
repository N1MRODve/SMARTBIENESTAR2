<template>
  <header class="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm sticky top-0 z-20">
    <div class="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center">
        <button
          class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          @click="$emit('toggle-sidebar')"
        >
          <Menu class="h-6 w-6" />
        </button>
        
        <!-- Demo page title -->
        <div class="hidden lg:block ml-4">
          <h1 class="text-lg font-semibold text-gray-900">
            {{ getPageTitle() }}
          </h1>
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <!-- Demo indicator -->
        <div class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
          <div class="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
          🎭 Modo Demo
        </div>
        
        <!-- Demo user info -->
        <div class="hidden md:flex items-center space-x-3">
          <div class="text-right">
            <p class="text-sm font-medium text-gray-900">
              {{ demoUser.nombre }}
            </p>
            <p class="text-xs text-gray-500">
              {{ demoUser.rol }} (Demo)
            </p>
          </div>
          <div class="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
            <span class="text-xs font-bold text-white">
              {{ demoUser.iniciales }}
            </span>
          </div>
        </div>
        
        <!-- Demo actions -->
        <div class="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            @click="cambiarDemo"
          >
            <RefreshCw class="h-4 w-4 mr-2" />
            Cambiar Demo
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            @click="salirDemo"
          >
            <LogOut class="h-4 w-4 mr-2" />
            Salir Demo
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Menu, RefreshCw, LogOut } from 'lucide-vue-next';
import Button from '../common/Button.vue';

const props = defineProps({
  demoType: {
    type: String,
    required: true,
    validator: (value) => ['empleado', 'admin'].includes(value)
  }
});

const route = useRoute();
const router = useRouter();

defineEmits(['toggle-sidebar']);

// Demo user data
const demoUser = computed(() => {
  if (props.demoType === 'empleado') {
    return {
      nombre: 'Ana García',
      email: 'demo.ana@innovatech-demo.com',
      rol: 'Empleado',
      iniciales: 'AG'
    };
  } else {
    return {
      nombre: 'Carlos Admin',
      email: 'demo.admin@innovatech-demo.com',
      rol: 'Administrador',
      iniciales: 'CA'
    };
  }
});

const getPageTitle = () => {
  const titles = {
    '/demo/empleado': 'Dashboard Empleado',
    '/demo/empleado/actividades': 'Actividades Disponibles',
    '/demo/empleado/reservas': 'Mis Reservas',
    '/demo/empleado/encuestas': 'Mis Encuestas',
    '/demo/empleado/desafios': 'Desafíos de Bienestar',
    '/demo/empleado/coaching': 'Coaching Personal',
    '/demo/empleado/talleres': 'Talleres y Eventos',
    '/demo/empleado/psicoterapia': 'Psicoterapia',
    '/demo/admin': 'Dashboard Administrador',
    '/demo/admin/empleados': 'Gestión de Empleados',
    '/demo/admin/encuestas': 'Gestión de Encuestas',
    '/demo/admin/servicios': 'Servicios Contratados',
    '/demo/admin/analitica': 'Analítica Predictiva',
    '/demo/admin/horarios': 'Gestión de Horarios'
  };
  return titles[route.path] || 'Demo SMART Bienestar';
};

const cambiarDemo = () => {
  router.push('/demo');
};

const salirDemo = () => {
  router.push('/');
};
</script>