import {
	Arrkup,
	ArrayUtil,
	bind,
	Event as Ivent,
	FunctionUtil,
	GLOBAL,
	Lipsum,
	LipsumPresetDefault,
	LipsumPresetLabel,
	LipsumPresetName,
	LipsumPresetTitle,
	Map,
	NumberUtil,
	ObjectUtil,
	StringUtil,
	Ticker,
	Type,
	uuid,
	UnitTest,
} from './index';

module test1 {
	export class Main {
		
		static instance: Main;
		
		unitTest: UnitTest;
		ticker: Ticker;
		throttled: {(string, number, boolean): void; cancel: () => void};
		throttledResult: [number, string, boolean];
		debounced: {(string, number, boolean): void; cancel: () => void};
		debouncedResult: [number, string, boolean];

		constructor() {
			var u = this.unitTest = new UnitTest();
			u.info('Testing...');
			
			
			
			u.assert(Type.isString('undefined'), 'Type.isString 1');
			u.assert(Type.isString(true) === false, 'Type.isString 2');

			u.assert(Type.isBoolean(true), 'Type.isBoolean 1');
			u.assert(Type.isBoolean(false), 'Type.isBoolean 2');
			u.assert(Type.isBoolean('true') === false, 'Type.isBoolean 3');
			u.assert(Type.isBoolean(1) === false, 'Type.isBoolean 4');

			u.assert(Type.isNumber(0), 'Type.isNumber 1');
			u.assert(Type.isNumber(NaN), 'Type.isNumber 2');
			u.assert(Type.isNumber(Infinity), 'Type.isNumber 3');
			u.assert(Type.isNumber('1') === false, 'Type.isNumber 4');

			u.assert(Type.isArray([]), 'Type.isArray 1');
			u.assert(Type.isArray(new Array()), 'Type.isArray 2');
			u.assert(Type.isArray({ '0': 0, length: 1 }) === false, 'Type.isArray 3');

			var arraySub = function() {
				Array.call(this);
			};
			arraySub.prototype = new Array();
			arraySub.prototype.constructor = Array;

			u.assert(Type.isArray(new arraySub()) === false, 'Type.isArray 4');

			u.assert(Type.isFunction(function() { }), 'Type.isFunction 1');
			u.assert(Type.isFunction(test1.Main), 'Type.isFunction 2');
			u.assert(Type.isFunction(Function), 'Type.isFunction 3');
			u.assert(Type.isFunction(new Function()), 'Type.isFunction 4');
			u.assert(Type.isFunction({}) === false, 'Type.isFunction 5');

			u.assert(Type.isNull(null), 'Type.isNull 1');
			u.assert(Type.isNull(undefined) === false, 'Type.isNull 2');
			u.assert(Type.isNull({}) === false, 'Type.isNull 3');

			u.assert(Type.isUndefined(undefined), 'Type.isUndefined 1');
			u.assert(Type.isUndefined(null) === false, 'Type.isUndefined 2');
			u.assert(Type.isUndefined('undefined') === false, 'Type.isUndefined 3');

			u.assert(Type.isUndefinedOrNull(undefined), 'Type.isUndefinedOrNull 1');
			u.assert(Type.isUndefinedOrNull(null), 'Type.isUndefinedOrNull 2');
			u.assert(Type.isUndefinedOrNull('undefined') === false, 'Type.isUndefinedOrNull 3');
			u.assert(Type.isUndefinedOrNull('null') === false, 'Type.isUndefinedOrNull 4');

			u.assert(Type.isObjectNotNull({}), 'Type.isObjectNotNull 1');
			u.assert(Type.isObjectNotNull([]), 'Type.isObjectNotNull 2');
			u.assert(Type.isObjectNotNull(function() { }), 'Type.isObjectNotNull 3');
			u.assert(Type.isObjectNotNull(null) === false, 'Type.isObjectNotNull 4');
			u.assert(Type.isObjectNotNull(undefined) === false, 'Type.isObjectNotNull 5');
			u.assert(Type.isObjectNotNull(NaN) === false, 'Type.isObjectNotNull 6');
			u.assert(Type.isObjectNotNull('foo') === false, 'Type.isObjectNotNull 7');

			u.assert(Type.as(Main, this) === this, 'Type.as 1');
			u.assert(Type.as(Ivent, this) === null, 'Type.as 2');
			var ivent = new Ivent('test', null);
			u.assert(Type.as(Ivent, ivent) === ivent, 'Type.as 3');

			(function() {
				var fun = bind(function(suffix: string): string {
					return this.prefix + suffix;
				}, { prefix: 'foo' });
				u.assert(fun('bar') === 'foobar', 'bind 1');
			})();

			(function() {
				var fun = bind(function(a, b) {
					return <any>a + b + this.c;
				}, { c: 'baz' }, 'foo');
				u.assert(fun('bar') === 'foobarbaz', 'bind 2');
			})();

			u.assertThrowsError(function() {
				bind(null, {});
			}, 'bind 3');

			u.assert(Type.isFunction(GLOBAL.isNaN), 'GLOBAL 1');
			
			u.assert(Type.isString(uuid()), 'uuid 1');



			u.assert(StringUtil.escapeHTML('<h1>"T&amp;C\'s"</h1>') === '&lt;h1&gt;&quot;T&amp;amp;C&#39;s&quot;&lt;/h1&gt;', 'StringUtil.escapeHTML 1');

			u.assert(StringUtil.escapeRegExp('^[a-z]*?[0-9]{1,3}\\d$') === '\\^\\[a\\-z\\]\\*\\?\\[0\\-9\\]\\{1,3\\}\\\\d\\$', 'StringUtil.escapeRegExp 1');

			u.assert(StringUtil.castNicely(undefined) === '', 'StringUtil.castNicely 1');
			u.assert(StringUtil.castNicely(null) === '', 'StringUtil.castNicely 2');
			u.assert(StringUtil.castNicely({ toString: function() { return 'Nice.' } }) === 'Nice.', 'StringUtil.castNicely 3');
			u.assert(StringUtil.castNicely('foo') === 'foo', 'StringUtil.castNicely 4');

			u.assert(StringUtil.trim('  foo   ') === 'foo', 'StringUtil.trim 1');
			u.assert(StringUtil.trim('\t\r\nfoo\r\n\t') === 'foo', 'StringUtil.trim 2');
			
			u.assert(StringUtil.hash('a8a4b21f-2051-3cbe-44e4-ffb21749c298') != StringUtil.hash('a8a4b21f-2051-3cbe-44e4-ffb21749c299'), 'StringUtil.hash 1');
			
			(function() {
				var obj = StringUtil.parseQuery('foo=1&bar=2+2&baz=&quux');
				u.assert(obj['foo'] === '1', 'StringUtil.parseQuery 1');
				u.assert(obj['bar'] === '2 2', 'StringUtil.parseQuery 2');
				u.assert(obj['baz'] === '', 'StringUtil.parseQuery 3');
				u.assert(obj['quux'] === '', 'StringUtil.parseQuery 4');
			})();
			
			(function() {
				var obj = StringUtil.parseQuery('foo=1&foo=2&foo=3', true);
				u.assert(Type.isArray(obj['foo']), 'StringUtil.parseQuery 5');
				u.assert(obj['foo'].length === 3, 'StringUtil.parseQuery 6');
				u.assert(obj['foo'][0] === '1', 'StringUtil.parseQuery 7');
				u.assert(obj['foo'][1] === '2', 'StringUtil.parseQuery 8');
				u.assert(obj['foo'][2] === '3', 'StringUtil.parseQuery 9');
			})();


			u.assert(NumberUtil.toStringNoLetters(0) === '0', 'NumberUtil.toStringNoLetters 1');
			u.assert(NumberUtil.toStringNoLetters(NaN) === '', 'NumberUtil.toStringNoLetters 2');
			u.assert(NumberUtil.toStringNoLetters(Infinity) === '', 'NumberUtil.toStringNoLetters 3');
			u.assert(NumberUtil.toStringNoLetters(-Infinity) === '', 'NumberUtil.toStringNoLetters 4');
			u.assert(NumberUtil.toStringNoLetters(1234.5678) === '1234.5678', 'NumberUtil.toStringNoLetters 5');
			u.assert(NumberUtil.toStringNoLetters(-1234.5678) === '-1234.5678', 'NumberUtil.toStringNoLetters 6');
			u.assert(NumberUtil.toStringNoLetters(1e21) === '1000000000000000000000', 'NumberUtil.toStringNoLetters 7');
			u.assert(NumberUtil.toStringNoLetters(1e-7) === '0.00000009999999999999999', 'NumberUtil.toStringNoLetters 8');


			u.assert(ArrayUtil.indexOf(['foo', 'bar', 'baz', 'foo'], 'foo') === 0, 'ArrayUtil.indexOf 1');
			u.assert(ArrayUtil.indexOf(['foo', 'bar', 'baz', 'foo'], 'quux') === -1, 'ArrayUtil.indexOf 2');
			u.assert(ArrayUtil.indexOf(['foo', 'bar', 'baz', 'foo'], undefined) === -1, 'ArrayUtil.indexOf 3');
			u.assert(ArrayUtil.indexOf<any>(['foo', 'bar', 'baz', 'foo'], NaN) === -1, 'ArrayUtil.indexOf 4');
			u.assert(ArrayUtil.indexOf<any>(['foo', 'bar', 'baz', 'foo'], false) === -1, 'ArrayUtil.indexOf 5');
			u.assert(ArrayUtil.indexOf([0, 1, NaN, 3], NaN) === -1, 'ArrayUtil.indexOf 6');
			u.assert(ArrayUtil.indexOf([0, 1, undefined, 3], undefined) === 2, 'ArrayUtil.indexOf 7');
			u.assert(ArrayUtil.indexOf([0, 1, null, 3], null) === 2, 'ArrayUtil.indexOf 8');
			u.assert(ArrayUtil.indexOf([0, 1, Infinity, 3], Infinity) === 2, 'ArrayUtil.indexOf 9');

			(function() {
				var testArr = ['foo', 'bar', 'baz', 'foo'];
				var removed = ArrayUtil.removeFirst(testArr, 'foo');
				u.assert(testArr.length === 3, 'ArrayUtil.removeFirst 1');
				u.assert(testArr[0] === 'bar', 'ArrayUtil.removeFirst 2');
				u.assert(testArr[2] === 'foo', 'ArrayUtil.removeFirst 3');
				u.assert(removed, 'ArrayUtil.removeFirst 4');
			})();

			(function() {
				var testArr = ['foo', 'bar', 'baz', 'foo'];
				var removed = ArrayUtil.removeFirst(testArr, 'quux');
				u.assert(testArr.length === 4, 'ArrayUtil.removeFirst 5');
				u.assert(removed === false, 'ArrayUtil.removeFirst 6');
			})();

			(function() {
				var testArr = ['foo', 'bar', 'baz', 'foo'];
				var removed = ArrayUtil.removeAll(testArr, 'foo');
				u.assert(testArr.length === 2, 'ArrayUtil.removeAll 1');
				u.assert(testArr[0] === 'bar', 'ArrayUtil.removeAll 2');
				u.assert(testArr[1] === 'baz', 'ArrayUtil.removeAll 3');
				u.assert(removed, 'ArrayUtil.removeAll 4');
			})();
			
			(function() {
				var oldArr = [1, 2, 3];
				var newArr = [1, 3, 4];
				var result = ArrayUtil.diff(oldArr, newArr);
				u.assert(result.length === 2, 'ArrayUtil.diff 1');
				u.assert(result[0].item === 2, 'ArrayUtil.diff 2');
				u.assert(result[0].added === false, 'ArrayUtil.diff 3');
				u.assert(result[0].oldIndex === 1, 'ArrayUtil.diff 4');
				u.assert(result[0].newIndex === -1, 'ArrayUtil.diff 5');
				u.assert(result[1].item === 4, 'ArrayUtil.diff 6');
				u.assert(result[1].added === true, 'ArrayUtil.diff 7');
				u.assert(result[1].oldIndex === -1, 'ArrayUtil.diff 8');
				u.assert(result[1].newIndex === 2, 'ArrayUtil.diff 9');
			})();

			(function() {
				var testMap = new Map<number, string>();
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
				u.assert(Type.isUndefined(testMap.get(7.5)), 'Map 10');
				u.assert(testMap.get(undefined) === 'not a number', 'Map 11');

				testMap.setAll(new Map([1, 2, 3], ['one', 'two', 'three']));

				u.assert(testMap.getLength() === 7, 'Map 12');
				u.assert(testMap.get(1) === 'one', 'Map 13');
				u.assert(testMap.get(2) === 'two', 'Map 14');
				u.assert(testMap.get(3) === 'three', 'Map 15');

				testMap.removeAll();

				u.assert(testMap.getLength() === 0, 'Map 16');
			})();

			(function() {
				var testMap = new Map<{}, string>();
				var key1 = { id: 1 };
				var key2 = { id: 2 };
				testMap.set(key1, 'key 1');
				testMap.set(null, 'null');
				testMap.set(undefined, 'undefined');
				testMap.set(key2, 'key 2');

				u.assert(testMap.getLength() === 4, 'Map 17');
				u.assert(testMap.get(key1) === 'key 1', 'Map 18');
				u.assert(Type.isUndefined(testMap.get({ id: 1 })), 'Map 19');
				u.assert(testMap.get(key2) === 'key 2', 'Map 20');
				u.assert(testMap.get(null) === 'null', 'Map 21');
				u.assert(testMap.get(undefined) === 'undefined', 'Map 22');
			})();

			(function() {
				var testObj = { 'a': undefined, 'b': null, 'c': '', 'd': 0, 'e': Infinity, 'f': NaN, 'g': false, 'h': {}, 'i': [] };
				var keys = ObjectUtil.getKeys(testObj);
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

				u.assert(ObjectUtil.getKeyOfValue(testObj, {}) === '', 'ObjectUtil.getKeyOfValue 1');
				u.assert(ObjectUtil.getKeyOfValue(testObj, undefined) === 'a', 'ObjectUtil.getKeyOfValue 2');
				u.assert(ObjectUtil.getKeyOfValue(testObj, null) === 'b', 'ObjectUtil.getKeyOfValue 3');
				u.assert(ObjectUtil.getKeyOfValue(testObj, '') === 'c', 'ObjectUtil.getKeyOfValue 4');
				u.assert(ObjectUtil.getKeyOfValue(testObj, 0) === 'd', 'ObjectUtil.getKeyOfValue 5');
				u.assert(ObjectUtil.getKeyOfValue(testObj, Infinity) === 'e', 'ObjectUtil.getKeyOfValue 6');
				u.assert(ObjectUtil.getKeyOfValue(testObj, NaN) === '', 'ObjectUtil.getKeyOfValue 7');
				u.assert(ObjectUtil.getKeyOfValue(testObj, false) === 'g', 'ObjectUtil.getKeyOfValue 8');
				u.assert(ObjectUtil.getKeyOfValue(testObj, testObj['h']) === 'h', 'ObjectUtil.getKeyOfValue 9');
				u.assert(ObjectUtil.getKeyOfValue(testObj, testObj['i']) === 'i', 'ObjectUtil.getKeyOfValue 10');
				u.assert(ObjectUtil.getKeyOfValue(testObj, []) === '', 'ObjectUtil.getKeyOfValue 11');

				testObj['j'] = testObj['i'];
				var keysOfIArray = ObjectUtil.getKeysOfValue(testObj, testObj['i']);
				u.assert(keysOfIArray.length === 2, 'ObjectUtil.getKeysOfValue 1');
				u.assert(keysOfIArray[0] === 'i', 'ObjectUtil.getKeysOfValue 2');
				u.assert(keysOfIArray[1] === 'j', 'ObjectUtil.getKeysOfValue 3');
				var keysOfNaN = ObjectUtil.getKeysOfValue(testObj, NaN);
				u.assert(keysOfNaN.length === 0, 'ObjectUtil.getKeysOfValue 4');
				var keysOfFalse = ObjectUtil.getKeysOfValue(testObj, false);
				u.assert(keysOfFalse.length === 1, 'ObjectUtil.getKeysOfValue 5');
				u.assert(keysOfFalse[0] === 'g', 'ObjectUtil.getKeysOfValue 6');
			})();


			(function() {
				var arrkup = [
					[null, '<!DOCTYPE html>'],
					['html',
						['head',
							['meta/', { charset: 'UTF-8' }],
							['title', 'Arrkup - get a <tag>']
						],
						['body',
							['h1', { 'class': 'my-h1 the-title' }, 'Arrkup & fun'],
							['input/', { name: 'zero', value: 0 }],
							['input/', { name: 'eight-point-three', value: 8.3 }],
							['input/', { name: '1e21', value: 1e21 }],
							['input/', { name: '1e-7', value: 1e-7 }],
							['input/', { name: 'nan', value: NaN }],
							['input/', { name: 'infinity', value: Infinity }],
							['input/', { name: 'negative-infinity', value: -Infinity }],
							['input/', { name: 'true', value: true }],
							['input/', { name: 'false', value: false }],
							['input/', { name: 'empty-string', value: '' }],
							[null, '<!-- Content START -->'],
							['a', { href: 'http://example.com?foo=bar&baz=quux', title: 'I say, "Click me"' }, 'It\'s clicking time']
						]
					]
				];
				var markup = '<!DOCTYPE html>' +
					'<html>' +
					'<head>' +
					'<meta charset="UTF-8"/>' +
					'<title>Arrkup - get a &lt;tag&gt;</title>' +
					'</head>' +
					'<body>' +
					'<h1 class="my-h1 the-title">Arrkup &amp; fun</h1>' +
					'<input name="zero" value="0"/>' +
					'<input name="eight-point-three" value="8.3"/>' +
					'<input name="1e21" value="1000000000000000000000"/>' +
					'<input name="1e-7" value="0.00000009999999999999999"/>' +
					'<input name="nan" value=""/>' +
					'<input name="infinity" value=""/>' +
					'<input name="negative-infinity" value=""/>' +
					'<input name="true" value/>' +
					'<input name="false"/>' +
					'<input name="empty-string" value=""/>' +
					'<!-- Content START -->' +
					'<a href="http://example.com?foo=bar&amp;baz=quux" title="I say, &quot;Click me&quot;">It&#39;s clicking time</a>' +
					'</body>' +
					'</html>';
				//Log.log(Arrkup.createString(arrkup));
				u.assert(Arrkup.createString(arrkup) === markup, 'Arrkup 1');
			})();
			
			u.assert(Type.isString(Lipsum.generate()), 'Lipsum 1');
			u.assert(Type.isString(Lipsum.generate(new LipsumPresetDefault().setHighlight(.05, '<span>', '</span>'))), 'Lipsum 2');
			u.assert(Type.isString(Lipsum.generate(new LipsumPresetLabel())), 'Lipsum 3');
			u.assert(Type.isString(Lipsum.generate(new LipsumPresetName())), 'Lipsum 4');
			u.assert(Type.isString(Lipsum.generate(new LipsumPresetTitle())), 'Lipsum 5');
			
			
			
			var throttleTest = function(a: number, b: string, c: boolean): void {
				this.throttledResult = [a, b, c];
			};
			this.throttled = FunctionUtil.throttle(throttleTest, this, 30);
			this.throttled(1, 'a', true);
			u.assert(this.throttledResult[0] === 1 && this.throttledResult[1] === 'a' && this.throttledResult[2] === true, 'FunctionUtil.throttle 1');
			this.throttled(2, 'b', false);
			this.throttled(3, 'c', true);
			u.assert(this.throttledResult[0] === 1 && this.throttledResult[1] === 'a' && this.throttledResult[2] === true, 'FunctionUtil.throttle 2');
			
			
			
			var debounceTest = function(a: number, b: string, c: boolean): void {
				this.debouncedResult = [a, b, c];
			};
			this.debounced = FunctionUtil.debounce(debounceTest, this, 30);
			this.debouncedResult = [1, 'a', true];
			this.debounced(2, 'b', false);
			u.assert(this.debouncedResult[0] === 1 && this.debouncedResult[1] === 'a' && this.debouncedResult[2] === true, 'FunctionUtil.debounce 1');



			this.ticker = new Ticker();
			this.ticker.addEventCallback(Ticker.EVENT_TICK, this.onTick1, this);
		}

