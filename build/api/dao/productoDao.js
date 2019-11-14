"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var resultado_1 = require("../model/resultado");
var bd_1 = __importDefault(require("../bd"));
var ProductoDAO = /** @class */ (function () {
    function ProductoDAO() {
    }
    ProductoDAO.AgregarProducto = function (producto) {
        var result = resultado_1.Resultado.Exito;
        var exito = true;
        exito = exito && ProductoDAO.Validar(producto.nombre);
        exito = exito && ProductoDAO.Validar(producto.descripcion);
        //exito = BD.Validar(producto.imagen);
        exito = exito && ProductoDAO.Validar(producto.precio);
        exito = exito && ProductoDAO.Validar(producto.stock);
        if (exito) {
            //producto.convertirImgABlob();
            if (bd_1.default.AgregarProducto(producto)) {
                result = resultado_1.Resultado.Exito;
            }
            else {
                result = resultado_1.Resultado.NombreRepetido;
            }
        }
        else {
            result = resultado_1.Resultado.Error;
        }
        return result;
    };
    ProductoDAO.Validar = function (valor) {
        var exito = false;
        switch (typeof valor) {
            case "number":
                if (valor >= 0) {
                    exito = true;
                }
                break;
            case "string":
                if (valor.trim() !== "") {
                    exito = true;
                }
                break;
            default:
                exito = true;
                break;
        }
        return exito;
    };
    ProductoDAO.ModificarProducto = function (producto, nombreViejo) {
        var result = resultado_1.Resultado.Exito;
        var exito = true;
        exito = exito && ProductoDAO.Validar(producto.nombre);
        exito = exito && ProductoDAO.Validar(producto.descripcion);
        //exito = BD.Validar(producto.imagen);
        exito = exito && ProductoDAO.Validar(producto.precio);
        exito = exito && ProductoDAO.Validar(producto.stock);
        exito = exito && ProductoDAO.Validar(nombreViejo);
        if (exito) {
            if (bd_1.default.ModificarProducto(producto, nombreViejo)) {
                result = resultado_1.Resultado.Exito;
            }
            else {
                result = resultado_1.Resultado.NombreRepetido;
            }
        }
        else {
            result = resultado_1.Resultado.Error;
        }
        return result;
    };
    ProductoDAO.EliminarProducto = function (nombre) {
        var bExito = false;
        if (ProductoDAO.Validar(nombre)) {
            bd_1.default.EliminarProducto(nombre);
            bExito = true;
        }
        return bExito;
    };
    ProductoDAO.ObtenerProducto = function (nombre) {
        var producto = null;
        if (ProductoDAO.Validar(nombre)) {
            producto = bd_1.default.ObtenerProducto(nombre);
        }
        return producto;
    };
    ProductoDAO.ObtenerTodos = function () {
        //let productos : IProducto[] = [];
        var promesaProds = bd_1.default.ObtenerTodos();
        return promesaProds;
    };
    return ProductoDAO;
}());
exports.default = ProductoDAO;
