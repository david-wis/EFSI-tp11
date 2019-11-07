import Producto from "../model/producto";
import ProductoDAO from "../dao/productoDao";
import {Resultado} from "../model/resultado";
import fs from 'fs';

exports.agregar = (req : any, res : any) => {
    let producto : Producto = new Producto();
    producto.nombre = req.body.producto.nombre;
    producto.descripcion = req.body.producto.descripcion; 
    producto.imagen = req.body.producto.imagen; 
    producto.precio = req.body.producto.precio;  
    producto.stock = req.body.producto.stock; 
    let resultado : Resultado = ProductoDAO.AgregarProducto(producto);
    switch(resultado){
        case Resultado.Exito:
            res.send({status: "success"});
            break;
        case Resultado.Error:
            res.send({status: "error", msg: "El dato ingresado no es valido"});
            break;
        case Resultado.FotoGrande:
            res.send({status: "error", msg: "La foto es demasiado grande"});
            break;
        case Resultado.NombreRepetido:
            res.send({status: "error", msg: "El nombre ya existe"});
            break;
        default:
            console.log("wtfffff");
            break;
    }
}

exports.modificar = (req : any, res : any) => {
    let producto : Producto = new Producto();
    let nombreViejo : string = req.body.producto.nombre;
    producto.nombre = req.body.producto.nuevoNombre;
    producto.descripcion = req.body.producto.descripcion; 
    producto.imagen = req.body.producto.imagen; 
    producto.precio = req.body.producto.precio;  
    producto.stock = req.body.producto.stock;
    let resultado : Resultado = ProductoDAO.ModificarProducto(producto, nombreViejo);
    switch(resultado){
        case Resultado.Exito:
            res.send({status: "success"});
            break;
        case Resultado.Error:
            res.send({status: "error", msg: "El dato ingresado no es valido"});
            break;
        case Resultado.FotoGrande:
            res.send({status: "error", msg: "La foto es demasiado grande"});
            break;
        case Resultado.NombreRepetido:
            res.send({status: "error", msg: "El nombre ya existe"});
            break;
        default:
            console.log("wtfffff");
            break;
    }
}

exports.eliminar = (req : any, res : any) => {
    let nombre = req.body.nombre;
    ProductoDAO.EliminarProducto(nombre);
}

exports.obtenerTodos = (req : any, res : any) => {
    let productos : Producto[] = ProductoDAO.ObtenerTodos();
    res.send(productos);
}

exports.obtenerUno = (req : any, res : any) => {
    let nombre : string = req.body.nombre;
    let producto : Producto | null = ProductoDAO.ObtenerProducto(nombre);
    res.send(producto);
}

exports.obtenerImgDefault = (req : any, res : any) => {
    fs.readFile('api/content/img_muestra.jpg', (err, data) => {
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(data);
    });
}