		onTick1(e: Ivent): void {
			this.unitTest.assert(this.ticker.getTickCount() === 1, 'Ticker 1');
			this.ticker.removeEventCallback(Ticker.EVENT_TICK, this.onTick1, this);
			this.ticker.addEventCallback(Ticker.EVENT_TICK, this.onTick2, this);
			this.ticker.addEventCallback(Ticker.EVENT_TICK, this.onTick3, this);
		}

		onTick2(e: Ivent): void {
			this.unitTest.assert(this.ticker.getTickCount() === 2, 'Ticker 2');
		}

		onTick3(e: Ivent): void {
			this.unitTest.assert(this.ticker.getTickCount() === 2, 'Ticker 3');
			this.ticker.removeAllEventCallbacks();
			this.ticker.addEventCallback(Ticker.EVENT_TICK, this.onTick4, this);
			this.ticker.addEventCallback(Ticker.EVENT_TICK, this.onTick5, this);
		}

		onTick4(e: Ivent): void {
			this.unitTest.assert(this.ticker.getTickCount() === 3, 'Ticker 4');
			e.setStopImmediatePropagation(true);
			this.ticker.removeEventCallback(Ticker.EVENT_TICK, this.onTick4, this);
		}

		onTick5(e: Ivent): void {
			this.unitTest.assert(this.ticker.getTickCount() === 4, 'Ticker 5');
			this.ticker.setIsStarted(false);
			setTimeout(bind(this.onTickerFinished, this), 500);
		}

