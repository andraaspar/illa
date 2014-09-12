/// <reference path='../../src/illa/_module.ts'/>
/// <reference path='../../src/illa/ArrayUtil.ts'/>
/// <reference path='../../src/illa/Log.ts'/>
/// <reference path='../../src/illa/Map.ts'/>
/// <reference path='../../src/illa/ObjectUtil.ts'/>
/// <reference path='../../src/illa/Rectangle.ts'/>
/// <reference path='../../src/illa/StringUtil.ts'/>
/// <reference path='../../src/illa/Ticker.ts'/>
/// <reference path='../../src/illa/UnitTest.ts'/>

module test1 {
	export class Main {
		unitTest: illa.UnitTest;
		ticker: illa.Ticker;

		constructor() {
			var u = this.unitTest = new illa.UnitTest();
			u.info('Testing...');



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
			u.assert(illa.as(illa.Event, this) === null, 'as 2');
			var ivent = new illa.Event('test', null);
			u.assert(illa.as(illa.Event, ivent) === ivent, 'as 3');

			var fun = illa.bind(function(suffix: string): string {
				return this.prefix + suffix;
			}, { prefix: 'foo' });
			u.assert(fun('bar') === 'foobar', 'bind 1');

			u.assertThrowsError(function() {
				illa.bind(null, {});
			}, 'bind 2');

			u.assert(illa.isFunction(illa.GLOBAL.isNaN), 'GLOBAL 1');



			u.assert(illa.StringUtil.escapeHTML('<h1>"T&amp;C\'s"</h1>') === '&lt;h1&gt;&quot;T&amp;amp;C&#39;s&quot;&lt;/h1&gt;', 'StringUtil.escapeHTML 1');

			u.assert(illa.StringUtil.castNicely(undefined) === '', 'StringUtil.castNicely 1');
			u.assert(illa.StringUtil.castNicely(null) === '', 'StringUtil.castNicely 2');
			u.assert(illa.StringUtil.castNicely({ toString: function() { return 'Nice.' } }) === 'Nice.', 'StringUtil.castNicely 3');
			u.assert(illa.StringUtil.castNicely('foo') === 'foo', 'StringUtil.castNicely 4');

			u.assert(illa.StringUtil.trim('  foo   ') === 'foo', 'StringUtil.trim 1');
			u.assert(illa.StringUtil.trim('\t\r\nfoo\r\n\t') === 'foo', 'StringUtil.trim 2');


			u.assert(illa.ArrayUtil.indexOf(['foo', 'bar', 'baz', 'foo'], 'foo') === 0, 'ArrayUtil.indexOf 1');
			u.assert(illa.ArrayUtil.indexOf(['foo', 'bar', 'baz', 'foo'], 'quux') === -1, 'ArrayUtil.indexOf 2');
			u.assert(illa.ArrayUtil.indexOf(['foo', 'bar', 'baz', 'foo'], undefined) === -1, 'ArrayUtil.indexOf 3');
			u.assert(illa.ArrayUtil.indexOf(['foo', 'bar', 'baz', 'foo'], NaN) === -1, 'ArrayUtil.indexOf 4');
			u.assert(illa.ArrayUtil.indexOf(['foo', 'bar', 'baz', 'foo'], false) === -1, 'ArrayUtil.indexOf 5');
			u.assert(illa.ArrayUtil.indexOf([0, 1, NaN, 3], NaN) === -1, 'ArrayUtil.indexOf 6');
			u.assert(illa.ArrayUtil.indexOf([0, 1, undefined, 3], undefined) === 2, 'ArrayUtil.indexOf 7');
			u.assert(illa.ArrayUtil.indexOf([0, 1, null, 3], null) === 2, 'ArrayUtil.indexOf 8');
			u.assert(illa.ArrayUtil.indexOf([0, 1, Infinity, 3], Infinity) === 2, 'ArrayUtil.indexOf 9');

			(function() {
				var testArr = ['foo', 'bar', 'baz', 'foo'];
				var removed = illa.ArrayUtil.removeFirst(testArr, 'foo');
				u.assert(testArr.length === 3, 'ArrayUtil.removeFirst 1');
				u.assert(testArr[0] === 'bar', 'ArrayUtil.removeFirst 2');
				u.assert(testArr[2] === 'foo', 'ArrayUtil.removeFirst 3');
				u.assert(removed, 'ArrayUtil.removeFirst 4');
			})();

			(function() {
				var testArr = ['foo', 'bar', 'baz', 'foo'];
				var removed = illa.ArrayUtil.removeFirst(testArr, 'quux');
				u.assert(testArr.length === 4, 'ArrayUtil.removeFirst 5');
				u.assert(removed === false, 'ArrayUtil.removeFirst 6');
			})();

			(function() {
				var testArr = ['foo', 'bar', 'baz', 'foo'];
				var removed = illa.ArrayUtil.removeAll(testArr, 'foo');
				u.assert(testArr.length === 2, 'ArrayUtil.removeAll 1');
				u.assert(testArr[0] === 'bar', 'ArrayUtil.removeAll 2');
				u.assert(testArr[1] === 'baz', 'ArrayUtil.removeAll 3');
				u.assert(removed, 'ArrayUtil.removeAll 4');
			})();
			
			(function() {
				var testMap = new illa.Map<number, string>();
				testMap.set(0, 'zero');
				testMap.set(7.5, 'seven and a half');
				testMap.set(undefined, 'not a number');
				testMap.set(Infinity, 'infinity');
				testMap.set(-Infinity, 'negative infinity');
				
				u.assert(testMap.getLength() === 5, 'Map 1');
				u.assert(testMap.get(0) === 'zero', 'Map 2');
				u.assert(testMap.get(7.5) === 'seven and a half', 'Map 3');
				u.assert(testMap.get(undefined) === 'not a number', 'Map 4');
				u.assert(testMap.get(Infinity) === 'infinity', 'Map 5');
				u.assert(testMap.get(-Infinity) === 'negative infinity', 'Map 6');
				
				testMap.set(0, 'nothing');
				
				u.assert(testMap.getLength() === 5, 'Map 7');
				u.assert(testMap.get(0) === 'nothing', 'Map 8');
				
				testMap.remove(7.5);
				
				u.assert(testMap.getLength() === 4, 'Map 9');
				u.assert(illa.isUndefined(testMap.get(7.5)), 'Map 10');
				u.assert(testMap.get(undefined) === 'not a number', 'Map 11');
				
				testMap.setAll(new illa.Map([1, 2, 3], ['one', 'two', 'three']));
				
				u.assert(testMap.getLength() === 7, 'Map 12');
				u.assert(testMap.get(1) === 'one', 'Map 13');
				u.assert(testMap.get(2) === 'two', 'Map 14');
				u.assert(testMap.get(3) === 'three', 'Map 15');
				
				testMap.removeAll();
				
				u.assert(testMap.getLength() === 0, 'Map 16');
			})();
			
			(function() {
				var testMap = new illa.Map<{}, string>();
				var key1 = {id: 1};
				var key2 = {id: 2};
				testMap.set(key1, 'key 1');
				testMap.set(null, 'null');
				testMap.set(undefined, 'undefined');
				testMap.set(key2, 'key 2');
				
				u.assert(testMap.getLength() === 4, 'Map 17');
				u.assert(testMap.get(key1) === 'key 1', 'Map 18');
				u.assert(illa.isUndefined(testMap.get({id: 1})), 'Map 19');
				u.assert(testMap.get(key2) === 'key 2', 'Map 20');
				u.assert(testMap.get(null) === 'null', 'Map 21');
				u.assert(testMap.get(undefined) === 'undefined', 'Map 22');
			})();

			(function() {
				var testObj = {'a': undefined, 'b': null, 'c': '', 'd': 0, 'e': Infinity, 'f': NaN, 'g': false, 'h': {}, 'i': []};
				var keys = illa.ObjectUtil.getKeys(testObj);
				u.assert(keys.length === 9, 'ObjectUtil.getKeys 1');
				u.assert(keys[0] === 'a', 'ObjectUtil.getKeys 2');
				u.assert(keys[1] === 'b', 'ObjectUtil.getKeys 3');
				u.assert(keys[2] === 'c', 'ObjectUtil.getKeys 4');
				u.assert(keys[3] === 'd', 'ObjectUtil.getKeys 5');
				u.assert(keys[4] === 'e', 'ObjectUtil.getKeys 6');
				u.assert(keys[5] === 'f', 'ObjectUtil.getKeys 7');
				u.assert(keys[6] === 'g', 'ObjectUtil.getKeys 8');
				u.assert(keys[7] === 'h', 'ObjectUtil.getKeys 9');
				u.assert(keys[8] === 'i', 'ObjectUtil.getKeys 10');
			})();



			this.ticker = new illa.Ticker();
			this.ticker.addEventCallback(illa.Ticker.EVENT_TICK, this.onTick1, this);
		}

