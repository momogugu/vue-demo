<style scoped>
.main {
  width: 80%;
  margin: auto;
}
.page {
  width: 80%;
  margin: auto;
  clear: both;
}
</style>
<template>
  <div class="main">
      <h1>搜索 {{q}}</h1>
      <div v-if="total">
        <BookCard v-for="(book,index) in books" :info="book" :key="index"></BookCard>
        <div class="page">
            <Page ref="page" :total="total" :page-size="pageSize" @on-change="pageChange"></Page>
        </div>
      </div>
      <div v-else>
          <p style="font-size:14px;">没有找到关于 “{{q}}” 的书，换个搜索词试试吧。</p>
      </div>
  </div>
</template>
<script>
import axios from "axios";
import BookCard from "./book/BookCard.vue";
export default {
  name: "search",
  data() {
    return {
      total: 0,
      pageSize: 20,
      books: []
    };
  },
  computed: {
    q() {
      return this.$route.params.q;
    }
  },
  components: {
    BookCard
  },
  methods: {
    pageChange() {
      let self = this;
      let start = (self.$refs.page.currentPage - 1) * self.pageSize;
      let params = {
        q: self.q,
        start: start
      };
      this.fetchData(params);
    },
    fetchData(params) {
      let self = this;
      axios
        .get("/v2/book/search", {
          params: params
        })
        .then(response => {
          if (response.status === 200) {
            if (!response.data.total) {
              return;
            }
            self.total = response.data.total;
            self.books = response.data.books;
          }
        })
        .catch(response => {});
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchData",
    q() {
      this.fetchData({
        q: this.q
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    axios
      .get("/v2/book/search", {
        params: {
          q: to.params.q
        }
      })
      .then(response => {
        if (response.status === 200) {
          if (!response.data.total) {
            return;
          }
          next(vm => {
            vm.total = response.data.total;
            vm.books = response.data.books;
          });
        }
      })
      .catch(response => {
        next(false);
      });
  },
  beforeRouteUpdate(to, from, next) {
    axios
      .get("/v2/book/search", {
        params: {
          q: to.params.q
        }
      })
      .then(response => {
        if (response.status === 200) {
          if (!response.data.total) {
            return;
          }
          next(vm => {
            vm.total = response.data.total;
            vm.books = response.data.books;
          });
        }
      })
      .catch(response => {
        next(false);
      });
  }
};
</script>
