/// <reference path='IIventCallback.ts'/>

module illa {
	export interface IIventHandler {
		getCallbackRegsByType(type: string): IventCallbackReg[];
		getEventParent(): IIventHandler;
	}
}