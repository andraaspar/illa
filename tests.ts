import { diff, find, findIndex, range, removeAll, removeFirst, stringArrayToBooleanSet } from './ArrayUtil';
import { arrkup } from './Arrkup';
import { enumValues } from './EnumUtil';
import { bind, debounce, get, getIf, getIfIn, getIfNot, throttle } from './FunctionUtil';
import { GLOBAL } from './GLOBAL';
import { IEventCallback } from './IEventCallback';
import { jsonFromUri, jsonObjectsEqual, jsonToUri } from './JsonUtil';
import { lipsum } from './Lipsum';
import { LipsumPresetDefault } from './LipsumPresetDefault';
import { LipsumPresetLabel } from './LipsumPresetLabel';
import { LipsumPresetName } from './LipsumPresetName';
import { LipsumPresetTitle } from './LipsumPresetTitle';
import { Map } from './Map';
import { classes, extendAttrs } from './MithrilUtil';
import { numberToStringNoLetters } from './NumberUtil';
import { assign, findObject, getKeyOfValue, getKeysOfValue } from './ObjectUtil';
import { escapeHtml, escapeRegExp, hash, optionalString, parseQuery, trim, uuid } from './StringUtil';
import { Ticker } from './Ticker';
import { ifInstanceOf, isArray, isBoolean, isFunction, isNull, isNumber, isObjectNotNull, isString, isUndefined, isUndefinedOrNull } from './Type';


class Parent { }
class Child extends Parent { }
class ArrayChild extends Array { }

