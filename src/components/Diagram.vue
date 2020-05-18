<template>
  <div class="diagram">
    <h3 class="h3">{{title}}</h3>
    <div class="diagram__item">
      <div class="diagram__value diagram__value--total">{{total}}</div>
      <div class="diagram__label">{{labels[0]}}</div>
    </div>
    <div v-for="(value, index) in values" :key="`diagram-value-${index}`" class="diagram__item">
      <div class="diagram__value" :class="{'diagram__value--empty': !value}" :style="`width: ${calculateWidth(value)}%`">{{value}} <em>({{calculateWidth(value)}}%)</em></div>
      <div class="diagram__label">{{labels[index + 1]}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Diagram',
  props: [
    'title',
    'total',
    'values',
    'labels'
  ],
  methods: {
    calculateWidth(value) {
      return Math.floor(value / this.total * 100);
    }
  }
}
</script>

<style lang="scss" scoped>
  .diagram {
    width: 800px;
    background-color: $color-tertiary;
    padding: 20px;

    &__item {
      margin: rem(10) 0;
    }

    &__value {
      background: $color-secondary;
      color: $color-white;
      padding: rem(10) rem(15);
      min-width: 80px;

      &--total {
        background: $color-primary;
      }

      &--empty {
        background: lighten($color-secondary, 30%);
      }
    }
  }
</style>