import { FunQ } from 'fun-q'
import { IBind } from './IBind'
import { isFunction, isUndefined } from './Type'

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

export interface IDelayedFunction<R> {
	(...args: any[]): FunQ<R>
	callNow(...args: any[]): R
	cancel(): void
	lastCalled: number
	timeoutRef: any
	isScheduled(): boolean
}

function delayInternal<R>(fn: (...args: any[]) => R, thisArg: {} | null, delay: number, isDebounce: boolean): IDelayedFunction<R> {
	let result: IDelayedFunction<R> = <any>function(...args3: any[]): FunQ<R | undefined> {
		return new FunQ<R | undefined>({
			value: undefined
		})
			.onValueDoWithCallback((v, resolve, reject) => {
				result.cancel()

				let now = Date.now()
				let nextTrigger: number
				if (isDebounce) {
					nextTrigger = now + delay
				} else {
					nextTrigger = result.lastCalled + delay
				}
				if (nextTrigger > now) {
					// Should not call yet
					result.timeoutRef = setTimeout(function() {
						resolve(result.callNow(...args3))
					}, nextTrigger - now)
				} else {
					// Should call now
					resolve(result.callNow(...args3))
				}
			})
			.start()
	}
	result.lastCalled = -Infinity
	result.callNow = function(...args2: any[]) {
		result.lastCalled = Date.now()
		result.cancel()
		return fn.apply(thisArg, args2)
	}
	result.cancel = function(): void {
		clearTimeout(result.timeoutRef)
		result.timeoutRef = undefined
	}
	result.isScheduled = function(): boolean {
		return !isUndefined(result.timeoutRef)
	}
	return result
}

/*
var genericArgs = ``
var fnArgs = ``
var out = ``
for (let argCount = 0; argCount <= 10; argCount++) {
	out += `export function throttle<R${genericArgs}>(fn: (${fnArgs}) => R, thisArg: {} | null | undefined, delay: number): { (${fnArgs}): FunQ<R>; callNow(${fnArgs}): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean }
`
	genericArgs += `, P${argCount}`
	fnArgs += `${argCount > 0 ? `, ` : ``}${`abcdefghijklmnopqrstuvwxyz`[argCount]}: P${argCount}`
}
console.log(out)
*/

/**
 * Restricts the number of calls to the passed in function to one per ‘delay’ milliseconds.
 */
