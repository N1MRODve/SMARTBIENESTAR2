<script setup>
import { useRoute } from 'vue-router'
import {
  Home,
  Users,
  ClipboardList,
  Briefcase,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next'

const props = defineProps({
  isCollapsed: { type: Boolean, default: false }
})
const emit = defineEmits(['toggle'])

const navLinks = [
  { name: 'AdminDashboard', text: 'Dashboard', icon: Home },
  { name: 'AdminEmpleados', text: 'Empleados', icon: Users },
  { name: 'EncuestasView', text: 'Encuestas', icon: ClipboardList },
  { name: 'AdminServicios', text: 'Servicios', icon: Briefcase }
]
</script>

<template>
  <aside
    :class="[
      'h-screen bg-white border-r border-gray-200 shadow-md flex flex-col justify-between fixed top-0 left-0 z-30 transition-all duration-300',
      isCollapsed ? 'w-20' : 'w-64'
    ]"
  >
    <nav class="flex-1 py-6">
      <ul class="space-y-2">
        <li v-for="link in navLinks" :key="link.name">
          <router-link
            :to="{ name: link.name }"
            class="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 transition group"
            active-class="bg-gray-100 font-semibold text-primary"
            exact
          >
            <component :is="link.icon" class="w-6 h-6" />
            <span
              v-show="!isCollapsed"
              class="ml-3 text-base transition-opacity duration-200"
            >
              {{ link.text }}
            </span>
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="p-4 border-t border-gray-100 flex justify-end">
      <button
        @click="emit('toggle')"
        class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition"
        :aria-label="isCollapsed ? 'Expandir menú' : 'Colapsar menú'"
      >
        <component :is="isCollapsed ? ChevronRight : ChevronLeft" class="w-5 h-5" />
      </button>
    </div>
  </aside>
</template>