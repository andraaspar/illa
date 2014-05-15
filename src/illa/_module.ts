/// <reference path='../../lib/JQuery.d.ts'/>

module illa {
	export function isString(v): boolean {
		return typeof v == 'string';
	}

	export function isBoolean(v): boolean {
		return typeof v == 'boolean';
	}

	export function isNumber(v): boolean {
		return typeof v == 'number';
	}

	export function isFunction(v): boolean {
		return typeof v == 'function';
	}

	export function isArray(v): boolean {
		return jQuery.isArray(v);
	}

	export function isUndefined(v): boolean {
		return typeof v == "undefined";
	}

	export function isNull(v): boolean {
		return v === null;
	}
	
	export function isUndefinedOrNull(v): boolean {
		return typeof v == "undefined" || v === null;
	}

	export function get(v): string {
		return jQuery.type(v);
	}
}