/*:
 * @target MZ
 * @plugindesc An unlimited layer display system belongs to LiyEngine.
 * @author Moiyri
 * 
 * @help Liy_ULDS.js
 * 
 * Usage:
 *  To write note like this:
 * 
 * {
 *  "ulds": {
 *      "layer": [{"x": 0, "y": 0, "name": 0, "z": 0, "tiling" : 0, "blendmode" : 0}, 
 *      {"x": 0, "y": 0, "name": 0, "z": 0, "tiling" : 0, "blendmode" : 0}]
 *  }
 * }
 * 
 */

(() =>{
    function Liy_ULDS(){}

    Liy_ULDS.prototype = Object.create(Liy_ULDS.prototype);
    Liy_ULDS.prototype.constructor = Liy_ULDS.prototype;  

    var _Spriteset_Map_prototype_createTilemap = Spriteset_Map.prototype.createTilemap;
    Spriteset_Map.prototype.createTilemap = function() {
        _Spriteset_Map_prototype_createTilemap.call(this);
        if(!$dataULDSMap) return;
        this._uldsSprite = [];
        for(var i = 0, sprite = null; i < $dataULDSMap.layer.length; i++){
            sprite = $dataULDSMap.layer[i].tiling | false ? new TilingSprite() : new Sprite();
            sprite.bitmap = ImageManager.loadPicture($dataULDSMap.layer[i].name);
            sprite.x = $dataULDSMap.layer[i].x;
            sprite.y = $dataULDSMap.layer[i].y;
            sprite.z = $dataULDSMap.layer[i].z;
            sprite.blendMode = $dataULDSMap.layer[i].blendmode;
            sprite.move(sprite.x, sprite.y, Graphics.width, Graphics.height)
            this._uldsSprite.push(sprite);
            this.addChild(sprite);
        }
    };

    var _Spriteset_Map_prototype_updateTilemap = Spriteset_Map.prototype.updateTilemap;
    Spriteset_Map.prototype.updateTilemap = function() {
        _Spriteset_Map_prototype_updateTilemap.call(this);
        for(var i = 0; i < $dataULDSMap.layer.length; i++){
            this._uldsSprite[i].x = $dataULDSMap.layer[i].x - $gameMap.displayX() *  $gameMap.tileWidth(); 
            this._uldsSprite[i].y = $dataULDSMap.layer[i].y - $gameMap.displayY() * $gameMap.tileHeight();
        }
    };
})();
