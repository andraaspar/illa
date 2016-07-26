import IBind from './IBind';

function bindInternal(fn: Function, obj: Object, ...args: any[]): () => any {
	if (!fn) throw 'No function.';
	return function() {
		return fn.apply(obj, args.concat(Array.prototype.slice.call(arguments)));
	}
}

function bindNative(fn: Function, obj: Object, ...args: any[]): () => any {
	return fn.call.apply(fn.bind, arguments);
}

/**
 * Binds a function to a ‘this’ context, and optionally prepends the specified arguments.
 * When prepending arguments:
 * a) This is type safe for functions taking up to 9 arguments;
 * b) To achieve the best type safety, specify types explicitly - otherwise it may default to {};
 * c) For functions taking more than 9 arguments, use illa.bindUnsafe.
 */
export var bind: IBind = !Function.prototype.bind ? bindInternal : bindNative;

/**
 * Binds a function to a ‘this’ context, and also prepends the specified arguments.
 * This is not type safe.
 */
export var bindUnsafe: (fn: Function, obj: Object, ...args: any[]) => () => any = !Function.prototype.bind ? bindInternal : bindNative;

function throttleInternal(fn: (...args) => any, thisArg: {}, delay: number, isDebounce: boolean): { (...args): void; cancel(): void } {
	var timeoutRef;
	var lastCalled: number = -Infinity;
	var callNow = function(...args): void {
		lastCalled = new Date().getTime();
		clearTimeout(timeoutRef);
		fn.apply(thisArg, args);
	};
	var result = <{ (...args): void; cancel(): void }>function(...args): void {
		clearTimeout(timeoutRef);
		var now = new Date().getTime();
		var nextTrigger: number;
		if (isDebounce) {
			nextTrigger = now + delay;
		} else {
			nextTrigger = lastCalled + delay;
		}
		if (nextTrigger > now) {
			// Should not call yet
			timeoutRef = setTimeout(bind.apply(this, [callNow, this].concat(args)), nextTrigger - now);
		} else {
			// Should call now
			callNow.apply(this, args);
		}
	};
	result.cancel = function(): void {
		clearTimeout(timeoutRef);
	};
	return result;
}

/**
 * Restricts the number of calls to the passed in function to one per ‘delay’ milliseconds.
 */
export function throttle(fn: () => any, thisArg: {}, delay: number): { (): void; cancel(): void };
export function throttle<P1>(fn: (P1) => any, thisArg: {}, delay: number): { (P1): void; cancel(): void };
export function throttle<P1, P2>(fn: (P1, P2) => any, thisArg: {}, delay: number): { (P1, P2): void; cancel(): void };
export function throttle<P1, P2, P3>(fn: (P1, P2, P3) => any, thisArg: {}, delay: number): { (P1, P2, P3): void; cancel(): void };
export function throttle<P1, P2, P3, P4>(fn: (P1, P2, P3, P4) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4): void; cancel(): void };
export function throttle<P1, P2, P3, P4, P5>(fn: (P1, P2, P3, P4, P5) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4, P5): void; cancel(): void };
export function throttle<P1, P2, P3, P4, P5, P6>(fn: (P1, P2, P3, P4, P5, P6) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4, P5, P6): void; cancel(): void };
export function throttle<P1, P2, P3, P4, P5, P6, P7>(fn: (P1, P2, P3, P4, P5, P6, P7) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4, P5, P6, P7): void; cancel(): void };
export function throttle<P1, P2, P3, P4, P5, P6, P7, P8>(fn: (P1, P2, P3, P4, P5, P6, P7, P8) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4, P5, P6, P7, P8): void; cancel(): void };
export function throttle<P1, P2, P3, P4, P5, P6, P7, P8, P9>(fn: (P1, P2, P3, P4, P5, P6, P7, P8, P9) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4, P5, P6, P7, P8, P9): void; cancel(): void };
export function throttle(fn: (...args) => any, thisArg: {}, delay: number): { (...args): void; cancel(): void } {
	return throttleInternal(fn, thisArg, delay, false);
}

/**
 * The passed in function will be called only after ‘delay’ milliseconds elapsed after the last call.
 */
export function debounce(fn: () => any, thisArg: {}, delay: number): { (): void; cancel(): void };
export function debounce<P1>(fn: (P1) => any, thisArg: {}, delay: number): { (P1): void; cancel(): void };
export function debounce<P1, P2>(fn: (P1, P2) => any, thisArg: {}, delay: number): { (P1, P2): void; cancel(): void };
export function debounce<P1, P2, P3>(fn: (P1, P2, P3) => any, thisArg: {}, delay: number): { (P1, P2, P3): void; cancel(): void };
export function debounce<P1, P2, P3, P4>(fn: (P1, P2, P3, P4) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4): void; cancel(): void };
export function debounce<P1, P2, P3, P4, P5>(fn: (P1, P2, P3, P4, P5) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4, P5): void; cancel(): void };
export function debounce<P1, P2, P3, P4, P5, P6>(fn: (P1, P2, P3, P4, P5, P6) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4, P5, P6): void; cancel(): void };
export function debounce<P1, P2, P3, P4, P5, P6, P7>(fn: (P1, P2, P3, P4, P5, P6, P7) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4, P5, P6, P7): void; cancel(): void };
export function debounce<P1, P2, P3, P4, P5, P6, P7, P8>(fn: (P1, P2, P3, P4, P5, P6, P7, P8) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4, P5, P6, P7, P8): void; cancel(): void };
export function debounce<P1, P2, P3, P4, P5, P6, P7, P8, P9>(fn: (P1, P2, P3, P4, P5, P6, P7, P8, P9) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4, P5, P6, P7, P8, P9): void; cancel(): void };
export function debounce(fn: (...args) => any, thisArg: {}, delay: number): { (...args): void; cancel(): void } {
	return throttleInternal(fn, thisArg, delay, true);
}

export default {
	bind,
	bindUnsafe,
	throttle,
	debounce
};