/*:
 * @target MZ
 * @plugindesc The manager of graphics.
 * @author Moiyri
 * @url https://github.com/Moiyri/LiyEngine
 * 
 * @help Liy_Graphics.js
 * VERSION: 1.0.0
 * 
 * This plugin is a module of LiyEngine, which manage graphics.
 * 
 * Multilayer System:
 * 1.Open Plugin Manager in editor, and select to settings of Liy_Graphics.
 * 2.Select Map Layer Setting, now you can double click a blank line to create a
 *   setting of one map by assigning ID of the map.
 * 3.Double click parameter Layers to edit properties of layers diplaying on map.
 * 4.Double click a blank line to create a new layer, to make sure which can be 
 *   displayed correctly, the parameter Layer Bitmap is required.
 * 5.Futher ways to make the multilayer better is using script, which include lots
 *   of method to manage your layer.
 * 
 * 
 * @param multilayer
 * @text Multilayer
 * 
 * @param mapLayerSetting
 * @text Map Layer Setting
 * @default []
 * @type struct<Map>[]
 * @parent multilayer
 * 
 * @param light
 * @text Light
 * 
 * @command mapLayer
 * @text Map Layer
 * 
 * @arg tag
 * @text Tag
 * 
 * @arg operation
 * @text Operation
 * @type select
 */

/*~struct~Map:
 *
 * @param mapId
 * @text Map Id
 * @type number
 * @default
 * 
 * @param layers
 * @text Layers
 * @type struct<LayerSprite>[]
 */

/*~struct~LayerSprite:
 * @param layerBitmap
 * @text Layer Bitmap
 * @default
 * @type file
 * @dir /img/pictures/
 * @help Bitmap to load.
 * 
 * @param mode
 * @text Mode
 * @type select
 * @option Follow
 * @value Follow
 * @option Normal
 * @value Normal
 * @default Normal
 * @help Ways to display sprite.
 * 
 * @param _mlTag
 * @text Tag
 * @default Default
 * @help Tag of layer to for locating.
 * 
 * @param mlParameters
 * @text Parameters
 * 
 * @param mlFollow
 * @text Follow Setting
 * 
 * @param originX
 * @text Origin X
 * @default 0
 * @parent tilling
 * 
 * @param originY
 * @text Origin Y
 * @default 0
 * @parent tilling
 * 
 * @param x
 * @text X
 * @default 0
 * @parent mlParameters
 * 
 * @param offsetRateX
 * @text Offset Rate X
 * @default 1
 * @parent mlFollow
 * @help Follow Mode Only.
 * 
 * @param y
 * @text Y
 * @default 0
 * @parent mlParameters
 * 
 * @param offsetRateY
 * @text Offset Rate Y
 * @default 1
 * @parent mlFollow
 * 
 * @param z
 * @text Z
 * @default 0
 * @parent mlParameters
 * 
 * @param scaleX
 * @text Scale X （%）
 * @default 100
 * @type number
 * @min 0
 * @parent mlParameters
 * 
 * @param scaleY
 * @text Scale Y （%）
 * @default 100
 * @type number
 * @min 0
 * @parent mlParameters
 * 
 * @param rotation
 * @text Rotation
 * @default 0
 * @type number
 * @parent mlParameters
 * 
 * @param opacity
 * @text Opacity
 * @default 255
 * @type number
 * @parent mlParameters
 * 
 * @param blendMode
 * @text Blend Mode
 * @default 0
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @parent mlParameters
 * 
 * @param tilling
 * @text Tilling
 * @default false
 * @type boolean
 * @parent mlParameters
 * 
 * @param visible
 * @text Visible
 * @default true
 * @type boolean
 * @parent mlParameters
 * 
 * @param script
 * @text Script
 * @default
 * onUpdate = function() {
 * //TODO: Add code here
 * };
 * @type multiline_string
 * @parent mlParameters
 * 
 * @param commandList
 * @text Command List
 * @type string[]
 * @parent mlParameters
 * 
 */

//==============================================================================
// Tween.js - Licensed under the MIT license
// https://github.com/tweenjs/tween.js
//==============================================================================

