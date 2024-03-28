const { name } = require("./package");
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "/app-vue3-default/",
  devServer: {
    port: 2000,
    open: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("fonts")
      .test(/.(ttf|otf|eot|woff|woff2)$/)
      .use("url-loader")
      .loader("url-loader")
      .tap((option) => ({ name: "/fonts/[name].[hash:8].[ext]" }))
      .end();
    // 移除 preload 插件
    config.plugins.delete("preload");
    // 移除 prefetch 插件
    config.plugins.delete("prefetch");
    // 优化二次启动速度
    config.cache({
      // 将缓存类型设置为文件系统,默认是memory
      type: "filesystem",
      buildDependencies: {
        // 更改配置文件时，重新缓存
        config: [__filename],
      },
    });
  },
  // 自定义webpack配置
  configureWebpack: () => {
    return {
      plugins: [
        require("unplugin-element-plus/webpack")({}),
      ],
      output: {
        library: `${name}-[name]`,
        libraryTarget: "umd", // 把子应用打包成 umd 库格式
        chunkLoadingGlobal: `webpackJsonp_${name}`,
      },
    }
  },
});
