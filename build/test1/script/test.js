var illa;
(function (illa) {
    function isString(v) {
        return typeof v == 'string';
    }
    illa.isString = isString;

    function isBoolean(v) {
        return typeof v == 'boolean';
    }
    illa.isBoolean = isBoolean;

    function isNumber(v) {
        return typeof v == 'number';
    }
    illa.isNumber = isNumber;

    function isFunction(v) {
        return typeof v == 'function';
    }
    illa.isFunction = isFunction;

    function isArray(v) {
        return jQuery.isArray(v);
    }
    illa.isArray = isArray;

    function isUndefined(v) {
        return typeof v == 'undefined';
    }
    illa.isUndefined = isUndefined;

    function isNull(v) {
        return v === null;
    }
    illa.isNull = isNull;

    function isUndefinedOrNull(v) {
        return typeof v == 'undefined' || v === null;
    }
    illa.isUndefinedOrNull = isUndefinedOrNull;

    function isObjectNotNull(v) {
        var t = typeof v;
        return t == 'object' && v !== null || t == 'function';
    }
    illa.isObjectNotNull = isObjectNotNull;

    function getType(v) {
        return jQuery.type(v);
    }
    illa.getType = getType;

    function as(c, v) {
        return v instanceof c ? v : null;
    }
    illa.as = as;

    function bind(fn, obj) {
        if (!fn)
            throw 'No function.';
        return function () {
            return fn.apply(obj, arguments);
        };
    }
    illa.bind = bind;
})(illa || (illa = {}));
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
        function ScrollbarUtil(box) {
            this.defaultWidth = NaN;
            this.defaultHeight = NaN;
            if (box) {
                this.box = box;
            } else {
                this.box = jQuery('<div>');
            }
            this.box.addClass(ScrollbarUtil.CSS_CLASS);
            this.box.appendTo('body');
        }
        ScrollbarUtil.prototype.getDefaultSize = function (axis) {
            var result = NaN;

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

        ScrollbarUtil.prototype.clearDefaultSizeCache = function () {
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
        ScrollbarUtil.CSS_CLASS = 'illa-ScrollbarUtil-box';
        return ScrollbarUtil;
    })();
    illa.ScrollbarUtil = ScrollbarUtil;
})(illa || (illa = {}));
var illa;
(function (illa) {
    var StringUtil = (function () {
        function StringUtil() {
        }
        StringUtil.escapeHTML = function (str) {
            return str.replace(/[&<>"']/g, function (s) {
                return StringUtil.CHAR_TO_HTML[s];
            });
        };

        StringUtil.castNicely = function (str) {
            return str == null ? '' : String(str);
        };
        StringUtil.CHAR_TO_HTML = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return StringUtil;
    })();
    illa.StringUtil = StringUtil;
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
var illa;
(function (illa) {
    var UnitTest = (function () {
        function UnitTest(printTarget) {
            this.printTarget = printTarget;
            this.testCount = 0;
            this.successCount = 0;
            this.failCount = 0;
        }
        UnitTest.prototype.assert = function (test, desc) {
            if (typeof desc === "undefined") { desc = ''; }
            this.testCount++;
            if (test === true) {
                this.successCount++;
            } else {
                this.failCount++;
                if (desc) {
                    this.warn('Test failed:', desc);
                } else {
                    throw 'Test failed.';
                }
            }
            return test;
        };

        UnitTest.prototype.assertThrowsError = function (fn, desc) {
            if (typeof desc === "undefined") { desc = ''; }
            var errorThrown = false;
            try  {
                fn();
            } catch (e) {
                errorThrown = true;
            }
            return this.assert(errorThrown, desc);
        };

        UnitTest.prototype.printStats = function () {
            this.info(this.testCount, 'tests completed:', this.successCount, 'succeeded,', this.failCount, 'failed.');
        };

        UnitTest.prototype.info = function () {
            var r = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                r[_i] = arguments[_i + 0];
            }
            if (this.printTarget) {
                var out = jQuery('<p>').text(r.join(' '));
                this.printTarget.append(out);
            } else {
                illa.Log.info.apply(illa.Log, r);
            }
        };

        UnitTest.prototype.warn = function () {
            var r = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                r[_i] = arguments[_i + 0];
            }
            if (this.printTarget) {
                var out = jQuery('<p>').text(r.join(' ')).prepend('<b>WARNING: </b>');
                this.printTarget.append(out);
            } else {
                illa.Log.warn.apply(illa.Log, r);
            }
        };
        return UnitTest;
    })();
    illa.UnitTest = UnitTest;
})(illa || (illa = {}));
var test1;
(function (test1) {
    var Main = (function () {
        function Main() {
            jQuery(jQuery.proxy(this.onDOMLoaded, this));
        }
        Main.prototype.onDOMLoaded = function () {
            var u = this.unitTest = new illa.UnitTest(jQuery('body'));
            u.info('Testing...');

            var scrollbarUtil = new illa.ScrollbarUtil();
            u.assert(illa.isNumber(scrollbarUtil.getDefaultSize(0 /* X */)), 'ScrollbarUtil.getDefaultSize 1');
            u.assert(illa.isNumber(scrollbarUtil.getDefaultSize(1 /* Y */)), 'ScrollbarUtil.getDefaultSize 2');
            u.assert(scrollbarUtil.getDefaultSize(0 /* X */) >= 0, 'ScrollbarUtil.getDefaultSize 3');
            u.assert(scrollbarUtil.getDefaultSize(1 /* Y */) >= 0, 'ScrollbarUtil.getDefaultSize 4');

            var scrolling = jQuery('<div style="overflow-x: scroll; overflow-y: scroll">');
            var scrolling2 = jQuery('<div style="overflow: scroll">');
            var nonScrolling = jQuery('<div style="overflow-x: hidden; overflow-y: hidden">');
            var nonScrolling2 = jQuery('<div style="overflow-x: visible; overflow-y: visible">');
            var nonScrolling3 = jQuery('<div style="overflow: visible">');

            u.assert(illa.ScrollbarUtil.isVisibleOn(scrolling, 0 /* X */), 'ScrollbarUtil.isVisibleOn 1');
            u.assert(illa.ScrollbarUtil.isVisibleOn(scrolling, 1 /* Y */), 'ScrollbarUtil.isVisibleOn 2');
            u.assert(illa.ScrollbarUtil.isVisibleOn(nonScrolling, 0 /* X */) === false, 'ScrollbarUtil.isVisibleOn 3');
            u.assert(illa.ScrollbarUtil.isVisibleOn(nonScrolling, 1 /* Y */) === false, 'ScrollbarUtil.isVisibleOn 4');
            u.assert(illa.ScrollbarUtil.isVisibleOn(nonScrolling2, 0 /* X */) === false, 'ScrollbarUtil.isVisibleOn 5');
            u.assert(illa.ScrollbarUtil.isVisibleOn(nonScrolling2, 1 /* Y */) === false, 'ScrollbarUtil.isVisibleOn 6');
            u.assert(illa.ScrollbarUtil.isVisibleOn(scrolling2, 0 /* X */), 'ScrollbarUtil.isVisibleOn 7');
            u.assert(illa.ScrollbarUtil.isVisibleOn(scrolling2, 1 /* Y */), 'ScrollbarUtil.isVisibleOn 8');
            u.assert(illa.ScrollbarUtil.isVisibleOn(nonScrolling3, 0 /* X */) === false, 'ScrollbarUtil.isVisibleOn 9');
            u.assert(illa.ScrollbarUtil.isVisibleOn(nonScrolling3, 1 /* Y */) === false, 'ScrollbarUtil.isVisibleOn 10');

            u.assert(illa.isString('undefined'), 'isString 1');
            u.assert(illa.isString(true) === false, 'isString 2');

            u.assert(illa.isBoolean(true), 'isBoolean 1');
            u.assert(illa.isBoolean(false), 'isBoolean 2');
            u.assert(illa.isBoolean('true') === false, 'isBoolean 3');
            u.assert(illa.isBoolean(1) === false, 'isBoolean 4');

            u.assert(illa.isNumber(0), 'isNumber 1');
            u.assert(illa.isNumber(NaN), 'isNumber 2');
            u.assert(illa.isNumber(Infinity), 'isNumber 3');
            u.assert(illa.isNumber('1') === false, 'isNumber 4');

            u.assert(illa.isArray([]), 'isArray 1');
            u.assert(illa.isArray(new Array()), 'isArray 2');
            u.assert(illa.isArray({ '0': 0, length: 1 }) === false, 'isArray 3');

            var arraySub = function () {
                Array.call(this);
            };
            arraySub.prototype = new Array();
            arraySub.prototype.constructor = Array;

            u.assert(illa.isArray(new arraySub()) === false, 'isArray 4');

            u.assert(illa.isFunction(function () {
            }), 'isFunction 1');
            u.assert(illa.isFunction(test1.Main), 'isFunction 2');
            u.assert(illa.isFunction(Function), 'isFunction 3');
            u.assert(illa.isFunction(new Function()), 'isFunction 4');
            u.assert(illa.isFunction({}) === false, 'isFunction 5');

            u.assert(illa.isNull(null), 'isNull 1');
            u.assert(illa.isNull(undefined) === false, 'isNull 2');
            u.assert(illa.isNull({}) === false, 'isNull 3');

            u.assert(illa.isUndefined(undefined), 'isUndefined 1');
            u.assert(illa.isUndefined(null) === false, 'isUndefined 2');
            u.assert(illa.isUndefined('undefined') === false, 'isUndefined 3');

            u.assert(illa.isUndefinedOrNull(undefined), 'isUndefinedOrNull 1');
            u.assert(illa.isUndefinedOrNull(null), 'isUndefinedOrNull 2');
            u.assert(illa.isUndefinedOrNull('undefined') === false, 'isUndefinedOrNull 3');
            u.assert(illa.isUndefinedOrNull('null') === false, 'isUndefinedOrNull 4');

            u.assert(illa.isObjectNotNull({}), 'isObjectNotNull 1');
            u.assert(illa.isObjectNotNull([]), 'isObjectNotNull 2');
            u.assert(illa.isObjectNotNull(function () {
            }), 'isObjectNotNull 3');
            u.assert(illa.isObjectNotNull(null) === false, 'isObjectNotNull 4');
            u.assert(illa.isObjectNotNull(undefined) === false, 'isObjectNotNull 5');
            u.assert(illa.isObjectNotNull(NaN) === false, 'isObjectNotNull 6');
            u.assert(illa.isObjectNotNull('foo') === false, 'isObjectNotNull 7');

            u.assert(illa.as(Main, this) === this, 'as 1');
            u.assert(illa.as(illa.Ivent, this) === null, 'as 2');
            var ivent = new illa.Ivent('test', null);
            u.assert(illa.as(illa.Ivent, ivent) === ivent, 'as 3');

            var fun = illa.bind(function (suffix) {
                return this.prefix + suffix;
            }, { prefix: 'foo' });
            u.assert(fun('bar') === 'foobar', 'bind 1');

            u.assertThrowsError(function () {
                illa.bind(null, {});
            }, 'bind 2');

            u.assert(illa.StringUtil.escapeHTML('<h1>"T&amp;C\'s"</h1>') === '&lt;h1&gt;&quot;T&amp;amp;C&#39;s&quot;&lt;/h1&gt;', 'StringUtil.escapeHTML 1');

            u.assert(illa.StringUtil.castNicely(undefined) === '', 'StringUtil.castNicely 1');
            u.assert(illa.StringUtil.castNicely(null) === '', 'StringUtil.castNicely 2');
            u.assert(illa.StringUtil.castNicely({ toString: function () {
                    return 'Nice.';
                } }) === 'Nice.', 'StringUtil.castNicely 3');
            u.assert(illa.StringUtil.castNicely('foo') === 'foo', 'StringUtil.castNicely 4');

            u.printStats();

            u = this.unitTest = new illa.UnitTest(jQuery('body'));
            u.info('Testing Ticker...');

            this.ticker = new illa.Ticker();
            this.ticker.addIventCallback(illa.Ticker.EVENT_TICK, this.onTick1, this);
        };

        Main.prototype.onTick1 = function (e) {
            this.unitTest.assert(this.ticker.getTickCount() === 1, 'Ticker 1');
            this.ticker.removeIventCallback(illa.Ticker.EVENT_TICK, this.onTick1, this);
            this.ticker.addIventCallback(illa.Ticker.EVENT_TICK, this.onTick2, this);
            this.ticker.addIventCallback(illa.Ticker.EVENT_TICK, this.onTick3, this);
        };

        Main.prototype.onTick2 = function (e) {
            this.unitTest.assert(this.ticker.getTickCount() === 2, 'Ticker 2');
        };

        Main.prototype.onTick3 = function (e) {
            this.unitTest.assert(this.ticker.getTickCount() === 2, 'Ticker 3');
            this.ticker.removeAllIventCallbacks();
            this.ticker.addIventCallback(illa.Ticker.EVENT_TICK, this.onTick4, this);
            this.ticker.addIventCallback(illa.Ticker.EVENT_TICK, this.onTick5, this);
        };

        Main.prototype.onTick4 = function (e) {
            this.unitTest.assert(this.ticker.getTickCount() === 3, 'Ticker 4');
            e.setStopImmediatePropagation(true);
            this.ticker.removeIventCallback(illa.Ticker.EVENT_TICK, this.onTick4, this);
        };

        Main.prototype.onTick5 = function (e) {
            this.unitTest.assert(this.ticker.getTickCount() === 4, 'Ticker 5');
            this.ticker.setIsStarted(false);
            setTimeout(jQuery.proxy(this.onTickerFinished, this), 500);
        };

        Main.prototype.onTickerFinished = function () {
            this.unitTest.assert(this.ticker.getTickCount() === 4, 'Ticker 6');
            this.unitTest.printStats();
        };
        return Main;
    })();
    test1.Main = Main;
})(test1 || (test1 = {}));

var test1Main = new test1.Main();
