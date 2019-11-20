import Producto, { IProducto } from "../model/producto";
import ProductoDAO from "../dao/productoDao";
import {Resultado} from "../model/resultado";
import fs from 'fs';

exports.agregar = (req : any, res : any) => {
    let producto : IProducto = new Producto();
    producto.nombre = req.body.nombre;
    producto.descripcion = req.body.descripcion; 
    producto.imagen = Buffer.from(req.body.imagen, 'base64');
    producto.precio = req.body.precio;  
    producto.stock = req.body.stock; 
    ProductoDAO.AgregarProducto(producto).then((resultado : Resultado) => {
        switch(resultado){
            case Resultado.Exito:
                res.send({status: "success"});
                break;
            case Resultado.Error:
                res.send({status: "error", msg: "El dato ingresado no es valido"});
                break;
            case Resultado.NombreRepetido:
                res.send({status: "error", msg: "El nombre ya existe"});
                break;
            default:
                console.log("wtfffff");
                break;
        }
    });
}

exports.modificar = (req : any, res : any) => {
    let producto : IProducto = new Producto();
    let nombreViejo : string = req.body.nombre;
    producto.nombre = req.body.nuevonombre;
    producto.descripcion = req.body.descripcion; 
    producto.imagen = Buffer.from(req.body.imagen, 'base64');
    producto.precio = req.body.precio;  
    producto.stock = req.body.stock;
    ProductoDAO.ModificarProducto(producto, nombreViejo).then((resultado) => {
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
    });
}

exports.eliminar = (req : any, res : any) => {
    let nombre = req.body.nombre;
    ProductoDAO.EliminarProducto(nombre);
    res.send({status: "success"});
}

exports.obtenerTodos = (req : any, res : any) => {
    ProductoDAO.ObtenerTodos().then(productos => {
        let productosBase64 : any[] = [];
        productos.map((prod) => {
            let p = {
                nombre: prod.nombre,
                descripcion: prod.descripcion,
                imagen: prod.imagen.toString('base64'),
                stock: prod.stock,
                precio: prod.precio
            }
            productosBase64.push(p);
        });
        res.send(productosBase64);
    });
}

exports.obtenerUno = (req : any, res : any) => {
    let nombre : string = req.query.Nombre;
    let producto = ProductoDAO.ObtenerProducto(nombre);
    if (producto != null) {
        producto.then((producto) => {
            if (producto != null) {
                res.send(producto);
            } else {
                res.send({status: "error", msg: "El producto no existe"});
            }
        });
    }
}

exports.obtenerImgDefault = (req : any, res : any) => {
    fs.readFile('api/content/img_muestra.jpg', (err, data) => {
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(data.toString('base64'));
    });
}