module.exports = [false, true].map((namedChunks) => ({
  mode: "none",
  output: {
    filename: `${namedChunks}.js`,
  },
  optimization: {
    namedChunks,
  },
}));
