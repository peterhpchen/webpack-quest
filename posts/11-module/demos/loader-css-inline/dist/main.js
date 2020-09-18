!(function (n) {
  var t = {};
  function e(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return n[r].call(o.exports, o, o.exports, e), (o.l = !0), o.exports;
  }
  (e.m = n),
    (e.c = t),
    (e.d = function (n, t, r) {
      e.o(n, t) || Object.defineProperty(n, t, { enumerable: !0, get: r });
    }),
    (e.r = function (n) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(n, "__esModule", { value: !0 });
    }),
    (e.t = function (n, t) {
      if ((1 & t && (n = e(n)), 8 & t)) return n;
      if (4 & t && "object" == typeof n && n && n.__esModule) return n;
      var r = Object.create(null);
      if (
        (e.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: n }),
        2 & t && "string" != typeof n)
      )
        for (var o in n)
          e.d(
            r,
            o,
            function (t) {
              return n[t];
            }.bind(null, o)
          );
      return r;
    }),
    (e.n = function (n) {
      var t =
        n && n.__esModule
          ? function () {
              return n.default;
            }
          : function () {
              return n;
            };
      return e.d(t, "a", t), t;
    }),
    (e.o = function (n, t) {
      return Object.prototype.hasOwnProperty.call(n, t);
    }),
    (e.p = ""),
    e((e.s = 2));
})([
  function (n, t, e) {
    "use strict";
    var r = e(1),
      o = e.n(r)()(!1);
    o.push([n.i, ".demo {\n  color: blue;\n}\n", ""]), (t.a = o);
  },
  function (n, t, e) {
    "use strict";
    n.exports = function (n) {
      var t = [];
      return (
        (t.toString = function () {
          return this.map(function (t) {
            var e = (function (n, t) {
              var e = n[1] || "",
                r = n[3];
              if (!r) return e;
              if (t && "function" == typeof btoa) {
                var o =
                    ((u = r),
                    (a = btoa(unescape(encodeURIComponent(JSON.stringify(u))))),
                    (i = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(
                      a
                    )),
                    "/*# ".concat(i, " */")),
                  c = r.sources.map(function (n) {
                    return "/*# sourceURL="
                      .concat(r.sourceRoot || "")
                      .concat(n, " */");
                  });
                return [e].concat(c).concat([o]).join("\n");
              }
              var u, a, i;
              return [e].join("\n");
            })(t, n);
            return t[2] ? "@media ".concat(t[2], " {").concat(e, "}") : e;
          }).join("");
        }),
        (t.i = function (n, e, r) {
          "string" == typeof n && (n = [[null, n, ""]]);
          var o = {};
          if (r)
            for (var c = 0; c < this.length; c++) {
              var u = this[c][0];
              null != u && (o[u] = !0);
            }
          for (var a = 0; a < n.length; a++) {
            var i = [].concat(n[a]);
            (r && o[i[0]]) ||
              (e &&
                (i[2]
                  ? (i[2] = "".concat(e, " and ").concat(i[2]))
                  : (i[2] = e)),
              t.push(i));
          }
        }),
        t
      );
    };
  },
  function (n, t, e) {
    "use strict";
    e.r(t);
    var r = e(0);
    document.head.appendChild(
      (function (n) {
        const t = document.createElement("style");
        return (t.innerHTML = n), t;
      })(r.a.toString())
    );
  },
]);
