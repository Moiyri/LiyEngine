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
 * @param inputSettings
 * @text Input Settings
 * 
 * @param accessF3
 * @type boolean
 * @default true
 * @text Is access F3 input.
 * @parent inputSettings
 * 
 * @param accessF4
 * @type boolean
 * @default true
 * @text Is access F4 input.
 * @parent inputSettings
 * 
 * @param accessF5
 * @type boolean
 * @default true
 * @text Is access F5 input.
 * @parent inputSettings
 * 
 * @param titleVideo
 * @text Title Video
 * @default
 * @type string
 * 
 * @param titleVideoMuted
 * @text Title Video Muted
 * @default true
 * @type boolean
 * @parent titleVideo
 * 
 * @param titleVideoLoop
 * @text Title Video Loop
 * @type boolean
 * @parent titleVideo
 * 
 * 
 * @command globalVariable
 * @text Global Variable
 * 
 * @arg statement
 * @text Statement
 * @default
 * @type multiline_string
 */

(() =>{
    const pluginName = "Liy_Core";
    const params = PluginManager.parameters(pluginName);

    const isShowDevtools = params["showDevtools"] === "true" ? true : false;

    const isAccessF3 = params["F3"] === "true" ? true : false;
    const isAccessF4 = params["F4"] === "true" ? true : false;
    const isAccessF5 = params["F5"] === "true" ? true : false;

    const titleVideo = JSON.parse(JSON.stringify(params["titleVideo"], 
        paramJsonParse));
    const titleVideoMuted = params["titleVideoMuted"] === "true" ? true : false;
    const titleVideoLoop = params["titleVideoLoop"] === "true" ? true : false;
    
    //globalvar expression
    PluginManager.registerCommand(pluginName, "globalVariable", args => {
        GlobalVariable.resolveStatement(args.statement);
    });

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
    
    //==========================================================================
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

    var _Scene_Title_prototype_createBackground = Scene_Title.prototype.createBackground;
    Scene_Title.prototype.createBackground = function() {
        _Scene_Title_prototype_createBackground.call(this);
        this._videoSprite = new Sprite();
        if(titleVideo) {
            const texture = PIXI.Texture.from(titleVideo);
            let src = texture.baseTexture.source;
            src.muted = titleVideoMuted;
            src.loop = titleVideoLoop;
            this._videoSprite.texture = texture;
        }
        this.addChild(this._videoSprite);
    }
})();

//==============================================================================
function paramJsonParse(key, value) {
    try {
        return JSON.parse(value);
    } catch(e) {
        return value ? value : null;
    }
}

//==============================================================================
var $dataULDSLayer = null;
var $dataFLashlight = null;

var $testVar = [];

class Liy {
    static resolveAllDataMap() {
        try{
            const info = JSON.parse($dataMap.note);
            //$dataULDSMap = info.ulds;
        } catch(e) {
        }
    }
}

Array.prototype.remove = function(val) { 
    let index = this.indexOf(val); 
    if (index > -1) { 
        this.splice(index, 1); 
    } 
};

//==============================================================================
class GlobalVariable {
    static variables = [];

    static resolveStatement(state) {
        eval(state);
    }
    static saveToFile() {
        const realPath = this.directoryPath();
        const fileName = "GlobalVariables.json";
        StorageManager.fsWriteFile(realPath + fileName, this.variables);
        return true;
    }
    static loadFromFile() {
        const realPath = this.directoryPath();
        const fileName = "GlobalVariables.json";
        return StorageManager.fsReadFile(realPath + fileName);
    }
    static allVariables() {
        return this.variables;
    }
    static clearAll() {

    }
    static directoryPath() {
        const path = require("path");
        const base = path.dirname(process.mainModule.filename);
        return path.join(base, "data/");
    }
}