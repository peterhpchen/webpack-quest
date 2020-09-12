const webpack = require("webpack");
const path = require("path");

const configurationObject = {
  entry: path.resolve(__dirname, "src", "index2.js"),
};

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
  console.log(`Time: ${info.time}`);
  console.log(`Bult at: ${info.builtAt}`);
  console.log("\n");

  if (stats.hasErrors()) {
    info.errors.forEach((error) => {
      console.error(error);
    });
  }

  if (stats.hasWarnings()) {
    info.warnings.forEach((warning) => {
      console.warn(warning);
    });
  }
};

const compiler = webpack(configurationObject);
compiler.run(callbackFunction);
