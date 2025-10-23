<template>
  <aside class="sidebar" :class="{ active: isMobileMenuOpen }">
    <div class="sidebar-header">
      <h2>⚖️ Mandatarios</h2>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section">
        <h3>MANDATARIOS</h3>
        <router-link to="/mandatarios/santa-fe" class="nav-link" active-class="active">
          <span>Santa Fe</span>
        </router-link>
      </div>

      <div class="nav-section">
        <h3>IMPORTACIÓN MASIVA</h3>
        <router-link to="/importar/masiva" class="nav-link" active-class="active">
          <span>Santa Fe</span>
        </router-link>
      </div>

      <div class="nav-section">
        <h3>IMPORTACIÓN FOTOS</h3>
        <router-link to="/importar/fotos" class="nav-link" active-class="active">
          <span>Santa Fe</span>
        </router-link>
      </div>
    </nav>
  </aside>
</template>

<script>
// La lógica de `isMobileMenuOpen` se manejaría con un estado global (Pinia/Vuex)
// compartido con TopHeader.vue
export default {
  name: 'Sidebar',
  computed: {
    // isMobileMenuOpen() { return this.$store.state.ui.isMobileMenuOpen; }
  },
};
</script>

<style scoped>
/* Estilos específicos de la barra lateral */
</style>