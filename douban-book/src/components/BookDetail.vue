<style scoped>
.left {
  width: 80%;
  margin: 30px auto;
  position: relative;
}
.left h1 {
  margin-bottom: 30px;
}
.left img {
  float: left;
  margin-right: 15px;
}
.left p {
  font-size: 13px;
}
.left p span {
  color: #0897d2;
  cursor: pointer;
}
.rating {
  width: 24%;
  position: absolute;
  left: 65%;
  top: 0;
  border-left: 1px solid #ddd;
  padding-left: 10px;
}
.bottom {
  clear: both;
  padding-top: 20px;
}
.bottom button {
  margin-right: 10px;
}
.tags {
  display: inline-block;
  background: #daf1b8;
  color: #298823;
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 0 4px;
  cursor: pointer;
}
.tags:hover {
  background: #7ece08;
  color: #fff;
}
.summary {
  margin-top: 20px;
  margin-bottom: 20px;
}
.left h2 {
  color: green;
  margin-bottom: 10px;
}
.summary p {
  white-space: pre-wrap;
}
.commonTag span {
  display: inline-block;
  background: #dee1e2;
  color: #077acc;
  font-size: 15px;
  margin-right: 8px;
  margin-bottom: 10px;
  padding: 0 10px;
  cursor: pointer;
}
.commonTag span:hover {
  background: #c2c8ca;
}
.right {
  margin-bottom: 10px;
  margin-left: 20px;
  background: #ececec;
  padding: 10px;
}
</style>
<template>
  <div>
    <div class="left">
      <h1>{{detail.title}}</h1>
      <Row type="flex">
        <Col span="19">
          <div>
            <img :src="detail.image" :alt="detail.title" width=135>
            <div>
              <p v-if="detail.author.length">作者：{{detail.author.join(',')}}</p>
              <p v-if="detail.publisher">出版社：{{detail.publisher}}</p>
              <p v-if="detail.subtitle">副标题：{{detail.subtitle}}</p>
              <p v-if="detail.origin_title">原作名：{{detail.origin_title}}</p>
              <p v-if="detail.translator.length">译者：{{detail.translator.join(',')}}</p>
              <p v-if="detail.pubdate">出版年：{{detail.pubdate}}</p>
              <p v-if="detail.pages">页数：{{detail.pages}}</p>
              <p v-if="detail.price">定价：{{detail.price}}</p>
              <p v-if="detail.binding">装帧：{{detail.binding}}</p>
              <p v-if="detail.series && detail.series.id">丛书：<a @click="$router.push({ path: `/series/${detail.series.id}`})">{{detail.series.title}}</a></p>
              <p v-if="detail.isbn13">isbn：{{detail.isbn13}}</p>
            </div>
            <div class="rating">
              <p>豆瓣评分</p>
              <Rate disabled show-text allow-half :value="detail.rating.average | rating">
                <span style="color: #f5a623;font-size:18px;">{{detail.rating.average}}</span>
              </Rate>
              <span v-if="detail.rating.numRaters > 10">{{detail.rating.numRaters}}人评价</span>
              <span v-else>评价人数过少</span>
            </div>
          </div>
          <div class="bottom">
            <Button type="ghost" @click="modalShow('wish')">想读</Button>
            <Button type="ghost" @click="modalShow('reading')">在读</Button>
            <Button type="ghost" @click="modalShow('read')">读过</Button>
            <span>评价：</span>
            <Rate allow-half v-model="rate" @on-change="modalShow('read')"></Rate>
            <div class="summary">
              <h2>内容简介......</h2>
              <p>{{detail.summary}}</p>
            </div>
            <div class="commonTag">
              <h2>豆瓣成员常用的标签（共{{tagCount}}个）......</h2>
              <span v-for="(item, index) in detail.tags" :key="item.id" @click="addTag(item.name)">{{item.name}}</span>
            </div>
            <div>
              <h2>读书笔记(共{{annotationCount}}篇)......</h2>
              <NoteCard v-for="(item, index) in annotations" :key="index" :info="item"></NoteCard>
            </div>
          </div>
        </Col>
        <Col span="5">
          <div class="right">
            <h2>在哪儿借这本书......</h2>
            <p>我知道</p>
            <p>我不知道</p>
            <p>我知道还是不知道</p>
          </div>
          <div class="right">
            <h2>在哪儿买这本书......</h2>
            <p>淘宝</p>
            <p>京东</p>
            <p>当当</p>
            <p>咸鱼，噢，是闲鱼</p>
          </div>
          <div class="right">
            <h2>谁读这本书......</h2>
            <p>你</p>
            <p>我</p>
            <p>她</p>
            <p>他</p>
            <p>它</p>
          </div>
        </Col>
      </Row>
    </div>
    <Modal
        :mask-closable="false"
        v-model="loginModal"
        @on-visible-change="rateInit">
        <p slot="header" style="text-align:center;">
          <span>欢迎来到豆瓣，请登录</span>
        </p>
        <div style="text-align:center;">
          <Form ref="form" :model="form" :rules="rule">
            <FormItem prop="user">
              <Input type="text" v-model="form.username" placeholder="手机号／邮箱">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="密码">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button type="success" long @click="login">登录豆瓣</Button>
        </div>
    </Modal>
    <Modal
        :mask-closable="false"
        v-model="favModal"
        @on-visible-change="rateInit">
        <p slot="header">
          <span>添加收藏，我{{modalText}}这本书</span>
        </p>
        <div>
          <p v-if="status !== 'wish'">给个评价吧？（可选）</p>
          <Rate allow-half v-model="rate" v-if="status !== 'wish'"></Rate>
          <p>标签（多个标签用空格分隔）：</p>
          <Input style="width:300px;" v-model="tags"></Input>
          <p style="margin-top:10px;margin-bottom:10px;" v-if="mytags.length">我的标签：
            <span class="tags" v-for="(item, index) in mytags" :key="item.id" @click="addTag(item.name)">{{item.name}}</span>
          </p>
          <p style="margin-top:10px;margin-bottom:10px;" v-if="detail.tags.length">常用标签：
            <span class="tags" v-for="(item, index) in detail.tags" :key="item.id" @click="addTag(item.name)">{{item.name}}</span>
          </p>
          <p>简短评论：<span style="float:right">350</span></p>
          <Input type="textarea" v-model="comment" :maxlength="350" :rows="4" style="margin-bottom:10px"></Input>
          <Checkbox v-model="privacy">仅自己可见</Checkbox>
        </div>
        <div slot="footer">
          <Button type="success" @click="modify">保存</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
