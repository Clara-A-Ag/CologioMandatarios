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
/* table-container, data-table, th, td, etc. son estilos globales y se definen en styles.css.
   Aquí solo definimos la paginación para mantener la estructura modular. */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
}
</style>