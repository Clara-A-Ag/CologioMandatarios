<template>
  <div class="user-dropdown">
    <button @click="toggleDropdown" class="user-btn">
      <span>Hola, Usuario</span> <span class="icon">▼</span>
    </button>

    <div v-if="isOpen" class="dropdown-menu">
      <a href="#" @click.prevent="viewProfile">Mi Perfil</a>
      <a href="#" @click.prevent="logout">Cerrar Sesión</a>
    </div>
  </div>
</template>

<script>
// Aquí iría la lógica para interactuar con el Store de Autenticación de Pinia
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
      alert('Cerrando sesión...');
      this.isOpen = false;
      // Lógica real: Llamar a la acción de logout del store de Pinia
    },
    viewProfile() {
      alert('Ir a perfil...');
      this.isOpen = false;
    }
  }
};
</script>

<style scoped>
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