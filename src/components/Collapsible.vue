<template>
  <div class="collapsible">
    <button @click="collapsible = !collapsible">{{word | capitalize}}</button>
    <div class="collapsible__body" v-if="collapsible">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'word'
  ],
  data() {
    return {
      collapsible: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .collapsible {
    margin-bottom: rem(10);

    button {
      display: block;
      width: 100%;
      background-color: $color-primary;
      color: $color-white;
      padding: rem(15);
      text-align: left;
      border: none;
     
      cursor: pointer;
    }

    &__body {
      background: $color-tertiary;
      padding: rem(20);
      border: rem(1) solid $color-grey;
    }
  }
</style>