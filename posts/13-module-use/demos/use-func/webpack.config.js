const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: (info) => console.log(info) || [path.resolve(__dirname, "loader")],
      },
    ],
  },
};
