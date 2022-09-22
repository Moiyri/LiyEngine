/*:
 * @target MZ
 * @plugindesc The core of LiyEngine
 * @author Moiyri
 * 
 * @param globalVariables
 * @text Global Variables
 * @default []
 * @type string[]
 * 
 * @param devSettings
 * @text Development Settings
 *
 * @param showDevtools
 * @type boolean
 * @default false
 * @text Show Devtools
 * @desc Show Devtools when running.
 * @parent devSettings
 * 
 * @param inputSettings
 * @text Input Settings
 * 
 * @param accessF3
 * @type boolean
 * @default true
 * @text Access F3 input.
 * @parent inputSettings
 * 
 * @param accessF4
 * @type boolean
 * @default true
 * @text Access F4 input.
 * @parent inputSettings
 * 
 * @param accessF5
 * @type boolean
 * @default true
 * @text Access F5 input.
 * @parent inputSettings
 * 
 * @param webSettings
 * @text Web Settings
 * 
 * @param bodyBackground
 * @text Document Body Background
 * @type file
 * @dir /img
 * @parent webSettings
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
 * @default true
 * @type boolean
 * @parent titleVideo
 * 
 * @param titleVideoPoster
 * @text Title Video Poster
 * @desc Image to show when video was failed.
 * @default
 * @type file
 * @dir /img/pictures
 * @parent titleVideo
 * 
 * @param titleSettings
 * @text Title Commands
 * 
 * @param titleNewGame
 * @text New Game
 * @default true
 * @type boolean
 * @parent titleSettings
 * 
 * @param titleContinue
 * @text Continue
 * @default true
 * @type boolean
 * @parent titleSettings
 * 
 * @param titleOptions
 * @text Options
 * @default true
 * @type boolean
 * @parent titleSettings
 * 
 * @param titleExit
 * @text Exit
 * @default true
 * @type boolean
 * @parent titleSettings
 * 
 * @param titleExitText
 * @text Text
 * @default Exit
 * @type string
 * @parent titleExit
 * 
 * @param titleFadeSpeed
 * @text Fade Speed
 * 
 * @param titleFadeIn
 * @text In
 * @default 24
 * @type number
 * @min 1
 * @parent titleFadeSpeed
 * 
 * @param titleFadeOut
 * @text Out
 * @default 24
 * @type number
 * @min 1
 * @parent titleFadeSpeed
 * 
 * @param splashSettings
 * @text Splash Settings
 * 
 * @param splashFadeSpeed
 * @text Fade Speed
 * @default 24
 * @type string
 * @parent splashSettings
 * 
 * @param splashContents
 * @text Contents
 * @default []
 * @type struct<SplashContent>[]
 * @parent splashSettings
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

/*~struct~SplashContent:
 * @param image
 * @text Image
 * @type file
 * @dir /img
 * 
 * @param video
 * @text Video
 * @default
 * @type string
 * 
 * @param audio
 * @text Audio
 * @type file
 * @dir /audio
 * @parent image
 * 
 * @param duration
 * @text Duration
 * @type number
 * @min 1
 * @parent image
 *
 */

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

    static init() {
        this.variables = this.loadFromFile();
    }

    static resolveStatement(state) {
        eval(state);
    }
    static saveToFile() {
        const fileName = "GlobalVariables.json";
        StorageManager.fsWriteFile("/data/" + fileName, this.variables);
        return true;
    }
    static loadFromFile() {
        const fileName = "GlobalVariables.json";
        return StorageManager.fsReadFile("/data/" + fileName);
    }
    static allVariables() {
        return this.variables;
    }
    static clearAll() {
        this.variables = [];
    }
}


