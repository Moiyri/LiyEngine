/*:
 * @target MZ
 * @plugindesc A core of LiyEngine
 * @author Moiyri
 *
 * @param showDevtools
 * @type bool
 * @default 
 * @text Show Devtools
 * @desc Show Devtools automatically?
 *
 * @command globalvar
 * @text Operate Global Variable.
 * @desc Operate Global Variable.
 *
 * @arg Expression
 * @type string
 * @default null
 * @text Expression
 * @desc The operation expression.
 */

(() =>{
    const pluginName = "Liy_Core";

    var params = PluginManager.parameters("Liy_Core");
    var isShowDevtools = Boolean(params["showDevtools"]) | false;
    
    //globalvar expression
    PluginManager.registerCommand(pluginName, "globalvar", args => {
        let expession = args.Expression;
        GlobalVar.resolveExp(expession);
    });

//-----------------------------------------------------------
    Scene_Map.prototype.onMapLoaded = function() {
        if (this._transfer) {
            $gamePlayer.performTransfer();
        }
        Liy.resolveAllDataMap();
        this.createDisplayObjects();
    };

    Main.prototype.onEffekseerLoad = function(){
        this.eraseLoadingSpinner();
        if(isShowDevtools) SceneManager.showDevTools();
        /*try{
            GlobalVar.loadVar();
        } catch(e) {

        }*/
        SceneManager.run(Scene_Boot);
    };
})();

//-----------------------------------------------------------
function Liy() {}

var $dataULDSMap = null;
var $dataLiyScenes = null;

var $testVar = [];

Liy.resolveAllDataMap = function() {
    try{
        var info = JSON.parse($dataMap.note);
        $dataULDSMap = info.ulds;
    } catch(e) {}
};

//-----------------------------------------------------------
function Liy_Tween(x, y){
    this._maxX = x;
    this._maxY = y;
    this._type = '';
}

Liy_Tween.prototype = Object.create(Liy_Tween.prototype);
Liy_Tween.prototype.constructor = Liy_Tween;

Liy_Tween.prototype.exec = function(pos) {
    return eval("this." + this._type + ".call(this, pos / this._maxX) * this._maxY");
};

Liy_Tween.easeInQuad =  function(pos) {
    return Math.pow(pos, 2);
};

Liy_Tween.easeOutQuad = function(pos) {
    return -(Math.pow((pos-1), 2) -1);
};

Liy_Tween.easeInOutQuad = function(pos) {
    if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,2);
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

Liy_Tween.reverse = function(pos) {
    return 1 - pos;
};

