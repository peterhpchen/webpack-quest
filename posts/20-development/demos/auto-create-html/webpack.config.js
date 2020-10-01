const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  plugins: [new HtmlWebpackPlugin()],
};