(() =>{
    "use strict"

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
    const titleVideoPoster = params["titleVideoPoster"];
    const titleFadeIn = Number(params["titleFadeIn"]) || 24;
    const titleFadeOut = Number(params["titleFadeOut"]) || 24;

    const splashFadeSpeed = Number(params["splashFadeSpeed"]) || 24;
    const splashContents = JSON.parse(JSON.stringify(params["splashContents"], 
        paramJsonParse))

    let _titleCommands = {
        "titleNewGame": params["titleNewGame"],
        "titleContinue": params["titleContinue"],
        "titleOptions": params["titleOptions"],
        "titleExit": params["titleExit"]
    }

    const titleCommands = JSON.parse(JSON.stringify(_titleCommands, paramJsonParse));
    const titleExitText = params["titleExitText"] || "Exit";

    // GlobalVariable.init();
    
    //globalvar expression
    PluginManager.registerCommand(pluginName, "globalVariable", args => {
        GlobalVariable.resolveStatement(args.statement);
    });

    Object.defineProperty(TextManager, "exit", {
        value: titleExitText
    })

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
            let src = texture.baseTexture.resource.source;
            src.muted = titleVideoMuted;
            src.loop = titleVideoLoop;
            if(titleVideoPoster) {
                src.poster = titleVideoPoster;
            }
            this._videoSprite.texture = texture;
        }
        this.addChild(this._videoSprite);
    }

    Window_TitleCommand.prototype.makeCommandList = function() {
        const continueEnabled = this.isContinueEnabled();
        if(titleCommands["titleNewGame"]) 
            this.addCommand(TextManager.newGame, "newGame");
        if(titleCommands["titleContinue"]) 
            this.addCommand(TextManager.continue_, "continue", continueEnabled);
        if(titleCommands["titleOptions"])
            this.addCommand(TextManager.options, "options");
        if(titleCommands["titleExit"])
            this.addCommand(TextManager.exit, "exit");
    };

    Scene_Title.prototype.commandWindowRect = function() {
        const offsetX = $dataSystem.titleCommandWindow.offsetX;
        const offsetY = $dataSystem.titleCommandWindow.offsetY;
        const ww = this.mainCommandWidth();
        const wh = this.calcWindowHeight(4, true);
        const wx = (Graphics.boxWidth - ww) / 2 + offsetX;
        const wy = Graphics.boxHeight - wh - 96 + offsetY;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Title.prototype.commandExit = function() {
        SceneManager.exit();
    };

    Scene_Title.prototype.start = function() {
        Scene_Base.prototype.start.call(this);
        SceneManager.clearStack();
        this.adjustBackground();
        this.playTitleMusic();
        this.startFadeIn(titleFadeIn, false);
    };

    Scene_Base.prototype.fadeOutAll = function() {
        const time = this.slowFadeSpeed() / 60;
        AudioManager.fadeOutBgm(time);
        AudioManager.fadeOutBgs(time);
        AudioManager.fadeOutMe(time);
        this.startFadeOut(titleFadeOut);
    };

    Scene_Boot.prototype.startNormalGame = function() {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Title);
        // SceneManager.goto(Scene_Splash);
        Window_TitleCommand.initCommandPosition();
    };
    

    class Scene_Splash extends Scene_Base {
        initialize() {
            super.initialize();
            this.loadSplashings();
            this._startSplashing = false;
            this._splashDuration = 0;
        }

        loadSplashings() {
            this._splashings = [];
            for(let i = splashContents.length - 1; i >= 0; i--) {
                let content = splashContents[i];
                let sprite = new Sprite();
                if(content.image) {
                    sprite.bitmap = ImageManager.loadBitmap("/img/", content.image);
                } else if(content.video) {
                    sprite.texture = PIXI.Texture.from(content.video);
                }
                this._splashings.push({
                    sprite: sprite,
                    audio: content.audio, 
                    duration: content.duration
                });
            }
        }

        start() {
            super.start();
            this.startSplashing();
            this.startFadeIn(this.fadeSpeed(), false);
        }

        stop() {
            super.stop();
            this.fadeOutAll();
        }

        update() {
            super.update();
            this.updateContents();
        }

        updateContents() {
            if(this.isReady()) {
                if(this._splashings) {
                    if(this._splashDuration <= 0) {
                        let splashing = this._splashings.pop();
                        this._splashDuration += splashing.duration;
                    }
                } else {
                    this.terminateSplash();
                }
            }
        }

        startSplashing() {
            this._startSplashing = true;
        }

        terminateSplash() {
            
        }

        isReady() {
            return (
                ImageManager.isReady() &&
                EffectManager.isReady() &&
                FontManager.isReady() &&
                this._startSplashing
            );
        }

        terminate() {
            AudioManager.stopAll();
        }

        fadeSpeed() {
            return splashFadeSpeed;
        }
    }
})();