<template>
  <div class="flex flex-col h-full bg-surface text-on-surface p-4 border-r border-outline-variant">
    <!-- Logo -->
    <div class="flex items-center justify-center h-16 mb-4">
      <h1 class="text-2xl font-bold text-primary">SmartBienestar</h1>
    </div>

    <!-- Navegación -->
    <nav class="flex-1 space-y-2">
      <router-link
        v-for="item in navigation"
        :key="item.name"
        :to="item.to"
        custom
        v-slot="{ href, navigate, isActive }"
      >
        <a
          :href="href"
          @click="navigate"
          :class="[
            isActive
              ? 'bg-primary-container text-on-primary-container'
              : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface',
            'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150'
          ]"
        >
          <component :is="item.icon" class="mr-3 h-5 w-5" aria-hidden="true" />
          {{ item.name }}
        </a>
      </router-link>
    </nav>

    <!-- Perfil de Usuario y Logout -->
    <div class="mt-auto">
      <div class="p-2 rounded-lg hover:bg-surface-variant">
        <div class="flex items-center">
          <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
            {{ authStore.user?.nombre?.charAt(0) || 'U' }}
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-on-surface">{{ authStore.user?.nombre }}</p>
            <p class="text-xs text-on-surface-variant">{{ authStore.user?.email }}</p>
          </div>
        </div>
      </div>
      <button @click="handleLogout" class="w-full mt-2 group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors duration-150">
        <LogOut class="mr-3 h-5 w-5" />
        Cerrar Sesión
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import {
  LayoutDashboard,
  CalendarCheck,
  Bookmark,
  ClipboardList,
  Trophy,
  Heart,
  GraduationCap,
  LogOut
} from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();

const navigation = ref([
  { name: 'Mi Dashboard', to: { name: 'empleado-dashboard' }, icon: LayoutDashboard },
  { name: 'Reservar Actividad', to: { name: 'empleado-reservar-actividad' }, icon: CalendarCheck },
  { name: 'Mis Reservas', to: { name: 'empleado-mis-reservas' }, icon: Bookmark },
  { name: 'Encuestas', to: { name: 'empleado-encuestas' }, icon: ClipboardList },
  { name: 'Desafíos', to: { name: 'empleado-desafios' }, icon: Trophy },
  { name: 'Psicoterapia', to: { name: 'empleado-psicoterapia' }, icon: Heart },
  { name: 'Talleres y Eventos', to: { name: 'empleado-talleres' }, icon: GraduationCap },
]);

const handleLogout = async () => {
  await authStore.signOut();
  router.push({ name: 'login' });
};
</script>