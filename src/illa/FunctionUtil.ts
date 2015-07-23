/// <reference path='_module.ts'/>

module illa {
	export class FunctionUtil {

		/**
		 * Restricts the number of calls to the passed in function to one per ‘delay’ milliseconds.
		 */
		static throttle<P1>(thisArg: {}, fn: (P1) => any, delay: number): { (P1): void; cancel(): void };
		static throttle<P1, P2>(thisArg: {}, fn: (P1, P2) => any, delay: number): { (P1, P2): void; cancel(): void };
		static throttle<P1, P2, P3>(thisArg: {}, fn: (P1, P2, P3) => any, delay: number): { (P1, P2, P3): void; cancel(): void };
		static throttle<P1, P2, P3, P4>(thisArg: {}, fn: (P1, P2, P3, P4) => any, delay: number): { (P1, P2, P3, P4): void; cancel(): void };
		static throttle<P1, P2, P3, P4, P5>(thisArg: {}, fn: (P1, P2, P3, P4, P5) => any, delay: number): { (P1, P2, P3, P4, P5): void; cancel(): void };
		static throttle<P1, P2, P3, P4, P5, P6>(thisArg: {}, fn: (P1, P2, P3, P4, P5, P6) => any, delay: number): { (P1, P2, P3, P4, P5, P6): void; cancel(): void };
		static throttle<P1, P2, P3, P4, P5, P6, P7>(thisArg: {}, fn: (P1, P2, P3, P4, P5, P6, P7) => any, delay: number): { (P1, P2, P3, P4, P5, P6, P7): void; cancel(): void };
		static throttle<P1, P2, P3, P4, P5, P6, P7, P8>(thisArg: {}, fn: (P1, P2, P3, P4, P5, P6, P7, P8) => any, delay: number): { (P1, P2, P3, P4, P5, P6, P7, P8): void; cancel(): void };
		static throttle<P1, P2, P3, P4, P5, P6, P7, P8, P9>(thisArg: {}, fn: (P1, P2, P3, P4, P5, P6, P7, P8, P9) => any, delay: number): { (P1, P2, P3, P4, P5, P6, P7, P8, P9): void; cancel(): void };
		static throttle(thisArg: {}, fn: (...args) => any, delay: number): { (...args): void; cancel(): void } {
			var timeoutRef: number;
			var lastCalled: number = -Infinity;
			var callNow = function(...args): void {
				lastCalled = new Date().getTime();
				clearTimeout(timeoutRef);
				fn.apply(thisArg, args);
			};
			var result = <{ (...args): void; cancel(): void }>function(...args): void {
				clearTimeout(timeoutRef);
				var nextTrigger = lastCalled + delay;
				var now = new Date().getTime();
				if (nextTrigger > now) {
					// Should not call yet
					timeoutRef = setTimeout(illa.bind.apply(this, [callNow, this].concat(args)), nextTrigger - now);
				} else {
					// Should call now
					callNow.apply(this, args);
				}
			};
			result.cancel = function(): void {
				clearTimeout(timeoutRef);
			};
			return result;
		}
	}
}