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
var queue_1 = require("./components/queue");
var notification_1 = require("./components/notification");
var log_1 = require("./components/log");
var utils_1 = require("./components/utils");
var socket = (function () {
    function socket() {
    }
    return socket;
}());
var SocketQueue = (function (_super) {
    __extends(SocketQueue, _super);
    function SocketQueue() {
        var _this = _super.call(this) || this;
        _this.socket = null;
        _this.queue = null;
        _this.nfc = null;
        _this.url = null;
        _this.retime = 5;
        _this.protocol = null;
        _this.WSState = null;
        _this.noticeOptions = null;
        _this.resolveConnect = !1;
        _this.resolveConnectTime = 5;
        _this.isLog = !0;
        _this.isClose = !0;
        return _this;
    }
    SocketQueue.prototype.open = function (event) { };
    SocketQueue.prototype.closed = function (e) { };
    SocketQueue.prototype.reConnect = function (number) { };
    SocketQueue.prototype.send = function (data) {
        return this.WSState === 1 ? (this.socket.send(data),
            Promise.resolve()) : Promise.reject();
    };
    SocketQueue.prototype.getData = function () {
        return this.queue.next();
    };
    SocketQueue.prototype.error = function (err) { };
    SocketQueue.prototype.destroy = function () {
        this.isClose = !1;
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
    };
    SocketQueue.prototype.initNotify = function () {
        this.nfc = new notification_1.default();
        this.nfc.init(this.noticeOptions);
    };
    SocketQueue.prototype.initWSocket = function () {
        var _this = this;
        try {
            this.socket = new WebSocket(this.url, this.protocol);
            log_1.default.Info('WebSocket is created');
            this.socket.onopen = function (e) {
                log_1.default.Info('WebSocket is connect!');
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
                log_1.default.Info("WebSocket status '" + evt.type + "', New Message - " + data);
            };
            this.socket.onerror = function (err) {
                log_1.default.Error("WebSocket status '" + err.type + "' - " + err.reason);
                _this.WSState = err.target.readyState;
                _this.rebuildSocket(err.type);
                _this.error(err);
            };
            this.socket.onclose = function (evt) {
                log_1.default.Warn("WebSocket status '" + evt.type + "' - " + evt.reason);
                _this.isClose && (_this.rebuildSocket(evt.type),
                    _this.WSState = evt.target.readyState);
                _this.closed(evt);
            };
            this.queue = new queue_1.default();
        }
        catch (e) {
            log_1.default.Error(e);
        }
    };
    SocketQueue.prototype.rebuildSocket = function (service) {
        var _this = this;
        if (this.resolveConnect)
            return;
        this.resolveConnect = !0;
        var timer = null;
        var FN = function (num) {
            return new Promise(function (resolve, reject) {
                log_1.default.Info("WebSocket trying to reconnect...");
                timer = setTimeout(function () {
                    log_1.default.Info("WebSocket reconnect from " + service + ", state " + _this.WSState + ", in " + num + " connect WebSocket");
                    _this.initWSocket();
                    _this.reConnect(num);
                    _this.resolveConnect = !1;
                    resolve();
                }, 5e3);
            });
        };
        this.resolveConnect && this.resolveConnectTime > 0 && FN(this.resolveConnectTime).then(function () { clearTimeout(timer); });
        this.resolveConnectTime--;
    };
    SocketQueue.prototype.init = function (options) {
        if (!('WebSocket' in window)) {
            return log_1.default.Warn("Your Browser Dose Not Support WebSocket");
        }
        if (utils_1.default.isEmptyObject(options)) {
            return log_1.default.Error("WebSocket Can't Resolve Empty Options");
        }
        var socket = options.socket;
        this.noticeOptions = options.notice;
        utils_1.default.isEmptyObject(options.isLog) && (log_1.default.isLog = this.isLog);
        if (utils_1.default.isObject(socket)) {
            var T = socket.retime;
            var temp_time = 0;
            this.url = socket.url;
            this.protocol = socket.protocol;
            this.retime = utils_1.default.isNumber(T) && T <= 5 ? T : 5;
            temp_time = this.retime;
            this.resolveConnectTime = temp_time;
            utils_1.default.setFunction(['open', 'closed', 'error'], this, socket);
        }
        utils_1.default.isString(socket) && (this.url = socket);
        !utils_1.default.isString(this.protocol) && utils_1.default.throwType(this.protocol, 'protocol', utils_1.default.isString);
        if (utils_1.default.isEmptyObject(this.url)) {
            return log_1.default.Error("WebSocket'url is empty");
        }
        this.initWSocket();
        this.initNotify();
    };
    return SocketQueue;
}(socket));
exports.default = SocketQueue;