/**
 * The Ease class provides a collection of easing functions for use with tween.js.
 */
 var Easing = {
    Linear: {
        None: function (amount) {
            return amount;
        },
    },
    Quadratic: {
        In: function (amount) {
            return amount * amount;
        },
        Out: function (amount) {
            return amount * (2 - amount);
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount;
            }
            return -0.5 * (--amount * (amount - 2) - 1);
        },
    },
    Cubic: {
        In: function (amount) {
            return amount * amount * amount;
        },
        Out: function (amount) {
            return --amount * amount * amount + 1;
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount * amount;
            }
            return 0.5 * ((amount -= 2) * amount * amount + 2);
        },
    },
    Quartic: {
        In: function (amount) {
            return amount * amount * amount * amount;
        },
        Out: function (amount) {
            return 1 - --amount * amount * amount * amount;
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount * amount * amount;
            }
            return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
        },
    },
    Quintic: {
        In: function (amount) {
            return amount * amount * amount * amount * amount;
        },
        Out: function (amount) {
            return --amount * amount * amount * amount * amount + 1;
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount * amount * amount * amount;
            }
            return 0.5 * ((amount -= 2) * amount * amount * amount * amount + 2);
        },
    },
    Sinusoidal: {
        In: function (amount) {
            return 1 - Math.cos((amount * Math.PI) / 2);
        },
        Out: function (amount) {
            return Math.sin((amount * Math.PI) / 2);
        },
        InOut: function (amount) {
            return 0.5 * (1 - Math.cos(Math.PI * amount));
        },
    },
    Exponential: {
        In: function (amount) {
            return amount === 0 ? 0 : Math.pow(1024, amount - 1);
        },
        Out: function (amount) {
            return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount);
        },
        InOut: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            if ((amount *= 2) < 1) {
                return 0.5 * Math.pow(1024, amount - 1);
            }
            return 0.5 * (-Math.pow(2, -10 * (amount - 1)) + 2);
        },
    },
    Circular: {
        In: function (amount) {
            return 1 - Math.sqrt(1 - amount * amount);
        },
        Out: function (amount) {
            return Math.sqrt(1 - --amount * amount);
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return -0.5 * (Math.sqrt(1 - amount * amount) - 1);
            }
            return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
        },
    },
    Elastic: {
        In: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
        },
        Out: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            return Math.pow(2, -10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1;
        },
        InOut: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            amount *= 2;
            if (amount < 1) {
                return -0.5 * Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
            }
            return 0.5 * Math.pow(2, -10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1;
        },
    },
    Back: {
        In: function (amount) {
            var s = 1.70158;
            return amount * amount * ((s + 1) * amount - s);
        },
        Out: function (amount) {
            var s = 1.70158;
            return --amount * amount * ((s + 1) * amount + s) + 1;
        },
        InOut: function (amount) {
            var s = 1.70158 * 1.525;
            if ((amount *= 2) < 1) {
                return 0.5 * (amount * amount * ((s + 1) * amount - s));
            }
            return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
        },
    },
    Bounce: {
        In: function (amount) {
            return 1 - Easing.Bounce.Out(1 - amount);
        },
        Out: function (amount) {
            if (amount < 1 / 2.75) {
                return 7.5625 * amount * amount;
            }
            else if (amount < 2 / 2.75) {
                return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75;
            }
            else if (amount < 2.5 / 2.75) {
                return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375;
            }
            else {
                return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375;
            }
        },
        InOut: function (amount) {
            if (amount < 0.5) {
                return Easing.Bounce.In(amount * 2) * 0.5;
            }
            return Easing.Bounce.Out(amount * 2 - 1) * 0.5 + 0.5;
        },
    },
};

var now;
// Include a performance.now polyfill.
// In node.js, use process.hrtime.
// eslint-disable-next-line
// @ts-ignore
if (typeof self === 'undefined' && typeof process !== 'undefined' && process.hrtime) {
    now = function () {
        // eslint-disable-next-line
        // @ts-ignore
        var time = process.hrtime();
        // Convert [seconds, nanoseconds] to milliseconds.
        return time[0] * 1000 + time[1] / 1000000;
    };
}
// In a browser, use self.performance.now if it is available.
else if (typeof self !== 'undefined' && self.performance !== undefined && self.performance.now !== undefined) {
    // This must be bound, because directly assigning this function
    // leads to an invocation exception in Chrome.
    now = self.performance.now.bind(self.performance);
}
// Use Date.now if it is available.
else if (Date.now !== undefined) {
    now = Date.now;
}
// Otherwise, use 'new Date().getTime()'.
else {
    now = function () {
        return new Date().getTime();
    };
}
var now$1 = now;

