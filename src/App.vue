<template>
<div class="container">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/">Home</router-link>

      <ul v-show="isAuthenticated" class="navbar-nav mr-auto">
        <li class="nav-item ">
          <router-link class='nav-link' to="/recipes/create">
            Create Recipe
          </router-link>
        </li>
        <li class="nav-item ">
          <router-link class='nav-link' to="/recipes">
            List all recipes
          </router-link>
        </li>
      </ul>
        <!-- not auth -->

        <ul class="navbar-nav ">

          <li v-show="!isAuthenticated" class="navbar-item ">
            <router-link class='nav-link' 
              to="/register">Register
            </router-link>
          </li>
          <li v-show="!isAuthenticated" class="navbar-item">
            <router-link class='nav-link' 
              to="/login">Login
            </router-link>
          </li>

          <!-- auth -->

          <li v-show="isAuthenticated" class="navbar-item">
            <router-link class='nav-link' :to="{path: '/profile/' + currentUser._id}">
              {{currentUser.username}}
            </router-link>
          </li>
          <li v-show="isAuthenticated" class="navbar-item">
            <a class='nav-link' href="" @click="logout">
              Logout
            </a>
          </li>
        </ul>

  </nav>
    <router-view></router-view>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import to from 'await-to-js'

export default {
  data(){
    return {

    }
  },
  computed: {
    ...mapGetters({
      
      isAuthenticated: 'isAuthenticated',
      currentUser: 'currentUser'
    })
  },
  methods: {
    logout(){
      // clear token
      window.localStorage.removeItem('id_token');
      // set is auth false 
      this.$store.commit('authSetter', {
        token: null
      })
      // we need to refresh the page otherwise we get 403, dunno why. 
      this.$router.push('/')
      this.$router.go('/')
    }
  },
  async mounted() {
    if(window.localStorage.getItem('id_token')){
      
      // this needs to be an action

      let err, currentUser
      [err, currentUser] = await to (
        this.axios({
          method: 'get',
          url: '/user/me',
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem('id_token')
          }
        })
      )

      // ------------------------------------------
      // 

      if(currentUser){
        this.$store.commit('authSetter', {
          token: window.localStorage.getItem('id_token'),
          user: currentUser.data
        })
      } else {
        this.$router.push('/login')
      }
    }
  },
  watch: {

  }
}
</script>

<style>



</style>

