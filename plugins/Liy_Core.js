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
        SceneManager.run(Scene_Boot);
    };
})();

//-----------------------------------------------------------
function Liy() {}

var $dataULDSMap = null;
var $dataLiyScenes = null;

Liy.resolveAllDataMap = function() {
    var info = JSON.parse($dataMap.note);
    try{
        $dataULDSMap = info.ulds;
    } catch(e) {
        throw e;
    }
};

//-----------------------------------------------------------
function Lib_LibBezier(){}

//-----------------------------------------------------------
function GlobalVar() {}
    
GlobalVar.prototype = Object.create(GlobalVar.prototype);
GlobalVar.constructor = GlobalVar;

var $globalVar = new Map();

GlobalVar.resolveExp = function(exp){
exp.replace("", " ");
    for(i in new RegExp("/(=)|(+=)|(-=)|(*=)|(/=).?(/w)/").exec(exp)){
        exp.replace(i, $globalVar[i]);
    }
};

GlobalVar.execExp = function(exp){
}

GlobalVar.VarFileStream = function(isload){
    if(isload) $globalVariable = StorageManager.loadObject("GlobalVariable")
    else StorageManager.saveObject("GlobalVariable", $globalVariable);
};

GlobalVar.operatVar = function(op) {
};