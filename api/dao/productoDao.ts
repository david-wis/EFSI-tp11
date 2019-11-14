import { IProducto } from "../model/producto";
import { Resultado } from "../model/resultado";
import BD from "../bd";

export default class ProductoDAO {
    static async AgregarProducto(producto : IProducto) {
        let result : Resultado = Resultado.Exito;
        let exito = true;
        exito = exito && ProductoDAO.Validar(producto.nombre, "string");
        exito = exito && ProductoDAO.Validar(producto.descripcion, "string");
        //exito = BD.Validar(producto.imagen);
        exito = exito && ProductoDAO.Validar(producto.precio, "number");
        exito = exito && ProductoDAO.Validar(producto.stock, "number");
        if (exito) {
            //producto.convertirImgABlob();
            await BD.AgregarProducto(producto).then(ok => {
                result = ok? Resultado.Exito : Resultado.NombreRepetido;
            });
        } else {
            result = Resultado.Error;
        }
        return result;
    }

    static Validar(valor: any, tipoEsperado : string) : boolean {
        let exito : boolean = false;
        switch (tipoEsperado) {
            case "number":
                if (typeof valor === "number"){
                    console.log("se esperaba un numero y es un numero");
                    if (valor >= 0) {
                        exito = true;
                    }
                }
                break;
            case "string":
                if (typeof valor === "string") {
                    if (valor.trim() !== "") {
                        exito = true;
                    }
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
        exito = exito && ProductoDAO.Validar(producto.nombre, "string");
        exito = exito && ProductoDAO.Validar(producto.descripcion, "string");
        //exito = BD.Validar(producto.imagen);
        exito = exito && ProductoDAO.Validar(producto.precio, "number");
        exito = exito && ProductoDAO.Validar(producto.stock, "number");
        exito = exito && ProductoDAO.Validar(nombreViejo, "string");
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
        if (ProductoDAO.Validar(nombre, "string")) {
            BD.EliminarProducto(nombre);
            bExito = true;
        }
        return bExito;
    }

    static ObtenerProducto(nombre : string) : IProducto | null {
        let producto : IProducto | null = null;
        if (ProductoDAO.Validar(nombre, "string")) {
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