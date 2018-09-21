<template>
<div class="section">
  <h1>Profile of {{profile.name}}</h1>
  <div v-if="!profile.name"> <!-- If there is not a profile, suggest to create one -->
    <button
      @click="createProfile"
      >Create profile
    </button>
  </div>

  <div class="section"> <!-- display profile details -->
    <div class="columns is-mobile is-multiline">
      <div class="column card is-3" v-for="recipe in profile.recipes" :key="recipe._id">
        
        <div class="card">


          <div class="card-image">
            <figure class="image is-4by3">
              <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content">

            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48 ">
                  <img class="is-rounded" src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4"><router-link :to="{path: '/recipes/' + recipe._id}">{{recipe.name}}</router-link></p>
                <p class="subtitle is-6">category</p>
              </div>
            </div>

            <div class="content">{{recipe.content}}<br><time>{{recipe.createdAt.substr(0, 10)}}</time></div>
          </div>

            <footer class="card-footer">
              <a href="#" class="card-footer-item">Save</a>
              <a href="#" class="card-footer-item">Edit</a>
              <a href="#" class="card-footer-item">Delete</a>
            </footer>


        </div>        
      </div>
    </div>

    <!-- <div>Comments count: {{profile.comments.length}} </div>
    <div>Ratings  count: {{profile.ratings.length}} </div> -->

  </div>
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
      createProfile: 'profile/createProfile'
    })
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentUser',
      profile: 'profile/profile'
    })
  },
  async mounted(){
    await this.$store.dispatch('profile/loadProfile', this.$store.getters.currentUser.profile._id)
  },
  watch: {
    
  }
}
</script>
<style scoped>



</style>
