module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: "style-loader",
      },
      {
        test: /\.scss$/,
        use: {
          loader: "css-loader",
        },
      },
      {
        test: /\.scss$/,
        use: (info) => console.log(info.issuer) || "sass-loader",
      },
    ],
  },
};
