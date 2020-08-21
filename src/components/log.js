/**
 *	@author [author]
 *	@version [version]
 *	@description module log
 * 
 */
export default class Log {
	constructor(){
		this.msg = null;
		this.debug = !1;
	}

	static Error( msg ){
		console.error( `Socket Error - [ ${msg} ]` );
	}

	static Warn( msg ){
		console.warn( `Socket Warning - [ ${msg} ]` );
	}

	static Info( msg ) {
		console.log( `Socket Info - [ ${msg} ]` );
	}
}