/*
tween: {
            easeInQuart: function(pos){
                return Math.pow(pos, 4);
            },

            easeOutQuart: function(pos){
                return -(Math.pow((pos-1), 4) -1)
            },

            easeInOutQuart: function(pos){
                if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,4);
                return -0.5 * ((pos-=2)*Math.pow(pos,3) - 2);
            },

            easeInQuint: function(pos){
                return Math.pow(pos, 5);
            },

            easeOutQuint: function(pos){
                return (Math.pow((pos-1), 5) +1);
            },

            easeInOutQuint: function(pos){
                if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,5);
                return 0.5 * (Math.pow((pos-2),5) + 2);
            },

            easeInSine: function(pos){
                return -Math.cos(pos * (Math.PI/2)) + 1;
            },

            easeOutSine: function(pos){
                return Math.sin(pos * (Math.PI/2));
            },

            easeInOutSine: function(pos){
                return (-.5 * (Math.cos(Math.PI*pos) -1));
            },

            easeInBack: function(pos){
                var s = 1.70158;
                return (pos)*pos*((s+1)*pos - s);
            },

            easeOutBack: function(pos){
                var s = 1.70158;
                return (pos=pos-1)*pos*((s+1)*pos + s) + 1;
            },

            easeInOutBack: function(pos){
                var s = 1.70158;
                if((pos/=0.5) < 1) return 0.5*(pos*pos*(((s*=(1.525))+1)*pos -s));
                return 0.5*((pos-=2)*pos*(((s*=(1.525))+1)*pos +s) +2);
            },

            elastic: function(pos) {
                return -1 * Math.pow(4,-8*pos) * Math.sin((pos*6-1)*(2*Math.PI)/2) + 1;
            },

            swingFromTo: function(pos) {
                var s = 1.70158;
                return ((pos/=0.5) < 1) ? 0.5*(pos*pos*(((s*=(1.525))+1)*pos - s)) :
                0.5*((pos-=2)*pos*(((s*=(1.525))+1)*pos + s) + 2);
            },

            swingFrom: function(pos) {
                var s = 1.70158;
                return pos*pos*((s+1)*pos - s);
            },

            swingTo: function(pos) {
                var s = 1.70158;
                return (pos-=1)*pos*((s+1)*pos + s) + 1;
            },

            bounce: function(pos) {
                if (pos < (1/2.75)) {
                    return (7.5625*pos*pos);
                } else if (pos < (2/2.75)) {
                    return (7.5625*(pos-=(1.5/2.75))*pos + .75);
                } else if (pos < (2.5/2.75)) {
                    return (7.5625*(pos-=(2.25/2.75))*pos + .9375);
                } else {
                    return (7.5625*(pos-=(2.625/2.75))*pos + .984375);
                }
            },

            bouncePast: function(pos) {
                if (pos < (1/2.75)) {
                    return (7.5625*pos*pos);
                } else if (pos < (2/2.75)) {
                    return 2 - (7.5625*(pos-=(1.5/2.75))*pos + .75);
                } else if (pos < (2.5/2.75)) {
                    return 2 - (7.5625*(pos-=(2.25/2.75))*pos + .9375);
                } else {
                    return 2 - (7.5625*(pos-=(2.625/2.75))*pos + .984375);
                }
            },

            easeFromTo: function(pos) {
                if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,4);
                return -0.5 * ((pos-=2)*Math.pow(pos,3) - 2);
            },

            easeFrom: function(pos) {
                return Math.pow(pos,4);
            },

            easeTo: function(pos) {
                return Math.pow(pos,0.25);
            },

            linear:  function(pos) {
                return pos
            },

        sinusoidal: function(pos) {
            return (-Math.cos(pos*Math.PI)/2) + 0.5;
        },

        mirror: function(pos, transition) {
            transition = transition || tween.sinusoidal;
            if(pos<0.5)
                return transition(pos*2);
            else
                return transition(1-(pos-0.5)*2);
        },

        flicker: function(pos) {
            var pos = pos + (Math.random()-0.5)/5;
            return tween.sinusoidal(pos < 0 ? 0 : pos > 1 ? 1 : pos);
        },

        wobble: function(pos) {
            return (-Math.cos(pos*Math.PI*(9*pos))/2) + 0.5;
        },

        pulse: function(pos, pulses) {
            return (-Math.cos((pos*((pulses||5)-.5)*2)*Math.PI)/2) + .5;
        },

        blink: function(pos, blinks) {
            return Math.round(pos*(blinks||5)) % 2;
        },

        spring: function(pos) {
            return 1 - (Math.cos(pos * 4.5 * Math.PI) * Math.exp(-pos * 6));
        },

        none: function(pos){
            return 0
        },

        full: function(pos){
            return 1
        }
}
*/

//-----------------------------------------------------------
function GlobalVar() {}
    
GlobalVar.prototype = Object.create(GlobalVar.prototype);
GlobalVar.constructor = GlobalVar;

var $globalVar = new Map();

GlobalVar.resolveExp = function(exp){
    let reg = new RegExp(/\w.*((=)|(+=)|(-=)|(\/=))/g);
    eval(exp);
    for(i in exp.match(reg)){
        eval("$globalVar." + i + " = " + eval(i));
    }
};

GlobalVar.VarFileStream = function(isload){
    if(isload) {
        $globalVariable = StorageManager.loadObject("GlobalVariable");
    } else {
        StorageManager.saveObject("GlobalVariable", $globalVariable);
    }
};

GlobalVar.loadVar = function() {
    this.VarFileStream(true);
    for(i in $globalVar){
        eval("var " + i + " = " + $globalVar[i]);
    }
};
