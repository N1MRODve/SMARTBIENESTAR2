<template>
  <section class="p-6 max-w-3xl mx-auto">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Crear Encuesta</h1>
      <p class="text-sm text-gray-500">Define los detalles y preguntas de tu encuesta.</p>
    </header>

    <form @submit.prevent="guardarEncuesta" aria-label="Formulario de encuesta">
      <!-- 1. Detalles Generales -->
      <section class="mb-8">
        <h2 class="text-lg font-semibold mb-4">1. Detalles Generales</h2>
        <div class="mb-4">
          <label for="titulo" class="block font-medium mb-1">Título</label>
          <input
            id="titulo"
            v-model="encuesta.titulo"
            type="text"
            class="w-full border rounded px-2 py-1"
            required
            autocomplete="off"
          />
        </div>
        <div class="mb-4">
          <label for="descripcion" class="block font-medium mb-1">Descripción</label>
          <textarea
            id="descripcion"
            v-model="encuesta.descripcion"
            class="w-full border rounded px-2 py-1"
            rows="2"
            required
          ></textarea>
        </div>
        <!-- INICIO DEL NUEVO CÓDIGO -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label for="fecha_inicio" class="block font-medium mb-1">Fecha de Inicio</label>
            <input
              id="fecha_inicio"
              v-model="encuesta.fecha_inicio"
              type="datetime-local"
              class="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <div>
            <label for="fecha_fin" class="block font-medium mb-1">Fecha de Fin</label>
            <input
              id="fecha_fin"
              v-model="encuesta.fecha_fin"
              type="datetime-local"
              class="w-full border rounded px-2 py-1"
              required
            />
          </div>
        </div>
        <!-- FIN DEL NUEVO CÓDIGO -->
      </section>

      <!-- 2. Preguntas -->
      <section>
        <h2 class="text-lg font-semibold mb-4">2. Preguntas</h2>
        <div v-for="(pregunta, idx) in encuesta.preguntas" :key="idx" class="mb-6 border rounded p-4 bg-gray-50">
          <div class="flex items-center gap-2 mb-2">
            <span class="font-bold text-primary">Pregunta {{ idx + 1 }}</span>
            <Button
              type="button"
              size="sm"
              variant="danger"
              @click="eliminarPregunta(idx)"
              aria-label="Eliminar pregunta"
              v-if="encuesta.preguntas.length > 1"
            >
              Eliminar
            </Button>
          </div>
          <div class="mb-2">
            <label :for="`pregunta-texto-${idx}`" class="block text-sm font-medium mb-1">Texto de la pregunta</label>
            <input
              :id="`pregunta-texto-${idx}`"
              v-model="pregunta.texto"
              type="text"
              class="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <div class="mb-2">
            <label :for="`pregunta-tipo-${idx}`" class="block text-sm font-medium mb-1">Tipo de pregunta</label>
            <select
              :id="`pregunta-tipo-${idx}`"
              v-model="pregunta.tipo_pregunta"
              class="w-full border rounded px-2 py-1"
              required
            >
              <option value="escala">Escala</option>
              <option value="texto_abierto">Texto abierto</option>
              <option value="seleccion_unica">Selección única</option>
            </select>
          </div>
          <!-- Opciones para selección única -->
          <div v-if="pregunta.tipo_pregunta === 'seleccion_unica'" class="mb-2">
            <label class="block text-xs font-semibold mb-1">Opciones:</label>
            <div v-for="(opcion, oidx) in pregunta.opciones" :key="oidx" class="flex items-center gap-2 mb-1">
              <input
                v-model="pregunta.opciones[oidx]"
                type="text"
                class="border rounded px-2 py-1 flex-1"
                :placeholder="`Opción ${oidx + 1}`"
                required
              />
              <Button
                type="button"
                size="xs"
                variant="danger"
                @click="eliminarOpcion(idx, oidx)"
                aria-label="Eliminar opción"
                v-if="pregunta.opciones.length > 1"
              >
                Eliminar
              </Button>
            </div>
            <Button
              type="button"
              size="xs"
              variant="primary"
              @click="agregarOpcion(idx)"
              class="mt-1"
              aria-label="Agregar opción"
            >
              + Agregar opción
            </Button>
          </div>
        </div>
        <Button
          type="button"
          variant="primary"
          @click="agregarPregunta"
          aria-label="Agregar pregunta"
        >
          + Agregar pregunta
        </Button>
      </section>

      <!-- Mensaje de error -->
      <div v-if="error" class="text-red-500 text-sm mt-4">{{ error }}</div>

      <!-- Botón de guardar -->
      <div class="flex justify-end mt-8">
        <Button
          type="submit"
          :loading="guardando"
          :disabled="guardando"
          icon="save"
        >
          Guardar Encuesta
        </Button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import Button from '@/components/common/Button.vue'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const adminStore = useAdminStore()
const toast = useToast()

const guardando = ref(false)
const error = ref('')

const encuesta = ref({
  titulo: '',
  descripcion: '',
  fecha_inicio: '',
  fecha_fin: '',
  preguntas: [
    {
      texto: '',
      tipo_pregunta: 'escala',
      opciones: []
    }
  ]
})

onMounted(() => {
  if (adminStore.plantillaParaEditar) {
    // Precarga desde plantilla
    encuesta.value.titulo = adminStore.plantillaParaEditar.nombre
    encuesta.value.descripcion = ''
    encuesta.value.preguntas = adminStore.plantillaParaEditar.preguntas
      ? JSON.parse(JSON.stringify(adminStore.plantillaParaEditar.preguntas))
      : [
          {
            texto: '',
            tipo_pregunta: 'escala',
            opciones: []
          }
        ]
    adminStore.clearPlantillaParaEditar()
  }
})

function agregarPregunta() {
  encuesta.value.preguntas.push({
    texto: '',
    tipo_pregunta: 'escala',
    opciones: []
  })
}

function eliminarPregunta(idx) {
  encuesta.value.preguntas.splice(idx, 1)
}

function agregarOpcion(pregIdx) {
  encuesta.value.preguntas[pregIdx].opciones = encuesta.value.preguntas[pregIdx].opciones || []
  encuesta.value.preguntas[pregIdx].opciones.push('')
}

function eliminarOpcion(pregIdx, oidx) {
  encuesta.value.preguntas[pregIdx].opciones.splice(oidx, 1)
}

async function guardarEncuesta() {
  error.value = ''
  // Validación básica
  if (!encuesta.value.titulo.trim()) {
    error.value = 'El título es obligatorio.'
    return
  }
  if (!encuesta.value.preguntas.length) {
    error.value = 'Debes agregar al menos una pregunta.'
    return
  }
  for (const pregunta of encuesta.value.preguntas) {
    if (!pregunta.texto.trim()) {
      error.value = 'Todas las preguntas deben tener texto.'
      return
    }
    if (
      pregunta.tipo_pregunta === 'seleccion_unica' &&
      (!pregunta.opciones || pregunta.opciones.length < 2)
    ) {
      error.value = 'Las preguntas de selección única deben tener al menos dos opciones.'
      return
    }
  }
  guardando.value = true
  try {
    await adminStore.crearEncuesta(encuesta.value)
    toast.success('Encuesta creada correctamente.')
    router.push({ name: 'EncuestasView' })
  } catch (e) {
    toast.error('No se pudo guardar la encuesta.')
  } finally {
    guardando.value = false
  }
}
</script>