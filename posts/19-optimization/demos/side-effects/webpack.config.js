module.exports = [false, true].map((sideEffects) => ({
  mode: "none",
  output: {
    filename: `${sideEffects}.js`,
  },
  optimization: {
    sideEffects,
  },
}));
