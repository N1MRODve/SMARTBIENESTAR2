<script setup>
import { RouterLink } from 'vue-router'

const links = [
  { to: '/demo', label: 'Portada Demo' },
  { to: '/demo/empleado#dashboard', label: 'Empleado • Dashboard' },
  { to: '/demo/empleado#proximas-sesiones', label: 'Empleado • Próximas sesiones' },
  { to: '/demo/empleado#encuestas', label: 'Empleado • Encuestas' },
  { to: '/demo/empleado#desafios', label: 'Empleado • Desafíos' },
  { to: '/demo/empleado#actividades', label: 'Empleado • Actividades' },
  { to: '/demo/admin', label: 'Administrador • Dashboard' },
  { to: '/demo/colaborador', label: 'Colaborador • Dashboard' },
  { to: '/demo/landing', label: 'Landing Demo' }
]
</script>

<template>
  <aside
    class="fixed left-0 top-0 h-screen w-64 z-40
           bg-white/10 backdrop-blur-lg border-r border-white/20
           text-gray-900"
  >
    <div class="px-4 py-5 border-b border-white/20">
      <h1 class="text-base font-semibold">SMART Bienestar • Demo</h1>
      <p class="text-xs text-gray-600">Navega por las vistas y secciones</p>
    </div>
    <nav class="p-3 space-y-1">
      <RouterLink
        v-for="l in links"
        :key="l.to"
        :to="l.to"
        class="block px-3 py-2 rounded-md hover:bg-black/5 transition"
        active-class="bg-primary/10 text-primary font-medium"
      >
        {{ l.label }}
      </RouterLink>
    </nav>
  </aside>
</template>