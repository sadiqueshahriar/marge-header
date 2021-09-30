import webConfig from './assets/json/webConfig.json'
export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    server: {
        port: webConfig.port,
    },
    head: {
        title: webConfig.site_title,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: webConfig.site_desc },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        "~/assets/css/bootstrap.min.css",
        "~/assets/css/style.css",
    ],
    scss: { src: '~/assets/scss/custom.scss', lang: 'scss' },

    // Progress Bar Color

    loading: { color: '#3B8070' },

    vue: {
        config: {
            productionTip: false,
            devtools: true
        }
    },

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/tronWeb', mode: 'client' },
        // '~/plugins/VueTRON.js',
        // '~/plugins/Notices.js',
        // '~/plugins/Helper.js'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/stylelint
        '@nuxtjs/stylelint-module',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: ['bootstrap-vue/nuxt',
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        // https://go.nuxtjs.dev/content
        '@nuxt/content',
        // https://github.com/Maronato/vue-toastification#nuxt-registration
        ["vue-toastification/nuxt", {
            timeout: 10000,
            draggable: false
        }]
    ],

    // vue-toastification options
    toast: {
        closeOnClick: false,
        // // Use your own CSS file
        // cssFile: "path/to/your/file.scss",
        // // Or disable CSS injection
        // cssFile: false
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en'
        }
    },

    // Servers

    serverMiddleware: [
        '~/iswap_api/index.js',
    ],

    // Bootstrap Vue

    bootstrapVue: {
        bootstrapCSS: false,
        bootstrapVueCSS: false
    },

    // Content module configuration: https://go.nuxtjs.dev/config-content
    content: {},

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {

        babel: {
            compact: true
        },
        // ESLint on Save

        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });
                // config.module.rules.push({
                // test: /\.css$/,
                // loader: ['css-loader'],
                // loader: ['css-loader', 'stylus-loader'],
                // exclude: /(node_modules)/
                // });
            }
        }
    }
}