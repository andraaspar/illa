import IArrayDiffResult from './IArrayDiffResult';

function indexOfInternal<T>(a: T[], v: T, fromIndex?: number): number {
	var length = a.length;
	if (fromIndex == null) {
		fromIndex = 0;
	} else if (fromIndex < 0) {
		fromIndex = Math.max(0, length + fromIndex);
	}
	for (var i = fromIndex; i < length; i++) {
		if (a[i] === v) {
			return i;
		}
	}
	return -1;
}

function indexOfNative<T>(a: T[], v: T, fromIndex?: number): number {
	return Array.prototype.indexOf.call(a, v, fromIndex);
}

export var indexOf: <T>(a: T[], v: T, fromIndex?: number) => number = Array.prototype.indexOf ? indexOfNative : indexOfInternal;

export function removeFirst<T>(a: T[], v: T): boolean {
	var i = this.indexOf(a, v);
	var removed = i >= 0;
	if (removed) {
		a.splice(i, 1)[0];
	}
	return removed;
}

export function removeAll<T>(a: T[], v: T): boolean {
	var removed = false;
	for (var i = a.length - 1; i >= 0; i--) {
		if (a[i] === v) {
			a.splice(i, 1);
			removed = true;
		}
	}
	return removed;
}

export function diff<T>(oldArr: T[], newArr: T[]): IArrayDiffResult<T>[] {
	var result: IArrayDiffResult<T>[] = [];
	for (var i = 0, n = oldArr.length; i < n; i++) {
		var oldItem = oldArr[i];
		if (this.indexOf(newArr, oldItem) < 0) {
			result.push({
				item: oldItem,
				added: false,
				oldIndex: i,
				newIndex: -1
			});
		}
	}
	for (var i = 0, n = newArr.length; i < n; i++) {
		var newItem = newArr[i];
		if (this.indexOf(oldArr, newItem) < 0) {
			result.push({
				item: newItem,
				added: true,
				oldIndex: -1,
				newIndex: i
			});
		}
	}
	return result;
}

export default {
	indexOf,
	removeFirst,
	removeAll,
	diff
};