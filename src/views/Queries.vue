<template>
  <div class="container">
    <h1>Queries</h1>
    <p>Please enter words you want to query or use to generate words button to use random set of words</p>
    <button @click="generateWords">Generate new words</button>
  </div>
</template>

<script>
export default {
  name: 'Queries',
  data() {
    return {
      userWords: []
    }
  },
  methods: {
    generateWords() {
      // Generate random words
      this.$store.dispatch('lookupWords'); 
    },
    submitWords(words) {
      // Submit user defined words
      this.$store.dispatch('lookupWords', userWords); 
    }
  }
}
</script>
