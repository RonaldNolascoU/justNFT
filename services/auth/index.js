import HTTP from '../Axios'

class AuthService {
  // path = 'auth'

  signUp(data) {
    return HTTP.post(`/signup`, data, { cache: false })
  }
  login(data) {
    return HTTP.post(`/login`, data, { cache: false })
  }

  logout() {
    return HTTP.get(`/logout`, { cache: false })
  }
  me() {
    return HTTP.get(`/me`)
  }
}
export default new AuthService()
