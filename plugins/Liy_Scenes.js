/*:
 * @target MZ
 * @plugindesc To expand the function of initial scene, belongs to LiyEngine.
 * @author: Moiyri
 * 
 * @param Wait Time
 * @desc time of waiting.
 * @default 2
 * 
 * @param Fade In Time
 * @desc rate of fade in.
 * @default 24
 * 
 * @param Fade Out Time
 * @desc Rate of fade out.
 * @default 24
 * 
 * @param Image
 * @desc Image to show
 * @default 
 * @type file
 * @dir image/system
 * 
 * @param Audio
 * @desc Audio to play.
 * @default 
 * @type file
 * @dir audio/se
 */

function Scene_Splash() {
    this.initialize.apply(this, arguments);
}

Scene_Splash.prototype = Object.create(Scene_Base.prototype);
Scene_Splash.prototype.constructor = Scene_Splash;

Scene_Splash.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
    this._frame = 0;
};

Scene_Splash.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this._image  = new Sprite(ImageManager.loadBitmap('img/system/', _Image));
    this._image.x = 0
    this._image.y = 0;
    this.addChild(this._image);
};

Scene_Splash.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    this.startFadeIn(fade_in_time, false);
    AudioManager.playSe({ name: _Audio, volume: 100, pitch: 100 });
};

Scene_Splash.prototype.update = function(){
    if((this._frame >= 0) && (this._frame < (wait_time * 60))){
        this._frame ++;
    }else if(this._frame >= (wait_time * 60)){
        this._frame = -1;
        SceneManager.goto(Scene_Title);
    }
    Scene_Base.prototype.update.call(this);
}

Scene_Splash.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
    AudioManager.stopAll();
};

Scene_Splash.prototype.stop = function(){
    Scene_Base.prototype.stop.call(this);
    this.fadeOutAll();
}

Scene_Boot.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if (DataManager.isBattleTest()) {
        DataManager.setupBattleTest();
        SceneManager.goto(Scene_Battle);
    } else if (DataManager.isEventTest()) {
        DataManager.setupEventTest();
        SceneManager.goto(Scene_Map);
    } else {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Splash);
        Window_TitleCommand.initCommandPosition();
    }
    this.updateDocumentTitle();
};
