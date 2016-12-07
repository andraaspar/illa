import { as, isArray, isBoolean, isFunction, isNull, isNumber, isObjectNotNull, isString, isUndefined, isUndefinedOrNull } from './Type'
import { bind, debounce, throttle } from './FunctionUtil'
import { diff, removeAll, removeFirst } from './ArrayUtil'
import { escapeHtml, escapeRegExp, hash, optionalString, parseQuery, trim, uuid } from './StringUtil'
import { getKeyOfValue, getKeysOfValue } from './ObjectUtil'

import { GLOBAL } from './GLOBAL'
import { IllaEvent } from './IllaEvent'
import { LipsumPresetDefault } from './LipsumPresetDefault'
import { LipsumPresetLabel } from './LipsumPresetLabel'
import { LipsumPresetName } from './LipsumPresetName'
import { LipsumPresetTitle } from './LipsumPresetTitle'
import { Map } from './Map'
import { Ticker } from './Ticker'
import { UnitTest } from './UnitTest'
import { arrkup } from './Arrkup'
import { info } from './Log'
import { lipsum } from './Lipsum'
import { numberToStringNoLetters } from './NumberUtil'

class Main {

	static instance = new Main()

	unitTest: UnitTest
	ticker: Ticker
	throttled: { (a: number, b: string, c: boolean): void; cancel: () => void }
	throttledResult: [number, string, boolean]
	debounced: { (a: number, b: string, c: boolean): void; cancel: () => void }
	debouncedResult: [number, string, boolean]

