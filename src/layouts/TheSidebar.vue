<script setup>
import { useRoute, RouterLink } from 'vue-router'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import {
  Home,
  Users,
  ClipboardList,
  Briefcase,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next'

// 1. Corregido el nombre de la prop a 'collapsed'
const props = defineProps({
  collapsed: { type: Boolean, default: false }
})
const emit = defineEmits(['toggle'])

const authStore = useAuthStore()

// Obtiene el rol del usuario de forma reactiva
const userRole = computed(() => authStore.user?.tipo_usuario)

// Mapa de enlaces de navegación para cada rol
const linksPorRol = {
  administrador: [
    { name: 'AdminDashboard', text: 'Dashboard', icon: 'LayoutDashboard' },
    { name: 'AdminEmpleados', text: 'Empleados', icon: 'Users' },
    { name: 'EncuestasView', text: 'Encuestas', icon: 'ClipboardList' }
    // Puedes añadir más enlaces de administrador aquí
  ],
  empleado: [
    { name: 'empleado-dashboard', text: 'Mi Dashboard', icon: 'User' },
    { name: 'ReservarActividad', text: 'Reservar Actividad', icon: 'CalendarPlus' },
    { name: 'empleado-reservas', text: 'Mis Reservas', icon: 'CalendarCheck' },
    { name: 'empleado-encuestas', text: 'Mis Encuestas', icon: 'ClipboardList' },
    { name: 'empleado-desafios', text: 'Mis Desafíos', icon: 'Trophy' }
  ]
}

// Propiedad computada que selecciona los enlaces correctos según el rol
const navLinks = computed(() => {
  if (!userRole.value) return []
  return linksPorRol[userRole.value] || []
})
</script>

<template>
  <!-- 2. Añadido position:fixed y anchos fijos (w-64/w-20) -->
  <aside 
    class="fixed top-0 left-0 h-full flex flex-col transition-all duration-300 z-30
           bg-gray-900/70 backdrop-blur-lg border-r border-gray-200/20"
    :class="{ 'w-64': !props.collapsed, 'w-20': props.collapsed }"
  >
    <!-- Encabezado del Sidebar -->
    <div class="p-4 border-b border-gray-200/20 flex items-center" :class="props.collapsed ? 'justify-center' : 'justify-between'">
      <h1 v-if="!props.collapsed" class="text-xl font-bold text-white">SMART Bienestar</h1>
      <button @click="$emit('toggle')" class="p-2 rounded-md hover:bg-white/10">
        <!-- Icono de Menú (Placeholder) -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
      </button>
    </div>
    
    <!-- Navegación Principal -->
    <nav class="flex-1 p-2 space-y-1">
      <RouterLink
        v-for="link in navLinks"
        :key="link.name"
        :to="{ name: link.name }"
        class="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors"
        active-class="bg-primary text-white font-semibold"
      >
        <!-- Icono (Placeholder) -->
        <span class="w-6 h-6"><!-- Icono aquí --></span>
        <span v-if="!props.collapsed">{{ link.text }}</span>
      </RouterLink>
    </nav>

    <!-- Pie del Sidebar (Logout, etc.) -->
    <div class="p-4 border-t border-gray-200/20">
      <!-- Contenido del pie del sidebar -->
    </div>
  </aside>
</template>