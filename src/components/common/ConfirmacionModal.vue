<script setup>
import { ref, computed } from 'vue'
import Modal from '@/components/common/Modal.vue'

const props = defineProps({
  titulo: { type: String, required: true },
  mensaje: { type: String, default: '' },
  textoBotonConfirmar: { type: String, default: 'Confirmar' }
})

const emit = defineEmits(['close', 'confirm'])

const textoConfirmacion = ref('')

// Palabra clave para confirmar la acción destructiva
const palabraClave = 'ELIMINAR'

const puedeConfirmar = computed(() => textoConfirmacion.value === palabraClave)
</script>

<template>
  <Modal @close="emit('close')">
    <h2 class="text-xl font-bold mb-4">{{ titulo }}</h2>
    <p class="mb-6 text-gray-700">{{ mensaje }}</p>
    <div class="mb-6">
      <label class="block font-semibold mb-2">
        Escribe <span class="text-red-600 font-bold">{{ palabraClave }}</span> para confirmar:
      </label>
      <input
        v-model="textoConfirmacion"
        type="text"
        class="w-full border rounded px-3 py-2"
        placeholder="Escribe la palabra clave aquí"
      />
    </div>
    <div class="flex justify-end gap-2">
      <button
        @click="emit('close')"
        class="px-4 py-2 rounded bg-gray-200 text-gray-700"
      >
        Cancelar
      </button>
      <button
        @click="emit('confirm')"
        :disabled="!puedeConfirmar"
        class="px-4 py-2 rounded bg-red-600 text-white font-semibold transition disabled:opacity-50"
      >
        {{ textoBotonConfirmar }}
      </button>
    </div>
  </Modal>
</template>