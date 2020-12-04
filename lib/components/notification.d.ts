interface NotificationOption {
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
declare class T<htmlOption = NotificationOption> {
    ntf: any;
    title: string;
    noticeOptions: object;
    options: htmlOption;
    autoClose: boolean;
    reverseText: boolean;
}
declare class Notify extends T {
    constructor();
    destroy(): any;
    done(notification: any): any;
    fail(error: any): any;
    show(): any;
    click(): any;
    close(): any;
    error(event: any): any;
    closeEvt(): void;
    errorEvt(): void;
    clickEvt(): void;
    showEvt(): void;
    stateDispatch(): void;
    init<Notice extends T>(notice: Notice): Promise<any>;
    showNotification(options: any): void;
}
export default Notify;
