<template>
  <div class="statistic" v-if="label && value">
    {{label}}: <strong>{{value | capitalize}}</strong>
  </div>
</template>

<script>
export default {
  name: 'Statistic',
  props: [
    'value',
    'label'
  ]
}
</script>

<style lang="scss" scoped>
  .statistic {
    margin: rem(10) 0;
  }
</style>