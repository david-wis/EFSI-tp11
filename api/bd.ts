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
        productos = await Producto.find();
        return productos;
    }
}