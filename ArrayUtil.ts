import { IArrayDiffResult } from './IArrayDiffResult'
import { isUndefined } from './Type'

export function removeFirst<T>(a: T[], v: T): boolean {
	var i = a.indexOf(v)
	var removed = i >= 0
	if (removed) {
		a.splice(i, 1)[0]
	}
	return removed
}

export function removeAll<T>(a: T[], v: T): boolean {
	var removed = false
	for (var i = a.length - 1; i >= 0; i--) {
		if (a[i] === v) {
			a.splice(i, 1)
			removed = true
		}
	}
	return removed
}

export function diff<T>(oldArr: ReadonlyArray<T>, newArr: ReadonlyArray<T>): IArrayDiffResult<T>[] {
	var result: IArrayDiffResult<T>[] = []
	for (var i = 0, n = oldArr.length; i < n; i++) {
		var oldItem = oldArr[i]
		if (newArr.indexOf(oldItem) < 0) {
			result.push({
				item: oldItem,
				added: false,
				oldIndex: i,
				newIndex: -1
			})
		}
	}
	for (var i = 0, n = newArr.length; i < n; i++) {
		var newItem = newArr[i]
		if (oldArr.indexOf(newItem) < 0) {
			result.push({
				item: newItem,
				added: true,
				oldIndex: -1,
				newIndex: i
			})
		}
	}
	return result
}

export function range(start: number, end?: number): number[] {
	let result: number[] = []
	let firstValue = isUndefined(end) ? 0 : start
	let direction = isUndefined(end) ? (start < 0 ? -1 : 1) : (end < start ? -1 : 1)
	let n = isUndefined(end) ? Math.abs(start) : Math.max(start, end) - Math.min(start, end)
	if (!isFinite(n)) throw '[ot8upk] Invalid count.'
	for (let i = 0; i < n; i++) {
		result.push(firstValue + direction * i)
	}
	return result
}

export function find<T>(arr: ReadonlyArray<T>, predicate: (item: T) => boolean): T | undefined {
	for (let item of arr) {
		if (predicate(item)) {
			return item
		}
	}
	return undefined
}