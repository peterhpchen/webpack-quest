const webpack = require("webpack");

// const configuration = require('./webpack.config.js')
// webpack(configuration, () => {})
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const compiler = webpack({});
new CleanWebpackPlugin().apply(compiler);
compiler.run(() => {});
