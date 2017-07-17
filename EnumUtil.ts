import { TSet } from './Type'

/**
 * Returns all values of an enum as an array.
 */
export function enumValues(e: {}) {
	let valuesFound: TSet<boolean> = {}
	let keys = Object.keys(e)
	let values: (string | number)[] = []
	for (let key of keys) {
		if (isNaN(Number(key))) {
			let value = (<any>e)[key]
			if (!valuesFound[value]) {
				values.push(value)
				valuesFound[value] = true
			}
		}
	}
	return values
}