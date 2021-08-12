import HTTP from '../Axios'

class AuthService {
  // path = 'auth'

  // USERS
  signUp(data) {
    return HTTP.post(`signup`, data, { cache: false })
  }
  login(data) {
    return HTTP.post('login', data, { cache: false })
  }
  forgotPassword(data) {
    return HTTP.post('forgot-password', data, { cache: false })
  }
  me() {
    return HTTP.get('me')
  }

  // END USERS

  // CREATORS

  creatorSignUp(data) {
    return HTTP.post(`contentCreater-signup`, data, {
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

  changePassword(data) {
    return HTTP.post(`change-password`, data, { cache: false })
  }

  changePasswordCreator(data) {
    return HTTP.post(`change-password-creator`, data, { cache: false })
  }

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