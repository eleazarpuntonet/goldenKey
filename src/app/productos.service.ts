import { Injectable } from '@angular/core';
import  proveedoresFile from "./data/productos.json"
localStorage.setItem('productos', JSON.stringify(proveedoresFile))
@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
	productos = JSON.parse(localStorage.getItem('productos'))
  constructor() {
  	console.log(this.productos)
  }

  getProductos(){
  	return this.productos
  }
}
