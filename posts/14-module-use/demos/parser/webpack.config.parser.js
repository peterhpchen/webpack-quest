module.exports = {
  mode: "development",
  output: {
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js/,
        parser: {
          harmony: false,
        },
      },
    ],
  },
};
