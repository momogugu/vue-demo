<template>
  <div class="container">
      <div class="row">
          <div class="product col-md-offset-2 col-sm-offset-2 col-md-8 col-sm-8">
              <div class="row">
                  <div class="gallery col-md-6 col-sm-6">
                      <img class="img-responsive" :src="iPhone6s.activeStyleUrl" alt="">
                  </div>
                  <div class="detail col-md-5 col-sm-6">
                      <h3 class="name">
                          <span v-text="iPhone6s.name"></span>
                      </h3>
                      <hr>
                      <div class="options">
                          <dl class="dl-horizontal">
                              <dt>描述：</dt>
                              <dd><span v-text="iPhone6s.desc"></span></dd>
                          </dl>
                          <dl class="price dl-horizontal">
                              <dt>价格：</dt>
                              <dd class="pomegranage"><strong>¥<span v-text="iPhone6s.price"></span></strong></dd>
                          </dl>
                          <dl class="option dl-horizontal">
                              <dt>外观：</dt>
                              <dd>
                                  <ul>
                                    <li v-for="(value, key) in iPhone6s.style"
                                        @click="changeStyle({'styleName':key, 'styleUrl':value})"
                                        :class="{active: iPhone6s.activeStyleUrl == value}">
                                        <span v-text="key"></span>
                                    </li>
                                  </ul>
                              </dd>
                          </dl>
                          <dl class="option dl-horizontal">
                              <dt>存储容量：</dt>
                              <dd>
                                  <ul>
                                      <li v-for="(price, key) in iPhone6s.storage"
                                          @click="changePrice({'storage':key, 'price':price})"
                                          :class="{active: iPhone6s.price == price}">
                                          <span v-text="key"></span>
                                      </li>
                                  </ul>
                              </dd>
                          </dl>
                      </div>
                      <hr>
                      <button class="btn btn-danger btn-block" @click="addItem()" :disabled="iPhone6s.isSelected">
                          <span class="glyphicon glyphicon-shopping-cart"></span>加入购物车
                      </button>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "index",
  data() {
    return {};
  },
  computed: {
    iPhone6s() {
      return this.$store.state.iPhone6s;
    }
  },
  methods: {
    ...mapActions(["addItem", "changeStyle", "changePrice"])
  }
};
</script>
<style>
.pomegrange {
  color: #c0392b;
}
.detail dt {
  color: #95a5a6;
  width: 70px;
  padding: 4px 0;
}
.detail dd {
  margin-left: 64px;
  padding: 4px;
}
.option ul {
  padding: 0;
}
.option ul > li {
  float: left;
  list-style: none;
  margin-right: 4px;
  padding: 0 8px;
  border: 2px solid #eee;
}
.option ul > li:hover {
  border: 2px solid #c0392b;
}
.option ul .active {
  border: 2px solid #c0392b;
}
</style>
