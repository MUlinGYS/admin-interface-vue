<template>
  <el-container>
    <el-aside width="auto" style="overflow: hidden; min-height: 100vh">
      <Common-aside />
    </el-aside>
    <el-container>
      <el-header>
        <CommonHeader />
      </el-header>
      <Common-tag />
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from '@/components/CommonAside'
import CommonHeader from '@/components/CommonHeader'
import CommonTag from '@/components/CommonTag'
export default {
  name: 'minMune',
  data() {
    return {}
  },
  components: {
    CommonAside,
    CommonHeader,
    CommonTag,
  },
  mounted() {},
  created() {},
  methods: {},
}
</script>
<style>
.el-main {
  padding: 0 20px 20px;
}

.el-header {
  padding: 0 !important;
}
</style>
