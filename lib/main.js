"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _queue = _interopRequireDefault(require("./components/queue"));

var _notification = _interopRequireDefault(require("./components/notification"));

var _log = _interopRequireDefault(require("./components/log"));

var _utils = _interopRequireDefault(require("./components/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SocketQueue = function () {
  function SocketQueue() {
    _classCallCheck(this, SocketQueue);

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
    this.isLog = !0;
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

  _createClass(SocketQueue, [{
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
      this.isLog = !0;
    }
  }, {
    key: "initWSocket",
    value: function initWSocket() {
      var _this = this;

      try {
        this.socket = new WebSocket(this.url, this.protocol);

        _log["default"].Info('WebSocket is created');

        this.socket.onopen = function (e) {
          _log["default"].Info('WebSocket is connect!');

          _log["default"].Info('WebSocket is open!');

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

          _this.queue.add(data);

          _this.nfc.showNotification(options);

          _log["default"].Info("WebSocket status '".concat(evt.type, "', New Message - ").concat(data));
        };

        this.socket.onerror = function (err) {
          _log["default"].Error("WebSocket status '".concat(err.type, "' - ").concat(err.reason));

          _this.WSState = err.target.readyState;

          _this.rebuildSocket(err.type);

          _this.error(err);
        };

        this.socket.onclose = function (evt) {
          _log["default"].Warn("WebSocket status '".concat(evt.type, "' - ").concat(evt.reason));

          _this.WSState = evt.target.readyState;

          _this.rebuildSocket(evt.type);

          _this.closed(evt);
        };

        this.queue = new _queue["default"]();
        this.nfc = new _notification["default"]();
        this.nfc.init(this.noticeOptions);
      } catch (e) {
        _log["default"].Error(e);
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
          _log["default"].Info("WebSocket trying to reconnect...");

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
        return _log["default"].Warn("Your Browser Dose Not Support WebSocket");
      }

      if (_utils["default"].isEmptyObject(options)) {
        return _log["default"].Error("WebSocket Can't Resolve Empty Options");
      }

      var socket = options.socket;
      this.noticeOptions = options.notice;
      _utils["default"].isEmptyObject(options.isLog) && (_log["default"].isLog = this.isLog);

      if (_utils["default"].isObject(socket)) {
        var T = socket.retime;
        var temp_time = 0;
        this.url = socket.url;
        this.protocol = socket.protocol;
        this.retime = _utils["default"].isNumber(T) && T <= 5 ? T : 5;
        temp_time = this.retime;
        this.resolveConnectTime = temp_time;
        this.open = _utils["default"].isFunction(socket.open) ? socket.open : new Function();
        this.closed = _utils["default"].isFunction(socket.closed) ? socket.closed : new Function();
        this.error = _utils["default"].isFunction(socket.error) ? socket.error : new Function();
      }

      _utils["default"].isString(socket) && (this.url = socket);
      !_utils["default"].isString(this.protocol) && _utils["default"].throwType(this.protocol, 'protocol', {
        string: _utils["default"].isString
      });

      if (_utils["default"].isEmptyObject(this.url)) {
        return _log["default"].Error("WebSocket'url is empty");
      }

      this.initWSocket();
    }
  }]);

  return SocketQueue;
}();

exports["default"] = SocketQueue;