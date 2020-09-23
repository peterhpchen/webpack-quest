const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // import plugin

module.exports = {
  plugins: [
    // config plugin
    new CleanWebpackPlugin(), // new plugin
  ],
};
