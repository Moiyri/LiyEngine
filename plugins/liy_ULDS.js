/*:
 * @target MZ
 * @plugindesc An unlimited layer display system belongs to LiyEngnie.
 * @author Moiyri
 */

(() =>{
    function Liy_ULDS(){
    }

    Liy_ULDS.prototype = Object.create(Tilemap.rototype);
    Liy_ULDS.prototype.constructor = Liy_ULDS;

    Liy_ULDS.protorype.obtainLayerList = function() {
        var note = JSON.parse(this._map.note);
        this._upperlayers = note["upperlayers"].split(",");
        this._lowerlayers = note["lowerlayers"].split(",");
    };
    
    Spriteset_Map.prototype.createTilemap = function() {
        const tilemap = new Liy_ULDS();
        tilemap.tileWidth = $gameMap.tileWidth();
        tilemap.tileHeight = $gameMap.tileHeight();
        tilemap.setData($gameMap.width(), $gameMap.height(), $gameMap.data());
        tilemap.horizontalWrap = $gameMap.isLoopHorizontal();          tilemap.verticalWrap = $gameMap.isLoopVertical();
        this._baseSprite.addChild(tilemap);
        this._effectsContainer = tilemap;
        this._tilemap = tilemap;
        this.loadTileset();
    };

    
    
})();
