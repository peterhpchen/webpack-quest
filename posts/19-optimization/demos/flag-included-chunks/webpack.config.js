module.exports = [false, true].map((flagIncludedChunks) => ({
  mode: "none",
  entry: {
    main: "./src/index.js",
    sub: "./src/sub.js",
    normal: "./src/normal.js",
  },
  output: {
    filename: `[name].${flagIncludedChunks}.js`,
  },
  optimization: {
    flagIncludedChunks,
  },
}));
