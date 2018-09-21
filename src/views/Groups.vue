<template>
  <div><br><br><br><br><br>Groups
    <div class="container"><br><br><br>
    <div v-for="group in groups" :key="group._id"
      class="card">

      <div class="card-header">
        <div class="card-header-title">
          <span>{{group.groupName}}</span>
        </div>

        <a class="card-header-icon">
          <button 
            @click="modalToggler({groupId: group, showModal: true})"
            class="button is-light">Update</button>
        </a>
        <a class="card-header-icon">
          <button 
            @click="deleteGroup(group._id)"
            class="button is-light">Delete</button>
        </a>
      <groupModaL></groupModaL>
      </div>
      
        

    </div>
  </div>
</div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import GroupModal from '@/components/GroupModal'

export default {
  components: {
    groupModaL: GroupModal
  },
  computed: {
    ...mapGetters({
      groups: 'groups/groups'
    })
  },
  methods: {
    ...mapActions({
      deleteGroup: 'groups/deleteGroup'
    }),
    modalToggler(arg) {
      this.$store.commit('groups/showModal', arg)
    },
  },
  mounted(){
    this.$store.dispatch('groups/loadGroups');
    this.$store.dispatch('drugs/loadDrugs');
  },
  watch: {
    '$store.state.redirect'(newVal) {
      if(newVal === true) this.$router.push('/groups/create')
      this.$store.commit('groups/redirect', false)
    },
    '$store.state.groups.refresh'(newVal) {
      if(newVal === true) this.$router.go(this.$router.currentRoute)
    },
  }
}
</script>
