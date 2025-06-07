<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Gestión de Empleados</h1>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatsCard 
        title="Total Empleados"
        value="0"
        icon="users"
      />
      <StatsCard 
        title="Empleados Activos"
        value="0"
        icon="user-check"
      />
      <StatsCard 
        title="Empleados Inactivos"
        value="0"
        icon="user-x"
      />
    </div>

    <!-- Data Table -->
    <DataTable
      :columns="columns"
      :data="empleados"
      :loading="loading"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import StatsCard from '@/components/common/StatsCard.vue';
import DataTable from '@/components/common/DataTable.vue';

const loading = ref(true);
const empleados = ref([]);

// Define table columns
const columns = [
  {
    key: 'nombre',
    label: 'Nombre',
    sortable: true
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true
  },
  {
    key: 'departamento',
    label: 'Departamento',
    sortable: true
  },
  {
    key: 'cargo',
    label: 'Cargo',
    sortable: true
  },
  {
    key: 'fecha_registro',
    label: 'Fecha Registro',
    sortable: true
  },
  {
    key: 'activo',
    label: 'Estado',
    sortable: true
  }
];

onMounted(async () => {
  try {
    // TODO: Fetch empleados data from API
    loading.value = false;
  } catch (error) {
    console.error('Error fetching empleados:', error);
    loading.value = false;
  }
});
</script>