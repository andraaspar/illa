export type TSet<T> = {[_: string]: T}
export type TOmit<T, K> = Pick<T, Exclude<keyof T, K>>
export type TDiff<T, O> = Pick<T, Exclude<keyof T, keyof O>>

/**
 * Returns true if the value is a string primitive.
 */
export function isString(v: any): v is string {
	return typeof v == 'string'
}

/**
 * Returns true if the value is a boolean primitive.
 */
export function isBoolean(v: any): v is boolean {
	return typeof v == 'boolean'
}

/**
 * Returns true if the value is a number primitive.
 */
export function isNumber(v: any): v is number {
	return typeof v == 'number'
}

/**
 * Returns true if the value is a function.
 */
export function isFunction(v: any): v is Function {
	return typeof v == 'function'
}

/**
 * Returns true if the value is an array.
 */
export var isArray = Array.isArray

/**
 * Returns true if the value is undefined.
 */
export function isUndefined(v: any): v is undefined {
	return typeof v == 'undefined'
}

/**
 * Returns true if the value is null.
 */
export function isNull(v: any): boolean {
	return v === null
}

/**
 * Returns true if the value is undefined or null.
 */
export function isUndefinedOrNull(v: any): v is (undefined | null) {
	return v == null
}

/**
 * Returns true if the value is an object and not null. Includes functions.
 */
export function isObjectNotNull(v: any): v is object {
	var t = typeof v
	return t == 'object' && v !== null || t == 'function'
}

/**
 * Returns the value if ‘instanceof’ is true for the given constructor.
 */
export function ifInstanceOf<T>(c: new (...r: any[]) => T, v: any): T | null {
	return v instanceof c ? v : null
}

/**
 * Makes sure an object satisfies the given interface.
 */
export function withInterface<T>(a: T): T {
	return a
}