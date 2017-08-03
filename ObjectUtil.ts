import { isArray, isObjectNotNull } from './Type'

export function getKeyOfValue(obj: { [key: string]: any }, value: any): string {
	for (let key in obj) {
		if (obj.hasOwnProperty(key) && obj[key] === value) {
			return key
		}
	}
	return ''
}

export function getKeysOfValue(obj: { [key: string]: any }, value: any): string[] {
	let result: string[] = []
	for (let key in obj) {
		if (obj.hasOwnProperty(key) && obj[key] === value) {
			result.push(key)
		}
	}
	return result
}

export interface IAssign {
	<T, S1>(target: T, s1: S1): T & S1
	<T, S1, S2>(target: T, s1: S1, s2: S2): T & S1 & S2
	<T, S1, S2, S3>(target: T, s1: S1, s2: S2, s3: S3): T & S1 & S2 & S3
	<T, S1, S2, S3, S4>(target: T, s1: S1, s2: S2, s3: S3, s4: S4): T & S1 & S2 & S3 & S4
	<T, S1, S2, S3, S4, S5>(target: T, s1: S1, s2: S2, s3: S3, s4: S4, s5: S5): T & S1 & S2 & S3 & S4 & S5
}

/**
 * Copy the values of all enumerable own properties from one or more source
 * objects to the target object. Based on polyfill from:
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */
export var assign: IAssign = function(target: any, ...rest: any[]) {
	if (target == null) {
		throw '[ot8gtv] Null target.'
	}

	let to = Object(target)

	for (let nextSource of rest) {
		if (nextSource != null) { // Skip over if undefined or null
			for (let nextKey in nextSource) {
				// Avoid bugs when hasOwnProperty is shadowed
				if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
					to[nextKey] = nextSource[nextKey]
				}
			}
		}
	}
	return to
}

if ((<any>Object).assign) {
	assign = (<any>Object).assign
}

export interface IFindObjectResult<T = any> {
	match: T
	parents: IFindObjectParent[]
}

export interface IFindObjectParent {
	parent: any
	key: string | number
}

/**
 * Walks through an object hierarchy and returns all objects that fulfill the
 * predicate.
 */
export function findObject<T = any>(o: any, predicate: (_: any) => boolean, _: { parents: true }): IFindObjectResult[]
export function findObject<T = any>(o: any, predicate: (_: any) => boolean, _: { parents: false }): T[]
export function findObject<T = any>(o: any, predicate: (_: any) => boolean): T[]
export function findObject<T = any>(o: any, predicate: (_: any) => boolean, _: { parents?: boolean } = {}) {
	let matches: (T | IFindObjectResult<T>)[] = []
	findObjectInternal(
		o,
		predicate,
		matches,
		[],
		_.parents ? [] : undefined,
	)
	return matches
}

function findObjectInternal<T = any>(
	o: any,
	predicate: (_: any) => boolean,
	matches: (T | IFindObjectResult<T>)[],
	seen: any[],
	parentChain: IFindObjectParent[] | undefined,
) {
	// console.log('Inspecting:', o)
	if (isObjectNotNull(o)) {
		if (seen.indexOf(o) >= 0) {
			// console.log('Seen this one.')
			return
		}
		seen.push(o)
		if (predicate(o)) {
			if (parentChain) {
				matches.push({
					match: <any>o,
					parents: [...parentChain],
				})
			} else {
				matches.push(<any>o)
			}
		}
		if (isArray(o)) {
			o.forEach((item, index) => {
				// console.log('Array item:')
				if (isObjectNotNull(item)) {
					findObjectInternal(
						item,
						predicate,
						matches,
						seen,
						parentChain ? [...parentChain, { key: index, parent: o }] : undefined,
					)
				}
			})
		} else {
			for (let key of Object.keys(o)) {
				// console.log('Key:', key)
				if (isObjectNotNull((<any>o)[key])) {
					findObjectInternal(
						(<any>o)[key],
						predicate,
						matches,
						seen,
						parentChain ? [...parentChain, { key: key, parent: o }] : undefined,
					)
				}
			}
		}
	}
}