const WebpackDashboardPlugin = require("webpack-dashboard/plugin");

module.exports =
  // [
  {
    mode: "none",
    entry: {
      main: ["./src/index.js", "./src/index2.js"],
      sub: "./src/sub.js",
    },
    plugins: [new WebpackDashboardPlugin()],
  };
// ,{
//     mode: 'none',
//     entry: {
//         main: ['./src/index.js', './src/index2.js'],
//         sub: './src/sub.js'
//     }
// }]
