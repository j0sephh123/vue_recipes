<template>
  <div class="modal" tabindex="-1" 
    style="display: none;" 
  data-backdrop='static'>
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" >
            <span >&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Modal body text goes here.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>

  <!-- <div :class="toggler ? 'modal is-active' : 'modal'">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Modal title</p>
        <button class="delete" 
          @click="modalToggler({recipeId: {}, showModal: false})"
        ></button>
      </header>
      <section class="modal-card-body">

        <div class="field">
          <div class="control">
            <textarea class="textarea" type="text" v-model="commentText"></textarea>
          </div>
        </div>

      </section>
      <footer class="modal-card-foot ">
        <div class="column is-offset-7">
          <button @click="addComment({commentText})"
            class="button is-outlined is-link">Save changes</button>
          <button class="button" 
            @click="modalToggler({recipeId: {}, showModal: false})"
          >Cancel</button>
        </div>

      </footer>
    </div>
  </div> -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      commentText: ''
    }
  },
  methods: {
    ...mapActions({
      addComment: 'recipes/addComment'
    }),
    modalToggler(arg){
      this.$store.commit('recipes/showModal', arg)
    }
  },
  computed: {
    ...mapGetters({
      toggler: 'recipes/toggler',
    })
  },
  mounted() {
    // console.log('modal mounted')
  }
}
</script>

