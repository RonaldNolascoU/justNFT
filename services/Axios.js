import axios from 'axios'
const qs = require('qs')

const HTTP = axios.create({
  baseURL: 'http://165.232.182.128/',
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
  // transformResponse: [
  //   (data) => {
  //     return new Promise((resolve, reject) => {
  //       let response = JSON.parse(data)
  //       if (response.success) {
  //         resolve(response)
  //       } else {
  //         reject(response.msg)
  //       }
  //     })
  //   },
  // ],
})

HTTP.interceptors.request.use((config) => {
  let myToken = localStorage.token
  if (myToken != null) {
    config.headers.Authorization = `Bearer ${myToken}`
  }
  return config
})

export default HTTP
