/// <reference path='../../lib/JQuery.d.ts'/>
/// <reference path='../../src/illa/Log.ts'/>
/// <reference path='../../src/illa/ScrollbarUtil.ts'/>
/// <reference path='../../src/illa/Ticker.ts'/>

module test1 {
	export class Main {
		ticker = new illa.Ticker();

		constructor() {
			jQuery(jQuery.proxy(this.onDOMLoaded, this));

			this.ticker.addIventCallback(illa.Ticker.EVENT_TICK, this.onTick, this);
		}

		onDOMLoaded(): void {
			illa.Log.info('DOM loaded.');
			
			illa.Log.info('Scrollbar width:', illa.ScrollbarUtil.getSize(illa.Axis2D.X));
			illa.Log.info('Scrollbar height:', illa.ScrollbarUtil.getSize(illa.Axis2D.Y));
		}

		onTick(e: illa.Ivent): void {
			if ((this.ticker.getTickCount() % 60) == 0) {
				illa.Log.info('Tick: ' + this.ticker.getTickCount());
			}
			if (this.ticker.getTickCount() > 5 * 60) {
				illa.Log.info('Stopping ticker.');
				this.ticker.setIsStarted(false);
			}
		}
	}
}

var test1Main = new test1.Main();