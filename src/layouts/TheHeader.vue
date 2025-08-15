<template>
  <header class="w-full flex items-center justify-between bg-white shadow px-6 py-4">
    <div class="text-xl font-semibold">
      <slot name="title">Panel de Administración</slot>
    </div>
    <div class="flex items-center gap-4">
      <span class="text-gray-700">Hola, {{ userName }}</span>
      <button
        @click="logout"
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
      >
        Cerrar Sesión
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store.js'

const authStore = useAuthStore()
const router = useRouter()

const userName = computed(() => authStore.user?.name || 'Administrador')

async function logout() {
  await authStore.logout()
  router.push('/login')
}
</script>
