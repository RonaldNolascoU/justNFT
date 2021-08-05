export const state = () => ({
  userAuth: null,
  user: null,
  darkMode: false,
  lang: 'en',

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
  notifications: [
    {
      id: 1,
      image: 'msg-profile07',
      name: 'Rayella Ferguss',
      i18n: 'commentedOn',
      msg: 'commented on your post.',
      date: '2021-07-15',
    },
    {
      id: 2,
      image: 'msg-profile06',
      name: 'Mistique Madeline',
      i18n: 'taggedOn',
      msg: 'tagged you in "like we.."',
      date: '2021-07-12',
    },
    {
      id: 3,
      image: 'msg-profile05',
      name: 'Caroline Daenm..',
      i18n: 'subscribedOn',
      msg: 'subscribed to your plan.',
      date: '2021-07-10',
      isSubscription: true,
    },
    {
      id: 4,
      image: 'msg-profile04',
      name: 'Shameil Khan',
      i18n: 'likedOn',
      msg: 'liked your image.',
      date: '2021-07-10',
    },
    {
      id: 5,
      image: 'msg-profile03',
      name: 'Gizelle Zifadsy',
      i18n: 'likedOn',
      msg: 'liked your image "Requiem for..."',
      date: '2021-07-04',
    },
    {
      id: 6,
      image: 'msg-profile02',
      name: 'Shannon Kala.',
      i18n: 'taggedOn',
      msg: 'tagged you in her post...',
      date: '2021-06-19',
    },
    {
      id: 7,
      image: 'msg-profile01',
      name: 'Mikella Jia',
      i18n: 'subscribedOn',
      msg: 'Subscribed to your plan.',
      date: '2021-04-10',
      isSubscription: true,
    },
  ],
  categories: [
    { name: 'Hardcore', color: '#CF5151' },
    { name: 'PAWG', color: '#F1B075' },
    { name: 'Big Ass', color: '#DFAB6D' },
    { name: 'Big Tits', color: '#FF998B' },
    { name: 'Pussy', color: '#FF80A5' },
    { name: 'Ebony', color: '#AB4626' },
    { name: 'Hairy', color: '#D88484' },
    { name: 'MILF', color: '#E45656' },
    { name: 'Teen', color: '#C53761' },
    { name: 'JAV', color: '#D4899F' },
    { name: 'Asian', color: '#F1A2E0' },
    { name: 'Brunette', color: '#C53761' },
    { name: 'Blowjob', color: '#EA785E' },
    { name: 'BBW', color: '#DE9BAE' },
    { name: 'Furry', color: '#C76884' },
    { name: 'Lactating', color: '#FC9EBA' },
  ],
  searchResult: [
    { name: 'Ana Kurston', image: 'msg-profile07' },
    { name: 'Ana Mika', image: 'msg-profile05' },
    { name: 'Ana Campbell', image: 'msg-profile04' },
    { name: 'Ana Yalzsin', image: 'msg-profile03' },
  ],
  cookies: false,
  posts: [
    {
      id: 1,
      user: 'Janette Ferrero',
      content:
        'Say “Hola Hola” to Latina lifestyle and fitness coach @dianamaux, who’s just joined us! 🏋️‍♀️ 🍏 Be a part of the #MauxTeam as your "Latina light" Diana shares everything from dietary advice, workouts, dancing and so much more! 🌹✨',
      image: '/images/woman.png',
      likes: '2k',
      comments: '193',
      commentsArray: [
        {
          user: {
            img: '/images/woman2.png',
          },
          content:
            'I’ve been a part of #MauxTeam as a "Latina light" Diana and I’ve loved her 🌹✨ dietary advice, workouts, dancing and other activities!',
        },
      ],
    },
    {
      id: 2,
      user: 'Paloma Ahanas',
      content:
        '🤳Hiit with Paloma | 🌤Full Body Mobility with Paloma\n Paloma guides you through some full-body exercises to help increase your mobility!',
      image: '/images/post1.png',
      likes: '5k',
      comments: '209',
      commentsArray: [
        {
          user: {
            img: '/images/woman2.png',
          },
          content:
            'I’ve been a part of #MauxTeam as a "Latina light" Diana and I’ve loved her 🌹✨ dietary advice, workouts, dancing and other activities!',
        },
        {
          user: {
            img: '/images/post.png',
          },
          content: 'This is a gorgeous app!',
        },
      ],
    },
    {
      id: 3,
      user: 'Paloma Ahanas',
      content:
        '🤳Hiit with Paloma | 🌤Full Body Mobility with Paloma\n Paloma guides you through some full-body exercises to help increase your mobility!',
      image: '/images/woman.png',
      likes: '5k',
      comments: '209',
      commentsArray: [
        {
          user: {
            img: '/images/woman2.png',
          },
          content:
            'I’ve been a part of #MauxTeam as a "Latina light" Diana and I’ve loved her 🌹✨ dietary advice, workouts, dancing and other activities!',
        },
      ],
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
  CLOSE_AGE_MODAL(state) {
    state.modals.age = false
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

    document.body.style.backgroundColor = state.darkMode
      ? 'rgba(0,0,0,1)'
      : '#fff'
  },
  UPDATE_LANG(state, payload) {
    state.lang = payload
  },
  APPROVE_COOKIES(state) {
    state.cookies = true
  },
  ADD_POST(state, payload) {
    console.log(payload)
    state.posts.push(payload)
  },
}
