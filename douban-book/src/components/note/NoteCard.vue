<style scoped>
.top img {
  float: left;
}
.top {
  clear: both;
}
.top p {
  margin-left: 60px;
}
.title {
  cursor: pointer;
  background: #dee1e2;
  color: #077acc;
  font-size: 14px;
  line-height: 26px;
  padding-left: 5px;
}
.user {
  line-height: 22px;
}
.user span {
  margin-right: 10px;
}
.bottom {
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>

<template>
  <div>
      <div class="top">
          <img :src="info.author_user.avatar" alt="info.author_user.name">
          <p class="title" @click="$router.push({ path: `/annotation/${info.id}` })">{{info.chapter?info.chapter:'全部'}}</p>
          <p class="user">
              <span>{{info.author_user.name}}</span>
              <span>{{info.time}}</span>
          </p>
      </div>
      <div class="bottom">{{info.summary}}</div>
  </div>
</template>
<script>
export default {
  name: "noteCard",
  data() {
    return {};
  },
  props: ["info"]
};
</script>
