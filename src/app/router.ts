import { createRouter, createWebHistory } from 'vue-router'
import GamePage from '@/pages/GamePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: GamePage,
    },
  ],
})

export default router
