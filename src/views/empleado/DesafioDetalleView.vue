<template>
  <div class="p-6 md:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Botón de regreso -->
      <button 
        @click="$router.back()"
        class="flex items-center text-primary hover:text-primary-dark mb-6 transition-colors"
      >
        <ArrowLeft class="h-4 w-4 mr-2" />
        Volver a desafíos
      </button>

      <div v-if="!desafio" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p class="text-gray-600">Cargando desafío...</p>
      </div>

      <div v-else class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Imagen principal -->
        <div class="relative h-64 md:h-80">
          <img 
            :src="desafio.imagen" 
            :alt="desafio.titulo"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div class="p-6 text-white">
              <h1 class="text-3xl font-bold mb-2">{{ desafio.titulo }}</h1>
              <div class="flex items-center space-x-4">
                <span class="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {{ desafio.puntos }} puntos
                </span>
                <span class="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  {{ desafio.participantes }} participantes
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Contenido principal -->
        <div class="p-6 md:p-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Información principal -->
            <div class="lg:col-span-2">
              <div class="mb-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-3">Descripción del Desafío</h2>
                <p class="text-gray-700 leading-relaxed">{{ desafio.descripcion_completa }}</p>
              </div>

              <div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Objetivos</h3>
                <ul class="space-y-2">
                  <li 
                    v-for="objetivo in desafio.objetivos" 
                    :key="objetivo"
                    class="flex items-start"
                  >
                    <CheckCircle class="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span class="text-gray-700">{{ objetivo }}</span>
                  </li>
                </ul>
              </div>

              <div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Cómo Participar</h3>
                <ol class="space-y-2">
                  <li 
                    v-for="(paso, index) in desafio.pasos" 
                    :key="index"
                    class="flex items-start"
                  >
                    <span class="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
                      {{ index + 1 }}
                    </span>
                    <span class="text-gray-700">{{ paso }}</span>
                  </li>
                </ol>
              </div>
            </div>

            <!-- Sidebar con información adicional -->
            <div class="lg:col-span-1">
              <div class="bg-gray-50 rounded-lg p-6 sticky top-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Información del Desafío</h3>
                
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Estado:</span>
                    <span :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      desafio.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    ]">
                      {{ desafio.estado === 'activo' ? 'Activo' : 'Finalizado' }}
                    </span>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Duración:</span>
                    <span class="text-sm font-medium text-gray-900">{{ desafio.duracion }}</span>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Dificultad:</span>
                    <div class="flex items-center">
                      <Star 
                        v-for="i in 5" 
                        :key="i"
                        :class="[
                          'h-4 w-4',
                          i <= desafio.dificultad ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        ]"
                      />
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Categoría:</span>
                    <span class="text-sm font-medium text-gray-900">{{ desafio.categoria }}</span>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Fecha límite:</span>
                    <span class="text-sm font-medium text-gray-900">{{ formatearFecha(desafio.fecha_fin) }}</span>
                  </div>
                </div>

                <!-- Botón de acción -->
                <div class="mt-6">
                  <button 
                    v-if="desafio.estado === 'activo'"
                    @click="apuntarseDesafio"
                    :disabled="yaParticipando"
                    class="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {{ yaParticipando ? 'Ya participas' : 'Apuntarse al Desafío' }}
                  </button>
                  
                  <div v-else class="text-center">
                    <CheckCircle class="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p class="text-sm text-gray-600">Desafío finalizado</p>
                  </div>
                </div>

                <!-- Progreso (si ya participa) -->
                <div v-if="yaParticipando && desafio.estado === 'activo'" class="mt-6 pt-6 border-t border-gray-200">
                  <h4 class="text-sm font-semibold text-gray-900 mb-3">Tu Progreso</h4>
                  <div class="space-y-3">
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-gray-600">Días completados:</span>
                      <span class="font-medium">{{ progresoActual.dias_completados }}/{{ progresoActual.dias_totales }}</span>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2">
                      <div 
                        class="bg-primary rounded-full h-2 transition-all duration-300"
                        :style="{ width: `${(progresoActual.dias_completados / progresoActual.dias_totales) * 100}%` }"
                      ></div>
                    </div>
                    <p class="text-xs text-gray-500">
                      {{ Math.round((progresoActual.dias_completados / progresoActual.dias_totales) * 100) }}% completado
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft, CheckCircle, Star } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();

// Estado local
const yaParticipando = ref(false);
const progresoActual = ref({
  dias_completados: 3,
  dias_totales: 14
});

