/**
 *	@author [author]
 *	@version [version]
 *	@description module notification
 * 
 */
import Log from './log';
import { isObject, isEmptyObject } from './utils';
export default class notification {
	/**
	 * [constructor description]
	 * @attribute [noticeOptions] 	实例对象接收配置
	 * @attribute [options]			默认配置参数
	 * @attribute [autoClose]		是否自动关闭
	 * @return {[type]} [description]
	 */
	constructor(){
		this.ntf = null;
		this.title = '新的socket消息';
		this.noticeOptions = {};
		this.options = null;
		this.autoClose = !0;
	}
	/**
	 * @param  notice {Object} { dir: 'auto', lang: '', tag: 'ID', body: 'body', icon: 'URL'}
	 * @return {[type]}
	 */
	init(notice = {}){
		if ( !("Notification" in window) ) {
			return Log.warn( `Your Browser Does Not Support Desktop Notification` );
		}

		isEmptyObject(notice) && Log.warn( `Notification Can't Resovle Empty Options` );

		this.options = {
			dir: 'auto',
			lang: 'zh-cn',
			badge: '',
			body: '',
			tag: '',
			icon: '',
			image: '',
			data: '',
			vibrate: '',
			renotify: !1,
			requireInteraction: !1
		};

		if ( isObject(notice) ) {
			this.noticeOptions = notice;
			this.title = notice.title;
			this.options = notice.options;
			this.autoClose = !isEmptyObject(notice.autoClose) ? notice.autoClose : !0;
			this.done = notice.done || new Function();
			this.fail = notice.fail || new Function();
			this.close = notice.OnClose || new Function();
			this.show = notice.OnShow || new Function();
			this.click = notice.OnClick || new Function();
			this.error = notice.OnError || new Function();
		}
		Notification.requestPermission();
	}
	showNotification( options = {} ){

		let _options = {
			...options,
			...this.options
		};

		if ( Notification.permission === 'granted' ) {
			this.ntf = new Notification( this.title, _options );
			this.done();
			this.EvtDispatch();
		}
		else if ( Notification.permission === 'denied' || Notification.permission === 'default') {
			Notification.requestPermission()
			.then( res => {
				if ( res === 'granted' ) {
					this.ntf = new Notification( this.title, _options );
					this.done();
					this.EvtDispatch();					
				}

			})
			.catch( err => {
				this.fail();
			});
		}
	}
	/**
	 * @description 实例初始化成功回调
	 * @return {Function}
	 */
	done(){}
	/**
	 * @description 实例初始化失败回调
	 * @return {[type]}
	 */
	fail(){}
	/**
	 * @description 通知显示时，实例回调
	 * @return {[type]}
	 */
	show(){}
	/**
	 * @description 点击通知时，实例回调
	 * @return {[type]}
	 */
	click(){}
	/**
	 * @description 关闭通知时，实例回调
	 * @return {[type]}
	 */
	close(){}
	/**
	 * @description 发送错误时，实例回调
	 * @return {[type]}
	 */
	error(){}
	/**
	 * @description 事件分发
	 */
	static EvtDispatch(){
		this.closeEvt();
		this.errorEvt();
		this.clickEvt();
		this.showEvt();
	}
	/**
	 * @description 关闭事件
	 * @return {[type]}
	 */
	static closeEvt(){
		this.ntf.onclose = () => {
			this.close();
		}
	}

	static errorEvt(){
		this.ntf.onerror = (e) => {
			this.error(e);
		}
	}

	static clickEvt(){
		this.ntf.onclick = (e) => {
			e.preventDefault();
			this.click();
		} 
	}

	static showEvt(){
		this.ntf.onshow = () => {
			this.show();
			this.autoClose && setTimeout( () => {
				this.ntf.close();
			}, 4000);
		}
	}
}