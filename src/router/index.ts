import { createRouter, createWebHistory } from 'vue-router'

//@ts-ignore
import IndexView from '@views/IndexView.vue'
//@ts-ignore
import HomeView from '@views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
  ],
})

export default router
