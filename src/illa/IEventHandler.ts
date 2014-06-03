/// <reference path='IEventCallback.ts'/>
/// <reference path='EventCallbackReg.ts'/>

module illa {
	export interface IEventHandler {
		getCallbackRegsByType(type: string): EventCallbackReg[];
		getEventParent(): IEventHandler;
	}
}