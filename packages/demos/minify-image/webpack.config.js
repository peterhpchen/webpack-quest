module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
              publicPath: "./dist",
            },
          },
          "image-webpack-loader",
        ],
      },
    ],
  },
};