var Group = /** @class */ (function () {
    function Group() {
        this._tweens = {};
        this._tweensAddedDuringUpdate = {};
    }
    Group.prototype.getAll = function () {
        var _this = this;
        return Object.keys(this._tweens).map(function (tweenId) {
            return _this._tweens[tweenId];
        });
    };
    Group.prototype.removeAll = function () {
        this._tweens = {};
    };
    Group.prototype.add = function (tween) {
        this._tweens[tween.getId()] = tween;
        this._tweensAddedDuringUpdate[tween.getId()] = tween;
    };
    Group.prototype.remove = function (tween) {
        delete this._tweens[tween.getId()];
        delete this._tweensAddedDuringUpdate[tween.getId()];
    };
    Group.prototype.update = function (time, preserve) {
        if (time === void 0) { time = now$1(); }
        if (preserve === void 0) { preserve = false; }
        var tweenIds = Object.keys(this._tweens);
        if (tweenIds.length === 0) {
            return false;
        }
        // Tweens are updated in "batches". If you add a new tween during an
        // update, then the new tween will be updated in the next batch.
        // If you remove a tween during an update, it may or may not be updated.
        // However, if the removed tween was added during the current batch,
        // then it will not be updated.
        while (tweenIds.length > 0) {
            this._tweensAddedDuringUpdate = {};
            for (var i = 0; i < tweenIds.length; i++) {
                var tween = this._tweens[tweenIds[i]];
                var autoStart = !preserve;
                if (tween && tween.update(time, autoStart) === false && !preserve) {
                    delete this._tweens[tweenIds[i]];
                }
            }
            tweenIds = Object.keys(this._tweensAddedDuringUpdate);
        }
        return true;
    };
    return Group;
}());

/**
 *
 */
var Interpolation = {
    Linear: function (v, k) {
        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        var fn = Interpolation.Utils.Linear;
        if (k < 0) {
            return fn(v[0], v[1], f);
        }
        if (k > 1) {
            return fn(v[m], v[m - 1], m - f);
        }
        return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
    },
    Bezier: function (v, k) {
        var b = 0;
        var n = v.length - 1;
        var pw = Math.pow;
        var bn = Interpolation.Utils.Bernstein;
        for (var i = 0; i <= n; i++) {
            b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
        }
        return b;
    },
    CatmullRom: function (v, k) {
        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        var fn = Interpolation.Utils.CatmullRom;
        if (v[0] === v[m]) {
            if (k < 0) {
                i = Math.floor((f = m * (1 + k)));
            }
            return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
        }
        else {
            if (k < 0) {
                return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
            }
            if (k > 1) {
                return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
            }
            return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
        }
    },
    Utils: {
        Linear: function (p0, p1, t) {
            return (p1 - p0) * t + p0;
        },
        Bernstein: function (n, i) {
            var fc = Interpolation.Utils.Factorial;
            return fc(n) / fc(i) / fc(n - i);
        },
        Factorial: (function () {
            var a = [1];
            return function (n) {
                var s = 1;
                if (a[n]) {
                    return a[n];
                }
                for (var i = n; i > 1; i--) {
                    s *= i;
                }
                a[n] = s;
                return s;
            };
        })(),
        CatmullRom: function (p0, p1, p2, p3, t) {
            var v0 = (p2 - p0) * 0.5;
            var v1 = (p3 - p1) * 0.5;
            var t2 = t * t;
            var t3 = t * t2;
            return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
        },
    },
};

/**
 * Utils
 */
var Sequence = /** @class */ (function () {
    function Sequence() {
    }
    Sequence.nextId = function () {
        return Sequence._nextId++;
    };
    Sequence._nextId = 0;
    return Sequence;
}());

var mainGroup = new Group();

