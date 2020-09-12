const path = require("path");
const webpack = require("webpack");

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled Postcss, autoprefixer and precss for you. This allows your app
 * to lint  CSS, support variables and mixins, transpile future CSS syntax,
 * inline images, and more!
 *
 * To enable SASS or LESS, add the respective loaders to module.rules
 *
 * https://github.com/postcss/postcss
 *
 * https://github.com/postcss/autoprefixer
 *
 * https://github.com/jonathantneal/precss
 *
 */

const autoprefixer = require("autoprefixer");
const precss = require("precss");

/*
 * We've enabled MiniCssExtractPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/mini-css-extract-plugin
 *
 */

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/*
 * We've enabled TerserPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/terser-webpack-plugin
 *
 */

const TerserPlugin = require("terser-webpack-plugin");

const workboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  mode: "development",

  entry: {
    pageOne: "./src/pageOne.js",
    pageTwo: "./src/pageTwo.js",
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename: "main.[chunkhash].css" }),
    new workboxPlugin.GenerateSW({
      swDest: "sw.js",
      clientsClaim: true,
      skipWaiting: false,
    }),
  ],

  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        include: [path.resolve(__dirname, "src")],
        loader: "babel-loader",
      },
      {
        test: /.css$/,

        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",

            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",

            options: {
              plugins: function () {
                return [precss, autoprefixer];
              },
            },
          },
        ],
      },
    ],
  },

  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
      },

      chunks: "async",
      minChunks: 1,
      minSize: 30000,
      name: true,
    },
  },
};
