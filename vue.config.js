const { defineConfig } = require('@vue/cli-service') 
const proxysite = 'http://192.168.31.183:81/seeyon';
module.exports = {
  publicPath: './',

  devServer: {
  
    proxy: {
      '/seeyon': {
        target: proxysite,
        changeOrigin: true,
        pathRewrite: { '^/seeyon':'' },
      },
    },
    port:81,
  }
},
  module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave:false,//关闭eslint校验
  })
