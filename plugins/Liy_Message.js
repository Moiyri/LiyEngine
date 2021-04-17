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
            $gameMessage.setFull(true);
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

    var _Window_Message_prototype_initialize = Window_Message.prototype.initialize;
    Window_Message.prototype.initialize = function(rect) {
        _Window_Message_prototype_initialize.call(this);
        let full = $gameMessage.fullMode();
        this.move(rect.x, full ? 0 : rect.y, rect.width,
            full ? Graphics.boxHeight : rect.height);
    };
)}();

Game_Message.prototype.resolveAutoMessage = function(text) {
    var reg = new RegExp(/\/am[*]/);
    if(reg.exec(text)){
        var msg = JSON.parse(new RegExp(/^[]$/).exec(reg.exec(text)[0]));
        this._autoMsgX = msg.x;
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
