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
/* Estilos básicos */
.user-dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
}
.user-btn {
  background: none;
  border: none;
  color: white;
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  min-width: 150px;
  z-index: 100;
  overflow: hidden;
}
.dropdown-menu a {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #333;
}
.dropdown-menu a:hover {
  background-color: #f0f0f0;
}
</style>