// src/router/routes/empleado.routes.js
import EmpleadoLayout from '../../layouts/EmpleadoLayout.vue';

export const empleadoRoutes = [
  {
    path: '/empleado',
    component: EmpleadoLayout,
    meta: { 
      requiresAuth: true,
      roles: ['empleado']
    },
    children: [
      {
        path: '',
        redirect: '/empleado/dashboard'
      },
      {
        path: 'dashboard',
        name: 'empleado-dashboard',
        component: () => import('../../views/empleado/DashboardView.vue'),
        meta: { requiresAuth: true, roles: ['empleado'] }
      },
      {
        path: 'reservar-actividad',
        name: 'ReservarActividad',
        component: () => import('../../views/empleado/ReservarActividadView.vue'),
        meta: { requiresAuth: true, roles: ['empleado'] }
      },
      {
        path: 'reservas',
        name: 'empleado-reservas',
        component: () => import('../../views/empleado/MisReservasView.vue'),
        meta: { requiresAuth: true, roles: ['empleado'] }
      },
      {
        path: 'reservas/:id',
        name: 'empleado-reserva-detalle',
        component: () => import('../../views/empleado/ReservaDetalleView.vue'),
        meta: { requiresAuth: true, roles: ['empleado'] }
      },
      {
        path: 'encuestas',
        name: 'empleado-encuestas',
        component: () => import('../../views/empleado/EncuestasView.vue'),
        meta: { requiresAuth: true, roles: ['empleado'] }
      },
      {
        path: 'desafios',
        name: 'empleado-desafios',
        component: () => import('../../views/empleado/DesafiosView.vue'),
        meta: { requiresAuth: true, roles: ['empleado'] }
      },
      {
        path: 'desafios/:id',
        name: 'empleado-desafio-detalle',
        component: () => import('../../views/empleado/DesafioDetalleView.vue'),
        meta: { requiresAuth: true, roles: ['empleado'] }
      },
      {
        path: 'coaching',
        name: 'empleado-coaching',
        component: () => import('../../views/empleado/CoachingView.vue'),
        meta: { requiresAuth: true, roles: ['empleado'] }
      },
      {
        path: 'talleres',
        name: 'empleado-talleres',
        component: () => import('../../views/empleado/TalleresView.vue'),
        meta: { requiresAuth: true, roles: ['empleado'] }
      },
      {
        path: 'talleres/:id',
        name: 'empleado-taller-detalle',
        component: () => import('../../views/empleado/TallerDetalleView.vue'),
        meta: { requiresAuth: true, roles: ['empleado'] }
      },
      {
        path: 'psicoterapia',
        name: 'empleado-psicoterapia',
        component: () => import('../../views/empleado/PsicoterapiaView.vue'),
        meta: { requiresAuth: true, roles: ['empleado'] }
      },
      {
        path: 'psicoterapia/recursos',
        name: 'empleado-psicoterapia-recursos',
        component: () => import('../../views/empleado/PsicoterapiaRecursosView.vue'),
        meta: { requiresAuth: true, roles: ['empleado'] }
      }
    ]
  }
];