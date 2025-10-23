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
.top-header {
  height: 60px;
  background-color: var(--color-text-light);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: flex-end; 
  align-items: center;
  padding: 0 20px;
}
.header-placeholder {
    flex-grow: 1;
}
</style>