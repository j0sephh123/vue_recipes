<template>
<div class="row">

  <div v-for="recipe in recipes" :key="recipe._id" 
    :class="recipesPerRow(itemsPerRow)">

    <div class="card-header">Header</div>

    <div class="card-body">
      <router-link class="card-title" tag='h4' :to="{path: '/recipes/' + recipe._id}">
        {{recipe.name}}
      </router-link>
      <p class="card-text">{{recipe.content}}</p>

    </div>

    <div class="card-footer">

      <p>Category: {{recipe.category.name}}</p>
      <p>Author: 
        <router-link :to="{path: '/profile/' + recipe.profile._id}">{{recipe.profile.name}}</router-link>
      </p>
      <button 
        v-show='conditionallyRenderDeleteBtn(recipe)'
        class="btn btn-primary" @click="deleteRecipe(recipe._id)">
        Delete
        </button>
    </div>
  </div>
  
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import commentModal from '@/modals/commentModal';

export default {
  components: {
    commentModal: commentModal,
  },
  data() {
    return {
      comment: '',
      rating: '',
    }
  },
  methods: {
    ...mapActions({
      deleteRecipe: 'recipes/deleteRecipe',
      createComment: 'recipes/createComment',
      createRating: 'recipes/createRating'
    }),
    modalToggler(arg) {
      this.$store.commit('recipes/showModal', arg)
    },
    conditionallyRenderDeleteBtn(recipe) {
      if(recipe.profile._id === this.$store.getters.currentUser.profile._id) {
        return true;
      } else {
        return false;
      }
    },
    recipesPerRow(itemsPerRow) {
      return `col-${itemsPerRow} card border-primary mb-3"`;
    }
  },
  computed: {
    ...mapGetters({
      recipes: 'recipes/allRecipes',
      errors: 'recipes/errors',
      count: 'recipes/count',
      currentUser: 'currentUser',
      profile: 'profile/profile',
      itemsPerRow: 'recipes/itemsPerRow'
    }),
  },
  async mounted(){
    console.log(this.$store.state.recipes.allRecipes)
    await this.$store.dispatch('profile/loadProfile', this.$store.getters.currentUser.profile._id),
    await this.$store.dispatch('recipes/loadAllRecipes')
  }
}
</script>

<style scoped>

.card-title {
  cursor: pointer;  
}
.card-title:hover {
  color: blue;
  text-transform: uppercase;
}

</style>
