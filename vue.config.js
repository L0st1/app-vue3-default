/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const path = require("path");
const { name } = require("./package");
const { defineConfig } = require("@vue/cli-service");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, dir);
}

// const srl = require("string-replace-loader");
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
    // config.module
    //   .rule("string-replace-loader")
    //   .test(/\.scss$/)
    //   .use("string-replace-loader")
    //   .loader("string-replace-loader")
    //   .options({
    //     search: /:root/g,
    //     replace: ":root, :host",
    //     flags: 'g'
    //   });
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
  configureWebpack: (config) => {
    // 开启分离js
    config.optimization = {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin(), // 压缩css
      ],
      splitChunks: {
        chunks: "initial", // 只命中直接导入
        minChunks: 1, // 引用大于等于1次进行分包，完整导入时会加载所有Chunks
        maxInitialRequests: Infinity,
        minSize: 0,
        maxSize: 172 * 1024,
        cacheGroups: {
          // 通过缓存组将依赖单独打包
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )?.[1] || "";
              return `npm.${packageName.replace("@", "")}`;
            },
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, // 被引用3次就提取出来
            priority: 5,
            reuseExistingChunk: true, // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
          },
        },
      },
    };
    return {
      plugins: [require("unplugin-element-plus/webpack")({}),
      new BundleAnalyzerPlugin({
        // analyzerMode: "server", // 不启动展示打包报告的http服务器  127.0.0.1:2000
        // analyzerPort: "2000",
        // generateStatsFile: false, // 是否生成stats.json文件
        // openAnalyzer: false, // Automatically open report in default browser
        // // logLevel: "silent" // 因为启用了webpack-server-dev 只能分析原始文件大小，采用silent不输出信息
        // // No bundles were parsed. Analyzer will show only original module sizes from stats file.
        analyzerMode: 'static',
        reportFilename: 'report.html',
        defaultSizes: 'gzip',
        generateStatsFile: true, // 如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
        openAnalyzer: false, // 默认在浏览器中自动打开报告
        statsFilename: 'stats.json', // 如果generateStatsFile为true，将会生成Webpack Stats JSON文件的名字
        statsOptions: { source: false }
      }),
      ],
      output: {
        library: `${name}-[name]`,
        libraryTarget: "umd", // 把子应用打包成 umd 库格式
        chunkLoadingGlobal: `webpackJsonp_${name}`,
      },
    };
  },
});
