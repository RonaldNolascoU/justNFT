import AuthService from '@/services/auth'

export const state = () => ({
  user: null,
  wallet: {
    address: null,
    balance: 0,
  },
  loading: false,
})

export const getters = {
  getAuth(state) {
    return state.user
  },
  isLoggedIn(state) {
    return Boolean(state.user)
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
  setAuth(state, user) {
    state.user = user
    this.$router.push({ name: 'index' })
  },
  setToken(state, token) {
    state.token = token
  },
  setWalletAddress(state, wallet) {
    const { metaMaskAddress, balance } = wallet
    state.wallet.address = metaMaskAddress
    state.wallet.balance = balance
  },
}

export const actions = {
  signUp({ commit }, payload) {
    return new Promise((resolve, reject) => {
      localStorage.clear()

      // dispatch('loading/loadingState', true, { root: true })

      AuthService.signUp(payload)
        .then(({ data }) => {
          if (!data.success) {
            return reject(data.msg)
          }

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
          if (!data.success) {
            return reject(data.msg)
          }

          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
          commit(
            'setAuth',
            Object.assign({}, { ...data.user, token: data.token })
          )
          resolve(data)
        })
        .catch((err) => {
          reject(err, 'err')
          // commit('setLoading', false)
        })
    })
  },

  forgotPassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      localStorage.clear()

      AuthService.forgotPassword(payload)
        .then(({ data }) => {
          if (!data.success) {
            return reject(data.msg)
          }

          resolve(data)
        })
        .catch((err) => {
          reject(err, 'err')
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
