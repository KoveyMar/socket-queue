"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Log = function () {
  function Log() {
    _classCallCheck(this, Log);

    this.msg = null;
  }

  _createClass(Log, [{
    key: "isLog",
    set: function set(value) {
      this.isLog = value;
    },
    get: function get() {
      return this.isLog;
    }
  }], [{
    key: "Error",
    value: function Error(msg) {
      this.isLog && console.error("Socket Error - [ ".concat(msg, " ]"));
    }
  }, {
    key: "Warn",
    value: function Warn(msg) {
      this.isLog && console.warn("Socket Warning - [ ".concat(msg, " ]"));
    }
  }, {
    key: "Info",
    value: function Info(msg) {
      this.isLog && console.log("Socket Info - [ ".concat(msg, " ]"));
    }
  }]);

  return Log;
}();

exports["default"] = Log;
Log.isLog = !0;