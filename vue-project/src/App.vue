<template>
  <div class="app-container">
    <Sidebar />

    <main class="main-content">
      <TopHeader />
      
      <router-view></router-view>
      
      <MandatarioModal />
    </main>
  </div>
  
  <div id="notification" class="notification"></div>
</template>

<script>
import Sidebar from './componentes/Sidebar.vue';
import TopHeader from './componentes/TopHeader.vue';
import MandatarioModal from './componentes/MandatarioModal.vue';
// Podrías añadir lógica de autenticación aquí o en el router guard
import { useAuthStore } from './auth.js';

export default {
  name: 'App',
  components: {
    Sidebar,
    TopHeader,
    MandatarioModal,
  },
  setup() {
    const authStore = useAuthStore();
    
    // El checkAuthentication original se convierte en un router guard 
    // o se ejecuta aquí para inicializar el estado
    if (!authStore.isAuthenticated) {
      // Redirigir al login si no está autenticado
      // Esto se maneja mejor con Vue Router Global Guards
    }
  }
};
</script>

<style>
/* Estilos principales para .app-container y el layout general (flex/grid) */
</style>