		onTick1(e: illa.Event): void {
			this.unitTest.assert(this.ticker.getTickCount() === 1, 'Ticker 1');
			this.ticker.removeEventCallback(illa.Ticker.EVENT_TICK, this.onTick1, this);
			this.ticker.addEventCallback(illa.Ticker.EVENT_TICK, this.onTick2, this);
			this.ticker.addEventCallback(illa.Ticker.EVENT_TICK, this.onTick3, this);
		}

		onTick2(e: illa.Event): void {
			this.unitTest.assert(this.ticker.getTickCount() === 2, 'Ticker 2');
		}

		onTick3(e: illa.Event): void {
			this.unitTest.assert(this.ticker.getTickCount() === 2, 'Ticker 3');
			this.ticker.removeAllEventCallbacks();
			this.ticker.addEventCallback(illa.Ticker.EVENT_TICK, this.onTick4, this);
			this.ticker.addEventCallback(illa.Ticker.EVENT_TICK, this.onTick5, this);
		}

		onTick4(e: illa.Event): void {
			this.unitTest.assert(this.ticker.getTickCount() === 3, 'Ticker 4');
			e.setStopImmediatePropagation(true);
			this.ticker.removeEventCallback(illa.Ticker.EVENT_TICK, this.onTick4, this);
		}

		onTick5(e: illa.Event): void {
			this.unitTest.assert(this.ticker.getTickCount() === 4, 'Ticker 5');
			this.ticker.setIsStarted(false);
			setTimeout(illa.bind(this.onTickerFinished, this), 500);
		}

		onTickerFinished(): void {
			this.unitTest.assert(this.ticker.getTickCount() === 4, 'Ticker 6');
			this.unitTest.printStats();
		}
	}
}

var test1Main = new test1.Main();