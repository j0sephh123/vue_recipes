<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <left-bar></left-bar>
      </div>

      <div class="col-9">
        
        <div class="d-flex justify-content-between">
          <span class="h5">Recipes count {{count}}</span>
          <span
            @click="displayAllRecipes()" 
            class="h5">See all</span>
          <div>
            <i  
              @click="changeColumnView({itemsPerRow: 12})"
              :class="viewClass.twelve"></i>&nbsp;
            <i 
              @click="changeColumnView({itemsPerRow: 6})"
              :class="viewClass.six"></i>&nbsp;
            <i  
              @click="changeColumnView({itemsPerRow: 4})"
              :class="viewClass.four"></i>
          </div>
        </div>

        <recipes></recipes>
        <pagination></pagination>
      </div>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import RecipesVue from './Recipes.vue';
import PaginationVue from './Pagination.vue';
import LeftBarVue from './LeftBar.vue';

export default {
  components: {
    recipes: RecipesVue,
    pagination: PaginationVue,
    leftBar: LeftBarVue
  },
  data() {
    return {
      activeChangeColumnViewIcon: 3,
      viewClass: {
        twelve: 'fas fa-lg fa-list-alt',
        six: 'fas fa-lg fa-th-large',
        four: 'fas fa-lg fa-th'
      }
    }
  },
  methods: {
    ...mapActions({
      displayAllRecipes: 'recipes/displayAllRecipes'
    }),
    changeColumnView(itemsPerRow) {
      this.$store.commit('recipes/itemsPerRow', itemsPerRow)
    },
  },
  computed: {
    ...mapGetters({
      count: 'recipes/count',
    }),
  },
  watch: {
    "$store.state.recipes.itemsPerRow"(val) {
      if(val === 12) {
        this.viewClass.twelve += ' text-primary';
        this.viewClass.six = 'fas fa-lg fa-th-large',
        this.viewClass.four = 'fas fa-lg fa-th'
      } else if (val === 6) {
        this.viewClass.twelve = 'fas fa-lg fa-list-alt';
        this.viewClass.six += ' text-primary',
        this.viewClass.four = 'fas fa-lg fa-th'
      } else if (val === 4) {
        this.viewClass.twelve = 'fas fa-lg fa-list-alt'
        this.viewClass.six = 'fas fa-lg fa-th-large',
        this.viewClass.four += ' text-primary';
      }
    }
  }
}
</script>
