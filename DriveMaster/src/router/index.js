import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Register from "@/views/Register/register.vue";
import Recall from '@/views/RecallPassword/index.vue'
import ProjectInfo from "@/components/ProjectInfo.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/recall',
      component: Recall
    },
    {
      path: '/projectInfo',
      component: ProjectInfo
    },
    {
      path: '/',
      component: Layout
    },
  ]
})

import {checkLogin} from "@/api/login/checkLogin.js";
import {message} from "ant-design-vue";
router.beforeEach(async (to, from, next) => {
  // 如果是访问登录页面，直接放行
  if (to.path === '/login') {
    next();
  } else {
    // 调用 checkLogin 函数检查是否已登录
    const isLoggedIn = await checkLogin();
    if (isLoggedIn) {
      // 如果已登录，放行
      next();
    } else {
      // 如果未登录且访问的是根路径，重定向到登录页面
      if (to.path === '/') {
        message.error("请先登录",3)
        next({ path: '/login' });
      } else {
        // 如果访问的是其他路径，放行
        next();
      }
    }
  }
});

export default router
