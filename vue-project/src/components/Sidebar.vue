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
/* Barra lateral */
.sidebar {
  width: 280px;
  background: var(--color-sidebar);
  color: white;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
  padding: 0 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.sidebar-nav {
  flex: 1;
  padding: 1.5rem 0;
}

.nav-section {
  margin-bottom: 2rem;
}

.nav-section h3 {
  font-size: 0.75rem;
  font-weight: 600;
  color: #e7e7e7;
  padding: 0 1.5rem;
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: #ffff;
  text-decoration: none;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.nav-link.active {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-left-color: var(--color-primary);
}
</style>