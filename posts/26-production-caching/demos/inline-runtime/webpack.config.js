const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

module.exports = {
  mode: "none",
  output: {
    filename: "[name].[chunkhash].js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inlineSource: "runtime~.+\\.js",
    }),
    new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
  ],
};
