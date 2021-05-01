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
 * @command set
 * @text Operate A Layer
 * @desc Move, invisibile or change a layer.
 * 
 * @arg name
 * @type number
 * @text Name
 * @desc The name of this layer.
 * 
 * @arg x
 * @type number
 * @defalut 0
 * @text X
 * @desc The X of this layer.
 * 
 * @arg y
 * @type number
 * @defalut 0
 * @text Y
 * @desc The Y of this layer.
 * 
 * @arg z
 * @type number
 * @defalut 0
 * @text Z
 * @desc The Z of this layer.
 * 
 * @arg blendMode
 * @type number
 * @defalut 0
 * @text Blend Mode
 * @desc The blend mode of this layer.
 * 
 * 
 * @arg invisibility
 * @type boolean
 * @defalut false
 * @text Invisibility
 * @desc Hide or displayer this layer.
 * 
 * @arg tween
 * @type string
 * @text Tween
 * @desc The animation of this layer.
 * 
 * @arg tweenTimewait
 * @type number
 * @text TweenTimewait
 * @desc The timewait of tween.
 */

(() =>{

    const pluginName = "Liy_ULDS";

    //var params = PluginManager.parameters("Liy_ULDS");
    
    //set
    PluginManager.registerCommand(pluginName, "set", args => {
        var name = args.name || '';
        var targetX = Number(args.x) || 0;
        var targetY = Number(args.y) || 0;
        var z = Number(args.z) || 0;
        var blendmode = Number(args.blendMode) || 0;
        var tween = args.tween || '';

        try{
            for(var i = 0, layer = null; i < $dataULDSMap.layer.length; i++){
                layer = $dataULDSMap.layer[i];
                if(!layer.name === name) continue;
                if(targetX || targetY){
                    layer._moving = true;
                    layer._targetX = targetX;
                    layer._targetY = targetY;
                }
                layer.z = z
                layer.blendMode = blendmode;
            }
        } catch(e) {}
    });

    function Liy_ULDS(){}

    Liy_ULDS.prototype = Object.create(Liy_ULDS.prototype);
    Liy_ULDS.prototype.constructor = Liy_ULDS.prototype;  

    const _Spriteset_Map_prototype_createTilemap = Spriteset_Map.prototype.createTilemap;
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

    const _Spriteset_Map_prototype_updateTilemap = Spriteset_Map.prototype.updateTilemap;
    Spriteset_Map.prototype.updateTilemap = function() {
        _Spriteset_Map_prototype_updateTilemap.call(this);
        if($dataULDSMap){
            for(var i = 0; i < $dataULDSMap.layer.length; i++){
                this._uldsSprite[i].x = $dataULDSMap.layer[i].x - $gameMap.displayX() *  $gameMap.tileWidth(); 
                this._uldsSprite[i].y = $dataULDSMap.layer[i].y - $gameMap.displayY() * $gameMap.tileHeight();
            }
            for(i in $dataULDSMap.layer){
                
            }
        }
    };

    const _Scene_Map_prototype_onTransfer = Scene_Map.prototype.onTransfer;
    Scene_Map.prototype.onTransfer = function() {
        _Scene_Map_prototype_onTransfer.call(this);
        $dataULDSMap = null;
    };
})();
