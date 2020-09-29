/**
 *	@author [author]
 *	@version [version]
 *	@description module log
 * 
 */
export default class Log {
	constructor(){
		this.msg = null;
	}

	static isLog = !0;

	set isLog(value) {
		this.isLog = value;
	}

	get isLog() {
		return this.isLog;
	}

	static Error( msg ){
		this.isLog && console.error( `Socket Error - [ ${msg} ]` );
	}

	static Warn( msg ){
		this.isLog && console.warn( `Socket Warning - [ ${msg} ]` );
	}

	static Info( msg ) {
		this.isLog && console.log( `Socket Info - [ ${msg} ]` );
	}
}