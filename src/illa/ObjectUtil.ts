/// <reference path='_module.ts'/>

module illa {
	export class ObjectUtil {
		
		static getKeys(obj: Object): string[] {
			var result: string[] = [];
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					result.push(key);
				}
			}
			return result;
		}
		
		static getKeyOfValue(obj: Object, value: any): string {
			for (var key in obj) {
				if (obj.hasOwnProperty(key) && obj[key] === value) {
					return key;
				}
			}
			return '';
		}
		
		static getKeysOfValue(obj: Object, value: any): string[] {
			var result: string[] = [];
			for (var key in obj) {
				if (obj.hasOwnProperty(key) && obj[key] === value) {
					result.push(key);
				}
			}
			return result;
		}
	}
}