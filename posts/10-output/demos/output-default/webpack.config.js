const path = require("path");

module.exports = {
  output: {
    path: path.join(process.cwd(), "dist"),
    filename: "[name].js",
  },
};
