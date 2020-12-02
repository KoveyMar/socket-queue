/**
 *	@author [author]
 *	@version [version]
 *	@description module log
 * 
 */
class T {
	msg: string;
}
class Log extends T {
	constructor(){
		super();
		this.msg = null;
	}

	static isLog: boolean = !0;

	/**
	 * @param {boolean} value 是否打印日志
	 */
	set isLog(value: boolean) {
		this.isLog = value;
	}
	/**
	 * @return {boolean}
	 */
	get isLog(): boolean {
		return this.isLog;
	}

	static Error( msg: any ){
		this.isLog && console.error( `Socket Error - [ ${msg} ]` );
	}

	static Warn( msg: any ){
		this.isLog && console.warn( `Socket Warning - [ ${msg} ]` );
	}

	static Info( msg: any ) {
		this.isLog && console.log( `Socket Info - [ ${msg} ]` );
	}
}

export default Log