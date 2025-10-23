<template>
<div id="app">
    <template v-if="isLoggedIn">
      <DashboardPage />
    </template>
    <template v-else>
      <LoginPage @login-success="isLoggedIn = true" />
    </template>
</div>
</template>

<script>
// Importa las vistas (páginas)
import LoginPage from './views/LoginPage.vue';
import DashboardPage from './views/DashboardPage.vue';

export default {
  name: 'App',
  components: {
    LoginPage,
    DashboardPage,
  },
  data() {
    return {
      // Simulación de estado de sesión. En un proyecto real, se usaría un Pinia Store de Auth.
      isLoggedIn: false, 
    };
  }
};
</script>

<style>
/* El estilo base ya está en styles.css. Aquí solo si hubiera estilos específicos de #app */
</style>