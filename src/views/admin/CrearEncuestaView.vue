<!-- src/views/admin/CrearEncuestaView.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <div class="max-w-4xl mx-auto p-8">
      <!-- Header -->
      <div class="mb-8">
        <button 
          @click="$router.back()"
          class="flex items-center text-primary hover:text-primary-dark mb-6 transition-colors"
        >
          <ArrowLeft class="h-4 w-4 mr-2" />
          Volver a encuestas
        </button>
        
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          {{ adminStore.encuestaParaEditar ? 'Editar Encuesta' : 'Crear Nueva Encuesta' }}
        </h1>
        <p class="text-gray-600">
          {{ adminStore.encuestaParaEditar ? 'Modifica los detalles de tu encuesta' : 'Diseña una encuesta personalizada para tus empleados' }}
        </p>
      </div>

      <form @submit.prevent="guardarEncuesta" class="space-y-8">
        <!-- Detalles generales -->
        <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
          <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <FileText class="h-5 w-5 mr-2 text-primary" />
            Información General
          </h2>
          
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Título de la Encuesta <span class="text-red-500">*</span>
              </label>
              <input
                v-model="encuesta.titulo"
                type="text"
                required
                class="w-full px-4 py-3 border border-white/30 rounded-xl bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                placeholder="Ej: Evaluación de Clima Laboral Q1 2025"
              />
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
              <textarea
                v-model="encuesta.descripcion"
                rows="3"
                class="w-full px-4 py-3 border border-white/30 rounded-xl bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                placeholder="Describe el propósito y objetivos de esta encuesta..."
              ></textarea>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Fecha de inicio</label>
                <input
                  v-model="encuesta.fecha_inicio"
                  type="datetime-local"
                  class="w-full px-4 py-3 border border-white/30 rounded-xl bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Fecha de fin</label>
                <input
                  v-model="encuesta.fecha_fin"
                  type="datetime-local"
                  class="w-full px-4 py-3 border border-white/30 rounded-xl bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Sección de preguntas -->
        <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-900 flex items-center">
              <HelpCircle class="h-5 w-5 mr-2 text-primary" />
              Preguntas de la Encuesta
            </h2>
            <button
              type="button"
              @click="agregarPregunta"
              class="glass-button-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30 flex items-center"
            >
              <Plus class="h-4 w-4 mr-2" />
              Agregar Pregunta
            </button>
          </div>
          
          <div v-if="encuesta.preguntas.length === 0" class="text-center py-12 text-gray-500">
            <HelpCircle class="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p class="text-lg font-medium text-gray-400 mb-2">No hay preguntas agregadas</p>
            <p class="text-gray-400">Comienza agregando la primera pregunta a tu encuesta</p>
          </div>
          
          <div class="space-y-6">
            <div 
              v-for="(pregunta, index) in encuesta.preguntas" 
              :key="index" 
              class="glass-card rounded-xl p-6 backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300"
            >
              <div class="flex justify-between items-center mb-4">
                <span class="text-lg font-semibold text-gray-900 flex items-center">
                  <span class="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    {{ index + 1 }}
                  </span>
                  Pregunta {{ index + 1 }}
                </span>
                <button
                  type="button"
                  @click="eliminarPregunta(index)"
                  class="text-red-500 hover:text-red-700 hover:bg-red-50/80 p-2 rounded-lg transition-all duration-200 flex items-center"
                >
                  <Trash2 class="h-4 w-4 mr-1" />
                  Eliminar
                </button>
              </div>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Texto de la pregunta</label>
                  <input
                    v-model="pregunta.texto"
                    type="text"
                    class="w-full px-4 py-3 border border-white/30 rounded-xl bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                    placeholder="Escribe tu pregunta aquí..."
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Tipo de pregunta</label>
                  <select
                    v-model="pregunta.tipo"
                    @change="cambiarTipoPregunta(index, pregunta.tipo)"
                    class="w-full px-4 py-3 border border-white/30 rounded-xl bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                  >
                    <option value="Escala">Escala (1-5)</option>
                    <option value="Texto Abierto">Texto Abierto</option>
                    <option value="Selección Única">Selección Única</option>
                  </select>
                </div>
                
                <!-- Opciones para Selección Única -->
                <div v-if="pregunta.tipo === 'Selección Única'" class="space-y-3">
                  <label class="block text-sm font-semibold text-gray-700">Opciones de respuesta</label>
                  <div class="space-y-2">
                    <div 
                      v-for="(opcion, opcionIdx) in pregunta.opciones" 
                      :key="opcionIdx" 
                      class="flex items-center gap-3"
                    >
                      <div class="flex-1">
                        <input
                          v-model="pregunta.opciones[opcionIdx]"
                          type="text"
                          class="w-full px-4 py-2 border border-white/30 rounded-lg bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                          :placeholder="`Opción ${opcionIdx + 1}`"
                        />
                      </div>
                      <button
                        type="button"
                        @click="eliminarOpcion(index, opcionIdx)"
                        class="text-red-500 hover:text-red-700 hover:bg-red-50/80 p-2 rounded-lg transition-all duration-200"
                      >
                        <X class="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    @click="agregarOpcion(index)"
                    class="glass-button-secondary text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200/80 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50 flex items-center"
                  >
                    <Plus class="h-4 w-4 mr-2" />
                    Agregar Opción
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="flex gap-4 justify-end">
          <button
            type="button"
            @click="$router.back()"
            class="glass-button-outline text-gray-700 bg-white/60 hover:bg-gray-50/80 px-8 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50"
          >
            Cancelar
          </button>
          <button
            type="button"
            @click="guardarBorrador"
            :disabled="guardando"
            class="glass-button-secondary text-gray-800 px-8 py-3 rounded-xl hover:bg-gray-200/80 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50 flex items-center"
          >
            <Save class="h-4 w-4 mr-2" />
            {{ guardando ? 'Guardando...' : 'Guardar Borrador' }}
          </button>
          <button
            type="submit"
            :disabled="guardando"
            class="glass-button-primary text-white px-8 py-3 rounded-xl hover:bg-primary/90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30 flex items-center"
          >
            <Send class="h-4 w-4 mr-2" />
            {{ guardando ? 'Guardando...' : (adminStore.encuestaParaEditar ? 'Actualizar Encuesta' : 'Crear Encuesta') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAdminStore } from '@/stores/admin'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'
import { 
  ArrowLeft, 
  FileText, 
  HelpCircle, 
  Plus, 
  Trash2, 
  X, 
  Save, 
  Send 
} from 'lucide-vue-next'

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
  } else {
    // Agregar opciones por defecto
    encuesta.value.preguntas[index].opciones = ['Opción 1', 'Opción 2']
  }
}

