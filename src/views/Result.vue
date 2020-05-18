<template>
  <section class="container" v-if="word.word">
    <h1>Reuslts for: {{ word.word | capitalize}} <span v-if="word.result.pronunciation" class="result__pronunciation">/{{word.result.pronunciation}}/</span></h1>
    <router-link :to="'/queries'" class="button">Back to results</router-link>

    <div class="result">
      <div class="result__filters" v-if="definitions.length > 1">
        <label>Search definitions
          <input class="input" type="text" v-model="filterDefinition" @keyup="filterResults">
        </label>

        <label>Type
          <select class="input" @change="filterResults" v-model="filterType">
            <option value="all">All</option>
            <option v-for="(type, index)  in types" :key="`type-${index}`" :value="type">{{type | capitalize}}</option>
          </select>
        </label>

        <label>Sort by
          <select class="input" @change="sortResults" v-model="sorting">
            <option value="type">Type</option>
            <option value="definition">Definition</option>
            <option value="example">Example</option>
          </select>
        </label>

        <label>Ordering
          <select class="input" @change="sortResults" v-model="ordering">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      
      <div class="result__definitions">
        <div class="result__definitions-item" v-for="(definition, definitionIndex) in word.result.definitions" :key="`definition-${definitionIndex}`">
          <div class="result__definition-body">
            <strong>{{definition.type | capitalize}}</strong>
            <p>{{definition.definition}} {{definition.emoji}}</p>
            <template v-if="definition.example">
              Example: <em v-html="exampleQuote(definition.example)"></em>
            </template>
          </div>
          <div class="result__definition-image">
            <img width="100" v-if="definition.image_url" :src="definition.image_url" :alt="`Example of ${word.word}`" />
          </div>
        </div>

        <p v-if="!word.result.definitions.length">Sorry there are no results matching your filter criteria. Please try aggain</p>
      </div>
    </div>

    <router-link :to="'/queries'" class="button">Back to results</router-link>
  </section>
</template>

<script>
export default {
  name: 'Result',
  data() {
    return {
      sorting: 'type',
      ordering: 'asc',
      filterType: 'all',
      filterDefinition: '',
      query: null,
      types: []
    }
  },  
  created() {
    if (!this.$store.state.currentQuery) {
      this.$router.push('/queries');
    }
  },
  computed: {
    definitions() {
      // Need to keep track of definitions
      const currentQuery = [...this.$store.state.currentQuery.words];
      return currentQuery.filter(item => item.word === this.$route.params.word)[0].result.definitions;
    },
    word() {
      // Set a new array value instead of the store variable reference
      const currentQuery = JSON.parse(JSON.stringify(this.$store.state.currentQuery.words));
      return currentQuery.filter(item => item.word === this.$route.params.word)[0];
    },
    resultsFilterType() {
      return this.$store.state.resultsFilterType;
    },
    resultsFilterDefinition() {
      return this.$store.state.resultsFilterDefinition;
    },
    resultsSorting() {
      return this.$store.state.resultsSorting;
    },
    resultsOrdering() {
      return this.$store.state.resultsOrdering;
    }
  },
  mounted() {
    // Find definition types
    const types = [];
    this.definitions.forEach(item => types.push(item.type));
    this.types = [...new Set(types)];

    // Apply last type filter selection if still available
    if (this.types.includes(this.resultsFilterType)) {
      this.filterType = this.resultsFilterType;
    }

    // Apply last keyword search
    this.filterDefinition = this.resultsFilterDefinition;

    // Apply last sorting options
    this.sorting = this.resultsSorting;
    this.ordering = this.resultsOrdering;

    // Initial filtering and sorting
    this.filterResults();
    this.sortResults();
  },
  methods: {
    exampleQuote(example) {
      return `"${example}"`;
    },
    filterResults() {
        // Get original data so we can re-filter results
        let query = this.definitions;

        // Keep track of selected filtering options
        this.$store.commit('setField', ['resultsFilterType', this.filterType]);
        this.$store.commit('setField', ['resultsFilterDefinition', this.filterDefinition]);

        // Brief mentions filtering by definition which I asumme means to search by keyword
        if (this.filterDefinition.replace(/\s/g, '').length) {
          query = this.definitions.filter(item => {
            return item.definition.toLowerCase().includes(this.filterDefinition);
          });
        }

        // Filter by definition type
        if (this.filterType !== 'all') {
          query = query.filter(item => {
            return item.type === this.filterType;
          });
        }

        // Set filtered results and force component update (since we're dealing with multidimensional object vue has trouble detecting changes)
        this.word.result.definitions = query; 
        this.$forceUpdate();
        
        // Use current sort settings
        this.sortResults();
    },
    sortResults() {
      // Keep track of selected filtering options
      this.$store.commit('setField', ['resultsSorting', this.sorting]);
      this.$store.commit('setField', ['resultsOrdering', this.ordering]);
      
      // Sort and order results
      switch (this.sorting) {
        case 'type':
          this.ordering === 'desc' ? this.word.result.definitions.sort((a, b) => (a.type < b.type) ? 1 : -1) : this.word.result.definitions.sort((a, b) => (a.type > b.type) ? 1 : -1);
          return;
        case 'definition':
          this.ordering === 'desc' ? this.word.result.definitions.sort((a, b) => (a.definition < b.definition) ? 1 : -1) : this.word.result.definitions.sort((a, b) => (a.definition > b.definition) ? 1 : -1);
          return;
        case 'example':
          this.ordering === 'desc' ? this.word.result.definitions.sort((a, b) => (a.example < b.example) ? 1 : -1) : this.word.result.definitions.sort((a, b) => (a.example > b.example) ? 1 : -1);
          return;
        case 'runtime':
          this.ordering === 'desc' ? this.word.result.definitions.sort((a, b) => (a.time < b.time) ? 1 : -1) : this.word.result.definitions.sort((a, b) => (a.time > b.time) ? 1 : -1);
          return;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .result {
    &__pronunciation {
      color: $color-grey;
      margin-bottom: rem(25);
    }

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

    &__definitions {
      border: rem(1) solid $color-grey;
      border-radius: rem(10);
      padding: rem(25);
      box-shadow: rem(6) rem(6) rem(6) lighten($color-black, 80%);
    }

    &__definitions-item {
      padding: rem(20) 0;
      display: flex;
      justify-content: space-between;
      border-bottom: solid 1px #e6e6e6;

      &:last-child {
        border-bottom: none;
      }

      img {
        border-radius: 100%;
      }
    }
  }

  .button {
    margin: rem(15) 0;
  }
</style>