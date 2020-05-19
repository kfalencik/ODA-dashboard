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
    align-items: center;
    justify-content: center;
    padding: rem(15) 0;
    background: $color-tertiary;
    border-bottom: rem(1) solid $color-grey;

    @media (min-width: $screen-large) {
      height: 100vh;
      min-width: rem(300);
      padding: rem(20) 0;
      flex-direction: column;
      border: none;
      justify-content: start;
      position: fixed;
    }

    img {
      width: auto;
      height: 50px;

      @media (min-width: $screen-large) {
        width: 200px;
        height: auto;
      }
    }
  }
</style>