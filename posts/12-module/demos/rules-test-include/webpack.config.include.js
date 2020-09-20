const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        include: /\.js$/,
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
