import React, { useState, useEffect, useCallback, useContext } from 'react';
import events from 'events';
import crypto$3 from 'crypto';

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var _extendStatics = function extendStatics(d, b) {
  _extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) {
      if (b.hasOwnProperty(p)) d[p] = b[p];
    }
  };

  return _extendStatics(d, b);
};

function __extends(d, b) {
  _extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var _assign = function __assign() {
  _assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return _assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
function __createBinding(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
}
function __exportStar(m, exports) {
  for (var p in m) {
    if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function next() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) {
    ar = ar.concat(__read(arguments[i]));
  }

  return ar;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;

  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }

  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }

  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }

  function fulfill(value) {
    resume("next", value);
  }

  function reject(value) {
    resume("throw", value);
  }

  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;

  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
}
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
}
function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  privateMap.set(receiver, value);
  return value;
}

var tslib_es6 = {
	__proto__: null,
	__extends: __extends,
	get __assign () { return _assign; },
	__rest: __rest,
	__decorate: __decorate,
	__param: __param,
	__metadata: __metadata,
	__awaiter: __awaiter,
	__generator: __generator,
	__createBinding: __createBinding,
	__exportStar: __exportStar,
	__values: __values,
	__read: __read,
	__spread: __spread,
	__spreadArrays: __spreadArrays,
	__await: __await,
	__asyncGenerator: __asyncGenerator,
	__asyncDelegator: __asyncDelegator,
	__asyncValues: __asyncValues,
	__makeTemplateObject: __makeTemplateObject,
	__importStar: __importStar,
	__importDefault: __importDefault,
	__classPrivateFieldGet: __classPrivateFieldGet,
	__classPrivateFieldSet: __classPrivateFieldSet
};

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function tryStringify(o) {
  try {
    return JSON.stringify(o);
  } catch (e) {
    return '"[Circular]"';
  }
}

var quickFormatUnescaped = format;

function format(f, args, opts) {
  var ss = opts && opts.stringify || tryStringify;
  var offset = 1;

  if (typeof f === 'object' && f !== null) {
    var len = args.length + offset;
    if (len === 1) return f;
    var objects = new Array(len);
    objects[0] = ss(f);

    for (var index = 1; index < len; index++) {
      objects[index] = ss(args[index]);
    }

    return objects.join(' ');
  }

  if (typeof f !== 'string') {
    return f;
  }

  var argLen = args.length;
  if (argLen === 0) return f;
  var str = '';
  var a = 1 - offset;
  var lastPos = -1;
  var flen = f && f.length || 0;

  for (var i = 0; i < flen;) {
    if (f.charCodeAt(i) === 37 && i + 1 < flen) {
      lastPos = lastPos > -1 ? lastPos : 0;

      switch (f.charCodeAt(i + 1)) {
        case 100:
        case 102:
          if (a >= argLen) break;
          if (lastPos < i) str += f.slice(lastPos, i);
          if (args[a] == null) break;
          str += Number(args[a]);
          lastPos = i = i + 2;
          break;

        case 105:
          if (a >= argLen) break;
          if (lastPos < i) str += f.slice(lastPos, i);
          if (args[a] == null) break;
          str += Math.floor(Number(args[a]));
          lastPos = i = i + 2;
          break;

        case 79:
        case 111:
        case 106:
          if (a >= argLen) break;
          if (lastPos < i) str += f.slice(lastPos, i);
          if (args[a] === undefined) break;
          var type = typeof args[a];

          if (type === 'string') {
            str += '\'' + args[a] + '\'';
            lastPos = i + 2;
            i++;
            break;
          }

          if (type === 'function') {
            str += args[a].name || '<anonymous>';
            lastPos = i + 2;
            i++;
            break;
          }

          str += ss(args[a]);
          lastPos = i + 2;
          i++;
          break;

        case 115:
          if (a >= argLen) break;
          if (lastPos < i) str += f.slice(lastPos, i);
          str += String(args[a]);
          lastPos = i + 2;
          i++;
          break;

        case 37:
          if (lastPos < i) str += f.slice(lastPos, i);
          str += '%';
          lastPos = i + 2;
          i++;
          a--;
          break;
      }

      ++a;
    }

    ++i;
  }

  if (lastPos === -1) return f;else if (lastPos < flen) {
    str += f.slice(lastPos);
  }
  return str;
}

var browser = pino;

var _console = pfGlobalThisOrFallback().console || {};

var stdSerializers = {
  mapHttpRequest: mock,
  mapHttpResponse: mock,
  wrapRequestSerializer: passthrough,
  wrapResponseSerializer: passthrough,
  wrapErrorSerializer: passthrough,
  req: mock,
  res: mock,
  err: asErrValue
};

function shouldSerialize(serialize, serializers) {
  if (Array.isArray(serialize)) {
    var hasToFilter = serialize.filter(function (k) {
      return k !== '!stdSerializers.err';
    });
    return hasToFilter;
  } else if (serialize === true) {
    return Object.keys(serializers);
  }

  return false;
}

function pino(opts) {
  opts = opts || {};
  opts.browser = opts.browser || {};
  var transmit = opts.browser.transmit;

  if (transmit && typeof transmit.send !== 'function') {
    throw Error('pino: transmit option must have a send function');
  }

  var proto = opts.browser.write || _console;
  if (opts.browser.write) opts.browser.asObject = true;
  var serializers = opts.serializers || {};
  var serialize = shouldSerialize(opts.browser.serialize, serializers);
  var stdErrSerialize = opts.browser.serialize;
  if (Array.isArray(opts.browser.serialize) && opts.browser.serialize.indexOf('!stdSerializers.err') > -1) stdErrSerialize = false;
  var levels = ['error', 'fatal', 'warn', 'info', 'debug', 'trace'];

  if (typeof proto === 'function') {
    proto.error = proto.fatal = proto.warn = proto.info = proto.debug = proto.trace = proto;
  }

  if (opts.enabled === false) opts.level = 'silent';
  var level = opts.level || 'info';
  var logger = Object.create(proto);
  if (!logger.log) logger.log = noop;
  Object.defineProperty(logger, 'levelVal', {
    get: getLevelVal
  });
  Object.defineProperty(logger, 'level', {
    get: getLevel,
    set: setLevel
  });
  var setOpts = {
    transmit: transmit,
    serialize: serialize,
    asObject: opts.browser.asObject,
    levels: levels,
    timestamp: getTimeFunction(opts)
  };
  logger.levels = pino.levels;
  logger.level = level;
  logger.setMaxListeners = logger.getMaxListeners = logger.emit = logger.addListener = logger.on = logger.prependListener = logger.once = logger.prependOnceListener = logger.removeListener = logger.removeAllListeners = logger.listeners = logger.listenerCount = logger.eventNames = logger.write = logger.flush = noop;
  logger.serializers = serializers;
  logger._serialize = serialize;
  logger._stdErrSerialize = stdErrSerialize;
  logger.child = child;
  if (transmit) logger._logEvent = createLogEventShape();

  function getLevelVal() {
    return this.level === 'silent' ? Infinity : this.levels.values[this.level];
  }

  function getLevel() {
    return this._level;
  }

  function setLevel(level) {
    if (level !== 'silent' && !this.levels.values[level]) {
      throw Error('unknown level ' + level);
    }

    this._level = level;
    set(setOpts, logger, 'error', 'log');
    set(setOpts, logger, 'fatal', 'error');
    set(setOpts, logger, 'warn', 'error');
    set(setOpts, logger, 'info', 'log');
    set(setOpts, logger, 'debug', 'log');
    set(setOpts, logger, 'trace', 'log');
  }

  function child(bindings) {
    if (!bindings) {
      throw new Error('missing bindings for child Pino');
    }

    var bindingsSerializers = bindings.serializers;

    if (serialize && bindingsSerializers) {
      var childSerializers = Object.assign({}, serializers, bindingsSerializers);
      var childSerialize = opts.browser.serialize === true ? Object.keys(childSerializers) : serialize;
      delete bindings.serializers;
      applySerializers([bindings], childSerialize, childSerializers, this._stdErrSerialize);
    }

    function Child(parent) {
      this._childLevel = (parent._childLevel | 0) + 1;
      this.error = bind(parent, bindings, 'error');
      this.fatal = bind(parent, bindings, 'fatal');
      this.warn = bind(parent, bindings, 'warn');
      this.info = bind(parent, bindings, 'info');
      this.debug = bind(parent, bindings, 'debug');
      this.trace = bind(parent, bindings, 'trace');

      if (childSerializers) {
        this.serializers = childSerializers;
        this._serialize = childSerialize;
      }

      if (transmit) {
        this._logEvent = createLogEventShape([].concat(parent._logEvent.bindings, bindings));
      }
    }

    Child.prototype = this;
    return new Child(this);
  }

  return logger;
}

pino.levels = {
  values: {
    fatal: 60,
    error: 50,
    warn: 40,
    info: 30,
    debug: 20,
    trace: 10
  },
  labels: {
    10: 'trace',
    20: 'debug',
    30: 'info',
    40: 'warn',
    50: 'error',
    60: 'fatal'
  }
};
pino.stdSerializers = stdSerializers;
pino.stdTimeFunctions = Object.assign({}, {
  nullTime: nullTime,
  epochTime: epochTime,
  unixTime: unixTime,
  isoTime: isoTime
});

function set(opts, logger, level, fallback) {
  var proto = Object.getPrototypeOf(logger);
  logger[level] = logger.levelVal > logger.levels.values[level] ? noop : proto[level] ? proto[level] : _console[level] || _console[fallback] || noop;
  wrap(opts, logger, level);
}

function wrap(opts, logger, level) {
  if (!opts.transmit && logger[level] === noop) return;

  logger[level] = function (write) {
    return function LOG() {
      var ts = opts.timestamp();
      var args = new Array(arguments.length);
      var proto = Object.getPrototypeOf && Object.getPrototypeOf(this) === _console ? _console : this;

      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }

      if (opts.serialize && !opts.asObject) {
        applySerializers(args, this._serialize, this.serializers, this._stdErrSerialize);
      }

      if (opts.asObject) write.call(proto, asObject(this, level, args, ts));else write.apply(proto, args);

      if (opts.transmit) {
        var transmitLevel = opts.transmit.level || logger.level;
        var transmitValue = pino.levels.values[transmitLevel];
        var methodValue = pino.levels.values[level];
        if (methodValue < transmitValue) return;
        transmit(this, {
          ts: ts,
          methodLevel: level,
          methodValue: methodValue,
          transmitLevel: transmitLevel,
          transmitValue: pino.levels.values[opts.transmit.level || logger.level],
          send: opts.transmit.send,
          val: logger.levelVal
        }, args);
      }
    };
  }(logger[level]);
}

function asObject(logger, level, args, ts) {
  if (logger._serialize) applySerializers(args, logger._serialize, logger.serializers, logger._stdErrSerialize);
  var argsCloned = args.slice();
  var msg = argsCloned[0];
  var o = {};

  if (ts) {
    o.time = ts;
  }

  o.level = pino.levels.values[level];
  var lvl = (logger._childLevel | 0) + 1;
  if (lvl < 1) lvl = 1;

  if (msg !== null && typeof msg === 'object') {
    while (lvl-- && typeof argsCloned[0] === 'object') {
      Object.assign(o, argsCloned.shift());
    }

    msg = argsCloned.length ? quickFormatUnescaped(argsCloned.shift(), argsCloned) : undefined;
  } else if (typeof msg === 'string') msg = quickFormatUnescaped(argsCloned.shift(), argsCloned);

  if (msg !== undefined) o.msg = msg;
  return o;
}

function applySerializers(args, serialize, serializers, stdErrSerialize) {
  for (var i in args) {
    if (stdErrSerialize && args[i] instanceof Error) {
      args[i] = pino.stdSerializers.err(args[i]);
    } else if (typeof args[i] === 'object' && !Array.isArray(args[i])) {
      for (var k in args[i]) {
        if (serialize && serialize.indexOf(k) > -1 && k in serializers) {
          args[i][k] = serializers[k](args[i][k]);
        }
      }
    }
  }
}

function bind(parent, bindings, level) {
  return function () {
    var args = new Array(1 + arguments.length);
    args[0] = bindings;

    for (var i = 1; i < args.length; i++) {
      args[i] = arguments[i - 1];
    }

    return parent[level].apply(this, args);
  };
}

function transmit(logger, opts, args) {
  var send = opts.send;
  var ts = opts.ts;
  var methodLevel = opts.methodLevel;
  var methodValue = opts.methodValue;
  var val = opts.val;
  var bindings = logger._logEvent.bindings;
  applySerializers(args, logger._serialize || Object.keys(logger.serializers), logger.serializers, logger._stdErrSerialize === undefined ? true : logger._stdErrSerialize);
  logger._logEvent.ts = ts;
  logger._logEvent.messages = args.filter(function (arg) {
    return bindings.indexOf(arg) === -1;
  });
  logger._logEvent.level.label = methodLevel;
  logger._logEvent.level.value = methodValue;
  send(methodLevel, logger._logEvent, val);
  logger._logEvent = createLogEventShape(bindings);
}

function createLogEventShape(bindings) {
  return {
    ts: 0,
    messages: [],
    bindings: bindings || [],
    level: {
      label: '',
      value: 0
    }
  };
}

function asErrValue(err) {
  var obj = {
    type: err.constructor.name,
    msg: err.message,
    stack: err.stack
  };

  for (var key in err) {
    if (obj[key] === undefined) {
      obj[key] = err[key];
    }
  }

  return obj;
}

function getTimeFunction(opts) {
  if (typeof opts.timestamp === 'function') {
    return opts.timestamp;
  }

  if (opts.timestamp === false) {
    return nullTime;
  }

  return epochTime;
}

function mock() {
  return {};
}

function passthrough(a) {
  return a;
}

function noop() {}

function nullTime() {
  return false;
}

function epochTime() {
  return Date.now();
}

function unixTime() {
  return Math.round(Date.now() / 1000.0);
}

function isoTime() {
  return new Date(Date.now()).toISOString();
}

function pfGlobalThisOrFallback() {
  function defd(o) {
    return typeof o !== 'undefined' && o;
  }

  try {
    if (typeof globalThis !== 'undefined') return globalThis;
    Object.defineProperty(Object.prototype, 'globalThis', {
      get: function get() {
        delete Object.prototype.globalThis;
        return this.globalThis = this;
      },
      configurable: true
    });
    return globalThis;
  } catch (e) {
    return defd(self) || defd(window) || defd(this) || {};
  }
}

var localStorage_1 = createCommonjsModule(function (module) {
  (function () {

    var db;

    function LocalStorage() {}

    db = LocalStorage;

    db.prototype.getItem = function (key) {
      if (this.hasOwnProperty(key)) {
        return String(this[key]);
      }

      return null;
    };

    db.prototype.setItem = function (key, val) {
      this[key] = String(val);
    };

    db.prototype.removeItem = function (key) {
      delete this[key];
    };

    db.prototype.clear = function () {
      var self = this;
      Object.keys(self).forEach(function (key) {
        self[key] = undefined;
        delete self[key];
      });
    };

    db.prototype.key = function (i) {
      i = i || 0;
      return Object.keys(this)[i];
    };

    db.prototype.__defineGetter__('length', function () {
      return Object.keys(this).length;
    });

    if (commonjsGlobal.localStorage) {
      module.exports = localStorage;
    } else {
      module.exports = new LocalStorage();
    }
  })();
});

var cjs = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function safeJsonParse(value) {
    if (typeof value !== 'string') {
      throw new Error("Cannot safe json parse value of type " + typeof value);
    }

    try {
      return JSON.parse(value);
    } catch (_a) {
      return value;
    }
  }

  exports.safeJsonParse = safeJsonParse;

  function safeJsonStringify(value) {
    return typeof value === 'string' ? value : JSON.stringify(value, function (key, value) {
      return typeof value === 'undefined' ? null : value;
    });
  }

  exports.safeJsonStringify = safeJsonStringify;
});
unwrapExports(cjs);

var cjs$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var IKeyValueStorage = function IKeyValueStorage() {};

  exports.IKeyValueStorage = IKeyValueStorage;
});
unwrapExports(cjs$1);

var types = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.IKeyValueStorage = cjs$1.IKeyValueStorage;
});
unwrapExports(types);

var utils = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.REACT_NATIVE_REQUIRED_OPTION = 'asyncStorage';

  function isReactNativeOptions(opts) {
    return exports.REACT_NATIVE_REQUIRED_OPTION in opts;
  }

  exports.isReactNativeOptions = isReactNativeOptions;

  function getReactNativeOptions(opts) {
    if (typeof opts === 'undefined' || !isReactNativeOptions(opts)) {
      throw new Error("Missing " + exports.REACT_NATIVE_REQUIRED_OPTION + " option required for React-Native");
    }

    return opts;
  }

  exports.getReactNativeOptions = getReactNativeOptions;
  exports.NODE_JS_REQUIRED_OPTION = 'database';

  function isNodeJSOptions(opts) {
    return exports.NODE_JS_REQUIRED_OPTION in opts;
  }

  exports.isNodeJSOptions = isNodeJSOptions;

  function getNodeJSOptions(opts) {
    if (typeof opts === 'undefined' || !isNodeJSOptions(opts)) {
      throw new Error("Missing " + exports.NODE_JS_REQUIRED_OPTION + " option required for NodeJS");
    }

    return opts;
  }

  exports.getNodeJSOptions = getNodeJSOptions;

  function parseEntry(entry) {
    return [entry[0], cjs.safeJsonParse(entry[1])];
  }

  exports.parseEntry = parseEntry;
});
unwrapExports(utils);

var shared = createCommonjsModule(function (module, exports) {

  function __export(m) {
    for (var p in m) {
      if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
  }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  __export(types);

  __export(utils);
});
unwrapExports(shared);

var browser$1 = createCommonjsModule(function (module, exports) {

  var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var localStorage_1$1 = __importDefault(localStorage_1);

  var KeyValueStorage = /*#__PURE__*/function () {
    function KeyValueStorage() {
      this.localStorage = localStorage_1$1["default"];
    }

    var _proto = KeyValueStorage.prototype;

    _proto.getKeys = function getKeys() {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", Object.keys(this.localStorage));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    };

    _proto.getEntries = function getEntries() {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", Object.entries(this.localStorage).map(shared.parseEntry));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
    };

    _proto.getItem = function getItem(key) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var item;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                item = this.localStorage.getItem(key);

                if (!(item === null)) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return", undefined);

              case 3:
                return _context3.abrupt("return", cjs.safeJsonParse(item));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
    };

    _proto.setItem = function setItem(key, value) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.localStorage.setItem(key, cjs.safeJsonStringify(value));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
    };

    _proto.removeItem = function removeItem(key) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.localStorage.removeItem(key);

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
    };

    return KeyValueStorage;
  }();

  exports.KeyValueStorage = KeyValueStorage;
  exports["default"] = KeyValueStorage;
});
var KeyValueStorage = unwrapExports(browser$1);

var misc = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.IEvents = void 0;

  var IEvents = function IEvents() {};

  exports.IEvents = IEvents;
});
unwrapExports(misc);

var provider = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.IJsonRpcProvider = exports.IBaseJsonRpcProvider = exports.IJsonRpcConnection = void 0;

  var IJsonRpcConnection = /*#__PURE__*/function (_misc_1$IEvents) {
    _inheritsLoose(IJsonRpcConnection, _misc_1$IEvents);

    function IJsonRpcConnection(opts) {
      return _misc_1$IEvents.call(this) || this;
    }

    return IJsonRpcConnection;
  }(misc.IEvents);

  exports.IJsonRpcConnection = IJsonRpcConnection;

  var IBaseJsonRpcProvider = /*#__PURE__*/function (_misc_1$IEvents2) {
    _inheritsLoose(IBaseJsonRpcProvider, _misc_1$IEvents2);

    function IBaseJsonRpcProvider() {
      return _misc_1$IEvents2.call(this) || this;
    }

    return IBaseJsonRpcProvider;
  }(misc.IEvents);

  exports.IBaseJsonRpcProvider = IBaseJsonRpcProvider;

  var IJsonRpcProvider = /*#__PURE__*/function (_IBaseJsonRpcProvider) {
    _inheritsLoose(IJsonRpcProvider, _IBaseJsonRpcProvider);

    function IJsonRpcProvider(connection) {
      return _IBaseJsonRpcProvider.call(this) || this;
    }

    return IJsonRpcProvider;
  }(IBaseJsonRpcProvider);

  exports.IJsonRpcProvider = IJsonRpcProvider;
});
unwrapExports(provider);

var blockchain = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.IBlockchainProvider = exports.IBlockchainAuthenticator = exports.IPendingRequests = void 0;

  var IPendingRequests = function IPendingRequests(storage) {
    this.storage = storage;
  };

  exports.IPendingRequests = IPendingRequests;

  var IBlockchainAuthenticator = /*#__PURE__*/function (_misc_1$IEvents) {
    _inheritsLoose(IBlockchainAuthenticator, _misc_1$IEvents);

    function IBlockchainAuthenticator(config) {
      var _this;

      _this = _misc_1$IEvents.call(this) || this;
      _this.config = config;
      return _this;
    }

    return IBlockchainAuthenticator;
  }(misc.IEvents);

  exports.IBlockchainAuthenticator = IBlockchainAuthenticator;

  var IBlockchainProvider = /*#__PURE__*/function (_provider_1$IJsonRpcP) {
    _inheritsLoose(IBlockchainProvider, _provider_1$IJsonRpcP);

    function IBlockchainProvider(connection, config) {
      return _provider_1$IJsonRpcP.call(this, connection) || this;
    }

    return IBlockchainProvider;
  }(provider.IJsonRpcProvider);

  exports.IBlockchainProvider = IBlockchainProvider;
});
unwrapExports(blockchain);

var jsonrpc = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
});
unwrapExports(jsonrpc);

var multi = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.IMultiServiceProvider = void 0;

  var IMultiServiceProvider = /*#__PURE__*/function (_provider_1$IBaseJson) {
    _inheritsLoose(IMultiServiceProvider, _provider_1$IBaseJson);

    function IMultiServiceProvider(config) {
      var _this;

      _this = _provider_1$IBaseJson.call(this) || this;
      _this.config = config;
      return _this;
    }

    return IMultiServiceProvider;
  }(provider.IBaseJsonRpcProvider);

  exports.IMultiServiceProvider = IMultiServiceProvider;
});
unwrapExports(multi);

var router = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.IJsonRpcRouter = void 0;

  var IJsonRpcRouter = function IJsonRpcRouter(routes) {
    this.routes = routes;
  };

  exports.IJsonRpcRouter = IJsonRpcRouter;
});
unwrapExports(router);

var schema = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
});
unwrapExports(schema);

var validator = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.IJsonRpcValidator = void 0;

  var IJsonRpcValidator = function IJsonRpcValidator(schemas) {
    this.schemas = schemas;
  };

  exports.IJsonRpcValidator = IJsonRpcValidator;
});
unwrapExports(validator);

var tslib_1 = getCjsExportFromNamespace(tslib_es6);

var cjs$2 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  tslib_1.__exportStar(blockchain, exports);

  tslib_1.__exportStar(jsonrpc, exports);

  tslib_1.__exportStar(misc, exports);

  tslib_1.__exportStar(multi, exports);

  tslib_1.__exportStar(provider, exports);

  tslib_1.__exportStar(router, exports);

  tslib_1.__exportStar(schema, exports);

  tslib_1.__exportStar(validator, exports);
});
unwrapExports(cjs$2);

var client = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.IClient = void 0;

  var IClient = /*#__PURE__*/function (_types_1$IEvents) {
    _inheritsLoose(IClient, _types_1$IEvents);

    function IClient(opts) {
      var _this;

      _this = _types_1$IEvents.call(this) || this;
      _this.protocol = "wc";
      _this.version = 2;
      return _this;
    }

    return IClient;
  }(cjs$2.IEvents);

  exports.IClient = IClient;
});
unwrapExports(client);

var sequence = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ISequence = void 0;

  var ISequence = /*#__PURE__*/function (_types_1$IEvents) {
    _inheritsLoose(ISequence, _types_1$IEvents);

    function ISequence(client, logger) {
      var _this;

      _this = _types_1$IEvents.call(this) || this;
      _this.client = client;
      _this.logger = logger;
      return _this;
    }

    return ISequence;
  }(cjs$2.IEvents);

  exports.ISequence = ISequence;
});
unwrapExports(sequence);

var pairing = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.IPairing = void 0;

  var IPairing = /*#__PURE__*/function (_sequence_1$ISequence) {
    _inheritsLoose(IPairing, _sequence_1$ISequence);

    function IPairing() {
      return _sequence_1$ISequence.apply(this, arguments) || this;
    }

    return IPairing;
  }(sequence.ISequence);

  exports.IPairing = IPairing;
});
unwrapExports(pairing);

var crypto = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
});
unwrapExports(crypto);

var history = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.IJsonRpcHistory = void 0;

  var IJsonRpcHistory = /*#__PURE__*/function (_types_1$IEvents) {
    _inheritsLoose(IJsonRpcHistory, _types_1$IEvents);

    function IJsonRpcHistory(client, logger) {
      var _this;

      _this = _types_1$IEvents.call(this) || this;
      _this.client = client;
      _this.logger = logger;
      _this.records = new Map();
      return _this;
    }

    return IJsonRpcHistory;
  }(cjs$2.IEvents);

  exports.IJsonRpcHistory = IJsonRpcHistory;
});
unwrapExports(history);

var misc$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
});
unwrapExports(misc$1);

var relayer = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.IRelayer = void 0;

  var IRelayer = /*#__PURE__*/function (_types_1$IEvents) {
    _inheritsLoose(IRelayer, _types_1$IEvents);

    function IRelayer(client, logger, provider) {
      var _this;

      _this = _types_1$IEvents.call(this) || this;
      _this.client = client;
      _this.logger = logger;
      return _this;
    }

    return IRelayer;
  }(cjs$2.IEvents);

  exports.IRelayer = IRelayer;
});
unwrapExports(relayer);

var session = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ISession = void 0;

  var ISession = /*#__PURE__*/function (_sequence_1$ISequence) {
    _inheritsLoose(ISession, _sequence_1$ISequence);

    function ISession() {
      return _sequence_1$ISequence.apply(this, arguments) || this;
    }

    return ISession;
  }(sequence.ISequence);

  exports.ISession = ISession;
});
unwrapExports(session);

var subscription = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ISubscription = void 0;

  var ISubscription = /*#__PURE__*/function (_types_1$IEvents) {
    _inheritsLoose(ISubscription, _types_1$IEvents);

    function ISubscription(client, logger, context, encrypted) {
      var _this;

      _this = _types_1$IEvents.call(this) || this;
      _this.client = client;
      _this.logger = logger;
      _this.context = context;
      _this.encrypted = encrypted;
      _this.subscriptions = new Map();
      return _this;
    }

    return ISubscription;
  }(cjs$2.IEvents);

  exports.ISubscription = ISubscription;
});
unwrapExports(subscription);

var cjs$3 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  tslib_1.__exportStar(client, exports);

  tslib_1.__exportStar(pairing, exports);

  tslib_1.__exportStar(crypto, exports);

  tslib_1.__exportStar(history, exports);

  tslib_1.__exportStar(misc$1, exports);

  tslib_1.__exportStar(relayer, exports);

  tslib_1.__exportStar(sequence, exports);

  tslib_1.__exportStar(session, exports);

  tslib_1.__exportStar(subscription, exports);
});
unwrapExports(cjs$3);

var constants = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ERROR_BAD_MAC = exports.EMPTY_UINT_ARRAY = exports.MAX_MSG_LENGTH = exports.MAX_KEY_LENGTH = exports.PREFIXED_KEY_LENGTH = exports.MAC_LENGTH = exports.IV_LENGTH = exports.KEY_LENGTH = exports.PREFIX_LENGTH = exports.RIPEMD160_NODE_ALGO = exports.SHA512_NODE_ALGO = exports.SHA256_NODE_ALGO = exports.HMAC_NODE_ALGO = exports.AES_NODE_ALGO = exports.SHA512_BROWSER_ALGO = exports.SHA256_BROWSER_ALGO = exports.HMAC_BROWSER = exports.HMAC_BROWSER_ALGO = exports.AES_BROWSER_ALGO = exports.HMAC_LENGTH = exports.AES_LENGTH = exports.LENGTH_1024 = exports.LENGTH_512 = exports.LENGTH_256 = exports.LENGTH_128 = exports.LENGTH_64 = exports.LENGTH_32 = exports.LENGTH_16 = exports.LENGTH_1 = exports.LENGTH_0 = exports.VERIFY_OP = exports.SIGN_OP = exports.DECRYPT_OP = exports.ENCRYPT_OP = exports.UTF8_ENC = exports.HEX_ENC = void 0;
  exports.HEX_ENC = 'hex';
  exports.UTF8_ENC = 'utf8';
  exports.ENCRYPT_OP = 'encrypt';
  exports.DECRYPT_OP = 'decrypt';
  exports.SIGN_OP = 'sign';
  exports.VERIFY_OP = 'verify';
  exports.LENGTH_0 = 0;
  exports.LENGTH_1 = 1;
  exports.LENGTH_16 = 16;
  exports.LENGTH_32 = 32;
  exports.LENGTH_64 = 64;
  exports.LENGTH_128 = 128;
  exports.LENGTH_256 = 256;
  exports.LENGTH_512 = 512;
  exports.LENGTH_1024 = 1024;
  exports.AES_LENGTH = exports.LENGTH_256;
  exports.HMAC_LENGTH = exports.LENGTH_256;
  exports.AES_BROWSER_ALGO = 'AES-CBC';
  exports.HMAC_BROWSER_ALGO = "SHA-" + exports.AES_LENGTH;
  exports.HMAC_BROWSER = 'HMAC';
  exports.SHA256_BROWSER_ALGO = 'SHA-256';
  exports.SHA512_BROWSER_ALGO = 'SHA-512';
  exports.AES_NODE_ALGO = "aes-" + exports.AES_LENGTH + "-cbc";
  exports.HMAC_NODE_ALGO = "sha" + exports.HMAC_LENGTH;
  exports.SHA256_NODE_ALGO = 'sha256';
  exports.SHA512_NODE_ALGO = 'sha512';
  exports.RIPEMD160_NODE_ALGO = 'ripemd160';
  exports.PREFIX_LENGTH = exports.LENGTH_1;
  exports.KEY_LENGTH = exports.LENGTH_32;
  exports.IV_LENGTH = exports.LENGTH_16;
  exports.MAC_LENGTH = exports.LENGTH_32;
  exports.PREFIXED_KEY_LENGTH = exports.KEY_LENGTH + exports.PREFIX_LENGTH;
  exports.MAX_KEY_LENGTH = exports.LENGTH_1024;
  exports.MAX_MSG_LENGTH = exports.LENGTH_32;
  exports.EMPTY_UINT_ARRAY = new Uint8Array(exports.LENGTH_0);
  exports.ERROR_BAD_MAC = 'Bad MAC';
});
unwrapExports(constants);

var browser$2 = createCommonjsModule(function (module, exports) {

  var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.browserSha512 = exports.browserSha256 = exports.browserHmacSha512Sign = exports.browserHmacSha256Sign = exports.browserAesDecrypt = exports.browserAesEncrypt = exports.browserImportKey = exports.browserExportKey = exports.getOps = exports.getAlgo = exports.getSubtleCrypto = exports.getBrowerCrypto = void 0;

  function getBrowerCrypto() {
    return (commonjsGlobal === null || commonjsGlobal === void 0 ? void 0 : commonjsGlobal.crypto) || (commonjsGlobal === null || commonjsGlobal === void 0 ? void 0 : commonjsGlobal.msCrypto) || {};
  }

  exports.getBrowerCrypto = getBrowerCrypto;

  function getSubtleCrypto() {
    var browserCrypto = getBrowerCrypto();
    return browserCrypto.subtle || browserCrypto.webkitSubtle;
  }

  exports.getSubtleCrypto = getSubtleCrypto;

  function getAlgo(type) {
    return type === constants.AES_BROWSER_ALGO ? {
      length: constants.AES_LENGTH,
      name: constants.AES_BROWSER_ALGO
    } : {
      hash: {
        name: constants.HMAC_BROWSER_ALGO
      },
      name: constants.HMAC_BROWSER
    };
  }

  exports.getAlgo = getAlgo;

  function getOps(type) {
    return type === constants.AES_BROWSER_ALGO ? [constants.ENCRYPT_OP, constants.DECRYPT_OP] : [constants.SIGN_OP, constants.VERIFY_OP];
  }

  exports.getOps = getOps;

  function browserExportKey(cryptoKey, type) {

    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var subtle;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              subtle = getSubtleCrypto();
              _context.t0 = Uint8Array;
              _context.next = 4;
              return subtle.exportKey('raw', cryptoKey);

            case 4:
              _context.t1 = _context.sent;
              return _context.abrupt("return", new _context.t0(_context.t1));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
  }

  exports.browserExportKey = browserExportKey;

  function browserImportKey(buffer, type) {
    if (type === void 0) {
      type = constants.AES_BROWSER_ALGO;
    }

    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", getSubtleCrypto().importKey('raw', buffer, getAlgo(type), true, getOps(type)));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
  }

  exports.browserImportKey = browserImportKey;

  function browserAesEncrypt(iv, key, data) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var subtle, cryptoKey, result;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              subtle = getSubtleCrypto();
              _context3.next = 3;
              return browserImportKey(key, constants.AES_BROWSER_ALGO);

            case 3:
              cryptoKey = _context3.sent;
              _context3.next = 6;
              return subtle.encrypt({
                iv: iv,
                name: constants.AES_BROWSER_ALGO
              }, cryptoKey, data);

            case 6:
              result = _context3.sent;
              return _context3.abrupt("return", new Uint8Array(result));

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
  }

  exports.browserAesEncrypt = browserAesEncrypt;

  function browserAesDecrypt(iv, key, data) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var subtle, cryptoKey, result;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              subtle = getSubtleCrypto();
              _context4.next = 3;
              return browserImportKey(key, constants.AES_BROWSER_ALGO);

            case 3:
              cryptoKey = _context4.sent;
              _context4.next = 6;
              return subtle.decrypt({
                iv: iv,
                name: constants.AES_BROWSER_ALGO
              }, cryptoKey, data);

            case 6:
              result = _context4.sent;
              return _context4.abrupt("return", new Uint8Array(result));

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
  }

  exports.browserAesDecrypt = browserAesDecrypt;

  function browserHmacSha256Sign(key, data) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var subtle, cryptoKey, signature;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              subtle = getSubtleCrypto();
              _context5.next = 3;
              return browserImportKey(key, constants.HMAC_BROWSER);

            case 3:
              cryptoKey = _context5.sent;
              _context5.next = 6;
              return subtle.sign({
                length: constants.HMAC_LENGTH,
                name: constants.HMAC_BROWSER
              }, cryptoKey, data);

            case 6:
              signature = _context5.sent;
              return _context5.abrupt("return", new Uint8Array(signature));

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
  }

  exports.browserHmacSha256Sign = browserHmacSha256Sign;

  function browserHmacSha512Sign(key, data) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var subtle, cryptoKey, signature;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              subtle = getSubtleCrypto();
              _context6.next = 3;
              return browserImportKey(key, constants.HMAC_BROWSER);

            case 3:
              cryptoKey = _context6.sent;
              _context6.next = 6;
              return subtle.sign({
                length: constants.LENGTH_512,
                name: constants.HMAC_BROWSER
              }, cryptoKey, data);

            case 6:
              signature = _context6.sent;
              return _context6.abrupt("return", new Uint8Array(signature));

            case 8:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));
  }

  exports.browserHmacSha512Sign = browserHmacSha512Sign;

  function browserSha256(data) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var subtle, result;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              subtle = getSubtleCrypto();
              _context7.next = 3;
              return subtle.digest({
                name: constants.SHA256_BROWSER_ALGO
              }, data);

            case 3:
              result = _context7.sent;
              return _context7.abrupt("return", new Uint8Array(result));

            case 5:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));
  }

  exports.browserSha256 = browserSha256;

  function browserSha512(data) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var subtle, result;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              subtle = getSubtleCrypto();
              _context8.next = 3;
              return subtle.digest({
                name: constants.SHA512_BROWSER_ALGO
              }, data);

            case 3:
              result = _context8.sent;
              return _context8.abrupt("return", new Uint8Array(result));

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));
  }

  exports.browserSha512 = browserSha512;
});
unwrapExports(browser$2);

var aesJs = createCommonjsModule(function (module, exports) {
  (function (root) {

    function checkInt(value) {
      return parseInt(value) === value;
    }

    function checkInts(arrayish) {
      if (!checkInt(arrayish.length)) {
        return false;
      }

      for (var i = 0; i < arrayish.length; i++) {
        if (!checkInt(arrayish[i]) || arrayish[i] < 0 || arrayish[i] > 255) {
          return false;
        }
      }

      return true;
    }

    function coerceArray(arg, copy) {
      if (arg.buffer && arg.name === 'Uint8Array') {
        if (copy) {
          if (arg.slice) {
            arg = arg.slice();
          } else {
            arg = Array.prototype.slice.call(arg);
          }
        }

        return arg;
      }

      if (Array.isArray(arg)) {
        if (!checkInts(arg)) {
          throw new Error('Array contains invalid value: ' + arg);
        }

        return new Uint8Array(arg);
      }

      if (checkInt(arg.length) && checkInts(arg)) {
        return new Uint8Array(arg);
      }

      throw new Error('unsupported array-like object');
    }

    function createArray(length) {
      return new Uint8Array(length);
    }

    function copyArray(sourceArray, targetArray, targetStart, sourceStart, sourceEnd) {
      if (sourceStart != null || sourceEnd != null) {
        if (sourceArray.slice) {
          sourceArray = sourceArray.slice(sourceStart, sourceEnd);
        } else {
          sourceArray = Array.prototype.slice.call(sourceArray, sourceStart, sourceEnd);
        }
      }

      targetArray.set(sourceArray, targetStart);
    }

    var convertUtf8 = function () {
      function toBytes(text) {
        var result = [],
            i = 0;
        text = encodeURI(text);

        while (i < text.length) {
          var c = text.charCodeAt(i++);

          if (c === 37) {
            result.push(parseInt(text.substr(i, 2), 16));
            i += 2;
          } else {
            result.push(c);
          }
        }

        return coerceArray(result);
      }

      function fromBytes(bytes) {
        var result = [],
            i = 0;

        while (i < bytes.length) {
          var c = bytes[i];

          if (c < 128) {
            result.push(String.fromCharCode(c));
            i++;
          } else if (c > 191 && c < 224) {
            result.push(String.fromCharCode((c & 0x1f) << 6 | bytes[i + 1] & 0x3f));
            i += 2;
          } else {
            result.push(String.fromCharCode((c & 0x0f) << 12 | (bytes[i + 1] & 0x3f) << 6 | bytes[i + 2] & 0x3f));
            i += 3;
          }
        }

        return result.join('');
      }

      return {
        toBytes: toBytes,
        fromBytes: fromBytes
      };
    }();

    var convertHex = function () {
      function toBytes(text) {
        var result = [];

        for (var i = 0; i < text.length; i += 2) {
          result.push(parseInt(text.substr(i, 2), 16));
        }

        return result;
      }

      var Hex = '0123456789abcdef';

      function fromBytes(bytes) {
        var result = [];

        for (var i = 0; i < bytes.length; i++) {
          var v = bytes[i];
          result.push(Hex[(v & 0xf0) >> 4] + Hex[v & 0x0f]);
        }

        return result.join('');
      }

      return {
        toBytes: toBytes,
        fromBytes: fromBytes
      };
    }();

    var numberOfRounds = {
      16: 10,
      24: 12,
      32: 14
    };
    var rcon = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91];
    var S = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];
    var Si = [0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d];
    var T1 = [0xc66363a5, 0xf87c7c84, 0xee777799, 0xf67b7b8d, 0xfff2f20d, 0xd66b6bbd, 0xde6f6fb1, 0x91c5c554, 0x60303050, 0x02010103, 0xce6767a9, 0x562b2b7d, 0xe7fefe19, 0xb5d7d762, 0x4dababe6, 0xec76769a, 0x8fcaca45, 0x1f82829d, 0x89c9c940, 0xfa7d7d87, 0xeffafa15, 0xb25959eb, 0x8e4747c9, 0xfbf0f00b, 0x41adadec, 0xb3d4d467, 0x5fa2a2fd, 0x45afafea, 0x239c9cbf, 0x53a4a4f7, 0xe4727296, 0x9bc0c05b, 0x75b7b7c2, 0xe1fdfd1c, 0x3d9393ae, 0x4c26266a, 0x6c36365a, 0x7e3f3f41, 0xf5f7f702, 0x83cccc4f, 0x6834345c, 0x51a5a5f4, 0xd1e5e534, 0xf9f1f108, 0xe2717193, 0xabd8d873, 0x62313153, 0x2a15153f, 0x0804040c, 0x95c7c752, 0x46232365, 0x9dc3c35e, 0x30181828, 0x379696a1, 0x0a05050f, 0x2f9a9ab5, 0x0e070709, 0x24121236, 0x1b80809b, 0xdfe2e23d, 0xcdebeb26, 0x4e272769, 0x7fb2b2cd, 0xea75759f, 0x1209091b, 0x1d83839e, 0x582c2c74, 0x341a1a2e, 0x361b1b2d, 0xdc6e6eb2, 0xb45a5aee, 0x5ba0a0fb, 0xa45252f6, 0x763b3b4d, 0xb7d6d661, 0x7db3b3ce, 0x5229297b, 0xdde3e33e, 0x5e2f2f71, 0x13848497, 0xa65353f5, 0xb9d1d168, 0x00000000, 0xc1eded2c, 0x40202060, 0xe3fcfc1f, 0x79b1b1c8, 0xb65b5bed, 0xd46a6abe, 0x8dcbcb46, 0x67bebed9, 0x7239394b, 0x944a4ade, 0x984c4cd4, 0xb05858e8, 0x85cfcf4a, 0xbbd0d06b, 0xc5efef2a, 0x4faaaae5, 0xedfbfb16, 0x864343c5, 0x9a4d4dd7, 0x66333355, 0x11858594, 0x8a4545cf, 0xe9f9f910, 0x04020206, 0xfe7f7f81, 0xa05050f0, 0x783c3c44, 0x259f9fba, 0x4ba8a8e3, 0xa25151f3, 0x5da3a3fe, 0x804040c0, 0x058f8f8a, 0x3f9292ad, 0x219d9dbc, 0x70383848, 0xf1f5f504, 0x63bcbcdf, 0x77b6b6c1, 0xafdada75, 0x42212163, 0x20101030, 0xe5ffff1a, 0xfdf3f30e, 0xbfd2d26d, 0x81cdcd4c, 0x180c0c14, 0x26131335, 0xc3ecec2f, 0xbe5f5fe1, 0x359797a2, 0x884444cc, 0x2e171739, 0x93c4c457, 0x55a7a7f2, 0xfc7e7e82, 0x7a3d3d47, 0xc86464ac, 0xba5d5de7, 0x3219192b, 0xe6737395, 0xc06060a0, 0x19818198, 0x9e4f4fd1, 0xa3dcdc7f, 0x44222266, 0x542a2a7e, 0x3b9090ab, 0x0b888883, 0x8c4646ca, 0xc7eeee29, 0x6bb8b8d3, 0x2814143c, 0xa7dede79, 0xbc5e5ee2, 0x160b0b1d, 0xaddbdb76, 0xdbe0e03b, 0x64323256, 0x743a3a4e, 0x140a0a1e, 0x924949db, 0x0c06060a, 0x4824246c, 0xb85c5ce4, 0x9fc2c25d, 0xbdd3d36e, 0x43acacef, 0xc46262a6, 0x399191a8, 0x319595a4, 0xd3e4e437, 0xf279798b, 0xd5e7e732, 0x8bc8c843, 0x6e373759, 0xda6d6db7, 0x018d8d8c, 0xb1d5d564, 0x9c4e4ed2, 0x49a9a9e0, 0xd86c6cb4, 0xac5656fa, 0xf3f4f407, 0xcfeaea25, 0xca6565af, 0xf47a7a8e, 0x47aeaee9, 0x10080818, 0x6fbabad5, 0xf0787888, 0x4a25256f, 0x5c2e2e72, 0x381c1c24, 0x57a6a6f1, 0x73b4b4c7, 0x97c6c651, 0xcbe8e823, 0xa1dddd7c, 0xe874749c, 0x3e1f1f21, 0x964b4bdd, 0x61bdbddc, 0x0d8b8b86, 0x0f8a8a85, 0xe0707090, 0x7c3e3e42, 0x71b5b5c4, 0xcc6666aa, 0x904848d8, 0x06030305, 0xf7f6f601, 0x1c0e0e12, 0xc26161a3, 0x6a35355f, 0xae5757f9, 0x69b9b9d0, 0x17868691, 0x99c1c158, 0x3a1d1d27, 0x279e9eb9, 0xd9e1e138, 0xebf8f813, 0x2b9898b3, 0x22111133, 0xd26969bb, 0xa9d9d970, 0x078e8e89, 0x339494a7, 0x2d9b9bb6, 0x3c1e1e22, 0x15878792, 0xc9e9e920, 0x87cece49, 0xaa5555ff, 0x50282878, 0xa5dfdf7a, 0x038c8c8f, 0x59a1a1f8, 0x09898980, 0x1a0d0d17, 0x65bfbfda, 0xd7e6e631, 0x844242c6, 0xd06868b8, 0x824141c3, 0x299999b0, 0x5a2d2d77, 0x1e0f0f11, 0x7bb0b0cb, 0xa85454fc, 0x6dbbbbd6, 0x2c16163a];
    var T2 = [0xa5c66363, 0x84f87c7c, 0x99ee7777, 0x8df67b7b, 0x0dfff2f2, 0xbdd66b6b, 0xb1de6f6f, 0x5491c5c5, 0x50603030, 0x03020101, 0xa9ce6767, 0x7d562b2b, 0x19e7fefe, 0x62b5d7d7, 0xe64dabab, 0x9aec7676, 0x458fcaca, 0x9d1f8282, 0x4089c9c9, 0x87fa7d7d, 0x15effafa, 0xebb25959, 0xc98e4747, 0x0bfbf0f0, 0xec41adad, 0x67b3d4d4, 0xfd5fa2a2, 0xea45afaf, 0xbf239c9c, 0xf753a4a4, 0x96e47272, 0x5b9bc0c0, 0xc275b7b7, 0x1ce1fdfd, 0xae3d9393, 0x6a4c2626, 0x5a6c3636, 0x417e3f3f, 0x02f5f7f7, 0x4f83cccc, 0x5c683434, 0xf451a5a5, 0x34d1e5e5, 0x08f9f1f1, 0x93e27171, 0x73abd8d8, 0x53623131, 0x3f2a1515, 0x0c080404, 0x5295c7c7, 0x65462323, 0x5e9dc3c3, 0x28301818, 0xa1379696, 0x0f0a0505, 0xb52f9a9a, 0x090e0707, 0x36241212, 0x9b1b8080, 0x3ddfe2e2, 0x26cdebeb, 0x694e2727, 0xcd7fb2b2, 0x9fea7575, 0x1b120909, 0x9e1d8383, 0x74582c2c, 0x2e341a1a, 0x2d361b1b, 0xb2dc6e6e, 0xeeb45a5a, 0xfb5ba0a0, 0xf6a45252, 0x4d763b3b, 0x61b7d6d6, 0xce7db3b3, 0x7b522929, 0x3edde3e3, 0x715e2f2f, 0x97138484, 0xf5a65353, 0x68b9d1d1, 0x00000000, 0x2cc1eded, 0x60402020, 0x1fe3fcfc, 0xc879b1b1, 0xedb65b5b, 0xbed46a6a, 0x468dcbcb, 0xd967bebe, 0x4b723939, 0xde944a4a, 0xd4984c4c, 0xe8b05858, 0x4a85cfcf, 0x6bbbd0d0, 0x2ac5efef, 0xe54faaaa, 0x16edfbfb, 0xc5864343, 0xd79a4d4d, 0x55663333, 0x94118585, 0xcf8a4545, 0x10e9f9f9, 0x06040202, 0x81fe7f7f, 0xf0a05050, 0x44783c3c, 0xba259f9f, 0xe34ba8a8, 0xf3a25151, 0xfe5da3a3, 0xc0804040, 0x8a058f8f, 0xad3f9292, 0xbc219d9d, 0x48703838, 0x04f1f5f5, 0xdf63bcbc, 0xc177b6b6, 0x75afdada, 0x63422121, 0x30201010, 0x1ae5ffff, 0x0efdf3f3, 0x6dbfd2d2, 0x4c81cdcd, 0x14180c0c, 0x35261313, 0x2fc3ecec, 0xe1be5f5f, 0xa2359797, 0xcc884444, 0x392e1717, 0x5793c4c4, 0xf255a7a7, 0x82fc7e7e, 0x477a3d3d, 0xacc86464, 0xe7ba5d5d, 0x2b321919, 0x95e67373, 0xa0c06060, 0x98198181, 0xd19e4f4f, 0x7fa3dcdc, 0x66442222, 0x7e542a2a, 0xab3b9090, 0x830b8888, 0xca8c4646, 0x29c7eeee, 0xd36bb8b8, 0x3c281414, 0x79a7dede, 0xe2bc5e5e, 0x1d160b0b, 0x76addbdb, 0x3bdbe0e0, 0x56643232, 0x4e743a3a, 0x1e140a0a, 0xdb924949, 0x0a0c0606, 0x6c482424, 0xe4b85c5c, 0x5d9fc2c2, 0x6ebdd3d3, 0xef43acac, 0xa6c46262, 0xa8399191, 0xa4319595, 0x37d3e4e4, 0x8bf27979, 0x32d5e7e7, 0x438bc8c8, 0x596e3737, 0xb7da6d6d, 0x8c018d8d, 0x64b1d5d5, 0xd29c4e4e, 0xe049a9a9, 0xb4d86c6c, 0xfaac5656, 0x07f3f4f4, 0x25cfeaea, 0xafca6565, 0x8ef47a7a, 0xe947aeae, 0x18100808, 0xd56fbaba, 0x88f07878, 0x6f4a2525, 0x725c2e2e, 0x24381c1c, 0xf157a6a6, 0xc773b4b4, 0x5197c6c6, 0x23cbe8e8, 0x7ca1dddd, 0x9ce87474, 0x213e1f1f, 0xdd964b4b, 0xdc61bdbd, 0x860d8b8b, 0x850f8a8a, 0x90e07070, 0x427c3e3e, 0xc471b5b5, 0xaacc6666, 0xd8904848, 0x05060303, 0x01f7f6f6, 0x121c0e0e, 0xa3c26161, 0x5f6a3535, 0xf9ae5757, 0xd069b9b9, 0x91178686, 0x5899c1c1, 0x273a1d1d, 0xb9279e9e, 0x38d9e1e1, 0x13ebf8f8, 0xb32b9898, 0x33221111, 0xbbd26969, 0x70a9d9d9, 0x89078e8e, 0xa7339494, 0xb62d9b9b, 0x223c1e1e, 0x92158787, 0x20c9e9e9, 0x4987cece, 0xffaa5555, 0x78502828, 0x7aa5dfdf, 0x8f038c8c, 0xf859a1a1, 0x80098989, 0x171a0d0d, 0xda65bfbf, 0x31d7e6e6, 0xc6844242, 0xb8d06868, 0xc3824141, 0xb0299999, 0x775a2d2d, 0x111e0f0f, 0xcb7bb0b0, 0xfca85454, 0xd66dbbbb, 0x3a2c1616];
    var T3 = [0x63a5c663, 0x7c84f87c, 0x7799ee77, 0x7b8df67b, 0xf20dfff2, 0x6bbdd66b, 0x6fb1de6f, 0xc55491c5, 0x30506030, 0x01030201, 0x67a9ce67, 0x2b7d562b, 0xfe19e7fe, 0xd762b5d7, 0xabe64dab, 0x769aec76, 0xca458fca, 0x829d1f82, 0xc94089c9, 0x7d87fa7d, 0xfa15effa, 0x59ebb259, 0x47c98e47, 0xf00bfbf0, 0xadec41ad, 0xd467b3d4, 0xa2fd5fa2, 0xafea45af, 0x9cbf239c, 0xa4f753a4, 0x7296e472, 0xc05b9bc0, 0xb7c275b7, 0xfd1ce1fd, 0x93ae3d93, 0x266a4c26, 0x365a6c36, 0x3f417e3f, 0xf702f5f7, 0xcc4f83cc, 0x345c6834, 0xa5f451a5, 0xe534d1e5, 0xf108f9f1, 0x7193e271, 0xd873abd8, 0x31536231, 0x153f2a15, 0x040c0804, 0xc75295c7, 0x23654623, 0xc35e9dc3, 0x18283018, 0x96a13796, 0x050f0a05, 0x9ab52f9a, 0x07090e07, 0x12362412, 0x809b1b80, 0xe23ddfe2, 0xeb26cdeb, 0x27694e27, 0xb2cd7fb2, 0x759fea75, 0x091b1209, 0x839e1d83, 0x2c74582c, 0x1a2e341a, 0x1b2d361b, 0x6eb2dc6e, 0x5aeeb45a, 0xa0fb5ba0, 0x52f6a452, 0x3b4d763b, 0xd661b7d6, 0xb3ce7db3, 0x297b5229, 0xe33edde3, 0x2f715e2f, 0x84971384, 0x53f5a653, 0xd168b9d1, 0x00000000, 0xed2cc1ed, 0x20604020, 0xfc1fe3fc, 0xb1c879b1, 0x5bedb65b, 0x6abed46a, 0xcb468dcb, 0xbed967be, 0x394b7239, 0x4ade944a, 0x4cd4984c, 0x58e8b058, 0xcf4a85cf, 0xd06bbbd0, 0xef2ac5ef, 0xaae54faa, 0xfb16edfb, 0x43c58643, 0x4dd79a4d, 0x33556633, 0x85941185, 0x45cf8a45, 0xf910e9f9, 0x02060402, 0x7f81fe7f, 0x50f0a050, 0x3c44783c, 0x9fba259f, 0xa8e34ba8, 0x51f3a251, 0xa3fe5da3, 0x40c08040, 0x8f8a058f, 0x92ad3f92, 0x9dbc219d, 0x38487038, 0xf504f1f5, 0xbcdf63bc, 0xb6c177b6, 0xda75afda, 0x21634221, 0x10302010, 0xff1ae5ff, 0xf30efdf3, 0xd26dbfd2, 0xcd4c81cd, 0x0c14180c, 0x13352613, 0xec2fc3ec, 0x5fe1be5f, 0x97a23597, 0x44cc8844, 0x17392e17, 0xc45793c4, 0xa7f255a7, 0x7e82fc7e, 0x3d477a3d, 0x64acc864, 0x5de7ba5d, 0x192b3219, 0x7395e673, 0x60a0c060, 0x81981981, 0x4fd19e4f, 0xdc7fa3dc, 0x22664422, 0x2a7e542a, 0x90ab3b90, 0x88830b88, 0x46ca8c46, 0xee29c7ee, 0xb8d36bb8, 0x143c2814, 0xde79a7de, 0x5ee2bc5e, 0x0b1d160b, 0xdb76addb, 0xe03bdbe0, 0x32566432, 0x3a4e743a, 0x0a1e140a, 0x49db9249, 0x060a0c06, 0x246c4824, 0x5ce4b85c, 0xc25d9fc2, 0xd36ebdd3, 0xacef43ac, 0x62a6c462, 0x91a83991, 0x95a43195, 0xe437d3e4, 0x798bf279, 0xe732d5e7, 0xc8438bc8, 0x37596e37, 0x6db7da6d, 0x8d8c018d, 0xd564b1d5, 0x4ed29c4e, 0xa9e049a9, 0x6cb4d86c, 0x56faac56, 0xf407f3f4, 0xea25cfea, 0x65afca65, 0x7a8ef47a, 0xaee947ae, 0x08181008, 0xbad56fba, 0x7888f078, 0x256f4a25, 0x2e725c2e, 0x1c24381c, 0xa6f157a6, 0xb4c773b4, 0xc65197c6, 0xe823cbe8, 0xdd7ca1dd, 0x749ce874, 0x1f213e1f, 0x4bdd964b, 0xbddc61bd, 0x8b860d8b, 0x8a850f8a, 0x7090e070, 0x3e427c3e, 0xb5c471b5, 0x66aacc66, 0x48d89048, 0x03050603, 0xf601f7f6, 0x0e121c0e, 0x61a3c261, 0x355f6a35, 0x57f9ae57, 0xb9d069b9, 0x86911786, 0xc15899c1, 0x1d273a1d, 0x9eb9279e, 0xe138d9e1, 0xf813ebf8, 0x98b32b98, 0x11332211, 0x69bbd269, 0xd970a9d9, 0x8e89078e, 0x94a73394, 0x9bb62d9b, 0x1e223c1e, 0x87921587, 0xe920c9e9, 0xce4987ce, 0x55ffaa55, 0x28785028, 0xdf7aa5df, 0x8c8f038c, 0xa1f859a1, 0x89800989, 0x0d171a0d, 0xbfda65bf, 0xe631d7e6, 0x42c68442, 0x68b8d068, 0x41c38241, 0x99b02999, 0x2d775a2d, 0x0f111e0f, 0xb0cb7bb0, 0x54fca854, 0xbbd66dbb, 0x163a2c16];
    var T4 = [0x6363a5c6, 0x7c7c84f8, 0x777799ee, 0x7b7b8df6, 0xf2f20dff, 0x6b6bbdd6, 0x6f6fb1de, 0xc5c55491, 0x30305060, 0x01010302, 0x6767a9ce, 0x2b2b7d56, 0xfefe19e7, 0xd7d762b5, 0xababe64d, 0x76769aec, 0xcaca458f, 0x82829d1f, 0xc9c94089, 0x7d7d87fa, 0xfafa15ef, 0x5959ebb2, 0x4747c98e, 0xf0f00bfb, 0xadadec41, 0xd4d467b3, 0xa2a2fd5f, 0xafafea45, 0x9c9cbf23, 0xa4a4f753, 0x727296e4, 0xc0c05b9b, 0xb7b7c275, 0xfdfd1ce1, 0x9393ae3d, 0x26266a4c, 0x36365a6c, 0x3f3f417e, 0xf7f702f5, 0xcccc4f83, 0x34345c68, 0xa5a5f451, 0xe5e534d1, 0xf1f108f9, 0x717193e2, 0xd8d873ab, 0x31315362, 0x15153f2a, 0x04040c08, 0xc7c75295, 0x23236546, 0xc3c35e9d, 0x18182830, 0x9696a137, 0x05050f0a, 0x9a9ab52f, 0x0707090e, 0x12123624, 0x80809b1b, 0xe2e23ddf, 0xebeb26cd, 0x2727694e, 0xb2b2cd7f, 0x75759fea, 0x09091b12, 0x83839e1d, 0x2c2c7458, 0x1a1a2e34, 0x1b1b2d36, 0x6e6eb2dc, 0x5a5aeeb4, 0xa0a0fb5b, 0x5252f6a4, 0x3b3b4d76, 0xd6d661b7, 0xb3b3ce7d, 0x29297b52, 0xe3e33edd, 0x2f2f715e, 0x84849713, 0x5353f5a6, 0xd1d168b9, 0x00000000, 0xeded2cc1, 0x20206040, 0xfcfc1fe3, 0xb1b1c879, 0x5b5bedb6, 0x6a6abed4, 0xcbcb468d, 0xbebed967, 0x39394b72, 0x4a4ade94, 0x4c4cd498, 0x5858e8b0, 0xcfcf4a85, 0xd0d06bbb, 0xefef2ac5, 0xaaaae54f, 0xfbfb16ed, 0x4343c586, 0x4d4dd79a, 0x33335566, 0x85859411, 0x4545cf8a, 0xf9f910e9, 0x02020604, 0x7f7f81fe, 0x5050f0a0, 0x3c3c4478, 0x9f9fba25, 0xa8a8e34b, 0x5151f3a2, 0xa3a3fe5d, 0x4040c080, 0x8f8f8a05, 0x9292ad3f, 0x9d9dbc21, 0x38384870, 0xf5f504f1, 0xbcbcdf63, 0xb6b6c177, 0xdada75af, 0x21216342, 0x10103020, 0xffff1ae5, 0xf3f30efd, 0xd2d26dbf, 0xcdcd4c81, 0x0c0c1418, 0x13133526, 0xecec2fc3, 0x5f5fe1be, 0x9797a235, 0x4444cc88, 0x1717392e, 0xc4c45793, 0xa7a7f255, 0x7e7e82fc, 0x3d3d477a, 0x6464acc8, 0x5d5de7ba, 0x19192b32, 0x737395e6, 0x6060a0c0, 0x81819819, 0x4f4fd19e, 0xdcdc7fa3, 0x22226644, 0x2a2a7e54, 0x9090ab3b, 0x8888830b, 0x4646ca8c, 0xeeee29c7, 0xb8b8d36b, 0x14143c28, 0xdede79a7, 0x5e5ee2bc, 0x0b0b1d16, 0xdbdb76ad, 0xe0e03bdb, 0x32325664, 0x3a3a4e74, 0x0a0a1e14, 0x4949db92, 0x06060a0c, 0x24246c48, 0x5c5ce4b8, 0xc2c25d9f, 0xd3d36ebd, 0xacacef43, 0x6262a6c4, 0x9191a839, 0x9595a431, 0xe4e437d3, 0x79798bf2, 0xe7e732d5, 0xc8c8438b, 0x3737596e, 0x6d6db7da, 0x8d8d8c01, 0xd5d564b1, 0x4e4ed29c, 0xa9a9e049, 0x6c6cb4d8, 0x5656faac, 0xf4f407f3, 0xeaea25cf, 0x6565afca, 0x7a7a8ef4, 0xaeaee947, 0x08081810, 0xbabad56f, 0x787888f0, 0x25256f4a, 0x2e2e725c, 0x1c1c2438, 0xa6a6f157, 0xb4b4c773, 0xc6c65197, 0xe8e823cb, 0xdddd7ca1, 0x74749ce8, 0x1f1f213e, 0x4b4bdd96, 0xbdbddc61, 0x8b8b860d, 0x8a8a850f, 0x707090e0, 0x3e3e427c, 0xb5b5c471, 0x6666aacc, 0x4848d890, 0x03030506, 0xf6f601f7, 0x0e0e121c, 0x6161a3c2, 0x35355f6a, 0x5757f9ae, 0xb9b9d069, 0x86869117, 0xc1c15899, 0x1d1d273a, 0x9e9eb927, 0xe1e138d9, 0xf8f813eb, 0x9898b32b, 0x11113322, 0x6969bbd2, 0xd9d970a9, 0x8e8e8907, 0x9494a733, 0x9b9bb62d, 0x1e1e223c, 0x87879215, 0xe9e920c9, 0xcece4987, 0x5555ffaa, 0x28287850, 0xdfdf7aa5, 0x8c8c8f03, 0xa1a1f859, 0x89898009, 0x0d0d171a, 0xbfbfda65, 0xe6e631d7, 0x4242c684, 0x6868b8d0, 0x4141c382, 0x9999b029, 0x2d2d775a, 0x0f0f111e, 0xb0b0cb7b, 0x5454fca8, 0xbbbbd66d, 0x16163a2c];
    var T5 = [0x51f4a750, 0x7e416553, 0x1a17a4c3, 0x3a275e96, 0x3bab6bcb, 0x1f9d45f1, 0xacfa58ab, 0x4be30393, 0x2030fa55, 0xad766df6, 0x88cc7691, 0xf5024c25, 0x4fe5d7fc, 0xc52acbd7, 0x26354480, 0xb562a38f, 0xdeb15a49, 0x25ba1b67, 0x45ea0e98, 0x5dfec0e1, 0xc32f7502, 0x814cf012, 0x8d4697a3, 0x6bd3f9c6, 0x038f5fe7, 0x15929c95, 0xbf6d7aeb, 0x955259da, 0xd4be832d, 0x587421d3, 0x49e06929, 0x8ec9c844, 0x75c2896a, 0xf48e7978, 0x99583e6b, 0x27b971dd, 0xbee14fb6, 0xf088ad17, 0xc920ac66, 0x7dce3ab4, 0x63df4a18, 0xe51a3182, 0x97513360, 0x62537f45, 0xb16477e0, 0xbb6bae84, 0xfe81a01c, 0xf9082b94, 0x70486858, 0x8f45fd19, 0x94de6c87, 0x527bf8b7, 0xab73d323, 0x724b02e2, 0xe31f8f57, 0x6655ab2a, 0xb2eb2807, 0x2fb5c203, 0x86c57b9a, 0xd33708a5, 0x302887f2, 0x23bfa5b2, 0x02036aba, 0xed16825c, 0x8acf1c2b, 0xa779b492, 0xf307f2f0, 0x4e69e2a1, 0x65daf4cd, 0x0605bed5, 0xd134621f, 0xc4a6fe8a, 0x342e539d, 0xa2f355a0, 0x058ae132, 0xa4f6eb75, 0x0b83ec39, 0x4060efaa, 0x5e719f06, 0xbd6e1051, 0x3e218af9, 0x96dd063d, 0xdd3e05ae, 0x4de6bd46, 0x91548db5, 0x71c45d05, 0x0406d46f, 0x605015ff, 0x1998fb24, 0xd6bde997, 0x894043cc, 0x67d99e77, 0xb0e842bd, 0x07898b88, 0xe7195b38, 0x79c8eedb, 0xa17c0a47, 0x7c420fe9, 0xf8841ec9, 0x00000000, 0x09808683, 0x322bed48, 0x1e1170ac, 0x6c5a724e, 0xfd0efffb, 0x0f853856, 0x3daed51e, 0x362d3927, 0x0a0fd964, 0x685ca621, 0x9b5b54d1, 0x24362e3a, 0x0c0a67b1, 0x9357e70f, 0xb4ee96d2, 0x1b9b919e, 0x80c0c54f, 0x61dc20a2, 0x5a774b69, 0x1c121a16, 0xe293ba0a, 0xc0a02ae5, 0x3c22e043, 0x121b171d, 0x0e090d0b, 0xf28bc7ad, 0x2db6a8b9, 0x141ea9c8, 0x57f11985, 0xaf75074c, 0xee99ddbb, 0xa37f60fd, 0xf701269f, 0x5c72f5bc, 0x44663bc5, 0x5bfb7e34, 0x8b432976, 0xcb23c6dc, 0xb6edfc68, 0xb8e4f163, 0xd731dcca, 0x42638510, 0x13972240, 0x84c61120, 0x854a247d, 0xd2bb3df8, 0xaef93211, 0xc729a16d, 0x1d9e2f4b, 0xdcb230f3, 0x0d8652ec, 0x77c1e3d0, 0x2bb3166c, 0xa970b999, 0x119448fa, 0x47e96422, 0xa8fc8cc4, 0xa0f03f1a, 0x567d2cd8, 0x223390ef, 0x87494ec7, 0xd938d1c1, 0x8ccaa2fe, 0x98d40b36, 0xa6f581cf, 0xa57ade28, 0xdab78e26, 0x3fadbfa4, 0x2c3a9de4, 0x5078920d, 0x6a5fcc9b, 0x547e4662, 0xf68d13c2, 0x90d8b8e8, 0x2e39f75e, 0x82c3aff5, 0x9f5d80be, 0x69d0937c, 0x6fd52da9, 0xcf2512b3, 0xc8ac993b, 0x10187da7, 0xe89c636e, 0xdb3bbb7b, 0xcd267809, 0x6e5918f4, 0xec9ab701, 0x834f9aa8, 0xe6956e65, 0xaaffe67e, 0x21bccf08, 0xef15e8e6, 0xbae79bd9, 0x4a6f36ce, 0xea9f09d4, 0x29b07cd6, 0x31a4b2af, 0x2a3f2331, 0xc6a59430, 0x35a266c0, 0x744ebc37, 0xfc82caa6, 0xe090d0b0, 0x33a7d815, 0xf104984a, 0x41ecdaf7, 0x7fcd500e, 0x1791f62f, 0x764dd68d, 0x43efb04d, 0xccaa4d54, 0xe49604df, 0x9ed1b5e3, 0x4c6a881b, 0xc12c1fb8, 0x4665517f, 0x9d5eea04, 0x018c355d, 0xfa877473, 0xfb0b412e, 0xb3671d5a, 0x92dbd252, 0xe9105633, 0x6dd64713, 0x9ad7618c, 0x37a10c7a, 0x59f8148e, 0xeb133c89, 0xcea927ee, 0xb761c935, 0xe11ce5ed, 0x7a47b13c, 0x9cd2df59, 0x55f2733f, 0x1814ce79, 0x73c737bf, 0x53f7cdea, 0x5ffdaa5b, 0xdf3d6f14, 0x7844db86, 0xcaaff381, 0xb968c43e, 0x3824342c, 0xc2a3405f, 0x161dc372, 0xbce2250c, 0x283c498b, 0xff0d9541, 0x39a80171, 0x080cb3de, 0xd8b4e49c, 0x6456c190, 0x7bcb8461, 0xd532b670, 0x486c5c74, 0xd0b85742];
    var T6 = [0x5051f4a7, 0x537e4165, 0xc31a17a4, 0x963a275e, 0xcb3bab6b, 0xf11f9d45, 0xabacfa58, 0x934be303, 0x552030fa, 0xf6ad766d, 0x9188cc76, 0x25f5024c, 0xfc4fe5d7, 0xd7c52acb, 0x80263544, 0x8fb562a3, 0x49deb15a, 0x6725ba1b, 0x9845ea0e, 0xe15dfec0, 0x02c32f75, 0x12814cf0, 0xa38d4697, 0xc66bd3f9, 0xe7038f5f, 0x9515929c, 0xebbf6d7a, 0xda955259, 0x2dd4be83, 0xd3587421, 0x2949e069, 0x448ec9c8, 0x6a75c289, 0x78f48e79, 0x6b99583e, 0xdd27b971, 0xb6bee14f, 0x17f088ad, 0x66c920ac, 0xb47dce3a, 0x1863df4a, 0x82e51a31, 0x60975133, 0x4562537f, 0xe0b16477, 0x84bb6bae, 0x1cfe81a0, 0x94f9082b, 0x58704868, 0x198f45fd, 0x8794de6c, 0xb7527bf8, 0x23ab73d3, 0xe2724b02, 0x57e31f8f, 0x2a6655ab, 0x07b2eb28, 0x032fb5c2, 0x9a86c57b, 0xa5d33708, 0xf2302887, 0xb223bfa5, 0xba02036a, 0x5ced1682, 0x2b8acf1c, 0x92a779b4, 0xf0f307f2, 0xa14e69e2, 0xcd65daf4, 0xd50605be, 0x1fd13462, 0x8ac4a6fe, 0x9d342e53, 0xa0a2f355, 0x32058ae1, 0x75a4f6eb, 0x390b83ec, 0xaa4060ef, 0x065e719f, 0x51bd6e10, 0xf93e218a, 0x3d96dd06, 0xaedd3e05, 0x464de6bd, 0xb591548d, 0x0571c45d, 0x6f0406d4, 0xff605015, 0x241998fb, 0x97d6bde9, 0xcc894043, 0x7767d99e, 0xbdb0e842, 0x8807898b, 0x38e7195b, 0xdb79c8ee, 0x47a17c0a, 0xe97c420f, 0xc9f8841e, 0x00000000, 0x83098086, 0x48322bed, 0xac1e1170, 0x4e6c5a72, 0xfbfd0eff, 0x560f8538, 0x1e3daed5, 0x27362d39, 0x640a0fd9, 0x21685ca6, 0xd19b5b54, 0x3a24362e, 0xb10c0a67, 0x0f9357e7, 0xd2b4ee96, 0x9e1b9b91, 0x4f80c0c5, 0xa261dc20, 0x695a774b, 0x161c121a, 0x0ae293ba, 0xe5c0a02a, 0x433c22e0, 0x1d121b17, 0x0b0e090d, 0xadf28bc7, 0xb92db6a8, 0xc8141ea9, 0x8557f119, 0x4caf7507, 0xbbee99dd, 0xfda37f60, 0x9ff70126, 0xbc5c72f5, 0xc544663b, 0x345bfb7e, 0x768b4329, 0xdccb23c6, 0x68b6edfc, 0x63b8e4f1, 0xcad731dc, 0x10426385, 0x40139722, 0x2084c611, 0x7d854a24, 0xf8d2bb3d, 0x11aef932, 0x6dc729a1, 0x4b1d9e2f, 0xf3dcb230, 0xec0d8652, 0xd077c1e3, 0x6c2bb316, 0x99a970b9, 0xfa119448, 0x2247e964, 0xc4a8fc8c, 0x1aa0f03f, 0xd8567d2c, 0xef223390, 0xc787494e, 0xc1d938d1, 0xfe8ccaa2, 0x3698d40b, 0xcfa6f581, 0x28a57ade, 0x26dab78e, 0xa43fadbf, 0xe42c3a9d, 0x0d507892, 0x9b6a5fcc, 0x62547e46, 0xc2f68d13, 0xe890d8b8, 0x5e2e39f7, 0xf582c3af, 0xbe9f5d80, 0x7c69d093, 0xa96fd52d, 0xb3cf2512, 0x3bc8ac99, 0xa710187d, 0x6ee89c63, 0x7bdb3bbb, 0x09cd2678, 0xf46e5918, 0x01ec9ab7, 0xa8834f9a, 0x65e6956e, 0x7eaaffe6, 0x0821bccf, 0xe6ef15e8, 0xd9bae79b, 0xce4a6f36, 0xd4ea9f09, 0xd629b07c, 0xaf31a4b2, 0x312a3f23, 0x30c6a594, 0xc035a266, 0x37744ebc, 0xa6fc82ca, 0xb0e090d0, 0x1533a7d8, 0x4af10498, 0xf741ecda, 0x0e7fcd50, 0x2f1791f6, 0x8d764dd6, 0x4d43efb0, 0x54ccaa4d, 0xdfe49604, 0xe39ed1b5, 0x1b4c6a88, 0xb8c12c1f, 0x7f466551, 0x049d5eea, 0x5d018c35, 0x73fa8774, 0x2efb0b41, 0x5ab3671d, 0x5292dbd2, 0x33e91056, 0x136dd647, 0x8c9ad761, 0x7a37a10c, 0x8e59f814, 0x89eb133c, 0xeecea927, 0x35b761c9, 0xede11ce5, 0x3c7a47b1, 0x599cd2df, 0x3f55f273, 0x791814ce, 0xbf73c737, 0xea53f7cd, 0x5b5ffdaa, 0x14df3d6f, 0x867844db, 0x81caaff3, 0x3eb968c4, 0x2c382434, 0x5fc2a340, 0x72161dc3, 0x0cbce225, 0x8b283c49, 0x41ff0d95, 0x7139a801, 0xde080cb3, 0x9cd8b4e4, 0x906456c1, 0x617bcb84, 0x70d532b6, 0x74486c5c, 0x42d0b857];
    var T7 = [0xa75051f4, 0x65537e41, 0xa4c31a17, 0x5e963a27, 0x6bcb3bab, 0x45f11f9d, 0x58abacfa, 0x03934be3, 0xfa552030, 0x6df6ad76, 0x769188cc, 0x4c25f502, 0xd7fc4fe5, 0xcbd7c52a, 0x44802635, 0xa38fb562, 0x5a49deb1, 0x1b6725ba, 0x0e9845ea, 0xc0e15dfe, 0x7502c32f, 0xf012814c, 0x97a38d46, 0xf9c66bd3, 0x5fe7038f, 0x9c951592, 0x7aebbf6d, 0x59da9552, 0x832dd4be, 0x21d35874, 0x692949e0, 0xc8448ec9, 0x896a75c2, 0x7978f48e, 0x3e6b9958, 0x71dd27b9, 0x4fb6bee1, 0xad17f088, 0xac66c920, 0x3ab47dce, 0x4a1863df, 0x3182e51a, 0x33609751, 0x7f456253, 0x77e0b164, 0xae84bb6b, 0xa01cfe81, 0x2b94f908, 0x68587048, 0xfd198f45, 0x6c8794de, 0xf8b7527b, 0xd323ab73, 0x02e2724b, 0x8f57e31f, 0xab2a6655, 0x2807b2eb, 0xc2032fb5, 0x7b9a86c5, 0x08a5d337, 0x87f23028, 0xa5b223bf, 0x6aba0203, 0x825ced16, 0x1c2b8acf, 0xb492a779, 0xf2f0f307, 0xe2a14e69, 0xf4cd65da, 0xbed50605, 0x621fd134, 0xfe8ac4a6, 0x539d342e, 0x55a0a2f3, 0xe132058a, 0xeb75a4f6, 0xec390b83, 0xefaa4060, 0x9f065e71, 0x1051bd6e, 0x8af93e21, 0x063d96dd, 0x05aedd3e, 0xbd464de6, 0x8db59154, 0x5d0571c4, 0xd46f0406, 0x15ff6050, 0xfb241998, 0xe997d6bd, 0x43cc8940, 0x9e7767d9, 0x42bdb0e8, 0x8b880789, 0x5b38e719, 0xeedb79c8, 0x0a47a17c, 0x0fe97c42, 0x1ec9f884, 0x00000000, 0x86830980, 0xed48322b, 0x70ac1e11, 0x724e6c5a, 0xfffbfd0e, 0x38560f85, 0xd51e3dae, 0x3927362d, 0xd9640a0f, 0xa621685c, 0x54d19b5b, 0x2e3a2436, 0x67b10c0a, 0xe70f9357, 0x96d2b4ee, 0x919e1b9b, 0xc54f80c0, 0x20a261dc, 0x4b695a77, 0x1a161c12, 0xba0ae293, 0x2ae5c0a0, 0xe0433c22, 0x171d121b, 0x0d0b0e09, 0xc7adf28b, 0xa8b92db6, 0xa9c8141e, 0x198557f1, 0x074caf75, 0xddbbee99, 0x60fda37f, 0x269ff701, 0xf5bc5c72, 0x3bc54466, 0x7e345bfb, 0x29768b43, 0xc6dccb23, 0xfc68b6ed, 0xf163b8e4, 0xdccad731, 0x85104263, 0x22401397, 0x112084c6, 0x247d854a, 0x3df8d2bb, 0x3211aef9, 0xa16dc729, 0x2f4b1d9e, 0x30f3dcb2, 0x52ec0d86, 0xe3d077c1, 0x166c2bb3, 0xb999a970, 0x48fa1194, 0x642247e9, 0x8cc4a8fc, 0x3f1aa0f0, 0x2cd8567d, 0x90ef2233, 0x4ec78749, 0xd1c1d938, 0xa2fe8cca, 0x0b3698d4, 0x81cfa6f5, 0xde28a57a, 0x8e26dab7, 0xbfa43fad, 0x9de42c3a, 0x920d5078, 0xcc9b6a5f, 0x4662547e, 0x13c2f68d, 0xb8e890d8, 0xf75e2e39, 0xaff582c3, 0x80be9f5d, 0x937c69d0, 0x2da96fd5, 0x12b3cf25, 0x993bc8ac, 0x7da71018, 0x636ee89c, 0xbb7bdb3b, 0x7809cd26, 0x18f46e59, 0xb701ec9a, 0x9aa8834f, 0x6e65e695, 0xe67eaaff, 0xcf0821bc, 0xe8e6ef15, 0x9bd9bae7, 0x36ce4a6f, 0x09d4ea9f, 0x7cd629b0, 0xb2af31a4, 0x23312a3f, 0x9430c6a5, 0x66c035a2, 0xbc37744e, 0xcaa6fc82, 0xd0b0e090, 0xd81533a7, 0x984af104, 0xdaf741ec, 0x500e7fcd, 0xf62f1791, 0xd68d764d, 0xb04d43ef, 0x4d54ccaa, 0x04dfe496, 0xb5e39ed1, 0x881b4c6a, 0x1fb8c12c, 0x517f4665, 0xea049d5e, 0x355d018c, 0x7473fa87, 0x412efb0b, 0x1d5ab367, 0xd25292db, 0x5633e910, 0x47136dd6, 0x618c9ad7, 0x0c7a37a1, 0x148e59f8, 0x3c89eb13, 0x27eecea9, 0xc935b761, 0xe5ede11c, 0xb13c7a47, 0xdf599cd2, 0x733f55f2, 0xce791814, 0x37bf73c7, 0xcdea53f7, 0xaa5b5ffd, 0x6f14df3d, 0xdb867844, 0xf381caaf, 0xc43eb968, 0x342c3824, 0x405fc2a3, 0xc372161d, 0x250cbce2, 0x498b283c, 0x9541ff0d, 0x017139a8, 0xb3de080c, 0xe49cd8b4, 0xc1906456, 0x84617bcb, 0xb670d532, 0x5c74486c, 0x5742d0b8];
    var T8 = [0xf4a75051, 0x4165537e, 0x17a4c31a, 0x275e963a, 0xab6bcb3b, 0x9d45f11f, 0xfa58abac, 0xe303934b, 0x30fa5520, 0x766df6ad, 0xcc769188, 0x024c25f5, 0xe5d7fc4f, 0x2acbd7c5, 0x35448026, 0x62a38fb5, 0xb15a49de, 0xba1b6725, 0xea0e9845, 0xfec0e15d, 0x2f7502c3, 0x4cf01281, 0x4697a38d, 0xd3f9c66b, 0x8f5fe703, 0x929c9515, 0x6d7aebbf, 0x5259da95, 0xbe832dd4, 0x7421d358, 0xe0692949, 0xc9c8448e, 0xc2896a75, 0x8e7978f4, 0x583e6b99, 0xb971dd27, 0xe14fb6be, 0x88ad17f0, 0x20ac66c9, 0xce3ab47d, 0xdf4a1863, 0x1a3182e5, 0x51336097, 0x537f4562, 0x6477e0b1, 0x6bae84bb, 0x81a01cfe, 0x082b94f9, 0x48685870, 0x45fd198f, 0xde6c8794, 0x7bf8b752, 0x73d323ab, 0x4b02e272, 0x1f8f57e3, 0x55ab2a66, 0xeb2807b2, 0xb5c2032f, 0xc57b9a86, 0x3708a5d3, 0x2887f230, 0xbfa5b223, 0x036aba02, 0x16825ced, 0xcf1c2b8a, 0x79b492a7, 0x07f2f0f3, 0x69e2a14e, 0xdaf4cd65, 0x05bed506, 0x34621fd1, 0xa6fe8ac4, 0x2e539d34, 0xf355a0a2, 0x8ae13205, 0xf6eb75a4, 0x83ec390b, 0x60efaa40, 0x719f065e, 0x6e1051bd, 0x218af93e, 0xdd063d96, 0x3e05aedd, 0xe6bd464d, 0x548db591, 0xc45d0571, 0x06d46f04, 0x5015ff60, 0x98fb2419, 0xbde997d6, 0x4043cc89, 0xd99e7767, 0xe842bdb0, 0x898b8807, 0x195b38e7, 0xc8eedb79, 0x7c0a47a1, 0x420fe97c, 0x841ec9f8, 0x00000000, 0x80868309, 0x2bed4832, 0x1170ac1e, 0x5a724e6c, 0x0efffbfd, 0x8538560f, 0xaed51e3d, 0x2d392736, 0x0fd9640a, 0x5ca62168, 0x5b54d19b, 0x362e3a24, 0x0a67b10c, 0x57e70f93, 0xee96d2b4, 0x9b919e1b, 0xc0c54f80, 0xdc20a261, 0x774b695a, 0x121a161c, 0x93ba0ae2, 0xa02ae5c0, 0x22e0433c, 0x1b171d12, 0x090d0b0e, 0x8bc7adf2, 0xb6a8b92d, 0x1ea9c814, 0xf1198557, 0x75074caf, 0x99ddbbee, 0x7f60fda3, 0x01269ff7, 0x72f5bc5c, 0x663bc544, 0xfb7e345b, 0x4329768b, 0x23c6dccb, 0xedfc68b6, 0xe4f163b8, 0x31dccad7, 0x63851042, 0x97224013, 0xc6112084, 0x4a247d85, 0xbb3df8d2, 0xf93211ae, 0x29a16dc7, 0x9e2f4b1d, 0xb230f3dc, 0x8652ec0d, 0xc1e3d077, 0xb3166c2b, 0x70b999a9, 0x9448fa11, 0xe9642247, 0xfc8cc4a8, 0xf03f1aa0, 0x7d2cd856, 0x3390ef22, 0x494ec787, 0x38d1c1d9, 0xcaa2fe8c, 0xd40b3698, 0xf581cfa6, 0x7ade28a5, 0xb78e26da, 0xadbfa43f, 0x3a9de42c, 0x78920d50, 0x5fcc9b6a, 0x7e466254, 0x8d13c2f6, 0xd8b8e890, 0x39f75e2e, 0xc3aff582, 0x5d80be9f, 0xd0937c69, 0xd52da96f, 0x2512b3cf, 0xac993bc8, 0x187da710, 0x9c636ee8, 0x3bbb7bdb, 0x267809cd, 0x5918f46e, 0x9ab701ec, 0x4f9aa883, 0x956e65e6, 0xffe67eaa, 0xbccf0821, 0x15e8e6ef, 0xe79bd9ba, 0x6f36ce4a, 0x9f09d4ea, 0xb07cd629, 0xa4b2af31, 0x3f23312a, 0xa59430c6, 0xa266c035, 0x4ebc3774, 0x82caa6fc, 0x90d0b0e0, 0xa7d81533, 0x04984af1, 0xecdaf741, 0xcd500e7f, 0x91f62f17, 0x4dd68d76, 0xefb04d43, 0xaa4d54cc, 0x9604dfe4, 0xd1b5e39e, 0x6a881b4c, 0x2c1fb8c1, 0x65517f46, 0x5eea049d, 0x8c355d01, 0x877473fa, 0x0b412efb, 0x671d5ab3, 0xdbd25292, 0x105633e9, 0xd647136d, 0xd7618c9a, 0xa10c7a37, 0xf8148e59, 0x133c89eb, 0xa927eece, 0x61c935b7, 0x1ce5ede1, 0x47b13c7a, 0xd2df599c, 0xf2733f55, 0x14ce7918, 0xc737bf73, 0xf7cdea53, 0xfdaa5b5f, 0x3d6f14df, 0x44db8678, 0xaff381ca, 0x68c43eb9, 0x24342c38, 0xa3405fc2, 0x1dc37216, 0xe2250cbc, 0x3c498b28, 0x0d9541ff, 0xa8017139, 0x0cb3de08, 0xb4e49cd8, 0x56c19064, 0xcb84617b, 0x32b670d5, 0x6c5c7448, 0xb85742d0];
    var U1 = [0x00000000, 0x0e090d0b, 0x1c121a16, 0x121b171d, 0x3824342c, 0x362d3927, 0x24362e3a, 0x2a3f2331, 0x70486858, 0x7e416553, 0x6c5a724e, 0x62537f45, 0x486c5c74, 0x4665517f, 0x547e4662, 0x5a774b69, 0xe090d0b0, 0xee99ddbb, 0xfc82caa6, 0xf28bc7ad, 0xd8b4e49c, 0xd6bde997, 0xc4a6fe8a, 0xcaaff381, 0x90d8b8e8, 0x9ed1b5e3, 0x8ccaa2fe, 0x82c3aff5, 0xa8fc8cc4, 0xa6f581cf, 0xb4ee96d2, 0xbae79bd9, 0xdb3bbb7b, 0xd532b670, 0xc729a16d, 0xc920ac66, 0xe31f8f57, 0xed16825c, 0xff0d9541, 0xf104984a, 0xab73d323, 0xa57ade28, 0xb761c935, 0xb968c43e, 0x9357e70f, 0x9d5eea04, 0x8f45fd19, 0x814cf012, 0x3bab6bcb, 0x35a266c0, 0x27b971dd, 0x29b07cd6, 0x038f5fe7, 0x0d8652ec, 0x1f9d45f1, 0x119448fa, 0x4be30393, 0x45ea0e98, 0x57f11985, 0x59f8148e, 0x73c737bf, 0x7dce3ab4, 0x6fd52da9, 0x61dc20a2, 0xad766df6, 0xa37f60fd, 0xb16477e0, 0xbf6d7aeb, 0x955259da, 0x9b5b54d1, 0x894043cc, 0x87494ec7, 0xdd3e05ae, 0xd33708a5, 0xc12c1fb8, 0xcf2512b3, 0xe51a3182, 0xeb133c89, 0xf9082b94, 0xf701269f, 0x4de6bd46, 0x43efb04d, 0x51f4a750, 0x5ffdaa5b, 0x75c2896a, 0x7bcb8461, 0x69d0937c, 0x67d99e77, 0x3daed51e, 0x33a7d815, 0x21bccf08, 0x2fb5c203, 0x058ae132, 0x0b83ec39, 0x1998fb24, 0x1791f62f, 0x764dd68d, 0x7844db86, 0x6a5fcc9b, 0x6456c190, 0x4e69e2a1, 0x4060efaa, 0x527bf8b7, 0x5c72f5bc, 0x0605bed5, 0x080cb3de, 0x1a17a4c3, 0x141ea9c8, 0x3e218af9, 0x302887f2, 0x223390ef, 0x2c3a9de4, 0x96dd063d, 0x98d40b36, 0x8acf1c2b, 0x84c61120, 0xaef93211, 0xa0f03f1a, 0xb2eb2807, 0xbce2250c, 0xe6956e65, 0xe89c636e, 0xfa877473, 0xf48e7978, 0xdeb15a49, 0xd0b85742, 0xc2a3405f, 0xccaa4d54, 0x41ecdaf7, 0x4fe5d7fc, 0x5dfec0e1, 0x53f7cdea, 0x79c8eedb, 0x77c1e3d0, 0x65daf4cd, 0x6bd3f9c6, 0x31a4b2af, 0x3fadbfa4, 0x2db6a8b9, 0x23bfa5b2, 0x09808683, 0x07898b88, 0x15929c95, 0x1b9b919e, 0xa17c0a47, 0xaf75074c, 0xbd6e1051, 0xb3671d5a, 0x99583e6b, 0x97513360, 0x854a247d, 0x8b432976, 0xd134621f, 0xdf3d6f14, 0xcd267809, 0xc32f7502, 0xe9105633, 0xe7195b38, 0xf5024c25, 0xfb0b412e, 0x9ad7618c, 0x94de6c87, 0x86c57b9a, 0x88cc7691, 0xa2f355a0, 0xacfa58ab, 0xbee14fb6, 0xb0e842bd, 0xea9f09d4, 0xe49604df, 0xf68d13c2, 0xf8841ec9, 0xd2bb3df8, 0xdcb230f3, 0xcea927ee, 0xc0a02ae5, 0x7a47b13c, 0x744ebc37, 0x6655ab2a, 0x685ca621, 0x42638510, 0x4c6a881b, 0x5e719f06, 0x5078920d, 0x0a0fd964, 0x0406d46f, 0x161dc372, 0x1814ce79, 0x322bed48, 0x3c22e043, 0x2e39f75e, 0x2030fa55, 0xec9ab701, 0xe293ba0a, 0xf088ad17, 0xfe81a01c, 0xd4be832d, 0xdab78e26, 0xc8ac993b, 0xc6a59430, 0x9cd2df59, 0x92dbd252, 0x80c0c54f, 0x8ec9c844, 0xa4f6eb75, 0xaaffe67e, 0xb8e4f163, 0xb6edfc68, 0x0c0a67b1, 0x02036aba, 0x10187da7, 0x1e1170ac, 0x342e539d, 0x3a275e96, 0x283c498b, 0x26354480, 0x7c420fe9, 0x724b02e2, 0x605015ff, 0x6e5918f4, 0x44663bc5, 0x4a6f36ce, 0x587421d3, 0x567d2cd8, 0x37a10c7a, 0x39a80171, 0x2bb3166c, 0x25ba1b67, 0x0f853856, 0x018c355d, 0x13972240, 0x1d9e2f4b, 0x47e96422, 0x49e06929, 0x5bfb7e34, 0x55f2733f, 0x7fcd500e, 0x71c45d05, 0x63df4a18, 0x6dd64713, 0xd731dcca, 0xd938d1c1, 0xcb23c6dc, 0xc52acbd7, 0xef15e8e6, 0xe11ce5ed, 0xf307f2f0, 0xfd0efffb, 0xa779b492, 0xa970b999, 0xbb6bae84, 0xb562a38f, 0x9f5d80be, 0x91548db5, 0x834f9aa8, 0x8d4697a3];
    var U2 = [0x00000000, 0x0b0e090d, 0x161c121a, 0x1d121b17, 0x2c382434, 0x27362d39, 0x3a24362e, 0x312a3f23, 0x58704868, 0x537e4165, 0x4e6c5a72, 0x4562537f, 0x74486c5c, 0x7f466551, 0x62547e46, 0x695a774b, 0xb0e090d0, 0xbbee99dd, 0xa6fc82ca, 0xadf28bc7, 0x9cd8b4e4, 0x97d6bde9, 0x8ac4a6fe, 0x81caaff3, 0xe890d8b8, 0xe39ed1b5, 0xfe8ccaa2, 0xf582c3af, 0xc4a8fc8c, 0xcfa6f581, 0xd2b4ee96, 0xd9bae79b, 0x7bdb3bbb, 0x70d532b6, 0x6dc729a1, 0x66c920ac, 0x57e31f8f, 0x5ced1682, 0x41ff0d95, 0x4af10498, 0x23ab73d3, 0x28a57ade, 0x35b761c9, 0x3eb968c4, 0x0f9357e7, 0x049d5eea, 0x198f45fd, 0x12814cf0, 0xcb3bab6b, 0xc035a266, 0xdd27b971, 0xd629b07c, 0xe7038f5f, 0xec0d8652, 0xf11f9d45, 0xfa119448, 0x934be303, 0x9845ea0e, 0x8557f119, 0x8e59f814, 0xbf73c737, 0xb47dce3a, 0xa96fd52d, 0xa261dc20, 0xf6ad766d, 0xfda37f60, 0xe0b16477, 0xebbf6d7a, 0xda955259, 0xd19b5b54, 0xcc894043, 0xc787494e, 0xaedd3e05, 0xa5d33708, 0xb8c12c1f, 0xb3cf2512, 0x82e51a31, 0x89eb133c, 0x94f9082b, 0x9ff70126, 0x464de6bd, 0x4d43efb0, 0x5051f4a7, 0x5b5ffdaa, 0x6a75c289, 0x617bcb84, 0x7c69d093, 0x7767d99e, 0x1e3daed5, 0x1533a7d8, 0x0821bccf, 0x032fb5c2, 0x32058ae1, 0x390b83ec, 0x241998fb, 0x2f1791f6, 0x8d764dd6, 0x867844db, 0x9b6a5fcc, 0x906456c1, 0xa14e69e2, 0xaa4060ef, 0xb7527bf8, 0xbc5c72f5, 0xd50605be, 0xde080cb3, 0xc31a17a4, 0xc8141ea9, 0xf93e218a, 0xf2302887, 0xef223390, 0xe42c3a9d, 0x3d96dd06, 0x3698d40b, 0x2b8acf1c, 0x2084c611, 0x11aef932, 0x1aa0f03f, 0x07b2eb28, 0x0cbce225, 0x65e6956e, 0x6ee89c63, 0x73fa8774, 0x78f48e79, 0x49deb15a, 0x42d0b857, 0x5fc2a340, 0x54ccaa4d, 0xf741ecda, 0xfc4fe5d7, 0xe15dfec0, 0xea53f7cd, 0xdb79c8ee, 0xd077c1e3, 0xcd65daf4, 0xc66bd3f9, 0xaf31a4b2, 0xa43fadbf, 0xb92db6a8, 0xb223bfa5, 0x83098086, 0x8807898b, 0x9515929c, 0x9e1b9b91, 0x47a17c0a, 0x4caf7507, 0x51bd6e10, 0x5ab3671d, 0x6b99583e, 0x60975133, 0x7d854a24, 0x768b4329, 0x1fd13462, 0x14df3d6f, 0x09cd2678, 0x02c32f75, 0x33e91056, 0x38e7195b, 0x25f5024c, 0x2efb0b41, 0x8c9ad761, 0x8794de6c, 0x9a86c57b, 0x9188cc76, 0xa0a2f355, 0xabacfa58, 0xb6bee14f, 0xbdb0e842, 0xd4ea9f09, 0xdfe49604, 0xc2f68d13, 0xc9f8841e, 0xf8d2bb3d, 0xf3dcb230, 0xeecea927, 0xe5c0a02a, 0x3c7a47b1, 0x37744ebc, 0x2a6655ab, 0x21685ca6, 0x10426385, 0x1b4c6a88, 0x065e719f, 0x0d507892, 0x640a0fd9, 0x6f0406d4, 0x72161dc3, 0x791814ce, 0x48322bed, 0x433c22e0, 0x5e2e39f7, 0x552030fa, 0x01ec9ab7, 0x0ae293ba, 0x17f088ad, 0x1cfe81a0, 0x2dd4be83, 0x26dab78e, 0x3bc8ac99, 0x30c6a594, 0x599cd2df, 0x5292dbd2, 0x4f80c0c5, 0x448ec9c8, 0x75a4f6eb, 0x7eaaffe6, 0x63b8e4f1, 0x68b6edfc, 0xb10c0a67, 0xba02036a, 0xa710187d, 0xac1e1170, 0x9d342e53, 0x963a275e, 0x8b283c49, 0x80263544, 0xe97c420f, 0xe2724b02, 0xff605015, 0xf46e5918, 0xc544663b, 0xce4a6f36, 0xd3587421, 0xd8567d2c, 0x7a37a10c, 0x7139a801, 0x6c2bb316, 0x6725ba1b, 0x560f8538, 0x5d018c35, 0x40139722, 0x4b1d9e2f, 0x2247e964, 0x2949e069, 0x345bfb7e, 0x3f55f273, 0x0e7fcd50, 0x0571c45d, 0x1863df4a, 0x136dd647, 0xcad731dc, 0xc1d938d1, 0xdccb23c6, 0xd7c52acb, 0xe6ef15e8, 0xede11ce5, 0xf0f307f2, 0xfbfd0eff, 0x92a779b4, 0x99a970b9, 0x84bb6bae, 0x8fb562a3, 0xbe9f5d80, 0xb591548d, 0xa8834f9a, 0xa38d4697];
    var U3 = [0x00000000, 0x0d0b0e09, 0x1a161c12, 0x171d121b, 0x342c3824, 0x3927362d, 0x2e3a2436, 0x23312a3f, 0x68587048, 0x65537e41, 0x724e6c5a, 0x7f456253, 0x5c74486c, 0x517f4665, 0x4662547e, 0x4b695a77, 0xd0b0e090, 0xddbbee99, 0xcaa6fc82, 0xc7adf28b, 0xe49cd8b4, 0xe997d6bd, 0xfe8ac4a6, 0xf381caaf, 0xb8e890d8, 0xb5e39ed1, 0xa2fe8cca, 0xaff582c3, 0x8cc4a8fc, 0x81cfa6f5, 0x96d2b4ee, 0x9bd9bae7, 0xbb7bdb3b, 0xb670d532, 0xa16dc729, 0xac66c920, 0x8f57e31f, 0x825ced16, 0x9541ff0d, 0x984af104, 0xd323ab73, 0xde28a57a, 0xc935b761, 0xc43eb968, 0xe70f9357, 0xea049d5e, 0xfd198f45, 0xf012814c, 0x6bcb3bab, 0x66c035a2, 0x71dd27b9, 0x7cd629b0, 0x5fe7038f, 0x52ec0d86, 0x45f11f9d, 0x48fa1194, 0x03934be3, 0x0e9845ea, 0x198557f1, 0x148e59f8, 0x37bf73c7, 0x3ab47dce, 0x2da96fd5, 0x20a261dc, 0x6df6ad76, 0x60fda37f, 0x77e0b164, 0x7aebbf6d, 0x59da9552, 0x54d19b5b, 0x43cc8940, 0x4ec78749, 0x05aedd3e, 0x08a5d337, 0x1fb8c12c, 0x12b3cf25, 0x3182e51a, 0x3c89eb13, 0x2b94f908, 0x269ff701, 0xbd464de6, 0xb04d43ef, 0xa75051f4, 0xaa5b5ffd, 0x896a75c2, 0x84617bcb, 0x937c69d0, 0x9e7767d9, 0xd51e3dae, 0xd81533a7, 0xcf0821bc, 0xc2032fb5, 0xe132058a, 0xec390b83, 0xfb241998, 0xf62f1791, 0xd68d764d, 0xdb867844, 0xcc9b6a5f, 0xc1906456, 0xe2a14e69, 0xefaa4060, 0xf8b7527b, 0xf5bc5c72, 0xbed50605, 0xb3de080c, 0xa4c31a17, 0xa9c8141e, 0x8af93e21, 0x87f23028, 0x90ef2233, 0x9de42c3a, 0x063d96dd, 0x0b3698d4, 0x1c2b8acf, 0x112084c6, 0x3211aef9, 0x3f1aa0f0, 0x2807b2eb, 0x250cbce2, 0x6e65e695, 0x636ee89c, 0x7473fa87, 0x7978f48e, 0x5a49deb1, 0x5742d0b8, 0x405fc2a3, 0x4d54ccaa, 0xdaf741ec, 0xd7fc4fe5, 0xc0e15dfe, 0xcdea53f7, 0xeedb79c8, 0xe3d077c1, 0xf4cd65da, 0xf9c66bd3, 0xb2af31a4, 0xbfa43fad, 0xa8b92db6, 0xa5b223bf, 0x86830980, 0x8b880789, 0x9c951592, 0x919e1b9b, 0x0a47a17c, 0x074caf75, 0x1051bd6e, 0x1d5ab367, 0x3e6b9958, 0x33609751, 0x247d854a, 0x29768b43, 0x621fd134, 0x6f14df3d, 0x7809cd26, 0x7502c32f, 0x5633e910, 0x5b38e719, 0x4c25f502, 0x412efb0b, 0x618c9ad7, 0x6c8794de, 0x7b9a86c5, 0x769188cc, 0x55a0a2f3, 0x58abacfa, 0x4fb6bee1, 0x42bdb0e8, 0x09d4ea9f, 0x04dfe496, 0x13c2f68d, 0x1ec9f884, 0x3df8d2bb, 0x30f3dcb2, 0x27eecea9, 0x2ae5c0a0, 0xb13c7a47, 0xbc37744e, 0xab2a6655, 0xa621685c, 0x85104263, 0x881b4c6a, 0x9f065e71, 0x920d5078, 0xd9640a0f, 0xd46f0406, 0xc372161d, 0xce791814, 0xed48322b, 0xe0433c22, 0xf75e2e39, 0xfa552030, 0xb701ec9a, 0xba0ae293, 0xad17f088, 0xa01cfe81, 0x832dd4be, 0x8e26dab7, 0x993bc8ac, 0x9430c6a5, 0xdf599cd2, 0xd25292db, 0xc54f80c0, 0xc8448ec9, 0xeb75a4f6, 0xe67eaaff, 0xf163b8e4, 0xfc68b6ed, 0x67b10c0a, 0x6aba0203, 0x7da71018, 0x70ac1e11, 0x539d342e, 0x5e963a27, 0x498b283c, 0x44802635, 0x0fe97c42, 0x02e2724b, 0x15ff6050, 0x18f46e59, 0x3bc54466, 0x36ce4a6f, 0x21d35874, 0x2cd8567d, 0x0c7a37a1, 0x017139a8, 0x166c2bb3, 0x1b6725ba, 0x38560f85, 0x355d018c, 0x22401397, 0x2f4b1d9e, 0x642247e9, 0x692949e0, 0x7e345bfb, 0x733f55f2, 0x500e7fcd, 0x5d0571c4, 0x4a1863df, 0x47136dd6, 0xdccad731, 0xd1c1d938, 0xc6dccb23, 0xcbd7c52a, 0xe8e6ef15, 0xe5ede11c, 0xf2f0f307, 0xfffbfd0e, 0xb492a779, 0xb999a970, 0xae84bb6b, 0xa38fb562, 0x80be9f5d, 0x8db59154, 0x9aa8834f, 0x97a38d46];
    var U4 = [0x00000000, 0x090d0b0e, 0x121a161c, 0x1b171d12, 0x24342c38, 0x2d392736, 0x362e3a24, 0x3f23312a, 0x48685870, 0x4165537e, 0x5a724e6c, 0x537f4562, 0x6c5c7448, 0x65517f46, 0x7e466254, 0x774b695a, 0x90d0b0e0, 0x99ddbbee, 0x82caa6fc, 0x8bc7adf2, 0xb4e49cd8, 0xbde997d6, 0xa6fe8ac4, 0xaff381ca, 0xd8b8e890, 0xd1b5e39e, 0xcaa2fe8c, 0xc3aff582, 0xfc8cc4a8, 0xf581cfa6, 0xee96d2b4, 0xe79bd9ba, 0x3bbb7bdb, 0x32b670d5, 0x29a16dc7, 0x20ac66c9, 0x1f8f57e3, 0x16825ced, 0x0d9541ff, 0x04984af1, 0x73d323ab, 0x7ade28a5, 0x61c935b7, 0x68c43eb9, 0x57e70f93, 0x5eea049d, 0x45fd198f, 0x4cf01281, 0xab6bcb3b, 0xa266c035, 0xb971dd27, 0xb07cd629, 0x8f5fe703, 0x8652ec0d, 0x9d45f11f, 0x9448fa11, 0xe303934b, 0xea0e9845, 0xf1198557, 0xf8148e59, 0xc737bf73, 0xce3ab47d, 0xd52da96f, 0xdc20a261, 0x766df6ad, 0x7f60fda3, 0x6477e0b1, 0x6d7aebbf, 0x5259da95, 0x5b54d19b, 0x4043cc89, 0x494ec787, 0x3e05aedd, 0x3708a5d3, 0x2c1fb8c1, 0x2512b3cf, 0x1a3182e5, 0x133c89eb, 0x082b94f9, 0x01269ff7, 0xe6bd464d, 0xefb04d43, 0xf4a75051, 0xfdaa5b5f, 0xc2896a75, 0xcb84617b, 0xd0937c69, 0xd99e7767, 0xaed51e3d, 0xa7d81533, 0xbccf0821, 0xb5c2032f, 0x8ae13205, 0x83ec390b, 0x98fb2419, 0x91f62f17, 0x4dd68d76, 0x44db8678, 0x5fcc9b6a, 0x56c19064, 0x69e2a14e, 0x60efaa40, 0x7bf8b752, 0x72f5bc5c, 0x05bed506, 0x0cb3de08, 0x17a4c31a, 0x1ea9c814, 0x218af93e, 0x2887f230, 0x3390ef22, 0x3a9de42c, 0xdd063d96, 0xd40b3698, 0xcf1c2b8a, 0xc6112084, 0xf93211ae, 0xf03f1aa0, 0xeb2807b2, 0xe2250cbc, 0x956e65e6, 0x9c636ee8, 0x877473fa, 0x8e7978f4, 0xb15a49de, 0xb85742d0, 0xa3405fc2, 0xaa4d54cc, 0xecdaf741, 0xe5d7fc4f, 0xfec0e15d, 0xf7cdea53, 0xc8eedb79, 0xc1e3d077, 0xdaf4cd65, 0xd3f9c66b, 0xa4b2af31, 0xadbfa43f, 0xb6a8b92d, 0xbfa5b223, 0x80868309, 0x898b8807, 0x929c9515, 0x9b919e1b, 0x7c0a47a1, 0x75074caf, 0x6e1051bd, 0x671d5ab3, 0x583e6b99, 0x51336097, 0x4a247d85, 0x4329768b, 0x34621fd1, 0x3d6f14df, 0x267809cd, 0x2f7502c3, 0x105633e9, 0x195b38e7, 0x024c25f5, 0x0b412efb, 0xd7618c9a, 0xde6c8794, 0xc57b9a86, 0xcc769188, 0xf355a0a2, 0xfa58abac, 0xe14fb6be, 0xe842bdb0, 0x9f09d4ea, 0x9604dfe4, 0x8d13c2f6, 0x841ec9f8, 0xbb3df8d2, 0xb230f3dc, 0xa927eece, 0xa02ae5c0, 0x47b13c7a, 0x4ebc3774, 0x55ab2a66, 0x5ca62168, 0x63851042, 0x6a881b4c, 0x719f065e, 0x78920d50, 0x0fd9640a, 0x06d46f04, 0x1dc37216, 0x14ce7918, 0x2bed4832, 0x22e0433c, 0x39f75e2e, 0x30fa5520, 0x9ab701ec, 0x93ba0ae2, 0x88ad17f0, 0x81a01cfe, 0xbe832dd4, 0xb78e26da, 0xac993bc8, 0xa59430c6, 0xd2df599c, 0xdbd25292, 0xc0c54f80, 0xc9c8448e, 0xf6eb75a4, 0xffe67eaa, 0xe4f163b8, 0xedfc68b6, 0x0a67b10c, 0x036aba02, 0x187da710, 0x1170ac1e, 0x2e539d34, 0x275e963a, 0x3c498b28, 0x35448026, 0x420fe97c, 0x4b02e272, 0x5015ff60, 0x5918f46e, 0x663bc544, 0x6f36ce4a, 0x7421d358, 0x7d2cd856, 0xa10c7a37, 0xa8017139, 0xb3166c2b, 0xba1b6725, 0x8538560f, 0x8c355d01, 0x97224013, 0x9e2f4b1d, 0xe9642247, 0xe0692949, 0xfb7e345b, 0xf2733f55, 0xcd500e7f, 0xc45d0571, 0xdf4a1863, 0xd647136d, 0x31dccad7, 0x38d1c1d9, 0x23c6dccb, 0x2acbd7c5, 0x15e8e6ef, 0x1ce5ede1, 0x07f2f0f3, 0x0efffbfd, 0x79b492a7, 0x70b999a9, 0x6bae84bb, 0x62a38fb5, 0x5d80be9f, 0x548db591, 0x4f9aa883, 0x4697a38d];

    function convertToInt32(bytes) {
      var result = [];

      for (var i = 0; i < bytes.length; i += 4) {
        result.push(bytes[i] << 24 | bytes[i + 1] << 16 | bytes[i + 2] << 8 | bytes[i + 3]);
      }

      return result;
    }

    var AES = function AES(key) {
      if (!(this instanceof AES)) {
        throw Error('AES must be instanitated with `new`');
      }

      Object.defineProperty(this, 'key', {
        value: coerceArray(key, true)
      });

      this._prepare();
    };

    AES.prototype._prepare = function () {
      var rounds = numberOfRounds[this.key.length];

      if (rounds == null) {
        throw new Error('invalid key size (must be 16, 24 or 32 bytes)');
      }

      this._Ke = [];
      this._Kd = [];

      for (var i = 0; i <= rounds; i++) {
        this._Ke.push([0, 0, 0, 0]);

        this._Kd.push([0, 0, 0, 0]);
      }

      var roundKeyCount = (rounds + 1) * 4;
      var KC = this.key.length / 4;
      var tk = convertToInt32(this.key);
      var index;

      for (var i = 0; i < KC; i++) {
        index = i >> 2;
        this._Ke[index][i % 4] = tk[i];
        this._Kd[rounds - index][i % 4] = tk[i];
      }

      var rconpointer = 0;
      var t = KC,
          tt;

      while (t < roundKeyCount) {
        tt = tk[KC - 1];
        tk[0] ^= S[tt >> 16 & 0xFF] << 24 ^ S[tt >> 8 & 0xFF] << 16 ^ S[tt & 0xFF] << 8 ^ S[tt >> 24 & 0xFF] ^ rcon[rconpointer] << 24;
        rconpointer += 1;

        if (KC != 8) {
          for (var i = 1; i < KC; i++) {
            tk[i] ^= tk[i - 1];
          }
        } else {
          for (var i = 1; i < KC / 2; i++) {
            tk[i] ^= tk[i - 1];
          }

          tt = tk[KC / 2 - 1];
          tk[KC / 2] ^= S[tt & 0xFF] ^ S[tt >> 8 & 0xFF] << 8 ^ S[tt >> 16 & 0xFF] << 16 ^ S[tt >> 24 & 0xFF] << 24;

          for (var i = KC / 2 + 1; i < KC; i++) {
            tk[i] ^= tk[i - 1];
          }
        }

        var i = 0,
            r,
            c;

        while (i < KC && t < roundKeyCount) {
          r = t >> 2;
          c = t % 4;
          this._Ke[r][c] = tk[i];
          this._Kd[rounds - r][c] = tk[i++];
          t++;
        }
      }

      for (var r = 1; r < rounds; r++) {
        for (var c = 0; c < 4; c++) {
          tt = this._Kd[r][c];
          this._Kd[r][c] = U1[tt >> 24 & 0xFF] ^ U2[tt >> 16 & 0xFF] ^ U3[tt >> 8 & 0xFF] ^ U4[tt & 0xFF];
        }
      }
    };

    AES.prototype.encrypt = function (plaintext) {
      if (plaintext.length != 16) {
        throw new Error('invalid plaintext size (must be 16 bytes)');
      }

      var rounds = this._Ke.length - 1;
      var a = [0, 0, 0, 0];
      var t = convertToInt32(plaintext);

      for (var i = 0; i < 4; i++) {
        t[i] ^= this._Ke[0][i];
      }

      for (var r = 1; r < rounds; r++) {
        for (var i = 0; i < 4; i++) {
          a[i] = T1[t[i] >> 24 & 0xff] ^ T2[t[(i + 1) % 4] >> 16 & 0xff] ^ T3[t[(i + 2) % 4] >> 8 & 0xff] ^ T4[t[(i + 3) % 4] & 0xff] ^ this._Ke[r][i];
        }

        t = a.slice();
      }

      var result = createArray(16),
          tt;

      for (var i = 0; i < 4; i++) {
        tt = this._Ke[rounds][i];
        result[4 * i] = (S[t[i] >> 24 & 0xff] ^ tt >> 24) & 0xff;
        result[4 * i + 1] = (S[t[(i + 1) % 4] >> 16 & 0xff] ^ tt >> 16) & 0xff;
        result[4 * i + 2] = (S[t[(i + 2) % 4] >> 8 & 0xff] ^ tt >> 8) & 0xff;
        result[4 * i + 3] = (S[t[(i + 3) % 4] & 0xff] ^ tt) & 0xff;
      }

      return result;
    };

    AES.prototype.decrypt = function (ciphertext) {
      if (ciphertext.length != 16) {
        throw new Error('invalid ciphertext size (must be 16 bytes)');
      }

      var rounds = this._Kd.length - 1;
      var a = [0, 0, 0, 0];
      var t = convertToInt32(ciphertext);

      for (var i = 0; i < 4; i++) {
        t[i] ^= this._Kd[0][i];
      }

      for (var r = 1; r < rounds; r++) {
        for (var i = 0; i < 4; i++) {
          a[i] = T5[t[i] >> 24 & 0xff] ^ T6[t[(i + 3) % 4] >> 16 & 0xff] ^ T7[t[(i + 2) % 4] >> 8 & 0xff] ^ T8[t[(i + 1) % 4] & 0xff] ^ this._Kd[r][i];
        }

        t = a.slice();
      }

      var result = createArray(16),
          tt;

      for (var i = 0; i < 4; i++) {
        tt = this._Kd[rounds][i];
        result[4 * i] = (Si[t[i] >> 24 & 0xff] ^ tt >> 24) & 0xff;
        result[4 * i + 1] = (Si[t[(i + 3) % 4] >> 16 & 0xff] ^ tt >> 16) & 0xff;
        result[4 * i + 2] = (Si[t[(i + 2) % 4] >> 8 & 0xff] ^ tt >> 8) & 0xff;
        result[4 * i + 3] = (Si[t[(i + 1) % 4] & 0xff] ^ tt) & 0xff;
      }

      return result;
    };

    var ModeOfOperationECB = function ModeOfOperationECB(key) {
      if (!(this instanceof ModeOfOperationECB)) {
        throw Error('AES must be instanitated with `new`');
      }

      this.description = "Electronic Code Block";
      this.name = "ecb";
      this._aes = new AES(key);
    };

    ModeOfOperationECB.prototype.encrypt = function (plaintext) {
      plaintext = coerceArray(plaintext);

      if (plaintext.length % 16 !== 0) {
        throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
      }

      var ciphertext = createArray(plaintext.length);
      var block = createArray(16);

      for (var i = 0; i < plaintext.length; i += 16) {
        copyArray(plaintext, block, 0, i, i + 16);
        block = this._aes.encrypt(block);
        copyArray(block, ciphertext, i);
      }

      return ciphertext;
    };

    ModeOfOperationECB.prototype.decrypt = function (ciphertext) {
      ciphertext = coerceArray(ciphertext);

      if (ciphertext.length % 16 !== 0) {
        throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
      }

      var plaintext = createArray(ciphertext.length);
      var block = createArray(16);

      for (var i = 0; i < ciphertext.length; i += 16) {
        copyArray(ciphertext, block, 0, i, i + 16);
        block = this._aes.decrypt(block);
        copyArray(block, plaintext, i);
      }

      return plaintext;
    };

    var ModeOfOperationCBC = function ModeOfOperationCBC(key, iv) {
      if (!(this instanceof ModeOfOperationCBC)) {
        throw Error('AES must be instanitated with `new`');
      }

      this.description = "Cipher Block Chaining";
      this.name = "cbc";

      if (!iv) {
        iv = createArray(16);
      } else if (iv.length != 16) {
        throw new Error('invalid initialation vector size (must be 16 bytes)');
      }

      this._lastCipherblock = coerceArray(iv, true);
      this._aes = new AES(key);
    };

    ModeOfOperationCBC.prototype.encrypt = function (plaintext) {
      plaintext = coerceArray(plaintext);

      if (plaintext.length % 16 !== 0) {
        throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
      }

      var ciphertext = createArray(plaintext.length);
      var block = createArray(16);

      for (var i = 0; i < plaintext.length; i += 16) {
        copyArray(plaintext, block, 0, i, i + 16);

        for (var j = 0; j < 16; j++) {
          block[j] ^= this._lastCipherblock[j];
        }

        this._lastCipherblock = this._aes.encrypt(block);
        copyArray(this._lastCipherblock, ciphertext, i);
      }

      return ciphertext;
    };

    ModeOfOperationCBC.prototype.decrypt = function (ciphertext) {
      ciphertext = coerceArray(ciphertext);

      if (ciphertext.length % 16 !== 0) {
        throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
      }

      var plaintext = createArray(ciphertext.length);
      var block = createArray(16);

      for (var i = 0; i < ciphertext.length; i += 16) {
        copyArray(ciphertext, block, 0, i, i + 16);
        block = this._aes.decrypt(block);

        for (var j = 0; j < 16; j++) {
          plaintext[i + j] = block[j] ^ this._lastCipherblock[j];
        }

        copyArray(ciphertext, this._lastCipherblock, 0, i, i + 16);
      }

      return plaintext;
    };

    var ModeOfOperationCFB = function ModeOfOperationCFB(key, iv, segmentSize) {
      if (!(this instanceof ModeOfOperationCFB)) {
        throw Error('AES must be instanitated with `new`');
      }

      this.description = "Cipher Feedback";
      this.name = "cfb";

      if (!iv) {
        iv = createArray(16);
      } else if (iv.length != 16) {
        throw new Error('invalid initialation vector size (must be 16 size)');
      }

      if (!segmentSize) {
        segmentSize = 1;
      }

      this.segmentSize = segmentSize;
      this._shiftRegister = coerceArray(iv, true);
      this._aes = new AES(key);
    };

    ModeOfOperationCFB.prototype.encrypt = function (plaintext) {
      if (plaintext.length % this.segmentSize != 0) {
        throw new Error('invalid plaintext size (must be segmentSize bytes)');
      }

      var encrypted = coerceArray(plaintext, true);
      var xorSegment;

      for (var i = 0; i < encrypted.length; i += this.segmentSize) {
        xorSegment = this._aes.encrypt(this._shiftRegister);

        for (var j = 0; j < this.segmentSize; j++) {
          encrypted[i + j] ^= xorSegment[j];
        }

        copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
        copyArray(encrypted, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
      }

      return encrypted;
    };

    ModeOfOperationCFB.prototype.decrypt = function (ciphertext) {
      if (ciphertext.length % this.segmentSize != 0) {
        throw new Error('invalid ciphertext size (must be segmentSize bytes)');
      }

      var plaintext = coerceArray(ciphertext, true);
      var xorSegment;

      for (var i = 0; i < plaintext.length; i += this.segmentSize) {
        xorSegment = this._aes.encrypt(this._shiftRegister);

        for (var j = 0; j < this.segmentSize; j++) {
          plaintext[i + j] ^= xorSegment[j];
        }

        copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
        copyArray(ciphertext, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
      }

      return plaintext;
    };

    var ModeOfOperationOFB = function ModeOfOperationOFB(key, iv) {
      if (!(this instanceof ModeOfOperationOFB)) {
        throw Error('AES must be instanitated with `new`');
      }

      this.description = "Output Feedback";
      this.name = "ofb";

      if (!iv) {
        iv = createArray(16);
      } else if (iv.length != 16) {
        throw new Error('invalid initialation vector size (must be 16 bytes)');
      }

      this._lastPrecipher = coerceArray(iv, true);
      this._lastPrecipherIndex = 16;
      this._aes = new AES(key);
    };

    ModeOfOperationOFB.prototype.encrypt = function (plaintext) {
      var encrypted = coerceArray(plaintext, true);

      for (var i = 0; i < encrypted.length; i++) {
        if (this._lastPrecipherIndex === 16) {
          this._lastPrecipher = this._aes.encrypt(this._lastPrecipher);
          this._lastPrecipherIndex = 0;
        }

        encrypted[i] ^= this._lastPrecipher[this._lastPrecipherIndex++];
      }

      return encrypted;
    };

    ModeOfOperationOFB.prototype.decrypt = ModeOfOperationOFB.prototype.encrypt;

    var Counter = function Counter(initialValue) {
      if (!(this instanceof Counter)) {
        throw Error('Counter must be instanitated with `new`');
      }

      if (initialValue !== 0 && !initialValue) {
        initialValue = 1;
      }

      if (typeof initialValue === 'number') {
        this._counter = createArray(16);
        this.setValue(initialValue);
      } else {
        this.setBytes(initialValue);
      }
    };

    Counter.prototype.setValue = function (value) {
      if (typeof value !== 'number' || parseInt(value) != value) {
        throw new Error('invalid counter value (must be an integer)');
      }

      if (value > Number.MAX_SAFE_INTEGER) {
        throw new Error('integer value out of safe range');
      }

      for (var index = 15; index >= 0; --index) {
        this._counter[index] = value % 256;
        value = parseInt(value / 256);
      }
    };

    Counter.prototype.setBytes = function (bytes) {
      bytes = coerceArray(bytes, true);

      if (bytes.length != 16) {
        throw new Error('invalid counter bytes size (must be 16 bytes)');
      }

      this._counter = bytes;
    };

    Counter.prototype.increment = function () {
      for (var i = 15; i >= 0; i--) {
        if (this._counter[i] === 255) {
          this._counter[i] = 0;
        } else {
          this._counter[i]++;
          break;
        }
      }
    };

    var ModeOfOperationCTR = function ModeOfOperationCTR(key, counter) {
      if (!(this instanceof ModeOfOperationCTR)) {
        throw Error('AES must be instanitated with `new`');
      }

      this.description = "Counter";
      this.name = "ctr";

      if (!(counter instanceof Counter)) {
        counter = new Counter(counter);
      }

      this._counter = counter;
      this._remainingCounter = null;
      this._remainingCounterIndex = 16;
      this._aes = new AES(key);
    };

    ModeOfOperationCTR.prototype.encrypt = function (plaintext) {
      var encrypted = coerceArray(plaintext, true);

      for (var i = 0; i < encrypted.length; i++) {
        if (this._remainingCounterIndex === 16) {
          this._remainingCounter = this._aes.encrypt(this._counter._counter);
          this._remainingCounterIndex = 0;

          this._counter.increment();
        }

        encrypted[i] ^= this._remainingCounter[this._remainingCounterIndex++];
      }

      return encrypted;
    };

    ModeOfOperationCTR.prototype.decrypt = ModeOfOperationCTR.prototype.encrypt;

    function pkcs7pad(data) {
      data = coerceArray(data, true);
      var padder = 16 - data.length % 16;
      var result = createArray(data.length + padder);
      copyArray(data, result);

      for (var i = data.length; i < result.length; i++) {
        result[i] = padder;
      }

      return result;
    }

    function pkcs7strip(data) {
      data = coerceArray(data, true);

      if (data.length < 16) {
        throw new Error('PKCS#7 invalid length');
      }

      var padder = data[data.length - 1];

      if (padder > 16) {
        throw new Error('PKCS#7 padding byte out of range');
      }

      var length = data.length - padder;

      for (var i = 0; i < padder; i++) {
        if (data[length + i] !== padder) {
          throw new Error('PKCS#7 invalid padding byte');
        }
      }

      var result = createArray(length);
      copyArray(data, result, 0, 0, length);
      return result;
    }

    var aesjs = {
      AES: AES,
      Counter: Counter,
      ModeOfOperation: {
        ecb: ModeOfOperationECB,
        cbc: ModeOfOperationCBC,
        cfb: ModeOfOperationCFB,
        ofb: ModeOfOperationOFB,
        ctr: ModeOfOperationCTR
      },
      utils: {
        hex: convertHex,
        utf8: convertUtf8
      },
      padding: {
        pkcs7: {
          pad: pkcs7pad,
          strip: pkcs7strip
        }
      },
      _arrayTest: {
        coerceArray: coerceArray,
        createArray: createArray,
        copyArray: copyArray
      }
    };

    {
      module.exports = aesjs;
    }
  })();
});

var minimalisticAssert = assert;

function assert(val, msg) {
  if (!val) throw new Error(msg || 'Assertion failed');
}

assert.equal = function assertEqual(l, r, msg) {
  if (l != r) throw new Error(msg || 'Assertion failed: ' + l + ' != ' + r);
};

var inherits_browser = createCommonjsModule(function (module) {
  if (typeof Object.create === 'function') {
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;

        var TempCtor = function TempCtor() {};

        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
    };
  }
});

var inherits_1 = inherits_browser;

function isSurrogatePair(msg, i) {
  if ((msg.charCodeAt(i) & 0xFC00) !== 0xD800) {
    return false;
  }

  if (i < 0 || i + 1 >= msg.length) {
    return false;
  }

  return (msg.charCodeAt(i + 1) & 0xFC00) === 0xDC00;
}

function toArray(msg, enc) {
  if (Array.isArray(msg)) return msg.slice();
  if (!msg) return [];
  var res = [];

  if (typeof msg === 'string') {
    if (!enc) {
      var p = 0;

      for (var i = 0; i < msg.length; i++) {
        var c = msg.charCodeAt(i);

        if (c < 128) {
          res[p++] = c;
        } else if (c < 2048) {
          res[p++] = c >> 6 | 192;
          res[p++] = c & 63 | 128;
        } else if (isSurrogatePair(msg, i)) {
          c = 0x10000 + ((c & 0x03FF) << 10) + (msg.charCodeAt(++i) & 0x03FF);
          res[p++] = c >> 18 | 240;
          res[p++] = c >> 12 & 63 | 128;
          res[p++] = c >> 6 & 63 | 128;
          res[p++] = c & 63 | 128;
        } else {
          res[p++] = c >> 12 | 224;
          res[p++] = c >> 6 & 63 | 128;
          res[p++] = c & 63 | 128;
        }
      }
    } else if (enc === 'hex') {
      msg = msg.replace(/[^a-z0-9]+/ig, '');
      if (msg.length % 2 !== 0) msg = '0' + msg;

      for (i = 0; i < msg.length; i += 2) {
        res.push(parseInt(msg[i] + msg[i + 1], 16));
      }
    }
  } else {
    for (i = 0; i < msg.length; i++) {
      res[i] = msg[i] | 0;
    }
  }

  return res;
}

var toArray_1 = toArray;

function toHex(msg) {
  var res = '';

  for (var i = 0; i < msg.length; i++) {
    res += zero2(msg[i].toString(16));
  }

  return res;
}

var toHex_1 = toHex;

function htonl(w) {
  var res = w >>> 24 | w >>> 8 & 0xff00 | w << 8 & 0xff0000 | (w & 0xff) << 24;
  return res >>> 0;
}

var htonl_1 = htonl;

function toHex32(msg, endian) {
  var res = '';

  for (var i = 0; i < msg.length; i++) {
    var w = msg[i];
    if (endian === 'little') w = htonl(w);
    res += zero8(w.toString(16));
  }

  return res;
}

var toHex32_1 = toHex32;

function zero2(word) {
  if (word.length === 1) return '0' + word;else return word;
}

var zero2_1 = zero2;

function zero8(word) {
  if (word.length === 7) return '0' + word;else if (word.length === 6) return '00' + word;else if (word.length === 5) return '000' + word;else if (word.length === 4) return '0000' + word;else if (word.length === 3) return '00000' + word;else if (word.length === 2) return '000000' + word;else if (word.length === 1) return '0000000' + word;else return word;
}

var zero8_1 = zero8;

function join32(msg, start, end, endian) {
  var len = end - start;
  minimalisticAssert(len % 4 === 0);
  var res = new Array(len / 4);

  for (var i = 0, k = start; i < res.length; i++, k += 4) {
    var w;
    if (endian === 'big') w = msg[k] << 24 | msg[k + 1] << 16 | msg[k + 2] << 8 | msg[k + 3];else w = msg[k + 3] << 24 | msg[k + 2] << 16 | msg[k + 1] << 8 | msg[k];
    res[i] = w >>> 0;
  }

  return res;
}

var join32_1 = join32;

function split32(msg, endian) {
  var res = new Array(msg.length * 4);

  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
    var m = msg[i];

    if (endian === 'big') {
      res[k] = m >>> 24;
      res[k + 1] = m >>> 16 & 0xff;
      res[k + 2] = m >>> 8 & 0xff;
      res[k + 3] = m & 0xff;
    } else {
      res[k + 3] = m >>> 24;
      res[k + 2] = m >>> 16 & 0xff;
      res[k + 1] = m >>> 8 & 0xff;
      res[k] = m & 0xff;
    }
  }

  return res;
}

var split32_1 = split32;

function rotr32(w, b) {
  return w >>> b | w << 32 - b;
}

var rotr32_1 = rotr32;

function rotl32(w, b) {
  return w << b | w >>> 32 - b;
}

var rotl32_1 = rotl32;

function sum32(a, b) {
  return a + b >>> 0;
}

var sum32_1 = sum32;

function sum32_3(a, b, c) {
  return a + b + c >>> 0;
}

var sum32_3_1 = sum32_3;

function sum32_4(a, b, c, d) {
  return a + b + c + d >>> 0;
}

var sum32_4_1 = sum32_4;

function sum32_5(a, b, c, d, e) {
  return a + b + c + d + e >>> 0;
}

var sum32_5_1 = sum32_5;

function sum64(buf, pos, ah, al) {
  var bh = buf[pos];
  var bl = buf[pos + 1];
  var lo = al + bl >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  buf[pos] = hi >>> 0;
  buf[pos + 1] = lo;
}

var sum64_1 = sum64;

function sum64_hi(ah, al, bh, bl) {
  var lo = al + bl >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  return hi >>> 0;
}

var sum64_hi_1 = sum64_hi;

function sum64_lo(ah, al, bh, bl) {
  var lo = al + bl;
  return lo >>> 0;
}

var sum64_lo_1 = sum64_lo;

function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
  var carry = 0;
  var lo = al;
  lo = lo + bl >>> 0;
  carry += lo < al ? 1 : 0;
  lo = lo + cl >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = lo + dl >>> 0;
  carry += lo < dl ? 1 : 0;
  var hi = ah + bh + ch + dh + carry;
  return hi >>> 0;
}

var sum64_4_hi_1 = sum64_4_hi;

function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
  var lo = al + bl + cl + dl;
  return lo >>> 0;
}

var sum64_4_lo_1 = sum64_4_lo;

function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var carry = 0;
  var lo = al;
  lo = lo + bl >>> 0;
  carry += lo < al ? 1 : 0;
  lo = lo + cl >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = lo + dl >>> 0;
  carry += lo < dl ? 1 : 0;
  lo = lo + el >>> 0;
  carry += lo < el ? 1 : 0;
  var hi = ah + bh + ch + dh + eh + carry;
  return hi >>> 0;
}

var sum64_5_hi_1 = sum64_5_hi;

function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var lo = al + bl + cl + dl + el;
  return lo >>> 0;
}

var sum64_5_lo_1 = sum64_5_lo;

function rotr64_hi(ah, al, num) {
  var r = al << 32 - num | ah >>> num;
  return r >>> 0;
}

var rotr64_hi_1 = rotr64_hi;

function rotr64_lo(ah, al, num) {
  var r = ah << 32 - num | al >>> num;
  return r >>> 0;
}

var rotr64_lo_1 = rotr64_lo;

function shr64_hi(ah, al, num) {
  return ah >>> num;
}

var shr64_hi_1 = shr64_hi;

function shr64_lo(ah, al, num) {
  var r = ah << 32 - num | al >>> num;
  return r >>> 0;
}

var shr64_lo_1 = shr64_lo;
var utils$1 = {
  inherits: inherits_1,
  toArray: toArray_1,
  toHex: toHex_1,
  htonl: htonl_1,
  toHex32: toHex32_1,
  zero2: zero2_1,
  zero8: zero8_1,
  join32: join32_1,
  split32: split32_1,
  rotr32: rotr32_1,
  rotl32: rotl32_1,
  sum32: sum32_1,
  sum32_3: sum32_3_1,
  sum32_4: sum32_4_1,
  sum32_5: sum32_5_1,
  sum64: sum64_1,
  sum64_hi: sum64_hi_1,
  sum64_lo: sum64_lo_1,
  sum64_4_hi: sum64_4_hi_1,
  sum64_4_lo: sum64_4_lo_1,
  sum64_5_hi: sum64_5_hi_1,
  sum64_5_lo: sum64_5_lo_1,
  rotr64_hi: rotr64_hi_1,
  rotr64_lo: rotr64_lo_1,
  shr64_hi: shr64_hi_1,
  shr64_lo: shr64_lo_1
};

function BlockHash() {
  this.pending = null;
  this.pendingTotal = 0;
  this.blockSize = this.constructor.blockSize;
  this.outSize = this.constructor.outSize;
  this.hmacStrength = this.constructor.hmacStrength;
  this.padLength = this.constructor.padLength / 8;
  this.endian = 'big';
  this._delta8 = this.blockSize / 8;
  this._delta32 = this.blockSize / 32;
}

var BlockHash_1 = BlockHash;

BlockHash.prototype.update = function update(msg, enc) {
  msg = utils$1.toArray(msg, enc);
  if (!this.pending) this.pending = msg;else this.pending = this.pending.concat(msg);
  this.pendingTotal += msg.length;

  if (this.pending.length >= this._delta8) {
    msg = this.pending;
    var r = msg.length % this._delta8;
    this.pending = msg.slice(msg.length - r, msg.length);
    if (this.pending.length === 0) this.pending = null;
    msg = utils$1.join32(msg, 0, msg.length - r, this.endian);

    for (var i = 0; i < msg.length; i += this._delta32) {
      this._update(msg, i, i + this._delta32);
    }
  }

  return this;
};

BlockHash.prototype.digest = function digest(enc) {
  this.update(this._pad());
  minimalisticAssert(this.pending === null);
  return this._digest(enc);
};

BlockHash.prototype._pad = function pad() {
  var len = this.pendingTotal;
  var bytes = this._delta8;
  var k = bytes - (len + this.padLength) % bytes;
  var res = new Array(k + this.padLength);
  res[0] = 0x80;

  for (var i = 1; i < k; i++) {
    res[i] = 0;
  }

  len <<= 3;

  if (this.endian === 'big') {
    for (var t = 8; t < this.padLength; t++) {
      res[i++] = 0;
    }

    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = len >>> 24 & 0xff;
    res[i++] = len >>> 16 & 0xff;
    res[i++] = len >>> 8 & 0xff;
    res[i++] = len & 0xff;
  } else {
    res[i++] = len & 0xff;
    res[i++] = len >>> 8 & 0xff;
    res[i++] = len >>> 16 & 0xff;
    res[i++] = len >>> 24 & 0xff;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;

    for (t = 8; t < this.padLength; t++) {
      res[i++] = 0;
    }
  }

  return res;
};

var common = {
  BlockHash: BlockHash_1
};

var rotr32$1 = utils$1.rotr32;

function ft_1(s, x, y, z) {
  if (s === 0) return ch32(x, y, z);
  if (s === 1 || s === 3) return p32(x, y, z);
  if (s === 2) return maj32(x, y, z);
}

var ft_1_1 = ft_1;

function ch32(x, y, z) {
  return x & y ^ ~x & z;
}

var ch32_1 = ch32;

function maj32(x, y, z) {
  return x & y ^ x & z ^ y & z;
}

var maj32_1 = maj32;

function p32(x, y, z) {
  return x ^ y ^ z;
}

var p32_1 = p32;

function s0_256(x) {
  return rotr32$1(x, 2) ^ rotr32$1(x, 13) ^ rotr32$1(x, 22);
}

var s0_256_1 = s0_256;

function s1_256(x) {
  return rotr32$1(x, 6) ^ rotr32$1(x, 11) ^ rotr32$1(x, 25);
}

var s1_256_1 = s1_256;

function g0_256(x) {
  return rotr32$1(x, 7) ^ rotr32$1(x, 18) ^ x >>> 3;
}

var g0_256_1 = g0_256;

function g1_256(x) {
  return rotr32$1(x, 17) ^ rotr32$1(x, 19) ^ x >>> 10;
}

var g1_256_1 = g1_256;
var common$1 = {
  ft_1: ft_1_1,
  ch32: ch32_1,
  maj32: maj32_1,
  p32: p32_1,
  s0_256: s0_256_1,
  s1_256: s1_256_1,
  g0_256: g0_256_1,
  g1_256: g1_256_1
};

var rotl32$1 = utils$1.rotl32;
var sum32$1 = utils$1.sum32;
var sum32_5$1 = utils$1.sum32_5;
var ft_1$1 = common$1.ft_1;
var BlockHash$1 = common.BlockHash;
var sha1_K = [0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xCA62C1D6];

function SHA1() {
  if (!(this instanceof SHA1)) return new SHA1();
  BlockHash$1.call(this);
  this.h = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
  this.W = new Array(80);
}

utils$1.inherits(SHA1, BlockHash$1);
var _1 = SHA1;
SHA1.blockSize = 512;
SHA1.outSize = 160;
SHA1.hmacStrength = 80;
SHA1.padLength = 64;

SHA1.prototype._update = function _update(msg, start) {
  var W = this.W;

  for (var i = 0; i < 16; i++) {
    W[i] = msg[start + i];
  }

  for (; i < W.length; i++) {
    W[i] = rotl32$1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
  }

  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];

  for (i = 0; i < W.length; i++) {
    var s = ~~(i / 20);
    var t = sum32_5$1(rotl32$1(a, 5), ft_1$1(s, b, c, d), e, W[i], sha1_K[s]);
    e = d;
    d = c;
    c = rotl32$1(b, 30);
    b = a;
    a = t;
  }

  this.h[0] = sum32$1(this.h[0], a);
  this.h[1] = sum32$1(this.h[1], b);
  this.h[2] = sum32$1(this.h[2], c);
  this.h[3] = sum32$1(this.h[3], d);
  this.h[4] = sum32$1(this.h[4], e);
};

SHA1.prototype._digest = function digest(enc) {
  if (enc === 'hex') return utils$1.toHex32(this.h, 'big');else return utils$1.split32(this.h, 'big');
};

var sum32$2 = utils$1.sum32;
var sum32_4$1 = utils$1.sum32_4;
var sum32_5$2 = utils$1.sum32_5;
var ch32$1 = common$1.ch32;
var maj32$1 = common$1.maj32;
var s0_256$1 = common$1.s0_256;
var s1_256$1 = common$1.s1_256;
var g0_256$1 = common$1.g0_256;
var g1_256$1 = common$1.g1_256;
var BlockHash$2 = common.BlockHash;
var sha256_K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];

function SHA256() {
  if (!(this instanceof SHA256)) return new SHA256();
  BlockHash$2.call(this);
  this.h = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
  this.k = sha256_K;
  this.W = new Array(64);
}

utils$1.inherits(SHA256, BlockHash$2);
var _256 = SHA256;
SHA256.blockSize = 512;
SHA256.outSize = 256;
SHA256.hmacStrength = 192;
SHA256.padLength = 64;

SHA256.prototype._update = function _update(msg, start) {
  var W = this.W;

  for (var i = 0; i < 16; i++) {
    W[i] = msg[start + i];
  }

  for (; i < W.length; i++) {
    W[i] = sum32_4$1(g1_256$1(W[i - 2]), W[i - 7], g0_256$1(W[i - 15]), W[i - 16]);
  }

  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];
  var f = this.h[5];
  var g = this.h[6];
  var h = this.h[7];
  minimalisticAssert(this.k.length === W.length);

  for (i = 0; i < W.length; i++) {
    var T1 = sum32_5$2(h, s1_256$1(e), ch32$1(e, f, g), this.k[i], W[i]);
    var T2 = sum32$2(s0_256$1(a), maj32$1(a, b, c));
    h = g;
    g = f;
    f = e;
    e = sum32$2(d, T1);
    d = c;
    c = b;
    b = a;
    a = sum32$2(T1, T2);
  }

  this.h[0] = sum32$2(this.h[0], a);
  this.h[1] = sum32$2(this.h[1], b);
  this.h[2] = sum32$2(this.h[2], c);
  this.h[3] = sum32$2(this.h[3], d);
  this.h[4] = sum32$2(this.h[4], e);
  this.h[5] = sum32$2(this.h[5], f);
  this.h[6] = sum32$2(this.h[6], g);
  this.h[7] = sum32$2(this.h[7], h);
};

SHA256.prototype._digest = function digest(enc) {
  if (enc === 'hex') return utils$1.toHex32(this.h, 'big');else return utils$1.split32(this.h, 'big');
};

function SHA224() {
  if (!(this instanceof SHA224)) return new SHA224();
  _256.call(this);
  this.h = [0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4];
}

utils$1.inherits(SHA224, _256);
var _224 = SHA224;
SHA224.blockSize = 512;
SHA224.outSize = 224;
SHA224.hmacStrength = 192;
SHA224.padLength = 64;

SHA224.prototype._digest = function digest(enc) {
  if (enc === 'hex') return utils$1.toHex32(this.h.slice(0, 7), 'big');else return utils$1.split32(this.h.slice(0, 7), 'big');
};

var rotr64_hi$1 = utils$1.rotr64_hi;
var rotr64_lo$1 = utils$1.rotr64_lo;
var shr64_hi$1 = utils$1.shr64_hi;
var shr64_lo$1 = utils$1.shr64_lo;
var sum64$1 = utils$1.sum64;
var sum64_hi$1 = utils$1.sum64_hi;
var sum64_lo$1 = utils$1.sum64_lo;
var sum64_4_hi$1 = utils$1.sum64_4_hi;
var sum64_4_lo$1 = utils$1.sum64_4_lo;
var sum64_5_hi$1 = utils$1.sum64_5_hi;
var sum64_5_lo$1 = utils$1.sum64_5_lo;
var BlockHash$3 = common.BlockHash;
var sha512_K = [0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd, 0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc, 0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019, 0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118, 0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe, 0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2, 0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1, 0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694, 0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3, 0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65, 0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483, 0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5, 0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210, 0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4, 0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725, 0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70, 0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926, 0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df, 0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8, 0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b, 0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001, 0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30, 0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910, 0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8, 0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53, 0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8, 0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb, 0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3, 0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60, 0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec, 0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9, 0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b, 0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207, 0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178, 0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6, 0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b, 0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493, 0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c, 0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a, 0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817];

function SHA512() {
  if (!(this instanceof SHA512)) return new SHA512();
  BlockHash$3.call(this);
  this.h = [0x6a09e667, 0xf3bcc908, 0xbb67ae85, 0x84caa73b, 0x3c6ef372, 0xfe94f82b, 0xa54ff53a, 0x5f1d36f1, 0x510e527f, 0xade682d1, 0x9b05688c, 0x2b3e6c1f, 0x1f83d9ab, 0xfb41bd6b, 0x5be0cd19, 0x137e2179];
  this.k = sha512_K;
  this.W = new Array(160);
}

utils$1.inherits(SHA512, BlockHash$3);
var _512 = SHA512;
SHA512.blockSize = 1024;
SHA512.outSize = 512;
SHA512.hmacStrength = 192;
SHA512.padLength = 128;

SHA512.prototype._prepareBlock = function _prepareBlock(msg, start) {
  var W = this.W;

  for (var i = 0; i < 32; i++) {
    W[i] = msg[start + i];
  }

  for (; i < W.length; i += 2) {
    var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);
    var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
    var c1_hi = W[i - 14];
    var c1_lo = W[i - 13];
    var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);
    var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
    var c3_hi = W[i - 32];
    var c3_lo = W[i - 31];
    W[i] = sum64_4_hi$1(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo);
    W[i + 1] = sum64_4_lo$1(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo);
  }
};

SHA512.prototype._update = function _update(msg, start) {
  this._prepareBlock(msg, start);

  var W = this.W;
  var ah = this.h[0];
  var al = this.h[1];
  var bh = this.h[2];
  var bl = this.h[3];
  var ch = this.h[4];
  var cl = this.h[5];
  var dh = this.h[6];
  var dl = this.h[7];
  var eh = this.h[8];
  var el = this.h[9];
  var fh = this.h[10];
  var fl = this.h[11];
  var gh = this.h[12];
  var gl = this.h[13];
  var hh = this.h[14];
  var hl = this.h[15];
  minimalisticAssert(this.k.length === W.length);

  for (var i = 0; i < W.length; i += 2) {
    var c0_hi = hh;
    var c0_lo = hl;
    var c1_hi = s1_512_hi(eh, el);
    var c1_lo = s1_512_lo(eh, el);
    var c2_hi = ch64_hi(eh, el, fh, fl, gh);
    var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
    var c3_hi = this.k[i];
    var c3_lo = this.k[i + 1];
    var c4_hi = W[i];
    var c4_lo = W[i + 1];
    var T1_hi = sum64_5_hi$1(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo, c4_hi, c4_lo);
    var T1_lo = sum64_5_lo$1(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo, c4_hi, c4_lo);
    c0_hi = s0_512_hi(ah, al);
    c0_lo = s0_512_lo(ah, al);
    c1_hi = maj64_hi(ah, al, bh, bl, ch);
    c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);
    var T2_hi = sum64_hi$1(c0_hi, c0_lo, c1_hi, c1_lo);
    var T2_lo = sum64_lo$1(c0_hi, c0_lo, c1_hi, c1_lo);
    hh = gh;
    hl = gl;
    gh = fh;
    gl = fl;
    fh = eh;
    fl = el;
    eh = sum64_hi$1(dh, dl, T1_hi, T1_lo);
    el = sum64_lo$1(dl, dl, T1_hi, T1_lo);
    dh = ch;
    dl = cl;
    ch = bh;
    cl = bl;
    bh = ah;
    bl = al;
    ah = sum64_hi$1(T1_hi, T1_lo, T2_hi, T2_lo);
    al = sum64_lo$1(T1_hi, T1_lo, T2_hi, T2_lo);
  }

  sum64$1(this.h, 0, ah, al);
  sum64$1(this.h, 2, bh, bl);
  sum64$1(this.h, 4, ch, cl);
  sum64$1(this.h, 6, dh, dl);
  sum64$1(this.h, 8, eh, el);
  sum64$1(this.h, 10, fh, fl);
  sum64$1(this.h, 12, gh, gl);
  sum64$1(this.h, 14, hh, hl);
};

SHA512.prototype._digest = function digest(enc) {
  if (enc === 'hex') return utils$1.toHex32(this.h, 'big');else return utils$1.split32(this.h, 'big');
};

function ch64_hi(xh, xl, yh, yl, zh) {
  var r = xh & yh ^ ~xh & zh;
  if (r < 0) r += 0x100000000;
  return r;
}

function ch64_lo(xh, xl, yh, yl, zh, zl) {
  var r = xl & yl ^ ~xl & zl;
  if (r < 0) r += 0x100000000;
  return r;
}

function maj64_hi(xh, xl, yh, yl, zh) {
  var r = xh & yh ^ xh & zh ^ yh & zh;
  if (r < 0) r += 0x100000000;
  return r;
}

function maj64_lo(xh, xl, yh, yl, zh, zl) {
  var r = xl & yl ^ xl & zl ^ yl & zl;
  if (r < 0) r += 0x100000000;
  return r;
}

function s0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi$1(xh, xl, 28);
  var c1_hi = rotr64_hi$1(xl, xh, 2);
  var c2_hi = rotr64_hi$1(xl, xh, 7);
  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0) r += 0x100000000;
  return r;
}

function s0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo$1(xh, xl, 28);
  var c1_lo = rotr64_lo$1(xl, xh, 2);
  var c2_lo = rotr64_lo$1(xl, xh, 7);
  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0) r += 0x100000000;
  return r;
}

function s1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi$1(xh, xl, 14);
  var c1_hi = rotr64_hi$1(xh, xl, 18);
  var c2_hi = rotr64_hi$1(xl, xh, 9);
  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0) r += 0x100000000;
  return r;
}

function s1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo$1(xh, xl, 14);
  var c1_lo = rotr64_lo$1(xh, xl, 18);
  var c2_lo = rotr64_lo$1(xl, xh, 9);
  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0) r += 0x100000000;
  return r;
}

function g0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi$1(xh, xl, 1);
  var c1_hi = rotr64_hi$1(xh, xl, 8);
  var c2_hi = shr64_hi$1(xh, xl, 7);
  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0) r += 0x100000000;
  return r;
}

function g0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo$1(xh, xl, 1);
  var c1_lo = rotr64_lo$1(xh, xl, 8);
  var c2_lo = shr64_lo$1(xh, xl, 7);
  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0) r += 0x100000000;
  return r;
}

function g1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi$1(xh, xl, 19);
  var c1_hi = rotr64_hi$1(xl, xh, 29);
  var c2_hi = shr64_hi$1(xh, xl, 6);
  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0) r += 0x100000000;
  return r;
}

function g1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo$1(xh, xl, 19);
  var c1_lo = rotr64_lo$1(xl, xh, 29);
  var c2_lo = shr64_lo$1(xh, xl, 6);
  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0) r += 0x100000000;
  return r;
}

function SHA384() {
  if (!(this instanceof SHA384)) return new SHA384();
  _512.call(this);
  this.h = [0xcbbb9d5d, 0xc1059ed8, 0x629a292a, 0x367cd507, 0x9159015a, 0x3070dd17, 0x152fecd8, 0xf70e5939, 0x67332667, 0xffc00b31, 0x8eb44a87, 0x68581511, 0xdb0c2e0d, 0x64f98fa7, 0x47b5481d, 0xbefa4fa4];
}

utils$1.inherits(SHA384, _512);
var _384 = SHA384;
SHA384.blockSize = 1024;
SHA384.outSize = 384;
SHA384.hmacStrength = 192;
SHA384.padLength = 128;

SHA384.prototype._digest = function digest(enc) {
  if (enc === 'hex') return utils$1.toHex32(this.h.slice(0, 12), 'big');else return utils$1.split32(this.h.slice(0, 12), 'big');
};

var sha1 = _1;
var sha224 = _224;
var sha256 = _256;
var sha384 = _384;
var sha512 = _512;
var sha = {
  sha1: sha1,
  sha224: sha224,
  sha256: sha256,
  sha384: sha384,
  sha512: sha512
};

var rotl32$2 = utils$1.rotl32;
var sum32$3 = utils$1.sum32;
var sum32_3$1 = utils$1.sum32_3;
var sum32_4$2 = utils$1.sum32_4;
var BlockHash$4 = common.BlockHash;

function RIPEMD160() {
  if (!(this instanceof RIPEMD160)) return new RIPEMD160();
  BlockHash$4.call(this);
  this.h = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
  this.endian = 'little';
}

utils$1.inherits(RIPEMD160, BlockHash$4);
var ripemd160 = RIPEMD160;
RIPEMD160.blockSize = 512;
RIPEMD160.outSize = 160;
RIPEMD160.hmacStrength = 192;
RIPEMD160.padLength = 64;

RIPEMD160.prototype._update = function update(msg, start) {
  var A = this.h[0];
  var B = this.h[1];
  var C = this.h[2];
  var D = this.h[3];
  var E = this.h[4];
  var Ah = A;
  var Bh = B;
  var Ch = C;
  var Dh = D;
  var Eh = E;

  for (var j = 0; j < 80; j++) {
    var T = sum32$3(rotl32$2(sum32_4$2(A, f(j, B, C, D), msg[r[j] + start], K(j)), s[j]), E);
    A = E;
    E = D;
    D = rotl32$2(C, 10);
    C = B;
    B = T;
    T = sum32$3(rotl32$2(sum32_4$2(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)), sh[j]), Eh);
    Ah = Eh;
    Eh = Dh;
    Dh = rotl32$2(Ch, 10);
    Ch = Bh;
    Bh = T;
  }

  T = sum32_3$1(this.h[1], C, Dh);
  this.h[1] = sum32_3$1(this.h[2], D, Eh);
  this.h[2] = sum32_3$1(this.h[3], E, Ah);
  this.h[3] = sum32_3$1(this.h[4], A, Bh);
  this.h[4] = sum32_3$1(this.h[0], B, Ch);
  this.h[0] = T;
};

RIPEMD160.prototype._digest = function digest(enc) {
  if (enc === 'hex') return utils$1.toHex32(this.h, 'little');else return utils$1.split32(this.h, 'little');
};

function f(j, x, y, z) {
  if (j <= 15) return x ^ y ^ z;else if (j <= 31) return x & y | ~x & z;else if (j <= 47) return (x | ~y) ^ z;else if (j <= 63) return x & z | y & ~z;else return x ^ (y | ~z);
}

function K(j) {
  if (j <= 15) return 0x00000000;else if (j <= 31) return 0x5a827999;else if (j <= 47) return 0x6ed9eba1;else if (j <= 63) return 0x8f1bbcdc;else return 0xa953fd4e;
}

function Kh(j) {
  if (j <= 15) return 0x50a28be6;else if (j <= 31) return 0x5c4dd124;else if (j <= 47) return 0x6d703ef3;else if (j <= 63) return 0x7a6d76e9;else return 0x00000000;
}

var r = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13];
var rh = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11];
var s = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6];
var sh = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];
var ripemd = {
  ripemd160: ripemd160
};

function Hmac(hash, key, enc) {
  if (!(this instanceof Hmac)) return new Hmac(hash, key, enc);
  this.Hash = hash;
  this.blockSize = hash.blockSize / 8;
  this.outSize = hash.outSize / 8;
  this.inner = null;
  this.outer = null;

  this._init(utils$1.toArray(key, enc));
}

var hmac = Hmac;

Hmac.prototype._init = function init(key) {
  if (key.length > this.blockSize) key = new this.Hash().update(key).digest();
  minimalisticAssert(key.length <= this.blockSize);

  for (var i = key.length; i < this.blockSize; i++) {
    key.push(0);
  }

  for (i = 0; i < key.length; i++) {
    key[i] ^= 0x36;
  }

  this.inner = new this.Hash().update(key);

  for (i = 0; i < key.length; i++) {
    key[i] ^= 0x6a;
  }

  this.outer = new this.Hash().update(key);
};

Hmac.prototype.update = function update(msg, enc) {
  this.inner.update(msg, enc);
  return this;
};

Hmac.prototype.digest = function digest(enc) {
  this.outer.update(this.inner.digest());
  return this.outer.digest(enc);
};

var hash_1 = createCommonjsModule(function (module, exports) {
  var hash = exports;
  hash.utils = utils$1;
  hash.common = common;
  hash.sha = sha;
  hash.ripemd = ripemd;
  hash.hmac = hmac;
  hash.sha1 = hash.sha.sha1;
  hash.sha256 = hash.sha.sha256;
  hash.sha224 = hash.sha.sha224;
  hash.sha384 = hash.sha.sha384;
  hash.sha512 = hash.sha.sha512;
  hash.ripemd160 = hash.ripemd.ripemd160;
});

var isTypedarray = isTypedArray;
isTypedArray.strict = isStrictTypedArray;
isTypedArray.loose = isLooseTypedArray;
var toString = Object.prototype.toString;
var names = {
  '[object Int8Array]': true,
  '[object Int16Array]': true,
  '[object Int32Array]': true,
  '[object Uint8Array]': true,
  '[object Uint8ClampedArray]': true,
  '[object Uint16Array]': true,
  '[object Uint32Array]': true,
  '[object Float32Array]': true,
  '[object Float64Array]': true
};

function isTypedArray(arr) {
  return isStrictTypedArray(arr) || isLooseTypedArray(arr);
}

function isStrictTypedArray(arr) {
  return arr instanceof Int8Array || arr instanceof Int16Array || arr instanceof Int32Array || arr instanceof Uint8Array || arr instanceof Uint8ClampedArray || arr instanceof Uint16Array || arr instanceof Uint32Array || arr instanceof Float32Array || arr instanceof Float64Array;
}

function isLooseTypedArray(arr) {
  return names[toString.call(arr)];
}

var isTypedArray$1 = isTypedarray.strict;

var typedarrayToBuffer = function typedarrayToBuffer(arr) {
  if (isTypedArray$1(arr)) {
    var buf = Buffer.from(arr.buffer);

    if (arr.byteLength !== arr.buffer.byteLength) {
      buf = buf.slice(arr.byteOffset, arr.byteOffset + arr.byteLength);
    }

    return buf;
  } else {
    return Buffer.from(arr);
  }
};

var cjs$4 = createCommonjsModule(function (module, exports) {

  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var is_typedarray_1 = __importDefault(isTypedarray);

  var typedarray_to_buffer_1 = __importDefault(typedarrayToBuffer);

  var ENC_HEX = 'hex';
  var ENC_UTF8 = 'utf8';
  var ENC_BIN = 'binary';
  var TYPE_BUFFER = 'buffer';
  var TYPE_ARRAY = 'array';
  var TYPE_TYPED_ARRAY = 'typed-array';
  var TYPE_ARRAY_BUFFER = 'array-buffer';
  var STRING_ZERO = '0';

  function bufferToArray(buf) {
    return new Uint8Array(buf);
  }

  exports.bufferToArray = bufferToArray;

  function bufferToHex(buf, prefixed) {
    if (prefixed === void 0) {
      prefixed = false;
    }

    var hex = buf.toString(ENC_HEX);
    return prefixed ? addHexPrefix(hex) : hex;
  }

  exports.bufferToHex = bufferToHex;

  function bufferToUtf8(buf) {
    return buf.toString(ENC_UTF8);
  }

  exports.bufferToUtf8 = bufferToUtf8;

  function bufferToNumber(buf) {
    return buf.readUIntBE(0, buf.length);
  }

  exports.bufferToNumber = bufferToNumber;

  function bufferToBinary(buf) {
    return arrayToBinary(bufferToArray(buf));
  }

  exports.bufferToBinary = bufferToBinary;

  function arrayToBuffer(arr) {
    return typedarray_to_buffer_1["default"](arr);
  }

  exports.arrayToBuffer = arrayToBuffer;

  function arrayToHex(arr, prefixed) {
    if (prefixed === void 0) {
      prefixed = false;
    }

    return bufferToHex(arrayToBuffer(arr), prefixed);
  }

  exports.arrayToHex = arrayToHex;

  function arrayToUtf8(arr) {
    return bufferToUtf8(arrayToBuffer(arr));
  }

  exports.arrayToUtf8 = arrayToUtf8;

  function arrayToNumber(arr) {
    return bufferToNumber(arrayToBuffer(arr));
  }

  exports.arrayToNumber = arrayToNumber;

  function arrayToBinary(arr) {
    return Array.from(arr).map(numberToBinary).join('');
  }

  exports.arrayToBinary = arrayToBinary;

  function hexToBuffer(hex) {
    return Buffer.from(removeHexPrefix(hex), ENC_HEX);
  }

  exports.hexToBuffer = hexToBuffer;

  function hexToArray(hex) {
    return bufferToArray(hexToBuffer(hex));
  }

  exports.hexToArray = hexToArray;

  function hexToUtf8(hex) {
    return bufferToUtf8(hexToBuffer(hex));
  }

  exports.hexToUtf8 = hexToUtf8;

  function hexToNumber(hex) {
    return arrayToNumber(hexToArray(hex));
  }

  exports.hexToNumber = hexToNumber;

  function hexToBinary(hex) {
    return arrayToBinary(hexToArray(hex));
  }

  exports.hexToBinary = hexToBinary;

  function utf8ToBuffer(utf8) {
    return Buffer.from(utf8, ENC_UTF8);
  }

  exports.utf8ToBuffer = utf8ToBuffer;

  function utf8ToArray(utf8) {
    return bufferToArray(utf8ToBuffer(utf8));
  }

  exports.utf8ToArray = utf8ToArray;

  function utf8ToHex(utf8, prefixed) {
    if (prefixed === void 0) {
      prefixed = false;
    }

    return bufferToHex(utf8ToBuffer(utf8), prefixed);
  }

  exports.utf8ToHex = utf8ToHex;

  function utf8ToNumber(utf8) {
    var num = parseInt(utf8, 10);
    assert(isDefined(num), 'Number can only safely store up to 53 bits');
    return num;
  }

  exports.utf8ToNumber = utf8ToNumber;

  function utf8ToBinary(utf8) {
    return arrayToBinary(utf8ToArray(utf8));
  }

  exports.utf8ToBinary = utf8ToBinary;

  function numberToBuffer(num) {
    return binaryToBuffer(numberToBinary(num));
  }

  exports.numberToBuffer = numberToBuffer;

  function numberToArray(num) {
    return binaryToArray(numberToBinary(num));
  }

  exports.numberToArray = numberToArray;

  function numberToHex(num, prefixed) {
    return binaryToHex(numberToBinary(num), prefixed);
  }

  exports.numberToHex = numberToHex;

  function numberToUtf8(num) {
    return "" + num;
  }

  exports.numberToUtf8 = numberToUtf8;

  function numberToBinary(num) {
    var bin = (num >>> 0).toString(2);
    return sanitizeBytes(bin);
  }

  exports.numberToBinary = numberToBinary;

  function binaryToBuffer(bin) {
    return arrayToBuffer(binaryToArray(bin));
  }

  exports.binaryToBuffer = binaryToBuffer;

  function binaryToArray(bin) {
    return new Uint8Array(splitBytes(bin).map(function (x) {
      return parseInt(x, 2);
    }));
  }

  exports.binaryToArray = binaryToArray;

  function binaryToHex(bin, prefixed) {
    return arrayToHex(binaryToArray(bin), prefixed);
  }

  exports.binaryToHex = binaryToHex;

  function binaryToUtf8(bin) {
    return arrayToUtf8(binaryToArray(bin));
  }

  exports.binaryToUtf8 = binaryToUtf8;

  function binaryToNumber(bin) {
    return arrayToNumber(binaryToArray(bin));
  }

  exports.binaryToNumber = binaryToNumber;

  function isBinaryString(str) {
    if (typeof str !== 'string' || !new RegExp(/^[01]+$/).test(str)) {
      return false;
    }

    if (str.length % 8 !== 0) {
      return false;
    }

    return true;
  }

  exports.isBinaryString = isBinaryString;

  function isHexString(str, length) {
    if (typeof str !== 'string' || !str.match(/^0x[0-9A-Fa-f]*$/)) {
      return false;
    }

    if (length && str.length !== 2 + 2 * length) {
      return false;
    }

    return true;
  }

  exports.isHexString = isHexString;

  function isBuffer(val) {
    return Buffer.isBuffer(val);
  }

  exports.isBuffer = isBuffer;

  function isTypedArray(val) {
    return is_typedarray_1["default"].strict(val) && !isBuffer(val);
  }

  exports.isTypedArray = isTypedArray;

  function isArrayBuffer(val) {
    return !isTypedArray(val) && !isBuffer(val) && typeof val.byteLength !== 'undefined';
  }

  exports.isArrayBuffer = isArrayBuffer;

  function getType(val) {
    if (isBuffer(val)) {
      return TYPE_BUFFER;
    } else if (isTypedArray(val)) {
      return TYPE_TYPED_ARRAY;
    } else if (isArrayBuffer(val)) {
      return TYPE_ARRAY_BUFFER;
    } else if (Array.isArray(val)) {
      return TYPE_ARRAY;
    } else {
      return typeof val;
    }
  }

  exports.getType = getType;

  function getEncoding(str) {
    if (isBinaryString(str)) {
      return ENC_BIN;
    }

    if (isHexString(str)) {
      return ENC_HEX;
    }

    return ENC_UTF8;
  }

  exports.getEncoding = getEncoding;

  function concatBuffers() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var result = Buffer.concat(args);
    return result;
  }

  exports.concatBuffers = concatBuffers;

  function concatArrays() {
    var result = [];

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    args.forEach(function (arg) {
      return result = result.concat(Array.from(arg));
    });
    return new Uint8Array([].concat(result));
  }

  exports.concatArrays = concatArrays;

  function trimLeft(data, length) {
    var diff = data.length - length;

    if (diff > 0) {
      data = data.slice(diff);
    }

    return data;
  }

  exports.trimLeft = trimLeft;

  function trimRight(data, length) {
    return data.slice(0, length);
  }

  exports.trimRight = trimRight;

  function calcByteLength(length, byteSize) {
    if (byteSize === void 0) {
      byteSize = 8;
    }

    var remainder = length % byteSize;
    return remainder ? (length - remainder) / byteSize * byteSize + byteSize : length;
  }

  exports.calcByteLength = calcByteLength;

  function splitBytes(str, byteSize) {
    if (byteSize === void 0) {
      byteSize = 8;
    }

    var bytes = sanitizeBytes(str).match(new RegExp(".{" + byteSize + "}", 'gi'));
    return Array.from(bytes || []);
  }

  exports.splitBytes = splitBytes;

  function swapBytes(str) {
    return splitBytes(str).map(reverseString).join('');
  }

  exports.swapBytes = swapBytes;

  function swapHex(str) {
    return binaryToHex(swapBytes(hexToBinary(str)));
  }

  exports.swapHex = swapHex;

  function sanitizeBytes(str, byteSize, padding) {
    if (byteSize === void 0) {
      byteSize = 8;
    }

    if (padding === void 0) {
      padding = STRING_ZERO;
    }

    return padLeft(str, calcByteLength(str.length, byteSize), padding);
  }

  exports.sanitizeBytes = sanitizeBytes;

  function padLeft(str, length, padding) {
    if (padding === void 0) {
      padding = STRING_ZERO;
    }

    return padString(str, length, true, padding);
  }

  exports.padLeft = padLeft;

  function padRight(str, length, padding) {
    if (padding === void 0) {
      padding = STRING_ZERO;
    }

    return padString(str, length, false, padding);
  }

  exports.padRight = padRight;

  function removeHexPrefix(hex) {
    return hex.replace(/^0x/, '');
  }

  exports.removeHexPrefix = removeHexPrefix;

  function addHexPrefix(hex) {
    return hex.startsWith('0x') ? hex : "0x" + hex;
  }

  exports.addHexPrefix = addHexPrefix;

  function sanitizeHex(hex) {
    hex = removeHexPrefix(hex);
    hex = sanitizeBytes(hex, 2);

    if (hex) {
      hex = addHexPrefix(hex);
    }

    return hex;
  }

  exports.sanitizeHex = sanitizeHex;

  function removeHexLeadingZeros(hex) {
    var prefixed = hex.startsWith('0x');
    hex = removeHexPrefix(hex);
    hex = hex.startsWith(STRING_ZERO) ? hex.substring(1) : hex;
    return prefixed ? addHexPrefix(hex) : hex;
  }

  exports.removeHexLeadingZeros = removeHexLeadingZeros;

  function isUndefined(value) {
    return typeof value === 'undefined';
  }

  function isDefined(value) {
    return !isUndefined(value);
  }

  function assert(assertion, errorMessage) {
    if (!assertion) {
      throw new Error(errorMessage);
    }
  }

  function reverseString(str) {
    return str.split('').reverse().join('');
  }

  function padString(str, length, left, padding) {
    if (padding === void 0) {
      padding = STRING_ZERO;
    }

    var diff = length - str.length;
    var result = str;

    if (diff > 0) {
      var pad = padding.repeat(diff);
      result = left ? pad + str : str + pad;
    }

    return result;
  }
});
unwrapExports(cjs$4);

var fallback = createCommonjsModule(function (module, exports) {

  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    });
  } : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
  });

  var __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function (o, v) {
    Object.defineProperty(o, "default", {
      enumerable: true,
      value: v
    });
  } : function (o, v) {
    o["default"] = v;
  });

  var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) {
      if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }

    __setModuleDefault(result, mod);

    return result;
  };

  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fallbackRipemd160 = exports.fallbackSha512 = exports.fallbackSha256 = exports.fallbackHmacSha512Sign = exports.fallbackHmacSha256Sign = exports.fallbackAesDecrypt = exports.fallbackAesEncrypt = void 0;

  var aes_js_1 = __importDefault(aesJs);

  var hash = __importStar(hash_1);

  function fallbackAesEncrypt(iv, key, data) {
    var aesCbc = new aes_js_1["default"].ModeOfOperation.cbc(key, iv);
    var padded = helpers.pkcs7.pad(data);
    var encryptedBytes = aesCbc.encrypt(padded);
    return new Uint8Array(encryptedBytes);
  }

  exports.fallbackAesEncrypt = fallbackAesEncrypt;

  function fallbackAesDecrypt(iv, key, data) {
    var aesCbc = new aes_js_1["default"].ModeOfOperation.cbc(key, iv);
    var encryptedBytes = aesCbc.decrypt(data);
    var padded = new Uint8Array(encryptedBytes);
    var result = helpers.pkcs7.unpad(padded);
    return result;
  }

  exports.fallbackAesDecrypt = fallbackAesDecrypt;

  function fallbackHmacSha256Sign(key, data) {
    var result = hash.hmac(hash[constants.SHA256_NODE_ALGO], key).update(data).digest(constants.HEX_ENC);
    return cjs$4.hexToArray(result);
  }

  exports.fallbackHmacSha256Sign = fallbackHmacSha256Sign;

  function fallbackHmacSha512Sign(key, data) {
    var result = hash.hmac(hash[constants.SHA512_NODE_ALGO], key).update(data).digest(constants.HEX_ENC);
    return cjs$4.hexToArray(result);
  }

  exports.fallbackHmacSha512Sign = fallbackHmacSha512Sign;

  function fallbackSha256(msg) {
    var result = hash.sha256().update(msg).digest(constants.HEX_ENC);
    return cjs$4.hexToArray(result);
  }

  exports.fallbackSha256 = fallbackSha256;

  function fallbackSha512(msg) {
    var result = hash.sha512().update(msg).digest(constants.HEX_ENC);
    return cjs$4.hexToArray(result);
  }

  exports.fallbackSha512 = fallbackSha512;

  function fallbackRipemd160(msg) {
    var result = hash.ripemd160().update(msg).digest(constants.HEX_ENC);
    return cjs$4.hexToArray(result);
  }

  exports.fallbackRipemd160 = fallbackRipemd160;
});
unwrapExports(fallback);

var node = createCommonjsModule(function (module, exports) {

  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.nodeRipemd160 = exports.nodeSha512 = exports.nodeSha256 = exports.nodeHmacSha512Sign = exports.nodeHmacSha256Sign = exports.nodeAesDecrypt = exports.nodeAesEncrypt = void 0;

  var crypto_1 = __importDefault(crypto$3);

  function nodeAesEncrypt(iv, key, data) {
    var cipher = crypto_1["default"].createCipheriv(constants.AES_NODE_ALGO, key, iv);
    return cjs$4.bufferToArray(cjs$4.concatBuffers(cipher.update(data), cipher["final"]()));
  }

  exports.nodeAesEncrypt = nodeAesEncrypt;

  function nodeAesDecrypt(iv, key, data) {
    var decipher = crypto_1["default"].createDecipheriv(constants.AES_NODE_ALGO, key, iv);
    return cjs$4.bufferToArray(cjs$4.concatBuffers(decipher.update(data), decipher["final"]()));
  }

  exports.nodeAesDecrypt = nodeAesDecrypt;

  function nodeHmacSha256Sign(key, data) {
    var buf = crypto_1["default"].createHmac(constants.HMAC_NODE_ALGO, new Uint8Array(key)).update(data).digest();
    return cjs$4.bufferToArray(buf);
  }

  exports.nodeHmacSha256Sign = nodeHmacSha256Sign;

  function nodeHmacSha512Sign(key, data) {
    var buf = crypto_1["default"].createHmac(constants.SHA512_NODE_ALGO, new Uint8Array(key)).update(data).digest();
    return cjs$4.bufferToArray(buf);
  }

  exports.nodeHmacSha512Sign = nodeHmacSha512Sign;

  function nodeSha256(data) {
    var buf = crypto_1["default"].createHash(constants.SHA256_NODE_ALGO).update(data).digest();
    return cjs$4.bufferToArray(buf);
  }

  exports.nodeSha256 = nodeSha256;

  function nodeSha512(data) {
    var buf = crypto_1["default"].createHash(constants.SHA512_NODE_ALGO).update(data).digest();
    return cjs$4.bufferToArray(buf);
  }

  exports.nodeSha512 = nodeSha512;

  function nodeRipemd160(data) {
    var buf = crypto_1["default"].createHash(constants.RIPEMD160_NODE_ALGO).update(data).digest();
    return cjs$4.bufferToArray(buf);
  }

  exports.nodeRipemd160 = nodeRipemd160;
});
unwrapExports(node);

var env = createCommonjsModule(function (module, exports) {

  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    });
  } : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
  });

  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports) {
    for (var p in m) {
      if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
    }
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  __exportStar(browser$2, exports);

  __exportStar(fallback, exports);

  __exportStar(node, exports);
});
unwrapExports(env);

var pkcs7 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.pkcs7 = void 0;
  var PADDING = [[16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16], [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15], [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14], [13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13], [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12], [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11], [10, 10, 10, 10, 10, 10, 10, 10, 10, 10], [9, 9, 9, 9, 9, 9, 9, 9, 9], [8, 8, 8, 8, 8, 8, 8, 8], [7, 7, 7, 7, 7, 7, 7], [6, 6, 6, 6, 6, 6], [5, 5, 5, 5, 5], [4, 4, 4, 4], [3, 3, 3], [2, 2], [1]];
  exports.pkcs7 = {
    pad: function pad(plaintext) {
      var padding = PADDING[plaintext.byteLength % 16 || 0];
      var result = new Uint8Array(plaintext.byteLength + padding.length);
      result.set(plaintext);
      result.set(padding, plaintext.byteLength);
      return result;
    },
    unpad: function unpad(padded) {
      return padded.subarray(0, padded.byteLength - padded[padded.byteLength - 1]);
    }
  };
});
unwrapExports(pkcs7);

var types$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
});
unwrapExports(types$1);

var validators = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isConstantTime = exports.isNode = exports.isBrowser = exports.assert = void 0;

  function assert(condition, message) {
    if (!condition) {
      throw new Error(message || 'Assertion failed');
    }
  }

  exports.assert = assert;

  function isBrowser() {
    return !!env.getBrowerCrypto() && !!env.getSubtleCrypto();
  }

  exports.isBrowser = isBrowser;

  function isNode() {
    return typeof process !== 'undefined' && typeof process.versions !== 'undefined' && typeof process.versions.node !== 'undefined';
  }

  exports.isNode = isNode;

  function isConstantTime(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    var res = 0;

    for (var i = 0; i < arr1.length; i++) {
      res |= arr1[i] ^ arr2[i];
    }

    return res === 0;
  }

  exports.isConstantTime = isConstantTime;
});
unwrapExports(validators);

var helpers = createCommonjsModule(function (module, exports) {

  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    });
  } : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
  });

  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports) {
    for (var p in m) {
      if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
    }
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  __exportStar(constants, exports);

  __exportStar(env, exports);

  __exportStar(pkcs7, exports);

  __exportStar(types$1, exports);

  __exportStar(validators, exports);
});
unwrapExports(helpers);

var async = createCommonjsModule(function (module, exports) {

  var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.aesCbcDecrypt = exports.aesCbcEncrypt = void 0;

  function aesCbcEncrypt(iv, key, data) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!helpers.isBrowser()) {
                _context.next = 6;
                break;
              }

              _context.next = 3;
              return helpers.browserAesEncrypt(iv, key, data);

            case 3:
              result = _context.sent;
              _context.next = 7;
              break;

            case 6:
              if (helpers.isNode()) {
                result = helpers.nodeAesEncrypt(iv, key, data);
              } else {
                result = helpers.fallbackAesEncrypt(iv, key, data);
              }

            case 7:
              return _context.abrupt("return", result);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
  }

  exports.aesCbcEncrypt = aesCbcEncrypt;

  function aesCbcDecrypt(iv, key, data) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!helpers.isBrowser()) {
                _context2.next = 6;
                break;
              }

              _context2.next = 3;
              return helpers.browserAesDecrypt(iv, key, data);

            case 3:
              result = _context2.sent;
              _context2.next = 7;
              break;

            case 6:
              if (helpers.isNode()) {
                result = helpers.nodeAesDecrypt(iv, key, data);
              } else {
                result = helpers.fallbackAesDecrypt(iv, key, data);
              }

            case 7:
              return _context2.abrupt("return", result);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
  }

  exports.aesCbcDecrypt = aesCbcDecrypt;
});
unwrapExports(async);

var sync = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.aesCbcDecryptSync = exports.aesCbcEncryptSync = void 0;

  function aesCbcEncryptSync(iv, key, data) {
    var result;

    if (helpers.isNode()) {
      result = helpers.nodeAesEncrypt(iv, key, data);
    } else {
      result = helpers.fallbackAesEncrypt(iv, key, data);
    }

    return result;
  }

  exports.aesCbcEncryptSync = aesCbcEncryptSync;

  function aesCbcDecryptSync(iv, key, data) {
    var result;

    if (helpers.isNode()) {
      result = helpers.nodeAesDecrypt(iv, key, data);
    } else {
      result = helpers.fallbackAesDecrypt(iv, key, data);
    }

    return result;
  }

  exports.aesCbcDecryptSync = aesCbcDecryptSync;
});
unwrapExports(sync);

var aes = createCommonjsModule(function (module, exports) {

  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    });
  } : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
  });

  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports) {
    for (var p in m) {
      if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
    }
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  __exportStar(async, exports);

  __exportStar(sync, exports);
});
unwrapExports(aes);

var async$1 = createCommonjsModule(function (module, exports) {

  var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.hmacSha512Verify = exports.hmacSha512Sign = exports.hmacSha256Verify = exports.hmacSha256Sign = void 0;

  function hmacSha256Sign(key, msg) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!helpers.isBrowser()) {
                _context.next = 6;
                break;
              }

              _context.next = 3;
              return helpers.browserHmacSha256Sign(key, msg);

            case 3:
              result = _context.sent;
              _context.next = 7;
              break;

            case 6:
              if (helpers.isNode()) {
                result = helpers.nodeHmacSha256Sign(key, msg);
              } else {
                result = helpers.fallbackHmacSha256Sign(key, msg);
              }

            case 7:
              return _context.abrupt("return", result);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
  }

  exports.hmacSha256Sign = hmacSha256Sign;

  function hmacSha256Verify(key, msg, sig) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var result, expectedSig, _expectedSig, _expectedSig2;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!helpers.isBrowser()) {
                _context2.next = 7;
                break;
              }

              _context2.next = 3;
              return helpers.browserHmacSha256Sign(key, msg);

            case 3:
              expectedSig = _context2.sent;
              result = helpers.isConstantTime(expectedSig, sig);
              _context2.next = 8;
              break;

            case 7:
              if (helpers.isNode()) {
                _expectedSig = helpers.nodeHmacSha256Sign(key, msg);
                result = helpers.isConstantTime(_expectedSig, sig);
              } else {
                _expectedSig2 = helpers.fallbackHmacSha256Sign(key, msg);
                result = helpers.isConstantTime(_expectedSig2, sig);
              }

            case 8:
              return _context2.abrupt("return", result);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
  }

  exports.hmacSha256Verify = hmacSha256Verify;

  function hmacSha512Sign(key, msg) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var result;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!helpers.isBrowser()) {
                _context3.next = 6;
                break;
              }

              _context3.next = 3;
              return helpers.browserHmacSha512Sign(key, msg);

            case 3:
              result = _context3.sent;
              _context3.next = 7;
              break;

            case 6:
              if (helpers.isNode()) {
                result = helpers.nodeHmacSha512Sign(key, msg);
              } else {
                result = helpers.fallbackHmacSha512Sign(key, msg);
              }

            case 7:
              return _context3.abrupt("return", result);

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
  }

  exports.hmacSha512Sign = hmacSha512Sign;

  function hmacSha512Verify(key, msg, sig) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var result, expectedSig, _expectedSig3;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (helpers.isNode()) {
                expectedSig = helpers.nodeHmacSha512Sign(key, msg);
                result = helpers.isConstantTime(expectedSig, sig);
              } else {
                _expectedSig3 = helpers.fallbackHmacSha512Sign(key, msg);
                result = helpers.isConstantTime(_expectedSig3, sig);
              }

              return _context4.abrupt("return", result);

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
  }

  exports.hmacSha512Verify = hmacSha512Verify;
});
unwrapExports(async$1);

var sync$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.hmacSha512VerifySync = exports.hmacSha512SignSync = exports.hmacSha256VerifySync = exports.hmacSha256SignSync = void 0;

  function hmacSha256SignSync(key, msg) {
    var result;

    if (helpers.isNode()) {
      result = helpers.nodeHmacSha256Sign(key, msg);
    } else {
      result = helpers.fallbackHmacSha256Sign(key, msg);
    }

    return result;
  }

  exports.hmacSha256SignSync = hmacSha256SignSync;

  function hmacSha256VerifySync(key, msg, sig) {
    var result;

    if (helpers.isNode()) {
      var expectedSig = helpers.nodeHmacSha256Sign(key, msg);
      result = helpers.isConstantTime(expectedSig, sig);
    } else {
      var _expectedSig = helpers.fallbackHmacSha256Sign(key, msg);

      result = helpers.isConstantTime(_expectedSig, sig);
    }

    return result;
  }

  exports.hmacSha256VerifySync = hmacSha256VerifySync;

  function hmacSha512SignSync(key, msg) {
    var result;

    if (helpers.isNode()) {
      result = helpers.nodeHmacSha512Sign(key, msg);
    } else {
      result = helpers.fallbackHmacSha512Sign(key, msg);
    }

    return result;
  }

  exports.hmacSha512SignSync = hmacSha512SignSync;

  function hmacSha512VerifySync(key, msg, sig) {
    var result;

    if (helpers.isNode()) {
      var expectedSig = helpers.nodeHmacSha512Sign(key, msg);
      result = helpers.isConstantTime(expectedSig, sig);
    } else {
      var _expectedSig2 = helpers.fallbackHmacSha512Sign(key, msg);

      result = helpers.isConstantTime(_expectedSig2, sig);
    }

    return result;
  }

  exports.hmacSha512VerifySync = hmacSha512VerifySync;
});
unwrapExports(sync$1);

var hmac$1 = createCommonjsModule(function (module, exports) {

  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    });
  } : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
  });

  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports) {
    for (var p in m) {
      if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
    }
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  __exportStar(async$1, exports);

  __exportStar(sync$1, exports);
});
unwrapExports(hmac$1);

var node$1 = createCommonjsModule(function (module, exports) {

  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.randomBytes = void 0;

  var crypto_1 = __importDefault(crypto$3);

  function randomBytes(length) {
    var buf = crypto_1["default"].randomBytes(length);
    return cjs$4.bufferToArray(buf);
  }

  exports.randomBytes = randomBytes;
});
unwrapExports(node$1);

var random = createCommonjsModule(function (module, exports) {

  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    });
  } : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
  });

  var __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function (o, v) {
    Object.defineProperty(o, "default", {
      enumerable: true,
      value: v
    });
  } : function (o, v) {
    o["default"] = v;
  });

  var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) {
      if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }

    __setModuleDefault(result, mod);

    return result;
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.randomBytes = void 0;

  var isoRandom = __importStar(node$1);

  function randomBytes(length) {
    return isoRandom.randomBytes(length);
  }

  exports.randomBytes = randomBytes;
});
unwrapExports(random);

var async$2 = createCommonjsModule(function (module, exports) {

  var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ripemd160 = exports.sha512 = exports.sha256 = void 0;

  function sha256(msg) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              result = helpers.EMPTY_UINT_ARRAY;

              if (!helpers.isBrowser()) {
                _context.next = 7;
                break;
              }

              _context.next = 4;
              return helpers.browserSha256(msg);

            case 4:
              result = _context.sent;
              _context.next = 8;
              break;

            case 7:
              if (helpers.isNode()) {
                result = helpers.nodeSha256(msg);
              } else {
                result = helpers.fallbackSha256(msg);
              }

            case 8:
              return _context.abrupt("return", result);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
  }

  exports.sha256 = sha256;

  function sha512(msg) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              result = helpers.EMPTY_UINT_ARRAY;

              if (!helpers.isBrowser()) {
                _context2.next = 7;
                break;
              }

              _context2.next = 4;
              return helpers.browserSha512(msg);

            case 4:
              result = _context2.sent;
              _context2.next = 8;
              break;

            case 7:
              if (helpers.isNode()) {
                result = helpers.nodeSha512(msg);
              } else {
                result = helpers.fallbackSha512(msg);
              }

            case 8:
              return _context2.abrupt("return", result);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
  }

  exports.sha512 = sha512;

  function ripemd160(msg) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var result;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              result = helpers.EMPTY_UINT_ARRAY;

              if (helpers.isNode()) {
                result = helpers.nodeRipemd160(msg);
              } else {
                result = helpers.fallbackRipemd160(msg);
              }

              return _context3.abrupt("return", result);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
  }

  exports.ripemd160 = ripemd160;
});
unwrapExports(async$2);

var sync$2 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ripemd160Sync = exports.sha512Sync = exports.sha256Sync = void 0;

  function sha256Sync(msg) {
    var result = helpers.EMPTY_UINT_ARRAY;

    if (helpers.isNode()) {
      result = helpers.nodeSha256(msg);
    } else {
      result = helpers.fallbackSha256(msg);
    }

    return result;
  }

  exports.sha256Sync = sha256Sync;

  function sha512Sync(msg) {
    var result = helpers.EMPTY_UINT_ARRAY;

    if (helpers.isNode()) {
      result = helpers.nodeSha512(msg);
    } else {
      result = helpers.fallbackSha512(msg);
    }

    return result;
  }

  exports.sha512Sync = sha512Sync;

  function ripemd160Sync(msg) {
    var result = helpers.EMPTY_UINT_ARRAY;

    if (helpers.isNode()) {
      result = helpers.nodeRipemd160(msg);
    } else {
      result = helpers.fallbackRipemd160(msg);
    }

    return result;
  }

  exports.ripemd160Sync = ripemd160Sync;
});
unwrapExports(sync$2);

var sha2 = createCommonjsModule(function (module, exports) {

  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    });
  } : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
  });

  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports) {
    for (var p in m) {
      if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
    }
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  __exportStar(async$2, exports);

  __exportStar(sync$2, exports);
});
unwrapExports(sha2);

var cjs$5 = createCommonjsModule(function (module, exports) {

  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    });
  } : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
  });

  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports) {
    for (var p in m) {
      if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
    }
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  __exportStar(aes, exports);

  __exportStar(helpers, exports);

  __exportStar(hmac$1, exports);

  __exportStar(random, exports);

  __exportStar(sha2, exports);
});
unwrapExports(cjs$5);

var browser$3 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var QUOTA = 65536;

  var BrowserRandomSource = function () {
    function BrowserRandomSource() {
      this.isAvailable = false;
      this.isInstantiated = false;
      var browserCrypto = typeof self !== 'undefined' ? self.crypto || self.msCrypto : null;

      if (browserCrypto && browserCrypto.getRandomValues) {
        this._crypto = browserCrypto;
        this.isAvailable = true;
        this.isInstantiated = true;
      }
    }

    BrowserRandomSource.prototype.randomBytes = function (length) {
      if (!this.isAvailable || !this._crypto) {
        throw new Error("Browser random byte generator is not available.");
      }

      var out = new Uint8Array(length);

      for (var i = 0; i < out.length; i += QUOTA) {
        this._crypto.getRandomValues(out.subarray(i, i + Math.min(out.length - i, QUOTA)));
      }

      return out;
    };

    return BrowserRandomSource;
  }();

  exports.BrowserRandomSource = BrowserRandomSource;
});
unwrapExports(browser$3);

var wipe_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function wipe(array) {
    for (var i = 0; i < array.length; i++) {
      array[i] = 0;
    }

    return array;
  }

  exports.wipe = wipe;
});
unwrapExports(wipe_1);

var _nodeResolve_empty = {};

var _nodeResolve_empty$1 = {
	__proto__: null,
	'default': _nodeResolve_empty
};

var require$$0 = getCjsExportFromNamespace(_nodeResolve_empty$1);

var node$2 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var NodeRandomSource = function () {
    function NodeRandomSource() {
      this.isAvailable = false;
      this.isInstantiated = false;

      if (typeof commonjsRequire !== "undefined") {
        var nodeCrypto = require$$0;

        if (nodeCrypto && nodeCrypto.randomBytes) {
          this._crypto = nodeCrypto;
          this.isAvailable = true;
          this.isInstantiated = true;
        }
      }
    }

    NodeRandomSource.prototype.randomBytes = function (length) {
      if (!this.isAvailable || !this._crypto) {
        throw new Error("Node.js random byte generator is not available.");
      }

      var buffer = this._crypto.randomBytes(length);

      if (buffer.length !== length) {
        throw new Error("NodeRandomSource: got fewer bytes than requested");
      }

      var out = new Uint8Array(length);

      for (var i = 0; i < out.length; i++) {
        out[i] = buffer[i];
      }

      wipe_1.wipe(buffer);
      return out;
    };

    return NodeRandomSource;
  }();

  exports.NodeRandomSource = NodeRandomSource;
});
unwrapExports(node$2);

var system = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var SystemRandomSource = function () {
    function SystemRandomSource() {
      this.isAvailable = false;
      this.name = "";
      this._source = new browser$3.BrowserRandomSource();

      if (this._source.isAvailable) {
        this.isAvailable = true;
        this.name = "Browser";
        return;
      }

      this._source = new node$2.NodeRandomSource();

      if (this._source.isAvailable) {
        this.isAvailable = true;
        this.name = "Node";
        return;
      }
    }

    SystemRandomSource.prototype.randomBytes = function (length) {
      if (!this.isAvailable) {
        throw new Error("System random byte generator is not available.");
      }

      return this._source.randomBytes(length);
    };

    return SystemRandomSource;
  }();

  exports.SystemRandomSource = SystemRandomSource;
});
unwrapExports(system);

var int_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function imulShim(a, b) {
    var ah = a >>> 16 & 0xffff,
        al = a & 0xffff;
    var bh = b >>> 16 & 0xffff,
        bl = b & 0xffff;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
  }

  exports.mul = Math.imul || imulShim;

  function add(a, b) {
    return a + b | 0;
  }

  exports.add = add;

  function sub(a, b) {
    return a - b | 0;
  }

  exports.sub = sub;

  function rotl(x, n) {
    return x << n | x >>> 32 - n;
  }

  exports.rotl = rotl;

  function rotr(x, n) {
    return x << 32 - n | x >>> n;
  }

  exports.rotr = rotr;

  function isIntegerShim(n) {
    return typeof n === "number" && isFinite(n) && Math.floor(n) === n;
  }

  exports.isInteger = Number.isInteger || isIntegerShim;
  exports.MAX_SAFE_INTEGER = 9007199254740991;

  exports.isSafeInteger = function (n) {
    return exports.isInteger(n) && n >= -exports.MAX_SAFE_INTEGER && n <= exports.MAX_SAFE_INTEGER;
  };
});
unwrapExports(int_1);

var binary = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function readInt16BE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }

    return (array[offset + 0] << 8 | array[offset + 1]) << 16 >> 16;
  }

  exports.readInt16BE = readInt16BE;

  function readUint16BE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }

    return (array[offset + 0] << 8 | array[offset + 1]) >>> 0;
  }

  exports.readUint16BE = readUint16BE;

  function readInt16LE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }

    return (array[offset + 1] << 8 | array[offset]) << 16 >> 16;
  }

  exports.readInt16LE = readInt16LE;

  function readUint16LE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }

    return (array[offset + 1] << 8 | array[offset]) >>> 0;
  }

  exports.readUint16LE = readUint16LE;

  function writeUint16BE(value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(2);
    }

    if (offset === void 0) {
      offset = 0;
    }

    out[offset + 0] = value >>> 8;
    out[offset + 1] = value >>> 0;
    return out;
  }

  exports.writeUint16BE = writeUint16BE;
  exports.writeInt16BE = writeUint16BE;

  function writeUint16LE(value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(2);
    }

    if (offset === void 0) {
      offset = 0;
    }

    out[offset + 0] = value >>> 0;
    out[offset + 1] = value >>> 8;
    return out;
  }

  exports.writeUint16LE = writeUint16LE;
  exports.writeInt16LE = writeUint16LE;

  function readInt32BE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }

    return array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3];
  }

  exports.readInt32BE = readInt32BE;

  function readUint32BE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }

    return (array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3]) >>> 0;
  }

  exports.readUint32BE = readUint32BE;

  function readInt32LE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }

    return array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset];
  }

  exports.readInt32LE = readInt32LE;

  function readUint32LE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }

    return (array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset]) >>> 0;
  }

  exports.readUint32LE = readUint32LE;

  function writeUint32BE(value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(4);
    }

    if (offset === void 0) {
      offset = 0;
    }

    out[offset + 0] = value >>> 24;
    out[offset + 1] = value >>> 16;
    out[offset + 2] = value >>> 8;
    out[offset + 3] = value >>> 0;
    return out;
  }

  exports.writeUint32BE = writeUint32BE;
  exports.writeInt32BE = writeUint32BE;

  function writeUint32LE(value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(4);
    }

    if (offset === void 0) {
      offset = 0;
    }

    out[offset + 0] = value >>> 0;
    out[offset + 1] = value >>> 8;
    out[offset + 2] = value >>> 16;
    out[offset + 3] = value >>> 24;
    return out;
  }

  exports.writeUint32LE = writeUint32LE;
  exports.writeInt32LE = writeUint32LE;

  function readInt64BE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }

    var hi = readInt32BE(array, offset);
    var lo = readInt32BE(array, offset + 4);
    return hi * 0x100000000 + lo - (lo >> 31) * 0x100000000;
  }

  exports.readInt64BE = readInt64BE;

  function readUint64BE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }

    var hi = readUint32BE(array, offset);
    var lo = readUint32BE(array, offset + 4);
    return hi * 0x100000000 + lo;
  }

  exports.readUint64BE = readUint64BE;

  function readInt64LE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }

    var lo = readInt32LE(array, offset);
    var hi = readInt32LE(array, offset + 4);
    return hi * 0x100000000 + lo - (lo >> 31) * 0x100000000;
  }

  exports.readInt64LE = readInt64LE;

  function readUint64LE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }

    var lo = readUint32LE(array, offset);
    var hi = readUint32LE(array, offset + 4);
    return hi * 0x100000000 + lo;
  }

  exports.readUint64LE = readUint64LE;

  function writeUint64BE(value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(8);
    }

    if (offset === void 0) {
      offset = 0;
    }

    writeUint32BE(value / 0x100000000 >>> 0, out, offset);
    writeUint32BE(value >>> 0, out, offset + 4);
    return out;
  }

  exports.writeUint64BE = writeUint64BE;
  exports.writeInt64BE = writeUint64BE;

  function writeUint64LE(value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(8);
    }

    if (offset === void 0) {
      offset = 0;
    }

    writeUint32LE(value >>> 0, out, offset);
    writeUint32LE(value / 0x100000000 >>> 0, out, offset + 4);
    return out;
  }

  exports.writeUint64LE = writeUint64LE;
  exports.writeInt64LE = writeUint64LE;

  function readUintBE(bitLength, array, offset) {
    if (offset === void 0) {
      offset = 0;
    }

    if (bitLength % 8 !== 0) {
      throw new Error("readUintBE supports only bitLengths divisible by 8");
    }

    if (bitLength / 8 > array.length - offset) {
      throw new Error("readUintBE: array is too short for the given bitLength");
    }

    var result = 0;
    var mul = 1;

    for (var i = bitLength / 8 + offset - 1; i >= offset; i--) {
      result += array[i] * mul;
      mul *= 256;
    }

    return result;
  }

  exports.readUintBE = readUintBE;

  function readUintLE(bitLength, array, offset) {
    if (offset === void 0) {
      offset = 0;
    }

    if (bitLength % 8 !== 0) {
      throw new Error("readUintLE supports only bitLengths divisible by 8");
    }

    if (bitLength / 8 > array.length - offset) {
      throw new Error("readUintLE: array is too short for the given bitLength");
    }

    var result = 0;
    var mul = 1;

    for (var i = offset; i < offset + bitLength / 8; i++) {
      result += array[i] * mul;
      mul *= 256;
    }

    return result;
  }

  exports.readUintLE = readUintLE;

  function writeUintBE(bitLength, value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(bitLength / 8);
    }

    if (offset === void 0) {
      offset = 0;
    }

    if (bitLength % 8 !== 0) {
      throw new Error("writeUintBE supports only bitLengths divisible by 8");
    }

    if (!int_1.isSafeInteger(value)) {
      throw new Error("writeUintBE value must be an integer");
    }

    var div = 1;

    for (var i = bitLength / 8 + offset - 1; i >= offset; i--) {
      out[i] = value / div & 0xff;
      div *= 256;
    }

    return out;
  }

  exports.writeUintBE = writeUintBE;

  function writeUintLE(bitLength, value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(bitLength / 8);
    }

    if (offset === void 0) {
      offset = 0;
    }

    if (bitLength % 8 !== 0) {
      throw new Error("writeUintLE supports only bitLengths divisible by 8");
    }

    if (!int_1.isSafeInteger(value)) {
      throw new Error("writeUintLE value must be an integer");
    }

    var div = 1;

    for (var i = offset; i < offset + bitLength / 8; i++) {
      out[i] = value / div & 0xff;
      div *= 256;
    }

    return out;
  }

  exports.writeUintLE = writeUintLE;

  function readFloat32BE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }

    var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
    return view.getFloat32(offset);
  }

  exports.readFloat32BE = readFloat32BE;

  function readFloat32LE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }

    var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
    return view.getFloat32(offset, true);
  }

  exports.readFloat32LE = readFloat32LE;

  function readFloat64BE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }

    var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
    return view.getFloat64(offset);
  }

  exports.readFloat64BE = readFloat64BE;

  function readFloat64LE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }

    var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
    return view.getFloat64(offset, true);
  }

  exports.readFloat64LE = readFloat64LE;

  function writeFloat32BE(value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(4);
    }

    if (offset === void 0) {
      offset = 0;
    }

    var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
    view.setFloat32(offset, value);
    return out;
  }

  exports.writeFloat32BE = writeFloat32BE;

  function writeFloat32LE(value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(4);
    }

    if (offset === void 0) {
      offset = 0;
    }

    var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
    view.setFloat32(offset, value, true);
    return out;
  }

  exports.writeFloat32LE = writeFloat32LE;

  function writeFloat64BE(value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(8);
    }

    if (offset === void 0) {
      offset = 0;
    }

    var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
    view.setFloat64(offset, value);
    return out;
  }

  exports.writeFloat64BE = writeFloat64BE;

  function writeFloat64LE(value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(8);
    }

    if (offset === void 0) {
      offset = 0;
    }

    var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
    view.setFloat64(offset, value, true);
    return out;
  }

  exports.writeFloat64LE = writeFloat64LE;
});
unwrapExports(binary);

var random$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.defaultRandomSource = new system.SystemRandomSource();

  function randomBytes(length, prng) {
    if (prng === void 0) {
      prng = exports.defaultRandomSource;
    }

    return prng.randomBytes(length);
  }

  exports.randomBytes = randomBytes;

  function randomUint32(prng) {
    if (prng === void 0) {
      prng = exports.defaultRandomSource;
    }

    var buf = randomBytes(4, prng);
    var result = binary.readUint32LE(buf);
    wipe_1.wipe(buf);
    return result;
  }

  exports.randomUint32 = randomUint32;
  var ALPHANUMERIC = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  function randomString(length, charset, prng) {
    if (charset === void 0) {
      charset = ALPHANUMERIC;
    }

    if (prng === void 0) {
      prng = exports.defaultRandomSource;
    }

    if (charset.length < 2) {
      throw new Error("randomString charset is too short");
    }

    if (charset.length > 256) {
      throw new Error("randomString charset is too long");
    }

    var out = '';
    var charsLen = charset.length;
    var maxByte = 256 - 256 % charsLen;

    while (length > 0) {
      var buf = randomBytes(Math.ceil(length * 256 / maxByte), prng);

      for (var i = 0; i < buf.length && length > 0; i++) {
        var randomByte = buf[i];

        if (randomByte < maxByte) {
          out += charset.charAt(randomByte % charsLen);
          length--;
        }
      }

      wipe_1.wipe(buf);
    }

    return out;
  }

  exports.randomString = randomString;

  function randomStringForEntropy(bits, charset, prng) {
    if (charset === void 0) {
      charset = ALPHANUMERIC;
    }

    if (prng === void 0) {
      prng = exports.defaultRandomSource;
    }

    var length = Math.ceil(bits / (Math.log(charset.length) / Math.LN2));
    return randomString(length, charset, prng);
  }

  exports.randomStringForEntropy = randomStringForEntropy;
});
unwrapExports(random$1);

var x25519 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PUBLIC_KEY_LENGTH = 32;
  exports.SECRET_KEY_LENGTH = 32;
  exports.SHARED_KEY_LENGTH = 32;

  function gf(init) {
    var r = new Float64Array(16);

    if (init) {
      for (var i = 0; i < init.length; i++) {
        r[i] = init[i];
      }
    }

    return r;
  }

  var _9 = new Uint8Array(32);

  _9[0] = 9;

  var _121665 = gf([0xdb41, 1]);

  function car25519(o) {
    var c = 1;

    for (var i = 0; i < 16; i++) {
      var v = o[i] + c + 65535;
      c = Math.floor(v / 65536);
      o[i] = v - c * 65536;
    }

    o[0] += c - 1 + 37 * (c - 1);
  }

  function sel25519(p, q, b) {
    var c = ~(b - 1);

    for (var i = 0; i < 16; i++) {
      var t = c & (p[i] ^ q[i]);
      p[i] ^= t;
      q[i] ^= t;
    }
  }

  function pack25519(o, n) {
    var m = gf();
    var t = gf();

    for (var i = 0; i < 16; i++) {
      t[i] = n[i];
    }

    car25519(t);
    car25519(t);
    car25519(t);

    for (var j = 0; j < 2; j++) {
      m[0] = t[0] - 0xffed;

      for (var i = 1; i < 15; i++) {
        m[i] = t[i] - 0xffff - (m[i - 1] >> 16 & 1);
        m[i - 1] &= 0xffff;
      }

      m[15] = t[15] - 0x7fff - (m[14] >> 16 & 1);
      var b = m[15] >> 16 & 1;
      m[14] &= 0xffff;
      sel25519(t, m, 1 - b);
    }

    for (var i = 0; i < 16; i++) {
      o[2 * i] = t[i] & 0xff;
      o[2 * i + 1] = t[i] >> 8;
    }
  }

  function unpack25519(o, n) {
    for (var i = 0; i < 16; i++) {
      o[i] = n[2 * i] + (n[2 * i + 1] << 8);
    }

    o[15] &= 0x7fff;
  }

  function add(o, a, b) {
    for (var i = 0; i < 16; i++) {
      o[i] = a[i] + b[i];
    }
  }

  function sub(o, a, b) {
    for (var i = 0; i < 16; i++) {
      o[i] = a[i] - b[i];
    }
  }

  function mul(o, a, b) {
    var v,
        c,
        t0 = 0,
        t1 = 0,
        t2 = 0,
        t3 = 0,
        t4 = 0,
        t5 = 0,
        t6 = 0,
        t7 = 0,
        t8 = 0,
        t9 = 0,
        t10 = 0,
        t11 = 0,
        t12 = 0,
        t13 = 0,
        t14 = 0,
        t15 = 0,
        t16 = 0,
        t17 = 0,
        t18 = 0,
        t19 = 0,
        t20 = 0,
        t21 = 0,
        t22 = 0,
        t23 = 0,
        t24 = 0,
        t25 = 0,
        t26 = 0,
        t27 = 0,
        t28 = 0,
        t29 = 0,
        t30 = 0,
        b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3],
        b4 = b[4],
        b5 = b[5],
        b6 = b[6],
        b7 = b[7],
        b8 = b[8],
        b9 = b[9],
        b10 = b[10],
        b11 = b[11],
        b12 = b[12],
        b13 = b[13],
        b14 = b[14],
        b15 = b[15];
    v = a[0];
    t0 += v * b0;
    t1 += v * b1;
    t2 += v * b2;
    t3 += v * b3;
    t4 += v * b4;
    t5 += v * b5;
    t6 += v * b6;
    t7 += v * b7;
    t8 += v * b8;
    t9 += v * b9;
    t10 += v * b10;
    t11 += v * b11;
    t12 += v * b12;
    t13 += v * b13;
    t14 += v * b14;
    t15 += v * b15;
    v = a[1];
    t1 += v * b0;
    t2 += v * b1;
    t3 += v * b2;
    t4 += v * b3;
    t5 += v * b4;
    t6 += v * b5;
    t7 += v * b6;
    t8 += v * b7;
    t9 += v * b8;
    t10 += v * b9;
    t11 += v * b10;
    t12 += v * b11;
    t13 += v * b12;
    t14 += v * b13;
    t15 += v * b14;
    t16 += v * b15;
    v = a[2];
    t2 += v * b0;
    t3 += v * b1;
    t4 += v * b2;
    t5 += v * b3;
    t6 += v * b4;
    t7 += v * b5;
    t8 += v * b6;
    t9 += v * b7;
    t10 += v * b8;
    t11 += v * b9;
    t12 += v * b10;
    t13 += v * b11;
    t14 += v * b12;
    t15 += v * b13;
    t16 += v * b14;
    t17 += v * b15;
    v = a[3];
    t3 += v * b0;
    t4 += v * b1;
    t5 += v * b2;
    t6 += v * b3;
    t7 += v * b4;
    t8 += v * b5;
    t9 += v * b6;
    t10 += v * b7;
    t11 += v * b8;
    t12 += v * b9;
    t13 += v * b10;
    t14 += v * b11;
    t15 += v * b12;
    t16 += v * b13;
    t17 += v * b14;
    t18 += v * b15;
    v = a[4];
    t4 += v * b0;
    t5 += v * b1;
    t6 += v * b2;
    t7 += v * b3;
    t8 += v * b4;
    t9 += v * b5;
    t10 += v * b6;
    t11 += v * b7;
    t12 += v * b8;
    t13 += v * b9;
    t14 += v * b10;
    t15 += v * b11;
    t16 += v * b12;
    t17 += v * b13;
    t18 += v * b14;
    t19 += v * b15;
    v = a[5];
    t5 += v * b0;
    t6 += v * b1;
    t7 += v * b2;
    t8 += v * b3;
    t9 += v * b4;
    t10 += v * b5;
    t11 += v * b6;
    t12 += v * b7;
    t13 += v * b8;
    t14 += v * b9;
    t15 += v * b10;
    t16 += v * b11;
    t17 += v * b12;
    t18 += v * b13;
    t19 += v * b14;
    t20 += v * b15;
    v = a[6];
    t6 += v * b0;
    t7 += v * b1;
    t8 += v * b2;
    t9 += v * b3;
    t10 += v * b4;
    t11 += v * b5;
    t12 += v * b6;
    t13 += v * b7;
    t14 += v * b8;
    t15 += v * b9;
    t16 += v * b10;
    t17 += v * b11;
    t18 += v * b12;
    t19 += v * b13;
    t20 += v * b14;
    t21 += v * b15;
    v = a[7];
    t7 += v * b0;
    t8 += v * b1;
    t9 += v * b2;
    t10 += v * b3;
    t11 += v * b4;
    t12 += v * b5;
    t13 += v * b6;
    t14 += v * b7;
    t15 += v * b8;
    t16 += v * b9;
    t17 += v * b10;
    t18 += v * b11;
    t19 += v * b12;
    t20 += v * b13;
    t21 += v * b14;
    t22 += v * b15;
    v = a[8];
    t8 += v * b0;
    t9 += v * b1;
    t10 += v * b2;
    t11 += v * b3;
    t12 += v * b4;
    t13 += v * b5;
    t14 += v * b6;
    t15 += v * b7;
    t16 += v * b8;
    t17 += v * b9;
    t18 += v * b10;
    t19 += v * b11;
    t20 += v * b12;
    t21 += v * b13;
    t22 += v * b14;
    t23 += v * b15;
    v = a[9];
    t9 += v * b0;
    t10 += v * b1;
    t11 += v * b2;
    t12 += v * b3;
    t13 += v * b4;
    t14 += v * b5;
    t15 += v * b6;
    t16 += v * b7;
    t17 += v * b8;
    t18 += v * b9;
    t19 += v * b10;
    t20 += v * b11;
    t21 += v * b12;
    t22 += v * b13;
    t23 += v * b14;
    t24 += v * b15;
    v = a[10];
    t10 += v * b0;
    t11 += v * b1;
    t12 += v * b2;
    t13 += v * b3;
    t14 += v * b4;
    t15 += v * b5;
    t16 += v * b6;
    t17 += v * b7;
    t18 += v * b8;
    t19 += v * b9;
    t20 += v * b10;
    t21 += v * b11;
    t22 += v * b12;
    t23 += v * b13;
    t24 += v * b14;
    t25 += v * b15;
    v = a[11];
    t11 += v * b0;
    t12 += v * b1;
    t13 += v * b2;
    t14 += v * b3;
    t15 += v * b4;
    t16 += v * b5;
    t17 += v * b6;
    t18 += v * b7;
    t19 += v * b8;
    t20 += v * b9;
    t21 += v * b10;
    t22 += v * b11;
    t23 += v * b12;
    t24 += v * b13;
    t25 += v * b14;
    t26 += v * b15;
    v = a[12];
    t12 += v * b0;
    t13 += v * b1;
    t14 += v * b2;
    t15 += v * b3;
    t16 += v * b4;
    t17 += v * b5;
    t18 += v * b6;
    t19 += v * b7;
    t20 += v * b8;
    t21 += v * b9;
    t22 += v * b10;
    t23 += v * b11;
    t24 += v * b12;
    t25 += v * b13;
    t26 += v * b14;
    t27 += v * b15;
    v = a[13];
    t13 += v * b0;
    t14 += v * b1;
    t15 += v * b2;
    t16 += v * b3;
    t17 += v * b4;
    t18 += v * b5;
    t19 += v * b6;
    t20 += v * b7;
    t21 += v * b8;
    t22 += v * b9;
    t23 += v * b10;
    t24 += v * b11;
    t25 += v * b12;
    t26 += v * b13;
    t27 += v * b14;
    t28 += v * b15;
    v = a[14];
    t14 += v * b0;
    t15 += v * b1;
    t16 += v * b2;
    t17 += v * b3;
    t18 += v * b4;
    t19 += v * b5;
    t20 += v * b6;
    t21 += v * b7;
    t22 += v * b8;
    t23 += v * b9;
    t24 += v * b10;
    t25 += v * b11;
    t26 += v * b12;
    t27 += v * b13;
    t28 += v * b14;
    t29 += v * b15;
    v = a[15];
    t15 += v * b0;
    t16 += v * b1;
    t17 += v * b2;
    t18 += v * b3;
    t19 += v * b4;
    t20 += v * b5;
    t21 += v * b6;
    t22 += v * b7;
    t23 += v * b8;
    t24 += v * b9;
    t25 += v * b10;
    t26 += v * b11;
    t27 += v * b12;
    t28 += v * b13;
    t29 += v * b14;
    t30 += v * b15;
    t0 += 38 * t16;
    t1 += 38 * t17;
    t2 += 38 * t18;
    t3 += 38 * t19;
    t4 += 38 * t20;
    t5 += 38 * t21;
    t6 += 38 * t22;
    t7 += 38 * t23;
    t8 += 38 * t24;
    t9 += 38 * t25;
    t10 += 38 * t26;
    t11 += 38 * t27;
    t12 += 38 * t28;
    t13 += 38 * t29;
    t14 += 38 * t30;
    c = 1;
    v = t0 + c + 65535;
    c = Math.floor(v / 65536);
    t0 = v - c * 65536;
    v = t1 + c + 65535;
    c = Math.floor(v / 65536);
    t1 = v - c * 65536;
    v = t2 + c + 65535;
    c = Math.floor(v / 65536);
    t2 = v - c * 65536;
    v = t3 + c + 65535;
    c = Math.floor(v / 65536);
    t3 = v - c * 65536;
    v = t4 + c + 65535;
    c = Math.floor(v / 65536);
    t4 = v - c * 65536;
    v = t5 + c + 65535;
    c = Math.floor(v / 65536);
    t5 = v - c * 65536;
    v = t6 + c + 65535;
    c = Math.floor(v / 65536);
    t6 = v - c * 65536;
    v = t7 + c + 65535;
    c = Math.floor(v / 65536);
    t7 = v - c * 65536;
    v = t8 + c + 65535;
    c = Math.floor(v / 65536);
    t8 = v - c * 65536;
    v = t9 + c + 65535;
    c = Math.floor(v / 65536);
    t9 = v - c * 65536;
    v = t10 + c + 65535;
    c = Math.floor(v / 65536);
    t10 = v - c * 65536;
    v = t11 + c + 65535;
    c = Math.floor(v / 65536);
    t11 = v - c * 65536;
    v = t12 + c + 65535;
    c = Math.floor(v / 65536);
    t12 = v - c * 65536;
    v = t13 + c + 65535;
    c = Math.floor(v / 65536);
    t13 = v - c * 65536;
    v = t14 + c + 65535;
    c = Math.floor(v / 65536);
    t14 = v - c * 65536;
    v = t15 + c + 65535;
    c = Math.floor(v / 65536);
    t15 = v - c * 65536;
    t0 += c - 1 + 37 * (c - 1);
    c = 1;
    v = t0 + c + 65535;
    c = Math.floor(v / 65536);
    t0 = v - c * 65536;
    v = t1 + c + 65535;
    c = Math.floor(v / 65536);
    t1 = v - c * 65536;
    v = t2 + c + 65535;
    c = Math.floor(v / 65536);
    t2 = v - c * 65536;
    v = t3 + c + 65535;
    c = Math.floor(v / 65536);
    t3 = v - c * 65536;
    v = t4 + c + 65535;
    c = Math.floor(v / 65536);
    t4 = v - c * 65536;
    v = t5 + c + 65535;
    c = Math.floor(v / 65536);
    t5 = v - c * 65536;
    v = t6 + c + 65535;
    c = Math.floor(v / 65536);
    t6 = v - c * 65536;
    v = t7 + c + 65535;
    c = Math.floor(v / 65536);
    t7 = v - c * 65536;
    v = t8 + c + 65535;
    c = Math.floor(v / 65536);
    t8 = v - c * 65536;
    v = t9 + c + 65535;
    c = Math.floor(v / 65536);
    t9 = v - c * 65536;
    v = t10 + c + 65535;
    c = Math.floor(v / 65536);
    t10 = v - c * 65536;
    v = t11 + c + 65535;
    c = Math.floor(v / 65536);
    t11 = v - c * 65536;
    v = t12 + c + 65535;
    c = Math.floor(v / 65536);
    t12 = v - c * 65536;
    v = t13 + c + 65535;
    c = Math.floor(v / 65536);
    t13 = v - c * 65536;
    v = t14 + c + 65535;
    c = Math.floor(v / 65536);
    t14 = v - c * 65536;
    v = t15 + c + 65535;
    c = Math.floor(v / 65536);
    t15 = v - c * 65536;
    t0 += c - 1 + 37 * (c - 1);
    o[0] = t0;
    o[1] = t1;
    o[2] = t2;
    o[3] = t3;
    o[4] = t4;
    o[5] = t5;
    o[6] = t6;
    o[7] = t7;
    o[8] = t8;
    o[9] = t9;
    o[10] = t10;
    o[11] = t11;
    o[12] = t12;
    o[13] = t13;
    o[14] = t14;
    o[15] = t15;
  }

  function square(o, a) {
    mul(o, a, a);
  }

  function inv25519(o, inp) {
    var c = gf();

    for (var i = 0; i < 16; i++) {
      c[i] = inp[i];
    }

    for (var i = 253; i >= 0; i--) {
      square(c, c);

      if (i !== 2 && i !== 4) {
        mul(c, c, inp);
      }
    }

    for (var i = 0; i < 16; i++) {
      o[i] = c[i];
    }
  }

  function scalarMult(n, p) {
    var z = new Uint8Array(32);
    var x = new Float64Array(80);
    var a = gf(),
        b = gf(),
        c = gf(),
        d = gf(),
        e = gf(),
        f = gf();

    for (var i = 0; i < 31; i++) {
      z[i] = n[i];
    }

    z[31] = n[31] & 127 | 64;
    z[0] &= 248;
    unpack25519(x, p);

    for (var i = 0; i < 16; i++) {
      b[i] = x[i];
    }

    a[0] = d[0] = 1;

    for (var i = 254; i >= 0; --i) {
      var r = z[i >>> 3] >>> (i & 7) & 1;
      sel25519(a, b, r);
      sel25519(c, d, r);
      add(e, a, c);
      sub(a, a, c);
      add(c, b, d);
      sub(b, b, d);
      square(d, e);
      square(f, a);
      mul(a, c, a);
      mul(c, b, e);
      add(e, a, c);
      sub(a, a, c);
      square(b, a);
      sub(c, d, f);
      mul(a, c, _121665);
      add(a, a, d);
      mul(c, c, a);
      mul(a, d, f);
      mul(d, b, x);
      square(b, e);
      sel25519(a, b, r);
      sel25519(c, d, r);
    }

    for (var i = 0; i < 16; i++) {
      x[i + 16] = a[i];
      x[i + 32] = c[i];
      x[i + 48] = b[i];
      x[i + 64] = d[i];
    }

    var x32 = x.subarray(32);
    var x16 = x.subarray(16);
    inv25519(x32, x32);
    mul(x16, x16, x32);
    var q = new Uint8Array(32);
    pack25519(q, x16);
    return q;
  }

  exports.scalarMult = scalarMult;

  function scalarMultBase(n) {
    return scalarMult(n, _9);
  }

  exports.scalarMultBase = scalarMultBase;

  function generateKeyPairFromSeed(seed) {
    if (seed.length !== exports.SECRET_KEY_LENGTH) {
      throw new Error("x25519: seed must be " + exports.SECRET_KEY_LENGTH + " bytes");
    }

    var secretKey = new Uint8Array(seed);
    var publicKey = scalarMultBase(secretKey);
    return {
      publicKey: publicKey,
      secretKey: secretKey
    };
  }

  exports.generateKeyPairFromSeed = generateKeyPairFromSeed;

  function generateKeyPair(prng) {
    var seed = random$1.randomBytes(32, prng);
    var result = generateKeyPairFromSeed(seed);
    wipe_1.wipe(seed);
    return result;
  }

  exports.generateKeyPair = generateKeyPair;

  function sharedKey(mySecretKey, theirPublicKey, rejectZero) {
    if (rejectZero === void 0) {
      rejectZero = false;
    }

    if (mySecretKey.length !== exports.PUBLIC_KEY_LENGTH) {
      throw new Error("X25519: incorrect secret key length");
    }

    if (theirPublicKey.length !== exports.PUBLIC_KEY_LENGTH) {
      throw new Error("X25519: incorrect public key length");
    }

    var result = scalarMult(mySecretKey, theirPublicKey);

    if (rejectZero) {
      var zeros = 0;

      for (var i = 0; i < result.length; i++) {
        zeros |= result[i];
      }

      if (zeros === 0) {
        throw new Error("X25519: invalid shared key");
      }
    }

    return result;
  }

  exports.sharedKey = sharedKey;
});
unwrapExports(x25519);

var shared$1 = createCommonjsModule(function (module, exports) {

  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    });
  } : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
  });

  var __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function (o, v) {
    Object.defineProperty(o, "default", {
      enumerable: true,
      value: v
    });
  } : function (o, v) {
    o["default"] = v;
  });

  var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) {
      if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }

    __setModuleDefault(result, mod);

    return result;
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.deserialize = exports.serialize = exports.getMacKey = exports.getEncryptionKey = exports.getSharedKey = exports.getSenderKeyPair = exports.generateKeyPair = exports.generatePnrgFromEntropy = exports.derive = void 0;

  var x25519$1 = __importStar(x25519);

  function derive(privateKey, publicKey) {
    return x25519$1.sharedKey(privateKey, publicKey);
  }

  exports.derive = derive;

  function generatePnrgFromEntropy(entropy) {
    return {
      isAvailable: true,
      randomBytes: function randomBytes() {
        return entropy;
      }
    };
  }

  exports.generatePnrgFromEntropy = generatePnrgFromEntropy;

  function generateKeyPair(entropy) {
    var prng = typeof entropy !== 'undefined' ? generatePnrgFromEntropy(entropy) : undefined;
    var keyPair = x25519$1.generateKeyPair(prng);
    return {
      publicKey: keyPair.publicKey,
      privateKey: keyPair.secretKey
    };
  }

  exports.generateKeyPair = generateKeyPair;

  function getSenderKeyPair(opts) {
    var keyPair = (opts === null || opts === void 0 ? void 0 : opts.sender) || generateKeyPair();
    return {
      privateKey: keyPair.privateKey,
      publicKey: keyPair.publicKey
    };
  }

  exports.getSenderKeyPair = getSenderKeyPair;

  function getSharedKey(privateKey, publicKey) {
    return derive(privateKey, publicKey);
  }

  exports.getSharedKey = getSharedKey;

  function getEncryptionKey(hash) {
    return new Uint8Array(hash.slice(cjs$5.LENGTH_0, cjs$5.KEY_LENGTH));
  }

  exports.getEncryptionKey = getEncryptionKey;

  function getMacKey(hash) {
    return new Uint8Array(hash.slice(cjs$5.KEY_LENGTH));
  }

  exports.getMacKey = getMacKey;

  function serialize(opts) {
    return cjs$4.concatArrays(opts.iv, opts.publicKey, opts.mac, opts.ciphertext);
  }

  exports.serialize = serialize;

  function deserialize(arr) {
    var slice0 = cjs$5.LENGTH_0;
    var slice1 = slice0 + cjs$5.IV_LENGTH;
    var slice2 = slice1 + cjs$5.KEY_LENGTH;
    var slice3 = slice2 + cjs$5.MAC_LENGTH;
    var slice4 = arr.length;
    return {
      iv: arr.slice(slice0, slice1),
      publicKey: arr.slice(slice1, slice2),
      mac: arr.slice(slice2, slice3),
      ciphertext: arr.slice(slice3, slice4)
    };
  }

  exports.deserialize = deserialize;
});
unwrapExports(shared$1);

var async$3 = createCommonjsModule(function (module, exports) {

  var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.decrypt = exports.decryptWithSharedKey = exports.encrypt = exports.encryptWithSharedKey = void 0;

  function getEciesKeys(sharedKey) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var hash;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return cjs$5.sha512(sharedKey);

            case 2:
              hash = _context.sent;
              return _context.abrupt("return", {
                encryptionKey: shared$1.getEncryptionKey(hash),
                macKey: shared$1.getMacKey(hash)
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
  }

  function encryptWithSharedKey(msg, sharedKey, publicKey, iv) {
    if (iv === void 0) {
      iv = cjs$5.randomBytes(cjs$5.IV_LENGTH);
    }

    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _yield$getEciesKeys, encryptionKey, macKey, ciphertext, dataToMac, mac;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return getEciesKeys(sharedKey);

            case 2:
              _yield$getEciesKeys = _context2.sent;
              encryptionKey = _yield$getEciesKeys.encryptionKey;
              macKey = _yield$getEciesKeys.macKey;
              _context2.next = 7;
              return cjs$5.aesCbcEncrypt(iv, encryptionKey, msg);

            case 7:
              ciphertext = _context2.sent;
              dataToMac = cjs$4.concatArrays(iv, publicKey, ciphertext);
              _context2.next = 11;
              return cjs$5.hmacSha256Sign(macKey, dataToMac);

            case 11:
              mac = _context2.sent;
              return _context2.abrupt("return", shared$1.serialize({
                iv: iv,
                publicKey: publicKey,
                ciphertext: ciphertext,
                mac: mac
              }));

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
  }

  exports.encryptWithSharedKey = encryptWithSharedKey;

  function encrypt(msg, receiverPublicKey, opts) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var _shared_1$getSenderKe, publicKey, privateKey, sharedKey;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _shared_1$getSenderKe = shared$1.getSenderKeyPair(opts), publicKey = _shared_1$getSenderKe.publicKey, privateKey = _shared_1$getSenderKe.privateKey;
              sharedKey = shared$1.getSharedKey(privateKey, receiverPublicKey);
              return _context3.abrupt("return", encryptWithSharedKey(msg, sharedKey, publicKey, opts === null || opts === void 0 ? void 0 : opts.iv));

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
  }

  exports.encrypt = encrypt;

  function decryptWithSharedKey(encrypted, sharedKey) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var _shared_1$deserialize, iv, publicKey, mac, ciphertext, _yield$getEciesKeys2, encryptionKey, macKey, dataToMac, macTest, msg;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _shared_1$deserialize = shared$1.deserialize(encrypted), iv = _shared_1$deserialize.iv, publicKey = _shared_1$deserialize.publicKey, mac = _shared_1$deserialize.mac, ciphertext = _shared_1$deserialize.ciphertext;
              _context4.next = 3;
              return getEciesKeys(sharedKey);

            case 3:
              _yield$getEciesKeys2 = _context4.sent;
              encryptionKey = _yield$getEciesKeys2.encryptionKey;
              macKey = _yield$getEciesKeys2.macKey;
              dataToMac = cjs$4.concatArrays(iv, publicKey, ciphertext);
              _context4.next = 9;
              return cjs$5.hmacSha256Verify(macKey, dataToMac, mac);

            case 9:
              macTest = _context4.sent;
              cjs$5.assert(macTest, cjs$5.ERROR_BAD_MAC);
              _context4.next = 13;
              return cjs$5.aesCbcDecrypt(iv, encryptionKey, ciphertext);

            case 13:
              msg = _context4.sent;
              return _context4.abrupt("return", msg);

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
  }

  exports.decryptWithSharedKey = decryptWithSharedKey;

  function decrypt(encrypted, privateKey) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var _shared_1$deserialize2, publicKey, sharedKey;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _shared_1$deserialize2 = shared$1.deserialize(encrypted), publicKey = _shared_1$deserialize2.publicKey;
              sharedKey = shared$1.getSharedKey(privateKey, publicKey);
              return _context5.abrupt("return", decryptWithSharedKey(encrypted, sharedKey));

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
  }

  exports.decrypt = decrypt;
});
unwrapExports(async$3);

var sync$3 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.decryptSync = exports.decryptWithSharedKeySync = exports.encryptSync = exports.encryptWithSharedKeySync = void 0;

  function getEciesKeysSync(sharedKey) {
    var hash = cjs$5.sha512Sync(sharedKey);
    return {
      encryptionKey: shared$1.getEncryptionKey(hash),
      macKey: shared$1.getMacKey(hash)
    };
  }

  function encryptWithSharedKeySync(msg, sharedKey, publicKey, iv) {
    if (iv === void 0) {
      iv = cjs$5.randomBytes(cjs$5.IV_LENGTH);
    }

    var _getEciesKeysSync = getEciesKeysSync(sharedKey),
        encryptionKey = _getEciesKeysSync.encryptionKey,
        macKey = _getEciesKeysSync.macKey;

    var ciphertext = cjs$5.aesCbcEncryptSync(iv, encryptionKey, msg);
    var dataToMac = cjs$4.concatArrays(iv, publicKey, ciphertext);
    var mac = cjs$5.hmacSha256SignSync(macKey, dataToMac);
    return shared$1.serialize({
      iv: iv,
      publicKey: publicKey,
      ciphertext: ciphertext,
      mac: mac
    });
  }

  exports.encryptWithSharedKeySync = encryptWithSharedKeySync;

  function encryptSync(msg, receiverPublicKey, opts) {
    var _shared_1$getSenderKe = shared$1.getSenderKeyPair(opts),
        publicKey = _shared_1$getSenderKe.publicKey,
        privateKey = _shared_1$getSenderKe.privateKey;

    var sharedKey = shared$1.getSharedKey(privateKey, receiverPublicKey);
    return encryptWithSharedKeySync(msg, sharedKey, publicKey, opts === null || opts === void 0 ? void 0 : opts.iv);
  }

  exports.encryptSync = encryptSync;

  function decryptWithSharedKeySync(encrypted, sharedKey) {
    var _shared_1$deserialize = shared$1.deserialize(encrypted),
        iv = _shared_1$deserialize.iv,
        publicKey = _shared_1$deserialize.publicKey,
        mac = _shared_1$deserialize.mac,
        ciphertext = _shared_1$deserialize.ciphertext;

    var _getEciesKeysSync2 = getEciesKeysSync(sharedKey),
        encryptionKey = _getEciesKeysSync2.encryptionKey,
        macKey = _getEciesKeysSync2.macKey;

    var dataToMac = cjs$4.concatArrays(iv, publicKey, ciphertext);
    var macTest = cjs$5.hmacSha256VerifySync(macKey, dataToMac, mac);
    cjs$5.assert(macTest, cjs$5.ERROR_BAD_MAC);
    var msg = cjs$5.aesCbcDecryptSync(iv, encryptionKey, ciphertext);
    return msg;
  }

  exports.decryptWithSharedKeySync = decryptWithSharedKeySync;

  function decryptSync(encrypted, privateKey) {
    var _shared_1$deserialize2 = shared$1.deserialize(encrypted),
        publicKey = _shared_1$deserialize2.publicKey;

    var sharedKey = shared$1.getSharedKey(privateKey, publicKey);
    return decryptWithSharedKeySync(encrypted, sharedKey);
  }

  exports.decryptSync = decryptSync;
});
unwrapExports(sync$3);

var ecies = createCommonjsModule(function (module, exports) {

  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    });
  } : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
  });

  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports) {
    for (var p in m) {
      if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
    }
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  __exportStar(async$3, exports);

  __exportStar(sync$3, exports);

  __exportStar(shared$1, exports);
});
unwrapExports(ecies);

var cjs$6 = createCommonjsModule(function (module, exports) {

  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    });
  } : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
  });

  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports) {
    for (var p in m) {
      if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
    }
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  __exportStar(cjs$5, exports);

  __exportStar(ecies, exports);
});
unwrapExports(cjs$6);

var crypto$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.decrypt = exports.encrypt = exports.sha256 = exports.deriveSharedKey = exports.generateRandomBytes32 = exports.generateKeyPair = void 0;

  var eccies25519 = tslib_1.__importStar(cjs$6);

  var encUtils = tslib_1.__importStar(cjs$4);

  function generateKeyPair() {
    var keyPair = eccies25519.generateKeyPair();
    return {
      privateKey: encUtils.arrayToHex(keyPair.privateKey),
      publicKey: encUtils.arrayToHex(keyPair.publicKey)
    };
  }

  exports.generateKeyPair = generateKeyPair;

  function generateRandomBytes32() {
    return encUtils.arrayToHex(eccies25519.randomBytes(32));
  }

  exports.generateRandomBytes32 = generateRandomBytes32;

  function deriveSharedKey(privateKeyA, publicKeyB) {
    var sharedKey = eccies25519.derive(encUtils.hexToArray(privateKeyA), encUtils.hexToArray(publicKeyB));
    return encUtils.arrayToHex(sharedKey);
  }

  exports.deriveSharedKey = deriveSharedKey;

  function sha256(msg) {
    return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var hash;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return eccies25519.sha256(encUtils.hexToArray(msg));

            case 2:
              hash = _context.sent;
              return _context.abrupt("return", encUtils.arrayToHex(hash));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
  }

  exports.sha256 = sha256;

  function encrypt(params) {
    return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var msg, sharedKey, publicKey, iv, encrypted;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              msg = encUtils.utf8ToArray(params.message);
              sharedKey = encUtils.hexToArray(params.sharedKey);
              publicKey = encUtils.hexToArray(params.publicKey);
              iv = typeof params.iv !== "undefined" ? encUtils.hexToArray(params.iv) : undefined;
              _context2.next = 6;
              return eccies25519.encryptWithSharedKey(msg, sharedKey, publicKey, iv);

            case 6:
              encrypted = _context2.sent;
              return _context2.abrupt("return", encUtils.arrayToHex(encrypted));

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
  }

  exports.encrypt = encrypt;

  function decrypt(params) {
    return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var encrypted, sharedKey, msg;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              encrypted = encUtils.hexToArray(params.encrypted);
              sharedKey = encUtils.hexToArray(params.sharedKey);
              _context3.next = 4;
              return eccies25519.decryptWithSharedKey(encrypted, sharedKey);

            case 4:
              msg = _context3.sent;
              return _context3.abrupt("return", encUtils.arrayToUtf8(msg));

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
  }

  exports.decrypt = decrypt;
});
unwrapExports(crypto$1);

var strictUriEncode = function strictUriEncode(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (x) {
    return "%" + x.charCodeAt(0).toString(16).toUpperCase();
  });
};

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
  try {
    return decodeURIComponent(components.join(''));
  } catch (err) {}

  if (components.length === 1) {
    return components;
  }

  split = split || 1;
  var left = components.slice(0, split);
  var right = components.slice(split);
  return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
  try {
    return decodeURIComponent(input);
  } catch (err) {
    var tokens = input.match(singleMatcher);

    for (var i = 1; i < tokens.length; i++) {
      input = decodeComponents(tokens, i).join('');
      tokens = input.match(singleMatcher);
    }

    return input;
  }
}

function customDecodeURIComponent(input) {
  var replaceMap = {
    '%FE%FF': "\uFFFD\uFFFD",
    '%FF%FE': "\uFFFD\uFFFD"
  };
  var match = multiMatcher.exec(input);

  while (match) {
    try {
      replaceMap[match[0]] = decodeURIComponent(match[0]);
    } catch (err) {
      var result = decode(match[0]);

      if (result !== match[0]) {
        replaceMap[match[0]] = result;
      }
    }

    match = multiMatcher.exec(input);
  }

  replaceMap['%C2'] = "\uFFFD";
  var entries = Object.keys(replaceMap);

  for (var i = 0; i < entries.length; i++) {
    var key = entries[i];
    input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
  }

  return input;
}

var decodeUriComponent = function decodeUriComponent(encodedURI) {
  if (typeof encodedURI !== 'string') {
    throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
  }

  try {
    encodedURI = encodedURI.replace(/\+/g, ' ');
    return decodeURIComponent(encodedURI);
  } catch (err) {
    return customDecodeURIComponent(encodedURI);
  }
};

var splitOnFirst = function splitOnFirst(string, separator) {
  if (!(typeof string === 'string' && typeof separator === 'string')) {
    throw new TypeError('Expected the arguments to be of type `string`');
  }

  if (separator === '') {
    return [string];
  }

  var separatorIndex = string.indexOf(separator);

  if (separatorIndex === -1) {
    return [string];
  }

  return [string.slice(0, separatorIndex), string.slice(separatorIndex + separator.length)];
};

var filterObj = function filterObj(obj, predicate) {
  var ret = {};
  var keys = Object.keys(obj);
  var isArr = Array.isArray(predicate);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var val = obj[key];

    if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
      ret[key] = val;
    }
  }

  return ret;
};

var queryString = createCommonjsModule(function (module, exports) {

  var isNullOrUndefined = function isNullOrUndefined(value) {
    return value === null || value === undefined;
  };

  function encoderForArrayFormat(options) {
    switch (options.arrayFormat) {
      case 'index':
        return function (key) {
          return function (result, value) {
            var index = result.length;

            if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
              return result;
            }

            if (value === null) {
              return [].concat(result, [[encode(key, options), '[', index, ']'].join('')]);
            }

            return [].concat(result, [[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')]);
          };
        };

      case 'bracket':
        return function (key) {
          return function (result, value) {
            if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
              return result;
            }

            if (value === null) {
              return [].concat(result, [[encode(key, options), '[]'].join('')]);
            }

            return [].concat(result, [[encode(key, options), '[]=', encode(value, options)].join('')]);
          };
        };

      case 'comma':
      case 'separator':
        return function (key) {
          return function (result, value) {
            if (value === null || value === undefined || value.length === 0) {
              return result;
            }

            if (result.length === 0) {
              return [[encode(key, options), '=', encode(value, options)].join('')];
            }

            return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
          };
        };

      default:
        return function (key) {
          return function (result, value) {
            if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
              return result;
            }

            if (value === null) {
              return [].concat(result, [encode(key, options)]);
            }

            return [].concat(result, [[encode(key, options), '=', encode(value, options)].join('')]);
          };
        };
    }
  }

  function parserForArrayFormat(options) {
    var result;

    switch (options.arrayFormat) {
      case 'index':
        return function (key, value, accumulator) {
          result = /\[(\d*)\]$/.exec(key);
          key = key.replace(/\[\d*\]$/, '');

          if (!result) {
            accumulator[key] = value;
            return;
          }

          if (accumulator[key] === undefined) {
            accumulator[key] = {};
          }

          accumulator[key][result[1]] = value;
        };

      case 'bracket':
        return function (key, value, accumulator) {
          result = /(\[\])$/.exec(key);
          key = key.replace(/\[\]$/, '');

          if (!result) {
            accumulator[key] = value;
            return;
          }

          if (accumulator[key] === undefined) {
            accumulator[key] = [value];
            return;
          }

          accumulator[key] = [].concat(accumulator[key], value);
        };

      case 'comma':
      case 'separator':
        return function (key, value, accumulator) {
          var isArray = typeof value === 'string' && value.includes(options.arrayFormatSeparator);
          var isEncodedArray = typeof value === 'string' && !isArray && decode(value, options).includes(options.arrayFormatSeparator);
          value = isEncodedArray ? decode(value, options) : value;
          var newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map(function (item) {
            return decode(item, options);
          }) : value === null ? value : decode(value, options);
          accumulator[key] = newValue;
        };

      default:
        return function (key, value, accumulator) {
          if (accumulator[key] === undefined) {
            accumulator[key] = value;
            return;
          }

          accumulator[key] = [].concat(accumulator[key], value);
        };
    }
  }

  function validateArrayFormatSeparator(value) {
    if (typeof value !== 'string' || value.length !== 1) {
      throw new TypeError('arrayFormatSeparator must be single character string');
    }
  }

  function encode(value, options) {
    if (options.encode) {
      return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
    }

    return value;
  }

  function decode(value, options) {
    if (options.decode) {
      return decodeUriComponent(value);
    }

    return value;
  }

  function keysSorter(input) {
    if (Array.isArray(input)) {
      return input.sort();
    }

    if (typeof input === 'object') {
      return keysSorter(Object.keys(input)).sort(function (a, b) {
        return Number(a) - Number(b);
      }).map(function (key) {
        return input[key];
      });
    }

    return input;
  }

  function removeHash(input) {
    var hashStart = input.indexOf('#');

    if (hashStart !== -1) {
      input = input.slice(0, hashStart);
    }

    return input;
  }

  function getHash(url) {
    var hash = '';
    var hashStart = url.indexOf('#');

    if (hashStart !== -1) {
      hash = url.slice(hashStart);
    }

    return hash;
  }

  function extract(input) {
    input = removeHash(input);
    var queryStart = input.indexOf('?');

    if (queryStart === -1) {
      return '';
    }

    return input.slice(queryStart + 1);
  }

  function parseValue(value, options) {
    if (options.parseNumbers && !Number.isNaN(Number(value)) && typeof value === 'string' && value.trim() !== '') {
      value = Number(value);
    } else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
      value = value.toLowerCase() === 'true';
    }

    return value;
  }

  function parse(query, options) {
    options = Object.assign({
      decode: true,
      sort: true,
      arrayFormat: 'none',
      arrayFormatSeparator: ',',
      parseNumbers: false,
      parseBooleans: false
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    var formatter = parserForArrayFormat(options);
    var ret = Object.create(null);

    if (typeof query !== 'string') {
      return ret;
    }

    query = query.trim().replace(/^[?#&]/, '');

    if (!query) {
      return ret;
    }

    for (var _iterator = _createForOfIteratorHelperLoose(query.split('&')), _step; !(_step = _iterator()).done;) {
      var param = _step.value;

      if (param === '') {
        continue;
      }

      var _splitOnFirst = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '='),
          _key = _splitOnFirst[0],
          _value = _splitOnFirst[1];

      _value = _value === undefined ? null : ['comma', 'separator'].includes(options.arrayFormat) ? _value : decode(_value, options);
      formatter(decode(_key, options), _value, ret);
    }

    for (var _i = 0, _Object$keys = Object.keys(ret); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      var value = ret[key];

      if (typeof value === 'object' && value !== null) {
        for (var _i2 = 0, _Object$keys2 = Object.keys(value); _i2 < _Object$keys2.length; _i2++) {
          var k = _Object$keys2[_i2];
          value[k] = parseValue(value[k], options);
        }
      } else {
        ret[key] = parseValue(value, options);
      }
    }

    if (options.sort === false) {
      return ret;
    }

    return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce(function (result, key) {
      var value = ret[key];

      if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
        result[key] = keysSorter(value);
      } else {
        result[key] = value;
      }

      return result;
    }, Object.create(null));
  }

  exports.extract = extract;
  exports.parse = parse;

  exports.stringify = function (object, options) {
    if (!object) {
      return '';
    }

    options = Object.assign({
      encode: true,
      strict: true,
      arrayFormat: 'none',
      arrayFormatSeparator: ','
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);

    var shouldFilter = function shouldFilter(key) {
      return options.skipNull && isNullOrUndefined(object[key]) || options.skipEmptyString && object[key] === '';
    };

    var formatter = encoderForArrayFormat(options);
    var objectCopy = {};

    for (var _i3 = 0, _Object$keys3 = Object.keys(object); _i3 < _Object$keys3.length; _i3++) {
      var key = _Object$keys3[_i3];

      if (!shouldFilter(key)) {
        objectCopy[key] = object[key];
      }
    }

    var keys = Object.keys(objectCopy);

    if (options.sort !== false) {
      keys.sort(options.sort);
    }

    return keys.map(function (key) {
      var value = object[key];

      if (value === undefined) {
        return '';
      }

      if (value === null) {
        return encode(key, options);
      }

      if (Array.isArray(value)) {
        return value.reduce(formatter(key), []).join('&');
      }

      return encode(key, options) + '=' + encode(value, options);
    }).filter(function (x) {
      return x.length > 0;
    }).join('&');
  };

  exports.parseUrl = function (url, options) {
    options = Object.assign({
      decode: true
    }, options);

    var _splitOnFirst2 = splitOnFirst(url, '#'),
        url_ = _splitOnFirst2[0],
        hash = _splitOnFirst2[1];

    return Object.assign({
      url: url_.split('?')[0] || '',
      query: parse(extract(url), options)
    }, options && options.parseFragmentIdentifier && hash ? {
      fragmentIdentifier: decode(hash, options)
    } : {});
  };

  exports.stringifyUrl = function (object, options) {
    options = Object.assign({
      encode: true,
      strict: true
    }, options);
    var url = removeHash(object.url).split('?')[0] || '';
    var queryFromUrl = exports.extract(object.url);
    var parsedQueryFromUrl = exports.parse(queryFromUrl, {
      sort: false
    });
    var query = Object.assign(parsedQueryFromUrl, object.query);
    var queryString = exports.stringify(query, options);

    if (queryString) {
      queryString = "?" + queryString;
    }

    var hash = getHash(object.url);

    if (object.fragmentIdentifier) {
      hash = "#" + encode(object.fragmentIdentifier, options);
    }

    return "" + url + queryString + hash;
  };

  exports.pick = function (input, filter, options) {
    options = Object.assign({
      parseFragmentIdentifier: true
    }, options);

    var _exports$parseUrl = exports.parseUrl(input, options),
        url = _exports$parseUrl.url,
        query = _exports$parseUrl.query,
        fragmentIdentifier = _exports$parseUrl.fragmentIdentifier;

    return exports.stringifyUrl({
      url: url,
      query: filterObj(query, filter),
      fragmentIdentifier: fragmentIdentifier
    }, options);
  };

  exports.exclude = function (input, filter, options) {
    var exclusionFilter = Array.isArray(filter) ? function (key) {
      return !filter.includes(key);
    } : function (key, value) {
      return !filter(key, value);
    };
    return exports.pick(input, exclusionFilter, options);
  };
});

var cjs$7 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function getFromWindow(name) {
    var res = undefined;

    if (typeof window !== 'undefined' && typeof window[name] !== 'undefined') {
      res = window[name];
    }

    return res;
  }

  exports.getFromWindow = getFromWindow;

  function getFromWindowOrThrow(name) {
    var res = getFromWindow(name);

    if (!res) {
      throw new Error(name + " is not defined in Window");
    }

    return res;
  }

  exports.getFromWindowOrThrow = getFromWindowOrThrow;

  function getDocumentOrThrow() {
    return getFromWindowOrThrow('document');
  }

  exports.getDocumentOrThrow = getDocumentOrThrow;

  function getDocument() {
    return getFromWindow('document');
  }

  exports.getDocument = getDocument;

  function getNavigatorOrThrow() {
    return getFromWindowOrThrow('navigator');
  }

  exports.getNavigatorOrThrow = getNavigatorOrThrow;

  function getNavigator() {
    return getFromWindow('navigator');
  }

  exports.getNavigator = getNavigator;

  function getLocationOrThrow() {
    return getFromWindowOrThrow('location');
  }

  exports.getLocationOrThrow = getLocationOrThrow;

  function getLocation() {
    return getFromWindow('location');
  }

  exports.getLocation = getLocation;

  function getCryptoOrThrow() {
    return getFromWindowOrThrow('crypto');
  }

  exports.getCryptoOrThrow = getCryptoOrThrow;

  function getCrypto() {
    return getFromWindow('crypto');
  }

  exports.getCrypto = getCrypto;

  function getLocalStorageOrThrow() {
    return getFromWindowOrThrow('localStorage');
  }

  exports.getLocalStorageOrThrow = getLocalStorageOrThrow;

  function getLocalStorage() {
    return getFromWindow('localStorage');
  }

  exports.getLocalStorage = getLocalStorage;
});
unwrapExports(cjs$7);

var cjs$8 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function getWindowMetadata() {
    var doc;
    var loc;

    try {
      doc = cjs$7.getDocumentOrThrow();
      loc = cjs$7.getLocationOrThrow();
    } catch (e) {
      return null;
    }

    function getIcons() {
      var links = doc.getElementsByTagName('link');
      var icons = [];

      for (var i = 0; i < links.length; i++) {
        var link = links[i];
        var rel = link.getAttribute('rel');

        if (rel) {
          if (rel.toLowerCase().indexOf('icon') > -1) {
            var href = link.getAttribute('href');

            if (href) {
              if (href.toLowerCase().indexOf('https:') === -1 && href.toLowerCase().indexOf('http:') === -1 && href.indexOf('//') !== 0) {
                var absoluteHref = loc.protocol + '//' + loc.host;

                if (href.indexOf('/') === 0) {
                  absoluteHref += href;
                } else {
                  var path = loc.pathname.split('/');
                  path.pop();
                  var finalPath = path.join('/');
                  absoluteHref += finalPath + '/' + href;
                }

                icons.push(absoluteHref);
              } else if (href.indexOf('//') === 0) {
                var absoluteUrl = loc.protocol + href;
                icons.push(absoluteUrl);
              } else {
                icons.push(href);
              }
            }
          }
        }
      }

      return icons;
    }

    function getWindowMetadataOfAny() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var metaTags = doc.getElementsByTagName('meta');

      var _loop = function _loop(i) {
        var tag = metaTags[i];
        var attributes = ['itemprop', 'property', 'name'].map(function (target) {
          return tag.getAttribute(target);
        }).filter(function (attr) {
          if (attr) {
            return args.includes(attr);
          }

          return false;
        });

        if (attributes.length && attributes) {
          var content = tag.getAttribute('content');

          if (content) {
            return {
              v: content
            };
          }
        }
      };

      for (var i = 0; i < metaTags.length; i++) {
        var _ret = _loop(i);

        if (typeof _ret === "object") return _ret.v;
      }

      return '';
    }

    function getName() {
      var name = getWindowMetadataOfAny('name', 'og:site_name', 'og:title', 'twitter:title');

      if (!name) {
        name = doc.title;
      }

      return name;
    }

    function getDescription() {
      var description = getWindowMetadataOfAny('description', 'og:description', 'twitter:description', 'keywords');
      return description;
    }

    var name = getName();
    var description = getDescription();
    var url = loc.origin;
    var icons = getIcons();
    var meta = {
      description: description,
      url: url,
      icons: icons,
      name: name
    };
    return meta;
  }

  exports.getWindowMetadata = getWindowMetadata;
});
unwrapExports(cjs$8);

var misc$2 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.capitalize = exports.capitalizeWord = exports.enumify = exports.mapEntries = exports.objToMap = exports.mapToObj = exports.assertType = exports.formatRelayRpcUrl = exports.getRelayClientMetadata = exports.getAppMetadata = exports.appendToQueryString = exports.getEnvironment = exports.isBrowser = exports.isReactNative = exports.isNode = void 0;

  var qs = tslib_1.__importStar(queryString);

  function isNode() {
    return typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined";
  }

  exports.isNode = isNode;

  function isReactNative() {
    return !cjs$7.getDocument() && !!cjs$7.getNavigator() && navigator.product === "ReactNative";
  }

  exports.isReactNative = isReactNative;

  function isBrowser() {
    return !isNode() && !!cjs$7.getNavigator();
  }

  exports.isBrowser = isBrowser;

  function getEnvironment() {
    if (isReactNative()) return "react-native";
    if (isNode()) return "node";
    if (isBrowser()) return "browser";
    return "unknown";
  }

  exports.getEnvironment = getEnvironment;

  function appendToQueryString(queryString, newQueryParams) {
    var queryParams = qs.parse(queryString);
    queryParams = Object.assign(Object.assign({}, queryParams), newQueryParams);
    queryString = qs.stringify(queryParams);
    return queryString;
  }

  exports.appendToQueryString = appendToQueryString;

  function getAppMetadata() {
    return cjs$8.getWindowMetadata() || undefined;
  }

  exports.getAppMetadata = getAppMetadata;

  function getRelayClientMetadata(protocol, version) {
    var _a;

    var env = getEnvironment();
    var metadata = {
      protocol: protocol,
      version: version,
      env: env
    };

    if (env === "browser") {
      metadata.host = ((_a = cjs$7.getLocation()) === null || _a === void 0 ? void 0 : _a.host) || "";
    }

    return metadata;
  }

  exports.getRelayClientMetadata = getRelayClientMetadata;

  function formatRelayRpcUrl(protocol, version, url) {
    var splitUrl = url.split("?");
    var params = getRelayClientMetadata(protocol, version);
    var queryString = appendToQueryString(splitUrl[1] || "", params);
    return splitUrl[0] + "?" + queryString;
  }

  exports.formatRelayRpcUrl = formatRelayRpcUrl;

  function assertType(obj, key, type) {
    if (!obj[key] || typeof obj[key] !== type) {
      throw new Error("Missing or invalid \"" + key + "\" param");
    }
  }

  exports.assertType = assertType;

  function mapToObj(map) {
    return Object.fromEntries(map.entries());
  }

  exports.mapToObj = mapToObj;

  function objToMap(obj) {
    return new Map(Object.entries(obj));
  }

  exports.objToMap = objToMap;

  function mapEntries(obj, cb) {
    var res = {};
    Object.keys(obj).forEach(function (key) {
      res[key] = cb(obj[key]);
    });
    return res;
  }

  exports.mapEntries = mapEntries;

  exports.enumify = function (x) {
    return x;
  };

  function capitalizeWord(word) {
    return word.trim().replace(/^\w/, function (c) {
      return c.toUpperCase();
    });
  }

  exports.capitalizeWord = capitalizeWord;

  function capitalize(str) {
    return str.split(" ").map(function (w) {
      return capitalizeWord(w);
    }).join(" ");
  }

  exports.capitalize = capitalize;
});
unwrapExports(misc$2);
var misc_10 = misc$2.getAppMetadata;

var error = createCommonjsModule(function (module, exports) {

  var _exports$ERROR_FORMAT;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getError = exports.ERROR_FORMATS = exports.ERROR = void 0;
  exports.ERROR = misc$2.enumify({
    GENERIC: "GENERIC",
    MISSING_OR_INVALID: "MISSING_OR_INVALID",
    MISSING_RESPONSE: "MISSING_RESPONSE",
    MISSING_DECRYPT_PARAMS: "MISSING_DECRYPT_PARAMS",
    INVALID_UPDATE_REQUEST: "INVALID_UPDATE_REQUEST",
    RECORD_ALREADY_EXISTS: "RECORD_ALREADY_EXISTS",
    RESTORE_WILL_OVERRIDE: "RESTORE_WILL_OVERRIDE",
    NO_MATCHING_ID: "NO_MATCHING_ID",
    NO_MATCHING_TOPIC: "NO_MATCHING_TOPIC",
    NO_MATCHING_RESPONSE: "NO_MATCHING_RESPONSE",
    UNKNOWN_JSONRPC_METHOD: "UNKNOWN_JSONRPC_METHOD",
    MISMATCHED_TOPIC: "MISMATCHED_TOPIC",
    MISMATCHED_ACCOUNTS: "MISMATCHED_ACCOUNTS",
    SETTLED: "SETTLED",
    NOT_APPROVED: "NOT_APPROVED",
    PROPOSAL_RESPONDED: "PROPOSAL_RESPONDED",
    RESPONSE_ACKNOWLEDGED: "RESPONSE_ACKNOWLEDGED",
    EXPIRED: "EXPIRED",
    SETTLE_TIMEOUT: "SETTLE_TIMEOUT",
    JSONRPC_REQUEST_TIMEOUT: "JSONRPC_REQUEST_TIMEOUT",
    UNAUTHORIZED_TARGET_CHAIN: "UNAUTHORIZED_TARGET_CHAIN",
    UNAUTHORIZED_JSON_RPC_METHOD: "UNAUTHORIZED_JSON_RPC_METHOD",
    UNAUTHORIZED_NOTIFICATION_TYPE: "UNAUTHORIZED_NOTIFICATION_TYPE",
    UNAUTHORIZED_UPDATE_REQUEST: "UNAUTHORIZED_UPDATE_REQUEST",
    UNAUTHORIZED_UPGRADE_REQUEST: "UNAUTHORIZED_UPGRADE_REQUEST",
    UNAUTHORIZED_MATCHING_CONTROLLER: "UNAUTHORIZED_MATCHING_CONTROLLER",
    JSONRPC_REQUEST_METHOD_REJECTED: "JSONRPC_REQUEST_METHOD_REJECTED",
    JSONRPC_REQUEST_METHOD_UNAUTHORIZED: "JSONRPC_REQUEST_METHOD_UNAUTHORIZED",
    JSONRPC_REQUEST_METHOD_UNSUPPORTED: "JSONRPC_REQUEST_METHOD_UNSUPPORTED",
    DISCONNECTED_ALL_CHAINS: "DISCONNECTED_ALL_CHAINS",
    DISCONNECTED_TARGET_CHAIN: "DISCONNECTED_TARGET_CHAIN",
    DISAPPROVED_CHAINS: "DISAPPROVED_CHAINS",
    DISAPPROVED_JSONRPC: "DISAPPROVED_JSONRPC",
    DISAPPROVED_NOTIFICATION: "DISAPPROVED_NOTIFICATION",
    UNSUPPORTED_CHAINS: "UNSUPPORTED_CHAINS",
    UNSUPPORTED_JSONRPC: "UNSUPPORTED_JSONRPC",
    UNSUPPORTED_NOTIFICATION: "UNSUPPORTED_NOTIFICATION",
    USER_DISCONNECTED: "USER_DISCONNECTED",
    UNKNOWN: "UNKNOWN"
  });
  var defaultParams = {
    message: "Something went wrong",
    name: "parameter",
    context: "session",
    blockchain: "Ethereum"
  };
  exports.ERROR_FORMATS = (_exports$ERROR_FORMAT = {}, _exports$ERROR_FORMAT[exports.ERROR.GENERIC] = function (params) {
    return {
      code: 0,
      message: (params === null || params === void 0 ? void 0 : params.message) || defaultParams.message
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.MISSING_OR_INVALID] = function (params) {
    return {
      code: 1000,
      message: "Missing or invalid " + ((params === null || params === void 0 ? void 0 : params.name) || defaultParams.name)
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.MISSING_RESPONSE] = function (params) {
    return {
      code: 1001,
      message: "Response is required for approved " + ((params === null || params === void 0 ? void 0 : params.context) || defaultParams.context) + " proposals"
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.MISSING_DECRYPT_PARAMS] = function (params) {
    return {
      code: 1002,
      message: "Decrypt params required for " + ((params === null || params === void 0 ? void 0 : params.context) || defaultParams.context)
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.INVALID_UPDATE_REQUEST] = function (params) {
    return {
      code: 1003,
      message: "Invalid " + ((params === null || params === void 0 ? void 0 : params.context) || defaultParams.context) + " update request"
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.RECORD_ALREADY_EXISTS] = function (params) {
    return {
      code: 1100,
      message: "Record already exists for " + ((params === null || params === void 0 ? void 0 : params.context) || defaultParams.context) + " matching id: " + (params === null || params === void 0 ? void 0 : params.id)
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.RESTORE_WILL_OVERRIDE] = function (params) {
    return {
      code: 1200,
      message: "Restore will override already set " + ((params === null || params === void 0 ? void 0 : params.context) || defaultParams.context)
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.NO_MATCHING_ID] = function (params) {
    return {
      code: 1300,
      message: "No matching " + ((params === null || params === void 0 ? void 0 : params.context) || defaultParams.context) + " with id: " + (params === null || params === void 0 ? void 0 : params.id)
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.NO_MATCHING_TOPIC] = function (params) {
    return {
      code: 1301,
      message: "No matching " + ((params === null || params === void 0 ? void 0 : params.context) || defaultParams.context) + " with topic: " + (params === null || params === void 0 ? void 0 : params.topic)
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.NO_MATCHING_RESPONSE] = function (params) {
    return {
      code: 1302,
      message: "No response found in pending " + ((params === null || params === void 0 ? void 0 : params.context) || defaultParams.context) + " proposal"
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.UNKNOWN_JSONRPC_METHOD] = function (params) {
    return {
      code: 1400,
      message: "Unknown JSON-RPC Method Requested: " + (params === null || params === void 0 ? void 0 : params.method)
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.MISMATCHED_TOPIC] = function (params) {
    return {
      code: 1500,
      message: "Mismatched topic for " + ((params === null || params === void 0 ? void 0 : params.context) || defaultParams.context) + " with id: " + (params === null || params === void 0 ? void 0 : params.id)
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.MISMATCHED_ACCOUNTS] = function (params) {
    return {
      code: 1501,
      message: "Invalid accounts with mismatched chains: " + (params === null || params === void 0 ? void 0 : params.mismatched.toString())
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.SETTLED] = function (params) {
    return {
      code: 1600,
      message: misc$2.capitalize((params === null || params === void 0 ? void 0 : params.context) || defaultParams.context) + " settled"
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.NOT_APPROVED] = function (params) {
    return {
      code: 1601,
      message: misc$2.capitalize((params === null || params === void 0 ? void 0 : params.context) || defaultParams.context) + " not approved"
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.PROPOSAL_RESPONDED] = function (params) {
    return {
      code: 1602,
      message: misc$2.capitalize((params === null || params === void 0 ? void 0 : params.context) || defaultParams.context) + " proposal responded"
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.RESPONSE_ACKNOWLEDGED] = function (params) {
    return {
      code: 1603,
      message: misc$2.capitalize((params === null || params === void 0 ? void 0 : params.context) || defaultParams.context) + " response acknowledge"
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.EXPIRED] = function (params) {
    return {
      code: 1603,
      message: misc$2.capitalize((params === null || params === void 0 ? void 0 : params.context) || defaultParams.context) + " expired"
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.SETTLE_TIMEOUT] = function (params) {
    return {
      code: 2000,
      message: misc$2.capitalize((params === null || params === void 0 ? void 0 : params.context) || defaultParams.context) + " failed to settle after " + (params === null || params === void 0 ? void 0 : params.timeout) / 1000 + " seconds"
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.JSONRPC_REQUEST_TIMEOUT] = function (params) {
    return {
      code: 2001,
      message: "JSON-RPC Request timeout after " + (params === null || params === void 0 ? void 0 : params.timeout) / 1000 + " seconds: " + (params === null || params === void 0 ? void 0 : params.method)
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.UNAUTHORIZED_TARGET_CHAIN] = function (params) {
    return {
      code: 3000,
      message: "Unauthorized Target ChainId Requested: " + (params === null || params === void 0 ? void 0 : params.chainId)
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.UNAUTHORIZED_JSON_RPC_METHOD] = function (params) {
    return {
      code: 3001,
      message: "Unauthorized JSON-RPC Method Requested: " + (params === null || params === void 0 ? void 0 : params.method)
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.UNAUTHORIZED_NOTIFICATION_TYPE] = function (params) {
    return {
      code: 3002,
      message: "Unauthorized Notification Type Requested: " + (params === null || params === void 0 ? void 0 : params.type)
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.UNAUTHORIZED_UPDATE_REQUEST] = function (params) {
    return {
      code: 3003,
      message: "Unauthorized " + ((params === null || params === void 0 ? void 0 : params.context) || defaultParams.context) + " update request"
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.UNAUTHORIZED_UPGRADE_REQUEST] = function (params) {
    return {
      code: 3004,
      message: "Unauthorized " + ((params === null || params === void 0 ? void 0 : params.context) || defaultParams.context) + " upgrade request"
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.UNAUTHORIZED_MATCHING_CONTROLLER] = function (params) {
    return {
      code: 3005,
      message: "Unauthorized: peer is also " + ((params === null || params === void 0 ? void 0 : params.controller) ? "" : "not ") + "controller"
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.JSONRPC_REQUEST_METHOD_REJECTED] = function () {
    return {
      code: 4001,
      message: "User rejected the request."
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.JSONRPC_REQUEST_METHOD_UNAUTHORIZED] = function (params) {
    return {
      code: 4100,
      message: "The requested account and/or method has not been authorized by the user."
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.JSONRPC_REQUEST_METHOD_UNSUPPORTED] = function (params) {
    return {
      code: 4200,
      message: "The requested method is not supported by this " + ((params === null || params === void 0 ? void 0 : params.blockhain) || defaultParams.blockchain) + " provider."
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.DISCONNECTED_ALL_CHAINS] = function () {
    return {
      code: 4900,
      message: "The provider is disconnected from all chains."
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.DISCONNECTED_TARGET_CHAIN] = function () {
    return {
      code: 4901,
      message: "The provider is disconnected from the specified chain."
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.DISAPPROVED_CHAINS] = function (params) {
    return {
      code: 5000,
      message: "User disapproved requested chains"
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.DISAPPROVED_JSONRPC] = function (params) {
    return {
      code: 5001,
      message: "User disapproved requested json-rpc methods"
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.DISAPPROVED_NOTIFICATION] = function (params) {
    return {
      code: 5002,
      message: "User disapproved requested notification types"
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.UNSUPPORTED_CHAINS] = function (params) {
    return {
      code: 5100,
      message: "Requested chains are not supported: " + (params === null || params === void 0 ? void 0 : params.chains.toString())
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.UNSUPPORTED_JSONRPC] = function (params) {
    return {
      code: 5101,
      message: "Requested json-rpc methods are not supported: " + (params === null || params === void 0 ? void 0 : params.methods.toString())
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.UNSUPPORTED_NOTIFICATION] = function (params) {
    return {
      code: 5102,
      message: "Requested notification types are not supported: " + (params === null || params === void 0 ? void 0 : params.types.toString())
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.USER_DISCONNECTED] = function (params) {
    return {
      code: 5900,
      message: "User disconnected " + ((params === null || params === void 0 ? void 0 : params.context) || defaultParams.context)
    };
  }, _exports$ERROR_FORMAT[exports.ERROR.UNKNOWN] = function (params) {
    return {
      code: 9000,
      message: "Unknown error" + (params ? ": " + (params === null || params === void 0 ? void 0 : params.toString()) : "")
    };
  }, _exports$ERROR_FORMAT);

  function getError(type, params) {
    var formatter = exports.ERROR_FORMATS[type];
    if (typeof formatter === "undefined") return getError(exports.ERROR.UNKNOWN, params);
    return formatter(params);
  }

  exports.getError = getError;
});
unwrapExports(error);
var error_1 = error.getError;
var error_3 = error.ERROR;

var uri = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.parseUri = exports.formatUri = void 0;

  var qs = tslib_1.__importStar(queryString);

  function formatUri(params) {
    return params.protocol + ":" + params.topic + "@" + params.version + "?" + qs.stringify({
      publicKey: params.publicKey,
      controller: params.controller,
      relay: cjs.safeJsonStringify(params.relay)
    });
  }

  exports.formatUri = formatUri;

  function parseUri(str) {
    var pathStart = str.indexOf(":");
    var pathEnd = str.indexOf("?") !== -1 ? str.indexOf("?") : undefined;
    var protocol = str.substring(0, pathStart);
    var path = str.substring(pathStart + 1, pathEnd);
    var requiredValues = path.split("@");
    var queryString = typeof pathEnd !== "undefined" ? str.substr(pathEnd) : "";
    var queryParams = qs.parse(queryString);
    var result = {
      protocol: protocol,
      topic: requiredValues[0],
      version: parseInt(requiredValues[1], 10),
      publicKey: queryParams.publicKey,
      controller: queryParams.controller === "true",
      relay: cjs.safeJsonParse(queryParams.relay)
    };
    return result;
  }

  exports.parseUri = parseUri;
});
unwrapExports(uri);

var validators$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.formatInvalidResult = exports.formatValidResult = exports.isValidationInvalid = exports.isValidUrl = exports.isValidAccountId = exports.isValidChainId = exports.isValidString = exports.isValidArray = exports.validateBlockchainState = exports.validateNotificationPermissions = exports.validateJsonRpcPermissions = exports.validateBlockchainPermissions = exports.validateSessionRespondParams = exports.validateSessionProposeParams = exports.validateSessionProposeParamsMetadata = exports.validateSessionProposeParamsPermissions = exports.isSubscriptionUpdatedEvent = exports.isSessionFailed = exports.isSessionResponded = exports.isSessionRespondedStatus = exports.isPairingFailed = exports.isPairingResponded = exports.isPairingRespondedStatus = void 0;

  function isPairingRespondedStatus(status) {
    return status === "responded";
  }

  exports.isPairingRespondedStatus = isPairingRespondedStatus;

  function isPairingResponded(pending) {
    return isPairingRespondedStatus(pending.status) && "outcome" in pending;
  }

  exports.isPairingResponded = isPairingResponded;

  function isPairingFailed(outcome) {
    return "reason" in outcome;
  }

  exports.isPairingFailed = isPairingFailed;

  function isSessionRespondedStatus(status) {
    return status === "responded";
  }

  exports.isSessionRespondedStatus = isSessionRespondedStatus;

  function isSessionResponded(pending) {
    return isPairingRespondedStatus(pending.status) && "outcome" in pending;
  }

  exports.isSessionResponded = isSessionResponded;

  function isSessionFailed(outcome) {
    return "reason" in outcome;
  }

  exports.isSessionFailed = isSessionFailed;

  function isSubscriptionUpdatedEvent(event) {
    return "update" in event;
  }

  exports.isSubscriptionUpdatedEvent = isSubscriptionUpdatedEvent;

  function validateSessionProposeParamsPermissions(permissions) {
    var blockchainPermissionsValidation = validateBlockchainPermissions(permissions.blockchain);

    if (isValidationInvalid(blockchainPermissionsValidation)) {
      return blockchainPermissionsValidation;
    }

    var jsonRpcPermissionsValidation = validateJsonRpcPermissions(permissions.jsonrpc);

    if (isValidationInvalid(jsonRpcPermissionsValidation)) {
      return jsonRpcPermissionsValidation;
    }

    var notificationPermissionsValidation = validateNotificationPermissions(permissions.notifications);

    if (isValidationInvalid(notificationPermissionsValidation)) {
      return notificationPermissionsValidation;
    }

    return formatValidResult();
  }

  exports.validateSessionProposeParamsPermissions = validateSessionProposeParamsPermissions;

  function validateSessionProposeParamsMetadata(metadata) {
    if (!isValidString(metadata.name)) {
      return formatInvalidResult(error.getError(error.ERROR.MISSING_OR_INVALID, {
        name: "metadata name"
      }));
    }

    if (!isValidString(metadata.description)) {
      return formatInvalidResult(error.getError(error.ERROR.MISSING_OR_INVALID, {
        name: "metadata description"
      }));
    }

    if (typeof metadata.url === "undefined" || !isValidUrl(metadata.url)) {
      return formatInvalidResult(error.getError(error.ERROR.MISSING_OR_INVALID, {
        name: "metadata url"
      }));
    }

    if (typeof metadata.icons === "undefined" || !isValidArray(metadata.icons, isValidUrl)) {
      return formatInvalidResult(error.getError(error.ERROR.MISSING_OR_INVALID, {
        name: "metadata icons"
      }));
    }

    return formatValidResult();
  }

  exports.validateSessionProposeParamsMetadata = validateSessionProposeParamsMetadata;

  function validateSessionProposeParams(params) {
    var permissionsValidation = validateSessionProposeParamsPermissions(params.permissions);

    if (isValidationInvalid(permissionsValidation)) {
      return permissionsValidation;
    }

    var metadataValidation = validateSessionProposeParamsMetadata(params.metadata);

    if (isValidationInvalid(metadataValidation)) {
      return metadataValidation;
    }

    return formatValidResult();
  }

  exports.validateSessionProposeParams = validateSessionProposeParams;

  function validateSessionRespondParams(params) {
    if (params.approved) {
      if (typeof params.response === "undefined") {
        return formatInvalidResult(error.getError(error.ERROR.MISSING_RESPONSE, {
          context: "session"
        }));
      }

      var stateValidation = validateBlockchainState(params.response.state, params.proposal.permissions.blockchain);

      if (isValidationInvalid(stateValidation)) {
        return stateValidation;
      }

      var metadataValidation = validateSessionProposeParamsMetadata(params.response.metadata);

      if (isValidationInvalid(metadataValidation)) {
        return metadataValidation;
      }
    }

    return formatValidResult();
  }

  exports.validateSessionRespondParams = validateSessionRespondParams;

  function validateBlockchainPermissions(blockchain) {
    if (typeof blockchain === "undefined" || typeof blockchain.chains === "undefined" || !isValidArray(blockchain.chains, isValidChainId)) {
      return formatInvalidResult(error.getError(error.ERROR.MISSING_OR_INVALID, {
        name: "blockchain permissions"
      }));
    }

    return formatValidResult();
  }

  exports.validateBlockchainPermissions = validateBlockchainPermissions;

  function validateJsonRpcPermissions(jsonrpc) {
    if (typeof jsonrpc === "undefined" || typeof jsonrpc.methods === "undefined" || !isValidArray(jsonrpc.methods, isValidString)) {
      return formatInvalidResult(error.getError(error.ERROR.MISSING_OR_INVALID, {
        name: "jsonrpc permissions"
      }));
    }

    return formatValidResult();
  }

  exports.validateJsonRpcPermissions = validateJsonRpcPermissions;

  function validateNotificationPermissions(notifications) {
    if (typeof notifications === "undefined" || typeof notifications.types === "undefined" || !isValidArray(notifications.types, isValidString)) {
      return formatInvalidResult(error.getError(error.ERROR.MISSING_OR_INVALID, {
        name: "notification permissions"
      }));
    }

    return formatValidResult();
  }

  exports.validateNotificationPermissions = validateNotificationPermissions;

  function validateBlockchainState(state, blockchain) {
    if (typeof blockchain === "undefined" || typeof blockchain.chains === "undefined" || !isValidArray(blockchain.chains, isValidChainId)) {
      return formatInvalidResult(error.getError(error.ERROR.MISSING_OR_INVALID, {
        name: "blockchain permissions"
      }));
    }

    if (typeof state === "undefined" || typeof state.accounts === "undefined" || !isValidArray(state.accounts, isValidAccountId)) {
      return formatInvalidResult(error.getError(error.ERROR.MISSING_OR_INVALID, {
        name: "state accounts"
      }));
    }

    var mismatched = state.accounts.filter(function (accountId) {
      var chainId = accountId.split("@")[1];
      return !blockchain.chains.includes(chainId);
    });

    if (mismatched.length) {
      return formatInvalidResult(error.getError(error.ERROR.MISMATCHED_ACCOUNTS, {
        mismatched: mismatched
      }));
    }

    return formatValidResult();
  }

  exports.validateBlockchainState = validateBlockchainState;

  function isValidArray(arr, itemCondition) {
    if (Array.isArray(arr)) {
      if (typeof itemCondition !== "undefined" && arr.length) {
        var matches = arr.filter(itemCondition);
        return matches.length === arr.length;
      } else {
        return true;
      }
    }

    return false;
  }

  exports.isValidArray = isValidArray;

  function isValidString(value) {
    return typeof value === "string" && !!value.trim();
  }

  exports.isValidString = isValidString;

  function isValidChainId(value) {
    if (isValidString(value) && value.includes(":")) {
      var split = value.split(":");
      return split.length === 2;
    }

    return false;
  }

  exports.isValidChainId = isValidChainId;

  function isValidAccountId(value) {
    if (isValidString(value) && value.includes("@")) {
      var split = value.split("@");

      if (split.length === 2) {
        return !!split[0] && isValidChainId(split[1]);
      }
    }

    return false;
  }

  exports.isValidAccountId = isValidAccountId;

  function isValidUrl(value) {
    if (isValidString(value)) {
      try {
        var url = new URL(value);
        return typeof url !== "undefined";
      } catch (e) {
        return false;
      }
    }

    return false;
  }

  exports.isValidUrl = isValidUrl;

  function isValidationInvalid(validation) {
    return "valid" in validation && validation.valid === false && "error" in validation && typeof validation.error.code === "number" && typeof validation.error.message === "string";
  }

  exports.isValidationInvalid = isValidationInvalid;

  function formatValidResult() {
    return {
      valid: true
    };
  }

  exports.formatValidResult = formatValidResult;

  function formatInvalidResult(error) {
    return {
      valid: false,
      error: error
    };
  }

  exports.formatInvalidResult = formatInvalidResult;
});
unwrapExports(validators$1);

var cjs$9 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  tslib_1.__exportStar(crypto$1, exports);

  tslib_1.__exportStar(error, exports);

  tslib_1.__exportStar(misc$2, exports);

  tslib_1.__exportStar(uri, exports);

  tslib_1.__exportStar(validators$1, exports);
});
unwrapExports(cjs$9);

var constants$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PINO_LOGGER_DEFAULTS = {
    level: 'info',
    prettyPrint: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname'
    }
  };
  exports.PINO_CUSTOM_CONTEXT_KEY = 'custom_context';
});
unwrapExports(constants$1);

var utils$2 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function getDefaultLoggerOptions(opts) {
    var _a, _b;

    return Object.assign(Object.assign({}, opts), {
      level: ((_a = opts) === null || _a === void 0 ? void 0 : _a.level) || constants$1.PINO_LOGGER_DEFAULTS.level,
      prettyPrint: ((_b = opts) === null || _b === void 0 ? void 0 : _b.prettyPrint) || constants$1.PINO_LOGGER_DEFAULTS.prettyPrint
    });
  }

  exports.getDefaultLoggerOptions = getDefaultLoggerOptions;

  function getBrowserLoggerContext(logger, customContextKey) {
    if (customContextKey === void 0) {
      customContextKey = constants$1.PINO_CUSTOM_CONTEXT_KEY;
    }

    return logger[customContextKey] || '';
  }

  exports.getBrowserLoggerContext = getBrowserLoggerContext;

  function setBrowserLoggerContext(logger, context, customContextKey) {
    if (customContextKey === void 0) {
      customContextKey = constants$1.PINO_CUSTOM_CONTEXT_KEY;
    }

    logger[customContextKey] = context;
    return logger;
  }

  exports.setBrowserLoggerContext = setBrowserLoggerContext;

  function getLoggerContext(logger, customContextKey) {
    if (customContextKey === void 0) {
      customContextKey = constants$1.PINO_CUSTOM_CONTEXT_KEY;
    }

    var context = '';

    if (typeof logger.bindings === 'undefined') {
      context = getBrowserLoggerContext(logger, customContextKey);
    } else {
      context = logger.bindings().context || '';
    }

    return context;
  }

  exports.getLoggerContext = getLoggerContext;

  function formatChildLoggerContext(logger, childContext, customContextKey) {
    if (customContextKey === void 0) {
      customContextKey = constants$1.PINO_CUSTOM_CONTEXT_KEY;
    }

    var parentContext = getLoggerContext(logger, customContextKey);
    var context = parentContext.trim() ? parentContext + "/" + childContext : childContext;
    return context;
  }

  exports.formatChildLoggerContext = formatChildLoggerContext;

  function generateChildLogger(logger, childContext, customContextKey) {
    if (customContextKey === void 0) {
      customContextKey = constants$1.PINO_CUSTOM_CONTEXT_KEY;
    }

    var context = formatChildLoggerContext(logger, childContext, customContextKey);
    var child = logger.child({
      context: context
    });
    return setBrowserLoggerContext(child, context, customContextKey);
  }

  exports.generateChildLogger = generateChildLogger;
});
unwrapExports(utils$2);

var cjs$a = createCommonjsModule(function (module, exports) {

  function __export(m) {
    for (var p in m) {
      if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
  }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  __export(constants$1);

  __export(utils$2);
});
unwrapExports(cjs$a);

var constants$2 = createCommonjsModule(function (module, exports) {

  var _exports$STANDARD_ERR;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.STANDARD_ERROR_MAP = exports.SERVER_ERROR_CODE_RANGE = exports.RESERVED_ERROR_CODES = exports.SERVER_ERROR = exports.INTERNAL_ERROR = exports.INVALID_PARAMS = exports.METHOD_NOT_FOUND = exports.INVALID_REQUEST = exports.PARSE_ERROR = void 0;
  exports.PARSE_ERROR = "PARSE_ERROR";
  exports.INVALID_REQUEST = "INVALID_REQUEST";
  exports.METHOD_NOT_FOUND = "METHOD_NOT_FOUND";
  exports.INVALID_PARAMS = "INVALID_PARAMS";
  exports.INTERNAL_ERROR = "INTERNAL_ERROR";
  exports.SERVER_ERROR = "SERVER_ERROR";
  exports.RESERVED_ERROR_CODES = [-32700, -32600, -32601, -32602, -32603];
  exports.SERVER_ERROR_CODE_RANGE = [-32000, -32099];
  exports.STANDARD_ERROR_MAP = (_exports$STANDARD_ERR = {}, _exports$STANDARD_ERR[exports.PARSE_ERROR] = {
    code: -32700,
    message: "Parse error"
  }, _exports$STANDARD_ERR[exports.INVALID_REQUEST] = {
    code: -32600,
    message: "Invalid Request"
  }, _exports$STANDARD_ERR[exports.METHOD_NOT_FOUND] = {
    code: -32601,
    message: "Method not found"
  }, _exports$STANDARD_ERR[exports.INVALID_PARAMS] = {
    code: -32602,
    message: "Invalid params"
  }, _exports$STANDARD_ERR[exports.INTERNAL_ERROR] = {
    code: -32603,
    message: "Internal error"
  }, _exports$STANDARD_ERR[exports.SERVER_ERROR] = {
    code: -32000,
    message: "Server error"
  }, _exports$STANDARD_ERR);
});
unwrapExports(constants$2);

var error$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.validateJsonRpcError = exports.getErrorByCode = exports.getError = exports.isValidErrorCode = exports.isReservedErrorCode = exports.isServerErrorCode = void 0;

  function isServerErrorCode(code) {
    return code <= constants$2.SERVER_ERROR_CODE_RANGE[0] && code >= constants$2.SERVER_ERROR_CODE_RANGE[1];
  }

  exports.isServerErrorCode = isServerErrorCode;

  function isReservedErrorCode(code) {
    return constants$2.RESERVED_ERROR_CODES.includes(code);
  }

  exports.isReservedErrorCode = isReservedErrorCode;

  function isValidErrorCode(code) {
    return typeof code === "number";
  }

  exports.isValidErrorCode = isValidErrorCode;

  function getError(type) {
    if (!Object.keys(constants$2.STANDARD_ERROR_MAP).includes(type)) {
      return constants$2.STANDARD_ERROR_MAP[constants$2.INTERNAL_ERROR];
    }

    return constants$2.STANDARD_ERROR_MAP[type];
  }

  exports.getError = getError;

  function getErrorByCode(code) {
    var match = Object.values(constants$2.STANDARD_ERROR_MAP).find(function (e) {
      return e.code === code;
    });

    if (!match) {
      return constants$2.STANDARD_ERROR_MAP[constants$2.INTERNAL_ERROR];
    }

    return match;
  }

  exports.getErrorByCode = getErrorByCode;

  function validateJsonRpcError(response) {
    if (typeof response.error.code === "undefined") {
      return {
        valid: false,
        error: "Missing code for JSON-RPC error"
      };
    }

    if (typeof response.error.message === "undefined") {
      return {
        valid: false,
        error: "Missing message for JSON-RPC error"
      };
    }

    if (!isValidErrorCode(response.error.code)) {
      return {
        valid: false,
        error: "Invalid error code type for JSON-RPC: " + response.error.code
      };
    }

    if (isReservedErrorCode(response.error.code)) {
      var _error = getErrorByCode(response.error.code);

      if (_error.message !== constants$2.STANDARD_ERROR_MAP[constants$2.INTERNAL_ERROR].message && response.error.message === _error.message) {
        return {
          valid: false,
          error: "Invalid error code message for JSON-RPC: " + response.error.code
        };
      }
    }

    return {
      valid: true
    };
  }

  exports.validateJsonRpcError = validateJsonRpcError;
});
unwrapExports(error$1);

var crypto$2 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isBrowserCryptoAvailable = exports.getSubtleCrypto = exports.getBrowerCrypto = void 0;

  function getBrowerCrypto() {
    return (commonjsGlobal === null || commonjsGlobal === void 0 ? void 0 : commonjsGlobal.crypto) || (commonjsGlobal === null || commonjsGlobal === void 0 ? void 0 : commonjsGlobal.msCrypto) || {};
  }

  exports.getBrowerCrypto = getBrowerCrypto;

  function getSubtleCrypto() {
    var browserCrypto = getBrowerCrypto();
    return browserCrypto.subtle || browserCrypto.webkitSubtle;
  }

  exports.getSubtleCrypto = getSubtleCrypto;

  function isBrowserCryptoAvailable() {
    return !!getBrowerCrypto() && !!getSubtleCrypto();
  }

  exports.isBrowserCryptoAvailable = isBrowserCryptoAvailable;
});
unwrapExports(crypto$2);

var env$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isBrowser = exports.isNode = exports.isReactNative = void 0;

  function isReactNative() {
    return typeof document === 'undefined' && typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
  }

  exports.isReactNative = isReactNative;

  function isNode() {
    return typeof process !== 'undefined' && typeof process.versions !== 'undefined' && typeof process.versions.node !== 'undefined';
  }

  exports.isNode = isNode;

  function isBrowser() {
    return !isReactNative() && !isNode();
  }

  exports.isBrowser = isBrowser;
});
unwrapExports(env$1);

var cjs$b = createCommonjsModule(function (module, exports) {

  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    });
  } : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
  });

  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports) {
    for (var p in m) {
      if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
    }
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  __exportStar(crypto$2, exports);

  __exportStar(env$1, exports);
});
unwrapExports(cjs$b);

var env$2 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isNodeJs = void 0;
  exports.isNodeJs = cjs$b.isNode;

  tslib_1.__exportStar(cjs$b, exports);
});
unwrapExports(env$2);

var format$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.formatErrorMessage = exports.formatJsonRpcError = exports.formatJsonRpcResult = exports.formatJsonRpcRequest = exports.payloadId = void 0;

  function payloadId() {
    var date = Date.now() * Math.pow(10, 3);
    var extra = Math.floor(Math.random() * Math.pow(10, 3));
    return date + extra;
  }

  exports.payloadId = payloadId;

  function formatJsonRpcRequest(method, params, id) {
    return {
      id: id || payloadId(),
      jsonrpc: "2.0",
      method: method,
      params: params
    };
  }

  exports.formatJsonRpcRequest = formatJsonRpcRequest;

  function formatJsonRpcResult(id, result) {
    return {
      id: id,
      jsonrpc: "2.0",
      result: result
    };
  }

  exports.formatJsonRpcResult = formatJsonRpcResult;

  function formatJsonRpcError(id, error) {
    return {
      id: id,
      jsonrpc: "2.0",
      error: formatErrorMessage(error)
    };
  }

  exports.formatJsonRpcError = formatJsonRpcError;

  function formatErrorMessage(error) {
    if (typeof error === "undefined") {
      return error$1.getError(constants$2.INTERNAL_ERROR);
    }

    if (typeof error === "string") {
      error = Object.assign(Object.assign({}, error$1.getError(constants$2.SERVER_ERROR)), {
        message: error
      });
    }

    if (error$1.isReservedErrorCode(error.code)) {
      error = error$1.getErrorByCode(error.code);
    }

    if (!error$1.isServerErrorCode(error.code)) {
      throw new Error("Error code is not in server code range");
    }

    return error;
  }

  exports.formatErrorMessage = formatErrorMessage;
});
unwrapExports(format$1);
var format_2 = format$1.formatJsonRpcError;

var routing = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isValidTrailingWildcardRoute = exports.isValidLeadingWildcardRoute = exports.isValidWildcardRoute = exports.isValidDefaultRoute = exports.isValidRoute = void 0;

  function isValidRoute(route) {
    if (route.includes("*")) {
      return isValidWildcardRoute(route);
    }

    if (/\W/g.test(route)) {
      return false;
    }

    return true;
  }

  exports.isValidRoute = isValidRoute;

  function isValidDefaultRoute(route) {
    return route === "*";
  }

  exports.isValidDefaultRoute = isValidDefaultRoute;

  function isValidWildcardRoute(route) {
    if (isValidDefaultRoute(route)) {
      return true;
    }

    if (!route.includes("*")) {
      return false;
    }

    if (route.split("*").length !== 2) {
      return false;
    }

    if (route.split("*").filter(function (x) {
      return x.trim() === "";
    }).length !== 1) {
      return false;
    }

    return true;
  }

  exports.isValidWildcardRoute = isValidWildcardRoute;

  function isValidLeadingWildcardRoute(route) {
    return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[0].trim();
  }

  exports.isValidLeadingWildcardRoute = isValidLeadingWildcardRoute;

  function isValidTrailingWildcardRoute(route) {
    return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[1].trim();
  }

  exports.isValidTrailingWildcardRoute = isValidTrailingWildcardRoute;
});
unwrapExports(routing);

var types$2 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  tslib_1.__exportStar(cjs$2, exports);
});
unwrapExports(types$2);

var validators$2 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isJsonRpcValidationInvalid = exports.isJsonRpcError = exports.isJsonRpcResult = exports.isJsonRpcResponse = exports.isJsonRpcRequest = exports.isJsonRpcPayload = void 0;

  function isJsonRpcPayload(payload) {
    return "id" in payload && "jsonrpc" in payload && payload.jsonrpc === "2.0";
  }

  exports.isJsonRpcPayload = isJsonRpcPayload;

  function isJsonRpcRequest(payload) {
    return isJsonRpcPayload(payload) && "method" in payload;
  }

  exports.isJsonRpcRequest = isJsonRpcRequest;

  function isJsonRpcResponse(payload) {
    return isJsonRpcPayload(payload) && (isJsonRpcResult(payload) || isJsonRpcError(payload));
  }

  exports.isJsonRpcResponse = isJsonRpcResponse;

  function isJsonRpcResult(payload) {
    return "result" in payload;
  }

  exports.isJsonRpcResult = isJsonRpcResult;

  function isJsonRpcError(payload) {
    return "error" in payload;
  }

  exports.isJsonRpcError = isJsonRpcError;

  function isJsonRpcValidationInvalid(validation) {
    return "error" in validation && validation.valid === false;
  }

  exports.isJsonRpcValidationInvalid = isJsonRpcValidationInvalid;
});
unwrapExports(validators$2);

var cjs$c = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  tslib_1.__exportStar(constants$2, exports);

  tslib_1.__exportStar(error$1, exports);

  tslib_1.__exportStar(env$2, exports);

  tslib_1.__exportStar(format$1, exports);

  tslib_1.__exportStar(routing, exports);

  tslib_1.__exportStar(types$2, exports);

  tslib_1.__exportStar(validators$2, exports);
});
unwrapExports(cjs$c);

var time = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FIVE_SECONDS = exports.TEN_SECONDS = exports.THIRTY_SECONDS = exports.FIVE_MINUTES = exports.SIX_HOURS = exports.ONE_DAY = exports.SEVEN_DAYS = exports.THREE_WEEKS = exports.THIRTY_DAYS = void 0;
  exports.THIRTY_DAYS = 2592000;
  exports.THREE_WEEKS = 1814400;
  exports.SEVEN_DAYS = 604800;
  exports.ONE_DAY = 86400;
  exports.SIX_HOURS = 21600;
  exports.FIVE_MINUTES = 300;
  exports.THIRTY_SECONDS = 30;
  exports.TEN_SECONDS = 10;
  exports.FIVE_SECONDS = 5;
});
unwrapExports(time);

var client$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CLIENT_STORAGE_OPTIONS = exports.CLIENT_EVENTS = exports.CLIENT_BEAT_INTERVAL = exports.CLIENT_CONTEXT = void 0;
  exports.CLIENT_CONTEXT = "client";
  exports.CLIENT_BEAT_INTERVAL = time.FIVE_SECONDS * 1000;
  exports.CLIENT_EVENTS = {
    beat: "client_beat",
    pairing: {
      proposal: "pairing_proposal",
      updated: "pairing_updated",
      created: "pairing_created",
      deleted: "pairing_deleted"
    },
    session: {
      proposal: "session_proposal",
      updated: "session_updated",
      created: "session_created",
      deleted: "session_deleted",
      notification: "session_notification",
      request: "session_request",
      response: "session_response"
    }
  };
  exports.CLIENT_STORAGE_OPTIONS = {
    database: ":memory:"
  };
});
unwrapExports(client$1);
var client_2 = client$1.CLIENT_EVENTS;

var history$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.HISTORY_CONTEXT = exports.HISTORY_EVENTS = void 0;
  exports.HISTORY_EVENTS = {
    created: "history_created",
    updated: "history_updated",
    deleted: "history_deleted",
    enabled: "history_enabled",
    disabled: "history_disabled",
    sync: "history_sync"
  };
  exports.HISTORY_CONTEXT = "history";
});
unwrapExports(history$1);

var pairing$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PAIRING_EVENTS = exports.PAIRING_STATUS = exports.PAIRING_SIGNAL_METHOD_URI = exports.PAIRING_DEFAULT_TTL = exports.PAIRING_CONTEXT = exports.PAIRING_JSONRPC = void 0;
  exports.PAIRING_JSONRPC = {
    approve: "wc_pairingApprove",
    reject: "wc_pairingReject",
    update: "wc_pairingUpdate",
    upgrade: "wc_pairingUpgrade",
    "delete": "wc_pairingDelete",
    payload: "wc_pairingPayload",
    ping: "wc_pairingPing"
  };
  exports.PAIRING_CONTEXT = "pairing";
  exports.PAIRING_DEFAULT_TTL = time.THIRTY_DAYS;
  exports.PAIRING_SIGNAL_METHOD_URI = "uri";
  exports.PAIRING_STATUS = {
    proposed: "proposed",
    responded: "responded",
    pending: "pending",
    settled: "settled"
  };
  exports.PAIRING_EVENTS = {
    proposed: "pairing_proposed",
    responded: "pairing_responded",
    settled: "pairing_settled",
    updated: "pairing_updated",
    deleted: "pairing_deleted",
    request: "pairing_request",
    response: "pairing_response",
    enabled: "pairing_enabled",
    disabled: "pairing_disabled",
    sync: "pairing_sync"
  };
});
unwrapExports(pairing$1);

var relayer$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RELAYER_EVENTS = exports.RELAYER_CONTEXT = exports.RELAYER_DEFAULT_RPC_URL = exports.RELAYER_DEFAULT_PROTOCOL = exports.RELAYER_DEFAULT_PUBLISH_TTL = void 0;
  exports.RELAYER_DEFAULT_PUBLISH_TTL = time.SIX_HOURS;
  exports.RELAYER_DEFAULT_PROTOCOL = "waku";
  exports.RELAYER_DEFAULT_RPC_URL = "wss://relay.walletconnect.org";
  exports.RELAYER_CONTEXT = "relayer";
  exports.RELAYER_EVENTS = {
    connect: "relayer_connect",
    disconnect: "relayer_disconnect",
    error: "relayer_error"
  };
});
unwrapExports(relayer$1);

var session$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SESSION_EMPTY_RESPONSE = exports.SESSION_EMPTY_METADATA = exports.SESSION_EMPTY_STATE = exports.SESSION_EMPTY_PERMISSIONS = exports.SESSION_EVENTS = exports.SESSION_STATUS = exports.SESSION_SIGNAL_METHOD_PAIRING = exports.SESSION_DEFAULT_TTL = exports.SESSION_CONTEXT = exports.SESSION_JSONRPC = void 0;
  exports.SESSION_JSONRPC = {
    propose: "wc_sessionPropose",
    approve: "wc_sessionApprove",
    reject: "wc_sessionReject",
    update: "wc_sessionUpdate",
    upgrade: "wc_sessionUpgrade",
    "delete": "wc_sessionDelete",
    payload: "wc_sessionPayload",
    ping: "wc_sessionPing",
    notification: "wc_sessionNotification"
  };
  exports.SESSION_CONTEXT = "session";
  exports.SESSION_DEFAULT_TTL = time.SEVEN_DAYS;
  exports.SESSION_SIGNAL_METHOD_PAIRING = "pairing";
  exports.SESSION_STATUS = {
    proposed: "proposed",
    responded: "responded",
    pending: "pending",
    settled: "settled"
  };
  exports.SESSION_EVENTS = {
    proposed: "session_proposed",
    responded: "session_responded",
    settled: "session_settled",
    updated: "session_updated",
    deleted: "session_deleted",
    notification: "session_notification",
    request: "session_request",
    response: "session_response",
    enabled: "session_enabled",
    disabled: "session_disabled",
    sync: "session_sync"
  };
  exports.SESSION_EMPTY_PERMISSIONS = {
    jsonrpc: {
      methods: []
    },
    blockchain: {
      chains: []
    },
    notifications: {
      types: []
    }
  };
  exports.SESSION_EMPTY_STATE = {
    accounts: []
  };
  exports.SESSION_EMPTY_METADATA = {
    name: "",
    description: "",
    url: "",
    icons: []
  };
  exports.SESSION_EMPTY_RESPONSE = {
    metadata: exports.SESSION_EMPTY_METADATA,
    state: exports.SESSION_EMPTY_STATE
  };
});
unwrapExports(session$1);

var subscription$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SUBSCRIPTION_DEFAULT_TTL = exports.SUBSCRIPTION_EVENTS = void 0;
  exports.SUBSCRIPTION_EVENTS = {
    payload: "subscription_payload",
    created: "subscription_created",
    updated: "subscription_updated",
    deleted: "subscription_deleted",
    enabled: "subscription_enabled",
    disabled: "subscription_disabled",
    sync: "subscription_sync"
  };
  exports.SUBSCRIPTION_DEFAULT_TTL = time.THIRTY_DAYS;
});
unwrapExports(subscription$1);

var constants$3 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  tslib_1.__exportStar(client$1, exports);

  tslib_1.__exportStar(history$1, exports);

  tslib_1.__exportStar(pairing$1, exports);

  tslib_1.__exportStar(relayer$1, exports);

  tslib_1.__exportStar(session$1, exports);

  tslib_1.__exportStar(subscription$1, exports);

  tslib_1.__exportStar(time, exports);
});
unwrapExports(constants$3);

var subscription$2 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Subscription = void 0;

  var Subscription = /*#__PURE__*/function (_types_1$ISubscriptio) {
    _inheritsLoose(Subscription, _types_1$ISubscriptio);

    function Subscription(client, logger, context, encrypted) {
      var _this;

      _this = _types_1$ISubscriptio.call(this, client, logger, context, encrypted) || this;
      _this.client = client;
      _this.logger = logger;
      _this.context = context;
      _this.encrypted = encrypted;
      _this.subscriptions = new Map();
      _this.events = new events.EventEmitter();
      _this.timeout = new Map();
      _this.cached = [];
      _this.logger = cjs$a.generateChildLogger(logger, _this.context);

      _this.registerEventListeners();

      return _this;
    }

    var _proto = Subscription.prototype;

    _proto.init = function init() {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.logger.trace("Initialized");
                _context.next = 3;
                return this.restore();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    };

    _proto.set = function set(topic, data, opts) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var error;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.isEnabled();

              case 2:
                if (!this.subscriptions.has(topic)) {
                  _context2.next = 6;
                  break;
                }

                this.update(topic, data);
                _context2.next = 15;
                break;

              case 6:
                this.logger.debug("Setting subscription");
                this.logger.trace({
                  type: "method",
                  method: "set",
                  topic: topic,
                  data: data,
                  opts: opts
                });

                if (!(this.encrypted && typeof opts.decryptKeys === "undefined")) {
                  _context2.next = 12;
                  break;
                }

                error = cjs$9.getError(cjs$9.ERROR.MISSING_DECRYPT_PARAMS, {
                  context: this.getSubscriptionContext()
                });
                this.logger.error(error.message);
                throw new Error(error.message);

              case 12:
                _context2.next = 14;
                return this.subscribeAndSet(topic, data, opts);

              case 14:
                this.events.emit(constants$3.SUBSCRIPTION_EVENTS.created, {
                  topic: topic,
                  data: data
                });

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
    };

    _proto.get = function get(topic) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var subscription;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.isEnabled();

              case 2:
                this.logger.debug("Getting subscription");
                this.logger.trace({
                  type: "method",
                  method: "get",
                  topic: topic
                });
                _context3.next = 6;
                return this.getSubscription(topic);

              case 6:
                subscription = _context3.sent;
                return _context3.abrupt("return", subscription.data);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
    };

    _proto.update = function update(topic, _update) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var subscription, data;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.isEnabled();

              case 2:
                this.logger.debug("Updating subscription");
                this.logger.trace({
                  type: "method",
                  method: "update",
                  topic: topic,
                  update: _update
                });
                _context4.next = 6;
                return this.getSubscription(topic);

              case 6:
                subscription = _context4.sent;
                data = Object.assign(Object.assign({}, subscription.data), _update);
                this.subscriptions.set(topic, Object.assign(Object.assign({}, subscription), {
                  topic: topic,
                  data: data
                }));
                this.events.emit(constants$3.SUBSCRIPTION_EVENTS.updated, {
                  topic: topic,
                  data: data,
                  update: _update
                });

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
    };

    _proto["delete"] = function _delete(topic, reason) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var subscription;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.isEnabled();

              case 2:
                this.logger.debug("Deleting subscription");
                this.logger.trace({
                  type: "method",
                  method: "delete",
                  topic: topic,
                  reason: reason
                });
                _context5.next = 6;
                return this.getSubscription(topic);

              case 6:
                subscription = _context5.sent;
                this.subscriptions["delete"](topic);
                _context5.next = 10;
                return this.client.relayer.unsubscribe(subscription.id, {
                  relay: subscription.relay,
                  decryptKeys: subscription.decryptKeys
                });

              case 10:
                this.events.emit(constants$3.SUBSCRIPTION_EVENTS.deleted, {
                  topic: topic,
                  data: subscription.data,
                  reason: reason
                });

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
    };

    _proto.on = function on(event, listener) {
      this.events.on(event, listener);
    };

    _proto.once = function once(event, listener) {
      this.events.once(event, listener);
    };

    _proto.off = function off(event, listener) {
      this.events.off(event, listener);
    };

    _proto.removeListener = function removeListener(event, listener) {
      this.events.removeListener(event, listener);
    };

    _proto.onPayload = function onPayload(payloadEvent) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.events.emit(constants$3.SUBSCRIPTION_EVENTS.payload, payloadEvent);

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
    };

    _proto.getNestedContext = function getNestedContext(length) {
      var nestedContext = cjs$a.getLoggerContext(this.logger).split("/");
      return nestedContext.slice(nestedContext.length - length, nestedContext.length);
    };

    _proto.getSubscriptionContext = function getSubscriptionContext() {
      return this.getNestedContext(2).join(" ");
    };

    _proto.getStorageKey = function getStorageKey() {
      var storageKeyPrefix = this.client.protocol + "@" + this.client.version + ":" + this.client.context;
      var subscriptionContext = this.getNestedContext(2).join(":");
      return storageKeyPrefix + "//" + subscriptionContext;
    };

    _proto.getSubscription = function getSubscription(topic) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var subscription, error;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.isEnabled();

              case 2:
                subscription = this.subscriptions.get(topic);

                if (subscription) {
                  _context7.next = 7;
                  break;
                }

                error = cjs$9.getError(cjs$9.ERROR.NO_MATCHING_TOPIC, {
                  context: this.getSubscriptionContext(),
                  topic: topic
                });
                this.logger.error(error.message);
                throw new Error(error.message);

              case 7:
                return _context7.abrupt("return", subscription);

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
    };

    _proto.subscribeAndSet = function subscribeAndSet(topic, data, opts) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var _this2 = this;

        var id, expiry;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.client.relayer.subscribe(topic, function (payload) {
                  return _this2.onPayload({
                    topic: topic,
                    payload: payload
                  });
                }, opts);

              case 2:
                id = _context8.sent;
                expiry = opts.expiry || Date.now() + constants$3.SUBSCRIPTION_DEFAULT_TTL * 1000;
                this.subscriptions.set(topic, Object.assign(Object.assign({
                  id: id,
                  topic: topic,
                  data: data
                }, opts), {
                  expiry: expiry
                }));
                this.setTimeout(topic, expiry);

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
    };

    _proto.setTimeout = function (_setTimeout) {
      function setTimeout(_x, _x2) {
        return _setTimeout.apply(this, arguments);
      }

      setTimeout.toString = function () {
        return _setTimeout.toString();
      };

      return setTimeout;
    }(function (topic, expiry) {
      var _this3 = this;

      if (this.timeout.has(topic)) return;
      var ttl = expiry - Date.now();

      if (ttl <= 0) {
        this.onTimeout(topic);
        return;
      }

      if (ttl > constants$3.CLIENT_BEAT_INTERVAL) return;
      var timeout = setTimeout(function () {
        return _this3.onTimeout(topic);
      }, ttl);
      this.timeout.set(topic, timeout);
    });

    _proto.deleteTimeout = function deleteTimeout(topic) {
      if (!this.timeout.has(topic)) return;
      var timeout = this.timeout.get(topic);
      if (typeof timeout === "undefined") return;
      clearTimeout(timeout);
    };

    _proto.resetTimeout = function resetTimeout() {
      this.timeout.forEach(function (timeout) {
        return clearTimeout(timeout);
      });
      this.timeout.clear();
    };

    _proto.onTimeout = function onTimeout(topic) {
      this.deleteTimeout(topic);
      this["delete"](topic, cjs$9.getError(cjs$9.ERROR.EXPIRED, {
        context: this.getSubscriptionContext()
      }));
    };

    _proto.checkSubscriptions = function checkSubscriptions() {
      var _this4 = this;

      this.subscriptions.forEach(function (subscription) {
        return _this4.setTimeout(subscription.topic, subscription.expiry);
      });
    };

    _proto.persist = function persist() {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.client.storage.setItem(this.getStorageKey(), this.values);

              case 2:
                this.events.emit(constants$3.SUBSCRIPTION_EVENTS.sync);

              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));
    };

    _proto.restore = function restore() {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var _this5 = this;

        var persisted, error;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                _context11.next = 3;
                return this.client.storage.getItem(this.getStorageKey());

              case 3:
                persisted = _context11.sent;

                if (!(typeof persisted === "undefined")) {
                  _context11.next = 6;
                  break;
                }

                return _context11.abrupt("return");

              case 6:
                if (persisted.length) {
                  _context11.next = 8;
                  break;
                }

                return _context11.abrupt("return");

              case 8:
                if (!this.subscriptions.size) {
                  _context11.next = 12;
                  break;
                }

                error = cjs$9.getError(cjs$9.ERROR.RESTORE_WILL_OVERRIDE, {
                  context: this.getSubscriptionContext()
                });
                this.logger.error(error.message);
                throw new Error(error.message);

              case 12:
                this.cached = persisted;
                _context11.next = 15;
                return Promise.all(this.cached.map(function (subscription) {
                  return tslib_1.__awaiter(_this5, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
                    var topic, data, opts;
                    return regeneratorRuntime.wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            topic = subscription.topic, data = subscription.data;
                            opts = {
                              relay: subscription.relay,
                              decryptKeys: subscription.decryptKeys,
                              expiry: subscription.expiry
                            };
                            _context10.next = 4;
                            return this.subscribeAndSet(topic, data, opts);

                          case 4:
                          case "end":
                            return _context10.stop();
                        }
                      }
                    }, _callee10, this);
                  }));
                }));

              case 15:
                _context11.next = 17;
                return this.enable();

              case 17:
                this.logger.debug("Successfully Restored subscriptions for " + this.getSubscriptionContext());
                this.logger.trace({
                  type: "method",
                  method: "restore",
                  subscriptions: this.values
                });
                _context11.next = 25;
                break;

              case 21:
                _context11.prev = 21;
                _context11.t0 = _context11["catch"](0);
                this.logger.debug("Failed to Restore subscriptions for " + this.getSubscriptionContext());
                this.logger.error(_context11.t0);

              case 25:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[0, 21]]);
      }));
    };

    _proto.reset = function reset() {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        var _this6 = this;

        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this.disable();

              case 2:
                _context13.next = 4;
                return Promise.all(this.cached.map(function (subscription) {
                  return tslib_1.__awaiter(_this6, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
                    var topic, data, opts;
                    return regeneratorRuntime.wrap(function _callee12$(_context12) {
                      while (1) {
                        switch (_context12.prev = _context12.next) {
                          case 0:
                            topic = subscription.topic, data = subscription.data;
                            opts = {
                              relay: subscription.relay,
                              decryptKeys: subscription.decryptKeys,
                              expiry: subscription.expiry
                            };
                            _context12.next = 4;
                            return this.subscribeAndSet(topic, data, opts);

                          case 4:
                          case "end":
                            return _context12.stop();
                        }
                      }
                    }, _callee12, this);
                  }));
                }));

              case 4:
                _context13.next = 6;
                return this.enable();

              case 6:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));
    };

    _proto.isEnabled = function isEnabled() {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var _this7 = this;

        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                if (this.cached.length) {
                  _context14.next = 2;
                  break;
                }

                return _context14.abrupt("return");

              case 2:
                return _context14.abrupt("return", new Promise(function (resolve) {
                  _this7.events.once(constants$3.SUBSCRIPTION_EVENTS.enabled, function () {
                    return resolve();
                  });
                }));

              case 3:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));
    };

    _proto.enable = function enable() {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                this.cached = [];
                this.events.emit(constants$3.SUBSCRIPTION_EVENTS.enabled);

              case 2:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));
    };

    _proto.disable = function disable() {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                if (!this.cached.length) {
                  this.cached = this.values;
                }

                this.resetTimeout();
                this.events.emit(constants$3.SUBSCRIPTION_EVENTS.disabled);

              case 3:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));
    };

    _proto.registerEventListeners = function registerEventListeners() {
      var _this8 = this;

      this.client.on(constants$3.CLIENT_EVENTS.beat, function () {
        return _this8.checkSubscriptions();
      });
      this.client.relayer.on(constants$3.RELAYER_EVENTS.connect, function () {
        return _this8.reset();
      });
      this.events.on(constants$3.SUBSCRIPTION_EVENTS.payload, function (payloadEvent) {
        _this8.logger.info("Emitting " + constants$3.SUBSCRIPTION_EVENTS.created);

        _this8.logger.debug({
          type: "event",
          event: constants$3.SUBSCRIPTION_EVENTS.created,
          data: payloadEvent
        });
      });
      this.events.on(constants$3.SUBSCRIPTION_EVENTS.created, function (createdEvent) {
        _this8.logger.info("Emitting " + constants$3.SUBSCRIPTION_EVENTS.created);

        _this8.logger.debug({
          type: "event",
          event: constants$3.SUBSCRIPTION_EVENTS.created,
          data: createdEvent
        });

        _this8.persist();
      });
      this.events.on(constants$3.SUBSCRIPTION_EVENTS.updated, function (updatedEvent) {
        _this8.logger.info("Emitting " + constants$3.SUBSCRIPTION_EVENTS.updated);

        _this8.logger.debug({
          type: "event",
          event: constants$3.SUBSCRIPTION_EVENTS.updated,
          data: updatedEvent
        });

        _this8.persist();
      });
      this.events.on(constants$3.SUBSCRIPTION_EVENTS.deleted, function (deletedEvent) {
        _this8.logger.info("Emitting " + constants$3.SUBSCRIPTION_EVENTS.deleted);

        _this8.logger.debug({
          type: "event",
          event: constants$3.SUBSCRIPTION_EVENTS.deleted,
          data: deletedEvent
        });

        _this8.persist();
      });
    };

    _createClass(Subscription, [{
      key: "length",
      get: function get() {
        return this.subscriptions.size;
      }
    }, {
      key: "topics",
      get: function get() {
        return Array.from(this.subscriptions.keys());
      }
    }, {
      key: "values",
      get: function get() {
        return Array.from(this.subscriptions.values());
      }
    }]);

    return Subscription;
  }(cjs$3.ISubscription);

  exports.Subscription = Subscription;
});
unwrapExports(subscription$2);

var history$2 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.JsonRpcHistory = void 0;

  var JsonRpcHistory = /*#__PURE__*/function (_types_1$IJsonRpcHist) {
    _inheritsLoose(JsonRpcHistory, _types_1$IJsonRpcHist);

    function JsonRpcHistory(client, logger) {
      var _this;

      _this = _types_1$IJsonRpcHist.call(this, client, logger) || this;
      _this.client = client;
      _this.logger = logger;
      _this.records = new Map();
      _this.events = new events.EventEmitter();
      _this.context = constants$3.HISTORY_CONTEXT;
      _this.cached = [];
      _this.logger = cjs$a.generateChildLogger(logger, _this.context);

      _this.registerEventListeners();

      return _this;
    }

    var _proto = JsonRpcHistory.prototype;

    _proto.init = function init() {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.logger.trace("Initialized");
                _context.next = 3;
                return this.restore();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    };

    _proto.set = function set(topic, request, chainId) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var error, record;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.isEnabled();

              case 2:
                this.logger.debug("Setting JSON-RPC request history record");
                this.logger.trace({
                  type: "method",
                  method: "set",
                  topic: topic,
                  request: request,
                  chainId: chainId
                });

                if (!this.records.has(request.id)) {
                  _context2.next = 8;
                  break;
                }

                error = cjs$9.getError(cjs$9.ERROR.RECORD_ALREADY_EXISTS, {
                  context: this.getHistoryContext(),
                  id: request.id
                });
                this.logger.error(error.message);
                throw new Error(error.message);

              case 8:
                record = {
                  id: request.id,
                  topic: topic,
                  request: {
                    method: request.method,
                    params: request.params || null
                  },
                  chainId: chainId
                };
                this.records.set(record.id, record);
                this.events.emit(constants$3.HISTORY_EVENTS.created, record);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
    };

    _proto.update = function update(topic, response) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var record;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.isEnabled();

              case 2:
                this.logger.debug("Updating JSON-RPC response history record");
                this.logger.trace({
                  type: "method",
                  method: "update",
                  topic: topic,
                  response: response
                });

                if (this.records.has(response.id)) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return");

              case 6:
                _context3.next = 8;
                return this.getRecord(response.id);

              case 8:
                record = _context3.sent;

                if (!(record.topic !== topic)) {
                  _context3.next = 11;
                  break;
                }

                return _context3.abrupt("return");

              case 11:
                if (!(typeof record.response !== "undefined")) {
                  _context3.next = 13;
                  break;
                }

                return _context3.abrupt("return");

              case 13:
                record.response = cjs$c.isJsonRpcError(response) ? {
                  error: response.error
                } : {
                  result: response.result
                };
                this.records.set(record.id, record);
                this.events.emit(constants$3.HISTORY_EVENTS.updated, record);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
    };

    _proto.get = function get(topic, id) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var record, error;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.isEnabled();

              case 2:
                this.logger.debug("Getting record");
                this.logger.trace({
                  type: "method",
                  method: "get",
                  topic: topic,
                  id: id
                });
                _context4.next = 6;
                return this.getRecord(id);

              case 6:
                record = _context4.sent;

                if (!(record.topic !== topic)) {
                  _context4.next = 11;
                  break;
                }

                error = cjs$9.getError(cjs$9.ERROR.MISMATCHED_TOPIC, {
                  context: this.getHistoryContext(),
                  id: id
                });
                this.logger.error(error.message);
                throw new Error(error.message);

              case 11:
                return _context4.abrupt("return", record);

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
    };

    _proto["delete"] = function _delete(topic, id) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.isEnabled();

              case 2:
                this.logger.debug("Deleting record");
                this.logger.trace({
                  type: "method",
                  method: "delete",
                  id: id
                });
                this.values.forEach(function (record) {
                  if (record.topic === topic) {
                    if (typeof id !== "undefined" && record.id !== id) return;

                    _this2.records["delete"](record.id);

                    _this2.events.emit(constants$3.HISTORY_EVENTS.deleted, record);
                  }
                });

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
    };

    _proto.exists = function exists(topic, id) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var record;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.isEnabled();

              case 2:
                if (this.records.has(id)) {
                  _context6.next = 4;
                  break;
                }

                return _context6.abrupt("return", false);

              case 4:
                _context6.next = 6;
                return this.getRecord(id);

              case 6:
                record = _context6.sent;
                return _context6.abrupt("return", record.topic === topic);

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
    };

    _proto.on = function on(event, listener) {
      this.events.on(event, listener);
    };

    _proto.once = function once(event, listener) {
      this.events.once(event, listener);
    };

    _proto.off = function off(event, listener) {
      this.events.off(event, listener);
    };

    _proto.removeListener = function removeListener(event, listener) {
      this.events.removeListener(event, listener);
    };

    _proto.getNestedContext = function getNestedContext(length) {
      var nestedContext = cjs$a.getLoggerContext(this.logger).split("/");
      return nestedContext.slice(nestedContext.length - length, nestedContext.length);
    };

    _proto.getHistoryContext = function getHistoryContext() {
      return this.getNestedContext(2).join(" ");
    };

    _proto.getStorageKey = function getStorageKey() {
      var storageKeyPrefix = this.client.protocol + "@" + this.client.version + ":" + this.client.context;
      var recordContext = this.getNestedContext(2).join(":");
      return storageKeyPrefix + "//" + recordContext;
    };

    _proto.getRecord = function getRecord(id) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var record, error;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.isEnabled();

              case 2:
                record = this.records.get(id);

                if (record) {
                  _context7.next = 7;
                  break;
                }

                error = cjs$9.getError(cjs$9.ERROR.NO_MATCHING_ID, {
                  context: this.getHistoryContext(),
                  id: id
                });
                this.logger.error(error.message);
                throw new Error(error.message);

              case 7:
                return _context7.abrupt("return", record);

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
    };

    _proto.persist = function persist() {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.client.storage.setItem(this.getStorageKey(), this.values);

              case 2:
                this.events.emit(constants$3.HISTORY_EVENTS.sync);

              case 3:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
    };

    _proto.restore = function restore() {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var _this3 = this;

        var persisted, error;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                _context10.next = 3;
                return this.client.storage.getItem(this.getStorageKey());

              case 3:
                persisted = _context10.sent;

                if (!(typeof persisted === "undefined")) {
                  _context10.next = 6;
                  break;
                }

                return _context10.abrupt("return");

              case 6:
                if (persisted.length) {
                  _context10.next = 8;
                  break;
                }

                return _context10.abrupt("return");

              case 8:
                if (!this.records.size) {
                  _context10.next = 12;
                  break;
                }

                error = cjs$9.getError(cjs$9.ERROR.RESTORE_WILL_OVERRIDE, {
                  context: this.getHistoryContext()
                });
                this.logger.error(error.message);
                throw new Error(error.message);

              case 12:
                this.cached = persisted;
                _context10.next = 15;
                return Promise.all(this.cached.map(function (record) {
                  return tslib_1.__awaiter(_this3, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                    return regeneratorRuntime.wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            this.records.set(record.id, record);

                          case 1:
                          case "end":
                            return _context9.stop();
                        }
                      }
                    }, _callee9, this);
                  }));
                }));

              case 15:
                _context10.next = 17;
                return this.enable();

              case 17:
                this.logger.debug("Successfully Restored records for " + this.getHistoryContext());
                this.logger.trace({
                  type: "method",
                  method: "restore",
                  records: this.values
                });
                _context10.next = 25;
                break;

              case 21:
                _context10.prev = 21;
                _context10.t0 = _context10["catch"](0);
                this.logger.debug("Failed to Restore records for " + this.getHistoryContext());
                this.logger.error(_context10.t0);

              case 25:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[0, 21]]);
      }));
    };

    _proto.reset = function reset() {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this.disable();

              case 2:
                _context12.next = 4;
                return Promise.all(this.cached.map(function (record) {
                  return tslib_1.__awaiter(_this4, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
                    return regeneratorRuntime.wrap(function _callee11$(_context11) {
                      while (1) {
                        switch (_context11.prev = _context11.next) {
                          case 0:
                            this.records.set(record.id, record);

                          case 1:
                          case "end":
                            return _context11.stop();
                        }
                      }
                    }, _callee11, this);
                  }));
                }));

              case 4:
                _context12.next = 6;
                return this.enable();

              case 6:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));
    };

    _proto.isEnabled = function isEnabled() {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        var _this5 = this;

        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if (this.cached.length) {
                  _context13.next = 2;
                  break;
                }

                return _context13.abrupt("return");

              case 2:
                return _context13.abrupt("return", new Promise(function (resolve) {
                  _this5.events.once(constants$3.HISTORY_EVENTS.enabled, function () {
                    return resolve();
                  });
                }));

              case 3:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));
    };

    _proto.enable = function enable() {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                this.cached = [];
                this.events.emit(constants$3.HISTORY_EVENTS.enabled);

              case 2:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));
    };

    _proto.disable = function disable() {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (!this.cached.length) {
                  this.cached = this.values;
                }

                this.events.emit(constants$3.HISTORY_EVENTS.disabled);

              case 2:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));
    };

    _proto.registerEventListeners = function registerEventListeners() {
      var _this6 = this;

      this.events.on(constants$3.HISTORY_EVENTS.created, function (record) {
        _this6.logger.info("Emitting " + constants$3.HISTORY_EVENTS.created);

        _this6.logger.debug({
          type: "event",
          event: constants$3.HISTORY_EVENTS.created,
          record: record
        });

        _this6.persist();
      });
      this.events.on(constants$3.HISTORY_EVENTS.updated, function (record) {
        _this6.logger.info("Emitting " + constants$3.HISTORY_EVENTS.updated);

        _this6.logger.debug({
          type: "event",
          event: constants$3.HISTORY_EVENTS.updated,
          record: record
        });

        _this6.persist();
      });
      this.events.on(constants$3.HISTORY_EVENTS.deleted, function (record) {
        _this6.logger.info("Emitting " + constants$3.HISTORY_EVENTS.deleted);

        _this6.logger.debug({
          type: "event",
          event: constants$3.HISTORY_EVENTS.deleted,
          record: record
        });

        _this6.persist();
      });
    };

    _createClass(JsonRpcHistory, [{
      key: "size",
      get: function get() {
        return this.records.size;
      }
    }, {
      key: "keys",
      get: function get() {
        return Array.from(this.records.keys());
      }
    }, {
      key: "values",
      get: function get() {
        return Array.from(this.records.values());
      }
    }, {
      key: "pending",
      get: function get() {
        var requests = [];
        this.values.forEach(function (record) {
          if (typeof record.response !== "undefined") return;
          var requestEvent = {
            topic: record.topic,
            request: cjs$c.formatJsonRpcRequest(record.request.method, record.request.params, record.id),
            chainId: record.chainId
          };
          return requests.push(requestEvent);
        });
        return requests;
      }
    }]);

    return JsonRpcHistory;
  }(cjs$3.IJsonRpcHistory);

  exports.JsonRpcHistory = JsonRpcHistory;
});
unwrapExports(history$2);

var pairing$2 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Pairing = void 0;

  var Pairing = /*#__PURE__*/function (_types_1$IPairing) {
    _inheritsLoose(Pairing, _types_1$IPairing);

    function Pairing(client, logger) {
      var _this;

      _this = _types_1$IPairing.call(this, client, logger) || this;
      _this.client = client;
      _this.logger = logger;
      _this.events = new events.EventEmitter();
      _this.context = constants$3.PAIRING_CONTEXT;
      _this.logger = cjs$a.generateChildLogger(logger, _this.context);
      _this.pending = new subscription$2.Subscription(client, _this.logger, constants$3.PAIRING_STATUS.pending, false);
      _this.settled = new subscription$2.Subscription(client, _this.logger, constants$3.PAIRING_STATUS.settled, true);
      _this.history = new history$2.JsonRpcHistory(client, _this.logger);

      _this.registerEventListeners();

      return _this;
    }

    var _proto = Pairing.prototype;

    _proto.init = function init() {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.logger.trace("Initialized");
                _context.next = 3;
                return this.pending.init();

              case 3:
                _context.next = 5;
                return this.settled.init();

              case 5:
                _context.next = 7;
                return this.history.init();

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    };

    _proto.get = function get(topic) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.settled.get(topic));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
    };

    _proto.ping = function ping(topic, timeout) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var request;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                request = {
                  method: constants$3.PAIRING_JSONRPC.ping,
                  params: {}
                };
                return _context3.abrupt("return", this.request({
                  topic: topic,
                  request: request,
                  timeout: timeout || constants$3.THIRTY_SECONDS * 1000
                }));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
    };

    _proto.send = function send(topic, payload) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var pairing, encryptKeys, error;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.settled.get(topic);

              case 2:
                pairing = _context4.sent;
                encryptKeys = {
                  sharedKey: pairing.sharedKey,
                  publicKey: pairing.self.publicKey
                };

                if (!cjs$c.isJsonRpcRequest(payload)) {
                  _context4.next = 15;
                  break;
                }

                if (Object.values(constants$3.PAIRING_JSONRPC).includes(payload.method)) {
                  _context4.next = 13;
                  break;
                }

                if (pairing.permissions.jsonrpc.methods.includes(payload.method)) {
                  _context4.next = 10;
                  break;
                }

                error = cjs$9.getError(cjs$9.ERROR.UNAUTHORIZED_JSON_RPC_METHOD, {
                  method: payload.method
                });
                this.logger.error(error.message);
                throw new Error(error.message);

              case 10:
                _context4.next = 12;
                return this.history.set(topic, payload);

              case 12:
                payload = cjs$c.formatJsonRpcRequest(constants$3.PAIRING_JSONRPC.payload, {
                  request: {
                    method: payload.method,
                    params: payload.params
                  }
                }, payload.id);

              case 13:
                _context4.next = 17;
                break;

              case 15:
                _context4.next = 17;
                return this.history.update(topic, payload);

              case 17:
                _context4.next = 19;
                return this.client.relayer.publish(pairing.topic, payload, {
                  relay: pairing.relay,
                  encryptKeys: encryptKeys
                });

              case 19:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
    };

    _proto.create = function create(params) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        return tslib_1.__awaiter(_this2, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
          var _this3 = this;

          var maxTimeout, timeout, pending;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  this.logger.debug("Create Pairing");
                  this.logger.trace({
                    type: "method",
                    method: "create",
                    params: params
                  });
                  maxTimeout = (params === null || params === void 0 ? void 0 : params.timeout) || constants$3.FIVE_MINUTES * 1000;
                  timeout = setTimeout(function () {
                    var error = cjs$9.getError(cjs$9.ERROR.SETTLE_TIMEOUT, {
                      context: _this3.context,
                      timeout: maxTimeout
                    });

                    _this3.logger.error(error.message);

                    reject(error.message);
                  }, maxTimeout);
                  _context6.prev = 4;
                  _context6.next = 7;
                  return this.propose(params);

                case 7:
                  pending = _context6.sent;
                  _context6.next = 14;
                  break;

                case 10:
                  _context6.prev = 10;
                  _context6.t0 = _context6["catch"](4);
                  clearTimeout(timeout);
                  return _context6.abrupt("return", reject(_context6.t0));

                case 14:
                  this.pending.on(constants$3.SUBSCRIPTION_EVENTS.updated, function (updatedEvent) {
                    return tslib_1.__awaiter(_this3, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                      var outcome, _pairing, reason;

                      return regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              if (!(pending.topic !== updatedEvent.data.topic)) {
                                _context5.next = 2;
                                break;
                              }

                              return _context5.abrupt("return");

                            case 2:
                              if (!cjs$9.isPairingResponded(updatedEvent.data)) {
                                _context5.next = 30;
                                break;
                              }

                              outcome = updatedEvent.data.outcome;
                              clearTimeout(timeout);

                              if (!cjs$9.isPairingFailed(outcome)) {
                                _context5.next = 17;
                                break;
                              }

                              _context5.prev = 6;
                              _context5.next = 9;
                              return this.pending["delete"](pending.topic, outcome.reason);

                            case 9:
                              _context5.next = 14;
                              break;

                            case 11:
                              _context5.prev = 11;
                              _context5.t0 = _context5["catch"](6);
                              return _context5.abrupt("return", reject(_context5.t0));

                            case 14:
                              reject(new Error(outcome.reason.message));
                              _context5.next = 30;
                              break;

                            case 17:
                              _context5.prev = 17;
                              _context5.next = 20;
                              return this.settled.get(outcome.topic);

                            case 20:
                              _pairing = _context5.sent;
                              reason = cjs$9.getError(cjs$9.ERROR.SETTLED, {
                                context: this.context
                              });
                              _context5.next = 24;
                              return this.pending["delete"](pending.topic, reason);

                            case 24:
                              resolve(_pairing);
                              _context5.next = 30;
                              break;

                            case 27:
                              _context5.prev = 27;
                              _context5.t1 = _context5["catch"](17);
                              return _context5.abrupt("return", reject(_context5.t1));

                            case 30:
                            case "end":
                              return _context5.stop();
                          }
                        }
                      }, _callee5, this, [[6, 11], [17, 27]]);
                    }));
                  });

                case 15:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6, this, [[4, 10]]);
        }));
      });
    };

    _proto.respond = function respond(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var approved, proposal, self, responder, expiry, controller, _pairing2, outcome, pending, reason, _outcome, _pending, defaultReason, _outcome2, _pending2;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this.logger.debug("Respond Pairing");
                this.logger.trace({
                  type: "method",
                  method: "respond",
                  params: params
                });
                approved = params.approved, proposal = params.proposal;
                self = cjs$9.generateKeyPair();

                if (!approved) {
                  _context7.next = 29;
                  break;
                }

                _context7.prev = 5;
                responder = {
                  publicKey: self.publicKey
                };
                expiry = Date.now() + proposal.ttl * 1000;
                controller = proposal.proposer.controller ? {
                  publicKey: proposal.proposer.publicKey
                } : {
                  publicKey: self.publicKey
                };
                _context7.next = 11;
                return this.settle({
                  relay: proposal.relay,
                  self: self,
                  peer: {
                    publicKey: proposal.proposer.publicKey
                  },
                  permissions: Object.assign(Object.assign({}, proposal.permissions), {
                    controller: controller
                  }),
                  state: {},
                  ttl: proposal.ttl,
                  expiry: expiry
                });

              case 11:
                _pairing2 = _context7.sent;
                outcome = {
                  topic: _pairing2.topic,
                  relay: _pairing2.relay,
                  responder: responder,
                  expiry: expiry,
                  state: {}
                };
                pending = {
                  status: constants$3.PAIRING_STATUS.responded,
                  topic: proposal.topic,
                  relay: proposal.relay,
                  self: self,
                  proposal: proposal,
                  outcome: outcome
                };
                _context7.next = 16;
                return this.pending.set(pending.topic, pending, {
                  relay: pending.relay
                });

              case 16:
                return _context7.abrupt("return", pending);

              case 19:
                _context7.prev = 19;
                _context7.t0 = _context7["catch"](5);
                reason = cjs$9.getError(cjs$9.ERROR.GENERIC, {
                  message: _context7.t0.message
                });
                _outcome = {
                  reason: reason
                };
                _pending = {
                  status: constants$3.PAIRING_STATUS.responded,
                  topic: proposal.topic,
                  relay: proposal.relay,
                  self: self,
                  proposal: proposal,
                  outcome: _outcome
                };
                _context7.next = 26;
                return this.pending.set(_pending.topic, _pending, {
                  relay: _pending.relay
                });

              case 26:
                return _context7.abrupt("return", _pending);

              case 27:
                _context7.next = 35;
                break;

              case 29:
                defaultReason = cjs$9.getError(cjs$9.ERROR.NOT_APPROVED, {
                  context: this.context
                });
                _outcome2 = {
                  reason: (params === null || params === void 0 ? void 0 : params.reason) || defaultReason
                };
                _pending2 = {
                  status: constants$3.PAIRING_STATUS.responded,
                  topic: proposal.topic,
                  relay: proposal.relay,
                  self: self,
                  proposal: proposal,
                  outcome: _outcome2
                };
                _context7.next = 34;
                return this.pending.set(_pending2.topic, _pending2, {
                  relay: _pending2.relay
                });

              case 34:
                return _context7.abrupt("return", _pending2);

              case 35:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[5, 19]]);
      }));
    };

    _proto.upgrade = function upgrade(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var pairing, participant, upgrade, request;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                this.logger.info("Upgrade Pairing");
                this.logger.trace({
                  type: "method",
                  method: "upgrade",
                  params: params
                });
                _context8.next = 4;
                return this.settled.get(params.topic);

              case 4:
                pairing = _context8.sent;
                participant = {
                  publicKey: pairing.self.publicKey
                };
                _context8.next = 8;
                return this.handleUpgrade(params.topic, params, participant);

              case 8:
                upgrade = _context8.sent;
                request = cjs$c.formatJsonRpcRequest(constants$3.PAIRING_JSONRPC.upgrade, upgrade);
                _context8.next = 12;
                return this.send(pairing.topic, request);

              case 12:
                return _context8.abrupt("return", pairing);

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
    };

    _proto.update = function update(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var pairing, participant, update, request;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                this.logger.debug("Update Pairing");
                this.logger.trace({
                  type: "method",
                  method: "update",
                  params: params
                });
                _context9.next = 4;
                return this.settled.get(params.topic);

              case 4:
                pairing = _context9.sent;
                participant = {
                  publicKey: pairing.self.publicKey
                };
                _context9.next = 8;
                return this.handleUpdate(params.topic, params, participant);

              case 8:
                update = _context9.sent;
                request = cjs$c.formatJsonRpcRequest(constants$3.PAIRING_JSONRPC.update, update);
                _context9.next = 12;
                return this.send(pairing.topic, request);

              case 12:
                return _context9.abrupt("return", pairing);

              case 13:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));
    };

    _proto.request = function request(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt("return", new Promise(function (resolve, reject) {
                  return tslib_1.__awaiter(_this4, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
                    var _this5 = this;

                    var request, maxTimeout, timeout;
                    return regeneratorRuntime.wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            request = cjs$c.formatJsonRpcRequest(params.request.method, params.request.params);
                            maxTimeout = (params === null || params === void 0 ? void 0 : params.timeout) || constants$3.FIVE_MINUTES * 1000;
                            timeout = setTimeout(function () {
                              var error = cjs$9.getError(cjs$9.ERROR.JSONRPC_REQUEST_TIMEOUT, {
                                method: request.method,
                                timeout: maxTimeout
                              });

                              _this5.logger.error(error.message);

                              reject(error.message);
                            }, maxTimeout);
                            this.events.on(constants$3.PAIRING_EVENTS.response, function (responseEvent) {
                              if (params.topic !== responseEvent.topic) return;
                              var response = responseEvent.response;
                              if (response.id !== request.id) return;
                              clearTimeout(timeout);

                              if (cjs$c.isJsonRpcError(response)) {
                                var errorMessage = response.error.message;

                                _this5.logger.error(errorMessage);

                                return reject(new Error(errorMessage));
                              }

                              return resolve(response.result);
                            });
                            _context10.prev = 4;
                            _context10.next = 7;
                            return this.send(params.topic, request);

                          case 7:
                            _context10.next = 13;
                            break;

                          case 9:
                            _context10.prev = 9;
                            _context10.t0 = _context10["catch"](4);
                            clearTimeout(timeout);
                            return _context10.abrupt("return", reject(_context10.t0));

                          case 13:
                          case "end":
                            return _context10.stop();
                        }
                      }
                    }, _callee10, this, [[4, 9]]);
                  }));
                }));

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));
    };

    _proto["delete"] = function _delete(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                this.logger.debug("Delete Pairing");
                this.logger.trace({
                  type: "method",
                  method: "delete",
                  params: params
                });
                _context12.next = 4;
                return this.settled["delete"](params.topic, params.reason);

              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));
    };

    _proto.on = function on(event, listener) {
      this.events.on(event, listener);
    };

    _proto.once = function once(event, listener) {
      this.events.once(event, listener);
    };

    _proto.off = function off(event, listener) {
      this.events.off(event, listener);
    };

    _proto.removeListener = function removeListener(event, listener) {
      this.events.removeListener(event, listener);
    };

    _proto.propose = function propose(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        var relay, topic, self, proposer, uri, signal, permissions, proposal, pending;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                this.logger.debug("Propose Pairing");
                this.logger.trace({
                  type: "method",
                  method: "propose",
                  params: params
                });
                relay = (params === null || params === void 0 ? void 0 : params.relay) || {
                  protocol: constants$3.RELAYER_DEFAULT_PROTOCOL
                };
                topic = cjs$9.generateRandomBytes32();
                self = cjs$9.generateKeyPair();
                proposer = {
                  publicKey: self.publicKey,
                  controller: this.client.controller
                };
                uri = cjs$9.formatUri({
                  protocol: this.client.protocol,
                  version: this.client.version,
                  topic: topic,
                  publicKey: proposer.publicKey,
                  controller: proposer.controller,
                  relay: relay
                });
                signal = {
                  method: constants$3.PAIRING_SIGNAL_METHOD_URI,
                  params: {
                    uri: uri
                  }
                };
                permissions = {
                  jsonrpc: {
                    methods: [constants$3.SESSION_JSONRPC.propose]
                  }
                };
                proposal = {
                  relay: relay,
                  topic: topic,
                  proposer: proposer,
                  signal: signal,
                  permissions: permissions,
                  ttl: constants$3.PAIRING_DEFAULT_TTL
                };
                pending = {
                  status: constants$3.PAIRING_STATUS.proposed,
                  topic: proposal.topic,
                  relay: proposal.relay,
                  self: self,
                  proposal: proposal
                };
                _context13.next = 13;
                return this.pending.set(pending.topic, pending, {
                  relay: relay
                });

              case 13:
                return _context13.abrupt("return", pending);

              case 14:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));
    };

    _proto.settle = function settle(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var sharedKey, topic, pairing, decryptKeys;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                this.logger.debug("Settle Pairing");
                this.logger.trace({
                  type: "method",
                  method: "settle",
                  params: params
                });
                sharedKey = cjs$9.deriveSharedKey(params.self.privateKey, params.peer.publicKey);
                _context14.next = 5;
                return cjs$9.sha256(sharedKey);

              case 5:
                topic = _context14.sent;
                pairing = {
                  topic: topic,
                  relay: params.relay,
                  sharedKey: sharedKey,
                  self: params.self,
                  peer: params.peer,
                  permissions: params.permissions,
                  expiry: params.expiry,
                  state: params.state
                };
                decryptKeys = {
                  sharedKey: sharedKey
                };
                _context14.next = 10;
                return this.settled.set(pairing.topic, pairing, {
                  relay: pairing.relay,
                  expiry: pairing.expiry,
                  decryptKeys: decryptKeys
                });

              case 10:
                return _context14.abrupt("return", pairing);

              case 11:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));
    };

    _proto.onResponse = function onResponse(payloadEvent) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        var topic, payload, request, pending, error, controller, _pairing3, response;

        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                topic = payloadEvent.topic, payload = payloadEvent.payload;
                this.logger.debug("Receiving Pairing response");
                this.logger.trace({
                  type: "method",
                  method: "onResponse",
                  topic: topic,
                  payload: payload
                });
                request = payload;
                _context15.next = 6;
                return this.pending.get(topic);

              case 6:
                pending = _context15.sent;

                if (cjs$9.isPairingFailed(request.params)) {
                  _context15.next = 28;
                  break;
                }

                _context15.prev = 8;
                controller = pending.proposal.proposer.controller ? {
                  publicKey: pending.proposal.proposer.publicKey
                } : {
                  publicKey: request.params.responder.publicKey
                };
                _context15.next = 12;
                return this.settle({
                  relay: pending.relay,
                  self: pending.self,
                  peer: {
                    publicKey: request.params.responder.publicKey
                  },
                  permissions: Object.assign(Object.assign({}, pending.proposal.permissions), {
                    controller: controller
                  }),
                  ttl: pending.proposal.ttl,
                  expiry: request.params.expiry,
                  state: {}
                });

              case 12:
                _pairing3 = _context15.sent;
                _context15.next = 15;
                return this.pending.update(topic, {
                  status: constants$3.PAIRING_STATUS.responded,
                  outcome: {
                    topic: _pairing3.topic,
                    relay: _pairing3.relay,
                    responder: request.params.responder,
                    expiry: _pairing3.expiry,
                    state: {}
                  }
                });

              case 15:
                _context15.next = 23;
                break;

              case 17:
                _context15.prev = 17;
                _context15.t0 = _context15["catch"](8);
                this.logger.error(_context15.t0);
                error = cjs$9.getError(cjs$9.ERROR.GENERIC, {
                  message: _context15.t0.message
                });
                _context15.next = 23;
                return this.pending.update(topic, {
                  status: constants$3.PAIRING_STATUS.responded,
                  outcome: {
                    reason: error
                  }
                });

              case 23:
                response = typeof error === "undefined" ? cjs$c.formatJsonRpcResult(request.id, true) : cjs$c.formatJsonRpcError(request.id, error);
                _context15.next = 26;
                return this.client.relayer.publish(pending.topic, response, {
                  relay: pending.relay
                });

              case 26:
                _context15.next = 31;
                break;

              case 28:
                this.logger.error(request.params.reason);
                _context15.next = 31;
                return this.pending.update(topic, {
                  status: constants$3.PAIRING_STATUS.responded,
                  outcome: {
                    reason: request.params.reason
                  }
                });

              case 31:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this, [[8, 17]]);
      }));
    };

    _proto.onAcknowledge = function onAcknowledge(payloadEvent) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
        var topic, payload, response, pending, reason;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                topic = payloadEvent.topic, payload = payloadEvent.payload;
                this.logger.debug("Receiving Pairing acknowledge");
                this.logger.trace({
                  type: "method",
                  method: "onAcknowledge",
                  topic: topic,
                  payload: payload
                });
                response = payload;
                _context16.next = 6;
                return this.pending.get(topic);

              case 6:
                pending = _context16.sent;

                if (cjs$9.isPairingResponded(pending)) {
                  _context16.next = 9;
                  break;
                }

                return _context16.abrupt("return");

              case 9:
                if (!(cjs$c.isJsonRpcError(response) && !cjs$9.isPairingFailed(pending.outcome))) {
                  _context16.next = 12;
                  break;
                }

                _context16.next = 12;
                return this.settled["delete"](pending.outcome.topic, response.error);

              case 12:
                reason = cjs$9.getError(cjs$9.ERROR.RESPONSE_ACKNOWLEDGED, {
                  context: this.context
                });
                _context16.next = 15;
                return this.pending["delete"](topic, reason);

              case 15:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));
    };

    _proto.onMessage = function onMessage(payloadEvent) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
        var topic, payload, request, _pairing4, error;

        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                topic = payloadEvent.topic, payload = payloadEvent.payload;
                this.logger.debug("Receiving Pairing message");
                this.logger.trace({
                  type: "method",
                  method: "onMessage",
                  topic: topic,
                  payload: payload
                });

                if (!cjs$c.isJsonRpcRequest(payload)) {
                  _context17.next = 33;
                  break;
                }

                request = payload;
                _context17.next = 7;
                return this.settled.get(payloadEvent.topic);

              case 7:
                _pairing4 = _context17.sent;
                _context17.t0 = request.method;
                _context17.next = _context17.t0 === constants$3.PAIRING_JSONRPC.payload ? 11 : _context17.t0 === constants$3.PAIRING_JSONRPC.update ? 14 : _context17.t0 === constants$3.PAIRING_JSONRPC.upgrade ? 17 : _context17.t0 === constants$3.PAIRING_JSONRPC["delete"] ? 20 : _context17.t0 === constants$3.PAIRING_JSONRPC.ping ? 23 : 26;
                break;

              case 11:
                _context17.next = 13;
                return this.onPayload(payloadEvent);

              case 13:
                return _context17.abrupt("break", 31);

              case 14:
                _context17.next = 16;
                return this.onUpdate(payloadEvent);

              case 16:
                return _context17.abrupt("break", 31);

              case 17:
                _context17.next = 19;
                return this.onUpgrade(payloadEvent);

              case 19:
                return _context17.abrupt("break", 31);

              case 20:
                _context17.next = 22;
                return this.settled["delete"](_pairing4.topic, request.params.reason);

              case 22:
                return _context17.abrupt("break", 31);

              case 23:
                _context17.next = 25;
                return this.send(_pairing4.topic, cjs$c.formatJsonRpcResult(request.id, false));

              case 25:
                return _context17.abrupt("break", 31);

              case 26:
                error = cjs$9.getError(cjs$9.ERROR.UNKNOWN_JSONRPC_METHOD, {
                  method: request.method
                });
                this.logger.error(error.message);
                _context17.next = 30;
                return this.send(_pairing4.topic, cjs$c.formatJsonRpcError(request.id, error));

              case 30:
                return _context17.abrupt("break", 31);

              case 31:
                _context17.next = 34;
                break;

              case 33:
                this.onPayloadEvent(payloadEvent);

              case 34:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));
    };

    _proto.onPayload = function onPayload(payloadEvent) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
        var topic, payload, id, params, request, _pairing5, error, pairingPayloadEvent, _pairingPayloadEvent;

        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                topic = payloadEvent.topic, payload = payloadEvent.payload;

                if (!cjs$c.isJsonRpcRequest(payload)) {
                  _context18.next = 17;
                  break;
                }

                id = payload.id, params = payload.params;
                request = cjs$c.formatJsonRpcRequest(params.request.method, params.request.params, id);
                _context18.next = 6;
                return this.settled.get(topic);

              case 6:
                _pairing5 = _context18.sent;

                if (_pairing5.permissions.jsonrpc.methods.includes(request.method)) {
                  _context18.next = 11;
                  break;
                }

                error = cjs$9.getError(cjs$9.ERROR.UNAUTHORIZED_JSON_RPC_METHOD, {
                  method: request.method
                });
                this.logger.error(error.message);
                throw new Error(error.message);

              case 11:
                pairingPayloadEvent = {
                  topic: topic,
                  payload: request
                };
                this.logger.debug("Receiving Pairing payload");
                this.logger.trace(Object.assign({
                  type: "method",
                  method: "onPayload"
                }, pairingPayloadEvent));
                this.onPayloadEvent(pairingPayloadEvent);
                _context18.next = 21;
                break;

              case 17:
                _pairingPayloadEvent = {
                  topic: topic,
                  payload: payload
                };
                this.logger.debug("Receiving Pairing payload");
                this.logger.trace(Object.assign({
                  type: "method",
                  method: "onPayload"
                }, _pairingPayloadEvent));
                this.onPayloadEvent(_pairingPayloadEvent);

              case 21:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));
    };

    _proto.onUpdate = function onUpdate(payloadEvent) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
        var topic, payload, request, pairing, participant, response, _response;

        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                topic = payloadEvent.topic, payload = payloadEvent.payload;
                this.logger.debug("Receiving Pairing update");
                this.logger.trace({
                  type: "method",
                  method: "onUpdate",
                  topic: topic,
                  payload: payload
                });
                request = payloadEvent.payload;
                _context19.next = 6;
                return this.settled.get(payloadEvent.topic);

              case 6:
                pairing = _context19.sent;
                _context19.prev = 7;
                participant = {
                  publicKey: pairing.peer.publicKey
                };
                _context19.next = 11;
                return this.handleUpdate(topic, request.params, participant);

              case 11:
                response = cjs$c.formatJsonRpcResult(request.id, true);
                _context19.next = 14;
                return this.send(pairing.topic, response);

              case 14:
                _context19.next = 22;
                break;

              case 16:
                _context19.prev = 16;
                _context19.t0 = _context19["catch"](7);
                this.logger.error(_context19.t0);
                _response = cjs$c.formatJsonRpcError(request.id, _context19.t0.message);
                _context19.next = 22;
                return this.send(pairing.topic, _response);

              case 22:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this, [[7, 16]]);
      }));
    };

    _proto.onUpgrade = function onUpgrade(payloadEvent) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
        var topic, payload, request, pairing, participant, response, _response2;

        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                topic = payloadEvent.topic, payload = payloadEvent.payload;
                this.logger.debug("Receiving Pairing upgrade");
                this.logger.trace({
                  type: "method",
                  method: "onUpgrade",
                  topic: topic,
                  payload: payload
                });
                request = payloadEvent.payload;
                _context20.next = 6;
                return this.settled.get(payloadEvent.topic);

              case 6:
                pairing = _context20.sent;
                _context20.prev = 7;
                participant = {
                  publicKey: pairing.peer.publicKey
                };
                _context20.next = 11;
                return this.handleUpgrade(topic, request.params, participant);

              case 11:
                response = cjs$c.formatJsonRpcResult(request.id, true);
                _context20.next = 14;
                return this.send(pairing.topic, response);

              case 14:
                _context20.next = 22;
                break;

              case 16:
                _context20.prev = 16;
                _context20.t0 = _context20["catch"](7);
                this.logger.error(_context20.t0);
                _response2 = cjs$c.formatJsonRpcError(request.id, _context20.t0.message);
                _context20.next = 22;
                return this.send(pairing.topic, _response2);

              case 22:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this, [[7, 16]]);
      }));
    };

    _proto.handleUpdate = function handleUpdate(topic, params, participant) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
        var pairing, update, state, error, _error;

        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return this.settled.get(topic);

              case 2:
                pairing = _context21.sent;

                if (!(typeof params.state !== "undefined")) {
                  _context21.next = 13;
                  break;
                }

                state = pairing.state;

                if (!(participant.publicKey !== pairing.permissions.controller.publicKey)) {
                  _context21.next = 9;
                  break;
                }

                error = cjs$9.getError(cjs$9.ERROR.UNAUTHORIZED_UPDATE_REQUEST, {
                  context: this.context
                });
                this.logger.error(error.message);
                throw new Error(error.message);

              case 9:
                state.metadata = params.state.metadata || state.metadata;
                update = {
                  state: state
                };
                _context21.next = 16;
                break;

              case 13:
                _error = cjs$9.getError(cjs$9.ERROR.INVALID_UPDATE_REQUEST, {
                  context: this.context
                });
                this.logger.error(_error.message);
                throw new Error(_error.message);

              case 16:
                _context21.next = 18;
                return this.settled.update(pairing.topic, pairing);

              case 18:
                return _context21.abrupt("return", update);

              case 19:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));
    };

    _proto.handleUpgrade = function handleUpgrade(topic, params, participant) {
      var _a;

      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
        var pairing, upgrade, error, permissions;
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.next = 2;
                return this.settled.get(topic);

              case 2:
                pairing = _context22.sent;
                upgrade = {
                  permissions: {}
                };

                if (!(participant.publicKey !== pairing.permissions.controller.publicKey)) {
                  _context22.next = 8;
                  break;
                }

                error = cjs$9.getError(cjs$9.ERROR.UNAUTHORIZED_UPGRADE_REQUEST, {
                  context: this.context
                });
                this.logger.error(error.message);
                throw new Error(error.message);

              case 8:
                permissions = {
                  jsonrpc: {
                    methods: [].concat(pairing.permissions.jsonrpc.methods, ((_a = params.permissions.jsonrpc) === null || _a === void 0 ? void 0 : _a.methods) || [])
                  }
                };
                upgrade = {
                  permissions: permissions
                };
                pairing.permissions = Object.assign(Object.assign({}, permissions), {
                  controller: pairing.permissions.controller
                });
                _context22.next = 13;
                return this.settled.update(pairing.topic, pairing);

              case 13:
                return _context22.abrupt("return", upgrade);

              case 14:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));
    };

    _proto.shouldIgnorePayloadEvent = function shouldIgnorePayloadEvent(payloadEvent) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee23() {
        var topic, payload, exists;
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                topic = payloadEvent.topic, payload = payloadEvent.payload;

                if (this.settled.subscriptions.has(topic)) {
                  _context23.next = 3;
                  break;
                }

                return _context23.abrupt("return", true);

              case 3:
                exists = false;
                _context23.prev = 4;
                _context23.next = 7;
                return this.history.exists(topic, payload.id);

              case 7:
                exists = _context23.sent;
                _context23.next = 12;
                break;

              case 10:
                _context23.prev = 10;
                _context23.t0 = _context23["catch"](4);

              case 12:
                return _context23.abrupt("return", exists);

              case 13:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this, [[4, 10]]);
      }));
    };

    _proto.onPayloadEvent = function onPayloadEvent(payloadEvent) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee24() {
        var topic, payload, requestEvent, responseEvent;
        return regeneratorRuntime.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                topic = payloadEvent.topic, payload = payloadEvent.payload;

                if (!cjs$c.isJsonRpcRequest(payload)) {
                  _context24.next = 10;
                  break;
                }

                _context24.next = 4;
                return this.shouldIgnorePayloadEvent(payloadEvent);

              case 4:
                if (!_context24.sent) {
                  _context24.next = 6;
                  break;
                }

                return _context24.abrupt("return");

              case 6:
                _context24.next = 8;
                return this.history.set(topic, payload);

              case 8:
                _context24.next = 12;
                break;

              case 10:
                _context24.next = 12;
                return this.history.update(topic, payload);

              case 12:
                if (cjs$c.isJsonRpcRequest(payload)) {
                  requestEvent = {
                    topic: topic,
                    request: payload
                  };
                  this.logger.info("Emitting " + constants$3.PAIRING_EVENTS.request);
                  this.logger.debug({
                    type: "event",
                    event: constants$3.PAIRING_EVENTS.request,
                    data: requestEvent
                  });
                  this.events.emit(constants$3.PAIRING_EVENTS.request, requestEvent);
                } else {
                  responseEvent = {
                    topic: topic,
                    response: payload
                  };
                  this.logger.info("Emitting " + constants$3.PAIRING_EVENTS.response);
                  this.logger.debug({
                    type: "event",
                    event: constants$3.PAIRING_EVENTS.response,
                    data: responseEvent
                  });
                  this.events.emit(constants$3.PAIRING_EVENTS.response, responseEvent);
                }

              case 13:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }));
    };

    _proto.onPendingPayloadEvent = function onPendingPayloadEvent(event) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee25() {
        return regeneratorRuntime.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                if (!cjs$c.isJsonRpcRequest(event.payload)) {
                  _context25.next = 9;
                  break;
                }

                _context25.t0 = event.payload.method;
                _context25.next = _context25.t0 === constants$3.PAIRING_JSONRPC.approve ? 4 : _context25.t0 === constants$3.PAIRING_JSONRPC.reject ? 4 : 6;
                break;

              case 4:
                this.onResponse(event);
                return _context25.abrupt("break", 7);

              case 6:
                return _context25.abrupt("break", 7);

              case 7:
                _context25.next = 10;
                break;

              case 9:
                this.onAcknowledge(event);

              case 10:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));
    };

    _proto.onPendingStatusEvent = function onPendingStatusEvent(event) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee26() {
        var pending, method, request;
        return regeneratorRuntime.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                pending = event.data;

                if (!cjs$9.isPairingResponded(pending)) {
                  _context26.next = 12;
                  break;
                }

                this.logger.info("Emitting " + constants$3.PAIRING_EVENTS.responded);
                this.logger.debug({
                  type: "event",
                  event: constants$3.PAIRING_EVENTS.responded,
                  data: pending
                });
                this.events.emit(constants$3.PAIRING_EVENTS.responded, pending);

                if (cjs$9.isSubscriptionUpdatedEvent(event)) {
                  _context26.next = 10;
                  break;
                }

                method = !cjs$9.isPairingFailed(pending.outcome) ? constants$3.PAIRING_JSONRPC.approve : constants$3.PAIRING_JSONRPC.reject;
                request = cjs$c.formatJsonRpcRequest(method, pending.outcome);
                _context26.next = 10;
                return this.client.relayer.publish(pending.topic, request, {
                  relay: pending.relay
                });

              case 10:
                _context26.next = 15;
                break;

              case 12:
                this.logger.info("Emitting " + constants$3.PAIRING_EVENTS.proposed);
                this.logger.debug({
                  type: "event",
                  event: constants$3.PAIRING_EVENTS.proposed,
                  data: pending
                });
                this.events.emit(constants$3.PAIRING_EVENTS.proposed, pending);

              case 15:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));
    };

    _proto.registerEventListeners = function registerEventListeners() {
      var _this6 = this;

      this.pending.on(constants$3.SUBSCRIPTION_EVENTS.payload, function (payloadEvent) {
        return _this6.onPendingPayloadEvent(payloadEvent);
      });
      this.pending.on(constants$3.SUBSCRIPTION_EVENTS.created, function (createdEvent) {
        return _this6.onPendingStatusEvent(createdEvent);
      });
      this.pending.on(constants$3.SUBSCRIPTION_EVENTS.updated, function (updatedEvent) {
        return _this6.onPendingStatusEvent(updatedEvent);
      });
      this.settled.on(constants$3.SUBSCRIPTION_EVENTS.payload, function (payloadEvent) {
        return _this6.onMessage(payloadEvent);
      });
      this.settled.on(constants$3.SUBSCRIPTION_EVENTS.created, function (createdEvent) {
        var pairing = createdEvent.data;

        _this6.logger.info("Emitting " + constants$3.PAIRING_EVENTS.settled);

        _this6.logger.debug({
          type: "event",
          event: constants$3.PAIRING_EVENTS.settled,
          data: pairing
        });

        _this6.events.emit(constants$3.PAIRING_EVENTS.settled, pairing);
      });
      this.settled.on(constants$3.SUBSCRIPTION_EVENTS.updated, function (updatedEvent) {
        var pairing = updatedEvent.data,
            update = updatedEvent.update;

        _this6.logger.info("Emitting " + constants$3.PAIRING_EVENTS.updated);

        _this6.logger.debug({
          type: "event",
          event: constants$3.PAIRING_EVENTS.updated,
          data: pairing,
          update: update
        });

        _this6.events.emit(constants$3.PAIRING_EVENTS.updated, pairing, update);
      });
      this.settled.on(constants$3.SUBSCRIPTION_EVENTS.deleted, function (deletedEvent) {
        return tslib_1.__awaiter(_this6, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee27() {
          var pairing, reason, request;
          return regeneratorRuntime.wrap(function _callee27$(_context27) {
            while (1) {
              switch (_context27.prev = _context27.next) {
                case 0:
                  pairing = deletedEvent.data, reason = deletedEvent.reason;
                  this.logger.info("Emitting " + constants$3.PAIRING_EVENTS.deleted);
                  this.logger.debug({
                    type: "event",
                    event: constants$3.PAIRING_EVENTS.deleted,
                    data: pairing,
                    reason: reason
                  });
                  this.events.emit(constants$3.PAIRING_EVENTS.deleted, pairing, reason);
                  request = cjs$c.formatJsonRpcRequest(constants$3.PAIRING_JSONRPC["delete"], {
                    reason: reason
                  });
                  _context27.next = 7;
                  return this.history["delete"](pairing.topic);

                case 7:
                  _context27.next = 9;
                  return this.client.relayer.publish(pairing.topic, request, {
                    relay: pairing.relay
                  });

                case 9:
                case "end":
                  return _context27.stop();
              }
            }
          }, _callee27, this);
        }));
      });
      this.settled.on(constants$3.SUBSCRIPTION_EVENTS.sync, function () {
        return _this6.events.emit(constants$3.PAIRING_EVENTS.sync);
      });
      this.settled.on(constants$3.SUBSCRIPTION_EVENTS.enabled, function () {
        return _this6.events.emit(constants$3.PAIRING_EVENTS.enabled);
      });
      this.settled.on(constants$3.SUBSCRIPTION_EVENTS.disabled, function () {
        return _this6.events.emit(constants$3.PAIRING_EVENTS.disabled);
      });
    };

    _createClass(Pairing, [{
      key: "length",
      get: function get() {
        return this.settled.length;
      }
    }, {
      key: "topics",
      get: function get() {
        return this.settled.topics;
      }
    }, {
      key: "values",
      get: function get() {
        return this.settled.values.map(function (x) {
          return x.data;
        });
      }
    }]);

    return Pairing;
  }(cjs$3.IPairing);

  exports.Pairing = Pairing;
});
unwrapExports(pairing$2);

var bind$1 = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    return fn.apply(thisArg, args);
  };
};

var toString$1 = Object.prototype.toString;

function isArray(val) {
  return toString$1.call(val) === '[object Array]';
}

function isUndefined(val) {
  return typeof val === 'undefined';
}

function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

function isArrayBuffer(val) {
  return toString$1.call(val) === '[object ArrayBuffer]';
}

function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

function isArrayBufferView(val) {
  var result;

  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }

  return result;
}

function isString(val) {
  return typeof val === 'string';
}

function isNumber(val) {
  return typeof val === 'number';
}

function isObject(val) {
  return val !== null && typeof val === 'object';
}

function isPlainObject(val) {
  if (toString$1.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

function isDate(val) {
  return toString$1.call(val) === '[object Date]';
}

function isFile(val) {
  return toString$1.call(val) === '[object File]';
}

function isBlob(val) {
  return toString$1.call(val) === '[object Blob]';
}

function isFunction(val) {
  return toString$1.call(val) === '[object Function]';
}

function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function forEach(obj, fn) {
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  if (typeof obj !== 'object') {
    obj = [obj];
  }

  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

function merge() {
  var result = {};

  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}

function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind$1(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }

  return content;
}

var utils$3 = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}

var buildURL = function buildURL(url, params, paramsSerializer) {
  if (!params) {
    return url;
  }

  var serializedParams;

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils$3.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils$3.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils$3.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils$3.forEach(val, function parseValue(v) {
        if (utils$3.isDate(v)) {
          v = v.toISOString();
        } else if (utils$3.isObject(v)) {
          v = JSON.stringify(v);
        }

        parts.push(encode(key) + '=' + encode(v));
      });
    });
    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

function InterceptorManager() {
  this.handlers = [];
}

InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

InterceptorManager.prototype.forEach = function forEach(fn) {
  utils$3.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager;

var transformData = function transformData(data, headers, fns) {
  utils$3.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });
  return data;
};

var isCancel = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils$3.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

var enhanceError = function enhanceError(error, config, code, request, response) {
  error.config = config;

  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: this.config,
      code: this.code
    };
  };

  return error;
};

var createError = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

var settle = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;

  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
  }
};

var cookies = utils$3.isStandardBrowserEnv() ? function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils$3.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils$3.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils$3.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() : function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();

var isAbsoluteURL = function isAbsoluteURL(url) {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

var buildFullPath = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }

  return requestedURL;
};

var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];

var parseHeaders = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {
    return parsed;
  }

  utils$3.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils$3.trim(line.substr(0, i)).toLowerCase();
    val = utils$3.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }

      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });
  return parsed;
};

var isURLSameOrigin = utils$3.isStandardBrowserEnv() ? function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;

  function resolveURL(url) {
    var href = url;

    if (msie) {
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href);
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }

  originURL = resolveURL(window.location.href);
  return function isURLSameOrigin(requestURL) {
    var parsed = utils$3.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils$3.isFormData(requestData)) {
      delete requestHeaders['Content-Type'];
    }

    var request = new XMLHttpRequest();

    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
    request.timeout = config.timeout;

    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };
      settle(resolve, reject, response);
      request = null;
    };

    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));
      request = null;
    };

    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request));
      request = null;
    };

    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';

      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }

      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED', request));
      request = null;
    };

    if (utils$3.isStandardBrowserEnv()) {
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    if ('setRequestHeader' in request) {
      utils$3.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          delete requestHeaders[key];
        } else {
          request.setRequestHeader(key, val);
        }
      });
    }

    if (!utils$3.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    request.send(requestData);
  });
};

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils$3.isUndefined(headers) && utils$3.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;

  if (typeof XMLHttpRequest !== 'undefined') {
    adapter = xhr;
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    adapter = xhr;
  }

  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils$3.isFormData(data) || utils$3.isArrayBuffer(data) || utils$3.isBuffer(data) || utils$3.isStream(data) || utils$3.isFile(data) || utils$3.isBlob(data)) {
      return data;
    }

    if (utils$3.isArrayBufferView(data)) {
      return data.buffer;
    }

    if (utils$3.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    if (utils$3.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }

    return data;
  }],
  transformResponse: [function transformResponse(data) {
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {}
    }

    return data;
  }],
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};
defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};
utils$3.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});
utils$3.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils$3.merge(DEFAULT_CONTENT_TYPE);
});
var defaults_1 = defaults;

function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

var dispatchRequest = function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = config.headers || {};
  config.data = transformData(config.data, config.headers, config.transformRequest);
  config.headers = utils$3.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
  utils$3.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });
  var adapter = config.adapter || defaults_1.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData(response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      if (reason && reason.response) {
        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};

var mergeConfig = function mergeConfig(config1, config2) {
  config2 = config2 || {};
  var config = {};
  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = ['baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress', 'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils$3.isPlainObject(target) && utils$3.isPlainObject(source)) {
      return utils$3.merge(target, source);
    } else if (utils$3.isPlainObject(source)) {
      return utils$3.merge({}, source);
    } else if (utils$3.isArray(source)) {
      return source.slice();
    }

    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils$3.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils$3.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });
  utils$3.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
  utils$3.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils$3.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });
  utils$3.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });
  var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
  var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
    return axiosKeys.indexOf(key) === -1;
  });
  utils$3.forEach(otherKeys, mergeDeepProperties);
  return config;
};

function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager_1(),
    response: new InterceptorManager_1()
  };
}

Axios.prototype.request = function request(config) {
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

utils$3.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  Axios.prototype[method] = function (url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});
utils$3.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  Axios.prototype[method] = function (url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
var Axios_1 = Axios;

function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;
var Cancel_1 = Cancel;

function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      return;
    }

    token.reason = new Cancel_1(message);
    resolvePromise(token.reason);
  });
}

CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

var CancelToken_1 = CancelToken;

var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

var isAxiosError = function isAxiosError(payload) {
  return typeof payload === 'object' && payload.isAxiosError === true;
};

function createInstance(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind$1(Axios_1.prototype.request, context);
  utils$3.extend(instance, Axios_1.prototype, context);
  utils$3.extend(instance, context);
  return instance;
}

var axios = createInstance(defaults_1);
axios.Axios = Axios_1;

axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

axios.Cancel = Cancel_1;
axios.CancelToken = CancelToken_1;
axios.isCancel = isCancel;

axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = spread;
axios.isAxiosError = isAxiosError;
var axios_1 = axios;
var _default = axios;
axios_1["default"] = _default;

var axios$1 = axios_1;

var url = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isLocalhostUrl = exports.isWsUrl = exports.isHttpUrl = void 0;
  var HTTP_REGEX = "^https?:";
  var WS_REGEX = "^wss?:";

  function getUrlProtocol(url) {
    var matches = url.match(new RegExp(/^\w+:/, "gi"));
    if (!matches || !matches.length) return;
    return matches[0];
  }

  function matchRegexProtocol(url, regex) {
    var protocol = getUrlProtocol(url);
    if (typeof protocol === "undefined") return false;
    return new RegExp(regex).test(protocol);
  }

  function isHttpUrl(url) {
    return matchRegexProtocol(url, HTTP_REGEX);
  }

  exports.isHttpUrl = isHttpUrl;

  function isWsUrl(url) {
    return matchRegexProtocol(url, WS_REGEX);
  }

  exports.isWsUrl = isWsUrl;

  function isLocalhostUrl(url) {
    return new RegExp("wss?://localhost(:d{2,5})?").test(url);
  }

  exports.isLocalhostUrl = isLocalhostUrl;
});
unwrapExports(url);

var http = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.HttpConnection = void 0;

  var axios_1 = tslib_1.__importDefault(axios$1);

  var HttpConnection = /*#__PURE__*/function () {
    function HttpConnection(url$1) {
      this.url = url$1;
      this.events = new events.EventEmitter();
      this.registering = false;

      if (!url.isHttpUrl(url$1)) {
        throw new Error("Provided URL is not compatible with HTTP connection: " + url$1);
      }

      this.url = url$1;
    }

    var _proto = HttpConnection.prototype;

    _proto.on = function on(event, listener) {
      this.events.on(event, listener);
    };

    _proto.once = function once(event, listener) {
      this.events.once(event, listener);
    };

    _proto.off = function off(event, listener) {
      this.events.off(event, listener);
    };

    _proto.removeListener = function removeListener(event, listener) {
      this.events.removeListener(event, listener);
    };

    _proto.open = function open(url) {
      if (url === void 0) {
        url = this.url;
      }

      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.register(url);

              case 2:
                this.api = _context.sent;

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    };

    _proto.close = function close() {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.onClose();

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
    };

    _proto.send = function send(payload, context) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(typeof this.api === "undefined")) {
                  _context3.next = 4;
                  break;
                }

                _context3.next = 3;
                return this.register();

              case 3:
                this.api = _context3.sent;

              case 4:
                this.api.post("/", payload).then(function (res) {
                  return _this.onPayload(res);
                })["catch"](function (err) {
                  return _this.onError(payload.id, err);
                });

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
    };

    _proto.register = function register(url$1) {
      if (url$1 === void 0) {
        url$1 = this.url;
      }

      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _this2 = this;

        var api;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (url.isHttpUrl(url$1)) {
                  _context4.next = 2;
                  break;
                }

                throw new Error("Provided URL is not compatible with HTTP connection: " + url$1);

              case 2:
                if (!this.registering) {
                  _context4.next = 4;
                  break;
                }

                return _context4.abrupt("return", new Promise(function (resolve, reject) {
                  _this2.events.once("open", function () {
                    if (typeof _this2.api === "undefined") {
                      return reject(new Error("HTTP connection is missing or invalid"));
                    }

                    resolve(_this2.api);
                  });
                }));

              case 4:
                this.url = url$1;
                this.registering = true;
                api = axios_1["default"].create({
                  baseURL: url$1,
                  timeout: 30000,
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  }
                });
                _context4.prev = 7;
                _context4.next = 10;
                return api.post("/", {
                  id: 1,
                  jsonrpc: "2.0",
                  method: "test",
                  params: []
                });

              case 10:
                this.onOpen(api);
                _context4.next = 17;
                break;

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](7);
                this.onClose();
                throw new Error("Unavailable HTTP RPC url at " + url$1);

              case 17:
                return _context4.abrupt("return", api);

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[7, 13]]);
      }));
    };

    _proto.onOpen = function onOpen(api) {
      this.api = api;
      this.registering = false;
      this.events.emit("open");
    };

    _proto.onClose = function onClose() {
      this.api = undefined;
      this.events.emit("close");
    };

    _proto.onPayload = function onPayload(e) {
      if (typeof e.data === "undefined") return;
      var payload = typeof e.data === "string" ? cjs.safeJsonParse(e.data) : e.data;
      this.events.emit("payload", payload);
    };

    _proto.onError = function onError(id, e) {
      var message = e.message || e.toString();
      var payload = cjs$c.formatJsonRpcError(id, message);
      this.events.emit("payload", payload);
    };

    _createClass(HttpConnection, [{
      key: "connected",
      get: function get() {
        return typeof this.api !== "undefined";
      }
    }, {
      key: "connecting",
      get: function get() {
        return this.registering;
      }
    }]);

    return HttpConnection;
  }();

  exports.HttpConnection = HttpConnection;
});
unwrapExports(http);

var browser$4 = function browser() {
  throw new Error('ws does not work in the browser. Browser clients must use the native ' + 'WebSocket object');
};

var ws = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.WsConnection = void 0;
  var WS = typeof commonjsGlobal.WebSocket !== "undefined" ? commonjsGlobal.WebSocket : browser$4;

  var WsConnection = /*#__PURE__*/function () {
    function WsConnection(url$1) {
      this.url = url$1;
      this.events = new events.EventEmitter();
      this.registering = false;

      if (!url.isWsUrl(url$1)) {
        throw new Error("Provided URL is not compatible with WebSocket connection: " + url$1);
      }

      this.url = url$1;
    }

    var _proto = WsConnection.prototype;

    _proto.on = function on(event, listener) {
      this.events.on(event, listener);
    };

    _proto.once = function once(event, listener) {
      this.events.once(event, listener);
    };

    _proto.off = function off(event, listener) {
      this.events.off(event, listener);
    };

    _proto.removeListener = function removeListener(event, listener) {
      this.events.removeListener(event, listener);
    };

    _proto.open = function open(url) {
      if (url === void 0) {
        url = this.url;
      }

      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.register(url);

              case 2:
                this.socket = _context.sent;

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    };

    _proto.close = function close() {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(typeof this.socket === "undefined")) {
                  _context2.next = 2;
                  break;
                }

                throw new Error("Already disconnected");

              case 2:
                this.socket.close();
                this.onClose();

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
    };

    _proto.send = function send(payload, context) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(typeof this.socket === "undefined")) {
                  _context3.next = 4;
                  break;
                }

                _context3.next = 3;
                return this.register();

              case 3:
                this.socket = _context3.sent;

              case 4:
                this.socket.send(cjs.safeJsonStringify(payload));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
    };

    _proto.register = function register(url$1) {
      var _this = this;

      if (url$1 === void 0) {
        url$1 = this.url;
      }

      if (!url.isWsUrl(url$1)) {
        throw new Error("Provided URL is not compatible with WebSocket connection: " + url$1);
      }

      if (this.registering) {
        return new Promise(function (resolve, reject) {
          _this.events.once("open", function () {
            if (typeof _this.socket === "undefined") {
              return reject(new Error("WebSocket connection is missing or invalid"));
            }

            resolve(_this.socket);
          });
        });
      }

      this.url = url$1;
      this.registering = true;
      return new Promise(function (resolve, reject) {
        var opts = !cjs$c.isReactNative() ? {
          rejectUnauthorized: !url.isLocalhostUrl(url$1)
        } : undefined;
        var socket = new WS(url$1, [], opts);

        socket.onopen = function () {
          _this.onOpen(socket);

          resolve(socket);
        };

        socket.onerror = function (event) {
          _this.events.emit("error", event);

          reject(event);
        };
      });
    };

    _proto.onOpen = function onOpen(socket) {
      var _this2 = this;

      socket.onmessage = function (event) {
        return _this2.onPayload(event);
      };

      socket.onclose = function () {
        return _this2.onClose();
      };

      this.socket = socket;
      this.registering = false;
      this.events.emit("open");
    };

    _proto.onClose = function onClose() {
      this.socket = undefined;
      this.events.emit("close");
    };

    _proto.onPayload = function onPayload(e) {
      if (typeof e.data === "undefined") return;
      var payload = typeof e.data === "string" ? cjs.safeJsonParse(e.data) : e.data;
      this.events.emit("payload", payload);
    };

    _createClass(WsConnection, [{
      key: "connected",
      get: function get() {
        return typeof this.socket !== "undefined";
      }
    }, {
      key: "connecting",
      get: function get() {
        return this.registering;
      }
    }]);

    return WsConnection;
  }();

  exports.WsConnection = WsConnection;
});
unwrapExports(ws);

var provider$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.JsonRpcProvider = void 0;

  var JsonRpcProvider = /*#__PURE__*/function (_utils_1$IJsonRpcProv) {
    _inheritsLoose(JsonRpcProvider, _utils_1$IJsonRpcProv);

    function JsonRpcProvider(connection) {
      var _this;

      _this = _utils_1$IJsonRpcProv.call(this, connection) || this;
      _this.events = new events.EventEmitter();
      _this.connection = _this.setConnection(connection);
      return _this;
    }

    var _proto = JsonRpcProvider.prototype;

    _proto.connect = function connect(connection) {
      if (connection === void 0) {
        connection = this.connection;
      }

      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.open(connection);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    };

    _proto.disconnect = function disconnect() {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.close();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
    };

    _proto.on = function on(event, listener) {
      this.events.on(event, listener);
    };

    _proto.once = function once(event, listener) {
      this.events.once(event, listener);
    };

    _proto.off = function off(event, listener) {
      this.events.off(event, listener);
    };

    _proto.removeListener = function removeListener(event, listener) {
      this.events.removeListener(event, listener);
    };

    _proto.request = function request(_request, context) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.requestStrict(cjs$c.formatJsonRpcRequest(_request.method, _request.params || []), context));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
    };

    _proto.requestStrict = function requestStrict(request, context) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", new Promise(function (resolve, reject) {
                  return tslib_1.__awaiter(_this2, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            if (this.connection.connected) {
                              _context4.next = 9;
                              break;
                            }

                            _context4.prev = 1;
                            _context4.next = 4;
                            return this.open();

                          case 4:
                            _context4.next = 9;
                            break;

                          case 6:
                            _context4.prev = 6;
                            _context4.t0 = _context4["catch"](1);
                            reject(_context4.t0.message);

                          case 9:
                            this.events.on("" + request.id, function (response) {
                              if (cjs$c.isJsonRpcError(response)) {
                                reject(response.error.message);
                              } else {
                                resolve(response.result);
                              }
                            });
                            _context4.next = 12;
                            return this.connection.send(request);

                          case 12:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4, this, [[1, 6]]);
                  }));
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));
    };

    _proto.setConnection = function setConnection(connection) {
      if (connection === void 0) {
        connection = this.connection;
      }

      return typeof connection === "string" ? url.isHttpUrl(connection) ? new http.HttpConnection(connection) : new ws.WsConnection(connection) : connection;
    };

    _proto.onPayload = function onPayload(payload) {
      this.events.emit("payload", payload);

      if (cjs$c.isJsonRpcResponse(payload)) {
        this.events.emit("" + payload.id, payload);
      } else {
        this.events.emit("message", {
          type: payload.method,
          data: payload.params
        });
      }
    };

    _proto.open = function open(connection) {
      if (connection === void 0) {
        connection = this.connection;
      }

      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _this3 = this;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(this.connection === connection && this.connection.connected)) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return");

              case 2:
                if (this.connection.connected) this.close();
                this.connection = this.setConnection();
                _context6.next = 6;
                return this.connection.open();

              case 6:
                this.connection.on("payload", function (payload) {
                  return _this3.onPayload(payload);
                });
                this.connection.on("close", function () {
                  return _this3.events.emit("disconnect");
                });
                this.connection.on("error", function () {
                  return _this3.events.emit("error");
                });
                this.events.emit("connect");

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
    };

    _proto.close = function close() {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.connection.close();

              case 2:
                this.events.emit("disconnect");

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
    };

    return JsonRpcProvider;
  }(cjs$c.IJsonRpcProvider);

  exports.JsonRpcProvider = JsonRpcProvider;
  exports["default"] = JsonRpcProvider;
});
unwrapExports(provider$1);

var cjs$d = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var provider_1 = tslib_1.__importDefault(provider$1);

  tslib_1.__exportStar(http, exports);

  tslib_1.__exportStar(ws, exports);

  tslib_1.__exportStar(provider$1, exports);

  exports["default"] = provider_1["default"];
});
unwrapExports(cjs$d);

var provider$2 = createCommonjsModule(function (module, exports) {

  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var provider_1 = __importDefault(cjs$d);

  var RelayProvider = /*#__PURE__*/function (_provider_1$default) {
    _inheritsLoose(RelayProvider, _provider_1$default);

    function RelayProvider(rpcUrl) {
      return _provider_1$default.call(this, rpcUrl) || this;
    }

    return RelayProvider;
  }(provider_1["default"]);

  exports.RelayProvider = RelayProvider;
  exports["default"] = RelayProvider;
});
unwrapExports(provider$2);

var misc$3 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function assertType(obj, key, type) {
    if (type === void 0) {
      type = 'string';
    }

    if (!obj[key] || typeof obj[key] !== type) {
      throw new Error("Missing or invalid \"" + key + "\" param");
    }
  }

  exports.assertType = assertType;

  function hasParamsLength(params, length) {
    return Array.isArray(params) ? params.length === length : Object.keys(params).length === length;
  }

  exports.hasParamsLength = hasParamsLength;

  function methodEndsWith(method, expected, separator) {
    if (separator === void 0) {
      separator = '_';
    }

    var split = method.split(separator);
    return split[split.length - 1].trim().toLowerCase() === expected.trim().toLowerCase();
  }

  exports.methodEndsWith = methodEndsWith;
});
unwrapExports(misc$3);

var validators$3 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function isSubscribeRequest(request) {
    return isSubscribeMethod(request.method) && isSubscribeParams(request.params);
  }

  exports.isSubscribeRequest = isSubscribeRequest;

  function isSubscribeMethod(method) {
    return misc$3.methodEndsWith(method, 'subscribe');
  }

  exports.isSubscribeMethod = isSubscribeMethod;

  function isSubscribeParams(params) {
    return misc$3.hasParamsLength(params, 1) && 'topic' in params;
  }

  exports.isSubscribeParams = isSubscribeParams;

  function isPublishRequest(request) {
    return isPublishMethod(request.method) && isPublishParams(request.params);
  }

  exports.isPublishRequest = isPublishRequest;

  function isPublishMethod(method) {
    return misc$3.methodEndsWith(method, 'publish');
  }

  exports.isPublishMethod = isPublishMethod;

  function isPublishParams(params) {
    return misc$3.hasParamsLength(params, 3) && 'message' in params && 'topic' in params && 'ttl' in params;
  }

  exports.isPublishParams = isPublishParams;

  function isUnsubscribeRequest(request) {
    return isUnsubscribeMethod(request.method) && isUnsubscribeParams(request.params);
  }

  exports.isUnsubscribeRequest = isUnsubscribeRequest;

  function isUnsubscribeMethod(method) {
    return misc$3.methodEndsWith(method, 'unsubscribe');
  }

  exports.isUnsubscribeMethod = isUnsubscribeMethod;

  function isUnsubscribeParams(params) {
    return misc$3.hasParamsLength(params, 1) && 'id' in params;
  }

  exports.isUnsubscribeParams = isUnsubscribeParams;

  function isSubscriptionRequest(request) {
    return isSubscriptionMethod(request.method) && isSubscriptionParams(request.params);
  }

  exports.isSubscriptionRequest = isSubscriptionRequest;

  function isSubscriptionMethod(method) {
    return misc$3.methodEndsWith(method, 'subscription');
  }

  exports.isSubscriptionMethod = isSubscriptionMethod;

  function isSubscriptionParams(params) {
    return misc$3.hasParamsLength(params, 2) && 'id' in params && 'data' in params;
  }

  exports.isSubscriptionParams = isSubscriptionParams;
});
unwrapExports(validators$3);

var parsers = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function parseSubscribeRequest(request) {
    if (!validators$3.isSubscribeMethod(request.method)) {
      throw new Error('JSON-RPC Request has invalid subscribe method');
    }

    if (!validators$3.isSubscribeParams(request.params)) {
      throw new Error('JSON-RPC Request has invalid subscribe params');
    }

    var params = request.params;
    misc$3.assertType(params, 'topic');
    return params;
  }

  exports.parseSubscribeRequest = parseSubscribeRequest;

  function parsePublishRequest(request) {
    if (!validators$3.isPublishMethod(request.method)) {
      throw new Error('JSON-RPC Request has invalid publish method');
    }

    if (!validators$3.isPublishParams(request.params)) {
      throw new Error('JSON-RPC Request has invalid publish params');
    }

    var params = request.params;
    misc$3.assertType(params, 'topic');
    misc$3.assertType(params, 'message');
    misc$3.assertType(params, 'ttl', 'number');
    return params;
  }

  exports.parsePublishRequest = parsePublishRequest;

  function parseUnsubscribeRequest(request) {
    if (!validators$3.isUnsubscribeMethod(request.method)) {
      throw new Error('JSON-RPC Request has invalid unsubscribe method');
    }

    if (!validators$3.isUnsubscribeParams(request.params)) {
      throw new Error('JSON-RPC Request has invalid unsubscribe params');
    }

    var params = request.params;
    misc$3.assertType(params, 'id');
    return params;
  }

  exports.parseUnsubscribeRequest = parseUnsubscribeRequest;

  function parseSubscriptionRequest(request) {
    if (!validators$3.isSubscriptionMethod(request.method)) {
      throw new Error('JSON-RPC Request has invalid subscription method');
    }

    if (!validators$3.isSubscriptionParams(request.params)) {
      throw new Error('JSON-RPC Request has invalid subscription params');
    }

    var params = request.params;
    misc$3.assertType(params, 'id');
    misc$3.assertType(params, 'data');
    return params;
  }

  exports.parseSubscriptionRequest = parseSubscriptionRequest;
});
unwrapExports(parsers);

var jsonrpc$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RELAY_JSONRPC = {
    bridge: {
      info: 'bridge_info',
      connect: 'bridge_connect',
      disconnect: 'bridge_disconnect',
      publish: 'bridge_publish',
      subscribe: 'bridge_subscribe',
      subscription: 'bridge_subscription',
      unsubscribe: 'bridge_unsubscribe'
    },
    waku: {
      info: 'waku_info',
      connect: 'waku_connect',
      disconnect: 'waku_disconnect',
      publish: 'waku_publish',
      subscribe: 'waku_subscribe',
      subscription: 'waku_subscription',
      unsubscribe: 'waku_unsubscribe'
    }
  };
});
unwrapExports(jsonrpc$1);

var cjs$e = createCommonjsModule(function (module, exports) {

  function __export(m) {
    for (var p in m) {
      if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
  }

  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var provider_1 = __importDefault(provider$2);

  __export(parsers);

  __export(provider$2);

  __export(jsonrpc$1);

  __export(validators$3);

  exports["default"] = provider_1["default"];
});
unwrapExports(cjs$e);

var relayer$2 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Relayer = void 0;

  var Relayer = /*#__PURE__*/function (_types_1$IRelayer) {
    _inheritsLoose(Relayer, _types_1$IRelayer);

    function Relayer(client, logger, provider) {
      var _this;

      _this = _types_1$IRelayer.call(this, client, logger) || this;
      _this.client = client;
      _this.logger = logger;
      _this.events = new events.EventEmitter();
      _this.context = constants$3.RELAYER_CONTEXT;
      _this.logger = cjs$a.generateChildLogger(logger, _this.context);
      _this.provider = _this.setProvider(provider);

      _this.registerEventListeners();

      return _this;
    }

    var _proto = Relayer.prototype;

    _proto.init = function init() {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.logger.trace("Initialized");
                _context.next = 3;
                return this.provider.connect();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    };

    _proto.publish = function publish(topic, payload, opts) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var protocol, msg, message, jsonRpc, request;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.logger.debug("Publishing Payload");
                this.logger.trace({
                  type: "method",
                  method: "publish",
                  params: {
                    topic: topic,
                    payload: payload,
                    opts: opts
                  }
                });
                _context2.prev = 2;
                protocol = (opts === null || opts === void 0 ? void 0 : opts.relay.protocol) || constants$3.RELAYER_DEFAULT_PROTOCOL;
                msg = cjs.safeJsonStringify(payload);

                if (!(opts === null || opts === void 0 ? void 0 : opts.encryptKeys)) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 8;
                return cjs$9.encrypt(Object.assign(Object.assign({}, opts.encryptKeys), {
                  message: msg
                }));

              case 8:
                _context2.t0 = _context2.sent;
                _context2.next = 12;
                break;

              case 11:
                _context2.t0 = cjs$4.utf8ToHex(msg);

              case 12:
                message = _context2.t0;
                jsonRpc = getRelayProtocolJsonRpc(protocol);
                request = {
                  method: jsonRpc.publish,
                  params: {
                    topic: topic,
                    message: message,
                    ttl: (opts === null || opts === void 0 ? void 0 : opts.ttl) || constants$3.RELAYER_DEFAULT_PUBLISH_TTL
                  }
                };
                this.logger.info("Outgoing Relay Payload");
                this.logger.debug({
                  type: "payload",
                  direction: "outgoing",
                  request: request
                });
                _context2.next = 19;
                return this.provider.request(request);

              case 19:
                this.logger.debug("Successfully Published Payload");
                this.logger.trace({
                  type: "method",
                  method: "publish",
                  request: request
                });
                _context2.next = 28;
                break;

              case 23:
                _context2.prev = 23;
                _context2.t1 = _context2["catch"](2);
                this.logger.debug("Failed to Publish Payload");
                this.logger.error(_context2.t1);
                throw _context2.t1;

              case 28:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 23]]);
      }));
    };

    _proto.subscribe = function subscribe(topic, listener, opts) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _this2 = this;

        var protocol, jsonRpc, request, id;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.logger.debug("Subscribing Topic");
                this.logger.trace({
                  type: "method",
                  method: "subscribe",
                  params: {
                    topic: topic,
                    opts: opts
                  }
                });
                _context4.prev = 2;
                protocol = (opts === null || opts === void 0 ? void 0 : opts.relay.protocol) || constants$3.RELAYER_DEFAULT_PROTOCOL;
                jsonRpc = getRelayProtocolJsonRpc(protocol);
                request = {
                  method: jsonRpc.subscribe,
                  params: {
                    topic: topic
                  }
                };
                this.logger.info("Outgoing Relay Payload");
                this.logger.debug({
                  type: "payload",
                  direction: "outgoing",
                  request: request
                });
                _context4.next = 10;
                return this.provider.request(request);

              case 10:
                id = _context4.sent;
                this.events.on(id, function (_ref) {
                  var message = _ref.message;
                  return tslib_1.__awaiter(_this2, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                    var payload;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.t0 = cjs;

                            if (!(opts === null || opts === void 0 ? void 0 : opts.decryptKeys)) {
                              _context3.next = 7;
                              break;
                            }

                            _context3.next = 4;
                            return cjs$9.decrypt(Object.assign(Object.assign({}, opts.decryptKeys), {
                              encrypted: message
                            }));

                          case 4:
                            _context3.t1 = _context3.sent;
                            _context3.next = 8;
                            break;

                          case 7:
                            _context3.t1 = cjs$4.hexToUtf8(message);

                          case 8:
                            _context3.t2 = _context3.t1;
                            payload = _context3.t0.safeJsonParse.call(_context3.t0, _context3.t2);
                            listener(payload);

                          case 11:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));
                });
                this.logger.debug("Successfully Subscribed Topic");
                this.logger.trace({
                  type: "method",
                  method: "subscribe",
                  request: request
                });
                return _context4.abrupt("return", id);

              case 17:
                _context4.prev = 17;
                _context4.t0 = _context4["catch"](2);
                this.logger.debug("Failed to Subscribe Topic");
                this.logger.error(_context4.t0);
                throw _context4.t0;

              case 22:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 17]]);
      }));
    };

    _proto.unsubscribe = function unsubscribe(id, opts) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var protocol, jsonRpc, request;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.logger.debug("Unsubscribing Topic");
                this.logger.trace({
                  type: "method",
                  method: "unsubscribe",
                  params: {
                    id: id,
                    opts: opts
                  }
                });
                _context5.prev = 2;
                protocol = (opts === null || opts === void 0 ? void 0 : opts.relay.protocol) || constants$3.RELAYER_DEFAULT_PROTOCOL;
                jsonRpc = getRelayProtocolJsonRpc(protocol);
                request = {
                  method: jsonRpc.unsubscribe,
                  params: {
                    id: id
                  }
                };
                this.logger.info("Outgoing Relay Payload");
                this.logger.debug({
                  type: "payload",
                  direction: "outgoing",
                  request: request
                });
                _context5.next = 10;
                return this.provider.request(request);

              case 10:
                this.events.removeAllListeners(id);
                this.logger.debug("Successfully Unsubscribed Topic");
                this.logger.trace({
                  type: "method",
                  method: "unsubscribe",
                  request: request
                });
                _context5.next = 20;
                break;

              case 15:
                _context5.prev = 15;
                _context5.t0 = _context5["catch"](2);
                this.logger.debug("Failed to Unsubscribe Topic");
                this.logger.error(_context5.t0);
                throw _context5.t0;

              case 20:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 15]]);
      }));
    };

    _proto.on = function on(event, listener) {
      this.events.on(event, listener);
    };

    _proto.once = function once(event, listener) {
      this.events.once(event, listener);
    };

    _proto.off = function off(event, listener) {
      this.events.off(event, listener);
    };

    _proto.removeListener = function removeListener(event, listener) {
      this.events.removeListener(event, listener);
    };

    _proto.onPayload = function onPayload(payload) {
      this.logger.info("Incoming Relay Payload");
      this.logger.debug({
        type: "payload",
        direction: "incoming",
        payload: payload
      });

      if (cjs$c.isJsonRpcRequest(payload)) {
        if (payload.method.endsWith("_subscription")) {
          var event = payload.params;
          this.events.emit(event.id, event.data);
          var response = cjs$c.formatJsonRpcResult(payload.id, true);
          this.provider.connection.send(response);
        }
      }
    };

    _proto.setProvider = function setProvider(provider) {
      this.logger.debug("Setting Relay Provider");
      this.logger.trace({
        type: "method",
        method: "setProvider",
        provider: provider === null || provider === void 0 ? void 0 : provider.toString()
      });
      var rpcUrl = cjs$9.formatRelayRpcUrl(this.client.protocol, this.client.version, typeof provider === "string" ? provider : constants$3.RELAYER_DEFAULT_RPC_URL);
      return typeof provider !== "string" && typeof provider !== "undefined" ? provider : new cjs$d.JsonRpcProvider(rpcUrl);
    };

    _proto.registerEventListeners = function registerEventListeners() {
      var _this3 = this;

      this.provider.on("payload", function (payload) {
        return _this3.onPayload(payload);
      });
      this.provider.on("connect", function () {
        return _this3.events.emit(constants$3.RELAYER_EVENTS.connect);
      });
      this.provider.on("disconnect", function () {
        _this3.events.emit(constants$3.RELAYER_EVENTS.disconnect);

        _this3.provider.connect();
      });
      this.provider.on("error", function (e) {
        return _this3.events.emit(constants$3.RELAYER_EVENTS.error, e);
      });
    };

    _createClass(Relayer, [{
      key: "connected",
      get: function get() {
        return this.provider.connection.connected;
      }
    }]);

    return Relayer;
  }(cjs$3.IRelayer);

  exports.Relayer = Relayer;

  function getRelayProtocolJsonRpc(protocol) {
    var jsonrpc = cjs$e.RELAY_JSONRPC[protocol];

    if (typeof jsonrpc === "undefined") {
      throw new Error("Relay Protocol not supported: " + protocol);
    }

    return jsonrpc;
  }
});
unwrapExports(relayer$2);

var session$2 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Session = void 0;

  var Session = /*#__PURE__*/function (_types_1$ISession) {
    _inheritsLoose(Session, _types_1$ISession);

    function Session(client, logger) {
      var _this;

      _this = _types_1$ISession.call(this, client, logger) || this;
      _this.client = client;
      _this.logger = logger;
      _this.events = new events.EventEmitter();
      _this.context = constants$3.SESSION_CONTEXT;
      _this.logger = cjs$a.generateChildLogger(logger, _this.context);
      _this.pending = new subscription$2.Subscription(client, _this.logger, constants$3.SESSION_STATUS.pending, true);
      _this.settled = new subscription$2.Subscription(client, _this.logger, constants$3.SESSION_STATUS.settled, true);
      _this.history = new history$2.JsonRpcHistory(client, _this.logger);

      _this.registerEventListeners();

      return _this;
    }

    var _proto = Session.prototype;

    _proto.init = function init() {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.logger.trace("Initialized");
                _context.next = 3;
                return this.pending.init();

              case 3:
                _context.next = 5;
                return this.settled.init();

              case 5:
                _context.next = 7;
                return this.history.init();

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    };

    _proto.get = function get(topic) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.settled.get(topic));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
    };

    _proto.ping = function ping(topic, timeout) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var request;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                request = {
                  method: constants$3.SESSION_JSONRPC.ping,
                  params: {}
                };
                return _context3.abrupt("return", this.request({
                  topic: topic,
                  request: request,
                  timeout: timeout || constants$3.THIRTY_SECONDS * 1000
                }));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
    };

    _proto.send = function send(topic, payload, chainId) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var session, encryptKeys, error, _error;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.settled.get(topic);

              case 2:
                session = _context4.sent;
                encryptKeys = {
                  sharedKey: session.sharedKey,
                  publicKey: session.self.publicKey
                };

                if (!cjs$c.isJsonRpcRequest(payload)) {
                  _context4.next = 19;
                  break;
                }

                if (Object.values(constants$3.SESSION_JSONRPC).includes(payload.method)) {
                  _context4.next = 17;
                  break;
                }

                if (session.permissions.jsonrpc.methods.includes(payload.method)) {
                  _context4.next = 10;
                  break;
                }

                error = cjs$9.getError(cjs$9.ERROR.UNAUTHORIZED_JSON_RPC_METHOD, {
                  method: payload.method
                });
                this.logger.error(error.message);
                throw new Error(error.message);

              case 10:
                if (!(typeof chainId !== "undefined" && !session.permissions.blockchain.chains.includes(chainId))) {
                  _context4.next = 14;
                  break;
                }

                _error = cjs$9.getError(cjs$9.ERROR.UNAUTHORIZED_TARGET_CHAIN, {
                  chainId: chainId
                });
                this.logger.error(_error.message);
                throw new Error(_error.message);

              case 14:
                _context4.next = 16;
                return this.history.set(topic, payload, chainId);

              case 16:
                payload = cjs$c.formatJsonRpcRequest(constants$3.SESSION_JSONRPC.payload, {
                  chainId: chainId,
                  request: {
                    method: payload.method,
                    params: payload.params
                  }
                }, payload.id);

              case 17:
                _context4.next = 21;
                break;

              case 19:
                _context4.next = 21;
                return this.history.update(topic, payload);

              case 21:
                _context4.next = 23;
                return this.client.relayer.publish(session.topic, payload, {
                  relay: session.relay,
                  encryptKeys: encryptKeys
                });

              case 23:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
    };

    _proto.create = function create(params) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        return tslib_1.__awaiter(_this2, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
          var _this3 = this;

          var maxTimeout, timeout, pending;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  this.logger.info("Create Session");
                  this.logger.trace({
                    type: "method",
                    method: "create",
                    params: params
                  });
                  maxTimeout = (params === null || params === void 0 ? void 0 : params.timeout) || constants$3.FIVE_MINUTES * 1000;
                  timeout = setTimeout(function () {
                    var error = cjs$9.getError(cjs$9.ERROR.SETTLE_TIMEOUT, {
                      context: _this3.context,
                      timeout: maxTimeout
                    });

                    _this3.logger.error(error.message);

                    reject(error.message);
                  }, maxTimeout);
                  _context6.prev = 4;
                  _context6.next = 7;
                  return this.propose(params);

                case 7:
                  pending = _context6.sent;
                  _context6.next = 14;
                  break;

                case 10:
                  _context6.prev = 10;
                  _context6.t0 = _context6["catch"](4);
                  clearTimeout(timeout);
                  return _context6.abrupt("return", reject(_context6.t0));

                case 14:
                  this.pending.on(constants$3.SUBSCRIPTION_EVENTS.updated, function (updatedEvent) {
                    return tslib_1.__awaiter(_this3, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                      var outcome, _session, reason;

                      return regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              if (!(pending.topic !== updatedEvent.data.topic)) {
                                _context5.next = 2;
                                break;
                              }

                              return _context5.abrupt("return");

                            case 2:
                              if (!cjs$9.isSessionResponded(updatedEvent.data)) {
                                _context5.next = 30;
                                break;
                              }

                              outcome = updatedEvent.data.outcome;
                              clearTimeout(timeout);

                              if (!cjs$9.isSessionFailed(outcome)) {
                                _context5.next = 17;
                                break;
                              }

                              _context5.prev = 6;
                              _context5.next = 9;
                              return this.pending["delete"](pending.topic, outcome.reason);

                            case 9:
                              _context5.next = 14;
                              break;

                            case 11:
                              _context5.prev = 11;
                              _context5.t0 = _context5["catch"](6);
                              return _context5.abrupt("return", reject(_context5.t0));

                            case 14:
                              reject(new Error(outcome.reason.message));
                              _context5.next = 30;
                              break;

                            case 17:
                              _context5.prev = 17;
                              _context5.next = 20;
                              return this.settled.get(outcome.topic);

                            case 20:
                              _session = _context5.sent;
                              reason = cjs$9.getError(cjs$9.ERROR.SETTLED, {
                                context: this.context
                              });
                              _context5.next = 24;
                              return this.pending["delete"](pending.topic, reason);

                            case 24:
                              resolve(_session);
                              _context5.next = 30;
                              break;

                            case 27:
                              _context5.prev = 27;
                              _context5.t1 = _context5["catch"](17);
                              return _context5.abrupt("return", reject(_context5.t1));

                            case 30:
                            case "end":
                              return _context5.stop();
                          }
                        }
                      }, _callee5, this, [[6, 11], [17, 27]]);
                    }));
                  });

                case 15:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6, this, [[4, 10]]);
        }));
      });
    };

    _proto.respond = function respond(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var paramsValidation, approved, proposal, response, relay, self, pairing, decryptKeys, responder, expiry, state, controller, _session2, outcome, pending, reason, _outcome, _pending, defaultReason, _outcome2, _pending2;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this.logger.info("Respond Session");
                this.logger.trace({
                  type: "method",
                  method: "respond",
                  params: params
                });
                paramsValidation = cjs$9.validateSessionRespondParams(params);

                if (!cjs$9.isValidationInvalid(paramsValidation)) {
                  _context7.next = 6;
                  break;
                }

                this.logger.error(paramsValidation.error.message);
                throw new Error(paramsValidation.error.message);

              case 6:
                approved = params.approved, proposal = params.proposal, response = params.response;
                relay = proposal.relay;
                self = cjs$9.generateKeyPair();
                _context7.next = 11;
                return this.client.pairing.get(proposal.signal.params.topic);

              case 11:
                pairing = _context7.sent;
                decryptKeys = {
                  sharedKey: pairing.sharedKey
                };

                if (!approved) {
                  _context7.next = 39;
                  break;
                }

                _context7.prev = 14;
                responder = {
                  publicKey: self.publicKey,
                  metadata: response.metadata
                };
                expiry = Date.now() + proposal.ttl * 1000;
                state = {
                  accounts: params.response.state.accounts
                };
                controller = proposal.proposer.controller ? {
                  publicKey: proposal.proposer.publicKey
                } : {
                  publicKey: self.publicKey
                };
                _context7.next = 21;
                return this.settle({
                  relay: relay,
                  self: self,
                  peer: proposal.proposer,
                  permissions: Object.assign(Object.assign({}, proposal.permissions), {
                    controller: controller
                  }),
                  ttl: proposal.ttl,
                  expiry: expiry,
                  state: state
                });

              case 21:
                _session2 = _context7.sent;
                outcome = {
                  topic: _session2.topic,
                  relay: _session2.relay,
                  state: _session2.state,
                  responder: responder,
                  expiry: expiry
                };
                pending = {
                  status: constants$3.SESSION_STATUS.responded,
                  topic: proposal.topic,
                  relay: proposal.relay,
                  self: self,
                  proposal: proposal,
                  outcome: outcome
                };
                _context7.next = 26;
                return this.pending.set(pending.topic, pending, {
                  relay: pending.relay,
                  decryptKeys: decryptKeys
                });

              case 26:
                return _context7.abrupt("return", pending);

              case 29:
                _context7.prev = 29;
                _context7.t0 = _context7["catch"](14);
                reason = cjs$9.getError(cjs$9.ERROR.GENERIC, {
                  message: _context7.t0.message
                });
                _outcome = {
                  reason: reason
                };
                _pending = {
                  status: constants$3.SESSION_STATUS.responded,
                  topic: proposal.topic,
                  relay: proposal.relay,
                  self: self,
                  proposal: proposal,
                  outcome: _outcome
                };
                _context7.next = 36;
                return this.pending.set(_pending.topic, _pending, {
                  relay: _pending.relay,
                  decryptKeys: decryptKeys
                });

              case 36:
                return _context7.abrupt("return", _pending);

              case 37:
                _context7.next = 45;
                break;

              case 39:
                defaultReason = cjs$9.getError(cjs$9.ERROR.NOT_APPROVED, {
                  context: this.context
                });
                _outcome2 = {
                  reason: (params === null || params === void 0 ? void 0 : params.reason) || defaultReason
                };
                _pending2 = {
                  status: constants$3.SESSION_STATUS.responded,
                  topic: proposal.topic,
                  relay: proposal.relay,
                  self: self,
                  proposal: proposal,
                  outcome: _outcome2
                };
                _context7.next = 44;
                return this.pending.set(_pending2.topic, _pending2, {
                  relay: _pending2.relay,
                  decryptKeys: decryptKeys
                });

              case 44:
                return _context7.abrupt("return", _pending2);

              case 45:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[14, 29]]);
      }));
    };

    _proto.upgrade = function upgrade(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var session, participant, upgrade, request;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                this.logger.info("Upgrade Session");
                this.logger.trace({
                  type: "method",
                  method: "upgrade",
                  params: params
                });
                _context8.next = 4;
                return this.settled.get(params.topic);

              case 4:
                session = _context8.sent;
                participant = {
                  publicKey: session.self.publicKey
                };
                _context8.next = 8;
                return this.handleUpgrade(params.topic, params, participant);

              case 8:
                upgrade = _context8.sent;
                request = cjs$c.formatJsonRpcRequest(constants$3.SESSION_JSONRPC.upgrade, upgrade);
                _context8.next = 12;
                return this.send(session.topic, request);

              case 12:
                return _context8.abrupt("return", session);

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
    };

    _proto.update = function update(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var session, participant, update, request;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                this.logger.info("Update Session");
                this.logger.trace({
                  type: "method",
                  method: "update",
                  params: params
                });
                _context9.next = 4;
                return this.settled.get(params.topic);

              case 4:
                session = _context9.sent;
                participant = {
                  publicKey: session.self.publicKey
                };
                _context9.next = 8;
                return this.handleUpdate(params.topic, params, participant);

              case 8:
                update = _context9.sent;
                request = cjs$c.formatJsonRpcRequest(constants$3.SESSION_JSONRPC.update, update);
                _context9.next = 12;
                return this.send(session.topic, request);

              case 12:
                return _context9.abrupt("return", session);

              case 13:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));
    };

    _proto.request = function request(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt("return", new Promise(function (resolve, reject) {
                  return tslib_1.__awaiter(_this4, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
                    var _this5 = this;

                    var request, maxTimeout, timeout;
                    return regeneratorRuntime.wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            request = cjs$c.formatJsonRpcRequest(params.request.method, params.request.params);
                            maxTimeout = (params === null || params === void 0 ? void 0 : params.timeout) || constants$3.FIVE_MINUTES * 1000;
                            timeout = setTimeout(function () {
                              var error = cjs$9.getError(cjs$9.ERROR.JSONRPC_REQUEST_TIMEOUT, {
                                method: request.method,
                                timeout: maxTimeout
                              });

                              _this5.logger.error(error.message);

                              reject(error.message);
                            }, maxTimeout);
                            this.events.on(constants$3.SESSION_EVENTS.response, function (responseEvent) {
                              if (params.topic !== responseEvent.topic) return;
                              var response = responseEvent.response;
                              if (response.id !== request.id) return;
                              clearTimeout(timeout);

                              if (cjs$c.isJsonRpcError(response)) {
                                var errorMessage = response.error.message;

                                _this5.logger.error(errorMessage);

                                return reject(new Error(errorMessage));
                              }

                              return resolve(response.result);
                            });
                            _context10.prev = 4;
                            _context10.next = 7;
                            return this.send(params.topic, request, params.chainId);

                          case 7:
                            _context10.next = 13;
                            break;

                          case 9:
                            _context10.prev = 9;
                            _context10.t0 = _context10["catch"](4);
                            clearTimeout(timeout);
                            return _context10.abrupt("return", reject(_context10.t0));

                          case 13:
                          case "end":
                            return _context10.stop();
                        }
                      }
                    }, _callee10, this, [[4, 9]]);
                  }));
                }));

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));
    };

    _proto["delete"] = function _delete(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                this.logger.info("Delete Session");
                this.logger.trace({
                  type: "method",
                  method: "delete",
                  params: params
                });
                this.settled["delete"](params.topic, params.reason);

              case 3:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));
    };

    _proto.notify = function notify(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        var session, error, notification, request;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this.settled.get(params.topic);

              case 2:
                session = _context13.sent;

                if (!(session.self.publicKey !== session.permissions.controller.publicKey && !session.permissions.notifications.types.includes(params.type))) {
                  _context13.next = 7;
                  break;
                }

                error = cjs$9.getError(cjs$9.ERROR.UNAUTHORIZED_NOTIFICATION_TYPE, {
                  type: params.type
                });
                this.logger.error(error.message);
                throw new Error(error.message);

              case 7:
                notification = {
                  type: params.type,
                  data: params.data
                };
                request = cjs$c.formatJsonRpcRequest(constants$3.SESSION_JSONRPC.notification, notification);
                _context13.next = 11;
                return this.send(params.topic, request);

              case 11:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));
    };

    _proto.on = function on(event, listener) {
      this.events.on(event, listener);
    };

    _proto.once = function once(event, listener) {
      this.events.once(event, listener);
    };

    _proto.off = function off(event, listener) {
      this.events.off(event, listener);
    };

    _proto.removeListener = function removeListener(event, listener) {
      this.events.removeListener(event, listener);
    };

    _proto.propose = function propose(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var paramsValidation, pairing, signal, decryptKeys, topic, self, proposer, proposal, pending;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                this.logger.info("Propose Session");
                this.logger.trace({
                  type: "method",
                  method: "propose",
                  params: params
                });
                paramsValidation = cjs$9.validateSessionProposeParams(params);

                if (!cjs$9.isValidationInvalid(paramsValidation)) {
                  _context14.next = 6;
                  break;
                }

                this.logger.error(paramsValidation.error.message);
                throw new Error(paramsValidation.error.message);

              case 6:
                if (!(params.signal.method !== constants$3.SESSION_SIGNAL_METHOD_PAIRING)) {
                  _context14.next = 8;
                  break;
                }

                throw new Error("Session proposal signal unsupported");

              case 8:
                _context14.next = 10;
                return this.client.pairing.settled.get(params.signal.params.topic);

              case 10:
                pairing = _context14.sent;
                signal = {
                  method: constants$3.SESSION_SIGNAL_METHOD_PAIRING,
                  params: {
                    topic: pairing.topic
                  }
                };
                decryptKeys = {
                  sharedKey: pairing.sharedKey
                };
                topic = cjs$9.generateRandomBytes32();
                self = cjs$9.generateKeyPair();
                proposer = {
                  publicKey: self.publicKey,
                  metadata: params.metadata,
                  controller: this.client.controller
                };
                proposal = {
                  topic: topic,
                  relay: params.relay,
                  proposer: proposer,
                  signal: signal,
                  permissions: params.permissions,
                  ttl: params.ttl || constants$3.SESSION_DEFAULT_TTL
                };
                pending = {
                  status: constants$3.SESSION_STATUS.proposed,
                  topic: proposal.topic,
                  relay: proposal.relay,
                  self: self,
                  proposal: proposal
                };
                _context14.next = 20;
                return this.pending.set(pending.topic, pending, {
                  relay: pending.relay,
                  decryptKeys: decryptKeys
                });

              case 20:
                return _context14.abrupt("return", pending);

              case 21:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));
    };

    _proto.settle = function settle(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        var sharedKey, topic, session, decryptKeys;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                this.logger.info("Settle Session");
                this.logger.trace({
                  type: "method",
                  method: "settle",
                  params: params
                });
                sharedKey = cjs$9.deriveSharedKey(params.self.privateKey, params.peer.publicKey);
                _context15.next = 5;
                return cjs$9.sha256(sharedKey);

              case 5:
                topic = _context15.sent;
                session = {
                  topic: topic,
                  relay: params.relay,
                  sharedKey: sharedKey,
                  self: params.self,
                  peer: params.peer,
                  permissions: params.permissions,
                  expiry: params.expiry,
                  state: params.state
                };
                decryptKeys = {
                  sharedKey: sharedKey
                };
                _context15.next = 10;
                return this.settled.set(session.topic, session, {
                  relay: session.relay,
                  expiry: session.expiry,
                  decryptKeys: decryptKeys
                });

              case 10:
                return _context15.abrupt("return", session);

              case 11:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));
    };

    _proto.onResponse = function onResponse(payloadEvent) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
        var topic, payload, request, pending, pairing, encryptKeys, error, controller, _session3, response;

        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                topic = payloadEvent.topic, payload = payloadEvent.payload;
                this.logger.info("Receiving Session response");
                this.logger.trace({
                  type: "method",
                  method: "onResponse",
                  topic: topic,
                  payload: payload
                });
                request = payload;
                _context16.next = 6;
                return this.pending.get(topic);

              case 6:
                pending = _context16.sent;
                _context16.next = 9;
                return this.client.pairing.get(pending.proposal.signal.params.topic);

              case 9:
                pairing = _context16.sent;
                encryptKeys = {
                  sharedKey: pairing.sharedKey,
                  publicKey: pairing.self.publicKey
                };

                if (cjs$9.isSessionFailed(request.params)) {
                  _context16.next = 32;
                  break;
                }

                _context16.prev = 12;
                controller = pending.proposal.proposer.controller ? {
                  publicKey: pending.proposal.proposer.publicKey
                } : {
                  publicKey: request.params.responder.publicKey
                };
                _context16.next = 16;
                return this.settle({
                  relay: pending.relay,
                  self: pending.self,
                  peer: request.params.responder,
                  permissions: Object.assign(Object.assign({}, pending.proposal.permissions), {
                    controller: controller
                  }),
                  ttl: pending.proposal.ttl,
                  expiry: request.params.expiry,
                  state: request.params.state
                });

              case 16:
                _session3 = _context16.sent;
                _context16.next = 19;
                return this.pending.update(topic, {
                  status: constants$3.SESSION_STATUS.responded,
                  outcome: {
                    topic: _session3.topic,
                    relay: _session3.relay,
                    responder: _session3.peer,
                    expiry: _session3.expiry,
                    state: _session3.state
                  }
                });

              case 19:
                _context16.next = 27;
                break;

              case 21:
                _context16.prev = 21;
                _context16.t0 = _context16["catch"](12);
                this.logger.error(_context16.t0);
                error = cjs$9.getError(cjs$9.ERROR.GENERIC, {
                  message: _context16.t0.message
                });
                _context16.next = 27;
                return this.pending.update(topic, {
                  status: constants$3.SESSION_STATUS.responded,
                  outcome: {
                    reason: error
                  }
                });

              case 27:
                response = typeof error === "undefined" ? cjs$c.formatJsonRpcResult(request.id, true) : cjs$c.formatJsonRpcError(request.id, error);
                _context16.next = 30;
                return this.client.relayer.publish(pending.topic, response, {
                  relay: pending.relay,
                  encryptKeys: encryptKeys
                });

              case 30:
                _context16.next = 35;
                break;

              case 32:
                this.logger.error(request.params.reason);
                _context16.next = 35;
                return this.pending.update(topic, {
                  status: constants$3.SESSION_STATUS.responded,
                  outcome: {
                    reason: request.params.reason
                  }
                });

              case 35:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this, [[12, 21]]);
      }));
    };

    _proto.onAcknowledge = function onAcknowledge(payloadEvent) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
        var topic, payload, response, pending, reason;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                topic = payloadEvent.topic, payload = payloadEvent.payload;
                this.logger.info("Receiving Session acknowledge");
                this.logger.trace({
                  type: "method",
                  method: "onAcknowledge",
                  topic: topic,
                  payload: payload
                });
                response = payload;
                _context17.next = 6;
                return this.pending.get(topic);

              case 6:
                pending = _context17.sent;

                if (cjs$9.isSessionResponded(pending)) {
                  _context17.next = 9;
                  break;
                }

                return _context17.abrupt("return");

              case 9:
                if (!(cjs$c.isJsonRpcError(response) && !cjs$9.isSessionFailed(pending.outcome))) {
                  _context17.next = 12;
                  break;
                }

                _context17.next = 12;
                return this.settled["delete"](pending.outcome.topic, response.error);

              case 12:
                reason = cjs$9.getError(cjs$9.ERROR.RESPONSE_ACKNOWLEDGED, {
                  context: this.context
                });
                _context17.next = 15;
                return this.pending["delete"](topic, reason);

              case 15:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));
    };

    _proto.onMessage = function onMessage(payloadEvent) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
        var topic, payload, request, _session4, error;

        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                topic = payloadEvent.topic, payload = payloadEvent.payload;
                this.logger.debug("Receiving Session message");
                this.logger.trace({
                  type: "method",
                  method: "onMessage",
                  topic: topic,
                  payload: payload
                });

                if (!cjs$c.isJsonRpcRequest(payload)) {
                  _context18.next = 36;
                  break;
                }

                request = payload;
                _context18.next = 7;
                return this.settled.get(payloadEvent.topic);

              case 7:
                _session4 = _context18.sent;
                _context18.t0 = request.method;
                _context18.next = _context18.t0 === constants$3.SESSION_JSONRPC.payload ? 11 : _context18.t0 === constants$3.SESSION_JSONRPC.update ? 14 : _context18.t0 === constants$3.SESSION_JSONRPC.upgrade ? 17 : _context18.t0 === constants$3.SESSION_JSONRPC.notification ? 20 : _context18.t0 === constants$3.SESSION_JSONRPC["delete"] ? 23 : _context18.t0 === constants$3.SESSION_JSONRPC.ping ? 26 : 29;
                break;

              case 11:
                _context18.next = 13;
                return this.onPayload(payloadEvent);

              case 13:
                return _context18.abrupt("break", 34);

              case 14:
                _context18.next = 16;
                return this.onUpdate(payloadEvent);

              case 16:
                return _context18.abrupt("break", 34);

              case 17:
                _context18.next = 19;
                return this.onUpgrade(payloadEvent);

              case 19:
                return _context18.abrupt("break", 34);

              case 20:
                _context18.next = 22;
                return this.onNotification(payloadEvent);

              case 22:
                return _context18.abrupt("break", 34);

              case 23:
                _context18.next = 25;
                return this.settled["delete"](_session4.topic, request.params.reason);

              case 25:
                return _context18.abrupt("break", 34);

              case 26:
                _context18.next = 28;
                return this.send(_session4.topic, cjs$c.formatJsonRpcResult(request.id, false));

              case 28:
                return _context18.abrupt("break", 34);

              case 29:
                error = cjs$9.getError(cjs$9.ERROR.UNKNOWN_JSONRPC_METHOD, {
                  method: request.method
                });
                this.logger.error(error.message);
                _context18.next = 33;
                return this.send(_session4.topic, cjs$c.formatJsonRpcError(request.id, error));

              case 33:
                return _context18.abrupt("break", 34);

              case 34:
                _context18.next = 37;
                break;

              case 36:
                this.onPayloadEvent(payloadEvent);

              case 37:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));
    };

    _proto.onPayload = function onPayload(payloadEvent) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
        var topic, payload, id, params, request, _session5, error, sessionPayloadEvent, _sessionPayloadEvent;

        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                topic = payloadEvent.topic, payload = payloadEvent.payload;

                if (!cjs$c.isJsonRpcRequest(payload)) {
                  _context19.next = 17;
                  break;
                }

                id = payload.id, params = payload.params;
                request = cjs$c.formatJsonRpcRequest(params.request.method, params.request.params, id);
                _context19.next = 6;
                return this.settled.get(topic);

              case 6:
                _session5 = _context19.sent;

                if (_session5.permissions.jsonrpc.methods.includes(request.method)) {
                  _context19.next = 11;
                  break;
                }

                error = cjs$9.getError(cjs$9.ERROR.UNAUTHORIZED_JSON_RPC_METHOD, {
                  method: request.method
                });
                this.logger.error(error.message);
                throw new Error(error.message);

              case 11:
                sessionPayloadEvent = {
                  topic: topic,
                  payload: request,
                  chainId: params.chainId
                };
                this.logger.debug("Receiving Session payload");
                this.logger.trace(Object.assign({
                  type: "method",
                  method: "onPayload"
                }, sessionPayloadEvent));
                this.onPayloadEvent(sessionPayloadEvent);
                _context19.next = 21;
                break;

              case 17:
                _sessionPayloadEvent = {
                  topic: topic,
                  payload: payload
                };
                this.logger.debug("Receiving Session payload");
                this.logger.trace(Object.assign({
                  type: "method",
                  method: "onPayload"
                }, _sessionPayloadEvent));
                this.onPayloadEvent(_sessionPayloadEvent);

              case 21:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));
    };

    _proto.onUpdate = function onUpdate(payloadEvent) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
        var topic, payload, request, session, participant, response, _response;

        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                topic = payloadEvent.topic, payload = payloadEvent.payload;
                this.logger.debug("Receiving Session update");
                this.logger.trace({
                  type: "method",
                  method: "onUpdate",
                  topic: topic,
                  payload: payload
                });
                request = payloadEvent.payload;
                _context20.next = 6;
                return this.settled.get(payloadEvent.topic);

              case 6:
                session = _context20.sent;
                _context20.prev = 7;
                participant = {
                  publicKey: session.peer.publicKey
                };
                _context20.next = 11;
                return this.handleUpdate(topic, request.params, participant);

              case 11:
                response = cjs$c.formatJsonRpcResult(request.id, true);
                _context20.next = 14;
                return this.send(session.topic, response);

              case 14:
                _context20.next = 22;
                break;

              case 16:
                _context20.prev = 16;
                _context20.t0 = _context20["catch"](7);
                this.logger.error(_context20.t0);
                _response = cjs$c.formatJsonRpcError(request.id, _context20.t0.message);
                _context20.next = 22;
                return this.send(session.topic, _response);

              case 22:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this, [[7, 16]]);
      }));
    };

    _proto.onUpgrade = function onUpgrade(payloadEvent) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
        var topic, payload, request, session, participant, response, _response2;

        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                topic = payloadEvent.topic, payload = payloadEvent.payload;
                this.logger.debug("Receiving Session upgrade");
                this.logger.trace({
                  type: "method",
                  method: "onUpgrade",
                  topic: topic,
                  payload: payload
                });
                request = payloadEvent.payload;
                _context21.next = 6;
                return this.settled.get(payloadEvent.topic);

              case 6:
                session = _context21.sent;
                _context21.prev = 7;
                participant = {
                  publicKey: session.peer.publicKey
                };
                _context21.next = 11;
                return this.handleUpgrade(topic, request.params, participant);

              case 11:
                response = cjs$c.formatJsonRpcResult(request.id, true);
                _context21.next = 14;
                return this.send(session.topic, response);

              case 14:
                _context21.next = 22;
                break;

              case 16:
                _context21.prev = 16;
                _context21.t0 = _context21["catch"](7);
                this.logger.error(_context21.t0);
                _response2 = cjs$c.formatJsonRpcError(request.id, _context21.t0.message);
                _context21.next = 22;
                return this.send(session.topic, _response2);

              case 22:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this, [[7, 16]]);
      }));
    };

    _proto.handleUpdate = function handleUpdate(topic, params, participant) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
        var session, update, state, error, _error2;

        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.next = 2;
                return this.settled.get(topic);

              case 2:
                session = _context22.sent;

                if (!(typeof params.state !== "undefined")) {
                  _context22.next = 13;
                  break;
                }

                state = session.state;

                if (!(participant.publicKey !== session.permissions.controller.publicKey)) {
                  _context22.next = 9;
                  break;
                }

                error = cjs$9.getError(cjs$9.ERROR.UNAUTHORIZED_UPDATE_REQUEST, {
                  context: this.context
                });
                this.logger.error(error.message);
                throw new Error(error.message);

              case 9:
                state.accounts = params.state.accounts || state.accounts;
                update = {
                  state: state
                };
                _context22.next = 16;
                break;

              case 13:
                _error2 = cjs$9.getError(cjs$9.ERROR.INVALID_UPDATE_REQUEST, {
                  context: this.context
                });
                this.logger.error(_error2.message);
                throw new Error(_error2.message);

              case 16:
                _context22.next = 18;
                return this.settled.update(session.topic, session);

              case 18:
                return _context22.abrupt("return", update);

              case 19:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));
    };

    _proto.handleUpgrade = function handleUpgrade(topic, params, participant) {
      var _a, _b, _c, _d;

      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee23() {
        var session, upgrade, error, permissions;
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.next = 2;
                return this.settled.get(topic);

              case 2:
                session = _context23.sent;
                upgrade = {
                  permissions: {}
                };

                if (!(participant.publicKey !== session.permissions.controller.publicKey)) {
                  _context23.next = 8;
                  break;
                }

                error = cjs$9.getError(cjs$9.ERROR.UNAUTHORIZED_UPGRADE_REQUEST, {
                  context: this.context
                });
                this.logger.error(error.message);
                throw new Error(error.message);

              case 8:
                permissions = {
                  blockchain: {
                    chains: [].concat(session.permissions.blockchain.chains, ((_a = params.permissions.blockchain) === null || _a === void 0 ? void 0 : _a.chains) || [])
                  },
                  jsonrpc: {
                    methods: [].concat(session.permissions.jsonrpc.methods, ((_b = params.permissions.jsonrpc) === null || _b === void 0 ? void 0 : _b.methods) || [])
                  },
                  notifications: {
                    types: [].concat((_c = session.permissions.notifications) === null || _c === void 0 ? void 0 : _c.types, ((_d = params.permissions.notifications) === null || _d === void 0 ? void 0 : _d.types) || [])
                  }
                };
                upgrade = {
                  permissions: permissions
                };
                session.permissions = Object.assign(Object.assign({}, permissions), {
                  controller: session.permissions.controller
                });
                _context23.next = 13;
                return this.settled.update(session.topic, session);

              case 13:
                return _context23.abrupt("return", upgrade);

              case 14:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));
    };

    _proto.onNotification = function onNotification(event) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee24() {
        var notification, notificationEvent;
        return regeneratorRuntime.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                notification = event.payload.params;
                notificationEvent = {
                  topic: event.topic,
                  type: notification.type,
                  data: notification.data
                };
                this.logger.info("Emitting " + constants$3.SESSION_EVENTS.notification);
                this.logger.debug({
                  type: "event",
                  event: constants$3.SESSION_EVENTS.notification,
                  notificationEvent: notificationEvent
                });
                this.events.emit(constants$3.SESSION_EVENTS.notification, notificationEvent);

              case 5:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }));
    };

    _proto.shouldIgnorePayloadEvent = function shouldIgnorePayloadEvent(payloadEvent) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee25() {
        var topic, payload, exists;
        return regeneratorRuntime.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                topic = payloadEvent.topic, payload = payloadEvent.payload;

                if (this.settled.subscriptions.has(topic)) {
                  _context25.next = 3;
                  break;
                }

                return _context25.abrupt("return", true);

              case 3:
                exists = false;
                _context25.prev = 4;
                _context25.next = 7;
                return this.history.exists(topic, payload.id);

              case 7:
                exists = _context25.sent;
                _context25.next = 12;
                break;

              case 10:
                _context25.prev = 10;
                _context25.t0 = _context25["catch"](4);

              case 12:
                return _context25.abrupt("return", exists);

              case 13:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this, [[4, 10]]);
      }));
    };

    _proto.onPayloadEvent = function onPayloadEvent(payloadEvent) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee26() {
        var topic, payload, chainId, requestEvent, responseEvent;
        return regeneratorRuntime.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                topic = payloadEvent.topic, payload = payloadEvent.payload, chainId = payloadEvent.chainId;

                if (!cjs$c.isJsonRpcRequest(payload)) {
                  _context26.next = 10;
                  break;
                }

                _context26.next = 4;
                return this.shouldIgnorePayloadEvent(payloadEvent);

              case 4:
                if (!_context26.sent) {
                  _context26.next = 6;
                  break;
                }

                return _context26.abrupt("return");

              case 6:
                _context26.next = 8;
                return this.history.set(topic, payload, chainId);

              case 8:
                _context26.next = 12;
                break;

              case 10:
                _context26.next = 12;
                return this.history.update(topic, payload);

              case 12:
                if (cjs$c.isJsonRpcRequest(payload)) {
                  requestEvent = {
                    topic: topic,
                    request: payload,
                    chainId: chainId
                  };
                  this.logger.info("Emitting " + constants$3.SESSION_EVENTS.request);
                  this.logger.debug({
                    type: "event",
                    event: constants$3.SESSION_EVENTS.request,
                    data: requestEvent
                  });
                  this.events.emit(constants$3.SESSION_EVENTS.request, requestEvent);
                } else {
                  responseEvent = {
                    topic: topic,
                    response: payload,
                    chainId: chainId
                  };
                  this.logger.info("Emitting " + constants$3.SESSION_EVENTS.response);
                  this.logger.debug({
                    type: "event",
                    event: constants$3.SESSION_EVENTS.response,
                    data: responseEvent
                  });
                  this.events.emit(constants$3.SESSION_EVENTS.response, responseEvent);
                }

              case 13:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));
    };

    _proto.onPendingPayloadEvent = function onPendingPayloadEvent(event) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee27() {
        return regeneratorRuntime.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                if (!cjs$c.isJsonRpcRequest(event.payload)) {
                  _context27.next = 9;
                  break;
                }

                _context27.t0 = event.payload.method;
                _context27.next = _context27.t0 === constants$3.SESSION_JSONRPC.approve ? 4 : _context27.t0 === constants$3.SESSION_JSONRPC.reject ? 4 : 6;
                break;

              case 4:
                this.onResponse(event);
                return _context27.abrupt("break", 7);

              case 6:
                return _context27.abrupt("break", 7);

              case 7:
                _context27.next = 10;
                break;

              case 9:
                this.onAcknowledge(event);

              case 10:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));
    };

    _proto.onPendingStatusEvent = function onPendingStatusEvent(event) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee28() {
        var pending, pairing, encryptKeys, method, request, _request;

        return regeneratorRuntime.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                pending = event.data;

                if (!cjs$9.isSessionResponded(pending)) {
                  _context28.next = 16;
                  break;
                }

                this.logger.info("Emitting " + constants$3.SESSION_EVENTS.responded);
                this.logger.debug({
                  type: "event",
                  event: constants$3.SESSION_EVENTS.responded,
                  data: pending
                });
                this.events.emit(constants$3.SESSION_EVENTS.responded, pending);

                if (cjs$9.isSubscriptionUpdatedEvent(event)) {
                  _context28.next = 14;
                  break;
                }

                _context28.next = 8;
                return this.client.pairing.get(pending.proposal.signal.params.topic);

              case 8:
                pairing = _context28.sent;
                encryptKeys = {
                  sharedKey: pairing.sharedKey,
                  publicKey: pairing.self.publicKey
                };
                method = !cjs$9.isSessionFailed(pending.outcome) ? constants$3.SESSION_JSONRPC.approve : constants$3.SESSION_JSONRPC.reject;
                request = cjs$c.formatJsonRpcRequest(method, pending.outcome);
                _context28.next = 14;
                return this.client.relayer.publish(pending.topic, request, {
                  relay: pending.relay,
                  encryptKeys: encryptKeys
                });

              case 14:
                _context28.next = 22;
                break;

              case 16:
                this.logger.info("Emitting " + constants$3.SESSION_EVENTS.proposed);
                this.logger.debug({
                  type: "event",
                  event: constants$3.SESSION_EVENTS.proposed,
                  data: pending
                });
                this.events.emit(constants$3.SESSION_EVENTS.proposed, pending);
                _request = cjs$c.formatJsonRpcRequest(constants$3.SESSION_JSONRPC.propose, pending.proposal);
                _context28.next = 22;
                return this.client.pairing.send(pending.proposal.signal.params.topic, _request);

              case 22:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this);
      }));
    };

    _proto.registerEventListeners = function registerEventListeners() {
      var _this6 = this;

      this.pending.on(constants$3.SUBSCRIPTION_EVENTS.payload, function (payloadEvent) {
        return _this6.onPendingPayloadEvent(payloadEvent);
      });
      this.pending.on(constants$3.SUBSCRIPTION_EVENTS.created, function (createdEvent) {
        return _this6.onPendingStatusEvent(createdEvent);
      });
      this.pending.on(constants$3.SUBSCRIPTION_EVENTS.updated, function (updatedEvent) {
        return _this6.onPendingStatusEvent(updatedEvent);
      });
      this.settled.on(constants$3.SUBSCRIPTION_EVENTS.payload, function (payloadEvent) {
        return _this6.onMessage(payloadEvent);
      });
      this.settled.on(constants$3.SUBSCRIPTION_EVENTS.created, function (createdEvent) {
        var session = createdEvent.data;

        _this6.logger.info("Emitting " + constants$3.SESSION_EVENTS.settled);

        _this6.logger.debug({
          type: "event",
          event: constants$3.SESSION_EVENTS.settled,
          data: session
        });

        _this6.events.emit(constants$3.SESSION_EVENTS.settled, session);
      });
      this.settled.on(constants$3.SUBSCRIPTION_EVENTS.updated, function (updatedEvent) {
        var session = updatedEvent.data,
            update = updatedEvent.update;

        _this6.logger.info("Emitting " + constants$3.SESSION_EVENTS.updated);

        _this6.logger.debug({
          type: "event",
          event: constants$3.SESSION_EVENTS.updated,
          data: session,
          update: update
        });

        _this6.events.emit(constants$3.SESSION_EVENTS.updated, session, update);
      });
      this.settled.on(constants$3.SUBSCRIPTION_EVENTS.deleted, function (deletedEvent) {
        return tslib_1.__awaiter(_this6, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee29() {
          var session, reason, request, encryptKeys;
          return regeneratorRuntime.wrap(function _callee29$(_context29) {
            while (1) {
              switch (_context29.prev = _context29.next) {
                case 0:
                  session = deletedEvent.data, reason = deletedEvent.reason;
                  this.logger.info("Emitting " + constants$3.SESSION_EVENTS.deleted);
                  this.logger.debug({
                    type: "event",
                    event: constants$3.SESSION_EVENTS.deleted,
                    data: session,
                    reason: reason
                  });
                  this.events.emit(constants$3.SESSION_EVENTS.deleted, session, reason);
                  request = cjs$c.formatJsonRpcRequest(constants$3.SESSION_JSONRPC["delete"], {
                    reason: reason
                  });
                  _context29.next = 7;
                  return this.history["delete"](session.topic);

                case 7:
                  encryptKeys = {
                    sharedKey: session.sharedKey,
                    publicKey: session.self.publicKey
                  };
                  _context29.next = 10;
                  return this.client.relayer.publish(session.topic, request, {
                    relay: session.relay,
                    encryptKeys: encryptKeys
                  });

                case 10:
                case "end":
                  return _context29.stop();
              }
            }
          }, _callee29, this);
        }));
      });
      this.settled.on(constants$3.SUBSCRIPTION_EVENTS.sync, function () {
        return _this6.events.emit(constants$3.SESSION_EVENTS.sync);
      });
      this.settled.on(constants$3.SUBSCRIPTION_EVENTS.enabled, function () {
        return _this6.events.emit(constants$3.SESSION_EVENTS.enabled);
      });
      this.settled.on(constants$3.SUBSCRIPTION_EVENTS.disabled, function () {
        return _this6.events.emit(constants$3.SESSION_EVENTS.disabled);
      });
    };

    _createClass(Session, [{
      key: "length",
      get: function get() {
        return this.settled.length;
      }
    }, {
      key: "topics",
      get: function get() {
        return this.settled.topics;
      }
    }, {
      key: "values",
      get: function get() {
        return this.settled.values.map(function (x) {
          return x.data;
        });
      }
    }]);

    return Session;
  }(cjs$3.ISession);

  exports.Session = Session;
});
unwrapExports(session$2);

var controllers = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  tslib_1.__exportStar(pairing$2, exports);

  tslib_1.__exportStar(relayer$2, exports);

  tslib_1.__exportStar(session$2, exports);

  tslib_1.__exportStar(subscription$2, exports);
});
unwrapExports(controllers);

var client$2 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Client = void 0;

  var pino_1 = tslib_1.__importDefault(browser);

  var keyvaluestorage_1 = tslib_1.__importDefault(browser$1);

  var Client = /*#__PURE__*/function (_types_1$IClient) {
    _inheritsLoose(Client, _types_1$IClient);

    function Client(opts) {
      var _this;

      _this = _types_1$IClient.call(this, opts) || this;
      _this.protocol = "wc";
      _this.version = 2;
      _this.events = new events.EventEmitter();
      _this.context = constants$3.CLIENT_CONTEXT;
      var logger = typeof (opts === null || opts === void 0 ? void 0 : opts.logger) !== "undefined" && typeof (opts === null || opts === void 0 ? void 0 : opts.logger) !== "string" ? opts.logger : pino_1["default"](cjs$a.getDefaultLoggerOptions({
        level: (opts === null || opts === void 0 ? void 0 : opts.logger) || "error"
      }));
      _this.context = (opts === null || opts === void 0 ? void 0 : opts.name) || _this.context;
      _this.controller = (opts === null || opts === void 0 ? void 0 : opts.controller) || false;
      _this.metadata = (opts === null || opts === void 0 ? void 0 : opts.metadata) || cjs$9.getAppMetadata();
      _this.logger = cjs$a.generateChildLogger(logger, _this.context);
      _this.relayer = new controllers.Relayer(_assertThisInitialized(_this), _this.logger, opts === null || opts === void 0 ? void 0 : opts.relayProvider);
      _this.storage = (opts === null || opts === void 0 ? void 0 : opts.storage) || new keyvaluestorage_1["default"](Object.assign(Object.assign({}, constants$3.CLIENT_STORAGE_OPTIONS), opts === null || opts === void 0 ? void 0 : opts.storageOptions));
      _this.pairing = new controllers.Pairing(_assertThisInitialized(_this), _this.logger);
      _this.session = new controllers.Session(_assertThisInitialized(_this), _this.logger);
      return _this;
    }

    Client.init = function init(opts) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var client;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                client = new Client(opts);
                _context.next = 3;
                return client.initialize();

              case 3:
                return _context.abrupt("return", client);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
    };

    var _proto = Client.prototype;

    _proto.on = function on(event, listener) {
      this.events.on(event, listener);
    };

    _proto.once = function once(event, listener) {
      this.events.once(event, listener);
    };

    _proto.off = function off(event, listener) {
      this.events.off(event, listener);
    };

    _proto.removeListener = function removeListener(event, listener) {
      this.events.removeListener(event, listener);
    };

    _proto.connect = function connect(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var pairing, metadata, error, session;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.logger.debug("Connecting Application");
                this.logger.trace({
                  type: "method",
                  method: "connect",
                  params: params
                });
                _context2.prev = 2;

                if (typeof params.pairing === undefined) {
                  this.logger.info("Connecing with existing pairing");
                }

                if (!(typeof params.pairing === "undefined")) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 7;
                return this.pairing.create();

              case 7:
                _context2.t0 = _context2.sent;
                _context2.next = 13;
                break;

              case 10:
                _context2.next = 12;
                return this.pairing.get(params.pairing.topic);

              case 12:
                _context2.t0 = _context2.sent;

              case 13:
                pairing = _context2.t0;
                this.logger.trace({
                  type: "method",
                  method: "connect",
                  pairing: pairing
                });
                metadata = params.metadata || this.metadata;

                if (!(typeof metadata === "undefined")) {
                  _context2.next = 20;
                  break;
                }

                error = cjs$9.getError(cjs$9.ERROR.MISSING_OR_INVALID, {
                  name: "app metadata"
                });
                this.logger.error(error.message);
                throw new Error(error.message);

              case 20:
                _context2.next = 22;
                return this.session.create({
                  signal: {
                    method: constants$3.SESSION_SIGNAL_METHOD_PAIRING,
                    params: {
                      topic: pairing.topic
                    }
                  },
                  relay: params.relay || {
                    protocol: constants$3.RELAYER_DEFAULT_PROTOCOL
                  },
                  metadata: metadata,
                  permissions: Object.assign(Object.assign({}, params.permissions), {
                    notifications: constants$3.SESSION_EMPTY_PERMISSIONS.notifications
                  })
                });

              case 22:
                session = _context2.sent;
                this.logger.debug("Application Connection Successful");
                this.logger.trace({
                  type: "method",
                  method: "connect",
                  session: session
                });
                return _context2.abrupt("return", session);

              case 28:
                _context2.prev = 28;
                _context2.t1 = _context2["catch"](2);
                this.logger.debug("Application Connection Failure");
                this.logger.error(_context2.t1);
                throw _context2.t1;

              case 33:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 28]]);
      }));
    };

    _proto.pair = function pair(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var proposal, approved, reason, pending, error;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.logger.debug("Pairing");
                this.logger.trace({
                  type: "method",
                  method: "pair",
                  params: params
                });
                proposal = formatPairingProposal(params.uri);
                approved = proposal.proposer.controller !== this.controller;
                reason = approved ? undefined : cjs$9.getError(cjs$9.ERROR.UNAUTHORIZED_MATCHING_CONTROLLER, {
                  controller: this.controller
                });
                _context3.next = 7;
                return this.pairing.respond({
                  approved: approved,
                  proposal: proposal,
                  reason: reason
                });

              case 7:
                pending = _context3.sent;

                if (cjs$9.isPairingResponded(pending)) {
                  _context3.next = 12;
                  break;
                }

                error = cjs$9.getError(cjs$9.ERROR.NO_MATCHING_RESPONSE, {
                  context: "pairing"
                });
                this.logger.error(error.message);
                throw new Error(error.message);

              case 12:
                if (!cjs$9.isPairingFailed(pending.outcome)) {
                  _context3.next = 16;
                  break;
                }

                this.logger.debug("Pairing Failure");
                this.logger.trace({
                  type: "method",
                  method: "pair",
                  outcome: pending.outcome
                });
                throw new Error(pending.outcome.reason.message);

              case 16:
                this.logger.debug("Pairing Success");
                this.logger.trace({
                  type: "method",
                  method: "pair",
                  pending: pending
                });
                return _context3.abrupt("return", pending.outcome.topic);

              case 19:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
    };

    _proto.approve = function approve(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var error, state, metadata, _error, approved, reason, pending, _error2;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.logger.debug("Approving Session Proposal");
                this.logger.trace({
                  type: "method",
                  method: "approve",
                  params: params
                });

                if (!(typeof params.response === "undefined")) {
                  _context4.next = 6;
                  break;
                }

                error = cjs$9.getError(cjs$9.ERROR.MISSING_RESPONSE, {
                  context: "session"
                });
                this.logger.error(error.message);
                throw new Error(error.message);

              case 6:
                state = params.response.state || constants$3.SESSION_EMPTY_STATE;
                metadata = params.response.metadata || this.metadata;

                if (!(typeof metadata === "undefined")) {
                  _context4.next = 12;
                  break;
                }

                _error = cjs$9.getError(cjs$9.ERROR.MISSING_OR_INVALID, {
                  name: "app metadata"
                });
                this.logger.error(_error.message);
                throw new Error(_error.message);

              case 12:
                approved = params.proposal.proposer.controller !== this.controller;
                reason = approved ? undefined : cjs$9.getError(cjs$9.ERROR.UNAUTHORIZED_MATCHING_CONTROLLER, {
                  controller: this.controller
                });
                _context4.next = 16;
                return this.session.respond({
                  approved: approved,
                  proposal: params.proposal,
                  response: {
                    state: state,
                    metadata: metadata
                  },
                  reason: reason
                });

              case 16:
                pending = _context4.sent;

                if (cjs$9.isSessionResponded(pending)) {
                  _context4.next = 21;
                  break;
                }

                _error2 = cjs$9.getError(cjs$9.ERROR.NO_MATCHING_RESPONSE, {
                  context: "session"
                });
                this.logger.error(_error2.message);
                throw new Error(_error2.message);

              case 21:
                if (!cjs$9.isSessionFailed(pending.outcome)) {
                  _context4.next = 25;
                  break;
                }

                this.logger.debug("Session Proposal Approval Failure");
                this.logger.trace({
                  type: "method",
                  method: "approve",
                  outcome: pending.outcome
                });
                throw new Error(pending.outcome.reason.message);

              case 25:
                this.logger.debug("Session Proposal Approval Success");
                this.logger.trace({
                  type: "method",
                  method: "approve",
                  pending: pending
                });
                return _context4.abrupt("return", this.session.get(pending.outcome.topic));

              case 28:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
    };

    _proto.reject = function reject(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var pending;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.logger.debug("Rejecting Session Proposal");
                this.logger.trace({
                  type: "method",
                  method: "reject",
                  params: params
                });
                _context5.next = 4;
                return this.session.respond({
                  approved: false,
                  proposal: params.proposal,
                  response: constants$3.SESSION_EMPTY_RESPONSE,
                  reason: params.reason
                });

              case 4:
                pending = _context5.sent;
                this.logger.debug("Session Proposal Response Success");
                this.logger.trace({
                  type: "method",
                  method: "reject",
                  pending: pending
                });

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
    };

    _proto.upgrade = function upgrade(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.session.upgrade(params);

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
    };

    _proto.update = function update(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.session.update(params);

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
    };

    _proto.request = function request(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt("return", this.session.request(params));

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
    };

    _proto.respond = function respond(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.session.send(params.topic, params.response);

              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));
    };

    _proto.notify = function notify(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this.session.notify(params);

              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));
    };

    _proto.disconnect = function disconnect(params) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                this.logger.debug("Disconnecting Application");
                this.logger.trace({
                  type: "method",
                  method: "disconnect",
                  params: params
                });
                _context11.next = 4;
                return this.session["delete"](params);

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));
    };

    _proto.onPairingRequest = function onPairingRequest(request) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var proposal, reason;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (!(request.method === constants$3.SESSION_JSONRPC.propose)) {
                  _context12.next = 10;
                  break;
                }

                proposal = request.params;

                if (!(proposal.proposer.controller === this.controller)) {
                  _context12.next = 7;
                  break;
                }

                reason = cjs$9.getError(cjs$9.ERROR.UNAUTHORIZED_MATCHING_CONTROLLER, {
                  controller: this.controller
                });
                _context12.next = 6;
                return this.session.respond({
                  approved: false,
                  proposal: proposal,
                  response: constants$3.SESSION_EMPTY_RESPONSE,
                  reason: reason
                });

              case 6:
                return _context12.abrupt("return");

              case 7:
                this.logger.info("Emitting " + constants$3.CLIENT_EVENTS.session.proposal);
                this.logger.debug({
                  type: "event",
                  event: constants$3.CLIENT_EVENTS.session.proposal,
                  data: proposal
                });
                this.events.emit(constants$3.CLIENT_EVENTS.session.proposal, proposal);

              case 10:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));
    };

    _proto.onPairingSettled = function onPairingSettled(pairing) {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if (pairing.permissions.controller.publicKey === pairing.self.publicKey) {
                  this.pairing.update({
                    topic: pairing.topic,
                    state: {
                      metadata: this.metadata
                    }
                  });
                }

              case 1:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));
    };

    _proto.initialize = function initialize() {
      return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                this.logger.trace("Initialized");
                _context14.prev = 1;
                _context14.next = 4;
                return this.relayer.init();

              case 4:
                _context14.next = 6;
                return this.pairing.init();

              case 6:
                _context14.next = 8;
                return this.session.init();

              case 8:
                this.setBeatInterval();
                this.registerEventListeners();
                this.logger.info("Client Initilization Success");
                _context14.next = 18;
                break;

              case 13:
                _context14.prev = 13;
                _context14.t0 = _context14["catch"](1);
                this.logger.info("Client Initilization Failure");
                this.logger.error(_context14.t0);
                throw _context14.t0;

              case 18:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this, [[1, 13]]);
      }));
    };

    _proto.setBeatInterval = function setBeatInterval() {
      var _this2 = this;

      setInterval(function () {
        return _this2.events.emit(constants$3.CLIENT_EVENTS.beat);
      }, constants$3.CLIENT_BEAT_INTERVAL);
    };

    _proto.registerEventListeners = function registerEventListeners() {
      var _this3 = this;

      this.pairing.on(constants$3.PAIRING_EVENTS.proposed, function (pending) {
        _this3.logger.info("Emitting " + constants$3.CLIENT_EVENTS.pairing.proposal);

        _this3.logger.debug({
          type: "event",
          event: constants$3.CLIENT_EVENTS.pairing.proposal,
          data: pending.proposal
        });

        _this3.events.emit(constants$3.CLIENT_EVENTS.pairing.proposal, pending.proposal);
      });
      this.pairing.on(constants$3.PAIRING_EVENTS.settled, function (pairing) {
        _this3.logger.info("Emitting " + constants$3.CLIENT_EVENTS.pairing.created);

        _this3.logger.debug({
          type: "event",
          event: constants$3.CLIENT_EVENTS.pairing.created,
          data: pairing
        });

        _this3.events.emit(constants$3.CLIENT_EVENTS.pairing.created, pairing);

        _this3.onPairingSettled(pairing);
      });
      this.pairing.on(constants$3.PAIRING_EVENTS.updated, function (pairing, update) {
        _this3.logger.info("Emitting " + constants$3.CLIENT_EVENTS.pairing.updated);

        _this3.logger.debug({
          type: "event",
          event: constants$3.CLIENT_EVENTS.pairing.updated,
          data: pairing,
          update: update
        });

        _this3.events.emit(constants$3.CLIENT_EVENTS.pairing.updated, pairing, update);
      });
      this.pairing.on(constants$3.PAIRING_EVENTS.deleted, function (pairing, reason) {
        _this3.logger.info("Emitting " + constants$3.CLIENT_EVENTS.pairing.deleted);

        _this3.logger.debug({
          type: "event",
          event: constants$3.CLIENT_EVENTS.pairing.deleted,
          data: pairing,
          reason: reason
        });

        _this3.events.emit(constants$3.CLIENT_EVENTS.pairing.deleted, pairing, reason);
      });
      this.pairing.on(constants$3.PAIRING_EVENTS.request, function (requestEvent) {
        _this3.onPairingRequest(requestEvent.request);
      });
      this.session.on(constants$3.SESSION_EVENTS.proposed, function (pending) {
        _this3.logger.info("Emitting " + constants$3.CLIENT_EVENTS.session.proposal);

        _this3.logger.debug({
          type: "event",
          event: constants$3.CLIENT_EVENTS.session.proposal,
          data: pending.proposal
        });

        _this3.events.emit(constants$3.CLIENT_EVENTS.session.proposal, pending.proposal);
      });
      this.session.on(constants$3.SESSION_EVENTS.settled, function (session) {
        _this3.logger.info("Emitting " + constants$3.CLIENT_EVENTS.session.created);

        _this3.logger.debug({
          type: "event",
          event: constants$3.CLIENT_EVENTS.session.created,
          data: session
        });

        _this3.events.emit(constants$3.CLIENT_EVENTS.session.created, session);
      });
      this.session.on(constants$3.SESSION_EVENTS.updated, function (session, update) {
        _this3.logger.info("Emitting " + constants$3.CLIENT_EVENTS.session.updated);

        _this3.logger.debug({
          type: "event",
          event: constants$3.CLIENT_EVENTS.session.updated,
          data: session,
          update: update
        });

        _this3.events.emit(constants$3.CLIENT_EVENTS.session.updated, session, update);
      });
      this.session.on(constants$3.SESSION_EVENTS.deleted, function (session, reason) {
        _this3.logger.info("Emitting " + constants$3.CLIENT_EVENTS.session.deleted);

        _this3.logger.debug({
          type: "event",
          event: constants$3.CLIENT_EVENTS.session.deleted,
          data: session,
          reason: reason
        });

        _this3.events.emit(constants$3.CLIENT_EVENTS.session.deleted, session, reason);
      });
      this.session.on(constants$3.SESSION_EVENTS.request, function (requestEvent) {
        _this3.logger.info("Emitting " + constants$3.CLIENT_EVENTS.session.request);

        _this3.logger.debug({
          type: "event",
          event: constants$3.CLIENT_EVENTS.session.request,
          data: requestEvent
        });

        _this3.events.emit(constants$3.CLIENT_EVENTS.session.request, requestEvent);
      });
      this.session.on(constants$3.SESSION_EVENTS.response, function (responseEvent) {
        _this3.logger.info("Emitting " + constants$3.CLIENT_EVENTS.session.response);

        _this3.logger.debug({
          type: "event",
          event: constants$3.CLIENT_EVENTS.session.response,
          data: responseEvent
        });

        _this3.events.emit(constants$3.CLIENT_EVENTS.session.response, responseEvent);
      });
      this.session.on(constants$3.SESSION_EVENTS.notification, function (notificationEvent) {
        _this3.logger.info("Emitting " + constants$3.CLIENT_EVENTS.session.notification);

        _this3.logger.debug({
          type: "event",
          event: constants$3.CLIENT_EVENTS.session.notification,
          data: notificationEvent
        });

        _this3.events.emit(constants$3.CLIENT_EVENTS.session.notification, notificationEvent);
      });
    };

    return Client;
  }(cjs$3.IClient);

  exports.Client = Client;

  function formatPairingProposal(uri) {
    var uriParams = cjs$9.parseUri(uri);
    return {
      topic: uriParams.topic,
      relay: uriParams.relay,
      proposer: {
        publicKey: uriParams.publicKey,
        controller: uriParams.controller
      },
      signal: {
        method: constants$3.PAIRING_SIGNAL_METHOD_URI,
        params: {
          uri: uri
        }
      },
      permissions: {
        jsonrpc: {
          methods: [constants$3.SESSION_JSONRPC.propose]
        }
      },
      ttl: constants$3.PAIRING_DEFAULT_TTL
    };
  }
});
unwrapExports(client$2);

var cjs$f = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Client = void 0;

  tslib_1.__exportStar(constants$3, exports);

  exports.Client = client$2.Client;
  exports["default"] = client$2.Client;
});
var Client = unwrapExports(cjs$f);

var WalletConnectContext = React.createContext({});
var WalletConnectContextProvider = function WalletConnectContextProvider(_ref) {
  var options = _ref.options,
      children = _ref.children;

  var _useState = useState(undefined),
      wcClient = _useState[0],
      setWcClient = _useState[1];

  var _useState2 = useState(undefined),
      storage = _useState2[0],
      setStorage = _useState2[1];

  var _useState3 = useState([]),
      sessionProposals = _useState3[0],
      setSessionProposals = _useState3[1];

  var _useState4 = useState(false),
      initialized = _useState4[0],
      setInitialized = _useState4[1];

  var _useState5 = useState(options.chainIds),
      chains = _useState5[0],
      setChains = _useState5[1];

  var _useState6 = useState([]),
      accounts = _useState6[0],
      setAccounts = _useState6[1];

  var _useState7 = useState([]),
      sessions = _useState7[0],
      setSessions = _useState7[1];

  var _useState8 = useState([]),
      requests = _useState8[0],
      setRequests = _useState8[1];

  var _useState9 = useState([]),
      results = _useState9[0],
      setResults = _useState9[1];

  var _useState10 = useState(undefined),
      onRequestCallback = _useState10[0],
      setOnRequestCallback = _useState10[1];

  useEffect(function () {
    init();
  }, []);

  var init = function init() {
    try {
      var st = new KeyValueStorage();
      setStorage(st);
      return Promise.resolve(Client.init({
        controller: true,
        relayProvider: options.relayServer,
        logger: options.logger,
        storage: st
      })).then(function (_Client$init) {
        setWcClient(_Client$init);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var resetApp = function resetApp() {
    try {
      setWcClient(undefined);
      setSessionProposals([]);
      setInitialized(false);
      setChains([]);
      setAccounts([]);
      setSessions([]);
      setRequests([]);
      setResults([]);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var checkPersistedState = useCallback(function () {
    try {
      if (typeof wcClient === "undefined") {
        throw new Error("Client is not initialized");
      }

      setSessions(wcClient.session.values);
      setRequests(wcClient.session.history.pending);
      setInitialized(true);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }, [wcClient]);

  var onRequestListener = function onRequestListener(listener) {
    setOnRequestCallback(function () {
      return listener;
    });
  };

  var approveAndMakeRequest = function approveAndMakeRequest(request) {
    try {
      storage === null || storage === void 0 ? void 0 : storage.setItem("request-" + JSON.stringify(request), true);
      return Promise.resolve(makeRequest(request));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var makeRequest = useCallback(function (request) {
    try {
      var _accounts$0$split = accounts[0].split('@'),
          address = _accounts$0$split[0],
          chainId = _accounts$0$split[1];

      if (!onRequestCallback) {
        throw new Error("There is no onRequestCallback");
      }

      return Promise.resolve(onRequestCallback(address, chainId, request));
    } catch (e) {
      return Promise.reject(e);
    }
  }, [accounts]);
  var checkApprovedRequest = useCallback(function (request) {
    try {
      return Promise.resolve(storage === null || storage === void 0 ? void 0 : storage.getItem("request-" + JSON.stringify(request)));
    } catch (e) {
      return Promise.reject(e);
    }
  }, [storage]);
  var respondRequest = useCallback(function (topic, response) {
    try {
      if (typeof wcClient === "undefined") {
        throw new Error("Client is not initialized");
      }

      return Promise.resolve(wcClient.respond({
        topic: topic,
        response: response
      })).then(function () {});
    } catch (e) {
      return Promise.reject(e);
    }
  }, [wcClient]);
  var subscribeToEvents = useCallback(function () {
    console.log("ACTION", "subscribeToEvents");

    if (typeof wcClient === "undefined") {
      throw new Error("Client is not initialized");
    }

    wcClient.on(client_2.session.proposal, function (proposal) {
      if (typeof wcClient === "undefined") {
        throw new Error("Client is not initialized");
      }

      console.log("EVENT", "session_proposal");
      var unsupportedChains = [];
      proposal.permissions.blockchain.chains.forEach(function (chainId) {
        if (chains.includes(chainId)) return;
        unsupportedChains.push(chainId);
      });

      if (unsupportedChains.length) {
        return wcClient.reject({
          proposal: proposal
        });
      }

      var unsupportedMethods = [];
      proposal.permissions.jsonrpc.methods.forEach(function (method) {
        if (options.methods.includes(method)) return;
        unsupportedMethods.push(method);
      });

      if (unsupportedMethods.length) {
        return wcClient.reject({
          proposal: proposal
        });
      }

      setSessionProposals(function (old) {
        return [].concat(old, [proposal]);
      });
      return null;
    });
    wcClient.on(client_2.session.request, function (requestEvent) {
      try {
        console.log("EVENT", client_2.session.request, requestEvent.request);

        var _temp3 = _catch(function () {
          return Promise.resolve(checkApprovedRequest(requestEvent.request)).then(function (alreadyApproved) {
            var _temp = function () {
              if (!alreadyApproved) {
                setRequests(function (old) {
                  return [].concat(old.filter(function (i) {
                    return i.request.id !== requestEvent.request.id;
                  }), [requestEvent]);
                });
              } else {
                return Promise.resolve(makeRequest(requestEvent.request)).then(function (response) {
                  return Promise.resolve(respondRequest(requestEvent.topic, response)).then(function () {});
                });
              }
            }();

            if (_temp && _temp.then) return _temp.then(function () {});
          });
        }, function (e) {
          var response = format_2(requestEvent.request.id, e.message);
          return Promise.resolve(respondRequest(requestEvent.topic, response)).then(function () {});
        });

        return Promise.resolve(_temp3 && _temp3.then ? _temp3.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    });
    wcClient.on(client_2.session.created, function () {
      if (typeof wcClient === "undefined") {
        throw new Error("Client is not initialized");
      }

      console.log("EVENT", "session_created");
      setSessions(wcClient.session.values);
    });
    wcClient.on(client_2.session.deleted, function () {
      if (typeof wcClient === "undefined") {
        throw new Error("Client is not initialized");
      }

      console.log("EVENT", "session_deleted");
      setSessions(wcClient.session.values);
    });
  }, [chains, checkApprovedRequest, makeRequest, respondRequest, wcClient]);
  useEffect(function () {
    if (wcClient) {
      subscribeToEvents();
      checkPersistedState();
    }
  }, [wcClient, subscribeToEvents, checkPersistedState]);

  var onURI = function onURI(data) {
    try {
      var uri = typeof data === "string" ? data : "";
      if (!uri) return Promise.resolve();

      if (typeof wcClient === "undefined") {
        throw new Error("Client is not initialized");
      }

      return Promise.resolve(wcClient.pair({
        uri: uri
      })).then(function () {});
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var getPeerOfRequest = function getPeerOfRequest(requestEvent) {
    try {
      if (typeof wcClient === "undefined") {
        throw new Error("Client is not initialized");
      }

      return Promise.resolve(wcClient.session.get(requestEvent.topic)).then(function (_ref2) {
        var peer = _ref2.peer;
        return peer;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var approveSession = function approveSession(proposal) {
    try {
      console.log("ACTION", "approveSession");

      if (typeof wcClient === "undefined") {
        throw new Error("Client is not initialized");
      }

      if (typeof accounts === "undefined") {
        throw new Error("Accounts is undefined");
      }

      var accs = accounts.filter(function (account) {
        var chainId = account.split("@")[1];
        return proposal.permissions.blockchain.chains.includes(chainId);
      });
      var response = {
        state: {
          accounts: accs
        },
        metadata: misc_10() || options.appMetadata
      };
      return Promise.resolve(wcClient.approve({
        proposal: proposal,
        response: response
      })).then(function (session) {
        setSessionProposals(function (old) {
          return old.filter(function (i) {
            return i !== proposal;
          });
        });
        setSessions([session]);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var rejectSession = function rejectSession(proposal) {
    try {
      console.log("ACTION", "rejectSession");

      if (typeof wcClient === "undefined") {
        throw new Error("Client is not initialized");
      }

      return Promise.resolve(wcClient.reject({
        proposal: proposal
      })).then(function () {
        setSessionProposals(function (old) {
          return old.filter(function (i) {
            return i !== proposal;
          });
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var disconnect = function disconnect(topic) {
    try {
      console.log("ACTION", "disconnect");

      if (typeof wcClient === "undefined") {
        throw new Error("Client is not initialized");
      }

      return Promise.resolve(wcClient.disconnect({
        topic: topic,
        reason: error_1(error_3.USER_DISCONNECTED)
      })).then(function () {});
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var removeFromPending = function removeFromPending(requestEvent) {
    try {
      setRequests(requests.filter(function (x) {
        return x.request.id !== requestEvent.request.id;
      }));
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var approveRequest = function approveRequest(requestEvent) {
    try {
      var _temp6 = function _temp6() {
        return Promise.resolve(removeFromPending(requestEvent)).then(function () {});
      };

      if (typeof wcClient === "undefined") {
        throw new Error("Client is not initialized");
      }

      var _temp7 = _catch(function () {
        return Promise.resolve(approveAndMakeRequest(requestEvent.request)).then(function (response) {
          return Promise.resolve(wcClient.respond({
            topic: requestEvent.topic,
            response: response
          })).then(function () {});
        });
      }, function (error) {
        console.error(error);
        return Promise.resolve(wcClient.respond({
          topic: requestEvent.topic,
          response: format_2(requestEvent.request.id, "Failed or Rejected Request")
        })).then(function () {});
      });

      return Promise.resolve(_temp7 && _temp7.then ? _temp7.then(_temp6) : _temp6(_temp7));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var rejectRequest = function rejectRequest(requestEvent) {
    try {
      if (typeof wcClient === "undefined") {
        throw new Error("Client is not initialized");
      }

      return Promise.resolve(wcClient.respond({
        topic: requestEvent.topic,
        response: format_2(requestEvent.request.id, "Failed or Rejected Request")
      })).then(function () {
        return Promise.resolve(removeFromPending(requestEvent)).then(function () {});
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var addAccountAndChain = function addAccountAndChain(address, chain) {
    setAccounts(function (oldAccs) {
      return [].concat(oldAccs, [address + "@" + chain]);
    });
  };

  var removeAccountAndChain = function removeAccountAndChain(address, chain) {
    setAccounts(function (oldAccs) {
      return [].concat(oldAccs.filter(function (acc) {
        return acc !== address + "@" + chain;
      }));
    });
  };

  var clearAccountAndChain = function clearAccountAndChain() {
    setAccounts([]);
  };

  var contextValue = {
    wcClient: wcClient,
    setWcClient: setWcClient,
    storage: storage,
    setStorage: setStorage,
    sessionProposals: sessionProposals,
    setSessionProposals: setSessionProposals,
    initialized: initialized,
    setInitialized: setInitialized,
    chains: chains,
    setChains: setChains,
    sessions: sessions,
    setSessions: setSessions,
    requests: requests,
    setRequests: setRequests,
    results: results,
    setResults: setResults,
    init: init,
    resetApp: resetApp,
    subscribeToEvents: subscribeToEvents,
    checkPersistedState: checkPersistedState,
    approveAndMakeRequest: approveAndMakeRequest,
    makeRequest: makeRequest,
    checkApprovedRequest: checkApprovedRequest,
    onURI: onURI,
    getPeerOfRequest: getPeerOfRequest,
    approveSession: approveSession,
    rejectSession: rejectSession,
    disconnect: disconnect,
    removeFromPending: removeFromPending,
    respondRequest: respondRequest,
    approveRequest: approveRequest,
    rejectRequest: rejectRequest,
    onRequestListener: onRequestListener,
    addAccountAndChain: addAccountAndChain,
    removeAccountAndChain: removeAccountAndChain,
    clearAccountAndChain: clearAccountAndChain
  };
  return React.createElement(WalletConnectContext.Provider, {
    value: contextValue
  }, children);
};
var useWalletConnect = function useWalletConnect() {
  return useContext(WalletConnectContext);
};

export { WalletConnectContext, WalletConnectContextProvider, useWalletConnect };
//# sourceMappingURL=index.modern.js.map
