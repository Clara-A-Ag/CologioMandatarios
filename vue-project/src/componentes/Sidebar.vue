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

.sidebar {
  width: 250px;
  background-color: var(--color-sidebar); /* Azul oscuro */
  color: var(--color-text-light);
  padding: 20px 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px 20px 20px;
  font-size: 1.5em;
  font-weight: bold;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 15px;
}

.sidebar-nav {
  flex-grow: 1;
}

.nav-section-title {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8em;
  padding: 15px 20px 5px 20px;
  font-weight: 500;
}

.nav-item {
  display: block;
  padding: 12px 20px;
  text-decoration: none;
  color: var(--color-text-light);
  transition: background-color 0.2s;
  font-weight: 500;
}

.nav-item:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.nav-item.active {
  background-color: rgba(0, 0, 0, 0.3); /* Resalta el ítem activo */
  border-left: 3px solid var(--color-primary); /* Barra de color en activo */
  padding-left: 17px; /* Compensa el borde */
}
</style>