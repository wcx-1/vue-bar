<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
// 判断字符串是否是https?:|mailto:|tel: 开头的
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    // 将isExternal的方法拉到本地
    isExternal() {
      return isExternal(this.to)
    },
    // 如果是https?:|mailto:|tel:开头的，就把component标签渲染成链接<a></a>
    type() {
      if (this.isExternal) {
        return 'a'
      }
      // 不是就渲染成路由'router-link'
      return 'router-link'
    }
  },
  methods: {
    linkProps(to) {
      // 如果是https?:|mailto:|tel:开头的,就需要加工，下面的href、target、rel都是链接a标签的属性
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      // 不是的话就当作路由，返回本身
      return {
        to: to
      }
    }
  }
}
</script>
