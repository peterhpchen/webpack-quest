const { getOptions } = require("loader-utils");

module.exports = function (source) {
  const options = getOptions(this);
  console.log(`${(options && options.name) || "this"} loader execution`);
  return source;
};