		onTickerFinished(): void {
			this.unitTest.assert(this.ticker.getTickCount() === 4, 'Ticker 6');
			
			this.unitTest.assert(this.throttledResult[0] === 3 && this.throttledResult[1] === 'c' && this.throttledResult[2] === true, 'FunctionUtil.throttle 3');
			this.throttled(4, 'd', false);
			this.unitTest.assert(this.throttledResult[0] === 4 && this.throttledResult[1] === 'd' && this.throttledResult[2] === false, 'FunctionUtil.throttle 4');
			this.throttled(5, 'e', true);
			this.unitTest.assert(this.throttledResult[0] === 4 && this.throttledResult[1] === 'd' && this.throttledResult[2] === false, 'FunctionUtil.throttle 5');
			this.throttled.cancel();
			
			setTimeout(bind(this.onThrottleFinished, this), 100);
		}
		
		onThrottleFinished(): void {
			this.unitTest.assert(this.throttledResult[0] === 4 && this.throttledResult[1] === 'd' && this.throttledResult[2] === false, 'FunctionUtil.throttle 6');
			this.unitTest.assert(this.debouncedResult[0] === 2 && this.debouncedResult[1] === 'b' && this.debouncedResult[2] === false, 'FunctionUtil.debounce 2');
			this.unitTest.printStats();
		}
	}
}
test1.Main.instance = new test1.Main();