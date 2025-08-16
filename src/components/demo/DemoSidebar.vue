<template>
  <!-- Mobile overlay -->
  <div
    v-show="props.open"
    class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
    @click="$emit('update:open', false)"
  />
  
  <!-- Sidebar -->
  <aside :class="[
    'fixed inset-y-0 left-0 w-64 z-40 transform transition-all duration-300 ease-in-out lg:relative lg:transform-none',
    'bg-gradient-to-b from-primary via-primary-dark to-primary shadow-2xl',
    props.open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
  ]">
    <!-- Logo and close button -->
    <div class="h-16 flex items-center justify-between px-6 border-b border-white/20 bg-primary-dark/50">
      <div class="flex items-center space-x-3">
        <ActivitySquare class="h-8 w-8 text-white" />
        <span class="text-xl font-bold text-white">
          SMART<span class="text-accent">Bienestar</span>
        </span>
      </div>
      <button
        class="lg:hidden p-2 rounded-lg text-white hover:bg-white/20 transition-all duration-200"
        @click="$emit('update:open', false)"
      >
        <X class="h-5 w-5" />
      </button>
    </div>
    
    <!-- Demo indicator -->
    <div class="px-4 py-3 bg-yellow-500/20 border-b border-white/20">
      <div class="flex items-center space-x-2">
        <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        <span class="text-yellow-200 text-sm font-medium">🎭 Modo Demo</span>
      </div>
    </div>
    
    <!-- Navigation links -->
    <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
      <router-link
        v-for="link in demoNavigationLinks"
        :key="link.to"
        :to="link.to"
        class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group"
        :class="[
          $route.path.startsWith(link.to)
            ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30 transform scale-105'
            : 'text-white/80 hover:bg-white/10 hover:text-white hover:transform hover:scale-105 hover:shadow-md'
        ]"
        @click="$emit('update:open', false)"
      >
        <component 
          :is="link.icon" 
          class="h-5 w-5 mr-3 transition-all duration-200 group-hover:scale-110" 
          :class="$route.path.startsWith(link.to) ? 'text-white' : 'text-white/70'"
        />
        <span class="font-medium drop-shadow-sm">{{ link.text }}</span>
        <div v-if="$route.path.startsWith(link.to)" class="ml-auto">
          <div class="w-2 h-2 bg-accent rounded-full"></div>
        </div>
      </router-link>
    </nav>
    
    <!-- Demo user info -->
    <div class="p-4 border-t border-white/20 bg-primary-dark/30">
      <div class="flex items-center space-x-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-200">
        <div class="h-12 w-12 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center border-2 border-white/30 shadow-lg">
          <span class="text-sm font-bold text-primary">
            {{ demoUser.iniciales }}
          </span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-white truncate drop-shadow-sm">
            {{ demoUser.nombre }}
          </p>
          <p class="text-xs text-white/70 truncate">
            {{ demoUser.email }}
          </p>
          <p class="text-xs text-accent font-medium">
            {{ demoUser.rol }} (Demo)
          </p>
        </div>
      </div>
      
      <!-- Demo actions -->
      <div class="mt-4 space-y-2">
        <button 
          @click="cambiarDemo"
          class="w-full text-left px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center"
        >
          <RefreshCw class="h-4 w-4 mr-2" />
          Cambiar Demo
        </button>
        <button 
          @click="salirDemo"
          class="w-full text-left px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center"
        >
          <LogOut class="h-4 w-4 mr-2" />
          Salir de Demo
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { 
  ActivitySquare, 
  X, 
  LayoutDashboard, 
  Calendar, 
  CalendarCheck, 
  ClipboardList, 
  Trophy,
  MessageCircle,
  GraduationCap,
  Heart,
  Users,
  Briefcase,
  BarChart3,
  Building2,
  UserCheck,
  RefreshCw,
  LogOut
} from 'lucide-vue-next';

const props = defineProps({
  open: {
    type: Boolean,
    required: true
  },
  demoType: {
    type: String,
    required: true,
    validator: (value) => ['empleado', 'admin'].includes(value)
  }
});

const route = useRoute();
const router = useRouter();

defineEmits(['update:open']);

// Demo user data based on demo type
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

// Navigation links based on demo type
const demoNavigationLinks = computed(() => {
  if (props.demoType === 'empleado') {
    return [
      { to: '/demo/empleado', icon: LayoutDashboard, text: 'Dashboard' },
      { to: '/demo/empleado/actividades', icon: Calendar, text: 'Actividades' },
      { to: '/demo/empleado/reservas', icon: CalendarCheck, text: 'Mis Reservas' },
      { to: '/demo/empleado/encuestas', icon: ClipboardList, text: 'Encuestas' },
      { to: '/demo/empleado/desafios', icon: Trophy, text: 'Desafíos' },
      { to: '/demo/empleado/coaching', icon: MessageCircle, text: 'Coaching' },
      { to: '/demo/empleado/talleres', icon: GraduationCap, text: 'Talleres' },
      { to: '/demo/empleado/psicoterapia', icon: Heart, text: 'Psicoterapia' }
    ];
  } else {
    return [
      { to: '/demo/admin', icon: LayoutDashboard, text: 'Dashboard' },
      { to: '/demo/admin/empleados', icon: Users, text: 'Empleados' },
      { to: '/demo/admin/encuestas', icon: ClipboardList, text: 'Encuestas' },
      { to: '/demo/admin/servicios', icon: Briefcase, text: 'Servicios' },
      { to: '/demo/admin/analitica', icon: BarChart3, text: 'Analítica' },
      { to: '/demo/admin/horarios', icon: Calendar, text: 'Horarios' }
    ];
  }
});

// Demo actions
const cambiarDemo = () => {
  router.push('/demo');
};

const salirDemo = () => {
  router.push('/');
};
</script>