import { bind, get, getIf, getIfIn, getIfNot } from './FunctionUtil';
import { GLOBAL } from './GLOBAL';
import { jsonFromUri, jsonToUri } from './JsonUtil';
import { lipsum, PRESET_DEFAULT, PRESET_LABEL, PRESET_NAME, PRESET_TITLE } from './lipsum';

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
			expect(getIfNot(isNaN, {}, 42)).toBe(42)
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
			expect(getIf(isNaN, {}, 42)).toEqual({})
			expect(getIf(isNaN, () => NaN, () => 42)).toBeNaN()
		})
		it(`Works with isFinite.`, () => {
			expect(getIf(isFinite, Infinity, 42)).toBe(42)
		})
	})
	describe('getIfIn', () => {
		it(`Gets a value.`, () => {
			expect(getIfIn({ a: true }, 'a', false)).toBe(true)
		})
		it(`If not found, gets undefined.`, () => {
			expect(getIfIn({} as { a: boolean }, 'a')).toBeUndefined()
		})
		it(`If not found, gets fallback value.`, () => {
			expect(getIfIn({} as { a: boolean }, 'a', true)).toBe(true)
		})
		it(`If not found, calls fallback function.`, () => {
			expect(getIfIn({} as { a: boolean }, 'a', () => true)).toBe(true)
		})
	})
})
describe(`GLOBAL`, () => {
	it(`Is the global object.`, () => {
		expect(typeof GLOBAL.isNaN).toBe('function')
	})
})
describe('Lipsum', () => {
	describe('lipsum', () => {
		it('Works.', () => {
			expect(typeof lipsum()).toBe('string')
			expect(typeof lipsum({ ...PRESET_DEFAULT, highlightChance: .5, highlightBefore: '<span>', highlightAfter: '</span>' })).toBe('string')
			expect(typeof lipsum(PRESET_LABEL)).toBe('string')
			expect(typeof lipsum(PRESET_NAME)).toBe('string')
			expect(typeof lipsum(PRESET_TITLE)).toBe('string')
		})
	})
})
describe('JsonUtil', () => {
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
