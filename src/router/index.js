import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    redirect: '/login',
    name: 'login',
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        meta: { title: '首页', icon: 'dashboard' },
        
      }
    ]
  },
  {
    path: '/european-table',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: '',
        component: () => import('@/views/table/publicTable'),
        name: 'europeanTable',
        meta: { title: '中国VS欧盟标准', icon: 'oumeng' }
      }
    ]
  },
  {
    path: '/korea-table',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: '',
        component: () => import('@/views/table/publicTable'),
        name: 'koreaTable',
        meta: { title: '中国VS韩国标准', icon: 'america' }
      }
    ]
  },
  {
    path: '/user-table',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: '',
        component: () => import('@/views/table/userTable'),
        name: 'userTable',
        meta: { title: '用户管理', icon: 'user' }
      }
    ]
  },
  {
    path: '/answer-table',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: '',
        component: () => import('@/views/table/answerTable'),
        name: 'answerTable',
        meta: { title: '问题评论管理', icon: 'answer' }
      }
    ]
  },
  {
    path: '/feedback-table',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/table/feedbackTable'),
        name: 'feedbackTable',
        meta: { title: '问题反馈', icon: 'feedback' }
      }
    ]
  },
  {
    path: '/system-table',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/table/systemTable'),
        name: 'systemTable',
        meta: { title: '系统管理', icon: 'system' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
