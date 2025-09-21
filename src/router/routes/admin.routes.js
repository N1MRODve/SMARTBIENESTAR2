// src/router/routes/admin.routes.js
import { useAuthStore } from '@/stores/auth.store'
import AdminLayout from '@/layouts/AdminLayout.vue'

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
  
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, roles: ['administrador'] },
    children: [
      { path: '', redirect: { name: 'AdminDashboard' } },
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/AdminDashboard.vue'),
        meta: { title: 'Dashboard Admin' }
      },
      {
        path: 'empleados',
        name: 'admin-empleados',
        component: () => import('@/views/admin/EmpleadosView.vue'),
        meta: { title: 'Gestión de Empleados' }
      },
      {
        path: 'empleados/:id',
        name: 'EmpleadoDetailView',
        component: () => import('@/views/admin/EmpleadoDetailView.vue'),
        meta: { title: 'Detalle de Empleado' }
      },
      {
        path: 'servicios',
        name: 'AdminServicios',
        component: () => import('@/views/admin/ServiciosView.vue'),
        meta: { title: 'Gestión de Servicios' }
      },
      {
        path: 'encuestas',
        name: 'admin-encuestas',
        component: () => import('@/views/admin/EncuestasView.vue'),
        meta: { title: 'Gestión de Encuestas' }
      },
      {
        path: 'estadisticas',
        name: 'admin-estadisticas',
        component: () => import('@/views/admin/EstadisticasView.vue'),
        meta: { title: 'Estadísticas' }
      },
      {
        path: 'encuestas/plantillas',
        name: 'PlantillasEncuestaView',
        component: () => import('@/views/admin/PlantillasEncuestaView.vue'),
        meta: { title: 'Plantillas de Encuesta' }
      },
      {
        path: 'encuestas/crear',
        name: 'CrearEncuestaView',
        component: () => import('@/views/admin/CrearEncuestaView.vue'),
        meta: { title: 'Crear Encuesta' }
      },
      {
        path: 'analitica',
        name: 'AdminAnalitica',
        component: () => import('@/views/admin/AnaliticaView.vue'),
        meta: { title: 'Analítica Predictiva' }
      },
      {
        path: 'horarios',
        name: 'AdminHorarios',
        component: () => import('../../views/admin/HorariosView.vue'),
        meta: { title: 'Gestión de Horarios' }
      },
      {
        path: 'desafios/crear',
        name: 'CrearDesafioView',
        component: () => import('../../views/admin/CrearDesafioView.vue'),
        meta: { title: 'Crear Desafío' }
      },
      {
        path: 'encuestas/:id/editar',
        name: 'EditarEncuestaView',
        component: () => import('../../views/admin/CrearEncuestaView.vue'),
        meta: { title: 'Editar Encuesta' }
      }
    ]
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