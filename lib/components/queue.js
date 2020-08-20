"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Queue = function () {
  function Queue() {
    _classCallCheck(this, Queue);

    this.item_queue = [];
  }

  _createClass(Queue, [{
    key: "add",
    value: function add(item) {
      return this.item_queue.push(item);
    }
  }, {
    key: "next",
    value: function next() {
      return this.item_queue.length == 0 ? null : this.item_queue.shift();
    }
  }, {
    key: "isEmpty",
    get: function get() {
      return this.item_queue.length === 0;
    }
  }], [{
    key: "removeLastChild",
    value: function removeLastChild(item) {
      return this.item_queue.pop();
    }
  }]);

  return Queue;
}();

exports["default"] = Queue;