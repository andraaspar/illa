module illa {
	export class StringUtil {
		static CHAR_TO_HTML: { [s: string]: string } = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;' // IE8 does not support &apos;
		};

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
	}
}