module.exports = {
  publicPath: "/public/admin/wechat",
  // assetsDir: "dist",
  productionSourceMap: false, //打包时不要map文件
  devServer: {
    open: true, //打开浏览器
    proxy: {
      "/api": {
        target: "http://test01.changxianggu.com:80",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "/api": ""
        }
      }
    }
  },
  // 修改webpack的配置
  configureWebpack: {
    // 把原本需要写在webpack.config.js中的配置代码 写在这里 会自动合并
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios"
    }
  }
};
