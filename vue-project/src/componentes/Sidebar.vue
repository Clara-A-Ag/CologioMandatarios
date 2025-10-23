<template>
  <aside class="sidebar">
    <div class="logo-container">
      <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
      </svg>
      <span>Mandatarios</span>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section-title">MANDATARIOS</div>
      <a href="#" class="nav-item active">Santa Fe</a>

      <div class="nav-section-title">IMPORTACIÓN MASIVA</div>
      <a href="#" class="nav-item">Santa Fe</a>

      <div class="nav-section-title">IMPORTACIÓN FOTOS</div>
      <a href="#" class="nav-item">Santa Fe</a>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: var(--color-sidebar); 
  color: var(--color-text-light);
  /* ... (Estilos de Sidebar, igual que en la respuesta anterior) ... */
  padding: 20px 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}
.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
  margin-bottom: 20px;
} 
</style>