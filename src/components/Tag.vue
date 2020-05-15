<template>
  <div class="tag tag--cool">
    <span class="tag__label">{{word}}</span>
    <span class="tag__remover" @click.prevent.stop="removeWord" >x</span>
  </div>
</template>

<script>
export default {
  props: [
    'word'
  ],
  methods: {
    removeWord() {
      this.$store.commit('removeUserWord', this.word);
    }
  }
}
</script>

<style lang="scss" scoped>
  .tag {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    line-height: 1.75em;
    width: auto;
    color: $color-white;
    border-radius: 1px;
    font-weight: 500;
    margin-right: rem(10);
    font-weight: 100;

    * {
      background-color: lighten($color-primary, 20%);
    }

    &__label {
      padding: 0 rem(10);
      color: inherit;
      width: 100%;
    }

    &__remover {
      color: $color-white;
      margin-left: rem(2);
      padding: 0 rem(5);
      cursor: pointer;
    }
  }
</style>