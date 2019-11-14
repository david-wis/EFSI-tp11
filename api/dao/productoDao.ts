import { IProducto } from "../model/producto";
import { Resultado } from "../model/resultado";
import BD from "../bd";

export default class ProductoDAO {
    static AgregarProducto(producto : IProducto) : Resultado {
        let result : Resultado = Resultado.Exito;
        let exito = true;
        exito = exito && ProductoDAO.Validar(producto.nombre);
        exito = exito && ProductoDAO.Validar(producto.descripcion);
        //exito = BD.Validar(producto.imagen);
        exito = exito && ProductoDAO.Validar(producto.precio);
        exito = exito && ProductoDAO.Validar(producto.stock);
        if (exito) {
            //producto.convertirImgABlob();
            if (BD.AgregarProducto(producto)){
                result = Resultado.Exito;
            } else {
                result = Resultado.NombreRepetido;
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

    static ModificarProducto(producto : IProducto, nombreViejo : string) : Resultado {
        let result : Resultado = Resultado.Exito;
        let exito = true;
        exito = exito && ProductoDAO.Validar(producto.nombre);
        exito = exito && ProductoDAO.Validar(producto.descripcion);
        //exito = BD.Validar(producto.imagen);
        exito = exito && ProductoDAO.Validar(producto.precio);
        exito = exito && ProductoDAO.Validar(producto.stock);
        exito = exito && ProductoDAO.Validar(nombreViejo);
        if (exito) {
            if (BD.ModificarProducto(producto, nombreViejo)) {
                result = Resultado.Exito;
            } else {
                result = Resultado.NombreRepetido;
            }
        } else {
            result = Resultado.Error;
        }
        return result;
    }

    static EliminarProducto(nombre : string) : boolean {
        let bExito = false;
        if (ProductoDAO.Validar(nombre)) {
            BD.EliminarProducto(nombre);
            bExito = true;
        }
        return bExito;
    }

    static ObtenerProducto(nombre : string) : IProducto | null {
        let producto : IProducto | null = null;
        if (ProductoDAO.Validar(nombre)) {
            producto = BD.ObtenerProducto(nombre);
        }
        return producto;
    }

    static ObtenerTodos() {
        //let productos : IProducto[] = [];
        let promesaProds = BD.ObtenerTodos();
        return promesaProds;
    }
}