import axios from "axios";
import NoteCard from "./note/Notecard.vue";
export default {
  name: "bookDetail",
  data() {
    return {
      detail: {
        author: [],
        translator: [],
        rating: {},
        tags: [{}],
        series: {}
      },
      annotations: [],
      annotationCount: 0,
      rate: 0,
      status: "",
      tags: "",
      mytags: [],
      tagCount: 0,
      comment: "",
      privacy: false,
      loginModal: false,
      favModal: false,
      modalText: "",
      form: {
        username: "",
        password: ""
      },
      rule: {
        username: [
          {
            required: true,
            message: "请输入手机号或邮箱。",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码。",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    NoteCard
  },
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
  },
  methods: {
    modalShow(status) {
      if (this.logined) {
        this.favModal = true;
        let text = {
          wish: "想读",
          reading: "在读",
          read: "读过"
        };
        this.modalText = text[status];
        this.status = status;
      } else {
        this.loginModal = true;
      }
    },
    login() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let self = this;
          axios
            .get("/v2/user/ahbei")
            .then(response => {
              console.log(response);
            })
            .catch(response => {});
          this.loginModal = false;
          this.logined = true;
        }
      });
    },
    rateInit() {
      if (this.loginModal == false) {
        this.rate = 0;
      }
    },
    addTag(value) {
      let temp = this.tags.split(" ");
      temp.push(value);
      this.tags = temp.join(" ");
    },
    modify() {
      let self = this;
      axios
        .post("/v2/book/" + self.$route.params.id + "/collection", {
          status: self.status,
          tags: this.tags,
          comment: this.comment,
          privacy: this.privacy ? "privacy" : "",
          rating: this.rate ? this.rate : ""
        })
        .then(response => {
          console.log(response);
        })
        .catch(response => {
          this.favModal = false;
        });
    },
    getTags(id) {
      let self = this;
      axios
        .get("/v2/book/" + id + "/tags")
        .then(response => {
          if (response.status == 200) {
            this.tagCount = response.data.total;
          }
        })
        .catch(response => {});
    },
    getNotes(id) {
      let self = this;
      axios
        .get("/v2/book/" + id + "/annotations")
        .then(response => {
          if (response.status == 200) {
            this.annotations = response.data.annotations;
            this.annotationCount = response.data.total;
          }
        })
        .catch(response => {});
    }
  },
  mounted() {
    let self = this;
    axios
      .get("/v2/book/user/ahbei/tags")
      .then(response => {
        if (response.status === 200) {
          console.log(response);
          self.mytags = response.data.tags;
        }
      })
      .catch(response => {
        //   error callback
        self.$Loading.finish();
      });
  },
  beforeRouteEnter(to, from, next) {
    axios
      .get("/v2/book/" + to.params.id)
      .then(response => {
        if (response.status === 200) {
          next(vm => {
            vm.detail = response.data;
            vm.getTags(to.params.id);
            vm.getNotes(to.params.id);
          });
        }
      })
      .catch(response => {
        next(false);
      });
  },
  beforeRouteUpdate(to, from, next) {
    axios
      .get("/v2/book/" + to.params.id)
      .then(response => {
        if (response.status === 200) {
          next(vm => {
            vm.detail = response.data;
            vm.getTags(to.params.id);
            vm.getNotes(to.params.id);
          });
        }
      })
      .catch(response => {
        next(false);
      });
  }
};
</script>
