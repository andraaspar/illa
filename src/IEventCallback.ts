import Event from './Event';

export interface IEventCallback {
	(e: Event): void;
}

export default IEventCallback;