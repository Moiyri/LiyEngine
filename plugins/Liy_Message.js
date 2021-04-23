/*:
 * @target MZ
 * @plugindesc A subsystem which executing messages in LiyEngine.
 * @author Moiyri
 * 
 * @help
 *
 * Use /ft[{"x" : 0, "pattern" : "normal"}] in ScrollText to display a full screen text.
 */

(() => {
    Game_Interpreter.prototype.command105 = function(params) {
        if ($gameMessage.isBusy()) {
            return false;
        }
        while (this.nextEventCode() === 405) {
            this._index++;
            if($gameMessage.resolveMessages(this.currentCommand().parameters[0])){
                $gameMessage.setFull(true);
            }
            if(!$gameMessage.fullMode()) $gameMessage.setScroll(params[0], params[1]);
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
        this._displayPattern = "";
    };

    Window_Message.prototype.startMessage = function() {
        const text = $gameMessage.allText();
        const textState = this.createTextState(text, 0, 0, 0);
        textState.x = this.newLineX(textState);
        textState.startX = $gameMessage._stateX;
        this._textState = textState;
        this.newPage(this._textState);
        this.updatePlacement();
        this.updateBackground();
        this.open();
        this._nameBoxWindow.start();
    };
})();

Game_Message.prototype.resolveMessages = function(text) {
    var reg = new RegExp(/\/ft\[.*\]/);
    var msg = text.match(reg);
    if(msg){
        info = JSON.parse(msg[0].replace(/\/ft\[|\]/g, ''));
        this._stateX = info.x;
        this._background = info.bkg;
        this._displayPattern = info.pattern;
        return true;
    }
    return false;
};

Game_Message.prototype.setFull = function(full) {
    this._fullMode = full;
};

Game_Message.prototype.fullMode = function() {
    return this._fullMode;
};
