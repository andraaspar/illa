module illa {
	/**
	 * A reference to the global object.
	 * This is the window in a browser, and the global in node.
	 */
	export var GLOBAL = (function() {
		return this;
	})();

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
	 * Array subclasses are not recognized as arrays.
	 */
	export function isArray(v): boolean {
		return illa.getType(v) == 'array';
	}

	if (Array.isArray) illa.isArray = Array.isArray;

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
	export function isObjectNotNull(v): boolean {
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
				result = illa.classByType[illa.classByType.toString.call(v)] || 'object';
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

	/**
	 * Binds a function to a ‘this’ context.
	 * No argument binding allows us to keep function type safety.
	 */
	export function bind<T extends Function>(fn: T, obj: Object): T {
		if (!fn) throw 'No function.';
		return <any>function() {
			return fn.apply(obj, arguments);
		};
	}

	/**
	 * Binds a function to a ‘this’ context, and also prepends the specified arguments
	 * This is not type safe because of argument binding.
	 */
	export function partial(fn: Function, obj: Object, ...args: any[]): Function {
		if (!fn) throw 'No function.';
		return function() {
			return fn.apply(obj, args.concat(Array.prototype.slice.call(arguments)));
		}
	}

	if (Function.prototype.bind) {
		illa.bind = illa.partial = function(fn, obj) {
			return fn.call.apply(fn.bind, arguments);
		};
	}
}