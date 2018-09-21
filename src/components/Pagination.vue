<template>
  <div>
    <b-pagination
      :total-rows="count"
      :per-page="limit"
      v-model="currentPage" />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data () {
    return {
      currentPage: 1
    }
  },
  methods: {
    ...mapActions({
    })
  },
  computed: {
    ...mapGetters({
      pages: 'recipes/pages',
      count: 'recipes/count',
      limit: 'recipes/limit',
    })
  },
  mounted(){
    this.$store.dispatch('recipes/countRecipes')
  },
  watch: {
    currentPage(page) {
      this.$store.dispatch('recipes/changePage', {page})
    }
  }
}
</script>
