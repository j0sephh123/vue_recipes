import Vue from 'vue'
import Vuex from 'vuex'

import to from 'await-to-js' // for async/await
import ApiService from '../common/api';

import recipes from './recipes'
import profile from './profile'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    recipes, profile
  },
  state: {
    isAuthenticated: false,
    currentUser: {},
    redirect: false,
  },
  mutations: {
    authSetter(state, {token, user}){
      if(token === null) { // logged out
        state.isAuthenticated = false
        state.currentUser = {};
        return;
      } // token present
      state.isAuthenticated = true;
      state.currentUser = user;
    },
    redirect(state, bool) {
      state.redirect = bool;
    },
  },
  actions: {
    async login({commit}, data) {
      let err, user;
      console.log(data);
      [err, user] = await to(ApiService.post('/auth/local', data))

      if(!user) return false; 
      // below that means that we have a user...

      window.localStorage.setItem('id_token', user.data.jwt) 

      // 2nd async rec to /user/me
      ApiService.setHeader();
      const userMe = await ApiService.get('/user/me')

      commit('authSetter', {token: user.data.jwt, user: userMe.data})
      return true;
    },
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    currentUser: state => state.currentUser
  }
})
