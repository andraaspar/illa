/// <reference path='_module.ts'/>

module illa {
	export class FunctionUtil {
		
		private static throttleInternal(fn: (...args) => any, thisArg: {}, delay: number, isDebounce: boolean): { (...args): void; cancel(): void } {
			var timeoutRef;
			var lastCalled: number = -Infinity;
			var callNow = function(...args): void {
				lastCalled = new Date().getTime();
				clearTimeout(timeoutRef);
				fn.apply(thisArg, args);
			};
			var result = <{ (...args): void; cancel(): void }>function(...args): void {
				clearTimeout(timeoutRef);
				var now = new Date().getTime();
				var nextTrigger: number;
				if (isDebounce) {
					nextTrigger = now + delay;
				} else {
					nextTrigger = lastCalled + delay;
				}
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

		/**
		 * Restricts the number of calls to the passed in function to one per ‘delay’ milliseconds.
		 */
		static throttle(fn: () => any, thisArg: {}, delay: number): { (): void; cancel(): void };
		static throttle<P1>(fn: (P1) => any, thisArg: {}, delay: number): { (P1): void; cancel(): void };
		static throttle<P1, P2>(fn: (P1, P2) => any, thisArg: {}, delay: number): { (P1, P2): void; cancel(): void };
		static throttle<P1, P2, P3>(fn: (P1, P2, P3) => any, thisArg: {}, delay: number): { (P1, P2, P3): void; cancel(): void };
		static throttle<P1, P2, P3, P4>(fn: (P1, P2, P3, P4) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4): void; cancel(): void };
		static throttle<P1, P2, P3, P4, P5>(fn: (P1, P2, P3, P4, P5) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4, P5): void; cancel(): void };
		static throttle<P1, P2, P3, P4, P5, P6>(fn: (P1, P2, P3, P4, P5, P6) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4, P5, P6): void; cancel(): void };
		static throttle<P1, P2, P3, P4, P5, P6, P7>(fn: (P1, P2, P3, P4, P5, P6, P7) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4, P5, P6, P7): void; cancel(): void };
		static throttle<P1, P2, P3, P4, P5, P6, P7, P8>(fn: (P1, P2, P3, P4, P5, P6, P7, P8) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4, P5, P6, P7, P8): void; cancel(): void };
		static throttle<P1, P2, P3, P4, P5, P6, P7, P8, P9>(fn: (P1, P2, P3, P4, P5, P6, P7, P8, P9) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4, P5, P6, P7, P8, P9): void; cancel(): void };
		static throttle(fn: (...args) => any, thisArg: {}, delay: number): { (...args): void; cancel(): void } {
			return this.throttleInternal(fn, thisArg, delay, false);
		}

		/**
		 * The passed in function will be called only after ‘delay’ milliseconds elapsed after the last call.
		 */
		static debounce(fn: () => any, thisArg: {}, delay: number): { (): void; cancel(): void };
		static debounce<P1>(fn: (P1) => any, thisArg: {}, delay: number): { (P1): void; cancel(): void };
		static debounce<P1, P2>(fn: (P1, P2) => any, thisArg: {}, delay: number): { (P1, P2): void; cancel(): void };
		static debounce<P1, P2, P3>(fn: (P1, P2, P3) => any, thisArg: {}, delay: number): { (P1, P2, P3): void; cancel(): void };
		static debounce<P1, P2, P3, P4>(fn: (P1, P2, P3, P4) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4): void; cancel(): void };
		static debounce<P1, P2, P3, P4, P5>(fn: (P1, P2, P3, P4, P5) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4, P5): void; cancel(): void };
		static debounce<P1, P2, P3, P4, P5, P6>(fn: (P1, P2, P3, P4, P5, P6) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4, P5, P6): void; cancel(): void };
		static debounce<P1, P2, P3, P4, P5, P6, P7>(fn: (P1, P2, P3, P4, P5, P6, P7) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4, P5, P6, P7): void; cancel(): void };
		static debounce<P1, P2, P3, P4, P5, P6, P7, P8>(fn: (P1, P2, P3, P4, P5, P6, P7, P8) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4, P5, P6, P7, P8): void; cancel(): void };
		static debounce<P1, P2, P3, P4, P5, P6, P7, P8, P9>(fn: (P1, P2, P3, P4, P5, P6, P7, P8, P9) => any, thisArg: {}, delay: number): { (P1, P2, P3, P4, P5, P6, P7, P8, P9): void; cancel(): void };
		static debounce(fn: (...args) => any, thisArg: {}, delay: number): { (...args): void; cancel(): void } {
			return this.throttleInternal(fn, thisArg, delay, true);
		}
	}
}