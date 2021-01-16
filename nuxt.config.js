require("dotenv").config()
const {ENV, END_POINT, BASE_URL} = process.env

export default {
  ssr: false,

  head: {
    title: 'music-reviewer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    'ant-design-vue/dist/antd.css',
    '~assets/styles/common.css',
    '~assets/styles/customAntStyle.css'
  ],

  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/index',
  ],

  components: true,

  buildModules: ['@nuxtjs/tailwindcss'],
  
  modules: [
    "@nuxtjs/axios"
  ],

  axios: {
    baseURL: process.env.BASE_URL
  },

  build: {
    extend(config, ctx) {
    },
  },
  server: {
    port: 8080, 
    host: '0.0.0.0'
  },
  env: {
    ENV,
    END_POINT,
    BASE_URL
  }
}
