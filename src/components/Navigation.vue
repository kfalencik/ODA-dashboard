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
      margin: 30px 25px;
    }

    &__list-item {
      a {
        margin: 15px 0;
        padding: 2px 0;
        display: block;
        color: $color-black;
        font-weight: 500;
        border-bottom: 1px solid transparent;
      }

      &--active {
        a {
          border-color: $color-black;
        }
      }
    }
  }
</style>