<template>
  <header class="top-header">
    <div class="header-placeholder">
        </div>
    <UserDropdown />
  </header>
</template>

<script>
import UserDropdown from './UserDropdown.vue';

export default {
  name: 'TopHeader',
  components: {
    UserDropdown,
  },
}
</script>

<style scoped>
/* top-header no tiene un estilo definido en el CSS que proporcionaste, lo creamos para el layout. */
.top-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 0 1rem 0;
}

.header-placeholder {
    flex-grow: 1;
}

/* Estilos específicos de UserDropdown (movidos aquí para evitar el conflicto con el nombre de clase) */
.user-menu {
  position: relative;
}
</style>