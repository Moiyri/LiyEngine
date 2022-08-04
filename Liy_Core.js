/*:
 * @target MZ
 * @plugindesc The core of LiyEngine
 * @author Moiyri
 *
 * @param showDevtools
 * @type boolean
 * @default false
 * @text Show Devtools
 * @desc Show Devtools when running.
 * 
 * @param accessF3
 * @type boolean
 * @default true
 * @text Is access F3 input.
 * 
 * @param accessF4
 * @type boolean
 * @default true
 * @text Is access F4 input.
 * 
 * @param accessF5
 * @type boolean
 * @default true
 * @text Is access F5 input.
 *
 * @command globalvar
 * @text Operate Global Variable.
 * @desc Operate Global Variable.
 *
 * @arg Expression
 * @type string
 * @default null
 * @text Expression
 * @desc The operation statement.
 * 
 * @command test
 * 
 * @arg param1
 * 
 * @arg param2
 */

(() =>{
    const pluginName = "Liy_Core";

    var params = PluginManager.parameters("Liy_Core");
    var isShowDevtools = params["showDevtools"] === "true" ? true : false;
    var isAccessF3 = params["F3"] === "true" ? true : false;
    var isAccessF4 = params["F4"] === "true" ? true : false;
    var isAccessF5 = params["F5"] === "true" ? true : false;
    
    //globalvar expression
    PluginManager.registerCommand(pluginName, "globalvar", args => {
        let expession = args.Expression;
        GlobalVar.resolveExp(expession);
    });

    PluginManager.registerCommand(pluginName, "test", args => {
        console.log(Liy_Tween.calcPosistion(Number(args.param1), Number(args.param2), 1, "easeinquad"));
    });

//-----------------------------------------------------------

    var _Window_Base_prototype_initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(rect) {
        _Window_Base_prototype_initialize.call(this, rect);
        this.initTarget();
    }

    Window_Base.prototype.initTarget = function() {
        this._targetX = this.x;
        this._targetY = this.y;
        this._targetOpacity = this.opacity;
    };

    Sprite.prototype.initialize = function() {
        
    }

    var _Sprite_prototype_update = Sprite.prototype.update;
    Sprite.prototype.update = function() {
        _Sprite_prototype_update.call(this);
    };

    Window_Base.prototype.

    Scene_Map.prototype.onMapLoaded = function() {
        if (this._transfer) {
            $gamePlayer.performTransfer();
        }
        Liy.resolveAllDataMap();
        this.createDisplayObjects();
    };

    SceneManager.onKeyDown = function(event) {
        if (!event.ctrlKey && !event.altKey) {
            switch (event.keyCode) {
                case 116: // F5
                    if(isAccessF5) this.reloadGame();
                    break;
                case 119: // F8
                    this.showDevTools();
                    break;
            }
        }
    };

    Graphics._onKeyDown = function(event) {
        if (!event.ctrlKey && !event.altKey) {
            switch (event.keyCode) {
                case 113: // F2
                    event.preventDefault();
                    this._switchFPSCounter();
                    break;
                case 114: // F3
                    event.preventDefault();
                    if(isAccessF3) this._switchStretchMode();
                    break;
                case 115: // F4
                    event.preventDefault();
                    if(isAccessF4) this._switchFullScreen();
                    break;
            }
        }
    };

    Main.prototype.onEffekseerLoad = function(){
        this.eraseLoadingSpinner();
        if(isShowDevtools) SceneManager.showDevTools();
        /*try{
            GlobalVar.loadVar();
        } catch(e) {}*/
        SceneManager.run(Scene_Boot);
    };

    Window.prototype.move = function(x, y, width, height, tween = null) {
        if(tween){
            this._moving = true;
            this._targetX = x || 0;
            this._targetY = y || 0;
            this._targetWidth = width || 0;
            this._targetHeight = height || 0;
            this._refreshAllParts();
            return;
        }
        this.x = x || 0;
        this.y = y || 0;
        if (this._width !== width || this._height !== height) {
            this._width = width || 0;
            this._height = height || 0;
            this._refreshAllParts();
        }
    };

    const _Window_prototype_update = Window.prototype.update;
    Window.prototype.update = function() {
        _Window_prototype_update.call(this);
        this._updateMoving();
    };

    Window.prototype._updateMoving = function() {
        if(this._moving){
            if(this.x === this._targetX 
                && this.y === this._targetY 
                && this.height === this._targetHeight 
                && this.width === this._targetWidth) {
                    delete this._targetX;
                    delete this._targetY;
                    delete this._targetHeight;
                    delete this._targetWidth;
                    delete this._mvTween;
                    this._moving = false;
            }
        }
    };
    //-----------------------------------------------------------
    Input.keyMapper = {
        9: "tab", // tab
        13: "ok", // enter
        16: "shift", // shift
        17: "control", // control
        18: "control", // alt
        27: "escape", // escape
        32: "ok", // space
        33: "pageup", // pageup
        34: "pagedown", // pagedown
        37: "left", // left arrow
        38: "up", // up arrow
        39: "right", // right arrow
        40: "down", // down arrow
        45: "escape", // insert
        65: "a",
        66: "b",
        67: "c",
        68: "d",
        69: "e",
        70: "f",
        71: "g",
        72: "h",
        73: "i",
        74: "j",
        75: "k",
        76: "l",
        77: "m",
        78: "n",
        79: "o",
        80: "p",
        81: "pageup", // Q
        82: "r",
        83: "s",
        84: "t",
        85: "u",
        86: "v",
        87: "pagedown", // W
        88: "escape", // X
        89: "y",
        90: "ok", // Z
        96: "escape", // numpad 0
        98: "down", // numpad 2
        100: "left", // numpad 4
        102: "right", // numpad 6
        104: "up", // numpad 8
        120: "debug" // F9
    };

})();