// Datos dummy expandidos
const desafiosDummy = [
  {
    id: 1,
    titulo: "Camina 10,000 pasos diarios",
    descripcion: "Mantén un estilo de vida activo caminando al menos 10,000 pasos cada día durante una semana completa.",
    descripcion_completa: "Este desafío te ayudará a incorporar más actividad física en tu rutina diaria. Caminar 10,000 pasos al día es una excelente manera de mejorar tu salud cardiovascular, fortalecer tus músculos y aumentar tu energía. Durante este desafío de una semana, te animamos a encontrar momentos a lo largo del día para moverte más: usa las escaleras en lugar del ascensor, camina durante las llamadas telefónicas, o da un paseo durante tu hora de almuerzo.",
    imagen: "https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=800",
    puntos: 150,
    fecha_inicio: "2025-01-15T00:00:00Z",
    fecha_fin: "2025-02-15T23:59:59Z",
    estado: "activo",
    participantes: 45,
    duracion: "1 semana",
    dificultad: 2,
    categoria: "Actividad Física",
    objetivos: [
      "Caminar al menos 10,000 pasos diarios",
      "Registrar tu progreso cada día",
      "Mantener la constancia durante 7 días consecutivos",
      "Compartir tu experiencia con el equipo"
    ],
    pasos: [
      "Descarga una app de conteo de pasos o usa tu smartwatch",
      "Registra tus pasos diarios en la plataforma",
      "Comparte fotos de tus caminatas (opcional)",
      "Completa el desafío durante 7 días consecutivos"
    ]
  },
  {
    id: 2,
    titulo: "Meditación de 5 minutos",
    descripcion: "Dedica 5 minutos diarios a la meditación durante 2 semanas para mejorar tu bienestar mental.",
    descripcion_completa: "La meditación diaria puede reducir significativamente el estrés, mejorar la concentración y promover un mejor equilibrio emocional. Este desafío de 2 semanas te introducirá a la práctica de la meditación mindfulness. Solo necesitas 5 minutos al día para comenzar a experimentar los beneficios. Puedes meditar por la mañana para comenzar el día con claridad, o por la noche para relajarte antes de dormir.",
    imagen: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800",
    puntos: 100,
    fecha_inicio: "2025-01-20T00:00:00Z",
    fecha_fin: "2025-02-20T23:59:59Z",
    estado: "activo",
    participantes: 32,
    duracion: "2 semanas",
    dificultad: 1,
    categoria: "Bienestar Mental",
    objetivos: [
      "Meditar 5 minutos cada día",
      "Aprender técnicas básicas de respiración",
      "Desarrollar el hábito de la meditación",
      "Reducir los niveles de estrés diario"
    ],
    pasos: [
      "Encuentra un lugar tranquilo en tu casa u oficina",
      "Usa la app de meditación recomendada o sigue las guías",
      "Registra tu sesión diaria en la plataforma",
      "Reflexiona sobre tu experiencia al final de cada semana"
    ]
  },
  {
    id: 3,
    titulo: "Hidratación saludable",
    descripcion: "Bebe al menos 8 vasos de agua al día durante 10 días consecutivos para mantener una hidratación óptima.",
    descripcion_completa: "La hidratación adecuada es fundamental para el funcionamiento óptimo de nuestro cuerpo y mente. Este desafío te ayudará a desarrollar el hábito de beber suficiente agua a lo largo del día. Una hidratación adecuada mejora la concentración, aumenta los niveles de energía, mejora la digestión y contribuye a una piel más saludable. Durante 10 días, te retamos a beber al menos 8 vasos de agua (aproximadamente 2 litros) diariamente.",
    imagen: "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=800",
    puntos: 75,
    fecha_inicio: "2025-01-10T00:00:00Z",
    fecha_fin: "2025-01-25T23:59:59Z",
    estado: "activo",
    participantes: 28,
    duracion: "10 días",
    dificultad: 1,
    categoria: "Nutrición",
    objetivos: [
      "Beber 8 vasos de agua diarios",
      "Mejorar los hábitos de hidratación",
      "Aumentar los niveles de energía",
      "Desarrollar una rutina saludable"
    ],
    pasos: [
      "Lleva contigo una botella de agua reutilizable",
      "Establece recordatorios para beber agua cada 2 horas",
      "Registra tu consumo diario en la app",
      "Celebra cada día completado con éxito"
    ]
  }
];

// Computed para encontrar el desafío actual
const desafio = computed(() => {
  const id = parseInt(route.params.id);
  return desafiosDummy.find(d => d.id === id);
});

// Métodos
const formatearFecha = (fechaString) => {
  const fecha = new Date(fechaString);
  return fecha.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const apuntarseDesafio = () => {
  // Simular apuntarse al desafío
  yaParticipando.value = true;
  
  // Aquí iría la lógica para registrar la participación en la base de datos
  console.log('Apuntándose al desafío:', desafio.value.id);
  
  // Mostrar mensaje de éxito (puedes usar toast notifications)
  alert(`¡Te has apuntado al desafío "${desafio.value.titulo}"! Comienza hoy mismo.`);
};

// Simular si ya está participando (esto vendría de la base de datos)
onMounted(() => {
  // Simular que algunos usuarios ya participan
  const participandoIds = [1]; // IDs de desafíos donde ya participa
  if (desafio.value && participandoIds.includes(desafio.value.id)) {
    yaParticipando.value = true;
  }
});
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>