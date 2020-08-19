"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notification = void 0;

var _log = _interopRequireDefault(require("log"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var notification = /*#__PURE__*/function () {
  function notification() {
    _classCallCheck(this, notification);

    this.ntf = null;
    this.title = '新的socket消息';
    this.notice = null;
    this.autoClose = !0;
  }
  /**
   * @param  notice {Object} { dir: 'auto', lang: '', tag: 'ID', body: 'body', icon: 'URL'}
   * @return {[type]}
   */


  _createClass(notification, [{
    key: "init",
    value: function init() {
      var notice = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!("Notification" in window)) {
        return _log["default"].warn("Your Browser Does Not Support Desktop Notification");
      }

      if (notice) {
        this.title = notice.title;
        this.options = notice.options;
        this.autoClose = notice.autoClose;
        this.done = notice.done || new Function();
        this.fail = notice.fail || new Function();
        this.close = notice.OnClose || new Function();
        this.show = notice.OnShow || new Function();
        this.click = notice.OnClick || new Function();
        this.error = notice.OnError || new Function();
      }

      this.showNotification();
    }
  }, {
    key: "showNotification",
    value: function showNotification() {
      var _this = this;

      if (Notification.permission === "granted") {
        this.ntf = new Notification(this.title, this.options);
        this.done();
        this.EvtDispatch();
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(function (res) {
          if (res === 'granted') {
            _this.ntf = new Notification(_this.title, _this.options);

            _this.done();

            _this.EvtDispatch();
          }
        })["catch"](function (err) {
          _this.fail();
        });
      }
    }
    /**
     * @description 实例初始化成功回调
     * @return {Function}
     */

  }, {
    key: "done",
    value: function done() {}
    /**
     * @description 实例初始化失败回调
     * @return {[type]}
     */

  }, {
    key: "fail",
    value: function fail() {}
    /**
     * @description 通知显示时，实例回调
     * @return {[type]}
     */

  }, {
    key: "show",
    value: function show() {}
    /**
     * @description 点击通知时，实例回调
     * @return {[type]}
     */

  }, {
    key: "click",
    value: function click() {}
    /**
     * @description 关闭通知时，实例回调
     * @return {[type]}
     */

  }, {
    key: "close",
    value: function close() {}
    /**
     * @description 发送错误时，实例回调
     * @return {[type]}
     */

  }, {
    key: "error",
    value: function error() {}
    /**
     * @description 事件分发
     */

  }], [{
    key: "EvtDispatch",
    value: function EvtDispatch() {
      this.closeEvt();
      this.errorEvt();
      this.clickEvt();
      this.showEvt();
    }
    /**
     * @description 关闭事件
     * @return {[type]}
     */

  }, {
    key: "closeEvt",
    value: function closeEvt() {
      var _this2 = this;

      this.ntf.onclose = function () {
        _this2.close();
      };
    }
  }, {
    key: "errorEvt",
    value: function errorEvt() {
      var _this3 = this;

      this.ntf.onerror = function (e) {
        _this3.error(e);
      };
    }
  }, {
    key: "clickEvt",
    value: function clickEvt() {
      var _this4 = this;

      this.ntf.onclick = function (e) {
        e.preventDefault();

        _this4.click();
      };
    }
  }, {
    key: "showEvt",
    value: function showEvt() {
      var _this5 = this;

      this.ntf.onshow = function () {
        _this5.show();

        _this5.autoClose && setTimeout(function () {
          _this5.ntf.close();
        }, 4000);
      };
    }
  }]);

  return notification;
}();

exports.notification = notification;