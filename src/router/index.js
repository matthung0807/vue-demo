import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // 👈 define root route
      name: 'home',
      component: HomeView, // 👈 point to a component
    },
  ],
})

export default router
