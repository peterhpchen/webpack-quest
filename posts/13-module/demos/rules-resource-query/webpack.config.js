const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        resourceQuery: (query) => query.match(/yo/),
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
