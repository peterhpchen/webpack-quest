module.exports = ["development", "production"].map((nodeEnv) => ({
  mode: "none",
  output: {
    filename: `${nodeEnv}.js`,
  },
  optimization: {
    nodeEnv,
  },
}));
