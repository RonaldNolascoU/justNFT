import HTTP from '../Axios'

class SubscriptionService {
  path = 'subscriptions'

  getSubscriptions(data) {
    return HTTP.get(`subscriptions`, data, { cache: false })
  }

  subscribe(data) {
    return HTTP.post(`subscriptions/subscribe`, data, { cache: false })
  }

  updateRate(data) {
    return HTTP.post(`subscriptions/updateRate`, data, { cache: false })
  }
}
export default new SubscriptionService()
