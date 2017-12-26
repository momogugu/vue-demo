<template>
  <div v-if="loading"></div>
  <div v-else class="main">
    <Carousel autoplay radius-dot :height="180" v-model="value" loop>
      <CarouselItem>
        <div class="carousel">1</div>
      </CarouselItem>
      <CarouselItem>
        <div class="carousel">2</div>
      </CarouselItem>
      <CarouselItem>
        <div class="carousel">3</div>
      </CarouselItem>
      <CarouselItem>
        <div class="carousel">4</div>
      </CarouselItem>
    </Carousel>
    <div>
      <h2 class="title">
        <span class="bg"></span>
        热销
        <span class="more">查看更多></span>
      </h2>
      <div class="card">
        <Card style="width:232px;height:300px;display:inline-block;margin:10px;" v-for="(row,index) in hot" :key="index">
          <div style="text-align:center;"   @click="$router.push({ path: `/${row.brand_id}` })">
            <img :src="row.brand_pic" width="200" height="200" alt="我是图片可是我挂了orz">
            <p style="color:red;font-size:16px;font-weight:bold">¥{{row.brand_price}}</p>
            <p>{{row.brand_name}}</p>
          </div>
        </Card>
      </div>
    </div>
    <div>
      <h2 class="title">
        <span class="bg"></span>
        新品上市
        <span class="more">查看更多></span>
      </h2>
      <div class="card">
        <Card style="width:232px;height:300px;display:inline-block;margin:10px;" v-for="(row,index) in coming" :key="index">
          <div style="text-align:center;"  @click="$router.push({ path: `/${row.brand_id}` })">
            <img :src="row.brand_pic" width="200" height="200" alt="我是图片可是我挂了orz">
            <p style="color:red;font-size:16px;font-weight:bold">¥{{row.brand_price}}</p>
            <p>{{row.brand_name}}</p>
          </div>
        </Card>
      </div>
    </div>
    <div>
      <h2 class="title">
        <span class="bg"></span>
        甩卖
        <span class="more">查看更多></span>
      </h2>
      <div class="card">
        <Card style="width:232px;height:300px;display:inline-block;margin:10px;" v-for="(row,index) in sale" :key="index">
          <div style="text-align:center;"  @click="$router.push({ path: `/${row.brand_id}` })">
            <img :src="row.brand_pic" width="200" height="200" alt="我是图片可是我挂了orz">
            <p style="color:red;font-size:16px;font-weight:bold">¥{{row.brand_price}}</p>
            <p>{{row.brand_name}}</p>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "list",
  data() {
    return {
      loading: true,
      goods: [],
      value: 0
    };
  },
  computed: {
    hot() {
      return this.select("热销");
    },
    coming() {
      return this.select("新品上市");
    },
    sale() {
      return this.select("甩卖");
    }
  },
  created() {
    this.$store
      .dispatch({
        type: "getAllGoods"
      })
      .then(() => {
        this.loading = false;
        this.goods = [...this.$store.state.goods.rows];
      })
      .catch(() => {
        this.loading = false;
      });
  },
  methods: {
    select(type) {
      if (!this.goods.length) {
        return [];
      } else {
        let temp = [];
        this.goods.forEach(element => {
          if (element.brand_status === type) {
            temp.push(element);
          }
        });
        return temp;
      }
    }
  }
};
</script>
<style scoped>
.carousel {
  width: 100%;
  height: 100%;
  text-align: center;
}
.more {
  float: right;
}
.bg {
  display: inline-block;
  width: 5px;
  height: 27px;
  background: #699fe2;
  vertical-align: bottom;
}
.title {
  color: #699fe2;
  border-bottom: 1px solid #dedede;
  padding-bottom: 10px;
  margin: 10px 25px;
}
.card {
  margin: 10px 25px;
}
</style>
