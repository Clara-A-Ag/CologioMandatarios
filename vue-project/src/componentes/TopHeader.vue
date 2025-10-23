<template>
  <div class="top-header">
    <button class="mobile-menu-toggle" @click="toggleMobileMenu">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>
    
    <div class="user-menu" v-click-outside="closeDropdown">
      <button class="user-button" @click="toggleDropdown">
        <svg class="user-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span>{{ userName }}</span>
        <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      <UserDropdown v-if="isDropdownOpen" :user-name="userName" @logout="handleLogout" />
    </div>
  </div>
</template>

<script>
import UserDropdown from './UserDropdown.vue';
import { useAuthStore } from '../auth';

export default {
  name: 'TopHeader',
  components: { UserDropdown },
  data() {
    return {
      isDropdownOpen: false,
    };
  },
  computed: {
    userName() {
      const authStore = useAuthStore();
      return authStore.user?.username || 'Usuario';
    }
  },
  methods: {
    toggleMobileMenu() {
      // Lógica para alternar el estado del sidebar (usando Pinia/Vuex)
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    },
    handleLogout() {
      const authStore = useAuthStore();
      if (confirm("¿Está seguro que desea cerrar sesión?")) {
        authStore.logout();
        this.$router.push('/login');
      }
    }
  }
};
</script>