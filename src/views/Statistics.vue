<template>
  <section class="container">
    <h1>Statistics</h1>
    <div class="statistics">
      <div class="statistics__item">
        Total queries made: <strong>{{totalQueries}}</strong>
      </div>

      <div class="statistics__item">
        Total results found: <strong>{{totalResults}}</strong>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Statistics',
  computed: {
    totalQueries() {
      return this.$store.state.statTotalQueries;
    },
    totalResults() {
      return this.$store.state.statTotalResults;
    }
  }
}
</script>
