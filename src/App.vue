<template>
  <main id="app">
    <Sidebar />
    <router-view />
    <loading v-if="loading" />
  </main>
</template>

<script>
import Sidebar from '@/components/Sidebar';
import Loading from '@/components/Loading';

export default {
  components: {
    Sidebar,
    Loading
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  }
}
</script>

<style lang="scss" scoped>
  #app {
    display: flex;
  }
</style>