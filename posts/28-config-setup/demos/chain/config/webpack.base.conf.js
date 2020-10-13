const WebpackConfig = require("webpack-chain");

const webpackConfig = new WebpackConfig();

webpackConfig.module
  .rule("js")
  .test(/\.js$/)
  .use("babel")
  .loader("babel-loader");

module.exports = webpackConfig;
