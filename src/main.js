/**
 *  @author [author]
 *  @version 1.0
 *  @description websocket and pormise resolve
 * 
 */
import Queue from './components/queue';
import Notification from './components/notification';
import Log from './components/log';
import { isObject, isString, isEmptyObject } from './components/utils';
export class socketQueue {

  constructor(){
    this.socket = null;
    this.queue = null;
    this.nfc = null;
    this.url = null;
    this.protocol = null;
    this.WSState = null;
  }

  init( ws, notice = {} ){
    if ( 'WebSocket' in window ) {
      return Log.warn(` Your Browser Dose Not Support WebSocket `);
    }

    isObject( ws ) && (this.url = ws.url, this.protocol = ws.protocol);

    isString( ws ) && (this.url = ws);

    if ( isEmptyObject(this.url) ) {
      return Log.error(` WebSocket'url is empty `);
    }

    this.initSocket();
    this.queue = new Queue();
    this.nfc = new Notification();
    this.nfc.init(notice);
  }
  /**
   * @description 建立WS连接前
   * @return {[type]}
   */
  beforeOpen(){}
  /**
   * @description 建立WS连接后
   * @return {[type]}
   */
  open(){}
  /**
   * @description 连接关闭前
   * @return {[type]}
   */
  beforeClosed(){}
  /**
   * @description 连接关闭后
   * @return {[type]}
   */
  closed(e){}
  /**
   * @description 发送WS数据
   * @param  {[type]}
   * @return {[type]}
   */
  send(data, fun = () => {}){
    this.WSState === 1 && (
      this.socket.send(data),
      fun()
    );
  }
  /**
   * @description 获取接受的第一条队列数据
   * @return 返回队列的第一条数据
   */
  getData(){
    return this.queue.next();
  }
  /**
   * @description 发送错误时回调
   * @return {[type]}
   */
  error(err){}
  /**
   * @description 销毁当前WS调用实例
   * @return {[type]}
   */
  destroy(){
    this.socket.close();
    this.socket = null;
    this.queue = null;
    this.nfc = null;
    this.url = null;
    this.protocol = null;
    this.WSState = null;
  }
  /**
   * @description 创建WS实例
   * @return {[type]}
   */
  static initSocket(){
    try {
      isEmptyObject(this.protocol) && Log.warn( `WebSocket protocol is empty` );
      this.socket = new WebSocket( this.url, this.protocol );
      Log.alert(' WebSocket is created ');
      this.stateDispatch( this.socket.readyState );
      this.openSocket();
      this.reloadSocket();
      this.errorSocket();
      this.closeSocket();
    }
    catch ( e ) {
      Log.error( e );
    }
  }
  /**
   * @description WS状态分发
   * @param  {[type]}
   * @return {[type]}
   */
  static stateDispatch( $value ) {
    this.WSState = $value;
    switch ( $value ) {
      case 0:
        Log.alert(' WebSocket is connecting... ');
        this.beforeOpen();
        break;
      case 1:
        Log.alert(' WebSocket is connect! ');
        this.open();
        break;
      case 2:
        Log.alert(' WebSocket will close... ');
        this.beforeClosed();
        break;
      case 3:
        Log.warn(' WebSocket is closed! ');
        this.closed();
        break;
    }
  }
  /**
   * @description WS信息接收
   * @return {[type]}
   */
  static openSocket(){

    this.socket.onopen = (e) => {
      // this.socket.send();
    }

    this.socket.onmessage = (e) => {
      const data = e.data;
      this.queue.add(data);
      this.ntf.showNotification();
    }
  }
  /**
   * @description 断线重连
   * @return {[type]}
   */
  static reloadSocket(){
    setTimeout( () => {}, 2000);
  }

  static errorSocket(){
    this.socket.onerror = (evt) => {
      Log.error( evt.reason );
      this.error( evt );
    }
  }

  static closeSocket(){
    this.socket.onclose = (evt) => {
      Log.warn( evt.reason );
      this.closed(evt);
    }
  }

}