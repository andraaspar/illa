import { IBind } from './IBind'
import { isFunction } from './Type'

/**
 * Binds a function to a ‘this’ context, and optionally prepends the specified arguments.
 * When prepending arguments:
 * a) This is type safe for functions taking up to 9 arguments
 * b) To achieve the best type safety, specify types explicitly - otherwise it may default to {}
 * c) For functions taking more than 9 arguments, use illa.bindUnsafe.
 */
export var bind = <IBind>function(fn: () => any, obj: Object, ...args: any[]): () => any {
	return fn.call.apply(fn.bind, arguments)
}

/**
 * Binds a function to a ‘this’ context, and also prepends the specified arguments.
 * This is not type safe.
 */
export var bindUnsafe: (fn: () => any, obj: Object, ...args: any[]) => () => any = bind

function throttleInternal(fn: (...args: any[]) => any, thisArg: {} | null, delay: number, isDebounce: boolean): { (...args: any[]): void; cancel(): void } {
	var timeoutRef: any
	var lastCalled: number = -Infinity
	var callNow = function(...args: any[]): void {
		lastCalled = new Date().getTime()
		clearTimeout(timeoutRef)
		fn.apply(thisArg, args)
	}
	var result = <{ (...args: any[]): void; cancel(): void }>function(...args): void {
		clearTimeout(timeoutRef)
		var now = new Date().getTime()
		var nextTrigger: number
		if (isDebounce) {
			nextTrigger = now + delay
		} else {
			nextTrigger = lastCalled + delay
		}
		if (nextTrigger > now) {
			// Should not call yet
			timeoutRef = setTimeout(bind.apply(undefined, [callNow, undefined].concat(args)), nextTrigger - now)
		} else {
			// Should call now
			callNow.apply(undefined, args)
		}
	}
	result.cancel = function(): void {
		clearTimeout(timeoutRef)
	}
	return result
}

/**
 * Restricts the number of calls to the passed in function to one per ‘delay’ milliseconds.
 */
export function throttle(fn: () => any, thisArg: {} | null, delay: number): { (): void; cancel(): void }
export function throttle<P1>(fn: (a: P1) => any, thisArg: {} | null, delay: number): { (a: P1): void; cancel(): void }
export function throttle<P1, P2>(fn: (a: P1, b: P2) => any, thisArg: {} | null, delay: number): { (a: P1, b: P2): void; cancel(): void }
export function throttle<P1, P2, P3>(fn: (a: P1, b: P2, c: P3) => any, thisArg: {} | null, delay: number): { (a: P1, b: P2, c: P3): void; cancel(): void }
export function throttle<P1, P2, P3, P4>(fn: (a: P1, b: P2, c: P3, d: P4) => any, thisArg: {} | null, delay: number): { (a: P1, b: P2, c: P3, d: P4): void; cancel(): void }
export function throttle<P1, P2, P3, P4, P5>(fn: (a: P1, b: P2, c: P3, d: P4, e: P5) => any, thisArg: {} | null, delay: number): { (a: P1, b: P2, c: P3, d: P4, e: P5): void; cancel(): void }
export function throttle<P1, P2, P3, P4, P5, P6>(fn: (a: P1, b: P2, c: P3, d: P4, e: P5, f: P6) => any, thisArg: {} | null, delay: number): { (a: P1, b: P2, c: P3, d: P4, e: P5, f: P6): void; cancel(): void }
export function throttle<P1, P2, P3, P4, P5, P6, P7>(fn: (a: P1, b: P2, c: P3, d: P4, e: P5, f: P6, g: P7) => any, thisArg: {} | null, delay: number): { (a: P1, b: P2, c: P3, d: P4, e: P5, f: P6, g: P7): void; cancel(): void }
export function throttle<P1, P2, P3, P4, P5, P6, P7, P8>(fn: (a: P1, b: P2, c: P3, d: P4, e: P5, f: P6, g: P7, h: P8) => any, thisArg: {} | null, delay: number): { (a: P1, b: P2, c: P3, d: P4, e: P5, f: P6, g: P7, h: P8): void; cancel(): void }
export function throttle<P1, P2, P3, P4, P5, P6, P7, P8, P9>(fn: (a: P1, b: P2, c: P3, d: P4, e: P5, f: P6, g: P7, h: P8, i: P9) => any, thisArg: {} | null, delay: number): { (a: P1, b: P2, c: P3, d: P4, e: P5, f: P6, g: P7, h: P8, i: P9): void; cancel(): void }
export function throttle(fn: (...args: any[]) => any, thisArg: {} | null, delay: number): { (...args: any[]): void; cancel(): void } {
	return throttleInternal(fn, thisArg, delay, false)
}

