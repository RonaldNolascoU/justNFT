import axios from 'axios'

const HTTP = axios.create({
  baseURL: 'http://165.232.182.128/',
  headers: {
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
  },
})

HTTP.interceptors.request.use((config) => {
  let myToken = localStorage.token
  if (myToken != null) {
    config.headers.Authorization = `Bearer ${myToken}`
  }
  return config
})

export default HTTP
