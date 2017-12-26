<template>
  <div class="main">
      <div v-if="loading"></div>
      <div v-else>
        <img height="300" width="250" :src="detail.brand_pic" alt="我是图片呀">
        <div class="right">
            <h2>{{detail.brand_name}}</h2>
            <p>
                <span class="label">类别：</span>
                <span>{{detail.brand_className}}</span>
            </p>
            <p>
                <span class="label">状态：</span>
                <span>{{detail.brand_status}}</span>
            </p>
            <p>
                <span class="label">描述：</span>
                <span>{{detail.brand_desc}}</span>
            </p>
            <p>
                <span class="label">价格：</span>
                <span style="color: red;">¥{{detail.brand_price}}</span>
            </p>
            <Button type="error" long icon="ios-cart" @click="addToCart">加入购物车</Button>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "detail",
  data() {
    return {
      detail: {},
      loading: true
    };
  },
  created() {
    this.$store
      .dispatch({
        type: "getDetail",
        brand_id: this.$route.params.id
      })
      .then(() => {
        this.loading = false;
        this.detail = this.$store.state.goods.selected;
      })
      .catch(() => {
        this.loading = false;
      });
  },
  methods: {
    addToCart() {
      console.log(this.detail);
    }
  }
};
</script>
<style scoped>
.main {
  width: 90%;
  height: 100%;
  margin: 20px auto;
}
.right {
  display: inline-block;
  width: 500px;
  vertical-align: top;
  margin-left: 20px;
}
.right h2 {
  font-size: 24px;
  line-height: 32px;
  border-bottom: 1px solid #d6d6d6;
  margin-bottom: 10px;
}
.right span {
  font-size: 14px;
  line-height: 24px;
}
.label {
  display: inline-block;
}
</style>
