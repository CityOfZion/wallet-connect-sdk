function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React$1 = require('react');
var React$1__default = _interopDefault(React$1);
var lib = require('@cityofzion/wallet-connect-sdk-core/lib');
var buffer = _interopDefault(require('buffer'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

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

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

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
unwrapExports(cjs$1);

var __spreadArrays = undefined && undefined.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var BrowserInfo = function () {
  function BrowserInfo(name, version, os) {
    this.name = name;
    this.version = version;
    this.os = os;
    this.type = 'browser';
  }

  return BrowserInfo;
}();

var NodeInfo = function () {
  function NodeInfo(version) {
    this.version = version;
    this.type = 'node';
    this.name = 'node';
    this.os = process.platform;
  }

  return NodeInfo;
}();

var SearchBotDeviceInfo = function () {
  function SearchBotDeviceInfo(name, version, os, bot) {
    this.name = name;
    this.version = version;
    this.os = os;
    this.bot = bot;
    this.type = 'bot-device';
  }

  return SearchBotDeviceInfo;
}();

var BotInfo = function () {
  function BotInfo() {
    this.type = 'bot';
    this.bot = true;
    this.name = 'bot';
    this.version = null;
    this.os = null;
  }

  return BotInfo;
}();

var ReactNativeInfo = function () {
  function ReactNativeInfo() {
    this.type = 'react-native';
    this.name = 'react-native';
    this.version = null;
    this.os = null;
  }

  return ReactNativeInfo;
}();
var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
var SEARCHBOT_OS_REGEX = /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
var REQUIRED_VERSION_PARTS = 3;
var userAgentRules = [['aol', /AOLShield\/([0-9\._]+)/], ['edge', /Edge\/([0-9\._]+)/], ['edge-ios', /EdgiOS\/([0-9\._]+)/], ['yandexbrowser', /YaBrowser\/([0-9\._]+)/], ['kakaotalk', /KAKAOTALK\s([0-9\.]+)/], ['samsung', /SamsungBrowser\/([0-9\.]+)/], ['silk', /\bSilk\/([0-9._-]+)\b/], ['miui', /MiuiBrowser\/([0-9\.]+)$/], ['beaker', /BeakerBrowser\/([0-9\.]+)/], ['edge-chromium', /EdgA?\/([0-9\.]+)/], ['chromium-webview', /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/], ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/], ['phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/], ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/], ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/], ['fxios', /FxiOS\/([0-9\.]+)/], ['opera-mini', /Opera Mini.*Version\/([0-9\.]+)/], ['opera', /Opera\/([0-9\.]+)(?:\s|$)/], ['opera', /OPR\/([0-9\.]+)(:?\s|$)/], ['ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/], ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/], ['ie', /MSIE\s(7\.0)/], ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/], ['android', /Android\s([0-9\.]+)/], ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/], ['safari', /Version\/([0-9\._]+).*Safari/], ['facebook', /FBAV\/([0-9\.]+)/], ['instagram', /Instagram\s([0-9\.]+)/], ['ios-webview', /AppleWebKit\/([0-9\.]+).*Mobile/], ['ios-webview', /AppleWebKit\/([0-9\.]+).*Gecko\)$/], ['searchbot', SEARCHBOX_UA_REGEX]];
var operatingSystemRules = [['iOS', /iP(hone|od|ad)/], ['Android OS', /Android/], ['BlackBerry OS', /BlackBerry|BB10/], ['Windows Mobile', /IEMobile/], ['Amazon OS', /Kindle/], ['Windows 3.11', /Win16/], ['Windows 95', /(Windows 95)|(Win95)|(Windows_95)/], ['Windows 98', /(Windows 98)|(Win98)/], ['Windows 2000', /(Windows NT 5.0)|(Windows 2000)/], ['Windows XP', /(Windows NT 5.1)|(Windows XP)/], ['Windows Server 2003', /(Windows NT 5.2)/], ['Windows Vista', /(Windows NT 6.0)/], ['Windows 7', /(Windows NT 6.1)/], ['Windows 8', /(Windows NT 6.2)/], ['Windows 8.1', /(Windows NT 6.3)/], ['Windows 10', /(Windows NT 10.0)/], ['Windows ME', /Windows ME/], ['Open BSD', /OpenBSD/], ['Sun OS', /SunOS/], ['Chrome OS', /CrOS/], ['Linux', /(Linux)|(X11)/], ['Mac OS', /(Mac_PowerPC)|(Macintosh)/], ['QNX', /QNX/], ['BeOS', /BeOS/], ['OS/2', /OS\/2/]];
function detect(userAgent) {
  if (!!userAgent) {
    return parseUserAgent(userAgent);
  }

  if (typeof document === 'undefined' && typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return new ReactNativeInfo();
  }

  if (typeof navigator !== 'undefined') {
    return parseUserAgent(navigator.userAgent);
  }

  return getNodeVersion();
}

function matchUserAgent(ua) {
  return ua !== '' && userAgentRules.reduce(function (matched, _a) {
    var browser = _a[0],
        regex = _a[1];

    if (matched) {
      return matched;
    }

    var uaMatch = regex.exec(ua);
    return !!uaMatch && [browser, uaMatch];
  }, false);
}

function browserName(ua) {
  var data = matchUserAgent(ua);
  return data ? data[0] : null;
}
function parseUserAgent(ua) {
  var matchedRule = matchUserAgent(ua);

  if (!matchedRule) {
    return null;
  }

  var name = matchedRule[0],
      match = matchedRule[1];

  if (name === 'searchbot') {
    return new BotInfo();
  }

  var versionParts = match[1] && match[1].split(/[._]/).slice(0, 3);

  if (versionParts) {
    if (versionParts.length < REQUIRED_VERSION_PARTS) {
      versionParts = __spreadArrays(versionParts, createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length));
    }
  } else {
    versionParts = [];
  }

  var version = versionParts.join('.');
  var os = detectOS(ua);
  var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);

  if (searchBotMatch && searchBotMatch[1]) {
    return new SearchBotDeviceInfo(name, version, os, searchBotMatch[1]);
  }

  return new BrowserInfo(name, version, os);
}
function detectOS(ua) {
  for (var ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
    var _a = operatingSystemRules[ii],
        os = _a[0],
        regex = _a[1];
    var match = regex.exec(ua);

    if (match) {
      return os;
    }
  }

  return null;
}
function getNodeVersion() {
  var isNode = typeof process !== 'undefined' && process.version;
  return isNode ? new NodeInfo(process.version.slice(1)) : null;
}

function createVersionParts(count) {
  var output = [];

  for (var ii = 0; ii < count; ii++) {
    output.push('0');
  }

  return output;
}

var es = {
  __proto__: null,
  BrowserInfo: BrowserInfo,
  NodeInfo: NodeInfo,
  SearchBotDeviceInfo: SearchBotDeviceInfo,
  BotInfo: BotInfo,
  ReactNativeInfo: ReactNativeInfo,
  detect: detect,
  browserName: browserName,
  parseUserAgent: parseUserAgent,
  detectOS: detectOS,
  getNodeVersion: getNodeVersion
};

var canPromise = function canPromise() {
  return typeof Promise === 'function' && Promise.prototype && Promise.prototype.then;
};

var toString = {}.toString;

var isarray = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

function typedArraySupport() {
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = {
      __proto__: Uint8Array.prototype,
      foo: function foo() {
        return 42;
      }
    };
    return arr.foo() === 42;
  } catch (e) {
    return false;
  }
}

Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
var K_MAX_LENGTH = Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;

function Buffer(arg, offset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, offset, length);
  }

  if (typeof arg === 'number') {
    return allocUnsafe(this, arg);
  }

  return from(this, arg, offset, length);
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;

  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true,
      enumerable: false,
      writable: false
    });
  }
}

function checked(length) {
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes');
  }

  return length | 0;
}

function isnan(val) {
  return val !== val;
}

function createBuffer(that, length) {
  var buf;

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    buf = new Uint8Array(length);
    buf.__proto__ = Buffer.prototype;
  } else {
    buf = that;

    if (buf === null) {
      buf = new Buffer(length);
    }

    buf.length = length;
  }

  return buf;
}

function allocUnsafe(that, size) {
  var buf = createBuffer(that, size < 0 ? 0 : checked(size) | 0);

  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      buf[i] = 0;
    }
  }

  return buf;
}

function fromString(that, string) {
  var length = byteLength(string) | 0;
  var buf = createBuffer(that, length);
  var actual = buf.write(string);

  if (actual !== length) {
    buf = buf.slice(0, actual);
  }

  return buf;
}

function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  var buf = createBuffer(that, length);

  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255;
  }

  return buf;
}

function fromArrayBuffer(that, array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
  }

  var buf;

  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array);
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset);
  } else {
    buf = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    buf.__proto__ = Buffer.prototype;
  } else {
    buf = fromArrayLike(that, buf);
  }

  return buf;
}

function fromObject(that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    var buf = createBuffer(that, len);

    if (buf.length === 0) {
      return buf;
    }

    obj.copy(buf, 0, 0, len);
    return buf;
  }

  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }

      return fromArrayLike(that, obj);
    }

    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      if (!leadSurrogate) {
        if (codePoint > 0xDBFF) {
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        }

        leadSurrogate = codePoint;
        continue;
      }

      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      }

      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function byteLength(string) {
  if (Buffer.isBuffer(string)) {
    return string.length;
  }

  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }

  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0;
  return utf8ToBytes(string).length;
}

function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }

  return i;
}

function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function from(that, value, offset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, offset, length);
  }

  if (typeof value === 'string') {
    return fromString(that, value);
  }

  return fromObject(that, value);
}

Buffer.prototype.write = function write(string, offset, length) {
  if (offset === undefined) {
    length = this.length;
    offset = 0;
  } else if (length === undefined && typeof offset === 'string') {
    length = this.length;
    offset = 0;
  } else if (isFinite(offset)) {
    offset = offset | 0;

    if (isFinite(length)) {
      length = length | 0;
    } else {
      length = undefined;
    }
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  return utf8Write(this, string, offset, length);
};

Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;
  var newBuf;

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);

    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf;
};

Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;
  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0;

  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }

  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds');
  if (end > this.length) end = this.length;

  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
  }

  return len;
};

Buffer.prototype.fill = function fill(val, start, end) {
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      end = this.length;
    }

    if (val.length === 1) {
      var code = val.charCodeAt(0);

      if (code < 256) {
        val = code;
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;
  if (!val) val = 0;
  var i;

  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val) ? val : new Buffer(val);
    var len = bytes.length;

    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
};

Buffer.concat = function concat(list, length) {
  if (!isarray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return createBuffer(null, 0);
  }

  var i;

  if (length === undefined) {
    length = 0;

    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = allocUnsafe(null, length);
  var pos = 0;

  for (i = 0; i < list.length; ++i) {
    var buf = list[i];

    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }

    buf.copy(buffer, pos);
    pos += buf.length;
  }

  return buffer;
};

Buffer.byteLength = byteLength;
Buffer.prototype._isBuffer = true;

Buffer.isBuffer = function isBuffer(b) {
  return !!(b != null && b._isBuffer);
};

var alloc = function alloc(size) {
  var buffer = new Buffer(size);
  buffer.fill(0);
  return buffer;
};

var from_1 = function from_1(data) {
  return new Buffer(data);
};

var typedarrayBuffer = {
  alloc: alloc,
  from: from_1
};

var toSJISFunction;
var CODEWORDS_COUNT = [0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655, 733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706];

var getSymbolSize = function getSymbolSize(version) {
  if (!version) throw new Error('"version" cannot be null or undefined');
  if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
  return version * 4 + 17;
};

var getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
  return CODEWORDS_COUNT[version];
};

var getBCHDigit = function getBCHDigit(data) {
  var digit = 0;

  while (data !== 0) {
    digit++;
    data >>>= 1;
  }

  return digit;
};

var setToSJISFunction = function setToSJISFunction(f) {
  if (typeof f !== 'function') {
    throw new Error('"toSJISFunc" is not a valid function.');
  }

  toSJISFunction = f;
};

var isKanjiModeEnabled = function isKanjiModeEnabled() {
  return typeof toSJISFunction !== 'undefined';
};

var toSJIS = function toSJIS(kanji) {
  return toSJISFunction(kanji);
};

var utils = {
  getSymbolSize: getSymbolSize,
  getSymbolTotalCodewords: getSymbolTotalCodewords,
  getBCHDigit: getBCHDigit,
  setToSJISFunction: setToSJISFunction,
  isKanjiModeEnabled: isKanjiModeEnabled,
  toSJIS: toSJIS
};

var errorCorrectionLevel = createCommonjsModule(function (module, exports) {
  exports.L = {
    bit: 1
  };
  exports.M = {
    bit: 0
  };
  exports.Q = {
    bit: 3
  };
  exports.H = {
    bit: 2
  };

  function fromString(string) {
    if (typeof string !== 'string') {
      throw new Error('Param is not a string');
    }

    var lcStr = string.toLowerCase();

    switch (lcStr) {
      case 'l':
      case 'low':
        return exports.L;

      case 'm':
      case 'medium':
        return exports.M;

      case 'q':
      case 'quartile':
        return exports.Q;

      case 'h':
      case 'high':
        return exports.H;

      default:
        throw new Error('Unknown EC Level: ' + string);
    }
  }

  exports.isValid = function isValid(level) {
    return level && typeof level.bit !== 'undefined' && level.bit >= 0 && level.bit < 4;
  };

  exports.from = function from(value, defaultValue) {
    if (exports.isValid(value)) {
      return value;
    }

    try {
      return fromString(value);
    } catch (e) {
      return defaultValue;
    }
  };
});

function BitBuffer() {
  this.buffer = [];
  this.length = 0;
}

BitBuffer.prototype = {
  get: function get(index) {
    var bufIndex = Math.floor(index / 8);
    return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
  },
  put: function put(num, length) {
    for (var i = 0; i < length; i++) {
      this.putBit((num >>> length - i - 1 & 1) === 1);
    }
  },
  getLengthInBits: function getLengthInBits() {
    return this.length;
  },
  putBit: function putBit(bit) {
    var bufIndex = Math.floor(this.length / 8);

    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }

    if (bit) {
      this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
    }

    this.length++;
  }
};
var bitBuffer = BitBuffer;

function BitMatrix(size) {
  if (!size || size < 1) {
    throw new Error('BitMatrix size must be defined and greater than 0');
  }

  this.size = size;
  this.data = typedarrayBuffer.alloc(size * size);
  this.reservedBit = typedarrayBuffer.alloc(size * size);
}

BitMatrix.prototype.set = function (row, col, value, reserved) {
  var index = row * this.size + col;
  this.data[index] = value;
  if (reserved) this.reservedBit[index] = true;
};

BitMatrix.prototype.get = function (row, col) {
  return this.data[row * this.size + col];
};

BitMatrix.prototype.xor = function (row, col, value) {
  this.data[row * this.size + col] ^= value;
};

BitMatrix.prototype.isReserved = function (row, col) {
  return this.reservedBit[row * this.size + col];
};

var bitMatrix = BitMatrix;

var alignmentPattern = createCommonjsModule(function (module, exports) {
  var getSymbolSize = utils.getSymbolSize;

  exports.getRowColCoords = function getRowColCoords(version) {
    if (version === 1) return [];
    var posCount = Math.floor(version / 7) + 2;
    var size = getSymbolSize(version);
    var intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
    var positions = [size - 7];

    for (var i = 1; i < posCount - 1; i++) {
      positions[i] = positions[i - 1] - intervals;
    }

    positions.push(6);
    return positions.reverse();
  };

  exports.getPositions = function getPositions(version) {
    var coords = [];
    var pos = exports.getRowColCoords(version);
    var posLength = pos.length;

    for (var i = 0; i < posLength; i++) {
      for (var j = 0; j < posLength; j++) {
        if (i === 0 && j === 0 || i === 0 && j === posLength - 1 || i === posLength - 1 && j === 0) {
          continue;
        }

        coords.push([pos[i], pos[j]]);
      }
    }

    return coords;
  };
});

var getSymbolSize$1 = utils.getSymbolSize;
var FINDER_PATTERN_SIZE = 7;

var getPositions = function getPositions(version) {
  var size = getSymbolSize$1(version);
  return [[0, 0], [size - FINDER_PATTERN_SIZE, 0], [0, size - FINDER_PATTERN_SIZE]];
};

var finderPattern = {
  getPositions: getPositions
};

