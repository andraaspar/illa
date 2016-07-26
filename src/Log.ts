import GLOBAL from './GLOBAL';

export function log(...args) {
	var console = GLOBAL.console;
	if (console && console.log) {
		if (console.log.apply) {
			console.log.apply(console, args);
		} else {
			console.log(args.join(' '));
		}
	}
}
export function info(...args) {
	var console = GLOBAL.console;
	if (console && console.info) {
		if (console.info.apply) {
			console.info.apply(console, args);
		} else {
			console.info(args.join(' '));
		}
	} else {
		log.apply(this, args);
	}
}
export function warn(...args) {
	var console = GLOBAL.console;
	if (console && console.warn) {
		if (console.warn.apply) {
			console.warn.apply(console, args);
		} else {
			console.warn(args.join(' '));
		}
	} else {
		log.apply(this, args);
	}
}
export function error(...args) {
	var console = GLOBAL.console;
	if (console && console.error) {
		if (console.error.apply) {
			console.error.apply(console, args);
		} else {
			console.error(args.join(' '));
		}
	} else {
		log.apply(this, args);
	}
}
export function logIf(test, ...args) {
	if (test) {
		log.apply(this, [test].concat(args));
	}
}
export function infoIf(test, ...args) {
	if (test) {
		info.apply(this, [test].concat(args));
	}
}
export function warnIf(test, ...args) {
	if (test) {
		warn.apply(this, [test].concat(args));
	}
}
export function errorIf(test, ...args) {
	if (test) {
		error.apply(this, [test].concat(args));
	}
}

export default {
	log,
	info,
	warn,
	error,
	logIf,
	infoIf,
	warnIf,
	errorIf
};