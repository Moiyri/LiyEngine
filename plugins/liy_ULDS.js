/*:
 * @target MZ
 * @plugindesc An unlimited layer display system belongs to LiyEngnie.
 * @author Moiyri
 */

(() =>{
    function Liy_ULDS(){}

    Liy_ULDS.prototype = Object.create(Liy_ULDS.prototype);
    Liy_ULDS.prototype.constructor = Liy_ULDS.prototype;

    var _Spriteset_Map_prototype_createTilemap = Spriteset_Map.prototype.createTilemap;
    Spriteset_Map.prototype.createTilemap = function() {
        _Spriteset_Map_prototype_createTilemap.call(this);
        this._tiletest = new Sprite(ImageManager.loadPicture("test"));
        this._baseSprite.addChild(this._tiletest);
        //this._tiletest.x = -48;
        //this._tiletest.y = -48;
    };

    var _Spriteset_Map_prototype_updateTilemap = Spriteset_Map.prototype.updateTilemap;
    Spriteset_Map.prototype.updateTilemap = function() {
        _Spriteset_Map_prototype_updateTilemap.call(this);
        this._tiletest.x = - $gameMap.displayX() * $gameMap.tileWidth();
        this._tiletest.y = - $gameMap.displayY() * $gameMap.tileHeight();
    };
})();
