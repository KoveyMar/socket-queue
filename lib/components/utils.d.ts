declare function setFunction(data: string[], extendsObject: any, proto: any): any;
declare function getType(obj: any): string;
declare function throwType(obj: any, objName: string, callback?: Function): any;
declare function isObject(obj: any): Boolean;
declare function isFunction(fn: Function): Boolean;
declare function isString(str: string): Boolean;
declare function isEmptyObject(obj: any): Boolean;
declare function isNumber(number: number): Boolean;
declare const _default: {
    getType: typeof getType;
    setFunction: typeof setFunction;
    throwType: typeof throwType;
    isObject: typeof isObject;
    isFunction: typeof isFunction;
    isString: typeof isString;
    isEmptyObject: typeof isEmptyObject;
    isNumber: typeof isNumber;
};
export default _default;
