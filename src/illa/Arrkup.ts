/// <reference path='_module.ts'/>
/// <reference path='NumberUtil.ts'/>
/// <reference path='StringUtil.ts'/>

module illa {
	export class Arrkup {

		constructor(private source: any, private allowRaw = true) {

		}

		createString(): string {
			return this.processArrkup(this.getSource());
		}

		processArrkup(source: any): string {
			var result = '';

			if (illa.isArray(source)) {
				var sourceArr = <any[]>source;
				if (illa.isString(sourceArr[0])) {
					result = this.processTag(sourceArr);
				} else if (illa.isArray(sourceArr[0])) {
					result = this.processGroup(sourceArr);
				} else if (illa.isNull(sourceArr[0])) {
					if (this.getAllowRaw()) {
						result = this.processRaw(sourceArr);
					}
				}
			} else {
				result = this.processNonArrkup(source);
			}

			return result;
		}

		processTag(source: any[]): string {
			var tagName = <string>source[0];
			var isSelfClosing = tagName.charAt(tagName.length - 1) == '/';
			if (isSelfClosing) tagName = tagName.slice(0, -1);

			var result = '<' + tagName;

			var hasAttributes = illa.isObjectNotNull(source[1]) && !illa.isArray(source[1]);
			if (hasAttributes) result += this.processAttributes(source[1]);
			var contentIndex = hasAttributes ? 2 : 1;

			if (isSelfClosing) {
				result += '/>';
			} else {
				result += '>';

				result += this.processChildren(source, contentIndex);

				result += '</' + tagName + '>';
			}

			return result;
		}

		processGroup(source: any[]): string {
			return this.processChildren(source, 0);
		}

		processRaw(source: any[]): string {
			var result = '';

			for (var i = 1, n = source.length; i < n; i++) {
				result += source[i] + '';
			}

			return result;
		}

		processNonArrkup(source: any): string {
			return StringUtil.escapeHTML(source + '');
		}

		processAttributes(rawProps: {}): string {
			var result = '';

			for (var prop in rawProps) {
				if (rawProps.hasOwnProperty(prop)) {
					result += this.processAttribute(prop, rawProps[prop]);
				}
			}

			return result;
		}

		processAttribute(key: string, value: any): string {
			var result = '';

			if (key) {
				if (illa.isNumber(value)) {
					value = NumberUtil.toStringNoLetters(value);
				}

				if (illa.isString(value)) {
					result = ' ' + key + '="' + StringUtil.escapeHTML(value) + '"';
				} else if (illa.isBoolean(value)) {
					if (value) {
						result += ' ' + key;
					}
				}
			}

			return result;
		}

		processChildren(rawChildren: any[], startIndex: number): string {
			var result = '';

			for (var i = startIndex, n = rawChildren.length; i < n; i++) {
				result += this.processArrkup(rawChildren[i]);
			}

			return result;
		}

		getSource() { return this.source }
		setSource(value: any): void { this.source = value }

		getAllowRaw() { return this.allowRaw }
		setAllowRaw(flag: boolean): void { this.allowRaw = flag }
		
		static createString(source: any[], allowRaw = true): string {
			return new Arrkup(source, allowRaw).createString();
		}
	}
}