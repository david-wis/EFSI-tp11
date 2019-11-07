import Producto from "./model/producto";
import { Resultado } from "./model/resultado";
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/tp11";  

export default class BD {
    static AgregarProducto(producto : Producto) : boolean {
        let result : boolean = true;
        MongoClient.connect(url, (err : any, db : any) => {
            let dbo = db.db("tp11");
            dbo.collection("productos").insertOne(producto, () => {
                db.close();
                result = true;
            });
        });
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