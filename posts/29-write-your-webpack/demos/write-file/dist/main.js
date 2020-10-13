(function (modules) {
  function require(id) {
    const [fn, mapping] = modules[id];
    function localRequire(name) {
      return require(mapping[name]);
    }
    const module = { exports: {} };
    fn(module, module.exports, localRequire);
    return module.exports;
  }
  require(0);
})({
  0: [
    function (module, exports, require) {
      "use strict";

      var _message = _interopRequireDefault(require("./message.js"));

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      console.log(_message["default"]);
    },
    { "./message.js": 1 },
  ],
  1: [
    function (module, exports, require) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports["default"] = void 0;

      var _demoName = require("./demoName.js");

      var _default = "hello ".concat(_demoName.demoName);

      exports["default"] = _default;
    },
    { "./demoName.js": 2 },
  ],
  2: [
    function (module, exports, require) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports.demoName = void 0;
      var demoName = "simple";
      exports.demoName = demoName;
    },
    {},
  ],
});
