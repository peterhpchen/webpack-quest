const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: path.resolve(__dirname, "loader"), options: { name: "a" } },
          { loader: path.resolve(__dirname, "loader"), options: { name: "b" } },
          { loader: path.resolve(__dirname, "loader"), options: { name: "c" } },
        ],
      },
      {
        include: [path.resolve(__dirname, "src")],
        use: [
          { loader: path.resolve(__dirname, "loader"), options: { name: "d" } },
          { loader: path.resolve(__dirname, "loader"), options: { name: "e" } },
          { loader: path.resolve(__dirname, "loader"), options: { name: "f" } },
        ],
      },
      {
        oneOf: [
          {
            test: /\.js$/,
            use: [
              {
                loader: path.resolve(__dirname, "loader"),
                options: { name: "g" },
              },
              {
                loader: path.resolve(__dirname, "loader"),
                options: { name: "h" },
              },
              {
                loader: path.resolve(__dirname, "loader"),
                options: { name: "i" },
              },
            ],
          },
          {
            include: [path.resolve(__dirname, "src")],
            use: [
              {
                loader: path.resolve(__dirname, "loader"),
                options: { name: "j" },
              },
              {
                loader: path.resolve(__dirname, "loader"),
                options: { name: "k" },
              },
              {
                loader: path.resolve(__dirname, "loader"),
                options: { name: "l" },
              },
            ],
          },
        ],
      },
    ],
  },
};
