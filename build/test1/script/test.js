var illa;
(function (illa) {
    var Log = (function () {
        function Log() {
        }
        Log.log = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            if (window.console && console.log) {
                if (console.log.apply) {
                    console.log.apply(console, args);
                } else {
                    console.log(args.join(' '));
                }
            }
        };
        Log.info = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            if (window.console && console.info) {
                if (console.info.apply) {
                    console.info.apply(console, args);
                } else {
                    console.info(args.join(' '));
                }
            } else {
                Log.log.apply(this, args);
            }
        };
        Log.warn = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            if (window.console && console.warn) {
                if (console.warn.apply) {
                    console.warn.apply(console, args);
                } else {
                    console.warn(args.join(' '));
                }
            } else {
                Log.log.apply(this, args);
            }
        };
        Log.error = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            if (window.console && console.error) {
                if (console.error.apply) {
                    console.error.apply(console, args);
                } else {
                    console.error(args.join(' '));
                }
            } else {
                Log.log.apply(this, args);
            }
        };
        Log.logIf = function (test) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            if (test) {
                Log.log.apply(this, [test].concat(args));
            }
        };
        Log.infoIf = function (test) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            if (test) {
                Log.info.apply(this, [test].concat(args));
            }
        };
        Log.warnIf = function (test) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            if (test) {
                Log.warn.apply(this, [test].concat(args));
            }
        };
        Log.errorIf = function (test) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            if (test) {
                Log.error.apply(this, [test].concat(args));
            }
        };
        Log.logSupported = 'console' in window && 'log' in window.console;
        return Log;
    })();
    illa.Log = Log;
})(illa || (illa = {}));
var illa;
(function (illa) {
    (function (Axis2D) {
        Axis2D[Axis2D["X"] = 0] = "X";
        Axis2D[Axis2D["Y"] = 1] = "Y";
    })(illa.Axis2D || (illa.Axis2D = {}));
    var Axis2D = illa.Axis2D;
})(illa || (illa = {}));
var illa;
(function (illa) {
    var ScrollbarUtil = (function () {
        function ScrollbarUtil() {
        }
        ScrollbarUtil.getDefaultSize = function (axis) {
            var result = NaN;
            if (!this.box) {
                this.box = jQuery('<div>');
                this.box.addClass(ScrollbarUtil.BOX_CSS_CLASS);
                this.box.appendTo('body');
            }

            if (isNaN(this.defaultWidth)) {
                var boxElement = this.box[0];
                this.defaultWidth = boxElement.offsetWidth - boxElement.clientWidth;
                this.defaultHeight = boxElement.offsetHeight - boxElement.clientHeight;
            }

            switch (axis) {
                case 0 /* X */:
                    result = this.defaultWidth;
                    break;
                case 1 /* Y */:
                    result = this.defaultHeight;
                    break;
            }

            return result;
        };

        ScrollbarUtil.clearDefaultSizeCache = function () {
            this.defaultWidth = NaN;
        };

        ScrollbarUtil.isVisibleOn = function (jq, axis) {
            var elem = jq[0];
            if (!elem)
                return false;
            var overflow = '';
            switch (axis) {
                case 0 /* X */:
                    overflow = jq.css('overflow-x');
                    break;
                case 1 /* Y */:
                    overflow = jq.css('overflow-y');
                    break;
            }
            switch (overflow) {
                case 'scroll':
                    return true;
                case 'auto':
                case 'overlay':
                    switch (axis) {
                        case 0 /* X */:
                            return elem.scrollWidth > jq.innerWidth();
                        case 1 /* Y */:
                            return elem.scrollHeight > jq.innerHeight();
                    }
                    break;
            }
            return false;
        };
        ScrollbarUtil.BOX_CSS_CLASS = 'illa-ScrollbarUtil-box';

        ScrollbarUtil.defaultWidth = NaN;
        ScrollbarUtil.defaultHeight = NaN;
        return ScrollbarUtil;
    })();
    illa.ScrollbarUtil = ScrollbarUtil;
})(illa || (illa = {}));
var illa;
(function (illa) {
    var IventCallbackReg = (function () {
        function IventCallbackReg(callback, thisObj) {
            this.callback = callback;
            this.thisObj = thisObj;
        }
        return IventCallbackReg;
    })();
    illa.IventCallbackReg = IventCallbackReg;
})(illa || (illa = {}));
var illa;
(function (illa) {
    var Ivent = (function () {
        function Ivent(type, target) {
            this.type = type;
            this.target = target;
            this.isPropagationStopped = false;
            this.isImmediatePropagationStopped = false;
        }
        Ivent.prototype.dispatch = function () {
            this.processHandler(this.target);
        };

        Ivent.prototype.processHandler = function (handler) {
            this.currentTarget = handler;
            var callbackRegs = handler.getCallbackRegsByType(this.type).slice(0);
            for (var i = 0, n = callbackRegs.length; i < n; i++) {
                var callbackReg = callbackRegs[i];
                callbackReg.callback.call(callbackReg.thisObj, this);
                if (this.isImmediatePropagationStopped)
                    break;
            }
            if (!this.isPropagationStopped) {
                var parentHandler = handler.getEventParent();
                if (parentHandler)
                    this.processHandler(parentHandler);
            }
        };

        Ivent.prototype.getType = function () {
            return this.type;
        };

        Ivent.prototype.getTarget = function () {
            return this.target;
        };

        Ivent.prototype.getCurrentTarget = function () {
            return this.currentTarget;
        };

        Ivent.prototype.setIsPropagationStopped = function (flag) {
            this.isPropagationStopped = flag;
        };

        Ivent.prototype.getIsPropagationStopped = function () {
            return this.isPropagationStopped;
        };

        Ivent.prototype.setStopImmediatePropagation = function (flag) {
            this.isImmediatePropagationStopped = flag;
        };

        Ivent.prototype.getIsImmediatePropagationStopped = function () {
            return this.isImmediatePropagationStopped;
        };
        return Ivent;
    })();
    illa.Ivent = Ivent;
})(illa || (illa = {}));
var illa;
(function (illa) {
    var IventHandler = (function () {
        function IventHandler() {
            this.callbacksByType = {};
        }
        IventHandler.prototype.getCallbackRegsByType = function (type) {
            var result = this.callbacksByType[type];
            if (!jQuery.isArray(result))
                result = [];
            return result;
        };

        IventHandler.prototype.getEventParent = function () {
            return null;
        };

        IventHandler.prototype.addIventCallback = function (type, cb, thisObj) {
            var reg = new illa.IventCallbackReg(cb, thisObj);
            if (jQuery.isArray(this.callbacksByType[type])) {
                this.removeIventCallback(type, cb, thisObj);
                this.callbacksByType[type].push(reg);
            } else {
                this.callbacksByType[type] = [reg];
            }
        };

        IventHandler.prototype.removeIventCallback = function (type, cb, thisObj) {
            var callbacks = this.callbacksByType[type];
            if (jQuery.isArray(callbacks)) {
                for (var i = 0, n = callbacks.length; i < n; i++) {
                    var callback = callbacks[i];
                    if (callback.callback === cb && callback.thisObj === thisObj) {
                        callbacks.splice(i, 1);
                        break;
                    }
                }
            }
        };

        IventHandler.prototype.removeAllIventCallbacks = function () {
            this.callbacksByType = {};
        };
        return IventHandler;
    })();
    illa.IventHandler = IventHandler;
})(illa || (illa = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var illa;
(function (illa) {
    var Ticker = (function (_super) {
        __extends(Ticker, _super);
        function Ticker() {
            _super.call(this);
            this.supportsAnimationFrame = jQuery.isFunction(window.requestAnimationFrame) && jQuery.isFunction(window.cancelAnimationFrame);
            this.intervalID = NaN;
            this.onTickBound = jQuery.proxy(this.onTick, this);
            this.tickCount = 0;
            this.setIsStarted(true);
        }
        Ticker.prototype.getIsStarted = function () {
            return !isNaN(this.intervalID);
        };

        Ticker.prototype.setIsStarted = function (flag) {
            if (this.getIsStarted() == flag)
                return;

            if (flag) {
                if (this.supportsAnimationFrame) {
                    this.intervalID = requestAnimationFrame(this.onTickBound);
                } else {
                    this.intervalID = setInterval(this.onTickBound, 1000 / 60);
                }
            } else {
                if (this.supportsAnimationFrame) {
                    cancelAnimationFrame(this.intervalID);
                } else {
                    clearInterval(this.intervalID);
                }
                this.intervalID = NaN;
            }
        };

        Ticker.prototype.getSupportsAnimationFrame = function () {
            return this.supportsAnimationFrame;
        };

        Ticker.prototype.onTick = function () {
            this.tickCount++;
            if (this.supportsAnimationFrame) {
                this.intervalID = requestAnimationFrame(this.onTickBound);
            }
            new illa.Ivent(Ticker.EVENT_TICK, this).dispatch();
        };

        Ticker.prototype.getTickCount = function () {
            return this.tickCount;
        };
        Ticker.EVENT_TICK = 'illa_Ticker_EVENT_TICK';
        return Ticker;
    })(illa.IventHandler);
    illa.Ticker = Ticker;
})(illa || (illa = {}));
var test1;
(function (test1) {
    var Main = (function () {
        function Main() {
            this.ticker = new illa.Ticker();
            jQuery(jQuery.proxy(this.onDOMLoaded, this));

            this.ticker.addIventCallback(illa.Ticker.EVENT_TICK, this.onTick, this);
        }
        Main.prototype.onDOMLoaded = function () {
            illa.Log.info('DOM loaded.');

            illa.Log.info('Scrollbar width:', illa.ScrollbarUtil.getDefaultSize(0 /* X */));
            illa.Log.info('Scrollbar height:', illa.ScrollbarUtil.getDefaultSize(1 /* Y */));
        };

        Main.prototype.onTick = function (e) {
            if ((this.ticker.getTickCount() % 60) == 0) {
                illa.Log.info('Tick: ' + this.ticker.getTickCount());
            }
            if (this.ticker.getTickCount() > 5 * 60) {
                illa.Log.info('Stopping ticker.');
                this.ticker.setIsStarted(false);
            }
        };
        return Main;
    })();
    test1.Main = Main;
})(test1 || (test1 = {}));

var test1Main = new test1.Main();
