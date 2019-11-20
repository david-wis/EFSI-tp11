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
    producto.nombre = req.body.nombre;
    producto.descripcion = req.body.descripcion;
    producto.imagen = Buffer.from(req.body.imagen, 'base64');
    producto.precio = req.body.precio;
    producto.stock = req.body.stock;
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
    var nombreViejo = req.body.nombre;
    producto.nombre = req.body.nuevonombre;
    producto.descripcion = req.body.descripcion;
    producto.imagen = Buffer.from(req.body.imagen, 'base64');
    producto.precio = req.body.precio;
    producto.stock = req.body.stock;
    productoDao_1.default.ModificarProducto(producto, nombreViejo).then(function (resultado) {
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
    var nombre = req.body.nombre;
    productoDao_1.default.EliminarProducto(nombre);
    res.send({ status: "success" });
};
exports.obtenerTodos = function (req, res) {
    productoDao_1.default.ObtenerTodos().then(function (productos) {
        var productosBase64 = [];
        productos.map(function (prod) {
            var p = {
                nombre: prod.nombre,
                descripcion: prod.descripcion,
                imagen: prod.imagen.toString('base64'),
                stock: prod.stock,
                precio: prod.precio
            };
            productosBase64.push(p);
        });
        res.send(productosBase64);
    });
};
exports.obtenerUno = function (req, res) {
    var nombre = req.query.Nombre;
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
        res.end(data.toString('base64'));
    });
};
