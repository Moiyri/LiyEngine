/*:
 * @target MZ
 * @plugindesc 
 * @author Moiyri
 * 
 * @param uldsSettings
 * @text ULDS Settings
 * 
 * @param layers
 * @text Layer
 * @parent uldsSettings
 * @default []
 * @type struct<Layer>[]
 * 
 */

/*~struct~Layer:
 *
 * @param uid
 * @text UUID
 * @default
 * @type number
 * 
 * @param layerBitmap
 * @text Layer Bitmap
 * @default
 * @type file
 * @dir /img/pictures/
 * 
 * @param x
 * @text X
 * @default 0
 * @type number
 * 
 * @param y
 * @text Y
 * @default 0
 * @type number
 * 
 * @param z
 * @text Z
 * @default 0
 * @type number
 * 
 * @param opacity
 * @text Opacity
 * @default 255
 * @type number
 * 
 * @param blendMode
 * @text Blend Mode
 * @deault Normal
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * 
 */

(() => {
    const pluginName = "Liy_Graphics";

    var params = PluginManager.parameters(pluginName);

    //===========================
    //Button hovered effects
    //===========================
    Sprite_Button.prototype.updateFrame = function() {
        const frame = (this.isPressed() || this.isHovered()) ? this._hotFrame : this._coldFrame;
        if (frame) {
            this.setFrame(frame.x, frame.y, frame.width, frame.height);
        }
    };
    
    Sprite_Button.prototype.isHovered  = function() {
        return this.isBeingTouched();
    };
    
    Window_Selectable.prototype.refreshCursor = function() {
        if (this._cursorAll) {
            this.refreshCursorForAll();
        } else if (this.index() >= 0) {
            const rect = this.itemRect(this.index());
            this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
        } else {
            this.setCursorRect(0, 0, 0, 0);
        }
    };
    
    Window.prototype._refreshCursor = function() {
        const drect = this._cursorRect.clone();
        const srect = { x: 96, y: 96, width: 48, height: 48 };
        const m = 4;
        for (const child of this._cursorSprite.children) {
            child.bitmap = this._windowskin;
        }
        this._setRectPartsGeometry(this._cursorSprite, srect, drect, m);
    };
    
    //==========================================
    // ULDS
    //==========================================
    var allLayers = JSON.parse(JSON.stringify(params['layers'], paramJsonParse));
    
    const _Spriteset_Map_prototype_createTilemap = Spriteset_Map.prototype.createTilemap;
    Spriteset_Map.prototype.createTilemap = function() {
        _Spriteset_Map_prototype_createTilemap.call(this);
    };
    
    const _Spriteset_Map_prototype_updateTilemap = Spriteset_Map.prototype.updateTilemap;
    Spriteset_Map.prototype.updateTilemap = function() {
        _Spriteset_Map_prototype_updateTilemap.call(this);
    };
    
    Spriteset_Map.prototype.updateULDSTilemap = function() {
    }
    
    Spriteset_Map.prototype.updateFlashlight = function() {
        // Move
    
        // Rotate
    
    }
    
    const _Scene_Map_prototype_onTransfer = Scene_Map.prototype.onTransfer;
    Scene_Map.prototype.onTransfer = function() {
        _Scene_Map_prototype_onTransfer.call(this);
        //$dataULDSMap = null;
    };

})();