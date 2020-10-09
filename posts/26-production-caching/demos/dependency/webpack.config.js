const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "none",
  output: {
    filename: "[name].[hash].js",
  },
  plugins: [new HtmlWebpackPlugin()],
};
