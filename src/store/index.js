import Vue from 'vue';
import Vuex from 'vuex';
import Owlbot from 'owlbot-js';

// Owlbot connection (This API key should be hidden using ENV variables for production and it's only visible here for demonstration purposes)
const owlbot = Owlbot('5280aef0e64aaba62479086168b956b1d3d557e2');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentWords: ['cat', 'owl', 'dog', 'meow', 'hoot', 'bark', 'ship', 'anchor', 'car', 'engine'],
    currentQueries: [],
    history: [],
    statTotalQueries: 0,
    statTotalWords: 0,
    statTotalResults: 0
  },
  mutations: {
    // Universal field mutatation
    setField(state, data) {
      state[data[0]] = data[1];
    }

    // Will need more mutations for objects in the future
  },
  actions: {
    async askOwl(context, word) {
      await owlbot.define(word).then(function(result){
        console.log(result);
        context.commit('setField', ['statTotalQueries', context.state.statTotalQueries + 1]);
      });
    }
  }
})
