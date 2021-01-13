import _ from 'lodash'

// music: {
//     id: "001",
//     version: "1.0.0",
//     title: "Achromatic Sun",
//     comment: "PV化する予定です、よろしくお願いします。テストテストテストテストテストテストテストテストテストテストテストテスト",
//     versions: [{
//       id: "A001",
//       version: "1.0.0",
//       created: "2020-12-24 15:00",
//       src: "/music/001.mp3",
//       comments: []
//     },
//     {
//       id: "A002",
//       version: "2.0.0",
//       created: "2021-01-07 15:00",
//       src: "/music/002.mp3",
//       comments: []
//     }]
//   },

export const state = () => ({
  discList: [],
  music: {},
  isLoading: false
})

export const getters = {
  getDiscList: (state) => state.discList,
  getMusic: (state) => state.music,
  getIsLoading: (state) => state.isLoading,
}

export const mutations = {
  setDiscList(state, discList) {
    state.discList = discList
  },
  setMusic(state, music) {
    state.music = music
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },
}

export const actions = {
  async fetchDiscList({ commit, state, dispatch }) {
    commit('setIsLoading', true)
    const {data} = await this.$axios.get('/discs')

    for (let disc of data) {
      const musics = await dispatch('searchMusics', { id: disc.id })
      disc.musics = musics
    }
 
    commit('setDiscList', data)    
    console.log(state.discList)
    commit('setIsLoading', false)
  },

  async fetchMusic({ commit, state, dispatch }, {id}) {
    commit('setIsLoading', true)
    const {data} = await this.$axios.get('/musics/' + id)

    const versions = await dispatch('searchVersions', data.disc_id)
    data.versions = versions
 
    commit('setMusic', data)    
    commit('setIsLoading', false)
  },

  async searchVersions({ commit}, id) {
    const {data} = await this.$axios.get('/versions', { params: {music_id: id} })
    return data
  },
  async searchMusics({ commit }, {id}) {
    const {data} = await this.$axios.get('/musics', { params: {disc_id: id} })
    return data
  }
}
