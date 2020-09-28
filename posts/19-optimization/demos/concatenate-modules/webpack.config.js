module.exports = [false, true].map((concatenateModules) => ({
  mode: "none",
  output: {
    filename: `${concatenateModules}.js`,
  },
  optimization: {
    concatenateModules,
  },
}));
