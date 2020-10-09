const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "none",
  output: {
    filename: "[name].[chunkhash].js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    // runtimeChunk: true
  },
  plugins: [new HtmlWebpackPlugin()],
};
