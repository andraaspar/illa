import { IllaEvent } from './IllaEvent'

export interface IEventCallback {
	(e: IllaEvent): Promise<any>
}