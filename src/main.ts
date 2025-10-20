import './assets/main.css'
import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from '@/scripts/firebase'

const app = createApp(App)

// https://vuefire.vuejs.org/guide/getting-started.html
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
})

app.use(router)

app.mount('#app')
