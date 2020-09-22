const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        oneOf: [
          {
            use: [
              {
                loader: path.resolve(__dirname, "loader"),
                options: { name: "0" },
              },
            ],
          },
          {
            test: /\.js$/,
            use: [
              {
                loader: path.resolve(__dirname, "loader"),
                options: { name: "a" },
              },
            ],
            rules: [
              {
                include: path.resolve(__dirname, "src"),
                use: [
                  {
                    loader: path.resolve(__dirname, "loader"),
                    options: { name: "a-a" },
                  },
                ],
              },
              {
                include: path.resolve(__dirname, "src"),
                use: [
                  {
                    loader: path.resolve(__dirname, "loader"),
                    options: { name: "a-b" },
                  },
                ],
              },
            ],
          },
          {
            test: /\.js$/,
            use: [
              {
                loader: path.resolve(__dirname, "loader"),
                options: { name: "b" },
              },
            ],
          },
        ],
      },
    ],
  },
};
