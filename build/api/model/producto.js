"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Producto = /** @class */ (function () {
    function Producto() {
        var _this = this;
        this.convertirImgABlob = function () {
            _this.imagen = Buffer.from(_this.imagen, "base64");
        };
    }
    return Producto;
}());
exports.default = Producto;
