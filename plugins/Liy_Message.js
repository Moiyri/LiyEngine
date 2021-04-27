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
    
Window_SusMessage.prototype.initMembers = function() {
    Window_Message.prototype.initMembers.call(this);
    this._target = null;
    this._animation = null;
};

Window_SusMessage.prototype.update = function() {
    this.updateLocation();
    Window_Message.prototype.update.call(this);
};

Window_SusMessage.prototype.startMessage = function() {
    
};

Window_SusMessage.prototype.updateLocation = function() {
    this.move(this._target.x - this._textState.width / 2, this._target.y + 10,
        this._textState.width, this._textState.height);
};

Window_SusMessage.prototype._updatePauseSign = function() {
    Window.prototype._updatePauseSign.call(this);
    
};
