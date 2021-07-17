import AuthService from '@/services/auth'

export const state = () => ({
  authUser: {},
  loading: false,
})

export const getters = {
  getAuth(state) {
    return state.authUser
  },
  isLoggedIn(state) {
    return Boolean(state.authUser)
  },
  isPremiumUser(state, getters) {
    // We must check here with the backend data
    return getters.isLoggedIn
  },
  isFreeUser(state, getters) {
    // We must check here with the backend data
    return !getters.isLoggedIn
  },
}

export const mutations = {
  setAuth(state, authUser) {
    state.authUser = authUser
  },
  setToken(state, token) {
    state.token = token
  },
}

export const actions = {
  signUp({ commit }, payload) {
    return new Promise((resolve, reject) => {
      localStorage.clear()

      // dispatch('loading/loadingState', true, { root: true })

      AuthService.signUp(payload)
        .then(({ data }) => {
          console.log(data, 'DATA')

          resolve(data)
        })
        .catch((err) => {
          reject(err)
          // commit('setLoading', false)
        })
    })
  },
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      localStorage.clear()

      AuthService.login(payload)
        .then(({ data }) => {
          console.log(data)

          localStorage.setItem('token', data.token)
          // localStorage.setItem('user', JSON.stringify(data.payload.user))
          // commit('setAuth', Object.assign({}, data.payload.user))
          // this.$router.push({ path: '/' })

          resolve(data)
        })
        .catch((err) => {
          reject(err)
          // commit('setLoading', false)
        })
    })
  },

  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      // commit('setLoading', true)
      // dispatch('loading/loadingState', true, { root: true })
      AuthService.logout()
        .then((response) => {
          // commit('setLoading', false)
          commit('setAuth', {})
          // dispatch('loading/loadingState', false, { root: true })
          resolve(response)
        })
        .catch((err) => {
          // commit('setLoading', false)
          reject(err)
        })
    })
  },
}
