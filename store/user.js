import _ from 'lodash'

export const state = () => ({
  userList: [{
    id: "001",
    name: "SHINJI",
    image: "/image/user.jpg",
    mail: "example1@gmail.com",
    phone: "080000000000",
    authority: "canReview",
  },
  {
    id: "002",
    name: "Act",
    image: "/image/user.jpg",
    mail: "example2@gmail.com",
    phone: "080000000000",
    authority: "canReview",
  }],
  isLoading: false
})

export const getters = {
  getUserList: (state) => state.userList,
  getIsLoading: (state) => state.isLoading,
}

export const mutations = {
  setMusicList(state, musicList) {
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
}
