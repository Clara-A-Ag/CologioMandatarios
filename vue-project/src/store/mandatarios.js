import { defineStore } from 'pinia';

function generateId() {
  return "M" + Date.now() + Math.random().toString(36).substr(2, 9);
}

// Simulación de la base de datos o API (para el ejemplo)
const DUMMY_DATA = [
  { id: '1', apeynom: 'Gómez Juan', cuit: '20123456789', matriculaProvincial: 'SL0100', matriculaNacional: 'M1234' },
  { id: '2', apeynom: 'Pérez María', cuit: '27987654321', matriculaProvincial: 'SL0200', matriculaNacional: '' },
];

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
      return Math.max(1, Math.ceil(data.length / state.itemsPerPage));
    },
    totalMandatarios: (state) => state.mandatarios.length,
  },
  actions: {
    saveToStorage() {
      try {
        localStorage.setItem('mandatarios', JSON.stringify(this.mandatarios));
      } catch (e) {
        // Silently ignore storage errors in environments without localStorage
      }
    },
    loadMandatarios() {
      try {
        const stored = localStorage.getItem('mandatarios');
        if (stored) {
          this.mandatarios = JSON.parse(stored);
        } else {
          // Fallback to dummy data on first load
          this.mandatarios = DUMMY_DATA.map((d) => ({ ...d }));
          this.saveToStorage();
        }
      } catch (e) {
        // If parsing fails, fallback to dummy data
        this.mandatarios = DUMMY_DATA.map((d) => ({ ...d }));
      }
      this.filteredMandatarios = [...this.mandatarios];
      this.searchTerm = '';
      this.currentPage = 1;
    },
    addOrUpdateMandatario(data) {
      const clean = {
        ...data,
        id: data.id || generateId(),
        apeynom: (data.apeynom || '').toString().trim().toUpperCase(),
        matriculaProvincial: (data.matriculaProvincial || '').toString().trim().toUpperCase(),
        matriculaNacional: (data.matriculaNacional || '').toString().trim().toUpperCase(),
        cuit: (data.cuit || '').toString().trim(),
      };

      const existingIndex = this.mandatarios.findIndex((m) => m.id === clean.id);

      if (existingIndex >= 0) {
        this.mandatarios[existingIndex] = { ...this.mandatarios[existingIndex], ...clean };
      } else {
        this.mandatarios.push(clean);
      }

      this.saveToStorage();
      // Re-apply search filter after change
      if (this.searchTerm) {
        this.search(this.searchTerm);
      } else {
        this.filteredMandatarios = [...this.mandatarios];
      }
    },
    deleteMandatario(id) {
      this.mandatarios = this.mandatarios.filter((m) => m.id !== id);
      this.saveToStorage();
      this.filteredMandatarios = this.filteredMandatarios.filter((m) => m.id !== id);
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    },
    search(term) {
      this.searchTerm = (term || '').toString().toLowerCase().trim();
      this.currentPage = 1;

      if (!this.searchTerm) {
        this.filteredMandatarios = [...this.mandatarios];
      } else {
        this.filteredMandatarios = this.mandatarios.filter((m) => {
          const apeynom = (m.apeynom || '').toString().toLowerCase();
          const cuit = (m.cuit || '').toString();
          const mp = (m.matriculaProvincial || '').toString().toLowerCase();
          const mn = (m.matriculaNacional || '').toString().toLowerCase();
          return (
            apeynom.includes(this.searchTerm) ||
            cuit.includes(this.searchTerm) ||
            mp.includes(this.searchTerm) ||
            mn.includes(this.searchTerm)
          );
        });
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
  },
});