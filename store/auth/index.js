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
  setWalletAddress(state, address) {
    state.wallet.address = address
  },
  setWalletBalance(state, balance) {
    state.wallet.balance = balance
  },
  // TODO: CHANGE TO AUTH METHOD WHEN AVAILABLE
  disconnect(state) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    state.user = null
    state.wallet = {
      address: null,
      balance: 0,
    }
    // window.ethereum.request({
    //   method: 'eth_requestAccounts',
    //   params: [
    //     {
    //       eth_accounts: {},
    //     },
    //   ],
    // })

    // window.ethereum.request({
    //   method: 'wallet_requestPermissions',
    //   params: [
    //     {
    //       eth_accounts: {},
    //     },
    //   ],
    // })
    this.$router.push('/signin')
  },
  setLoading(state) {
    state.loading = !state.loading
  },
}

export const actions = {
  async nuxtClientInit({ state, commit, dispatch }, ctx) {
    commit('setLoading')

    // MODAL AGE
    let modalAge = getCookie('justyours_modal_age')
    if (modalAge) {
      ctx.app.store.commit('CLOSE_AGE_MODAL')
    }

    // END MODAL AGE

    await dispatch('checkMetaMaskAccounts')
    await dispatch('getBalance')
    await routerAuth(ctx)
  },
  async checkMetaMaskAccounts({ commit, dispatch }) {
    if (!window.ethereum) {
      commit('disconnect')
      commit('setLoading')
      return 0
    }
    window.ethereum.on('accountsChanged', function (accounts) {
      console.log('accountsChanges', accounts)
      if (accounts.length == 0) {
        commit('disconnect')
      } else {
        commit('setWalletAddress', accounts[0])
        dispatch('getBalance')
      }
      commit('setLoading')
    })

    // detect Network account change
    window.ethereum.on('chainChanged', function (networkId) {
      console.log('chainChanged', networkId)
      if (networkId != 250) commit('disconnect')
      commit('setLoading')
    })
    window.web3 = new Web3(ethereum)

    await window.web3.eth.getAccounts((err, accounts) => {
      console.log(accounts, 'accounts')
      if (accounts.length === 0) {
        commit('disconnect')
      } else {
        commit('setWalletAddress', accounts[0])
      }
      commit('setLoading')
    })
  },
  async getBalance({ state, commit }) {
    if (window.ethereum === null) commit('disconnect')
    if (!state.wallet.address) return
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

    let justYoursTokenAddress = '0xC8Da1a26ABEF9e2E41B4C89c1b345Cc05ce034e8'
    // Get ERC20 Token contract instance
    let contract = new window.web3.eth.Contract(minABI, justYoursTokenAddress)

    // Call balanceOf function
    console.log(state, 'state')
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
            commit('setAuth', {})
          })
          .catch((err) => {
            console.log(err, 'Error getting decimals')
            commit('disconnect')
          })
        commit('setLoading')
      })
      .catch((err) => {
        console.log(err, 'Error getting balance')
        commit('disconnect')
        commit('setLoading')
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
}
