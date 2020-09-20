const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.png$/,
        use: "file-loader",
      },
      {
        test: /\.js$/,
        use: path.resolve(__dirname, "loader"),
      },
    ],
  },
};
