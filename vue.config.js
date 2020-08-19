const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "assets": '@/assets',
        "components": '@/components',
        'plugins': '@/plugins',
        "network": '@/network',
        "views": '@/views',
        "store": '@/store',
        "router": '@/router',
        "public": '@/public',
      }
    },

  },
  devServer: {
    hotOnly: false,
    open: true, //自动从浏览器打开应用 
    proxy: {
      '/agent': {
        target: 'http://127.0.0.1:8888/api/private/v1/',
        changeOrigin: true,
        pathRewrite: {
          '^/agent': ''
        }
      }
    }
  },
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('plugins', resolve('src/plugins'))
      .set('request', resolve('src/request'))
      .set('public', resolve('src/public'))
      .set('router', resolve('src/router'))
      .set('store', resolve('src/store'))
      .set('views', resolve('src/views'))
  },
  publicPath: './'
}