/*:
 * @target MZ
 * @plugindesc An unlimited layer display system belongs to LiyEngine.
 * @author Moiyri
 */

(() =>{
    function Liy_ULDS(map){
        this._map = map;
        this._layerList = [];
        this.obtainLayersInfo();
    }

    Liy_ULDS.prototype = Object.create(Liy_ULDS.prototype);
    Liy_ULDS.prototype.constructor = Liy_ULDS.prototype;  
    
    /*
    [
        {
            "layer":
            {"x" : 0,"y" : 0,"name" : "name", location : "upper/lowwer" }
        }
    ]
    */
    Liy_ULDS.prototype.obtainLayersInfo = function() {
        let info = JSON.parse(this._map.note);
        for(var i = 0; i <= info.length - 1; i++){
            let _layer = new Liy_ULDS.Layer();
            if(info[i].layer){
                _layer.name = info[i].layer.name;
                _layer.x = info[i].layer.x;
                _layer.y = info[i].layer.y;
                _layer.location = info[i].layer.location;
                this._layerList.push(_layer);
            }
        }
    }

    Liy_ULDS.prototype.ULDSLayerList = function() {
        return this._layerList;
    };

    Liy_ULDS.Layer = function() {
        this.name = "0";
        this.x = 0;
        this.y = 0;
        this.sprite = null;
    }

    Liy_ULDS.Layer.prototype = Object.create(Liy_ULDS.Layer.prototype);
    Liy_ULDS.Layer.prototype.constructor = Liy_ULDS.prototype;
    

    var _Spriteset_Map_prototype_createTilemap = Spriteset_Map.prototype.createTilemap;
    Spriteset_Map.prototype.createTilemap = function() {
        _Spriteset_Map_prototype_createTilemap.call(this);
        this._ULDSLayer = (new Liy_ULDS($dataMap)).ULDSLayerList();
        for(var i = 0; i < this._ULDSLayer.length; i++){
            this._ULDSLayer[i].sprite = new Sprite(ImageManager.loadPicture(this._ULDSLayer[i].name));
            this._ULDSLayer[i].sprite.x = this._ULDSLayer[i].x;
            this._ULDSLayer[i].sprite.y = this._ULDSLayer[i].y;
            this._baseSprite.addChild(this._ULDSLayer[i].sprite);
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
