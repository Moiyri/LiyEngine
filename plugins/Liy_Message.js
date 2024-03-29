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

    Scene_Map.prototype.newSusWindow = function() {
        const rect = new Rectangle(1, 1, 1, 1);
        const susWindow = new Window_SusMessage(rect);
        this._susWindow.concat(susWindow);
        this.addWindow(susWindow);
    };

    var _Scene_Map_prototype_initialize = Scene_Map.prototype.initialize;
    Scene_Map.prototype.initialize = function() {
        _Scene_Map_prototype_initialize.call(this);
        this.updatSusWindow();
    }
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
    this._susMode = set;
};

Scene_Map.prototype.updateSusWindow = function() {

};

Game_Message.prototype.setSusText = function(target, text) {
    this._susText.concat({
        target : target,
        text : text});
};  

Game_Message.prototype.hadSusText = function() {
    return !!this._susText;
};
        
//-----------------------------------------------
function Liy_Messages(){}

Liy_Messages.resolveNotes = function(note) {
    
};

Liy_Messages.processCodes = function(code) {
    try {
        Window_Message.prototype.processEscapeCharacter.call(this, code); 
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
    this._target = null;
    this._animation = null;
};

Window_SusMessage.prototype.startMessage = function() {
    this.updateLocation();
    Window_Message.prototype.startMessage.call(this);
};

Window_SusMessage.prototype.update = function() {
    this.updateLocation();
    Window_Message.prototype.update.call(this);
};

Window_SusMessage.prototype.updateLocation = function() {
    this.move(this._target.x - this._textState.width / 2, this._target.y + 10,
        this._textState.width, this._textState.height);
}

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

Window_SusMessage.prototype.canStart = function() {
    return $gameMessage.hasSusText();
};