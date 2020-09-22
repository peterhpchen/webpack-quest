const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        exclude: /\.js$/,
        use: [
          {
            loader: path.resolve(__dirname, "loader"),
            options: { rule: "include" },
          },
        ],
      },
    ],
  },
};
