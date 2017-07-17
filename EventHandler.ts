import { EventCallbackReg } from './EventCallbackReg'
import { IEventCallback } from './IEventCallback'
import { IEventHandler } from './IEventHandler'
import { isArray } from './Type'

export class EventHandler implements IEventHandler {
	private callbacksByType: { [s: string]: EventCallbackReg[] } = {}

	getCallbackRegsByType(type: string): EventCallbackReg[] {
		var result = this.callbacksByType[type]
		if (!isArray(result)) result = []
		return result
	}

	getEventParent(): IEventHandler {
		return null
	}

	addEventCallback(type: string, cb: IEventCallback, thisObj: Object = null): void {
		var reg = new EventCallbackReg(cb, thisObj)
		if (isArray(this.callbacksByType[type])) {
			this.removeEventCallback(type, cb, thisObj)
			this.callbacksByType[type].push(reg)
		} else {
			this.callbacksByType[type] = [reg]
		}

	}

	removeEventCallback(type: string, cb: IEventCallback, thisObj: Object = null): void {
		var callbacks = this.callbacksByType[type]
		if (isArray(callbacks)) {
			for (var i = 0, n = callbacks.length; i < n; i++) {
				var callback = callbacks[i]
				if (callback.callback === cb && callback.thisObj === thisObj) {
					callbacks.splice(i, 1)
					break
				}
			}
		}
	}

	removeAllEventCallbacks(): void {
		this.callbacksByType = {}
	}
}