<template>
  <div class="container">
    <h1>History</h1>
    <div class="history">
      <table>
        <thead><th>Word</th><th>Date/time</th><th>Results</th></thead>
        <tbody>
          <tr v-for="(item, index) in history" :key="'word-' + index">
            <td>{{item.word}}</td>
            <td>{{item.timestamp}}</td>
            <td>{{item.result.definitions.length}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'History',
  computed: {
    history() {
      return this.$store.state.history;
    }
  }
}
</script>
