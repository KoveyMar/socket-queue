/**
 *	@author [author]
 *	@version [version]
 *	@description module notification
 * 
 */
import Log from 'log';
export class notification {
	constructor(){
		this.ntf = null;
		this.title = '新的socket消息';
		this.notice = null;
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
		if ( notice ) {
			this.title = notice.title;
			this.options = notice.options;
			this.autoClose = notice.autoClose;
			this.done = notice.done || new Function();
			this.fail = notice.fail || new Function();
			this.close = notice.OnClose || new Function();
			this.show = notice.OnShow || new Function();
			this.click = notice.OnClick || new Function();
			this.error = notice.OnError || new Function();
		}
		this.showNotification();
	}
	showNotification(){

		if ( Notification.permission === "granted" ) {
			this.ntf = new Notification( this.title, this.options );
			this.done();
			this.EvtDispatch();
		}
		else if ( Notification.permission !== 'denied' ) {
			Notification.requestPermission()
			.then( res => {
				if ( res === 'granted' ) {
					this.ntf = new Notification( this.title, this.options );
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