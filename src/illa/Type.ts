/// <reference path='../../lib/JQuery.d.ts'/>

module illa {
	export class Type {
		static isString(v): boolean {
			return typeof v == 'string';
		}

		static isBoolean(v): boolean {
			return typeof v == 'boolean';
		}

		static isNumber(v): boolean {
			return typeof v == 'number';
		}

		static isFunction(v): boolean {
			return typeof v == 'function';
		}

		static isArray(v): boolean {
			return jQuery.isArray(v);
		}

		static isUndefined(v): boolean {
			return typeof v == "undefined";
		}

		static isNull(v): boolean {
			return v === null;
		}
		
		static isUndefinedOrNull(v): boolean {
			return typeof v == "undefined" || v === null;
		}

		static get(v): string {
			return jQuery.type(v);
		}
	}
}