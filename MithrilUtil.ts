import { TSet, isArray, isUndefinedOrNull } from './Type'

import { assign } from './ObjectUtil'

/**
 * Create a class string, ignoring null, undefined and false items.
 */
export function classes(...a: any[]): string {
	return a.filter(item => !isUndefinedOrNull(item) && item !== false).map(item => isArray(item) ? classes(item) : item).join(` `)
}

/**
 * Merge external and internal attribute objects of a Mithril component,
 * optionally filtering properties starting with an underscore.
 * @param vAttrs Externally configured attributes.
 * @param baseAttrs Internal attributes.
 * @param keepUnderscores Copy properties starting with an underscore.
 */
export function extendAttrs(vAttrs: TSet<any>, baseAttrs: TSet<any>, keepUnderscores?: boolean) {
	let result: TSet<any> = {}
	if (keepUnderscores) {
		assign(result, vAttrs)
	} else {
		for (let key of Object.keys(vAttrs)) {
			if (key[0] != '_') {
				result[key] = vAttrs[key]
			}
		}
	}
	result = assign(result, baseAttrs)
	if (vAttrs.class && baseAttrs.class) result.class = `${baseAttrs.class} ${vAttrs.class}`
	return result
}