	constructor() {
		let u = this.unitTest = new UnitTest()
		info('Testing...')



		u.assert(isString('undefined'), 'isString 1')
		u.assert(isString(true) === false, 'isString 2')

		u.assert(isBoolean(true), 'isBoolean 1')
		u.assert(isBoolean(false), 'isBoolean 2')
		u.assert(isBoolean('true') === false, 'isBoolean 3')
		u.assert(isBoolean(1) === false, 'isBoolean 4')

		u.assert(isNumber(0), 'isNumber 1')
		u.assert(isNumber(NaN), 'isNumber 2')
		u.assert(isNumber(Infinity), 'isNumber 3')
		u.assert(isNumber('1') === false, 'isNumber 4')

		u.assert(isArray([]), 'isArray 1')
		u.assert(isArray(new Array()), 'isArray 2')
		u.assert(isArray({ '0': 0, length: 1 }) === false, 'isArray 3')

		let arraySub = function(this: any) {
			Array.call(this)
		}
		arraySub.prototype = new Array()
		arraySub.constructor = Array

		u.assert(isArray(new (<any>arraySub)()) === false, 'isArray 4')

		u.assert(isFunction(function() { }), 'isFunction 1')
		u.assert(isFunction(Main), 'isFunction 2')
		u.assert(isFunction(Function), 'isFunction 3')
		u.assert(isFunction(new Function()), 'isFunction 4')
		u.assert(isFunction({}) === false, 'isFunction 5')

		u.assert(isNull(null), 'isNull 1')
		u.assert(isNull(undefined) === false, 'isNull 2')
		u.assert(isNull({}) === false, 'isNull 3')

		u.assert(isUndefined(undefined), 'isUndefined 1')
		u.assert(isUndefined(null) === false, 'isUndefined 2')
		u.assert(isUndefined('undefined') === false, 'isUndefined 3')

		u.assert(isUndefinedOrNull(undefined), 'isUndefinedOrNull 1')
		u.assert(isUndefinedOrNull(null), 'isUndefinedOrNull 2')
		u.assert(isUndefinedOrNull('undefined') === false, 'isUndefinedOrNull 3')
		u.assert(isUndefinedOrNull('null') === false, 'isUndefinedOrNull 4')

		u.assert(isObjectNotNull({}), 'isObjectNotNull 1')
		u.assert(isObjectNotNull([]), 'isObjectNotNull 2')
		u.assert(isObjectNotNull(function() { }), 'isObjectNotNull 3')
		u.assert(isObjectNotNull(null) === false, 'isObjectNotNull 4')
		u.assert(isObjectNotNull(undefined) === false, 'isObjectNotNull 5')
		u.assert(isObjectNotNull(NaN) === false, 'isObjectNotNull 6')
		u.assert(isObjectNotNull('foo') === false, 'isObjectNotNull 7')

		u.assert(as(Main, this) === this, 'as 1')
		u.assert(as(IllaEvent, this) === null, 'as 2')
		let illaEvent = new IllaEvent('test', null)
		u.assert(as(IllaEvent, illaEvent) === illaEvent, 'as 3')

			; (function() {
				let f = function(this: { prefix: string }, suffix: string): string {
					return this.prefix + suffix
				}
				let fun = bind(f, { prefix: 'foo' })
				u.assert(fun('bar') === 'foobar', 'bind 1')
			})()

			; (function() {
				let f = function(this: { c: string }, a: string, b: string) {
					return <any>a + b + this.c
				}
				let fun = bind(f, { c: 'baz' }, 'foo')
				u.assert(fun('bar') === 'foobarbaz', 'bind 2')
			})()

		u.assertThrowsError(function() {
			bind(null, {})
		}, 'bind 3')

		u.assert(isFunction(GLOBAL.isNaN), 'GLOBAL 1')

		u.assert(isString(uuid()), 'uuid 1')



		u.assert(escapeHtml('<h1>"T&amp;C\'s"</h1>') === '&lt;h1&gt;&quot;T&amp;amp;C&#39;s&quot;&lt;/h1&gt;', 'escapeHtml 1')

		u.assert(escapeRegExp('^[a-z]*?[0-9]{1,3}\\d$') === '\\^\\[a\\-z\\]\\*\\?\\[0\\-9\\]\\{1,3\\}\\\\d\\$', 'escapeRegExp 1')

		u.assert(optionalString(undefined) === '', 'optionalString 1')
		u.assert(optionalString(null) === '', 'optionalString 2')
		u.assert(optionalString({ toString: function() { return 'Nice.' } }) === 'Nice.', 'optionalString 3')
		u.assert(optionalString('foo') === 'foo', 'optionalString 4')

		u.assert(trim('  foo   ') === 'foo', 'trim 1')
		u.assert(trim('\t\r\nfoo\r\n\t') === 'foo', 'trim 2')

		u.assert(hash('a8a4b21f-2051-3cbe-44e4-ffb21749c298') != hash('a8a4b21f-2051-3cbe-44e4-ffb21749c299'), 'hash 1')

			; (function() {
				let obj: { [key: string]: string } = parseQuery('foo=1&bar=2+2&baz=&quux')
				u.assert(obj['foo'] === '1', 'parseQuery 1')
				u.assert(obj['bar'] === '2 2', 'parseQuery 2')
				u.assert(obj['baz'] === '', 'parseQuery 3')
				u.assert(obj['quux'] === '', 'parseQuery 4')
			})()

			; (function() {
				let obj: { [key: string]: string } = parseQuery('foo=1&foo=2&foo=3', true)
				u.assert(isArray(obj['foo']), 'parseQuery 5')
				u.assert(obj['foo'].length === 3, 'parseQuery 6')
				u.assert(obj['foo'][0] === '1', 'parseQuery 7')
				u.assert(obj['foo'][1] === '2', 'parseQuery 8')
				u.assert(obj['foo'][2] === '3', 'parseQuery 9')
			})()


		u.assert(numberToStringNoLetters(0) === '0', 'numberToStringNoLetters 1')
		u.assert(numberToStringNoLetters(NaN) === '', 'numberToStringNoLetters 2')
		u.assert(numberToStringNoLetters(Infinity) === '', 'numberToStringNoLetters 3')
		u.assert(numberToStringNoLetters(-Infinity) === '', 'numberToStringNoLetters 4')
		u.assert(numberToStringNoLetters(1234.5678) === '1234.5678', 'numberToStringNoLetters 5')
		u.assert(numberToStringNoLetters(-1234.5678) === '-1234.5678', 'numberToStringNoLetters 6')
		u.assert(numberToStringNoLetters(1e21) === '1000000000000000000000', 'numberToStringNoLetters 7')
		u.assert(numberToStringNoLetters(1e-7) === '0.00000009999999999999999', 'numberToStringNoLetters 8')


			; (function() {
				let testArr = ['foo', 'bar', 'baz', 'foo']
				let removed = removeFirst(testArr, 'foo')
				u.assert(testArr.length === 3, 'removeFirst 1')
				u.assert(testArr[0] === 'bar', 'removeFirst 2')
				u.assert(testArr[2] === 'foo', 'removeFirst 3')
				u.assert(removed, 'removeFirst 4')
			})()

			; (function() {
				let testArr = ['foo', 'bar', 'baz', 'foo']
				let removed = removeFirst(testArr, 'quux')
				u.assert(testArr.length === 4, 'removeFirst 5')
				u.assert(removed === false, 'removeFirst 6')
			})()

			; (function() {
				let testArr = ['foo', 'bar', 'baz', 'foo']
				let removed = removeAll(testArr, 'foo')
				u.assert(testArr.length === 2, 'removeAll 1')
				u.assert(testArr[0] === 'bar', 'removeAll 2')
				u.assert(testArr[1] === 'baz', 'removeAll 3')
				u.assert(removed, 'removeAll 4')
			})()

			; (function() {
				let oldArr = [1, 2, 3]
				let newArr = [1, 3, 4]
				let result = diff(oldArr, newArr)
				u.assert(result.length === 2, 'diff 1')
				u.assert(result[0].item === 2, 'diff 2')
				u.assert(result[0].added === false, 'diff 3')
				u.assert(result[0].oldIndex === 1, 'diff 4')
				u.assert(result[0].newIndex === -1, 'diff 5')
				u.assert(result[1].item === 4, 'diff 6')
				u.assert(result[1].added === true, 'diff 7')
				u.assert(result[1].oldIndex === -1, 'diff 8')
				u.assert(result[1].newIndex === 2, 'diff 9')
			})()

			; (function() {
				let testMap = new Map<number, string>()
				testMap.set(0, 'zero')
				testMap.set(7.5, 'seven and a half')
				testMap.set(undefined, 'not a number')
				testMap.set(Infinity, 'infinity')
				testMap.set(-Infinity, 'negative infinity')

				u.assert(testMap.getLength() === 5, 'Map 1')
				u.assert(testMap.get(0) === 'zero', 'Map 2')
				u.assert(testMap.get(7.5) === 'seven and a half', 'Map 3')
				u.assert(testMap.get(undefined) === 'not a number', 'Map 4')
				u.assert(testMap.get(Infinity) === 'infinity', 'Map 5')
				u.assert(testMap.get(-Infinity) === 'negative infinity', 'Map 6')

				testMap.set(0, 'nothing')

				u.assert(testMap.getLength() === 5, 'Map 7')
				u.assert(testMap.get(0) === 'nothing', 'Map 8')

				testMap.remove(7.5)

				u.assert(testMap.getLength() === 4, 'Map 9')
				u.assert(isUndefined(testMap.get(7.5)), 'Map 10')
				u.assert(testMap.get(undefined) === 'not a number', 'Map 11')

				testMap.setAll(new Map([1, 2, 3], ['one', 'two', 'three']))

				u.assert(testMap.getLength() === 7, 'Map 12')
				u.assert(testMap.get(1) === 'one', 'Map 13')
				u.assert(testMap.get(2) === 'two', 'Map 14')
				u.assert(testMap.get(3) === 'three', 'Map 15')

				testMap.removeAll()

				u.assert(testMap.getLength() === 0, 'Map 16')
			})()

			; (function() {
				let testMap = new Map<{}, string>()
				let key1 = { id: 1 }
				let key2 = { id: 2 }
				testMap.set(key1, 'key 1')
				testMap.set(null, 'null')
				testMap.set(undefined, 'undefined')
				testMap.set(key2, 'key 2')

				u.assert(testMap.getLength() === 4, 'Map 17')
				u.assert(testMap.get(key1) === 'key 1', 'Map 18')
				u.assert(isUndefined(testMap.get({ id: 1 })), 'Map 19')
				u.assert(testMap.get(key2) === 'key 2', 'Map 20')
				u.assert(testMap.get(null) === 'null', 'Map 21')
				u.assert(testMap.get(undefined) === 'undefined', 'Map 22')
			})()

			; (function() {
				let testObj = { 'a': <any>undefined, 'b': <any>null, 'c': '', 'd': 0, 'e': Infinity, 'f': NaN, 'g': false, 'h': {}, 'i': <any[]>[] }

				u.assert(getKeyOfValue(testObj, {}) === '', 'getKeyOfValue 1')
				u.assert(getKeyOfValue(testObj, undefined) === 'a', 'getKeyOfValue 2')
				u.assert(getKeyOfValue(testObj, null) === 'b', 'getKeyOfValue 3')
				u.assert(getKeyOfValue(testObj, '') === 'c', 'getKeyOfValue 4')
				u.assert(getKeyOfValue(testObj, 0) === 'd', 'getKeyOfValue 5')
				u.assert(getKeyOfValue(testObj, Infinity) === 'e', 'getKeyOfValue 6')
				u.assert(getKeyOfValue(testObj, NaN) === '', 'getKeyOfValue 7')
				u.assert(getKeyOfValue(testObj, false) === 'g', 'getKeyOfValue 8')
				u.assert(getKeyOfValue(testObj, testObj['h']) === 'h', 'getKeyOfValue 9')
				u.assert(getKeyOfValue(testObj, testObj['i']) === 'i', 'getKeyOfValue 10')
				u.assert(getKeyOfValue(testObj, []) === '', 'getKeyOfValue 11')

					; (<any>testObj)['j'] = testObj['i']
				let keysOfIArray = getKeysOfValue(testObj, testObj['i'])
				u.assert(keysOfIArray.length === 2, 'getKeysOfValue 1')
				u.assert(keysOfIArray[0] === 'i', 'getKeysOfValue 2')
				u.assert(keysOfIArray[1] === 'j', 'getKeysOfValue 3')
				let keysOfNaN = getKeysOfValue(testObj, NaN)
				u.assert(keysOfNaN.length === 0, 'getKeysOfValue 4')
				let keysOfFalse = getKeysOfValue(testObj, false)
				u.assert(keysOfFalse.length === 1, 'getKeysOfValue 5')
				u.assert(keysOfFalse[0] === 'g', 'getKeysOfValue 6')
			})()


			; (function() {
				let a = [
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
				]
				let markup = '<!DOCTYPE html>' +
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
					'</html>'
				//Log.log(arrkup(a))
				u.assert(arrkup(a) === markup, 'Arrkup 1')
			})()

		u.assert(isString(lipsum()), 'Lipsum 1')
		u.assert(isString(lipsum(new LipsumPresetDefault().setHighlight(.05, '<span>', '</span>'))), 'Lipsum 2')
		u.assert(isString(lipsum(new LipsumPresetLabel())), 'Lipsum 3')
		u.assert(isString(lipsum(new LipsumPresetName())), 'Lipsum 4')
		u.assert(isString(lipsum(new LipsumPresetTitle())), 'Lipsum 5')



		let throttleTest = function(this: Main, a: number, b: string, c: boolean): void {
			this.throttledResult = [a, b, c]
		}
		this.throttled = throttle(throttleTest, this, 30)
		this.throttled(1, 'a', true)
		u.assert(this.throttledResult[0] === 1 && this.throttledResult[1] === 'a' && this.throttledResult[2] === true, 'throttle 1')
		this.throttled(2, 'b', false)
		this.throttled(3, 'c', true)
		u.assert(this.throttledResult[0] === 1 && this.throttledResult[1] === 'a' && this.throttledResult[2] === true, 'throttle 2')



		let debounceTest = function(this: Main, a: number, b: string, c: boolean): void {
			this.debouncedResult = [a, b, c]
		}
		this.debounced = debounce(debounceTest, this, 30)
		this.debouncedResult = [1, 'a', true]
		this.debounced(2, 'b', false)
		u.assert(this.debouncedResult[0] === 1 && this.debouncedResult[1] === 'a' && this.debouncedResult[2] === true, 'debounce 1')



		this.ticker = new Ticker()
		this.ticker.addEventCallback(Ticker.EVENT_TICK, this.onTick1, this)
	}

