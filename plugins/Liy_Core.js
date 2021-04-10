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
    function Liy(){}

    Liy.prototype = Object.create(Liy.prototype);
    Liy.prototype.constructor = Liy;

    const pluginName = "Liy_Core";

    var params = PluginManager.parameters("Liy_Core");
    var isShowDevtools = Boolean(params["showDevtools"]) | false;
    
    PluginManager.registerCommand(pluginName, "globalvar", args => {
        let expession = args.Expression;
        if(operation == "let"){
            $globalVariable.set(_sinal, _arg);
        } else {
            globalVarOperation[_op].call(this, $globalVariable[_sinal], _args);
        }
    });

    var $dataULDSMap = null;
    var $dataLiyScenes = null;

    Liy.resolveAllDataMap = function(){
        var note = $dataMap.note;
    };

    function GlobalVar(){}
    
    GlobalVar.prototype = Object.create(GlobalVar.prototype);
    GlobalVar.constructor = GlobalVar;

    var $globalVariable = new Map();

    const globalVarOperation = {
        "add" : GlobalVariable.add,
        "remove" : GlobalVariable.remove,
        "multiply" : GlobalVariable.multiply,
        "divide" : GlobalVariable.divide
    };

    GlobalVar.VarFileStream = function(isload){
        if(isload) $globalVariable = StorageManager.loadObject("GlobalVariable");
        else StorageManager.saveObject("GlobalVariable", $globalVariable);
    };

    GlobalVar.operatVar = function(op) {
        
    };

    var _Scene_Map_prototype_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function(){
        _Scene_Map_prototype_create.call(this);
        Liy.resolveAllDataMap().call(this);
    };

    Main.prototype.onEffekseerLoad = function(){
        this.eraseLoadingSpinner();
        if(isShowDevtools) SceneManager.showDevTools();
        SceneManager.run(Scene_Boot);
    };
})();
