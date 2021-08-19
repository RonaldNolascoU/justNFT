import SuggestionService from '@/services/suggestions'

export const actions = {
  getSuggestions({ commit }) {
    return new Promise((resolve, reject) => {
      SuggestionService.getSuggestions()
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
