module.exports = {
  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