export function throttle<R>(fn: () => R, thisArg: {} | null | undefined, delay: number): { (): FunQ<R>; callNow(): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean }
export function throttle<R, P0>(fn: (a: P0) => R, thisArg: {} | null | undefined, delay: number): { (a: P0): FunQ<R>; callNow(a: P0): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean }
export function throttle<R, P0, P1>(fn: (a: P0, b: P1) => R, thisArg: {} | null | undefined, delay: number): { (a: P0, b: P1): FunQ<R>; callNow(a: P0, b: P1): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean }
export function throttle<R, P0, P1, P2>(fn: (a: P0, b: P1, c: P2) => R, thisArg: {} | null | undefined, delay: number): { (a: P0, b: P1, c: P2): FunQ<R>; callNow(a: P0, b: P1, c: P2): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean }
export function throttle<R, P0, P1, P2, P3>(fn: (a: P0, b: P1, c: P2, d: P3) => R, thisArg: {} | null | undefined, delay: number): { (a: P0, b: P1, c: P2, d: P3): FunQ<R>; callNow(a: P0, b: P1, c: P2, d: P3): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean }
export function throttle<R, P0, P1, P2, P3, P4>(fn: (a: P0, b: P1, c: P2, d: P3, e: P4) => R, thisArg: {} | null | undefined, delay: number): { (a: P0, b: P1, c: P2, d: P3, e: P4): FunQ<R>; callNow(a: P0, b: P1, c: P2, d: P3, e: P4): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean }
export function throttle<R, P0, P1, P2, P3, P4, P5>(fn: (a: P0, b: P1, c: P2, d: P3, e: P4, f: P5) => R, thisArg: {} | null | undefined, delay: number): { (a: P0, b: P1, c: P2, d: P3, e: P4, f: P5): FunQ<R>; callNow(a: P0, b: P1, c: P2, d: P3, e: P4, f: P5): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean }
export function throttle<R, P0, P1, P2, P3, P4, P5, P6>(fn: (a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6) => R, thisArg: {} | null | undefined, delay: number): { (a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6): FunQ<R>; callNow(a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean }
export function throttle<R, P0, P1, P2, P3, P4, P5, P6, P7>(fn: (a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6, h: P7) => R, thisArg: {} | null | undefined, delay: number): { (a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6, h: P7): FunQ<R>; callNow(a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6, h: P7): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean }
export function throttle<R, P0, P1, P2, P3, P4, P5, P6, P7, P8>(fn: (a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6, h: P7, i: P8) => R, thisArg: {} | null | undefined, delay: number): { (a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6, h: P7, i: P8): FunQ<R>; callNow(a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6, h: P7, i: P8): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean }
export function throttle<R, P0, P1, P2, P3, P4, P5, P6, P7, P8, P9>(fn: (a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6, h: P7, i: P8, j: P9) => R, thisArg: {} | null | undefined, delay: number): { (a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6, h: P7, i: P8, j: P9): FunQ<R>; callNow(a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6, h: P7, i: P8, j: P9): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean }
export function throttle<R>(fn: (...args: any[]) => R, thisArg: {} | null, delay: number): { (...args: any[]): FunQ<R>; callNow(...args: any[]): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean } {
	return delayInternal(fn, thisArg, delay, false)
}

/**
 * The passed in function will be called only after ‘delay’ milliseconds elapsed after the last call.
 */
export function debounce<R>(fn: () => R, thisArg: {} | null | undefined, delay: number): { (): FunQ<R>; callNow(): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean }
export function debounce<R, P0>(fn: (a: P0) => R, thisArg: {} | null | undefined, delay: number): { (a: P0): FunQ<R>; callNow(a: P0): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean }
export function debounce<R, P0, P1>(fn: (a: P0, b: P1) => R, thisArg: {} | null | undefined, delay: number): { (a: P0, b: P1): FunQ<R>; callNow(a: P0, b: P1): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean }
export function debounce<R, P0, P1, P2>(fn: (a: P0, b: P1, c: P2) => R, thisArg: {} | null | undefined, delay: number): { (a: P0, b: P1, c: P2): FunQ<R>; callNow(a: P0, b: P1, c: P2): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean }
export function debounce<R, P0, P1, P2, P3>(fn: (a: P0, b: P1, c: P2, d: P3) => R, thisArg: {} | null | undefined, delay: number): { (a: P0, b: P1, c: P2, d: P3): FunQ<R>; callNow(a: P0, b: P1, c: P2, d: P3): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean }
export function debounce<R, P0, P1, P2, P3, P4>(fn: (a: P0, b: P1, c: P2, d: P3, e: P4) => R, thisArg: {} | null | undefined, delay: number): { (a: P0, b: P1, c: P2, d: P3, e: P4): FunQ<R>; callNow(a: P0, b: P1, c: P2, d: P3, e: P4): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean }
export function debounce<R, P0, P1, P2, P3, P4, P5>(fn: (a: P0, b: P1, c: P2, d: P3, e: P4, f: P5) => R, thisArg: {} | null | undefined, delay: number): { (a: P0, b: P1, c: P2, d: P3, e: P4, f: P5): FunQ<R>; callNow(a: P0, b: P1, c: P2, d: P3, e: P4, f: P5): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean }
export function debounce<R, P0, P1, P2, P3, P4, P5, P6>(fn: (a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6) => R, thisArg: {} | null | undefined, delay: number): { (a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6): FunQ<R>; callNow(a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean }
export function debounce<R, P0, P1, P2, P3, P4, P5, P6, P7>(fn: (a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6, h: P7) => R, thisArg: {} | null | undefined, delay: number): { (a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6, h: P7): FunQ<R>; callNow(a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6, h: P7): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean }
export function debounce<R, P0, P1, P2, P3, P4, P5, P6, P7, P8>(fn: (a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6, h: P7, i: P8) => R, thisArg: {} | null | undefined, delay: number): { (a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6, h: P7, i: P8): FunQ<R>; callNow(a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6, h: P7, i: P8): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean }
export function debounce<R, P0, P1, P2, P3, P4, P5, P6, P7, P8, P9>(fn: (a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6, h: P7, i: P8, j: P9) => R, thisArg: {} | null | undefined, delay: number): { (a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6, h: P7, i: P8, j: P9): FunQ<R>; callNow(a: P0, b: P1, c: P2, d: P3, e: P4, f: P5, g: P6, h: P7, i: P8, j: P9): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean }
export function debounce<R>(fn: (...args: any[]) => R, thisArg: {} | null, delay: number): { (...args: any[]): FunQ<R>; callNow(...args: any[]): R; cancel(): void; lastCalled: number; timeoutRef: any; isScheduled(): boolean } {
	return delayInternal(fn, thisArg, delay, true)
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
	throw '[otabpn] cancelGet'
}

export function never(): never {
	throw '[otabps] never'
}