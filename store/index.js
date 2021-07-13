export const state = () => ({
  userAuth: null,
  user: null,
  darkMode: false,

  account: {
    address: null,
    nonce: null,
    signature: null,
  },

  modals: {
    age: true,
    agree: false,
  },
  sidebar: false,

  returnTo: null,
  messages: [
    {
      id: 1,
      userId: 11,
      image: 'msg-profile07',
      name: 'Rayella Ferguss',
      msg: 'I’m ready for the shoot tom',
      date: '12w',
      count: 3,
    },
    {
      id: 2,
      userId: 2,
      image: 'msg-profile06',
      name: 'Mistique Madeline',
      msg: 'Wondering about the idea...',
      date: '7w',
    },
    {
      id: 3,
      userId: 3,
      image: 'msg-profile05',
      name: 'Caroline Daenm..',
      msg: 'What about the surfboard...',
      date: '1w',
      count: 5,
    },
    {
      id: 4,
      userId: 4,
      image: 'msg-profile04',
      name: 'Shameil Khan',
      msg: 'That works for me.',
      date: '5d',
    },
    {
      id: 5,
      userId: 5,
      image: 'msg-profile03',
      name: 'Gizelle Zifadsy',
      msg: ' Honey be goin wild at all ti..',
      date: '3d',
      count: 1,
    },
    {
      id: 6,
      userId: 6,
      image: 'msg-profile02',
      name: 'Shannon Kala.',
      msg: 'She may or may not like we..',
      date: '3d',
    },
    {
      id: 7,
      userId: 7,
      image: 'msg-profile01',
      name: 'Mikella Jia',
      msg: 'You: Gotta meet you tomm...',
      date: '1d',
    },
  ],
})

export const getters = {
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
  SET_USER_AUTH(state, data) {
    if (data) {
      state.userAuth = Object.assign({}, data)
      state.user = Object.assign({}, data)
      if (!data.wallet) {
        this.$router.push('/wallet')
      } else {
        this.$router.push('/')
      }
    } else {
      state.userAuth = null
      state.user = null
    }
  },
  OPEN_AGREE_MODAL(state) {
    state.modals.agree = true
    document.body.style.overflow = 'hidden'
  },
  CLOSE_AGREE_MODAL(state) {
    state.modals.agree = false
    document.body.style.overflow = 'auto'
  },
  OPEN_AGE_MODAL(state) {
    state.modals.age = true
  },
  CLOSE_AGE_MODAL(state, enableCookie = false) {
    state.modals.age = false

    if (enableCookie) {
      const d = new Date()
      let days = 365
      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000)
      let expires = 'expires=' + d.toUTCString()
      document.cookie =
        'justyours_modal_age' +
        '=' +
        state.modals.age +
        ';' +
        expires +
        ';path=/'
    }
  },
  TOGGLE_SIDEBAR(state) {
    state.sidebar = !state.sidebar
    let body = document.getElementById('body-container')
    if (state.sidebar) {
      body.style.opacity = 0.5
    } else {
      body.style.opacity = 1
    }
  },
  TOGGLE_DARK_MODE(state) {
    state.darkMode = !state.darkMode
    this.$colorMode.preference = state.darkMode ? 'dark' : 'light'
  },
}
