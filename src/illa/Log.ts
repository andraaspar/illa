module illa {
	export class Log {
		static logSupported = 'console' in window && 'log' in window.console;
		static log(...args) {
			if (window.console && console.log) {
				if (console.log.apply) {
					console.log.apply(console, args);
				} else {
					console.log(args.join(' '));
				}
			}
		}
		static info(...args) {
			if (window.console && console.info) {
				if (console.info.apply) {
					console.info.apply(console, args);
				} else {
					console.info(args.join(' '));
				}
			} else {
				Log.log.apply(this, args);
			}
		}
		static warn(...args) {
			if (window.console && console.warn) {
				if (console.warn.apply) {
					console.warn.apply(console, args);
				} else {
					console.warn(args.join(' '));
				}
			} else {
				Log.log.apply(this, args);
			}
		}
		static error(...args) {
			if (window.console && console.error) {
				if (console.error.apply) {
					console.error.apply(console, args);
				} else {
					console.error(args.join(' '));
				}
			} else {
				Log.log.apply(this, args);
			}
		}
		static logIf(test, ...args) {
			if (test) {
				Log.log.apply(this, [test].concat(args));
			}
		}
		static infoIf(test, ...args) {
			if (test) {
				Log.info.apply(this, [test].concat(args));
			}
		}
		static warnIf(test, ...args) {
			if (test) {
				Log.warn.apply(this, [test].concat(args));
			}
		}
		static errorIf(test, ...args) {
			if (test) {
				Log.error.apply(this, [test].concat(args));
			}
		}
	}
}