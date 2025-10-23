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
.user-menu {
  position: relative;
  margin-left: auto;
}

.user-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95rem;
  color: var(--color-text-dark);
}

.user-button:hover {
  border-color: var(--color-primary);
  background: var(--color-bg-light);
}

.user-icon {
  width: 20px;
  height: 20px;
  color: var(--color-primary);
}

.chevron-icon {
  width: 16px;
  height: 16px;
  color: var(--color-text-subtle);
  transition: transform 0.2s;
}

.user-button:hover .chevron-icon {
  transform: translateY(2px);
}

.user-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s;
  z-index: 1000;
  pointer-events: none;
}

.user-dropdown.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  pointer-events: auto;
}

.dropdown-header {
  padding: 1rem;
}

.dropdown-user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.dropdown-user-icon {
  width: 32px;
  height: 32px;
  color: var(--color-primary);
  background: #f1f5f9;
  padding: 0.5rem;
  border-radius: 50%;
}

.dropdown-divider {
  height: 1px;
  background: var(--color-border);
  margin: 0.5rem 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s;
  color: var(--color-text-dark);
  font-size: 0.95rem;
}

.dropdown-item:hover {
  background: var(--color-bg-light);
}

.dropdown-item svg {
  width: 18px;
  height: 18px;
  color: var(--color-text-subtle);
}

@media (max-width: 768px) {
  .user-button span {
    display: none;
  }
}
</style>