import HTTP from '../Axios'

class SuggestionService {
  path = 'suggestions'

  getSuggestions() {
    return HTTP.get(`suggestions`)
  }
}
export default new SuggestionService()
