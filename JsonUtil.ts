import { isArray, isFunction, isNumber, isObjectNotNull } from './Type'

/**
 * Compares Objects parsed from or prepared for JSON serialization.
 * Supports toJSON.
 */
export function jsonObjectsEqual(a: any, b: any): boolean {
	if (a && isFunction(a.toJSON)) a = a.toJSON()
	if (b && isFunction(b.toJSON)) b = b.toJSON()

	if (isArray(a)) {
		if (!isArray(b)) return false
		if (a.length != b.length) return false
		for (let i = 0, n = a.length; i < n; i++) {
			if (!jsonObjectsEqual(a[i], b[i])) return false
		}
	} else if (isObjectNotNull(a)) {
		if (!isObjectNotNull(b)) return false
		// Gather keys from both a and b to c to make sure we cover all of them
		let c: { [key: string]: any } = {}
		for (let key in a) c[key] = true
		for (let key in b) c[key] = true
		for (let key in c) {
			if (!jsonObjectsEqual(a[key], b[key])) return false
		}
	} else if (isNumber(a) && isNaN(a)) {
		// NaN does not equal itself so we can't allow it in the primitive test below
		if (!isNumber(b) || !isNaN(b)) return false
	} else {
		if (a !== b) return false
	}
	return true
}

export function jsonToUri(value: any, replacer?: (key: string, value: any) => any, space?: string | number) {
	return encodeURIComponent(
		JSON.stringify(value, replacer, space)
			.replace(/[()'~_!*]/g, function(c) {
				// Replace ()'~_!* with \u0000 escape sequences
				return '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4)
			})
			.replace(/\{/g, '(')    //    { -> (
			.replace(/}/g, ')')     //    } -> )
			.replace(/"/g, "'")     //    " -> '
			.replace(/:/g, '~')     //    : -> ~
			.replace(/,/g, '_')     //    , -> _
			.replace(/\[/g, '!')    //    [ -> !
			.replace(/]/g, '*')     //    ] -> *
	)
}

export function jsonFromUri(text: string, reviver?: (key: any, value: any) => any) {
	return JSON.parse(
		decodeURIComponent(text)
			.replace(/\(/g, '{')    //    ( -> {
			.replace(/\)/g, '}')    //    ) -> }
			.replace(/'/g, '"')     //    ' -> "
			.replace(/~/g, ':')     //    ~ -> :
			.replace(/_/g, ',')     //    _ -> ,
			.replace(/!/g, '[')     //    ! -> [
			.replace(/\*/g, ']')    //    * -> ]
		, reviver
	)
}