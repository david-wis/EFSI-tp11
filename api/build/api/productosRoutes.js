"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (app) {
    var productoController = require('./controller/productoController');
    app.route('/agregar')
        .post(productoController.agregar);
    app.route('/eliminar')
        .delete(productoController.eliminar);
    app.route('/modificar')
        .post(productoController.modificar);
    app.route('/obtenerTodos')
        .get(productoController.obtenerTodos);
    app.route('/obtenerUno')
        .get(productoController.obtenerUno);
    app.route('/obtenerImgDefault')
        .get(productoController.obtenerImgDefault);
};
