/**
 *	@author [author]
 *	@version [1.0]
 *	@description Utils
 * 
 */
import Log from './log';
function getProto( obj: any ): string {
	return Object.prototype.toString.call( obj );
}

function setFunction( data: string[], extendsObject: any, proto: any ): any {
	for (let item of data) {
		extendsObject[item] = isFunction(proto[item]) ? proto[item] : new Function();
	}
}

function getType( obj: any): string {
	let _def_type = getProto( obj );
	return _def_type.substring(8, _def_type.length - 1);
}

function throwType(obj: any, objName: string, callback?: Function ): any {	
	let obj_type = callback,
		proto_type = getType(obj);
	try {
		if (!obj_type(obj) && !isEmptyObject(obj)) {
			throw `TypeError: type can't resolve, '${objName}' must be ${obj_type}, but got ${proto_type}`;
		}
	}
	catch ( err: any ) {
		Log.Error( err );
	}
}

function isObject( obj: any ): Boolean {
	return getProto( obj ) === "[object Object]";
}

function isFunction( fn: Function ): Boolean {
	return getProto( fn ) === "[object Function]";
}

function isString( str: string ): Boolean {
	return typeof str === 'string';
}

function isEmptyObject( obj: any ): Boolean {
	return obj === null || (obj === void 0 && typeof obj === 'undefined');
}

function isNumber( number: number ): Boolean {
	return !Number.isNaN( Number( number ) ) && typeof number === 'number';
}

export default {
	getType: getType,
	setFunction: setFunction,
	throwType: throwType,
	isObject: isObject,
	isFunction: isFunction,
	isString: isString,
	isEmptyObject: isEmptyObject,
	isNumber: isNumber
}