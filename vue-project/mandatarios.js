import { defineStore } from 'pinia';

function generateId() {
  return "M" + Date.now() + Math.random().toString(36).substr(2, 9);
}

export const useMandatariosStore = defineStore('mandatarios', {
  state: () => ({
    mandatarios: [], // Lista completa
    filteredMandatarios: [], // Lista después de buscar/filtrar
    currentPage: 1,
    itemsPerPage: 10,
    searchTerm: '',
  }),
  getters: {
    // Datos a mostrar en la tabla (paginados y filtrados)
    paginatedMandatarios: (state) => {
      const data = state.searchTerm ? state.filteredMandatarios : state.mandatarios;
      const startIndex = (state.currentPage - 1) * state.itemsPerPage;
      const endIndex = startIndex + state.itemsPerPage;
      return data.slice(startIndex, endIndex);
    },
    totalPages: (state) => {
      const data = state.searchTerm ? state.filteredMandatarios : state.mandatarios;
      return Math.ceil(data.length / state.itemsPerPage) || 1;
    },
  },
  actions: {
    saveToStorage() {
      localStorage.setItem("mandatarios", JSON.stringify(this.mandatarios));
    },
    loadMandatarios() {
      const stored = localStorage.getItem("mandatarios");
      this.mandatarios = stored ? JSON.parse(stored) : [];
      this.filteredMandatarios = [...this.mandatarios];
    },
    addOrUpdateMandatario(data) {
      const existingIndex = this.mandatarios.findIndex((m) => m.id === data.id);
      
      const newMandatario = {
        ...data,
        id: data.id || generateId(),
        // Convertir a mayúsculas aquí
        apeynom: data.apeynom.trim().toUpperCase(), 
        matriculaProvincial: data.matriculaProvincial.trim().toUpperCase(),
        matriculaNacional: data.matriculaNacional.trim().toUpperCase(),
      };

      if (existingIndex >= 0) {
        this.mandatarios[existingIndex] = newMandatario;
      } else {
        this.mandatarios.push(newMandatario);
      }
      this.saveToStorage();
    },
    search(term) {
      this.searchTerm = term.toLowerCase().trim();
      this.currentPage = 1;
      
      if (!this.searchTerm) {
        this.filteredMandatarios = [...this.mandatarios];
      } else {
        this.filteredMandatarios = this.mandatarios.filter(
          (m) =>
            m.apeynom.toLowerCase().includes(this.searchTerm) ||
            m.cuit.includes(this.searchTerm) ||
            m.matriculaProvincial.toLowerCase().includes(this.searchTerm) ||
            (m.matriculaNacional && m.matriculaNacional.toLowerCase().includes(this.searchTerm)),
        );
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    // ... otras acciones como deleteMandatario
  }
});