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
var T = (function () {
    function T() {
    }
    return T;
}());
var Queue = (function (_super) {
    __extends(Queue, _super);
    function Queue() {
        var _this = _super.call(this) || this;
        _this.item_queue = [];
        return _this;
    }
    Queue.prototype.add = function (item) {
        return this.item_queue.push(item);
    };
    Queue.prototype.isEmpty = function () {
        return this.item_queue.length === 0;
    };
    Queue.prototype.next = function () {
        return this.isEmpty() ? null : this.item_queue.shift();
    };
    Object.defineProperty(Queue.prototype, "size", {
        get: function () {
            return this.item_queue.length;
        },
        enumerable: false,
        configurable: true
    });
    Queue.prototype.removeLastChild = function (item) {
        return this.item_queue.pop();
    };
    return Queue;
}(T));
exports.default = Queue;
