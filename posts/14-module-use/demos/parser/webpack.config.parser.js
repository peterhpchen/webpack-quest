module.exports = {
  mode: "none",
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
