import Producto from "../model/producto";
import { Resultado } from "../model/resultado";

export default class ProductoDAO {
    static AgregarProducto(producto : Producto) : Resultado {
        let result : Resultado = Resultado.Exito;
        return result;
    }

    static ModificarProducto(producto : Producto, nombreViejo : string) : Resultado {
        let result : Resultado = Resultado.Exito;
        return result;
    }

    static EliminarProducto(nombre : string) : void {

    }

    static ObtenerProducto(nombre : string) : Producto | null {
        let producto : Producto | null = null;
        return producto;
    }

    static ObtenerTodos() : Producto[] {
        let productos : Producto[] = []; 
        return productos;
    }
}