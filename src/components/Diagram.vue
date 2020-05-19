<template>
  <div class="diagram" v-if="values.length && total">
    <h3 class="h3" v-if="title">{{title}}</h3>
    <div class="diagram__item">
      <div class="diagram__value diagram__value--total">{{total}}</div>
      <div class="diagram__label" v-if="labels[0]">{{labels[0]}}</div>
    </div>
    <div v-for="(value, index) in values" :key="`diagram-value-${index}`" class="diagram__item">
      <div class="diagram__value" :class="{'diagram__value--empty': !value}" :style="`width: ${calculateWidth(value)}%`">{{value}} <em>({{calculateWidth(value)}}%)</em></div>
      <div class="diagram__label" v-if="labels[index + 1]">{{labels[index + 1]}}</div>
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
      // Get percentage against the total value
      return Math.floor(value / this.total * 100);
    }
  }
}
</script>

<style lang="scss" scoped>
  .diagram {  
    background-color: $color-tertiary;
    padding: rem(20);
    margin: rem(20) 0;
    flex: 1;
    border: rem(1) solid $color-grey;

    @media (min-width: $screen-medium) {
      margin: rem(20) rem(20) rem(20) 0;
    }

    &:last-child {
      margin-right: 0;
    }

    &__item {
      margin-bottom: rem(15);
    }

    &__value {
      background: $color-secondary;
      color: $color-white;
      padding: rem(10) rem(15);
      min-width: 80px;
      max-width: 100%;
      margin-bottom: rem(5);

      &--total {
        background: $color-primary;
      }

      &--empty {
        background: lighten($color-secondary, 30%);
      }
    }
  }
</style>