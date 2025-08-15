// src/router/routes/admin.routes.js
import { useAuthStore } from '@/stores/auth.store'

export const adminRoutes = [
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
    path: '/admin/empleados/:id',
    name: 'EmpleadoDetailView',
    component: () => import('@/views/admin/EmpleadoDetailView.vue'),
    meta: { requiresAuth: true }
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
  },
  {
    path: '/admin/encuestas',
    name: 'EncuestasView', // <-- Añadido para navegación por nombre
    component: () => import('@/views/admin/EncuestasView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/encuestas/plantillas',
    name: 'PlantillasEncuestaView',
    component: () => import('@/views/admin/PlantillasEncuestaView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/encuestas/crear',
    name: 'CrearEncuestaView',
    component: () => import('@/views/admin/CrearEncuestaView.vue'),
    meta: { 
      requiresAuth: true, 
      roles: ['administrador'],
      title: 'Crear Encuesta'
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

export { adminGuard }