var maskPattern = createCommonjsModule(function (module, exports) {
  exports.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
  };
  var PenaltyScores = {
    N1: 3,
    N2: 3,
    N3: 40,
    N4: 10
  };

  exports.isValid = function isValid(mask) {
    return mask != null && mask !== '' && !isNaN(mask) && mask >= 0 && mask <= 7;
  };

  exports.from = function from(value) {
    return exports.isValid(value) ? parseInt(value, 10) : undefined;
  };

  exports.getPenaltyN1 = function getPenaltyN1(data) {
    var size = data.size;
    var points = 0;
    var sameCountCol = 0;
    var sameCountRow = 0;
    var lastCol = null;
    var lastRow = null;

    for (var row = 0; row < size; row++) {
      sameCountCol = sameCountRow = 0;
      lastCol = lastRow = null;

      for (var col = 0; col < size; col++) {
        var module = data.get(row, col);

        if (module === lastCol) {
          sameCountCol++;
        } else {
          if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
          lastCol = module;
          sameCountCol = 1;
        }

        module = data.get(col, row);

        if (module === lastRow) {
          sameCountRow++;
        } else {
          if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
          lastRow = module;
          sameCountRow = 1;
        }
      }

      if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
      if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
    }

    return points;
  };

  exports.getPenaltyN2 = function getPenaltyN2(data) {
    var size = data.size;
    var points = 0;

    for (var row = 0; row < size - 1; row++) {
      for (var col = 0; col < size - 1; col++) {
        var last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
        if (last === 4 || last === 0) points++;
      }
    }

    return points * PenaltyScores.N2;
  };

  exports.getPenaltyN3 = function getPenaltyN3(data) {
    var size = data.size;
    var points = 0;
    var bitsCol = 0;
    var bitsRow = 0;

    for (var row = 0; row < size; row++) {
      bitsCol = bitsRow = 0;

      for (var col = 0; col < size; col++) {
        bitsCol = bitsCol << 1 & 0x7FF | data.get(row, col);
        if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++;
        bitsRow = bitsRow << 1 & 0x7FF | data.get(col, row);
        if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++;
      }
    }

    return points * PenaltyScores.N3;
  };

  exports.getPenaltyN4 = function getPenaltyN4(data) {
    var darkCount = 0;
    var modulesCount = data.data.length;

    for (var i = 0; i < modulesCount; i++) {
      darkCount += data.data[i];
    }

    var k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
    return k * PenaltyScores.N4;
  };

  function getMaskAt(maskPattern, i, j) {
    switch (maskPattern) {
      case exports.Patterns.PATTERN000:
        return (i + j) % 2 === 0;

      case exports.Patterns.PATTERN001:
        return i % 2 === 0;

      case exports.Patterns.PATTERN010:
        return j % 3 === 0;

      case exports.Patterns.PATTERN011:
        return (i + j) % 3 === 0;

      case exports.Patterns.PATTERN100:
        return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;

      case exports.Patterns.PATTERN101:
        return i * j % 2 + i * j % 3 === 0;

      case exports.Patterns.PATTERN110:
        return (i * j % 2 + i * j % 3) % 2 === 0;

      case exports.Patterns.PATTERN111:
        return (i * j % 3 + (i + j) % 2) % 2 === 0;

      default:
        throw new Error('bad maskPattern:' + maskPattern);
    }
  }

  exports.applyMask = function applyMask(pattern, data) {
    var size = data.size;

    for (var col = 0; col < size; col++) {
      for (var row = 0; row < size; row++) {
        if (data.isReserved(row, col)) continue;
        data.xor(row, col, getMaskAt(pattern, row, col));
      }
    }
  };

  exports.getBestMask = function getBestMask(data, setupFormatFunc) {
    var numPatterns = Object.keys(exports.Patterns).length;
    var bestPattern = 0;
    var lowerPenalty = Infinity;

    for (var p = 0; p < numPatterns; p++) {
      setupFormatFunc(p);
      exports.applyMask(p, data);
      var penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
      exports.applyMask(p, data);

      if (penalty < lowerPenalty) {
        lowerPenalty = penalty;
        bestPattern = p;
      }
    }

    return bestPattern;
  };
});

var EC_BLOCKS_TABLE = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2, 4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4, 9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6, 13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9, 18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34, 40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17, 33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59, 70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81];
var EC_CODEWORDS_TABLE = [7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72, 88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160, 192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198, 288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168, 308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700, 224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810, 960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390, 728, 1050, 1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530, 1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260, 1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430];

var getBlocksCount = function getBlocksCount(version, errorCorrectionLevel$1) {
  switch (errorCorrectionLevel$1) {
    case errorCorrectionLevel.L:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];

    case errorCorrectionLevel.M:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];

    case errorCorrectionLevel.Q:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];

    case errorCorrectionLevel.H:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];

    default:
      return undefined;
  }
};

var getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel$1) {
  switch (errorCorrectionLevel$1) {
    case errorCorrectionLevel.L:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];

    case errorCorrectionLevel.M:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];

    case errorCorrectionLevel.Q:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];

    case errorCorrectionLevel.H:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];

    default:
      return undefined;
  }
};

var errorCorrectionCode = {
  getBlocksCount: getBlocksCount,
  getTotalCodewordsCount: getTotalCodewordsCount
};

var EXP_TABLE = typedarrayBuffer.alloc(512);
var LOG_TABLE = typedarrayBuffer.alloc(256);

(function initTables() {
  var x = 1;

  for (var i = 0; i < 255; i++) {
    EXP_TABLE[i] = x;
    LOG_TABLE[x] = i;
    x <<= 1;

    if (x & 0x100) {
      x ^= 0x11D;
    }
  }

  for (i = 255; i < 512; i++) {
    EXP_TABLE[i] = EXP_TABLE[i - 255];
  }
})();

var log = function log(n) {
  if (n < 1) throw new Error('log(' + n + ')');
  return LOG_TABLE[n];
};

var exp = function exp(n) {
  return EXP_TABLE[n];
};

var mul = function mul(x, y) {
  if (x === 0 || y === 0) return 0;
  return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
};

var galoisField = {
  log: log,
  exp: exp,
  mul: mul
};

var polynomial = createCommonjsModule(function (module, exports) {
  exports.mul = function mul(p1, p2) {
    var coeff = typedarrayBuffer.alloc(p1.length + p2.length - 1);

    for (var i = 0; i < p1.length; i++) {
      for (var j = 0; j < p2.length; j++) {
        coeff[i + j] ^= galoisField.mul(p1[i], p2[j]);
      }
    }

    return coeff;
  };

  exports.mod = function mod(divident, divisor) {
    var result = typedarrayBuffer.from(divident);

    while (result.length - divisor.length >= 0) {
      var coeff = result[0];

      for (var i = 0; i < divisor.length; i++) {
        result[i] ^= galoisField.mul(divisor[i], coeff);
      }

      var offset = 0;

      while (offset < result.length && result[offset] === 0) {
        offset++;
      }

      result = result.slice(offset);
    }

    return result;
  };

  exports.generateECPolynomial = function generateECPolynomial(degree) {
    var poly = typedarrayBuffer.from([1]);

    for (var i = 0; i < degree; i++) {
      poly = exports.mul(poly, [1, galoisField.exp(i)]);
    }

    return poly;
  };
});

var Buffer$1 = buffer.Buffer;

function ReedSolomonEncoder(degree) {
  this.genPoly = undefined;
  this.degree = degree;
  if (this.degree) this.initialize(this.degree);
}

ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
  this.degree = degree;
  this.genPoly = polynomial.generateECPolynomial(this.degree);
};

ReedSolomonEncoder.prototype.encode = function encode(data) {
  if (!this.genPoly) {
    throw new Error('Encoder not initialized');
  }

  var pad = typedarrayBuffer.alloc(this.degree);
  var paddedData = Buffer$1.concat([data, pad], data.length + this.degree);
  var remainder = polynomial.mod(paddedData, this.genPoly);
  var start = this.degree - remainder.length;

  if (start > 0) {
    var buff = typedarrayBuffer.alloc(this.degree);
    remainder.copy(buff, start);
    return buff;
  }

  return remainder;
};

var reedSolomonEncoder = ReedSolomonEncoder;

var isValid = function isValid(version) {
  return !isNaN(version) && version >= 1 && version <= 40;
};

var versionCheck = {
  isValid: isValid
};

var numeric = '[0-9]+';
var alphanumeric = '[A-Z $%*+\\-./:]+';
var kanji = '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|' + '[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|' + '[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|' + '[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+';
kanji = kanji.replace(/u/g, "\\u");

var _byte = '(?:(?![A-Z0-9 $%*+\\-./:]|' + kanji + ')(?:.|[\r\n]))+';

var KANJI = new RegExp(kanji, 'g');
var BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g');
var BYTE = new RegExp(_byte, 'g');
var NUMERIC = new RegExp(numeric, 'g');
var ALPHANUMERIC = new RegExp(alphanumeric, 'g');
var TEST_KANJI = new RegExp('^' + kanji + '$');
var TEST_NUMERIC = new RegExp('^' + numeric + '$');
var TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\-./:]+$');

var testKanji = function testKanji(str) {
  return TEST_KANJI.test(str);
};

var testNumeric = function testNumeric(str) {
  return TEST_NUMERIC.test(str);
};

var testAlphanumeric = function testAlphanumeric(str) {
  return TEST_ALPHANUMERIC.test(str);
};

var regex = {
  KANJI: KANJI,
  BYTE_KANJI: BYTE_KANJI,
  BYTE: BYTE,
  NUMERIC: NUMERIC,
  ALPHANUMERIC: ALPHANUMERIC,
  testKanji: testKanji,
  testNumeric: testNumeric,
  testAlphanumeric: testAlphanumeric
};

var mode = createCommonjsModule(function (module, exports) {
  exports.NUMERIC = {
    id: 'Numeric',
    bit: 1 << 0,
    ccBits: [10, 12, 14]
  };
  exports.ALPHANUMERIC = {
    id: 'Alphanumeric',
    bit: 1 << 1,
    ccBits: [9, 11, 13]
  };
  exports.BYTE = {
    id: 'Byte',
    bit: 1 << 2,
    ccBits: [8, 16, 16]
  };
  exports.KANJI = {
    id: 'Kanji',
    bit: 1 << 3,
    ccBits: [8, 10, 12]
  };
  exports.MIXED = {
    bit: -1
  };

  exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
    if (!mode.ccBits) throw new Error('Invalid mode: ' + mode);

    if (!versionCheck.isValid(version)) {
      throw new Error('Invalid version: ' + version);
    }

    if (version >= 1 && version < 10) return mode.ccBits[0];else if (version < 27) return mode.ccBits[1];
    return mode.ccBits[2];
  };

  exports.getBestModeForData = function getBestModeForData(dataStr) {
    if (regex.testNumeric(dataStr)) return exports.NUMERIC;else if (regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;else if (regex.testKanji(dataStr)) return exports.KANJI;else return exports.BYTE;
  };

  exports.toString = function toString(mode) {
    if (mode && mode.id) return mode.id;
    throw new Error('Invalid mode');
  };

  exports.isValid = function isValid(mode) {
    return mode && mode.bit && mode.ccBits;
  };

  function fromString(string) {
    if (typeof string !== 'string') {
      throw new Error('Param is not a string');
    }

    var lcStr = string.toLowerCase();

    switch (lcStr) {
      case 'numeric':
        return exports.NUMERIC;

      case 'alphanumeric':
        return exports.ALPHANUMERIC;

      case 'kanji':
        return exports.KANJI;

      case 'byte':
        return exports.BYTE;

      default:
        throw new Error('Unknown mode: ' + string);
    }
  }

  exports.from = function from(value, defaultValue) {
    if (exports.isValid(value)) {
      return value;
    }

    try {
      return fromString(value);
    } catch (e) {
      return defaultValue;
    }
  };
});

var version = createCommonjsModule(function (module, exports) {
  var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
  var G18_BCH = utils.getBCHDigit(G18);

  function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
    for (var currentVersion = 1; currentVersion <= 40; currentVersion++) {
      if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
        return currentVersion;
      }
    }

    return undefined;
  }

  function getReservedBitsCount(mode$1, version) {
    return mode.getCharCountIndicator(mode$1, version) + 4;
  }

  function getTotalBitsFromDataArray(segments, version) {
    var totalBits = 0;
    segments.forEach(function (data) {
      var reservedBits = getReservedBitsCount(data.mode, version);
      totalBits += reservedBits + data.getBitsLength();
    });
    return totalBits;
  }

  function getBestVersionForMixedData(segments, errorCorrectionLevel) {
    for (var currentVersion = 1; currentVersion <= 40; currentVersion++) {
      var length = getTotalBitsFromDataArray(segments, currentVersion);

      if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode.MIXED)) {
        return currentVersion;
      }
    }

    return undefined;
  }

  exports.from = function from(value, defaultValue) {
    if (versionCheck.isValid(value)) {
      return parseInt(value, 10);
    }

    return defaultValue;
  };

  exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode$1) {
    if (!versionCheck.isValid(version)) {
      throw new Error('Invalid QR Code version');
    }

    if (typeof mode$1 === 'undefined') mode$1 = mode.BYTE;
    var totalCodewords = utils.getSymbolTotalCodewords(version);
    var ecTotalCodewords = errorCorrectionCode.getTotalCodewordsCount(version, errorCorrectionLevel);
    var dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
    if (mode$1 === mode.MIXED) return dataTotalCodewordsBits;
    var usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode$1, version);

    switch (mode$1) {
      case mode.NUMERIC:
        return Math.floor(usableBits / 10 * 3);

      case mode.ALPHANUMERIC:
        return Math.floor(usableBits / 11 * 2);

      case mode.KANJI:
        return Math.floor(usableBits / 13);

      case mode.BYTE:
      default:
        return Math.floor(usableBits / 8);
    }
  };

  exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel$1) {
    var seg;
    var ecl = errorCorrectionLevel.from(errorCorrectionLevel$1, errorCorrectionLevel.M);

    if (isarray(data)) {
      if (data.length > 1) {
        return getBestVersionForMixedData(data, ecl);
      }

      if (data.length === 0) {
        return 1;
      }

      seg = data[0];
    } else {
      seg = data;
    }

    return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
  };

  exports.getEncodedBits = function getEncodedBits(version) {
    if (!versionCheck.isValid(version) || version < 7) {
      throw new Error('Invalid QR Code version');
    }

    var d = version << 12;

    while (utils.getBCHDigit(d) - G18_BCH >= 0) {
      d ^= G18 << utils.getBCHDigit(d) - G18_BCH;
    }

    return version << 12 | d;
  };
});

var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
var G15_BCH = utils.getBCHDigit(G15);

var getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
  var data = errorCorrectionLevel.bit << 3 | mask;
  var d = data << 10;

  while (utils.getBCHDigit(d) - G15_BCH >= 0) {
    d ^= G15 << utils.getBCHDigit(d) - G15_BCH;
  }

  return (data << 10 | d) ^ G15_MASK;
};

var formatInfo = {
  getEncodedBits: getEncodedBits
};

function NumericData(data) {
  this.mode = mode.NUMERIC;
  this.data = data.toString();
}

NumericData.getBitsLength = function getBitsLength(length) {
  return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
};

NumericData.prototype.getLength = function getLength() {
  return this.data.length;
};

NumericData.prototype.getBitsLength = function getBitsLength() {
  return NumericData.getBitsLength(this.data.length);
};

NumericData.prototype.write = function write(bitBuffer) {
  var i, group, value;

  for (i = 0; i + 3 <= this.data.length; i += 3) {
    group = this.data.substr(i, 3);
    value = parseInt(group, 10);
    bitBuffer.put(value, 10);
  }

  var remainingNum = this.data.length - i;

  if (remainingNum > 0) {
    group = this.data.substr(i);
    value = parseInt(group, 10);
    bitBuffer.put(value, remainingNum * 3 + 1);
  }
};

var numericData = NumericData;

var ALPHA_NUM_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '$', '%', '*', '+', '-', '.', '/', ':'];

function AlphanumericData(data) {
  this.mode = mode.ALPHANUMERIC;
  this.data = data;
}

AlphanumericData.getBitsLength = function getBitsLength(length) {
  return 11 * Math.floor(length / 2) + 6 * (length % 2);
};

AlphanumericData.prototype.getLength = function getLength() {
  return this.data.length;
};

AlphanumericData.prototype.getBitsLength = function getBitsLength() {
  return AlphanumericData.getBitsLength(this.data.length);
};

AlphanumericData.prototype.write = function write(bitBuffer) {
  var i;

  for (i = 0; i + 2 <= this.data.length; i += 2) {
    var value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
    value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
    bitBuffer.put(value, 11);
  }

  if (this.data.length % 2) {
    bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
  }
};

var alphanumericData = AlphanumericData;

function ByteData(data) {
  this.mode = mode.BYTE;
  this.data = typedarrayBuffer.from(data);
}

ByteData.getBitsLength = function getBitsLength(length) {
  return length * 8;
};

ByteData.prototype.getLength = function getLength() {
  return this.data.length;
};

ByteData.prototype.getBitsLength = function getBitsLength() {
  return ByteData.getBitsLength(this.data.length);
};

ByteData.prototype.write = function (bitBuffer) {
  for (var i = 0, l = this.data.length; i < l; i++) {
    bitBuffer.put(this.data[i], 8);
  }
};

var byteData = ByteData;

function KanjiData(data) {
  this.mode = mode.KANJI;
  this.data = data;
}

KanjiData.getBitsLength = function getBitsLength(length) {
  return length * 13;
};

KanjiData.prototype.getLength = function getLength() {
  return this.data.length;
};

KanjiData.prototype.getBitsLength = function getBitsLength() {
  return KanjiData.getBitsLength(this.data.length);
};

KanjiData.prototype.write = function (bitBuffer) {
  var i;

  for (i = 0; i < this.data.length; i++) {
    var value = utils.toSJIS(this.data[i]);

    if (value >= 0x8140 && value <= 0x9FFC) {
      value -= 0x8140;
    } else if (value >= 0xE040 && value <= 0xEBBF) {
      value -= 0xC140;
    } else {
      throw new Error('Invalid SJIS character: ' + this.data[i] + '\n' + 'Make sure your charset is UTF-8');
    }

    value = (value >>> 8 & 0xff) * 0xC0 + (value & 0xff);
    bitBuffer.put(value, 13);
  }
};

