<template>
<div>
    <div v-if="loading"></div>
    <div v-else>
      <h1>{{user.nickname}}的购物车

      </h1>
      <div>
          <Table ref="cart" :columns="columns"></Table>
      </div>
    </div>
</div>
</template>
<script>
export default {
  name: "cart",
  data() {
    return {
      loading: true,
      user: this.$store.state.user,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "商品信息",
          key: "detail"
        },
        {
          title: "单价",
          key: "price"
        },
        {
          title: "数量",
          key: "number"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  created() {
    this.$store
      .dispatch({
        type: "getMyCart",
        username: this.user.username
      })
      .then(() => {
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }
};
</script>
<style scoped>

</style>
