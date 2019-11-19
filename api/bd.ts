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
        let result : Resultado = Resultado.Exito;
        await Producto.findOne({nombre: producto.nombre}, async (err : any, productoRepetido : IProducto) => {
            if (err == null && productoRepetido == null) { //Si no hay ningun producto con el nombre nuevo
                await Producto.findOne({nombre: nombreViejo}, (err : any, productoViejo) => {
                    if (err == null && productoViejo != null) {
                        productoViejo = producto;
                        productoViejo.save();
                    } else {
                        result = Resultado.Error;
                    }
                });
            } else {
                result = Resultado.NombreRepetido;
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