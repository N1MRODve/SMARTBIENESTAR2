import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { useAdminStore } from '@/stores/admin.js'; // Ajuste realizado para usar el nombre correcto del archivo
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import AdminDashboard from '@/views/admin/AdminDashboard.vue';
import NotFoundView from '../views/NotFoundView.vue';
import AccessDeniedView from '../views/AccessDeniedView.vue';

// Import route modules
import { superadminRoutes } from './routes/superadmin.routes';
import { adminRoutes } from './routes/admin.routes';
import { empleadoRoutes } from './routes/empleado.routes';
import { colaboradorRoutes } from './routes/colaborador.routes';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/acceso-denegado',
    name: 'access-denied',
    component: AccessDeniedView,
    meta: { requiresAuth: false }
  },
  ...superadminRoutes,
  ...adminRoutes,
  ...empleadoRoutes,
  ...colaboradorRoutes,
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard', // Nombre de ruta unificado
    component: AdminDashboard,
    meta: { requiresAuth: true, roles: ['administrador'] }
  },
  {
    path: '/empleado/dashboard',
    name: 'EmpleadoDashboard', // Nombre de ruta unificado
    component: () => import('@/views/empleado/DashboardView.vue'),
    meta: { requiresAuth: true, roles: ['empleado'] }
  },
  {
    path: '/empleado/reservar',
    name: 'ReservarActividad', // Asegúrate de que este nombre coincida con el del sidebar
    component: () => import('@/views/empleado/ReservarActividadView.vue') // Corregido: Apunta al nombre de archivo correcto del componente.
  },
  {
    path: '/empleado/mis-reservas',
    name: 'MisReservas', // <-- AÑADIR ESTA RUTA
    // Asumo que tendrás un componente para mostrar la lista de reservas.
    // Si el archivo no existe, deberás crearlo.
    component: () => import('@/views/empleado/MisReservasView.vue') 
  },
  {
    path: '/superadmin/dashboard',
    name: 'superadmin.dashboard',
    component: () => import('@/views/superadmin/SuperAdminDashboard.vue'),
    meta: { requiresAuth: true, roles: ['superadmin'] }
  },
  {
    path: '/colaborador/dashboard',
    name: 'colaborador.dashboard',
    component: () => import('@/views/colaborador/ColaboradorDashboard.vue'),
    meta: { requiresAuth: true, roles: ['colaborador'] }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  try {
    // 1) Inicializar authStore primero, siempre
    const { useAuthStore } = await import('@/stores/auth.store')
    const authStore = useAuthStore()

    // Si tu authStore expone un método de inicialización, esperarlo siempre (idempotente)
    if (typeof authStore.tryInitializeAuth === 'function') {
      await authStore.tryInitializeAuth()
    }

    const isAuthenticated = !!authStore.user

    // 2) Inicializar otros stores dependientes del usuario (p.ej. adminStore)
    if (isAuthenticated && authStore.user?.tipo_usuario === 'administrador') {
      try {
        const { useAdminStore } = await import('@/stores/admin.store')
        const adminStore = useAdminStore()
        if (typeof adminStore.init === 'function') {
          // Pasa el empresaId si tu init lo acepta (ambas firmas comunes)
          await adminStore.init(authStore.user?.empresa_id ?? undefined)
        }
      } catch (e) {
        // Si no existe admin.store o falla init, no bloquear la navegación
        console.warn('Admin store init omitido:', e?.message || e)
      }
    }

    // Helper: destino home por rol
    const homeByRole = (user) => {
      if (!user) return { path: '/login' }
      if (user.tipo_usuario === 'administrador') return { name: 'AdminDashboard' }
      return { name: 'empleado-dashboard' }
    }

    // 3) Reglas de acceso
    const requiresAuth = to.meta?.requiresAuth === true
    const allowedRoles = Array.isArray(to.meta?.roles) ? to.meta.roles : null

    // No autenticado y ruta protegida -> login
    if (requiresAuth && !isAuthenticated) {
      return next({ path: '/login', query: { redirect: to.fullPath } })
    }

    // Autenticado y tratando de ir a login -> dashboard por rol
    if (isAuthenticated && (to.name === 'auth-login' || to.path === '/login')) {
      return next(homeByRole(authStore.user))
    }

    // Ruta restringida por rol
    if (isAuthenticated && allowedRoles && !allowedRoles.includes(authStore.user?.tipo_usuario)) {
      return next(homeByRole(authStore.user))
    }

    // 4) Continuar navegación
    return next()
  } catch (err) {
    console.error('Error en guardián de navegación:', err)
    // En caso de error inesperado, redirigir a login o bloquear
    return next({ path: '/login' })
  }
})

export default router