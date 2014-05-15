/// <reference path='../../lib/JQuery.d.ts'/>
/// <reference path='../../src/illa/_module.ts'/>
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
			
			illa.Log.info('Scrollbar width:', illa.ScrollbarUtil.getDefaultSize(illa.Axis2D.X));
			illa.Log.info('Scrollbar height:', illa.ScrollbarUtil.getDefaultSize(illa.Axis2D.Y));
			
			illa.Log.info('isString:', illa.isString('undefined'));
			illa.Log.info('!isString:', illa.isString(true));
			illa.Log.info('isBoolean:', illa.isBoolean(true));
			illa.Log.info('!isBoolean:', illa.isBoolean(5));
			illa.Log.info('isNumber:', illa.isNumber(5));
			illa.Log.info('!isNumber:', illa.isNumber([5]));
			illa.Log.info('isArray:', illa.isArray([5]));
			illa.Log.info('!isArray:', illa.isArray(function() {}));
			illa.Log.info('isFunction:', illa.isFunction(function() {}));
			illa.Log.info('!isFunction:', illa.isFunction(null));
			illa.Log.info('isNull:', illa.isNull(null));
			illa.Log.info('!isNull:', illa.isNull(undefined));
			illa.Log.info('isUndefined:', illa.isUndefined(undefined));
			illa.Log.info('!isUndefined:', illa.isUndefined('undefined'));
			illa.Log.info('isUndefinedOrNull:', illa.isUndefinedOrNull(undefined));
			illa.Log.info('isUndefinedOrNull:', illa.isUndefinedOrNull(null));
			illa.Log.info('!isUndefinedOrNull:', illa.isUndefinedOrNull('undefined'));
			illa.Log.info('!isUndefinedOrNull:', illa.isUndefinedOrNull('null'));
			illa.Log.info('isObjectNotNull:', illa.isObjectNotNull({}));
			illa.Log.info('isObjectNotNull:', illa.isObjectNotNull([]));
			illa.Log.info('!isObjectNotNull:', illa.isObjectNotNull(null));
			illa.Log.info('!isObjectNotNull:', illa.isObjectNotNull(undefined));
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