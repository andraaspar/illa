var illa;
(function (illa) {
    /**
     * A reference to the global object.
     * This is the window in a browser, and the global in node.
     */
    illa.GLOBAL = (function () {
        return this;
    })();
    illa.classByType = (function () {
        var classes = 'Boolean Number String Function Array Date RegExp Object Error'.split(' ');
        var result = {};
        for (var i = 0, n = classes.length; i < n; i++) {
            result['[object ' + classes[i] + ']'] = classes[i].toLowerCase();
        }
        return result;
    })();
    /**
     * Returns true if the value is a string primitive.
     */
    function isString(v) {
        return typeof v == 'string';
    }
    illa.isString = isString;
    /**
     * Returns true if the value is a boolean primitive.
     */
    function isBoolean(v) {
        return typeof v == 'boolean';
    }
    illa.isBoolean = isBoolean;
    /**
     * Returns true if the value is a number primitive.
     */
    function isNumber(v) {
        return typeof v == 'number';
    }
    illa.isNumber = isNumber;
    /**
     * Returns true if the value is a function.
     */
    function isFunction(v) {
        return typeof v == 'function';
    }
    illa.isFunction = isFunction;
    /**
     * Returns true if the value is an array.
     * Array subclasses are not recognized as arrays.
     */
    function isArray(v) {
        return illa.getType(v) == 'array';
    }
    illa.isArray = isArray;
    if (Array.isArray)
        illa.isArray = Array.isArray;
    /**
     * Returns true if the value is undefined.
     */
    function isUndefined(v) {
        return typeof v == 'undefined';
    }
    illa.isUndefined = isUndefined;
    /**
     * Returns true if the value is null.
     */
    function isNull(v) {
        return v === null;
    }
    illa.isNull = isNull;
    /**
     * Returns true if the value is undefined or null.
     */
    function isUndefinedOrNull(v) {
        return typeof v == 'undefined' || v === null;
    }
    illa.isUndefinedOrNull = isUndefinedOrNull;
    /**
     * Returns true if the value is an object and not null. Includes functions.
     */
    function isObjectNotNull(v) {
        var t = typeof v;
        return t == 'object' && v !== null || t == 'function';
    }
    illa.isObjectNotNull = isObjectNotNull;
    /**
     * Returns the type of value.
     */
    function getType(v) {
        var result = '';
        if (v == null) {
            result = v + '';
        }
        else {
            result = typeof v;
            if (result == 'object' || result == 'function') {
                result = illa.classByType[illa.classByType.toString.call(v)] || 'object';
            }
        }
        return result;
    }
    illa.getType = getType;
    /**
     * Returns the value if ‘instanceof’ is true for the given constructor.
     */
    function as(c, v) {
        return v instanceof c ? v : null;
    }
    illa.as = as;
    function bind(fn, obj) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (!fn)
            throw 'No function.';
        return function () {
            return fn.apply(obj, args.concat(Array.prototype.slice.call(arguments)));
        };
    }
    illa.bind = bind;
    /**
     * Binds a function to a ‘this’ context, and also prepends the specified arguments.
     * This is not type safe.
     */
    function bindUnsafe(fn, obj) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return illa.bind.call(this, arguments);
    }
    illa.bindUnsafe = bindUnsafe;
    if (Function.prototype.bind) {
        illa.bind = illa.bindUnsafe = function (fn) {
            return fn.call.apply(fn.bind, arguments);
        };
    }
})(illa || (illa = {}));
var illa;
(function (illa) {
    var ArrayUtil = (function () {
        function ArrayUtil() {
        }
        ArrayUtil.indexOf = function (a, v, fromIndex) {
            if (Array.prototype.indexOf) {
                return Array.prototype.indexOf.call(a, v, fromIndex);
            }
            else {
                var length = a.length;
                if (fromIndex == null) {
                    fromIndex = 0;
                }
                else if (fromIndex < 0) {
                    fromIndex = Math.max(0, length + fromIndex);
                }
                for (var i = fromIndex; i < length; i++) {
                    if (a[i] === v) {
                        return i;
                    }
                }
            }
            return -1;
        };
        ArrayUtil.removeFirst = function (a, v) {
            var i = this.indexOf(a, v);
            var removed = i >= 0;
            if (removed) {
                a.splice(i, 1)[0];
            }
            return removed;
        };
        ArrayUtil.removeAll = function (a, v) {
            var removed = false;
            for (var i = a.length - 1; i >= 0; i--) {
                if (a[i] === v) {
                    a.splice(i, 1);
                    removed = true;
                }
            }
            return removed;
        };
        return ArrayUtil;
    })();
    illa.ArrayUtil = ArrayUtil;
})(illa || (illa = {}));
var illa;
(function (illa) {
    var NumberUtil = (function () {
        function NumberUtil() {
        }
        NumberUtil.toStringNoLetters = function (num) {
            var result = '';
            if (!isNaN(num) && isFinite(num)) {
                if (Math.abs(num) < 1.0) {
                    var e = parseInt(num.toString().split('e-')[1]);
                    if (e) {
                        num *= Math.pow(10, e - 1);
                        result = '0.' + (new Array(e)).join('0') + num.toString().substring(2);
                    }
                    else {
                        result = num + '';
                    }
                }
                else {
                    var e = parseInt(num.toString().split('+')[1]);
                    if (e > 20) {
                        e -= 20;
                        num /= Math.pow(10, e);
                        result = num + (new Array(e + 1)).join('0');
                    }
                    else {
                        result = num + '';
                    }
                }
            }
            return result;
        };
        return NumberUtil;
    })();
    illa.NumberUtil = NumberUtil;
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
        StringUtil.trim = function (str) {
            return str.replace(/^\s+|\s+$/g, '');
        };
        StringUtil.escapeRegExp = function (str) {
            return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        };
        StringUtil.CHAR_TO_HTML = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;' // IE8 does not support &apos;
        };
        return StringUtil;
    })();
    illa.StringUtil = StringUtil;
})(illa || (illa = {}));
/// <reference path='_module.ts'/>
/// <reference path='NumberUtil.ts'/>
/// <reference path='StringUtil.ts'/>
var illa;
(function (illa) {
    var Arrkup = (function () {
        function Arrkup(source, allowRaw) {
            if (allowRaw === void 0) { allowRaw = true; }
            this.source = source;
            this.allowRaw = allowRaw;
        }
        Arrkup.prototype.createString = function () {
            return this.processArrkup(this.getSource());
        };
        Arrkup.prototype.processArrkup = function (source) {
            var result = '';
            if (illa.isArray(source)) {
                var sourceArr = source;
                if (illa.isString(sourceArr[0])) {
                    result = this.processTag(sourceArr);
                }
                else if (illa.isArray(sourceArr[0])) {
                    result = this.processGroup(sourceArr);
                }
                else if (illa.isNull(sourceArr[0])) {
                    if (this.getAllowRaw()) {
                        result = this.processRaw(sourceArr);
                    }
                }
            }
            else {
                result = this.processNonArrkup(source);
            }
            return result;
        };
        Arrkup.prototype.processTag = function (source) {
            var tagName = source[0];
            var isSelfClosing = tagName.charAt(tagName.length - 1) == '/';
            if (isSelfClosing)
                tagName = tagName.slice(0, -1);
            var result = '<' + tagName;
            var hasAttributes = illa.isObjectNotNull(source[1]) && !illa.isArray(source[1]);
            if (hasAttributes)
                result += this.processAttributes(source[1]);
            var contentIndex = hasAttributes ? 2 : 1;
            if (isSelfClosing) {
                result += '/>';
            }
            else {
                result += '>';
                result += this.processChildren(source, contentIndex);
                result += '</' + tagName + '>';
            }
            return result;
        };
        Arrkup.prototype.processGroup = function (source) {
            return this.processChildren(source, 0);
        };
        Arrkup.prototype.processRaw = function (source) {
            var result = '';
            for (var i = 1, n = source.length; i < n; i++) {
                result += source[i] + '';
            }
            return result;
        };
        Arrkup.prototype.processNonArrkup = function (source) {
            return illa.StringUtil.escapeHTML(source + '');
        };
        Arrkup.prototype.processAttributes = function (rawProps) {
            var result = '';
            for (var prop in rawProps) {
                if (rawProps.hasOwnProperty(prop)) {
                    result += this.processAttribute(prop, rawProps[prop]);
                }
            }
            return result;
        };
        Arrkup.prototype.processAttribute = function (key, value) {
            var result = '';
            if (key) {
                if (illa.isNumber(value)) {
                    value = illa.NumberUtil.toStringNoLetters(value);
                }
                if (illa.isString(value)) {
                    result = ' ' + key + '="' + illa.StringUtil.escapeHTML(value) + '"';
                }
                else if (illa.isBoolean(value)) {
                    if (value) {
                        result += ' ' + key;
                    }
                }
            }
            return result;
        };
        Arrkup.prototype.processChildren = function (rawChildren, startIndex) {
            var result = '';
            for (var i = startIndex, n = rawChildren.length; i < n; i++) {
                result += this.processArrkup(rawChildren[i]);
            }
            return result;
        };
        Arrkup.prototype.getSource = function () {
            return this.source;
        };
        Arrkup.prototype.setSource = function (value) {
            this.source = value;
        };
        Arrkup.prototype.getAllowRaw = function () {
            return this.allowRaw;
        };
        Arrkup.prototype.setAllowRaw = function (flag) {
            this.allowRaw = flag;
        };
        Arrkup.createString = function (source, allowRaw) {
            if (allowRaw === void 0) { allowRaw = true; }
            return new Arrkup(source, allowRaw).createString();
        };
        return Arrkup;
    })();
    illa.Arrkup = Arrkup;
})(illa || (illa = {}));
/// <reference path='_module.ts'/>
var illa;
(function (illa) {
    var Log = (function () {
        function Log() {
        }
        Log.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var console = illa.GLOBAL.console;
            if (console && console.log) {
                if (console.log.apply) {
                    console.log.apply(console, args);
                }
                else {
                    console.log(args.join(' '));
                }
            }
        };
        Log.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var console = illa.GLOBAL.console;
            if (console && console.info) {
                if (console.info.apply) {
                    console.info.apply(console, args);
                }
                else {
                    console.info(args.join(' '));
                }
            }
            else {
                Log.log.apply(this, args);
            }
        };
        Log.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var console = illa.GLOBAL.console;
            if (console && console.warn) {
                if (console.warn.apply) {
                    console.warn.apply(console, args);
                }
                else {
                    console.warn(args.join(' '));
                }
            }
            else {
                Log.log.apply(this, args);
            }
        };
        Log.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var console = illa.GLOBAL.console;
            if (console && console.error) {
                if (console.error.apply) {
                    console.error.apply(console, args);
                }
                else {
                    console.error(args.join(' '));
                }
            }
            else {
                Log.log.apply(this, args);
            }
        };
        Log.logIf = function (test) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (test) {
                Log.log.apply(this, [test].concat(args));
            }
        };
        Log.infoIf = function (test) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (test) {
                Log.info.apply(this, [test].concat(args));
            }
        };
        Log.warnIf = function (test) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (test) {
                Log.warn.apply(this, [test].concat(args));
            }
        };
        Log.errorIf = function (test) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (test) {
                Log.error.apply(this, [test].concat(args));
            }
        };
        return Log;
    })();
    illa.Log = Log;
})(illa || (illa = {}));
/// <reference path='ArrayUtil.ts'/>
var illa;
(function (illa) {
    var Map = (function () {
        function Map(keys, values) {
            if (keys === void 0) { keys = []; }
            if (values === void 0) { values = []; }
            this.keys = keys;
            this.values = values;
        }
        Map.prototype.set = function (key, value) {
            var index = illa.ArrayUtil.indexOf(this.keys, key);
            if (index == -1) {
                index = this.keys.push(key) - 1;
            }
            this.values[index] = value;
        };
        Map.prototype.get = function (key) {
            var index = illa.ArrayUtil.indexOf(this.keys, key);
            return this.values[index];
        };
        Map.prototype.remove = function (key) {
            var index = illa.ArrayUtil.indexOf(this.keys, key);
            if (index != -1) {
                this.keys.splice(index, 1);
                this.values.splice(index, 1);
            }
        };
        Map.prototype.removeAll = function () {
            this.keys = [];
            this.values = [];
        };
        Map.prototype.setAll = function (map) {
            var newKeys = map.getKeys();
            var newValues = map.getValues();
            for (var i = 0, n = newKeys.length; i < n; i++) {
                var newKey = newKeys[i];
                var newValue = newValues[i];
                this.set(newKey, newValue);
            }
        };
        Map.prototype.getLength = function () {
            return this.keys.length;
        };
        Map.prototype.getKeys = function () {
            return this.keys;
        };
        Map.prototype.getValues = function () {
            return this.values;
        };
        return Map;
    })();
    illa.Map = Map;
})(illa || (illa = {}));
/// <reference path='_module.ts'/>
var illa;
(function (illa) {
    var ObjectUtil = (function () {
        function ObjectUtil() {
        }
        ObjectUtil.getKeys = function (obj) {
            var result = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    result.push(key);
                }
            }
            return result;
        };
        ObjectUtil.getKeyOfValue = function (obj, value) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key) && obj[key] === value) {
                    return key;
                }
            }
            return '';
        };
        ObjectUtil.getKeysOfValue = function (obj, value) {
            var result = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key) && obj[key] === value) {
                    result.push(key);
                }
            }
            return result;
        };
        return ObjectUtil;
    })();
    illa.ObjectUtil = ObjectUtil;
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
    (function (Alignment) {
        Alignment[Alignment["START"] = 0] = "START";
        Alignment[Alignment["CENTER"] = 1] = "CENTER";
        Alignment[Alignment["END"] = 2] = "END";
    })(illa.Alignment || (illa.Alignment = {}));
    var Alignment = illa.Alignment;
})(illa || (illa = {}));
/// <reference path='Axis2D.ts'/>
/// <reference path='Alignment.ts'/>
var illa;
(function (illa) {
    var Rectangle = (function () {
        function Rectangle(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            if (width < 0) {
                throw 'Invalid width.';
            }
            if (height < 0) {
                throw 'Invalid height.';
            }
        }
        Rectangle.prototype.getOffset = function (axis, alignment) {
            if (alignment === void 0) { alignment = 0 /* START */; }
            var offset = NaN;
            switch (axis) {
                case 0 /* X */:
                    offset = this.x;
                    break;
                case 1 /* Y */:
                    offset = this.y;
                    break;
            }
            switch (alignment) {
                case 1 /* CENTER */:
                    offset += this.getSize(axis) / 2;
                    break;
                case 2 /* END */:
                    offset += this.getSize(axis);
                    break;
            }
            return offset;
        };
        Rectangle.prototype.getSize = function (axis) {
            var result = NaN;
            switch (axis) {
                case 0 /* X */:
                    result = this.width;
                    break;
                case 1 /* Y */:
                    result = this.height;
                    break;
            }
            return result;
        };
        Rectangle.prototype.equals = function (value) {
            return !!value && value.getOffset(0 /* X */) == this.getOffset(0 /* X */) && value.getOffset(1 /* Y */) == this.getOffset(1 /* Y */) && value.getSize(0 /* X */) == this.getSize(0 /* X */) && value.getSize(1 /* Y */) == this.getSize(1 /* Y */);
        };
        Rectangle.prototype.toString = function () {
            return '[illa.Rectangle x=' + this.getOffset(0 /* X */) + ' y=' + this.getOffset(1 /* Y */) + ' width=' + this.getSize(0 /* X */) + ' height=' + this.getSize(1 /* Y */) + ']';
        };
        Rectangle.prototype.expand = function (top, right, bottom, left) {
            return new Rectangle(this.getOffset(0 /* X */) - left, this.getOffset(1 /* Y */) - top, this.getSize(0 /* X */) + left + right, this.getSize(1 /* Y */) + top + bottom);
        };
        Rectangle.prototype.containsRect = function (rect) {
            var result = false;
            if (rect) {
                result = true;
                for (var axis = 0 /* X */; axis <= 1 /* Y */; axis++) {
                    if (rect.getOffset(axis, 0 /* START */) < this.getOffset(axis, 0 /* START */) || rect.getOffset(axis, 2 /* END */) > this.getOffset(axis, 2 /* END */)) {
                        result = false;
                        break;
                    }
                }
            }
            return result;
        };
        Rectangle.prototype.contains = function (x, y) {
            return x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + this.height;
        };
        return Rectangle;
    })();
    illa.Rectangle = Rectangle;
})(illa || (illa = {}));
/// <reference path='IEventCallback.ts'/>
var illa;
(function (illa) {
    var EventCallbackReg = (function () {
        function EventCallbackReg(callback, thisObj) {
            this.callback = callback;
            this.thisObj = thisObj;
        }
        return EventCallbackReg;
    })();
    illa.EventCallbackReg = EventCallbackReg;
})(illa || (illa = {}));
/// <reference path='IEventCallback.ts'/>
/// <reference path='EventCallbackReg.ts'/>
/// <reference path='IEventHandler.ts'/>
var illa;
(function (illa) {
    var Event = (function () {
        function Event(type, target) {
            this.type = type;
            this.target = target;
            this.isPropagationStopped = false;
            this.isImmediatePropagationStopped = false;
        }
        Event.prototype.dispatch = function () {
            this.processHandler(this.target);
        };
        Event.prototype.processHandler = function (handler) {
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
        Event.prototype.getType = function () {
            return this.type;
        };
        Event.prototype.getTarget = function () {
            return this.target;
        };
        Event.prototype.getCurrentTarget = function () {
            return this.currentTarget;
        };
        Event.prototype.setIsPropagationStopped = function (flag) {
            this.isPropagationStopped = flag;
        };
        Event.prototype.getIsPropagationStopped = function () {
            return this.isPropagationStopped;
        };
        Event.prototype.setStopImmediatePropagation = function (flag) {
            this.isImmediatePropagationStopped = flag;
        };
        Event.prototype.getIsImmediatePropagationStopped = function () {
            return this.isImmediatePropagationStopped;
        };
        return Event;
    })();
    illa.Event = Event;
})(illa || (illa = {}));
/// <reference path='IEventHandler.ts'/>
var illa;
(function (illa) {
    var EventHandler = (function () {
        function EventHandler() {
            this.callbacksByType = {};
        }
        EventHandler.prototype.getCallbackRegsByType = function (type) {
            var result = this.callbacksByType[type];
            if (!illa.isArray(result))
                result = [];
            return result;
        };
        EventHandler.prototype.getEventParent = function () {
            return null;
        };
        EventHandler.prototype.addEventCallback = function (type, cb, thisObj) {
            var reg = new illa.EventCallbackReg(cb, thisObj);
            if (illa.isArray(this.callbacksByType[type])) {
                this.removeEventCallback(type, cb, thisObj);
                this.callbacksByType[type].push(reg);
            }
            else {
                this.callbacksByType[type] = [reg];
            }
        };
        EventHandler.prototype.removeEventCallback = function (type, cb, thisObj) {
            var callbacks = this.callbacksByType[type];
            if (illa.isArray(callbacks)) {
                for (var i = 0, n = callbacks.length; i < n; i++) {
                    var callback = callbacks[i];
                    if (callback.callback === cb && callback.thisObj === thisObj) {
                        callbacks.splice(i, 1);
                        break;
                    }
                }
            }
        };
        EventHandler.prototype.removeAllEventCallbacks = function () {
            this.callbacksByType = {};
        };
        return EventHandler;
    })();
    illa.EventHandler = EventHandler;
})(illa || (illa = {}));
/// <reference path='_module.ts'/>
/// <reference path='Event.ts'/>
/// <reference path='EventHandler.ts'/>
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
            this.supportsAnimationFrame = illa.isFunction(illa.GLOBAL.requestAnimationFrame) && illa.isFunction(illa.GLOBAL.cancelAnimationFrame);
            this.onTickBound = illa.bind(this.onTick, this);
            this.tickCount = 0;
            this.setIsStarted(true);
        }
        Ticker.prototype.getIsStarted = function () {
            return !illa.isUndefined(this.intervalID);
        };
        Ticker.prototype.setIsStarted = function (flag) {
            if (this.getIsStarted() == flag)
                return;
            if (flag) {
                if (this.supportsAnimationFrame) {
                    this.intervalID = requestAnimationFrame(this.onTickBound);
                }
                else {
                    this.intervalID = setInterval(this.onTickBound, 1000 / 60);
                }
            }
            else {
                if (this.supportsAnimationFrame) {
                    cancelAnimationFrame(this.intervalID);
                }
                else {
                    clearInterval(this.intervalID);
                }
                this.intervalID = undefined;
            }
        };
        Ticker.prototype.getSupportsAnimationFrame = function () {
            return this.supportsAnimationFrame;
        };
        Ticker.prototype.onTick = function () {
            new illa.Event(Ticker.EVENT_BEFORE_TICK, this).dispatch();
            this.tickCount++;
            if (this.supportsAnimationFrame) {
                this.intervalID = requestAnimationFrame(this.onTickBound);
            }
            new illa.Event(Ticker.EVENT_TICK, this).dispatch();
            new illa.Event(Ticker.EVENT_AFTER_TICK, this).dispatch();
        };
        Ticker.prototype.getTickCount = function () {
            return this.tickCount;
        };
        Ticker.EVENT_BEFORE_TICK = 'illa_Ticker_EVENT_BEFORE_TICK';
        Ticker.EVENT_TICK = 'illa_Ticker_EVENT_TICK';
        Ticker.EVENT_AFTER_TICK = 'illa_Ticker_EVENT_AFTER_TICK';
        return Ticker;
    })(illa.EventHandler);
    illa.Ticker = Ticker;
})(illa || (illa = {}));
/// <reference path='_module.ts'/>
/// <reference path='Log.ts'/>
var illa;
(function (illa) {
    var UnitTest = (function () {
        function UnitTest() {
            this.testCount = 0;
            this.successCount = 0;
            this.failCount = 0;
        }
        UnitTest.prototype.assert = function (test, desc) {
            if (desc === void 0) { desc = ''; }
            this.testCount++;
            if (test === true) {
                this.successCount++;
            }
            else {
                this.failCount++;
                if (desc) {
                    this.warn('Test failed: ' + desc);
                }
                else {
                    throw 'Test failed.';
                }
            }
            return test;
        };
        UnitTest.prototype.assertThrowsError = function (fn, desc) {
            if (desc === void 0) { desc = ''; }
            var errorThrown = false;
            try {
                fn();
            }
            catch (e) {
                errorThrown = true;
            }
            return this.assert(errorThrown, desc);
        };
        UnitTest.prototype.assertEquals = function (received, expected, desc) {
            if (desc === void 0) { desc = ''; }
            var result = this.assert(received === expected, desc);
            if (!result) {
                this.info('Received:', received);
                this.info('Expected:', expected);
            }
            return result;
        };
        UnitTest.prototype.printStats = function () {
            this.info(this.testCount + ' tests completed: ' + this.successCount + ' succeeded, ' + this.failCount + ' failed.');
        };
        UnitTest.prototype.info = function () {
            var r = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                r[_i - 0] = arguments[_i];
            }
            illa.Log.info.apply(illa.Log, r);
        };
        UnitTest.prototype.warn = function () {
            var r = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                r[_i - 0] = arguments[_i];
            }
            illa.Log.warn.apply(illa.Log, r);
        };
        return UnitTest;
    })();
    illa.UnitTest = UnitTest;
})(illa || (illa = {}));
/// <reference path='../../src/illa/_module.ts'/>
/// <reference path='../../src/illa/ArrayUtil.ts'/>
/// <reference path='../../src/illa/Arrkup.ts'/>
/// <reference path='../../src/illa/Log.ts'/>
/// <reference path='../../src/illa/Map.ts'/>
/// <reference path='../../src/illa/NumberUtil.ts'/>
/// <reference path='../../src/illa/ObjectUtil.ts'/>
/// <reference path='../../src/illa/Rectangle.ts'/>
/// <reference path='../../src/illa/StringUtil.ts'/>
/// <reference path='../../src/illa/Ticker.ts'/>
/// <reference path='../../src/illa/UnitTest.ts'/>
var test1;
(function (test1) {
    var Main = (function () {
        function Main() {
            var u = this.unitTest = new illa.UnitTest();
            u.info('Testing...');
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
            u.assert(illa.as(illa.Event, this) === null, 'as 2');
            var ivent = new illa.Event('test', null);
            u.assert(illa.as(illa.Event, ivent) === ivent, 'as 3');
            (function () {
                var fun = illa.bind(function (suffix) {
                    return this.prefix + suffix;
                }, { prefix: 'foo' });
                u.assert(fun('bar') === 'foobar', 'bind 1');
            })();
            u.assertThrowsError(function () {
                illa.bind(null, {});
            }, 'bind 2');
            (function () {
                var fun = illa.bind(function (a, b) {
                    return a + b + this.c;
                }, { c: 'baz' }, 'foo');
                u.assert(fun('bar') === 'foobarbaz', 'bind 2');
            })();
            u.assertThrowsError(function () {
                illa.bind(null, {});
            }, 'bind 3');
            u.assert(illa.isFunction(illa.GLOBAL.isNaN), 'GLOBAL 1');
            u.assert(illa.StringUtil.escapeHTML('<h1>"T&amp;C\'s"</h1>') === '&lt;h1&gt;&quot;T&amp;amp;C&#39;s&quot;&lt;/h1&gt;', 'StringUtil.escapeHTML 1');
            u.assert(illa.StringUtil.escapeRegExp('^[a-z]*?[0-9]{1,3}\\d$') === '\\^\\[a\\-z\\]\\*\\?\\[0\\-9\\]\\{1,3\\}\\\\d\\$', 'StringUtil.escapeRegExp 1');
            u.assert(illa.StringUtil.castNicely(undefined) === '', 'StringUtil.castNicely 1');
            u.assert(illa.StringUtil.castNicely(null) === '', 'StringUtil.castNicely 2');
            u.assert(illa.StringUtil.castNicely({ toString: function () {
                return 'Nice.';
            } }) === 'Nice.', 'StringUtil.castNicely 3');
            u.assert(illa.StringUtil.castNicely('foo') === 'foo', 'StringUtil.castNicely 4');
            u.assert(illa.StringUtil.trim('  foo   ') === 'foo', 'StringUtil.trim 1');
            u.assert(illa.StringUtil.trim('\t\r\nfoo\r\n\t') === 'foo', 'StringUtil.trim 2');
            u.assert(illa.NumberUtil.toStringNoLetters(0) === '0', 'NumberUtil.toStringNoLetters 1');
            u.assert(illa.NumberUtil.toStringNoLetters(NaN) === '', 'NumberUtil.toStringNoLetters 2');
            u.assert(illa.NumberUtil.toStringNoLetters(Infinity) === '', 'NumberUtil.toStringNoLetters 3');
            u.assert(illa.NumberUtil.toStringNoLetters(-Infinity) === '', 'NumberUtil.toStringNoLetters 4');
            u.assert(illa.NumberUtil.toStringNoLetters(1234.5678) === '1234.5678', 'NumberUtil.toStringNoLetters 5');
            u.assert(illa.NumberUtil.toStringNoLetters(-1234.5678) === '-1234.5678', 'NumberUtil.toStringNoLetters 6');
            u.assert(illa.NumberUtil.toStringNoLetters(1e21) === '1000000000000000000000', 'NumberUtil.toStringNoLetters 7');
            u.assert(illa.NumberUtil.toStringNoLetters(1e-7) === '0.00000009999999999999999', 'NumberUtil.toStringNoLetters 8');
            u.assert(illa.ArrayUtil.indexOf(['foo', 'bar', 'baz', 'foo'], 'foo') === 0, 'ArrayUtil.indexOf 1');
            u.assert(illa.ArrayUtil.indexOf(['foo', 'bar', 'baz', 'foo'], 'quux') === -1, 'ArrayUtil.indexOf 2');
            u.assert(illa.ArrayUtil.indexOf(['foo', 'bar', 'baz', 'foo'], undefined) === -1, 'ArrayUtil.indexOf 3');
            u.assert(illa.ArrayUtil.indexOf(['foo', 'bar', 'baz', 'foo'], NaN) === -1, 'ArrayUtil.indexOf 4');
            u.assert(illa.ArrayUtil.indexOf(['foo', 'bar', 'baz', 'foo'], false) === -1, 'ArrayUtil.indexOf 5');
            u.assert(illa.ArrayUtil.indexOf([0, 1, NaN, 3], NaN) === -1, 'ArrayUtil.indexOf 6');
            u.assert(illa.ArrayUtil.indexOf([0, 1, undefined, 3], undefined) === 2, 'ArrayUtil.indexOf 7');
            u.assert(illa.ArrayUtil.indexOf([0, 1, null, 3], null) === 2, 'ArrayUtil.indexOf 8');
            u.assert(illa.ArrayUtil.indexOf([0, 1, Infinity, 3], Infinity) === 2, 'ArrayUtil.indexOf 9');
            (function () {
                var testArr = ['foo', 'bar', 'baz', 'foo'];
                var removed = illa.ArrayUtil.removeFirst(testArr, 'foo');
                u.assert(testArr.length === 3, 'ArrayUtil.removeFirst 1');
                u.assert(testArr[0] === 'bar', 'ArrayUtil.removeFirst 2');
                u.assert(testArr[2] === 'foo', 'ArrayUtil.removeFirst 3');
                u.assert(removed, 'ArrayUtil.removeFirst 4');
            })();
            (function () {
                var testArr = ['foo', 'bar', 'baz', 'foo'];
                var removed = illa.ArrayUtil.removeFirst(testArr, 'quux');
                u.assert(testArr.length === 4, 'ArrayUtil.removeFirst 5');
                u.assert(removed === false, 'ArrayUtil.removeFirst 6');
            })();
            (function () {
                var testArr = ['foo', 'bar', 'baz', 'foo'];
                var removed = illa.ArrayUtil.removeAll(testArr, 'foo');
                u.assert(testArr.length === 2, 'ArrayUtil.removeAll 1');
                u.assert(testArr[0] === 'bar', 'ArrayUtil.removeAll 2');
                u.assert(testArr[1] === 'baz', 'ArrayUtil.removeAll 3');
                u.assert(removed, 'ArrayUtil.removeAll 4');
            })();
            (function () {
                var testMap = new illa.Map();
                testMap.set(0, 'zero');
                testMap.set(7.5, 'seven and a half');
                testMap.set(undefined, 'not a number');
                testMap.set(Infinity, 'infinity');
                testMap.set(-Infinity, 'negative infinity');
                u.assert(testMap.getLength() === 5, 'Map 1');
                u.assert(testMap.get(0) === 'zero', 'Map 2');
                u.assert(testMap.get(7.5) === 'seven and a half', 'Map 3');
                u.assert(testMap.get(undefined) === 'not a number', 'Map 4');
                u.assert(testMap.get(Infinity) === 'infinity', 'Map 5');
                u.assert(testMap.get(-Infinity) === 'negative infinity', 'Map 6');
                testMap.set(0, 'nothing');
                u.assert(testMap.getLength() === 5, 'Map 7');
                u.assert(testMap.get(0) === 'nothing', 'Map 8');
                testMap.remove(7.5);
                u.assert(testMap.getLength() === 4, 'Map 9');
                u.assert(illa.isUndefined(testMap.get(7.5)), 'Map 10');
                u.assert(testMap.get(undefined) === 'not a number', 'Map 11');
                testMap.setAll(new illa.Map([1, 2, 3], ['one', 'two', 'three']));
                u.assert(testMap.getLength() === 7, 'Map 12');
                u.assert(testMap.get(1) === 'one', 'Map 13');
                u.assert(testMap.get(2) === 'two', 'Map 14');
                u.assert(testMap.get(3) === 'three', 'Map 15');
                testMap.removeAll();
                u.assert(testMap.getLength() === 0, 'Map 16');
            })();
            (function () {
                var testMap = new illa.Map();
                var key1 = { id: 1 };
                var key2 = { id: 2 };
                testMap.set(key1, 'key 1');
                testMap.set(null, 'null');
                testMap.set(undefined, 'undefined');
                testMap.set(key2, 'key 2');
                u.assert(testMap.getLength() === 4, 'Map 17');
                u.assert(testMap.get(key1) === 'key 1', 'Map 18');
                u.assert(illa.isUndefined(testMap.get({ id: 1 })), 'Map 19');
                u.assert(testMap.get(key2) === 'key 2', 'Map 20');
                u.assert(testMap.get(null) === 'null', 'Map 21');
                u.assert(testMap.get(undefined) === 'undefined', 'Map 22');
            })();
            (function () {
                var testObj = { 'a': undefined, 'b': null, 'c': '', 'd': 0, 'e': Infinity, 'f': NaN, 'g': false, 'h': {}, 'i': [] };
                var keys = illa.ObjectUtil.getKeys(testObj);
                u.assert(keys.length === 9, 'ObjectUtil.getKeys 1');
                u.assert(keys[0] === 'a', 'ObjectUtil.getKeys 2');
                u.assert(keys[1] === 'b', 'ObjectUtil.getKeys 3');
                u.assert(keys[2] === 'c', 'ObjectUtil.getKeys 4');
                u.assert(keys[3] === 'd', 'ObjectUtil.getKeys 5');
                u.assert(keys[4] === 'e', 'ObjectUtil.getKeys 6');
                u.assert(keys[5] === 'f', 'ObjectUtil.getKeys 7');
                u.assert(keys[6] === 'g', 'ObjectUtil.getKeys 8');
                u.assert(keys[7] === 'h', 'ObjectUtil.getKeys 9');
                u.assert(keys[8] === 'i', 'ObjectUtil.getKeys 10');
                u.assert(illa.ObjectUtil.getKeyOfValue(testObj, {}) === '', 'ObjectUtil.getKeyOfValue 1');
                u.assert(illa.ObjectUtil.getKeyOfValue(testObj, undefined) === 'a', 'ObjectUtil.getKeyOfValue 2');
                u.assert(illa.ObjectUtil.getKeyOfValue(testObj, null) === 'b', 'ObjectUtil.getKeyOfValue 3');
                u.assert(illa.ObjectUtil.getKeyOfValue(testObj, '') === 'c', 'ObjectUtil.getKeyOfValue 4');
                u.assert(illa.ObjectUtil.getKeyOfValue(testObj, 0) === 'd', 'ObjectUtil.getKeyOfValue 5');
                u.assert(illa.ObjectUtil.getKeyOfValue(testObj, Infinity) === 'e', 'ObjectUtil.getKeyOfValue 6');
                u.assert(illa.ObjectUtil.getKeyOfValue(testObj, NaN) === '', 'ObjectUtil.getKeyOfValue 7');
                u.assert(illa.ObjectUtil.getKeyOfValue(testObj, false) === 'g', 'ObjectUtil.getKeyOfValue 8');
                u.assert(illa.ObjectUtil.getKeyOfValue(testObj, testObj['h']) === 'h', 'ObjectUtil.getKeyOfValue 9');
                u.assert(illa.ObjectUtil.getKeyOfValue(testObj, testObj['i']) === 'i', 'ObjectUtil.getKeyOfValue 10');
                u.assert(illa.ObjectUtil.getKeyOfValue(testObj, []) === '', 'ObjectUtil.getKeyOfValue 11');
                testObj['j'] = testObj['i'];
                var keysOfIArray = illa.ObjectUtil.getKeysOfValue(testObj, testObj['i']);
                u.assert(keysOfIArray.length === 2, 'ObjectUtil.getKeysOfValue 1');
                u.assert(keysOfIArray[0] === 'i', 'ObjectUtil.getKeysOfValue 2');
                u.assert(keysOfIArray[1] === 'j', 'ObjectUtil.getKeysOfValue 3');
                var keysOfNaN = illa.ObjectUtil.getKeysOfValue(testObj, NaN);
                u.assert(keysOfNaN.length === 0, 'ObjectUtil.getKeysOfValue 4');
                var keysOfFalse = illa.ObjectUtil.getKeysOfValue(testObj, false);
                u.assert(keysOfFalse.length === 1, 'ObjectUtil.getKeysOfValue 5');
                u.assert(keysOfFalse[0] === 'g', 'ObjectUtil.getKeysOfValue 6');
            })();
            (function () {
                var arrkup = [
                    [null, '<!DOCTYPE html>'],
                    ['html', ['head', ['meta/', { charset: 'UTF-8' }], ['title', 'Arrkup - get a <tag>']], ['body', ['h1', { 'class': 'my-h1 the-title' }, 'Arrkup & fun'], ['input/', { name: 'zero', value: 0 }], ['input/', { name: 'eight-point-three', value: 8.3 }], ['input/', { name: '1e21', value: 1e21 }], ['input/', { name: '1e-7', value: 1e-7 }], ['input/', { name: 'nan', value: NaN }], ['input/', { name: 'infinity', value: Infinity }], ['input/', { name: 'negative-infinity', value: -Infinity }], ['input/', { name: 'true', value: true }], ['input/', { name: 'false', value: false }], ['input/', { name: 'empty-string', value: '' }], [null, '<!-- Content START -->'], ['a', { href: 'http://example.com?foo=bar&baz=quux', title: 'I say, "Click me"' }, 'It\'s clicking time']]]
                ];
                var markup = '<!DOCTYPE html>' + '<html>' + '<head>' + '<meta charset="UTF-8"/>' + '<title>Arrkup - get a &lt;tag&gt;</title>' + '</head>' + '<body>' + '<h1 class="my-h1 the-title">Arrkup &amp; fun</h1>' + '<input name="zero" value="0"/>' + '<input name="eight-point-three" value="8.3"/>' + '<input name="1e21" value="1000000000000000000000"/>' + '<input name="1e-7" value="0.00000009999999999999999"/>' + '<input name="nan" value=""/>' + '<input name="infinity" value=""/>' + '<input name="negative-infinity" value=""/>' + '<input name="true" value/>' + '<input name="false"/>' + '<input name="empty-string" value=""/>' + '<!-- Content START -->' + '<a href="http://example.com?foo=bar&amp;baz=quux" title="I say, &quot;Click me&quot;">It&#39;s clicking time</a>' + '</body>' + '</html>';
                //illa.Log.log(illa.Arrkup.createString(arrkup));
                u.assert(illa.Arrkup.createString(arrkup) === markup, 'Arrkup 1');
            })();
            this.ticker = new illa.Ticker();
            this.ticker.addEventCallback(illa.Ticker.EVENT_TICK, this.onTick1, this);
        }
        Main.prototype.onTick1 = function (e) {
            this.unitTest.assert(this.ticker.getTickCount() === 1, 'Ticker 1');
            this.ticker.removeEventCallback(illa.Ticker.EVENT_TICK, this.onTick1, this);
            this.ticker.addEventCallback(illa.Ticker.EVENT_TICK, this.onTick2, this);
            this.ticker.addEventCallback(illa.Ticker.EVENT_TICK, this.onTick3, this);
        };
        Main.prototype.onTick2 = function (e) {
            this.unitTest.assert(this.ticker.getTickCount() === 2, 'Ticker 2');
        };
        Main.prototype.onTick3 = function (e) {
            this.unitTest.assert(this.ticker.getTickCount() === 2, 'Ticker 3');
            this.ticker.removeAllEventCallbacks();
            this.ticker.addEventCallback(illa.Ticker.EVENT_TICK, this.onTick4, this);
            this.ticker.addEventCallback(illa.Ticker.EVENT_TICK, this.onTick5, this);
        };
        Main.prototype.onTick4 = function (e) {
            this.unitTest.assert(this.ticker.getTickCount() === 3, 'Ticker 4');
            e.setStopImmediatePropagation(true);
            this.ticker.removeEventCallback(illa.Ticker.EVENT_TICK, this.onTick4, this);
        };
        Main.prototype.onTick5 = function (e) {
            this.unitTest.assert(this.ticker.getTickCount() === 4, 'Ticker 5');
            this.ticker.setIsStarted(false);
            setTimeout(illa.bind(this.onTickerFinished, this), 500);
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
