import { GLOBAL } from './GLOBAL'

export function log(...args: any[]) {
	var console = GLOBAL.console;
	if (console && console.log) {
		if (console.log.apply) {
			console.log.apply(console, args);
		} else {
			console.log(args.join(' '));
		}
	}
}
export function info(...args: any[]) {
	var console = GLOBAL.console;
	if (console && console.info) {
		if (console.info.apply) {
			console.info.apply(console, args);
		} else {
			console.info(args.join(' '));
		}
	} else {
		log.apply(undefined, args);
	}
}
export function warn(...args: any[]) {
	var console = GLOBAL.console;
	if (console && console.warn) {
		if (console.warn.apply) {
			console.warn.apply(console, args);
		} else {
			console.warn(args.join(' '));
		}
	} else {
		log.apply(undefined, args);
	}
}
export function error(...args: any[]) {
	var console = GLOBAL.console;
	if (console && console.error) {
		if (console.error.apply) {
			console.error.apply(console, args);
		} else {
			console.error(args.join(' '));
		}
	} else {
		log.apply(undefined, args);
	}
}