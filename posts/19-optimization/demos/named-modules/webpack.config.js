module.exports = [true, false].map((namedModules) => ({
  mode: "none",
  output: {
    filename: `${namedModules}.js`,
  },
  optimization: {
    namedModules,
  },
}));
