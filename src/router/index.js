import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/manage',
    component: Layout,
    redirect: '/manage/table',
    name: '管理',
    meta: { title: '管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'tree',
        name: '区域管理',
        component: () => import('@/views/tree/index'),
        meta: { title: '区域管理', icon: 'tree' }
      },
      {
        path: 'device',
        name: '设备管理',
        component: () => import('@/views/device/index'),
        meta: { title: '设备管理', icon: 'theme' }
      },
      {
        path: 'table',
        name: '人员管理',
        component: () => import('@/views/table/index'),
        meta: { title: '人员管理', icon: 'user' }
      },
      {
        path: 'parameter',
        name: '参数设置',
        component: () => import('@/views/parameter/index'),
        meta: { title: '参数设置', icon: 'edit' }
      },
    ]
  },

  {
    path: '/wasi',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '瓦斯监测',
        component: () => import('@/views/wasi/index'),
        meta: { title: '瓦斯监测', icon: 'chart' }
      }
    ]
  },

  {
    path: '/wind',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '通风监测',
        component: () => import('@/views/wind/index'),
        meta: { title: '通风监测', icon: 'excel' }
      }
    ]
  },

  {
    path: '/equipment',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '设备监测',
        component: () => import('@/views/equipment/index'),
        meta: { title: '设备监测', icon: 'form' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '人员监测',
        component: () => import('@/views/user/index'),
        meta: { title: '人员监测', icon: 'peoples' }
      }
    ]
  },
  // 推演模块
  {
    path: '/derivation',
    component: Layout,
    redirect: '/derivation/table',
    name: '态势推演',
    meta: { title: '态势推演', icon: 'example' },
    children: [
      {
        path: 'single',
        name: '单因素',
        component: () => import('@/views/single/index'),
        meta: { title: '单因素', icon: 'form' }
      },
      {
        path: 'multi',
        name: '多因素',
        //component: Layout,
        //redirect: '/derivation/table/multi',
        component: () => import('@/views/multi/index'),
        meta: { title: '多因素', icon: 'chart' },
        children: [
          {
            path: 'rule',
            name: '强关联规则',
            component: () => import('@/views/multi/rule/index'),
            meta: { title: '强关联规则', icon: 'chart'}
          },
          {
            path: 'risk',
            name: '耦合风险值',
            component: () => import('@/views/multi/risk/index'),
            meta: { title: '耦合风险值', icon: 'chart'}
          },
          {
            path: 'trend',
            name: '演化趋势',
            component: () => import('@/views/multi/trend/index'),
            meta: { title: '演化趋势', icon: 'chart'}
          }
        ]
      }
    ]
  },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: '外部链接', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
