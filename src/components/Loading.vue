<template>
  <div class="loading">
    <div class="loading__svg">
      <svg title="Loading..." viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" class="spinner no-print color--secondary"><circle cx="50%" cy="50%" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="30 18" r="10.5"></circle></svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style lang="scss" scoped>
  .loading {
    background-color: rgba(255, 255, 255, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;

    &__svg {
      width: 2em;
      height: 2em;
      animation: spin 1.3s infinite linear;
    }
  }
</style>