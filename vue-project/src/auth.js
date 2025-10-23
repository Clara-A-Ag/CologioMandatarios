import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    loadSession() {
      const sessionData = sessionStorage.getItem("userSession") || localStorage.getItem("userSession");
      if (sessionData) {
        this.user = JSON.parse(sessionData);
      }
    },
    login(username, password, remember) {
      // Lógica de validación del script.js
      const validUsers = { admin: "santafe", santafe: "santafe" };

      if (validUsers[username] && validUsers[username] === password) {
        this.user = { username, loginTime: new Date().toISOString() };
        
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem("userSession", JSON.stringify(this.user));
        
        // Simular la redirección (en Vue, esto lo manejaría el componente)
        return true; 
      }
      return false;
    },
    logout() {
      sessionStorage.removeItem("userSession");
      localStorage.removeItem("userSession");
      this.user = null;
    }
  }
});