const webpack = require("webpack");
const path = require("path");

// https://webpack.js.org/configuration/#options
const configurationObject = {
  entry: path.resolve(__dirname, "src", "index2.js"),
};

// https://webpack.js.org/api/node/#stats-object
const callbackFunction = (err, stats) => {
  if (err) {
    // webpack 發生錯誤
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }
  console.log(stats);
  // info 是 Stats Data : https://webpack.js.org/api/stats/#root
  // const info = stats.toJson();

  // console.log(`Hash: ${info.hash}`);
  // console.log(`Version: ${info.version}`);
  // console.log(`Time: ${info.time}`);
  // console.log(`Bult at: ${info.builtAt}`);
  // console.log("\n");

  // if (stats.hasErrors()) {
  //   // 編譯過程發生錯誤
  //   info.errors.forEach((error) => {
  //     console.error(error);
  //   });
  // }

  // if (stats.hasWarnings()) {
  //   // 編譯過程發生警告
  //   info.warnings.forEach((warning) => {
  //     console.warn(warning);
  //   });
  // }

  // console.log(stats.toString())
};

// https://webpack.js.org/configuration/watch/#watchoptions
const watchOptions = {
  aggregateTimeout: 2000, // 檔案變動後２秒再重新編譯
};

const compiler = webpack(configurationObject);
const watching = compiler.watch(watchOptions, callbackFunction);

setTimeout(() => {
  console.log("\ninvalidate\n");
  watching.invalidate();
}, 1000);

setTimeout(() => {
  watching.close(() => {
    console.log("Closed");
  });
}, 5000);
