import HTTP from '../Axios'

class AuthService {
  // path = 'auth'

  // USERS
  signUp(data) {
    return HTTP.post(`signup`, data, { cache: false })
  }
  signUpWithMetamask(data) {
    return HTTP.post(`signup-metamask`, data, { cache: false })
  }
  login(data) {
    return HTTP.post('login', data, { cache: false })
  }
  forgotPassword(data) {
    return HTTP.post('password/email', data, { cache: false })
  }
  resetPassword(data) {
    return HTTP.post('password/reset', data, { cache: false })
  }
  changePassword(data) {
    return HTTP.post('change-password', data, { cache: false })
  }
  me() {
    return HTTP.get('me')
  }

  // END USERS

  // CREATORS

  creatorSignUp(data) {
    return HTTP.post(`create-creator`, data, {
      cache: false,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }

  creatorLogin(data) {
    return HTTP.post(`contentCreater-login`, data, { cache: false })
  }

  addPost(data) {
    return HTTP.post(`addPost`, data, { cache: false })
  }
  // END CREATORS

  getSubscriptions() {
    return HTTP.post(`subscriptionList`, { cache: false })
  }

  subscribe(data) {
    return HTTP.post(`subscribe`, data, { cache: false })
  }

  getDetails(username) {
    return HTTP.post(`contentCreater-details`, username, { cache: false })
  }

  isSubscribed(username) {
    return HTTP.post(`isSubscribed`, username, { cache: false })
  }
}
export default new AuthService()
