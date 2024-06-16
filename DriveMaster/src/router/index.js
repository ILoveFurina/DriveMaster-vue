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

export default router
