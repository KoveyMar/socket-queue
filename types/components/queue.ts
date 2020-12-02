/**
 *	@author [author]
 *	@version [1.0]
 *	@description [description]
 * 
 */
class T {
	item_queue: any[];
}
class Queue extends T {
	constructor(){
		super();
		this.item_queue= [];
	}
	/**
	 * @description 添加数据到队列
	 * @param {any}
	 * @return {number}
	 */
	add( item: any ): number {
		return this.item_queue.push( item );
	}
	/**
	 * @description 队列是否为空
	 * @return {Boolean}
	 */
	isEmpty(): boolean {
		return this.item_queue.length === 0;
	}
	/**
	 * @description 获取队列第一条数据
	 * @return {null | object}
	 */
	next(): null | object {
		return this.isEmpty() ? null : this.item_queue.shift();
	}
	/**
	 * @description 队列长度
	 * @return {number} [description]
	 */
	get size(): number {
		return this.item_queue.length;
	}
	/**
	 * [removeLastChild description]
	 * @return {number}      [description]
	 */
	removeLastChild(): number {
		return this.item_queue.pop();
	}
}

export default Queue;