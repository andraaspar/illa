/// <reference path='IEventHandler.ts'/>

module illa {
	export class Event {
		private isPropagationStopped = false;
		private isImmediatePropagationStopped = false;
		private currentTarget: IEventHandler;
		
		constructor(private type: string, private target: IEventHandler) {

		}

		dispatch(): void {
			this.processHandler(this.target);
		}

		processHandler(handler: IEventHandler): void {
			this.currentTarget = handler;
			var callbackRegs = handler.getCallbackRegsByType(this.type).slice(0);
			for (var i = 0, n = callbackRegs.length; i < n; i++) {
				var callbackReg = callbackRegs[i];
				callbackReg.callback.call(callbackReg.thisObj, this);
				if (this.isImmediatePropagationStopped) break;
			}
			if (!this.isPropagationStopped) {
				var parentHandler = handler.getEventParent();
				if (parentHandler) this.processHandler(parentHandler);
			}
		}
		
		getType(): string {
			return this.type;
		}
		
		getTarget(): IEventHandler {
			return this.target;
		}
		
		getCurrentTarget(): IEventHandler {
			return this.currentTarget;
		}
		
		setIsPropagationStopped(flag: boolean): void {
			this.isPropagationStopped = flag;
		}
		
		getIsPropagationStopped(): boolean {
			return this.isPropagationStopped;
		}
		
		setStopImmediatePropagation(flag: boolean): void {
			this.isImmediatePropagationStopped = flag;
		}
		
		getIsImmediatePropagationStopped(): boolean {
			return this.isImmediatePropagationStopped;
		}
	}
}