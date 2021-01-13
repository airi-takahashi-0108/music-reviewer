import _ from 'lodash'

export const state = () => ({
  discList: [{
    id: "001",
    title: "3rd Single",
    description: "6月発売",
    music: [{
      id: "001",
      title: "Achromatic Sun",
      comment: "PV化する予定です、よろしくお願いします。テストテストテストテストテストテストテストテストテストテストテストテスト"
    },
    {
      id: "002",
      title: "tomorrow",
      comment: ""
    }]
  },
  {
    id: "002",
    title: "4th Single",
    description: "来年発売",
    music: [{
      id: "003",
      title: "Rise!",
      comment: ""
    },
    {
      id: "004",
      title: "We are No1",
      comment: ""
    }]
  }],
  music: {
    id: "001",
    version: "1.0.0",
    title: "Achromatic Sun",
    comment: "PV化する予定です、よろしくお願いします。テストテストテストテストテストテストテストテストテストテストテストテスト",
    versionList: [{
      id: "A001",
      version: "1.0.0",
      created: "2020-12-24 15:00",
      src: "/music/001.mp3",
      comments: []
    },
    {
      id: "A002",
      version: "2.0.0",
      created: "2021-01-07 15:00",
      src: "/music/002.mp3",
      comments: []
    }]
  },
  isLoading: false
})

export const getters = {
  getDiscList: (state) => state.discList,
  getMusic: (state) => state.music,
  getIsLoading: (state) => state.isLoading,
}

export const mutations = {
  setDiscList(state, musicList) {
    state.musicList = musicList
  },
  setMusic(state, music) {
    state.music = music
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },
}

export const actions = {
  async fetchDiscList({commit}) {
    commit('setIsLoading', true)
    const data = await $axios.get('/discs')
    commit('setIsLoading', false)
    return data
  }
}
