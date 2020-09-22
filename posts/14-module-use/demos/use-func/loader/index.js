const { parseQuery } = require("loader-utils");

module.exports = function (source) {
  const params = (this.resourceQuery && parseQuery(this.resourceQuery)) || {};
  return `${source} + ' ${params.name}'`;
};
