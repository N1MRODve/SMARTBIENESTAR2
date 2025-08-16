<template>
  <EmpleadoLayout>
    <div class="p-6 md:p-8">
      <!-- Header -->
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Mi Dashboard</h1>
        <p class="text-gray-600">Bienvenido a tu espacio personal de bienestar</p>
      </header>
      
      <!-- Sección de Estadísticas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Puntos de Bienestar -->
        <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.puntosBienestar }}</h3>
          <p class="text-gray-700 font-medium">Puntos de Bienestar</p>
          <div class="flex items-center justify-center mt-2">
            <TrendingUp class="h-4 w-4 text-green-500 mr-1" />
            <span class="text-xs text-green-600">+{{ stats.puntosSemana }} esta semana</span>
          </div>
        </div>

        <!-- Sesiones Asistidas -->
        <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.sesionesAsistidas }}</h3>
          <p class="text-gray-700 font-medium">Sesiones Asistidas</p>
          <div class="flex items-center justify-center mt-2">
            <Calendar class="h-4 w-4 text-blue-500 mr-1" />
            <span class="text-xs text-blue-600">Este mes</span>
          </div>
        </div>

        <!-- Desafíos Completados -->
        <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h3 class="text-4xl font-bold text-primary mb-2">{{ stats.desafiosCompletados }}</h3>
          <p class="text-gray-700 font-medium">Desafíos Completados</p>
          <div class="flex items-center justify-center mt-2">
            <Trophy class="h-4 w-4 text-yellow-500 mr-1" />
            <span class="text-xs text-yellow-600">Nivel {{ stats.nivelActual }}</span>
          </div>
        </div>
      </div>

      <!-- Próximas Sesiones -->
      <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Próximas Sesiones</h2>
          <router-link 
            to="/empleado/reservar-actividad" 
            class="text-sm text-primary hover:text-primary-dark font-medium"
          >
            Ver todas →
          </router-link>
        </div>

        <div v-if="proximasSesiones.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
          <Calendar class="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p class="font-medium mb-2">No tienes sesiones próximas</p>
          <router-link to="/empleado/reservar-actividad">
            <button class="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors">
              Explorar Actividades
            </button>
          </router-link>
        </div>

        <div v-else class="space-y-4">
          <div 
            v-for="sesion in proximasSesiones" 
            :key="sesion.id"
            class="glass-card p-4 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <div class="flex items-center justify-between mb-2">
              <p class="font-semibold text-gray-900">{{ sesion.titulo }}</p>
              <span :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                getStatusClass(sesion.estado)
              ]">
                {{ getStatusText(sesion.estado) }}
              </span>
            </div>
            <p class="text-sm text-gray-600 mt-1">{{ formatDateTime(sesion.fecha) }}</p>
            <div class="flex items-center justify-between mt-2">
              <p class="text-xs text-gray-500">{{ sesion.colaborador }}</p>
              <p class="text-xs text-gray-500">{{ sesion.modalidad }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Encuestas Pendientes -->
      <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Encuestas Pendientes</h2>
          <router-link 
            to="/empleado/encuestas" 
            class="text-sm text-primary hover:text-primary-dark font-medium"
          >
            Ver todas →
          </router-link>
        </div>

        <div v-if="encuestasPendientes.length === 0" class="glass-card p-8 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
          <ClipboardList class="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p class="font-medium">No tienes encuestas pendientes</p>
        </div>

        <div v-else class="space-y-4">
          <div 
            v-for="encuesta in encuestasPendientes" 
            :key="encuesta.id"
            class="glass-card p-4 rounded-xl shadow-md backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex justify-between items-center"
          >
            <div>
              <p class="font-semibold text-gray-900">{{ encuesta.titulo }}</p>
              <p class="text-sm text-gray-600 mt-1">{{ encuesta.descripcion }}</p>
              <p class="text-xs text-gray-500 mt-1">
                {{ encuesta.diasRestantes !== null ? `Termina en ${encuesta.diasRestantes} días` : 'Sin fecha límite' }}
              </p>
            </div>
            <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium">
              Completar
            </button>
          </div>
        </div>
      </div>
    </div>
  </EmpleadoLayout>
</template>

<script setup>
import { ref } from 'vue'
import { TrendingUp, Calendar, Trophy, ClipboardList } from 'lucide-vue-next'
import EmpleadoLayout from '../../layouts/EmpleadoLayout.vue'

// Datos de ejemplo para las estadísticas
const stats = ref({
  puntosBienestar: 1250,
  puntosSemana: 85,
  sesionesAsistidas: 12,
  desafiosCompletados: 3,
  nivelActual: 2
})

// Datos de ejemplo para próximas sesiones
const proximasSesiones = ref([
  {
    id: 1,
    titulo: 'Yoga Matutino',
    fecha: '2025-01-20T08:00:00',
    colaborador: 'Elena Vásquez',
    modalidad: 'Presencial',
    estado: 'confirmada'
  },
  {
    id: 2,
    titulo: 'Meditación Mindfulness',
    fecha: '2025-01-22T12:30:00',
    colaborador: 'Miguel Torres',
    modalidad: 'Online',
    estado: 'confirmada'
  },
  {
    id: 3,
    titulo: 'Coaching Personal',
    fecha: '2025-01-25T15:00:00',
    colaborador: 'Carlos Ruiz',
    modalidad: 'Online',
    estado: 'pendiente'
  }
])

// Datos de ejemplo para encuestas pendientes
const encuestasPendientes = ref([
  {
    id: 1,
    titulo: 'Evaluación de Clima Laboral Q1',
    descripcion: 'Ayúdanos a mejorar el ambiente de trabajo',
    diasRestantes: 5
  },
  {
    id: 2,
    titulo: 'Feedback Actividades de Bienestar',
    descripcion: 'Comparte tu experiencia con nuestras actividades',
    diasRestantes: null
  }
])

// Funciones de utilidad
const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  if (date.toDateString() === new Date().toDateString()) {
    return `Hoy, ${date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return `Mañana, ${date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`
  } else {
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }
}

const getStatusClass = (estado) => {
  const classes = {
    'confirmada': 'bg-green-100 text-green-800',
    'pendiente': 'bg-yellow-100 text-yellow-800',
    'cancelada': 'bg-red-100 text-red-800'
  }
  return classes[estado] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (estado) => {
  const textos = {
    'confirmada': 'Confirmada',
    'pendiente': 'Pendiente',
    'cancelada': 'Cancelada'
  }
  return textos[estado] || estado
}
</script>