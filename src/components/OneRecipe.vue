<template>
<div class="container">



  <div class="jumbotron">
    <h1 class="display-4">{{recipe.name}}</h1>
    <p class="lead">text</p>
    <hr class="my-4">
    <p>{{recipe.content}}</p>
    <div>
      <b-form-select v-model="rating" :options="ratingOptions" class="mb-3">
        <option :value="null">Please select an option</option>
      </b-form-select>
    </div>

    <b-btn 
      variant="secondary" 
      size='lg'
      @click="showComments = !showComments">Show/Hide comments
    </b-btn>

    <b-btn 
      v-b-modal="'showAddCommentModal'"
      variant="secondary"
      size='lg'
      >Add a comment
    </b-btn>
  </div>

  <b-modal 
    @ok="submitComment({text: commentText})"
    id='showAddCommentModal'>

    <div class="form-group">
      Add a comment<textarea class="form-control" rows="3" v-model="commentText"></textarea>
    </div>
  </b-modal>

  <ul v-show="showComments" class="list-group">
    <li v-for="comment in recipe.comments" :key="comment._id" 
      class="list-group-item">
         Author: <router-link :to="{path: '/profile/' + comment.profile._id,}">
         {{comment.profile.name}}
        </router-link>

        

        <b-btn 
          v-show="conditionallyRenderBtn(comment)"
          @click="deleteComment({commentId: comment._id})"
          >Delete Comment
        </b-btn>

        <b-btn
          v-show="conditionallyRenderBtn(comment)"
          @click="openEditModal({comment})"
          v-b-modal="'editModal'">Edit comment</b-btn>
        <br>
        {{comment.text}}
    </li>

    <b-modal 
      @hidden="closeEditModal"
      @ok="editComment({text: newEditValue})"
      id="editModal">
      
      <div class="form-group"> <!-- old comment -->
        <textarea  
          v-model="currentComment.text" class="form-control" rows="3" disabled>
        </textarea>
      </div>

      <div class="form-group"> <!-- new comment -->
        <textarea class="form-control" rows="3" 
          v-model="newEditValue"></textarea>
      </div>
      
    </b-modal>

  </ul>

</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data() {
    return {
      showComments: true,
      commentText: '',
      showEditModal: false,
      newEditValue: '',
      rating: null,
      ratingOptions: [1,2,3,4,5]
    }
  },
  methods: {
    ...mapActions({
      submitComment: 'recipes/submitComment',
      deleteComment: 'recipes/deleteComment',
      editComment: 'recipes/editComment',
      openEditModal: 'recipes/openEditModal',
      closeEditModal: 'recipes/closeEditModal',
    }),
    conditionallyRenderBtn(comment) {
      if(comment.profile._id === this.$store.getters.currentUser.profile._id) {
        return true;
      } else {
        return false;
      }
    } // todo
  },
  computed: {
    ...mapGetters({
      recipe: 'recipes/currentRecipe',
      currentComment: 'recipes/currentComment'
    }), 
  },
  async mounted(){
    this.$store.dispatch('recipes/loadOneRecipe', {recipeId: this.$route.params.id})
  },
  watch: {
    
  }
}
</script>
