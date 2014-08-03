/// <reference path='_module.ts'/>
/// <reference path='Event.ts'/>
/// <reference path='EventHandler.ts'/>

module illa {
	export class Ticker extends EventHandler {
		static EVENT_BEFORE_TICK = 'illa_Ticker_EVENT_BEFORE_TICK';
		static EVENT_TICK = 'illa_Ticker_EVENT_TICK';
		static EVENT_AFTER_TICK = 'illa_Ticker_EVENT_AFTER_TICK';
		
		private supportsAnimationFrame = illa.isFunction(illa.GLOBAL.requestAnimationFrame) && illa.isFunction(illa.GLOBAL.cancelAnimationFrame);
		private intervalID;
		private onTickBound = illa.bind(this.onTick, this);
		private tickCount = 0;
		
		constructor() {
			super();
			this.setIsStarted(true);
		}
		
		getIsStarted(): boolean {
			return !illa.isUndefined(this.intervalID);
		}
		
		setIsStarted(flag: boolean): void {
			if (this.getIsStarted() == flag) return;
			
			if (flag) {
				if (this.supportsAnimationFrame) {
					this.intervalID = requestAnimationFrame(this.onTickBound);
				} else {
					this.intervalID = setInterval(this.onTickBound, 1000/60);
				}
			} else {
				if (this.supportsAnimationFrame) {
					cancelAnimationFrame(this.intervalID);
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
				this.intervalID = requestAnimationFrame(this.onTickBound);
			}
			new Event(Ticker.EVENT_TICK, this).dispatch();
			new Event(Ticker.EVENT_AFTER_TICK, this).dispatch();
		}
		
		getTickCount(): number {
			return this.tickCount;
		}
	}
}