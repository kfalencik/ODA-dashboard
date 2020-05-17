<template>
  <section class="container">
    <h1>History</h1>
    <div class="history" v-if="history.length">
      <table>
        <thead><th>Words (results)</th><th>Date/time</th><th>Query runtime</th><th>Results</th></thead>
        <tbody>
          <tr v-for="(item, index) in history" :key="'query-' + index">
            <td>
              <ol>
                <li v-for="(word, wordIndex) in item.words" :key="'word-' + wordIndex">{{word.result.definitions[0].emoji}} {{word.word | capitalize}} ({{word.result.definitions.length}})</li>
              </ol>
            </td>
            <td>{{item.startTime | dateFromatter}}</td>
            <td>{{item.time}}s</td>
            <td>{{calculateResultsTotal(item)}}</td>
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
  },
  methods: {
    calculateResultsTotal(query) {
      let total = 0;
      query.words.forEach(item => {
        total += item.result.definitions.length;
      });

      return total;
    }
  }
}
</script>
