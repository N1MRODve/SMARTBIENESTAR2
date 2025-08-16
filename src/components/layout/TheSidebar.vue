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
    
    <!-- Navigation links -->
    <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
      <router-link
        v-for="link in navigationLinks"
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
    
    <!-- User info -->
    <div class="p-4 border-t border-white/20 bg-primary-dark/30">
      <div class="flex items-center space-x-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-200">
        <div class="h-12 w-12 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center border-2 border-white/30 shadow-lg">
          <span class="text-sm font-bold text-primary">
            {{ authStore.user?.nombre?.[0]?.toUpperCase() }}{{ authStore.user?.apellido?.[0]?.toUpperCase() }}
          </span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-white truncate drop-shadow-sm">
            {{ authStore.user?.nombre }} {{ authStore.user?.apellido }}
          </p>
          <p class="text-xs text-white/70 truncate">
            {{ authStore.user?.email }}
          </p>
          <p class="text-xs text-accent font-medium">
            {{ getRoleDisplayName(authStore.user?.tipo_usuario) }}
          </p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../../stores/auth.store';
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
  UserCheck
} from 'lucide-vue-next';

const props = defineProps({
  open: {
    type: Boolean,
    required: true
  }
});

defineEmits(['update:open']);

const authStore = useAuthStore();

const navigationLinks = computed(() => {
  const userRole = authStore.user?.tipo_usuario;
  
  if (userRole === 'empleado') {
    return [
      { to: '/empleado/dashboard', icon: LayoutDashboard, text: 'Dashboard' },
      { to: '/empleado/reservar-actividad', icon: Calendar, text: 'Actividades' },
      { to: '/empleado/reservas', icon: CalendarCheck, text: 'Mis Reservas' },
      { to: '/empleado/encuestas', icon: ClipboardList, text: 'Encuestas' },
      { to: '/empleado/desafios', icon: Trophy, text: 'Desafíos' },
      { to: '/empleado/coaching', icon: MessageCircle, text: 'Coaching' },
      { to: '/empleado/talleres', icon: GraduationCap, text: 'Talleres' },
      { to: '/empleado/psicoterapia', icon: Heart, text: 'Psicoterapia' }
    ];
  }
  
  if (userRole === 'administrador') {
    return [
      { to: '/admin/dashboard', icon: LayoutDashboard, text: 'Dashboard' },
      { to: '/admin/empleados', icon: Users, text: 'Empleados' },
      { to: '/admin/encuestas', icon: ClipboardList, text: 'Encuestas' },
      { to: '/admin/servicios', icon: Briefcase, text: 'Servicios' },
      { to: '/admin/analitica', icon: BarChart3, text: 'Analítica' },
      { to: '/admin/horarios', icon: Calendar, text: 'Horarios' }
    ];
  }
  
  if (userRole === 'superadmin') {
    return [
      { to: '/superadmin/dashboard', icon: LayoutDashboard, text: 'Dashboard' },
      { to: '/superadmin/empresas', icon: Building2, text: 'Empresas' },
      { to: '/superadmin/colaboradores', icon: Users, text: 'Colaboradores' },
      { to: '/superadmin/horarios', icon: Calendar, text: 'Horarios' }
    ];
  }
  
  if (userRole === 'colaborador') {
    return [
      { to: '/colaborador/dashboard', icon: LayoutDashboard, text: 'Dashboard' },
      { to: '/colaborador/sesiones', icon: Calendar, text: 'Mis Sesiones' }
    ];
  }
  
  return [];
});

const getRoleDisplayName = (role) => {
  const roleNames = {
    empleado: 'Empleado',
    administrador: 'Administrador',
    superadmin: 'Super Admin',
    colaborador: 'Colaborador'
  };
  return roleNames[role] || 'Usuario';
};
</script>