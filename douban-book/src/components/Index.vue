<style scoped>

</style>
<template>
<div>
  <div>
    <BookList v-for="(type,index) in types" :type="type" :key="index"></BookList>
  </div>
</div>
</template>
<script>
import BookList from "./book/BookList.vue";
export default {
  name: "index",
  data() {
    return {
      types: ["虚构类", "非虚构类"]
    };
  },
  components: {
    BookList
  }
};
</script>
