<template>
  <section class="container">
    <h1>Queries</h1>
    <p>There are two ways to make a query. You can either define your own set of words to query or use a random word generator instead, which will pick some random words for you.</p>

    <div class="queries">

      <div class="queries__results panel" v-if="currentQuery">
        <h2 class="h4">Results</h2>

        <div class="queries__results-item" v-for="(word, index) in currentQuery.words" :key="`results-word-${index}`">
          <Collapsible :word="`${word.word} (${word.result.definitions.length})`">
            <div v-if="word.result.pronunciation" class="queries__results-pronunciation">/{{word.result.pronunciation}}/</div>
            <div class="queries__results-definitions">
              <div class="queries__results-definitions-item" v-for="(definition, definitionIndex) in word.result.definitions" :key="`results-definition-${definitionIndex}`">
                <div class="queries__results-definition-body">
                  <strong>{{definition.type}}</strong>
                  <p>{{definition.definition}} {{definition.emoji}}</p>
                  Example: <em v-html="exampleQuote(definition.example)"></em>
                </div>
                <div class="queries__results-definition-image">
                  <img width="100" v-if="definition.image_url" :src="definition.image_url" :alt="`Example of ${word.word}`" />
                </div>
              </div>
            </div>
          </Collapsible>
        </div>
      </div>

      <div class="panel">
        <h2 class="h4">Define words</h2>
        <p>Use this method to define your list of words to query.</p>

        <div class="queries__word-cloud">
          <Tag v-for="(word, index) in userWords" :key="`word-${index}`" :word="word" :button="true" />
        </div>
        <input class="input" type="text" placeholder="Add a word" @keyup.prevent.stop="addWord($event)" v-model="currentWord" />
        <button class="button button--primary" :class="{'button--disabled': !userWords.length}" @click.prevent="submitWords">Submit words</button>
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
import Collapsible from '@/components/Collapsible';
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
    Tag,
    Collapsible
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
      // Submit user defined words
      this.$store.dispatch('lookupWords', this.userWords); 
    },
    exampleQuote(example) {
      return `"${example}"`;
    }
  }
}
</script>

<style lang="scss" scoped>
  .queries {

    &__word-cloud {
      margin-bottom: 20px;
    }

    input {
      display: block;
      margin-bottom: 20px;
    }

    &__results-definitions-item {
      padding: rem(20) 0;
      display: flex;
      justify-content: space-between;

      img {
        border-radius: 100%;
      }
    }
  }
</style>
