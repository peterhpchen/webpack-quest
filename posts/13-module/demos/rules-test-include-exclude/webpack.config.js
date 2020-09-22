const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.js",
    app: "./app/index.js",
    other: "./other/index.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src"), (path) => path.match(/app/)],
        exclude: path.resolve(__dirname, "app", "exclude"),
        use: [
          {
            loader: path.resolve(__dirname, "loader"),
            options: { rule: "test, include and exclude" },
          },
        ],
      },
    ],
  },
};
