import Vue from 'vue';
import Vuex from 'vuex';
import Owlbot from 'owlbot-js';

// Owlbot connection (This API key should be hidden using ENV variables for production and it's only visible here for demonstration purposes)
const owlbot = Owlbot('5280aef0e64aaba62479086168b956b1d3d557e2');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userWords: [],
    currentWords: [],
    currentQuery: null,
    history: [],
    statTotalQueries: 0,
    statTotalResults: 0
  },
  mutations: {
    // Universal field mutatation
    setField(state, data) {
      state[data[0]] = data[1];
    },
    addHistoryEntry(state, entry) {
      state.history.push(entry);
    },
    addUserWord(state, word) {
      state.userWords.push(word.toLowerCase());
    },
    removeUserWord(state, word) {
      state.userWords = state.userWords.filter(userWord => userWord !== word);
    }
  },
  actions: {
    async lookupWords(context, words = false) {
      if (words) {
        // If user entered words use these, instead of generating them
        context.commit('setField', ['currentWords', words]);
        
      } else {
        // Fake word generator
        const generatedWords = ['cat', 'owl', 'dog', 'meow', 'hoot', 'bark', 'ship', 'anchor', 'car', 'engine']
        context.commit('setField', ['currentWords', generatedWords]);
      }
      
      // Initial query values
      let queryHistory = {
        startTime: new Date(),
        words: []
      }

      // Query owlbot per each word to get results
      const owlQuery = async () => {

        // Turn each request to async promise
        const promises = context.state.currentWords.map(async (word) => { 
          await owlbot.define(word).then(result => {
            if (result.definitions) {
              console.log(word, result);
            
              // History entry
              queryHistory.words.push({
                word: word,
                result: result
              });

              // Increment statistics
              context.commit('setField', ['statTotalQueries', context.state.statTotalQueries + 1]);
              context.commit('setField', ['statTotalResults', context.state.statTotalResults + result.definitions.length]);
            }
          });
        });

        // Wait for all requests to finish before continuing
        await Promise.all(promises);

        if (queryHistory.words.length) {
          // Get end time
          queryHistory.endTime = new Date();

          // Time difference in seconds
          queryHistory.time = Math.round(queryHistory.endTime - queryHistory.startTime) / 1000;

          // Add query to history and set as current
          context.commit('addHistoryEntry', queryHistory);
          context.commit('setField', ['currentQuery', queryHistory]);
        }
      }

      owlQuery();
    }
  }
})
