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
function Liy_Tween(x, y, type){
    this._maxX = x;
    this._maxY = y;
    this._type = tweenMap[type.toUpperCase()];
}

Liy_Tween.prototype = Object.create(Liy_Tween.prototype);
Liy_Tween.prototype.constructor = Liy_Tween;

const tweenMap = {
    EASEINQUAD : Liy_Tween.easeInQuad, 
    EASEOUTQUAD : Liy_Tween.easeOutQuad, 
    EASEINOUTQUAD : Liy_Tween.easeInOutQuad, 
    EASEINCUBIC : Liy_Tween.easeInCubic, 
    EASEOUTCUBIC : Liy_Tween.easeOutCubic, 
    EASEINOUTCUBIC : Liy_Tween.easeInOutCubic, 
    EASEINBACK : Liy_Tween.easeInBack, 
    EASEOUTBACK : Liy_Tween.easeOutBack, 
    EASEINOUTBACK : Liy_Tween.easeInOutBack,
    EASEINSINE : Liy_Tween.easeInSine, 
    EASEOUTSINE : Liy_Tween.easeOutSine, 
    EASEINOUTSINE : Liy_Tween.easeInOutSine, 
    SWINGTO : Liy_Tween.swingTo,  
    SWINGFROM : Liy_Tween.swingFrom, 
    SWINGFROMTO : Liy_Tween.swingFromTo, 
    REVERSE : Liy_Tween.reverse
};

Liy_Tween.prototype.exec = function(pos) {
    return this._type.call(this, pos / this._maxX) * this._maxY;
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
    try{
        if(isload) {
            $globalVariable = StorageManager.loadObject("GlobalVariable");
        } else {
            StorageManager.saveObject("GlobalVariable", $globalVariable);
        }
    } catch{}
};

GlobalVar.loadVar = function() {
    this.VarFileStream(true);
    for(i in $globalVar){
        eval("var " + i + " = " + $globalVar[i]);
    }
};