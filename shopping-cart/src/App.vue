<template>
  <div id="app">
    <cart-nav></cart-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    "cart-nav": Nav
  }
};
</script>

<style lang="scss">

</style>
