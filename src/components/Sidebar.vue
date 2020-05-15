<template>
  <div class="sidebar">
    <img :src="require('@/assets/images/logo.png')" width="200" alt="Logo" />

    <Navigation />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';

export default {
  components: {
    Navigation
  }
}
</script>

<style lang="scss" scoped>
  .sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 300px;
    background: $color-tertiary;
  }
</style>