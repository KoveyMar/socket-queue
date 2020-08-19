"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Queue = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *	@author [author]
 *	@version [1.0]
 *	@description [description]
 * 
 */
var Queue = /*#__PURE__*/function () {
  function Queue() {
    _classCallCheck(this, Queue);

    this.item_queue = [];
  }
  /**
   * @description 添加数据到队列
   * @param {[type]}
   */


  _createClass(Queue, [{
    key: "add",
    value: function add(item) {
      return this.item_queue.push(item);
    }
    /**
     * @description 队列是否为空
     * @return {Boolean}
     */

  }, {
    key: "next",

    /**
     * @description 获取队列第一条数据
     * @return {Function}
     */
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

exports.Queue = Queue;