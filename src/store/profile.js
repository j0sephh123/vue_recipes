import ApiService from "../common/api";


const profile = {
  namespaced: true,
  state: {
    profile: {}
  },
  mutations: {
    loadProfile(state, value) {
      state.profile = value;
    }
  },
  actions: {
    async createProfile({commit, rootGetters}, {profileName, profileData}) {

      if(!rootGetters.currentUser.profile) {
        const {_id} = rootGetters.currentUser;

        const profileThings = {
          user: _id,
          name: rootGetters.currentUser.username
        }  

        ApiService.setHeader()
        let newProfile = await ApiService.post('profile', profileThings)

        console.log(newProfile);
      } else {
        console.log('Profile for this user already exists')
      }

    },
    async loadProfile({commit, rootGetters}, profileId){
      ApiService.setHeader()
      let result = await ApiService.get('profile/' + profileId)
      if(result.status === 200) {
        commit('loadProfile', result.data)
      }
    }
  },
  getters: {
    profile: state => state.profile
  }
}

export default profile