/*:
 * @target MZ
 * @plugindesc An unlimited layer display system belongs to LiyEngine.
 * @author Moiyri
 */

(() =>{
    function Liy_ULDS(){
    }

    Liy_ULDS.prototype = Object.create(Liy_ULDS.prototype);
    Liy_ULDS.prototype.constructor = Liy_ULDS.prototype;  

    var _Spriteset_Map_prototype_createTilemap = Spriteset_Map.prototype.createTilemap;
    Spriteset_Map.prototype.createTilemap = function() {
        _Spriteset_Map_prototype_createTilemap.call(this);
        for(var i = 0; i < $dataULDSMap.layer.length; i++){
            this._uldsSprite = new Sprite(ImageManager.loadPicture($dataULDSMap.layer[i].name));
        }
    };

    var _Spriteset_Map_prototype_updateTilemap = Spriteset_Map.prototype.updateTilemap;
    Spriteset_Map.prototype.updateTilemap = function() {
        _Spriteset_Map_prototype_updateTilemap.call(this);
        for(var i = 0; i < this._ULDSLayer.length; i++){
            this._ULDSLayer[i].sprite.x = this._ULDSLayer[i].x - $gameMap.displayX() *  $gameMap.tileWidth(); 
            this._ULDSLayer[i].sprite.y = this._ULDSLayer[i].y - $gameMap.displayY() * $gameMap.tileHeight();
        }
    };
})();
