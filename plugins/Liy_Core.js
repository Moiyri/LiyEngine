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
 * @arg OperateSinal
 * @type string
 * @default let
 * @text Operation Sinal
 * @desc The operation Sinal that to do something.
 *
 * @arg Signal
 * @type string
 * @default var
 * @text Variable Sinal.
 * @desc Variable sinal.
 *
 * @Operation Arg
 * @type string
 * @default 0
 * @text Arguments
 * @desc The argumengs.
 */

(() =>{
    function Liy(){}

    Liy.prototype = Object.create(Liy.prototype);
    Liy.prototype.constructor = Liy;

    const pluginName = "Liy_Core";

    var params = PluginManager.parameters("Liy_Core");
    var isShowDevtools = Boolean(params["showDevtools"]) | false;
    
    PluginManager.registerCommand(pluginName, "globalvar", args => {
        let sinal = args.Sinal;
        let operation = args.OperateSinal;
        let gArgs = args.Arg;
        if(operation == "let"){
        
        }
    });

    var $dataULDSMap = null;
    var $dataLiyScenes = null;

    Liy.resolveAllDataMap = function(){
        var note = $dataMap.note;
    };

    function Liy.GlobalVariable(){}
    
    Liy.GlobalVariable.prototype = Object.create(Liy.GlobalVariable.prototype);
    Liy.GlobalVariable.constructor = Liy.GlobalVariable;

    var $globalVariable = new Map();

    const globalVarOperation = {
        "add" : Liy.GlobalVariable.add,
        "remove" : Liy.GlobalVariable.remove,
        "multiply" : Liy.GlobalVariable.multiply,
        "divide" : Liy.GlobalVariable.divide
    };

    Liy.GlobalVariable.loadGlobalVarFromFile = function(){
        $globalVariable = StorageManager.loadObject("GlobalVariable");
    };

    Liy.GlobalVariable.saveGlobalVarToFile = function(){
        StorageManager.saveObject("GlobalVariable", $globalVariable);
    };

    Liy.GlobalVariable.operateGlobalVariable = function(operation) {
        
    };

    var _Scene_Map_prototype_create = Scene_Map.prototype.create;
    Scene_Map.prototype.create = function(){
        _Scene_Map_prototype_create.call(this);
        Liy.resolveAllDataMap();
    };

    Main.prototype.onEffekseerLoad = function(){
        this.eraseLoadingSpinner();
        if(isShowDevtools) SceneManager.showDevTools();
        SceneManager.run(Scene_Boot);
    };
})();
