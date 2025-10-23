<template>
  <AppLayout>
    <div class="dashboard-page">
      <h1>Mandatarios de Santa Fe</h1>
      
      <div class="header-controls">
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
.dashboard-page h1 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
}

.header-controls {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}

.search-input {
  flex-grow: 1;
  max-width: 400px;
  border: 1px solid var(--color-border);
}
</style>