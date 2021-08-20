import SubscriptionService from '@/services/subscriptions'

export const actions = {
  getSubscriptions({ commit }) {
    return new Promise((resolve, reject) => {
      SubscriptionService.getSubscriptions()
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
  subscribeToContentCreator({ commit }, payload) {
    return new Promise((resolve, reject) => {
      SubscriptionService.subscribe(payload)
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
  updateRate({ commit }, payload) {
    return new Promise((resolve, reject) => {
      SubscriptionService.updateRate(payload)
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
