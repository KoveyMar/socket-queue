"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var T = (function () {
    function T() {
    }
    return T;
}());
var Log = (function (_super) {
    __extends(Log, _super);
    function Log() {
        var _this = _super.call(this) || this;
        _this.msg = null;
        return _this;
    }
    Object.defineProperty(Log.prototype, "isLog", {
        get: function () {
            return this.isLog;
        },
        set: function (value) {
            this.isLog = value;
        },
        enumerable: false,
        configurable: true
    });
    Log.Error = function (msg) {
        this.isLog && console.error("Socket Error - [ " + msg + " ]");
    };
    Log.Warn = function (msg) {
        this.isLog && console.warn("Socket Warning - [ " + msg + " ]");
    };
    Log.Info = function (msg) {
        this.isLog && console.log("Socket Info - [ " + msg + " ]");
    };
    Log.isLog = !0;
    return Log;
}(T));
exports.default = Log;
