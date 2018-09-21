<template>
<div class="container w-50 mt-3">
  
  <div class="form-group">
    <input class="form-control" type="text" v-model="name" placeholder="name">
  </div>

  <div class="form-group">
    <textarea class="form-control" v-model="content" placeholder="content"></textarea>
  </div>


  <button class="btn btn-primary"
    @click="createRecipe({name, content})">
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
      content: ''
    }
  },
  methods: {
    ...mapActions({
      createRecipe: 'recipes/createRecipe'
    })
  },
  computed: {
    ...mapGetters({
      
    })
  },
  mounted(){
    
  },
  watch: {
    
  }
}
</script>
