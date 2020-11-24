interface options {
    dir: string;
    lang: string;
    badge: string;
    body: string;
    tag: string;
    icon: string;
    image: string;
    data: string;
    vibrate: string;
    renotify: boolean;
    requireInteraction: boolean;
}
declare class T {
    ntf: any;
    title: string;
    noticeOptions: any;
    options: options;
    autoClose: boolean;
    reverseText: boolean;
}
declare class Notify extends T {
    constructor();
    destroy(): any;
    done(notification: any): void;
    fail(error: any): void;
    show(): void;
    click(): void;
    close(): void;
    error(event: any): void;
    closeEvt(): void;
    errorEvt(): any;
    clickEvt(): any;
    showEvt(): any;
    stateDispatch(): any;
    init(notice: any): any;
    showNotification(options: any): any;
}
export default Notify;