/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */
var Tween = /** @class */ (function () {
    function Tween(_object, _group) {
        if (_group === void 0) { _group = mainGroup; }
        this._object = _object;
        this._group = _group;
        this._isPaused = false;
        this._pauseStart = 0;
        this._valuesStart = {};
        this._valuesEnd = {};
        this._valuesStartRepeat = {};
        this._duration = 1000;
        this._initialRepeat = 0;
        this._repeat = 0;
        this._yoyo = false;
        this._isPlaying = false;
        this._reversed = false;
        this._delayTime = 0;
        this._startTime = 0;
        this._easingFunction = Easing.Linear.None;
        this._interpolationFunction = Interpolation.Linear;
        this._chainedTweens = [];
        this._onStartCallbackFired = false;
        this._id = Sequence.nextId();
        this._isChainStopped = false;
        this._goToEnd = false;
    }
    Tween.prototype.getId = function () {
        return this._id;
    };
    Tween.prototype.isPlaying = function () {
        return this._isPlaying;
    };
    Tween.prototype.isPaused = function () {
        return this._isPaused;
    };
    Tween.prototype.to = function (properties, duration) {
        // TODO? restore this, then update the 07_dynamic_to example to set fox
        // tween's to on each update. That way the behavior is opt-in (there's
        // currently no opt-out).
        // for (const prop in properties) this._valuesEnd[prop] = properties[prop]
        this._valuesEnd = Object.create(properties);
        if (duration !== undefined) {
            this._duration = duration;
        }
        return this;
    };
    Tween.prototype.duration = function (d) {
        this._duration = d;
        return this;
    };
    Tween.prototype.start = function (time) {
        if (this._isPlaying) {
            return this;
        }
        // eslint-disable-next-line
        this._group && this._group.add(this);
        this._repeat = this._initialRepeat;
        if (this._reversed) {
            // If we were reversed (f.e. using the yoyo feature) then we need to
            // flip the tween direction back to forward.
            this._reversed = false;
            for (var property in this._valuesStartRepeat) {
                this._swapEndStartRepeatValues(property);
                this._valuesStart[property] = this._valuesStartRepeat[property];
            }
        }
        this._isPlaying = true;
        this._isPaused = false;
        this._onStartCallbackFired = false;
        this._isChainStopped = false;
        this._startTime = time !== undefined ? (typeof time === 'string' ? now$1() + parseFloat(time) : time) : now$1();
        this._startTime += this._delayTime;
        this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat);
        return this;
    };
    Tween.prototype._setupProperties = function (_object, _valuesStart, _valuesEnd, _valuesStartRepeat) {
        for (var property in _valuesEnd) {
            var startValue = _object[property];
            var startValueIsArray = Array.isArray(startValue);
            var propType = startValueIsArray ? 'array' : typeof startValue;
            var isInterpolationList = !startValueIsArray && Array.isArray(_valuesEnd[property]);
            // If `to()` specifies a property that doesn't exist in the source object,
            // we should not set that property in the object
            if (propType === 'undefined' || propType === 'function') {
                continue;
            }
            // Check if an Array was provided as property value
            if (isInterpolationList) {
                var endValues = _valuesEnd[property];
                if (endValues.length === 0) {
                    continue;
                }
                // handle an array of relative values
                endValues = endValues.map(this._handleRelativeValue.bind(this, startValue));
                // Create a local copy of the Array with the start value at the front
                _valuesEnd[property] = [startValue].concat(endValues);
            }
            // handle the deepness of the values
            if ((propType === 'object' || startValueIsArray) && startValue && !isInterpolationList) {
                _valuesStart[property] = startValueIsArray ? [] : {};
                // eslint-disable-next-line
                for (var prop in startValue) {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    _valuesStart[property][prop] = startValue[prop];
                }
                _valuesStartRepeat[property] = startValueIsArray ? [] : {}; // TODO? repeat nested values? And yoyo? And array values?
                // eslint-disable-next-line
                // @ts-ignore FIXME?
                this._setupProperties(startValue, _valuesStart[property], _valuesEnd[property], _valuesStartRepeat[property]);
            }
            else {
                // Save the starting value, but only once.
                if (typeof _valuesStart[property] === 'undefined') {
                    _valuesStart[property] = startValue;
                }
                if (!startValueIsArray) {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    _valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
                }
                if (isInterpolationList) {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    _valuesStartRepeat[property] = _valuesEnd[property].slice().reverse();
                }
                else {
                    _valuesStartRepeat[property] = _valuesStart[property] || 0;
                }
            }
        }
    };
    Tween.prototype.stop = function () {
        if (!this._isChainStopped) {
            this._isChainStopped = true;
            this.stopChainedTweens();
        }
        if (!this._isPlaying) {
            return this;
        }
        // eslint-disable-next-line
        this._group && this._group.remove(this);
        this._isPlaying = false;
        this._isPaused = false;
        if (this._onStopCallback) {
            this._onStopCallback(this._object);
        }
        return this;
    };
    Tween.prototype.end = function () {
        this._goToEnd = true;
        this.update(Infinity);
        return this;
    };
    Tween.prototype.pause = function (time) {
        if (time === void 0) { time = now$1(); }
        if (this._isPaused || !this._isPlaying) {
            return this;
        }
        this._isPaused = true;
        this._pauseStart = time;
        // eslint-disable-next-line
        this._group && this._group.remove(this);
        return this;
    };
    Tween.prototype.resume = function (time) {
        if (time === void 0) { time = now$1(); }
        if (!this._isPaused || !this._isPlaying) {
            return this;
        }
        this._isPaused = false;
        this._startTime += time - this._pauseStart;
        this._pauseStart = 0;
        // eslint-disable-next-line
        this._group && this._group.add(this);
        return this;
    };
    Tween.prototype.stopChainedTweens = function () {
        for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
            this._chainedTweens[i].stop();
        }
        return this;
    };
    Tween.prototype.group = function (group) {
        this._group = group;
        return this;
    };
    Tween.prototype.delay = function (amount) {
        this._delayTime = amount;
        return this;
    };
    Tween.prototype.repeat = function (times) {
        this._initialRepeat = times;
        this._repeat = times;
        return this;
    };
    Tween.prototype.repeatDelay = function (amount) {
        this._repeatDelayTime = amount;
        return this;
    };
    Tween.prototype.yoyo = function (yoyo) {
        this._yoyo = yoyo;
        return this;
    };
    Tween.prototype.easing = function (easingFunction) {
        this._easingFunction = easingFunction;
        return this;
    };
    Tween.prototype.interpolation = function (interpolationFunction) {
        this._interpolationFunction = interpolationFunction;
        return this;
    };
    Tween.prototype.chain = function () {
        var tweens = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tweens[_i] = arguments[_i];
        }
        this._chainedTweens = tweens;
        return this;
    };
    Tween.prototype.onStart = function (callback) {
        this._onStartCallback = callback;
        return this;
    };
    Tween.prototype.onUpdate = function (callback) {
        this._onUpdateCallback = callback;
        return this;
    };
    Tween.prototype.onRepeat = function (callback) {
        this._onRepeatCallback = callback;
        return this;
    };
    Tween.prototype.onComplete = function (callback) {
        this._onCompleteCallback = callback;
        return this;
    };
    Tween.prototype.onStop = function (callback) {
        this._onStopCallback = callback;
        return this;
    };
    /**
     * @returns true if the tween is still playing after the update, false
     * otherwise (calling update on a paused tween still returns true because
     * it is still playing, just paused).
     */
    Tween.prototype.update = function (time, autoStart) {
        if (time === void 0) { time = now$1(); }
        if (autoStart === void 0) { autoStart = true; }
        if (this._isPaused)
            return true;
        var property;
        var elapsed;
        var endTime = this._startTime + this._duration;
        if (!this._goToEnd && !this._isPlaying) {
            if (time > endTime)
                return false;
            if (autoStart)
                this.start(time);
        }
        this._goToEnd = false;
        if (time < this._startTime) {
            return true;
        }
        if (this._onStartCallbackFired === false) {
            if (this._onStartCallback) {
                this._onStartCallback(this._object);
            }
            this._onStartCallbackFired = true;
        }
        elapsed = (time - this._startTime) / this._duration;
        elapsed = this._duration === 0 || elapsed > 1 ? 1 : elapsed;
        var value = this._easingFunction(elapsed);
        // properties transformations
        this._updateProperties(this._object, this._valuesStart, this._valuesEnd, value);
        if (this._onUpdateCallback) {
            this._onUpdateCallback(this._object, elapsed);
        }
        if (elapsed === 1) {
            if (this._repeat > 0) {
                if (isFinite(this._repeat)) {
                    this._repeat--;
                }
                // Reassign starting values, restart by making startTime = now
                for (property in this._valuesStartRepeat) {
                    if (!this._yoyo && typeof this._valuesEnd[property] === 'string') {
                        this._valuesStartRepeat[property] =
                            // eslint-disable-next-line
                            // @ts-ignore FIXME?
                            this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
                    }
                    if (this._yoyo) {
                        this._swapEndStartRepeatValues(property);
                    }
                    this._valuesStart[property] = this._valuesStartRepeat[property];
                }
                if (this._yoyo) {
                    this._reversed = !this._reversed;
                }
                if (this._repeatDelayTime !== undefined) {
                    this._startTime = time + this._repeatDelayTime;
                }
                else {
                    this._startTime = time + this._delayTime;
                }
                if (this._onRepeatCallback) {
                    this._onRepeatCallback(this._object);
                }
                return true;
            }
            else {
                if (this._onCompleteCallback) {
                    this._onCompleteCallback(this._object);
                }
                for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
                    // Make the chained tweens start exactly at the time they should,
                    // even if the `update()` method was called way past the duration of the tween
                    this._chainedTweens[i].start(this._startTime + this._duration);
                }
                this._isPlaying = false;
                return false;
            }
        }
        return true;
    };
    Tween.prototype._updateProperties = function (_object, _valuesStart, _valuesEnd, value) {
        for (var property in _valuesEnd) {
            // Don't update properties that do not exist in the source object
            if (_valuesStart[property] === undefined) {
                continue;
            }
            var start = _valuesStart[property] || 0;
            var end = _valuesEnd[property];
            var startIsArray = Array.isArray(_object[property]);
            var endIsArray = Array.isArray(end);
            var isInterpolationList = !startIsArray && endIsArray;
            if (isInterpolationList) {
                _object[property] = this._interpolationFunction(end, value);
            }
            else if (typeof end === 'object' && end) {
                // eslint-disable-next-line
                // @ts-ignore FIXME?
                this._updateProperties(_object[property], start, end, value);
            }
            else {
                // Parses relative end values with start as base (e.g.: +10, -3)
                end = this._handleRelativeValue(start, end);
                // Protect against non numeric properties.
                if (typeof end === 'number') {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    _object[property] = start + (end - start) * value;
                }
            }
        }
    };
    Tween.prototype._handleRelativeValue = function (start, end) {
        if (typeof end !== 'string') {
            return end;
        }
        if (end.charAt(0) === '+' || end.charAt(0) === '-') {
            return start + parseFloat(end);
        }
        else {
            return parseFloat(end);
        }
    };
    Tween.prototype._swapEndStartRepeatValues = function (property) {
        var tmp = this._valuesStartRepeat[property];
        var endValue = this._valuesEnd[property];
        if (typeof endValue === 'string') {
            this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(endValue);
        }
        else {
            this._valuesStartRepeat[property] = this._valuesEnd[property];
        }
        this._valuesEnd[property] = tmp;
    };
    return Tween;
}());
// var VERSION = '18.6.4';

