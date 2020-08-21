/**
 *	@author [author]
 *	@version [1.0]
 *	@description Utils
 * 
 */
export function isObject( obj ) {
	return Object.prototype.toString.call( obj ) === "[object Object]";
}

export function isFun( fn ) {
	return Object.prototype.toString.call( fn ) === "[object Function]";
}

export function isString( str ) {
	return typeof str === 'string';
}

export function isEmptyObject( obj ) {
	return obj === null || (obj === void 0 && typeof obj === 'undefined');
}

export function isNumber( number ) {
	return !Number.isNaN( Number( number ) ) && typeof number === 'number';
}

export function getType( obj ) {
	let _def_type = Object.prototype.toString.call( obj )
	return _def_type.substring(8, _def_type.length - 1);
}