var kanjiData = KanjiData;

var dijkstra_1 = createCommonjsModule(function (module) {

  var dijkstra = {
    single_source_shortest_paths: function single_source_shortest_paths(graph, s, d) {
      var predecessors = {};
      var costs = {};
      costs[s] = 0;
      var open = dijkstra.PriorityQueue.make();
      open.push(s, 0);
      var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;

      while (!open.empty()) {
        closest = open.pop();
        u = closest.value;
        cost_of_s_to_u = closest.cost;
        adjacent_nodes = graph[u] || {};

        for (v in adjacent_nodes) {
          if (adjacent_nodes.hasOwnProperty(v)) {
            cost_of_e = adjacent_nodes[v];
            cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
            cost_of_s_to_v = costs[v];
            first_visit = typeof costs[v] === 'undefined';

            if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
              costs[v] = cost_of_s_to_u_plus_cost_of_e;
              open.push(v, cost_of_s_to_u_plus_cost_of_e);
              predecessors[v] = u;
            }
          }
        }
      }

      if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
        var msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');
        throw new Error(msg);
      }

      return predecessors;
    },
    extract_shortest_path_from_predecessor_list: function extract_shortest_path_from_predecessor_list(predecessors, d) {
      var nodes = [];
      var u = d;

      while (u) {
        nodes.push(u);
        u = predecessors[u];
      }

      nodes.reverse();
      return nodes;
    },
    find_path: function find_path(graph, s, d) {
      var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
      return dijkstra.extract_shortest_path_from_predecessor_list(predecessors, d);
    },
    PriorityQueue: {
      make: function make(opts) {
        var T = dijkstra.PriorityQueue,
            t = {},
            key;
        opts = opts || {};

        for (key in T) {
          if (T.hasOwnProperty(key)) {
            t[key] = T[key];
          }
        }

        t.queue = [];
        t.sorter = opts.sorter || T.default_sorter;
        return t;
      },
      default_sorter: function default_sorter(a, b) {
        return a.cost - b.cost;
      },
      push: function push(value, cost) {
        var item = {
          value: value,
          cost: cost
        };
        this.queue.push(item);
        this.queue.sort(this.sorter);
      },
      pop: function pop() {
        return this.queue.shift();
      },
      empty: function empty() {
        return this.queue.length === 0;
      }
    }
  };

  {
    module.exports = dijkstra;
  }
});

var segments = createCommonjsModule(function (module, exports) {
  function getStringByteLength(str) {
    return unescape(encodeURIComponent(str)).length;
  }

  function getSegments(regex, mode, str) {
    var segments = [];
    var result;

    while ((result = regex.exec(str)) !== null) {
      segments.push({
        data: result[0],
        index: result.index,
        mode: mode,
        length: result[0].length
      });
    }

    return segments;
  }

  function getSegmentsFromString(dataStr) {
    var numSegs = getSegments(regex.NUMERIC, mode.NUMERIC, dataStr);
    var alphaNumSegs = getSegments(regex.ALPHANUMERIC, mode.ALPHANUMERIC, dataStr);
    var byteSegs;
    var kanjiSegs;

    if (utils.isKanjiModeEnabled()) {
      byteSegs = getSegments(regex.BYTE, mode.BYTE, dataStr);
      kanjiSegs = getSegments(regex.KANJI, mode.KANJI, dataStr);
    } else {
      byteSegs = getSegments(regex.BYTE_KANJI, mode.BYTE, dataStr);
      kanjiSegs = [];
    }

    var segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
    return segs.sort(function (s1, s2) {
      return s1.index - s2.index;
    }).map(function (obj) {
      return {
        data: obj.data,
        mode: obj.mode,
        length: obj.length
      };
    });
  }

  function getSegmentBitsLength(length, mode$1) {
    switch (mode$1) {
      case mode.NUMERIC:
        return numericData.getBitsLength(length);

      case mode.ALPHANUMERIC:
        return alphanumericData.getBitsLength(length);

      case mode.KANJI:
        return kanjiData.getBitsLength(length);

      case mode.BYTE:
        return byteData.getBitsLength(length);
    }
  }

  function mergeSegments(segs) {
    return segs.reduce(function (acc, curr) {
      var prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;

      if (prevSeg && prevSeg.mode === curr.mode) {
        acc[acc.length - 1].data += curr.data;
        return acc;
      }

      acc.push(curr);
      return acc;
    }, []);
  }

  function buildNodes(segs) {
    var nodes = [];

    for (var i = 0; i < segs.length; i++) {
      var seg = segs[i];

      switch (seg.mode) {
        case mode.NUMERIC:
          nodes.push([seg, {
            data: seg.data,
            mode: mode.ALPHANUMERIC,
            length: seg.length
          }, {
            data: seg.data,
            mode: mode.BYTE,
            length: seg.length
          }]);
          break;

        case mode.ALPHANUMERIC:
          nodes.push([seg, {
            data: seg.data,
            mode: mode.BYTE,
            length: seg.length
          }]);
          break;

        case mode.KANJI:
          nodes.push([seg, {
            data: seg.data,
            mode: mode.BYTE,
            length: getStringByteLength(seg.data)
          }]);
          break;

        case mode.BYTE:
          nodes.push([{
            data: seg.data,
            mode: mode.BYTE,
            length: getStringByteLength(seg.data)
          }]);
      }
    }

    return nodes;
  }

  function buildGraph(nodes, version) {
    var table = {};
    var graph = {
      'start': {}
    };
    var prevNodeIds = ['start'];

    for (var i = 0; i < nodes.length; i++) {
      var nodeGroup = nodes[i];
      var currentNodeIds = [];

      for (var j = 0; j < nodeGroup.length; j++) {
        var node = nodeGroup[j];
        var key = '' + i + j;
        currentNodeIds.push(key);
        table[key] = {
          node: node,
          lastCount: 0
        };
        graph[key] = {};

        for (var n = 0; n < prevNodeIds.length; n++) {
          var prevNodeId = prevNodeIds[n];

          if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
            graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
            table[prevNodeId].lastCount += node.length;
          } else {
            if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
            graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + mode.getCharCountIndicator(node.mode, version);
          }
        }
      }

      prevNodeIds = currentNodeIds;
    }

    for (n = 0; n < prevNodeIds.length; n++) {
      graph[prevNodeIds[n]]['end'] = 0;
    }

    return {
      map: graph,
      table: table
    };
  }

  function buildSingleSegment(data, modesHint) {
    var mode$1;
    var bestMode = mode.getBestModeForData(data);
    mode$1 = mode.from(modesHint, bestMode);

    if (mode$1 !== mode.BYTE && mode$1.bit < bestMode.bit) {
      throw new Error('"' + data + '"' + ' cannot be encoded with mode ' + mode.toString(mode$1) + '.\n Suggested mode is: ' + mode.toString(bestMode));
    }

    if (mode$1 === mode.KANJI && !utils.isKanjiModeEnabled()) {
      mode$1 = mode.BYTE;
    }

    switch (mode$1) {
      case mode.NUMERIC:
        return new numericData(data);

      case mode.ALPHANUMERIC:
        return new alphanumericData(data);

      case mode.KANJI:
        return new kanjiData(data);

      case mode.BYTE:
        return new byteData(data);
    }
  }

  exports.fromArray = function fromArray(array) {
    return array.reduce(function (acc, seg) {
      if (typeof seg === 'string') {
        acc.push(buildSingleSegment(seg, null));
      } else if (seg.data) {
        acc.push(buildSingleSegment(seg.data, seg.mode));
      }

      return acc;
    }, []);
  };

  exports.fromString = function fromString(data, version) {
    var segs = getSegmentsFromString(data, utils.isKanjiModeEnabled());
    var nodes = buildNodes(segs);
    var graph = buildGraph(nodes, version);
    var path = dijkstra_1.find_path(graph.map, 'start', 'end');
    var optimizedSegs = [];

    for (var i = 1; i < path.length - 1; i++) {
      optimizedSegs.push(graph.table[path[i]].node);
    }

    return exports.fromArray(mergeSegments(optimizedSegs));
  };

  exports.rawSplit = function rawSplit(data) {
    return exports.fromArray(getSegmentsFromString(data, utils.isKanjiModeEnabled()));
  };
});

function setupFinderPattern(matrix, version) {
  var size = matrix.size;
  var pos = finderPattern.getPositions(version);

  for (var i = 0; i < pos.length; i++) {
    var row = pos[i][0];
    var col = pos[i][1];

    for (var r = -1; r <= 7; r++) {
      if (row + r <= -1 || size <= row + r) continue;

      for (var c = -1; c <= 7; c++) {
        if (col + c <= -1 || size <= col + c) continue;

        if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}

function setupTimingPattern(matrix) {
  var size = matrix.size;

  for (var r = 8; r < size - 8; r++) {
    var value = r % 2 === 0;
    matrix.set(r, 6, value, true);
    matrix.set(6, r, value, true);
  }
}

function setupAlignmentPattern(matrix, version) {
  var pos = alignmentPattern.getPositions(version);

  for (var i = 0; i < pos.length; i++) {
    var row = pos[i][0];
    var col = pos[i][1];

    for (var r = -2; r <= 2; r++) {
      for (var c = -2; c <= 2; c++) {
        if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}

function setupVersionInfo(matrix, version$1) {
  var size = matrix.size;
  var bits = version.getEncodedBits(version$1);
  var row, col, mod;

  for (var i = 0; i < 18; i++) {
    row = Math.floor(i / 3);
    col = i % 3 + size - 8 - 3;
    mod = (bits >> i & 1) === 1;
    matrix.set(row, col, mod, true);
    matrix.set(col, row, mod, true);
  }
}

function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
  var size = matrix.size;
  var bits = formatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
  var i, mod;

  for (i = 0; i < 15; i++) {
    mod = (bits >> i & 1) === 1;

    if (i < 6) {
      matrix.set(i, 8, mod, true);
    } else if (i < 8) {
      matrix.set(i + 1, 8, mod, true);
    } else {
      matrix.set(size - 15 + i, 8, mod, true);
    }

    if (i < 8) {
      matrix.set(8, size - i - 1, mod, true);
    } else if (i < 9) {
      matrix.set(8, 15 - i - 1 + 1, mod, true);
    } else {
      matrix.set(8, 15 - i - 1, mod, true);
    }
  }

  matrix.set(size - 8, 8, 1, true);
}

function setupData(matrix, data) {
  var size = matrix.size;
  var inc = -1;
  var row = size - 1;
  var bitIndex = 7;
  var byteIndex = 0;

  for (var col = size - 1; col > 0; col -= 2) {
    if (col === 6) col--;

    while (true) {
      for (var c = 0; c < 2; c++) {
        if (!matrix.isReserved(row, col - c)) {
          var dark = false;

          if (byteIndex < data.length) {
            dark = (data[byteIndex] >>> bitIndex & 1) === 1;
          }

          matrix.set(row, col - c, dark);
          bitIndex--;

          if (bitIndex === -1) {
            byteIndex++;
            bitIndex = 7;
          }
        }
      }

      row += inc;

      if (row < 0 || size <= row) {
        row -= inc;
        inc = -inc;
        break;
      }
    }
  }
}

function createData(version, errorCorrectionLevel, segments) {
  var buffer = new bitBuffer();
  segments.forEach(function (data) {
    buffer.put(data.mode.bit, 4);
    buffer.put(data.getLength(), mode.getCharCountIndicator(data.mode, version));
    data.write(buffer);
  });
  var totalCodewords = utils.getSymbolTotalCodewords(version);
  var ecTotalCodewords = errorCorrectionCode.getTotalCodewordsCount(version, errorCorrectionLevel);
  var dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;

  if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
    buffer.put(0, 4);
  }

  while (buffer.getLengthInBits() % 8 !== 0) {
    buffer.putBit(0);
  }

  var remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;

  for (var i = 0; i < remainingByte; i++) {
    buffer.put(i % 2 ? 0x11 : 0xEC, 8);
  }

  return createCodewords(buffer, version, errorCorrectionLevel);
}

function createCodewords(bitBuffer, version, errorCorrectionLevel) {
  var totalCodewords = utils.getSymbolTotalCodewords(version);
  var ecTotalCodewords = errorCorrectionCode.getTotalCodewordsCount(version, errorCorrectionLevel);
  var dataTotalCodewords = totalCodewords - ecTotalCodewords;
  var ecTotalBlocks = errorCorrectionCode.getBlocksCount(version, errorCorrectionLevel);
  var blocksInGroup2 = totalCodewords % ecTotalBlocks;
  var blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
  var totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
  var dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
  var dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
  var ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
  var rs = new reedSolomonEncoder(ecCount);
  var offset = 0;
  var dcData = new Array(ecTotalBlocks);
  var ecData = new Array(ecTotalBlocks);
  var maxDataSize = 0;
  var buffer = typedarrayBuffer.from(bitBuffer.buffer);

  for (var b = 0; b < ecTotalBlocks; b++) {
    var dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
    dcData[b] = buffer.slice(offset, offset + dataSize);
    ecData[b] = rs.encode(dcData[b]);
    offset += dataSize;
    maxDataSize = Math.max(maxDataSize, dataSize);
  }

  var data = typedarrayBuffer.alloc(totalCodewords);
  var index = 0;
  var i, r;

  for (i = 0; i < maxDataSize; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      if (i < dcData[r].length) {
        data[index++] = dcData[r][i];
      }
    }
  }

  for (i = 0; i < ecCount; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      data[index++] = ecData[r][i];
    }
  }

  return data;
}

function createSymbol(data, version$1, errorCorrectionLevel, maskPattern$1) {
  var segments$1;

  if (isarray(data)) {
    segments$1 = segments.fromArray(data);
  } else if (typeof data === 'string') {
    var estimatedVersion = version$1;

    if (!estimatedVersion) {
      var rawSegments = segments.rawSplit(data);
      estimatedVersion = version.getBestVersionForData(rawSegments, errorCorrectionLevel);
    }

    segments$1 = segments.fromString(data, estimatedVersion || 40);
  } else {
    throw new Error('Invalid data');
  }

  var bestVersion = version.getBestVersionForData(segments$1, errorCorrectionLevel);

  if (!bestVersion) {
    throw new Error('The amount of data is too big to be stored in a QR Code');
  }

  if (!version$1) {
    version$1 = bestVersion;
  } else if (version$1 < bestVersion) {
    throw new Error('\n' + 'The chosen QR Code version cannot contain this amount of data.\n' + 'Minimum version required to store current data is: ' + bestVersion + '.\n');
  }

  var dataBits = createData(version$1, errorCorrectionLevel, segments$1);
  var moduleCount = utils.getSymbolSize(version$1);
  var modules = new bitMatrix(moduleCount);
  setupFinderPattern(modules, version$1);
  setupTimingPattern(modules);
  setupAlignmentPattern(modules, version$1);
  setupFormatInfo(modules, errorCorrectionLevel, 0);

  if (version$1 >= 7) {
    setupVersionInfo(modules, version$1);
  }

  setupData(modules, dataBits);

  if (isNaN(maskPattern$1)) {
    maskPattern$1 = maskPattern.getBestMask(modules, setupFormatInfo.bind(null, modules, errorCorrectionLevel));
  }

  maskPattern.applyMask(maskPattern$1, modules);
  setupFormatInfo(modules, errorCorrectionLevel, maskPattern$1);
  return {
    modules: modules,
    version: version$1,
    errorCorrectionLevel: errorCorrectionLevel,
    maskPattern: maskPattern$1,
    segments: segments$1
  };
}

var create = function create(data, options) {
  if (typeof data === 'undefined' || data === '') {
    throw new Error('No input text');
  }

  var errorCorrectionLevel$1 = errorCorrectionLevel.M;
  var version$1;
  var mask;

  if (typeof options !== 'undefined') {
    errorCorrectionLevel$1 = errorCorrectionLevel.from(options.errorCorrectionLevel, errorCorrectionLevel.M);
    version$1 = version.from(options.version);
    mask = maskPattern.from(options.maskPattern);

    if (options.toSJISFunc) {
      utils.setToSJISFunction(options.toSJISFunc);
    }
  }

  return createSymbol(data, version$1, errorCorrectionLevel$1, mask);
};

var qrcode = {
  create: create
};

var utils$1 = createCommonjsModule(function (module, exports) {
  function hex2rgba(hex) {
    if (typeof hex === 'number') {
      hex = hex.toString();
    }

    if (typeof hex !== 'string') {
      throw new Error('Color should be defined as hex string');
    }

    var hexCode = hex.slice().replace('#', '').split('');

    if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
      throw new Error('Invalid hex color: ' + hex);
    }

    if (hexCode.length === 3 || hexCode.length === 4) {
      hexCode = Array.prototype.concat.apply([], hexCode.map(function (c) {
        return [c, c];
      }));
    }

    if (hexCode.length === 6) hexCode.push('F', 'F');
    var hexValue = parseInt(hexCode.join(''), 16);
    return {
      r: hexValue >> 24 & 255,
      g: hexValue >> 16 & 255,
      b: hexValue >> 8 & 255,
      a: hexValue & 255,
      hex: '#' + hexCode.slice(0, 6).join('')
    };
  }

  exports.getOptions = function getOptions(options) {
    if (!options) options = {};
    if (!options.color) options.color = {};
    var margin = typeof options.margin === 'undefined' || options.margin === null || options.margin < 0 ? 4 : options.margin;
    var width = options.width && options.width >= 21 ? options.width : undefined;
    var scale = options.scale || 4;
    return {
      width: width,
      scale: width ? 4 : scale,
      margin: margin,
      color: {
        dark: hex2rgba(options.color.dark || '#000000ff'),
        light: hex2rgba(options.color.light || '#ffffffff')
      },
      type: options.type,
      rendererOpts: options.rendererOpts || {}
    };
  };

  exports.getScale = function getScale(qrSize, opts) {
    return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
  };

  exports.getImageWidth = function getImageWidth(qrSize, opts) {
    var scale = exports.getScale(qrSize, opts);
    return Math.floor((qrSize + opts.margin * 2) * scale);
  };

  exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
    var size = qr.modules.size;
    var data = qr.modules.data;
    var scale = exports.getScale(size, opts);
    var symbolSize = Math.floor((size + opts.margin * 2) * scale);
    var scaledMargin = opts.margin * scale;
    var palette = [opts.color.light, opts.color.dark];

    for (var i = 0; i < symbolSize; i++) {
      for (var j = 0; j < symbolSize; j++) {
        var posDst = (i * symbolSize + j) * 4;
        var pxColor = opts.color.light;

        if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
          var iSrc = Math.floor((i - scaledMargin) / scale);
          var jSrc = Math.floor((j - scaledMargin) / scale);
          pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
        }

        imgData[posDst++] = pxColor.r;
        imgData[posDst++] = pxColor.g;
        imgData[posDst++] = pxColor.b;
        imgData[posDst] = pxColor.a;
      }
    }
  };
});

