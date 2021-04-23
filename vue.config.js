module.exports = {
  devServer: {
    proxy: {
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
