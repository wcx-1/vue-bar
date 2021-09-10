import store from '@/store'
// document是个啥？应该是从vuex里面来的
const { body } = document
const WIDTH = 992 // 请参阅Bootstrap的响应式设计

export default {
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  },
  // 下面是几个生命周期钩子
  beforeMount() {
    // 添加事件监听器
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    // 移除事件监听器
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      // 切换设备成移动端
      store.dispatch('app/toggleDevice', 'mobile')
      // 关闭边栏取消动画
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    // 将$_用于mixin属性
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    // 似乎是用来判断设备种类的
    $_isMobile() {
      // rect是一个具有四个属性left、top、right、bottom的DOMRect对象，用于定位
      // 如果需要更好的跨浏览器兼容性，请使用window.pageXOffset和window.pageYOffset代替
      const rect = body.getBoundingClientRect()
      // Bootstrap的响应式设计
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        // 判断是手机端还是电脑端
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')
        // 如果是手机的话就关闭边栏、取消动画
        if (isMobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
