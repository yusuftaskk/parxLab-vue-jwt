import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)
import store from "@/store"
const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        next();
      } else {
        next("/Login")
      }
    }
  },
  {
    path: '/Login',
    name: 'LoginPage',
    component: () => import( /* webpackChunkName: "about" */ '../views/LoginPage.vue'),
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router