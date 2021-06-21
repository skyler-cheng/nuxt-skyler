export const state = () => ({
  token: '',
  name: ''
})

export const mutations = {
  setAuthenticated (state, userInfo) {
    state.token = userInfo.token
    state.name = userInfo.name
  }
}

export const actions = {
  getAuthenticated ({ commit }, userInfo = {}) {
    commit('setAuthenticated', userInfo)
  }
}
