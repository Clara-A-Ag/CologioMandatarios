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
/* Container that centers the login box vertically and horizontally */
.login-container {
  background: linear-gradient(135deg, var(--color-login-bg-start) 0%, var(--color-login-bg-end) 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

/* The box that contains the form */
.login-box {
  max-width: 600px;
  width: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
}

/* Optional header styles (no h1 in template but kept for possible future use) */
.login-header {
  text-align: center;
  margin-bottom: 1rem;
  color: inherit;
}
.login-header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.3;
}

/* Lock icon and title inside the box */
.lock-icon {
  color: var(--color-primary);
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}

/* Title shown in the template (h2) */
.login-box h2 {
  font-size: 1.25rem;
  color: var(--color-text-dark);
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
}

/* Form layout */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.form-group input[type="text"],
.form-group input[type="password"] {
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--color-border, #ddd);
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
}

/* Checkbox group used in the template */
.checkbox-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.checkbox-group input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.checkbox-group label {
  cursor: pointer;
  user-select: none;
}

/* Button full width */
.btn.full-width {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
}

/* Help / footer area */
.login-help {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border, #eee);
  font-size: 0.9rem;
  color: var(--color-text-subtle);
}

.login-help p {
  margin-bottom: 0.75rem;
}

.login-help ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.login-help li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.login-help li:before {
  content: "•";
  position: absolute;
  left: 0.5rem;
  color: var(--color-primary);
  font-weight: bold;
}
</style>