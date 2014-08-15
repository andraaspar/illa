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
	}
}