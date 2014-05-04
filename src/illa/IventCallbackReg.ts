/// <reference path='IIventCallback.ts'/>

module illa {
	export class IventCallbackReg {
		constructor(public callback: IIventCallback, public thisObj: Object) {}
	}
}