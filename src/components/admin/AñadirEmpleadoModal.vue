<template>
  <Modal @close="$emit('close')">
    <h2 class="text-xl font-bold mb-4">Añadir Nuevo Empleado</h2>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <input v-model="nuevoEmpleado.nombre" type="text" placeholder="Nombre" class="border rounded px-3 py-2" required />
      <input v-model="nuevoEmpleado.apellido" type="text" placeholder="Apellido" class="border rounded px-3 py-2" required />
      <input v-model="nuevoEmpleado.email" type="email" placeholder="Correo Electrónico" class="border rounded px-3 py-2" required />
      <input v-model="nuevoEmpleado.cargo" type="text" placeholder="Cargo" class="border rounded px-3 py-2" />
      <div class="flex justify-end gap-2 mt-2">
        <Button variant="secondary" type="button" @click="$emit('close')">Cancelar</Button>
        <Button variant="primary" type="submit" :disabled="loading">
          <span v-if="loading">Guardando...</span>
          <span v-else>Guardar Empleado</span>
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
const nuevoEmpleado = ref({
  nombre: '',
  apellido: '',
  email: '',
  cargo: ''
})

async function handleSubmit() {
  loading.value = true
  try {
    await adminStore.crearEmpleado(nuevoEmpleado.value)
    toast.success('Empleado creado correctamente')
    $emit('close')
  } catch (err) {
    toast.error('Error al crear empleado')
  } finally {
    loading.value = false
  }
}
</script>