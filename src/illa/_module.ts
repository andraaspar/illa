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
	export function isArray(v): v is any[] {
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
	 * Binds a function to a ‘this’ context, and optionally prepends the specified arguments.
	 * When prepending arguments:
	 * a) This is type safe for functions taking up to 9 arguments;
	 * b) To achieve the best type safety, specify types explicitly - otherwise it may default to {};
	 * c) For functions taking more than 9 arguments, use illa.bindUnsafe.
	 */
	export function bind<P1, R>(fn: (p1: P1) => R, obj: {}, p1: P1): () => R;
	export function bind<P1, P2, R>(fn: (p1: P1, p2: P2) => R, obj: {}, p1: P1): (p2: P2) => R;
	export function bind<P1, P2, P3, R>(fn: (p1: P1, p2: P2, p3: P3) => R, obj: {}, p1: P1): (p2: P2, p3: P3) => R;
	export function bind<P1, P2, P3, P4, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4) => R, obj: {}, p1: P1): (p2: P2, p3: P3, p4: P4) => R;
	export function bind<P1, P2, P3, P4, P5, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R, obj: {}, p1: P1): (p2: P2, p3: P3, p4: P4, p5: P5) => R;
	export function bind<P1, P2, P3, P4, P5, P6, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6) => R, obj: {}, p1: P1): (p2: P2, p3: P3, p4: P4, p5: P5, p6: P6) => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R, obj: {}, p1: P1): (p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, P8, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R, obj: {}, p1: P1): (p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R, obj: {}, p1: P1): (p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R;
	export function bind<P1, P2, R>(fn: (p1: P1, p2: P2) => R, obj: {}, p1: P1, p2: P2): () => R;
	export function bind<P1, P2, P3, R>(fn: (p1: P1, p2: P2, p3: P3) => R, obj: {}, p1: P1, p2: P2): (p3: P3) => R;
	export function bind<P1, P2, P3, P4, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4) => R, obj: {}, p1: P1, p2: P2): (p3: P3, p4: P4) => R;
	export function bind<P1, P2, P3, P4, P5, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R, obj: {}, p1: P1, p2: P2): (p3: P3, p4: P4, p5: P5) => R;
	export function bind<P1, P2, P3, P4, P5, P6, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6) => R, obj: {}, p1: P1, p2: P2): (p3: P3, p4: P4, p5: P5, p6: P6) => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R, obj: {}, p1: P1, p2: P2): (p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, P8, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R, obj: {}, p1: P1, p2: P2): (p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R, obj: {}, p1: P1, p2: P2): (p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R;
	export function bind<P1, P2, P3, R>(fn: (p1: P1, p2: P2, p3: P3) => R, obj: {}, p1: P1, p2: P2, p3: P3): () => R;
	export function bind<P1, P2, P3, P4, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4) => R, obj: {}, p1: P1, p2: P2, p3: P3): (p4: P4) => R;
	export function bind<P1, P2, P3, P4, P5, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R, obj: {}, p1: P1, p2: P2, p3: P3): (p4: P4, p5: P5) => R;
	export function bind<P1, P2, P3, P4, P5, P6, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6) => R, obj: {}, p1: P1, p2: P2, p3: P3): (p4: P4, p5: P5, p6: P6) => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R, obj: {}, p1: P1, p2: P2, p3: P3): (p4: P4, p5: P5, p6: P6, p7: P7) => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, P8, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R, obj: {}, p1: P1, p2: P2, p3: P3): (p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R, obj: {}, p1: P1, p2: P2, p3: P3): (p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R;
	export function bind<P1, P2, P3, P4, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4): () => R;
	export function bind<P1, P2, P3, P4, P5, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4): (p5: P5) => R;
	export function bind<P1, P2, P3, P4, P5, P6, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4): (p5: P5, p6: P6) => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4): (p5: P5, p6: P6, p7: P7) => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, P8, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4): (p5: P5, p6: P6, p7: P7, p8: P8) => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4): (p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R;
	export function bind<P1, P2, P3, P4, P5, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5): () => R;
	export function bind<P1, P2, P3, P4, P5, P6, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5): (p6: P6) => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5): (p6: P6, p7: P7) => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, P8, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5): (p6: P6, p7: P7, p8: P8) => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5): (p6: P6, p7: P7, p8: P8, p9: P9) => R;
	export function bind<P1, P2, P3, P4, P5, P6, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6): () => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6): (p7: P7) => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, P8, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6): (p7: P7, p8: P8) => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6): (p7: P7, p8: P8, p9: P9) => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7): () => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, P8, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7): (p8: P8) => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7): (p8: P8, p9: P9) => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, P8, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8): () => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8): (p9: P9) => R;
	export function bind<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9): () => R;
	export function bind<T extends Function>(fn: T, obj: {}): T;
	export function bind(fn: Function, obj: Object, ...args: any[]): () => any {
		if (!fn) throw 'No function.';
		return function() {
			return fn.apply(obj, args.concat(Array.prototype.slice.call(arguments)));
		}
	}
	
	/**
	 * Binds a function to a ‘this’ context, and also prepends the specified arguments.
	 * This is not type safe.
	 */
	export function bindUnsafe(fn: Function, obj: Object, ...args: any[]): () => any {
		return illa.bind.call(this, arguments);
	}

	if (Function.prototype.bind) {
		illa.bind = illa.bindUnsafe = function(fn) {
			return fn.call.apply(fn.bind, arguments);
		};
	}
	
	/**
	 * Generates a UUID.
	 * Based on: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
	 */
	export function uuid(): string {
		var base: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
		var result: string = base.replace(/[xy]/g, function(char) {
			var random = cryptoRandom16();
			var result = char == 'x' ? random : (random & 0x3 | 0x8);
			return result.toString(16);
		});
		return result;
	}
	
	function cryptoRandom16(): number {
		var result: number;
		if (illa.GLOBAL.crypto) {
			if (illa.GLOBAL.crypto.getRandomValues) {
				result = illa.GLOBAL.crypto.getRandomValues(new Uint8Array(1))[0] % 16;
			} else if (illa.GLOBAL.crypto.randomBytes) {
				result = illa.GLOBAL.crypto.randomBytes(1)[0] % 16;
			}
		}
		if (isNaN(result)) {
			result = Math.random() * 16;
		}
		return Math.floor(result);
	}
	
	/**
	 * Adds dynamic properties to an object.
	 */
	export function addProps<T extends {}>(obj: T, ...rest: any[]): T {
		for (var i = 0, n = rest.length; i < n; i += 2) {
			if (illa.isString(rest[i])) {
				obj[rest[i]] = rest[i + 1];
			}
		}
		return obj;
	}
}