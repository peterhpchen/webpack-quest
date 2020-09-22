const path = require("path");

module.exports = {
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: [{
      //     loader: path.resolve(__dirname, "loader"),
      //     options: {
      //       name: 'a'
      //     }
      //   }],
      // }, // equal below
      {
        test: /\.js$/,
        loader: path.resolve(__dirname, "loader"),
        options: {
          name: "a",
        },
      },
    ],
  },
};
