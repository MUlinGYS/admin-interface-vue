<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        style="margin-right: 20px"
        type="info"
        @click="handleMenu"
        icon="el-icon-menu"
        size="mini"></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img src="../assets/img/about29.jpg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="mydata">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'

export default {
  data() {
    return {}
  },
  methods: {
    handleMenu() {
      this.$store.commit('collapseMenu')
    },
    handleClick(command) {
      if (command === 'logout') {
        //清除cookie中的token信息
        Cookie.remove('token')
        //清除cookie中的menu
        Cookie.remove('menu')
        //跳转登录页
        this.$message.error('已登出')
        this.$router.push('/login')
        //刷新页面清空临时路由缓存
        location.reload()
      } else if (command === 'mydata') {
        this.$router.push('/myData')
      }
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
}
</script>

<style lang="less" scoped>
.header-container {
  background-color: #333;
  height: 60px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }
  img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
}

.l-content {
  display: flex;
  align-items: center;
  /deep/.el-breadcrumb__item {
    .el-breadcrumb__inner {
      font-weight: normal;
      //当在el-breadcrumb__inner下并且有is-link时
      &.is-link {
        color: #666;
      }
    }
    &:last-child {
      .el-breadcrumb__inner {
        color: #fff;
      }
    }
  }
}
</style>
