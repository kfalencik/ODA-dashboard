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
    min-width: rem(300);
    padding: rem(20) 0;
    background: $color-tertiary;
  }
</style>