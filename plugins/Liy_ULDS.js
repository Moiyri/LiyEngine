/*:
 * @target MZ
 * @plugindesc An unlimited layer display system belongs to LiyEngine.
 * @author Moiyri
 */

(() =>{
    function Liy_ULDS(var map){
        this._map = map;
        this._layerList[] ={};
    }

    Liy_ULDS.prototype = Object.create(Liy_ULDS.prototype);
    Liy_ULDS.prototype.constructor = Liy_ULDS.prototype;  
    
    // [{layer:[name:name1,x:x,y:y,location:upper/lowwer]}]
    Liy_ULDS.prototype.obtainLayersInfo = function() {
        let info = JSON.parse(this._map.note);
        for(var i = 0; i <= info.layer.length; i++){
            let layer = new Liy_ULDS.Layer();
            layer.name(inf.layer[i].name);
            layer.x(info.layer[i].x);
            layer.y(info.layer[i].y);
            this._layerList.push(layer);
        }
    }

    Liy_ULDS.prototype.ULDSLayerList = function(){
        return this._layerList;
    };

    function Liy_ULDS.Layer(){
        this._name = "0";
        this._x = 0;
        this._y = 0;
    }

    Liy_ULDS.Layer.prototype = Object.create(Liy.ULDS.Layer.prototype);
    Liy_ULDS.Layer.prototype.constructor = Liy_ULDS.prototype;
    
    Object.defineProperty(Liy_ULDS.prototype, "name", {
        get:function(){
          return this._name;
        }
        set:function(name){
          this._name = name;
        },
        configurable: true;
    });

    Object.defineProperty(Liy_ULDS.prototype, "x", {
        get:function(){
            return this._x;
        },
        set:function(x){
            this._x = x;
        },
        configurable: true;
    });
    
    Object.defineProperty(Liy_ULDS.prototype, "y", {
        get:function(){
            return this._y;
        },
        set:function(){
            this._y = y;
        },
        configurable: true;
    });

    var _Spriteset_Map_prototype_initialize = Spriteset_Map.prototype.initialize;
    Spriteset_Map.prototype.initialize = function() {
        _Spriteset_Map_prototype_initialize.call(this);
        this._ULDSLayer = new Liy_ULDS($dataMap);
        this._ulayersSprite[] = {};
    };

    var _Spriteset_Map_prototype_createTilemap = Spriteset_Map.prototype.createTilemap;
    Spriteset_Map.prototype.createTilemap = function() {
        _Spriteset_Map_prototype_createTilemap.call(this);
        for(var ulayer of this._ULDSLayer.ULDSLayerList()){
            let sprite = new Sprite(ImageManager.loadPicture(ulayer.name()));
            sprite.x = ulayer.x();
            sprite.y = ulayer.y();
            this._baseSprite.addChild(sprite);
        }
    };

    var _Spriteset_Map_prototype_updateTilemap = Spriteset_Map.prototype.updateTilemap;
    Spriteset_Map.prototype.updateTilemap = function() {
        _Spriteset_Map_prototype_updateTilemap.call(this);
        for(var i = 0; i <= this._ULDSLayer.length; i++){
            this._ulayersSprite[i].x = this._ULDSLayer.x() - $gameMap.displayX() * $gameMap.TileWidth(); 
            this._ulayersSprite[i].y = this._ULDSLayer.y() - $gameMap.displayY() * $gameMap.TileHeight();
        }
    };
})();
