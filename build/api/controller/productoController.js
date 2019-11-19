"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var producto_1 = __importDefault(require("../model/producto"));
var productoDao_1 = __importDefault(require("../dao/productoDao"));
var resultado_1 = require("../model/resultado");
var fs_1 = __importDefault(require("fs"));
exports.agregar = function (req, res) {
    var producto = new producto_1.default();
    producto.nombre = req.query.nombre;
    producto.descripcion = req.query.descripcion;
    producto.imagen = req.query.imagen;
    producto.precio = req.query.precio;
    producto.stock = req.query.stock;
    productoDao_1.default.AgregarProducto(producto).then(function (resultado) {
        switch (resultado) {
            case resultado_1.Resultado.Exito:
                res.send({ status: "success" });
                break;
            case resultado_1.Resultado.Error:
                res.send({ status: "error", msg: "El dato ingresado no es valido" });
                break;
            case resultado_1.Resultado.NombreRepetido:
                res.send({ status: "error", msg: "El nombre ya existe" });
                break;
            default:
                console.log("wtfffff");
                break;
        }
    });
};
exports.modificar = function (req, res) {
    var producto = new producto_1.default();
    var nombreViejo = req.query.nombre;
    producto.nombre = req.query.nuevoNombre;
    producto.descripcion = req.query.descripcion;
    producto.imagen = req.query.imagen;
    producto.precio = req.query.precio;
    producto.stock = req.query.stock;
    productoDao_1.default.ModificarProducto(producto, nombreViejo).then(function (resultado) {
        console.log("2da venida de cristo", resultado);
        switch (resultado) {
            case resultado_1.Resultado.Exito:
                res.send({ status: "success" });
                break;
            case resultado_1.Resultado.Error:
                res.send({ status: "error", msg: "El dato ingresado no es valido" });
                break;
            case resultado_1.Resultado.FotoGrande:
                res.send({ status: "error", msg: "La foto es demasiado grande" });
                break;
            case resultado_1.Resultado.NombreRepetido:
                res.send({ status: "error", msg: "El nombre ya existe" });
                break;
            default:
                console.log("wtfffff");
                break;
        }
    });
};
exports.eliminar = function (req, res) {
    var nombre = req.query.nombre;
    productoDao_1.default.EliminarProducto(nombre);
};
exports.obtenerTodos = function (req, res) {
    productoDao_1.default.ObtenerTodos().then(function (productos) {
        res.send(productos);
    });
};
exports.obtenerUno = function (req, res) {
    var nombre = req.query.nombre;
    var producto = productoDao_1.default.ObtenerProducto(nombre);
    if (producto != null) {
        producto.then(function (producto) {
            if (producto != null) {
                res.send(producto);
            }
            else {
                res.send({ status: "error", msg: "El producto no existe" });
            }
        });
    }
};
exports.obtenerImgDefault = function (req, res) {
    fs_1.default.readFile('api/content/img_muestra.jpg', function (err, data) {
        if (err)
            throw err;
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(data);
    });
};
