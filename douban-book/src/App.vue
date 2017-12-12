<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
}
.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
  clear: both;
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
  color: #9ba7b5;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-search {
  position: relative;
  top: 15px;
  left: 150px;
}
.layout-header {
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
</style>
<template>
    <div class="layout">
        <div class="layout-ceiling">
            <div class="layout-ceiling-main">
                <a href="#">Sign up</a> |
                <a href="#">login</a>
            </div>
        </div>
        <div class="layout-header">
          <div class="layout-logo"></div>
          <div class="layout-search">
            <Input type="text" v-model="value" icon="search" placeholder="书名、作者名、ISBN" style="width:400px" @on-keyup.13="$router.push({ path: `/search/${value}` })" @on-click="$router.push({ path: `/search/${value}` })"></Input>
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
  name: "app",
  data() {
    return {
      value: ""
    };
  }
};
</script>

