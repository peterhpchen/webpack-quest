module.exports = ["none", "production"].map((mode) => ({
  mode,
  output: {
    filename: `${mode}.js`,
  },
}));
