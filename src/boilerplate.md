<template>
<div class="section">
  <h1>Profile </h1>
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
      
    })
  },
  mounted(){
    
  },
  watch: {
    
  }
}
</script>


      <select v-model="rating">
        <option disabled value="">Select dropdown</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <button 
        @click="createRating({rating, recipe})"
      >Submit rating</button>


      
      <button 
        @click="modalToggler({recipeId: recipe._id, showModal: true})">
        Add new comment
      </button>
      <comment-modal></comment-modal>