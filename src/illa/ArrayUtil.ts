module illa {
	export class ArrayUtil {
		static indexOf<T>(a: T[], v: T, fromIndex?: number): number {
			if (Array.prototype.indexOf) {
				return Array.prototype.indexOf.call(a, v, fromIndex);
			} else {
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
			}
			return -1;
		}

		static removeFirst<T>(a: T[], v: T): boolean {
			var i = this.indexOf(a, v);
			var removed = i >= 0;
			if (removed) {
				a.splice(i, 1)[0];
			}
			return removed;
		}

		static removeAll<T>(a: T[], v: T): boolean {
			var removed = false;
			for (var i = a.length - 1; i >= 0; i--) {
				if (a[i] === v) {
					a.splice(i, 1);
					removed = true;
				}
			}
			return removed;
		}
	}
}