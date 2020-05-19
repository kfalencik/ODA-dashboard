<template>
  <nav class="navigation">
    <button class="navigation__trigger button button--primary" @click="menuToggle">Menu</button>
    <ul class="navigation__list" :class="{'navigation__list--active': menuState}" @click="menuToggle">
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
    },
    menuState() {
      return this.$store.state.menuState;
    }
  },
  methods: {
    menuToggle() {
      this.$store.commit('setField', ['menuState', !this.menuState]);
    }
  }
}
</script>

<style lang="scss"> 
  .navigation {
    position: absolute;
    left: rem(20);

    @media (min-width: $screen-large) {
      width: 100%;
      position: relative;
      left: auto;
    }

    &__trigger {
      @media (min-width: $screen-large) {
        display: none;
      }
    }

    &__list {
      position: fixed;
      top: rem(80);
      left: 0;
      right: 0;
      bottom: 0;
      transform: translateX(-100%);
      z-index: 999;
      background: $color-primary;
      list-style: none;
      padding: rem(35) rem(20);
      margin: 0;
      transition: all 0.3s ease-in-out;
      opacity: 0;

       &--active {
        transform: translateX(0);
        opacity: 1;
      }

      @media (min-width: $screen-large) {
        height: auto;
        position: relative;
        margin: rem(30) rem(25);
        padding: 0;
        background: $color-tertiary;
        transform: translateX(0);
        transition: none;
        top: auto;
        bottom: auto;
        transition: none;
        opacity: 1;
      }
    }

    &__list-item {
      a {
        font-size: rem(20);
        margin: rem(15) 0;
        padding: rem(2) 0;
        display: block;
        color: $color-white;
        font-weight: 300;
        border-bottom: rem(1) solid transparent;

        @media (min-width: $screen-large) {
          font-size: rem(14);
          color: $color-black;
        }
      }

      &--active {
        a {
          border-color: $color-white;

          @media (min-width: $screen-large) {
            border-color: lighten($color-black, 40%);
          }
        }
      }
    }
  }
</style>