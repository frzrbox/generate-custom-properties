!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(
        exports,
        require("fs"),
        require("util"),
        require("url"),
        require("path")
      )
    : "function" == typeof define && define.amd
    ? define(["exports", "fs", "util", "url", "path"], t)
    : t(
        ((e = "undefined" != typeof globalThis ? globalThis : e || self)[
          "generate-custom-properties"
        ] = {}),
        e.fs,
        e.require$$0,
        e.urlLib,
        e.path
      );
})(this, function (e, t, n, r, o) {
  "use strict";
  function i(e) {
    return e && "object" == typeof e && "default" in e ? e : { default: e };
  }
  var s = i(t),
    a = i(n),
    u = i(r),
    l = i(o),
    c = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
  function p(e) {
    return e ? e.replace(/^\s+|\s+$/g, "") : "";
  }
  function h(e, t) {
    var n = e && "string" == typeof e.type,
      r = n ? e : t;
    for (var o in e) {
      var i = e[o];
      Array.isArray(i)
        ? i.forEach(function (e) {
            h(e, r);
          })
        : i && "object" == typeof i && h(i, r);
    }
    return (
      n &&
        Object.defineProperty(e, "parent", {
          configurable: !0,
          writable: !0,
          enumerable: !1,
          value: t || null,
        }),
      e
    );
  }
  var f = g;
  function g(e) {
    this.options = e || {};
  }
  function m(e, t, n) {
    return (
      e(
        (n = {
          path: t,
          exports: {},
          require: function (e, t) {
            return (function () {
              throw new Error(
                "Dynamic requires are not currently supported by @rollup/plugin-commonjs"
              );
            })(null == t && n.path);
          },
        }),
        n.exports
      ),
      n.exports
    );
  }
  (g.prototype.emit = function (e) {
    return e;
  }),
    (g.prototype.visit = function (e) {
      return this[e.type](e);
    }),
    (g.prototype.mapVisit = function (e, t) {
      var n = "";
      t = t || "";
      for (var r = 0, o = e.length; r < o; r++)
        (n += this.visit(e[r])), t && r < o - 1 && (n += this.emit(t));
      return n;
    });
  var d = m(function (e) {
      "function" == typeof Object.create
        ? (e.exports = function (e, t) {
            t &&
              ((e.super_ = t),
              (e.prototype = Object.create(t.prototype, {
                constructor: {
                  value: e,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })));
          })
        : (e.exports = function (e, t) {
            if (t) {
              e.super_ = t;
              var n = function () {};
              (n.prototype = t.prototype),
                (e.prototype = new n()),
                (e.prototype.constructor = e);
            }
          });
    }),
    y = m(function (e) {
      try {
        var t = a.default;
        if ("function" != typeof t.inherits) throw "";
        e.exports = t.inherits;
      } catch (t) {
        e.exports = d;
      }
    }),
    v = _;
  function _(e) {
    f.call(this, e);
  }
  y(_, f),
    (_.prototype.compile = function (e) {
      return e.stylesheet.rules.map(this.visit, this).join("");
    }),
    (_.prototype.comment = function (e) {
      return this.emit("", e.position);
    }),
    (_.prototype.import = function (e) {
      return this.emit("@import " + e.import + ";", e.position);
    }),
    (_.prototype.media = function (e) {
      return (
        this.emit("@media " + e.media, e.position) +
        this.emit("{") +
        this.mapVisit(e.rules) +
        this.emit("}")
      );
    }),
    (_.prototype.document = function (e) {
      var t = "@" + (e.vendor || "") + "document " + e.document;
      return (
        this.emit(t, e.position) +
        this.emit("{") +
        this.mapVisit(e.rules) +
        this.emit("}")
      );
    }),
    (_.prototype.charset = function (e) {
      return this.emit("@charset " + e.charset + ";", e.position);
    }),
    (_.prototype.namespace = function (e) {
      return this.emit("@namespace " + e.namespace + ";", e.position);
    }),
    (_.prototype.supports = function (e) {
      return (
        this.emit("@supports " + e.supports, e.position) +
        this.emit("{") +
        this.mapVisit(e.rules) +
        this.emit("}")
      );
    }),
    (_.prototype.keyframes = function (e) {
      return (
        this.emit("@" + (e.vendor || "") + "keyframes " + e.name, e.position) +
        this.emit("{") +
        this.mapVisit(e.keyframes) +
        this.emit("}")
      );
    }),
    (_.prototype.keyframe = function (e) {
      var t = e.declarations;
      return (
        this.emit(e.values.join(","), e.position) +
        this.emit("{") +
        this.mapVisit(t) +
        this.emit("}")
      );
    }),
    (_.prototype.page = function (e) {
      var t = e.selectors.length ? e.selectors.join(", ") : "";
      return (
        this.emit("@page " + t, e.position) +
        this.emit("{") +
        this.mapVisit(e.declarations) +
        this.emit("}")
      );
    }),
    (_.prototype["font-face"] = function (e) {
      return (
        this.emit("@font-face", e.position) +
        this.emit("{") +
        this.mapVisit(e.declarations) +
        this.emit("}")
      );
    }),
    (_.prototype.host = function (e) {
      return (
        this.emit("@host", e.position) +
        this.emit("{") +
        this.mapVisit(e.rules) +
        this.emit("}")
      );
    }),
    (_.prototype["custom-media"] = function (e) {
      return this.emit(
        "@custom-media " + e.name + " " + e.media + ";",
        e.position
      );
    }),
    (_.prototype.rule = function (e) {
      var t = e.declarations;
      return t.length
        ? this.emit(e.selectors.join(","), e.position) +
            this.emit("{") +
            this.mapVisit(t) +
            this.emit("}")
        : "";
    }),
    (_.prototype.declaration = function (e) {
      return this.emit(e.property + ":" + e.value, e.position) + this.emit(";");
    });
  var C = S;
  function S(e) {
    (e = e || {}), f.call(this, e), (this.indentation = e.indent);
  }
  y(S, f),
    (S.prototype.compile = function (e) {
      return this.stylesheet(e);
    }),
    (S.prototype.stylesheet = function (e) {
      return this.mapVisit(e.stylesheet.rules, "\n\n");
    }),
    (S.prototype.comment = function (e) {
      return this.emit(this.indent() + "/*" + e.comment + "*/", e.position);
    }),
    (S.prototype.import = function (e) {
      return this.emit("@import " + e.import + ";", e.position);
    }),
    (S.prototype.media = function (e) {
      return (
        this.emit("@media " + e.media, e.position) +
        this.emit(" {\n" + this.indent(1)) +
        this.mapVisit(e.rules, "\n\n") +
        this.emit(this.indent(-1) + "\n}")
      );
    }),
    (S.prototype.document = function (e) {
      var t = "@" + (e.vendor || "") + "document " + e.document;
      return (
        this.emit(t, e.position) +
        this.emit("  {\n" + this.indent(1)) +
        this.mapVisit(e.rules, "\n\n") +
        this.emit(this.indent(-1) + "\n}")
      );
    }),
    (S.prototype.charset = function (e) {
      return this.emit("@charset " + e.charset + ";", e.position);
    }),
    (S.prototype.namespace = function (e) {
      return this.emit("@namespace " + e.namespace + ";", e.position);
    }),
    (S.prototype.supports = function (e) {
      return (
        this.emit("@supports " + e.supports, e.position) +
        this.emit(" {\n" + this.indent(1)) +
        this.mapVisit(e.rules, "\n\n") +
        this.emit(this.indent(-1) + "\n}")
      );
    }),
    (S.prototype.keyframes = function (e) {
      return (
        this.emit("@" + (e.vendor || "") + "keyframes " + e.name, e.position) +
        this.emit(" {\n" + this.indent(1)) +
        this.mapVisit(e.keyframes, "\n") +
        this.emit(this.indent(-1) + "}")
      );
    }),
    (S.prototype.keyframe = function (e) {
      var t = e.declarations;
      return (
        this.emit(this.indent()) +
        this.emit(e.values.join(", "), e.position) +
        this.emit(" {\n" + this.indent(1)) +
        this.mapVisit(t, "\n") +
        this.emit(this.indent(-1) + "\n" + this.indent() + "}\n")
      );
    }),
    (S.prototype.page = function (e) {
      var t = e.selectors.length ? e.selectors.join(", ") + " " : "";
      return (
        this.emit("@page " + t, e.position) +
        this.emit("{\n") +
        this.emit(this.indent(1)) +
        this.mapVisit(e.declarations, "\n") +
        this.emit(this.indent(-1)) +
        this.emit("\n}")
      );
    }),
    (S.prototype["font-face"] = function (e) {
      return (
        this.emit("@font-face ", e.position) +
        this.emit("{\n") +
        this.emit(this.indent(1)) +
        this.mapVisit(e.declarations, "\n") +
        this.emit(this.indent(-1)) +
        this.emit("\n}")
      );
    }),
    (S.prototype.host = function (e) {
      return (
        this.emit("@host", e.position) +
        this.emit(" {\n" + this.indent(1)) +
        this.mapVisit(e.rules, "\n\n") +
        this.emit(this.indent(-1) + "\n}")
      );
    }),
    (S.prototype["custom-media"] = function (e) {
      return this.emit(
        "@custom-media " + e.name + " " + e.media + ";",
        e.position
      );
    }),
    (S.prototype.rule = function (e) {
      var t = this.indent(),
        n = e.declarations;
      return n.length
        ? this.emit(
            e.selectors
              .map(function (e) {
                return t + e;
              })
              .join(",\n"),
            e.position
          ) +
            this.emit(" {\n") +
            this.emit(this.indent(1)) +
            this.mapVisit(n, "\n") +
            this.emit(this.indent(-1)) +
            this.emit("\n" + this.indent() + "}")
        : "";
    }),
    (S.prototype.declaration = function (e) {
      return (
        this.emit(this.indent()) +
        this.emit(e.property + ": " + e.value, e.position) +
        this.emit(";")
      );
    }),
    (S.prototype.indent = function (e) {
      return (
        (this.level = this.level || 1),
        null != e
          ? ((this.level += e), "")
          : Array(this.level).join(this.indentation || "  ")
      );
    });
  var w = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(
      ""
    ),
    A = function (e) {
      if (0 <= e && e < w.length) return w[e];
      throw new TypeError("Must be between 0 and 63: " + e);
    },
    R = function (e) {
      return 65 <= e && e <= 90
        ? e - 65
        : 97 <= e && e <= 122
        ? e - 97 + 26
        : 48 <= e && e <= 57
        ? e - 48 + 52
        : 43 == e
        ? 62
        : 47 == e
        ? 63
        : -1;
    };
  var M = function (e) {
      var t,
        n = "",
        r = (function (e) {
          return e < 0 ? 1 + (-e << 1) : 0 + (e << 1);
        })(e);
      do {
        (t = 31 & r), (r >>>= 5) > 0 && (t |= 32), (n += A(t));
      } while (r > 0);
      return n;
    },
    O = function (e, t, n) {
      var r,
        o,
        i,
        s,
        a = e.length,
        u = 0,
        l = 0;
      do {
        if (t >= a)
          throw new Error("Expected more digits in base 64 VLQ value.");
        if (-1 === (o = R(e.charCodeAt(t++))))
          throw new Error("Invalid base64 digit: " + e.charAt(t - 1));
        (r = !!(32 & o)), (u += (o &= 31) << l), (l += 5);
      } while (r);
      (n.value = ((s = (i = u) >> 1), 1 == (1 & i) ? -s : s)), (n.rest = t);
    },
    L = m(function (e, t) {
      t.getArg = function (e, t, n) {
        if (t in e) return e[t];
        if (3 === arguments.length) return n;
        throw new Error('"' + t + '" is a required argument.');
      };
      var n = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,
        r = /^data:.+\,.+$/;
      function o(e) {
        var t = e.match(n);
        return t
          ? { scheme: t[1], auth: t[2], host: t[3], port: t[4], path: t[5] }
          : null;
      }
      function i(e) {
        var t = "";
        return (
          e.scheme && (t += e.scheme + ":"),
          (t += "//"),
          e.auth && (t += e.auth + "@"),
          e.host && (t += e.host),
          e.port && (t += ":" + e.port),
          e.path && (t += e.path),
          t
        );
      }
      function s(e) {
        var n = e,
          r = o(e);
        if (r) {
          if (!r.path) return e;
          n = r.path;
        }
        for (
          var s,
            a = t.isAbsolute(n),
            u = n.split(/\/+/),
            l = 0,
            c = u.length - 1;
          c >= 0;
          c--
        )
          "." === (s = u[c])
            ? u.splice(c, 1)
            : ".." === s
            ? l++
            : l > 0 &&
              ("" === s
                ? (u.splice(c + 1, l), (l = 0))
                : (u.splice(c, 2), l--));
        return (
          "" === (n = u.join("/")) && (n = a ? "/" : "."),
          r ? ((r.path = n), i(r)) : n
        );
      }
      function a(e, t) {
        "" === e && (e = "."), "" === t && (t = ".");
        var n = o(t),
          a = o(e);
        if ((a && (e = a.path || "/"), n && !n.scheme))
          return a && (n.scheme = a.scheme), i(n);
        if (n || t.match(r)) return t;
        if (a && !a.host && !a.path) return (a.host = t), i(a);
        var u = "/" === t.charAt(0) ? t : s(e.replace(/\/+$/, "") + "/" + t);
        return a ? ((a.path = u), i(a)) : u;
      }
      (t.urlParse = o),
        (t.urlGenerate = i),
        (t.normalize = s),
        (t.join = a),
        (t.isAbsolute = function (e) {
          return "/" === e.charAt(0) || n.test(e);
        }),
        (t.relative = function (e, t) {
          "" === e && (e = "."), (e = e.replace(/\/$/, ""));
          for (var n = 0; 0 !== t.indexOf(e + "/"); ) {
            var r = e.lastIndexOf("/");
            if (r < 0) return t;
            if ((e = e.slice(0, r)).match(/^([^\/]+:\/)?\/*$/)) return t;
            ++n;
          }
          return Array(n + 1).join("../") + t.substr(e.length + 1);
        });
      var u = !("__proto__" in Object.create(null));
      function l(e) {
        return e;
      }
      function c(e) {
        if (!e) return !1;
        var t = e.length;
        if (t < 9) return !1;
        if (
          95 !== e.charCodeAt(t - 1) ||
          95 !== e.charCodeAt(t - 2) ||
          111 !== e.charCodeAt(t - 3) ||
          116 !== e.charCodeAt(t - 4) ||
          111 !== e.charCodeAt(t - 5) ||
          114 !== e.charCodeAt(t - 6) ||
          112 !== e.charCodeAt(t - 7) ||
          95 !== e.charCodeAt(t - 8) ||
          95 !== e.charCodeAt(t - 9)
        )
          return !1;
        for (var n = t - 10; n >= 0; n--) if (36 !== e.charCodeAt(n)) return !1;
        return !0;
      }
      function p(e, t) {
        return e === t ? 0 : null === e ? 1 : null === t ? -1 : e > t ? 1 : -1;
      }
      (t.toSetString = u
        ? l
        : function (e) {
            return c(e) ? "$" + e : e;
          }),
        (t.fromSetString = u
          ? l
          : function (e) {
              return c(e) ? e.slice(1) : e;
            }),
        (t.compareByOriginalPositions = function (e, t, n) {
          var r = p(e.source, t.source);
          return 0 !== r ||
            0 !== (r = e.originalLine - t.originalLine) ||
            0 !== (r = e.originalColumn - t.originalColumn) ||
            n ||
            0 !== (r = e.generatedColumn - t.generatedColumn) ||
            0 !== (r = e.generatedLine - t.generatedLine)
            ? r
            : p(e.name, t.name);
        }),
        (t.compareByGeneratedPositionsDeflated = function (e, t, n) {
          var r = e.generatedLine - t.generatedLine;
          return 0 !== r ||
            0 !== (r = e.generatedColumn - t.generatedColumn) ||
            n ||
            0 !== (r = p(e.source, t.source)) ||
            0 !== (r = e.originalLine - t.originalLine) ||
            0 !== (r = e.originalColumn - t.originalColumn)
            ? r
            : p(e.name, t.name);
        }),
        (t.compareByGeneratedPositionsInflated = function (e, t) {
          var n = e.generatedLine - t.generatedLine;
          return 0 !== n ||
            0 !== (n = e.generatedColumn - t.generatedColumn) ||
            0 !== (n = p(e.source, t.source)) ||
            0 !== (n = e.originalLine - t.originalLine) ||
            0 !== (n = e.originalColumn - t.originalColumn)
            ? n
            : p(e.name, t.name);
        }),
        (t.parseSourceMapInput = function (e) {
          return JSON.parse(e.replace(/^\)]}'[^\n]*\n/, ""));
        }),
        (t.computeSourceURL = function (e, t, n) {
          if (
            ((t = t || ""),
            e &&
              ("/" !== e[e.length - 1] && "/" !== t[0] && (e += "/"),
              (t = e + t)),
            n)
          ) {
            var r = o(n);
            if (!r) throw new Error("sourceMapURL could not be parsed");
            if (r.path) {
              var u = r.path.lastIndexOf("/");
              u >= 0 && (r.path = r.path.substring(0, u + 1));
            }
            t = a(i(r), t);
          }
          return s(t);
        });
    }),
    E = Object.prototype.hasOwnProperty,
    b = "undefined" != typeof Map;
  function j() {
    (this._array = []), (this._set = b ? new Map() : Object.create(null));
  }
  (j.fromArray = function (e, t) {
    for (var n = new j(), r = 0, o = e.length; r < o; r++) n.add(e[r], t);
    return n;
  }),
    (j.prototype.size = function () {
      return b ? this._set.size : Object.getOwnPropertyNames(this._set).length;
    }),
    (j.prototype.add = function (e, t) {
      var n = b ? e : L.toSetString(e),
        r = b ? this.has(e) : E.call(this._set, n),
        o = this._array.length;
      (r && !t) || this._array.push(e),
        r || (b ? this._set.set(e, o) : (this._set[n] = o));
    }),
    (j.prototype.has = function (e) {
      if (b) return this._set.has(e);
      var t = L.toSetString(e);
      return E.call(this._set, t);
    }),
    (j.prototype.indexOf = function (e) {
      if (b) {
        var t = this._set.get(e);
        if (t >= 0) return t;
      } else {
        var n = L.toSetString(e);
        if (E.call(this._set, n)) return this._set[n];
      }
      throw new Error('"' + e + '" is not in the set.');
    }),
    (j.prototype.at = function (e) {
      if (e >= 0 && e < this._array.length) return this._array[e];
      throw new Error("No element indexed by " + e);
    }),
    (j.prototype.toArray = function () {
      return this._array.slice();
    });
  var N = { ArraySet: j };
  function x() {
    (this._array = []),
      (this._sorted = !0),
      (this._last = { generatedLine: -1, generatedColumn: 0 });
  }
  (x.prototype.unsortedForEach = function (e, t) {
    this._array.forEach(e, t);
  }),
    (x.prototype.add = function (e) {
      var t, n, r, o, i, s;
      (t = this._last),
        (n = e),
        (r = t.generatedLine),
        (o = n.generatedLine),
        (i = t.generatedColumn),
        (s = n.generatedColumn),
        o > r ||
        (o == r && s >= i) ||
        L.compareByGeneratedPositionsInflated(t, n) <= 0
          ? ((this._last = e), this._array.push(e))
          : ((this._sorted = !1), this._array.push(e));
    }),
    (x.prototype.toArray = function () {
      return (
        this._sorted ||
          (this._array.sort(L.compareByGeneratedPositionsInflated),
          (this._sorted = !0)),
        this._array
      );
    });
  var G = N.ArraySet,
    P = { MappingList: x }.MappingList;
  function I(e) {
    e || (e = {}),
      (this._file = L.getArg(e, "file", null)),
      (this._sourceRoot = L.getArg(e, "sourceRoot", null)),
      (this._skipValidation = L.getArg(e, "skipValidation", !1)),
      (this._sources = new G()),
      (this._names = new G()),
      (this._mappings = new P()),
      (this._sourcesContents = null);
  }
  (I.prototype._version = 3),
    (I.fromSourceMap = function (e) {
      var t = e.sourceRoot,
        n = new I({ file: e.file, sourceRoot: t });
      return (
        e.eachMapping(function (e) {
          var r = {
            generated: { line: e.generatedLine, column: e.generatedColumn },
          };
          null != e.source &&
            ((r.source = e.source),
            null != t && (r.source = L.relative(t, r.source)),
            (r.original = { line: e.originalLine, column: e.originalColumn }),
            null != e.name && (r.name = e.name)),
            n.addMapping(r);
        }),
        e.sources.forEach(function (r) {
          var o = r;
          null !== t && (o = L.relative(t, r)),
            n._sources.has(o) || n._sources.add(o);
          var i = e.sourceContentFor(r);
          null != i && n.setSourceContent(r, i);
        }),
        n
      );
    }),
    (I.prototype.addMapping = function (e) {
      var t = L.getArg(e, "generated"),
        n = L.getArg(e, "original", null),
        r = L.getArg(e, "source", null),
        o = L.getArg(e, "name", null);
      this._skipValidation || this._validateMapping(t, n, r, o),
        null != r &&
          ((r = String(r)), this._sources.has(r) || this._sources.add(r)),
        null != o &&
          ((o = String(o)), this._names.has(o) || this._names.add(o)),
        this._mappings.add({
          generatedLine: t.line,
          generatedColumn: t.column,
          originalLine: null != n && n.line,
          originalColumn: null != n && n.column,
          source: r,
          name: o,
        });
    }),
    (I.prototype.setSourceContent = function (e, t) {
      var n = e;
      null != this._sourceRoot && (n = L.relative(this._sourceRoot, n)),
        null != t
          ? (this._sourcesContents ||
              (this._sourcesContents = Object.create(null)),
            (this._sourcesContents[L.toSetString(n)] = t))
          : this._sourcesContents &&
            (delete this._sourcesContents[L.toSetString(n)],
            0 === Object.keys(this._sourcesContents).length &&
              (this._sourcesContents = null));
    }),
    (I.prototype.applySourceMap = function (e, t, n) {
      var r = t;
      if (null == t) {
        if (null == e.file)
          throw new Error(
            'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map\'s "file" property. Both were omitted.'
          );
        r = e.file;
      }
      var o = this._sourceRoot;
      null != o && (r = L.relative(o, r));
      var i = new G(),
        s = new G();
      this._mappings.unsortedForEach(function (t) {
        if (t.source === r && null != t.originalLine) {
          var a = e.originalPositionFor({
            line: t.originalLine,
            column: t.originalColumn,
          });
          null != a.source &&
            ((t.source = a.source),
            null != n && (t.source = L.join(n, t.source)),
            null != o && (t.source = L.relative(o, t.source)),
            (t.originalLine = a.line),
            (t.originalColumn = a.column),
            null != a.name && (t.name = a.name));
        }
        var u = t.source;
        null == u || i.has(u) || i.add(u);
        var l = t.name;
        null == l || s.has(l) || s.add(l);
      }, this),
        (this._sources = i),
        (this._names = s),
        e.sources.forEach(function (t) {
          var r = e.sourceContentFor(t);
          null != r &&
            (null != n && (t = L.join(n, t)),
            null != o && (t = L.relative(o, t)),
            this.setSourceContent(t, r));
        }, this);
    }),
    (I.prototype._validateMapping = function (e, t, n, r) {
      if (t && "number" != typeof t.line && "number" != typeof t.column)
        throw new Error(
          "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values."
        );
      if (
        (!(e && "line" in e && "column" in e && e.line > 0 && e.column >= 0) ||
          t ||
          n ||
          r) &&
        !(
          e &&
          "line" in e &&
          "column" in e &&
          t &&
          "line" in t &&
          "column" in t &&
          e.line > 0 &&
          e.column >= 0 &&
          t.line > 0 &&
          t.column >= 0 &&
          n
        )
      )
        throw new Error(
          "Invalid mapping: " +
            JSON.stringify({ generated: e, source: n, original: t, name: r })
        );
    }),
    (I.prototype._serializeMappings = function () {
      for (
        var e,
          t,
          n,
          r,
          o = 0,
          i = 1,
          s = 0,
          a = 0,
          u = 0,
          l = 0,
          c = "",
          p = this._mappings.toArray(),
          h = 0,
          f = p.length;
        h < f;
        h++
      ) {
        if (((e = ""), (t = p[h]).generatedLine !== i))
          for (o = 0; t.generatedLine !== i; ) (e += ";"), i++;
        else if (h > 0) {
          if (!L.compareByGeneratedPositionsInflated(t, p[h - 1])) continue;
          e += ",";
        }
        (e += M(t.generatedColumn - o)),
          (o = t.generatedColumn),
          null != t.source &&
            ((r = this._sources.indexOf(t.source)),
            (e += M(r - l)),
            (l = r),
            (e += M(t.originalLine - 1 - a)),
            (a = t.originalLine - 1),
            (e += M(t.originalColumn - s)),
            (s = t.originalColumn),
            null != t.name &&
              ((n = this._names.indexOf(t.name)), (e += M(n - u)), (u = n))),
          (c += e);
      }
      return c;
    }),
    (I.prototype._generateSourcesContent = function (e, t) {
      return e.map(function (e) {
        if (!this._sourcesContents) return null;
        null != t && (e = L.relative(t, e));
        var n = L.toSetString(e);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents, n)
          ? this._sourcesContents[n]
          : null;
      }, this);
    }),
    (I.prototype.toJSON = function () {
      var e = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings(),
      };
      return (
        null != this._file && (e.file = this._file),
        null != this._sourceRoot && (e.sourceRoot = this._sourceRoot),
        this._sourcesContents &&
          (e.sourcesContent = this._generateSourcesContent(
            e.sources,
            e.sourceRoot
          )),
        e
      );
    }),
    (I.prototype.toString = function () {
      return JSON.stringify(this.toJSON());
    });
  var U = { SourceMapGenerator: I },
    T = m(function (e, t) {
      function n(e, r, o, i, s, a) {
        var u = Math.floor((r - e) / 2) + e,
          l = s(o, i[u], !0);
        return 0 === l
          ? u
          : l > 0
          ? r - u > 1
            ? n(u, r, o, i, s, a)
            : a == t.LEAST_UPPER_BOUND
            ? r < i.length
              ? r
              : -1
            : u
          : u - e > 1
          ? n(e, u, o, i, s, a)
          : a == t.LEAST_UPPER_BOUND
          ? u
          : e < 0
          ? -1
          : e;
      }
      (t.GREATEST_LOWER_BOUND = 1),
        (t.LEAST_UPPER_BOUND = 2),
        (t.search = function (e, r, o, i) {
          if (0 === r.length) return -1;
          var s = n(-1, r.length, e, r, o, i || t.GREATEST_LOWER_BOUND);
          if (s < 0) return -1;
          for (; s - 1 >= 0 && 0 === o(r[s], r[s - 1], !0); ) --s;
          return s;
        });
    });
  function k(e, t, n) {
    var r = e[t];
    (e[t] = e[n]), (e[n] = r);
  }
  function F(e, t, n, r) {
    if (n < r) {
      var o = n - 1;
      k(e, ((u = n), (l = r), Math.round(u + Math.random() * (l - u))), r);
      for (var i = e[r], s = n; s < r; s++)
        t(e[s], i) <= 0 && k(e, (o += 1), s);
      k(e, o + 1, s);
      var a = o + 1;
      F(e, t, n, a - 1), F(e, t, a + 1, r);
    }
    var u, l;
  }
  var $ = N.ArraySet,
    D = function (e, t) {
      F(e, t, 0, e.length - 1);
    };
  function B(e, t) {
    var n = e;
    return (
      "string" == typeof e && (n = L.parseSourceMapInput(e)),
      null != n.sections ? new W(n, t) : new q(n, t)
    );
  }
  (B.fromSourceMap = function (e, t) {
    return q.fromSourceMap(e, t);
  }),
    (B.prototype._version = 3),
    (B.prototype.__generatedMappings = null),
    Object.defineProperty(B.prototype, "_generatedMappings", {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return (
          this.__generatedMappings ||
            this._parseMappings(this._mappings, this.sourceRoot),
          this.__generatedMappings
        );
      },
    }),
    (B.prototype.__originalMappings = null),
    Object.defineProperty(B.prototype, "_originalMappings", {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return (
          this.__originalMappings ||
            this._parseMappings(this._mappings, this.sourceRoot),
          this.__originalMappings
        );
      },
    }),
    (B.prototype._charIsMappingSeparator = function (e, t) {
      var n = e.charAt(t);
      return ";" === n || "," === n;
    }),
    (B.prototype._parseMappings = function (e, t) {
      throw new Error("Subclasses must implement _parseMappings");
    }),
    (B.GENERATED_ORDER = 1),
    (B.ORIGINAL_ORDER = 2),
    (B.GREATEST_LOWER_BOUND = 1),
    (B.LEAST_UPPER_BOUND = 2),
    (B.prototype.eachMapping = function (e, t, n) {
      var r,
        o = t || null;
      switch (n || B.GENERATED_ORDER) {
        case B.GENERATED_ORDER:
          r = this._generatedMappings;
          break;
        case B.ORIGINAL_ORDER:
          r = this._originalMappings;
          break;
        default:
          throw new Error("Unknown order of iteration.");
      }
      var i = this.sourceRoot;
      r.map(function (e) {
        var t = null === e.source ? null : this._sources.at(e.source);
        return {
          source: (t = L.computeSourceURL(i, t, this._sourceMapURL)),
          generatedLine: e.generatedLine,
          generatedColumn: e.generatedColumn,
          originalLine: e.originalLine,
          originalColumn: e.originalColumn,
          name: null === e.name ? null : this._names.at(e.name),
        };
      }, this).forEach(e, o);
    }),
    (B.prototype.allGeneratedPositionsFor = function (e) {
      var t = L.getArg(e, "line"),
        n = {
          source: L.getArg(e, "source"),
          originalLine: t,
          originalColumn: L.getArg(e, "column", 0),
        };
      if (((n.source = this._findSourceIndex(n.source)), n.source < 0))
        return [];
      var r = [],
        o = this._findMapping(
          n,
          this._originalMappings,
          "originalLine",
          "originalColumn",
          L.compareByOriginalPositions,
          T.LEAST_UPPER_BOUND
        );
      if (o >= 0) {
        var i = this._originalMappings[o];
        if (void 0 === e.column)
          for (var s = i.originalLine; i && i.originalLine === s; )
            r.push({
              line: L.getArg(i, "generatedLine", null),
              column: L.getArg(i, "generatedColumn", null),
              lastColumn: L.getArg(i, "lastGeneratedColumn", null),
            }),
              (i = this._originalMappings[++o]);
        else
          for (
            var a = i.originalColumn;
            i && i.originalLine === t && i.originalColumn == a;

          )
            r.push({
              line: L.getArg(i, "generatedLine", null),
              column: L.getArg(i, "generatedColumn", null),
              lastColumn: L.getArg(i, "lastGeneratedColumn", null),
            }),
              (i = this._originalMappings[++o]);
      }
      return r;
    });
  var V = B;
  function q(e, t) {
    var n = e;
    "string" == typeof e && (n = L.parseSourceMapInput(e));
    var r = L.getArg(n, "version"),
      o = L.getArg(n, "sources"),
      i = L.getArg(n, "names", []),
      s = L.getArg(n, "sourceRoot", null),
      a = L.getArg(n, "sourcesContent", null),
      u = L.getArg(n, "mappings"),
      l = L.getArg(n, "file", null);
    if (r != this._version) throw new Error("Unsupported version: " + r);
    s && (s = L.normalize(s)),
      (o = o
        .map(String)
        .map(L.normalize)
        .map(function (e) {
          return s && L.isAbsolute(s) && L.isAbsolute(e) ? L.relative(s, e) : e;
        })),
      (this._names = $.fromArray(i.map(String), !0)),
      (this._sources = $.fromArray(o, !0)),
      (this._absoluteSources = this._sources.toArray().map(function (e) {
        return L.computeSourceURL(s, e, t);
      })),
      (this.sourceRoot = s),
      (this.sourcesContent = a),
      (this._mappings = u),
      (this._sourceMapURL = t),
      (this.file = l);
  }
  function z() {
    (this.generatedLine = 0),
      (this.generatedColumn = 0),
      (this.source = null),
      (this.originalLine = null),
      (this.originalColumn = null),
      (this.name = null);
  }
  (q.prototype = Object.create(B.prototype)),
    (q.prototype.consumer = B),
    (q.prototype._findSourceIndex = function (e) {
      var t,
        n = e;
      if (
        (null != this.sourceRoot && (n = L.relative(this.sourceRoot, n)),
        this._sources.has(n))
      )
        return this._sources.indexOf(n);
      for (t = 0; t < this._absoluteSources.length; ++t)
        if (this._absoluteSources[t] == e) return t;
      return -1;
    }),
    (q.fromSourceMap = function (e, t) {
      var n = Object.create(q.prototype),
        r = (n._names = $.fromArray(e._names.toArray(), !0)),
        o = (n._sources = $.fromArray(e._sources.toArray(), !0));
      (n.sourceRoot = e._sourceRoot),
        (n.sourcesContent = e._generateSourcesContent(
          n._sources.toArray(),
          n.sourceRoot
        )),
        (n.file = e._file),
        (n._sourceMapURL = t),
        (n._absoluteSources = n._sources.toArray().map(function (e) {
          return L.computeSourceURL(n.sourceRoot, e, t);
        }));
      for (
        var i = e._mappings.toArray().slice(),
          s = (n.__generatedMappings = []),
          a = (n.__originalMappings = []),
          u = 0,
          l = i.length;
        u < l;
        u++
      ) {
        var c = i[u],
          p = new z();
        (p.generatedLine = c.generatedLine),
          (p.generatedColumn = c.generatedColumn),
          c.source &&
            ((p.source = o.indexOf(c.source)),
            (p.originalLine = c.originalLine),
            (p.originalColumn = c.originalColumn),
            c.name && (p.name = r.indexOf(c.name)),
            a.push(p)),
          s.push(p);
      }
      return D(n.__originalMappings, L.compareByOriginalPositions), n;
    }),
    (q.prototype._version = 3),
    Object.defineProperty(q.prototype, "sources", {
      get: function () {
        return this._absoluteSources.slice();
      },
    }),
    (q.prototype._parseMappings = function (e, t) {
      for (
        var n,
          r,
          o,
          i,
          s,
          a = 1,
          u = 0,
          l = 0,
          c = 0,
          p = 0,
          h = 0,
          f = e.length,
          g = 0,
          m = {},
          d = {},
          y = [],
          v = [];
        g < f;

      )
        if (";" === e.charAt(g)) a++, g++, (u = 0);
        else if ("," === e.charAt(g)) g++;
        else {
          for (
            (n = new z()).generatedLine = a, i = g;
            i < f && !this._charIsMappingSeparator(e, i);
            i++
          );
          if ((o = m[(r = e.slice(g, i))])) g += r.length;
          else {
            for (o = []; g < i; )
              O(e, g, d), (s = d.value), (g = d.rest), o.push(s);
            if (2 === o.length)
              throw new Error("Found a source, but no line and column");
            if (3 === o.length)
              throw new Error("Found a source and line, but no column");
            m[r] = o;
          }
          (n.generatedColumn = u + o[0]),
            (u = n.generatedColumn),
            o.length > 1 &&
              ((n.source = p + o[1]),
              (p += o[1]),
              (n.originalLine = l + o[2]),
              (l = n.originalLine),
              (n.originalLine += 1),
              (n.originalColumn = c + o[3]),
              (c = n.originalColumn),
              o.length > 4 && ((n.name = h + o[4]), (h += o[4]))),
            v.push(n),
            "number" == typeof n.originalLine && y.push(n);
        }
      D(v, L.compareByGeneratedPositionsDeflated),
        (this.__generatedMappings = v),
        D(y, L.compareByOriginalPositions),
        (this.__originalMappings = y);
    }),
    (q.prototype._findMapping = function (e, t, n, r, o, i) {
      if (e[n] <= 0)
        throw new TypeError(
          "Line must be greater than or equal to 1, got " + e[n]
        );
      if (e[r] < 0)
        throw new TypeError(
          "Column must be greater than or equal to 0, got " + e[r]
        );
      return T.search(e, t, o, i);
    }),
    (q.prototype.computeColumnSpans = function () {
      for (var e = 0; e < this._generatedMappings.length; ++e) {
        var t = this._generatedMappings[e];
        if (e + 1 < this._generatedMappings.length) {
          var n = this._generatedMappings[e + 1];
          if (t.generatedLine === n.generatedLine) {
            t.lastGeneratedColumn = n.generatedColumn - 1;
            continue;
          }
        }
        t.lastGeneratedColumn = 1 / 0;
      }
    }),
    (q.prototype.originalPositionFor = function (e) {
      var t = {
          generatedLine: L.getArg(e, "line"),
          generatedColumn: L.getArg(e, "column"),
        },
        n = this._findMapping(
          t,
          this._generatedMappings,
          "generatedLine",
          "generatedColumn",
          L.compareByGeneratedPositionsDeflated,
          L.getArg(e, "bias", B.GREATEST_LOWER_BOUND)
        );
      if (n >= 0) {
        var r = this._generatedMappings[n];
        if (r.generatedLine === t.generatedLine) {
          var o = L.getArg(r, "source", null);
          null !== o &&
            ((o = this._sources.at(o)),
            (o = L.computeSourceURL(this.sourceRoot, o, this._sourceMapURL)));
          var i = L.getArg(r, "name", null);
          return (
            null !== i && (i = this._names.at(i)),
            {
              source: o,
              line: L.getArg(r, "originalLine", null),
              column: L.getArg(r, "originalColumn", null),
              name: i,
            }
          );
        }
      }
      return { source: null, line: null, column: null, name: null };
    }),
    (q.prototype.hasContentsOfAllSources = function () {
      return (
        !!this.sourcesContent &&
        this.sourcesContent.length >= this._sources.size() &&
        !this.sourcesContent.some(function (e) {
          return null == e;
        })
      );
    }),
    (q.prototype.sourceContentFor = function (e, t) {
      if (!this.sourcesContent) return null;
      var n = this._findSourceIndex(e);
      if (n >= 0) return this.sourcesContent[n];
      var r,
        o = e;
      if (
        (null != this.sourceRoot && (o = L.relative(this.sourceRoot, o)),
        null != this.sourceRoot && (r = L.urlParse(this.sourceRoot)))
      ) {
        var i = o.replace(/^file:\/\//, "");
        if ("file" == r.scheme && this._sources.has(i))
          return this.sourcesContent[this._sources.indexOf(i)];
        if ((!r.path || "/" == r.path) && this._sources.has("/" + o))
          return this.sourcesContent[this._sources.indexOf("/" + o)];
      }
      if (t) return null;
      throw new Error('"' + o + '" is not in the SourceMap.');
    }),
    (q.prototype.generatedPositionFor = function (e) {
      var t = L.getArg(e, "source");
      if ((t = this._findSourceIndex(t)) < 0)
        return { line: null, column: null, lastColumn: null };
      var n = {
          source: t,
          originalLine: L.getArg(e, "line"),
          originalColumn: L.getArg(e, "column"),
        },
        r = this._findMapping(
          n,
          this._originalMappings,
          "originalLine",
          "originalColumn",
          L.compareByOriginalPositions,
          L.getArg(e, "bias", B.GREATEST_LOWER_BOUND)
        );
      if (r >= 0) {
        var o = this._originalMappings[r];
        if (o.source === n.source)
          return {
            line: L.getArg(o, "generatedLine", null),
            column: L.getArg(o, "generatedColumn", null),
            lastColumn: L.getArg(o, "lastGeneratedColumn", null),
          };
      }
      return { line: null, column: null, lastColumn: null };
    });
  var J = q;
  function W(e, t) {
    var n = e;
    "string" == typeof e && (n = L.parseSourceMapInput(e));
    var r = L.getArg(n, "version"),
      o = L.getArg(n, "sections");
    if (r != this._version) throw new Error("Unsupported version: " + r);
    (this._sources = new $()), (this._names = new $());
    var i = { line: -1, column: 0 };
    this._sections = o.map(function (e) {
      if (e.url)
        throw new Error("Support for url field in sections not implemented.");
      var n = L.getArg(e, "offset"),
        r = L.getArg(n, "line"),
        o = L.getArg(n, "column");
      if (r < i.line || (r === i.line && o < i.column))
        throw new Error("Section offsets must be ordered and non-overlapping.");
      return (
        (i = n),
        {
          generatedOffset: { generatedLine: r + 1, generatedColumn: o + 1 },
          consumer: new B(L.getArg(e, "map"), t),
        }
      );
    });
  }
  (W.prototype = Object.create(B.prototype)),
    (W.prototype.constructor = B),
    (W.prototype._version = 3),
    Object.defineProperty(W.prototype, "sources", {
      get: function () {
        for (var e = [], t = 0; t < this._sections.length; t++)
          for (var n = 0; n < this._sections[t].consumer.sources.length; n++)
            e.push(this._sections[t].consumer.sources[n]);
        return e;
      },
    }),
    (W.prototype.originalPositionFor = function (e) {
      var t = {
          generatedLine: L.getArg(e, "line"),
          generatedColumn: L.getArg(e, "column"),
        },
        n = T.search(t, this._sections, function (e, t) {
          var n = e.generatedLine - t.generatedOffset.generatedLine;
          return n || e.generatedColumn - t.generatedOffset.generatedColumn;
        }),
        r = this._sections[n];
      return r
        ? r.consumer.originalPositionFor({
            line: t.generatedLine - (r.generatedOffset.generatedLine - 1),
            column:
              t.generatedColumn -
              (r.generatedOffset.generatedLine === t.generatedLine
                ? r.generatedOffset.generatedColumn - 1
                : 0),
            bias: e.bias,
          })
        : { source: null, line: null, column: null, name: null };
    }),
    (W.prototype.hasContentsOfAllSources = function () {
      return this._sections.every(function (e) {
        return e.consumer.hasContentsOfAllSources();
      });
    }),
    (W.prototype.sourceContentFor = function (e, t) {
      for (var n = 0; n < this._sections.length; n++) {
        var r = this._sections[n].consumer.sourceContentFor(e, !0);
        if (r) return r;
      }
      if (t) return null;
      throw new Error('"' + e + '" is not in the SourceMap.');
    }),
    (W.prototype.generatedPositionFor = function (e) {
      for (var t = 0; t < this._sections.length; t++) {
        var n = this._sections[t];
        if (-1 !== n.consumer._findSourceIndex(L.getArg(e, "source"))) {
          var r = n.consumer.generatedPositionFor(e);
          if (r)
            return {
              line: r.line + (n.generatedOffset.generatedLine - 1),
              column:
                r.column +
                (n.generatedOffset.generatedLine === r.line
                  ? n.generatedOffset.generatedColumn - 1
                  : 0),
            };
        }
      }
      return { line: null, column: null };
    }),
    (W.prototype._parseMappings = function (e, t) {
      (this.__generatedMappings = []), (this.__originalMappings = []);
      for (var n = 0; n < this._sections.length; n++)
        for (
          var r = this._sections[n], o = r.consumer._generatedMappings, i = 0;
          i < o.length;
          i++
        ) {
          var s = o[i],
            a = r.consumer._sources.at(s.source);
          (a = L.computeSourceURL(
            r.consumer.sourceRoot,
            a,
            this._sourceMapURL
          )),
            this._sources.add(a),
            (a = this._sources.indexOf(a));
          var u = null;
          s.name &&
            ((u = r.consumer._names.at(s.name)),
            this._names.add(u),
            (u = this._names.indexOf(u)));
          var l = {
            source: a,
            generatedLine:
              s.generatedLine + (r.generatedOffset.generatedLine - 1),
            generatedColumn:
              s.generatedColumn +
              (r.generatedOffset.generatedLine === s.generatedLine
                ? r.generatedOffset.generatedColumn - 1
                : 0),
            originalLine: s.originalLine,
            originalColumn: s.originalColumn,
            name: u,
          };
          this.__generatedMappings.push(l),
            "number" == typeof l.originalLine &&
              this.__originalMappings.push(l);
        }
      D(this.__generatedMappings, L.compareByGeneratedPositionsDeflated),
        D(this.__originalMappings, L.compareByOriginalPositions);
    });
  var Y = {
      SourceMapConsumer: V,
      BasicSourceMapConsumer: J,
      IndexedSourceMapConsumer: W,
    },
    K = U.SourceMapGenerator,
    Q = /(\r?\n)/,
    H = "$$$isSourceNode$$$";
  function X(e, t, n, r, o) {
    (this.children = []),
      (this.sourceContents = {}),
      (this.line = null == e ? null : e),
      (this.column = null == t ? null : t),
      (this.source = null == n ? null : n),
      (this.name = null == o ? null : o),
      (this[H] = !0),
      null != r && this.add(r);
  }
  (X.fromStringWithSourceMap = function (e, t, n) {
    var r = new X(),
      o = e.split(Q),
      i = 0,
      s = function () {
        return e() + (e() || "");
        function e() {
          return i < o.length ? o[i++] : void 0;
        }
      },
      a = 1,
      u = 0,
      l = null;
    return (
      t.eachMapping(function (e) {
        if (null !== l) {
          if (!(a < e.generatedLine)) {
            var t = (n = o[i] || "").substr(0, e.generatedColumn - u);
            return (
              (o[i] = n.substr(e.generatedColumn - u)),
              (u = e.generatedColumn),
              c(l, t),
              void (l = e)
            );
          }
          c(l, s()), a++, (u = 0);
        }
        for (; a < e.generatedLine; ) r.add(s()), a++;
        if (u < e.generatedColumn) {
          var n = o[i] || "";
          r.add(n.substr(0, e.generatedColumn)),
            (o[i] = n.substr(e.generatedColumn)),
            (u = e.generatedColumn);
        }
        l = e;
      }, this),
      i < o.length && (l && c(l, s()), r.add(o.splice(i).join(""))),
      t.sources.forEach(function (e) {
        var o = t.sourceContentFor(e);
        null != o &&
          (null != n && (e = L.join(n, e)), r.setSourceContent(e, o));
      }),
      r
    );
    function c(e, t) {
      if (null === e || void 0 === e.source) r.add(t);
      else {
        var o = n ? L.join(n, e.source) : e.source;
        r.add(new X(e.originalLine, e.originalColumn, o, t, e.name));
      }
    }
  }),
    (X.prototype.add = function (e) {
      if (Array.isArray(e))
        e.forEach(function (e) {
          this.add(e);
        }, this);
      else {
        if (!e[H] && "string" != typeof e)
          throw new TypeError(
            "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " +
              e
          );
        e && this.children.push(e);
      }
      return this;
    }),
    (X.prototype.prepend = function (e) {
      if (Array.isArray(e))
        for (var t = e.length - 1; t >= 0; t--) this.prepend(e[t]);
      else {
        if (!e[H] && "string" != typeof e)
          throw new TypeError(
            "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " +
              e
          );
        this.children.unshift(e);
      }
      return this;
    }),
    (X.prototype.walk = function (e) {
      for (var t, n = 0, r = this.children.length; n < r; n++)
        (t = this.children[n])[H]
          ? t.walk(e)
          : "" !== t &&
            e(t, {
              source: this.source,
              line: this.line,
              column: this.column,
              name: this.name,
            });
    }),
    (X.prototype.join = function (e) {
      var t,
        n,
        r = this.children.length;
      if (r > 0) {
        for (t = [], n = 0; n < r - 1; n++) t.push(this.children[n]), t.push(e);
        t.push(this.children[n]), (this.children = t);
      }
      return this;
    }),
    (X.prototype.replaceRight = function (e, t) {
      var n = this.children[this.children.length - 1];
      return (
        n[H]
          ? n.replaceRight(e, t)
          : "string" == typeof n
          ? (this.children[this.children.length - 1] = n.replace(e, t))
          : this.children.push("".replace(e, t)),
        this
      );
    }),
    (X.prototype.setSourceContent = function (e, t) {
      this.sourceContents[L.toSetString(e)] = t;
    }),
    (X.prototype.walkSourceContents = function (e) {
      for (var t = 0, n = this.children.length; t < n; t++)
        this.children[t][H] && this.children[t].walkSourceContents(e);
      var r = Object.keys(this.sourceContents);
      for (t = 0, n = r.length; t < n; t++)
        e(L.fromSetString(r[t]), this.sourceContents[r[t]]);
    }),
    (X.prototype.toString = function () {
      var e = "";
      return (
        this.walk(function (t) {
          e += t;
        }),
        e
      );
    }),
    (X.prototype.toStringWithSourceMap = function (e) {
      var t = { code: "", line: 1, column: 0 },
        n = new K(e),
        r = !1,
        o = null,
        i = null,
        s = null,
        a = null;
      return (
        this.walk(function (e, u) {
          (t.code += e),
            null !== u.source && null !== u.line && null !== u.column
              ? ((o === u.source &&
                  i === u.line &&
                  s === u.column &&
                  a === u.name) ||
                  n.addMapping({
                    source: u.source,
                    original: { line: u.line, column: u.column },
                    generated: { line: t.line, column: t.column },
                    name: u.name,
                  }),
                (o = u.source),
                (i = u.line),
                (s = u.column),
                (a = u.name),
                (r = !0))
              : r &&
                (n.addMapping({
                  generated: { line: t.line, column: t.column },
                }),
                (o = null),
                (r = !1));
          for (var l = 0, c = e.length; l < c; l++)
            10 === e.charCodeAt(l)
              ? (t.line++,
                (t.column = 0),
                l + 1 === c
                  ? ((o = null), (r = !1))
                  : r &&
                    n.addMapping({
                      source: u.source,
                      original: { line: u.line, column: u.column },
                      generated: { line: t.line, column: t.column },
                      name: u.name,
                    }))
              : t.column++;
        }),
        this.walkSourceContents(function (e, t) {
          n.setSourceContent(e, t);
        }),
        { code: t.code, map: n }
      );
    });
  var Z = {
    SourceMapGenerator: U.SourceMapGenerator,
    SourceMapConsumer: Y.SourceMapConsumer,
    SourceNode: { SourceNode: X }.SourceNode,
  };
  function ee(e) {
    return Buffer.from(e, "base64").toString("binary");
  }
  var te = (ee.atob = ee),
    ne = "%[a-f0-9]{2}",
    re = new RegExp(ne, "gi"),
    oe = new RegExp("(" + ne + ")+", "gi");
  function ie(e, t) {
    try {
      return decodeURIComponent(e.join(""));
    } catch (e) {}
    if (1 === e.length) return e;
    t = t || 1;
    var n = e.slice(0, t),
      r = e.slice(t);
    return Array.prototype.concat.call([], ie(n), ie(r));
  }
  function se(e) {
    try {
      return decodeURIComponent(e);
    } catch (r) {
      for (var t = e.match(re), n = 1; n < t.length; n++)
        t = (e = ie(t, n).join("")).match(re);
      return e;
    }
  }
  var ae = function (e) {
    if ("string" != typeof e)
      throw new TypeError(
        "Expected `encodedURI` to be of type `string`, got `" + typeof e + "`"
      );
    try {
      return (e = e.replace(/\+/g, " ")), decodeURIComponent(e);
    } catch (t) {
      return (function (e) {
        for (var t = { "%FE%FF": "��", "%FF%FE": "��" }, n = oe.exec(e); n; ) {
          try {
            t[n[0]] = decodeURIComponent(n[0]);
          } catch (e) {
            var r = se(n[0]);
            r !== n[0] && (t[n[0]] = r);
          }
          n = oe.exec(e);
        }
        t["%C2"] = "�";
        for (var o = Object.keys(t), i = 0; i < o.length; i++) {
          var s = o[i];
          e = e.replace(new RegExp(s, "g"), t[s]);
        }
        return e;
      })(e);
    }
  };
  function ue() {
    return Array.prototype.reduce.call(arguments, function (e, t) {
      return u.default.resolve(e, t);
    });
  }
  function le(e) {
    return "\\" === l.default.sep
      ? e.replace(/\\/g, "/").replace(/^[a-z]:\/?/i, "/")
      : e;
  }
  function ce(e) {
    return ae(e.replace(/\+/g, "%2B"));
  }
  function pe(e, t, n) {
    setImmediate(function () {
      e(t, n);
    });
  }
  function he(e, t) {
    try {
      return JSON.parse(e.replace(/^\)\]\}'/, ""));
    } catch (e) {
      throw ((e.sourceMapData = t), e);
    }
  }
  function fe(e, t, n) {
    var r = ce(t);
    try {
      return String(e(r));
    } catch (e) {
      throw ((e.sourceMapData = n), e);
    }
  }
  var ge = /[#@] sourceMappingURL=([^\s'"]*)/,
    me = RegExp(
      "(?:/\\*(?:\\s*\r?\n(?://)?)?(?:" +
        ge.source +
        ")\\s*\\*/|//(?:" +
        ge.source +
        "))\\s*"
    );
  function de(e, t, n, r) {
    var o;
    try {
      o = Se(e, t);
    } catch (e) {
      return pe(r, e);
    }
    if (!o || o.map) return pe(r, null, o);
    n(ce(o.url), function (e, t) {
      if (e) return (e.sourceMapData = o), r(e);
      o.map = String(t);
      try {
        o.map = he(o.map, o);
      } catch (e) {
        return r(e);
      }
      r(null, o);
    });
  }
  function ye(e, t, n) {
    var r = Se(e, t);
    return (
      !r || r.map || ((r.map = fe(n, r.url, r)), (r.map = he(r.map, r))), r
    );
  }
  var ve = /^data:([^,;]*)(;[^,;]*)*(?:,(.*))?$/,
    _e = /^(?:application|text)\/json$/;
  function Ce(e) {
    if ("undefined" == typeof TextDecoder || "undefined" == typeof Uint8Array)
      return te(e);
    var t = (function (e) {
      for (
        var t = te(e), n = t.length, r = new Uint8Array(n), o = 0;
        o < n;
        o++
      )
        r[o] = t.charCodeAt(o);
      return r;
    })(e);
    return new TextDecoder("utf-8", { fatal: !0 }).decode(t);
  }
  function Se(e, t) {
    t = le(t);
    var n = (function (e) {
      var t = e.match(me);
      return t ? t[1] || t[2] || "" : null;
    })(e);
    if (!n) return null;
    var r = n.match(ve);
    if (r) {
      var o = r[1] || "text/plain",
        i = r[2] || "",
        s = r[3] || "",
        a = { sourceMappingURL: n, url: null, sourcesRelativeTo: t, map: s };
      if (!_e.test(o)) {
        var u = new Error("Unuseful data uri mime type: " + o);
        throw ((u.sourceMapData = a), u);
      }
      try {
        a.map = he(";base64" === i ? Ce(s) : decodeURIComponent(s), a);
      } catch (u) {
        throw ((u.sourceMapData = a), u);
      }
      return a;
    }
    var l = ue(t, n);
    return { sourceMappingURL: n, url: l, sourcesRelativeTo: l, map: null };
  }
  function we(e, t, n, r, o) {
    "function" == typeof r && ((o = r), (r = {}));
    var i = e.sources ? e.sources.length : 0,
      s = { sourcesResolved: [], sourcesContent: [] };
    if (0 !== i) {
      var a = function () {
        0 === --i && o(null, s);
      };
      Me(e, t, r, function (e, t, r) {
        if (((s.sourcesResolved[r] = e), "string" == typeof t))
          (s.sourcesContent[r] = t), pe(a, null);
        else {
          var o = ce(e);
          n(o, function (e, t) {
            (s.sourcesContent[r] = e || String(t)), a();
          });
        }
      });
    } else pe(o, null, s);
  }
  function Ae(e, t, n, r) {
    var o = { sourcesResolved: [], sourcesContent: [] };
    return e.sources && 0 !== e.sources.length
      ? (Me(e, t, r, function (e, t, r) {
          if (((o.sourcesResolved[r] = e), null !== n))
            if ("string" == typeof t) o.sourcesContent[r] = t;
            else {
              var i = ce(e);
              try {
                o.sourcesContent[r] = String(n(i));
              } catch (e) {
                o.sourcesContent[r] = e;
              }
            }
        }),
        o)
      : o;
  }
  var Re = /\/?$/;
  function Me(e, t, n, r) {
    var o;
    (n = n || {}), (t = le(t));
    for (var i = 0, s = e.sources.length; i < s; i++)
      (o = null),
        "string" == typeof n.sourceRoot
          ? (o = n.sourceRoot)
          : "string" == typeof e.sourceRoot &&
            !1 !== n.sourceRoot &&
            (o = e.sourceRoot),
        r(
          null === o || "" === o
            ? ue(t, e.sources[i])
            : ue(t, o.replace(Re, "/"), e.sources[i]),
          (e.sourcesContent || [])[i],
          i
        );
  }
  var Oe = {
      resolveSourceMap: de,
      resolveSourceMapSync: ye,
      resolveSources: we,
      resolveSourcesSync: Ae,
      resolve: function (e, t, n, r, o) {
        if (("function" == typeof r && ((o = r), (r = {})), null === e)) {
          var i = {
              sourceMappingURL: null,
              url: t,
              sourcesRelativeTo: t,
              map: null,
            },
            s = ce(t);
          n(s, function (e, t) {
            if (e) return (e.sourceMapData = i), o(e);
            i.map = String(t);
            try {
              i.map = he(i.map, i);
            } catch (e) {
              return o(e);
            }
            a(i);
          });
        } else
          de(e, t, n, function (e, t) {
            return e ? o(e) : t ? void a(t) : o(null, null);
          });
        function a(e) {
          we(e.map, e.sourcesRelativeTo, n, r, function (t, n) {
            if (t) return o(t);
            (e.sourcesResolved = n.sourcesResolved),
              (e.sourcesContent = n.sourcesContent),
              o(null, e);
          });
        }
      },
      resolveSync: function (e, t, n, r) {
        var o;
        if (null === e) {
          ((o = {
            sourceMappingURL: null,
            url: t,
            sourcesRelativeTo: t,
            map: null,
          }).map = fe(n, t, o)),
            (o.map = he(o.map, o));
        } else if (!(o = ye(e, t, n))) return null;
        var i = Ae(o.map, o.sourcesRelativeTo, n, r);
        return (
          (o.sourcesResolved = i.sourcesResolved),
          (o.sourcesContent = i.sourcesContent),
          o
        );
      },
      parseMapToJSON: he,
    },
    Le = m(function (e, t) {
      var n = Z.SourceMapGenerator,
        r = Z.SourceMapConsumer;
      e.exports = function (e) {
        for (var r in ((e._comment = e.comment),
        (e.map = new n()),
        (e.position = { line: 1, column: 1 }),
        (e.files = {}),
        t))
          e[r] = t[r];
      };
      const o = function (e) {
        return "\\" === l.default.sep
          ? e.replace(/\\/g, "/").replace(/^[a-z]:\/?/i, "/")
          : e;
      };
      (t.updatePosition = function (e) {
        var t = e.match(/\n/g);
        t && (this.position.line += t.length);
        var n = e.lastIndexOf("\n");
        this.position.column = ~n
          ? e.length - n
          : this.position.column + e.length;
      }),
        (t.emit = function (e, t) {
          if (t) {
            var n = o(t.source || "source.css");
            this.map.addMapping({
              source: n,
              generated: {
                line: this.position.line,
                column: Math.max(this.position.column - 1, 0),
              },
              original: { line: t.start.line, column: t.start.column - 1 },
            }),
              this.addFile(n, t);
          }
          return this.updatePosition(e), e;
        }),
        (t.addFile = function (e, t) {
          "string" == typeof t.content &&
            (Object.prototype.hasOwnProperty.call(this.files, e) ||
              (this.files[e] = t.content));
        }),
        (t.applySourceMaps = function () {
          Object.keys(this.files).forEach(function (e) {
            var t = this.files[e];
            if (
              (this.map.setSourceContent(e, t),
              !1 !== this.options.inputSourcemaps)
            ) {
              var n = Oe.resolveSync(t, e, s.default.readFileSync);
              if (n) {
                var i = new r(n.map),
                  a = n.sourcesRelativeTo;
                this.map.applySourceMap(i, e, o(l.default.dirname(a)));
              }
            }
          }, this);
        }),
        (t.comment = function (e) {
          return /^# sourceMappingURL=/.test(e.comment)
            ? this.emit("", e.position)
            : this._comment(e);
        });
    }),
    Ee = function (e, t) {
      t = t || {};
      var n = 1,
        r = 1;
      function o(e) {
        var t = e.match(/\n/g);
        t && (n += t.length);
        var o = e.lastIndexOf("\n");
        r = ~o ? e.length - o : r + e.length;
      }
      function i() {
        var e = { line: n, column: r };
        return function (t) {
          return (t.position = new s(e)), d(), t;
        };
      }
      function s(e) {
        (this.start = e),
          (this.end = { line: n, column: r }),
          (this.source = t.source);
      }
      s.prototype.content = e;
      var a = [];
      function u(o) {
        var i = new Error(t.source + ":" + n + ":" + r + ": " + o);
        if (
          ((i.reason = o),
          (i.filename = t.source),
          (i.line = n),
          (i.column = r),
          (i.source = e),
          !t.silent)
        )
          throw i;
        a.push(i);
      }
      function l() {
        return m(/^{\s*/);
      }
      function f() {
        return m(/^}/);
      }
      function g() {
        var t,
          n = [];
        for (d(), y(n); e.length && "}" != e.charAt(0) && (t = E() || b()); )
          !1 !== t && (n.push(t), y(n));
        return n;
      }
      function m(t) {
        var n = t.exec(e);
        if (n) {
          var r = n[0];
          return o(r), (e = e.slice(r.length)), n;
        }
      }
      function d() {
        m(/^\s*/);
      }
      function y(e) {
        var t;
        for (e = e || []; (t = v()); ) !1 !== t && e.push(t);
        return e;
      }
      function v() {
        var t = i();
        if ("/" == e.charAt(0) && "*" == e.charAt(1)) {
          for (
            var n = 2;
            "" != e.charAt(n) && ("*" != e.charAt(n) || "/" != e.charAt(n + 1));

          )
            ++n;
          if (((n += 2), "" === e.charAt(n - 1)))
            return u("End of comment missing");
          var s = e.slice(2, n - 2);
          return (
            (r += 2),
            o(s),
            (e = e.slice(n)),
            (r += 2),
            t({ type: "comment", comment: s })
          );
        }
      }
      function _() {
        var e = m(/^([^{]+)/);
        if (e)
          return p(e[0])
            .replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, "")
            .replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function (e) {
              return e.replace(/,/g, "‌");
            })
            .split(/\s*(?![^(]*\)),\s*/)
            .map(function (e) {
              return e.replace(/\u200C/g, ",");
            });
      }
      function C() {
        var e = i(),
          t = m(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
        if (t) {
          if (((t = p(t[0])), !m(/^:\s*/))) return u("property missing ':'");
          var n = m(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/),
            r = e({
              type: "declaration",
              property: t.replace(c, ""),
              value: n ? p(n[0]).replace(c, "") : "",
            });
          return m(/^[;\s]*/), r;
        }
      }
      function S() {
        var e,
          t = [];
        if (!l()) return u("missing '{'");
        for (y(t); (e = C()); ) !1 !== e && (t.push(e), y(t));
        return f() ? t : u("missing '}'");
      }
      function w() {
        for (
          var e, t = [], n = i();
          (e = m(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/));

        )
          t.push(e[1]), m(/^,\s*/);
        if (t.length)
          return n({ type: "keyframe", values: t, declarations: S() });
      }
      var A,
        R = L("import"),
        M = L("charset"),
        O = L("namespace");
      function L(e) {
        var t = new RegExp("^@" + e + "\\s*([^;]+);");
        return function () {
          var n = i(),
            r = m(t);
          if (r) {
            var o = { type: e };
            return (o[e] = r[1].trim()), n(o);
          }
        };
      }
      function E() {
        if ("@" == e[0])
          return (
            (function () {
              var e = i();
              if ((t = m(/^@([-\w]+)?keyframes\s*/))) {
                var t,
                  n = t[1];
                if (!(t = m(/^([-\w]+)\s*/)))
                  return u("@keyframes missing name");
                var r,
                  o = t[1];
                if (!l()) return u("@keyframes missing '{'");
                for (var s = y(); (r = w()); ) s.push(r), (s = s.concat(y()));
                return f()
                  ? e({ type: "keyframes", name: o, vendor: n, keyframes: s })
                  : u("@keyframes missing '}'");
              }
            })() ||
            (function () {
              var e = i(),
                t = m(/^@media *([^{]+)/);
              if (t) {
                var n = p(t[1]);
                if (!l()) return u("@media missing '{'");
                var r = y().concat(g());
                return f()
                  ? e({ type: "media", media: n, rules: r })
                  : u("@media missing '}'");
              }
            })() ||
            (function () {
              var e = i(),
                t = m(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
              if (t)
                return e({
                  type: "custom-media",
                  name: p(t[1]),
                  media: p(t[2]),
                });
            })() ||
            (function () {
              var e = i(),
                t = m(/^@supports *([^{]+)/);
              if (t) {
                var n = p(t[1]);
                if (!l()) return u("@supports missing '{'");
                var r = y().concat(g());
                return f()
                  ? e({ type: "supports", supports: n, rules: r })
                  : u("@supports missing '}'");
              }
            })() ||
            R() ||
            M() ||
            O() ||
            (function () {
              var e = i(),
                t = m(/^@([-\w]+)?document *([^{]+)/);
              if (t) {
                var n = p(t[1]),
                  r = p(t[2]);
                if (!l()) return u("@document missing '{'");
                var o = y().concat(g());
                return f()
                  ? e({ type: "document", document: r, vendor: n, rules: o })
                  : u("@document missing '}'");
              }
            })() ||
            (function () {
              var e = i();
              if (m(/^@page */)) {
                var t = _() || [];
                if (!l()) return u("@page missing '{'");
                for (var n, r = y(); (n = C()); )
                  r.push(n), (r = r.concat(y()));
                return f()
                  ? e({ type: "page", selectors: t, declarations: r })
                  : u("@page missing '}'");
              }
            })() ||
            (function () {
              var e = i();
              if (m(/^@host\s*/)) {
                if (!l()) return u("@host missing '{'");
                var t = y().concat(g());
                return f()
                  ? e({ type: "host", rules: t })
                  : u("@host missing '}'");
              }
            })() ||
            (function () {
              var e = i();
              if (m(/^@font-face\s*/)) {
                if (!l()) return u("@font-face missing '{'");
                for (var t, n = y(); (t = C()); )
                  n.push(t), (n = n.concat(y()));
                return f()
                  ? e({ type: "font-face", declarations: n })
                  : u("@font-face missing '}'");
              }
            })()
          );
      }
      function b() {
        var e = i(),
          t = _();
        return t
          ? (y(), e({ type: "rule", selectors: t, declarations: S() }))
          : u("selector missing");
      }
      return h(
        ((A = g()),
        {
          type: "stylesheet",
          stylesheet: { source: t.source, rules: A, parsingErrors: a },
        })
      );
    },
    be = function (e, t) {
      var n = (t = t || {}).compress ? new v(t) : new C(t);
      if (t.sourcemap) {
        Le(n);
        var r = n.compile(e);
        return (
          n.applySourceMaps(),
          { code: r, map: "generator" === t.sourcemap ? n.map : n.map.toJSON() }
        );
      }
      return (r = n.compile(e));
    },
    je = { parse: Ee, stringify: be };
  const Ne = Symbol("arg flag");
  class xe extends Error {
    constructor(e, t) {
      super(e),
        (this.name = "ArgError"),
        (this.code = t),
        Object.setPrototypeOf(this, xe.prototype);
    }
  }
  function Ge(
    e,
    {
      argv: t = process.argv.slice(2),
      permissive: n = !1,
      stopAtPositional: r = !1,
    } = {}
  ) {
    if (!e)
      throw new xe(
        "argument specification object is required",
        "ARG_CONFIG_NO_SPEC"
      );
    const o = { _: [] },
      i = {},
      s = {};
    for (const t of Object.keys(e)) {
      if (!t)
        throw new xe(
          "argument key cannot be an empty string",
          "ARG_CONFIG_EMPTY_KEY"
        );
      if ("-" !== t[0])
        throw new xe(
          `argument key must start with '-' but found: '${t}'`,
          "ARG_CONFIG_NONOPT_KEY"
        );
      if (1 === t.length)
        throw new xe(
          `argument key must have a name; singular '-' keys are not allowed: ${t}`,
          "ARG_CONFIG_NONAME_KEY"
        );
      if ("string" == typeof e[t]) {
        i[t] = e[t];
        continue;
      }
      let n = e[t],
        r = !1;
      if (Array.isArray(n) && 1 === n.length && "function" == typeof n[0]) {
        const [e] = n;
        (n = (t, n, r = []) => (r.push(e(t, n, r[r.length - 1])), r)),
          (r = e === Boolean || !0 === e[Ne]);
      } else {
        if ("function" != typeof n)
          throw new xe(
            `type missing or not a function or valid array type: ${t}`,
            "ARG_CONFIG_VAD_TYPE"
          );
        r = n === Boolean || !0 === n[Ne];
      }
      if ("-" !== t[1] && t.length > 2)
        throw new xe(
          `short argument keys (with a single hyphen) must have only one character: ${t}`,
          "ARG_CONFIG_SHORTOPT_TOOLONG"
        );
      s[t] = [n, r];
    }
    for (let e = 0, a = t.length; e < a; e++) {
      const a = t[e];
      if (r && o._.length > 0) {
        o._ = o._.concat(t.slice(e));
        break;
      }
      if ("--" === a) {
        o._ = o._.concat(t.slice(e + 1));
        break;
      }
      if (a.length > 1 && "-" === a[0]) {
        const r =
          "-" === a[1] || 2 === a.length
            ? [a]
            : a
                .slice(1)
                .split("")
                .map((e) => `-${e}`);
        for (let a = 0; a < r.length; a++) {
          const u = r[a],
            [l, c] = "-" === u[1] ? u.split(/=(.*)/, 2) : [u, void 0];
          let p = l;
          for (; p in i; ) p = i[p];
          if (!(p in s)) {
            if (n) {
              o._.push(u);
              continue;
            }
            throw new xe(
              `unknown or unexpected option: ${l}`,
              "ARG_UNKNOWN_OPTION"
            );
          }
          const [h, f] = s[p];
          if (!f && a + 1 < r.length)
            throw new xe(
              `option requires argument (but was followed by another short argument): ${l}`,
              "ARG_MISSING_REQUIRED_SHORTARG"
            );
          if (f) o[p] = h(!0, p, o[p]);
          else if (void 0 === c) {
            if (
              t.length < e + 2 ||
              (t[e + 1].length > 1 &&
                "-" === t[e + 1][0] &&
                (!t[e + 1].match(/^-?\d*(\.(?=\d))?\d*$/) ||
                  (h !== Number &&
                    ("undefined" == typeof BigInt || h !== BigInt))))
            ) {
              throw new xe(
                `option requires argument: ${l}${
                  l === p ? "" : ` (alias for ${p})`
                }`,
                "ARG_MISSING_REQUIRED_LONGARG"
              );
            }
            (o[p] = h(t[e + 1], p, o[p])), ++e;
          } else o[p] = h(c, p, o[p]);
        }
      } else o._.push(a);
    }
    return o;
  }
  (Ge.flag = (e) => ((e[Ne] = !0), e)),
    (Ge.COUNT = Ge.flag((e, t, n) => (n || 0) + 1)),
    (Ge.ArgError = xe);
  var Pe = Ge;
  function Ie(e, t = null, n) {
    Object.keys(e).map((r) => {
      let o = r;
      if ((t && (o = t + `-${r}`), "object" != typeof e[r]))
        return n.push(`--${o}: ${e[r]};\n`), n;
      Ie(e[r], o, n);
    });
  }
  (e.cli = function (e) {
    let t = (function (e) {
      const t = Pe({ "--in": String, "--out": String, "--type": String });
      return {
        input: t["--in"] || "properties.config.json",
        output: t["--out"] || "properties.css",
        type: t["--type"] || "JSON",
      };
    })();
    const { input: n, output: r } = t,
      o = s.default.readFileSync(n),
      i = JSON.parse(o),
      a = s.default.existsSync(r),
      u = Object.entries(i);
    let l = "";
    if (
      (u.map((e) => {
        let t,
          n = [];
        if ("root" === e[0]) t = ":root";
        else if (e[0].includes(":")) {
          const n = e[0].split(":");
          t = `[data-${n[0]}="${n[1]}"]`;
        } else t = "." + e[0];
        Ie(e[1], null, n),
          (l += (function (e, t) {
            return `${e}{\n${t}}\n\n`;
          })(t, n.join("")));
      }),
      a)
    ) {
      const e = s.default.readFileSync(r, "utf-8"),
        t = je.parse(e),
        n = je.parse(l),
        o = Object.assign(t.stylesheet.rules, n.stylesheet.rules);
      (t.stylesheet.rules = o), s.default.writeFileSync(r, je.stringify(t));
    } else s.default.writeFileSync(r, l);
  }),
    Object.defineProperty(e, "__esModule", { value: !0 });
});
