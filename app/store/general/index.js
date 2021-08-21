import AuthService from '@/services/auth'
import routerAuth from '~/middleware/router-auth'
import getCookie from '@/scripts/cookies.js'
import Web3 from 'web3'

export const state = () => ({
  user: null,
  wallet: {
    address: null,
    balance: 0,
  },
  loading: true,
  returnTo: null,
  S3Bucket: 'https://d8v7xo28xqxp.cloudfront.net',
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
    this.$router.replace({ name: 'index' }).catch(() => {})
  },
  setToken(state, token) {
    state.token = token
  },
  setWalletAddress(state, address) {
    state.wallet.address = address
  },
  setWalletBalance(state, balance) {
    state.wallet.balance = balance
  },
  disconnect(state) {
    localStorage.removeItem('isLoggedWithMetaMask')
    localStorage.removeItem('auth._token.local')
    this.$cookies.remove('auth._token.local')
    this.$router.replace('/signin').catch(() => {})
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  SET_RETURN_URL(state, data) {
    if (state.user) {
      state.returnTo = null
      return
    }
    // Make sure to not double encode, by decoding first
    state.returnTo = data ? encodeURI(decodeURI(data)) : null
  },
  REDIRECT_RETURN_TO(state) {
    if (state.returnTo) {
      const decoded = decodeURI(state.returnTo)
      state.returnTo = null
      if (decoded !== window.location.pathname) {
        this.$router.replace(decoded).catch(() => {})
      }
    }
  },
}

export const actions = {
  async nuxtClientInit({ state, commit, dispatch }, ctx) {
    // MODAL AGE
    let modalAge = ctx.$cookies.get('justyours_modal_age')
    let cookieDisclaimer = ctx.$cookies.get('jy_cookie_disclaimer')

    setTimeout(() => {
      ctx.$auth.onError((error, name, endpoint) => {
        commit('general/disconnect')
      })
    }, 1)

    if (modalAge) {
      ctx.$cookies.set('justyours_modal_age', true, {
        path: '/',
        maxAge: 86400 * 365,
      })
      ctx.app.store.commit('CLOSE_AGE_MODAL')
    }

    if (cookieDisclaimer) {
      ctx.$cookies.set('jy_cookie_disclaimer', true, {
        path: '/',
        maxAge: 86400 * 365,
      })
      ctx.app.store.commit('APPROVE_COOKIES')
    }

    // if (process.browser) {
    //   setTimeout(() => {
    //     console.log(ctx.$auth, 'context')
    //     ctx.$auth.refreshTokens()
    //   }, 1)
    // }

    // END MODAL AGE
    const isLoggedWithMetaMask = localStorage.getItem('isLoggedWithMetaMask')
    // await routerAuth(ctx)
    if (isLoggedWithMetaMask) {
      await dispatch('checkMetaMaskAccounts')
      await dispatch('getBalance')
    } else {
      dispatch('stopNuxtLoading')
    }
  },
  initNuxtLoading({ commit }) {
    if (process.browser) {
      setTimeout(() => {
        // window.$nuxt.$loading.start()
      }, 500)
    }
    commit('setLoading', true)
  },
  stopNuxtLoading({ commit }) {
    if (process.browser) {
      setTimeout(() => {
        // window.$nuxt.$loading.finish()
      }, 500)
    }
    commit('setLoading', false)
  },
  saveMetaMaskLoggedState() {
    localStorage.setItem('isLoggedWithMetaMask', true)
  },
  redirectUserLogin({ commit, state }, ctx) {
    if (state.returnTo) {
      commit('REDIRECT_RETURN_TO')
    } else {
      this.$router.push('/')
    }
  },
  async checkMetaMaskAccounts({ commit, dispatch }) {
    if (!window.ethereum) {
      commit('disconnect')
      dispatch('stopNuxtLoading')
      return 0
    }
    window.ethereum.on('accountsChanged', function (accounts) {
      console.log('accountsChanges', accounts)
      // TODO: CHECK HERE WITH USER WALLET. IF EXISTS, SO LOGIN
      // commit('disconnect')

      dispatch('stopNuxtLoading')
    })

    // detect Network account change
    window.ethereum.on('chainChanged', function (networkId) {
      console.log('chainChanged', networkId)
      if (networkId != 250) commit('disconnect')
      dispatch('stopNuxtLoading')
    })
    window.web3 = new Web3(ethereum)

    await window.web3.eth.getAccounts((err, accounts) => {
      console.log(accounts, 'accounts')
      if (accounts.length === 0) {
        // commit('disconnect')
        dispatch('stopNuxtLoading')
      } else {
        commit('setWalletAddress', accounts[0])
      }
    })
  },
  async getBalance({ state, commit, dispatch }) {
    console.log(window.ethereum)
    if (window.ethereum === null) commit('disconnect')
    console.log(state)
    console.log(state)
    if (!state.auth.user.wallet_address) return
    let minABI = [
      {
        constant: true,
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        type: 'function',
      },
      // decimals
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        type: 'function',
      },
    ]

    let justYoursTokenAddress = '0x37c045be4641328dfeb625f1dde610d061613497'
    // Get ERC20 Token contract instance
    let contract = new window.web3.eth.Contract(minABI, justYoursTokenAddress)

    // Call balanceOf function
    console.log(state)
    await contract.methods
      .balanceOf(state.wallet.address)
      .call()
      .then(async (result) => {
        console.log(result, 'result')
        await contract.methods
          .decimals()
          .call()
          .then((decimals) => {
            commit(
              'setWalletBalance',
              (Math.round((+result / 10 ** +decimals) * 10) / 10)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            )

            dispatch('saveMetaMaskLoggedState')
            dispatch('redirectUserLogin')
          })
          .catch((err) => {
            console.log(err, 'Error getting decimals')
            commit('disconnect')
          })
        dispatch('stopNuxtLoading')
      })
      .catch((err) => {
        console.log(err, 'Error getting balance')
        commit('disconnect')
        dispatch('stopNuxtLoading')
      })
  },
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
        })
    })
  },
  signUpWithMetamask({ commit }, payload) {
    return new Promise((resolve, reject) => {
      localStorage.clear()

      // dispatch('loading/loadingState', true, { root: true })

      AuthService.signUpWithMetamask(payload)
        .then(({ data }) => {
          if (!data.success) {
            return reject(data.msg)
          }

          resolve(data)
        })
        .catch((err) => {
          reject(err)
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
        })
    })
  },

  resetPassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      localStorage.clear()

      AuthService.resetPassword(payload)
        .then(({ data }) => {
          if (!data.success) {
            return reject(data.msg)
          }

          resolve(data)
        })
        .catch((err) => {
          reject(err, 'err')
        })
    })
  },

  logout({ commit, dispatch }) {
    commit('disconnect')
  },

  creatorSignUp({ commit }, payload) {
    return new Promise((resolve, reject) => {
      localStorage.clear()

      AuthService.creatorSignUp(payload)
        .then(({ data }) => {
          if (!data.success) {
            return reject(data.msg)
          }

          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  creatorLogin({ commit }, payload) {
    return new Promise((resolve, reject) => {
      localStorage.clear()

      AuthService.creatorLogin(payload)
        .then(({ data }) => {
          if (!data.success) {
            return reject(data.msg)
          }

          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  changePassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      AuthService.changePassword(payload)
        .then(({ data }) => {
          if (!data.success) {
            return reject(data.msg)
          }

          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getSubscriptions({ commit }) {
    return new Promise((resolve, reject) => {
      AuthService.getSubscriptions()
        .then(({ data }) => {
          if (!data.success) {
            return reject(data.msg)
          }

          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  subscribe({ commit }, payload) {
    return new Promise((resolve, reject) => {
      AuthService.subscribe(payload)
        .then(({ data }) => {
          if (!data.success) {
            return reject(data.msg)
          }

          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  me({ commit }) {
    return new Promise((resolve, reject) => {
      AuthService.me()
        .then(({ data }) => {
          if (!data.success) {
            return reject(data.msg)
          }

          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  addPost({ commit }, payload) {
    return new Promise((resolve, reject) => {
      AuthService.addPost(payload)
        .then(({ data }) => {
          if (!data.success) {
            return reject(data.msg)
          }

          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getContentCreatorDetails({ commit }, payload) {
    return new Promise((resolve, reject) => {
      AuthService.getDetails(payload)
        .then(({ data }) => {
          if (!data.success) {
            return reject(data.msg)
          }

          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  isSubscribed({ commit }, payload) {
    return new Promise((resolve, reject) => {
      AuthService.isSubscribed(payload)
        .then(({ data }) => {
          if (!data.success) {
            return reject(data.msg)
          }

          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}