var canvas = createCommonjsModule(function (module, exports) {
  function clearCanvas(ctx, canvas, size) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!canvas.style) canvas.style = {};
    canvas.height = size;
    canvas.width = size;
    canvas.style.height = size + 'px';
    canvas.style.width = size + 'px';
  }

  function getCanvasElement() {
    try {
      return document.createElement('canvas');
    } catch (e) {
      throw new Error('You need to specify a canvas element');
    }
  }

  exports.render = function render(qrData, canvas, options) {
    var opts = options;
    var canvasEl = canvas;

    if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
      opts = canvas;
      canvas = undefined;
    }

    if (!canvas) {
      canvasEl = getCanvasElement();
    }

    opts = utils$1.getOptions(opts);
    var size = utils$1.getImageWidth(qrData.modules.size, opts);
    var ctx = canvasEl.getContext('2d');
    var image = ctx.createImageData(size, size);
    utils$1.qrToImageData(image.data, qrData, opts);
    clearCanvas(ctx, canvasEl, size);
    ctx.putImageData(image, 0, 0);
    return canvasEl;
  };

  exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
    var opts = options;

    if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
      opts = canvas;
      canvas = undefined;
    }

    if (!opts) opts = {};
    var canvasEl = exports.render(qrData, canvas, opts);
    var type = opts.type || 'image/png';
    var rendererOpts = opts.rendererOpts || {};
    return canvasEl.toDataURL(type, rendererOpts.quality);
  };
});

function getColorAttrib(color, attrib) {
  var alpha = color.a / 255;
  var str = attrib + '="' + color.hex + '"';
  return alpha < 1 ? str + ' ' + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
}

function svgCmd(cmd, x, y) {
  var str = cmd + x;
  if (typeof y !== 'undefined') str += ' ' + y;
  return str;
}

function qrToPath(data, size, margin) {
  var path = '';
  var moveBy = 0;
  var newRow = false;
  var lineLength = 0;

  for (var i = 0; i < data.length; i++) {
    var col = Math.floor(i % size);
    var row = Math.floor(i / size);
    if (!col && !newRow) newRow = true;

    if (data[i]) {
      lineLength++;

      if (!(i > 0 && col > 0 && data[i - 1])) {
        path += newRow ? svgCmd('M', col + margin, 0.5 + row + margin) : svgCmd('m', moveBy, 0);
        moveBy = 0;
        newRow = false;
      }

      if (!(col + 1 < size && data[i + 1])) {
        path += svgCmd('h', lineLength);
        lineLength = 0;
      }
    } else {
      moveBy++;
    }
  }

  return path;
}

var render = function render(qrData, options, cb) {
  var opts = utils$1.getOptions(options);
  var size = qrData.modules.size;
  var data = qrData.modules.data;
  var qrcodesize = size + opts.margin * 2;
  var bg = !opts.color.light.a ? '' : '<path ' + getColorAttrib(opts.color.light, 'fill') + ' d="M0 0h' + qrcodesize + 'v' + qrcodesize + 'H0z"/>';
  var path = '<path ' + getColorAttrib(opts.color.dark, 'stroke') + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
  var viewBox = 'viewBox="' + '0 0 ' + qrcodesize + ' ' + qrcodesize + '"';
  var width = !opts.width ? '' : 'width="' + opts.width + '" height="' + opts.width + '" ';
  var svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + '</svg>\n';

  if (typeof cb === 'function') {
    cb(null, svgTag);
  }

  return svgTag;
};

var svgTag = {
  render: render
};

function renderCanvas(renderFunc, canvas, text, opts, cb) {
  var args = [].slice.call(arguments, 1);
  var argsNum = args.length;
  var isLastArgCb = typeof args[argsNum - 1] === 'function';

  if (!isLastArgCb && !canPromise()) {
    throw new Error('Callback required as last argument');
  }

  if (isLastArgCb) {
    if (argsNum < 2) {
      throw new Error('Too few arguments provided');
    }

    if (argsNum === 2) {
      cb = text;
      text = canvas;
      canvas = opts = undefined;
    } else if (argsNum === 3) {
      if (canvas.getContext && typeof cb === 'undefined') {
        cb = opts;
        opts = undefined;
      } else {
        cb = opts;
        opts = text;
        text = canvas;
        canvas = undefined;
      }
    }
  } else {
    if (argsNum < 1) {
      throw new Error('Too few arguments provided');
    }

    if (argsNum === 1) {
      text = canvas;
      canvas = opts = undefined;
    } else if (argsNum === 2 && !canvas.getContext) {
      opts = text;
      text = canvas;
      canvas = undefined;
    }

    return new Promise(function (resolve, reject) {
      try {
        var data = qrcode.create(text, opts);
        resolve(renderFunc(data, canvas, opts));
      } catch (e) {
        reject(e);
      }
    });
  }

  try {
    var data = qrcode.create(text, opts);
    cb(null, renderFunc(data, canvas, opts));
  } catch (e) {
    cb(e);
  }
}

var create$1 = qrcode.create;
var toCanvas = renderCanvas.bind(null, canvas.render);
var toDataURL = renderCanvas.bind(null, canvas.renderToDataURL);
var toString_1 = renderCanvas.bind(null, function (data, _, opts) {
  return svgTag.render(data, opts);
});
var browser = {
  create: create$1,
  toCanvas: toCanvas,
  toDataURL: toDataURL,
  toString: toString_1
};

var n,
    u,
    i,
    t,
    o,
    r = {},
    f = [],
    e = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;

function c(n, l) {
  for (var u in l) {
    n[u] = l[u];
  }

  return n;
}

function s(n) {
  var l = n.parentNode;
  l && l.removeChild(n);
}

function a(n, l, u) {
  var i,
      t,
      o,
      r = arguments,
      f = {};

  for (o in l) {
    "key" == o ? i = l[o] : "ref" == o ? t = l[o] : f[o] = l[o];
  }

  if (arguments.length > 3) for (u = [u], o = 3; o < arguments.length; o++) {
    u.push(r[o]);
  }
  if (null != u && (f.children = u), "function" == typeof n && null != n.defaultProps) for (o in n.defaultProps) {
    void 0 === f[o] && (f[o] = n.defaultProps[o]);
  }
  return v(n, f, i, t, null);
}

function v(l, u, i, t, o) {
  var r = {
    type: l,
    props: u,
    key: i,
    ref: t,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    __h: null,
    constructor: void 0,
    __v: null == o ? ++n.__v : o
  };
  return null != n.vnode && n.vnode(r), r;
}

function h() {
  return {
    current: null
  };
}

function y(n) {
  return n.children;
}

function p(n, l) {
  this.props = n, this.context = l;
}

function d(n, l) {
  if (null == l) return n.__ ? d(n.__, n.__.__k.indexOf(n) + 1) : null;

  for (var u; l < n.__k.length; l++) {
    if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
  }

  return "function" == typeof n.type ? d(n) : null;
}

function _(n) {
  var l, u;

  if (null != (n = n.__) && null != n.__c) {
    for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) {
      if (null != (u = n.__k[l]) && null != u.__e) {
        n.__e = n.__c.base = u.__e;
        break;
      }
    }

    return _(n);
  }
}

function k(l) {
  (!l.__d && (l.__d = !0) && u.push(l) && !b.__r++ || t !== n.debounceRendering) && ((t = n.debounceRendering) || i)(b);
}

function b() {
  for (var n; b.__r = u.length;) {
    n = u.sort(function (n, l) {
      return n.__v.__b - l.__v.__b;
    }), u = [], n.some(function (n) {
      var l, u, i, t, o, r;
      n.__d && (o = (t = (l = n).__v).__e, (r = l.__P) && (u = [], (i = c({}, t)).__v = t.__v + 1, I(r, t, i, l.__n, void 0 !== r.ownerSVGElement, null != t.__h ? [o] : null, u, null == o ? d(t) : o, t.__h), T(u, t), t.__e != o && _(t)));
    });
  }
}

function m(n, l, u, i, t, o, e, c, s, a) {
  var h,
      p,
      _,
      k,
      b,
      m,
      w,
      A = i && i.__k || f,
      P = A.length;

  for (u.__k = [], h = 0; h < l.length; h++) {
    if (null != (k = u.__k[h] = null == (k = l[h]) || "boolean" == typeof k ? null : "string" == typeof k || "number" == typeof k || "bigint" == typeof k ? v(null, k, null, null, k) : Array.isArray(k) ? v(y, {
      children: k
    }, null, null, null) : k.__b > 0 ? v(k.type, k.props, k.key, null, k.__v) : k)) {
      if (k.__ = u, k.__b = u.__b + 1, null === (_ = A[h]) || _ && k.key == _.key && k.type === _.type) A[h] = void 0;else for (p = 0; p < P; p++) {
        if ((_ = A[p]) && k.key == _.key && k.type === _.type) {
          A[p] = void 0;
          break;
        }

        _ = null;
      }
      I(n, k, _ = _ || r, t, o, e, c, s, a), b = k.__e, (p = k.ref) && _.ref != p && (w || (w = []), _.ref && w.push(_.ref, null, k), w.push(p, k.__c || b, k)), null != b ? (null == m && (m = b), "function" == typeof k.type && null != k.__k && k.__k === _.__k ? k.__d = s = g(k, s, n) : s = x(n, k, _, A, b, s), a || "option" !== u.type ? "function" == typeof u.type && (u.__d = s) : n.value = "") : s && _.__e == s && s.parentNode != n && (s = d(_));
    }
  }

  for (u.__e = m, h = P; h--;) {
    null != A[h] && ("function" == typeof u.type && null != A[h].__e && A[h].__e == u.__d && (u.__d = d(i, h + 1)), L(A[h], A[h]));
  }

  if (w) for (h = 0; h < w.length; h++) {
    z(w[h], w[++h], w[++h]);
  }
}

function g(n, l, u) {
  var i, t;

  for (i = 0; i < n.__k.length; i++) {
    (t = n.__k[i]) && (t.__ = n, l = "function" == typeof t.type ? g(t, l, u) : x(u, t, t, n.__k, t.__e, l));
  }

  return l;
}

function w(n, l) {
  return l = l || [], null == n || "boolean" == typeof n || (Array.isArray(n) ? n.some(function (n) {
    w(n, l);
  }) : l.push(n)), l;
}

function x(n, l, u, i, t, o) {
  var r, f, e;
  if (void 0 !== l.__d) r = l.__d, l.__d = void 0;else if (null == u || t != o || null == t.parentNode) n: if (null == o || o.parentNode !== n) n.appendChild(t), r = null;else {
    for (f = o, e = 0; (f = f.nextSibling) && e < i.length; e += 2) {
      if (f == t) break n;
    }

    n.insertBefore(t, o), r = o;
  }
  return void 0 !== r ? r : t.nextSibling;
}

function A(n, l, u, i, t) {
  var o;

  for (o in u) {
    "children" === o || "key" === o || o in l || C(n, o, null, u[o], i);
  }

  for (o in l) {
    t && "function" != typeof l[o] || "children" === o || "key" === o || "value" === o || "checked" === o || u[o] === l[o] || C(n, o, l[o], u[o], i);
  }
}

function P(n, l, u) {
  "-" === l[0] ? n.setProperty(l, u) : n[l] = null == u ? "" : "number" != typeof u || e.test(l) ? u : u + "px";
}

function C(n, l, u, i, t) {
  var o;

  n: if ("style" === l) {
    if ("string" == typeof u) n.style.cssText = u;else {
      if ("string" == typeof i && (n.style.cssText = i = ""), i) for (l in i) {
        u && l in u || P(n.style, l, "");
      }
      if (u) for (l in u) {
        i && u[l] === i[l] || P(n.style, l, u[l]);
      }
    }
  } else if ("o" === l[0] && "n" === l[1]) o = l !== (l = l.replace(/Capture$/, "")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + o] = u, u ? i || n.addEventListener(l, o ? H : $, o) : n.removeEventListener(l, o ? H : $, o);else if ("dangerouslySetInnerHTML" !== l) {
    if (t) l = l.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");else if ("href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && l in n) try {
      n[l] = null == u ? "" : u;
      break n;
    } catch (n) {}
    "function" == typeof u || (null != u && (!1 !== u || "a" === l[0] && "r" === l[1]) ? n.setAttribute(l, u) : n.removeAttribute(l));
  }
}

function $(l) {
  this.l[l.type + !1](n.event ? n.event(l) : l);
}

function H(l) {
  this.l[l.type + !0](n.event ? n.event(l) : l);
}

function I(l, u, i, t, o, r, f, e, s) {
  var a,
      v,
      h,
      d,
      _,
      k,
      b,
      g,
      w,
      x,
      A,
      P = u.type;

  if (void 0 !== u.constructor) return null;
  null != i.__h && (s = i.__h, e = u.__e = i.__e, u.__h = null, r = [e]), (a = n.__b) && a(u);

  try {
    n: if ("function" == typeof P) {
      if (g = u.props, w = (a = P.contextType) && t[a.__c], x = a ? w ? w.props.value : a.__ : t, i.__c ? b = (v = u.__c = i.__c).__ = v.__E : ("prototype" in P && P.prototype.render ? u.__c = v = new P(g, x) : (u.__c = v = new p(g, x), v.constructor = P, v.render = M), w && w.sub(v), v.props = g, v.state || (v.state = {}), v.context = x, v.__n = t, h = v.__d = !0, v.__h = []), null == v.__s && (v.__s = v.state), null != P.getDerivedStateFromProps && (v.__s == v.state && (v.__s = c({}, v.__s)), c(v.__s, P.getDerivedStateFromProps(g, v.__s))), d = v.props, _ = v.state, h) null == P.getDerivedStateFromProps && null != v.componentWillMount && v.componentWillMount(), null != v.componentDidMount && v.__h.push(v.componentDidMount);else {
        if (null == P.getDerivedStateFromProps && g !== d && null != v.componentWillReceiveProps && v.componentWillReceiveProps(g, x), !v.__e && null != v.shouldComponentUpdate && !1 === v.shouldComponentUpdate(g, v.__s, x) || u.__v === i.__v) {
          v.props = g, v.state = v.__s, u.__v !== i.__v && (v.__d = !1), v.__v = u, u.__e = i.__e, u.__k = i.__k, u.__k.forEach(function (n) {
            n && (n.__ = u);
          }), v.__h.length && f.push(v);
          break n;
        }

        null != v.componentWillUpdate && v.componentWillUpdate(g, v.__s, x), null != v.componentDidUpdate && v.__h.push(function () {
          v.componentDidUpdate(d, _, k);
        });
      }
      v.context = x, v.props = g, v.state = v.__s, (a = n.__r) && a(u), v.__d = !1, v.__v = u, v.__P = l, a = v.render(v.props, v.state, v.context), v.state = v.__s, null != v.getChildContext && (t = c(c({}, t), v.getChildContext())), h || null == v.getSnapshotBeforeUpdate || (k = v.getSnapshotBeforeUpdate(d, _)), A = null != a && a.type === y && null == a.key ? a.props.children : a, m(l, Array.isArray(A) ? A : [A], u, i, t, o, r, f, e, s), v.base = u.__e, u.__h = null, v.__h.length && f.push(v), b && (v.__E = v.__ = null), v.__e = !1;
    } else null == r && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = j(i.__e, u, i, t, o, r, f, s);

    (a = n.diffed) && a(u);
  } catch (l) {
    u.__v = null, (s || null != r) && (u.__e = e, u.__h = !!s, r[r.indexOf(e)] = null), n.__e(l, u, i);
  }
}

function T(l, u) {
  n.__c && n.__c(u, l), l.some(function (u) {
    try {
      l = u.__h, u.__h = [], l.some(function (n) {
        n.call(u);
      });
    } catch (l) {
      n.__e(l, u.__v);
    }
  });
}

