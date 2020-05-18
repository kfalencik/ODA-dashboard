<template>
  <section class="container">
    <h1>Statistics</h1>
    <div class="statistics">
      <div class="statistics__diagrams">
        <Diagram v-if="history.length" :title="'Queries made'" :total="history.length" :values="[customQueries(), history.length - customQueries()]" :labels="['Total queries made', 'Custom defined words', 'Randomly generated words']" />
        <Diagram v-if="totalWords" :title="'Queried words'" :total="totalWords" :values="[wordsWithResults(), totalWords - wordsWithResults()]" :labels="['Total words queried', 'Words with results', 'Words with no results']" />
      </div>

      <div class="statistics__item">
        Total time spent querying: <strong>{{totalTimeQuerying()}}s</strong>
      </div>

      <div class="statistics__item">
        Shortest query: <strong>{{shortestQuery()}}s</strong>
      </div>

      <div class="statistics__item">
        Longest query: <strong>{{longestQuery()}}s</strong>
      </div>

      <div class="statistics__item">
        Total results found: <strong>{{totalResults}}</strong>
      </div>

      <div class="statistics__item">
        Most results per word: <strong>{{mostResults()}}</strong>
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
    },
    customQueries() {
      let queries = 0;

      this.history.forEach(query => {
        if (query.type === 'custom') {
          queries++;
        }
      });
    
      return queries;
    },
    totalTimeQuerying() {
      return [...this.history].reduce((accumulator, currentValue) => accumulator + currentValue.time, 0);
    },
    shortestQuery() {
      return Math.min(...this.history.map(item => item.time));
    },
    longestQuery() {
      return Math.max(...this.history.map(item => item.time));
    },
    mostResults() {
      return Math.max(...this.history.map(query => Math.max(...query.words.map(word => {
        return word.result.definitions.length;
      }))));
    }
  }
}
</script>

<style lang="scss" scoped>
  .statistics {
    &__diagrams {
      display: flex;
    }

    &__item {
      margin: rem(10) 0;
    }
  }
</style>