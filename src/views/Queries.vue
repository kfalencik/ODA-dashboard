<template>
  <section class="container">
    <h1>Queries</h1>
    <p>There are two ways to make a query. You can either define your own set of words to query or use a random word generator instead, which will pick some random words for you.</p>

    <div class="queries">

      <div class="queries__results panel" v-if="currentQuery">
        <h2 class="h4">Results</h2>
        <p>We found these results for your queried words. Please click on any of the links below to find out more.</p>
        <nav>
          <ol>
            <li v-for="(word, index) in currentQuery.words" :key="`results-word-${index}`">
              <router-link :to="`/queries/${word.word}`">{{word.word | capitalize}}</router-link>
            </li>
          </ol>
        </nav>
      </div>

      <div class="panel">
        <h2 class="h4">Define words</h2>
        <p>Use this method to define your list of words to query.</p>

        <div class="queries__word-cloud">
          <Tag v-for="(word, index) in userWords" :key="`word-${index}`" :word="word" :button="true" />
        </div>
        <input class="queries__word-input input" type="text" placeholder="Add a word" @keyup.prevent.stop="addWord($event)" v-model="currentWord" />
        <button class="button button--primary" :class="{'button--disabled': !userWords.length}" @click.prevent="submitWords">Submit words</button>
        <button class="button button--secondary" :class="{'button--disabled': !userWords.length}" @click.prevent="clearWords">Clear all</button>
      </div>

      <div class="panel">
        <h2 class="h4">Generate words</h2>
        <p>Use this method to generate a random set of words to query.</p>
        <button class="button button--primary" @click.stop="generateWords">Generate new words</button>
      </div>
    </div>  
  </section>
</template>

<script>
import Tag from '@/components/Tag';

export default {
  name: 'Queries',
  data() {
    return {
      currentWord: ''
    }
  },
  computed: {
    currentQuery() {
      return this.$store.state.currentQuery;
    },
    userWords() {
      return this.$store.state.userWords;
    }
  },
  components: {
    Tag
  },
  methods: {
    addWord(event) {
      // Allow only letters, hyphens and spaces
      if (this.currentWord === '') {
        return;
      }
      
      // If any return keys pressed
      if (event.key === 'Enter' || event.code === 'Enter' || event.keyCode === 13 || event.key === ',' || event.code === 'Comma' || event.keyCode === 188) {
        // If the word wasn't entered before and isn't just whitespace
        if (!this.userWords.includes(this.currentWord.toLowerCase()) && this.currentWord.replace(/\s/g, '').length) {
          // Submit new word
          this.$store.commit('addUserWord', this.currentWord);
        }

        // Empty input field
        this.currentWord = '';
      }
    },
    generateWords() {
      // Generate random words
      this.$store.dispatch('lookupWords'); 
    },
    submitWords() {
      if (this.userWords.length) {
        // Check if the last word was added properly
        if (!this.userWords.includes(this.currentWord.toLowerCase()) && this.currentWord.replace(/\s/g, '').length) {
          // Submit new word
          this.$store.commit('addUserWord', this.currentWord);
        }

        // Empty input field
        this.currentWord = '';

        // Submit user defined words
        this.$store.dispatch('lookupWords', this.userWords); 
      } 
    },
    clearWords() {
      // Submit user defined words
      this.$store.commit('setField', ['userWords', []]);
    }
  }
}
</script>

<style lang="scss" scoped>
  .queries {

    &__word-cloud {
      margin-bottom: 20px;
    }

    &__word-input {
      display: block;
      margin-bottom: 20px;
    }

    button {
      margin-right: rem(15);
    }
  }
</style>
