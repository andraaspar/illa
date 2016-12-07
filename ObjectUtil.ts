export function getKeyOfValue(obj: { [key: string]: any }, value: any): string {
	for (var key in obj) {
		if (obj.hasOwnProperty(key) && obj[key] === value) {
			return key
		}
	}
	return ''
}

export function getKeysOfValue(obj: { [key: string]: any }, value: any): string[] {
	var result: string[] = []
	for (var key in obj) {
		if (obj.hasOwnProperty(key) && obj[key] === value) {
			result.push(key)
		}
	}
	return result
}