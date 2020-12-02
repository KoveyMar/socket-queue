"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class T {
}
class Log extends T {
    constructor() {
        super();
        this.msg = null;
    }
    set isLog(value) {
        this.isLog = value;
    }
    get isLog() {
        return this.isLog;
    }
    static Error(msg) {
        this.isLog && console.error(`Socket Error - [ ${msg} ]`);
    }
    static Warn(msg) {
        this.isLog && console.warn(`Socket Warning - [ ${msg} ]`);
    }
    static Info(msg) {
        this.isLog && console.log(`Socket Info - [ ${msg} ]`);
    }
}
Log.isLog = !0;
exports.default = Log;
