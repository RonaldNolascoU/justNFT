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
  logout() {
    return HTTP.get(`logout`, { cache: false })
  }
  me() {
    return HTTP.get('me')
  }

  // END USERS

  // CREATORS

  creatorSignUp(data) {
    return HTTP.post(`contentCreater-signup`, data, { cache: false })
  }

  creatorLogin(data) {
    return HTTP.post(`contentCreater-login`, data, { cache: false })
  }
  // END CREATORS
}
export default new AuthService()
