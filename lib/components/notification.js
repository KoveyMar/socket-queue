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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("./log");
var utils_1 = require("./utils");
var T = (function () {
    function T() {
    }
    return T;
}());
var Notify = (function (_super) {
    __extends(Notify, _super);
    function Notify() {
        var _this = _super.call(this) || this;
        _this.ntf = null;
        _this.title = '新的socket消息';
        _this.noticeOptions = {};
        _this.options = {
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
        _this.autoClose = !0;
        _this.reverseText = !1;
        return _this;
    }
    Notify.prototype.destroy = function () {
        this.ntf = null;
    };
    Notify.prototype.done = function (notification) { };
    Notify.prototype.fail = function (error) { };
    Notify.prototype.show = function () { };
    Notify.prototype.click = function () { };
    Notify.prototype.close = function () { };
    Notify.prototype.error = function (event) { };
    Notify.prototype.closeEvt = function () {
        var _this = this;
        this.ntf.onclose = function () {
            _this.close();
        };
    };
    Notify.prototype.errorEvt = function () {
        var _this = this;
        this.ntf.onerror = function (e) {
            _this.error(e);
        };
    };
    Notify.prototype.clickEvt = function () {
        var _this = this;
        this.ntf.onclick = function (e) {
            e.preventDefault();
            _this.click();
        };
    };
    Notify.prototype.showEvt = function () {
        var _this = this;
        this.ntf.onshow = function () {
            _this.show();
            _this.autoClose && setTimeout(function () {
                _this.ntf.close();
                _this.destroy();
            }, 10e3);
        };
    };
    Notify.prototype.stateDispatch = function () {
        this.closeEvt();
        this.errorEvt();
        this.clickEvt();
        this.showEvt();
    };
    Notify.prototype.init = function (notice) {
        if (!("Notification" in window)) {
            return log_1.default.Warn("Your Browser Does Not Support Desktop Notification");
        }
        utils_1.default.isEmptyObject(notice) && log_1.default.Warn("Notification Resovle Default Options");
        if (utils_1.default.isObject(notice)) {
            log_1.default.Warn("Notification Resovle Options");
            this.noticeOptions = notice;
            this.title = notice.title || this.title;
            this.options = notice.options || this.options;
            this.autoClose = !utils_1.default.isEmptyObject(notice.autoClose) ? notice.autoClose : !0;
            this.reverseText = utils_1.default.isEmptyObject(notice.reverseText) ? !1 : notice.reverseText;
            utils_1.default.setFunction(['done', 'fail', 'close', 'show', 'click', 'error'], this, notice);
        }
        (Notification.permission === 'denied' || Notification.permission === 'default') && Notification.requestPermission();
    };
    Notify.prototype.showNotification = function (options) {
        var _this = this;
        var _options = __assign(__assign({}, this.options), options), temp_body = _options.body, temp_title = this.title;
        this.reverseText &&
            (_options.body = temp_title,
                temp_title = temp_body);
        if (Notification.permission === 'granted') {
            this.ntf = new Notification(temp_title, _options);
            this.done(this.ntf);
            this.stateDispatch();
        }
        else if (Notification.permission === 'denied' || Notification.permission === 'default') {
            Notification.requestPermission()
                .then(function (res) {
                log_1.default.Warn("Notification Has Been Allowed Work");
                if (res === 'granted') {
                    _this.ntf = new Notification(temp_title, _options);
                    _this.done(_this.ntf);
                    _this.stateDispatch();
                }
            })
                .catch(function (err) {
                log_1.default.Warn("Notification Could Not Resolve");
                _this.fail(err);
            });
        }
    };
    return Notify;
}(T));
exports.default = Notify;
