/// <reference path='../../lib/JQuery.d.ts'/>
/// <reference path='../../src/illa/_module.ts'/>
/// <reference path='../../src/illa/Log.ts'/>
/// <reference path='../../src/illa/ScrollbarUtil.ts'/>
/// <reference path='../../src/illa/StringUtil.ts'/>
/// <reference path='../../src/illa/Ticker.ts'/>
/// <reference path='../../src/illa/UnitTest.ts'/>

module test1 {
	export class Main {
		unitTest: illa.UnitTest;
		ticker: illa.Ticker;

		constructor() {
			jQuery(jQuery.proxy(this.onDOMLoaded, this));
		}

		onDOMLoaded(): void {
			var u = this.unitTest = new illa.UnitTest(jQuery('body'));
			u.info('Testing...');



			var scrollbarUtil = new illa.ScrollbarUtil();
			u.assert(illa.isNumber(scrollbarUtil.getDefaultSize(illa.Axis2D.X)), 'ScrollbarUtil.getDefaultSize 1');
			u.assert(illa.isNumber(scrollbarUtil.getDefaultSize(illa.Axis2D.Y)), 'ScrollbarUtil.getDefaultSize 2');
			u.assert(scrollbarUtil.getDefaultSize(illa.Axis2D.X) >= 0, 'ScrollbarUtil.getDefaultSize 3');
			u.assert(scrollbarUtil.getDefaultSize(illa.Axis2D.Y) >= 0, 'ScrollbarUtil.getDefaultSize 4');

			var scrolling = jQuery('<div style="overflow-x: scroll; overflow-y: scroll">');
			var scrolling2 = jQuery('<div style="overflow: scroll">');
			var nonScrolling = jQuery('<div style="overflow-x: hidden; overflow-y: hidden">');
			var nonScrolling2 = jQuery('<div style="overflow-x: visible; overflow-y: visible">');
			var nonScrolling3 = jQuery('<div style="overflow: visible">');

			u.assert(illa.ScrollbarUtil.isVisibleOn(scrolling, illa.Axis2D.X), 'ScrollbarUtil.isVisibleOn 1');
			u.assert(illa.ScrollbarUtil.isVisibleOn(scrolling, illa.Axis2D.Y), 'ScrollbarUtil.isVisibleOn 2');
			u.assert(illa.ScrollbarUtil.isVisibleOn(nonScrolling, illa.Axis2D.X) === false, 'ScrollbarUtil.isVisibleOn 3');
			u.assert(illa.ScrollbarUtil.isVisibleOn(nonScrolling, illa.Axis2D.Y) === false, 'ScrollbarUtil.isVisibleOn 4');
			u.assert(illa.ScrollbarUtil.isVisibleOn(nonScrolling2, illa.Axis2D.X) === false, 'ScrollbarUtil.isVisibleOn 5');
			u.assert(illa.ScrollbarUtil.isVisibleOn(nonScrolling2, illa.Axis2D.Y) === false, 'ScrollbarUtil.isVisibleOn 6');
			u.assert(illa.ScrollbarUtil.isVisibleOn(scrolling2, illa.Axis2D.X), 'ScrollbarUtil.isVisibleOn 7');
			u.assert(illa.ScrollbarUtil.isVisibleOn(scrolling2, illa.Axis2D.Y), 'ScrollbarUtil.isVisibleOn 8');
			u.assert(illa.ScrollbarUtil.isVisibleOn(nonScrolling3, illa.Axis2D.X) === false, 'ScrollbarUtil.isVisibleOn 9');
			u.assert(illa.ScrollbarUtil.isVisibleOn(nonScrolling3, illa.Axis2D.Y) === false, 'ScrollbarUtil.isVisibleOn 10');



			u.assert(illa.isString('undefined'), 'isString 1');
			u.assert(illa.isString(true) === false, 'isString 2');

			u.assert(illa.isBoolean(true), 'isBoolean 1');
			u.assert(illa.isBoolean(false), 'isBoolean 2');
			u.assert(illa.isBoolean('true') === false, 'isBoolean 3');
			u.assert(illa.isBoolean(1) === false, 'isBoolean 4');

			u.assert(illa.isNumber(0), 'isNumber 1');
			u.assert(illa.isNumber(NaN), 'isNumber 2');
			u.assert(illa.isNumber(Infinity), 'isNumber 3');
			u.assert(illa.isNumber('1') === false, 'isNumber 4');

			u.assert(illa.isArray([]), 'isArray 1');
			u.assert(illa.isArray(new Array()), 'isArray 2');
			u.assert(illa.isArray({ '0': 0, length: 1 }) === false, 'isArray 3');

			var arraySub = function() {
				Array.call(this);
			};
			arraySub.prototype = new Array();
			arraySub.prototype.constructor = Array;

			u.assert(illa.isArray(new arraySub()) === false, 'isArray 4');

			u.assert(illa.isFunction(function() { }), 'isFunction 1');
			u.assert(illa.isFunction(test1.Main), 'isFunction 2');
			u.assert(illa.isFunction(Function), 'isFunction 3');
			u.assert(illa.isFunction(new Function()), 'isFunction 4');
			u.assert(illa.isFunction({}) === false, 'isFunction 5');

			u.assert(illa.isNull(null), 'isNull 1');
			u.assert(illa.isNull(undefined) === false, 'isNull 2');
			u.assert(illa.isNull({}) === false, 'isNull 3');

			u.assert(illa.isUndefined(undefined), 'isUndefined 1');
			u.assert(illa.isUndefined(null) === false, 'isUndefined 2');
			u.assert(illa.isUndefined('undefined') === false, 'isUndefined 3');

			u.assert(illa.isUndefinedOrNull(undefined), 'isUndefinedOrNull 1');
			u.assert(illa.isUndefinedOrNull(null), 'isUndefinedOrNull 2');
			u.assert(illa.isUndefinedOrNull('undefined') === false, 'isUndefinedOrNull 3');
			u.assert(illa.isUndefinedOrNull('null') === false, 'isUndefinedOrNull 4');

			u.assert(illa.isObjectNotNull({}), 'isObjectNotNull 1');
			u.assert(illa.isObjectNotNull([]), 'isObjectNotNull 2');
			u.assert(illa.isObjectNotNull(function() { }), 'isObjectNotNull 3');
			u.assert(illa.isObjectNotNull(null) === false, 'isObjectNotNull 4');
			u.assert(illa.isObjectNotNull(undefined) === false, 'isObjectNotNull 5');
			u.assert(illa.isObjectNotNull(NaN) === false, 'isObjectNotNull 6');
			u.assert(illa.isObjectNotNull('foo') === false, 'isObjectNotNull 7');

			u.assert(illa.as(Main, this) === this, 'as 1');
			u.assert(illa.as(illa.Ivent, this) === null, 'as 2');
			var ivent = new illa.Ivent('test', null);
			u.assert(illa.as(illa.Ivent, ivent) === ivent, 'as 3');
			
			var fun = illa.bind(function(suffix: string): string {
				return this.prefix + suffix;
			}, {prefix: 'foo'});
			u.assert(fun('bar') === 'foobar', 'bind 1');
			
			u.assertThrowsError(function() {
				illa.bind(null, {});
			}, 'bind 2');



			u.assert(illa.StringUtil.escapeHTML('<h1>"T&amp;C\'s"</h1>') === '&lt;h1&gt;&quot;T&amp;amp;C&#39;s&quot;&lt;/h1&gt;', 'StringUtil.escapeHTML 1');

			u.assert(illa.StringUtil.castNicely(undefined) === '', 'StringUtil.castNicely 1');
			u.assert(illa.StringUtil.castNicely(null) === '', 'StringUtil.castNicely 2');
			u.assert(illa.StringUtil.castNicely({ toString: function() { return 'Nice.' } }) === 'Nice.', 'StringUtil.castNicely 3');
			u.assert(illa.StringUtil.castNicely('foo') === 'foo', 'StringUtil.castNicely 4');



			u.printStats();



			u = this.unitTest = new illa.UnitTest(jQuery('body'));
			u.info('Testing Ticker...');

			this.ticker = new illa.Ticker();
			this.ticker.addIventCallback(illa.Ticker.EVENT_TICK, this.onTick1, this);
		}

