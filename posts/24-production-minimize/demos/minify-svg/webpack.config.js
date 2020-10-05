const svgToMiniDataURI = require("mini-svg-data-uri");

module.exports = [false, true].map((isCompress) => ({
  mode: "none",
  output: {
    filename: `${isCompress}.js`,
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: () => {
          const urlLoaderEntry = {
            loader: "url-loader",
            options: {
              limit: 10240,
              publicPath: "./dist",
            },
          };
          return isCompress
            ? [
                {
                  ...urlLoaderEntry,
                  options: {
                    ...urlLoaderEntry.options,
                    generator: (content) =>
                      svgToMiniDataURI(content.toString()),
                  },
                },
                "image-webpack-loader",
              ]
            : [{ ...urlLoaderEntry }, "image-webpack-loader"];
        },
      },
    ],
  },
}));
