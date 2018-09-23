<template>
  <div>
    <b-pagination
      v-show="!displayAllRecipes"
      :total-rows="count"
      :per-page="limit"
      v-model="currentPage" />
    
    <button 
      @click="loadMore()"
      v-show="displayAllRecipes"
      class="btn btn-primary btn-block"
    >Load more</button>
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
      loadMore: 'recipes/loadMore'
    })
  },
  computed: {
    ...mapGetters({
      pages: 'recipes/pages',
      count: 'recipes/count',
      limit: 'recipes/limit',
      displayAllRecipes: 'recipes/displayAllRecipes',
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
