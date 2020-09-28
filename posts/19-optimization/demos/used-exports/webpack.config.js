module.exports = [false, true].map((usedExports) => ({
  mode: "none",
  output: {
    filename: `${usedExports}.js`,
  },
  optimization: {
    usedExports,
  },
}));
