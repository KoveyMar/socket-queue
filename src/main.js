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
    this.beforeOpen = this.beforeOpen.bind(this);
    this.open = this.open.bind(this);
    this.beforeClosed = this.beforeClosed.bind(this);
    this.closed = this.closed.bind(this);
    this.error = this.error.bind(this);
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
   * @description WS状态分发
   * @param  {[type]}
   * @return {[type]}
   */
  static stateDispatch( $value ) {
    this.WSState = $value;
    switch ( $value ) {
      case 0:
        Log.alert(' WebSocket is connecting... ');
        // this.beforeOpen();
        break;
      case 1:
        Log.alert(' WebSocket is connect! ');
        // this.open();
        break;
      case 2:
        Log.alert(' WebSocket will close... ');
        // this.beforeClosed();
        break;
      case 3:
        Log.warn(' WebSocket is closed! ');
        // this.closed();
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
      this.open();
    }

    this.socket.onmessage = (e) => {
      const data = e.data;
      this.queue.add(data);
      const options = {
        body: data
      };
      this.ntf.showNotification(options);
    }
  }
  /**
   * @description 断线重连
   * @return {[type]}
   */
  static reloadSocket(){
    //TODO
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
  /**
   * [init description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   */
  init( options = {} ){
    if ( !'WebSocket' in window ) {
      return Log.warn(` Your Browser Dose Not Support WebSocket `);
    }
    if ( isEmptyObject(options) ) {
      return Log.error(` WebSocket Can't Resolve Empty Options`);
    }

    const socket = options.socket,
      notice = options.notice;

    isObject( socket ) && (this.url = socket.url, this.protocol = socket.protocol);

    isString( socket ) && (this.url = socket);

    isEmptyObject(this.protocol) && Log.warn( `WebSocket protocol is empty` );

    if ( isEmptyObject(this.url) ) {
      return Log.error(` WebSocket'url is empty `);
    }
    try {
      this.socket = new WebSocket( this.url, this.protocol );
      Log.alert(' WebSocket is created ');
      this.constructor.stateDispatch( this.socket.readyState );
      this.constructor.openSocket();
      this.constructor.reloadSocket();
      this.constructor.errorSocket();
      this.constructor.closeSocket();
      this.queue = new Queue();
      this.nfc = new Notification();
      this.nfc.init(socket.notice);
    }
    catch ( e ) {
      Log.error( e );
    }
  }
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
}