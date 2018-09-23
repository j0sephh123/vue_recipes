import ApiService from '@/common/api'

const recipes = {
  namespaced: true,
  state: {    
    allRecipes : [],
    currentRecipe: {},
    showModal: false,
    currentComment: {},
    count: 0,
    filter: {
      start: 0,
      limit: 6
    },
    itemsPerRow: 4,
    displayAllRecipes: false,
    loadMore: {
      start: 6,
      limit: 6
    }
  },
  mutations: {
    loadAllRecipes(state, data) {
      state.allRecipes = data
    },
    loadMoreRecipes(state, data) {
      state.allRecipes = state.allRecipes.concat(data);
      state.loadMore.start += 6;
    },
    loadOneRecipe(state, data) {
      state.currentRecipe = data;
    },
    showModal(state, {recipeId, showModal}) {
      state.currentRecipe = recipeId;
      state.showModal = showModal;
    },
    setCurrentComment(state, {comment, bool}) {
      bool ? state.currentComment = comment : state.currentComment = {};
    },
    setCount(state, count) {
      state.count = count;
    },
    changePage(state, {page}) {
      state.filter.start = +page - 1;
    },
    itemsPerRow(state, {itemsPerRow}) {
      state.itemsPerRow = itemsPerRow;
    },
    displayAllRecipes(state) {
      state.displayAllRecipes = !state.displayAllRecipes;
    }
  },
  actions: {
    async createRecipe({rootGetters}, data) {
      const recipeData = {
        name: data.name,
        content: data.content,
        profile: rootGetters.currentUser.profile._id,
      }

      ApiService.setHeader()
      const result = await ApiService.post('recipe', recipeData)
      console.log(result);

    },
    async loadAllRecipes({commit, state}) {
      if(!state.displayAllRecipes) { // false
        ApiService.setHeader()
        const allRecipes = await ApiService.get(
          `/recipe?_start=${state.filter.start}&_limit=${state.filter.limit}`
          )
          if(allRecipes.status === 200) {
            commit('loadAllRecipes', allRecipes.data)
          }
      }
    },
    async loadMore({commit, state}) {
      ApiService.setHeader()
      const loadMoreRecipes = await ApiService.get(
        `/recipe?_start=${state.loadMore.start}&_limit=${state.loadMore.limit}`
      )
      console.log(loadMoreRecipes.data);
      console.log(state.loadMore.start, "start");
      console.log(state.loadMore.limit, "limit");
      if(loadMoreRecipes.status === 200) {
        commit('loadMoreRecipes', loadMoreRecipes.data)
      }
    },
    async changePage({commit, state, dispatch}, page) {
      // start is page - 1
      commit('changePage', page);
      // limit is constant.
      dispatch('loadAllRecipes')
    },
    async deleteRecipe({}, recipeId) {
      ApiService.setHeader()      
      const deletedResult = await ApiService.delete('recipe/' + recipeId)
      console.log(deletedResult);
    },
    async createRating({rootGetters}, {rating, recipe}) {

        let bool = true;
        recipe.ratings.map(r => {
          if(r.profile === rootGetters.currentUser.profile._id) {
            bool = false;
          }
        })

        if(bool) {
          const data = {
            ratingValue: rating,
            profile: rootGetters.currentUser.profile._id,
            recipe: recipe._id
          }

          ApiService.setHeader()
          const createdRating = await ApiService.post('rating', data)
          console.log(createdRating);
        } else {
          console.log('already rated.');
        }

    }, 
    async loadOneRecipe({commit}, {recipeId}) {
      ApiService.setHeader()
      const foundRecipe = await ApiService.get('recipe/' + recipeId)
      if(foundRecipe.status === 200) {
        commit('loadOneRecipe', foundRecipe.data)
      }
    },
    async submitComment({commit, state, rootGetters}, {text}) {
      console.log('submit comment here');
      const data = {
        text,
        profile: rootGetters.currentUser.profile._id,
        recipe: state.currentRecipe
      }
      ApiService.setHeader()
      const submittedComment = await ApiService.post('comment', data)
      console.log(submittedComment);
    },
    async deleteComment({commit, rootGetters, state}, {commentId}) {
      ApiService.setHeader()
      const deletedComment = await ApiService.delete('comment/' + commentId)
      console.log(deletedComment);
    }, 
    async editComment({commit, rootGetters, state}, {text}) {
      console.log(state.currentComment._id);
      ApiService.setHeader()
      const updatedResult = await ApiService.put(
        'comment/' + state.currentComment._id, {text}
      )
      console.log(updatedResult);
      // if(updatedResult.status === 200) {
      //   commit('showModal', {drugId: {}, showModal: false})
      //   commit('refresh', true)
      // }


    }, // todo
    async openEditModal({commit, rootGetters, state}, {comment}) {
      // set current comment
      commit('setCurrentComment', {comment, bool: true})
      // update...
    }, 
    async closeEditModal({commit}){
      commit('setCurrentComment', {bool: false})
    },
    async countRecipes({commit}) {
      ApiService.setHeader();
      const count = await ApiService.get('recipe/count')
      if(count.status === 200) {
        commit('setCount', count.data)
      }
    },
    displayAllRecipes({commit}) {
      commit('displayAllRecipes')
    },

  },
  getters: {
    allRecipes: state => state.allRecipes,
    currentRecipe: state => state.currentRecipe,
    toggler: state => state.showModal,
    currentComment: state => state.currentComment,
    count: state => state.count,
    pages: state => Math.ceil(state.count/6),
    limit: state => state.filter.limit,
    itemsPerRow: state => state.itemsPerRow,
    displayAllRecipes: state => state.displayAllRecipes,
  }
}

export default recipes