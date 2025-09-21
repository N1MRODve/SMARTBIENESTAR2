<template>
  <aside 
    class="fixed inset-y-0 z-10 flex flex-col h-screen transition-all duration-300 bg-white border-r shadow-sm" 
    :class="collapsed ? 'w-20' : 'w-64'"
  >
    <!-- Logo/Brand -->
    <div class="flex items-center justify-between h-16 px-4 border-b">
      <span v-if="!collapsed" class="text-lg font-semibold text-primary">SmartBienestar</span>
      <button 
        @click="$emit('toggle')" 
        class="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
      >
        <MenuIcon v-if="collapsed" class="w-5 h-5" />
        <ChevronLeft v-else class="w-5 h-5" />
      </button>
    </div>
    
    <!-- Navigation Items -->
    <nav class="flex-1 overflow-y-auto">
      <ul class="p-2 space-y-1">
        <!-- Dashboard -->
        <li>
          <router-link 
            :to="{ name: 'admin-dashboard' }" 
            class="flex items-center p-2 rounded-lg transition-colors" 
            :class="[$route.name === 'admin-dashboard' ? 
              'bg-primary/10 text-primary font-medium' : 
              'text-gray-600 hover:bg-gray-100']"
          >
            <LayoutDashboard class="w-5 h-5" />
            <span v-if="!collapsed" class="ml-3">Dashboard</span>
          </router-link>
        </li>
        
        <!-- Empleados -->
        <li>
          <router-link 
            :to="{ name: 'admin-empleados' }" 
            class="flex items-center p-2 rounded-lg transition-colors" 
            :class="[$route.name === 'admin-empleados' ? 
              'bg-primary/10 text-primary font-medium' : 
              'text-gray-600 hover:bg-gray-100']"
          >
            <Users class="w-5 h-5" />
            <span v-if="!collapsed" class="ml-3">Empleados</span>
          </router-link>
        </li>
        
        <!-- Encuestas -->
        <li>
          <router-link 
            :to="{ name: 'admin-encuestas' }" 
            class="flex items-center p-2 rounded-lg transition-colors" 
            :class="[$route.name === 'admin-encuestas' ? 
              'bg-primary/10 text-primary font-medium' : 
              'text-gray-600 hover:bg-gray-100']"
          >
            <ClipboardList class="w-5 h-5" />
            <span v-if="!collapsed" class="ml-3">Encuestas</span>
          </router-link>
        </li>
        
        <!-- Estadísticas -->
        <li>
          <router-link 
            :to="{ name: 'admin-estadisticas' }" 
            class="flex items-center p-2 rounded-lg transition-colors" 
            :class="[$route.name === 'admin-estadisticas' ? 
              'bg-primary/10 text-primary font-medium' : 
              'text-gray-600 hover:bg-gray-100']"
          >
            <BarChart class="w-5 h-5" />
            <span v-if="!collapsed" class="ml-3">Estadísticas</span>
          </router-link>
        </li>
        
        <!-- Horarios -->
        <li>
          <router-link 
            :to="{ name: 'admin-horarios' }" 
            class="flex items-center p-2 rounded-lg transition-colors" 
            :class="[$route.name === 'admin-horarios' ? 
              'bg-primary/10 text-primary font-medium' : 
              'text-gray-600 hover:bg-gray-100']"
          >
            <Calendar class="w-5 h-5" />
            <span v-if="!collapsed" class="ml-3">Horarios</span>
          </router-link>
        </li>
        
        <!-- Analítica -->
        <li>
          <router-link 
            :to="{ name: 'admin-analitica' }" 
            class="flex items-center p-2 rounded-lg transition-colors" 
            :class="[$route.name === 'admin-analitica' ? 
              'bg-primary/10 text-primary font-medium' : 
              'text-gray-600 hover:bg-gray-100']"
          >
            <LineChart class="w-5 h-5" />
            <span v-if="!collapsed" class="ml-3">Analítica</span>
          </router-link>
        </li>
        
        <!-- Perfil de Empresa -->
        <li>
          <router-link 
            :to="{ name: 'admin-empresa-perfil' }" 
            class="flex items-center p-2 rounded-lg transition-colors" 
            :class="[$route.name === 'admin-empresa-perfil' ? 
              'bg-primary/10 text-primary font-medium' : 
              'text-gray-600 hover:bg-gray-100']"
          >
            <Building class="w-5 h-5" />
            <span v-if="!collapsed" class="ml-3">Perfil Empresa</span>
          </router-link>
        </li>
      </ul>
    </nav>
    
    <!-- User Profile Link -->
    <div class="p-2 border-t">
      <router-link 
        to="/admin/perfil" 
        class="flex items-center p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
      >
        <User class="w-5 h-5" />
        <span v-if="!collapsed" class="ml-3">Mi Perfil</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { 
  ChevronLeft,
  Menu as MenuIcon, 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  BarChart, 
  Calendar, 
  LineChart, 
  User,
  Building 
} from 'lucide-vue-next'
import { useRoute } from 'vue-router'

const route = useRoute()

defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle'])
</script>