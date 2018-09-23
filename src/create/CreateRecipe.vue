<template>
<div class="container w-50 mt-3">
  
  <div class="form-group">
    <input class="form-control" type="text" v-model="name" placeholder="name">
  </div>

  <div class="form-group">
    <select v-model="category" class="form-control">
      <option
        :value="c._id" 
        v-for="c in categories" 
        :key="c._id">{{c.name}}</option>
    </select>
  </div>

  <div class="form-group">
    <textarea class="form-control" v-model="content" placeholder="content"></textarea>
  </div>


  <button class="btn btn-primary"
    @click="createRecipe({name, category, content})">
    Submit
  </button>



</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data() {
    return {
      name: '', 
      content: '',
      category: 'italian'
    }
  },
  methods: {
    ...mapActions({
      createRecipe: 'recipes/createRecipe',
    })
  },
  computed: {
    ...mapGetters({
      categories: 'recipes/allCategories'
    })
  },
  async mounted() {
    this.$store.dispatch('recipes/loadAllCategories')
  },
  watch: {
    
  }
}
</script>
