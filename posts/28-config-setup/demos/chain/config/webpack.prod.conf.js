const webpack = require("webpack");
const webpackConfig = require("./webpack.base.conf");

webpackConfig.module
  .rule("js")
  .use("babel")
  .loader("babel-loader")
  .tap((options) => options);

webpackConfig.mode("production");

module.exports = webpackConfig.toConfig();
