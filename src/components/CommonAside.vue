<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <h3>{{ isCollapse ? '后台' : '后台管理系统' }}</h3>
    <el-menu-item
      @click="clickMenu(item)"
      v-for="item in noChildren"
      :key="item.name"
      :index="item.name"
      :disabled="index === 2">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasChildren"
      :key="item.label"
      :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group
        v-for="SubItem in item.children"
        :key="SubItem.path"
        :index="SubItem.path">
        <el-menu-item @click="clickMenu(SubItem)" :index="SubItem.path">{{
          SubItem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import Cookie from 'js-cookie'

export default {
  data() {
    return {}
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    //点击菜单
    clickMenu(item) {
      if (
        this.$route.path !== item.path &&
        !(this.$route.path === '/home' && item.path === './')
      ) {
        this.$router.push(item.path)
      }
      this.$store.commit('SelecMenu', item)
    },
  },
  computed: {
    //后续判断登录用户权限
    // 有子菜单
    hasChildren() {
      return this.menuData.filter((item) => item.children)
    },
    // 无子菜单
    noChildren() {
      return this.menuData.filter((item) => !item.children)
    },
    menuData() {
      //判断当前数据，如果浏览器缓存中没有，从当前store中去获取
      return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
  },
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  height: 100%;
  h3 {
    text-align: center;
    color: white;
    font-size: 16px;
    font-weight: 400;
  }
}
.el-menu {
  border-right: 0px !important;
}
</style>
