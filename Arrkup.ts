import { isArray, isBoolean, isNull, isNumber, isObjectNotNull, isString } from './Type'

import { escapeHtml } from './StringUtil'
import { numberToStringNoLetters } from './NumberUtil'

export class Arrkup {

	constructor(
		private source: any,
		private allowRaw = true
	) { }

	createString(): string {
		return this.processArrkup(this.getSource())
	}

	processArrkup(source: any): string {
		var result = ''

		if (isArray(source)) {
			var sourceArr = <any[]>source
			if (isString(sourceArr[0])) {
				result = this.processTag(sourceArr)
			} else if (isArray(sourceArr[0])) {
				result = this.processGroup(sourceArr)
			} else if (isNull(sourceArr[0])) {
				if (this.getAllowRaw()) {
					result = this.processRaw(sourceArr)
				}
			}
		} else {
			result = this.processNonArrkup(source)
		}

		return result
	}

	processTag(source: any[]): string {
		var tagName = <string>source[0]
		var isSelfClosing = tagName.charAt(tagName.length - 1) == '/'
		if (isSelfClosing) tagName = tagName.slice(0, -1)

		var result = '<' + tagName

		var hasAttributes = isObjectNotNull(source[1]) && !isArray(source[1])
		if (hasAttributes) result += this.processAttributes(source[1])
		var contentIndex = hasAttributes ? 2 : 1

		if (isSelfClosing) {
			result += '/>'
		} else {
			result += '>'

			result += this.processChildren(source, contentIndex)

			result += '</' + tagName + '>'
		}

		return result
	}

	processGroup(source: any[]): string {
		return this.processChildren(source, 0)
	}

	processRaw(source: any[]): string {
		var result = ''

		for (var i = 1, n = source.length; i < n; i++) {
			result += source[i] + ''
		}

		return result
	}

	processNonArrkup(source: any): string {
		return escapeHtml(source + '')
	}

	processAttributes(rawProps: { [key: string]: any }): string {
		var result = ''

		for (var prop in rawProps) {
			if (rawProps.hasOwnProperty(prop)) {
				result += this.processAttribute(prop, rawProps[prop])
			}
		}

		return result
	}

	processAttribute(key: string, value: any): string {
		var result = ''

		if (key) {
			if (isNumber(value)) {
				value = numberToStringNoLetters(value)
			}

			if (isString(value)) {
				result = ' ' + key + '="' + escapeHtml(value) + '"'
			} else if (isBoolean(value)) {
				if (value) {
					result += ' ' + key
				}
			}
		}

		return result
	}

	processChildren(rawChildren: any[], startIndex: number): string {
		var result = ''

		for (var i = startIndex, n = rawChildren.length; i < n; i++) {
			result += this.processArrkup(rawChildren[i])
		}

		return result
	}

	getSource() { return this.source }
	setSource(value: any): void { this.source = value }

	getAllowRaw() { return this.allowRaw }
	setAllowRaw(flag: boolean): void { this.allowRaw = flag }

	static createString = arrkup
}

export function arrkup(source: any[], allowRaw = true): string {
	return new Arrkup(source, allowRaw).createString()
}