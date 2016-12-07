import { IArrayDiffResult } from './IArrayDiffResult'

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

export function diff<T>(oldArr: T[], newArr: T[]): IArrayDiffResult<T>[] {
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