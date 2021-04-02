/*:
 * @target MZ
 * @plugindesc An unlimited layer display system belongs to LiyEngnie.
 * @author Moiyri
 */

(() =>{
    function Liy_ULDS(map){
        this._map = map;
    }

    Liy_ULDS.prototype = Object.create(Liy.prototype);
    Liy_ULDS.prototype.constructor = Liy_ULDS;

    Liy_ULDS.protorype.makeLayerList = function() {
        var note = JSON.parse(this._map.note);
        this._layers = note["layers"];
    };

    var _Spriteset_Map_prototype_createTilemap = Spriteset_Map.prototype.createTilemap;
    Spriteset_Map.prototype.createTilemap = function() {
        _Spriteset_Map_prototype_createTilemap.call(this);
        this._liy = new Liy_ULDS($datamap);
        this._liy.makeLayerList();
    };
})();