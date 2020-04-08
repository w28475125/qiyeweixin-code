module.exports = {
  publicPath: "/public/admin/wechat",
  // assetsDir: "dist",
  productionSourceMap: false, //打包时不要map文件
  devServer: {
    open: true, //打开浏览器
    proxy: {
      "/api": {
        target: "http://******.************.com:80",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "/api": ""
        }
      }
    }
  }
};
