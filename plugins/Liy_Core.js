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
