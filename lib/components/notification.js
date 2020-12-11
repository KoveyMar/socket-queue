"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("./log");
const utils_1 = require("./utils");
class T {
}
class Notify extends T {
    constructor() {
        super();
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
    }
    destroy() {
        this.ntf = null;
        this.autoClose = !0;
        this.reverseText = !1;
    }
    done(notification) { }
    fail(error) { }
    show() { }
    click() { }
    close() { }
    error(event) { }
    closeEvt() {
        this.ntf.onclose = () => {
            this.close();
        };
    }
    errorEvt() {
        this.ntf.onerror = (e) => {
            this.error(e);
        };
    }
    clickEvt() {
        this.ntf.onclick = (e) => {
            e.preventDefault();
            this.click();
        };
    }
    showEvt() {
        this.ntf.onshow = () => {
            this.show();
            this.autoClose && setTimeout(() => {
                this.ntf.close();
                this.destroy();
            }, 1e4);
        };
    }
    stateDispatch() {
        this.closeEvt();
        this.errorEvt();
        this.clickEvt();
        this.showEvt();
    }
    init(notice) {
        if (!("Notification" in window)) {
            return log_1.default.Warn(`Your Browser Does Not Support Desktop Notification`), Promise.reject();
        }
        utils_1.default.isEmptyObject(notice) && log_1.default.Info(`Notification Resovle Default Options`);
        if (utils_1.default.isObject(notice)) {
            log_1.default.Warn(`Notification Resovle Options`);
            this.noticeOptions = notice;
            this.title = notice.title || this.title;
            this.options = notice.options || this.options;
            this.autoClose = !utils_1.default.isEmptyObject(notice.autoClose) ? notice.autoClose : !0;
            this.reverseText = utils_1.default.isEmptyObject(notice.reverseText) ? !1 : notice.reverseText;
            utils_1.default.setFunction(['done', 'fail', 'close', 'show', 'click', 'error'], this, notice);
        }
        return (Notification.permission === 'denied' || Notification.permission === 'default') && Notification.requestPermission();
    }
    showNotification(options) {
        let _options = Object.assign(Object.assign({}, this.options), options), temp_body = _options.body, temp_title = this.title;
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
                .then((res) => {
                log_1.default.Warn(`Notification Has Been Allowed Work`);
                if (res === 'granted') {
                    this.ntf = new Notification(temp_title, _options);
                    this.done(this.ntf);
                    this.stateDispatch();
                }
            })
                .catch((err) => {
                log_1.default.Warn(`Notification Could Not Resolve`);
                this.fail(err);
            });
        }
    }
}
exports.default = Notify;
