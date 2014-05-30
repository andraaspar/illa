/// <reference path='Ivent.ts'/>
/// <reference path='IventHandler.ts'/>

module illa {
	export class Ticker extends IventHandler {
		static EVENT_TICK = 'illa_Ticker_EVENT_TICK';
		
		private supportsAnimationFrame = illa.isFunction(illa.win.requestAnimationFrame) && illa.isFunction(illa.win.cancelAnimationFrame);
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
			this.tickCount++;
			if (this.supportsAnimationFrame) {
				this.intervalID = requestAnimationFrame(this.onTickBound);
			}
			new Ivent(Ticker.EVENT_TICK, this).dispatch();
		}
		
		getTickCount(): number {
			return this.tickCount;
		}
	}
}