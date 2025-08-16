import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import AccessDeniedView from '../views/AccessDeniedView.vue';
import DemoEmpleadoLayout from '../layouts/DemoEmpleadoLayout.vue';
import DemoAdminLayout from '../layouts/DemoAdminLayout.vue';

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
    path: '/demo',
    name: 'DemoSelection',
    component: () => import('../views/DemoSelectionView.vue')
  },
  {
    path: '/demo/empleado',
    name: 'DemoEmpleado',
    component: DemoEmpleadoLayout,
    meta: { 
      isDemo: true
    },
    children: [
      {
        path: '',
        component: () => import('../views/demo/DemoEmpleadoView.vue')
      },
      {
        path: 'actividades',
        component: () => import('../views/demo/empleado/DemoActividadesView.vue')
      },
      {
        path: 'reservas',
        component: () => import('../views/demo/empleado/DemoReservasView.vue')
      },
      {
        path: 'encuestas',
        component: () => import('../views/demo/empleado/DemoEncuestasView.vue')
      },
      {
        path: 'desafios',
        component: () => import('../views/demo/empleado/DemoDesafiosView.vue')
      },
      {
        path: 'coaching',
        component: () => import('../views/demo/empleado/DemoCoachingView.vue')
      },
      {
        path: 'talleres',
        component: () => import('../views/demo/empleado/DemoTalleresView.vue')
      },
      {
        path: 'psicoterapia',
        component: () => import('../views/demo/empleado/DemoPsicoterapiaView.vue')
      }
    ]
  },
  {
    path: '/demo/admin',
    name: 'DemoAdmin',
    component: DemoAdminLayout,
    meta: { 
      isDemo: true
    },
    children: [
      {
        path: '',
        component: () => import('../views/demo/DemoAdminView.vue')
      },
      {
        path: 'empleados',
        component: () => import('../views/demo/admin/DemoEmpleadosView.vue')
      },
      {
        path: 'encuestas',
        component: () => import('../views/demo/admin/DemoEncuestasView.vue')
      },
      {
        path: 'servicios',
        component: () => import('../views/demo/admin/DemoServiciosView.vue')
      },
      {
        path: 'analitica',
        component: () => import('../views/demo/admin/DemoAnaliticaView.vue')
      },
      {
        path: 'horarios',
        component: () => import('../views/demo/admin/DemoHorariosView.vue')
      }
    ]
    }
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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // Si es una ruta demo, permitir acceso directo sin autenticación
  if (to.meta?.isDemo) {
    return next()
  }

  try {
    // 1) Inicializar authStore primero, siempre
    const { useAuthStore } = await import('@/stores/auth.store')
    const authStore = useAuthStore()

    // Esperar la inicialización del auth store si no está inicializado
    if (!authStore.isInitialized) {
      await authStore.tryInitializeAuth()
    }

    const isAuthenticated = !!authStore.user

    // 2) Inicializar otros stores dependientes del usuario (p.ej. adminStore)
    if (isAuthenticated && authStore.user?.tipo_usuario === 'administrador') {
      try {
        const { useAdminStore } = await import('@/stores/admin')
        const adminStore = useAdminStore()
        if (typeof adminStore.init === 'function' && authStore.user?.empresa_id) {
          await adminStore.init()
        }
      } catch (e) {
        // Si no existe admin.store o falla init, no bloquear la navegación
        console.warn('Admin store init omitido:', e?.message || e)
      }
    }

    // Helper: destino home por rol
    const homeByRole = (user) => {
      if (!user) return { path: '/login' }
      switch (user.tipo_usuario) {
        case 'administrador':
          return { name: 'AdminDashboard' }
        case 'empleado':
          return { name: 'empleado-dashboard' }
        case 'superadmin':
          return { name: 'superadmin-dashboard' }
        case 'colaborador':
          return { name: 'colaborador-dashboard' }
        default:
          console.warn('Rol no reconocido:', user.tipo_usuario)
          return { path: '/login' }
      }
    }

    // 3) Reglas de acceso
    const requiresAuth = to.meta?.requiresAuth === true
    const allowedRoles = Array.isArray(to.meta?.roles) ? to.meta.roles : null

    // No autenticado y ruta protegida -> login
    if (requiresAuth && !isAuthenticated) {
      console.log('🔒 Ruta protegida, redirigiendo a login')
      return next({ path: '/login', query: { redirect: to.fullPath } })
    }

    // Autenticado y tratando de ir a login -> dashboard por rol
    if (isAuthenticated && (to.name === 'Login' || to.path === '/login')) {
      console.log('🏠 Usuario autenticado en login, redirigiendo a dashboard')
      return next(homeByRole(authStore.user))
    }

    // Ruta restringida por rol
    if (isAuthenticated && allowedRoles && !allowedRoles.includes(authStore.user?.tipo_usuario)) {
      console.log('🚫 Acceso denegado por rol, redirigiendo a dashboard apropiado')
      return next(homeByRole(authStore.user))
    }

    // 4) Continuar navegación
    console.log('✅ Navegación permitida a:', to.path)
    return next()
  } catch (err) {
    console.error('Error en guardián de navegación:', err)
    // En caso de error inesperado, redirigir a login o bloquear
    return next({ path: '/login' })
  }
})

export default router

