// src/layouts/AdminLayout.vue
<template>
  <div class="min-h-screen flex bg-gray-50">
    <TheSidebar
      :collapsed="isSidebarCollapsed"
      @toggle="toggleSidebar"
    />
    <div class="flex flex-col flex-grow min-h-screen">
      <TheHeader @toggle-sidebar="toggleSidebar" />
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { useAdminStore } from '@/stores/admin'
import TheSidebar from './TheSidebar.vue'
import TheHeader from './TheHeader.vue'

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