function agregarOpcion(preguntaIndex) {
  encuesta.value.preguntas[preguntaIndex].opciones.push('')
}

function eliminarOpcion(preguntaIndex, opcionIndex) {
  encuesta.value.preguntas[preguntaIndex].opciones.splice(opcionIndex, 1)
}

async function guardarBorrador() {
  await guardarEncuesta(true)
}

async function guardarEncuesta(esBorrador = false) {
  // Validaciones previas
  if (!encuesta.value.titulo || encuesta.value.titulo.trim() === '') {
    toast.error('El título de la encuesta es obligatorio.')
    return
  }
  if (!encuesta.value.preguntas || encuesta.value.preguntas.length === 0) {
    toast.error('Debes agregar al menos una pregunta.')
    return
  }
  if (encuesta.value.preguntas.some(p => !p.texto.trim())) {
    toast.error('Todas las preguntas deben tener texto.')
    return
  }

  // Validar opciones para preguntas de selección única
  for (const pregunta of encuesta.value.preguntas) {
    if (pregunta.tipo === 'Selección Única') {
      if (!pregunta.opciones || pregunta.opciones.length < 2) {
        toast.error('Las preguntas de selección única deben tener al menos 2 opciones.')
        return
      }
      if (pregunta.opciones.some(o => !o.trim())) {
        toast.error('Todas las opciones deben tener texto.')
        return
      }
    }
  }

  guardando.value = true
  try {
    const encuestaParaGuardar = {
      ...encuesta.value,
      estado: esBorrador ? 'borrador' : 'activa'
    }
    
    if (adminStore.encuestaParaEditar) {
      await adminStore.actualizarEncuesta(encuestaParaGuardar)
      toast.success('Encuesta actualizada correctamente.')
    } else {
      await adminStore.crearEncuesta(encuestaParaGuardar)
      toast.success(`Encuesta ${esBorrador ? 'guardada como borrador' : 'creada'} correctamente.`)
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