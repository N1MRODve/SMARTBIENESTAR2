import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth.store'; // Asegúrate de importar el store
import { useAdminStore } from '@/stores/admin'; // Paso 2: Importa el adminStore
import LoginView from '../views/LoginView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import AccessDeniedView from '../views/AccessDeniedView.vue';
import StatsCard from '@/components/ui/StatsCard.vue';

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

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const adminStore = useAdminStore();

  // Inicializa el authStore si es necesario
  if (!authStore.isInitialized) {
    await authStore.tryInitializeAuth();
  }

  const isAuthenticated = authStore.isAuthenticated;
  const requiresAuth = to.meta.requiresAuth;

  // Inicializa el adminStore solo si el usuario está autenticado
  if (isAuthenticated && typeof adminStore.init === 'function') {
    await adminStore.init();
  }

  if (requiresAuth && !isAuthenticated) {
    return next({ name: 'login' });
  }

  if (to.name === 'login' && isAuthenticated) {
    return next({ name: 'dashboard' });
  }

  next();
});

export default router;