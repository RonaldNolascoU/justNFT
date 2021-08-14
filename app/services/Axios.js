import axios from 'axios'
const qs = require('qs')
const isDev = process.env.NODE_ENV !== 'production'

const HTTP = axios.create({
  // baseURL: 'https://app.justyours.me',
  baseURL: isDev ? 'http://localhost:8000/api' : 'https://justyours.ml/api',
  headers: {
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformRequest: [
    (data, headers) => {
      if (headers['Content-Type'] == 'multipart/form-data') {
        return data
      }
      return qs.stringify(data)
    },
  ],
})

HTTP.interceptors.request.use((config) => {
  console.log(window.$nuxt.context.$cookies)
  let myToken = window.$nuxt.context.$cookies.get('auth._token.local')
  if (myToken != null) {
    config.headers.Authorization = `${myToken}`
  }
  return config
})

HTTP.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    console.log(error.response.data)
    if (error.response.status === 401) {
      console.log('Forbidden')
      // store.dispatch('logout')
      // router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default HTTP
