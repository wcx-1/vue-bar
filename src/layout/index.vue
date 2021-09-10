<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <!-- 加载边栏 -->
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <!-- 加载顶栏 -->
        <navbar />
      </div>
      <!-- 加载主体 -->
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    // 顶栏组件
    Navbar,
    // 边栏组件
    Sidebar,
    // 主体部分
    AppMain
  },
  // 把/mixin/ResizeHandler混入
  mixins: [ResizeMixin],
  computed: {
    // 查看边栏的状态
    sidebar() {
      return this.$store.state.app.sidebar
    },
    // 查看设备的状态
    device() {
      return this.$store.state.app.device
    },
    // 是否修复标题
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    // 几个属性的集合
    classObj() {
      return {
        // 边栏目前是否是隐藏的
        hideSidebar: !this.sidebar.opened,
        // 边栏目前是否是开启的
        openSidebar: this.sidebar.opened,
        // 没有动画
        withoutAnimation: this.sidebar.withoutAnimation,
        // 设备是否是手机
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
