/// <reference path='IIventCallback.ts'/>
/// <reference path='IventCallbackReg.ts'/>

module illa {
	export interface IIventHandler {
		getCallbackRegsByType(type: string): IventCallbackReg[];
		getEventParent(): IIventHandler;
	}
}