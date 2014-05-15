/// <reference path='../../lib/JQuery.d.ts'/>

module illa {
	/**
	 * Returns true if the value is a string primitive.
	 */
	export function isString(v): boolean {
		return typeof v == 'string';
	}

	/**
	 * Returns true if the value is a boolean primitive.
	 */
	export function isBoolean(v): boolean {
		return typeof v == 'boolean';
	}

	/**
	 * Returns true if the value is a number primitive.
	 */
	export function isNumber(v): boolean {
		return typeof v == 'number';
	}

	/**
	 * Returns true if the value is a function.
	 */
	export function isFunction(v): boolean {
		return typeof v == 'function';
	}

	/**
	 * Returns true if the value is an array.
	 */
	export function isArray(v): boolean {
		return jQuery.isArray(v);
	}

	/**
	 * Returns true if the value is undefined.
	 */
	export function isUndefined(v): boolean {
		return typeof v == "undefined";
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
		return typeof v == "undefined" || v === null;
	}
	
	/**
	 * Returns true if the value is an object and not null.
	 */
	export function isObjectNotNull(v): boolean {
		return typeof v == "object" && v !== null;
	}

	/**
	 * Returns the type of value as reported by jQuery.
	 */
	export function get(v): string {
		return jQuery.type(v);
	}
}