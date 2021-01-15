import _ from 'lodash'

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
    commit('setIsLoading', false)
  },

  async fetchMusic({ commit, state, dispatch }, {id}) {
    commit('setIsLoading', true)
    const {data} = await this.$axios.get('/musics/' + id)
  
    const versions = await dispatch('searchVersions', data.id )
    data.versions = versions
 
    commit('setMusic', data)    
    commit('setIsLoading', false)
  },
  
  async postDisc({ commit }, data) {
    await this.$axios.post('/discs', {...data})
  },

  async postMusic({ commit }, {data, id}) {
    await this.$axios.post('/musics', {...data, disc_id: id})
  },

  async postVersion({ commit }, {data, id}) {
    console.log(data)
    await this.$axios.post('/versions', {...data, music_id: id})
  },

  async deleteDisc({ commit }, id) {
    await this.$axios.delete('/discs/' + id)
  },

  async deleteMusic({ commit }, id) {
    await this.$axios.delete('/musics/' + id)
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
