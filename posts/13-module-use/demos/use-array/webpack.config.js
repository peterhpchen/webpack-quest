module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
          },
          (info) => console.log(info) || "sass-loader",
        ],
      },
    ],
  },
};
