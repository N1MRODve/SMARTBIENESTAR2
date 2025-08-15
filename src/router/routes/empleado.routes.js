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
        path: 'dashboard',
        name: 'empleado-dashboard',
        component: () => import('../../views/empleado/DashboardView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'reservas',
        name: 'empleado-reservas',
        component: () => import('../../views/empleado/ReservasView.vue')
      },
      {
        path: 'reservar-actividad',
        name: 'ReservarActividad',
        component: () => import('@/views/empleado/ReservarActividadView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'mis-reservas',
        name: 'MisReservas',
        component: () => import('@/views/empleado/MisReservasView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'encuestas',
        name: 'empleado-encuestas',
        component: () => import('@/views/empleado/EncuestasView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'desafios',
        name: 'empleado-desafios',
        component: () => import('@/views/empleado/DesafiosView.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
];