function j(n, l, u, i, t, o, e, c) {
  var a,
      v,
      h,
      y,
      p = u.props,
      d = l.props,
      _ = l.type,
      k = 0;
  if ("svg" === _ && (t = !0), null != o) for (; k < o.length; k++) {
    if ((a = o[k]) && (a === n || (_ ? a.localName == _ : 3 == a.nodeType))) {
      n = a, o[k] = null;
      break;
    }
  }

  if (null == n) {
    if (null === _) return document.createTextNode(d);
    n = t ? document.createElementNS("http://www.w3.org/2000/svg", _) : document.createElement(_, d.is && d), o = null, c = !1;
  }

  if (null === _) p === d || c && n.data === d || (n.data = d);else {
    if (o = o && f.slice.call(n.childNodes), v = (p = u.props || r).dangerouslySetInnerHTML, h = d.dangerouslySetInnerHTML, !c) {
      if (null != o) for (p = {}, y = 0; y < n.attributes.length; y++) {
        p[n.attributes[y].name] = n.attributes[y].value;
      }
      (h || v) && (h && (v && h.__html == v.__html || h.__html === n.innerHTML) || (n.innerHTML = h && h.__html || ""));
    }

    if (A(n, d, p, t, c), h) l.__k = [];else if (k = l.props.children, m(n, Array.isArray(k) ? k : [k], l, u, i, t && "foreignObject" !== _, o, e, n.firstChild, c), null != o) for (k = o.length; k--;) {
      null != o[k] && s(o[k]);
    }
    c || ("value" in d && void 0 !== (k = d.value) && (k !== n.value || "progress" === _ && !k) && C(n, "value", k, p.value, !1), "checked" in d && void 0 !== (k = d.checked) && k !== n.checked && C(n, "checked", k, p.checked, !1));
  }
  return n;
}

function z(l, u, i) {
  try {
    "function" == typeof l ? l(u) : l.current = u;
  } catch (l) {
    n.__e(l, i);
  }
}

function L(l, u, i) {
  var t, o, r;

  if (n.unmount && n.unmount(l), (t = l.ref) && (t.current && t.current !== l.__e || z(t, null, u)), i || "function" == typeof l.type || (i = null != (o = l.__e)), l.__e = l.__d = void 0, null != (t = l.__c)) {
    if (t.componentWillUnmount) try {
      t.componentWillUnmount();
    } catch (l) {
      n.__e(l, u);
    }
    t.base = t.__P = null;
  }

  if (t = l.__k) for (r = 0; r < t.length; r++) {
    t[r] && L(t[r], u, i);
  }
  null != o && s(o);
}

function M(n, l, u) {
  return this.constructor(n, u);
}

function N(l, u, i) {
  var t, o, e;
  n.__ && n.__(l, u), o = (t = "function" == typeof i) ? null : i && i.__k || u.__k, e = [], I(u, l = (!t && i || u).__k = a(y, null, [l]), o || r, r, void 0 !== u.ownerSVGElement, !t && i ? [i] : o ? null : u.firstChild ? f.slice.call(u.childNodes) : null, e, !t && i ? i : o ? o.__e : u.firstChild, t), T(e, l);
}

function O(n, l) {
  N(n, l, O);
}

function S(n, l, u) {
  var i,
      t,
      o,
      r = arguments,
      f = c({}, n.props);

  for (o in l) {
    "key" == o ? i = l[o] : "ref" == o ? t = l[o] : f[o] = l[o];
  }

  if (arguments.length > 3) for (u = [u], o = 3; o < arguments.length; o++) {
    u.push(r[o]);
  }
  return null != u && (f.children = u), v(n.type, f, i || n.key, t || n.ref, null);
}

function q(n, l) {
  var u = {
    __c: l = "__cC" + o++,
    __: n,
    Consumer: function Consumer(n, l) {
      return n.children(l);
    },
    Provider: function Provider(n) {
      var u, i;
      return this.getChildContext || (u = [], (i = {})[l] = this, this.getChildContext = function () {
        return i;
      }, this.shouldComponentUpdate = function (n) {
        this.props.value !== n.value && u.some(k);
      }, this.sub = function (n) {
        u.push(n);
        var l = n.componentWillUnmount;

        n.componentWillUnmount = function () {
          u.splice(u.indexOf(n), 1), l && l.call(n);
        };
      }), n.children;
    }
  };
  return u.Provider.__ = u.Consumer.contextType = u;
}

n = {
  __e: function __e(n, l) {
    for (var u, i, t; l = l.__;) {
      if ((u = l.__c) && !u.__) try {
        if ((i = u.constructor) && null != i.getDerivedStateFromError && (u.setState(i.getDerivedStateFromError(n)), t = u.__d), null != u.componentDidCatch && (u.componentDidCatch(n), t = u.__d), t) return u.__E = u;
      } catch (l) {
        n = l;
      }
    }

    throw n;
  },
  __v: 0
}, p.prototype.setState = function (n, l) {
  var u;
  u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = c({}, this.state), "function" == typeof n && (n = n(c({}, u), this.props)), n && c(u, n), null != n && this.__v && (l && this.__h.push(l), k(this));
}, p.prototype.forceUpdate = function (n) {
  this.__v && (this.__e = !0, n && this.__h.push(n), k(this));
}, p.prototype.render = y, u = [], i = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, b.__r = 0, o = 0;

var t$1,
    u$1,
    r$1,
    o$1 = 0,
    i$1 = [],
    c$1 = n.__b,
    f$1 = n.__r,
    e$1 = n.diffed,
    a$1 = n.__c,
    v$1 = n.unmount;

function m$1(t, r) {
  n.__h && n.__h(u$1, t, o$1 || r), o$1 = 0;
  var i = u$1.__H || (u$1.__H = {
    __: [],
    __h: []
  });
  return t >= i.__.length && i.__.push({}), i.__[t];
}

function l(n) {
  return o$1 = 1, p$1(w$1, n);
}

function p$1(n, r, o) {
  var i = m$1(t$1++, 2);
  return i.t = n, i.__c || (i.__ = [o ? o(r) : w$1(void 0, r), function (n) {
    var t = i.t(i.__[0], n);
    i.__[0] !== t && (i.__ = [t, i.__[1]], i.__c.setState({}));
  }], i.__c = u$1), i.__;
}

function y$1(r, o) {
  var i = m$1(t$1++, 3);
  !n.__s && k$1(i.__H, o) && (i.__ = r, i.__H = o, u$1.__H.__h.push(i));
}

function h$1(r, o) {
  var i = m$1(t$1++, 4);
  !n.__s && k$1(i.__H, o) && (i.__ = r, i.__H = o, u$1.__h.push(i));
}

function s$1(n) {
  return o$1 = 5, d$1(function () {
    return {
      current: n
    };
  }, []);
}

function _$1(n, t, u) {
  o$1 = 6, h$1(function () {
    "function" == typeof n ? n(t()) : n && (n.current = t());
  }, null == u ? u : u.concat(n));
}

function d$1(n, u) {
  var r = m$1(t$1++, 7);
  return k$1(r.__H, u) && (r.__ = n(), r.__H = u, r.__h = n), r.__;
}

function A$1(n, t) {
  return o$1 = 8, d$1(function () {
    return n;
  }, t);
}

function F(n) {
  var r = u$1.context[n.__c],
      o = m$1(t$1++, 9);
  return o.__c = n, r ? (null == o.__ && (o.__ = !0, r.sub(u$1)), r.props.value) : n.__;
}

function T$1(t, u) {
  n.useDebugValue && n.useDebugValue(u ? u(t) : t);
}

function x$1() {
  i$1.forEach(function (t) {
    if (t.__P) try {
      t.__H.__h.forEach(g$1), t.__H.__h.forEach(j$1), t.__H.__h = [];
    } catch (u) {
      t.__H.__h = [], n.__e(u, t.__v);
    }
  }), i$1 = [];
}

n.__b = function (n) {
  u$1 = null, c$1 && c$1(n);
}, n.__r = function (n) {
  f$1 && f$1(n), t$1 = 0;
  var r = (u$1 = n.__c).__H;
  r && (r.__h.forEach(g$1), r.__h.forEach(j$1), r.__h = []);
}, n.diffed = function (t) {
  e$1 && e$1(t);
  var o = t.__c;
  o && o.__H && o.__H.__h.length && (1 !== i$1.push(o) && r$1 === n.requestAnimationFrame || ((r$1 = n.requestAnimationFrame) || function (n) {
    var t,
        u = function u() {
      clearTimeout(r), b$1 && cancelAnimationFrame(t), setTimeout(n);
    },
        r = setTimeout(u, 100);

    b$1 && (t = requestAnimationFrame(u));
  })(x$1)), u$1 = void 0;
}, n.__c = function (t, u) {
  u.some(function (t) {
    try {
      t.__h.forEach(g$1), t.__h = t.__h.filter(function (n) {
        return !n.__ || j$1(n);
      });
    } catch (r) {
      u.some(function (n) {
        n.__h && (n.__h = []);
      }), u = [], n.__e(r, t.__v);
    }
  }), a$1 && a$1(t, u);
}, n.unmount = function (t) {
  v$1 && v$1(t);
  var u = t.__c;
  if (u && u.__H) try {
    u.__H.__.forEach(g$1);
  } catch (t) {
    n.__e(t, u.__v);
  }
};
var b$1 = "function" == typeof requestAnimationFrame;

function g$1(n) {
  var t = u$1;
  "function" == typeof n.__c && n.__c(), u$1 = t;
}

function j$1(n) {
  var t = u$1;
  n.__c = n.__(), u$1 = t;
}

function k$1(n, t) {
  return !n || n.length !== t.length || t.some(function (t, u) {
    return t !== n[u];
  });
}

function w$1(n, t) {
  return "function" == typeof t ? t(n) : t;
}

function C$1(n, t) {
  for (var e in t) {
    n[e] = t[e];
  }

  return n;
}

function S$1(n, t) {
  for (var e in n) {
    if ("__source" !== e && !(e in t)) return !0;
  }

  for (var r in t) {
    if ("__source" !== r && n[r] !== t[r]) return !0;
  }

  return !1;
}

function E(n) {
  this.props = n;
}

function g$2(n, t) {
  function e(n) {
    var e = this.props.ref,
        r = e == n.ref;
    return !r && e && (e.call ? e(null) : e.current = null), t ? !t(this.props, n) || !r : S$1(this.props, n);
  }

  function r(t) {
    return this.shouldComponentUpdate = e, a(n, t);
  }

  return r.displayName = "Memo(" + (n.displayName || n.name) + ")", r.prototype.isReactComponent = !0, r.__f = !0, r;
}

(E.prototype = new p()).isPureReactComponent = !0, E.prototype.shouldComponentUpdate = function (n, t) {
  return S$1(this.props, n) || S$1(this.state, t);
};
var w$2 = n.__b;

n.__b = function (n) {
  n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), w$2 && w$2(n);
};

var R = "undefined" != typeof Symbol && Symbol["for"] && Symbol["for"]("react.forward_ref") || 3911;

function x$2(n) {
  function t(t, e) {
    var r = C$1({}, t);
    return delete r.ref, n(r, (e = t.ref || e) && ("object" != typeof e || "current" in e) ? e : null);
  }

  return t.$$typeof = R, t.render = t, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (n.displayName || n.name) + ")", t;
}

var N$1 = function N(n, t) {
  return null == n ? null : w(w(n).map(t));
},
    k$2 = {
  map: N$1,
  forEach: N$1,
  count: function count(n) {
    return n ? w(n).length : 0;
  },
  only: function only(n) {
    var t = w(n);
    if (1 !== t.length) throw "Children.only";
    return t[0];
  },
  toArray: w
},
    A$2 = n.__e;

n.__e = function (n, t, e) {
  if (n.then) for (var r, u = t; u = u.__;) {
    if ((r = u.__c) && r.__c) return null == t.__e && (t.__e = e.__e, t.__k = e.__k), r.__c(n, t);
  }
  A$2(n, t, e);
};

var O$1 = n.unmount;

function L$1() {
  this.__u = 0, this.t = null, this.__b = null;
}

function U(n) {
  var t = n.__.__c;
  return t && t.__e && t.__e(n);
}

function D(n) {
  var t, e, r;

  function u(u) {
    if (t || (t = n()).then(function (n) {
      e = n["default"] || n;
    }, function (n) {
      r = n;
    }), r) throw r;
    if (!e) throw t;
    return a(e, u);
  }

  return u.displayName = "Lazy", u.__f = !0, u;
}

function F$1() {
  this.u = null, this.o = null;
}

n.unmount = function (n) {
  var t = n.__c;
  t && t.__R && t.__R(), t && !0 === n.__h && (n.type = null), O$1 && O$1(n);
}, (L$1.prototype = new p()).__c = function (n, t) {
  var e = t.__c,
      r = this;
  null == r.t && (r.t = []), r.t.push(e);

  var u = U(r.__v),
      o = !1,
      i = function i() {
    o || (o = !0, e.__R = null, u ? u(l) : l());
  };

  e.__R = i;

  var l = function l() {
    if (! --r.__u) {
      if (r.state.__e) {
        var n = r.state.__e;

        r.__v.__k[0] = function n(t, e, r) {
          return t && (t.__v = null, t.__k = t.__k && t.__k.map(function (t) {
            return n(t, e, r);
          }), t.__c && t.__c.__P === e && (t.__e && r.insertBefore(t.__e, t.__d), t.__c.__e = !0, t.__c.__P = r)), t;
        }(n, n.__c.__P, n.__c.__O);
      }

      var t;

      for (r.setState({
        __e: r.__b = null
      }); t = r.t.pop();) {
        t.forceUpdate();
      }
    }
  },
      f = !0 === t.__h;

  r.__u++ || f || r.setState({
    __e: r.__b = r.__v.__k[0]
  }), n.then(i, i);
}, L$1.prototype.componentWillUnmount = function () {
  this.t = [];
}, L$1.prototype.render = function (n, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var e = document.createElement("div"),
          r = this.__v.__k[0].__c;

      this.__v.__k[0] = function n(t, e, r) {
        return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function (n) {
          "function" == typeof n.__c && n.__c();
        }), t.__c.__H = null), null != (t = C$1({}, t)).__c && (t.__c.__P === r && (t.__c.__P = e), t.__c = null), t.__k = t.__k && t.__k.map(function (t) {
          return n(t, e, r);
        })), t;
      }(this.__b, e, r.__O = r.__P);
    }

    this.__b = null;
  }

  var u = t.__e && a(y, null, n.fallback);
  return u && (u.__h = null), [a(y, null, t.__e ? null : n.children), u];
};

var M$1 = function M(n, t, e) {
  if (++e[1] === e[0] && n.o["delete"](t), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.o.size)) for (e = n.u; e;) {
    for (; e.length > 3;) {
      e.pop()();
    }

    if (e[1] < e[0]) break;
    n.u = e = e[2];
  }
};

function T$2(n) {
  return this.getChildContext = function () {
    return n.context;
  }, n.children;
}

function j$2(n) {
  var t = this,
      e = n.i;
  t.componentWillUnmount = function () {
    N(null, t.l), t.l = null, t.i = null;
  }, t.i && t.i !== e && t.componentWillUnmount(), n.__v ? (t.l || (t.i = e, t.l = {
    nodeType: 1,
    parentNode: e,
    childNodes: [],
    appendChild: function appendChild(n) {
      this.childNodes.push(n), t.i.appendChild(n);
    },
    insertBefore: function insertBefore(n, e) {
      this.childNodes.push(n), t.i.appendChild(n);
    },
    removeChild: function removeChild(n) {
      this.childNodes.splice(this.childNodes.indexOf(n) >>> 1, 1), t.i.removeChild(n);
    }
  }), N(a(T$2, {
    context: t.context
  }, n.__v), t.l)) : t.l && t.componentWillUnmount();
}

function I$1(n, t) {
  return a(j$2, {
    __v: n,
    i: t
  });
}

(F$1.prototype = new p()).__e = function (n) {
  var t = this,
      e = U(t.__v),
      r = t.o.get(n);
  return r[0]++, function (u) {
    var o = function o() {
      t.props.revealOrder ? (r.push(u), M$1(t, n, r)) : u();
    };

    e ? e(o) : o();
  };
}, F$1.prototype.render = function (n) {
  this.u = null, this.o = new Map();
  var t = w(n.children);
  n.revealOrder && "b" === n.revealOrder[0] && t.reverse();

  for (var e = t.length; e--;) {
    this.o.set(t[e], this.u = [1, 0, this.u]);
  }

  return n.children;
}, F$1.prototype.componentDidUpdate = F$1.prototype.componentDidMount = function () {
  var n = this;
  this.o.forEach(function (t, e) {
    M$1(n, e, t);
  });
};

var W = "undefined" != typeof Symbol && Symbol["for"] && Symbol["for"]("react.element") || 60103,
    P$1 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,
    V = function V(n) {
  return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(n);
};

function z$1(n, t, e) {
  return null == t.__k && (t.textContent = ""), N(n, t), "function" == typeof e && e(), n ? n.__c : null;
}

function B(n, t, e) {
  return O(n, t), "function" == typeof e && e(), n ? n.__c : null;
}

p.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function (n) {
  Object.defineProperty(p.prototype, n, {
    configurable: !0,
    get: function get() {
      return this["UNSAFE_" + n];
    },
    set: function set(t) {
      Object.defineProperty(this, n, {
        configurable: !0,
        writable: !0,
        value: t
      });
    }
  });
});
var H$1 = n.event;

