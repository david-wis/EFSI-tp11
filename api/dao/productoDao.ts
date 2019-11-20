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
            result = await BD.AgregarProducto(producto).then(ok => {
                return ok? Resultado.Exito : Resultado.NombreRepetido;
            });
        } else {
            const res = async () => {
                return Resultado.Error;
            }
            result = await res();
        }
        return result;
    }

    static Validar(valor: any, tipoEsperado : string) : boolean {
        let exito : boolean = false;
        switch (tipoEsperado) {
            case "number":
                if (typeof valor === "number"){
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

    static async ModificarProducto(producto : IProducto, nombreViejo : string) {
        let result;
        let exito = true;
        exito = exito && ProductoDAO.Validar(producto.nombre, "string");
        exito = exito && ProductoDAO.Validar(producto.descripcion, "string");
        //exito = BD.Validar(producto.imagen);
        exito = exito && ProductoDAO.Validar(producto.precio, "number");
        exito = exito && ProductoDAO.Validar(producto.stock, "number");
        exito = exito && ProductoDAO.Validar(nombreViejo, "string");
        if (exito) {
            result = await BD.ModificarProducto(producto, nombreViejo);
        } else {
            const res = async () => {
                return Resultado.Error;
            }
            result = await res();
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

    static ObtenerProducto(nombre : string) {
        let promesaProducto = null;
        if (ProductoDAO.Validar(nombre, "string")) {
            promesaProducto = BD.ObtenerProducto(nombre);
        }
        return promesaProducto;
    }

    static ObtenerTodos() {
        //let productos : IProducto[] = [];
        let promesaProds = BD.ObtenerTodos();
        return promesaProds;
    }
}