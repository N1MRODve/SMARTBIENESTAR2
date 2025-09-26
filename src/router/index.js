import { createRouter, createWebHistory } from 'vue-router';
import supabase from '@/utils/supabase';
import { useAuthStore } from '@/stores/auth.store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Rutas públicas
    { 
      path: '/', 
      name: 'home', 
      component: () => import('@/views/HomeView.vue'),
      beforeEnter: async (to, from, next) => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          // En la demo, si hay sesión, siempre vamos al dashboard de empleado
          next({ name: 'empleado-dashboard' });
        } else {
          next();
        }
      }
    },
    { 
      path: '/login', 
      name: 'login', 
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/registro-empresa',
      name: 'registro-empresa',
      component: () => import('@/views/RegistroEmpresaView.vue'),
      meta: { requiresAuth: false }
    },

    // --- RUTAS DE EMPLEADO (SIMPLIFICADO PARA MVP) ---
    {
      path: '/empleado',
      component: () => import('@/layouts/EmpleadoLayout.vue'),
      meta: { requiresAuth: true, role: 'empleado' },
      children: [
        {
          path: '',
          redirect: { name: 'empleado-dashboard' }
        },
        {
          path: 'dashboard',
          name: 'empleado-dashboard',
          component: () => import('@/views/empleado/DashboardView.vue')
        },
        {
          path: 'reservar-actividad',
          name: 'empleado-reservar-actividad',
          component: () => import('@/views/empleado/ReservarActividadView.vue')
        }
      ]
    },
    // ---------------------------------------------------------

    // Ruta 404 - Captura cualquier ruta no definida
    { 
      path: '/:pathMatch(.*)*', 
      name: 'not-found',
      redirect: '/' 
    }
  ]
});

// Guardia de navegación simplificada para la demo
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (!authStore.session) {
    await authStore.initialize();
  }

  const isAuthenticated = authStore.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Si requiere login y no está logueado -> al login
    next({ name: 'login' });
  } else {
    // Para la demo, si está logueado o la ruta es pública, puede pasar.
    next();
  }
});

export default router;
