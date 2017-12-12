<style scoped>
.bookCard {
  float: left;
  margin: 10px 10px;
  text-align: center;
}
.summary {
  word-break: break-all;
  text-align: left;
  white-space: normal;
  max-height: 220px;
  overflow-y: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 9;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<template>
  <Card style="width:230px;height:275px;" class="bookCard">
    <Poptip placement="right" trigger="hover" width=200>
      <div slot="content" class="summary">
        <p style="font-size:14px;font-weight:bold;">{{info.subtitle || info.title}}</p>
        <p style="margin-top:10px;margin-bottom:10px;">{{info.publisher}}</p>
        <p class="summary">{{info.summary}}</p>
      </div>
      <div style="text-align:center" @click="$router.push({ path: `/book/${info.id}` })">
        <img :src="info.image" height="150px" width="100px">
        <h4>{{info.subtitle || info.title}}</h4>
        <Rate disabled show-text allow-half :value="info.rating.average | rating">
            <span style="color: #f5a623;font-size:14px;">{{info.rating.average}}</span>
        </Rate>
        <p>{{info.author.join(',')}}</p>
      </div>
    </Poptip>
  </Card>
</template>
<script>
export default {
  name: "bookCard",
  data() {
    return { message: "vue filter" };
  },
  props: ["info"],
  filters: {
    rating: function(value) {
      if (value > 9) {
        return 5;
      } else if (value > 8) {
        return 4.5;
      } else if (value > 7) {
        return 4;
      } else if (value > 6) {
        return 3.5;
      } else if (value > 5) {
        return 3;
      } else if (value > 4) {
        return 2.5;
      } else if (value > 0) {
        return 2;
      } else {
        return 0;
      }
    }
  }
};
</script>
