/**
 *	@author [author]
 *	@version [1.0]
 *	@description Utils
 * 
 */
import Log from './log';
function getProto( obj ){
	return Object.prototype.toString.call( obj );
}

function getType( obj) {
	let _def_type = getProto( obj );
	return _def_type.substring(8, _def_type.length - 1);
}

function throwType(obj, objName, fun = { fn: callback } ){	
	let obj_type = Object.keys(fun)[0],
		proto_type = getType(obj);
	try {
		if (!Object.values(fun)[0](obj)) {
			throw `TypeError: type can't resolve, '${objName}' must be ${obj_type}, but got ${proto_type}`;
		}
	}
	catch ( err ) {
		Log.Error( err );
	}
}

function isObject( obj ) {
	return getProto( obj ) === "[object Object]";
}

function isFunction( fn ) {
	return getProto( fn ) === "[object Function]";
}

function isString( str ) {
	return typeof str === 'string';
}

function isEmptyObject( obj ) {
	return obj === null || (obj === void 0 && typeof obj === 'undefined');
}

function isNumber( number ) {
	return !Number.isNaN( Number( number ) ) && typeof number === 'number';
}

export default {
	getType: getType,
	throwType: throwType,
	isObject: isObject,
	isFunction: isFunction,
	isString: isString,
	isEmptyObject: isEmptyObject,
	isNumber: isNumber
}