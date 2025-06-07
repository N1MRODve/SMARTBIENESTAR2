import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
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
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth !== false);
  
  // If route doesn't require auth, allow access
  if (!requiresAuth) {
    // Redirect to dashboard if already authenticated
    if (to.path === '/login' && authStore.isAuthenticated) {
      const redirectMap = {
        superadmin: '/superadmin/dashboard',
        administrador: '/admin/dashboard',
        empleado: '/empleado/dashboard',
        colaborador: '/colaborador/dashboard'
      };
      return redirectMap[authStore.userRole] || '/login';
    }
    return true;
  }
  
  // Check authentication
  if (!authStore.isAuthenticated) {
    return { name: 'login' };
  }
  
  // Check role-based access
  const allowedRoles = to.meta.roles;
  if (allowedRoles && !authStore.hasRole(allowedRoles)) {
    return { name: 'access-denied' };
  }
  
  return true;
});

export default router;