"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socketQueue = void 0;

var _queue = _interopRequireDefault(require("./components/queue"));

var _notification = _interopRequireDefault(require("./components/notification"));

var _log = _interopRequireDefault(require("./components/log"));

var _utils = require("./components/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var socketQueue = /*#__PURE__*/function () {
  function socketQueue() {
    _classCallCheck(this, socketQueue);

    this.socket = null;
    this.queue = null;
    this.nfc = null;
    this.url = null;
    this.protocol = null;
    this.WSState = null;
  }

  _createClass(socketQueue, [{
    key: "init",
    value: function init(ws) {
      var notice = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if ('WebSocket' in window) {
        return _log["default"].warn(" Your Browser Dose Not Support WebSocket ");
      }

      (0, _utils.isObject)(ws) && (this.url = ws.url, this.protocol = ws.protocol);
      (0, _utils.isString)(ws) && (this.url = ws);

      if ((0, _utils.isEmptyObject)(this.url)) {
        return _log["default"].error(" WebSocket'url is empty ");
      }

      this.initSocket();
      this.queue = new _queue["default"]();
      this.nfc = new _notification["default"]();
      this.nfc.init(notice);
    }
    /**
     * @description 建立WS连接前
     * @return {[type]}
     */

  }, {
    key: "beforeOpen",
    value: function beforeOpen() {}
    /**
     * @description 建立WS连接后
     * @return {[type]}
     */

  }, {
    key: "open",
    value: function open() {}
    /**
     * @description 连接关闭前
     * @return {[type]}
     */

  }, {
    key: "beforeClosed",
    value: function beforeClosed() {}
    /**
     * @description 连接关闭后
     * @return {[type]}
     */

  }, {
    key: "closed",
    value: function closed(e) {}
    /**
     * @description 发送WS数据
     * @param  {[type]}
     * @return {[type]}
     */

  }, {
    key: "send",
    value: function send(data) {
      var fun = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      this.WSState === 1 && (this.socket.send(data), fun());
    }
    /**
     * @description 获取接受的第一条队列数据
     * @return 返回队列的第一条数据
     */

  }, {
    key: "getData",
    value: function getData() {
      return this.queue.next();
    }
    /**
     * @description 发送错误时回调
     * @return {[type]}
     */

  }, {
    key: "error",
    value: function error(err) {}
    /**
     * @description 销毁当前WS调用实例
     * @return {[type]}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.socket.close();
      this.socket = null;
      this.queue = null;
      this.nfc = null;
      this.url = null;
      this.protocol = null;
      this.WSState = null;
    }
    /**
     * @description 创建WS实例
     * @return {[type]}
     */

  }], [{
    key: "initSocket",
    value: function initSocket() {
      try {
        (0, _utils.isEmptyObject)(this.protocol) && _log["default"].warn("WebSocket protocol is empty");
        this.socket = new WebSocket(this.url, this.protocol);

        _log["default"].alert(' WebSocket is created ');

        this.stateDispatch(this.socket.readyState);
        this.openSocket();
        this.reloadSocket();
        this.errorSocket();
        this.closeSocket();
      } catch (e) {
        _log["default"].error(e);
      }
    }
    /**
     * @description WS状态分发
     * @param  {[type]}
     * @return {[type]}
     */

  }, {
    key: "stateDispatch",
    value: function stateDispatch($value) {
      this.WSState = $value;

      switch ($value) {
        case 0:
          _log["default"].alert(' WebSocket is connecting... ');

          this.beforeOpen();
          break;

        case 1:
          _log["default"].alert(' WebSocket is connect! ');

          this.open();
          break;

        case 2:
          _log["default"].alert(' WebSocket will close... ');

          this.beforeClosed();
          break;

        case 3:
          _log["default"].warn(' WebSocket is closed! ');

          this.closed();
          break;
      }
    }
    /**
     * @description WS信息接收
     * @return {[type]}
     */

  }, {
    key: "openSocket",
    value: function openSocket() {
      var _this = this;

      this.socket.onopen = function (e) {// this.socket.send();
      };

      this.socket.onmessage = function (e) {
        var data = e.data;

        _this.queue.add(data);

        _this.ntf.showNotification();
      };
    }
    /**
     * @description 断线重连
     * @return {[type]}
     */

  }, {
    key: "reloadSocket",
    value: function reloadSocket() {
      setTimeout(function () {}, 2000);
    }
  }, {
    key: "errorSocket",
    value: function errorSocket() {
      var _this2 = this;

      this.socket.onerror = function (evt) {
        _log["default"].error(evt.reason);

        _this2.error(evt);
      };
    }
  }, {
    key: "closeSocket",
    value: function closeSocket() {
      var _this3 = this;

      this.socket.onclose = function (evt) {
        _log["default"].warn(evt.reason);

        _this3.closed(evt);
      };
    }
  }]);

  return socketQueue;
}();

exports.socketQueue = socketQueue;