//The above is about Tween.js on github.
//Now the following is Liy.

// class Sprite_Multilayer extends Sprite {

// }

// class Sprite_TilingMultilayer extends TilingSprite {

// }

class Liy_Multilayer {
    static mapLayerData = {};

    static resolveMapLayerData(mapLayers) {
        mapLayers.forEach((mapLayer) => {
            if(mapLayer.layers) {
                this.mapLayerData[mapLayer.mapId] = mapLayer.layers;
            }
        });
    }

    static loadMapLayerData(mapId) {
        return mapId ? this.mapLayerData[mapId] || null : this.mapLayerData;
    }

    static getLayerSprite(setting) {
        const _tilling = setting.tilling;
        const sprite = _tilling ? new TilingSprite() : new Sprite();
        const _setting = JSON.parse(JSON.stringify(setting));
        const _script = _setting.script;
        const _mode = _setting.mode;
        // _setting.scale;
        _setting.scale = sprite.scale;
        _setting.scale.x = _setting.scaleX / 100;
        _setting.scale.y = _setting.scaleY / 100;
        sprite.bitmap = ImageManager.loadBitmap("img/pictures/", setting.layerBitmap);
        if(_tilling) {
            _setting.origin = sprite.origin;
            _setting.origin.x = _setting.originX;
            _setting.origin.y = _setting.originY;
            sprite.width = Graphics.boxHeight;
            sprite.height = Graphics.boxWidth;
        };
        
        delete _setting.tilling;
        delete _setting.scaleX;
        delete _setting.scaleY;
        delete _setting.layerBitmap;
        delete _setting.script;
        delete _setting.mode;
        delete _setting.commandList;
        delete _setting.originX;
        delete _setting.originY;
        delete _setting.mlFollow;
        delete _setting.mlParameters;
        delete _setting.blendMode;

        for(let key in _setting) {
            sprite[key] = _setting[key];
        }

        const _scriptInterpreter = this.scriptHelper.bind(sprite);
        //CODE
        _scriptInterpreter(_script, _setting, _mode === "Follow", _tilling);

        return sprite;
    }

