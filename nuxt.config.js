const AVAILABLE_LANGUAGES = ['it']

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Base project',
    htmlAttrs: {
      lang: 'it',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css', '@/assets/css/animations.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vue-notification', ssr: false },
    '@/plugins/notify',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: [{ path: '~/components/', pathPrefix: false }],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['nuxt-i18n', '@nuxtjs/apollo'],

  i18n: {
    locales: AVAILABLE_LANGUAGES,
    strategy: 'prefix_except_default',
    defaultLocale: 'it',
    vueI18n: {
      fallbackLocale: 'it',
      messages: AVAILABLE_LANGUAGES.reduce(
        (obj, key) => ({
          ...obj,
          [key]: require('./locales/' + key + '.json'),
        }),
        {}
      ),
    },
  },

  apollo: {
    errorPolicy: 'ignore',
    cookieAttributes: {
      secure: process.env.NODE_ENV === 'production',
    },
    defaultOptions: {
      $watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'ignore',
      },
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
    watchLoading: '~/plugins/apollo-watch-loading-handler.js',
    errorHandler: '~/plugins/apollo-error-handler.js',
    clientConfigs: {
      default: '@/apollo/config/default.js',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend: (config) => {
      const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))

      svgRule.test = /\.(png|jpe?g|gif|webp)$/

      config.module.rules.push({
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            loader: 'file-loader',
            query: {
              name: 'static/image/[name].[hash:8].[ext]',
            },
          },
          {
            loader: 'vue-svg-loader',
            options: {
              // Optional svgo options
              svgo: {
                plugins: [{ removeViewBox: false }],
              },
            },
          },
        ],
      })
    },
  },
  publicRuntimeConfig: {
    isDev: process.env.IS_DEV,
    apolloServiceHttpEndpointPath:
      process.env.APOLLO_SERVICE_HTTP_ENDPOINT_PATH,
    apolloServicePath: process.env.APOLLO_SERVICE_PATH,
    useProductionDb: process.env.USE_PRODUCTION_DB,
    publicDevApolloServiceUrl: process.env.PUBLIC_DEV_APOLLO_SERVICE_URL,
  },

  privateRuntimeConfig: {
    apolloServiceUrl: process.env.APOLLO_SERVICE_URL,
  },
  router: {
    linkActiveClass: 'active',
    linkExactActiveClass: 'current',
  },

  server: {
    host: '192.168.1.74',
    port: 8080
  },

  pageTransition: 'zoom-page',

  telemetry: false,
}
