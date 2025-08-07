<template>
  <AdminLayout>
    <section class="max-w-3xl mx-auto p-8">
      <h1 class="text-2xl font-bold mb-8">
        {{ adminStore.encuestaParaEditar ? 'Editar Encuesta' : 'Crear Nueva Encuesta' }}
      </h1>
      <form @submit.prevent="guardarEncuesta" class="space-y-8">
        <!-- Detalles generales -->
        <div class="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <label class="block font-semibold mb-1">Título <span class="text-red-500">*</span></label>
            <input
              v-model="encuesta.titulo"
              type="text"
              required
              class="w-full border rounded px-3 py-2"
              placeholder="Título de la encuesta"
            />
          </div>
          <div>
            <label class="block font-semibold mb-1">Descripción</label>
            <textarea
              v-model="encuesta.descripcion"
              rows="3"
              class="w-full border rounded px-3 py-2"
              placeholder="Descripción de la encuesta"
            ></textarea>
          </div>
          <div class="flex gap-4">
            <div class="flex-1">
              <label class="block font-semibold mb-1">Fecha de inicio</label>
              <input
                v-model="encuesta.fecha_inicio"
                type="datetime-local"
                class="w-full border rounded px-3 py-2"
              />
            </div>
            <div class="flex-1">
              <label class="block font-semibold mb-1">Fecha de fin</label>
              <input
                v-model="encuesta.fecha_fin"
                type="datetime-local"
                class="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
        </div>

        <!-- Sección de preguntas -->
        <div>
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Preguntas</h2>
            <button
              type="button"
              @click="agregarPregunta"
              class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
            >
              + Agregar Pregunta
            </button>
          </div>
          <div v-if="encuesta.preguntas.length === 0" class="text-gray-500 mb-4">
            No hay preguntas agregadas.
          </div>
          <div v-for="(pregunta, index) in encuesta.preguntas" :key="index" class="bg-white rounded-lg shadow p-6 mb-6">
            <div class="flex justify-between items-center mb-2">
              <span class="font-semibold">Pregunta {{ index + 1 }}</span>
              <button
                type="button"
                @click="eliminarPregunta(index)"
                class="text-red-500 hover:underline text-sm"
              >
                Eliminar
              </button>
            </div>
            <div class="mb-4">
              <label class="block font-semibold mb-1">Texto de la pregunta</label>
              <input
                v-model="pregunta.texto"
                type="text"
                class="w-full border rounded px-3 py-2"
                placeholder="Escribe la pregunta"
              />
            </div>
            <div class="mb-4">
              <label class="block font-semibold mb-1">Tipo de pregunta</label>
              <select
                v-model="pregunta.tipo"
                @change="cambiarTipoPregunta(index, pregunta.tipo)"
                class="w-full border rounded px-3 py-2"
              >
                <option value="Escala">Escala</option>
                <option value="Texto Abierto">Texto Abierto</option>
                <option value="Selección Única">Selección Única</option>
              </select>
            </div>
            <!-- Opciones para Selección Única -->
            <div v-if="pregunta.tipo === 'Selección Única'" class="mb-4">
              <label class="block font-semibold mb-2">Opciones de respuesta</label>
              <div v-for="(opcion, opcionIdx) in pregunta.opciones" :key="opcionIdx" class="flex items-center gap-2 mb-2">
                <input
                  v-model="pregunta.opciones[opcionIdx]"
                  type="text"
                  class="flex-1 border rounded px-3 py-2"
                  placeholder="Opción de respuesta"
                />
                <button
                  type="button"
                  @click="eliminarOpcion(index, opcionIdx)"
                  class="text-red-500 hover:underline text-sm"
                >
                  Eliminar
                </button>
              </div>
              <button
                type="button"
                @click="agregarOpcion(index)"
                class="bg-secondary text-white px-3 py-1 rounded hover:bg-secondary-dark transition"
              >
                + Agregar Opción
              </button>
            </div>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="flex gap-4 justify-end">
          <button
            type="button"
            @click="guardarEncuesta"
            class="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 transition"
          >
            Guardar como Borrador
          </button>
          <button
            type="submit"
            class="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition"
          >
            Guardar y Enviar
          </button>
        </div>
      </form>
    </section>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAdminStore } from '@/stores/admin'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const adminStore = useAdminStore()
const toast = useToast()
const guardando = ref(false)

const encuesta = ref({
  titulo: '',
  descripcion: '',
  fecha_inicio: '',
  fecha_fin: '',
  preguntas: []
})

onMounted(() => {
  if (adminStore.encuestaParaEditar) {
    const e = adminStore.encuestaParaEditar
    encuesta.value = {
      id: e.id,
      titulo: e.titulo,
      descripcion: e.descripcion,
      fecha_inicio: e.fecha_inicio,
      fecha_fin: e.fecha_fin,
      preguntas: e.preguntas ? JSON.parse(JSON.stringify(e.preguntas)) : []
    }
  }
})

onUnmounted(() => {
  adminStore.clearEncuestaParaEditar()
})

function agregarPregunta() {
  encuesta.value.preguntas.push({
    texto: '',
    tipo: 'Escala',
    opciones: []
  })
}

function eliminarPregunta(index) {
  encuesta.value.preguntas.splice(index, 1)
}

function cambiarTipoPregunta(index, tipo) {
  encuesta.value.preguntas[index].tipo = tipo
  if (tipo !== 'Selección Única') {
    encuesta.value.preguntas[index].opciones = []
  }
}

function agregarOpcion(preguntaIndex) {
  encuesta.value.preguntas[preguntaIndex].opciones.push('')
}

function eliminarOpcion(preguntaIndex, opcionIndex) {
  encuesta.value.preguntas[preguntaIndex].opciones.splice(opcionIndex, 1)
}

async function guardarEncuesta() {
  // Validaciones previas
  if (!encuesta.value.titulo.trim()) {
    toast.error('El título de la encuesta es obligatorio.')
    return
  }
  if (!encuesta.value.preguntas.length) {
    toast.error('Debes agregar al menos una pregunta.')
    return
  }
  if (encuesta.value.preguntas.some(p => !p.texto.trim())) {
    toast.error('Todas las preguntas deben tener texto.')
    return
  }

  guardando.value = true
  try {
    if (adminStore.encuestaParaEditar) {
      await adminStore.actualizarEncuesta(encuesta.value)
      toast.success('Encuesta actualizada correctamente.')
    } else {
      await adminStore.crearEncuesta(encuesta.value)
      toast.success('Encuesta guardada correctamente.')
    }
    router.push({ name: 'EncuestasView' })
  } catch (error) {
    toast.error(error.message || 'Error al guardar la encuesta.')
    console.error(error)
  } finally {
    guardando.value = false
  }
}
</script>