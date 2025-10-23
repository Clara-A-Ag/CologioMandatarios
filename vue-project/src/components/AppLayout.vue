<template>
  <div class="app-layout">
    <Sidebar /> 
    
    <div class="main-content">
      <TopHeader /> 
      
      <main class="page-content">
        <slot></slot> 
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue';
import TopHeader from './TopHeader.vue';

export default {
  name: 'AppLayout',
  components: {
    Sidebar,
    TopHeader,
  },
};
</script>

<style scoped>
/* Contenedor de la aplicación */
.app-container {
  display: flex;
  min-height: 100vh;
}

/* Contenido principal */
.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.page-content {
    /* Aquí se coloca el contenido específico de la vista */
    padding: 0; /* Ya tenemos padding en main-content */
}

/* Responsivo */
@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
  }

  /* La Sidebar pasa a ser un menú móvil oculto */
  .sidebar {
    width: 100%;
    position: fixed;
    top: 0;
    left: -100%;
    height: 100vh;
    z-index: 1000;
    transition: left 0.3s ease;
  }
  .sidebar.active {
    left: 0;
  }
  
  .main-content {
    padding: 1rem;
  }
}
</style>