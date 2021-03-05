/**
 *	@author [author]
 *	@version [1.0]
 *	@description Utils
 * 
 */
import Log from './log';

export function getProto( obj: any ): string {
	return Object.prototype.toString.call( obj );
}

export function jsonSwitch( obj: object ): string {
	return JSON.stringify(obj);
}

export function getString( obj: any, replaceString?: string | undefined ): string {
	return isRefTypes(obj) ? jsonSwitch(obj) : ( isEmptyObject(obj) ? ( replaceString || '' ) : obj.toString());
}

export function setFunction( data: string[], extendsObject: any, proto: any ): void {
	for (let item of data) {
		extendsObject[item] = isFunction(proto[item]) ? proto[item] : new Function();
	}
}

export function getType( obj: any ): string {
	let _def_type = getProto( obj );
	return _def_type.substring(8, _def_type.length - 1);
}

export function throwType( obj: any, objName: string, callback?: Function ): void {	
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

export function isRefTypes( obj: any ): boolean {
	let type = [ 'Number', 'String', 'Boolean', 'Undefined', 'Null' ]
		, flag = !0;
	for (let j of type) {
		getProto(obj) == `[object ${j}]` && ( flag = !1 );
	}
	return flag;
}

export function isObject( obj: any ): boolean {
	return getProto( obj ) === "[object Object]";
}

export function isFunction( fn: Function ): boolean {
	return getProto( fn ) === "[object Function]";
}

export function isString( str: string ): boolean {
	return typeof str === 'string';
}

export function isEmptyObject( obj: any ): boolean {
	return obj === null || (obj === void 0 && typeof obj === 'undefined');
}

export function isNumber( number: number ): boolean {
	return !Number.isNaN( Number( number ) ) && typeof number === 'number';
}

export default {
	getType,
	getString,
	setFunction,
	throwType,
	isRefTypes,
	isObject,
	isFunction,
	isString,
	isEmptyObject,
	isNumber
}