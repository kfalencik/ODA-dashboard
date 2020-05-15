<template>
  <main id="app">
    <Sidebar />
    <router-view />
  </main>
</template>

<script>
import Sidebar from '@/components/Sidebar';

export default {
  components: {
    Sidebar
  },
  mounted() {
    this.$store.dispatch('askOwl', 'cat'); 
  }
}
</script>

<style lang="scss" scoped>
  #app {
    display: flex;
  }
</style>