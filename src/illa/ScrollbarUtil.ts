/// <reference path='../../lib/JQuery.d.ts'/>
/// <reference path='Axis2D.ts'/>

module illa {
	export class ScrollbarUtil {
		static CSS_CLASS = 'illa-ScrollbarUtil-box';
		private box: JQuery;
		private defaultWidth = NaN;
		private defaultHeight = NaN;
		
		constructor(box?: JQuery) {
			if (box) {
				this.box = box;
			} else {
				this.box = jQuery('<div>');
			}
			this.box.addClass(ScrollbarUtil.CSS_CLASS);
			this.box.appendTo('body');
		}

		getDefaultSize(axis: Axis2D): number {
			var result = NaN;

			if (isNaN(this.defaultWidth)) {
				var boxElement = this.box[0];
				this.defaultWidth = boxElement.offsetWidth - boxElement.clientWidth;
				this.defaultHeight = boxElement.offsetHeight - boxElement.clientHeight;
			}

			switch (axis) {
				case Axis2D.X:
					result = this.defaultWidth;
					break;
				case Axis2D.Y:
					result = this.defaultHeight;
					break;
			}

			return result;
		}

		clearDefaultSizeCache() {
			// Only the width is checked
			this.defaultWidth = NaN;
		}

		static isVisibleOn(jq: JQuery, axis: Axis2D): boolean {
			var elem = jq[0];
			if (!elem) return false;
			var overflow = '';
			switch (axis) {
				case Axis2D.X:
					overflow = jq.css('overflow-x');
					break;
				case Axis2D.Y:
					overflow = jq.css('overflow-y');
					break;
			}
			switch (overflow) {
				case 'scroll': return true;
				case 'auto':
					switch (axis) {
						case Axis2D.X: return elem.scrollWidth > jq.innerWidth();
						case Axis2D.Y: return elem.scrollHeight > jq.innerHeight();
					}
					break;
			}
			return false;
		}
	}
}