describe(`Type`, () => {
	describe(`isString`, () => {
		it(`Recognizes string primitives.`, () => {
			expect(isString(``)).toBe(true)
		})
		it(`Recognizes non string primitives.`, () => {
			expect(isString(new String())).toBe(false)
			expect(isString(true)).toBe(false)
			expect(isString(0)).toBe(false)
			expect(isString(NaN)).toBe(false)
			expect(isString(Infinity)).toBe(false)
			expect(isString(-Infinity)).toBe(false)
			expect(isString(undefined)).toBe(false)
			expect(isString(null)).toBe(false)
			expect(isString([])).toBe(false)
			expect(isString({})).toBe(false)
			expect(isString(() => { })).toBe(false)
		})
	})
	describe(`isBoolean`, () => {
		it(`Recognizes boolean primitives.`, () => {
			expect(isBoolean(true)).toBe(true)
			expect(isBoolean(false)).toBe(true)
		})
		it(`Recognizes non boolean primitives.`, () => {
			expect(isBoolean(new Boolean())).toBe(false)
			expect(isBoolean('')).toBe(false)
			expect(isBoolean(0)).toBe(false)
			expect(isBoolean(NaN)).toBe(false)
			expect(isBoolean(Infinity)).toBe(false)
			expect(isBoolean(-Infinity)).toBe(false)
			expect(isBoolean(undefined)).toBe(false)
			expect(isBoolean(null)).toBe(false)
			expect(isBoolean([])).toBe(false)
			expect(isBoolean({})).toBe(false)
			expect(isBoolean(() => { })).toBe(false)
		})
	})
	describe(`isNumber`, () => {
		it(`Recognizes number primitives.`, () => {
			expect(isNumber(0)).toBe(true)
			expect(isNumber(NaN)).toBe(true)
			expect(isNumber(Infinity)).toBe(true)
			expect(isNumber(-Infinity)).toBe(true)
		})
		it(`Recognizes non number primitives.`, () => {
			expect(isNumber(new Number())).toBe(false)
			expect(isNumber('')).toBe(false)
			expect(isNumber(true)).toBe(false)
			expect(isNumber(undefined)).toBe(false)
			expect(isNumber(null)).toBe(false)
			expect(isNumber([])).toBe(false)
			expect(isNumber({})).toBe(false)
			expect(isNumber(() => { })).toBe(false)
		})
	})
	describe(`isArray`, () => {
		it(`Recognizes arrays.`, () => {
			expect(isArray([])).toBe(true)
			expect(isArray(new Array())).toBe(true)
			expect(isArray(new ArrayChild())).toBe(true)
		})
		it(`Recognizes non arrays.`, () => {
			expect(isArray('')).toBe(false)
			expect(isArray(0)).toBe(false)
			expect(isArray(NaN)).toBe(false)
			expect(isArray(Infinity)).toBe(false)
			expect(isArray(-Infinity)).toBe(false)
			expect(isArray(true)).toBe(false)
			expect(isArray(undefined)).toBe(false)
			expect(isArray(null)).toBe(false)
			expect(isArray({})).toBe(false)
			expect(isArray(() => { })).toBe(false)
		})
	})
	describe(`isFunction`, () => {
		it(`Recognizes functions.`, () => {
			expect(isFunction(() => { })).toBe(true)
		})
		it(`Recognizes non functions.`, () => {
			expect(isFunction('')).toBe(false)
			expect(isFunction(0)).toBe(false)
			expect(isFunction(NaN)).toBe(false)
			expect(isFunction(Infinity)).toBe(false)
			expect(isFunction(-Infinity)).toBe(false)
			expect(isFunction(true)).toBe(false)
			expect(isFunction(undefined)).toBe(false)
			expect(isFunction(null)).toBe(false)
			expect(isFunction([])).toBe(false)
			expect(isFunction({})).toBe(false)
		})
	})
	describe(`isNull`, () => {
		it(`Recognizes null.`, () => {
			expect(isNull(null)).toBe(true)
		})
		it(`Recognizes non null.`, () => {
			expect(isNull('')).toBe(false)
			expect(isNull(0)).toBe(false)
			expect(isNull(NaN)).toBe(false)
			expect(isNull(Infinity)).toBe(false)
			expect(isNull(-Infinity)).toBe(false)
			expect(isNull(true)).toBe(false)
			expect(isNull(undefined)).toBe(false)
			expect(isNull([])).toBe(false)
			expect(isNull({})).toBe(false)
			expect(isNull(() => { })).toBe(false)
		})
	})
	describe(`isUndefined`, () => {
		it(`Recognizes undefined.`, () => {
			expect(isUndefined(undefined)).toBe(true)
		})
		it(`Recognizes non undefined.`, () => {
			expect(isUndefined('')).toBe(false)
			expect(isUndefined(0)).toBe(false)
			expect(isUndefined(NaN)).toBe(false)
			expect(isUndefined(Infinity)).toBe(false)
			expect(isUndefined(-Infinity)).toBe(false)
			expect(isUndefined(true)).toBe(false)
			expect(isUndefined(null)).toBe(false)
			expect(isUndefined([])).toBe(false)
			expect(isUndefined({})).toBe(false)
			expect(isUndefined(() => { })).toBe(false)
		})
	})
	describe(`isUndefinedOrNull`, () => {
		it(`Recognizes undefined and null.`, () => {
			expect(isUndefinedOrNull(undefined)).toBe(true)
			expect(isUndefinedOrNull(null)).toBe(true)
		})
		it(`Recognizes non undefined or null.`, () => {
			expect(isUndefinedOrNull('')).toBe(false)
			expect(isUndefinedOrNull(0)).toBe(false)
			expect(isUndefinedOrNull(NaN)).toBe(false)
			expect(isUndefinedOrNull(Infinity)).toBe(false)
			expect(isUndefinedOrNull(-Infinity)).toBe(false)
			expect(isUndefinedOrNull(true)).toBe(false)
			expect(isUndefinedOrNull([])).toBe(false)
			expect(isUndefinedOrNull({})).toBe(false)
			expect(isUndefinedOrNull(() => { })).toBe(false)
		})
	})
	describe(`isObjectNotNull`, () => {
		it(`Recognizes objects & functions.`, () => {
			expect(isObjectNotNull({})).toBe(true)
			expect(isObjectNotNull([])).toBe(true)
			expect(isObjectNotNull(() => { })).toBe(true)
		})
		it(`Recognizes non objects & null.`, () => {
			expect(isObjectNotNull('')).toBe(false)
			expect(isObjectNotNull(0)).toBe(false)
			expect(isObjectNotNull(NaN)).toBe(false)
			expect(isObjectNotNull(Infinity)).toBe(false)
			expect(isObjectNotNull(-Infinity)).toBe(false)
			expect(isObjectNotNull(undefined)).toBe(false)
			expect(isObjectNotNull(null)).toBe(false)
			expect(isObjectNotNull(true)).toBe(false)
		})
	})
	describe(`ifInstanceOf`, () => {
		it(`Works with the same class.`, () => {
			let o = new Child()
			expect(ifInstanceOf(Child, o)).toBe(o)
		})
		it(`Works with the parent class.`, () => {
			let o = new Child()
			expect(ifInstanceOf(Parent, o)).toBe(o)
		})
		it(`Returns null for unrelated class.`, () => {
			expect(ifInstanceOf(Child, new Parent())).toBe(null)
		})
		it(`Throws on null as class.`, () => {
			expect(() => ifInstanceOf(null!, new Parent())).toThrow()
		})
		it(`Tolerates null as instance.`, () => {
			expect(ifInstanceOf(Parent, null)).toBe(null)
		})
	})
})
describe(`FunctionUtil`, () => {
	describe(`bind`, () => {
		it(`Binds this.`, () => {
			let f = function(this: { prefix: string }, suffix: string): string {
				return this.prefix + suffix
			}
			let fun = bind(f, { prefix: 'foo' })
			expect(fun('bar')).toBe('foobar')
		})
		it(`Binds params.`, () => {
			let f = function(this: { c: string }, a: string, b: string) {
				return a + b + this.c
			}
			let fun = bind(f, { c: 'baz' }, 'foo')
			expect(fun('bar')).toBe('foobarbaz')
		})
		it(`Throws on missing function.`, () => {
			expect(() => bind(null!, {})).toThrow()
		})
	})
	describe(`throttle`, () => {
		it(`Throttles.`, (done) => {
			let callCount = 0
			let f = () => ++callCount
			let fun = throttle(f, null, 100)
			fun()
			setTimeout(fun, 10)
			setTimeout(fun, 20)
			setTimeout(fun, 30)
			setTimeout(fun, 40)
			setTimeout(fun, 50)
			setTimeout(() => {
				expect(callCount).toBe(2)
				done()
			}, 200)
		})
		it(`Can be cancelled.`, (done) => {
			let callCount = 0
			let result: number[] = []
			let f = () => ++callCount
			let fun = throttle(f, null, 100)
			fun()
				.onSuccess((q) => { result.push(q.data.value!) })
			setTimeout(() => {
				fun()
					.onSuccess((q) => { result.push(q.data.value!) })
			}, 10)
			setTimeout(() => {
				fun.cancel()
			}, 20)
			setTimeout(() => {
				expect(callCount).toBe(1)
				expect(result).toEqual([1])
				done()
			}, 200)
		})
		it(`Can be forced.`, (done) => {
			let callCount = 0
			let result: number[] = []
			let f = () => ++callCount
			let fun = throttle(f, null, 100)
			fun()
				.onSuccess((q) => { result.push(q.data.value!) })
			setTimeout(() => {
				fun()
					.onSuccess((q) => { result.push(q.data.value!) })
			}, 10)
			setTimeout(() => {
				expect(fun.callNow()).toBe(2)
			}, 20)
			setTimeout(() => {
				fun()
					.onSuccess((q) => { result.push(q.data.value!) })
			}, 30)
			setTimeout(() => {
				fun()
					.onSuccess((q) => { result.push(q.data.value!) })
			}, 40)
			setTimeout(() => {
				expect(callCount).toBe(3)
				expect(result).toEqual([1, 3])
				done()
			}, 200)
		})
		it(`Can be fed args.`, (done) => {
			let result: string[] = []
			let f = (a: string, b: number, c: boolean) => a + b + c
			let fun = throttle(f, null, 100)
			fun('a', 0, false)
				.onSuccess((q) => { result.push(q.data.value!) })
			setTimeout(() => {
				fun('b', 1, true)
					.onSuccess((q) => { result.push(q.data.value!) })
			}, 10)
			setTimeout(() => {
				expect(fun.callNow('c', 2, false)).toBe('c2false')
			}, 20)
			setTimeout(() => {
				expect(result).toEqual(['a0false'])
				done()
			}, 100)
		})
		it(`Can be scheduled.`, (done) => {
			let callCount = 0
			let result: boolean[] = []
			let f = () => ++callCount
			let fun = throttle(f, null, 50)
			expect(fun.isScheduled()).toBe(false)
			fun() // 1
			expect(fun.isScheduled()).toBe(false)
			fun()
			expect(fun.isScheduled()).toBe(true)
			setTimeout(() => {
				result.push(fun.isScheduled()) // true
			}, 10)
			setTimeout(() => {
				result.push(fun.isScheduled()) // true
				fun.callNow() // 2
				result.push(fun.isScheduled()) // false
				fun() // 3
				result.push(fun.isScheduled()) // true
			}, 20)
			setTimeout(() => {
				result.push(fun.isScheduled()) // true
			}, 30)
			setTimeout(() => {
				expect(fun.isScheduled()).toBe(false)
				expect(callCount).toBe(3)
				expect(result).toEqual([true, true, false, true, true])
				done()
			}, 100)
		})
	})
	describe(`debounce`, () => {
		it(`Debounces.`, (done) => {
			let callCount = 0
			let f = () => ++callCount
			let fun = debounce(f, null, 100)
			fun()
			setTimeout(fun, 10)
			setTimeout(fun, 20)
			setTimeout(fun, 30)
			setTimeout(fun, 40)
			setTimeout(fun, 50)
			setTimeout(() => {
				expect(callCount).toBe(1)
				done()
			}, 200)
		})
		it(`Can be cancelled.`, (done) => {
			let callCount = 0
			let result: number[] = []
			let f = () => ++callCount
			let fun = debounce(f, null, 100)
			fun()
				.onSuccess((q) => { result.push(q.data.value!) })
			setTimeout(() => {
				fun()
					.onSuccess((q) => { result.push(q.data.value!) })
			}, 10)
			setTimeout(() => {
				fun.cancel()
			}, 20)
			setTimeout(() => {
				expect(callCount).toBe(0)
				expect(result).toEqual([])
				done()
			}, 200)
		})
		it(`Can be forced.`, (done) => {
			let callCount = 0
			let result: number[] = []
			let f = () => ++callCount
			let fun = debounce(f, null, 100)
			fun()
				.onSuccess((q) => { result.push(q.data.value!) })
			setTimeout(() => {
				fun()
					.onSuccess((q) => { result.push(q.data.value!) })
			}, 10)
			setTimeout(() => {
				expect(fun.callNow()).toBe(1)
			}, 20)
			setTimeout(() => {
				fun()
					.onSuccess((q) => { result.push(q.data.value!) })
			}, 30)
			setTimeout(() => {
				fun()
					.onSuccess((q) => { result.push(q.data.value!) })
			}, 40)
			setTimeout(() => {
				expect(callCount).toBe(2)
				expect(result).toEqual([2])
				done()
			}, 200)
		})
		it(`Can be fed args.`, (done) => {
			let result: string[] = []
			let f = (a: string, b: number, c: boolean) => a + b + c
			let fun = debounce(f, null, 100)
			fun('a', 0, false)
				.onSuccess((q) => { result.push(q.data.value!) })
			setTimeout(() => {
				fun('b', 1, true)
					.onSuccess((q) => { result.push(q.data.value!) })
			}, 10)
			setTimeout(() => {
				expect(fun.callNow('c', 2, false)).toBe('c2false')
			}, 20)
			setTimeout(() => {
				expect(result).toEqual([])
				done()
			}, 100)
		})
		it(`Can be scheduled.`, (done) => {
			let callCount = 0
			let result: boolean[] = []
			let f = () => ++callCount
			let fun = debounce(f, null, 50)
			expect(fun.isScheduled()).toBe(false)
			fun()
			expect(fun.isScheduled()).toBe(true)
			setTimeout(() => {
				result.push(fun.isScheduled()) // true
			}, 10)
			setTimeout(() => {
				result.push(fun.isScheduled()) // true
				fun.callNow() // 1
				result.push(fun.isScheduled()) // false
				fun() // 2
				result.push(fun.isScheduled()) // true
			}, 20)
			setTimeout(() => {
				result.push(fun.isScheduled()) // true
			}, 30)
			setTimeout(() => {
				expect(fun.isScheduled()).toBe(false)
				expect(callCount).toBe(2)
				expect(result).toEqual([true, true, false, true, true])
				done()
			}, 100)
		})
	})
	describe('get', () => {
		it(`Gets a value.`, () => {
			let o = { a: { b: undefined! as { c: boolean }, d: true } }
			expect(get(() => o.a.b.c)).toBe(undefined!)
			expect(get(() => o.a.b.c, true)).toBe(true)
			expect(get(() => o.a.d)).toBe(true)
		})
	})
	describe('getIfNot', () => {
		it(`Works with isNaN.`, () => {
			expect(getIfNot(isNaN, NaN, 42)).toBe(42)
			expect(getIfNot(isNaN, undefined, 42)).toBe(42)
			expect(getIfNot(isNaN, null, 42)).toBe(null)
			expect(getIfNot<boolean | number>(isNaN, false, 42)).toBe(false)
			expect(getIfNot<string | number>(isNaN, '', 42)).toBe('')
			expect(getIfNot(isNaN, {} as any, 42)).toBe(42)
			expect(getIfNot(isNaN, () => NaN, () => 42)).toBe(42)
		})
		it(`Works with isFinite.`, () => {
			expect(getIfNot(isFinite, Infinity, 42)).toBe(Infinity)
		})
	})
	describe('getIf', () => {
		it(`Works with isNaN.`, () => {
			expect(getIf(isNaN, NaN, 42)).toBeNaN()
			expect(getIf(isNaN, undefined, 42)).toBe(undefined)
			expect(getIf(isNaN, null, 42)).toBe(42)
			expect(getIf<boolean | number>(isNaN, false, 42)).toBe(42)
			expect(getIf<string | number>(isNaN, '', 42)).toBe(42)
			expect(getIf(isNaN, {} as any, 42)).toEqual({})
			expect(getIf(isNaN, () => NaN, () => 42)).toBeNaN()
		})
		it(`Works with isFinite.`, () => {
			expect(getIf(isFinite, Infinity, 42)).toBe(42)
		})
	})
	describe('getIfIn', () => {
		it(`Gets a value.`, () => {
			expect(getIfIn({a: true}, 'a')).toBe(true)
		})
		it(`If not found, gets undefined.`, () => {
			expect(getIfIn({} as {a: boolean}, 'a')).toBeUndefined()
		})
		it(`If not found, gets fallback value.`, () => {
			expect(getIfIn({} as {a: boolean}, 'a', true)).toBe(true)
		})
		it(`If not found, calls fallback function.`, () => {
			expect(getIfIn({} as {a: boolean}, 'a', () => true)).toBe(true)
		})
	})
})
describe(`GLOBAL`, () => {
	it(`Is the global object.`, () => {
		expect(isFunction(GLOBAL.isNaN)).toBe(true)
	})
})
describe(`StringUtil`, () => {
	describe(`uuid`, () => {
		it(`Is a UUID.`, () => {
			expect(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.test(uuid())).toBe(true)
		})
	})
	describe(`escapeHtml`, () => {
		it(`Escapes HTML.`, () => {
			expect(escapeHtml('<h1>"T&amp;C\'s"</h1>')).toBe('&lt;h1&gt;&quot;T&amp;amp;C&#39;s&quot;&lt;/h1&gt;')
		})
	})
	describe(`escapeRegExp`, () => {
		it(`Escapes RegExp.`, () => {
			expect(escapeRegExp('^[a-z]*?[0-9]{1,3}\\d$')).toBe('\\^\\[a\\-z\\]\\*\\?\\[0\\-9\\]\\{1,3\\}\\\\d\\$')
		})
	})
	describe(`optionalString`, () => {
		it(`Returns a string for strings.`, () => {
			expect(optionalString('foo')).toBe('foo')
			expect(optionalString({ toString: function() { return 'Nice.' } })).toBe('Nice.')
		})
		it(`Returns an empty string for undefined or null.`, () => {
			expect(optionalString(undefined)).toBe('')
			expect(optionalString(null)).toBe('')
		})
	})
	describe(`trim`, () => {
		it(`Trims whitespace.`, () => {
			expect(trim('  foo   ')).toBe('foo')
			expect(trim('\t\r\nfoo\r\n\t')).toBe('foo')
		})
	})
	describe(`hash`, () => {
		it(`Generates unique hashes for strings.`, () => {
			expect(hash('a8a4b21f-2051-3cbe-44e4-ffb21749c298')).not.toBe(hash('a8a4b21f-2051-3cbe-44e4-ffb21749c299'))
		})
	})
	describe(`parseQuery`, () => {
		it(`Parses query strings to object.`, () => {
			let obj = parseQuery('foo=1&bar=2+2&baz=&quux')
			expect(obj.foo).toBe('1')
			expect(obj.bar).toBe('2 2')
			expect(obj.baz).toBe('')
			expect(obj.quux).toBe('')
		})
		it(`Can convert multiple keys into arrays.`, () => {
			let obj = parseQuery('foo=1&foo=2&foo=3', true)
			expect(obj.foo.length).toBe(3)
			expect(obj.foo[0]).toBe('1')
			expect(obj.foo[1]).toBe('2')
			expect(obj.foo[2]).toBe('3')
		})
	})
})
describe(`NumberUtil`, () => {
	describe(`numberToStringNoLetters`, () => {
		it(`Converts regular numbers as expected.`, () => {
			expect(numberToStringNoLetters(0)).toBe('0')
			expect(numberToStringNoLetters(1234.5678)).toBe('1234.5678')
			expect(numberToStringNoLetters(-1234.5678)).toBe('-1234.5678')
		})
		it(`Converts special numbers to empty string.`, () => {
			expect(numberToStringNoLetters(NaN)).toBe('')
			expect(numberToStringNoLetters(Infinity)).toBe('')
			expect(numberToStringNoLetters(-Infinity)).toBe('')
		})
		it(`Converts huge numbers as expected.`, () => {
			expect(numberToStringNoLetters(1e21)).toBe('1000000000000000000000')
		})
		it(`Converts tiny numbers as expected.`, () => {
			expect(numberToStringNoLetters(1e-7)).toBe('0.00000009999999999999999')
		})
		it(`Converts null to empty string.`, () => {
			expect(numberToStringNoLetters(null as any)).toBe('')
		})
		it(`Converts undefined to empty string.`, () => {
			expect(numberToStringNoLetters(undefined as any)).toBe('')
		})
	})
})
describe(`ArrayUtil`, () => {
	describe(`removeFirst`, () => {
		it(`Removes the first instance.`, () => {
			let testArr = ['foo', 'bar', 'baz', 'foo']
			expect(removeFirst(testArr, 'foo')).toBe(true)
			expect(testArr.length).toBe(3)
			expect(testArr[0]).toBe('bar')
			expect(testArr[1]).toBe('baz')
			expect(testArr[2]).toBe('foo')
		})
		it(`Does not remove when not present.`, () => {
			let testArr = ['foo', 'bar', 'baz', 'foo']
			expect(removeFirst(testArr, 'quux')).toBe(false)
			expect(testArr.length).toBe(4)
		})
	})
	describe(`removeFirst`, () => {
		it(`Removes all instances.`, () => {
			let testArr = ['foo', 'bar', 'baz', 'foo']
			expect(removeAll(testArr, 'foo')).toBe(true)
			expect(testArr.length).toBe(2)
			expect(testArr[0]).toBe('bar')
			expect(testArr[1]).toBe('baz')
		})
	})
	describe(`diff`, () => {
		it(`Diffs arrays.`, () => {
			let oldArr = [1, 2, 3]
			let newArr = [1, 3, 4]
			let result = diff(oldArr, newArr)
			expect(result.length).toBe(2)
			expect(result[0].item).toBe(2)
			expect(result[0].added).toBe(false)
			expect(result[0].oldIndex).toBe(1)
			expect(result[0].newIndex).toBe(-1)
			expect(result[1].item).toBe(4)
			expect(result[1].added).toBe(true)
			expect(result[1].oldIndex).toBe(-1)
			expect(result[1].newIndex).toBe(2)
		})
	})
	describe(`range`, () => {
		it(`Works with single argument.`, () => {
			expect(range(3)).toEqual([0, 1, 2])
			expect(range(-3)).toEqual([0, -1, -2])
		})
		it(`Works with two arguments.`, () => {
			expect(range(5, 7)).toEqual([5, 6])
			expect(range(-1, 2)).toEqual([-1, 0, 1])
			expect(range(10, 7)).toEqual([10, 9, 8])
		})
		it(`Throws with invalid arguments.`, () => {
			expect(() => range(NaN)).toThrow()
			expect(() => range(Infinity)).toThrow()
			expect(() => range(3, Infinity)).toThrow()
		})
	})
	describe(`find`, () => {
		it(`Finds the first matching item.`, () => {
			expect(find([0, 1, 2], _ => _ > 0)).toEqual(1)
		})
		it(`Returns undefined if nothing matches.`, () => {
			expect(find([0, 1, 2], _ => _ > 2)).toBeUndefined()
		})
	})
	describe(`findIndex`, () => {
		it(`Finds the first matching item.`, () => {
			expect(findIndex(['a', 'b', 'b'], _ => _ == 'b')).toEqual(1)
		})
		it(`Returns -1 if nothing matches.`, () => {
			expect(findIndex(['a', 'b', 'b'], _ => _ == 'c')).toEqual(-1)
		})
	})
	describe(`stringArrayToBooleanSet`, () => {
		it(`Works with an empty array.`, () => {
			expect(stringArrayToBooleanSet([])).toEqual({})
		})
		it(`Works with a regular string array.`, () => {
			expect(stringArrayToBooleanSet(['a', 'b', 'c'])).toEqual({
				a: true,
				b: true,
				c: true,
			})
		})
		it(`Does not throw on undefined.`, () => {
			expect(stringArrayToBooleanSet(undefined as any)).toEqual({})
		})
		it(`Omits undefined or null items.`, () => {
			expect(stringArrayToBooleanSet(['a', undefined as any, null as any, 'c'])).toEqual({
				a: true,
				c: true,
			})
		})
	})
})
describe(`Map`, () => {
	it(`Works.`, () => {
		let testMap = new Map<number | undefined, string>()
		testMap.set(0, 'zero')
		testMap.set(7.5, 'seven and a half')
		testMap.set(undefined, 'not a number')
		testMap.set(Infinity, 'infinity')
		testMap.set(-Infinity, 'negative infinity')

		expect(testMap.getLength()).toBe(5)
		expect(testMap.get(0)).toBe('zero')
		expect(testMap.get(7.5)).toBe('seven and a half')
		expect(testMap.get(undefined)).toBe('not a number')
		expect(testMap.get(Infinity)).toBe('infinity')
		expect(testMap.get(-Infinity)).toBe('negative infinity')

		testMap.set(0, 'nothing')

		expect(testMap.getLength()).toBe(5)
		expect(testMap.get(0)).toBe('nothing')

		testMap.remove(7.5)

		expect(testMap.getLength()).toBe(4)
		expect(isUndefined(testMap.get(7.5))).toBe(true)
		expect(testMap.get(undefined)).toBe('not a number')

		testMap.setAll(new Map([1, 2, 3], ['one', 'two', 'three']))

		expect(testMap.getLength()).toBe(7)
		expect(testMap.get(1)).toBe('one')
		expect(testMap.get(2)).toBe('two')
		expect(testMap.get(3)).toBe('three')

		testMap.removeAll()

		expect(testMap.getLength()).toBe(0)
	})
	it(`Accepts objects as keys.`, () => {
		let testMap = new Map<{} | undefined | null, string>()
		let key1 = { id: 1 }
		let key2 = { id: 2 }
		testMap.set(key1, 'key 1')
		testMap.set(null, 'null')
		testMap.set(undefined, 'undefined')
		testMap.set(key2, 'key 2')

		expect(testMap.getLength()).toBe(4)
		expect(testMap.get(key1)).toBe('key 1')
		expect(isUndefined(testMap.get({ id: 1 }))).toBe(true)
		expect(testMap.get(key2)).toBe('key 2')
		expect(testMap.get(null)).toBe('null')
		expect(testMap.get(undefined)).toBe('undefined')
	})
})
describe('ObjectUtil', () => {
	describe('getKeyOfValue', () => {
		it('Works.', () => {
			let testObj = { 'a': <any>undefined, 'b': <any>null, 'c': '', 'd': 0, 'e': Infinity, 'f': NaN, 'g': false, 'h': {}, 'i': <any[]>[] }

			expect(getKeyOfValue(testObj, {})).toBe('')
			expect(getKeyOfValue(testObj, undefined)).toBe('a')
			expect(getKeyOfValue(testObj, null)).toBe('b')
			expect(getKeyOfValue(testObj, '')).toBe('c')
			expect(getKeyOfValue(testObj, 0)).toBe('d')
			expect(getKeyOfValue(testObj, Infinity)).toBe('e')
			expect(getKeyOfValue(testObj, NaN)).toBe('')
			expect(getKeyOfValue(testObj, false)).toBe('g')
			expect(getKeyOfValue(testObj, testObj['h'])).toBe('h')
			expect(getKeyOfValue(testObj, testObj['i'])).toBe('i')
			expect(getKeyOfValue(testObj, [])).toBe('');
		})
	})
	describe('getKeysOfValue', () => {
		it('Works.', () => {
			let testObj = { 'a': <any>undefined, 'b': <any>null, 'c': '', 'd': 0, 'e': Infinity, 'f': NaN, 'g': false, 'h': {}, 'i': <any[]>[], 'j': <any[]>undefined! }
			testObj['j'] = testObj['i']

			let keysOfIArray = getKeysOfValue(testObj, testObj['i'])
			expect(keysOfIArray.length).toBe(2)
			expect(keysOfIArray[0]).toBe('i')
			expect(keysOfIArray[1]).toBe('j')
			let keysOfNaN = getKeysOfValue(testObj, NaN)
			expect(keysOfNaN.length).toBe(0)
			let keysOfFalse = getKeysOfValue(testObj, false)
			expect(keysOfFalse.length).toBe(1)
			expect(keysOfFalse[0]).toBe('g')
		})
	})
	describe('assign', () => {
		it('Works.', () => {
			let a = { foo: '' }
			let b = { bar: 0 }
			let c = { baz: true }
			let result = assign(a, b, c)

			expect(result.foo).toBe('')
			expect(result.bar).toBe(0)
			expect(result.baz).toBe(true)
		})
		it('Works with a single param.', () => {
			let a = { foo: '' }
			let result: typeof a = assign(a, undefined)

			expect(result.foo).toBe('')
		})
		it('Lets the last override the first.', () => {
			let a = { foo: 0 }
			let b = { foo: 1 }
			let c = { foo: 2 }
			let result = assign(a, b, c)

			expect(result.foo).toBe(2)
		})
	})
	describe('findInObject', () => {
		it('Finds the object itself.', () => {
			let o = { found: true }
			let result = findObject<{ found: boolean }>(o, _ => _.found === true)
			expect(result).toEqual([
				{ found: true },
			])
		})
		it('Finds objects in an array.', () => {
			let o: any[] = [
				{ found: true },
				undefined,
				null,
				NaN,
				Infinity,
				-Infinity,
				false,
				'',
				0,
				{ found: true },
			]
			let result = findObject<{ found: boolean }>(o, _ => _.found === true)
			expect(result).toEqual([
				{ found: true },
				{ found: true },
			])
		})
		it('Finds nested objects.', () => {
			let o = {
				found: true,
				k0: { found: true },
				k1: undefined,
				k2: null,
				k3: NaN,
				k4: Infinity,
				k5: -Infinity,
				k6: false,
				k7: '',
				k8: 0,
				k9: {
					found: true,
					k0: { found: true },
				},
				ka: [
					0,
					{
						found: true,
						k0: { found: true },
					},
				],
			}
			let result = findObject<{ found: boolean }>(o, _ => _.found === true)
			// console.log(JSON.stringify(result, undefined, 2))
			expect(result[0]).toBe(o)
			expect(result[1]).toBe(o.k0)
			expect(result[2]).toBe(o.k9)
			expect(result[3]).toBe(o.k9.k0)
			expect(result[4]).toBe(o.ka[1] as any)
			expect(result[5]).toBe((o.ka[1] as any).k0)
			expect(result.length).toBe(6)
		})
		it('Handles recursive references.', () => {
			let o = {
				k0: { found: true },
				k1: undefined as any,
			}
			o.k1 = o
			let result = findObject<{ found: boolean }>(o, _ => _.found === true)
			expect(result).toEqual([
				{ found: true },
			])
		})
		it('Finds parents.', () => {
			let o = {
				found: true,
				k0: { found: true },
				k1: undefined,
				k2: null,
				k3: NaN,
				k4: Infinity,
				k5: -Infinity,
				k6: false,
				k7: '',
				k8: 0,
				k9: {
					found: true,
					k0: { found: true },
				},
				ka: [
					0,
					{
						found: true,
						k0: { found: true },
					},
				],
			}
			let result = findObject<{ found: boolean }>(o, _ => _.found === true, { parents: true })
			// console.log(JSON.stringify(result, undefined, 2))
			expect(result[0].match).toBe(o)
			expect(result[0].parents).toEqual([])
			expect(result[1].match).toBe(o.k0)
			expect(result[1].parents).toEqual([{ parent: o, key: 'k0' }])
			expect(result[2].match).toBe(o.k9)
			expect(result[2].parents).toEqual([{ parent: o, key: 'k9' }])
			expect(result[3].match).toBe(o.k9.k0)
			expect(result[3].parents).toEqual([{ parent: o.k9, key: 'k0' }, { parent: o, key: 'k9' }])
			expect(result[4].match).toBe(o.ka[1] as any)
			expect(result[4].parents).toEqual([{ parent: o.ka, key: 1 }, { parent: o, key: 'ka' }])
			expect(result[5].match).toBe((o.ka[1] as any).k0)
			expect(result[5].parents).toEqual([{ parent: o.ka[1], key: 'k0' }, { parent: o.ka, key: 1 }, { parent: o, key: 'ka' }])
			expect(result.length).toBe(6)
		})
		it('Can stop on match.', () => {
			let o = {
				k0: {
					found: true,
					k1: { found: true },
				},
			}
			let result = findObject<{ found: boolean }>(o, _ => _.found === true, {
				stopOnMatch: true,
			})
			expect(result[0]).toBe(o.k0)
			expect(result.length).toBe(1)
		})
		it('Can stop on test.', () => {
			let o = {
				k0: {
					found: true,
					k1: { found: true },
				},
			}
			let result = findObject<{ found: boolean }>(o, _ => _.found === true, {
				parents: true,
				stopOn: (o, parents) => parents[0] && parents[0].key === 'k0',
			})
			expect(result[0].match).toBe(o.k0)
			expect(result.length).toBe(1)
		})
	})
})
describe('Arrkup', () => {
	describe('arrkup', () => {
		it('Works.', () => {
			expect(arrkup([
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
			])).toBe(
				'<!DOCTYPE html>' +
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
				)
		})
	})
})
describe('Lipsum', () => {
	describe('lipsum', () => {
		it('Works.', () => {
			expect(isString(lipsum())).toBe(true)
			expect(isString(lipsum(new LipsumPresetDefault().setHighlight(.05, '<span>', '</span>')))).toBe(true)
			expect(isString(lipsum(new LipsumPresetLabel()))).toBe(true)
			expect(isString(lipsum(new LipsumPresetName()))).toBe(true)
			expect(isString(lipsum(new LipsumPresetTitle()))).toBe(true)
		})
	})
})
describe('Ticker & EventHandler', () => {
	it('Works.', (done) => {
		let ticker = new Ticker()
		let callback1: IEventCallback
		let callback2: IEventCallback
		ticker.addEventCallback(Ticker.EVENT_TICK, callback1 = () => {
			expect(ticker.getTickCount()).toBe(1)
			ticker.removeEventCallback(Ticker.EVENT_TICK, callback1)
			ticker.addEventCallback(Ticker.EVENT_TICK, () => {
				expect(ticker.getTickCount()).toBe(2)
			})
			ticker.addEventCallback(Ticker.EVENT_TICK, () => {
				expect(ticker.getTickCount()).toBe(2)
				ticker.removeAllEventCallbacks()
				ticker.addEventCallback(Ticker.EVENT_TICK, callback2 = (e) => {
					expect(ticker.getTickCount()).toBe(3)
					e.setStopImmediatePropagation(true)
					ticker.removeEventCallback(Ticker.EVENT_TICK, callback2)
				})
				ticker.addEventCallback(Ticker.EVENT_TICK, () => {
					expect(ticker.getTickCount()).toBe(4)
					ticker.setIsStarted(false)
					setTimeout(() => {
						expect(ticker.getTickCount()).toBe(4)
						done()
					}, 500)
				})
			})
		})
	})
})
describe('JsonUtil', () => {
	describe('jsonObjectsEqual', () => {
		it('Compares objects.', () => {
			expect(jsonObjectsEqual({ a: '', b: 0, c: { d: true }, e: [0, '', true] }, { a: '', b: 0, c: { d: true }, e: [0, '', true] })).toBe(true)
		})
		it('Compares objects deeply.', () => {
			expect(jsonObjectsEqual({ a: '', b: 0, c: { d: true }, e: [0, '', true] }, { a: '', b: 0, c: { d: true }, e: [0, '', false] })).toBe(false)
			expect(jsonObjectsEqual({ a: '', b: 0, c: { d: true }, e: [0, '', true] }, { a: '', b: 0, c: { d: false }, e: [0, '', true] })).toBe(false)
		})
		it('Handles NaN.', () => {
			expect(jsonObjectsEqual({ a: NaN }, { a: NaN })).toBe(true)
		})
		it('Handles undefined & null.', () => {
			expect(jsonObjectsEqual({ a: undefined }, { a: undefined })).toBe(true)
			expect(jsonObjectsEqual({ a: null }, { a: null })).toBe(true)
		})
	})
	describe('jsonToUri', () => {
		it('Works.', () => {
			expect(jsonToUri({ a: '', b: 0, c: { d: true }, e: [0, '', true] })).toBe(`('a'~''_'b'~0_'c'~('d'~true)_'e'~!0_''_true*)`)
		})
		it('Can escape escape sequences for double quote.', () => {
			expect(jsonToUri('"foo"')).toBe(`'%5C'foo%5C''`)
		})
	})
	describe('jsonFromUri', () => {
		it('Works.', () => {
			expect(jsonFromUri(`('a'~''_'b'~0_'c'~('d'~true)_'e'~!0_''_true*)`)).toEqual({ a: '', b: 0, c: { d: true }, e: [0, '', true] })
		})
		it('Can unescape escape sequences for double quote.', () => {
			expect(jsonFromUri(`'%5C'foo%5C''`)).toBe('"foo"')
		})
	})
})
describe('MithrilUtil', () => {
	describe('extendAttrs', () => {
		it('Works.', () => {
			expect(extendAttrs(
				{
					foo: '',
					bar: true,
					_baz: 5,
					class: 'extended',
					oninit: null,
					oncreate: null,
					onupdate: null,
					onbeforeremove: null,
					onremove: null,
					onbeforeupdate: null,
					onclick: null,
				},
				{
					bar: false,
					class: 'base',
				},
			)).toEqual({
				foo: '',
				bar: false,
				class: 'base extended',
				onclick: null,
			})
		})
	})
	describe('classes', () => {
		it('Works.', () => {
			expect(classes(
				'foo',
				true && 'bar',
				false && 'baz',
				undefined && 'quux',
			)).toEqual('foo bar')
		})
	})
})
describe('EnumUtil', () => {
	describe('enumValues', () => {
		it('Works.', () => {
			enum Foo {
				A, B, C = 5,
			}
			enum Bar {
				A = 'a', B = 'b', C = 'c',
			}
			expect(enumValues(Foo)).toEqual([0, 1, 5])
			expect(enumValues(Bar)).toEqual(['a', 'b', 'c'])
		})
		it('Dedupes.', () => {
			enum Bar {
				A = 'a', B = 'b', C = 'c', A2 = 'a',
			}
			expect(enumValues(Bar)).toEqual(['a', 'b', 'c'])
		})
	})
})