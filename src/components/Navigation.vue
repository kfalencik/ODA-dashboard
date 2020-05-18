<template>
  <nav class="navigation">
    <ul class="navigation__list">
      <li v-for="(link, index) in menu" :key="'link-' + index" class="navigation__list-item" :class="activeMenuItem === link.title ? 'navigation__list-item--active' : ''">
        <router-link :to="link.path">{{link.title}}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          title: 'Home',
          path: '/'
        },
        {
          title: 'Queries',
          path: '/queries'
        },
        {
          title: 'Statistics',
          path: '/statistics'
        },
        {
          title: 'History',
          path: '/history'
        }
      ]
    }
  },
  computed: {
    activeMenuItem() {
      // Find active route and set as active
      return this.$route.name;
    }
  }
}
</script>

<style lang="scss"> 
  .navigation {
    width: 100%;

    &__list {
      list-style: none;
      padding: 0;
      margin: rem(30) rem(25);
    }

    &__list-item {
      a {
        margin: rem(15) 0;
        padding: rem(2) 0;
        display: block;
        color: $color-black;
        font-weight: 300;
        border-bottom: rem(1) solid transparent;
      }

      &--active {
        a {
          border-color: lighten($color-black, 40%);
        }
      }
    }
  }
</style>