(function () {
  "use strict";
  (function (f) {
    function c(a) {
      if (e[a]) return e[a].exports;
      var b = (e[a] = { i: a, l: !1, exports: {} });
      f[a].call(b.exports, b, b.exports, c);
      b.l = !0;
      return b.exports;
    }
    var e = {};
    c.m = f;
    c.c = e;
    c.d = function (a, b, d) {
      c.o(a, b) || Object.defineProperty(a, b, { enumerable: !0, get: d });
    };
    c.r = function (a) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(a, Symbol.toStringTag, { value: "Module" });
      Object.defineProperty(a, "__esModule", { value: !0 });
    };
    c.t = function (a, b) {
      b & 1 && (a = c(a));
      if (b & 8 || (b & 4 && "object" === typeof a && a && a.__esModule))
        return a;
      var d = Object.create(null);
      c.r(d);
      Object.defineProperty(d, "default", { enumerable: !0, value: a });
      if (b & 2 && "string" != typeof a)
        for (var g in a)
          c.d(
            d,
            g,
            function (h) {
              return a[h];
            }.bind(null, g)
          );
      return d;
    };
    c.n = function (a) {
      var b =
        a && a.__esModule
          ? function () {
              return a["default"];
            }
          : function () {
              return a;
            };
      c.d(b, "a", b);
      return b;
    };
    c.o = function (a, b) {
      return Object.prototype.hasOwnProperty.call(a, b);
    };
    c.p = "";
    return c((c.s = 0));
  })([
    function (f, c) {
      console.log("index");
    },
  ]);
}.call(this || window));
