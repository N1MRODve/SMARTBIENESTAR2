<template>
  <div class="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- Comentar o eliminar la línea del logo -->
      <!-- <img class="mx-auto h-12 w-auto" src="@/assets/img/logo.png" alt="Logo" /> -->
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-on-background">
        Inicia sesión en tu cuenta
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-surface py-8 px-4 shadow-lg sm:rounded-2xl sm:px-10">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div>
            <label for="email" class="block text-sm font-medium text-on-surface-variant">
              Correo electrónico
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                autocomplete="email"
                required
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-on-surface-variant">
              Contraseña
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-primary focus:ring-primary border-outline rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-on-surface">
                Recordarme
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-primary hover:text-primary/80">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="btn btn-primary w-full"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Iniciar sesión
            </button>
          </div>
          
          <!-- Nuevo enlace para registro de empresa -->
          <div class="text-center mt-4">
            <p class="text-sm text-on-surface-variant">
              ¿Aún no tienes una cuenta? 
              <router-link to="/registro-empresa" class="font-semibold text-primary hover:text-primary/80">
                Registra tu empresa
              </router-link>
            </p>
          </div>
        </form>

        <div v-if="errorMessage" class="mt-4 bg-error-container text-on-error-container p-3 rounded-lg">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { supabase } from '@/services/supabase';

const router = useRouter();
const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    // 1. Iniciar sesión con Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });

    if (error) throw error;

    // --- CORRECCIÓN CLAVE AQUÍ ---
    // 2. Comprobar el rol del usuario para redirigir correctamente
    if (data.user) {
      const userRole = data.user.user_metadata?.role;

      if (userRole === 'administrador') {
        router.push({ name: 'admin-dashboard' }); // O la ruta que corresponda
      } else if (userRole === 'empleado') {
        // ESTA LÍNEA ES LA CLAVE: Redirige a la ruta con nombre 'empleado-dashboard'
        router.push({ name: 'empleado-dashboard' }); 
      } else {
        // Si no tiene rol, lo enviamos a una página de espera o error
        throw new Error("Tu cuenta no tiene un rol asignado.");
      }
    }
    // -----------------------------

  } catch (err) {
    errorMessage.value = err.message || 'Ocurrió un error al iniciar sesión.';
  } finally {
    loading.value = false;
  }
};
</script>
