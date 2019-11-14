module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Camp Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
    ],
    script: [
      { src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js' },
      { src: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js', integrity: 'sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa', crossorigin: 'anonymous' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css', integrity: 'sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u', crossorigin: 'anonymous' },
    ]
  },
  css: [
    '~assets/css/fonts.css',
    '~assets/css/temp-nav-styles.css',
    '~assets/css/blog-style.css'
  ],
  router: {
    extendRoutes(routes, resolve) {
      let arrayRoute = [
        {
          path: '/',
          component: resolve(__dirname, 'pages/index.vue'),
          name: 'index'
        },
        {
          path: '/:page',
          component: resolve(__dirname, 'pages/index.vue'),
          name: 'indexPaged'
        },
        {
          path: '/category/:name',
          component: resolve(__dirname, 'pages/category.vue'),
          name: 'category'
        },
        {
          path: '/category/:name/:page',
          component: resolve(__dirname, 'pages/category.vue'),
          name: 'categoryPaged'
        },
        {
          path: '/tag/:title',
          component: resolve(__dirname, 'pages/tag.vue'),
          name: 'tag'
        },
        {
          path: '/tag/:title/:page',
          component: resolve(__dirname, 'pages/tag.vue'),
          name: 'tagPaged'
        },
        {
          path: '/post/:title',
          component: resolve(__dirname, 'pages/post.vue'),
          name: 'Post'
        },
        {
          path: '/writers',
          component: resolve(__dirname, 'pages/writers.vue'),
          name: 'writers'
        },
        {
          path: '/writers/:page',
          component: resolve(__dirname, 'pages/writers.vue'),
          name: 'writersPaged'
        },
        {
          path: '/writer/:name',
          component: resolve(__dirname, 'pages/writer.vue'),
          name: 'writer'
        },
        {
          path: '/writer/:name/:page',
          component: resolve(__dirname, 'pages/writer.vue'),
          name: 'writerPaged'
        },
      ]

      arrayRoute.map((item) => {
        routes.push(item)
      })
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