		onTick1(e: illa.Ivent): void {
			this.unitTest.assert(this.ticker.getTickCount() === 1, 'Ticker 1');
			this.ticker.removeIventCallback(illa.Ticker.EVENT_TICK, this.onTick1, this);
			this.ticker.addIventCallback(illa.Ticker.EVENT_TICK, this.onTick2, this);
			this.ticker.addIventCallback(illa.Ticker.EVENT_TICK, this.onTick3, this);
		}

		onTick2(e: illa.Ivent): void {
			this.unitTest.assert(this.ticker.getTickCount() === 2, 'Ticker 2');
		}

		onTick3(e: illa.Ivent): void {
			this.unitTest.assert(this.ticker.getTickCount() === 2, 'Ticker 3');
			this.ticker.removeAllIventCallbacks();
			this.ticker.addIventCallback(illa.Ticker.EVENT_TICK, this.onTick4, this);
			this.ticker.addIventCallback(illa.Ticker.EVENT_TICK, this.onTick5, this);
		}

		onTick4(e: illa.Ivent): void {
			this.unitTest.assert(this.ticker.getTickCount() === 3, 'Ticker 4');
			e.setStopImmediatePropagation(true);
			this.ticker.removeIventCallback(illa.Ticker.EVENT_TICK, this.onTick4, this);
		}

		onTick5(e: illa.Ivent): void {
			this.unitTest.assert(this.ticker.getTickCount() === 4, 'Ticker 5');
			this.ticker.setIsStarted(false);
			setTimeout(jQuery.proxy(this.onTickerFinished, this), 500);
		}

		onTickerFinished(): void {
			this.unitTest.assert(this.ticker.getTickCount() === 4, 'Ticker 6');
			this.unitTest.printStats();
		}
	}
}

var test1Main = new test1.Main();