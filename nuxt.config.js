export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ecomaster',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.svg' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~assets/scss/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~plugins/axiosConfig",
    "~plugins/api",
    "~plugins/sweetAlert",
    "~plugins/star-rating.client.js",
    "~plugins/bootstrap-vue.js",
    "~plugins/vs-pagination.js",
    { src: "~plugins/vueDatePicker.js", ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    // '@privyid/nuxt-csrf',
    '@nuxtjs/axios',
    "@nuxtjs/auth-next",
    'nuxt-vue-select',
    "@nuxtjs/i18n",
    // Simple usage

  ],


  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://klm.cdy.mybluehost.me/ecomaster/api',
    headers: {
      withCredentials: true,
      'X-Requested-With': 'XMLHttpRequest',
    },
    // credentials: true,
    debug: process.env.NODE_ENV !== 'production',
  },
  // axios: {
  //   proxy: true,
  //   credentials: true
  // },

  // proxy: {
  //   '/api': {
  //     target: 'https://klm.cdy.mybluehost.me/ecomaster/api',
  //     pathRewrite: {
  //       '^/api': '',
  //     },
  //     changeOrigin: true
  //   },
  // },

  //  auth: {
  //   plugins: [
  //     { src: "~plugins/axiosConfig.js", ssr: true }
  //   ]
  // },
  auth:{
    strategies: {
        'laravelSanctum': {
            provider: 'laravel/sanctum',
            url: 'https://klm.cdy.mybluehost.me/ecomaster',
            endpoints: {
                login: {
                    url: '/api/users/login' , method: 'post'
                },
                logout: {
                    url: '/api/users/logout' , method: 'post'
                },
                user: {
                    url: '/api/user' , method: 'get'
                },
                // tokenRequired: false,
                // tokenType: false
            },
            user: {
              property: false
            }
        },
        'supplier':{
          provider: 'laravel/sanctum',
          url: 'https://klm.cdy.mybluehost.me/ecomaster',
          endpoints: {
            login: {
                url: '/api/stores/login' , method: 'post'
            },
            // tokenRequired: false,
            // tokenType: false
        },
        }
    },
    redirect: {
        login: "/auth/login",
        logout: "/auth/logout",
        home: "/"
    }
  },

  // translation config
  i18n: {
    locales: [
      {
        code: 'ar',
        iso: 'ar-AR',
        name: 'Ar',
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'En',
      },
    ],
    defaultLocale: 'en',
    noPrefixDefaultLocale: true,
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        ar: require('./locales/ar.json'),
        en: require('./locales/en.json'),
      },
    },
  },

  styleResources: {
    scss: ["./assets/sass/*.scss"],
  },

  router: {
    base: "/ecoomaster",
    prefetchLinks: false
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      compact: true,
    },
  },
}
