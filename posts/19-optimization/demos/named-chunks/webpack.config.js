module.exports = [false, true].map((namedChunks) => ({
  mode: "none",
  // entry: ['./src/index.js','./src/sub.js'],
  output: {
    filename: `${namedChunks}.js`,
  },
  optimization: {
    namedChunks,
  },
}));
