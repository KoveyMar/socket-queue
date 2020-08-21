"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _log = _interopRequireDefault(require("./log"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var notification = function () {
  function notification() {
    _classCallCheck(this, notification);

    this.ntf = null;
    this.title = '新的socket消息';
    this.noticeOptions = {};
    this.options = {
      dir: 'auto',
      lang: 'zh-cn',
      badge: '',
      body: '',
      tag: '',
      icon: '',
      image: '',
      data: '',
      vibrate: '',
      renotify: !1,
      requireInteraction: !1
    };
    this.autoClose = !0;
    this.reverseText = !1;
    this.done = this.done.bind(this);
    this.fail = this.fail.bind(this);
    this.show = this.show.bind(this);
    this.click = this.click.bind(this);
    this.close = this.close.bind(this);
    this.error = this.error.bind(this);
  }

  _createClass(notification, [{
    key: "done",
    value: function done() {}
  }, {
    key: "fail",
    value: function fail() {}
  }, {
    key: "show",
    value: function show() {}
  }, {
    key: "click",
    value: function click() {}
  }, {
    key: "close",
    value: function close() {}
  }, {
    key: "error",
    value: function error() {}
  }, {
    key: "closeEvt",
    value: function closeEvt() {
      var _this = this;

      this.ntf.onclose = function () {
        _this.close();
      };
    }
  }, {
    key: "errorEvt",
    value: function errorEvt() {
      var _this2 = this;

      this.ntf.onerror = function (e) {
        _this2.error(e);
      };
    }
  }, {
    key: "clickEvt",
    value: function clickEvt() {
      var _this3 = this;

      this.ntf.onclick = function (e) {
        e.preventDefault();

        _this3.click();
      };
    }
  }, {
    key: "showEvt",
    value: function showEvt() {
      var _this4 = this;

      this.ntf.onshow = function () {
        _this4.show();

        _this4.autoClose && setTimeout(function () {
          _this4.ntf.close();
        }, 4000);
      };
    }
  }, {
    key: "stateDispatch",
    value: function stateDispatch() {
      this.closeEvt();
      this.errorEvt();
      this.clickEvt();
      this.showEvt();
    }
  }, {
    key: "init",
    value: function init(notice) {
      if (!("Notification" in window)) {
        return _log["default"].Warn("Your Browser Does Not Support Desktop Notification");
      }

      (0, _utils.isEmptyObject)(notice) && _log["default"].Warn("Notification Resovle Default Options");

      if ((0, _utils.isObject)(notice)) {
        _log["default"].Warn("Notification Resovle Options");

        this.noticeOptions = notice;
        this.title = notice.title || '新的socket消息';
        this.options = notice.options || this.options;
        this.autoClose = !(0, _utils.isEmptyObject)(notice.autoClose) ? notice.autoClose : !0;
        this.reverseText = notice.reverseText;
        this.done = notice.done || new Function();
        this.fail = notice.fail || new Function();
        this.close = notice.OnClose || new Function();
        this.show = notice.OnShow || new Function();
        this.click = notice.OnClick || new Function();
        this.error = notice.OnError || new Function();
      }

      (Notification.permission === 'denied' || Notification.permission === 'default') && Notification.requestPermission();
    }
  }, {
    key: "showNotification",
    value: function showNotification() {
      var _this5 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _options = _objectSpread(_objectSpread({}, this.options), options);

      if (Notification.permission === 'granted') {
        this.ntf = new Notification(this.title, _options);
        this.done();
        this.stateDispatch();
      } else if (Notification.permission === 'denied' || Notification.permission === 'default') {
        Notification.requestPermission().then(function (res) {
          _log["default"].Warn("Notification Has Been Allowed Work");

          if (res === 'granted') {
            _this5.ntf = new Notification(_this5.title, _options);

            _this5.done();

            _this5.stateDispatch();
          }
        })["catch"](function (err) {
          _log["default"].Warn("Notification Could Not Resovle");

          _this5.fail();
        });
      }
    }
  }]);

  return notification;
}();

exports["default"] = notification;