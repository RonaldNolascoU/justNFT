require('dotenv').config()
const isDev = process.env.NODE_ENV !== 'production'

export default {
  ssr: true,
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
    title: 'Just Yours',
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
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css',
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
  modules: ['nuxt-webfontloader', 'nuxt-material-design-icons'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
  },
}
