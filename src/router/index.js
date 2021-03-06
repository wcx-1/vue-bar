import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 引入layout下的组件
import Layout from '@/layout'

/**
 * 注意：子菜单仅在route children.length>=1时出现
 * 详情见: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，项目将不会显示在侧栏中（默认值为false）
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果未设置alwaysShow，则当项目有多个子路线时，
 *                                它将变为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置为noRedirect，noRedirect将不会在面包屑中重定向
 * name:'router-name'             该名称由<keep-alive>使用（必须设置！！！）
 * meta : {
    roles: ['admin','editor']     控制页面角色（您可以设置多个角色）
    title: 'title'                侧边栏和面包屑中显示的名称（推荐设置）
    icon: 'svg-name'/'el-icon-x'  侧边栏中显示的图标
    breadcrumb: false             如果设置为false，则项目将隐藏在breadcrumb中（默认为true）
    activeMenu: '/example/list'   如果设置路径，侧边栏将突出显示您设置的路径
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基础页面
 * 可以访问所有角色
 */
export const constantRoutes = [
  {
    path: '/login',
    // 引入views/login/index
    component: () => import('@/views/login/index'),
    // 渲染该路由入口
    hidden: true
  },

  {
    path: '/404',
    // 引入views/404
    component: () => import('@/views/404'),
    // 渲染该路由入口
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    // 在父子嵌套结构中，父级的redirect指向子级children里的path
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      // 该名称由<keep-alive>使用（必须设置！！！）
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    // 在父子嵌套结构中，父级的redirect指向子级children里的path
    redirect: '/example/table',
    name: 'Example',
    // 可以作用判断用户是否已登陆，可以通过meta值，展示面包屑
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404页必须放在末尾！！！
  { path: '*', redirect: '/404', hidden: true }
]

/**
 * 下面所有代码的讲解：
 * 它的原理其实很简单，所有的 vue-router 注册的路由信息都是存放在matcher之中的
 * 所以当我们想清空路由的时候，我们只要新建一个空的Router实例，将它的matcher重新赋值给我们之前定义的路由就可以了。
 * 巧妙的实现了动态路由的清除。
 * 现在我们只需要调用resetRouter，就能得到一个空的路由实例，之后你就可以重新addRoutes你想要的路由了。
 */

const createRouter = () => new Router({
  // mode: 'history', // 需要服务支持
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// 详情见: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 复位路由器
}

export default router
