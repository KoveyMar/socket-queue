declare class T {
    item_queue: any[];
}
declare class Queue extends T {
    constructor();
    add(item: any): number;
    isEmpty(): boolean;
    next(): null | object;
    get size(): number;
    removeLastChild(): number;
}
export default Queue;
