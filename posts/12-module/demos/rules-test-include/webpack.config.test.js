const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve(__dirname, "loader"),
            options: { rule: "test" },
          },
        ],
      },
    ],
  },
};
