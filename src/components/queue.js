/**
 *	@author [author]
 *	@version [1.0]
 *	@description [description]
 * 
 */
export class Queue {
	constructor(){
		this.item_queue = [];
	}
	/**
	 * @description 添加数据到队列
	 * @param {[type]}
	 */
	add( item ){
		return this.item_queue.push( item );
	}
	/**
	 * @description 队列是否为空
	 * @return {Boolean}
	 */
	get isEmpty(){
		return this.item_queue.length === 0;
	}
	/**
	 * @description 获取队列第一条数据
	 * @return {Function}
	 */
	next(){
		return this.item_queue.length == 0 ? null : this.item_queue.shift();
	}

	static removeLastChild( item ){
		return this.item_queue.pop();
	}
}