<template>
  <div>
    <h1 class="display-4">All users</h1>
    <ul class="list-group">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="user in users" :key="user._id"
        >{{user.username}}
        
        <i class="fas fa-edit"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data() {
    return {
      
    }
  },
  methods: {
    ...mapActions({
    })
  },
  computed: {
    ...mapGetters({
      users: 'users/users'
    })
  },
  async mounted(){
    this.$store.dispatch('users/loadUsers')
  },
  watch: {
    
  }
}
</script>
