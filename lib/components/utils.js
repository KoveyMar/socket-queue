"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("./log");
function getProto(obj) {
    return Object.prototype.toString.call(obj);
}
function setFunction(data, extendsObject, proto) {
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var item = data_1[_i];
        extendsObject[item] = isFunction(proto[item]) ? proto[item] : new Function();
    }
}
function getType(obj) {
    var _def_type = getProto(obj);
    return _def_type.substring(8, _def_type.length - 1);
}
function throwType(obj, objName, callback) {
    var obj_type = callback, proto_type = getType(obj);
    try {
        if (!obj_type(obj) && !isEmptyObject(obj)) {
            throw "TypeError: type can't resolve, '" + objName + "' must be " + obj_type + ", but got " + proto_type;
        }
    }
    catch (err) {
        log_1.default.Error(err);
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
    return obj === null || (obj === void 0 && typeof obj === 'undefined');
}
function isNumber(number) {
    return !Number.isNaN(Number(number)) && typeof number === 'number';
}
exports.default = {
    getType: getType,
    setFunction: setFunction,
    throwType: throwType,
    isObject: isObject,
    isFunction: isFunction,
    isString: isString,
    isEmptyObject: isEmptyObject,
    isNumber: isNumber
};
