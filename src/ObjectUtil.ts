

export function getKeys(obj: Object): string[] {
	var result: string[] = [];
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			result.push(key);
		}
	}
	return result;
}

export function getKeyOfValue(obj: Object, value: any): string {
	for (var key in obj) {
		if (obj.hasOwnProperty(key) && obj[key] === value) {
			return key;
		}
	}
	return '';
}

export function getKeysOfValue(obj: Object, value: any): string[] {
	var result: string[] = [];
	for (var key in obj) {
		if (obj.hasOwnProperty(key) && obj[key] === value) {
			result.push(key);
		}
	}
	return result;
}

export default {
	getKeys,
	getKeyOfValue,
	getKeysOfValue
};