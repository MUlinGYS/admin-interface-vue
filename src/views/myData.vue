<template>
  <div class="myData">
    <div class="profile">
      <el-card class="profile-card">
        <div slot="header" class="profile-header">
          <router-link to="/">
            <el-avatar style="height: 100px; width: 100px"
              ><img src="../assets/img/about29.jpg"
            /></el-avatar>
          </router-link>
          <div class="profile-name">{{ name }}</div>
        </div>
        <div style="position: absolute; top: 30px; left: 30px">
          <router-link to="/"
            ><el-button type="text">退出</el-button>
          </router-link>
        </div>
        <div class="profile-body">
          <el-tabs v-model="activeTab">
            <!-- 个人资料 -->
            <el-tab-pane label="个人资料">
              <el-form
                :model="formData"
                :rules="rules"
                ref="form"
                label-width="100px">
                <el-form-item label="用户名" prop="username">
                  <!-- <el-input v-model="formData.username" disabled></el-input> -->
                  <div class="disable-text">
                    <div class="box" v-show="nicknameShow">
                      <p>{{ nickname }}</p>
                      <el-button type="text" @click="inputShow()"
                        >修改</el-button
                      >
                    </div>
                    <div class="btn" v-show="nicknameInputShow">
                      <el-input
                        type="text"
                        :value="nickname"
                        style="width: 200px; margin-right: 20px"></el-input>
                      <el-button @click="nameShow()">取消</el-button>
                      <el-button type="primary" @click="save()">保存</el-button>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="formData.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="formData.phone"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('form')"
                    >保存</el-button
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <!-- 视频云盘 -->
            <el-tab-pane label="视频云盘">
              <el-table :data="videoList" style="width: 100%">
                <el-table-column prop="name" label="视频名称"></el-table-column>
                <el-table-column prop="size" label="视频大小"></el-table-column>
                <el-table-column prop="date" label="上传日期"></el-table-column>
              </el-table>
            </el-tab-pane>
            <!-- 更改密码 -->
            <el-tab-pane label="更改密码">
              <el-form
                :model="passwordForm"
                :rules="passwordRules"
                ref="passwordForm"
                label-width="100px">
                <el-form-item label="旧密码" prop="oldPassword">
                  <el-input
                    type="password"
                    v-model="passwordForm.oldPassword"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                  <el-input
                    type="password"
                    v-model="passwordForm.newPassword"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                  <el-input
                    type="password"
                    v-model="passwordForm.confirmPassword"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('passwordForm')"
                    >保存</el-button
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="选项"> </el-tab-pane>
            <el-tab-pane label="选项"> </el-tab-pane>
            <el-tab-pane label="选项"> </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myData',
  data() {
    return {
      activeTab: '0',
      nickname: '宋佳佳',
      nicknameShow: true,
      nicknameInputShow: false,
      formData: {
        username: 'admin',
        email: 'admin@example.com',
        phone: '1234567890',
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: ['blur', 'change'],
          },
        ],
      },
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      passwordRules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            min: 6,
            max: 20,
            message: '密码长度在6到20个字符之间',
            trigger: 'blur',
          },
        ],
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: this.validateConfirmPassword, trigger: 'blur' },
        ],
      },
      videoList: [
        { name: '视频1', size: '100MB', date: '2021-10-01' },
        { name: '视频2', size: '200MB', date: '2021-10-02' },
        { name: '视频3', size: '300MB', date: '2021-10-03' },
      ],
      name: 'Ikun',
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message.success('保存成功')
        }
      })
    },
    validateConfirmPassword(rule, value, callback) {
      if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    },
    inputShow() {
      this.nicknameShow = false
      this.nicknameInputShow = true
    },
    nameShow() {
      this.nicknameShow = true
      this.nicknameInputShow = false
    },
    save() {
      this.nickname = ''
      this.nameShow()
    },
  },
}
</script>

<style scoped>
.myData {
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100vh;
  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
}
.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.profile-card {
  width: 1500px;
  height: 700px;
  border-radius: 20px;
}

.profile-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.profile-name {
  font-size: 30px;
  margin-left: 20px;
}

.profile-body {
  padding: 20px;
}

.box {
  display: flex;
}

.box p {
  width: 100px;
  margin: 0;
  margin-left: 20px;
}
</style>
