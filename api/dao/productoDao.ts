import Producto from "../model/producto";
import { Resultado } from "../model/resultado";
import BD from "../bd";

export default class ProductoDAO {
    static AgregarProducto(producto : Producto) : Resultado {
        let result : Resultado = Resultado.Exito;
        let exito = true;
        exito = ProductoDAO.Validar(producto.nombre);
        exito = ProductoDAO.Validar(producto.descripcion);
        //exito = BD.Validar(producto.imagen);
        exito = ProductoDAO.Validar(producto.precio);
        exito = ProductoDAO.Validar(producto.stock);
        if (exito) {
            producto.convertirImgABlob();
            if (Math.floor(producto.imagen.length/1024) < 64) {
                if (BD.AgregarProducto(producto)){
                    result = Resultado.Exito;
                } else {
                    result = Resultado.NombreRepetido;
                }
            } else {
                result = Resultado.FotoGrande;
            }
        } else {
            result = Resultado.Error;
        }
        return result;
    }

    static Validar(valor: any) : boolean {
        let exito : boolean = false;
        switch (typeof valor) {
            case "number":
                if (valor >= 0) {
                    exito = true;
                }
                break;
            case "string":
                if (valor.trim() !== "") {
                    exito = true;
                }
                break;
            default:
                exito = true;
                break;
        }
        return exito;
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