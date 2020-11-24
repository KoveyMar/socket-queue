declare class T {
    item_queue: any[];
}
declare class Queue extends T {
    constructor();
    add(item: any): any;
    isEmpty(): boolean;
    next(): Function;
    get size(): any;
    removeLastChild(item: any): Function;
}
export default Queue;
