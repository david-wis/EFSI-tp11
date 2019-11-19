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
        result = await Producto.findOne({nombre: producto.nombre}).then(async (productoRepetido : IProducto | null) => {
            let result = Resultado.Exito;
            if (productoRepetido == null || producto.nombre === nombreViejo) { //Si no hay ningun producto con el nombre nuevo
                await Producto.findOne({nombre: nombreViejo}).then(async () => (productoViejo : IProducto | null) => {
                    if (productoViejo != null) {
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
                    return result;
                });
            } else {
                result = Resultado.NombreRepetido;
                console.log("Error nombre repetido");
            }
            return result;
        });
        console.log("bd",result);
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