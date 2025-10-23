<template>
  <AppLayout>
    <div class="content-header">
      <h1>Mandatarios de Santa Fe</h1>
      
      <div class="header-actions">
        <input type="text" placeholder="Buscar por nombre, CUIT o matrícula..." class="search-input">
        <button class="btn btn-primary" @click="openModal(null)">
          + Agregar Mandatario
        </button>
      </div>

      <MandatariosTabla @consultar="openModal" />
      
      <MandatarioModal ref="mandatarioModal" />
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from '@/components/AppLayout.vue'; 
import MandatariosTabla from '@/components/MandatariosTabla.vue'; 
import MandatarioModal from '@/components/MandatarioModal.vue';


export default {
  name: 'DashboardPage',
  components: {
    AppLayout,
    MandatariosTabla,
    MandatarioModal,
  },
  methods: {
    // Abre el modal para alta (id=null) o edición (con id)
    openModal(mandatarioId = null) {
      this.$refs.mandatarioModal.openModal(mandatarioId);
    }
  }
};
</script>

<style scoped>
/* Contenido principal */
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.content-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text-dark);
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-input {
  padding: 0.75rem 1rem;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  font-size: 0.95rem;
  width: 300px;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

@media (max-width: 768px) {
  .content-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-actions {
    width: 100%;
    flex-direction: column;
  }

  .search-input {
    width: 100%;
  }
}
</style>