"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class T {
}
class Queue extends T {
    constructor() {
        super();
        this.item_queue = [];
    }
    add(item) {
        return this.item_queue.push(item);
    }
    isEmpty() {
        return this.item_queue.length === 0;
    }
    next() {
        return this.isEmpty() ? null : this.item_queue.shift();
    }
    get size() {
        return this.item_queue.length;
    }
    removeLastChild() {
        return this.item_queue.pop();
    }
}
exports.default = Queue;
