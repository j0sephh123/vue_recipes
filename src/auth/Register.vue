<template>
  <div class="container">
      <h3>Register</h3>

      <div class="form-group">
        <input 
          v-model="username" class="form-control" 
          type="text"  placeholder="name">
      </div>

      <div class="form-group">
        <input 
          v-model="email" class="form-control" 
          type="email"  placeholder="email">
      </div>

      <div class="form-group">
        <input 
          class="form-control" type="password" 
          v-model="password" placeholder="password" />
      </div>

      <b-button @click.prevent="register">Register</b-button>


  </div>
</template>

<script>

export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async register(){

      const registeredUser = await this.axios({
        method: 'post',
        url: '/auth/local/register',
        data: {
          username: this.username, 
          email: this.email, 
          password: this.password
        }
      })

      const {jwt} = registeredUser.data


      // auto login user when registering
      // set token
      window.localStorage.setItem('id_token', jwt)
      // commit is auth
      this.$store.commit('authSetter', {
        token: jwt,
        user: registeredUser.data
      })
      // push router to '/'
      this.$router.push('/')
    }
  }
}
</script>

