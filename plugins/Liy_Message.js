/*:
 * @target MZ
 * @plugindesc A subsystem which executing messages in LiyEngine.
 * @author Moiyri
 * 
 * @help
 */

(() => {
    Game_Interpreter.prototype.command105 = function(params) {
        if ($gameMessage.isBusy()) {
            return false;
        }
        if($gameMessage.resolveAutoMessage(this.currentCommand().parameters[0])){
            $gameMessage.add(this.currentCommand().parameters[0]);
        } else {
            $gameMessage.setScroll(params[0], params[1]);
            while (this.nextEventCode() === 405) {
                this._index++;
                $gameMessage.add(this.currentCommand().parameters[0]);
            }
        }
        this.setWaitMode("message");
        return true;
    };

    /*var _Game_Message_prototype_clear = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function() {
        _Game_Message_prototype_clear.call(this);
        this._autoMsgX = 0;
        this._autoMsgY = 0;
        this._autoMsgHeight = Graphics.boxHeight;
        this._autoMsgWidth = Graphics.boxWidth;
    };*/

    Window_Message.prototype.startMessage = function() {
        const text = $gameMessage.allText();
        const textState = this.createTextState(text, 0, 0, 0);
        textState.x = this.newLineX(textState);
        textState.startX = textState.x;
        this._textState = textState;
        this.newPage(this._textState);
        this.updatePlacement();
        this.updateBackground();
        this.open();
        this._nameBoxWindow.start();
    };
})();

Game_Message.prototype.resolveAutoMessage = function(text) {
    var reg = new RegExp(/\/am[*]/);
    if(reg.exec(text)){
        var msg = JSON.parse(new RegExp(/^[]$/).exec(reg.exec(text)[0]));
        this._autoMsgX = msg.x;
        return true;
    }
    return false;
};

Window_Message.prototype.autoAdaptRect = function(textstat) {
    this.move(this.x, this.y, this.width, textstat.height);
};