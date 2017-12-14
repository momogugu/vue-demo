<template>
  <div id="app" class="layout">
    <div class="layout-ceiling">
      <div class="layout-ceiling-main">
        <a href="#" @click.prevent="$router.push({ path: `/registe` })">Sign up</a> |
        <a href="#" @click.prevent="$router.push({ path: `/login` })">Sign in</a>
      </div>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
    <div class="layout-copy">
      2017.12 &copy; momogugu
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
.layout {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
.layout-ceiling {
  background: #464c5b;
  padding: 10px 0;
  overflow: hidden;
}
.layout-ceiling-main {
  float: right;
  margin-right: 15px;
}
.layout-ceiling-main a {
  color: #c7cace;
}
</style>
