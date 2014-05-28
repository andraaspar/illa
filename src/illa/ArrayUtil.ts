/// <reference path='../../lib/JQuery.d.ts'/>

module illa {
	export class ArrayUtil {
		static indexOf<T>(a: T[], v: T): number {
			return jQuery.inArray(v, a);
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