<template>
  <div
    v-show="open"
    class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
    @click="$emit('update:open', false)"
  />
  <aside :class="[
    'fixed inset-y-0 left-0 w-64 bg-primary text-white z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:transform-none',
    open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
  ]">
    <!-- Logo and close button -->
    <div class="h-16 flex items-center justify-between px-4 border-b border-primary-dark">
      <div class="flex items-center space-x-2">
        <ActivitySquare class="h-8 w-8 text-white" />
        <span class="text-xl font-bold text-white">SMART<span class="text-accent">Bienestar</span></span>
      </div>
      <button
        class="lg:hidden p-2 rounded-md text-white hover:bg-primary-dark"
        @click="$emit('update:open', false)"
      >
        <X class="h-6 w-6" />
      </button>
    </div>
    
    <!-- Navigation links -->
    <nav class="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
      <router-link
        v-for="link in navigationLinks"
        :key="link.to"
        :to="link.to"
        class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150"
        :class="[
          $route.path.startsWith(link.to)
            ? 'bg-primary-dark text-white'
            : 'text-white hover:bg-primary-dark'
        ]"
      >
        <component :is="link.icon" class="h-5 w-5 mr-3" />
        {{ link.text }}
      </router-link>
    </nav>
    
    <!-- User info -->
    <div class="p-4 border-t border-primary-dark">
      <div class="flex items-center space-x-3">
        <div class="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
          <span class="text-sm font-medium text-white">
            {{ authStore.user?.nombre?.[0]?.toUpperCase() }}
          </span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-white truncate">
            {{ authStore.user?.nombre }} {{ authStore.user?.apellido }}
          </p>
          <p class="text-xs text-white/70 truncate">
            {{ authStore.user?.email }}
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
  User
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
      { to: '/empleado/reservar-actividad', icon: Calendar, text: 'Reservar Actividad' },
      { to: '/empleado/reservas', icon: CalendarCheck, text: 'Mis Reservas' },
      { to: '/empleado/encuestas', icon: ClipboardList, text: 'Encuestas' },
      { to: '/empleado/desafios', icon: Trophy, text: 'Desafíos' }
    ];
  }
  
  if (userRole === 'administrador') {
    return [
      { to: '/admin/dashboard', icon: LayoutDashboard, text: 'Dashboard' },
      { to: '/admin/empleados', icon: User, text: 'Empleados' },
      { to: '/admin/encuestas', icon: ClipboardList, text: 'Encuestas' }
    ];
  }
  
  if (userRole === 'superadmin') {
    return [
      { to: '/superadmin/dashboard', icon: LayoutDashboard, text: 'Dashboard' },
      { to: '/superadmin/empresas', icon: LayoutDashboard, text: 'Empresas' },
      { to: '/superadmin/colaboradores', icon: User, text: 'Colaboradores' }
    ];
  }
  
  if (userRole === 'colaborador') {
    return [
      { to: '/colaborador/dashboard', icon: LayoutDashboard, text: 'Dashboard' },
      { to: '/colaborador/sesiones', icon: Calendar, text: 'Sesiones' }
    ];
  }
  
  return [];
});
</script>