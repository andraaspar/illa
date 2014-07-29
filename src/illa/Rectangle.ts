/// <reference path='Axis2D.ts'/>
/// <reference path='Alignment.ts'/>

module illa {
	export class Rectangle {
		constructor(private x: number, private y: number, private width: number, private height: number) {
			if (width < 0) {
				throw 'Invalid width.';
			}
			if (height < 0) {
				throw 'Invalid height.';
			}
		}

		getOffset(axis: Axis2D, alignment = Alignment.START): number {
			var offset = NaN;

			switch (axis) {
				case Axis2D.X:
					offset = this.x;
					break;
				case Axis2D.Y:
					offset = this.y;
					break;
			}

			switch (alignment) {
				case Alignment.CENTER:
					offset += this.getSize(axis) / 2;
					break;
				case Alignment.END:
					offset += this.getSize(axis);
					break;
			}

			return offset;
		}

		getSize(axis: Axis2D): number {
			var result = NaN;

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

		equals(value: Rectangle): boolean {
			return !!value &&
				value.getOffset(Axis2D.X) == this.getOffset(Axis2D.X) &&
				value.getOffset(Axis2D.Y) == this.getOffset(Axis2D.Y) &&
				value.getSize(Axis2D.X) == this.getSize(Axis2D.X) &&
				value.getSize(Axis2D.Y) == this.getSize(Axis2D.Y);
		}

		toString(): string {
			return '[illa.Rectangle x=' + this.getOffset(Axis2D.X) + ' y=' + this.getOffset(Axis2D.Y) +
				' width=' + this.getSize(Axis2D.X) + ' height=' + this.getSize(Axis2D.Y) + ']';
		}

		expand(top: number, right: number, bottom: number, left: number): Rectangle {
			return new Rectangle(this.getOffset(Axis2D.X) - left,
				this.getOffset(Axis2D.Y) - top,
				this.getSize(Axis2D.X) + left + right,
				this.getSize(Axis2D.Y) + top + bottom);
		}

		containsRect(rect: Rectangle): boolean {
			var result = false;
			if (rect) {
				result = true;
				for (var axis = Axis2D.X; axis <= Axis2D.Y; axis++) {
					if (rect.getOffset(axis, Alignment.START) < this.getOffset(axis, Alignment.START) ||
						rect.getOffset(axis, Alignment.END) > this.getOffset(axis, Alignment.END)) {
						result = false;
						break;
					}
				}
			}
			return result;
		}

		contains(x: number, y: number): boolean {
			return x >= this.x &&
				x < this.x + this.width &&
				y >= this.y &&
				y < this.y + this.height;
		}
	}
}