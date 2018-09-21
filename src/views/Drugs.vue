<template>
  <div class="container"><br><br><br>
    <div v-for="drug in drugs" :key="drug._id"
      class="card">

      <div class="card-header">
        <div class="card-header-title">
          <span>{{drug.inn}}</span>
        </div>

        <a class="card-header-icon">
          <button @click="modalToggler({drugId: drug._id, showModal: true})"
            class="button is-light">Update</button>
        </a>
        <a class="card-header-icon">
          <button @click="deleteDrug(drug._id)"
            class="button is-light">Delete</button>
        </a>
      <modal></modal>
      </div>
      
        

    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import DrugModal from '@/components/DrugModal'

export default {
  components: {
    modal: DrugModal
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters({
      drugs: 'drugs/drugs'
    })
  },
  methods: {
    ...mapActions({
      deleteDrug: 'drugs/deleteDrug'
    }),
    modalToggler(arg) {
      this.$store.commit('drugs/showModal', arg)
    },
  },
  watch: {
    '$store.state.drugs.redirect'(newVal) {
      if(newVal === true) this.$router.push('/drugs/create')
      this.$store.commit('drugs/redirect', false)
    },
    '$store.state.drugs.refresh'(newVal) {
      if(newVal === true) this.$router.go(this.$router.currentRoute)
    },
  },
  mounted() {
    this.$store.dispatch('drugs/loadDrugs')  
  }
}
</script>
