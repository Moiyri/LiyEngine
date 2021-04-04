/*:
 * @target MZ
 * @plugindesc A core of LiyEngine
 * @author Moiyri
 *
 * @arg showDevtools
 * @type bool
 * @default false
 * @text Show Devtools
 * @desc Show Devtools automaticlly?
 */

(() =>{
    function Liy(){}

    Liy.prototype = Object.create(Liy.prototype);
    Liy.prototype.constructor = Liy;

    const pluginName = "Liy_Core";

    PluginManager.registerCommand = function(pluginName, "set", arg => {
        isShowDevtools = Boolean(arg.showDevtools);
    });
    
    var _Main_prototype_run = Main.prototype.run;
    Main.prototype.run = function(){
        _Main_prototype_run.call(this);
        if(isShowDevtools) SceneManager.showDevtools(); 
    };   
})();
