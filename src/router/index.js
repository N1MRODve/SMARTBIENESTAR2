import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { useAdminStore } from '../stores/admin.js';
import LoginView from '../views/LoginView.vue';
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
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresAuth: false }
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
    path: '/admin/encuestas/crear',
    name: 'CrearEncuestaView',
    component: () => import('@/views/admin/CrearEncuestaView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/dashboard',
    name: 'dashboard',
    component: () => import('@/views/admin/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();

  // 1. Inicializa la sesión si no está lista
  if (!authStore.isInitialized) {
    await authStore.tryInitializeAuth(); // Debe existir en tu store y cargar usuario/empresa
  }

  const isAuthenticated = authStore.isAuthenticated;
  const requiresAuth = to.meta.requiresAuth;

  // 2. Redirección si la ruta requiere autenticación y el usuario no está logueado
  if (requiresAuth && !isAuthenticated) {
    return { name: 'login' };
  }

  // 3. Redirección si el usuario está logueado e intenta ir a login
  if (to.name === 'login' && isAuthenticated) {
    const redirectMap = {
      superadmin: '/superadmin/dashboard',
      administrador: '/admin/dashboard',
      empleado: '/empleado/dashboard',
      colaborador: '/colaborador/dashboard'
    };
    return { path: redirectMap[authStore.userRole] || '/admin/dashboard' };
  }

  // 4. Permite la navegación
  return true;
});

export default router;