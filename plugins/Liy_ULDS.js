/*:
 * @target MZ
 * @plugindesc An unlimited layer display system belonged to LiyEngine.
 * @author Moiyri
 * 
 * @help Liy_ULDS.js
 * 
 * Usage:
 *  To write note like this:
 * 
 * {
 *  "ulds": {
 *      "layer": [{"id" : 1, "origin": 0, "x": 0, "y": 0, "name": 0, "z": 0, "tiling" : 0, "blendmode" : 0, "opacity" : 0}, 
 *      {"id" : 2, "origin": 0, "x": 0, "y": 0, "name": 0, "z": 0, "tiling" : 0, "blendmode" : 0, "opacity" : 0}]
 *  }
 * }
 * 
 * @command tilemap
 * @desc Move, invisibile or change a layer.
 * 
 * @arg id
 * @type number
 * 
 * @arg x
 * @type number
 * @defalut 0
 * 
 * @arg y
 * @type number
 * @defalut 0
 * 
 * @arg z
 * @type number
 * @defalut 0
 * 
 * @arg blendMode
 * @type number
 * @defalut 0
 * 
 * @arg capacity
 * @type number
 * 
 * @arg scaleX
 * @type number
 * @default 100
 * 
 * @arg scaleY
 * @type number
 * @default 100
 * 
 * @arg easingType
 * @type string
 * 
 * @arg duration
 * @type number
 * 
 * 
 * 
 * @command flashlight
 * 
 * @arg pictureName
 * @type string
 * 
 * @arg id
 * @type number
 * 
 * @arg characterId
 * @type number
 * 
 * @arg x
 * @type number
 * 
 * @arg y
 * @type number
 * 
 * @arg z
 * @type number
 * 
 * @arg blendMode
 * @type number
 * @default 0
 * 
 * @arg opacity
 * @type number
 * @default 255
 * 
 * @arg scaleX
 * @type number
 * @default 100
 * 
 * @arg scaleY
 * @type number
 * @default 100
 * 
 * @arg easingType
 * @type string
 * 
 * @arg duration
 * @type number
 */

