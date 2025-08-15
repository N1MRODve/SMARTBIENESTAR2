<template>
  <div class="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-6">
            <ActivitySquare class="h-16 w-16 text-primary" />
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            SMART<span class="text-primary">Bienestar</span>
          </h1>
          <p class="text-gray-600">
            Plataforma de gestión del bienestar corporativo
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="form-group">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                v-model="email"
                type="email"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                  text-gray-900 placeholder-gray-500"
                placeholder="correo@empresa.com"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                v-model="password"
                type="password"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                  text-gray-900 placeholder-gray-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            :loading="loading"
            class="w-full"
          >
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { ActivitySquare, Mail, Lock } from 'lucide-vue-next';
import { useAuthStore } from '../stores/auth.store';
import Button from '../components/common/Button.vue';

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const loading = ref(false);

async function handleSubmit() {
  try {
    loading.value = true;
    const userProfile = await authStore.login(email.value, password.value);

    // Mapa de redirección basado en roles y nombres de ruta
    const roleRedirectMap = {
      administrador: { name: 'AdminDashboard' },
      empleado: { name: 'EmpleadoDashboard' },
      superadmin: { name: 'superadmin.dashboard' }, // Asegúrate de que este nombre de ruta exista
      colaborador: { name: 'colaborador.dashboard' } // Asegúrate de que este nombre de ruta exista
    };

    const redirectRoute = roleRedirectMap[userProfile.tipo_usuario];

    if (redirectRoute) {
      router.push(redirectRoute);
    } else {
      // Redirección por defecto si el rol no está en el mapa
      router.push('/');
    }

    toast.add({
      severity: 'success',
      summary: '¡Bienvenido!',
      detail: 'Has iniciado sesión correctamente',
      life: 3000
    });
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message || 'Credenciales incorrectas. Por favor intenta de nuevo.',
      life: 5000
    });
  } finally {
    loading.value = false;
  }
};
</script>