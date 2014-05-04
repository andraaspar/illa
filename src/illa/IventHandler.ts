/// <reference path='IIventHandler.ts'/>

module illa {
	export class IventHandler implements IIventHandler {
		private callbacksByType: { [s: string]: IventCallbackReg[] } = {};

		getCallbackRegsByType(type: string): IventCallbackReg[] {
			var result = this.callbacksByType[type];
			if (!jQuery.isArray(result)) result = [];
			return result;
		}

		getEventParent(): IIventHandler {
			return null;
		}

		addIventCallback(type: string, cb: IIventCallback, thisObj: Object): void {
			var reg = new IventCallbackReg(cb, thisObj);
			if (jQuery.isArray(this.callbacksByType[type])) {
				this.removeIventCallback(type, cb, thisObj);
				this.callbacksByType[type].push(reg);
			} else {
				this.callbacksByType[type] = [reg];
			}

		}

		removeIventCallback(type: string, cb: IIventCallback, thisObj: Object): void {
			var callbacks = this.callbacksByType[type];
			if (jQuery.isArray(callbacks)) {
				for (var i = 0, n = callbacks.length; i < n; i++) {
					var callback = callbacks[i];
					if (callback.callback === cb && callback.thisObj === thisObj) {
						callbacks.splice(i, 1);
						break;
					}
				}
			}
		}

		removeAllIventCallbacks(): void {
			this.callbacksByType = {};
		}
	}
}