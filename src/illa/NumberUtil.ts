module illa {
	export class NumberUtil {

		static toStringNoLetters(num: number): string {
			var result = '';

			if (!isNaN(num) && isFinite(num)) {
				if (Math.abs(num) < 1.0) {
					var e = parseInt(num.toString().split('e-')[1]);
					if (e) {
						num *= Math.pow(10, e - 1);
						result = '0.' + (new Array(e)).join('0') + num.toString().substring(2);
					} else {
						result = num + '';
					}
				} else {
					var e = parseInt(num.toString().split('+')[1]);
					if (e > 20) {
						e -= 20;
						num /= Math.pow(10, e);
						result = num + (new Array(e + 1)).join('0');
					} else {
						result = num + '';
					}
				}
			}
			
			return result;
		}
	}
}