<style scoped>
.annotation {
  width: 80%;
  margin: 30px auto;
}
.top {
  margin-top: 20px;
}
.top img {
  float: left;
}
.top p {
  margin-left: 60px;
}
.top a {
  margin-left: 12px;
}
.top:after {
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
  display: block;
  *zoom: 1;
}
.bottom p {
  font-size: 14px;
  margin-top: 10px;
}
.bottom p.content {
  white-space: pre-wrap;
  font-size: 13px;
  line-height: 20px;
}
h3 {
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
<template>
  <div class="annotation">
      <h1>{{detail.book.title || detail.book.subtitle}}的笔记－{{detail.chapter}}</h1>
      <Row type="flex">
        <Col span="19">
            <div class="top">
                <img :src="author.avatar" :alt="author.name">
                <a :href="author.alt">{{author.name}}</a>
                <p>{{author.signature || author.desc}}</p>
            </div>
            <div class="bottom">
                <p>章节名：{{detail.chapter}}</p>
                <p>时间：{{detail.time}}</p>
                <p>评论数：{{detail.comments_count}}</p>
                <p class="content">{{ detail.content | jsonToStr}}</p>
            </div>
        </Col>
        <Col span="5">
            <p style="font-size:14px;color:#0478ca;" v-if="allAnnotations > 1">> {{author.name}}的所有读书笔记（{{allAnnotations}}篇）</p>
            <h3>说明......</h3>
            <p style="font-size:14px;">{{'<原文开始>...<原文结束>'}}表示其中内容是对原文的摘抄</p>
        </Col>
      </Row>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "annotationDetail",
  data() {
    return {
      detail: {
        book: {},
        content: ""
      },
      author: {},
      allAnnotations: 0
    };
  },
  methods: {
    getUserInfo(id) {
      let self = this;
      axios
        .get("/v2/user/" + id)
        .then(response => {
          if (response.status === 200) {
            self.author = response.data;
          }
        })
        .catch(response => {});
    },
    getAll(id) {
      let self = this;
      axios.get("/v2/book/user/" + id + "/annotations").then(response => {
        if (response.status === 200) {
          self.allAnnotations = response.data.total;
        }
      });
    }
  },
  filters: {
    jsonToStr: str => {
      if (typeof str == "string") {
        try {
          JSON.parse(str);
          let tmp = JSON.parse(str);
          let type = typeof tmp;
          if (type === "string") {
            return value;
          } else if (type === "object" && tmp.blocks) {
            let blocks = tmp.blocks;
            if (blocks.length > 1) {
              let str = "";
              blocks.forEach(element => {
                if (element.text) {
                  str += element.text;
                }
              });
              return str;
            } else if (blocks.length) {
              return blocks[0].text;
            }
          } else {
            return "";
          }
        } catch (e) {
          return str;
        }
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    axios
      .get("/v2/book/annotation/" + to.params.id)
      .then(response => {
        if (response.status === 200) {
          next(vm => {
            vm.detail = response.data;
            vm.getUserInfo(vm.detail.author_id);
            vm.getAll(vm.detail.author_id);
          });
        }
      })
      .catch(response => {
        next(false);
      });
  },
  beforeRouteUpdate(to, from, next) {
    axios
      .get("/v2/book/annotation/" + to.params.id)
      .then(response => {
        if (response.status === 200) {
          next(vm => {
            vm.detail = response.data;
            vm.getUserInfo(vm.detail.author_id);
            vm.getAll(vm.detail.author_id);
          });
        }
      })
      .catch(response => {
        next(false);
      });
  }
};
</script>
