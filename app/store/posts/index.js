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
}
