<template>
  <div class="container">
    <h1>Queries</h1>
    <button @click="generateWords">Generate new words</button>
  </div>
</template>

<script>
export default {
  name: 'Queries',
  methods: {
    generateWords() {
      this.$store.dispatch('generateWords'); 
    }
  }
}
</script>
