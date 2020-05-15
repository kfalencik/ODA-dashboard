<template>
  <section class="container">
    <h1>History</h1>
    <div class="history" v-if="history.length">
      <table>
        <thead><th>Word</th><th>Date/time</th><th>Results</th></thead>
        <tbody>
          <tr v-for="(item, index) in history" :key="'word-' + index">
            <td>{{item.result.definitions[0].emoji}} {{item.word | capitalize}}</td>
            <td>{{item.timestamp | dateFromatter}}</td>
            <td>{{item.result.definitions.length}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <p>Query history is empty at the moment. Please make some queries first and come back later.</p>
      <router-link class="button" to="/queries">Make a query</router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'History',
  computed: {
    history() {
      return this.$store.state.history;
    }
  }
}
</script>
