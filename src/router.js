import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    { // auth
      path: '/register',
      name: 'register',
      component: () => import('./auth/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./auth/Login.vue')
    }, 
    // Recipes
    {
      path: '/recipes/create',
      name: 'createRecipe',
      component: () => import('./create/CreateRecipe.vue'),
      // beforeEnter(to, from, next) {
      //   if(store.getters.isAuthenticated){
      //     next()
      //   } else {
      //     next('/login')
      //   }
      // }
    }, 
    {
      path: '/recipes',
      name: 'recipes',
      component: () => import('./components/RecipesContainter'),
      // beforeEnter(to, from, next) {
      //   if(store.getters.isAuthenticated){
      //     next()
      //   } else {
      //     next('/login')
      //   }
      // }
    }, 
    {
      path: '/recipes/:id',
      name: 'oneRecipe',
      component: () => import('./components/OneRecipe'),
      // beforeEnter(to, from, next) {
      //   if(store.getters.isAuthenticated){
      //     next()
      //   } else {
      //     next('/login')
      //   }
      // }
    }, 

    // Profile
    {
      path: '/profile/:id',
      name: 'profile',
      component: () => import('./components/Profile.vue'),
      // beforeEnter(to, from, next) {
      //   if(store.getters.isAuthenticated){
      //     next()
      //   } else {
      //     next('/login')
      //   }
      // }
    }, 
  ]
})

