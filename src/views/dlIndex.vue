<template>
  <div
    @keydown.enter="submit"
    style="
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    ">
    <el-form
      label-width="70px"
      :inline="true"
      class="container"
      ref="form"
      :model="form"
      :rules="rules">
      <h3 class="login-title">登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          show-password
          placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item style="display: flex; justify-content: center">
        <el-button type="primary" @click="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '../api/Home'

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' },
        ],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
      },
    }
  },
  methods: {
    //登录
    submit() {
      //token信息
      // const token = Mock.Random.guid()

      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.form).then(({ data }) => {
            if (data.code === 20000) {
              // token信息存入cookie用于不同页面之间的通信
              Cookie.set('token', data.data.token)
              //获取菜单的数据，存入store中
              this.$store.commit('setMenu', data.data.menu)
              this.$store.commit('addMenu', this.$router)
              this.$router.push('/home')
            } else {
              this.$message.error(data.data.message)
            }
          })
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 20% 0;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  .el-input {
    width: 198px;
  }
  .login-title {
    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }
}
</style>
