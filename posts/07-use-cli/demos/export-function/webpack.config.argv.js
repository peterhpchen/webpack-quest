const path = require("path");

module.exports = (env, argv) => ({
  mode: argv.mode,
  entry: "./src/index2.js",
  output:
    argv.mode === "production"
      ? {
          filename: "bundle.js",
          path: path.resolve(__dirname, "build"),
        }
      : {},
});
