"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_1 = require("./components/queue");
const notification_1 = require("./components/notification");
const log_1 = require("./components/log");
const utils_1 = require("./components/utils");
class socket {
}
class SocketQueue extends socket {
    constructor() {
        super();
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
        this.isClose = !0;
    }
    open(event) { }
    closed(e) { }
    reConnect(number) { }
    send(data) {
        return this.WSState === 1 ? (this.socket.send(data),
            Promise.resolve()) : Promise.reject();
    }
    getData() {
        return this.queue.next();
    }
    error(err) { }
    destroy() {
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
    }
    initNotify() {
        this.nfc = new notification_1.default();
        this.nfc.init(this.noticeOptions);
    }
    initWSocket() {
        try {
            this.socket = new WebSocket(this.url, this.protocol);
            log_1.default.Info('WebSocket is created');
            this.socket.onopen = (e) => {
                log_1.default.Info('WebSocket is connect!');
                const time = this.retime;
                this.resolveConnect = !1;
                this.resolveConnectTime = time;
                this.WSState = e.target.readyState;
                this.open(e);
            };
            this.socket.onmessage = (evt) => {
                const data = evt.data;
                const options = {
                    body: data
                };
                this.queue.add(data);
                this.nfc.showNotification(options);
                log_1.default.Info(`WebSocket status '${evt.type}', New Message - ${data}`);
            };
            this.socket.onerror = (err) => {
                log_1.default.Error(`WebSocket status '${err.type}' - ${err.reason}`);
                this.WSState = err.target.readyState;
                this.rebuildSocket(err.type);
                this.error(err);
            };
            this.socket.onclose = (evt) => {
                log_1.default.Warn(`WebSocket status '${evt.type}' - ${evt.reason}`);
                this.isClose && (this.rebuildSocket(evt.type),
                    this.WSState = evt.target.readyState);
                this.closed(evt);
            };
            this.queue = new queue_1.default();
        }
        catch (e) {
            log_1.default.Error(e);
        }
    }
    rebuildSocket(service) {
        if (this.resolveConnect)
            return;
        this.resolveConnect = !0;
        let timer = null;
        const FN = (num) => {
            return new Promise((resolve, reject) => {
                log_1.default.Info(`WebSocket trying to reconnect...`);
                timer = setTimeout(() => {
                    log_1.default.Info(`WebSocket reconnect from ${service}, state ${this.WSState}, in ${num} connect WebSocket`);
                    this.initWSocket();
                    this.reConnect(num);
                    this.resolveConnect = !1;
                    resolve();
                }, 5e3);
            });
        };
        this.resolveConnect && this.resolveConnectTime > 0 && FN(this.resolveConnectTime).then(() => { clearTimeout(timer); });
        this.resolveConnectTime--;
    }
    init(options) {
        if (!('WebSocket' in window)) {
            return log_1.default.Warn(`Your Browser Dose Not Support WebSocket`);
        }
        if (utils_1.default.isEmptyObject(options)) {
            return log_1.default.Error(`WebSocket Can't Resolve Empty Options`);
        }
        const socket = options.socket;
        this.noticeOptions = options.notice;
        utils_1.default.isEmptyObject(options.isLog) && (log_1.default.isLog = this.isLog);
        if (utils_1.default.isObject(socket)) {
            const T = socket.retime;
            let temp_time = 0;
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
            return log_1.default.Error(`WebSocket'url is empty`);
        }
        this.initWSocket();
        this.initNotify();
    }
}
exports.default = SocketQueue;
