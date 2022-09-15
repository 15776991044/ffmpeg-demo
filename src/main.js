import { createApp } from 'vue'
import App from './App.vue'
import routes from './router'
import {createRouter,createWebHistory} from 'vue-router'
const router=createRouter({
  history:createWebHistory(),
  routes
})


import { sleep } from './scripts/sleep'

const app=createApp(App).use(router)
app.config.globalProperties.$sleep=sleep
app.mount('#app')