function Z() {}

function Y() {
  return this.cancelBubble;
}

function $$1() {
  return this.defaultPrevented;
}

n.event = function (n) {
  return H$1 && (n = H$1(n)), n.persist = Z, n.isPropagationStopped = Y, n.isDefaultPrevented = $$1, n.nativeEvent = n;
};

var q$1,
    G = {
  configurable: !0,
  get: function get() {
    return this["class"];
  }
},
    J = n.vnode;

n.vnode = function (n) {
  var t = n.type,
      e = n.props,
      r = e;

  if ("string" == typeof t) {
    for (var u in r = {}, e) {
      var o = e[u];
      "value" === u && "defaultValue" in e && null == o || ("defaultValue" === u && "value" in e && null == e.value ? u = "value" : "download" === u && !0 === o ? o = "" : /ondoubleclick/i.test(u) ? u = "ondblclick" : /^onchange(textarea|input)/i.test(u + t) && !V(e.type) ? u = "oninput" : /^on(Ani|Tra|Tou|BeforeInp)/.test(u) ? u = u.toLowerCase() : P$1.test(u) ? u = u.replace(/[A-Z0-9]/, "-$&").toLowerCase() : null === o && (o = void 0), r[u] = o);
    }

    "select" == t && r.multiple && Array.isArray(r.value) && (r.value = w(e.children).forEach(function (n) {
      n.props.selected = -1 != r.value.indexOf(n.props.value);
    })), "select" == t && null != r.defaultValue && (r.value = w(e.children).forEach(function (n) {
      n.props.selected = r.multiple ? -1 != r.defaultValue.indexOf(n.props.value) : r.defaultValue == n.props.value;
    })), n.props = r;
  }

  t && e["class"] != e.className && (G.enumerable = "className" in e, null != e.className && (r["class"] = e.className), Object.defineProperty(r, "className", G)), n.$$typeof = W, J && J(n);
};

var K = n.__r;

n.__r = function (n) {
  K && K(n), q$1 = n.__c;
};

var Q = {
  ReactCurrentDispatcher: {
    current: {
      readContext: function readContext(n) {
        return q$1.__n[n.__c].props.value;
      }
    }
  }
};

var on = "object" == typeof performance && "function" == typeof performance.now ? performance.now.bind(performance) : function () {
  return Date.now();
};

function fn(n) {
  return a.bind(null, n);
}

function cn(n) {
  return !!n && n.$$typeof === W;
}

function an(n) {
  return cn(n) ? S.apply(null, arguments) : n;
}

function sn(n) {
  return !!n.__k && (N(null, n), !0);
}

function hn(n) {
  return n && (n.base || 1 === n.nodeType && n) || null;
}

var pn = function pn(n, t) {
  return n(t);
};

var React = {
  useState: l,
  useReducer: p$1,
  useEffect: y$1,
  useLayoutEffect: h$1,
  useRef: s$1,
  useImperativeHandle: _$1,
  useMemo: d$1,
  useCallback: A$1,
  useContext: F,
  useDebugValue: T$1,
  version: "16.8.0",
  Children: k$2,
  render: z$1,
  hydrate: B,
  unmountComponentAtNode: sn,
  createPortal: I$1,
  createElement: a,
  createContext: q,
  createFactory: fn,
  cloneElement: an,
  createRef: h,
  Fragment: y,
  isValidElement: cn,
  findDOMNode: hn,
  Component: p,
  PureComponent: E,
  memo: g$2,
  forwardRef: x$2,
  unstable_batchedUpdates: pn,
  StrictMode: y,
  Suspense: L$1,
  SuspenseList: F$1,
  lazy: D,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Q
};

function open(uri) {
  browser.toString(uri, {
    type: "terminal"
  }).then(console.log);
}

var WALLETCONNECT_STYLE_SHEET = ":root {\n  --animation-duration: 300ms;\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes fadeOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n.animated {\n  animation-duration: var(--animation-duration);\n  animation-fill-mode: both;\n}\n\n.fadeIn {\n  animation-name: fadeIn;\n}\n\n.fadeOut {\n  animation-name: fadeOut;\n}\n\n#walletconnect-wrapper {\n  -webkit-user-select: none;\n  align-items: center;\n  display: flex;\n  height: 100%;\n  justify-content: center;\n  left: 0;\n  pointer-events: none;\n  position: fixed;\n  top: 0;\n  user-select: none;\n  width: 100%;\n  z-index: 99999999999999;\n}\n\n.walletconnect-modal__headerLogo {\n  height: 21px;\n}\n\n.walletconnect-modal__header p {\n  color: #ffffff;\n  font-size: 20px;\n  font-weight: 600;\n  margin: 0;\n  align-items: flex-start;\n  display: flex;\n  flex: 1;\n  margin-left: 5px;\n}\n\n.walletconnect-modal__close__wrapper {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  z-index: 10000;\n  background: white;\n  border-radius: 26px;\n  padding: 6px;\n  box-sizing: border-box;\n  width: 26px;\n  height: 26px;\n  cursor: pointer;\n}\n\n.walletconnect-modal__close__icon {\n  position: relative;\n  top: 7px;\n  right: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transform: rotate(45deg);\n}\n\n.walletconnect-modal__close__line1 {\n  position: absolute;\n  width: 100%;\n  border: 1px solid rgb(48, 52, 59);\n}\n\n.walletconnect-modal__close__line2 {\n  position: absolute;\n  width: 100%;\n  border: 1px solid rgb(48, 52, 59);\n  transform: rotate(90deg);\n}\n\n.walletconnect-qrcode__base {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  background: rgba(37, 41, 46, 0.95);\n  height: 100%;\n  left: 0;\n  pointer-events: auto;\n  position: fixed;\n  top: 0;\n  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);\n  width: 100%;\n  will-change: opacity;\n  padding: 40px;\n  box-sizing: border-box;\n}\n\n.walletconnect-qrcode__text {\n  color: rgba(60, 66, 82, 0.6);\n  font-size: 16px;\n  font-weight: 600;\n  letter-spacing: 0;\n  line-height: 1.1875em;\n  margin: 10px 0 30px 0;\n  text-align: center;\n  width: 100%;\n}\n\n@media only screen and (max-width: 768px) {\n  .walletconnect-qrcode__text {\n    font-size: 4vw;\n  }\n}\n\n@media only screen and (max-width: 320px) {\n  .walletconnect-qrcode__text {\n    font-size: 14px;\n  }\n}\n\n.walletconnect-qrcode__image {\n  width: calc(100% - 30px);\n  box-sizing: border-box;\n  cursor: none;\n  margin: 0 auto;\n}\n\n.walletconnect-qrcode__notification {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  font-size: 16px;\n  padding: 16px 20px;\n  border-radius: 16px;\n  text-align: center;\n  transition: all 0.1s ease-in-out;\n  background: white;\n  color: black;\n  margin-bottom: -60px;\n  opacity: 0;\n}\n\n.walletconnect-qrcode__notification.notification__show {\n  opacity: 1;\n}\n\n@media only screen and (max-width: 768px) {\n  .walletconnect-modal__header {\n    height: 130px;\n  }\n  .walletconnect-modal__base {\n    overflow: auto;\n  }\n}\n\n@media only screen and (min-device-width: 415px) and (max-width: 768px) {\n  #content {\n    max-width: 768px;\n    box-sizing: border-box;\n  }\n}\n\n@media only screen and (min-width: 375px) and (max-width: 415px) {\n  #content {\n    max-width: 414px;\n    box-sizing: border-box;\n  }\n}\n\n@media only screen and (min-width: 320px) and (max-width: 375px) {\n  #content {\n    max-width: 375px;\n    box-sizing: border-box;\n  }\n}\n\n@media only screen and (max-width: 320px) {\n  #content {\n    max-width: 320px;\n    box-sizing: border-box;\n  }\n}\n\n.walletconnect-modal__base {\n  -webkit-font-smoothing: antialiased;\n  background: #ffffff;\n  border-radius: 24px;\n  box-shadow: 0 10px 50px 5px rgba(0, 0, 0, 0.4);\n  font-family: ui-rounded, \"SF Pro Rounded\", \"SF Pro Text\", medium-content-sans-serif-font,\n    -apple-system, BlinkMacSystemFont, ui-sans-serif, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell,\n    \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  margin-top: 41px;\n  padding: 24px 24px 22px;\n  pointer-events: auto;\n  position: relative;\n  text-align: center;\n  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);\n  will-change: transform;\n  overflow: visible;\n  transform: translateY(-50%);\n  top: 50%;\n  max-width: 500px;\n  margin: auto;\n}\n\n@media only screen and (max-width: 320px) {\n  .walletconnect-modal__base {\n    padding: 24px 12px;\n  }\n}\n\n.walletconnect-modal__base .hidden {\n  transform: translateY(150%);\n  transition: 0.125s cubic-bezier(0.4, 0, 1, 1);\n}\n\n.walletconnect-modal__header {\n  align-items: center;\n  display: flex;\n  height: 26px;\n  left: 0;\n  justify-content: space-between;\n  position: absolute;\n  top: -42px;\n  width: 100%;\n}\n\n.walletconnect-modal__base .wc-logo {\n  align-items: center;\n  display: flex;\n  height: 26px;\n  margin-top: 15px;\n  padding-bottom: 15px;\n  pointer-events: auto;\n}\n\n.walletconnect-modal__base .wc-logo div {\n  background-color: #3399ff;\n  height: 21px;\n  margin-right: 5px;\n  mask-image: url(\"images/wc-logo.svg\") center no-repeat;\n  width: 32px;\n}\n\n.walletconnect-modal__base .wc-logo p {\n  color: #ffffff;\n  font-size: 20px;\n  font-weight: 600;\n  margin: 0;\n}\n\n.walletconnect-modal__base h2 {\n  color: rgba(60, 66, 82, 0.6);\n  font-size: 16px;\n  font-weight: 600;\n  letter-spacing: 0;\n  line-height: 1.1875em;\n  margin: 0 0 19px 0;\n  text-align: center;\n  width: 100%;\n}\n\n.walletconnect-modal__base__row {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  align-items: center;\n  border-radius: 20px;\n  cursor: pointer;\n  display: flex;\n  height: 56px;\n  justify-content: space-between;\n  padding: 0 15px;\n  position: relative;\n  margin: 0px 0px 8px;\n  text-align: left;\n  transition: 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  will-change: transform;\n  text-decoration: none;\n}\n\n.walletconnect-modal__base__row:hover {\n  background: rgba(60, 66, 82, 0.06);\n}\n\n.walletconnect-modal__base__row:active {\n  background: rgba(60, 66, 82, 0.06);\n  transform: scale(0.975);\n  transition: 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n\n.walletconnect-modal__base__row__h3 {\n  color: #25292e;\n  font-size: 20px;\n  font-weight: 700;\n  margin: 0;\n  padding-bottom: 3px;\n}\n\n.walletconnect-modal__base__row__right {\n  align-items: center;\n  display: flex;\n  justify-content: center;\n}\n\n.walletconnect-modal__base__row__right__app-icon {\n  border-radius: 8px;\n  height: 34px;\n  margin: 0 11px 2px 0;\n  width: 34px;\n  background-size: 100%;\n  box-shadow: 0 4px 12px 0 rgba(37, 41, 46, 0.25);\n}\n\n.walletconnect-modal__base__row__right__caret {\n  height: 18px;\n  opacity: 0.3;\n  transition: 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  width: 8px;\n  will-change: opacity;\n}\n\n.walletconnect-modal__base__row:hover .caret,\n.walletconnect-modal__base__row:active .caret {\n  opacity: 0.6;\n}\n\n.walletconnect-modal__mobile__toggle {\n  width: 80%;\n  display: flex;\n  margin: 0 auto;\n  position: relative;\n  overflow: hidden;\n  border-radius: 8px;\n  margin-bottom: 5vw;\n  background: #d4d5d9;\n}\n\n.walletconnect-modal__mobile__toggle_selector {\n  width: calc(50% - 8px);\n  background: white;\n  position: absolute;\n  border-radius: 5px;\n  height: calc(100% - 8px);\n  top: 4px;\n  transition: all 0.2s ease-in-out;\n  transform: translate3d(4px, 0, 0);\n}\n\n.walletconnect-modal__mobile__toggle.right__selected .walletconnect-modal__mobile__toggle_selector {\n  transform: translate3d(calc(100% + 12px), 0, 0);\n}\n\n.walletconnect-modal__mobile__toggle a {\n  font-size: 12px;\n  width: 50%;\n  text-align: center;\n  padding: 8px;\n  margin: 0;\n  font-weight: 600;\n  z-index: 1;\n}\n\n.walletconnect-modal__footer {\n  margin-top: 20px;\n}\n\n@media only screen and (max-width: 768px) {\n  .walletconnect-modal__footer {\n    margin-top: 5vw;\n  }\n}\n\n.walletconnect-modal__footer a {\n  cursor: pointer;\n  color: #898d97;\n  font-size: 15px;\n}\n\n@media only screen and (max-width: 320px) {\n  .walletconnect-modal__footer a {\n    font-size: 14px;\n  }\n}\n\n.walletconnect-connect__buttons__wrapper {\n  max-height: 44vh;\n}\n\n.walletconnect-connect__buttons__wrapper__android {\n  margin: 50% 0;\n}\n\n.walletconnect-connect__buttons__wrapper__wrap {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  margin-top: 20px;\n  margin-bottom: 10px;\n}\n\n@media only screen and (min-width: 768px) {\n  .walletconnect-connect__buttons__wrapper__wrap {\n    margin-top: 40px;\n  }\n}\n\n.walletconnect-connect__button {\n  background-color: rgb(64, 153, 255);\n  padding: 12px;\n  border-radius: 8px;\n  text-decoration: none;\n  color: rgb(255, 255, 255);\n  font-weight: 500;\n}\n\n.walletconnect-connect__button__icon_anchor {\n  cursor: pointer;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  margin: 8px;\n  width: 42px;\n  justify-self: center;\n  flex-direction: column;\n  text-decoration: none !important;\n}\n\n@media only screen and (max-width: 320px) {\n  .walletconnect-connect__button__icon_anchor {\n    margin: 4px;\n  }\n}\n\n.walletconnect-connect__button__icon {\n  border-radius: 10px;\n  height: 42px;\n  margin: 0;\n  width: 42px;\n  box-shadow: 0 4px 12px 0 rgba(37, 41, 46, 0.25);\n}\n\n.walletconnect-connect__button__text {\n  color: #424952;\n  font-size: 2.7vw;\n  text-decoration: none !important;\n  padding: 0;\n  margin-top: 1.8vw;\n  font-weight: 600;\n}\n\n@media only screen and (min-width: 768px) {\n  .walletconnect-connect__button__text {\n    font-size: 16px;\n    margin-top: 12px;\n  }\n}\n";
var WALLETCONNECT_LOGO_SVG_URL = "data:image/svg+xml,%3C?xml version='1.0' encoding='UTF-8'?%3E %3Csvg width='300px' height='185px' viewBox='0 0 300 185' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch --%3E %3Ctitle%3EWalletConnect%3C/title%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cdefs%3E%3C/defs%3E %3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E %3Cg id='walletconnect-logo-alt' fill='%233B99FC' fill-rule='nonzero'%3E %3Cpath d='M61.4385429,36.2562612 C110.349767,-11.6319051 189.65053,-11.6319051 238.561752,36.2562612 L244.448297,42.0196786 C246.893858,44.4140867 246.893858,48.2961898 244.448297,50.690599 L224.311602,70.406102 C223.088821,71.6033071 221.106302,71.6033071 219.883521,70.406102 L211.782937,62.4749541 C177.661245,29.0669724 122.339051,29.0669724 88.2173582,62.4749541 L79.542302,70.9685592 C78.3195204,72.1657633 76.337001,72.1657633 75.1142214,70.9685592 L54.9775265,51.2530561 C52.5319653,48.8586469 52.5319653,44.9765439 54.9775265,42.5821357 L61.4385429,36.2562612 Z M280.206339,77.0300061 L298.128036,94.5769031 C300.573585,96.9713 300.573599,100.85338 298.128067,103.247793 L217.317896,182.368927 C214.872352,184.763353 210.907314,184.76338 208.461736,182.368989 C208.461726,182.368979 208.461714,182.368967 208.461704,182.368957 L151.107561,126.214385 C150.496171,125.615783 149.504911,125.615783 148.893521,126.214385 C148.893517,126.214389 148.893514,126.214393 148.89351,126.214396 L91.5405888,182.368927 C89.095052,184.763359 85.1300133,184.763399 82.6844276,182.369014 C82.6844133,182.369 82.684398,182.368986 82.6843827,182.36897 L1.87196327,103.246785 C-0.573596939,100.852377 -0.573596939,96.9702735 1.87196327,94.5758653 L19.7936929,77.028998 C22.2392531,74.6345898 26.2042918,74.6345898 28.6498531,77.028998 L86.0048306,133.184355 C86.6162214,133.782957 87.6074796,133.782957 88.2188704,133.184355 C88.2188796,133.184346 88.2188878,133.184338 88.2188969,133.184331 L145.571,77.028998 C148.016505,74.6345347 151.981544,74.6344449 154.427161,77.028798 C154.427195,77.0288316 154.427229,77.0288653 154.427262,77.028899 L211.782164,133.184331 C212.393554,133.782932 213.384814,133.782932 213.996204,133.184331 L271.350179,77.0300061 C273.79574,74.6355969 277.760778,74.6355969 280.206339,77.0300061 Z' id='WalletConnect'%3E%3C/path%3E %3C/g%3E %3C/g%3E %3C/svg%3E";
var WALLETCONNECT_HEADER_TEXT = "WalletConnect";
var ANIMATION_DURATION = 300;
var DEFAULT_BUTTON_COLOR = "rgb(64, 153, 255)";
var WALLETCONNECT_WRAPPER_ID = "walletconnect-wrapper";
var WALLETCONNECT_STYLE_ID = "walletconnect-style-sheet";
var WALLETCONNECT_MODAL_ID = "walletconnect-qrcode-modal";
var WALLETCONNECT_CLOSE_BUTTON_ID = "walletconnect-qrcode-close";
var WALLETCONNECT_CTA_TEXT_ID = "walletconnect-qrcode-text";
var WALLETCONNECT_CONNECT_BUTTON_ID = "walletconnect-connect-button";
var MOBILE_LINK_LOCALSTORAGE_KEY = "WALLETCONNECT_PERSISTED_MOBILE_LINK_CHOICE";

