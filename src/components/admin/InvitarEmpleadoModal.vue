<template>
  <Modal @close="$emit('close')">
    <h2 class="text-xl font-bold mb-4">Invitar Nuevo Empleado</h2>
    <form @submit.prevent="handleInvite" class="flex flex-col gap-4">
      <textarea
        v-model="correos"
        rows="4"
        placeholder="correo1@empresa.com, correo2@empresa.com"
        class="border rounded px-3 py-2"
        required
      ></textarea>
      <p class="text-sm text-gray-500">
        Introduce uno o varios correos electrónicos, separados por comas o saltos de línea.
      </p>
      <div class="flex justify-end gap-2 mt-2">
        <Button variant="secondary" type="button" @click="$emit('close')">Cancelar</Button>
        <Button variant="primary" type="submit" :disabled="loading">
          <span v-if="loading">Enviando...</span>
          <span v-else>Enviar Invitaciones</span>
        </Button>
      </div>
    </form>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import { useAdminStore } from '@/stores/admin'
import Button from '@/components/common/Button.vue'
import Modal from '@/components/common/Modal.vue'
import { useToast } from '@/composables/useToast'

const adminStore = useAdminStore()
const toast = useToast()
const loading = ref(false)
const correos = ref('')

function procesarCorreos(texto) {
  return texto
    .split(/[\n,]+/)
    .map(c => c.trim())
    .filter(c => c)
}

async function handleInvite() {
  loading.value = true
  try {
    const listaDeCorreos = procesarCorreos(correos.value)
    await adminStore.invitarEmpleados(listaDeCorreos)
    toast.success('Invitaciones enviadas correctamente')
    $emit('close')
  } catch (err) {
    toast.error('Error al enviar invitaciones')
  } finally {
    loading.value = false
  }
}
</script>