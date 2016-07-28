import GLOBAL from './GLOBAL';

import {
	isString
} from './Type';

const CHAR_TO_HTML: { [s: string]: string } = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;' // IE8 does not support &apos;
};

const QUERY_RE = /([^&=]+)=?([^&]*)/g;
const PLUS_RE = /\+/g;

export function escapeHTML(str: string): string {
	return str.replace(/[&<>"']/g, function(s) {
		return CHAR_TO_HTML[s];
	});
}

export function castNicely(str): string {
	return str == null ? '' : String(str);
}

export function trim(str: string): string {
	return str.replace(/^\s+|\s+$/g, '');
}

export function escapeRegExp(str: string): string {
	return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export function hash(src: string): number {
	var result = 0;
	if (src.length == 0) return result;
	for (var i = 0, n = src.length; i < n; i++) {
		result = ((result << 5) - result) + src.charCodeAt(i);
		result |= 0; // Convert to 32bit integer
	}
	return result;
}

export function parseQuery(query: string, multipleKeysAsArray?: boolean): {} {
	var result = {};
	var match;
	while (match = QUERY_RE.exec(query)) {
		var key = decode(match[1]);
		var value = decode(match[2]);
		if (multipleKeysAsArray && key in result) {
			if (isString(result[key])) {
				result[key] = [result[key], value];
			} else {
				result[key].push(value);
			}
		} else {
			result[key] = value;
		}
	}
	return result;
}

function decode(s: string): string {
	return decodeURIComponent(s.replace(PLUS_RE, ' '));
}

/**
 * Generates a UUID.
 * Based on: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 */
export function uuid(): string {
	var base: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
	var result: string = base.replace(/[xy]/g, function(char) {
		var random = cryptoRandom16();
		var result = char == 'x' ? random : (random & 0x3 | 0x8);
		return result.toString(16);
	});
	return result;
}

function cryptoRandom16(): number {
	var result: number;
	if (GLOBAL.crypto) {
		if (GLOBAL.crypto.getRandomValues) {
			result = GLOBAL.crypto.getRandomValues(new Uint8Array(1))[0] % 16;
		} else if (GLOBAL.crypto.randomBytes) {
			result = GLOBAL.crypto.randomBytes(1)[0] % 16;
		}
	}
	if (isNaN(result)) {
		result = Math.random() * 16;
	}
	return Math.floor(result);
}

export default {
	escapeHTML,
	castNicely,
	trim,
	escapeRegExp,
	hash,
	parseQuery
};