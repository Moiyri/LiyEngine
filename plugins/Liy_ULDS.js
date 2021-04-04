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
    
    // [{layer:[name:name1,x:x,y:y,location:upper/lowwer]}]
    Liy_ULDS.prototype.obtainLayersInfo = function() {
        let info = JSON.parse(this._map.note);
        for(var i = 0; i <= info.length - 1; i++){
            let _layer = new Liy_ULDS.Layer();
            if(info[i].layer){
                _layer.name = info[i].layer.name;
                _layer.x = info[i].layer.x;
                _layer.y = info[i].layer.y;
                this._layerList.push(_layer);
            }
        }
    }

    Liy_ULDS.prototype.ULDSLayerList = function() {
        return this._layerList;
    };

    Liy_ULDS.Layer = function() {
        this._name = "0";
        this._x = 0;
        this._y = 0;
    }

    Liy_ULDS.Layer.prototype = Object.create(Liy_ULDS.Layer.prototype);
    Liy_ULDS.Layer.prototype.constructor = Liy_ULDS.prototype;
    
    Object.defineProperty(Liy_ULDS.prototype, "name", {
        get:function(){
          return this._name;
        },
        set:function(name){
          this._name = name;
        },
        configurable: true
    });

    Object.defineProperty(Liy_ULDS.prototype, "x", {
        get:function(){
            return this._x;
        },
        set:function(x){
            this._x = x;
        },
        configurable: true
    });
    
    Object.defineProperty(Liy_ULDS.prototype, "y", {
        get:function(){
            return this._y;
        },
        set:function(){
            this._y = y;
        },
        configurable: true
    });

    var _Spriteset_Map_prototype_initialize = Spriteset_Map.prototype.initialize;
    Spriteset_Map.prototype.initialize = function() {
        _Spriteset_Map_prototype_initialize.call(this);
    };

    var _Spriteset_Map_prototype_createTilemap = Spriteset_Map.prototype.createTilemap;
    Spriteset_Map.prototype.createTilemap = function() {
        _Spriteset_Map_prototype_createTilemap.call(this);
        this._ULDSLayer = (new Liy_ULDS($dataMap)).ULDSLayerList();
        this._ulayersSprite = [];
        for(var i = 0; i < this._ULDSLayer.length; i++){
            let sprite = new Sprite(ImageManager.loadPicture(this._ULDSLayer[i].name));
            sprite.x = this._ULDSLayer[i].x;
            sprite.y = this._ULDSLayer[i].y;
            this._ulayersSprite.push(sprite);
            this._baseSprite.addChild(sprite);
        }
    };

    var _Spriteset_Map_prototype_updateTilemap = Spriteset_Map.prototype.updateTilemap;
    Spriteset_Map.prototype.updateTilemap = function() {
        _Spriteset_Map_prototype_updateTilemap.call(this);
        for(var i = 0; i < this._ULDSLayer.length; i++){
            this._ulayersSprite[i].x = this._ULDSLayer[i].x - $gameMap.displayX() *  $gameMap.tileWidth(); 
            this._ulayersSprite[i].y = this._ULDSLayer[i].y - $gameMap.displayY() * $gameMap.tileHeight();
        }
    };
})();