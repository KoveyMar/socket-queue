declare class socket {
    socket: any;
    url: string;
    protocol?: string;
    queue: any;
    nfc: any;
    retime: number;
    WSState: number;
    noticeOptions: any;
    resolveConnect: boolean;
    resolveConnectTime: number;
    isLog: boolean;
    isClose: boolean;
}
declare class SocketQueue extends socket {
    constructor();
    open(event: any): void;
    closed(e: any): void;
    reConnect(number: number): void;
    send(data: any): any;
    getData(): Function;
    error(err: any): void;
    destroy(): any;
    initNotify(): any;
    initWSocket(): any;
    rebuildSocket(service: string): Function;
    init(options: any): any;
}
export default SocketQueue;
