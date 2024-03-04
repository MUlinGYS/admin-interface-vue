<template>
  <div class="tabs">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click.once="changeMenu(item)"
      @close.once="handleClose(item, index)"
      size="small"
      >{{ item.label }}</el-tag
    >
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'CommonTag',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    ...mapMutations(['closeTag']),
    //tag点击跳转功能
    changeMenu(item) {
      this.$router.push({ name: item.name })
    },
    //点击tag删除
    handleClose(item, index) {
      this.closeTag(item)
      const length = this.tags.length
      //删除之后的跳转逻辑
      if (item.name !== this.$route.name) {
        return
      }
      //如果删除的最后一个
      if (index === length) {
        this.$router.push({ name: this.tags[index - 1].name })
      } else {
        this.$router.push({ name: this.tags[index].name })
      }
    },
  },
}
</script>
<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
