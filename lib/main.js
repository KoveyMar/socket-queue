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

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var socketQueue = function () {
  function socketQueue() {
    _classCallCheck(this, socketQueue);

    this.socket = null;
    this.queue = null;
    this.nfc = null;
    this.url = null;
    this.retime = 5;
    this.protocol = null;
    this.WSState = null;
    this.noticeOptions = null;
    this.resolveConnect = !1;
    this.resolveConnectTime = 5;
    this.open = this.open.bind(this);
    this.closed = this.closed.bind(this);
    this.error = this.error.bind(this);
    this.send = this.send.bind(this);
    this.reConnect = this.reConnect.bind(this);
    this.getData = this.getData.bind(this);
    this.destroy = this.destroy.bind(this);
    this.initWSocket = this.initWSocket.bind(this);
    this.rebuildSocket = this.rebuildSocket.bind(this);
  }

  _createClass(socketQueue, [{
    key: "open",
    value: function open() {}
  }, {
    key: "closed",
    value: function closed(e) {}
  }, {
    key: "reConnect",
    value: function reConnect(number) {}
  }, {
    key: "send",
    value: function send(data) {
      var fun = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      this.WSState === 1 && (this.socket.send(data), fun());
    }
  }, {
    key: "getData",
    value: function getData() {
      return this.queue.next();
    }
  }, {
    key: "error",
    value: function error(err) {}
  }, {
    key: "destroy",
    value: function destroy() {
      this.socket && this.socket.close();
      this.socket = null;
      this.queue = null;
      this.nfc = null;
      this.url = null;
      this.retime = 5;
      this.protocol = null;
      this.WSState = null;
      this.noticeOptions = null;
      this.resolveConnect = !1;
      this.resolveConnectTime = 5;
    }
  }, {
    key: "initWSocket",
    value: function initWSocket() {
      var _this = this;

      try {
        this.socket = new WebSocket(this.url, this.protocol);

        _log["default"].Info(' WebSocket is created ');

        this.socket.onopen = function (e) {
          _log["default"].Info(' WebSocket is connect! ');

          _log["default"].Info(' WebSocket is open! ');

          var time = _this.retime;
          _this.resolveConnect = !1;
          _this.resolveConnectTime = time;
          _this.WSState = e.target.readyState;

          _this.open(e);
        };

        this.socket.onmessage = function (evt) {
          var data = evt.data;
          var options = {
            body: data
          };

          _this.queue.add({
            data: data,
            response: evt
          });

          _this.nfc.showNotification(options);

          _log["default"].Info("WebSocket status '".concat(evt.type, "', New Message - ").concat(data));
        };

        this.socket.onerror = function (err) {
          _log["default"].error("WebSocket status '".concat(err.type, "' - ").concat(err.reason));

          _this.WSState = err.target.readyState;

          _this.rebuildSocket(err.type);

          _this.error(err);
        };

        this.socket.onclose = function (evt) {
          _log["default"].warn("WebSocket status '".concat(evt.type, "' - ").concat(evt.reason));

          _this.WSState = evt.target.readyState;

          _this.rebuildSocket(evt.type);

          _this.closed(evt);
        };

        this.queue = new _queue["default"]();
        this.nfc = new _notification["default"]();
        this.nfc.init(this.noticeOptions);
      } catch (e) {
        _log["default"].error(e);
      }
    }
  }, {
    key: "rebuildSocket",
    value: function rebuildSocket(service) {
      var _this2 = this;

      if (this.resolveConnect) return;
      this.resolveConnect = !0;
      var timer = null;

      var FN = function FN(num) {
        return new Promise(function (resolve, reject) {
          timer = setTimeout(function () {
            _log["default"].Info("WebSocket reconnect from ".concat(service, ", state ").concat(_this2.WSState, ", in ").concat(num, " connect WebSocket"));

            _this2.initWSocket();

            _this2.reConnect(num);

            _this2.resolveConnect = !1;
            resolve();
          }, 5000);
        });
      };

      this.resolveConnect && this.resolveConnectTime > 0 && FN(this.resolveConnectTime).then(function () {
        clearTimeout(timer);
      });
      this.resolveConnectTime--;
    }
  }, {
    key: "init",
    value: function init() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!('WebSocket' in window)) {
        return _log["default"].warn(" Your Browser Dose Not Support WebSocket ");
      }

      if ((0, _utils.isEmptyObject)(options)) {
        return _log["default"].error(" WebSocket Can't Resolve Empty Options");
      }

      var socket = options.socket;
      this.noticeOptions = options.notice;

      if ((0, _utils.isObject)(socket)) {
        var T = socket.retime,
            temp_time = 0;
        this.url = socket.url;
        this.protocol = socket.protocol;
        this.retime = (0, _utils.isNumber)(T) && T <= 5 ? T : 5;
        temp_time = (_readOnlyError("temp_time"), this.retime);
        this.resolveConnectTime = temp_time;
      }

      (0, _utils.isString)(socket) && (this.url = socket);
      (0, _utils.isEmptyObject)(this.protocol) && _log["default"].warn("WebSocket protocol is empty");

      if ((0, _utils.isEmptyObject)(this.url)) {
        return _log["default"].error(" WebSocket'url is empty ");
      }

      this.initWSocket();
    }
  }]);

  return socketQueue;
}();

exports.socketQueue = socketQueue;