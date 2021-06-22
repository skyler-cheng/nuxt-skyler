const config = require('./base.config.js')
const path = require('path')

module.exports = {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // github
  router:{
    base: '/nuxt-skyler/',
    middleware: 'authenticated'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'skyler 覆歷',
    htmlAttrs: {
      lang: 'zh_TW'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { 'http-equiv': 'X-UA-Compatible', content:'ie=edge' },
      { property: 'og:title', content: 'Skyler 覆歷' },
      { property: 'og:description', content: 'Skyler 覆歷' },
      { property: 'og:site_name', content: 'Skyler 覆歷' },
      { property: 'og:locale', content: 'zh_TW' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script:[
      {src:'/nuxt-skyler/js/jquery.min.js',body:true},
      {src:'/nuxt-skyler/js/browser.min.js',body:true},
      {src:'/nuxt-skyler/js/breakpoints.min.js',body:true},
      {src:'/nuxt-skyler/js/util.js',body:true},
      {src:'/nuxt-skyler/js/main.js',body:true}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/sass/main.scss',
    '~/assets/sass/transition.scss'
  ],

  // Axios:https://axios.nuxtjs.org
  axios: {
    proxy: true,
    credentials: true,
  },
  proxy: {
    '/timelinker-api/': {
      target: config.apiBaseURL, // 代理地址
      changeOrigin: true,
      pathRewrite: { 
        '^/timelinker-api/' : '' 
      }
    }
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    '~/plugins/vant-ui',
    '~/plugins/router',
    { src: '~/plugins/mock', ssr: true },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources',
    '@nuxtjs/tailwindcss'
  ],

  styleResources: {
    less: '~/assets/**/*.less'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      less: {
        // javascriptEnabled: true,
        modifyVars: {
          hack: `true; @import "${path.join(
            __dirname,
            './assets/css/theme.less'
          )}";`
        }
      },
    }
  },

  // Middleware : https://ithelp.ithome.com.tw/articles/10207822
  middleware: [

  ],

}
