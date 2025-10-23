<template>
  <div id="santa-fe-view" class="view active">
    <div class="content-header">
      <h1>Mandatarios de Santa Fe</h1>
      <div class="header-actions">
        <input 
          type="text" 
          v-model="searchTerm" 
          placeholder="Buscar por nombre, CUIT o matrícula..." 
          class="search-input"
          @input="handleSearch"
        >
        <button class="btn btn-primary" @click="openAddModal">
          <span>+</span> Agregar Mandatario
        </button>
      </div>
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead>
          </thead>
        <tbody>
          <tr v-if="paginatedMandatarios.length === 0" class="empty-state">
            <td colspan="5">
              <div class="empty-message">
                <p>No hay mandatarios registrados</p>
                <p class="empty-submessage">Comienza agregando un nuevo mandatario</p>
              </div>
            </td>
          </tr>
          <tr v-for="mandatario in paginatedMandatarios" :key="mandatario.id">
            <td>{{ mandatario.apeynom }}</td>
            <td>{{ mandatario.cuit }}</td>
            <td>{{ mandatario.matriculaProvincial }}</td>
            <td>{{ mandatario.matriculaNacional || "-" }}</td>
            <td>
              <button class="btn btn-link" @click="viewMandatario(mandatario.id)">
                Consultar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <button class="btn btn-secondary" @click="prevPage" :disabled="currentPage === 1">Anterior</button>
      <span class="pagination-info">Página {{ currentPage }} de {{ totalPages }}</span>
      <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage >= totalPages">Siguiente</button>
    </div>
  </div>
</template>

<script>
import { useMandatariosStore } from '@/store/mandatarios';
import { storeToRefs } from 'pinia';

export default {
  name: 'SantaFeView',
  data() {
    return {
      searchTerm: '',
      itemsPerPage: 10,
    };
  },
  setup() {
    const mandatariosStore = useMandatariosStore();
    // Usa storeToRefs para mantener la reactividad de las propiedades
    const { mandatarios, currentPage, totalPages, paginatedMandatarios } = storeToRefs(mandatariosStore);
    
    // Inicializar la carga de datos al montar la vista
    mandatariosStore.loadMandatarios();

    return { 
        mandatarios, 
        currentPage, 
        totalPages, 
        paginatedMandatarios 
    };
  },
  methods: {
    handleSearch() {
      this.currentPage = 1;
      this.mandatariosStore.search(this.searchTerm); // Lógica de búsqueda en el store
    },
    prevPage() {
      this.mandatariosStore.prevPage(); // Lógica de paginación en el store
    },
    nextPage() {
      this.mandatariosStore.nextPage(); // Lógica de paginación en el store
    },
    openAddModal() {
      // Usar un evento o Pinia/Vuex para abrir el modal
      // this.$bus.emit('open-mandatario-modal'); 
    },
    viewMandatario(id) {
      // Usar un evento o Pinia/Vuex para abrir el modal con datos de edición
      // this.$bus.emit('open-mandatario-modal', id); 
    }
  }
};
</script>