function Header(props) {
  return React.createElement("div", {
    className: "walletconnect-modal__header"
  }, React.createElement("img", {
    src: WALLETCONNECT_LOGO_SVG_URL,
    className: "walletconnect-modal__headerLogo"
  }), React.createElement("p", null, WALLETCONNECT_HEADER_TEXT), React.createElement("div", {
    className: "walletconnect-modal__close__wrapper",
    onClick: props.onClose
  }, React.createElement("div", {
    id: WALLETCONNECT_CLOSE_BUTTON_ID,
    className: "walletconnect-modal__close__icon"
  }, React.createElement("div", {
    className: "walletconnect-modal__close__line1"
  }), React.createElement("div", {
    className: "walletconnect-modal__close__line2"
  }))));
}

var MOBILE_REGISTRY = [{
  "name": "Rainbow",
  "shortName": "Rainbow",
  "color": "rgb(0, 30, 89)",
  "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAABYWlDQ1BrQ0dDb2xvclNwYWNlRGlzcGxheVAzAAAokWNgYFJJLCjIYWFgYMjNKykKcndSiIiMUmB/yMAOhLwMYgwKicnFBY4BAT5AJQwwGhV8u8bACKIv64LMOiU1tUm1XsDXYqbw1YuvRJsw1aMArpTU4mQg/QeIU5MLikoYGBhTgGzl8pICELsDyBYpAjoKyJ4DYqdD2BtA7CQI+whYTUiQM5B9A8hWSM5IBJrB+API1klCEk9HYkPtBQFul8zigpzESoUAYwKuJQOUpFaUgGjn/ILKosz0jBIFR2AopSp45iXr6SgYGRiaMzCAwhyi+nMgOCwZxc4gxJrvMzDY7v////9uhJjXfgaGjUCdXDsRYhoWDAyC3AwMJ3YWJBYlgoWYgZgpLY2B4dNyBgbeSAYG4QtAPdHFacZGYHlGHicGBtZ7//9/VmNgYJ/MwPB3wv//vxf9//93MVDzHQaGA3kAFSFl7jXH0fsAAACcZVhJZk1NACoAAAAIAAUBEgADAAAAAQABAAABGgAFAAAAAQAAAEoBGwAFAAAAAQAAAFIBMQACAAAAJAAAAFqHaQAEAAAAAQAAAH4AAAAAAAAASAAAAAEAAABIAAAAAUFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChNYWNpbnRvc2gpAAACoAIABAAAAAEAAAB4oAMABAAAAAEAAAB4AAAAAHcBEEsAAAAJcEhZcwAACxMAAAsTAQCanBgAAASYaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjQuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6NTFBODBGRjMzQjg0MTFFQUE4OEFDRjk1Q0U0Mjg1NTI8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPnhtcC5kaWQ6NTFBODBGRjQzQjg0MTFFQUE4OEFDRjk1Q0U0Mjg1NTI8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDo5ZWY3YjM0Ny1hZGY4LTRkMmYtYTVlMy1kNWExNjkwMDZmZmU8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkRlcml2ZWRGcm9tIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgPHN0UmVmOmluc3RhbmNlSUQ+eG1wLmlpZDo1NjZjZmI1ZC1lMWNjLTRlYWQtYjVjNi03ODhmZjlhNzkxNzc8L3N0UmVmOmluc3RhbmNlSUQ+CiAgICAgICAgICAgIDxzdFJlZjpkb2N1bWVudElEPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDowNzE3MjAwMC1jNTA2LTExNzgtOWFiMC1mYWMyNTUzYzdlYTg8L3N0UmVmOmRvY3VtZW50SUQ+CiAgICAgICAgIDwveG1wTU06RGVyaXZlZEZyb20+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Ctllm9AAAEAASURBVHgBjb3pk2fXed93fr9eBrNh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",
  "universalLink": "https://rnbwapp.com",
  "deepLink": "rainbow:"
}, {
  "name": "Trust Wallet",
  "shortName": "Trust",
  "color": "rgb(51, 117, 187)",
  "logo": "data:image/png;base64,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",
  "universalLink": "https://link.trustwallet.com",
  "deepLink": "trust:"
}, {
  "name": "Argent",
  "shortName": "Argent",
  "color": "rgb(255, 135, 91)",
  "logo": "data:image/png;base64,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",
  "universalLink": "https://argent.link/app",
  "deepLink": "argent://app"
}, {
  "name": "MetaMask",
  "shortName": "MetaMask",
  "color": "rgb(255, 255, 255)",
  "logo": "data:image/png;base64,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",
  "universalLink": "https://metamask.app.link",
  "deepLink": "metamask:"
}, {
  "name": "Crypto.com DeFi Wallet",
  "shortName": "Crypto.com",
  "color": "rgb(17, 153, 250)",
  "logo": "data:image/png;base64,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",
  "universalLink": "",
  "deepLink": "cryptowallet:"
}, {
  "name": "Pillar Wallet",
  "shortName": "Pillar",
  "color": "rgb(255, 255, 255)",
  "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAeKADAAQAAAABAAAAeAAAAAAI4lXuAAADdklEQVR4Ae3dS2oUURTG8RMfKD6Cojsw4ArEFYiIC3AkLkDjTPdgJg50CT524MglqODADTh24BsNYnuvUhASqroqdbS/+/m/EDt2Vd3c8/3qVDfpdLIWi41FMGwTOGBbGYX9TgBg8xMBYIDNEzAvjw4G2DwB8/LoYIDNEzAvjw4G2DwB8/LoYIDNEzAvjw4G2DwB8/LoYIDNEzAvjw4G2DwB8/LoYIDNEzAvjw4G2DwB8/LoYIDNEzAvjw7uA972eD8AwH3Az79GPHjft7WZ+wHuo6oNfPtd88gA9wF39zeODHAHOXTbMDLAQ7A7t1Xkh+09JgO8E3HZ55vtIQO8DHX39saQAd4NOOb/DSEfGlPPP93n0aeIZ1/mfcnLxyJurM+bY9nRFbmOW6f+3Ir+qwf86lvE08/z4jpzsADPm2LU0Q0gc4keJTmwk/jlGuABu9GbhJEBHq24ZMeK/Lg8fxAbAGeCvCzPH8QGwGIg2csBODtRsfkAFgPJXg7A2YmKzQewGEj2cgDOTlRsPoDFQLKXA3B2omLzASwGkr0cgLMTFZsPYDGQ7OXovR585XjE6fJ67pxx4cico62O1QO+VH4ao34wUhLgEp0So+4kAOvapKwM4JQYdScBWNcmZWUAp8SoOwnAujYpKwM4JUbdSQDWtUlZGcApMepOArCuTcrKAE6JUXcSgHVtUlYGcEqMupMArGuTsjKAU2LUnUTv9eAX5Q1cb7ZXn9jr76tfQ8IK9ICflLdg3v+QUBpT1AS4RJufBwADbJ6AeXl0MMDmCZiXRwcDbJ6AeXl0MMDmCZiXRwcDbJ6AeXl634s+d3h65NdPRpzfx3HTv9LwERePDm9fwVY94Jvl9y+//RGxNeHvI1w7EXG1vO2UsScBzcfge2cj7mr/ou09SYreoQlcwwI55ZTRBQb5PwDukO9wud6vtnYHd1VtlcdkkLs0Jt22AVxLAnkSbLdzO8Agd2aTbtsCBnkSbt25PWCQJyG3CQzyaGS9b1WOXnrZsT7xYgwmsBaLjfrHzNseH39GrLd7Mfqb4XukAm7vOeIB3FseGwA2PwcABtg8AfPy6GCAzRMwL48OBtg8AfPy6GCAzRMwL48OBtg8AfPy6GCAzRMwL48OBtg8AfPy6GCAzRMwL48OBtg8AfPy6GCAzRMwL48OBtg8AfPyfgHtr1K6++2nIgAAAABJRU5ErkJggg==",
  "universalLink": "",
  "deepLink": "pillarwallet:"
}, {
  "name": "imToken",
  "shortName": "imToken",
  "color": "rgb(255, 255, 255)",
  "logo": "data:image/png;base64,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",
  "universalLink": "",
  "deepLink": "imtokenv2:"
}, {
  "name": "TokenPocket",
  "shortName": "TokenPocket",
  "color": "rgb(41, 128, 254)",
  "logo": "data:image/png;base64,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",
  "universalLink": "",
  "deepLink": "tpoutside:"
}, {
  "name": "KyberSwap",
  "shortName": "KyberSwap",
  "color": "rgb(255, 255, 255)",
  "logo": "data:image/png;base64,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",
  "universalLink": "https://kyberswapnew.app.link",
  "deepLink": "kyberswap:"
}, {
  "name": "Nash",
  "shortName": "Nash",
  "color": "rgb(0,82,243)",
  "logo": "data:image/png;base64,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",
  "universalLink": "https://nash.io/walletconnect",
  "deepLink": "nash:"
}, {
  "name": "MYKEY",
  "shortName": "MYKEY",
  "color": "rgb(255, 255, 255)",
  "logo": "data:image/png;base64,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",
  "universalLink": "https://mykey.org",
  "deepLink": "mykeywalletconnect:"
}, {
  "name": "Math Wallet",
  "shortName": "Math",
  "color": "rgb(0, 30, 89)",
  "logo": "data:image/png;base64,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",
  "universalLink": "https://www.mathwallet.org",
  "deepLink": "mathwallet:"
}, {
  "name": "ZelCore",
  "shortName": "ZelCore",
  "color": "rgb(35, 34, 32)",
  "logo": "data:image/png;base64,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",
  "universalLink": "https://link.zel.network",
  "deepLink": "zel:"
}, {
  "name": "EasyPocket",
  "shortName": "EasyPocket",
  "color": "rgb(17, 93, 251)",
  "logo": "data:image/png;base64,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",
  "universalLink": "https://wallet.easypocket.app",
  "deepLink": "easypocket:"
}, {
  "name": "SparkPoint Wallet",
  "shortName": "SparkPoint",
  "color": "rgb(20,67,95)",
  "logo": "data:image/png;base64,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",
  "universalLink": "https://sparkpoint.io",
  "deepLink": "sparkpoint:"
}, {
  "name": "Flare Wallet",
  "shortName": "Flare",
  "color": "rgb(31, 36, 59)",
  "logo": "data:image/png;base64,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",
  "universalLink": "https://flarewallet.io",
  "deepLink": "flare:"
}, {
  "name": "ONTO",
  "shortName": "ONTO",
  "color": "rgb(255, 255, 255)",
  "logo": "data:image/png;base64,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",
  "universalLink": "https://onto.app",
  "deepLink": "ontoprovider:"
}, {
  "name": "SafePal Wallet",
  "shortName": "SafePal",
  "color": "rgb(0, 128, 255)",
  "logo": "data:image/png;base64,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",
  "universalLink": "link.safepal.io",
  "deepLink": "safepalwallet:"
}, {
  "name": "Huobi Wallet",
  "shortName": "Huobi",
  "color": "rgb(45,101,248)",
  "logo": "data:image/png;base64,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",
  "universalLink": "https://www.huobiwallet.com",
  "deepLink": "huobiwallet:"
}];

function ConnectButton(props) {
  return React.createElement("a", {
    className: "walletconnect-connect__button",
    href: props.href,
    id: WALLETCONNECT_CONNECT_BUTTON_ID + "-" + props.name,
    onClick: props.onClick,
    rel: "noopener noreferrer",
    style: {
      backgroundColor: props.color
    },
    target: "_blank"
  }, props.name);
}

var CARET_SVG_URL = "data:image/svg+xml,%3Csvg width='8' height='18' viewBox='0 0 8 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.586301 0.213898C0.150354 0.552968 0.0718197 1.18124 0.41089 1.61719L5.2892 7.88931C5.57007 8.25042 5.57007 8.75608 5.2892 9.11719L0.410889 15.3893C0.071819 15.8253 0.150353 16.4535 0.586301 16.7926C1.02225 17.1317 1.65052 17.0531 1.98959 16.6172L6.86791 10.3451C7.7105 9.26174 7.7105 7.74476 6.86791 6.66143L1.98959 0.38931C1.65052 -0.0466374 1.02225 -0.125172 0.586301 0.213898Z' fill='%233C4252'/%3E %3C/svg%3E";

function WalletButton(props) {
  var color = props.color;
  var href = props.href;
  var name = props.name;
  var logo = props.logo;
  var onClick = props.onClick;
  return React.createElement("a", {
    className: "walletconnect-modal__base__row",
    href: href,
    onClick: onClick,
    rel: "noopener noreferrer",
    target: "_blank"
  }, React.createElement("h3", {
    className: "walletconnect-modal__base__row__h3"
  }, name), React.createElement("div", {
    className: "walletconnect-modal__base__row__right"
  }, React.createElement("div", {
    className: "walletconnect-modal__base__row__right__app-icon",
    style: {
      background: "url('" + logo + "') " + color,
      backgroundSize: "100%"
    }
  }), React.createElement("img", {
    src: CARET_SVG_URL,
    className: "walletconnect-modal__base__row__right__caret"
  })));
}

function WalletIcon(props) {
  var color = props.color;
  var href = props.href;
  var name = props.name;
  var logo = props.logo;
  var onClick = props.onClick;
  return React.createElement("a", {
    className: "walletconnect-connect__button__icon_anchor",
    href: href,
    onClick: onClick,
    rel: "noopener noreferrer",
    target: "_blank"
  }, React.createElement("div", {
    className: "walletconnect-connect__button__icon",
    style: {
      background: "url('" + logo + "') " + color,
      backgroundSize: "100%"
    }
  }), React.createElement("div", {
    style: {
      fontSize: (name.length > 8 ? 2.5 : 2.7) + "vw"
    },
    className: "walletconnect-connect__button__text"
  }, name));
}

function detectEnv(userAgent) {
  return es.detect(userAgent);
}

function detectOS$1() {
  var env = detectEnv();
  return env && env.os ? env.os : undefined;
}

function isIOS() {
  var os = detectOS$1();
  return os ? os.toLowerCase().includes("ios") : false;
}

function isMobile() {
  var os = detectOS$1();
  return os ? os.toLowerCase().includes("android") || os.toLowerCase().includes("ios") : false;
}

function isNode() {
  var env = detectEnv();
  var result = env && env.name ? env.name.toLowerCase() === "node" : false;
  return result;
}

function setLocal(key, data) {
  var raw = cjs.safeJsonStringify(data);
  var local = cjs$1.getLocalStorage();

  if (local) {
    local.setItem(key, raw);
  }
}

function formatIOSMobile(uri, entry) {
  var encodedUri = encodeURIComponent(uri);
  return entry.universalLink ? entry.universalLink + "/wc?uri=" + encodedUri : entry.deepLink ? "" + entry.deepLink + (entry.deepLink.endsWith(":") ? "//" : "/") + "wc?uri=" + encodedUri : "";
}

function saveMobileLinkInfo(data) {
  var focusUri = data.href.split("?")[0];
  setLocal(MOBILE_LINK_LOCALSTORAGE_KEY, Object.assign({}, data, {
    href: focusUri
  }));
}

function getMobileRegistryEntry(name) {
  return MOBILE_REGISTRY.filter(function (entry) {
    return entry.name.toLowerCase().includes(name);
  })[0];
}

function getMobileLinkRegistry(qrcodeModalOptions) {
  var links = MOBILE_REGISTRY;

  if (qrcodeModalOptions && qrcodeModalOptions.mobileLinks && qrcodeModalOptions.mobileLinks.length) {
    links = qrcodeModalOptions.mobileLinks.map(function (name) {
      return getMobileRegistryEntry(name);
    });
  }

  return links;
}

