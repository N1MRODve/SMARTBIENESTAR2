<template>
  <div class="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-on-background">
        Registra tu empresa
      </h2>
      <p class="mt-2 text-center text-sm text-on-surface-variant">
        Empieza a gestionar el bienestar de tus colaboradores
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-surface py-8 px-4 shadow-lg sm:rounded-2xl sm:px-10">
        <form class="space-y-6" @submit.prevent="handleRegister">
          <!-- Mensaje de éxito -->
          <div v-if="successMessage" class="bg-primary-container/30 border border-primary-container text-on-primary-container p-3 rounded-lg">
            {{ successMessage }}
          </div>

          <!-- Mensaje de error -->
          <div v-if="errorMessage" class="bg-error-container text-on-error-container p-3 rounded-lg">
            {{ errorMessage }}
          </div>

          <!-- Nombre de la empresa -->
          <div>
            <label for="empresa" class="block text-sm font-medium text-on-surface-variant">
              Nombre de la empresa
            </label>
            <div class="mt-1">
              <input
                id="empresa"
                v-model="nombreEmpresa"
                name="empresa"
                type="text"
                required
              />
            </div>
          </div>

          <!-- Nombre del administrador -->
          <div>
            <label for="nombre" class="block text-sm font-medium text-on-surface-variant">
              Tu nombre
            </label>
            <div class="mt-1">
              <input
                id="nombre"
                v-model="nombreAdmin"
                name="nombre"
                type="text"
                required
              />
            </div>
          </div>
          <!-- Apellido del administrador -->
          <div>
            <label for="apellido" class="block text-sm font-medium text-on-surface-variant">
              Tu apellido
            </label>
            <div class="mt-1">
              <input
                id="apellido"
                v-model="apellidoAdmin"
                name="apellido"
                type="text"
                required
              />
            </div>
          </div>

          <!-- Email corporativo -->
          <div>
            <label for="email" class="block text-sm font-medium text-on-surface-variant">
              Tu email de trabajo
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

          <!-- Contraseña -->
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
                autocomplete="new-password"
                required
                minlength="8"
              />
            </div>
            <p class="mt-1 text-xs text-on-surface-variant">Mínimo 8 caracteres</p>
          </div>

          <!-- Botón de registro -->
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="btn btn-primary w-full"
            >
              <span v-if="loading" class="inline-block animate-spin mr-2">&#8635;</span>
              {{ loading ? 'Creando cuenta...' : 'Crear cuenta' }}
            </button>
          </div>

          <!-- Enlace a login -->
          <div class="text-center mt-4">
            <p class="text-sm text-on-surface-variant">
              ¿Ya tienes una cuenta? 
              <router-link to="/login" class="font-semibold text-primary hover:text-primary/80">
                Inicia sesión
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/services/supabase'
import { useRouter } from 'vue-router'

const router = useRouter()

const nombreEmpresa = ref('')
const nombreAdmin = ref('')
const apellidoAdmin = ref('')
const email = ref('')
const password = ref('')
const telefono = ref('')

const loading = ref(false)
const errorMessage = ref(null)
const successMessage = ref(null)

const handleRegister = async () => {
  loading.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    if (!nombreEmpresa.value.trim() || !nombreAdmin.value.trim() || !apellidoAdmin.value.trim() ||
        !email.value.trim() || !password.value) {
      throw new Error('Por favor, completa todos los campos.')
    }

    if (password.value.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres.')
    }

    // --- PRUEBA DE FUEGO FINAL ---
    // Justo antes de hacer la llamada, vamos a inspeccionar el objeto supabase.
    console.log("Inspeccionando el cliente Supabase antes de la llamada RPC:", supabase);
    // ---------------------------

    // Llamar a la función RPC de Supabase
    const { data, error } = await supabase.rpc('registrar_empresa_con_admin', {
      nombre_empresa: nombreEmpresa.value,
      nombre_admin: nombreAdmin.value,
      apellido_admin: apellidoAdmin.value,
      email_admin: email.value,
      password_admin: password.value,
      telefono_admin: telefono.value || null
    })

    if (error) throw error

    successMessage.value = '¡Registro completado! Ahora puedes iniciar sesión como administrador.'
    nombreEmpresa.value = ''
    nombreAdmin.value = ''
    apellidoAdmin.value = ''
    email.value = ''
    password.value = ''
    telefono.value = ''

    // Marcar que la empresa recién creada necesita onboarding en el próximo login
    localStorage.setItem('needs_onboarding', '1')

    setTimeout(() => {
      router.push('/login')
    }, 3000)

  } catch (error) {
    errorMessage.value = error.message || JSON.stringify(error, null, 2)
  } finally {
    loading.value = false
  }
}
</script>
