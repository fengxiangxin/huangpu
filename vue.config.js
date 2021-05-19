module.exports = {
  devServer: {
    proxy: {
      "/v1": {
        target: "http://10.198.246.32/ebus/gzshpqsjfwpt/",
        changeOrigin: true,
        pathRewrite: {
          "^/v1": "/v1",
        },
      },
      "/api": {
        target: "http://192.168.5.16:8080/geoserver/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  //   publicPath: "./",

  css: {
    sourceMap: true, // 开启 CSS source maps
  },
};