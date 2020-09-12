const webpack = require("webpack");
const path = require("path");

const configurationObject = [
  {
    name: "dev",
    mode: "development",
    entry: "./src/index2.js",
  },
  {
    name: "prod",
    mode: "production",
    entry: "./src/index2.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "build"),
    },
  },
];

const callbackFunction = (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  console.log(`Hash: ${info.hash}`);
  console.log(`Version: ${info.version}`);

  info.children.forEach((child) => {
    console.log(`Child ${child.name}`);
    console.log(` Hash: ${child.hash}`);
    console.log(` Version: ${child.version}`);
    console.log(` Time: ${child.time}`);
    console.log(` Bult at: ${child.builtAt}`);
    console.log("\n");
  });

  if (stats.hasErrors()) {
    // 編譯過程發生錯誤
    info.errors.forEach((error) => {
      console.error(error);
    });
  }

  if (stats.hasWarnings()) {
    // 編譯過程發生警告
    info.warnings.forEach((warning) => {
      console.warn(warning);
    });
  }

  // console.log(stats.toString());
};

const compiler = webpack(configurationObject);
compiler.run(callbackFunction);
