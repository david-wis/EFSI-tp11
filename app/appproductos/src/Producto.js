import fetch from 'node-fetch';
import {URL} from './Helpers';

export default class Producto {
    constructor() {
        this.nombre = "";
        this.descripcion = "";
        this.imagen = "";
        this.precio = 0;
        this.stock = 0;
        this.nuevo = true;
    }

    static ObtenerFotoDefault = async() => {
        const promesa = await fetch(URL+'/obtenerImgDefault');
        return promesa.text();
    }
}
