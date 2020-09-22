const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.js",
    app: "./app/index.js",
  },
  module: {
    rules: [
      {
        issuer: {
          and: [path.resolve(__dirname, "src"), /\.js$/],
        },
        use: [
          {
            loader: path.resolve(__dirname, "loader"),
            options: { rule: "issuer.and" },
          },
        ],
      },
    ],
  },
};
