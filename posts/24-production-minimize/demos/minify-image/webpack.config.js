module.exports = [false, true].map((isCompress) => ({
  mode: "none",
  output: {
    filename: `${isCompress}.js`,
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 0,
              publicPath: "./dist",
            },
          },
          "image-webpack-loader",
        ].filter((entry) =>
          entry === "image-webpack-loader" ? isCompress : true
        ),
      },
    ],
  },
}));
