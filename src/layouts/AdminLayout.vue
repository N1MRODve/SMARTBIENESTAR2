// src/layouts/AdminLayout.vue
<template>
  <div class="flex min-h-screen bg-gray-50">
    <TheSidebar
      :is-collapsed="isSidebarCollapsed"
      @toggle="toggleSidebar"
    />
    <main
      :class="[
        'transition-all duration-300 flex-1',
        isSidebarCollapsed ? 'ml-20' : 'ml-64'
      ]"
    >
      <!-- Header móvil -->
      <header class="bg-white shadow-sm border-b border-gray-200 lg:hidden">
        <div class="flex items-center justify-between px-4 py-3">
          <button @click="toggleSidebar" class="text-gray-500 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          <h1 class="text-lg font-semibold text-gray-900">{{ currentPageTitle }}</h1>
          <div class="w-6"></div> <!-- Spacer -->
        </div>
      </header>

      <!-- Breadcrumb -->
      <div class="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3" v-if="breadcrumbs.length > 1">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-2">
            <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center">
              <router-link 
                v-if="index < breadcrumbs.length - 1"
                :to="crumb.to"
                class="text-primary hover:text-primary-dark text-sm font-medium"
              >
                {{ crumb.title }}
              </router-link>
              <span v-else class="text-gray-500 text-sm">{{ crumb.title }}</span>
              
              <svg 
                v-if="index < breadcrumbs.length - 1"
                class="w-4 h-4 text-gray-400 mx-2"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </li>
          </ol>
        </nav>
      </div>

      <!-- Contenido de la página -->
      <main class="flex-1 overflow-y-auto">
        <slot />
      </main>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { useAdminStore } from '@/stores/admin'
import TheSidebar from './TheSidebar.vue'

const isSidebarCollapsed = ref(false)
function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const adminStore = useAdminStore()

// Datos computados
const user = computed(() => authStore.user)
const empresa = computed(() => adminStore.empresa)

const userInitials = computed(() => {
  if (!user.value) return 'A'
  const nombre = user.value.nombre?.charAt(0) || ''
  const apellido = user.value.apellido?.charAt(0) || ''
  return (nombre + apellido).toUpperCase() || 'A'
})

// Rutas del sidebar
const sidebarRoutes = computed(() => {
  return router.getRoutes()
    .filter(route => 
      route.path.startsWith('/admin') && 
      route.meta?.showInSidebar
    )
    .sort((a, b) => {
      const order = {
        'AdminDashboard': 1,
        'AdminEmpleados': 2,
        'AdminSesiones': 3,
        'AdminEncuestas': 4,
        'AdminReportes': 5,
        'AdminConfiguracion': 6
      }
      return (order[a.name] || 999) - (order[b.name] || 999)
    })
})

// Título de la página actual
const currentPageTitle = computed(() => {
  return route.meta?.title || 'Dashboard'
})

// Breadcrumbs
const breadcrumbs = computed(() => {
  const crumbs = [
    { title: 'Dashboard', to: { name: 'AdminDashboard' } }
  ]

  if (route.name !== 'AdminDashboard') {
    if (route.meta?.parent) {
      const parentRoute = router.getRoutes().find(r => r.name === route.meta.parent)
      if (parentRoute) {
        crumbs.push({
          title: parentRoute.meta?.title || '',
          to: { name: parentRoute.name }
        })
      }
    }
    
    crumbs.push({
      title: route.meta?.title || 'Página',
      to: route
    })
  }

  return crumbs
})

// Funciones
const closeSidebar = () => {
  isSidebarCollapsed.value = false
}

const logout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}

const getIcon = (iconName) => {
  const icons = {
    dashboard: 'DashboardIcon',
    users: 'UsersIcon',
    calendar: 'CalendarIcon',
    'clipboard-list': 'ClipboardListIcon',
    'chart-bar': 'ChartBarIcon',
    cog: 'CogIcon'
  }
  return icons[iconName] || 'DefaultIcon'
}

// Inicialización
onMounted(async () => {
  if (user.value?.empresa_id && !empresa.value) {
    try {
      await adminStore.loadEmpresa(user.value.empresa_id)
    } catch (error) {
      console.error('Error cargando empresa:', error)
    }
  }
})

</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>