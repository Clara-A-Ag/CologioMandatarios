<template>
  <div class="mandatarios-table-container">
    <table class="mandatarios-table">
      <thead>
        <tr>
          <th>NOMBRE Y APELLIDO</th>
          <th>CUIT</th>
          <th>MATRÍCULA PROVINCIAL</th>
          <th>MATRÍCULA NACIONAL</th>
          <th>ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mandatario in mandatariosStore.mandatarios" :key="mandatario.id">
          <td>{{ mandatario.apeynom }}</td>
          <td>{{ mandatario.cuit }}</td>
          <td>{{ mandatario.matriculaProvincial }}</td>
          <td>{{ mandatario.matriculaNacional }}</td>
          <td>
            <button class="action-link" @click="$emit('consultar', mandatario.id)">Consultar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="table-footer">
      <button class="btn btn-secondary btn-pagination" disabled>Anterior</button>
      <span class="pagination-info">Página 1 de 1</span>
      <button class="btn btn-secondary btn-pagination" disabled>Siguiente</button>
    </div>
  </div>
</template>

<script>
import { useMandatariosStore } from '@/store/mandatarios';

export default {
  name: 'MandatariosTabla',
  emits: ['consultar'],
  computed: {
    mandatariosStore() {
      return useMandatariosStore();
    }
  },
  mounted() {
    this.mandatariosStore.loadMandatarios();
  }
};
</script>

<style scoped>
/* ... (Estilos de la tabla, igual que en la respuesta anterior) ... */
.mandatarios-table-container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
}
.mandatarios-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
.mandatarios-table th, .mandatarios-table td { text-align: left; padding: 12px 15px; border-bottom: 1px solid var(--color-border); }
.mandatarios-table th { background-color: var(--color-background-light); color: #555; font-size: 0.9em; font-weight: 600; text-transform: uppercase; }
.action-link { background: none; border: none; color: var(--color-primary); cursor: pointer; font-weight: 500; text-decoration: underline; }

.table-footer { display: flex; justify-content: flex-end; align-items: center; gap: 10px; }
.btn-pagination { padding: 8px 12px; font-size: 0.9em; }
.pagination-info { font-size: 0.9em; color: #666; }
</style>