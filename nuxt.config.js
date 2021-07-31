import i18n from './config/i18n'
require('dotenv').config()
const isDev = process.env.NODE_ENV !== 'production'

export default {
  ssr: false,
  target: 'static',
  components: true,
  vue: {
    config: {
      productionTip: isDev,
      devtools: isDev,
    },
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'JustYours',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.ico' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
      },
      {
        rel: 'prefetch',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      },
    ],
  },
  webfontloader: {
    google: {
      families: [
        'Source+Sans+Pro:wght@300;400;600;700;900&display=swap',
        'Libre+Baskerville:ital@0;1&display=swap',
        'Montserrat:wght@300;400;600;700;900&display=swap',
        'Material+Icons&display=swap',
      ],
    },
    custom: {
      families: ['Font Awesome 5 Free', 'Font Awesome 5 Brands'],
      urls: [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css',
      ],
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/vuesax.js' },
    { src: '~/plugins/client-init', mode: 'client' },
    { src: '~/plugins/third-party', mode: 'client' },
    { src: '~/plugins/directives', mode: 'client' },
    { src: '~/plugins/scripts', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxtjs/date-fns',
  ],
  tailwindcss: {
    jit: true,
    // add '~tailwind.config` alias
    exposeConfig: true,
  },
  colorMode: {
    classSuffix: '',
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-webfontloader',
    'nuxt-material-design-icons',
    'nuxt-i18n',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'cookie-universal-nuxt',
  ],
  i18n: {
    vueI18nLoader: true,
    silentTranslationWarn: true,
    strategy: 'no_prefix',
    // strategy: 'no_prefix',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'jy_locale',
      onlyOnRoot: true, // recommended
    },
    pages: {
      parsePages: false,
    },
    locales: [
      {
        code: 'en',
        name: 'English',
      },
      {
        code: 'es',
        name: 'Español',
      },
      {
        code: 'fr',
        name: 'Français',
      },
      {
        code: 'zh',
        name: '简体中文',
      },
      {
        code: 'ja',
        name: '日本語',
      },
      {
        code: 'ru',
        name: 'Pусский',
      },
    ],
    vueI18n: i18n,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    transpile: ['vee-validate'],
  },
  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'white',
  },
  axios: {
    baseURL: 'http://165.232.182.128',
  },
  auth: {
    redirect: {
      login: '/',
      // logout: false,
      // callback: false,
      home: '/',
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          // required: true,
          type: '',
        },
        endpoints: {
          login: { url: '/login', method: 'post', property: 'user' },
          // logout: { url: '/api/auth/logout', method: 'post' },
          user: false,
        },
      },
    },
  },
}
