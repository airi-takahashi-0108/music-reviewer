import _ from 'lodash'

export const state = () => ({
  userName: "IBUKI",
  userImage: "~/mock/musics/users/current.jpg",
  isLoading: false,
})

export const getters = {
  getUserName: (state) => state.userName,
  getUserImage: (state) => state.userImage,
  getIsLoading: (state) => state.isLoading,
}

export const mutations = {
  setUserName(state, userName) {
    state.userName = userName
  },
  setUserImage(state, userImage) {
    state.userImage = userImage
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },
}

export const actions = {
  async fetchUser({commit}, query) {
    commit('setIsLoading', true)
    commit('setIsLoading', false)
  },
  async login({commit}, query) {
    commit('setIsLoading', true)
      await this.$axios.post('/login', {...query})
    commit('setIsLoading', false)
  },
  async logout({commit}, query) {
    commit('setIsLoading', true)
      await this.$axios.delete('/logout', {...query})
    commit('setIsLoading', false)
  },
  async createUser({commit}, query) {
    commit('setIsLoading', true)
    commit('setIsLoading', false)
  },
  async deleteUser({commit}, query) {
    commit('setIsLoading', true)
    commit('setIsLoading', false)
  },
}
