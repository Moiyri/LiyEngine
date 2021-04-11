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

    function Liy(){}

    Liy.prototype = Object.create(Liy.prototype);
    Liy.prototype.constructor = Liy;

    var $dataULDSMap = null;
    var $dataLiyScenes = null;

    /*
        {
            "ulds": {
                "layer": [{"x": 0, "y": 0, "name": 0, "location": 0}]
            }
        }
    */
    Liy.resolveAllDataMap = function(){
        var info = JSON.parse($dataMap.note);
        try{
            $dataULDSMap = info.ulds;
        } catch(e) {
            throw e;
        }
    };

//-----------------------------------------------------------

    function GlobalVar(){}
    
    GlobalVar.prototype = Object.create(GlobalVar.prototype);
    GlobalVar.constructor = GlobalVar;

    var $globalVariable = new Map();

    const globalVarOperation = {
        "add" : GlobalVar.add,
        "remove" : GlobalVar.remove,
        "multiply" : GlobalVar.multiply,
        "divide" : GlobalVar.divide
    };

    GlobalVar.resolveExp = function(exp){

    };

    GlobalVar.VarFileStream = function(isload){
        if(isload) $globalVariable = StorageManager.loadObject("GlobalVariable");
        else StorageManager.saveObject("GlobalVariable", $globalVariable);
    };

    GlobalVar.operatVar = function(op) {
        
    };

//-----------------------------------------------------------

    var _Scene_Map_prototype_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function(){
        _Scene_Map_prototype_onMapLoaded.call(this);
        Liy.resolveAllDataMap();
    };

    Main.prototype.onEffekseerLoad = function(){
        this.eraseLoadingSpinner();
        if(isShowDevtools) SceneManager.showDevTools();
        SceneManager.run(Scene_Boot);
    };
})();
