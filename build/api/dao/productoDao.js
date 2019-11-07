"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resultado_1 = require("../model/resultado");
var ProductoDAO = /** @class */ (function () {
    function ProductoDAO() {
    }
    ProductoDAO.AgregarProducto = function (producto) {
        var result = resultado_1.Resultado.Exito;
        return result;
    };
    ProductoDAO.ModificarProducto = function (producto, nombreViejo) {
        var result = resultado_1.Resultado.Exito;
        return result;
    };
    ProductoDAO.EliminarProducto = function (nombre) {
    };
    ProductoDAO.ObtenerProducto = function (nombre) {
        var producto = null;
        return producto;
    };
    ProductoDAO.ObtenerTodos = function () {
        var productos = [];
        return productos;
    };
    return ProductoDAO;
}());
exports.default = ProductoDAO;
