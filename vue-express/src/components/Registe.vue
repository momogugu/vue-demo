<template>
  <div class="registe">
      <h1>欢迎来到蘑菇的购物天堂哇哈哈~~~</h1>
      <p>现在开始注册我们的账号吧，么么么:)</p>
      <div class="form">
        <Form ref="registeForm" :label-width="80" method="post" :model="form" :rules="formRule">
          <FormItem  label="用户名：" prop="username">
            <Input type="text" :autofocus="true" v-model="form.username" placeholder="注册邮箱" />
          </FormItem>
          <FormItem  label="昵称：" prop="nickname">
            <Input type="text" :maxlength="10" v-model="form.nickname" placeholder="昵称，不能少于2个字" />
          </FormItem>
          <FormItem  label="密码：" prop="password">
            <Input type="password" v-model="form.password" placeholder="密码，不能少于6个字" />
          </FormItem>
          <FormItem  label="简介：" prop="description">
            <Input type="text" :maxlength="50" v-model="form.description" placeholder="简介" />
          </FormItem>
          <FormItem>
            <Button type="primary" style="width:100px;" @click.prevent="onSubmit('registeForm')">注册</Button>
            <Button type="ghost" style="margin-left:8px;width:100px;" @click.prevent="onReset('registeForm')">重置</Button>
        </FormItem>
        </Form>
      </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "registe",
  data() {
    return {
      form: {
        username: "",
        nickname: "",
        password: "",
        description: ""
      },
      formRule: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          },
          {
            type: "email",
            message: "邮箱格式不对",
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "昵称不能为空",
            trigger: "blur"
          },
          {
            type: "string",
            min: 2,
            message: "昵称不能少于2个字",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码强度过低",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$store
            .dispatch({
              type: "registe",
              username: this.form.username,
              nickname: this.form.nickname,
              password: this.form.password,
              description: this.form.description
            })
            .then(() => {
              this.$Message.success({
                content: this.$store.state.user.message,
                onClose: this.$router.push({ path: `/login` })
              });
            })
            .catch(() => {
              this.$Message.error({
                content: this.$store.state.user.message,
                onClose: this.onReset(name)
              });
            });
        }
      });
    },
    onReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style scoped>
.registe {
  text-align: center;
}
h1 {
  margin: 20px auto;
}
p {
  margin-bottom: 10px;
}
.form {
  width: 35%;
  height: 100%;
  margin: auto;
}
</style>