function MobileLinkDisplay(props) {
  var ios = isIOS();
  var links = getMobileLinkRegistry(props.qrcodeModalOptions);
  var ref = React.useState(false);
  var showMore = ref[0];
  var setShowMore = ref[1];
  var grid = links.length > 5;
  var displayShowMore = links.length > 12;
  return React.createElement("div", null, React.createElement("p", {
    id: WALLETCONNECT_CTA_TEXT_ID,
    className: "walletconnect-qrcode__text"
  }, ios ? props.text.choose_preferred_wallet : props.text.connect_mobile_wallet), React.createElement("div", {
    className: "walletconnect-connect__buttons__wrapper" + (!ios ? "__android" : grid ? "__wrap" : "")
  }, ios ? links.map(function (entry, idx) {
    var color = entry.color;
    var name = entry.name;
    var shortName = entry.shortName;
    var logo = entry.logo;
    var href = formatIOSMobile(props.uri, entry);
    var handleClickIOS = React.useCallback(function () {
      saveMobileLinkInfo({
        name: name,
        href: href
      });
    }, []);

    if (idx > 11 && !showMore) {
      return;
    }

    return !grid ? React.createElement(WalletButton, {
      color: color,
      href: href,
      name: name,
      logo: logo,
      onClick: handleClickIOS
    }) : React.createElement(WalletIcon, {
      color: color,
      href: href,
      name: shortName,
      logo: logo,
      onClick: handleClickIOS
    });
  }) : React.createElement(ConnectButton, {
    name: props.text.connect,
    color: DEFAULT_BUTTON_COLOR,
    href: props.uri,
    onClick: React.useCallback(function () {
      saveMobileLinkInfo({
        name: "Unknown",
        href: props.uri
      });
    }, [])
  })), !!(ios && displayShowMore) && React.createElement("div", {
    className: "walletconnect-modal__footer"
  }, React.createElement("a", {
    onClick: function onClick() {
      return setShowMore(!showMore);
    }
  }, showMore ? props.text.show_less : props.text.show_more)));
}

function Notification(props) {
  var show = !!props.message.trim();
  return React.createElement("div", {
    className: "walletconnect-qrcode__notification" + (show ? " notification__show" : "")
  }, props.message);
}

var formatQRCodeImage = function formatQRCodeImage(data) {
  try {
    var result = "";
    return Promise.resolve(browser.toString(data, {
      margin: 0,
      type: "svg"
    })).then(function (dataString) {
      if (typeof dataString === "string") {
        result = dataString.replace("<svg", "<svg class=\"walletconnect-qrcode__image\"");
      }

      return result;
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

function QRCodeDisplay(props) {
  var ref = React.useState("");
  var notification = ref[0];
  var setNotification = ref[1];
  var ref$1 = React.useState("");
  var svg = ref$1[0];
  var setSvg = ref$1[1];
  React.useEffect(function () {
    try {
      return Promise.resolve(formatQRCodeImage(props.uri)).then(function (_formatQRCodeImage) {
        setSvg(_formatQRCodeImage);
      });
    } catch (e) {
      Promise.reject(e);
    }
  }, []);

  var copyToClipboard = function copyToClipboard() {
    var tmp = document.createElement("input");
    tmp.value = props.uri;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand("copy");
    tmp.remove();
    setNotification(props.text.copied_to_clipboard);
    setInterval(function () {
      return setNotification("");
    }, 1200);
  };

  return React.createElement("div", null, React.createElement("p", {
    id: WALLETCONNECT_CTA_TEXT_ID,
    className: "walletconnect-qrcode__text"
  }, props.text.scan_qrcode_with_wallet), React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: svg
    }
  }), React.createElement("div", {
    className: "walletconnect-modal__footer"
  }, React.createElement("a", {
    onClick: copyToClipboard
  }, props.text.copy_to_clipboard)), React.createElement(Notification, {
    message: notification
  }));
}

function Modal(props) {
  var mobile = isMobile();
  var ref = React.useState(!mobile);
  var displayQRCode = ref[0];
  var setDisplayQRCode = ref[1];
  var displayProps = {
    text: props.text,
    uri: props.uri,
    qrcodeModalOptions: props.qrcodeModalOptions
  };
  return React.createElement("div", {
    id: WALLETCONNECT_MODAL_ID,
    className: "walletconnect-qrcode__base animated fadeIn"
  }, React.createElement("div", {
    className: "walletconnect-modal__base"
  }, React.createElement(Header, {
    onClose: props.onClose
  }), mobile && React.createElement("div", {
    className: "walletconnect-modal__mobile__toggle" + (displayQRCode ? " right__selected" : "")
  }, React.createElement("div", {
    className: "walletconnect-modal__mobile__toggle_selector"
  }), React.createElement("a", {
    onClick: function onClick() {
      return setDisplayQRCode(false);
    }
  }, props.text.mobile), React.createElement("a", {
    onClick: function onClick() {
      return setDisplayQRCode(true);
    }
  }, props.text.qrcode)), React.createElement("div", null, displayQRCode ? React.createElement(QRCodeDisplay, Object.assign({}, displayProps)) : React.createElement(MobileLinkDisplay, Object.assign({}, displayProps)))));
}

var de = {
  choose_preferred_wallet: "Wähle bevorzugte Wallet",
  connect_mobile_wallet: "Verbinde mit Mobile Wallet",
  scan_qrcode_with_wallet: "Scanne den QR-code mit einer WalletConnect kompatiblen Wallet",
  connect: "Verbinden",
  qrcode: "QR-Code",
  mobile: "Mobile",
  copy_to_clipboard: "In die Zwischenablage kopieren",
  copied_to_clipboard: "In die Zwischenablage kopiert!",
  show_more: "Zeig mehr",
  show_less: "Zeige weniger"
};
var en = {
  choose_preferred_wallet: "Choose your preferred wallet",
  connect_mobile_wallet: "Connect to Mobile Wallet",
  scan_qrcode_with_wallet: "Scan QR code with a WalletConnect-compatible wallet",
  connect: "Connect",
  qrcode: "QR Code",
  mobile: "Mobile",
  copy_to_clipboard: "Copy to clipboard",
  copied_to_clipboard: "Copied to clipboard!",
  show_more: "Show More",
  show_less: "Show Less"
};
var es$1 = {
  choose_preferred_wallet: "Elige tu billetera preferida",
  connect_mobile_wallet: "Conectar a billetera móvil",
  scan_qrcode_with_wallet: "Escanea el código QR con una billetera compatible con WalletConnect",
  connect: "Conectar",
  qrcode: "Código QR",
  mobile: "Móvil",
  copy_to_clipboard: "Copiar",
  copied_to_clipboard: "Copiado!",
  show_more: "Mostrar más",
  show_less: "Mostrar menos"
};
var fr = {
  choose_preferred_wallet: "Choisissez votre portefeuille préféré",
  connect_mobile_wallet: "Se connecter au portefeuille mobile",
  scan_qrcode_with_wallet: "Scannez le QR code avec un portefeuille compatible WalletConnect",
  connect: "Se connecter",
  qrcode: "QR Code",
  mobile: "Mobile",
  copy_to_clipboard: "Copier",
  copied_to_clipboard: "Copié!",
  show_more: "Montre plus",
  show_less: "Montre moins"
};
var ko = {
  choose_preferred_wallet: "원하는 지갑을 선택하세요",
  connect_mobile_wallet: "모바일 지갑과 연결",
  scan_qrcode_with_wallet: "WalletConnect 지원 지갑에서 QR코드를 스캔하세요",
  connect: "연결",
  qrcode: "QR 코드",
  mobile: "모바일",
  copy_to_clipboard: "클립보드에 복사",
  copied_to_clipboard: "클립보드에 복사되었습니다!",
  show_more: "자세히 보기",
  show_less: "간략히 보기"
};
var pt = {
  choose_preferred_wallet: "Escolha sua carteira preferida",
  connect_mobile_wallet: "Conectar-se à carteira móvel",
  scan_qrcode_with_wallet: "Ler o código QR com uma carteira compatível com WalletConnect",
  connect: "Conectar",
  qrcode: "Código QR",
  mobile: "Móvel",
  copy_to_clipboard: "Copiar",
  copied_to_clipboard: "Copiado!",
  show_more: "Mostrar mais",
  show_less: "Mostrar menos"
};
var zh = {
  choose_preferred_wallet: "选择你的钱包",
  connect_mobile_wallet: "连接至移动端钱包",
  scan_qrcode_with_wallet: "使用兼容 WalletConnect 的钱包扫描二维码",
  connect: "连接",
  qrcode: "二维码",
  mobile: "移动",
  copy_to_clipboard: "复制到剪贴板",
  copied_to_clipboard: "复制到剪贴板成功！",
  show_more: "显示更多",
  show_less: "显示较少"
};
var fa = {
  choose_preferred_wallet: "کیف پول مورد نظر خود را انتخاب کنید",
  connect_mobile_wallet: "به کیف پول موبایل وصل شوید",
  scan_qrcode_with_wallet: "کد QR را با یک کیف پول سازگار با WalletConnect اسکن کنید",
  connect: "اتصال",
  qrcode: "کد QR",
  mobile: "سیار",
  copy_to_clipboard: "کپی به کلیپ بورد",
  copied_to_clipboard: "در کلیپ بورد کپی شد!",
  show_more: "بیشتر نشان بده، اطلاعات بیشتر",
  show_less: "نمایش کمتر"
};
var languages = {
  de: de,
  en: en,
  es: es$1,
  fr: fr,
  ko: ko,
  pt: pt,
  zh: zh,
  fa: fa
};

function injectStyleSheet() {
  var doc = cjs$1.getDocumentOrThrow();
  var prev = doc.getElementById(WALLETCONNECT_STYLE_ID);

  if (prev) {
    doc.head.removeChild(prev);
  }

  var style = doc.createElement("style");
  style.setAttribute("id", WALLETCONNECT_STYLE_ID);
  style.innerText = WALLETCONNECT_STYLE_SHEET;
  doc.head.appendChild(style);
}

function renderWrapper() {
  var doc = cjs$1.getDocumentOrThrow();
  var wrapper = doc.createElement("div");
  wrapper.setAttribute("id", WALLETCONNECT_WRAPPER_ID);
  doc.body.appendChild(wrapper);
  return wrapper;
}

function triggerCloseAnimation() {
  var doc = cjs$1.getDocumentOrThrow();
  var modal = doc.getElementById(WALLETCONNECT_MODAL_ID);

  if (modal) {
    modal.className = modal.className.replace("fadeIn", "fadeOut");
    setTimeout(function () {
      var wrapper = doc.getElementById(WALLETCONNECT_WRAPPER_ID);

      if (wrapper) {
        doc.body.removeChild(wrapper);
      }
    }, ANIMATION_DURATION);
  }
}

function getWrappedCallback(cb) {
  return function () {
    triggerCloseAnimation();

    if (cb) {
      cb();
    }
  };
}

function getText() {
  var lang = cjs$1.getNavigatorOrThrow().language.split("-")[0] || "en";
  return languages[lang] || languages["en"];
}

function open$1(uri, cb, qrcodeModalOptions) {
  injectStyleSheet();
  var wrapper = renderWrapper();
  React.render(React.createElement(Modal, {
    text: getText(),
    uri: uri,
    onClose: getWrappedCallback(cb),
    qrcodeModalOptions: qrcodeModalOptions
  }), wrapper);
}

function close$1() {
  triggerCloseAnimation();
}

function open$2(uri, cb, qrcodeModalOptions) {
  console.log(uri);

  if (isNode()) {
    open(uri);
  } else {
    open$1(uri, cb, qrcodeModalOptions);
  }
}

function close$2() {
  if (isNode()) ;else {
    close$1();
  }
}

var index = {
  open: open$2,
  close: close$2
};
var cjs$2 = index;

var WalletConnectContext = React$1__default.createContext({});
var WalletConnectContextProvider = function WalletConnectContextProvider(_ref) {
  var options = _ref.options,
      children = _ref.children;

  var _useState = React$1.useState(undefined),
      wcClient = _useState[0],
      setWcClient = _useState[1];

  var _useState2 = React$1.useState(undefined),
      session = _useState2[0],
      setSession = _useState2[1];

  var _useState3 = React$1.useState(true),
      loadingSession = _useState3[0],
      setLoadingSession = _useState3[1];

  var _useState4 = React$1.useState([]),
      pairings = _useState4[0],
      setPairings = _useState4[1];

  var _useState5 = React$1.useState(false),
      isPairing = _useState5[0],
      setIsPairing = _useState5[1];

  var _useState6 = React$1.useState(false),
      isPendingApproval = _useState6[0],
      setIsPendingApproval = _useState6[1];

  var _useState7 = React$1.useState(""),
      uri = _useState7[0],
      setUri = _useState7[1];

  var _useState8 = React$1.useState([]),
      accounts = _useState8[0],
      setAccounts = _useState8[1];

  var initWcClient = React$1.useCallback(function () {
    try {
      return Promise.resolve(lib.WcSdk.initClient(options.logger, options.relayServer)).then(function (_WcSdk$initClient) {
        setWcClient(_WcSdk$initClient);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }, [options.logger, options.relayServer]);
  var resetApp = React$1.useCallback(function () {
    try {
      setWcClient(undefined);
      setSession(undefined);
      setLoadingSession(true);
      setPairings([]);
      setIsPairing(false);
      setIsPendingApproval(false);
      setUri("");
      setAccounts([]);
      return Promise.resolve(initWcClient()).then(function () {});
    } catch (e) {
      return Promise.reject(e);
    }
  }, [initWcClient]);
  React$1.useEffect(function () {
    initWcClient();
  }, [initWcClient]);
  var subscribeToEvents = React$1.useCallback(function () {
    lib.WcSdk.subscribeToEvents(wcClient, {
      onProposal: function onProposal(uri) {
        setUri(uri);
        cjs$2.open(uri, function () {});
      },
      onCreated: function onCreated(topics) {
        return setPairings(topics);
      },
      onDeleted: function () {
        try {
          return Promise.resolve(resetApp());
        } catch (e) {
          return Promise.reject(e);
        }
      }
    });
  }, [resetApp, wcClient]);
  var checkPersistedState = React$1.useCallback(function () {
    try {
      if (!wcClient) {
        throw new Error("WalletConnect is not initialized");
      }

      setPairings(wcClient.pairing.topics);
      if (session) return Promise.resolve();
      return Promise.resolve(lib.WcSdk.getSession(wcClient)).then(function (s) {
        if (s) {
          onSessionConnected(s);
        }

        setLoadingSession(false);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }, [session, wcClient]);
  React$1.useEffect(function () {
    if (wcClient) {
      subscribeToEvents();
      checkPersistedState();
    }
  }, [wcClient, subscribeToEvents, checkPersistedState]);

  var onSessionConnected = function onSessionConnected(session) {
    setSession(session);
    setAccounts(session.state.accounts);
  };

  var connect = function connect(topic) {
    try {
      var _temp3 = function _temp3() {
        cjs$2.close();
      };

      if (!wcClient) {
        throw new Error("WalletConnect is not initialized");
      }

      setIsPairing(false);

      var _temp4 = _catch(function () {
        return Promise.resolve(lib.WcSdk.connect(wcClient, _extends({
          topic: topic
        }, options))).then(function (session) {
          onSessionConnected(session);
        });
      }, function () {});

      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp3) : _temp3(_temp4));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var disconnect = function disconnect() {
    try {
      if (!wcClient) {
        throw new Error("WalletConnect is not initialized");
      }

      if (!session) {
        throw new Error("Session is not connected");
      }

      return Promise.resolve(lib.WcSdk.disconnect(wcClient, session)).then(function () {
        return Promise.resolve(resetApp()).then(function () {});
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var openPairing = function openPairing() {
    try {
      if (!wcClient) {
        throw new Error("WalletConnect is not initialized");
      }

      if (wcClient.pairing.topics.length) {
        setIsPairing(true);
        return Promise.resolve();
      }

      return Promise.resolve(connect()).then(function () {});
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var handleRequest = function handleRequest(caller) {
    try {
      if (!wcClient) {
        throw new Error("WalletConnect is not initialized");
      }

      if (!session) {
        throw new Error("Session is not connected");
      }

      setIsPendingApproval(true);
      return Promise.resolve(caller(wcClient, session)).then(function (resp) {
        setIsPendingApproval(false);
        return resp;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var sendRequest = function sendRequest(request) {
    return Promise.resolve(handleRequest(function (c, s) {
      try {
        return Promise.resolve(lib.WcSdk.sendRequest(c, s, options.chainId, request));
      } catch (e) {
        return Promise.reject(e);
      }
    }));
  };

  var invokeFunction = function invokeFunction(scripthash, method, params) {
    return Promise.resolve(handleRequest(function (c, s) {
      try {
        return Promise.resolve(lib.WcSdk.invokeFunction(c, s, options.chainId, scripthash, method, params));
      } catch (e) {
        return Promise.reject(e);
      }
    }));
  };

  var contextValue = {
    wcClient: wcClient,
    setWcClient: setWcClient,
    session: session,
    setSession: setSession,
    loadingSession: loadingSession,
    setLoadingSession: setLoadingSession,
    pairings: pairings,
    setPairings: setPairings,
    isPairing: isPairing,
    setIsPairing: setIsPairing,
    isPendingApproval: isPendingApproval,
    setIsPendingApproval: setIsPendingApproval,
    uri: uri,
    setUri: setUri,
    accounts: accounts,
    setAccounts: setAccounts,
    openPairing: openPairing,
    connect: connect,
    sendRequest: sendRequest,
    invokeFunction: invokeFunction,
    disconnect: disconnect
  };
  return React$1__default.createElement(WalletConnectContext.Provider, {
    value: contextValue
  }, children);
};
var useWalletConnect = function useWalletConnect() {
  return React$1.useContext(WalletConnectContext);
};

exports.WalletConnectContext = WalletConnectContext;
exports.WalletConnectContextProvider = WalletConnectContextProvider;
exports.useWalletConnect = useWalletConnect;
//# sourceMappingURL=index.js.map
