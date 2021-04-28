/*:
 * @target MZ
 * @plugindesc A subsystem which executing messages in LiyEngine.
 * @author Moiyri
 * 
 * @help
 *
 * Use /ft[{"x" : 0, "bkg" : 0}] in ScrollText to display a full screen text.
 */

(() => {
    Game_Interpreter.prototype.command105 = function(params) {
        if ($gameMessage.isBusy()) {
            return false;
        }
        while (this.nextEventCode() === 405) {
            this._index++;
            if($gameMessage.hasFull(this.currentCommand().parameters[0]))
                $gameMessage.setFull(true);
            if(!$gameMessage.fullMode()) 
                $gameMessage.setScroll(params[0], params[1]);
            $gameMessage.add(this.currentCommand().parameters[0].replace(/\/ft\[.*\]/, ''));
        }
        this.setWaitMode("message");
        return true;
    };

    var _Window_Message_prototype_initialize = Window_Message.prototype.initialize;
    Window_Message.prototype.initialize = function(rect) {
        _Window_Message_prototype_initialize.call(this, rect);
        let full = $gameMessage.fullMode();
        this.move(rect.x, full ? 0 : rect.y, rect.width,
            full ? Graphics.boxHeight : rect.height);
    };

    var _Game_Message_prototype_clear = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function() {
        _Game_Message_prototype_clear.call(this);
        this._fullMode = 0;
        this._susMode = false;
        this._stateX = 0;
        this._stateY = 0;
    };

    Window_Message.prototype.startMessage = function() {
        const text = $gameMessage.allText();
        const textState = this.createTextState(text, 0, 0, 0);
        textState.x = this.newLineX(textState);
        textState.startX = $gameMessage._stateX;
        textState.startY = $gameMessage._stateY;
        this._textState = textState;
        this.newPage(this._textState);
        this.updatePlacement();
        this.updateBackground();
        this.open();
        this._nameBoxWindow.start();
    };

    Window_Message.prototype.canStart = function() {
        return $gameMessage.hasText() && !$gameMessage.scrollMode() && !$gameMessage.susMode();
    };

    var _Scene_Message_prototype_createAllWindows = Scene_Message.prototype.createAllWindows;
    Scene_Message.prototype.createAllWindows = function() {
        _Scene_Message_prototype_createAllWindows.call(this);
        this.createSusWindow();
    };

    Window.prototype.move = function(x, y, width, height, tween = null) {
        if(tween){
            this._moving = true;
            this._targetX = x || 0;
            this._targetY = y || 0;
            this._targetWidth = width || 0;
            this._targetHeight = height || 0;
            this._refreshAllParts();
            return;
        }
        this.x = x || 0;
        this.y = y || 0;
        if (this._width !== width || this._height !== height) {
            this._width = width || 0;
            this._height = height || 0;
            this._refreshAllParts();
        }
    };

    var _Window_prototype_update = Window.prototype.update;
    Window.prototype.update = function() {
        _Window_prototype_update.call(this);
        this._updateMoving();
    };

    Window.prototype._updateMoving = function() {
        if(this._moving){
            if(this.x === this._targetX 
                && this.y === this._targetY 
                && this.height === this._targetHeight 
                && this.width === this._targetWidth) {
                    delete this._targetX;
                    delete this._targetY;
                    delete this._targetHeight;
                    delete this._targetWidth;
                    delete this._mvTween;
                    this._moving = false;
            }
        }
    };
})();

Game_Message.prototype.hasFull = function(text) {
    return text.match(/\/ft\[.*\]/);
};

Game_Message.prototype.setFull = function(full) {
    this._fullMode = full;
};

Game_Message.prototype.fullMode = function() {
    return this._fullMode;
};

Game_Message.prototype.susMode = function() {
    return this._susMode;
};

Game_Message.prototype.setSus = function(set) {
    this.susMode = set;
};

Scene_Message.prototype.createSusWindow = function() {
    const rect = this.susWindowRect();
    this._susWindow = new Window_SusMessage(rect);
    this.addWindow(_susWindow);
};

Scene_Message.prototype.susWindowRect = function() {
    return new Rectangle(1, 1, 1, 1);
};

//-----------------------------------------------
function Liy_Messages(){}

Liy_Messages.resolveNotes = function(note) {
    
};

Liy_Messages.processCodes = function(code) {
    try {
    
    } catch {}
};

//-----------------------------------------------
function Window_SusMessage(){
    this.initialize(...arguments);
}

Window_SusMessage.prototype = Object.create(Window_Message.prototype);
Window_SusMessage.prototype.constructor = Window_SusMessage;
    
Window_SusMessage.prototype.initMembers = function(rect) {
    Window_Message.prototype.initMembers.call(this, rect);
    this._target = [];
    this._animation = null;
};

Window_SusMessage.prototype.update = function() {
    this.updateLocation();
    this.updateAllPages();
    Window_Message.prototype.update.call(this);
};

Window_SusMessage.prototype.updateLocation = function() {
    this.move(this._target.x - this._textState.width / 2, this._target.y + 10,
        this._textState.width, this._textState.height);
}

Window_SusMessage.prototype.updateAllPages = function() {

};

Window_SusMessage.prototype._updatePauseSign = function() {
    const sprite = this._pauseSignSprite;
    const x = Math.floor(this._animationCount / 16) % 2;
    const y = Math.floor(this._animationCount / 16 / 2) % 2;
    const sx = 144;
    const sy = 96;
    const p = 24;
    if (!this.pause) {
        sprite.alpha = 0;
    } else if (sprite.alpha < 1) {
        sprite.alpha = Math.min(sprite.alpha + 0.1, 1);
    }
    sprite.setFrame(sx + x * p, sy + y * p, p, p);
    sprite.visible = this.isOpen();
};