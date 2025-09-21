<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex">
    <!-- Sidebar -->
    <TheSidebar 
      :collapsed="!sidebarOpen" 
      @toggle="sidebarOpen = !sidebarOpen"
    />
    
    <!-- Main content area -->
    <div 
      class="flex-1 flex flex-col min-h-screen transition-all duration-300"
      :class="sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'"
    >
      <!-- Header -->
      <TheHeader />

      <!-- Main content - router-view para rutas anidadas -->
      <main class="flex-1 p-6 md:p-8">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component 
              :is="Component" 
              v-if="Component" 
              :key="$route.fullPath"
            />
            <div 
              v-else 
              class="animate-pulse flex space-x-4 p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm"
            >
              <div class="flex-1 space-y-4">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-4 bg-gray-200 rounded"></div>
                <div class="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </transition>
        </router-view>
      </main>

      <!-- Este podría ser tu botón en un menú desplegable -->
      <button 
        @click="handleLogout" 
        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Cerrar Sesión
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import TheSidebar from './TheSidebar.vue';
import TheHeader from './TheHeader.vue';

const router = useRouter();
const authStore = useAuthStore();
const sidebarOpen = ref(true);

// Verificar que el usuario sea admin al montar el componente
onMounted(() => {
  // Si no hay usuario o no es admin, redirigir
  if (!authStore.isAuthenticated) {
    console.warn('⚠️ Usuario no autenticado en AdminLayout');
    router.push('/login');
  } else if (!authStore.isAdmin) {
    console.warn('⚠️ Usuario sin permisos de admin en AdminLayout');
    router.push('/'); // o a donde corresponda
  } else {
    console.log('✅ Admin autenticado correctamente');
  }
});

/**
 * Maneja el proceso de cierre de sesión y redirige al usuario.
 */
const handleLogout = async () => {
  console.log('Cerrando sesión...')
  
  // 1. Llama a la acción centralizada en el store
  await authStore.signOut()
  
  // 2. Redirige a la página de login DESPUÉS de que el logout se ha completado
  router.push({ name: 'login' })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>