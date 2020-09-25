const devtools = [
  false,
  "source-map",
  "cheap-source-map",
  "cheap-module-source-map",
  "nosources-source-map",
  "nosources-cheap-source-map",
  "nosources-cheap-module-source-map",
  "eval",
  "eval-source-map",
  "eval-cheap-source-map",
  "eval-cheap-module-source-map",
  "eval-nosources-source-map",
  "eval-nosources-cheap-source-map",
  "eval-nosources-cheap-module-source-map",
  "hidden-source-map",
  "hidden-cheap-source-map",
  "hidden-cheap-module-source-map",
  "hidden-nosources-source-map",
  "hidden-nosources-cheap-source-map",
  "hidden-nosources-cheap-module-source-map",
  "inline-source-map",
  "inline-cheap-source-map",
  "inline-cheap-module-source-map",
  "inline-nosources-source-map",
  "inline-nosources-cheap-source-map",
  "inline-nosources-cheap-module-source-map",
];

module.exports = devtools.map((devtool) => ({
  mode: "development",
  output: {
    filename: `${devtool || "[name]"}.js`,
  },
  devtool,
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
}));
