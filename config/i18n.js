import en from '../locales/en.json'
import es from '../locales/es.json'
import fr from '../locales/fr.json'
import zh from '../locales/zh.json'
import ja from '../locales/ja.json'
import ru from '../locales/ru.json'
console.log(en, es, 'msgs')
export default {
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, es, fr, zh, ja, ru },
}
