import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Register from "@/views/Register/register.vue";
import Recall from '@/views/RecallPassword/index.vue'
import ProjectInfo from "@/components/ProjectInfo.vue";
import UserProfile from "@/views/UserProfile/index.vue"
import MessageBoard from "@/views/MessageBoard/index.vue"
import UpdateLog from "@/views/updateLog/index.vue"
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
      component: Layout,
      children: [
        {
          path: "",
          component: Info,
          children:[
            {
              path: "",
              component: Coach
            },
            {
              path: "/info/coach",
              component: Coach
            },
            {
              path: "/info/student",
              component: Student
            },
            {
              path: "/info/graduation",
              component: Graduation
            },
            {
              path: "/info/bill",
              component: Bill
            },
            {
              path: "/info/train",
              component: Train
            }
          ]
        },
        {
          path: "/userProfile",
          component: UserProfile
        },
        {
          path: "/messageBoard",
          component: MessageBoard
        },
        {
          path: "/updateLog",
          component: UpdateLog
        }
      ]
    },
  ]
})

import {checkLogin} from "@/api/login/checkLogin.js";
import {message} from "ant-design-vue";
import Coach from "@/views/Layout/components/components/coach.vue";
import Student from "@/views/Layout/components/components/student.vue";
import Graduation from "@/views/Layout/components/components/graduation.vue";
import Bill from "@/views/Layout/components/components/bill.vue";
import Train from "@/views/Layout/components/components/train.vue";
import Info from "@/views/Layout/components/Info.vue";
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