//-----------------------------------------------------------
var $dataULDSMap = null;
var $dataFLashlight = null;
var $dataLiyScenes = null;

var $testVar = [];

class Liy {
    static resolveAllDataMap() {
        try{
            const info = JSON.parse($dataMap.note);
            $dataULDSMap = info.ulds;
        } catch(e) {
            console.log("Faild to parse map notes");
        }
    }
}

Array.prototype.remove = function(val) { 
    let index = this.indexOf(val); 
    if (index > -1) { 
        this.splice(index, 1); 
    } 
};

//-----------------------------------------------------------
function Liy_Tween(x, y, type){
    this._maxX = x;
    this._maxY = y;
    this._type = tweenMap[type.toUpperCase()];
}

Liy_Tween.prototype = Object.create(Liy_Tween.prototype);
Liy_Tween.prototype.constructor = Liy_Tween;

const tweenMapper = {
    EASEINQUAD : 'Liy_Tween.easeInQuad', 
    EASEOUTQUAD : 'Liy_Tween.easeOutQuad', 
    EASEINOUTQUAD : 'Liy_Tween.easeInOutQuad', 
    EASEINCUBIC : 'Liy_Tween.easeInCubic', 
    EASEOUTCUBIC : 'Liy_Tween.easeOutCubic', 
    EASEINOUTCUBIC : 'Liy_Tween.easeInOutCubic', 
    EASEINQUART : 'Liy_Tween.easeInQuart',
    EASEOUTQUART : 'Liy_Tween.easeOutQuart',
    EASEINOUTQUART : 'Liy_Tween.easeInOutQuart',
    EASEINBACK : 'Liy_Tween.easeInBack', 
    EASEOUTBACK : 'Liy_Tween.easeOutBack', 
    EASEINOUTBACK : 'Liy_Tween.easeInOutBack',
    EASEINSINE : 'Liy_Tween.easeInSine', 
    EASEOUTSINE : 'Liy_Tween.easeOutSine', 
    EASEINOUTSINE : 'Liy_Tween.easeInOutSine', 
    SWINGTO : 'Liy_Tween.swingTo',  
    SWINGFROM : 'Liy_Tween.swingFrom', 
    SWINGFROMTO : 'Liy_Tween.swingFromTo', 
    REVERSE : 'Liy_Tween.reverse'
};

Liy_Tween.calcPosition = function(value, type) { //durantion whole frames
    if(!type) return value;
    let _type = tweenMapper[type.toUpperCase()];
    return eval(_type + "(" + value + ");");
}

Liy_Tween.easeInQuad =  function(pos) {
    return Math.pow(pos, 2);
};

Liy_Tween.easeOutQuad = function(pos) {
    return -(Math.pow((pos-1), 2) -1);
};

Liy_Tween.easeInOutQuad = function(pos) {
    if ((pos/=0.5) < 1) return 0.5 * Math.pow(pos,2);
    return -0.5 * ((pos-=2)*pos - 2);
};

Liy_Tween.easeInCubic = function(pos) {
    return Math.pow(pos, 3);
};

Liy_Tween.easeOutCubic = function(pos) {
    return (Math.pow((pos-1), 3) +1);
};

