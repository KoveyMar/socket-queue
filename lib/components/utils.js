"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = exports.isEmptyObject = exports.isString = exports.isFunction = exports.isObject = exports.isRefTypes = exports.throwType = exports.getType = exports.setFunction = exports.getString = exports.jsonSwitch = exports.getProto = void 0;
const log_1 = require("./log");
function getProto(obj) {
    return Object.prototype.toString.call(obj);
}
exports.getProto = getProto;
function jsonSwitch(obj) {
    return JSON.stringify(obj);
}
exports.jsonSwitch = jsonSwitch;
function getString(obj, replaceString) {
    return isRefTypes(obj) ? jsonSwitch(obj) : (isEmptyObject(obj) ? (replaceString || '') : obj.toString());
}
exports.getString = getString;
function setFunction(data, extendsObject, proto) {
    for (let item of data) {
        extendsObject[item] = isFunction(proto[item]) ? proto[item] : new Function();
    }
}
exports.setFunction = setFunction;
function getType(obj) {
    let _def_type = getProto(obj);
    return _def_type.substring(8, _def_type.length - 1);
}
exports.getType = getType;
function throwType(obj, objName, callback) {
    let obj_type = callback, proto_type = getType(obj);
    try {
        if (!obj_type(obj) && !isEmptyObject(obj)) {
            throw `TypeError: type can't resolve, '${objName}' must be ${obj_type}, but got ${proto_type}`;
        }
    }
    catch (err) {
        log_1.default.Error(err);
    }
}
exports.throwType = throwType;
function isRefTypes(obj) {
    let type = ['Number', 'String', 'Boolean', 'Undefined', 'Null'], flag = !0;
    for (let j of type) {
        getProto(obj) == `[object ${j}]` && (flag = !1);
    }
    return flag;
}
exports.isRefTypes = isRefTypes;
function isObject(obj) {
    return getProto(obj) === "[object Object]";
}
exports.isObject = isObject;
function isFunction(fn) {
    return getProto(fn) === "[object Function]";
}
exports.isFunction = isFunction;
function isString(str) {
    return typeof str === 'string';
}
exports.isString = isString;
function isEmptyObject(obj) {
    return obj === null || (obj === void 0 && typeof obj === 'undefined');
}
exports.isEmptyObject = isEmptyObject;
function isNumber(number) {
    return !Number.isNaN(Number(number)) && typeof number === 'number';
}
exports.isNumber = isNumber;
exports.default = {
    getType,
    getString,
    setFunction,
    throwType,
    isRefTypes,
    isObject,
    isFunction,
    isString,
    isEmptyObject,
    isNumber
};
