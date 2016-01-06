module illa {
	export class StringUtil {
		private static CHAR_TO_HTML: { [s: string]: string } = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;' // IE8 does not support &apos;
		};
		
		private static QUERY_RE = /([^&=]+)=?([^&]*)/g;
		private static PLUS_RE = /\+/g;

		static escapeHTML(str: string): string {
			return str.replace(/[&<>"']/g, function(s) {
				return StringUtil.CHAR_TO_HTML[s];
			});
		}

		static castNicely(str): string {
			return str == null ? '' : String(str);
		}

		static trim(str: string): string {
			return str.replace(/^\s+|\s+$/g, '');
		}

		static escapeRegExp(str: string): string {
			return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
		}

		static hash(src: string): number {
			var result = 0;
			if (src.length == 0) return result;
			for (var i = 0, n = src.length; i < n; i++) {
				result = ((result << 5) - result) + src.charCodeAt(i);
				result |= 0; // Convert to 32bit integer
			}
			return result;
		}
		
		static parseQuery(query: string): {} {
			var result = {};
			var match;
			while (match = this.QUERY_RE.exec(query)) {
				result[this.decode(match[1])] = this.decode(match[2]);
			}
			return result;
		}

		private static decode(s: string): string {
			return decodeURIComponent(s.replace(this.PLUS_RE, ' '));
		}
	}
}