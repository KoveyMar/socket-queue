/**
 *	@author [author]
 *	@version [version]
 *	@description module notification
 * 
 */
import Log from './log';
import Utils from './utils';
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
		this.autoClose = !0;
		this.reverseText = !1;
    	this.done = this.done.bind(this);
    	this.fail = this.fail.bind(this);
    	this.show = this.show.bind(this);
    	this.click = this.click.bind(this);
    	this.close = this.close.bind(this);
    	this.error = this.error.bind(this);
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
	 * @description 关闭事件
	 * @return {[type]}
	 */
	closeEvt(){
		this.ntf.onclose = () => {
			this.close();
		}
	}
	/**
	 * @description 错误事件
	 * @return {[type]} [description]
	 */
	errorEvt(){
		this.ntf.onerror = (e) => {
			this.error(e);
		}
	}
	/**
	 * @description 点击事件
	 * @return {[type]} [description]
	 */
	clickEvt(){
		this.ntf.onclick = (e) => {
			e.preventDefault();
			this.click();
		} 
	}
	/**
	 * 显示弹窗事件
	 * @return {[type]} [description]
	 */
	showEvt(){
		this.ntf.onshow = () => {
			this.show();
			this.autoClose && setTimeout( () => {
				this.ntf.close();
			}, 3000);
		}
	}
	/**
	 * @description 事件分发
	 */
	stateDispatch(){
		this.closeEvt();
		this.errorEvt();
		this.clickEvt();
		this.showEvt();
	}
	/**
	 * @param  notice {Object} { dir: 'auto', lang: '', tag: 'ID', body: 'body', icon: 'URL'}
	 * @return {[type]}
	 */
	init(notice){
		if ( !("Notification" in window) ) {
			return Log.Warn( `Your Browser Does Not Support Desktop Notification` );
		}

		Utils.isEmptyObject(notice) && Log.Warn( `Notification Resovle Default Options` );

		if ( Utils.isObject(notice) ) {
			Log.Warn(`Notification Resovle Options`);
			this.noticeOptions = notice;
			this.title = notice.title || '新的socket消息';
			this.options = notice.options || this.options;
			this.autoClose = !Utils.isEmptyObject(notice.autoClose) ? notice.autoClose : !0;
			this.reverseText = Utils.isEmptyObject(notice.reverseText) ? !1 : notice.reverseText;
			this.done = Utils.isFunction(notice.done) ? notice.done : new Function();
			this.fail = Utils.isFunction(notice.fail) ? notice.fail : new Function();
			this.close = Utils.isFunction(notice.OnClose) ? notice.OnClose : new Function();
			this.show = Utils.isFunction(notice.OnShow) ? notice.OnShow : new Function();
			this.click = Utils.isFunction(notice.OnClick) ? notice.OnClick : new Function();
			this.error = Utils.isFunction(notice.OnError) ? notice.OnError : new Function();
		}
		(Notification.permission === 'denied' || Notification.permission === 'default') && Notification.requestPermission();
	}
	showNotification( options = {} ){

		let _options = {
			...this.options,
			...options
		};
		let temp_body = _options.body, temp_title = this.title;

		this.reverseText && 
		(
			_options.body = temp_title, 
			temp_title = temp_body
		);

		if ( Notification.permission === 'granted' ) {
			this.ntf = new Notification( temp_title, _options );
			this.done( this.ntf );
			this.stateDispatch();
		}
		else if ( Notification.permission === 'denied' || Notification.permission === 'default' ) {
			Notification.requestPermission()
			.then( res => {
				Log.Warn(`Notification Has Been Allowed Work`);
				if ( res === 'granted' ) {
					this.ntf = new Notification( temp_title, _options );
					this.done( this.ntf );
					this.stateDispatch();			
				}

			})
			.catch( err => {
				Log.Warn( `Notification Could Not Resovle` );
				this.fail( err );
			});
		}
	}
}