/**
 * The passed in function will be called only after ‘delay’ milliseconds elapsed after the last call.
 */
export function debounce(fn: () => any, thisArg: {} | null, delay: number): { (): void; cancel(): void }
export function debounce<P1>(fn: (a: P1) => any, thisArg: {} | null, delay: number): { (a: P1): void; cancel(): void }
export function debounce<P1, P2>(fn: (a: P1, b: P2) => any, thisArg: {} | null, delay: number): { (a: P1, b: P2): void; cancel(): void }
export function debounce<P1, P2, P3>(fn: (a: P1, b: P2, c: P3) => any, thisArg: {} | null, delay: number): { (a: P1, b: P2, c: P3): void; cancel(): void }
export function debounce<P1, P2, P3, P4>(fn: (a: P1, b: P2, c: P3, d: P4) => any, thisArg: {} | null, delay: number): { (a: P1, b: P2, c: P3, d: P4): void; cancel(): void }
export function debounce<P1, P2, P3, P4, P5>(fn: (a: P1, b: P2, c: P3, d: P4, e: P5) => any, thisArg: {} | null, delay: number): { (a: P1, b: P2, c: P3, d: P4, e: P5): void; cancel(): void }
export function debounce<P1, P2, P3, P4, P5, P6>(fn: (a: P1, b: P2, c: P3, d: P4, e: P5, f: P6) => any, thisArg: {} | null, delay: number): { (a: P1, b: P2, c: P3, d: P4, e: P5, f: P6): void; cancel(): void }
export function debounce<P1, P2, P3, P4, P5, P6, P7>(fn: (a: P1, b: P2, c: P3, d: P4, e: P5, f: P6, g: P7) => any, thisArg: {} | null, delay: number): { (a: P1, b: P2, c: P3, d: P4, e: P5, f: P6, g: P7): void; cancel(): void }
export function debounce<P1, P2, P3, P4, P5, P6, P7, P8>(fn: (a: P1, b: P2, c: P3, d: P4, e: P5, f: P6, g: P7, h: P8) => any, thisArg: {} | null, delay: number): { (a: P1, b: P2, c: P3, d: P4, e: P5, f: P6, g: P7, h: P8): void; cancel(): void }
export function debounce<P1, P2, P3, P4, P5, P6, P7, P8, P9>(fn: (a: P1, b: P2, c: P3, d: P4, e: P5, f: P6, g: P7, h: P8, i: P9) => any, thisArg: {} | null, delay: number): { (a: P1, b: P2, c: P3, d: P4, e: P5, f: P6, g: P7, h: P8, i: P9): void; cancel(): void }
export function debounce(fn: (...args: any[]) => any, thisArg: {} | null, delay: number): { (...args: any[]): void; cancel(): void } {
	return throttleInternal(fn, thisArg, delay, true)
}

/**
 * Executes code and catches errors. Falls back to provided functions or values.
 */
export function get<T>(fn: T | (() => T), ...rest: (T | (() => T))[]): T | undefined {
	if (isFunction(fn)) {
		try {
			return fn()
		} catch (e) {
			return rest.length ? get.apply(null, rest) : undefined
		}
	} else {
		return fn
	}
}

export function cancelGet(): never {
	throw 'cancelGet'
}