const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.js",
    app: "./app/index.js",
  },
  module: {
    jj: "",
    rules: [
      {
        resource: {
          test: /\.js/,
        },
        loader: path.resolve(__dirname, "loader"),
        options: { rule: "test: /.js/" },
      },
      {
        resource: {
          test: path.resolve(__dirname, "src"),
        },
        loader: path.resolve(__dirname, "loader"),
        options: { rule: "test: ./src" },
      },
      {
        include: path.resolve(__dirname, "src"),
        loader: path.resolve(__dirname, "loader"),
        options: { rule: "include: ./src" },
      },
      {
        exclude: path.resolve(__dirname, "app"),
        loader: path.resolve(__dirname, "loader"),
        options: { rule: "exclude: ./app" },
      },
      {
        resource: {
          not: [path.resolve(__dirname, "app"), /alpha\.js/],
        },
        loader: path.resolve(__dirname, "loader"),
        options: { rule: "and: ./app, alpha.js" },
      },
    ],
  },
};
