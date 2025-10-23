<template>
  <div class="login-container">
    <div class="login-box">
      <div class="lock-icon">
        <svg fill="currentColor" viewBox="0 0 20 20" width="30" height="30">
          <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2V7a5 5 0 00-5-5zm-5 7v2h10V9H5zm3 0h4V7a2 2 0 00-4 0v2z"/>
        </svg>
      </div>
      <h2>Identificate para utilizar el sistema</h2>

      <form @submit.prevent="login">
        <div class="form-group">
          <label for="usuario">Usuario</label>
          <input type="text" id="usuario" v-model="username" required>
        </div>
        
        <div class="form-group">
          <label for="clave">Clave</label>
          <input type="password" id="clave" v-model="password" required>
        </div>

        <div class="checkbox-group">
          <input type="checkbox" id="recordarme" v-model="rememberMe">
          <label for="recordarme">Recordarme</label>
        </div>
        
        <button type="submit" class="btn btn-primary full-width">Ingresar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  emits: ['login-success'],
  data() {
    return {
      username: '',
      password: '',
      rememberMe: false,
    };
  },
  methods: {
    login() {
      // Lógica de autenticación real aquí...
      if (this.username && this.password) {
        this.$emit('login-success'); // Emite el evento para que App.vue cambie la vista
      }
    }
  }
};
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: var(--color-primary); /* Fondo azul de la imagen 1 */
}
/* ... (Estilos del Login Box, igual que en la respuesta anterior) ... */
.login-box {
    background-color: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
}

.lock-icon {
    color: var(--color-primary);
    margin-bottom: 20px;
}

h2 {
    margin-top: 0;
    margin-bottom: 30px;
    font-size: 1.4em;
    color: #333;
}

.form-group {
    text-align: left;
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
}

.checkbox-group {
    text-align: left;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
}

.checkbox-group label {
    margin-left: 8px;
    font-weight: normal;
}

.full-width {
    width: 100%;
}
</style>