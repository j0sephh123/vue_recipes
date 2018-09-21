<template>
  <div class="container">

    <div class="form-group">
      <input 
        v-model="username" class="form-control" 
        type="text"  placeholder="name">
    </div>

    <div class="form-group">
      <input 
        class="form-control" type="password" 
        v-model="password" placeholder="password" />
    </div>


    <button class="btn btn-primary"
      @click.prevent="login">
      Login
    </button>

    <button class="btn btn-secondary"
      @click.prevent="login(true)">
      Quick login as sven
    </button>

  </div>
</template>

<script>
import to from 'await-to-js'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login(arg){
      let loginResult
      if(arg === true) {
        loginResult = await this.$store.dispatch('login', {identifier: 'sven', password: 'sven'})
      } else {
        loginResult = await this.$store.dispatch('login', {identifier: this.username, password: this.password})
      }
        
      if(loginResult) {
        this.$router.push('/')
      }    
    }
  }
}
</script>