    // Context Sprite required
    static scriptHelper(code, setting, isFollow, isTilling) {
        var onUpdate;
        var onInitialize;
        var onDestroy;
        var onMove;

        var parameters = {};

        var clearParallel = function() {
            clearInterval(parallelTimer);
        };

        var switches = function(index){
            return $gameSwitches.value(index) || false;
        };
        var variables = function(index){
            return $gameVariables.value(index) || 0;
        };

        var rx = function(x = 0, rate = 1) {
            return $gameMap.adjustX(0) * $gameMap.tileWidth() * rate + x;
        }

        var ry = function(y = 0, rate = 1) {
            return $gameMap.adjustY(0) * $gameMap.tileHeight() * rate + y;
        }

        var characterMapX = function() {

        }

        var characterMapY = function() {
            
        }

        var parallelTimer;
        var parallel = function(callback, timeOut, interval, trigger = true){
            setTimeout(() => {
                parallelTimer = setInterval(() => {
                    if(trigger) {
                        callback();
                    }
                }, interval);
            }, timeOut || 0);
        }.bind(this);

        eval(code);

        if(isFollow) {
            this._updateCallback.push(() => {
                this.x = rx(setting.x, setting.offsetRateX);
                this.y = ry(setting.y, setting.offsetRateY);
            })
        }

        if(onUpdate)
            this._updateCallback.push(onUpdate.bind(this));
        if(onDestroy)
            this._destroyCallback.push(onDestroy.bind(this));
        if(onMove)
            this._moveCallback.push(onDestroy.bind(this));
        if(onInitialize)
            this._initializeCallback.push(onInitialize.bind(this));
    }
}

