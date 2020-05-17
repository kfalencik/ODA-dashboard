<template>
  <section class="container">
    <h1>History</h1>
    <div class="history" v-if="queryHistory.length">

      <div class="history__filters">
        <label>Sort by
          <select class="input" @change="sortHistory()" v-model="sorting">
            <option value="date">Date</option>
            <option value="words">Words total</option>
            <option value="results">Results total</option>
            <option value="runtime">Runtime</option>
          </select>
        </label>

        <label>Ordering
          <select class="input" @change="sortHistory()" v-model="ordering">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      <table v-if="queryHistory.length">
        <thead><th>#</th><th>Words (results)</th><th>Date/time</th><th>Query runtime</th><th>Results</th></thead>
        <tbody>
          <tr v-for="(item, index) in queryHistory" :key="'query-' + index">
            <td>{{index + 1}}</td>
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
  data() {
    return {
      sorting: 'date',
      ordering: 'asc',
      queryHistory: []
    }
  },
  mounted() {
    this.queryHistory = this.$store.state.history;
  },
  methods: {
    calculateResultsTotal(query) {
      let total = 0;
      query.words.forEach(item => {
        total += item.result.definitions.length;
      });

      return total;
    },
    sortHistory() {
      this.queryHistory = this.$store.state.history;

      switch (this.sorting) {
        case 'date':
          this.ordering === 'desc' ? this.queryHistory.sort((a, b) => (a.startTime < b.startTime) ? 1 : -1) : this.queryHistory.sort((a, b) => (a.startTime > b.startTime) ? 1 : -1);
          return;
        case 'words':
          this.ordering === 'desc' ? this.queryHistory.sort((a, b) => (a.words.length < b.words.length) ? 1 : -1) : this.queryHistory.sort((a, b) => (a.words.length > b.words.length) ? 1 : -1);
          return;
        case 'results':
          this.ordering === 'desc' ? this.queryHistory.sort((a, b) => (this.calculateResultsTotal(a).length < this.calculateResultsTotal(b).length) ? 1 : -1) : this.queryHistory.sort((a, b) => (this.calculateResultsTotal(a).length > this.calculateResultsTotal(b).length) ? 1 : -1);
          return;
        case 'runtime':
          this.ordering === 'desc' ? this.queryHistory.sort((a, b) => (a.time < b.time) ? 1 : -1) : this.queryHistory.sort((a, b) => (a.time > b.time) ? 1 : -1);
          return;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .history {
    &__filters {
      background: $color-tertiary;
      padding: rem(20);
      border: rem(1) solid $color-grey;
      margin-bottom: rem(25);
      display: flex;
      align-items: center;

      label {
        margin-right: rem(15);
      }
    }
  }
</style>