import { createRouter, createWebHistory } from 'vue-router'

//@ts-ignore
import IndexView from '@views/IndexView.vue'
//@ts-ignore
import HomeView from '@views/HomeView.vue'
import InvalidView from '@/views/InvalidView.vue'
import { useCurrentUser } from 'vuefire'

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
    // vue dynamic route, and route with chidlren
    // {
    //   path: '/sheet/:id',
    //   name: 'sheet-detail',
    //   component: SheetDetailView,
    //   children: [
    //      {
    //        path: 'profile',
    //        component: ProfileView,
    //      },
    //      {
    //        path: 'settings',
    //        component: SettingsView,
    //      },
    //    ]
    // },
    {
      // vue 404
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: InvalidView,
    },
  ],
})

// use this to auth check, not quite correct yet
router.beforeEach((to, from) => {
  const user = useCurrentUser()

  if (!user) {
    return false
  }

  return true
})

export default router
