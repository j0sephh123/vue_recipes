<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <left-bar></left-bar>
      </div>

      <div class="col-9">
        <span>Recipes count {{count}}</span>
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
      
    }
  },
  methods: {
    ...mapActions({
      
    }),
    
  },
  computed: {
    ...mapGetters({
      count: 'recipes/count',
    }),
  },
}
</script>
