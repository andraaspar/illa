import { EventCallbackReg } from './EventCallbackReg'

export interface IEventHandler {
	getCallbackRegsByType(type: string): EventCallbackReg[]
	getEventParent(): IEventHandler | null
}