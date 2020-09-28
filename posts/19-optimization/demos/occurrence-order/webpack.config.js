module.exports = [false, true].map((occurrenceOrder) => ({
  mode: "none",
  entry: {
    main: "./src/index.js",
    sub: "./src/sub.js",
    normal: "./src/normal.js",
  },
  output: {
    filename: `[name].${occurrenceOrder}.js`,
  },
  optimization: {
    occurrenceOrder,
  },
}));
