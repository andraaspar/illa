/// <reference path='IEventHandler.ts'/>

module illa {
	export class EventHandler implements IEventHandler {
		private callbacksByType: { [s: string]: EventCallbackReg[] } = {};

		getCallbackRegsByType(type: string): EventCallbackReg[] {
			var result = this.callbacksByType[type];
			if (!illa.isArray(result)) result = [];
			return result;
		}

		getEventParent(): IEventHandler {
			return null;
		}

		addEventCallback(type: string, cb: IEventCallback, thisObj: Object): void {
			var reg = new EventCallbackReg(cb, thisObj);
			if (illa.isArray(this.callbacksByType[type])) {
				this.removeEventCallback(type, cb, thisObj);
				this.callbacksByType[type].push(reg);
			} else {
				this.callbacksByType[type] = [reg];
			}

		}

		removeEventCallback(type: string, cb: IEventCallback, thisObj: Object): void {
			var callbacks = this.callbacksByType[type];
			if (illa.isArray(callbacks)) {
				for (var i = 0, n = callbacks.length; i < n; i++) {
					var callback = callbacks[i];
					if (callback.callback === cb && callback.thisObj === thisObj) {
						callbacks.splice(i, 1);
						break;
					}
				}
			}
		}

		removeAllEventCallbacks(): void {
			this.callbacksByType = {};
		}
	}
}