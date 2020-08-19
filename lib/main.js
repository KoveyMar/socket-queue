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
    this.WSState = null; // this.beforeOpen = this.beforeOpen.bind(this);

    this.open = this.open.bind(this); // this.beforeClosed = this.beforeClosed.bind(this);

    this.closed = this.closed.bind(this);
    this.error = this.error.bind(this);
    this.send = this.send.bind(this);
  }
  /**
   * @description 建立WS连接前
   * @return {[type]}
   */


  _createClass(socketQueue, [{
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
     * @description WS状态分发
     * @param  {[type]}
     * @return {[type]}
     */

  }, {
    key: "init",

    /**
     * [init description]
     * @param  {Object} options [description]
     * @return {[type]}         [description]
     */
    value: function init() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!'WebSocket' in window) {
        return _log["default"].warn(" Your Browser Dose Not Support WebSocket ");
      }

      if ((0, _utils.isEmptyObject)(options)) {
        return _log["default"].error(" WebSocket Can't Resolve Empty Options");
      }

      var socket = options.socket,
          notice = options.notice;
      (0, _utils.isObject)(socket) && (this.url = socket.url, this.protocol = socket.protocol);
      (0, _utils.isString)(socket) && (this.url = socket);
      (0, _utils.isEmptyObject)(this.protocol) && _log["default"].warn("WebSocket protocol is empty");

      if ((0, _utils.isEmptyObject)(this.url)) {
        return _log["default"].error(" WebSocket'url is empty ");
      }

      try {
        this.socket = new WebSocket(this.url, this.protocol);

        _log["default"].alert(' WebSocket is created '); // this.constructor.stateDispatch( this.socket.readyState );


        this.socket.onopen = function (e) {
          _log["default"].alert(' WebSocket is connect! ');

          _log["default"].alert(' WebSocket is open! ');

          _this.open(e);
        };

        this.socket.onmessage = function (e) {
          var data = e.data;
          var options = {
            body: data
          };

          _this.queue.add(data);

          _this.nfc.showNotification(options);

          _log["default"].alert("New Message - ".concat(e));
        };

        this.socket.onerror = function (evt) {
          _log["default"].error("WebSocket is error, ".concat(evt.reason));

          _this.error(evt);
        };

        this.socket.onclose = function (evt) {
          _log["default"].warn("WebSocket will close..., ".concat(evt.reason));

          _this.closed(evt);
        }; // this.constructor.reloadSocket();


        this.queue = new _queue["default"]();
        this.nfc = new _notification["default"]();
        this.nfc.init(notice);
      } catch (e) {
        _log["default"].error(e);
      }
    }
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
  }], [{
    key: "stateDispatch",
    value: function stateDispatch($value) {
      this.WSState = $value;

      switch ($value) {
        case 0:
          // this.beforeOpen();
          break;

        case 1:
          // this.open();
          break;

        case 2:
          // this.beforeClosed();
          break;

        case 3:
          // this.closed();
          break;
      }
    }
    /**
     * @description 断线重连
     * @return {[type]}
     */

  }, {
    key: "reloadSocket",
    value: function reloadSocket() {
      //TODO
      setTimeout(function () {}, 2000);
    }
  }]);

  return socketQueue;
}();

exports.socketQueue = socketQueue;