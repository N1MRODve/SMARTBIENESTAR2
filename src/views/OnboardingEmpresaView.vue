<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-background p-4">
    <div class="bg-surface rounded-2xl shadow-lg p-8 w-full max-w-xl">
      <h2 class="text-2xl font-bold text-center text-on-surface mb-4">¡Bienvenido a SmartBienestar!</h2>
      <p class="text-center text-on-surface-variant mb-8">
        Completa estos datos iniciales para configurar tu empresa y empezar a usar la plataforma.
      </p>
      <form class="space-y-5" @submit.prevent="handleOnboarding">
        <div>
          <label for="direccion" class="block text-sm font-medium text-on-surface-variant mb-1">Dirección de la empresa</label>
          <input id="direccion" v-model="direccion" type="text" required />
        </div>
        <div>
          <label for="telefono" class="block text-sm font-medium text-on-surface-variant mb-1">Teléfono de contacto</label>
          <input id="telefono" v-model="telefono" type="tel" required />
        </div>
        <div>
          <label for="sitioWeb" class="block text-sm font-medium text-on-surface-variant mb-1">Sitio web</label>
          <input id="sitioWeb" v-model="sitioWeb" type="url" />
        </div>
        <div>
          <label for="logoUrl" class="block text-sm font-medium text-on-surface-variant mb-1">Logo de la empresa (URL)</label>
          <input id="logoUrl" v-model="logoUrl" type="url" />
        </div>
        <div>
          <button type="submit" :disabled="loading" class="btn btn-primary w-full mt-4">
            {{ loading ? 'Guardando...' : 'Finalizar configuración' }}
          </button>
        </div>
        <div v-if="successMessage" class="bg-primary-container/30 text-on-primary-container text-center p-3 rounded-lg mt-2">{{ successMessage }}</div>
        <div v-if="errorMessage" class="bg-error-container text-on-error-container text-center p-3 rounded-lg mt-2">{{ errorMessage }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/services/supabase'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const router = useRouter()
const direccion = ref('')
const telefono = ref('')
const sitioWeb = ref('')
const logoUrl = ref('')
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Suponiendo que tienes el empresa_id en el store o en la sesión
const authStore = useAuthStore()
const empresaId = ref('')

onMounted(() => {
  empresaId.value = authStore.user?.empresa_id || ''
})

async function handleOnboarding() {
  errorMessage.value = ''
  successMessage.value = ''
  loading.value = true
  try {
    const { error } = await supabase
      .from('empresas')
      .update({
        direccion: direccion.value,
        telefono: telefono.value,
        sitio_web: sitioWeb.value,
        logo_url: logoUrl.value
      })
      .eq('id', empresaId.value)

    if (error) throw error

    successMessage.value = '¡Datos guardados correctamente!'
    // Marcar onboarding como completado en el cliente
    localStorage.removeItem('needs_onboarding')
    setTimeout(() => {
      router.push('/admin/dashboard')
    }, 2000)
  } catch (error) {
    errorMessage.value = error.message || 'Error al guardar los datos.'
  } finally {
    loading.value = false
  }
}
</script>
