// src/layouts/AdminLayout.vue
<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <aside class="sidebar w-64 min-h-screen" :class="{ 'open': sidebarOpen }">
      <div class="flex flex-col h-full">
        <!-- Logo y título -->
        <div class="flex items-center justify-center h-16 px-4 border-b border-primary-dark">
          <div class="text-center">
            <h1 class="text-xl font-bold text-white">SMART Bienestar</h1>
            <p class="text-xs text-secondary">Panel Empresarial</p>
          </div>
        </div>

        <!-- Información de la empresa -->
        <div class="p-4 border-b border-primary-dark" v-if="empresa">
          <div class="text-center">
            <div class="w-12 h-12 bg-white bg-opacity-20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span class="text-white font-bold text-lg">{{ empresa.nombre?.charAt(0) || 'E' }}</span>
            </div>
            <p class="text-white text-sm font-medium">{{ empresa.nombre }}</p>
            <p class="text-secondary text-xs">{{ empresa.dominio_email }}</p>
          </div>
        </div>

        <!-- Navegación -->
        <nav class="flex-1 px-4 py-6 space-y-2">
          <router-link
            v-for="route in sidebarRoutes"
            :key="route.name"
            :to="{ name: route.name }"
            class="sidebar-item"
            :class="{ 'active': $route.name === route.name }"
          >
            <component :is="getIcon(route.meta.icon)" class="w-5 h-5 mr-3" />
            <span>{{ route.meta.title }}</span>
          </router-link>
        </nav>

        <!-- Usuario y logout -->
        <div class="border-t border-primary-dark p-4">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <span class="text-white text-sm font-medium">{{ userInitials }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-white text-sm font-medium truncate">{{ user?.nombre }} {{ user?.apellido }}</p>
              <p class="text-secondary text-xs truncate">Administrador</p>
            </div>
          </div>
          <button @click="logout" class="w-full btn-outline btn text-sm text-white border-white hover:bg-white hover:text-primary">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </aside>

    <!-- Overlay para móvil -->
    <div 
      v-if="sidebarOpen" 
      @click="closeSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
    ></div>

    <!-- Contenido principal -->
    <div class="flex-1 flex flex-col overflow-hidden">
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
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { useAdminStore } from '@/stores/admin'

export default {
  name: 'AdminLayout',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()
    const adminStore = useAdminStore()
    
    const sidebarOpen = ref(false)

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
    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value
    }

    const closeSidebar = () => {
      sidebarOpen.value = false
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

    return {
      // Estado
      sidebarOpen,
      
      // Computed
      user,
      empresa,
      userInitials,
      sidebarRoutes,
      currentPageTitle,
      breadcrumbs,
      
      // Funciones
      toggleSidebar,
      closeSidebar,
      logout,
      getIcon
    }
  }
}
</script>