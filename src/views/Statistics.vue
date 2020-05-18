<template>
  <section class="container">
    <h1>Statistics</h1>
    <div class="statistics">
      <Diagram :title="'Queried words'" :total="totalWords" :values="[wordsWithResults(), totalWords - wordsWithResults()]" :labels="['Total words queried', 'Words with results', 'Words with no results']" />

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
import Diagram from '@/components/Diagram';

export default {
  name: 'Statistics',
  components: {
    Diagram
  },
  computed: {
    totalQueries() {
      return this.$store.state.statTotalQueries;
    },
    totalWords() {
      return this.$store.state.statTotalWords;
    },
    totalResults() {
      return this.$store.state.statTotalResults;
    },
    history() {
      return this.$store.state.history;
    }
  },
  methods: {
    wordsWithResults() {
      let words = 0;

      this.history.forEach(query => {
        query.words.forEach(word => {
          if (word.result.definitions.length) {
            words++;
          }
        })
      });
    
      return words;
    }
  }
}
</script>
