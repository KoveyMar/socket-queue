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

	static error( msg ){
		console.error( `Socket Error - [ ${msg} ]` );
	}

	static warn( msg ){
		console.warn( `Socket Warning - [ ${msg} ]` );
	}

	static Info( msg ) {
		console.log( `Socket Info - [ ${msg} ]` );
	}
}