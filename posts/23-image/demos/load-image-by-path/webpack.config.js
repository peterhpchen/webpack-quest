module.exports = {
  mode: "none",
  module: {
    rules: [
      {
        test: /\.png$/,
        loader: "file-loader",
      },
    ],
  },
};