(() =>{

    const pluginName = "Liy_ULDS";

    //var params = PluginManager.parameters("Liy_ULDS");
    
    //set
    PluginManager.registerCommand(pluginName, "tilemap", args => {
        var tlId = Number(args.id);
        var _x = Number(args.x) || 0;
        var _y = Number(args.y) || 0;
        var _opacity = Number(args.opacity) || 0;
        var _blendMode = Number(args.blendMode) || 0;
        var _easingType = args.easingtype || null;
        var _duration = Number(args.duration) || 0;

        for(i = 0; i < $dataULDSMap.layer.length; i++){
            if(!$dataULDSMap.layer[i] === tlId) continue;
            $dataULDSMap.layer[i].duration = _duration;
            $dataULDSMap.layer[i].targetX = _x;
            $dataULDSMap.layer[i].targetY = _y;
            $dataULDSMap.layer[i].blendMode = _blendMode;
            $dataULDSMap.layer[i].targetOpacity = _opacity;
            $dataULDSMap.layer[i].easingType = _easingType;
            $dataULDSMap.layer[i].wholeDuration = _duration;
        }
    });

    PluginManager.registerCommand(pluginName, "flashlight", args =>{
        var flId = Number(args.id) || -1;
        var _name = args.pictrueName; // Specific required in Flashlight
        var _characterId = Number(args.characterId) || -1; // Specific required in Flashlight
        var _x = Number(args.x) || 0;
        var _y = Number(args.y) || 0;
        var _z = Number(args.z) || 0; // Specific required in Flashlight
        var _scaleX = Number(args.scaleX) || 100;
        var _scaleY = Number(args.scaleY) || 100;
        var _opacity = Number(args.opacity) || 0 ;
        var _blendMode = Number(args.blendMode) || 0;
        var _easingType = args.easingtype || null;
        var _duration = Number(args.duration) || 0; // null == 0

        if($dataFLashlight){
            var exist = false;
            for(i = 0 ; i < $dataFLashlight.length; i++){
                if($dataFLashlight[i].id === flId){
                    exist = true;
                    $dataFLashlight[i].characterId = _characterId;
                    $dataFLashlight[i].targetX = _x;
                    $dataFLashlight[i].targetY = _y;
                    $dataFLashlight[i].targetOpacity = _opacity;
                    $dataFLashlight[i].targetBlendMode = _blendMode;
                    $dataFLashlight[i].targetScaleX = _scaleX;
                    $dataFLashlight[i].targetScaleY = _scaleY;
                    $dataFLashlight[i].easingType = _easingType;
                    $dataFLashlight[i].duration = _duration;
                }
            }
            delete exist;
        }

        var light;
        light.sprite = new Sprite();
        light.sprite.bitmap = ImageManager.loadPicture(_name);
        light.id = flId;
        light.characterId = _characterId;
        light.x = _x;
        light.y = _y;
        light.z = _z;
        light.scaleX = _scaleX;
        light.sclaeY = _scaleY;
        light.opacity = _opacity;
        light.blendMode = _blendMode;
        light.easingType = _easingType;
        light.duration = _duration;
        light.wholeDuration = _duration;
        $dataFLashlight.push(light)

        delete light;
    });

    const _Spriteset_Map_prototype_createTilemap = Spriteset_Map.prototype.createTilemap;
    Spriteset_Map.prototype.createTilemap = function() {
        _Spriteset_Map_prototype_createTilemap.call(this);
        if(!$dataULDSMap) return;
        $dataULDSMap.layer.forEach(layer => {
            let sprite = layer.tiling || false ? new TilingSprite() : new Sprite();
            sprite.bitmap = ImageManager.loadPicture(layer.name);
            sprite.x = layer.x;
            sprite.y = layer.y;
            sprite.z = layer.z;
            sprite.blendMode = Number(layer.blendMode) || 0;
            sprite.opacity = Number(layer.opacity) || 255;
            sprite.move(layer.x - $gameMap.displayX() * $gameMap.tileWidth(), 
                layer.y - $gameMap.displayY() * $gameMap.tileHeight(), 
                sprite.width, sprite.height);
            this.addChild(sprite);
            layer.sprite = sprite;
        })
    };

    const _Spriteset_Map_prototype_updateTilemap = Spriteset_Map.prototype.updateTilemap;
    Spriteset_Map.prototype.updateTilemap = function() {
        _Spriteset_Map_prototype_updateTilemap.call(this);
        this.updateULDSTilemap();
        this.updateFlashlight();
    };

    Spriteset_Map.prototype.updateULDSTilemap = function() {
        if($dataULDSMap){
            for(i = 0; i < $dataULDSMap.layer.length; i++){
                var sprite = $dataULDSMap.layer[i].sprite;
                var x = $dataULDSMap.layer[i].x;
                var y = $dataULDSMap.layer[i].y;
                var opacity = sprite.opacity;

                if($dataULDSMap.layer[i].wholeDuration){
                    // Move
                    var tx = $dataULDSMap.layer[i].targetX || x;
                    var ty = $dataULDSMap.layer[i].targetY || y;
                    var sx = sprite.scaleX;
                    var sy = sprite.scaleY;
                    var tsx = $dataULDSMap.layer[i].targetScaleX;
                    var tsy = $dataULDSMap.layer[i].targetScaleY;
                    var to = $dataULDSMap.layer[i].targetOpacity || opacity;
                    var d = -- $dataULDSMap.layer[i].duration;
                    var wd = $dataULDSMap.layer[i].wholeDuration;
                    var type = $dataULDSMap.layer[i].easingType;

                    var pos = Liy_Tween.calcPosistion(wd - d, wd, type);

                    $dataULDSMap.layer[i].sprite.move(
                        x + (tx - x) * pos - $gameMap.displayX() * $gameMap.tileWidth(),
                        y + (ty - y) * pos - $gameMap.displayY() * $gameMap.tileHeight(),
                        sprite.width * (sx + (tsx - sx) * pos) / 100, ////
                        sprite.height * (sy + (tsy - sy) * pos) / 100
                    );

                    $dataULDSMap.layer[i].sprite.opacity = opacity + (to - opacity) * pos;
                    // Rotate

                    if(d == 0){
                        $dataULDSMap.layer[i].x = tx;
                        $dataULDSMap.layer[i].y = ty;
                        $dataULDSMap.layer[i].opacity = to;
                        delete $dataULDSMap.layer[i].wholeDuration;
                        delete $dataULDSMap.layer[i].duration;
                    }
                } else {
                    $dataULDSMap.layer[i].sprite.move(
                        x - $gameMap.displayX() * $gameMap.tileWidth(),
                        y - $gameMap.displayY() * $gameMap.tileHeight(),
                        sprite.width,
                        sprite.height
                    );
                }
            }
        }
    }

    Spriteset_Map.prototype.updateFlashlight = function() {
        // Move

        // Rotate

    }

    const _Scene_Map_prototype_onTransfer = Scene_Map.prototype.onTransfer;
    Scene_Map.prototype.onTransfer = function() {
        _Scene_Map_prototype_onTransfer.call(this);
        $dataULDSMap = null;
    };
})();