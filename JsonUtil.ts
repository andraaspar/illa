
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
