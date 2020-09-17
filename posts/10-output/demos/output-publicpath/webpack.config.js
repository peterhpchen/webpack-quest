const path = require("path");

module.exports = {
  output: {
    path: path.resolve(__dirname, "build/js"),
    publicPath: "./js/",
  },
};
