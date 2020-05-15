<template>
  <nav class="navigation">
    <ul class="navigation__list">
      <li v-for="(link, index) in menu" :key="'link-' + index" class="navigation__list-item">
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
  }
}
</script>

<style lang="scss"> 
  .navigation {
    width: 100%;

    &__list {
      list-style: none;
      padding: 0;
    }

    &__list-item {
      a {
        padding: 10px 25px;
        display: block;
        color: $color-black;
      }
    }
  }
</style>