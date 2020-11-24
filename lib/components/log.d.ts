declare class T {
    msg: string;
}
declare class Log extends T {
    constructor();
    static isLog: boolean;
    set isLog(value: boolean);
    get isLog(): boolean;
    static Error(msg: any): void;
    static Warn(msg: any): void;
    static Info(msg: any): void;
}
export default Log;
