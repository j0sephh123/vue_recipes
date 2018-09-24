import ApiService from '@/common/api'

const users = {
  namespaced: true,
  state: {
    users: []
  },
  mutations: {
    loadUsers(state, users) {
      state.users = users;
    }
  },
  actions: {
    async loadUsers({commit}) {
      console.log('load users fn');
      const users = await ApiService.get(
        `/user`
        )
      if(users.status === 200) {
        commit('loadUsers', users.data)
      }
    }
  },
  getters: {
    users: state => state.users
  }
}

export default users;