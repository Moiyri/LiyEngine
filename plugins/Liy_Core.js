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
 */

(() =>{
    function Liy(){}

    Liy.prototype = Object.create(Liy.prototype);
    Liy.prototype.constructor = Liy;

    const pluginName = "Liy_Core";

    var params = PluginManager.parameters("Liy_Core");
    var isShowDevtools = Boolean(params["showDevtools"]) | false;

    $dataULDSMap = null;

    Liy.tackleDataMap = function(){
        var note = $dataMap.note;
    };

    Main.prototype.onEffekseerLoad = function(){
        this.eraseLoadingSpinner();
        if(isShowDevtools) SceneManager.showDevTools();
        SceneManager.run(Scene_Boot);
    };
})();
