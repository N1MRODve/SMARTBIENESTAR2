import { createRouter, createWebHistory } from 'vue-router';
import supabase from '@/utils/supabase'; // <-- CORRECCIÓN: Ruta y sin llaves
import { useAuthStore } from '@/stores/auth.store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Rutas públicas
    { 
      path: '/', 
      name: 'home', 
      component: () => import('@/views/HomeView.vue'),
      // Opcional: Redireccionar a login o dashboard dependiendo de autenticación
      beforeEnter: async (to, from, next) => {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          const userRole = session.user?.user_metadata?.role || 'empleado'
          if (userRole === 'administrador') {
            next({ name: 'admin-dashboard' })
          } else {
            next({ name: 'admin-empleados' })
          }
        } else {
          next()
        }
      }
    },
    { 
      path: '/login', 
      name: 'login', 
      // Corregido: Apunta a la ubicación correcta
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/registro-empresa',
      name: 'registro-empresa',
      component: () => import('@/views/RegistroEmpresaView.vue'),
      meta: { requiresAuth: false }
    },

    // ADMIN (anidado en AdminLayout)
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      meta: { requiresAuth: true, role: 'administrador' },
      children: [
        // Añade una redirección para la ruta base '/admin'
        // Esto asegura que cualquier visita a '/admin' vaya directamente al dashboard.
        {
          path: '', // Coincide con la ruta exacta '/admin'
          redirect: { name: 'admin-dashboard' }
        },
        { 
          path: 'dashboard', // Coincide con '/admin/dashboard'
          name: 'admin-dashboard', 
          component: () => import('@/views/admin/AdminDashboard.vue') 
        },
        { 
          path: 'empleados', // Coincide con '/admin/empleados'
          name: 'admin-empleados', 
          component: () => import('@/views/admin/EmpleadosView.vue') 
        },
        { 
          path: 'encuestas', 
          name: 'admin-encuestas', 
          component: () => import('@/views/admin/EncuestasView.vue') 
        },
        { 
          path: 'estadisticas', 
          name: 'admin-estadisticas', 
          component: () => import('@/views/admin/EstadisticasView.vue') 
        },
        { 
          path: 'empresa/perfil', 
          name: 'admin-empresa-perfil', 
          component: () => import('@/views/admin/AdminEmpresaPerfil.vue') 
        },
        { 
          path: 'horarios', 
          name: 'admin-horarios', 
          component: () => import('@/views/admin/HorariosView.vue') 
        },
        { 
          path: 'analitica', 
          name: 'admin-analitica', 
          component: () => import('@/views/admin/AnaliticaView.vue') 
        },
        // --- CORRECCIÓN: AÑADIR RUTAS FALTANTES ---
        {
          // Ruta para crear una nueva encuesta
          path: 'encuestas/crear',
          name: 'admin-crear-encuesta',
          component: () => import('@/views/admin/CrearEncuestaView.vue'),
          meta: { requiresAuth: true, role: 'administrador' }
        },
        {
          // Ruta para editar una encuesta existente
          // Usamos un parámetro dinámico :id
          path: 'encuestas/:id/editar',
          name: 'admin-editar-encuesta',
          component: () => import('@/views/admin/CrearEncuestaView.vue'),
          meta: { requiresAuth: true, role: 'administrador' }
        },
        // Redirigir /admin a /admin/dashboard
        { 
          path: '', 
          redirect: { name: 'admin-dashboard' } 
        }
      ]
    },

    // --- ASEGÚRATE DE QUE ESTE BLOQUE EXISTA Y SEA CORRECTO ---
    {
      path: '/empleado',
      // ESTA LÍNEA ES LA CLAVE: Usa el nuevo layout para empleados.
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
        },
        {
          path: 'mis-reservas',
          name: 'empleado-mis-reservas',
          component: () => import('@/views/empleado/MisReservasView.vue')
        },
        {
          path: 'encuestas',
          name: 'empleado-encuestas',
          component: () => import('@/views/empleado/EncuestasView.vue')
        },
        {
          path: 'desafios',
          name: 'empleado-desafios',
          component: () => import('@/views/empleado/DesafiosView.vue')
        },
        {
          path: 'psicoterapia',
          name: 'empleado-psicoterapia',
          component: () => import('@/views/empleado/PsicoterapiaView.vue')
        },
        {
          path: 'talleres',
          name: 'empleado-talleres',
          component: () => import('@/views/empleado/TalleresView.vue')
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

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (!authStore.session) {
    await authStore.initialize();
  }

  const isAuthenticated = authStore.isAuthenticated;
  const userRole = authStore.userRole; // Asumiendo que tienes un getter para el rol en tu store
  const requiredRole = to.meta.role;

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Si requiere login y no está logueado -> al login
    next({ name: 'login' });
  } else if (requiredRole && isAuthenticated && userRole !== requiredRole) {
    // Si requiere un rol, está logueado, PERO no tiene el rol correcto -> no puede pasar.
    // Lo redirigimos a su dashboard por defecto para evitar errores.
    if (userRole === 'administrador') {
      next({ name: 'admin-dashboard' });
    } else {
      next({ name: 'empleado-dashboard' });
    }
  } else {
    // En cualquier otro caso (ruta pública, o tiene el rol correcto), puede pasar.
    next();
  }
});

export default router;
