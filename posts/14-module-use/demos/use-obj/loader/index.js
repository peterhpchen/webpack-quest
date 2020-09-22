const { getOptions } = require("loader-utils");

module.exports = function (source) {
  console.log(`${getOptions(this).name} loader execution`);
  return source;
};
