import Producto, { IProducto } from "./model/producto";
import { Resultado } from "./model/resultado";

export default class BD {
    static async AgregarProducto(producto : IProducto) {
        let result : boolean = true;
        await Producto.findOne({nombre: producto.nombre}, (err : any, productoRepetido : IProducto) => {
            if (err == null && productoRepetido == null) {
                console.log(producto);
                let esquemita = new Producto(producto);
                esquemita.save();
            } else {
                result = false;
            }
        });
        return result;
    }

    static async ModificarProducto(producto : IProducto, nombreViejo : string) {
        let result;
        console.log("Empezo la modificacion del producto :v");
        await Producto.findOne({nombre: producto.nombre}, async (err : any, productoRepetido : IProducto) => {
            let result = Resultado.Exito;
            if (err == null && (productoRepetido == null || producto.nombre === nombreViejo)) { //Si no hay ningun producto con el nombre nuevo
                await Producto.findOne({nombre: nombreViejo}, (err : any, productoViejo) => {
                    if (err == null && productoViejo != null) {
                        productoViejo.nombre = producto.nombre;
                        productoViejo.descripcion = producto.descripcion;
                        productoViejo.imagen = producto.imagen;
                        productoViejo.precio = producto.precio;
                        productoViejo.stock = producto.stock;
                        console.log("Guardando producto", productoViejo);
                        productoViejo.save();
                    } else {
                        result = Resultado.Error;
                        console.log("Error comun");
                    }
                });
            } else {
                result = Resultado.NombreRepetido;
                console.log("Error nombre repetido");
                return result;
            }
        });
        return result;
    }

    static EliminarProducto(nombre : string) : void {
        Producto.deleteOne({nombre: nombre}, (err : any) => {
            console.log(err);
        });
    }

    static async ObtenerProducto(nombre : string) {
        let producto : IProducto | null;
        producto = await Producto.findOne({nombre: nombre});
        return producto;
    }

    static async ObtenerTodos() {
        let productos : IProducto[] = [];
        productos = await Producto.find();
        return productos;
    }
}