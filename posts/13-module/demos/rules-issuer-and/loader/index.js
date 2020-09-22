const { getOptions } = require("loader-utils");

module.exports = function (source) {
  console.log(`${getOptions(this).rule} - ${this.resourcePath}`);
  return source;
};
