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
.app-layout {
  display: flex;
  width: 100%;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.page-content {
  padding: 20px;
  flex-grow: 1;
}
</style>