Liy_Tween.easeInOutCubic =function(pos) {
    if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,3);
    return 0.5 * (Math.pow((pos-2),3) + 2);
};

Liy_Tween.easeInQuart = function(pos){
    return Math.pow(pos, 4);
}

Liy_Tween.easeOutQuart = function(pos){
    return -(Math.pow((pos-1), 4) -1)
}

Liy_Tween.easeInOutQuart = function(pos){
    if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,4);
    return -0.5 * ((pos-=2)*Math.pow(pos,3) - 2);
}

Liy_Tween.reverse = function(pos) {
    return 1 - pos;
};

Liy_Tween.easeInBack = function(pos){
    var s = 1.70158;
    return (pos)*pos*((s+1)*pos - s);
};

Liy_Tween.easeOutBack = function(pos){
    var s = 1.70158;
    return (pos=pos-1)*pos*((s+1)*pos + s) + 1;
};

Liy_Tween.easeInOutBack = function(pos){
    var s = 1.70158;
    if((pos/=0.5) < 1) return 0.5*(pos*pos*(((s*=(1.525))+1)*pos -s));
    return 0.5*((pos-=2)*pos*(((s*=(1.525))+1)*pos +s) +2);
};

Liy_Tween.easeInSine = function(pos){
    return -Math.cos(pos * (Math.PI/2)) + 1;
};

Liy_Tween.easeOutSine = function(pos){
    return Math.sin(pos * (Math.PI/2));
};

Liy_Tween.easeInOutSine = function(pos){
    return (-.5 * (Math.cos(Math.PI*pos) -1));
};

Liy_Tween.swingFromTo = function(pos) {
    var s = 1.70158;
    return ((pos/=0.5) < 1) ? 0.5*(pos*pos*(((s*=(1.525))+1)*pos - s)) :
    0.5*((pos-=2)*pos*(((s*=(1.525))+1)*pos + s) + 2);
};

Liy_Tween.swingFrom = function(pos) {
    var s = 1.70158;
    return pos*pos*((s+1)*pos - s);
};

Liy_Tween.swingTo = function(pos) {
    var s = 1.70158;
    return (pos-=1)*pos*((s+1)*pos + s) + 1;
};

//-----------------------------------------------------------
var $globalVariable = new Map();

class GlobalVar {
    static resolveStatement(exp) {
        let reg = new RegExp(/\w.*((=)|(+=)|(-=)|(\/=))/g);
        eval(exp);
        for(i in exp.match(reg)){
            eval("$globalVar." + i + " = " + eval(i));
        }
    }

    static varFileStream(isLoad) {
        try{
            if(isLoad) {
                $globalVariable = StorageManager.loadObject("GlobalVariable");
            } else {
                StorageManager.saveObject("GlobalVariable", $globalVariable);
            }
        } catch{}
    }

    static loadVariable() {
        this.varFileStream(true);
        $globalVariable.forEach(variable => {
            eval("var " + variable + " = " + $globalVar[variable]);
        })
    }
}

//-----------------------------------------------------------

var l_isPressed = function(keyName) {
    return Input.isPressed(keyName);
}

class Liy_Easing{
    constructor(
        obj, type, duration, 
        startX, startY, targetX, targetY, 
        startOpacity, targetOpacity,
        startWidth, targetWidth, startHeight, targetHeight
    ) {
        this._obj = obj;
        this._type  = type; //string
        this._startX = startX;
        this._startY = startY;
        this._targetX = targetX;
        this._targetY = targetY;
        this._startOpacity = startOpacity;
        this._targetOpacity = targetOpacity;
        this._duration = 0; //frames
        this._wholeDuration = duration; // frames
    }

    processEasing() {
        const progress = this._duration / this._wholeDuration;
        const pos = Liy_Tween.calcPosition(progress, this._type);

        try {
            if(!(this._targetX === null || this._targetY === null)) {
                const sx = this._startX;
                const sy = this._startY;
                const tx = this._targetX;
                const ty = this._targetY;
                this._obj.move(
                    pos * (tx - sx) + sx,
                    pos * (ty - sy) + sy,
                    this._obj.width,
                    this._obj.height);
            }
            
            if(this._targetOpacity) {
                const so = this._startOpacity;
                const to = this._targetOpacity;
                this._obj.opacity = pos * (to - so) + so;
            }

            this._duration++;

        } catch(e) {
            throw e;
        };
    }

    isEasingDone() {
        return this._duration === this._wholeDuration + 1;
    }
}