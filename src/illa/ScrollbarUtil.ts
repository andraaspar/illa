/// <reference path='../../lib/JQuery.d.ts'/>
/// <reference path='Axis2D.ts'/>

module illa {
	export class ScrollbarUtil {
		static BOX_CSS_CLASS = 'illa_ScrollbarUtil_box';
		private static box:JQuery;
		private static width = NaN;
		private static height = NaN;

		static getSize(axis: Axis2D): number {
			var result = NaN;
			if (!this.box) {
				this.box = jQuery('<div>');
				this.box.addClass(ScrollbarUtil.BOX_CSS_CLASS);
				this.box.appendTo('body');
			}

			if (isNaN(this.width)) {
				var boxElement = this.box[0];
				this.width = boxElement.offsetWidth - boxElement.clientWidth;
				this.height = boxElement.offsetHeight - boxElement.clientHeight;
			}
			
			switch (axis) {
				case Axis2D.X:
					result = this.width;
					break;
				case Axis2D.Y:
					result = this.height;
					break;
			}

			return result;
		}
		
		static clearSizeCache() {
			// Only the width is checked
			this.width = NaN;
		}
	}
}