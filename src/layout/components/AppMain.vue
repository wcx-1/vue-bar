<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- 主体部分：找路由去，别找我 -->
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// 修复OpenEL对话框中的css样式错误
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
