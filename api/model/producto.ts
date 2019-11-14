const mongoose = require("mongoose");
const uri: string = "mongodb://127.0.0.1:27017/tp11";

mongoose.connect({useNewUrlParser: true}, uri, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Successfully Connected! ");
  }
});

export interface IProducto extends mongoose.Document {
  nombre: string;
  descripcion: string;
  imagen: any;
  precio: number;
  stock: number;
}

export const ProductoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagen: { type: Buffer, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
});

const Producto = mongoose.model<IProducto>("Producto", ProductoSchema);
export default Producto;

/*export default class Producto {
    nombre?: string;
    descripcion?: string;
    imagen? : any;
    precio? : number; 
    stock? : number;
    convertirImgABlob = () => {
        this.imagen = Buffer.from(this.imagen, "base64");
    }
}*/