function paramJsonParse(key, value) {
    try {
        return key === "script" ? value : JSON.parse(value);
    } catch(e) {
        return value ? value : null;
    }
}

(() => {
    try {
        new Liy();
    } catch(e) {
        throw Error("Couldn't load Liy main module of undefined.");
    }

    const pluginName = "Liy_Graphics";

    const params = PluginManager.parameters(pluginName);

    try{
        const mapLayers = JSON.parse(JSON.stringify(params["mapLayerSetting"],
            paramJsonParse));
        Liy_Multilayer.resolveMapLayerData(mapLayers);
    } catch {}

    //==========================================================================
    //Button hovered effects
    //==========================================================================
    Sprite_Button.prototype.updateFrame = function() {
        const frame = (this.isPressed() || this.isHovered()) ? this._hotFrame : this._coldFrame;
        if (frame) {
            this.setFrame(frame.x, frame.y, frame.width, frame.height);
        }
    };
    
    Sprite_Button.prototype.isHovered  = function() {
        return this.isBeingTouched();
    };
    
    Window_Selectable.prototype.refreshCursor = function() {
        if (this._cursorAll) {
            this.refreshCursorForAll();
        } else if (this.index() >= 0) {
            const rect = this.itemRect(this.index());
            this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
        } else {
            this.setCursorRect(0, 0, 0, 0);
        }
    };
    
    Window.prototype._refreshCursor = function() {
        const drect = this._cursorRect.clone();
        const srect = { x: 96, y: 96, width: 48, height: 48 };
        const m = 4;
        for (const child of this._cursorSprite.children) {
            child.bitmap = this._windowskin;
        }
        this._setRectPartsGeometry(this._cursorSprite, srect, drect, m);
    };

    //==========================================================================
    // Easing of Windows and Sprites
    //==========================================================================
    const _Window_Base_prototype_initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(rect) {
        _Window_Base_prototype_initialize.call(this, rect);
        this.initEasing();
    }

    const _Window_Base_prototype_update = Window_Base.prototype.update;
    Window_Base.prototype.update = function() {
        _Window_Base_prototype_update.call(this);
        this._tween.update();
    };

    Window_Base.prototype.initEasing = function() {
        this._easingTargets = {
            x : this.x,
            y : this.y,
            width : this.width,
            height : this.height
        }
        this._tween = new Tween(this._easingTargets)
            .onUpdate(() => {
                const easingTargets = this._easingTargets;
                this.x = easingTargets.x || this.x;
                this.y = easingTargets.y || this.y;
                this.width = easingTargets.width || this.width;
                this.height = easingTargets.height || this.height;
            })
    }; 

    Window_Base.prototype.move = function(x, y, width, height) {
        this.initEasing();
        
        this.x = x || 0;
        this.y = y || 0;
        if (this._width !== width || this._height !== height) {
            this._width = width || 0;
            this._height = height || 0;
            this._refreshAllParts();
        }
        return this._tween;
    };

    const _TilingSprite_prototype_initialize = TilingSprite.prototype.initialize;
    TilingSprite.prototype.initialize = function() {
        _TilingSprite_prototype_initialize.call(this);
        if(this._initializeCallback.length > 0) {
            this._initializeCallback.forEach((callBack) => {
                callBack();
            });
        }
    }

    TilingSprite.prototype.update = function() {
        for (const child of this.children) {
            if (child.update) {
                child.update();
            }
        }
        if(this._updateCallback.length > 0) {
            this._updateCallback.forEach((callBack) => {
                callBack();
            });
        }
    };

    const _TilingSprite_prototype_move = TilingSprite.prototype.move;
    TilingSprite.prototype.move = function() {
        _TilingSprite_prototype_move.call(this);
        if(this._moveCallback.length > 0) {
            this._moveCallback.forEach((callBack) => {
                callBack();
            });
        }
    }

    TilingSprite.prototype.destroy = function() {
        const options = { children: true, texture: true };
        if(this._destroyCallback.length > 0) {
            this._destroyCallback.forEach((callBack) => {
                callBack();
            });
        }
        PIXI.TilingSprite.prototype.destroy.call(this, options);
    };

    const _Sprite_prototype_initialize = Sprite.prototype.initialize;
    Sprite.prototype.initialize = function(bitmap) {
        _Sprite_prototype_initialize.call(this, bitmap);
        this.initEasing();
        if(this._initializeCallback.length > 0) {
            this._initializeCallback.forEach((callBack) => {
                callBack();
            });
        }
    };

    Sprite.prototype.initEasing = function() {
        this._easingTargets = {
            x: 0,
            y: 0,
            scaleX: 0,
            scaleY: 0,
            opacity: 0
        }

        this._tween = new Tween(this._easingTargets)
            .onUpdate(() => {
                const easingTargets = this._easingTargets;
                this.x = easingTargets.x || this.x;
                this.y = easingTargets.y || this.y;
                this.scale.x = easingTargets.scaleX || this.scale.x;
                this.scale.y = easingTargets.scaleY || this.scale.y;
                this.opacity = easingTargets.opacity || this.opacity;
            });
    };

    Sprite.prototype.move = function(x, y) {
        if(this._moveCallback.length > 0) {
            this._moveCallback.forEach((callBack) => {
                callBack();
            });
        }
        this.x = x || this.x;
        this.y = y || this.y;
        return this._tween;
    }

    const _Spriteset_Map_prototype_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
    Spriteset_Map.prototype.createLowerLayer = function() {
        _Spriteset_Map_prototype_createLowerLayer.call(this);
        this.createOtherTilemap();
    };

    Spriteset_Map.prototype.createOtherTilemap = function() {
        const layers = Liy_Multilayer.loadMapLayerData();
        const mapId = $gameMap.mapId();
        const layersData = layers[mapId];
        if(layersData) {
            layersData.forEach((layer) => {
                const layerSprite = Liy_Multilayer.getLayerSprite(layer);
                this._tilemap.addChild(layerSprite);
            });
        }
    };

    Object.defineProperty(Sprite.prototype, "_updateCallback", {
        value: [],
        configurable: true
    });

    Object.defineProperty(Sprite.prototype, "_destroyCallback", {
        value: [],
        configurable: true
    });

    Object.defineProperty(Sprite.prototype, "_moveCallback", {
        value: [],
        configurable: true
    });

    Object.defineProperty(Sprite.prototype, "_initializeCallback", {
        value: [],
        configurable: true
    });

    Object.defineProperty(TilingSprite.prototype, "_updateCallback", {
        value: [],
        configurable: true
    });

    Object.defineProperty(TilingSprite.prototype, "_destroyCallback", {
        value: [],
        configurable: true
    });

    Object.defineProperty(TilingSprite.prototype, "_moveCallback", {
        value: [],
        configurable: true
    });

    Object.defineProperty(TilingSprite.prototype, "_initializeCallback", {
        value: [],
        configurable: true
    });

    const _Sprite_prototype_destory = Sprite.prototype.destroy;
    Sprite.prototype.destroy = function() {
        _Sprite_prototype_destory.call(this);
        if(this._destroyCallback.length > 0) {
            this._destroyCallback.forEach((callBack) => {
                callBack();
            });
        }
    }

    Sprite.prototype.update = function() {
        this._tween.update();
        for (const child of this.children) {
            if (child.update) {
                child.update();
            }
        }
        if(this._updateCallback.length > 0) {
            this._updateCallback.forEach((callBack) => {
                callBack();
            });
        }
    };
    
})();