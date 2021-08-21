import HTTP from '../Axios'

class PostService {
  path = 'posts'

  getPosts() {
    return HTTP.get(`posts`)
  }
  getSavedPosts() {
    return HTTP.get(`posts/posts-saved`)
  }
  savePost(payload) {
    return HTTP.post(`posts/save-post`, payload)
  }
  likePost(payload) {
    return HTTP.post(`posts/like-post`, payload)
  }
}
export default new PostService()
