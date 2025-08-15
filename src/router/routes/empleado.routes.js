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
      }
    ]
  }
];