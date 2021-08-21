import PostService from '@/services/posts'

export const actions = {
  getPosts({ commit }) {
    return new Promise((resolve, reject) => {
      PostService.getPosts()
        .then(({ data }) => {
          if (!data.success) {
            return reject(data.msg)
          }

          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getSavedPosts({ commit }) {
    return new Promise((resolve, reject) => {
      PostService.getSavedPosts()
        .then(({ data }) => {
          if (!data.success) {
            return reject(data.msg)
          }

          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  savePost({ commit }, payload) {
    return new Promise((resolve, reject) => {
      PostService.savePost(payload)
        .then(({ data }) => {
          if (!data.success) {
            return reject(data.msg)
          }

          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  likePost({ commit }, payload) {
    return new Promise((resolve, reject) => {
      PostService.likePost(payload)
        .then(({ data }) => {
          if (!data.success) {
            return reject(data.msg)
          }

          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}