	onTick1(e: IllaEvent): void {
		this.unitTest.assert(this.ticker.getTickCount() === 1, 'Ticker 1')
		this.ticker.removeEventCallback(Ticker.EVENT_TICK, this.onTick1, this)
		this.ticker.addEventCallback(Ticker.EVENT_TICK, this.onTick2, this)
		this.ticker.addEventCallback(Ticker.EVENT_TICK, this.onTick3, this)
	}

	onTick2(e: IllaEvent): void {
		this.unitTest.assert(this.ticker.getTickCount() === 2, 'Ticker 2')
	}

	onTick3(e: IllaEvent): void {
		this.unitTest.assert(this.ticker.getTickCount() === 2, 'Ticker 3')
		this.ticker.removeAllEventCallbacks()
		this.ticker.addEventCallback(Ticker.EVENT_TICK, this.onTick4, this)
		this.ticker.addEventCallback(Ticker.EVENT_TICK, this.onTick5, this)
	}

	onTick4(e: IllaEvent): void {
		this.unitTest.assert(this.ticker.getTickCount() === 3, 'Ticker 4')
		e.setStopImmediatePropagation(true)
		this.ticker.removeEventCallback(Ticker.EVENT_TICK, this.onTick4, this)
	}

	onTick5(e: IllaEvent): void {
		this.unitTest.assert(this.ticker.getTickCount() === 4, 'Ticker 5')
		this.ticker.setIsStarted(false)
		setTimeout(bind(this.onTickerFinished, this), 500)
	}

	onTickerFinished(): void {
		this.unitTest.assert(this.ticker.getTickCount() === 4, 'Ticker 6')

		this.unitTest.assert(this.throttledResult[0] === 3 && this.throttledResult[1] === 'c' && this.throttledResult[2] === true, 'throttle 3')
		this.throttled(4, 'd', false)
		this.unitTest.assert(this.throttledResult[0] === 4 && this.throttledResult[1] === 'd' && this.throttledResult[2] === false, 'throttle 4')
		this.throttled(5, 'e', true)
		this.unitTest.assert(this.throttledResult[0] === 4 && this.throttledResult[1] === 'd' && this.throttledResult[2] === false, 'throttle 5')
		this.throttled.cancel()

		setTimeout(bind(this.onThrottleFinished, this), 100)
	}

	onThrottleFinished(): void {
		this.unitTest.assert(this.throttledResult[0] === 4 && this.throttledResult[1] === 'd' && this.throttledResult[2] === false, 'throttle 6')
		this.unitTest.assert(this.debouncedResult[0] === 2 && this.debouncedResult[1] === 'b' && this.debouncedResult[2] === false, 'debounce 2')
		this.unitTest.printStats()
	}
}