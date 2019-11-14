import Producto, { IProducto } from "./model/producto";
import { Resultado } from "./model/resultado";
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/tp11";  

export default class BD {
    static async AgregarProducto(producto : IProducto) {
        let result : boolean = true;
        await Producto.find({nombre: producto.nombre}, (err : any, productoRepetido : IProducto) => {
            if (!err && productoRepetido == null) {
                Producto.insert
            }
        });
        return result;
    }

    static ModificarProducto(producto : IProducto, nombreViejo : string) : Resultado {
        let result : Resultado = Resultado.Exito;
        Producto.find({nombre: producto.nombre}, (err : any, productoRepetido : IProducto) => {
            if (!err && productoRepetido == null) {
                let productoViejo = Producto.find({nombre: nombreViejo}, (err : any) => {
                    productoViejo.update(producto);
                });
            }
        });
        return result;
    }

    static EliminarProducto(nombre : string) : void {
        Producto.deleteOne({nombre: nombre}, (err : any) => {
            console.log(err);
        });
    }

    static ObtenerProducto(nombre : string) : IProducto | null {
        let producto : IProducto | null = null;
        Producto.findOne({nombre: nombre}, (err : any, prod : IProducto) => {
            producto = prod;
            console.log(err); 
        });
        return producto;
    }

    static async ObtenerTodos() {
        let productos : IProducto[] = [];
        await Producto.find((err : any, prods : IProducto[]) => {
            productos = prods;
        });
        return productos;
    }
}