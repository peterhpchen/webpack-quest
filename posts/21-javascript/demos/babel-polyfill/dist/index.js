"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;

var add = function add(a, b) {
  // ES2015: Arrow Function
  return a + b;
};

var addAsync = function addAsync(a, b) {
  return new Promise(function (resolve, reject) {
    resolve(a + b);
  });
};

var _default = {
  add: add,
  addAsync: addAsync,
};
exports["default"] = _default;
