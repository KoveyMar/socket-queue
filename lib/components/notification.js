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

var notification = /*#__PURE__*/function () {
  /**
   * [constructor description]
   * @attribute [noticeOptions] 	实例对象接收配置
   * @attribute [options]			默认配置参数
   * @attribute [autoClose]		是否自动关闭
   * @return {[type]} [description]
   */
  function notification() {
    _classCallCheck(this, notification);

    this.ntf = null;
    this.title = '新的socket消息';
    this.noticeOptions = {};
    this.options = null;
    this.autoClose = !0;
    this.done = this.done.bind(this);
    this.fail = this.fail.bind(this);
    this.show = this.show.bind(this);
    this.click = this.click.bind(this);
    this.close = this.close.bind(this);
    this.error = this.error.bind(this);
  }
  /**
   * @description 实例初始化成功回调
   * @return {Function}
   */


  _createClass(notification, [{
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
     * @description 关闭事件
     * @return {[type]}
     */

  }, {
    key: "init",

    /**
     * @param  notice {Object} { dir: 'auto', lang: '', tag: 'ID', body: 'body', icon: 'URL'}
     * @return {[type]}
     */
    value: function init() {
      var notice = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!("Notification" in window)) {
        return _log["default"].warn("Your Browser Does Not Support Desktop Notification");
      }

      (0, _utils.isEmptyObject)(notice) && _log["default"].warn("Notification Can't Resovle Empty Options");
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

      if ((0, _utils.isObject)(notice)) {
        this.noticeOptions = notice;
        this.title = notice.title;
        this.options = notice.options;
        this.autoClose = !(0, _utils.isEmptyObject)(notice.autoClose) ? notice.autoClose : !0;
        this.done = notice.done || new Function();
        this.fail = notice.fail || new Function();
        this.close = notice.OnClose || new Function();
        this.show = notice.OnShow || new Function();
        this.click = notice.OnClick || new Function();
        this.error = notice.OnError || new Function();
      }

      Notification.requestPermission();
    }
  }, {
    key: "showNotification",
    value: function showNotification() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _options = _objectSpread(_objectSpread({}, options), this.options);

      if (Notification.permission === 'granted') {
        this.ntf = new Notification(this.title, _options);
        this.done();
        this.constructor.EvtDispatch();
      } else if (Notification.permission === 'denied' || Notification.permission === 'default') {
        Notification.requestPermission().then(function (res) {
          if (res === 'granted') {
            _this.ntf = new Notification(_this.title, _options);

            _this.done();

            _this.constructor.EvtDispatch();
          }
        })["catch"](function (err) {
          _this.fail();
        });
      }
    }
  }], [{
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
    /**
     * @description 事件分发
     */

  }, {
    key: "EvtDispatch",
    value: function EvtDispatch() {
      this.constructor.closeEvt();
      this.constructor.errorEvt();
      this.constructor.clickEvt();
      this.constructor.showEvt();
    }
  }]);

  return notification;
}();

exports["default"] = notification;