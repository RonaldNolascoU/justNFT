import HTTP from '../Axios'

class PostService {
  path = 'posts'

  getPosts() {
    return HTTP.get(`posts`)
  }
}
export default new PostService()
