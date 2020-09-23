const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"',
    }),
  ],
};
