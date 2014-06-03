/// <reference path='IEventCallback.ts'/>

module illa {
	export class EventCallbackReg {
		constructor(public callback: IEventCallback, public thisObj: Object) {}
	}
}