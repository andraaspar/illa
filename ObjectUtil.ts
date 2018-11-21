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

export interface IFindObjectTest {
	(_: any, parentChain: IFindObjectParent[]): boolean
}
export interface IFindObjectOptions {
	parents?: boolean
	stopOnMatch?: boolean
	stopOn?: IFindObjectTest
}

/**
 * Walks through an object hierarchy and returns all objects that fulfill the
 * predicate.
 */
export function findObject<T = any>(o: any, test: IFindObjectTest, _: IFindObjectOptions & { parents: true }): IFindObjectResult<T>[]
export function findObject<T = any>(o: any, test: IFindObjectTest, _?: IFindObjectOptions): T[]
export function findObject<T = any>(o: any, test: IFindObjectTest, _: IFindObjectOptions = {}) {
	let matches: (T | IFindObjectResult<T>)[] = []
	findObjectInternal(
		o,
		test,
		matches,
		[],
		_.parents ? [] : undefined,
		_.stopOn ? _.stopOn : _.stopOnMatch ? test : undefined,
	)
	return matches
}

function findObjectInternal<T = any>(
	o: any,
	test: IFindObjectTest,
	matches: (T | IFindObjectResult<T>)[],
	seen: any[],
	parentChain: IFindObjectParent[] | undefined,
	stopOn: IFindObjectTest | undefined,
) {
	// console.log('Inspecting:', o)
	if (isObjectNotNull(o)) {
		if (seen.indexOf(o) >= 0) {
			// console.log('Seen this one.')
			return
		}
		seen.push(o)
		if (test(o, parentChain || [])) {
			if (parentChain) {
				matches.push({
					match: <any>o,
					parents: [...parentChain],
				})
			} else {
				matches.push(<any>o)
			}
		}
		if (!stopOn || !stopOn(o, parentChain || [])) {
			if (isArray(o)) {
				o.forEach((item, index) => {
					// console.log('Array item:')
					if (isObjectNotNull(item)) {
						findObjectInternal(
							item,
							test,
							matches,
							seen,
							parentChain ? [{ key: index, parent: o }, ...parentChain] : undefined,
							stopOn,
						)
					}
				})
			} else {
				for (let key of Object.keys(o)) {
					// console.log('Key:', key)
					if (isObjectNotNull((<any>o)[key])) {
						findObjectInternal(
							(<any>o)[key],
							test,
							matches,
							seen,
							parentChain ? [{ key: key, parent: o }, ...parentChain] : undefined,
							stopOn,
						)
					}
				}
			}
		}
	}
}