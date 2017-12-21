<template>
  <div class="login">
    <h1>欢迎来到蘑菇的购物天堂哇哈哈~~~</h1>
    <p>赶紧登陆了去shopping辣~~么么:)</p>
    <div class="form">
      <Form ref="loginForm" :label-width="80" method="post" :model="form" :rules="formRule">
        <FormItem label="用户名：" prop="username">
            <Input type="text" v-model="form.username" />
        </FormItem>
        <FormItem label="密码：" prop="password">
            <Input type="password" v-model="form.password" />
        </FormItem>
        <FormItem>
            <Button type="primary" style="width:100px;" @click.prevent="onSubmit('loginForm')">登录</Button>
            <Button type="ghost" style="width:100px;margin-left:8px;" @click.prevent="onReset('loginForm')">重置</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: ""
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
        password: {
          required: true,
          message: "密码不能为空",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    onSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$store
            .dispatch({
              type: "login",
              username: this.form.username,
              password: this.form.password
            })
            .then(() => {
              this.$Message.success({
                content: this.$store.state.user.message
              });
              this.$store
                .dispatch({
                  type: "getUserInfo",
                  username: this.form.username
                })
                .then(() => {
                  this.$router.push({ path: `/` });
                });
            })
            .catch(() => {
              this.$Message.error(this.$store.state.user.message);
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
.login {
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
