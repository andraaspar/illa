

export var classByType = (function() {
	var classes = 'Boolean Number String Function Array Date RegExp Object Error'.split(' ');
	var result: { [s: string]: string } = {};
	for (var i = 0, n = classes.length; i < n; i++) {
		result['[object ' + classes[i] + ']'] = classes[i].toLowerCase();
	}
	return result;
})();

/**
 * Returns true if the value is a string primitive.
 */
export function isString(v): v is string {
	return typeof v == 'string';
}

/**
 * Returns true if the value is a boolean primitive.
 */
export function isBoolean(v): v is boolean {
	return typeof v == 'boolean';
}

/**
 * Returns true if the value is a number primitive.
 */
export function isNumber(v): v is number {
	return typeof v == 'number';
}

/**
 * Returns true if the value is a function.
 */
export function isFunction(v): v is Function {
	return typeof v == 'function';
}

/**
 * Returns true if the value is an array.
 * Array subclasses are not recognized as arrays.
 */
function isArrayInternal(v): v is any[] {
	return getType(v) == 'array';
}
var isArray = Array.isArray || isArrayInternal;
export {isArray};

/**
 * Returns true if the value is undefined.
 */
export function isUndefined(v): boolean {
	return typeof v == 'undefined';
}

/**
 * Returns true if the value is null.
 */
export function isNull(v): boolean {
	return v === null;
}

/**
 * Returns true if the value is undefined or null.
 */
export function isUndefinedOrNull(v): boolean {
	return typeof v == 'undefined' || v === null;
}

/**
 * Returns true if the value is an object and not null. Includes functions.
 */
export function isObjectNotNull(v): v is {} {
	var t = typeof v;
	return t == 'object' && v !== null || t == 'function';
}

/**
 * Returns the type of value.
 */
export function getType(v): string {
	var result = '';
	if (v == null) {
		result = v + '';
	} else {
		result = typeof v;
		if (result == 'object' || result == 'function') {
			result = classByType[classByType.toString.call(v)] || 'object';
		}
	}
	return result;
}

/**
 * Returns the value if ‘instanceof’ is true for the given constructor.
 */
export function as<T>(c: new (...r) => T, v): T {
	return v instanceof c ? v : null;
}

export default {
	classByType,
	isString,
	isBoolean,
	isNumber,
	isFunction,
	isArray,
	isUndefined,
	isNull,
	isUndefinedOrNull,
	isObjectNotNull,
	getType,
	as
}