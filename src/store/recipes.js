import ApiService from '@/common/api'

const recipes = {
  namespaced: true,
  state: {    
    allRecipes : [],
    currentRecipe: {},
    showModal: false,
    currentComment: {},
    count: null,
    filter: {
      start: 0,
      limit: 6
    }
  },
  mutations: {
    loadAllRecipes(state, data) {
      state.allRecipes = data
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
      // console.log('start ', state.filter.start);
      // console.log('limit ', state.filter.limit);
      ApiService.setHeader()
      const allRecipes = await ApiService.get(
        `/recipe?_start=${state.filter.start}&_limit=${state.filter.limit}`
      )
      console.log(allRecipes);
      if(allRecipes.status === 200) {
        commit('loadAllRecipes', allRecipes.data)
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
    } 
  },
  getters: {
    allRecipes: state => state.allRecipes,
    currentRecipe: state => state.currentRecipe,
    toggler: state => state.showModal,
    currentComment: state => state.currentComment,
    count: state => state.count,
    pages: state => Math.ceil(state.count/6),
    limit: state => state.filter.limit,
  }
}

export default recipes