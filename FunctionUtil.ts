import { IBind } from './IBind';

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

/**
 * Executes code and catches errors. Falls back to provided functions or values.
 */
export function get<T>(fn: T | (() => T), defaultValue: T): T
export function get<T>(fn: T | (() => T), fn2: T | (() => T), defaultValue: T): T
export function get<T>(fn: T | (() => T), fn2: T | (() => T), fn3: T | (() => T), defaultValue: T): T
export function get<T>(fn: T | (() => T), fn2: T | (() => T), fn3: T | (() => T), fn4: T | (() => T), defaultValue: T): T
export function get<T>(fn: T | (() => T), fn2: T | (() => T), fn3: T | (() => T), fn4: T | (() => T), fn5: T | (() => T), defaultValue: T): T
export function get<T>(fn: T | (() => T), ...rest: (T | (() => T))[]): T | undefined
export function get<T>(fn: T | (() => T), ...rest: (T | (() => T))[]): T | undefined {
	for (let i = 0; i < arguments.length; i++) {
		const f: T | (() => T) = arguments[i]
		if (typeof f === 'function') {
			try {
				return (f as () => T)()
			} catch (e) { }
		} else {
			return f
		}
	}
	return undefined
}

export function cancelGet(): never {
	throw '[otabpn] cancelGet'
}

export function getIf<T>(predicate: (_: T | undefined) => boolean, value: T | (() => T), fallbackValue: T): T
export function getIf<T>(predicate: (_: T | undefined) => boolean, value: T | (() => T), fallbackValue: T | (() => T)): T | undefined
export function getIf<T>(predicate: (_: T | undefined) => boolean, value: T | (() => T), fallbackValue: T | (() => T)): T | undefined {
	let v = get(value)
	return predicate(v) ? v : get(fallbackValue)
}

export function getIfNot<T>(predicate: (_: T | undefined) => boolean, value: T | (() => T), fallbackValue: T): T
export function getIfNot<T>(predicate: (_: T | undefined) => boolean, value: T | (() => T), fallbackValue: T | (() => T)): T | undefined
export function getIfNot<T>(predicate: (_: T | undefined) => boolean, value: T | (() => T), fallbackValue: T | (() => T)): T | undefined {
	let v = get(value)
	return predicate(v) ? get(fallbackValue) : v
}

export function getIfIn<T, K extends keyof T>(o: T, key: K, fallbackValue: T[K]): T[K]
export function getIfIn<T, K extends keyof T>(o: T, key: K, fallbackValue?: T[K] | (() => T[K])): T[K] | undefined
export function getIfIn<T, K extends keyof T>(o: T, key: K, fallbackValue?: T[K] | (() => T[K])): T[K] | undefined {
	if (o) {
		if (key in o) return o[key]
		return get(fallbackValue!)
	}
	return undefined
}
