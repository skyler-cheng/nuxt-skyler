export const state = () => ({
  token: ''
})

export const mutations = {
  setAuthenticated (state, token) {
    state.token = token
  }
}

export const actions = {
  getAuthenticated ({ commit }, userInfo = {}) {
    commit('setAuthenticated', userInfo)
  }
}
