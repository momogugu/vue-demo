<style scoped>
.booklist {
  width: 80%;
  margin: auto;
  clear: both;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
<template>
  <div class="booklist" v-if="!loading">
      <h2>最受关注图书 | {{type}}</h2>
      <BookCard v-for="(book,index) in books" :info="book" :key="index"></BookCard>
  </div>
  <div v-else></div>
</template>
<script>
import axios from "axios";
import BookCard from "./BookCard";
export default {
  name: "booklist",
  data() {
    return {
      books: [],
      loading: true
    };
  },
  props: ["type"],
  components: {
    BookCard
  },
  created() {
    axios
      .get("/v2/book/search?q=" + this.type + "&count=10")
      .then(response => {
        //   success callback
        this.loading = false;
        let res = response.data;
        if (res.books.length > 0) {
          this.books = [...res.books];
        }
      })
      .catch(response => {
        //   error callback
        this.loading = false;
      });
  }
};
</script>
