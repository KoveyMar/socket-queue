"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isObject = isObject;
exports.isFun = isFun;
exports.isString = isString;
exports.isEmptyObject = isEmptyObject;
exports.isNumber = isNumber;
exports.getType = getType;

function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

function isFun(fn) {
  return Object.prototype.toString.call(fn) === "[object Function]";
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

function getType(obj) {
  var _def_type = Object.prototype.toString.call(obj);

  return _def_type.substring(8, _def_type.length - 1);
}