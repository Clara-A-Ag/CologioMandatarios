import { createApp } from 'vue'
import App from './App.vue'
// 1. Importa la función 'createPinia'
import { createPinia } from 'pinia' 
import './assets/style.css'; // Asegúrate de que esta ruta sea correcta

// Inicializa la aplicación
const app = createApp(App)

// 2. Crea la instancia de Pinia
const pinia = createPinia()

// 3. Usa Pinia en la aplicación Vue
app.use(pinia)

// Monta la aplicación
app.mount('#app')