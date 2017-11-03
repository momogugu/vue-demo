<template>
  <nav>
      <div class="navbar navbar-default">
          <div class="container-fluid">
              <div class="navbar-header">
                  <router-link to="/" class="navbar-brand">Shopping Cart</router-link>
              </div>
              <div class="collapse navbar-collapse">
                  <ul class="nav navbar-nav">
                      <li>
                      <router-link to="index" active-class="active">iPhone6s<span class="sr-only"></span></router-link>
                      </li>
                      <li>
                      <router-link to="cart" active-class="active">购物车<span class="badge text-danger" v-text="totalItem"></span></router-link>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  </nav>
</template>
<script>
export default {
  name: "nav",
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    totalItem() {
      return this.cart.length;
    }
  }
};
</script>
<style>
.text-danger {
  color: #fff;
  background-color: #d9534f;
}
</style>