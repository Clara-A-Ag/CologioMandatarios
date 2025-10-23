<template>
  <div class="user-dropdown">
    <button @click="toggleDropdown" class="user-btn">
      <span class="username">santafé</span> 
      <svg fill="currentColor" viewBox="0 0 20 20" width="14" height="14" class="icon-arrow">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
      </svg>
    </button>
    
    <div v-if="isOpen" class="dropdown-menu">
      <a href="#" @click.prevent="logout">Cerrar Sesión</a> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserDropdown',
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    logout() {
      // Lógica de logout real...
      alert('Cerrando sesión...');
      this.isOpen = false;
    }
  }
};
</script>

<style scoped>
/* ... (Estilos de UserDropdown, igual que en la respuesta anterior) ... */
.user-dropdown {
  position: relative;
  display: inline-block;
}
.user-btn {
  background-color: transparent;
  border: 1px solid var(--color-border);
  color: #333;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9em;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  min-width: 150px;
  z-index: 100;
  margin-top: 5px;
}
.dropdown-menu a {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #333;
  font-size: 0.9em;
}
.dropdown-menu a:hover {
  background-color: #f0f0f0;
}
</style>