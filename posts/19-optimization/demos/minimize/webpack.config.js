module.exports = [false, true].map((minimize) => ({
  mode: "none",
  output: {
    filename: `${minimize}.js`,
  },
  optimization: {
    minimize,
  },
}));
