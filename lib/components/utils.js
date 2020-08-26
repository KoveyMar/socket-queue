"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _log = _interopRequireDefault(require("./log"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getProto(obj) {
  return Object.prototype.toString.call(obj);
}

function getType(obj) {
  var _def_type = getProto(obj);

  return _def_type.substring(8, _def_type.length - 1);
}

function throwType(obj, objName) {
  var fun = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    fn: callback
  };
  var obj_type = Object.keys(fun)[0],
      proto_type = getType(obj);

  try {
    if (!Object.values(fun)[0](obj) && !isEmptyObject(obj)) {
      throw "TypeError: type can't resolve, '".concat(objName, "' must be ").concat(obj_type, ", but got ").concat(proto_type);
    }
  } catch (err) {
    _log["default"].Error(err);
  }
}

function isObject(obj) {
  return getProto(obj) === "[object Object]";
}

function isFunction(fn) {
  return getProto(fn) === "[object Function]";
}

function isString(str) {
  return typeof str === 'string';
}

function isEmptyObject(obj) {
  return obj === null || obj === void 0 && typeof obj === 'undefined';
}

function isNumber(number) {
  return !Number.isNaN(Number(number)) && typeof number === 'number';
}

var _default = {
  getType: getType,
  throwType: throwType,
  isObject: isObject,
  isFunction: isFunction,
  isString: isString,
  isEmptyObject: isEmptyObject,
  isNumber: isNumber
};
exports["default"] = _default;