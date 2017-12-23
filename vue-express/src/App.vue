<template>
  <div id="app" class="layout">
    <div class="layout-ceiling">
      <div class="layout-ceiling-main" v-if="user.logined">
        <Dropdown placement="bottom-end" @on-click="handleClick">
          <a href="#">{{user.nickname}}
            <Icon type="arrow-down-b"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="logout">退出登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div class="layout-ceiling-main" v-else>
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
  name: "app",
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    this.$store
      .dispatch({
        type: "valid",
        token: this.getCookie("jwt")
      })
      .then(() => {
        let currentRoute = this.$router.currentRoute.name;
        if (currentRoute === "Login") {
          this.$router.push({ path: `/` });
        }
      });
  },
  methods: {
    getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      return "";
    },
    handleClick(name) {
      if (name === "logout") {
        this.$store
          .dispatch({
            type: name
          })
          .then(() => {
            this.$Message.success({
              content: this.$store.state.user.message
            });
          })
          .catch(() => {
            this.$Message.error({
              content: this.$store.state.user.message
            });
          });
      }
    }
  }
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
.layout-ceiling-main p {
  color: #c7cace;
  float: right;
}
</style>
