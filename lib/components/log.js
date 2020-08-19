"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Log = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *	@author [author]
 *	@version [version]
 *	@description module log
 * 
 */
var Log = /*#__PURE__*/function () {
  function Log() {
    _classCallCheck(this, Log);

    this.msg = null;
    this.debug = !1;
  }

  _createClass(Log, null, [{
    key: "error",
    value: function error(msg) {
      console.error("Socket Error - [ ".concat(msg, " ]"));
    }
  }, {
    key: "warn",
    value: function warn(msg) {
      console.warn("Socket Warning - [ ".concat(msg, " ]"));
    }
  }, {
    key: "alert",
    value: function alert(msg) {
      console.log("Socket alert - [ ".concat(msg, " ]"));
    }
  }]);

  return Log;
}();

exports.Log = Log;