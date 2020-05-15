<template>
  <main id="app" class="container">
    <Sidebar />
    <router-view />
  </main>
</template>

<script>
import Sidebar from '@/components/Sidebar';

export default {
  components: {
    Sidebar
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
  }
</style>
