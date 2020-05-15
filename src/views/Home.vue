<template>
  <div class="container">
    <h1>Welcome to ODA dashboard</h1>
    <p>An Owlbot Disctionary API app that lets you look up words and their definitions. This app will also display statistics and keep track of your query history.</p>
    <router-link class="button button--primary" to="/queries">Make a query</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
