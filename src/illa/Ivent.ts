/// <reference path='IIventHandler.ts'/>

module illa {
	export class Ivent {
		private isPropagationStopped = false;
		private isImmediatePropagationStopped = false;
		private currentTarget: IIventHandler;
		
		constructor(private type: string, private target: IIventHandler) {

		}

		dispatch(): void {
			this.processHandler(this.target);
		}

		processHandler(handler: IIventHandler): void {
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
		
		getTarget(): IIventHandler {
			return this.target;
		}
		
		getCurrentTarget(): IIventHandler {
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