<template>
  <div><h1 class="my-4">Recipes</h1>
    <b-list-group>
      <b-list-group-item
        @click="filterRecipes({by: null, value: null})"
      >Clear filter</b-list-group-item>
      <b-list-group-item
        :class="activeLink === 'categories' ? 'activeLinkClass' : ''"
        @click="setActiveLink('categories')"
        v-b-toggle.collapse1>Categories
      </b-list-group-item>

      <b-collapse id="collapse1" class="mt-2">
        <b-list-group-item
          @click="filterRecipes({by: 'category', value: c.name})" 
          v-for="c in categories" 
          :key="c._id">{{c.name}}
        </b-list-group-item>
      </b-collapse>

      <b-list-group-item
        :class="activeLink === 'else' ? 'activeLinkClass' : ''"
        @click="setActiveLink('else')"
        v-b-toggle.collapse2>Something else
      </b-list-group-item>

      <b-collapse id="collapse2" class="mt-2">
        <b-list-group-item>else1</b-list-group-item>
        <b-list-group-item>else2</b-list-group-item>
        <b-list-group-item>else3</b-list-group-item>
      </b-collapse>
      
    </b-list-group>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data() {
    return {
      activeLink: null
    }
  },
  methods: {
    ...mapActions({
      filterRecipes: 'recipes/filterRecipes'
    }),
    setActiveLink(arg) {
      this.activeLink = arg;
    }
  },
  computed: {
    ...mapGetters({
      categories: 'recipes/allCategories'
    })
  },
  async mounted(){
    this.$store.dispatch('recipes/loadAllCategories')
  },
  watch: {
    
  }
}
</script>

<style>
.activeLinkClass {
  text-decoration: underline;
  color: purple;
}

</style>
