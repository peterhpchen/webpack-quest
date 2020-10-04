const TerserWebpackPlugin = require("terser-webpack-plugin");
const ClosureWebpackPlugin = require("closure-webpack-plugin");

module.exports = [
  { name: "terser", plugin: TerserWebpackPlugin },
  { name: "closure", plugin: ClosureWebpackPlugin },
].map((minimizer) => ({
  mode: "none",
  output: {
    filename: `${minimizer.name}.js`,
  },
  optimization: {
    minimize: true,
    minimizer: [new minimizer.plugin()],
  },
}));
