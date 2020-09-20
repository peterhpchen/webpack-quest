const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      // {
      //     test: /\.js$/,
      //     use: (info) => console.log(info) || {
      //         loader: path.resolve(__dirname, 'loader'),
      //         options: {
      //             name: 'b'
      //         }
      //     }
      // },
      {
        test: /\.js$/,
        use: {
          loader: path.resolve(__dirname, "loader"),
          options: {
            name: "b",
          },
        },
      },
    ],
  },
};
