import { IEventHandler } from './IEventHandler'
import { error } from './Log'

export class IllaEvent {
	private isPropagationStopped = false
	private isImmediatePropagationStopped = false
	private currentTarget: IEventHandler
	private isDefaultPrevented = false

	constructor(private type: string, private target: IEventHandler) {

	}

	dispatch() {
		return this.processHandler(this.target)
	}

	async processHandler(handler: IEventHandler) {
		this.currentTarget = handler
		let callbackRegs = handler.getCallbackRegsByType(this.type).slice(0)
		for (let callbackReg of callbackRegs) {
			try {
				await callbackReg.callback.call(callbackReg.thisObj, this)
			} catch (e) {
				error(e)
			}
			if (this.isImmediatePropagationStopped) break
		}
		if (!this.isPropagationStopped) {
			var parentHandler = handler.getEventParent()
			if (parentHandler) await this.processHandler(parentHandler)
		}
	}

	getType(): string {
		return this.type
	}

	getTarget(): IEventHandler {
		return this.target
	}

	getCurrentTarget(): IEventHandler {
		return this.currentTarget
	}

	setIsPropagationStopped(flag: boolean): void {
		this.isPropagationStopped = flag
	}

	getIsPropagationStopped(): boolean {
		return this.isPropagationStopped
	}

	setStopImmediatePropagation(flag: boolean): void {
		this.isImmediatePropagationStopped = flag
	}

	getIsImmediatePropagationStopped(): boolean {
		return this.isImmediatePropagationStopped
	}

	setIsDefaultPrevented(flag: boolean): void {
		this.isDefaultPrevented = flag
	}

	getIsDefaultPrevented(): boolean {
		return this.isDefaultPrevented
	}
}