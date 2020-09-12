const path = require("path");

module.exports = (env, argv) => ({
  mode: env.production ? "production" : "development",
  entry: "./src/index2.js",
  output: env.production
    ? {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build"),
      }
    : {},
});
