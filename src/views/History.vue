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

      <p>{{ queryHistory.length }} results. Page {{historyPage}} out of {{historyPages}}

      <div class="history__pager" v-if="historyPages > 1">
        <nav>
          <a disabled="disabled" class="button" :class="{'button--primary': historyPage === index + 1}" v-for="(page, index) in historyPages" :key="`pager-${index}`" @click="changePage(index + 1)">{{index + 1}}</a>
        </nav>
      </div>

      <div class="history__results">
        <table v-if="queryHistory.length">
          <thead><th>#</th><th>Words (results)</th><th>Date/time</th><th>Query runtime</th><th>Results</th></thead>
          <tbody>
            <tr v-for="(item, index) in queryHistory" :key="'query-' + index">
              <template v-if="(index + 1 <= historyPage*itemsPerPage) && (index + 1 > (historyPage * itemsPerPage) - itemsPerPage)">
                <td>{{index + 1}}</td>
                <td>
                  <ol>
                    <li v-for="(word, wordIndex) in item.words" :key="'word-' + wordIndex">
                      <span v-if="word.result.definitions.length">{{word.result.definitions[0].emoji}}</span>
                      {{word.word | capitalize}} ({{word.result.definitions.length}})</li>
                  </ol>
                </td>
                <td>{{item.startTime | dateFromatter}}</td>
                <td>{{item.time}}s</td>
                <td>{{calculateResultsTotal(item)}}</td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="history__pager" v-if="historyPages > 1">
        <nav>
          <a disabled="disabled" class="button" :class="{'button--primary': historyPage === index + 1}" v-for="(page, index) in historyPages" :key="`pager-${index}`" @click="changePage(index + 1)">{{index + 1}}</a>
        </nav>
      </div>
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
      historyPage: 1,
      itemsPerPage: 10
    }
  },
  computed: {
    queryHistory() {
      return [...this.$store.state.history];
    },
    historyPages() {
      return Math.ceil(this.queryHistory.length / this.itemsPerPage);
    }
  },
  methods: {
    calculateResultsTotal(query) {
      let total = 0;
      query.words.forEach(item => {
        total += item.result.definitions.length;
      });

      return total;
    },
    changePage(page) {
      // Set a new page number
      this.historyPage = page;

      // Scroll to the top of the page so user can see the new result set
      window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
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
    &__results {
      overflow: auto;
    }

    &__filters {
      background: $color-tertiary;
      padding: rem(20);
      border: rem(1) solid $color-grey;
      margin-bottom: rem(25);
      display: flex;
      align-items: flex-end;
      flex-direction: column;

      @media (min-width: $screen-large) {
        align-items: center;
        flex-direction: row;
        align-items: center;
      }

      label {
        width: 100%;
        margin-bottom: rem(15);

        @media (min-width: $screen-large) {
          margin: 0 rem(15) 0 0;
          width: auto;
        }
      }

      .input {
        width: 100%;
        margin-top: rem(5);

        @media (min-width: $screen-large) {
          width: auto;
          margin-top: 0;
        }
      }
    }

    &__pager {
      margin: rem(25) 0;

      nav {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        a {
          margin: 0 rem(2);
        }
      }
    }
  }
</style>