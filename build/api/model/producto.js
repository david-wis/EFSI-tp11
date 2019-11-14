"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var uri = "mongodb://127.0.0.1:27017/tp11";
mongoose.connect({ useNewUrlParser: true }, uri, function (err) {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log("Successfully Connected! ");
    }
});
exports.ProductoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    imagen: { type: Buffer, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
});
var Producto = mongoose.model("Producto", exports.ProductoSchema);
exports.default = Producto;
/*export default class Producto {
    nombre?: string;
    descripcion?: string;
    imagen? : any;
    precio? : number;
    stock? : number;
    convertirImgABlob = () => {
        this.imagen = Buffer.from(this.imagen, "base64");
    }
}*/
