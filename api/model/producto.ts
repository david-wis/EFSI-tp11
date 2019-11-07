export default class Producto {
    nombre?: string;
    descripcion?: string;
    imagen? : any;
    precio? : number; 
    stock? : number;
    convertirImgABlob = () => {
        this.imagen = Buffer.from(this.imagen, "base64");
    }
}