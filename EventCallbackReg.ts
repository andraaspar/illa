import { IEventCallback } from './IEventCallback'

export class EventCallbackReg {
	constructor(public callback: IEventCallback, public thisObj: Object | null) { }
}