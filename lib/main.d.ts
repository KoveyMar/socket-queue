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
    getData(): object;
    error(err: any): void;
    destroy(): void;
    initNotify(): void;
    initWSocket(): void;
    rebuildSocket(service: string): void;
    init(options: any): void;
}
export default SocketQueue;
