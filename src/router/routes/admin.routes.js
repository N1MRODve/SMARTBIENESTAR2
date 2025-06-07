// src/router/routes/admin.routes.js
import { useAuthStore } from '@/stores/auth.store'

const adminRoutes = [
  // Ruta de login para admin
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/views/admin/AdminLogin.vue'),
    meta: { 
      requiresGuest: true
    }
  },
  
  // Redirección de /admin a /admin/dashboard
  {
    path: '/admin',
    redirect: '/admin/dashboard'
  },
  
  // Dashboard principal de admin - RUTA CORREGIDA
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('@/views/admin/AdminDashboard.vue'),
    meta: { 
      requiresAuth: true, 
      roles: ['administrador'],
      title: 'Dashboard Admin'
    }
  },
  
  {
    path: '/admin/empleados',
    name: 'AdminEmpleados',
    component: () => import('@/views/admin/EmpleadosView.vue'),
    meta: { 
      requiresAuth: true, 
      roles: ['administrador'],
      title: 'Gestión de Empleados'
    }
  },
  {
    path: '/admin/servicios',
    name: 'AdminServicios',
    component: () => import('@/views/admin/ServiciosView.vue'),
    meta: { 
      requiresAuth: true, 
      roles: ['administrador'],
      title: 'Gestión de Servicios'
    }
  }
]

// Guard para verificar permisos de administrador
const adminGuard = (to, from, next) => {
  const authStore = useAuthStore()
  
  if (!authStore.isAuthenticated) {
    next('/admin/login')
    return
  }
  
  if (authStore.user?.tipo_usuario !== 'administrador') {
    next('/unauthorized')
    return
  }
  
  next()
}

export { adminRoutes, adminGuard }