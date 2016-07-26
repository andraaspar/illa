import Event from './Event';
import EventHandler from './EventHandler';
import {
	bind,
	GLOBAL,
	isFunction,
	isUndefined,
} from './index';

export class Ticker extends EventHandler {
	static EVENT_BEFORE_TICK = 'illa_Ticker_EVENT_BEFORE_TICK';
	static EVENT_TICK = 'illa_Ticker_EVENT_TICK';
	static EVENT_AFTER_TICK = 'illa_Ticker_EVENT_AFTER_TICK';
	
	private supportsAnimationFrame = isFunction(GLOBAL.requestAnimationFrame) && isFunction(GLOBAL.cancelAnimationFrame);
	private intervalID;
	private onTickBound = bind(this.onTick, this);
	private tickCount = 0;
	
	constructor() {
		super();
		this.setIsStarted(true);
	}
	
	getIsStarted(): boolean {
		return !isUndefined(this.intervalID);
	}
	
	setIsStarted(flag: boolean): void {
		if (this.getIsStarted() == flag) return;
		
		if (flag) {
			if (this.supportsAnimationFrame) {
				this.intervalID = GLOBAL.requestAnimationFrame(this.onTickBound);
			} else {
				this.intervalID = setInterval(this.onTickBound, 1000/60);
			}
		} else {
			if (this.supportsAnimationFrame) {
				GLOBAL.cancelAnimationFrame(this.intervalID);
			} else {
				clearInterval(this.intervalID);
			}
			this.intervalID = undefined;
		}
	}
	
	getSupportsAnimationFrame(): boolean {
		return this.supportsAnimationFrame;
	}
	
	onTick(): void {
		new Event(Ticker.EVENT_BEFORE_TICK, this).dispatch();
		this.tickCount++;
		if (this.supportsAnimationFrame) {
			this.intervalID = GLOBAL.requestAnimationFrame(this.onTickBound);
		}
		new Event(Ticker.EVENT_TICK, this).dispatch();
		new Event(Ticker.EVENT_AFTER_TICK, this).dispatch();
	}
	
	getTickCount(): number {
		return this.tickCount;
	}
}

export default Ticker;